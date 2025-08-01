from django.db import models

# Create your models here.

class AmbulanceRequest(models.Model):
    from_location = models.CharField(max_length=100)
    destination = models.CharField(max_length=100)
    ambulance_type = models.CharField(max_length=100)
    date = models.DateField()
    time = models.TimeField()
    name = models.CharField(max_length=100)
    mobile = models.CharField(max_length=15)

    def __str__(self):
        return f"{self.name} - {self.date} {self.time}"
