from app_sph_lms.models import Course, CourseCategory
from rest_framework import serializers


class CourseCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = CourseCategory
        fields = "__all__"


class CourseSerializer(serializers.ModelSerializer):
    category = serializers.SerializerMethodField()

    class Meta:
        model = Course
        fields = "__all__"

    def get_category(self, obj):
        categories = obj.coursecategory_set.all()
        return [category.category.name for category in categories]
