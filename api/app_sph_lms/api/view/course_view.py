from app_sph_lms.api.serializer.course_serializer import (
    CourseCategorySerializer, CourseSerializer)
from app_sph_lms.models import Category, Course, CourseCategory
from app_sph_lms.utils.enum import StatusEnum
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import generics


class CourseList(generics.ListCreateAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['status', 'name', 'category']

    def filter_queryset(self, queryset):
        # Get the value of the status query parameter as a string
        status_str = self.request.query_params.get('status', None)
        status = None

        # Map the status string to the corresponding enum value
        if status_str:
            try:
                status = StatusEnum[status_str.upper()]
            except KeyError:
                pass

        # If the status is set to INACTIVE, filter for inactive courses
        if status == StatusEnum.INACTIVE:
            queryset = queryset.filter(status_id=StatusEnum.INACTIVE.value)
        elif status == StatusEnum.ACTIVE:
            queryset = queryset.filter(status_id=StatusEnum.ACTIVE.value)

        # Get the value of the name query parameter
        name = self.request.query_params.get('name', None)
        if name:
            queryset = queryset.filter(name__icontains=name)

        # Get the value of the category query parameter as a comma-separated string
        category_str = self.request.query_params.get('category', None)
        if category_str:
            category_ids = [int(cid) for cid in category_str.split(',')]
            queryset = queryset.filter(coursecategory__category_id__in=category_ids)

        # Get the value of the sort query parameter
        sort = self.request.query_params.get("sort", None)
        if sort:
            if sort == 'name_asc':
                queryset = queryset.order_by('name')
            elif sort == 'name_desc':
                queryset = queryset.order_by('-name')

        return queryset

    def create(self, request, *args, **kwargs):
        response = super().create(request, *args, **kwargs)
        course_id = response.data.get('id')

        for category in request.data['category'].split(','):
            CourseCategory.objects.create(
                course=Course.objects.get(id=course_id),
                category=Category.objects.get(id=category)
            )
        return response

class CourseDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer


class CourseCategoryList(generics.ListCreateAPIView):
    queryset = CourseCategory.objects.all()
    serializer_class = CourseCategorySerializer


class CourseCategoryDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = CourseCategory.objects.all()
    serializer_class = CourseCategorySerializer
