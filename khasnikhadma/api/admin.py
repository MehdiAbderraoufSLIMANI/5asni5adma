from django.contrib import admin
from django.contrib.auth.models import User,AbstractUser

from django.contrib.auth.models import Permission
from .models import Artisan,Client,MyUserManager ,Contact,Annonce,Person
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

#Administrator""""""""""""""""""""""""""""""""
class PersonChangeForm(UserChangeForm):
    class Meta(UserChangeForm.Meta):
        model = Person
        exclude = ['isBanned', 'valid', 'wilaya','commune','adresse']
        verbose_name = "Administrator"
        verbose_name_plural = "Administrators"
@admin.register(Person)
class PersonAdmin(admin.ModelAdmin):
    form = PersonChangeForm
    readonly_fields = ('compte_type',)
    list_display = ('username','email', 'nom', 'prenom', 'tel' )

    def get_queryset(self, request):
        queryset = super().get_queryset(request) 
        return queryset.filter(compte_type='Administrator')

#Contact us""""""""""""""""""""""""""""""""
admin.site.register(Contact)

#Annonces""""""""""""""""""""""""""""""""
from django.utils.html import format_html
@admin.register(Annonce)
class AnnonceAdmin(admin.ModelAdmin):
    def image_tag(self, obj):

        return format_html('<img src="{}" style="max-width:200px; max-height:200px"/>'.format(obj.img_annonce.url))

    list_display = ("id", "date_of_pub", "categorie", "service","image_tag"  )
 
#Permission""""""""""""""""""""""""""""""""
admin.site.register(Permission)
