from django.db import models

# Create your models here.
from api.models import Artisan,Client,Annonce 
class Message(models.Model):
    username = models.CharField(max_length=255)
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "chat_message"
        ordering = ('timestamp',)

class Room(models.Model):
    roomName = models.CharField(verbose_name="Room Name",max_length=100,default="")

    artisan_id = models.ManyToManyField(Artisan)
    client_id = models.ManyToManyField(Client)
    annonce_id = models.ManyToManyField(Annonce)