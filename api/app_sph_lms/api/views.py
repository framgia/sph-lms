from app_sph_lms.api.serializers import (CourseCategorySerializer,
                                         CourseSerializer)
from app_sph_lms.models import Course, CourseCategory
from django.db.models import Q
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import generics
from rest_framework.response import Response
from rest_framework import filters
from rest_framework.decorators import api_view
from rest_framework.authtoken.models import Token
from django.contrib.auth.backends import BaseBackend
from django.contrib.auth.backends import get_user_model

# Create your views here.

class AuthViaEmail(BaseBackend):
    def get_user(self, user_id):
        try:
             return get_user_model().objects.get(pk=user_id)
        except get_user_model().DoesNotExist:
            return None
    
    def authenticate(self, request, username=None, password=None):
        UserModel = get_user_model()
        try:
            user = UserModel.objects.get(Q(email__iexact=username))
            if user.check_password(password):
                return user
        except UserModel.DoesNotExist:
            return None

@api_view()
def get_auth_user(request):
    if request.method == 'GET':
        user = request.user
        token = Token.objects.get(user=user)
        return Response({
            'username': user.username,
            'email': user.email,
            'auth_token': token.key,
        })   

class CourseList(generics.ListCreateAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['is_active', 'course_category', 'title']
    
    def filter_queryset(self, queryset):
        # Get the value of the is_active query parameter
        is_active = self.request.query_params.get('is_active', None)
        
        # If is_active is set to 'false', filter for inactive courses
        if is_active == 'false':
            queryset = queryset.filter(is_active=False)
        elif is_active == 'true':
            queryset = queryset.filter(is_active=True)
        
        # Get the list of course categories from the query parameters
        category_ids_str = self.request.query_params.get('course_category')
        if category_ids_str:
            category_ids = [int(category_id) for category_id in category_ids_str.split(',')]
            # Use Q objects to combine filters for multiple categories
            category_filters = Q()
            for category_id in category_ids:
                category_filters |= Q(course_category__id=category_id)
            queryset = queryset.filter(category_filters)
        
        # Get the value of the title query parameter
        title = self.request.query_params.get('title', None)
        if title:
            queryset = queryset.filter(title__icontains=title)
        
        # Get the value of the sort query parameter
        sort = self.request.query_params.get('sort', None)
        if sort:
            if sort == 'title_asc':
                queryset = queryset.order_by('title')
            elif sort == 'title_desc':
                queryset = queryset.order_by('-title')
        
        return queryset

class CourseDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer

class CourseCategoryList(generics.ListCreateAPIView):
    queryset = CourseCategory.objects.all()
    serializer_class = CourseCategorySerializer
    
class CourseCategoryDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = CourseCategory.objects.all()
    serializer_class = CourseCategorySerializer
