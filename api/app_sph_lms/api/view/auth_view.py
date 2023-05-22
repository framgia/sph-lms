from app_sph_lms.api.serializer.auth_serializer import AuthTokenSerializer
from app_sph_lms.api.serializer.user_serializer import UserSerializer
from app_sph_lms.models import User
from django.contrib.auth.backends import BaseBackend, get_user_model
from rest_framework import status
from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken import views as auth_views
from rest_framework.authtoken.models import Token
from rest_framework.compat import coreapi, coreschema
from rest_framework.decorators import api_view
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.schemas import ManualSchema
from rest_framework.views import APIView


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
