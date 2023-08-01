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


from django.conf import settings


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

#FAQ""""""""""""""""""""""""""""""""""""""""""""""""
@api_view(['GET'])
def FAQView(request):
    queryset = models.FAQ.objects.all()
    serializer = serializers.FAQSerializer(queryset ,many =True )
    return Response(serializer.data) 

#Login""""""""""""""""""""""""""""""""""""""""""""""""""


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, acount):
        token = super().get_token(acount)

        if acount.compte_type == "worker":
            worker = Artisan.objects.get(email = acount.email)
            # Add custom claims
            token['email'] = worker.email
            token['username'] = worker.username
            
            if len(str(worker.img)) != 0 :
                token['pic'] = settings.SITE_URL + "/media/"+ str(worker.img) 
        elif acount.compte_type == "client":
            client = models.Client.objects.get(email = acount.email)
            
            token['email'] = client.email
            token['username'] = client.username
            if len(str(client.img)) != 0 : 
                token['pic'] = settings.SITE_URL + "/media/"+ str(client.img) 
        else :
            token['email'] = acount.email
            token['username'] = acount.username
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
        serializer = serializers.WorkerRegisterSerializer(data=clean_data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.create(clean_data)
            if user:
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST)
class ClientRegister(APIView):
    permission_classes = (permissions.AllowAny,)
    parser_classes = (MultiPartParser, FormParser,)
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

#adding element to db==================
from django.shortcuts import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Artisan, Annonce
from django.conf import settings 
from functools import wraps


def debug_only(view_func):
    @wraps(view_func)
    def _wrapped_view(request, *args, **kwargs):
        if settings.DEBUG:
            return view_func(request, *args, **kwargs)
        else:
            return HttpResponse("This view is only active in debug mode.")
    return _wrapped_view



@csrf_exempt 
@debug_only 
def auto_create_announcements(request):
    email_array = [
        'njbj@mail.com', 'dddd@mail.com', 'ffh@mail.com', 'hhk@mail.com',
        'dd@mail.com', 'haho123@mail.com', 'hoho123@mail.com', 'sami4@mail.com',
        'uuu@gmail.com'
    ]

    announcements_data = [
        {
            'categorie': 'Photography',
            'service': 'Portrait Photoshoot',
            'description': 'Capturing the essence of a moment in time. Book a professional portrait photoshoot with our skilled artisan photographers.'
        },
        {
            'categorie': 'Culinary Delights',
            'service': 'Gourmet Cooking Class',
            'description': 'Discover the art of cooking with our gourmet chef artisan. Learn to prepare exquisite dishes that will delight your taste buds.'
        },
        {
            'categorie': 'Artistry',
            'service': 'Custom Paintings',
            'description': 'Turn your imagination into reality. Commission a unique and personalized painting crafted by our talented artisan artists.'
        },
        {
            'categorie': 'Green Spaces',
            'service': 'Zen Garden Design',
            'description': 'Transform your outdoor space into a tranquil oasis with our artisan gardeners. Experience serenity in your own Zen garden.'
        },
        {
            'categorie': 'Tech Innovations',
            'service': 'Virtual Reality Experience',
            'description': 'Embark on an immersive journey with our cutting-edge virtual reality experiences. Explore worlds beyond your wildest imagination.'
        },
        {
            'categorie': 'Fashion & Style',
            'service': 'Bespoke Tailoring',
            'description': 'Elevate your wardrobe with custom-tailored clothing. Our artisan tailors will create garments that perfectly fit your unique style.'
        }
    ]

    try:
        for email in email_array:
            artisan, created = Artisan.objects.get_or_create(email=email)

            for data in announcements_data:
                annonce = Annonce.objects.create(
                    categorie=data['categorie'],
                    service=data['service'],
                    description=data['description'],
                    artisan=artisan
                )
        return HttpResponse("Announcements created successfully")
    except Exception as e:
        return HttpResponse(f"An error occurred: {e}")
