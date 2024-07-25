from django.db import models

# Create your models here.
class Card(models.Model):
    taskid = models.CharField(max_length=100)
    title = models.CharField(max_length=100)
    column = models.CharField(max_length=100)