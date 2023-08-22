from django.contrib import admin

from chat import models
 
 
# Register your models here.

admin.site.register(models.Message)
 
@admin.register(models.Room)
class ArtisanAdmin(admin.ModelAdmin): 
    list_display = ('roomName',)
