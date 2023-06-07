import random

from app_sph_lms.api.serializer.trainee_serializer import TraineeSerializer
from app_sph_lms.models import (Category, Course, CourseCategory,
                                CourseTrainee, Lesson, Trainee)
from rest_framework import serializers
from rest_framework.exceptions import PermissionDenied
from rest_framework.pagination import PageNumberPagination


class CourseCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = CourseCategory
        fields = "__all__"


class LessonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lesson
        fields = ('id', 'title', 'link', 'order')


class CourseEnrolleeSerializer(serializers.ModelSerializer):
    trainee = serializers.SerializerMethodField()

    class Meta:
        model = CourseTrainee
        fields = "__all__"

    def get_trainee(self, obj):
        return TraineeSerializer(obj.trainee).data


class CourseSerializer(serializers.ModelSerializer):
    category = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all(),
        many=True
    )

    lessons = LessonSerializer(many=True)

    class Meta:
        model = Course
        fields = "__all__"

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['category'] = [
            {
                'id': category.id,
                'name': category.name
            } for category in instance.category.all()
        ]
        return representation

    def create(self, validated_data):
        user = self.context['request'].user

        if not user.is_authenticated or \
                user.role.title not in ['Trainer', 'Admin']:
            raise PermissionDenied(
                "Only authenticated Trainers and Admins can create a course."
            )

        categories_data = validated_data.pop('category')
        lessons_data = validated_data.pop('lessons')

        course = Course.objects.create(**validated_data)

        for lesson_data in lessons_data:
            lesson_data['course'] = course
            Lesson.objects.create(**lesson_data)

        course.category.set(categories_data)
        return course


class CustomPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'


class CourseTraineeSerializer(serializers.ModelSerializer):
    learners = serializers.SerializerMethodField()

    class Meta:
        model = Course
        fields = ['learners']

    def get_learners(self, obj):
        is_enrolled = self.context[
                'request'
            ].query_params.get(
                    'is_enrolled',
                    "true"
                )
        sortingOption = self.context[
                'request'
            ].query_params.get(
                    'selectedSortOption',
                    "A - Z",
                )

        if is_enrolled == "true":
            if sortingOption == "A - Z":
                course_trainees = CourseTrainee.objects.order_by('trainee__trainee__first_name').filter(course=obj)
            if sortingOption == "Z - A":
                course_trainees = CourseTrainee.objects.order_by('-trainee__trainee__first_name').filter(course=obj)

            data = [
                {
                    "trainee_id": trainee.id,
                    "user_id": trainee.trainee.trainee.id,
                    "firstname": trainee.trainee.trainee.first_name,
                    "lastname": trainee.trainee.trainee.last_name,
                    "email": trainee.trainee.trainee.email,
                    "progress": random.randint(0, 100),
                }
                for trainee in course_trainees
            ]
        else:
            trainees = Trainee.objects.exclude(trainee_detail__course=obj)
            data = [
                {
                    "trainee_id": trainee.id,
                    "user_id": trainee.trainee.id,
                    "firstname": trainee.trainee.first_name,
                    "lastname": trainee.trainee.last_name,
                    "email": trainee.trainee.email,
                    "progress": 0,
                }
                for trainee in trainees
            ]

        search = self.context['request'].query_params.get('search')
        if search:
            search = search.lower()
            data = [
                user
                for user in data
                if search in user["email"].lower()
                or search in user["firstname"].lower()
                or search in user[
                        "lastname"
                    ].lower()
            ]

        paginator = CustomPagination()
        paginated_data = paginator.paginate_queryset(
                data,
                self.context['request']
            )
        total_pages = paginator.page.paginator.num_pages

        return {
            'data': paginated_data,
            'total_pages': total_pages,
        }
