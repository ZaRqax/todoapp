from django.db import models

# Create your models here.

class TodoItem(models.Model):
    text = models.CharField(max_length=200,verbose_name='Todo text')
    checked = models.BooleanField(default=False)
    date = models.DateField(auto_now=True)
    