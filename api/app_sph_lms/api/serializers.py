from app_sph_lms.models import Class, Course, CourseCategory, User, Trainee, Trainer, Company
from rest_framework import serializers
from django.contrib.auth import authenticate
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.hashers import make_password
from django.db import models
from app_sph_lms.utils.enum import UserRoleEnum
from rest_framework.pagination import PageNumberPagination
from rest_framework.exceptions import ValidationError


class UserSerializer(serializers.ModelSerializer):
    full_name = serializers.SerializerMethodField()
    password = serializers.CharField(write_only=True, min_length=5)
    role = serializers.SerializerMethodField()
    status = serializers.SerializerMethodField()

    class Meta:
        model = User
        exclude = [
            "is_superuser",
            "is_staff",
            "groups",
            "user_permissions",
        ]

    def get_full_name(self, obj):
        return f"{obj.first_name} {obj.last_name}"

    def get_role(self, obj):
        return {"id": obj.role.id, "title": obj.role.title}

    def get_status(self, obj):
        return {"id": obj.status.id, "name": obj.status.name}

    def create(self, validated_data):
        company_id = self.context["company_id"]
        validated_data["is_active"] = True
        validated_data["password"] = self.context["password"]
        validated_data["role_id"] = self.context["role"]
        user = super().create(validated_data)

        if self.context["role"] == str(UserRoleEnum.TRAINEE.value):
            Trainee.objects.create(
                trainee=user, company=Company.objects.get(id=company_id)
            )
        elif self.context["role"] == str(UserRoleEnum.TRAINER.value):
            Trainer.objects.create(
                trainer=user, company=Company.objects.get(id=company_id)
            )

        return user

    def validate_password(self, value):
        if len(value) < 5:
            raise serializers.ValidationError(
                "Password must be at least 5 characters long."
            )
        return value

    def update(self, instance, validated_data):
        for key, value in validated_data.items():
            if key == "role":
                role = value
                setattr(instance, key, role)
            elif key == "password":
                setattr(instance, key, make_password(self.validated_data["password"]))
            else:
                if isinstance(
                    getattr(instance.__class__, key).field, models.ManyToManyField
                ):
                    getattr(instance, key).set(value)
                else:
                    setattr(instance, key, value)

        instance.is_active = True
        instance.save()

        return instance

    def destroy(self):
        user = self.instance
        user.is_active = False
        user.save()
        return user


class CourseCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = CourseCategory
        fields = "__all__"


class CourseSerializer(serializers.ModelSerializer):
    category_id = CourseCategorySerializer(many=True, read_only=True)
    category_name = serializers.CharField(source="course_category.name", read_only=True)

    class Meta:
        model = Course
        fields = "__all__"


class AuthTokenSerializer(serializers.Serializer):
    email = serializers.EmailField(label=_("Email"))
    password = serializers.CharField(
        label=_(
            "Password",
        ),
        style={"input_type": "password"},
        trim_whitespace=False,
    )

    def validate(self, attrs):
        email = attrs.get("email")
        password = attrs.get("password")

        if email and password:
            user = authenticate(
                request=self.context.get("request"), email=email, password=password
            )

            if not user:
                msg = _("Unable to log in with provided credentials.")
                raise serializers.ValidationError(msg, code="authorization")
        else:
            msg = _('Must include "email" and "password".')
            raise serializers.ValidationError(msg, code="authorization")

        attrs["user"] = user
        return attrs


class TraineeSerializer(serializers.ModelSerializer):
    details = serializers.SerializerMethodField()

    class Meta:
        model = Trainee
        fields = "__all__"

    def get_details(self, obj):
        return UserSerializer(obj.trainee).data

    def get_details(self, obj):
        return UserSerializer(obj.trainee).data


class TrainerSerializer(serializers.ModelSerializer):
    details = serializers.SerializerMethodField()

    class Meta:
        model = Trainer
        fields = "__all__"

    def get_details(self, obj):
        return UserSerializer(obj.trainer).data


class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = "__all__"

    def get_details(self, obj, sort_by=None, sort_order="asc"):
        trainee_data = TraineeSerializer(obj.trainee, many=True).data
        trainer_data = TrainerSerializer(obj.trainer, many=True).data
        users = trainee_data + trainer_data
        data = [user["details"] for user in users]

        if sort_by is not None:
            if sort_by not in ["id", "email", "first_name", "last_name"]:
                raise serializers.ValidationError(
                    f"'{sort_by}' is not a valid attribute for User"
                )
            data.sort(key=lambda user: user.get(sort_by, ""))
            if sort_order == "desc":
                data.reverse()

        search = self.context["request"].query_params.get("search")
        if search:
            search = search.lower()
            data = [
                user
                for user in data
                if search in user["email"].lower()
                or search in user["first_name"].lower()
                or search in user["last_name"].lower()
                or search in user["role"]["title"].lower()
            ]
        return data

    def to_representation(self, obj):
        data = super().to_representation(obj)

        if len(self.get_details(obj)) > 0:
            sort_by = self.context["request"].query_params.get("sort_by")
            sort_order = self.context["request"].query_params.get("sort_order", "asc")
            users = self.get_details(obj, sort_by, sort_order)
            page_size = self.context["request"].query_params.get(
                "page_size", len(users)
            )
            paginator = PageNumberPagination()
            paginator.page_size = page_size
            paginated_users = paginator.paginate_queryset(
                users, self.context["request"]
            )
            search = self.context["request"].query_params.get("search")
            data["user"] = paginated_users
            data["pagination"] = {
                "next": paginator.get_next_link(),
                "previous": paginator.get_previous_link(),
                "count": paginator.page.paginator.count,
            }
            data["example"] = search
        else:
            data["user"] = "User does not exist"
        return data

class ClassSerializer(serializers.ModelSerializer):
    total_trainees = serializers.SerializerMethodField()
    total_trainers = serializers.SerializerMethodField()
    
    
    class Meta:
        model = Class
        fields = "__all__"
    
    def get_total_trainees(self, obj):
        return obj.trainee_set.count()
    
    def get_total_trainers(self, obj):
        return obj.trainer_set.count()
        
        
