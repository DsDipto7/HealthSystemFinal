

from rest_framework import serializers
from django.contrib.auth import authenticate
from .models import CustomUser
from payments.models import Stripe_Payment  # Assuming payments app and Payment model exist
from payments.serializers import PaymentSerializer


# Basic user info for profile viewing
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'email', 'profile_image']


# For user registration with password confirmation
class UserRegistrationSerializer(serializers.ModelSerializer):
    password1 = serializers.CharField(write_only=True)
    password2 = serializers.CharField(write_only=True)

    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'email', 'password1', 'password2']
    
    def validate(self, attrs):
        if attrs['password1'] != attrs['password2']:
            raise serializers.ValidationError("Passwords do not match.")
        if len(attrs['password1']) < 5:
            raise serializers.ValidationError("Password must be at least 5 characters long.")
        return attrs

    def create(self, validated_data):
        password = validated_data.pop('password1')
        validated_data.pop('password2')
        return CustomUser.objects.create_user(password=password, **validated_data)


# accounts/serializers.py
class UserLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, attrs):
        email = attrs.get("email")
        password = attrs.get("password")

        if email and password:
            user = authenticate(request=self.context.get('request'), username=email, password=password)

            if not user:
                raise serializers.ValidationError("Invalid email or password.")
        else:
            raise serializers.ValidationError("Both email and password are required.")

        attrs['user'] = user
        return attrs



# For updating user profile (requires old email/password verification)


# class UserUpdateSerializer(serializers.ModelSerializer):
#     old_email = serializers.EmailField(write_only=True)
#     old_password = serializers.CharField(write_only=True)

#     class Meta:
#         model = CustomUser
#         fields = ['username', 'email', 'password', 'profile_image', 'old_email', 'old_password']
#         extra_kwargs = {
#             'password': {'write_only': True, 'required': False},
#             'email': {'required': False},
#             'username': {'required': False},
#             'profile_image': {'required': False},
#         }

#     def validate(self, data):
#         old_email = data.get('old_email')
#         old_password = data.get('old_password')

#         if not old_email or not old_password:
#             raise serializers.ValidationError("Old email and password are required for verification.")

#         user = authenticate(email=old_email, password=old_password)
#         if not user or user != self.context['request'].user:
#             raise serializers.ValidationError("Old email or password is incorrect.")

#         return data

#     def update(self, instance, validated_data):
#         validated_data.pop('old_email', None)
#         validated_data.pop('old_password', None)

#         if 'password' in validated_data:
#             instance.set_password(validated_data.pop('password'))

#         for attr, value in validated_data.items():
#             setattr(instance, attr, value)

#         instance.save()
#         return instance



class UserUpdateSerializer(serializers.ModelSerializer):
    old_email = serializers.EmailField(write_only=True)
    old_password = serializers.CharField(write_only=True)

    class Meta:
        model = CustomUser
        fields = ['username', 'email', 'password', 'profile_image', 'old_email', 'old_password']
        extra_kwargs = {
            'password': {'write_only': True, 'required': False},
            'email': {'required': False},
            'username': {'required': False},
            'profile_image': {'required': False},
        }

    def validate(self, data):
        old_email = data.get('old_email')
        old_password = data.get('old_password')

        if not old_email or not old_password:
            raise serializers.ValidationError("Old email and password are required.")

        user = authenticate(email=old_email, password=old_password)
        if not user or user != self.context['request'].user:
            raise serializers.ValidationError("Old email or password is incorrect.")

        return data

    def update(self, instance, validated_data):
        validated_data.pop('old_email', None)
        validated_data.pop('old_password', None)

        password = validated_data.pop('password', None)
        if password:
            instance.set_password(password)

        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        instance.save()
        return instance


