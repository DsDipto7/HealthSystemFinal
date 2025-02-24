from django.contrib.auth.forms import UserCreationForm, UserChangeForm
from .models import CustomUser  # Import CustomUser from models.py


class CustomUserCreationForm(UserCreationForm):
    class Meta(UserCreationForm.Meta):
        model=CustomUser
        fields=["email",]
class CustomUserChangeForm(UserChangeForm):
    class Meta:
        model=CustomUser
        fields=["email",]
        