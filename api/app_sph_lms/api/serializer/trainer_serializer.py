from app_sph_lms.api.serializer.course_serializer import CourseSerializer
from app_sph_lms.api.serializer.user_serializer import UserSerializer
from app_sph_lms.models import Trainer
from rest_framework import serializers


class TrainerSerializer(serializers.ModelSerializer):
    details = serializers.SerializerMethodField()
    author = CourseSerializer(many=True, read_only=True)
    course_count = serializers.SerializerMethodField()

    class Meta:
        model = Trainer
        fields = "__all__"

    def get_details(self, obj):
        return UserSerializer(obj.trainer).data

    def get_course_count(self, obj):
        return len(obj.author.all())
