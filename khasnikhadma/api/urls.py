from django.urls import path

from .views import userView ,usersView
urlpatterns = [
    path('apis/', usersView , name='users'),
    path('api/<str:pk>/', userView ,name='user'),
]
