from app_sph_lms.models import Company, Trainee, Trainer, User
from app_sph_lms.utils.enum import UserRoleEnum
from django.contrib.auth.hashers import make_password
from django.db import models
from rest_framework import serializers


class UserSerializer(serializers.ModelSerializer):
    full_name = serializers.SerializerMethodField()
    password = serializers.CharField(write_only=True, min_length=5)
    role = serializers.SerializerMethodField()

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
                setattr(instance, key, make_password(
                    self.validated_data["password"])
                        )
            else:
                if isinstance(
                    getattr(instance.__class__, key).field,
                    models.ManyToManyField
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
