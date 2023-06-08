from app_sph_lms.models import (Category, Course, LearningPath,
                                LearningPathCourse)
from rest_framework import serializers


class LearningPathCourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = LearningPathCourse
        fields = ('course', 'course_order')


class LearningPathSerializer(serializers.ModelSerializer):
    category = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all(),
        many=True,
    )
    courses = serializers.ListField(
      child=LearningPathCourseSerializer(),
      write_only=True
    )
    course_count = serializers.SerializerMethodField()

    class Meta:
        model = LearningPath
        exclude = ['author']

    def get_course_count(self, instance):
      return instance.courses.all().count()

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['category'] = [
            {
                'id': category.id,
                'name': category.name
            } for category in instance.category.all()
        ]
        return representation

    def validate(self, attrs):
        user = self.context['request'].user
        if user.role.title not in ['Admin', 'Trainer']:
            raise serializers.ValidationError(
                {
                  'message':
                      'Unauthorized. Only an admin or trainer \
                        can create learning paths.'
                  }
            )

        sorted_courses = sorted(
          attrs['courses'],
          key=lambda course: course['course_order']
        )
        for i, course in enumerate(sorted_courses):
            if i != course['course_order']:
                raise serializers.ValidationError(
                  {
                    'message':
                      'Invalid course order.'
                      }
                )

        return attrs

    def create(self, validated_data):
        request = self.context.get('request')
        validated_data['author'] = request.user

        courses = validated_data.pop('courses')
        categories = validated_data.pop('category')

        learning_path = LearningPath.objects.create(**validated_data)

        learning_path.category.set(categories)

        for course in courses:
            course_obj = Course.objects.get(id=course['course'].id)
            LearningPathCourse.objects.create(
              learning_path=learning_path,
              course=course_obj,
              course_order=course['course_order']
            )

        return learning_path
