from app_sph_lms.api.serializer.course_serializer import \
    CourseTraineeSerializer
from app_sph_lms.models import Course, CourseTrainee, Trainee
from rest_framework import generics
from rest_framework.response import Response


class CourseTraineeViewSet(generics.RetrieveAPIView, generics.CreateAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseTraineeSerializer

    def create(self, request, *args, **kwargs):
        course_id = self.kwargs['pk']

        for trainee in request.data['trainee'].split(','):
            CourseTrainee.objects.create(
                course=Course.objects.get(id=course_id),
                trainee=Trainee.objects.get(id=trainee)
            )

        return Response({"message": "Trainees Enrolled Successfully"})
