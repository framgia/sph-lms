from app_sph_lms.api.serializer.lesson_serializer import LessonSerializer
from app_sph_lms.models import Course, Lesson
from rest_framework import generics
from rest_framework.response import Response


class LessonList(generics.ListCreateAPIView):
    serializer_class = LessonSerializer

    def get_queryset(self):
        course_id = self.kwargs['course_id']
        return Lesson.objects.filter(course_id=course_id)

    def post(self, request, course_id):
        course = Course.objects.get(id=course_id)
        serializer = LessonSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(course=course)
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)

    def list(self, request, *args, **kwargs):
        course_id = self.kwargs['course_id']
        course = Course.objects.get(id=course_id)
        lessons = self.get_queryset()
        serializer = self.get_serializer(lessons, many=True)
        response_data = {
            'id': course.id,
            'name': course.name,
            'description': course.description,
            'image': course.img_path,
            'lessons': serializer.data
        }
        return Response(response_data)
