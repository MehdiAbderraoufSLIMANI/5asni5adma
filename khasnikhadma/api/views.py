from django.shortcuts import render

from rest_framework.decorators import api_view 

from rest_framework.response import Response
from .serializers import usertestSerializer
 
from .models import usertest

@api_view(['GET'])
def userView(request,pk):
    print(pk)
    queryset = usertest.objects.filter(id = pk)
    serializer = usertestSerializer(queryset ,many =True )
    return Response(serializer.data)

@api_view(['GET'])
def usersView(request):
    queryset = usertest.objects.all()
    serializer = usertestSerializer(queryset ,many =True )
    return Response(serializer.data)