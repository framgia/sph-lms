from app_sph_lms.api.serializer.course_serializer import \
    CourseTraineeSerializer
from app_sph_lms.models import Course
from rest_framework import generics


class CourseTraineeViewSet(generics.RetrieveAPIView, generics.CreateAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseTraineeSerializer
