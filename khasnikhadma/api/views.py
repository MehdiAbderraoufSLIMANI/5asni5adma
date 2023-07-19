from django.shortcuts import render

from rest_framework.decorators import api_view 

from rest_framework.response import Response
from api import serializers
 
from api import models

from django.contrib.auth import get_user_model, login, logout
from rest_framework.authentication import SessionAuthentication
from rest_framework.views import APIView
from rest_framework import permissions, status

from api import validations

#Contact us""""""""""""""""""""""""""""""""""""""""""""""""
class UserContactUs(APIView):
    permission_classes = (permissions.AllowAny,)
    def post(self, request):
        
        data = request.data
        serializer = serializers.RegisterSerializer(data=data)
        if serializer.is_valid(raise_exception=True):
            serializer.create(data)


#Register""""""""""""""""""""""""""""""""""""""""""""""""""
class UserRegister(APIView):
    permission_classes = (permissions.AllowAny,)
    def post(self, request):
        
        clean_data = request.data
        serializer = serializers.RegisterSerializer(data=clean_data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.create(clean_data)
            if user:
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST)
    
class EmailValidation(APIView):
    permission_classes = (permissions.AllowAny,)
    def post(self, request):
        data = request.data  
        serializer = serializers.RegisterSerializer(data=data)
        if serializer.is_valid(raise_exception=True):
            valid = serializer.validatee(data)
            print("dddddddddddddddd",data)
            if valid:
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST)

#""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
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

def post(self, request):
    data = request.data
    print(data)
    return Response("serializer.data")


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