from rest_framework import generics
from .models import Message
from .serializers import MessageSerializer
from rest_framework.views import APIView
from rest_framework import permissions, status
from chat import serializers
from rest_framework.response import Response
class MessageList(generics.ListCreateAPIView):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer
    ordering = ('-timestamp',)


class CreateRoom(APIView):
    permission_classes = (permissions.AllowAny,) 
    def post(self, request):
        clean_data = request.data
        serializer = serializers.CreateRoomSerializer(data=clean_data)
        if serializer.is_valid(raise_exception=True):
            room = serializer.create(clean_data)
            if room:
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST)