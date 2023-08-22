from rest_framework import serializers
from chat import models
from api.models import Annonce,Client,Artisan
class MessageSerializer(serializers.ModelSerializer):
       class Meta:
           model = models.Message
           fields = ('id', 'username', 'content', 'timestamp')
           read_only_fields = ('id', 'timestamp')

class CreateRoomSerializer(serializers.Serializer):
    def create(self, validated_data):

        client_email = validated_data.get("client_id")
        artisan_id = validated_data.get("artisan_id")
        annonce_id = validated_data.get("annonce_id")
        
        # Retrieve the client, artisan, and annonce objects
        client = Client.objects.get(email=client_email)
        artisan = Artisan.objects.get(id=artisan_id)
        annonce = Annonce.objects.get(id=annonce_id)
    
        room_name = f"{client.email}_{artisan.email}_{annonce.id}"
        
        existing_room = models.Room.objects.filter(roomName=room_name).first()
        
        if existing_room:
            return existing_room
        else:
            created = models.Room.objects.create(roomName=room_name)
            created.artisan_id.set([artisan]) 
            created.client_id.set([client]) 
            created.annonce_id.set([annonce])  
            created.save()
            return created