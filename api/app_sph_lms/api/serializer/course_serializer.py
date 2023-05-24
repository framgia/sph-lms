import random

from app_sph_lms.api.serializer.trainee_serializer import TraineeSerializer
from app_sph_lms.models import Course, CourseCategory, CourseTrainee, Lesson
from rest_framework import serializers


class CourseCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = CourseCategory
        fields = "__all__"


class LessonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lesson
        fields = "__all__"


class CourseEnrolleeSerializer(serializers.ModelSerializer):
    trainee = serializers.SerializerMethodField()

    class Meta:
        model = CourseTrainee
        fields = "__all__"

    def get_trainee(self, obj):
        return TraineeSerializer(obj.trainee).data


class CourseSerializer(serializers.ModelSerializer):
    categories = serializers.SerializerMethodField()
    lessons = LessonSerializer(many=True)

    class Meta:
        model = Course
        fields = "__all__"

    def get_categories(self, obj):
        categories = obj.coursecategory_set.all()
        return [
            {
                "id": category.category.id,
                "name": category.category.name
            } for category in categories]


class CourseTraineeSerializer(serializers.ModelSerializer):
    learners = serializers.SerializerMethodField()

    class Meta:
        model = Course
        fields = ['learners']

    def get_learners(self, obj):
        see_more = self.context['request'].query_params.get('see_more')
        course_trainees = CourseTrainee.objects.filter(course=obj)

        if see_more == 'true':
            course_trainees = course_trainees
        else:
            course_trainees = course_trainees[:8]

        # for progress, it needs update
        # if `start lesson` and `progress` is alredy implemented
        return [
            {
                "tainee_id": trainee.id,
                "user_id": trainee.trainee.trainee.id,
                "fullname": trainee.trainee.trainee.get_full_name(),
                "firstname": trainee.trainee.trainee.first_name,
                "lastname": trainee.trainee.trainee.last_name,
                "email": trainee.trainee.trainee.email,
                "progress": random.randint(
                    0,
                    100
                    ),
            }
            for trainee in course_trainees
        ]
