# from rest_framework.generics import GenericAPIView, RetrieveAPIView
# from rest_framework.permissions import AllowAny, IsAuthenticated
# from rest_framework_simplejwt.tokens import RefreshToken
# from rest_framework.response import Response
# from rest_framework import status
# from django.core.mail import send_mail
# from .serializers import UserRegistrationSerializer, UserLoginSerializer, CustomUserSerializer

# # User Registration API
# class UserRegistrationAPIView(GenericAPIView):
#     permission_classes = (AllowAny,)
#     serializer_class = UserRegistrationSerializer

#     def post(self, request, *args, **kwargs):
#         serializer = self.get_serializer(data=request.data)
#         serializer.is_valid(raise_exception=True)
#         user = serializer.save()
#         token = RefreshToken.for_user(user)
#         data = serializer.data
#         data["tokens"] = {
#             "refresh": str(token),
#             "access": str(token.access_token),
#         }
#         return Response(data, status=status.HTTP_201_CREATED)


# # User Login API
# class UserLoginAPIView(GenericAPIView):
#     permission_classes = (AllowAny,)
#     serializer_class = UserLoginSerializer

#     def post(self, request, *args, **kwargs):
#         serializer = self.get_serializer(data=request.data)
#         serializer.is_valid(raise_exception=True)
#         user = serializer.validated_data
#         serializer = CustomUserSerializer(user)
#         token = RefreshToken.for_user(user)
#         data = serializer.data
#         data["tokens"] = {
#             "refresh": str(token),
#             "access": str(token.access_token),
#         }
#         return Response(data, status=status.HTTP_200_OK)


# # User Logout API
# class UserLogoutAPIView(GenericAPIView):
#     permission_classes = (IsAuthenticated,)

#     def post(self, request, *args, **kwargs):
#         try:
#             refresh_token = request.data["refresh"]
#             token = RefreshToken(refresh_token)
#             token.blacklist()
#             return Response({"detail": "Successfully logged out"}, status=status.HTTP_200_OK)
#         except Exception as e:
#             return Response({"detail": str(e)}, status=status.HTTP_400_BAD_REQUEST)


# # User Info API
# class UserInfoAPIView(RetrieveAPIView):
#     permission_classes = (IsAuthenticated,)
#     serializer_class = CustomUserSerializer

#     def get_object(self):
#         return self.request.user


# # Email Service View
# from rest_framework.views import APIView


# class SendTestEmailView(APIView):
#     def get(self, request):
#         subject = "Test Email from Mailtrap"
#         message = "This is a test email sent from Mailtrap using Django."
#         from_email = "test@example.com"
#         recipient_list = ["recipient@example.com"]

#         send_mail(subject, message, from_email, recipient_list)
#         return Response({"message": "Test email sent successfully!"}, status=status.HTTP_200_OK)




#for reset password  
import random
from django.core.mail import send_mail
from rest_framework.views import APIView
from rest_framework.generics import GenericAPIView, RetrieveAPIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status
from accounts.models import CustomUser
from .serializers import UserRegistrationSerializer, UserLoginSerializer, CustomUserSerializer

# User Registration API
class UserRegistrationAPIView(GenericAPIView):
    permission_classes = (AllowAny,)
    serializer_class = UserRegistrationSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        token = RefreshToken.for_user(user)
        data = serializer.data
        data["tokens"] = {
            "refresh": str(token),
            "access": str(token.access_token),
        }
        return Response(data, status=status.HTTP_201_CREATED)


# User Login API
class UserLoginAPIView(GenericAPIView):
    permission_classes = (AllowAny,)
    serializer_class = UserLoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        serializer = CustomUserSerializer(user)
        token = RefreshToken.for_user(user)
        data = serializer.data
        data["tokens"] = {
            "refresh": str(token),
            "access": str(token.access_token),
        }
        return Response(data, status=status.HTTP_200_OK)


# User Logout API
class UserLogoutAPIView(GenericAPIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request, *args, **kwargs):
        try:
            refresh_token = request.data["refresh"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response({"detail": "Successfully logged out"}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"detail": str(e)}, status=status.HTTP_400_BAD_REQUEST)


# User Info API
class UserInfoAPIView(RetrieveAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = CustomUserSerializer

    def get_object(self):
        return self.request.user

# Updated ForgotPasswordView
class ForgotPasswordView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get("email")
        if not email:
            return Response({"detail": "Email is required."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = CustomUser.objects.get(email=email)
            otp = str(random.randint(100000, 999999))  # Generate OTP
            user.otp = otp
            user.save()

            # Send OTP email
            send_mail(
                "Password Reset OTP",
                f"Your OTP for password reset is {otp}.",
                "no-reply@example.com",  # Replace with your sender email
                [email],
                fail_silently=False,
            )
            return Response({"message": "OTP sent successfully."}, status=status.HTTP_200_OK)

        except CustomUser.DoesNotExist:
            return Response({"detail": "User with this email does not exist."}, status=status.HTTP_404_NOT_FOUND)

# Updated VerifyOtpView
class VerifyOtpView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        otp = request.data.get("otp")
        if not otp:
            return Response({"detail": "OTP is required."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = CustomUser.objects.get(otp=otp)
            user.otp = None  # Clear OTP after successful verification
            user.save()
            return Response({"message": "OTP verified successfully."}, status=status.HTTP_200_OK)

        except CustomUser.DoesNotExist:
            return Response({"detail": "Invalid OTP."}, status=status.HTTP_400_BAD_REQUEST)

# Updated ResetPasswordView
# Updated ResetPasswordView
class ResetPasswordView(APIView):
    permission_classes = (AllowAny,)

    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")

        if not email:
            return Response({"detail": "Email is required."}, status=status.HTTP_400_BAD_REQUEST)

        if not password:
            return Response({"detail": "Password is required."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = CustomUser.objects.get(email=email)

            # Ensure OTP is already verified before resetting the password
            if user.otp is not None:
                return Response({"detail": "OTP not verified."}, status=status.HTTP_400_BAD_REQUEST)

            # Reset the password
            user.set_password(password)
            user.save()

            return Response({"message": "Password reset successfully."}, status=status.HTTP_200_OK)

        except CustomUser.DoesNotExist:
            return Response(
                {"detail": "User with this email does not exist."},
                status=status.HTTP_404_NOT_FOUND,
            )

    permission_classes = (AllowAny,)

    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")

        try:
            user = CustomUser.objects.get(email=email)
            if user.otp is not None:
                return Response({"detail": "OTP not verified."}, status=status.HTTP_400_BAD_REQUEST)

            user.set_password(password)
            user.save()
            return Response({"message": "Password reset successfully."}, status=status.HTTP_200_OK)

        except CustomUser.DoesNotExist:
            return Response(
                {"detail": "User with this email does not exist."},
                status=status.HTTP_404_NOT_FOUND,
            )


# Send Test Email View
class SendTestEmailView(APIView):
    permission_classes = (AllowAny,)

    def get(self, request):
        subject = "Test Email from Mailtrap"
        message = "This is a test email sent from Mailtrap using Django."
        from_email = "test@example.com"
        recipient_list = ["recipient@example.com"]

        send_mail(subject, message, from_email, recipient_list)
        return Response({"message": "Test email sent successfully!"}, status=status.HTTP_200_OK)
