from rest_framework import serializers
from api import models



#Register""""""""""""""""""""""""""""""""""""""""""""
class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.usertest
        fields = '__all__'
    def create(self, clean_data):
        
        if clean_data['compte_type'] == "worker":
            user_obj = models.Artisan.objects.create(
                username=clean_data['username'],
                email=clean_data['email'],
                password=clean_data['password'],
                nom=clean_data['nom'],
                prenom=clean_data['prenom'],
                tel=clean_data['tel'],
                wilaya=clean_data['wilaya'],
                commune=clean_data['commune'],
                adresse=clean_data['adresse'],
                rating=clean_data['rating'],
                category_of_worker=clean_data['category_of_worker'],
                isBanned=False

                )
            user_obj.email = clean_data['email']
            user_obj.save()
        return user_obj



#""""""""""""""""""""""""""""""""""""""""""""""""""""
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

