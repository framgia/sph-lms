from app_sph_lms.api.serializer.completed_lesson_serializer import \
    CompletedLessonSerializer
from app_sph_lms.models import CompletedLesson, Lesson
from rest_framework import generics, status
from rest_framework.response import Response


class CompletedLessonList(generics.ListCreateAPIView):
    queryset = CompletedLesson.objects.all()
    serializer_class = CompletedLessonSerializer

    def create(self, request, *args, **kwargs):
        user = request.user
        lesson = Lesson.objects.get(id=request.data['lesson'])

        if lesson is None:
            return Response(
                {"error": "Lesson data is missing."},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            CompletedLesson.objects.create(trainee=user, lesson=lesson)
            return Response(
                {"message": f"{lesson.title} is now completed"},
                status=status.HTTP_201_CREATED
            )

        except Exception as e:
            return Response(
                {
                    "error": "An error occurred.",
                    "details": str(e)
                },
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class CompletedLessonDetail(generics.RetrieveDestroyAPIView):
    queryset = CompletedLesson.objects.all()
    serializer_class = CompletedLessonSerializer
    lookup_url_kwarg = 'lesson'

    def delete(self, request, *args, **kwargs):
        lesson_id = int(self.kwargs[self.lookup_url_kwarg])
        user = request.user
        lesson = Lesson.objects.get(id=lesson_id)

        try:
            completed_lesson = CompletedLesson.objects.get(
                    trainee=user,
                    lesson=lesson
                )
            completed_lesson.delete()
            message = f"{lesson.title} has been removed from completed lessons"
            return Response(
                {"message": message}
            )
        except CompletedLesson.DoesNotExist:
            return Response(
                {"error": "CompletedLesson does not exist."},
                status=status.HTTP_404_NOT_FOUND
            )
