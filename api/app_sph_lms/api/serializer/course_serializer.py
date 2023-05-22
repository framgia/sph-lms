from app_sph_lms.models import Course, CourseCategory, Lesson
from rest_framework import serializers


class CourseCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = CourseCategory
        fields = "__all__"


class LessonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lesson
        fields = "__all__"


class CourseSerializer(serializers.ModelSerializer):
    categories = serializers.SerializerMethodField()
    lessons = LessonSerializer(many=True) 

    class Meta:
        model = Course
        fields = "__all__"

    def get_categories(self, obj):
        categories = obj.coursecategory_set.all()
        return [{"id": category.category.id, "name": category.category.name} for category in categories]

