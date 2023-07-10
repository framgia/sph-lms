from app_sph_lms.api.serializer.course_serializer import \
    CourseTraineeSerializer
from app_sph_lms.api.serializer.learning_path_serializer import \
    LearningPathTraineeSerializer
from app_sph_lms.api.serializer.trainer_serializer import \
    TrainerTraineeSerializer
from app_sph_lms.models import Course, LearningPath, User
from app_sph_lms.utils.pagination import LargeResultsSetPagination
from app_sph_lms.utils.sorting import SortingOption
from django.db.models import Q
from rest_framework import generics, status
from rest_framework.response import Response


class CourseTraineeViewSet(generics.RetrieveAPIView, generics.CreateAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseTraineeSerializer

    def create(self, request, *args, **kwargs):
        course_id = self.kwargs['pk']
        trainees = request.data.get('trainees')

        if not request.user.is_trainer:
            return Response(
                    {
                        "error":
                            "Unauthorized. Only trainers can enroll trainees."
                    },
                    status=status.HTTP_401_UNAUTHORIZED
                )

        try:
            course = Course.objects.get(pk=course_id)
        except Course.DoesNotExist:
            return Response(
                    {"error": "Course does not exist."},
                    status=status.HTTP_404_NOT_FOUND
                )

        for trainee_id in trainees:
            is_enrolled = course.trainee.filter(id=trainee_id).exists()
            if is_enrolled:
                return Response(
                    {"error": "Trainees already enrolled."},
                    status=status.HTTP_400_BAD_REQUEST
                )

            try:
                trainee = User.objects.get(id=trainee_id)
                if trainee.is_trainer:
                    return Response(
                            {"error": "Only trainees can be enrolled."},
                            status=status.HTTP_400_BAD_REQUEST
                        )
            except User.DoesNotExist:
                return Response(
                    {"error": "Trainee does not exist."},
                    status=status.HTTP_404_NOT_FOUND
                )

            course.trainee.add(trainee)

        return Response({"message": "Trainees Enrolled Successfully"})


class LearningPathTraineeViewSet(
    generics.RetrieveAPIView,
    generics.CreateAPIView
):

    queryset = LearningPath.objects.all()
    serializer_class = LearningPathTraineeSerializer

    def create(self, request, *args, **kwargs):
        learning_path_id = self.kwargs['pk']
        trainees = request.data.get('trainees')

        if not request.user.is_trainer:
            return Response(
                    {
                        "error":
                            "Unauthorized. Only trainers can enroll trainees."
                    },
                    status=status.HTTP_401_UNAUTHORIZED
                )

        try:
            learning_path = LearningPath.objects.get(pk=learning_path_id)
        except LearningPath.DoesNotExist:
            return Response(
                    {"error": "Learning path does not exist."},
                    status=status.HTTP_404_NOT_FOUND
                )

        for trainee_id in trainees:
            is_enrolled = learning_path.trainee.filter(id=trainee_id).exists()
            if is_enrolled:
                return Response(
                    {"error": "Trainees already enrolled."},
                    status=status.HTTP_400_BAD_REQUEST
                )

            try:
                trainee = User.objects.get(id=trainee_id)
                if trainee.is_trainer:
                    return Response(
                            {"error": "Only trainees can be enrolled."},
                            status=status.HTTP_400_BAD_REQUEST
                        )
            except User.DoesNotExist:
                return Response(
                    {"error": "Trainee does not exist."},
                    status=status.HTTP_404_NOT_FOUND
                )

            learning_path.trainee.add(trainee)

        return Response({"message": "Trainees Enrolled Successfully"})


class TrainerTraineeList(generics.ListCreateAPIView):
    queryset = User.objects.filter(is_trainer=False)
    serializer_class = TrainerTraineeSerializer
    pagination_class = LargeResultsSetPagination

    def get(self, request, *args, **kwargs):
        self.user_id = request.user.id
        return super().get(request, *args, **kwargs)

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        search = self.request.query_params.get('search', None)
        sort = self.request.query_params.get('sort', None)

        if search:
            queryset = queryset.filter(
                Q(first_name__icontains=search) |
                Q(last_name__icontains=search) |
                Q(email__icontains=search)
            )

        serializer = self.get_serializer(queryset, many=True)
        response_data = serializer.data
        response_data = self.format_response(response_data, sort)

        page = self.paginate_queryset(response_data)
        if page is not None:
            return self.get_paginated_response(page)

        return Response(response_data)

    def format_response(self, data, sort):
        trainees = []
        for trainee in data:
            format_trainee = {
                'id': trainee['id'],
                'firstname': trainee['first_name'],
                'lastname': trainee['last_name'],
                'email': trainee['email'],
                'course': {
                    "name": trainee['progress']['name'],
                    "percentage": trainee['progress']['percentage'],
                },
                'progress': trainee['progress']['percentage'],
            }
            trainees.append(format_trainee)

        if sort in SortingOption.sorting_options:
            sort_key = SortingOption.get_sort_key(sort)
            reverse_flag = SortingOption.get_reverse_flag(sort)
            trainees = sorted(trainees, key=lambda x: x[sort_key], reverse=reverse_flag)

        return trainees
