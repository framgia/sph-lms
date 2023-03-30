from app_sph_lms.models import Course, CourseCategory, User, Trainee, Trainer, Company
from rest_framework import serializers
from django.contrib.auth import authenticate
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.hashers import make_password
from django.db import models
from app_sph_lms.utils.enum import UserRoleEnum

class UserSerializer(serializers.ModelSerializer):
    full_name = serializers.SerializerMethodField()
    
    class Meta:
        model = User
        exclude = [
            'password',
            'is_superuser',
            'is_staff',
            'groups',
            'user_permissions',  
        ]

    def get_full_name(self, obj):
        return f'{obj.first_name} {obj.last_name}'
    
    def create(self, validated_data):
        company_id = self.context['company_id']
        validated_data['is_active'] = True
        validated_data['password'] = self.context['password']
        user = super().create(validated_data)

        if self.context['role'] == str(UserRoleEnum.TRAINEE.value):
            Trainee.objects.create(
                trainee=user,
                company=Company.objects.get(id=company_id)
            )
        elif self.context['role']== str(UserRoleEnum.TRAINER.value):
            Trainer.objects.create(
                trainer=user,
                company=Company.objects.get(id=company_id)
            )
            
        return user
    
    def update(self, instance, validated_data):
        for key, value in validated_data.items():
            if key == 'role':
                role = value
                setattr(instance, key, role)
            elif key == 'password':
                setattr(instance, key, make_password(value))
            else:
                if isinstance(getattr(instance.__class__, key).field, models.ManyToManyField):
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
    category_name = serializers.CharField(source='course_category.name', read_only=True)

    class Meta:
        model = Course
        fields = "__all__"

class AuthTokenSerializer(serializers.Serializer):
    email = serializers.EmailField(label=_("Email"))
    password = serializers.CharField(
        label=_("Password",),
        style={'input_type': 'password'},
        trim_whitespace=False
    )

    def validate(self, attrs):
        email = attrs.get('email')
        password = attrs.get('password')

        if email and password:
            user = authenticate(request=self.context.get('request'),
                                email=email, password=password)

            if not user:
                msg = _('Unable to log in with provided credentials.')
                raise serializers.ValidationError(msg, code='authorization')
        else:
            msg = _('Must include "email" and "password".')
            raise serializers.ValidationError(msg, code='authorization')

        attrs['user'] = user
        return attrs
    
class TraineeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Trainee
        fields = "__all__"
        
class TrainerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Trainer
        fields = "__all__"
