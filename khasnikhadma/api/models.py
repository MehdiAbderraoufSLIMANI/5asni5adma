from django.db import models

 
#testing 2
class usertest(models.Model):
    name = models.TextField(max_length=50 ,default=" ")
    password = models.TextField(max_length=50 ,default=" ")