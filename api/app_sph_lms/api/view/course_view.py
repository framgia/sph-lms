from app_sph_lms.api.serializer.course_serializer import (
    CourseCategorySerializer, CourseSerializer)
from app_sph_lms.models import Course, CourseCategory, User
from app_sph_lms.utils.pagination import LargeResultsSetPagination
from django.db.models import F
from rest_framework import generics
from rest_framework.exceptions import PermissionDenied
from rest_framework.filters import OrderingFilter, SearchFilter
from rest_framework.response import Response


class CourseList(generics.ListCreateAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    pagination_class = LargeResultsSetPagination
    search_fields = ['name']

    def get_queryset(self):
        queryset = super().get_queryset()
        name = self.request.query_params.get('search', None)

        if name:
            queryset = queryset.filter(name__icontains=name)

        return queryset


class TraineeCourseList(generics.ListAPIView):
    serializer_class = CourseSerializer
    pagination_class = LargeResultsSetPagination
    filter_backends = [SearchFilter, OrderingFilter]
    search_fields = ['name']
    ordering_fields = ['name']

    def get_queryset(self):
        trainee_id = self.request.user.id
        trainee = User.objects.get(id=trainee_id)
        queryset = trainee.enrolled_course.all()

        ordering = self.request.query_params.get('ordering')
        if ordering == 'A - Z':
            queryset = queryset.order_by('name')
        elif ordering == 'Z - A':
            queryset = queryset.order_by(F('name').desc())

        return queryset


class CourseDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer

    def delete(self, request, *args, **kwargs, ):
        user = self.request.user

        if not user.is_authenticated or \
                not user.is_trainer:
            raise PermissionDenied(
                "Only authenticated Trainers and Admins can update a course."
            )
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response({"message": "Course deleted successfully."})


class CourseCategoryList(generics.ListCreateAPIView):
    queryset = CourseCategory.objects.all()
    serializer_class = CourseCategorySerializer


class CourseCategoryDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = CourseCategory.objects.all()
    serializer_class = CourseCategorySerializer
