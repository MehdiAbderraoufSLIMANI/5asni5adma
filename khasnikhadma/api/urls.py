from django.urls import path

from api import views

from rest_framework_simplejwt.views import TokenRefreshView
"""
path('apis/', views.usersView , name='users'),
path('api/post', views.post , name='post'),
path('api/user/<str:pk>/', views.userView ,name='user'),
""" 
urlpatterns = [
    path('api/client/', views.clientView ,name='client'),
    path('api/artisan/', views.artisanView ,name='artisan'), 
    path('api/register-client/', views.ClientRegister.as_view() ,name='registerclient'),
    path('api/register-worker/', views.WorkerRegister.as_view() ,name='register-worker'),
    path('api/login/', views.Login.as_view() ,name='login'), 
    path('api/valid/', views.EmailValidation.as_view() ,name='EmailValidation'),
    path('api/contectus/', views.UserContactUs.as_view() ,name='UserContactUs'),
    path('api/user-data/', views.UserData.as_view(), name='user-data'),
    path('api/AnnonceCreate/', views.AnnonceCreate.as_view(), name='AnnonceCreate'),
    path('api/Annonce/', views.AnnonceView, name='Annonce'),
    path('api/FAQ/', views.FAQView, name='FAQ'),
    path('api/token/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
     
]
