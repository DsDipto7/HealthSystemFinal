from django.db import models
# from accounts.models import CustomUser

class Doctor(models.Model):
    # user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, null=True, blank=True)
    name = models.CharField(max_length=100)
    photo = models.ImageField(upload_to='doctors/')
    license_number = models.CharField(max_length=6, unique=True)
    qualification = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    college_name = models.CharField(max_length=150)
    specialist = models.CharField(max_length=100, default='General')
    bio = models.TextField(blank=True)
    experience = models.PositiveIntegerField(default=0)
    consultation_fee = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    available_time = models.CharField(max_length=100, default='9:00 AM - 5:00 PM')

    def __str__(self):
        return f"Dr. {self.name} ({self.specialist})"





