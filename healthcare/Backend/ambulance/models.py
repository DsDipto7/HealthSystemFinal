from django.db import models

# Create your models here.
from django.db import models

class Ambulance(models.Model):
    type = models.CharField(max_length=100)  # Type of ambulance (e.g., ICU, Basic Life Support)
    contact = models.CharField(max_length=15)  # Phone number for contact

    def __str__(self):
        return self.type

