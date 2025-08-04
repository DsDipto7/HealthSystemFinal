from django.db import models

# Create your models here.

# Create your models here.
# appointments/models.py
from django.db import models
from accounts.models import CustomUser
from doctor.models import Doctor

class Appointment(models.Model):
    STATUS_CHOICES = (
        ('pending', 'Pending'),
        ('accepted', 'Accepted'),
        ('declined', 'Declined'),
    )

    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE)
    reason = models.TextField()
    date = models.DateField()
    time = models.TimeField()
    room = models.CharField(max_length=100)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='pending')
    is_call_started = models.BooleanField(default=False)
    is_call_ended = models.BooleanField(default=False)  # ➕ Add this line
    def __str__(self):
        return f"Appointment {self.id} ({self.user.username} -> Dr. {self.doctor.name})"