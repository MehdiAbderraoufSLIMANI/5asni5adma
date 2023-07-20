from django.contrib import admin
from django.contrib.auth.models import User,AbstractUser

from .models import Artisan,Client,MyUserManager ,Contact,Annonces
from django.contrib.auth.forms import UserChangeForm
 
 

#Artisan""""""""""""""""""""""""""""""""

class ArtisanChangeForm(UserChangeForm):
    class Meta(UserChangeForm.Meta):
        model = Artisan
        exclude = ['groups', 'user_permissions', 'last_login','is_superuser']
@admin.register(Artisan)
class ArtisanAdmin(admin.ModelAdmin):
    form = ArtisanChangeForm
    readonly_fields = ('rating','compte_type')
    list_display = ('username','email', 'nom', 'prenom', 'tel', 'isBanned', 'compte_type', 'valid','wilaya','commune','adresse','rating')


#Client""""""""""""""""""""""""""""""""
class ClientChangeForm(UserChangeForm):
    class Meta(UserChangeForm.Meta):
        model = Client
        exclude = ['groups', 'user_permissions', 'last_login','is_superuser']
@admin.register(Client)
class ClientAdmin(admin.ModelAdmin):
    form = ClientChangeForm
    readonly_fields = ('compte_type',)
    list_display = ('username','email', 'nom', 'prenom', 'tel', 'isBanned', 'compte_type', 'valid','wilaya','commune','adresse')

#Contact us""""""""""""""""""""""""""""""""
admin.site.register(Contact)

#Annonces""""""""""""""""""""""""""""""""
admin.site.register(Annonces)