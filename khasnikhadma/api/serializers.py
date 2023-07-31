from django.forms import ValidationError
from rest_framework import serializers
from api import models,validations
from django.contrib.auth import get_user_model, authenticate
from django.utils import timezone


#AnnonceCreate""""""""""""""""""""""""""""""""""""""""""""
class AnnonceCreateSerializer(serializers.Serializer):
 
    def create(self, clean_data):
        
        user = models.Artisan.objects.get(email = clean_data['artisan'])
        annonce_obj = models.Annonce.objects.create(
                categorie = clean_data['categorie'],
                service = clean_data['service'],
                img_annonce =clean_data['img_annonce'],
                description = clean_data['description'], 
                artisan = user,
                date_of_pub = timezone.now(),
            )       
        annonce_obj.save()
        return annonce_obj 

class ArtisanSerializer(serializers.ModelSerializer):
    wilaya = serializers.CharField(source='artisan.wilaya')
    commune = serializers.CharField(source='artisan.commune')
    class Meta:
        model =models.Artisan
        fields = ('wilaya', 'commune')

class AnnonceSerializer(serializers.ModelSerializer): 
    num = serializers.IntegerField(source='id')
    wilaya = serializers.CharField(source='artisan.wilaya')
    commune = serializers.CharField(source='artisan.commune')
    id_artisan = serializers.IntegerField(source='artisan.id')
    img = serializers.CharField(source='img_annonce')
    rating = serializers.CharField(source='rating_annonce')
    class Meta:
        model = models.Annonce
        fields = ['num', 'id_artisan', 'categorie', 'service', 'img', 'rating', 'wilaya', 'commune']
"""
class AnnonceCreateSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = models.Annonce
        fields = ['categorie', 'service','img_annonce', 'description', 'service','img_annonce', 'description']

"""

#Login""""""""""""""""""""""""""""""""""""""""""""
 
class LoginSerializer(serializers.Serializer):
 
    ##
    def check_user(self, clean_data):
        user = authenticate(username=clean_data['email'], password=clean_data['password'])
        if not user:
            raise ValidationError('user not found')
        return user
    """
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
    """

        
        
         
#get the data of the loged in 

class PersonSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Person
        fields = ['username', 'email','compte_type']
        
        

#Register""""""""""""""""""""""""""""""""""""""""""""
class WorkerRegisterSerializer(serializers.Serializer):
 
    def create(self, clean_data):
        
        
        
        user_obj = models.Artisan.objects.create_artisan(
            username=clean_data['username'],
            email=clean_data['email'],
            password=clean_data['password'],
            nom=clean_data['nom'],
            prenom=clean_data['prenom'],
            tel=clean_data['telephone'],
            wilaya=clean_data['wilaya'],
            commune=clean_data['commune'],
            adresse=clean_data['adresse'],
            rating=0, 
            isBanned=False,
            img=clean_data['img']

            ) 
        user_obj.token_of_validation =  validations.generate_email_verification_token()
        user_obj.email = clean_data['email']
        
        
        validations.send_validation_email(user_obj.token_of_validation,user_obj.email,user_obj.id,user_obj.compte_type)
        user_obj.save()
        return user_obj

    def validatee(self, data):  
        user = models.Artisan.objects.get(id = data['id'])
 
        
        if (user.token_of_validation == data['token']):
            user.valid = True
            user.save()
            return True
        else:
            return False
   

class ClientRegisterSerializer(serializers.Serializer):
 
    def create(self, clean_data): 
        user_obj = models.Client.objects.create_client(
            username=clean_data['username'],
            email=clean_data['email'],
            password=clean_data['password'],
            nom=clean_data['nom'],
            prenom=clean_data['prenom'],
            tel=clean_data['telephone'],
            wilaya=clean_data['wilaya'],
            commune=clean_data['commune'],
            adresse=clean_data['adresse'], 
            isBanned=False,
            img=clean_data['img']

            ) 
        user_obj.token_of_validation =  validations.generate_email_verification_token()
        user_obj.email = clean_data['email']
        
            
        validations.send_validation_email(user_obj.token_of_validation,user_obj.email,user_obj.id,user_obj.compte_type)
        user_obj.save()
        return user_obj

    def validatee(self, data):  
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

class ContactUsSerializer(serializers.Serializer):
 
    def create(self, clean_data):
            
            theMessage = models.Contact.objects.create(
                fullname=clean_data['fullname'],
                userEmail=clean_data['userEmail'],
                message=clean_data['message']) 
             
            theMessage.save()

#FAQ""""""""""""""""""""""""""""""""""""""""""""

class FAQSerializer(serializers.ModelSerializer):
 
    class Meta:
        model = models.FAQ
        fields = '__all__'


"""
class usertestSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.usertest
        fields = '__all__'
"""