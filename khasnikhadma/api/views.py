from django.shortcuts import render

from rest_framework.decorators import api_view 

from rest_framework.response import Response
from api import serializers
 
from api import models
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import get_user_model, login, logout,authenticate
from rest_framework.authentication import SessionAuthentication
from rest_framework.views import APIView
from rest_framework import permissions, status
from rest_framework.permissions import IsAuthenticated
from api import validations,models
from rest_framework.parsers import MultiPartParser, FormParser
from .models import Artisan
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer





#Annonce""""""""""""""""""""""""""""""""
@api_view(['GET'])
def AnnonceView(request):
    queryset = models.Annonce.objects.all()
    serializer = serializers.AnnonceSerializer(queryset ,many =True )
    return Response(serializer.data)

#AnnonceCreate""""""""""""""""""""""""""""""""""""""""""""""""
class AnnonceCreate(APIView):
    permission_classes = (permissions.AllowAny,)
    parser_classes = (MultiPartParser, FormParser,)
    def post(self, request):
        
        clean_data = request.data
        
        serializer = serializers.AnnonceCreateSerializer(data=clean_data)
        if serializer.is_valid(raise_exception=True):
            created = serializer.create(clean_data) 
            if created:
                return Response(status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST)



#Contact us""""""""""""""""""""""""""""""""""""""""""""""""
class UserContactUs(APIView):
    permission_classes = (permissions.AllowAny,)
    def post(self, request):
        
        data = request.data
        serializer = serializers.ContactUsSerializer(data=data)
        if serializer.is_valid(raise_exception=True):
            serializer.create(data)

#Login""""""""""""""""""""""""""""""""""""""""""""""""""


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, Artisan):
        token = super().get_token(Artisan)

        # Add custom claims
        token['email'] = Artisan.email
        token['username'] = Artisan.username 
        return token
    
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

class Login(APIView):
    permission_classes = ()
    
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        user = authenticate(request, username=email, password=password)

        if user is not None:
            login(request, user)
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'user_data': {
                    'username': user.username,
                    'email': user.email,
                   
                }
            })
        else:
            return Response({'error': 'Invalid email or password.'}, status=status.HTTP_401_UNAUTHORIZED)


class UserData(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        # Get the currently authenticated user
        user = request.user
        # Serialize the user data
        serializer =serializers.PersonSerializer(user)
        return Response(serializer.data)

 
 



#Register""""""""""""""""""""""""""""""""""""""""""""""""""
class WorkerRegister(APIView):
    permission_classes = (permissions.AllowAny,)
    parser_classes = (MultiPartParser, FormParser,)
    def post(self, request):
        
        clean_data = request.data
        print("dddddddddd",clean_data)
        serializer = serializers.WorkerRegisterSerializer(data=clean_data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.create(clean_data)
            if user:
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST)
class ClientRegister(APIView):
    permission_classes = (permissions.AllowAny,)
    def post(self, request):
        
        clean_data = request.data
        serializer = serializers.ClientRegisterSerializer(data=clean_data)
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
            if valid:
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST)

#""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
"""
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
"""

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