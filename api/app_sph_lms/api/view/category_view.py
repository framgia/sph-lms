from app_sph_lms.api.serializer.category_serializer import CategorySerializer
from app_sph_lms.models import Category
from rest_framework import generics


class CategoryList(generics.ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class CategoryDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
