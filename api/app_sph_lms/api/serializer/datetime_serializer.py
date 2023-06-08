from rest_framework import serializers


class DateTimeSerializer(serializers.DateTimeField):
    def to_representation(self, value):
        if value:
            return value.strftime('%m-%d-%Y')
        return None
