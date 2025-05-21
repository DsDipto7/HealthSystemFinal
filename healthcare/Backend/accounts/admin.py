from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser
from .forms import CustomUserCreationForm, CustomUserChangeForm
from django.utils.html import format_html

@admin.register(CustomUser)
class CustomAdminUser(UserAdmin):
    add_form = CustomUserCreationForm
    form = CustomUserChangeForm
    model = CustomUser

    # Show in user list
    list_display = ("email", "username", "is_staff", "is_active", "show_profile_image")

    readonly_fields = ('show_profile_image',)

    def show_profile_image(self, obj):
        if obj.profile_image:
            return format_html('<img src="{}" width="50" height="50" style="object-fit: cover;" />', obj.profile_image.url)
        return "No Image"
    show_profile_image.short_description = 'Profile Image'

    list_filter = ("is_staff", "is_active")

    fieldsets = (
        (None, {"fields": ("email", "username", "password", "profile_image", "show_profile_image")}),
        ("Permissions", {"fields": ("is_staff", "is_active", "is_superuser", "groups", "user_permissions")}),
        ("Important dates", {"fields": ("last_login",)}),
    )

    add_fieldsets = (
        (None, {
            "classes": ("wide",),
            "fields": ("email", "username", "password1", "password2", "is_staff", "is_active"),
        }),
    )

    search_fields = ("email", "username")
    ordering = ("email",)
