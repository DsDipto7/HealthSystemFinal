

from django.contrib import admin
from django.urls import path,include

from django.conf import settings
from django.conf.urls.static import static
from login.views import CandidateLoginView
from register.views import CandidateView

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)



urlpatterns = [
    path("admin/", admin.site.urls),
    #age shudhu api chilo akhon api/accounts kora hoise ,,tai sabdhan thakbe 
    path("api/accounts/", include("accounts.urls")),
#    path("login/", CandidateLoginView.as_view(), name="login"),

    path("candidates/", CandidateView.as_view(), name="candidate-list"),
    path("loginadmin/", CandidateLoginView.as_view(), name="login"),
    path("api/",include('api.urls')),
    path('api/', include('contact.urls')),
    path('ambulance/',include('ambulance.urls')),
    path('ambulance-request/', include('ambulanceRequest.urls')),

    #doctor login
    path('doctor_auth/', include('doctor_auth.urls')),  #for doctor login

    #for doctor self which he can crud all but his license and his email
    
    



    #for payments app 
    # path("payments/", include("payments.urls")), before using payment list in userprofile
    path('api/payments/', include('payments.urls')),  # ✅ Make sure this is added

     
     #for transactions app
    path('transactions/', include('transactions.urls')),  
    
    path('doctor/', include('doctor.urls')),

    #for doctr profile
    # path('doctor-profile/', include('doctor_profile.urls')),  # ✅ Make sure this is added


    ######below these are newly added urls######date:17/05/2025
    #for appoinments
    
   

    
    #token obtain and refresh
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    




]





if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)