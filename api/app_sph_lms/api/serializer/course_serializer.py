from app_sph_lms.api.serializer.category_serializer import CategorySerializer
from app_sph_lms.api.serializer.datetime_serializer import DateTimeSerializer
from app_sph_lms.models import (Category, CompletedLesson, Course,
                                CourseCategory, Lesson, User)
from app_sph_lms.utils.pagination import CustomPagination
from app_sph_lms.utils.progress_calculator import ProgressCalculator
from app_sph_lms.utils.sorting import SortingOption
from django.db import transaction
from rest_framework import serializers
from rest_framework.exceptions import PermissionDenied


class CourseCategorySerializer(serializers.ModelSerializer):
    category = CategorySerializer()

    class Meta:
        model = CourseCategory
        fields = "__all__"


class LessonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lesson
        fields = ("id", "title", "link", "order")


class CourseSerializer(serializers.ModelSerializer):
    category = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all(),
        many=True,
        required=False
    )

    lessons = LessonSerializer(many=True, required=False)
    name = serializers.CharField(required=False)
    author = serializers.SerializerMethodField(read_only=True)
    created_at = DateTimeSerializer(read_only=True)
    updated_at = DateTimeSerializer(read_only=True)
    progress = serializers.SerializerMethodField()

    class Meta:
        model = Course
        exclude = ["trainee"]

    def get_author(self, obj):
        return f"{obj.author.first_name} {obj.author.last_name}"

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation["category"] = [
            {
                "id": category.id,
                "name": category.name
            } for category in instance.category.all()
        ]
        return representation

    def create(self, validated_data):
        user = self.context["request"].user

        if not user.is_authenticated or not user.is_trainer:
            raise PermissionDenied(
                "Only authenticated Trainers and Admins can create a course."
            )

        validated_data["author"] = user
        categories_data = validated_data.pop("category")

        lessons_data = validated_data.pop("lessons")

        with transaction.atomic():
            course = Course.objects.create(**validated_data)

            for lesson_data in lessons_data:
                lesson_data["course"] = course
                Lesson.objects.create(**lesson_data)

            for category in categories_data:
                category_id = category.id
                CourseCategory.objects.create(
                    course=course,
                    category_id=category_id
                )

        return course

    def update(self, instance, validated_data):
        user = self.context["request"].user

        if not user.is_authenticated or not user.is_trainer:
            raise PermissionDenied(
                "Only authenticated Trainers and Admins can update a course."
            )

        categories_data = validated_data.pop("category", [])
        lessons_data = validated_data.pop("lessons", [])

        instance.name = validated_data.get("name", instance.name)
        instance.description = validated_data.get(
                "description",
                instance.description
            )
        instance.save()

        CourseCategory.objects.filter(course=instance).delete()
        for category in categories_data:
            category_id = category.id
            CourseCategory.objects.create(
                course=instance,
                category_id=category_id
            )

        existing_lesson_ids = [lesson.id for lesson in instance.lessons.all()]
        for lesson_data in lessons_data:
            lesson_id = lesson_data.get("id")
            if lesson_id in existing_lesson_ids:
                Lesson.objects.filter(id=lesson_id).update(**lesson_data)
                existing_lesson_ids.remove(lesson_id)
            else:
                lesson_data["course"] = instance
                Lesson.objects.create(**lesson_data)

        Lesson.objects.filter(id__in=existing_lesson_ids).delete()

        return instance

    def get_progress(self, instance):
        trainee = self.context['request'].user
        completed_lessons = CompletedLesson.objects.filter(
            trainee=trainee,
            lesson__course=instance
        ).count()
        total_lessons = instance.lessons.count()
        if total_lessons > 0:
            progress = int((completed_lessons / total_lessons) * 100)
        else:
            progress = 0
        return progress


class CourseTraineeSerializer(serializers.ModelSerializer):
    learners = serializers.SerializerMethodField()

    class Meta:
        model = Course
        fields = ["learners"]

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
        search = self.context["request"].query_params.get("search")

        if is_enrolled == "true":
            course_trainees = obj.trainee.filter(
                    is_trainer=False
                ).order_by("first_name")
            data = [
                {
                    "id": trainee.id,
                    "firstname": trainee.first_name,
                    "lastname": trainee.last_name,
                    "email": trainee.email,
                    "progress": self.get_trainee_progress(trainee, obj),
                }
                for trainee in course_trainees
            ]
        else:
            trainees = User.objects.filter(
                    is_trainer=False
                ).exclude(
                    enrolled_course=obj
                )
            data = [
                {
                    "id": trainee.id,
                    "firstname": trainee.first_name,
                    "lastname": trainee.last_name,
                    "email": trainee.email,
                    "progress": 0,
                }
                for trainee in trainees
            ]

        if sortingOption in SortingOption.sorting_options:
            sort_key = SortingOption.get_sort_key(sortingOption)
            reverse_flag = SortingOption.get_reverse_flag(sortingOption)
            data = sorted(
                    data,
                    key=lambda x: x[sort_key],
                    reverse=reverse_flag
                )

        if search:
            search = search.lower()
            data = [
                user
                for user in data
                if search in user["email"].lower()
                or search in user["firstname"].lower()
                or search in user["lastname"].lower()
            ]

        paginator = CustomPagination()
        paginated_data = paginator.paginate_queryset(
                data,
                self.context['request']
            )
        total_pages = paginator.page.paginator.num_pages

        return {
            "data": paginated_data,
            "total_pages": total_pages,
        }

    def get_trainee_progress(self, trainee, course):
        total_lessons = course.lessons.count()
        completed_lessons = trainee.trainee.filter(
                lesson__course=course
            ).count()
        progress = ProgressCalculator(completed_lessons, total_lessons)
        return progress.get_percentage()
