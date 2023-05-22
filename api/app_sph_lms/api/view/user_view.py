from app_sph_lms.api.serializer.company_serializer import CompanySerializer
from app_sph_lms.api.serializer.user_serializer import (TraineeSerializer,
                                                        UserSerializer)
from app_sph_lms.models import Company, Trainee, User
from django.contrib.auth.hashers import make_password
from django.db.models import Q
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import generics
from rest_framework.response import Response


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

class TraineeList(generics.ListAPIView):
    queryset = Trainee.objects.all()
    serializer_class = TraineeSerializer
    filter_backends = [DjangoFilterBackend]

    def get_queryset(self):
        queryset = super().get_queryset()
        search = self.request.query_params.get('search', None)

        if search:
            queryset = queryset.filter(
                Q(trainee__first_name__icontains=search) |
                Q(trainee__last_name__icontains=search) |
                Q(trainee__email__icontains=search)
            )

        return queryset
