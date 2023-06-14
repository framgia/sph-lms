from app_sph_lms.api.serializer.trainee_serializer import TraineeSerializer
from app_sph_lms.api.serializer.trainer_serializer import TrainerSerializer
from app_sph_lms.models import Company
from rest_framework import serializers
from rest_framework.pagination import PageNumberPagination


class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = "__all__"

    def get_details(self, obj, sort_by=None, sort_order="asc"):
        trainee_data = TraineeSerializer(obj.trainee, many=True).data
        trainer_data = TrainerSerializer(obj.trainer, many=True).data
        users = trainee_data + trainer_data
        data = [user["details"] for user in users]

        if sort_by is not None:
            if sort_by not in ["id", "email", "first_name", "last_name"]:
                raise serializers.ValidationError(
                    f"'{sort_by}' is not a valid attribute for User"
                )
            data.sort(key=lambda user: user.get(sort_by, ""))
            if sort_order == "desc":
                data.reverse()

        search = self.context["request"].query_params.get("search")
        if search:
            search = search.lower()
            data = [
                user
                for user in data
                if search in user["email"].lower()
                or search in user["first_name"].lower()
                or search in user["last_name"].lower()
            ]
        return data

    def to_representation(self, obj):
        data = super().to_representation(obj)

        if len(self.get_details(obj)) > 0:
            sort_by = self.context["request"].query_params.get("sort_by")
            sort_order = self.context["request"].query_params.get(
                "sort_order", "asc"
                )
            users = self.get_details(obj, sort_by, sort_order)
            page_size = self.context["request"].query_params.get(
                "page_size", len(users)
            )
            paginator = PageNumberPagination()
            paginator.page_size = page_size
            paginated_users = paginator.paginate_queryset(
                users, self.context["request"]
            )
            data["user"] = paginated_users
            data["pagination"] = {
                "next": paginator.get_next_link(),
                "previous": paginator.get_previous_link(),
                "count": paginator.page.paginator.count,
            }
        else:
            data["user"] = "User does not exist"
        return data
