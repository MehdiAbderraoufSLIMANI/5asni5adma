from typing import Any
from django.db import models

 
#testing 2
class usertest(models.Model):
    name = models.TextField(max_length=50 ,default=" ")
    password = models.TextField(max_length=50 ,default=" ")

class Person(models.Model):
    username = models.CharField(max_length=50)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=50) 
    nom = models.CharField(max_length=50)
    prenom = models.CharField(max_length=50)
    tel = models.IntegerField()
    isBanned = models.BooleanField()
    compte_type = models.CharField(max_length=10 ,editable=False) 

    token_of_validation = models.CharField(max_length=50,editable=False,default=' ')

    valid = models.BooleanField(default=False)
    def save(self, *args, **kwargs):
        # Set the default compte_type based on the model subclass being created
        if isinstance(self, Artisan):
            self.compte_type = "worker"
        elif isinstance(self, Client):
            self.compte_type = "client"
        super().save(*args, **kwargs)


#Artisan""""""""""""""""""""""""""""""""
class Artisan(Person):
    numb_card_national = models.IntegerField(default=124)
    wilaya = models.CharField(max_length=50)
    commune = models.CharField(max_length=50)
    adresse = models.CharField(max_length=50)
    rating = models.FloatField(max_length=1, editable=False, default=0)
    category_of_worker = models.CharField(max_length=10, default=" ")

    def __str__(self):
            return  str(self.email)
        


#Client""""""""""""""""""""""""""""""""
class Client(Person):
    wilaya = models.CharField(max_length=50)
    commune = models.CharField(max_length=50)
    adresse = models.CharField(max_length=50)



from django.contrib.auth.models import (
    BaseUserManager, AbstractBaseUser, PermissionsMixin
)


class MyUserManager(BaseUserManager):
    def create_user(self, first_name, last_name, email, password=None):
        
        if not email:
            raise ValueError('Users must have an email address')
    
        email = self.normalize_email(email)
        email = email.lower()

        user = self.model(
            first_name=first_name,
            last_name=last_name,
            email=email
        )

        
        user.set_password(password)

        user.save(using=self._db)
        return user

    def create_superuser(self, first_name, last_name, email, password=None):
        user = self.create_user(
            first_name= first_name,
            last_name= last_name,
            email = email,
            password=password,
        )
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user


class Administrateur(AbstractBaseUser, PermissionsMixin):
    last_name = models.CharField(max_length=255, verbose_name='Last name') 
    first_name = models.CharField(max_length=255, verbose_name='First name') 
    email = models.EmailField(
        verbose_name='email address',
        max_length=255,
        unique=True,
    )
    password2 = models.CharField(max_length=255, verbose_name= 'Password confirmation', null=True) 
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = MyUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']

    def __str__(self):
        return f'First name: {self.first_name}, Last name: {self.last_name}, Email: {self.email}'    