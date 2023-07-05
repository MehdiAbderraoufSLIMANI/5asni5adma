from rest_framework import serializers
from .models import usertest


class usertestSerializer(serializers.ModelSerializer):
    class Meta:
        model = usertest
        fields = '__all__'