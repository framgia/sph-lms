from app_sph_lms.api.serializer.course_serializer import (
    CourseCategorySerializer, CourseSerializer)
from app_sph_lms.models import Course, CourseCategory
from rest_framework import generics
from rest_framework.exceptions import PermissionDenied
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response


class LargeResultsSetPagination(PageNumberPagination):
    page_size_query_param = 'page_size'
    max_page_size = 20

    def get_paginated_response(self, data):
        return Response({
            'page_size': self.page.paginator.per_page,
            'count': self.page.paginator.count,
            'totalPages': self.page.paginator.num_pages,
            'current_page_number': self.page.number,
            'next': self.get_next_link(),
            'previous': self.get_previous_link(),
            'results': data,
        })

    def get_page_size(self, request):
        page_size = request.query_params.get(self.page_size_query_param)
        if page_size and page_size.isdigit():
            return int(page_size)
        return self.page_size


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
