from django.urls import path

from api import views
urlpatterns = [
    path('apis/', views.usersView , name='users'),
    path('api/user/<str:pk>/', views.userView ,name='user'),
    path('api/client/', views.clientView ,name='client'),
    path('api/artisan/', views.artisanView ,name='artisan'),
]
