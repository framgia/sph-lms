from app_sph_lms.api.serializers import (AuthTokenSerializer, ClassSerializer,
                                         CompanySerializer,
                                         CourseCategorySerializer,
                                         CourseSerializer, UserSerializer, CategorySerializer)
from app_sph_lms.models import Class, Company, Course, CourseCategory, User, Category
from app_sph_lms.utils.enum import StatusEnum
from django.contrib.auth.backends import BaseBackend, get_user_model
from django.contrib.auth.hashers import make_password
from django.core.paginator import Paginator
from django.db.models import Count, F, Q
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters, generics, serializers, status
from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken import views as auth_views
from rest_framework.authtoken.models import Token
from rest_framework.compat import coreapi, coreschema
from rest_framework.decorators import api_view
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.schemas import ManualSchema
from rest_framework.views import APIView

# Create your views here.


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
            if user.check_password(password):
                return user
        except UserModel.DoesNotExist:
            return None


@api_view()
def get_auth_user(request):
    if request.method == "GET":
        user = request.user
        token = Token.objects.get(user=user)
        user = User.objects.get(id=user.id)
        serializer = UserSerializer(user)

        return Response(
            {
                "full_name": serializer.data["full_name"],
                "username": serializer.data["username"],
                "email": serializer.data["email"],
                "auth_token": token.key,
            }
        )


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
        # 1 create course
        # 2 loop through category, and create data for course category
        
        # Customize the behavior here
        response = super().create(request, *args, **kwargs)
        course_id = response.data.get('id')
        
        for category in request.data['category'].split(','):
            CourseCategory.objects.create(
                course=Course.objects.get(id=course_id), 
                category=Category.objects.get(id=category)
            )
        
        # Trainee.objects.create(
        #         trainee=user, company=Company.objects.get(id=company_id)
        #     )
        
        
        # Do something with the response here
        # return Response({"test": request.data})
        return response
        # return Response({"test": request.data['category'].split(',')})
        
        # return Response({"test": response.data.get('id')})


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
                    location="form",
                    schema=coreschema.String(
                        title="Email",
                        description="Valid email for authentication",
                    ),
                ),
                coreapi.Field(
                    name="password",
                    required=True,
                    location="form",
                    schema=coreschema.String(
                        title="Password",
                        description="Valid password for authentication",
                    ),
                ),
            ],
            encoding="application/json",
        )


class UserDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    lookup_url_kwarg_1 = "company_id"
    lookup_url_kwarg_2 = "pk"
    lookup_field = "pk"

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        serializer.destroy()
        return Response({"message": "User deleted"})


class CompanyUsersViewSet(generics.CreateAPIView, generics.RetrieveAPIView):
    lookup_url_kwarg = "company_id"
    user_queryset = User.objects.all()
    company_queryset = Company.objects.all()

    def get_serializer_class(self):
        if self.request.method == "POST":
            return UserSerializer
        else:
            return CompanySerializer

    def get_queryset(self):
        if self.request.method == "POST":
            return self.user_queryset.filter(
                company_id=self.kwargs.get(self.lookup_url_kwarg)
            )
        else:
            return self.company_queryset.filter(
                id=self.kwargs.get(self.lookup_url_kwarg)
            )

    def create(self, request, *args, **kwargs):
        encypted_password = make_password(request.data["password"])
        serializer = self.get_serializer(
            data=request.data,
            context={
                "company_id": self.kwargs.get(self.lookup_url_kwarg),
                "password": encypted_password,
                "role": request.data["role"],
            },
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(
            {
                "data": serializer.data,
                "message": "Successfully created new user",
            }
        )

class ClassList(generics.ListAPIView):
    serializer_class = ClassSerializer
    lookup_url_kwarg = "company_id"
    queryset = Class.objects.all()

    def get_queryset(self):
        sort_by = self.request.query_params.get("sort_by")
        sort_order = self.request.query_params.get("sort_order", "asc")
        page_size = self.request.query_params.get('page_size')
        page = self.request.query_params.get('page',1)
        if sort_by and sort_by not in ["name", "trainer", "total_trainees", "course_count"]:
            raise serializers.ValidationError(
                f"'{sort_by}' is not a valid attribute for Class"
            )
        queryset = self.queryset.filter(company=self.kwargs.get(self.lookup_url_kwarg))
        
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
                sort_field = "trainer__trainer__first_name" if sort_order == "asc" else "-trainer__trainer__first_name"
                queryset = queryset.annotate(trainer_name=F('trainer__trainer__first_name')).order_by(sort_field)
            elif sort_by == "total_trainees":
                sort_field = "total_trainees" if sort_order == "asc" else "-total_trainees"
                queryset = queryset.annotate(total_trainees=Count('trainee')).order_by(sort_field)
            elif sort_by == "course_count":
                sort_field = "course_count" if sort_order == "asc" else "-course_count"
                queryset = queryset.annotate(course_count=Count('trainer__author')).order_by(sort_field)
        if page_size:
            per_page = Paginator(queryset,page_size)
            paginated_class_list = per_page.page(page)
            queryset = paginated_class_list
        return queryset

class CategoryList(generics.ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class CategoryDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
