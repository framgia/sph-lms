from app_sph_lms.models import Course, CourseCategory, User
from rest_framework import serializers

class UserSerializer(serializers.ModelSerializer):
    full_name = serializers.SerializerMethodField()
    
    class Meta:
        model = User
        fields = "__all__"
        
    def get_full_name(self, obj):
        return f'{obj.first_name} {obj.last_name}'

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
