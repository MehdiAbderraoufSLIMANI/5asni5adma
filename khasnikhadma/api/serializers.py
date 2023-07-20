from django.forms import ValidationError
from rest_framework import serializers
from api import models,validations

#Login""""""""""""""""""""""""""""""""""""""""""""
class ArtisanSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Artisan
        fields = '__all__'

class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Client
        fields = '__all__'

class LoginSerializer(serializers.Serializer):
    artisan = ArtisanSerializer()
    client = ClientSerializer()
    def check_user(self, clean_data):

        # Attempt to find the email in Artisan and Client models
        try:
            artisan_instance = models.Artisan.objects.get(email=clean_data['email'])
        except models.Artisan.DoesNotExist:
            artisan_instance = None

        try:
            client_instance = models.Client.objects.get(email=clean_data['email'])
        except models.Client.DoesNotExist:
            client_instance = None
        if artisan_instance == None and client_instance == None:
            raise ValidationError('user not found')
        elif artisan_instance != None:
            return artisan_instance
        elif client_instance != None:
            return client_instance
        else:
            raise ValidationError('unknow errour')
        
        
         
 
        
        

#Register""""""""""""""""""""""""""""""""""""""""""""
class RegisterSerializer(serializers.Serializer):
 
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
                isBanned=False

                ) 
            user_obj.token_of_validation =  validations.generate_email_verification_token()
            user_obj.email = clean_data['email']
            
            
            validations.send_validation_email(user_obj.token_of_validation,user_obj.email,user_obj.id,user_obj.compte_type)
            user_obj.save()
        return user_obj

    def validatee(self, data): 
        if (data['typea']=="worker"):
            user = models.Artisan.objects.get(id = data['id'])
        else:
            user = models.Client.objects.get(id = data['id'])
        
        if (user.token_of_validation == data['token']):
            user.valid = True
            user.save()
            return True
        else:
            return False
   


 






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


#Contact us""""""""""""""""""""""""""""""""""""""""""""

class ContactUsSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Contact
        fields = '__all__'
    def create(self, clean_data):
            
            theMessage = models.Contact.objects.create(
                fullname=clean_data['fullname'],
                userEmail=clean_data['userEmail'],
                message=clean_data['message']) 
             
            theMessage.save()

"""
class usertestSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.usertest
        fields = '__all__'
"""