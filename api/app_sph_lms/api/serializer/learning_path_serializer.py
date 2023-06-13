import random

from app_sph_lms.models import (Category, Course, LearningPath,
                                LearningPathCourse, User)
from rest_framework import serializers
from app_sph_lms.api.serializer.course_serializer import CourseSerializer
from app_sph_lms.api.serializer.category_serializer import CategorySerializer
from rest_framework.pagination import PageNumberPagination


class CustomPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'


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


class ExtendedCourse(CourseSerializer):
    order = serializers.SerializerMethodField()

    def get_order(self, course):
        return course.learning_path_course.first().course_order

    class Meta(CourseSerializer.Meta):
        fields = CourseSerializer.Meta.fields


class LearningPathDetailSerializer(serializers.ModelSerializer):
    category = CategorySerializer(many=True, read_only=True)
    courses = ExtendedCourse(many=True, read_only=True)

    class Meta:
        model = LearningPath
        fields = "__all__"


class LearningPathTraineeSerializer(serializers.ModelSerializer):
    learners = serializers.SerializerMethodField()

    class Meta:
        model = LearningPath
        fields = ['learners']

    def get_learners(self, obj):
        is_enrolled = self.context[
                'request'
            ].query_params.get(
                    'is_enrolled',
                    "true"
                )

        if is_enrolled == "true":
            course_trainees = obj.trainee.all()
            data = [
                        {
                            "id": trainee.id,
                            "firstname": trainee.first_name,
                            "lastname": trainee.last_name,
                            "email": trainee.email,
                            "progress": random.randint(0, 100),
                        }
                        for trainee in course_trainees
                    ]
        else:
            # no filters, base logic to get all trainees,
            # will update along with user model update
            # trainees = (
            #     User.objects.exclude(learningpathtrainee__learning_path=obj)
            # )

            # with filter, get every user, will update base from model refactor
            trainees = User.objects.filter(
                    role__title='trainee'
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
