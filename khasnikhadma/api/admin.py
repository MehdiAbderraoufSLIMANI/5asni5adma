from django.contrib import admin
 
from .models import usertest,Artisan,Client


admin.site.register(usertest)


#Artisan""""""""""""""""""""""""""""""""
@admin.register(Artisan)
class ArtisanAdmin(admin.ModelAdmin):
    readonly_fields = ('rating','compte_type')


#Client""""""""""""""""""""""""""""""""
@admin.register(Client)
class ClientAdmin(admin.ModelAdmin):
    readonly_fields = ('compte_type',)
