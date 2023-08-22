from django.urls import path

from chat import views
 
 
urlpatterns = [
 path('messages/', views.MessageList.as_view()),
 path('room/',views.CreateRoom.as_view(), name='CreateRoom'),
]
