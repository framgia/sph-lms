from app_sph_lms.api.serializer.trainer_serializer import \
    TrainerCourseSerializer
from app_sph_lms.api.view.course_view import LargeResultsSetPagination
from app_sph_lms.models import Course
from rest_framework import generics


class TrainerCoursesList(generics.ListAPIView):
    serializer_class = TrainerCourseSerializer
    pagination_class = LargeResultsSetPagination

    def list(self, request, *args, **kwargs):
        self.pagination_class.page_size = 9
        return super().list(request, *args, **kwargs)

    def get_queryset(self):
        return Course.objects.filter(author=self.request.user)
