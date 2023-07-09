from django.shortcuts import render

from rest_framework.decorators import api_view 

from rest_framework.response import Response
from api import serializers
 
from api import models

@api_view(['GET'])
def userView(request,pk):
    print(pk)
    queryset = models.usertest.objects.filter(id = pk)
    serializer = serializers.usertestSerializer(queryset ,many =True )
    return Response(serializer.data)

@api_view(['GET'])
def usersView(request):
    queryset = models.usertest.objects.all()
    serializer = serializers.usertestSerializer(queryset ,many =True )
    return Response(serializer.data)


#Artisan""""""""""""""""""""""""""""""""
@api_view(['GET'])
def artisanView(request):
    queryset = models.Artisan.objects.all()
    serializer = serializers.ArtisanSerializer(queryset ,many =True )
    return Response(serializer.data)


#Client""""""""""""""""""""""""""""""""
@api_view(['GET'])
def clientView(request):
    queryset = models.Client.objects.all()
    serializer = serializers.ClientSerializer(queryset ,many =True )
    return Response(serializer.data)