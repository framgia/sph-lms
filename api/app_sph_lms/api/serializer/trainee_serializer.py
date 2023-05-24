from app_sph_lms.api.serializer.user_serializer import UserSerializer
from app_sph_lms.models import Trainee
from rest_framework import serializers


class TraineeSerializer(serializers.ModelSerializer):
    trainee = UserSerializer()

    class Meta:
        model = Trainee
        fields = "__all__"
