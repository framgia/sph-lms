from app_sph_lms.api.serializer.course_serializer import \
    CourseTraineeSerializer
from app_sph_lms.api.serializer.trainer_serializer import TrainerTraineeSerializer
from app_sph_lms.api.serializer.learning_path_serializer import \
    LearningPathTraineeSerializer
from app_sph_lms.api.view.course_view import LargeResultsSetPagination
from app_sph_lms.models import (Course, CourseTrainee, LearningPath, Trainee,
                                User)
from django.db.models import Q
from rest_framework import generics, status
from rest_framework.response import Response

class CourseTraineeViewSet(generics.RetrieveAPIView, generics.CreateAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseTraineeSerializer

    def create(self, request, *args, **kwargs):
        course_id = self.kwargs['pk']
        trainees = request.data.get('trainee', '').split(',')

        course = Course.objects.filter(id=course_id).first()
        if not course:
            return Response(
                    {"error": "Course not found."},
                    status=status.HTTP_404_NOT_FOUND
                )

        existing_course_trainees = CourseTrainee.objects.filter(
                course=course,
                trainee__in=trainees
            )
        if existing_course_trainees.exists():
            return Response(
                {"error": "Data Duplication Not Allowed"},
                status=status.HTTP_400_BAD_REQUEST
            )

        for trainee_id in trainees:
            try:
                trainee = Trainee.objects.get(id=trainee_id)
                CourseTrainee.objects.create(course=course, trainee=trainee)
            except Trainee.DoesNotExist:
                return Response(
                        {
                            "error": "Trainee does not exist"
                        },
                        status=status.HTTP_400_BAD_REQUEST
                    )

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

    def get_queryset(self):
        queryset = super().get_queryset()
        queryset = queryset.filter(trainer_id=self.user_id)
        search = self.request.query_params.get('search', None)

        if search:
            queryset = queryset.filter(Q(first_name__icontains=search) | Q(last_name__icontains=search) | Q(email__icontains=search))

        return queryset
