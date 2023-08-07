from django.urls import path

from chat.views import MessageList
 
 
urlpatterns = [
 path('messages/', MessageList.as_view()),
]
