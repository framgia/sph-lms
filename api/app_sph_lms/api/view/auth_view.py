from django.contrib.auth.backends import BaseBackend, get_user_model
from dj_rest_auth.registration.views import SocialLoginView
from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from allauth.socialaccount.providers.oauth2.client import OAuth2Client


import environ

env = environ.Env(
    # set casting, default value
    DEBUG=(bool, False)
)


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


class GoogleLoginView(SocialLoginView):
    adapter_class = GoogleOAuth2Adapter
    callback_url = f"{env('FRONTEND_URL')}/api/auth/callback/google/"
    client_class = OAuth2Client
