
from app_sph_lms.api.serializer.trainer_serializer import TrainerSerializer
from app_sph_lms.models import Class
from rest_framework import serializers


class ClassSerializer(serializers.ModelSerializer):
    total_trainees = serializers.SerializerMethodField()
    trainer = TrainerSerializer(
        source='trainer_set',
        many=True,
        read_only=True
        )

    class Meta:
        model = Class
        fields = "__all__"

    def get_total_trainees(self, obj):
        return obj.trainee_set.count()
