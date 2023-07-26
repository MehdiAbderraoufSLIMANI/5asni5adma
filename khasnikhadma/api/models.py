from typing import Any
from django.db import models

from django.contrib.auth.models import (
    BaseUserManager, AbstractBaseUser, PermissionsMixin
)

#MyUserManager""""""""""""""""""""""""""""""""
class MyUserManager(BaseUserManager):
    def create_user(self, email, username, nom, prenom, tel, password=None):
        
        if not email:
            raise ValueError('Users must have an email address')
    
        email = self.normalize_email(email)
        email = email.lower()

        user = self.model(
            email=email,
            username = username,
            nom = nom,
            prenom = prenom,
            password=password,
            tel=tel,
            compte_type = "Administrator"
        )

        
        user.set_password(password)

        user.save(using=self._db)
        return user

    def create_superuser(self, email, username, nom, prenom, tel, password=None):
        user = self.create_user(
            email = email,
            username = username,
            nom = nom,
            prenom = prenom,
            password=password,
            tel=tel,
        )
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user
    
    def create_artisan(self,
                username,
                email,
                password,
                nom,
                prenom,
                tel,
                wilaya,
                commune,
                adresse,
                rating, 
                isBanned,
                img):
        
        if not email:
            raise ValueError('Users must have an email address')
    
        email = self.normalize_email(email)
        email = email.lower()

        user = self.model(
                username=username,
                email=email,
                password=password,
                nom=nom,
                prenom=prenom,
                tel=tel,
                wilaya=wilaya,
                commune=commune,
                adresse=adresse,
                rating=rating, 
                isBanned=isBanned,
                img=img
        )

        
        user.set_password(password)

        user.save(using=self._db)
        return user
    
    def create_client(self,
                username,
                email,
                password,
                nom,
                prenom,
                tel,
                wilaya,
                commune,
                adresse,  
                isBanned):
        
        if not email:
            raise ValueError('Users must have an email address')
    
        email = self.normalize_email(email)
        email = email.lower()

        user = self.model(
                username=username,
                email=email,
                password=password,
                nom=nom,
                prenom=prenom,
                tel=tel,
                wilaya=wilaya,
                commune=commune,
                adresse=adresse, 
                isBanned=isBanned
        )

        
        user.set_password(password)

        user.save(using=self._db)
        return user

 
#Person""""""""""""""""""""""""""""""""
class Person(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(max_length=20)
    email = models.EmailField(max_length=255,unique=True)
    nom = models.CharField(max_length=50)
    prenom = models.CharField(max_length=50)
    tel = models.IntegerField()
    isBanned = models.BooleanField(default=False)
    compte_type = models.CharField(max_length=20 ,editable=False) 
    token_of_validation = models.CharField(max_length=50,editable=False,default=' ')
    valid = models.BooleanField(default=False)

    password2 = models.CharField(max_length=255, verbose_name= 'Password confirmation', null=True) 
    is_active = models.BooleanField(default=True,editable=False)
    is_staff = models.BooleanField(default=False,editable=False)


    objects = MyUserManager()
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'nom', 'prenom', 'tel' ]

    def save(self, *args, **kwargs):
        # Set the default compte_type based on the model subclass being created
        if isinstance(self, Artisan):
            self.compte_type = "worker"
        elif isinstance(self, Client):
            self.compte_type = "client" 
        super().save(*args, **kwargs)


    class Meta:
        verbose_name = "Administrator"
        verbose_name_plural = "Administrators"


#Artisan""""""""""""""""""""""""""""""""
def upload_path_Artisan(instance, filename):
    return '/'.join(['artisan', str(instance.username), filename])
class Artisan(Person):
    #numb_card_national = models.IntegerField(default=124)
    img = models.ImageField(verbose_name="img Artisan", blank=True, null=True, upload_to=upload_path_Artisan)
    wilaya = models.CharField(max_length=50)
    commune = models.CharField(max_length=50)
    adresse = models.CharField(max_length=50)
    rating = models.FloatField(max_length=1, editable=False, default=0)
    

    def __str__(self):
            return  str(self.email)
        


#Client""""""""""""""""""""""""""""""""
class Client(Person):
    wilaya = models.CharField(max_length=50)
    commune = models.CharField(max_length=50)
    adresse = models.CharField(max_length=50)


#Contact Us""""""""""""""""""""""""""""""""
class Contact(models.Model):
    fullname = models.CharField(max_length=20)
    userEmail = models.EmailField()
    message = models.TextField()
    def __str__(self):
        return self.fullname   

#Annonces"""""""""""""""""""""""""""""""" 
def upload_path(instance, filename):
    return '/'.join(['annonce', str(instance.service), filename])
class Annonce(models.Model):
    date_of_pub = models.DateTimeField(verbose_name="date of publication")    
    categorie = models.CharField(max_length=30)
    service = models.CharField(max_length=20)
    img_annonce = models.ImageField(verbose_name="img annonce", blank=True, null=True, upload_to=upload_path) 
    description = models.TextField()
    rating_annonce = models.FloatField(max_length=1, editable=False, default=0,verbose_name="rating annonce")
    artisan = models.ForeignKey(Artisan, on_delete=models.CASCADE)
  

 
 