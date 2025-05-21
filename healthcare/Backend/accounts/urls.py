


#for profile and with image upload
from django.urls import path
from .views import (
    UserRegistrationAPIView, UserLoginAPIView, UserLogoutAPIView, UserInfoAPIView,
    ForgotPasswordView, VerifyOtpView, ResetPasswordView, SendTestEmailView,
    UserDetailView, UserUpdateView, UserDeleteView
)

urlpatterns = [
    # Authentication
    path("register/", UserRegistrationAPIView.as_view(), name="register"),
    path("login/", UserLoginAPIView.as_view(), name="login"),
    path("logout/", UserLogoutAPIView.as_view(), name="logout"),
    path("user-info/", UserInfoAPIView.as_view(), name="user-info"),

    # Password Reset via OTP
    path("forgot-password/", ForgotPasswordView.as_view(), name="forgot-password"),
    path("verify-otp/", VerifyOtpView.as_view(), name="verify-otp"),
    path("reset-password/", ResetPasswordView.as_view(), name="reset-password"),

    # Test Email (e.g., via Mailtrap)
    path("send-test-email/", SendTestEmailView.as_view(), name="send-test-email"),

    # User Profile & Payments
    path("profile/", UserDetailView.as_view(), name="user-profile"),
    path("profile/update/", UserUpdateView.as_view(), name="user-update"),
    path("profile/delete/", UserDeleteView.as_view(), name="user-delete"),
    # path("profile/payments/", PaymentHistoryView.as_view(), name="user-payments"),
]
