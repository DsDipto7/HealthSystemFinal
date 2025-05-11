from django.db import models

# Create your models here.
from django.db import models

class Doctor(models.Model):
    name = models.CharField(max_length=100)
    photo = models.ImageField(upload_to='media/')
    license_number = models.CharField(max_length=6, unique=True)
    qualification = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    college_name = models.CharField(max_length=150)
    specialist = models.CharField(max_length=100,default='General')

    def __str__(self):
        return self.name
