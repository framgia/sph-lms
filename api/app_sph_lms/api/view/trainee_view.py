from app_sph_lms.api.serializer.course_serializer import \
    CourseTraineeSerializer
from app_sph_lms.models import Course, CourseTrainee, Trainee
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
