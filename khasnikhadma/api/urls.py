from django.urls import path

from api import views


"""
path('apis/', views.usersView , name='users'),
path('api/post', views.post , name='post'),
path('api/user/<str:pk>/', views.userView ,name='user'),
""" 
urlpatterns = [
    path('api/client/', views.clientView ,name='client'),
    path('api/artisan/', views.artisanView ,name='artisan'),
    path('api/register/', views.UserRegister.as_view() ,name='register'),
    path('api/login/', views.Login.as_view() ,name='login'), 
    path('api/valid/', views.EmailValidation.as_view() ,name='EmailValidation'),
    path('api/contectus/', views.UserContactUs.as_view() ,name='UserContactUs'),
    path('api/user-data/', views.UserData.as_view(), name='user-data'),
    path('api/AnnonceCreate/', views.AnnonceCreate.as_view(), name='AnnonceCreate'),
    path('api/Annonce/', views.AnnonceView, name='Annonce'),
     
]
