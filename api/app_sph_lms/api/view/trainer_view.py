from app_sph_lms.api.serializer.trainer_serializer import \
    TrainerCourseSerializer, TrainerLearningPathSerializer
from app_sph_lms.api.view.course_view import LargeResultsSetPagination
from app_sph_lms.models import Course, LearningPath
from rest_framework import generics


class TrainerCoursesList(generics.ListAPIView):
    serializer_class = TrainerCourseSerializer
    pagination_class = LargeResultsSetPagination

    def list(self, request, *args, **kwargs):
        self.pagination_class.page_size = 9
        return super().list(request, *args, **kwargs)

    def get_queryset(self):
        return Course.objects.filter(author=self.request.user)

class TrainerLearningPathList(generics.ListCreateAPIView):
    queryset = LearningPath.objects.filter(is_active=True)
    serializer_class = TrainerLearningPathSerializer
    pagination_class = LargeResultsSetPagination

    def get_queryset(self):
        queryset = super().get_queryset()
        queryset = queryset.filter(author=self.request.user)

        return queryset
