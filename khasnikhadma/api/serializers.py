from rest_framework import serializers
from api import models


class usertestSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.usertest
        fields = '__all__'


#Artisan""""""""""""""""""""""""""""""""
class ArtisanSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Artisan
        fields =(
        'username',
        'email',
        'password',
        'nom',
        'prenom',
        'tel',
        'wilaya',
        'commune',
        'adresse',
        'rating',
        'category_of_worker',
    )

#Client""""""""""""""""""""""""""""""""
class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Client
        fields =(
        'username',
        'email',
        'password',
        'nom',
        'prenom',
        'tel',
        'wilaya',
        'commune',
        'adresse',
    )

