from app_sph_lms.api.serializer.learning_path_serializer import \
    LearningPathSerializer
from app_sph_lms.models import LearningPath
from rest_framework import generics


class LearningPathList(generics.ListCreateAPIView):
    queryset = LearningPath.objects.all()
    serializer_class = LearningPathSerializer
