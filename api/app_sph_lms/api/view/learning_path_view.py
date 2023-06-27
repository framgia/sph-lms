from app_sph_lms.api.serializer.learning_path_serializer import (
    LearningPathDetailSerializer, LearningPathSerializer)
from app_sph_lms.api.view.course_view import LargeResultsSetPagination
from app_sph_lms.models import LearningPath
from rest_framework import generics, serializers


class LearningPathList(generics.ListCreateAPIView):
    queryset = LearningPath.objects.all()
    serializer_class = LearningPathSerializer
    pagination_class = LargeResultsSetPagination

    def get_queryset(self):
        queryset = super().get_queryset()
        name = self.request.query_params.get("search", None)
        is_active = self.request.query_params.get("is_active", None)
        is_trainer = self.request.user.is_trainer
        sort = self.request.query_params.get("sort", None)

        if not is_trainer:
            queryset = queryset.filter(trainee=self.request.user)

            if sort == "A - Z":
                queryset = queryset.order_by("name")
            elif sort == "Z - A":
                queryset = queryset.order_by("-name")

        if name:
            queryset = queryset.filter(name__icontains=name)

        if is_active is not None:
            if is_active.lower() == "true":
                queryset = queryset.filter(is_active=True)
            elif is_active.lower() == "false":
                queryset = queryset.filter(is_active=False)
            else:
                raise serializers.ValidationError(
                    "Invalid value for is_active. "
                    "Should either be 'true' or 'false'."
                )

        return queryset


class LearningPathDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = LearningPath.objects.all()
    serializer_class = LearningPathDetailSerializer
