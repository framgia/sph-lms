from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response


class CustomPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = "page_size"


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
