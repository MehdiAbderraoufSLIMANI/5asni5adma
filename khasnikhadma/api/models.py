from typing import Any
from django.db import models

 
#testing 2
class usertest(models.Model):
    name = models.TextField(max_length=50 ,default=" ")
    password = models.TextField(max_length=50 ,default=" ")

class User(models.Model):
    #id_compte = models.TextField(max_length=50 ,default=" ")
    id_compte = models.AutoField(primary_key=True, db_column='copmt_id', verbose_name='compte id')

    username = models.CharField(max_length=50)
    email = models.EmailField()
    password = models.CharField(max_length=50) 
    
    nom = models.CharField(max_length=50)
    prenom = models.CharField(max_length=50)
    tel = models.IntegerField()

    isBanned = models.BooleanField()
    
    CATEGORY_CHOICES = [
        ('client', 'Client'),
        ('worker', 'Worker'),
    ]
    
    #compte_type = models.CharField(max_length=10, choices=CATEGORY_CHOICES, default="client")
    compte_type = models.CharField(max_length=10 ,editable=False) 

    def save(self, *args, **kwargs):
        # Set the default compte_type based on the model subclass being created
        if isinstance(self, Artisan):
            self.compte_type = "worker"
        elif isinstance(self, Client):
            self.compte_type = "client"
        super().save(*args, **kwargs)

class Artisan(User):
    numb_card_national = models.IntegerField()
    wilaya = models.CharField(max_length=50)
    commune = models.CharField(max_length=50)
    adresse = models.CharField(max_length=50)
    rating = models.FloatField(max_length=1, editable=False, default=0)
    category_of_worker = models.CharField(max_length=10, default=" ")
    
    def __init__(self, *args: Any, **kwargs: Any) -> None:
        super().__init__(*args, **kwargs)
        self.compte_type = "worker"

class Client(User):
    wilaya = models.CharField(max_length=50)
    commune = models.CharField(max_length=50)
    adresse = models.CharField(max_length=50)
    
    def __init__(self, *args: Any, **kwargs: Any) -> None:
        super().__init__(*args, **kwargs)
        self.compte_type = "client"