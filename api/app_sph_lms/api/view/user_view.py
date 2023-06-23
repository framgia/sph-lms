from app_sph_lms.api.serializer.user_serializer import UserSerializer
from app_sph_lms.models import User
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
