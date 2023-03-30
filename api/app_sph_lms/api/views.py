from app_sph_lms.api.serializers import (CourseCategorySerializer,
                                         CourseSerializer,
                                         UserSerializer,
                                         AuthTokenSerializer)
from app_sph_lms.models import Course, CourseCategory, User, Trainee, Trainer, Company, Status
from django.db.models import Q
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import generics
from rest_framework.authentication import TokenAuthentication
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework import filters
from rest_framework.decorators import api_view
from rest_framework.authtoken.models import Token
from django.contrib.auth.backends import BaseBackend, get_user_model
from django.contrib.auth.hashers import make_password
from rest_framework.authtoken import views as auth_views
from rest_framework.compat import coreapi, coreschema
from rest_framework.schemas import ManualSchema
from enum import Enum


# Create your views here.
class UserRoleEnum(Enum):
    ADMIN = 1
    COMPANY = 2
    TRAINER = 3
    TRAINEE = 4

class StatusEnum(Enum):
    ACTIVE = 1
    INACTIVE = 2

class AuthViaEmail(BaseBackend):
    def get_user(self, user_id):
        try:
             return get_user_model().objects.get(pk=user_id)
        except get_user_model().DoesNotExist:
            return None
    
    def authenticate(self, request, email=None, password=None, **kwargs):
        UserModel = get_user_model()
        try:
            user = UserModel.objects.get(email=email)
            if user.check_password(password) or password == '':
                
                return user
        except UserModel.DoesNotExist:
            return None

@api_view()
def get_auth_user( request):
    if request.method == 'GET':
        user = request.user
        token = Token.objects.get(user=user)
        user = User.objects.get(id=user.id)
        serializer =  UserSerializer(user)
        
        return Response({
            'full_name': serializer.data["full_name"],
            'username': serializer.data["username"],
            'email': serializer.data["email"],
            'auth_token': token.key,
        })   

class SignOutView(APIView):
    permission_classes = (IsAuthenticated,)
    authentication_classes = (TokenAuthentication,)
    
    def post(self, request):
        request.user.auth_token.delete()
        return Response(status=status.HTTP_200_OK)

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

class AuthToken(auth_views.ObtainAuthToken):
    serializer_class = AuthTokenSerializer

    if coreapi is not None and coreschema is not None:
        schema = ManualSchema(
            fields=[
                coreapi.Field(
                    name="email",
                    required=True,
                    location='form',
                    schema=coreschema.String(
                        title="Email",
                        description="Valid email for authentication",
                    ),
                ),
                coreapi.Field(
                    name="password",
                    required=True,
                    location='form',
                    schema=coreschema.String(
                        title="Password",
                        description="Valid password for authentication",
                    ),
                ),
            ],
            encoding="application/json",
        )

class UserList(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    lookup_url_kwarg_1 = 'company_id'
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        
        user = User.objects.get(id=serializer.data['id'])
        user.is_active = True
        user.password = make_password(serializer.data['password'])
        user.save()
        
        Trainee.objects.create(
                trainee = user,
                company = Company.objects.get(id=self.kwargs.get(self.lookup_url_kwarg_1)),
            ).save()
        
        # if(request.data['role'] == UserRoleEnum.TRAINEE):
        #     Trainee.objects.create(
        #         trainee = user,
        #         company = Company.objects.get(id=self.kwargs.get(self.lookup_url_kwarg_1)),
        #     ).save()
            
        return Response({
            'data': serializer.data,
            'message': "Successfully created new user",
        })
        

class UserDetail(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    lookup_url_kwarg_1 = 'company_id'
    lookup_url_kwarg_2 = 'pk'
    
    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        response_data = serializer.data
        response_data['company_id'] = self.kwargs.get(self.lookup_url_kwarg_1)
        response_data['user_id'] = self.kwargs.get(self.lookup_url_kwarg_2)
        return Response(response_data)
