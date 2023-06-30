import random

from app_sph_lms.api.serializer.category_serializer import CategorySerializer
from app_sph_lms.api.serializer.course_serializer import CourseSerializer
from app_sph_lms.models import (Category, Course, LearningPath,
                                LearningPathCourse, User)
from rest_framework import serializers
from rest_framework.pagination import PageNumberPagination


class CustomPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = "page_size"


class LearningPathCourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = LearningPathCourse
        fields = ("course", "course_order")


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
        exclude = ["author", "trainee"]

    def get_course_count(self, instance):
        return instance.courses.all().count()

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation["category"] = [
            {
                "id": category.id,
                "name": category.name
            } for category in instance.category.all()
        ]
        return representation

    def validate(self, attrs):
        user = self.context["request"].user
        if not user.is_trainer:
            raise serializers.ValidationError(
                {
                    "message": "Unauthorized. Only an admin or trainer \
                        can create learning paths."
                }
            )

        sorted_courses = sorted(
            attrs["courses"], key=lambda course: course["course_order"]
        )
        for i, course in enumerate(sorted_courses):
            if i != course["course_order"]:
                raise serializers.ValidationError(
                  {
                    'message':
                      'Invalid course order.'
                      }
                )

        return attrs

    def create(self, validated_data):
        request = self.context.get("request")
        validated_data["author"] = request.user

        courses = validated_data.pop("courses")
        categories = validated_data.pop("category")

        learning_path = LearningPath.objects.create(**validated_data)

        learning_path.category.set(categories)

        for course in courses:
            course_obj = Course.objects.get(id=course["course"].id)
            LearningPathCourse.objects.create(
                learning_path=learning_path,
                course=course_obj,
                course_order=course["course_order"],
            )

        return learning_path


class ExtendedCourse(CourseSerializer):
    order = serializers.SerializerMethodField()

    def get_order(self, course):
        return course.learning_path_course.first().course_order

    class Meta(CourseSerializer.Meta):
        exclude = CourseSerializer.Meta.exclude


class LearningPathDetailSerializer(serializers.ModelSerializer):
    category = CategorySerializer(many=True, read_only=True)
    courses = ExtendedCourse(many=True, read_only=True)

    class Meta:
        model = LearningPath
        exclude = ["author", "trainee"]

    def update(self, instance, validated_data):
        is_active = validated_data.get('is_active', instance.is_active)
        if instance.is_active != is_active:
            instance.is_active = is_active
        else:
            instance.name = validated_data.get('name', instance.name)
            instance.description = validated_data.get('description', instance.description)
            instance.image = validated_data.get('image', instance.image)
            if 'category' in validated_data:
                category_data = validated_data.pop('category')
                instance.category.set(category_data)

            if 'courses' in validated_data:
                courses_data = validated_data.pop('courses')
                LearningPathCourse.objects.filter(learning_path=instance).delete()
                for course_data in courses_data:
                    course = Course.objects.get(id=course_data['course'])
                    course_order = course_data['course_order']
                    LearningPathCourse.objects.create(
                        learning_path=instance,
                        course=course,
                        course_order=course_order
                    )

        instance.save()
        return instance


class LearningPathTraineeSerializer(serializers.ModelSerializer):
    learners = serializers.SerializerMethodField()

    class Meta:
        model = LearningPath
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
                    'sort_by',
                    "A - Z",
                )

        if is_enrolled == "true":
            if sortingOption == "A - Z":
                learning_path_trainees = obj.trainee.order_by("first_name")
            elif sortingOption == "Z - A":
                learning_path_trainees = obj.trainee.order_by("-first_name")

            data = [
                {
                    "id": trainee.id,
                    "firstname": trainee.first_name,
                    "lastname": trainee.last_name,
                    "email": trainee.email,
                    "progress": random.randint(0, 100),
                }
                for trainee in learning_path_trainees
            ]
        else:
            # no filters, base logic to get all trainees,
            # will update along with user model update
            # trainees = (
            #     User.objects.exclude(learningpathtrainee__learning_path=obj)
            # )

            # with filter, get every user, will update base from model refactor
            trainees = User.objects.filter(
                    is_trainer=False
                ).exclude(
                        enrolled_learning_paths=obj
                    )

            data = [
                {
                    "id": trainee.id,
                    "firstname": trainee.first_name,
                    "lastname": trainee.last_name,
                    "email": trainee.email,
                }
                for trainee in trainees
            ]

        search = self.context["request"].query_params.get("search")
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
