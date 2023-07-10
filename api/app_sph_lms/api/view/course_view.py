from app_sph_lms.api.serializer.course_serializer import (
    CourseCategorySerializer, CourseSerializer)
from app_sph_lms.models import Course, CourseCategory, User
from app_sph_lms.utils.pagination import LargeResultsSetPagination
from rest_framework import generics
from rest_framework.exceptions import PermissionDenied
from rest_framework.filters import SearchFilter
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
    filter_backends = [SearchFilter]
    search_fields = ['name']

    def get_queryset(self):
        trainee_id = self.request.user.id
        trainee = User.objects.get(id=trainee_id)
        queryset = trainee.enrolled_course.all()
        return queryset

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        queryset = self.filter_queryset(queryset)
        serializer = self.get_serializer(queryset, many=True)
        sort = self.request.query_params.get('ordering', None)

        formatted_data = self.format_response(serializer.data, sort)

        page = self.paginate_queryset(formatted_data)
        if page is not None:
            return self.get_paginated_response(page)

        return Response(formatted_data)

    def format_response(self, data, sort):
        formatted_data = []
        for item in data:
            formatted_item = {
                'id': item['id'],
                'name': item['name'],
                'description': item['description'],
                'image': item['image'],
                'progress': item['progress'],
                'category': item['category'],
                'lessons': item['lessons'],
            }
            formatted_data.append(formatted_item)

        sorting_options = {
            "A - Z": ("name", False),
            "Z - A": ("name", True),
            "Progress Asc": ("progress", False),
            "Progress Desc": ("progress", True),
        }

        if sort in sorting_options:
            formatted_data = sorted(
                    formatted_data,
                    key=lambda x: x[sorting_options[sort][0]],
                    reverse=sorting_options[sort][1]
                )

        return formatted_data


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
