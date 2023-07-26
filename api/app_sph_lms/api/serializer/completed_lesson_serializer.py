from app_sph_lms.models import CompletedLesson
from rest_framework import serializers


class CompletedLessonSerializer(serializers.ModelSerializer):
    class Meta:
        model = CompletedLesson
        fields = "__all__"
