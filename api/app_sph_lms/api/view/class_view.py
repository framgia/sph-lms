from app_sph_lms.api.serializer.class_serializer import ClassSerializer
from app_sph_lms.models import Class
from django.core.paginator import Paginator
from django.db.models import Count, F, Q
from rest_framework import generics, serializers


class ClassList(generics.ListAPIView):
    serializer_class = ClassSerializer
    lookup_url_kwarg = "company_id"
    queryset = Class.objects.all()

    def get_queryset(self):
        sort_by = self.request.query_params.get("sort_by")
        sort_order = self.request.query_params.get("sort_order", "asc")
        page_size = self.request.query_params.get('page_size')
        page = self.request.query_params.get('page', 1)
        if sort_by and sort_by not in [
                                        "name",
                                        "trainer",
                                        "total_trainees",
                                        "course_count"
                                        ]:
            raise serializers.ValidationError(
                f"'{sort_by}' is not a valid attribute for Class"
            )
        queryset = self.queryset.filter(
            company=self.kwargs.get(self.lookup_url_kwarg)
            )

        search_query = self.request.query_params.get("search")
        if search_query:
            queryset = queryset.filter(
                Q(name__icontains=search_query) |
                Q(trainer__trainer__first_name__icontains=search_query) |
                Q(trainer__trainer__last_name__icontains=search_query)
            )

        if sort_by:
            if sort_by == "name":
                sort_field = "name" if sort_order == "asc" else "-name"
                queryset = queryset.order_by(sort_field)
            elif sort_by == "trainer":
                sort_field = (
                    "trainer__trainer__first_name"
                    if sort_order == "asc"
                    else "-trainer__trainer__first_name"
                )
                queryset = queryset.annotate(
                    trainer_name=F('trainer__trainer__first_name')).order_by(
                        sort_field
                                                                             )
            elif sort_by == "total_trainees":
                sort_field = (
                    "total_trainees" if sort_order == "asc" else "-total_trainees"
                )
                queryset = queryset.annotate(
                    total_trainees=Count('trainee')
                    ).order_by(sort_field)
            elif sort_by == "course_count":
                sort_field = "course_count" if sort_order == "asc" else "-course_count"
                queryset = queryset.annotate(
                    course_count=Count('trainer__author')
                                            ).order_by(sort_field)
        if page_size:
            per_page = Paginator(queryset,page_size)
            paginated_class_list = per_page.page(page)
            queryset = paginated_class_list
        return queryset
