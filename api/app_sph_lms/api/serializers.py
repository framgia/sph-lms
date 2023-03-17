from app_sph_lms.models import Course, CourseCategory
from rest_framework import serializers

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