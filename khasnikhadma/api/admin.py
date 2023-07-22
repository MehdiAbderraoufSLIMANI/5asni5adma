from django.contrib import admin
from django.contrib.auth.models import User,AbstractUser

from .models import usertest,Artisan,Client,MyUserManager,Administrateur,Contact


admin.site.register(usertest)
admin.site.register(Administrateur)
 

#Artisan""""""""""""""""""""""""""""""""
@admin.register(Artisan)
class ArtisanAdmin(admin.ModelAdmin):
    readonly_fields = ('rating','compte_type','token_of_validation')


#Client""""""""""""""""""""""""""""""""
@admin.register(Client)
class ClientAdmin(admin.ModelAdmin):
    readonly_fields = ('compte_type',)

#Contact us""""""""""""""""""""""""""""""""
admin.site.register(Contact)