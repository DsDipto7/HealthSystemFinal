from django.urls import path
from .views import *
from rest_framework_simplejwt.views import TokenRefreshView
#for   mailtrap



urlpatterns = [
    # path("register/", UserRegistrationAPIView.as_view(), name="register-user"),
    # path("login/", UserLoginAPIView.as_view(), name="login-user"),
    # path("logout/", UserLogoutAPIView.as_view(), name="logout-user"),
    # path("token/refresh/", TokenRefreshView.as_view(), name="token-refresh"),
    # path("profile/", UserInfoAPIView.as_view(), name="user-detail"),
    # path("user/", UserInfoAPIView.as_view(), name="user-info"),
    # path("send-test-email/", SendTestEmailView.as_view(), name="send-test-email"),



   path("register/", UserRegistrationAPIView.as_view(), name="register"),
    path("login/", UserLoginAPIView.as_view(), name="login"),
    path("logout/", UserLogoutAPIView.as_view(), name="logout"),
    path("user-info/", UserInfoAPIView.as_view(), name="user-info"),
    path("forgot-password/", ForgotPasswordView.as_view(), name="forgot-password"),
    path("verify-otp/", VerifyOtpView.as_view(), name="verify-otp"),
    path("reset-password/", ResetPasswordView.as_view(), name="reset-password"),
    path("send-test-email/", SendTestEmailView.as_view(), name="send-test-email"),
    

 
 
 ]
