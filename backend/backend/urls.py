from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt import views as jwt_views
from app import views as app_views

urlpatterns = [
    path('register/', app_views.RegisterView.as_view(), name="register"),
    path('admin/', admin.site.urls),
    path('api/', include('app.urls')),
    path('token/', 
          jwt_views.TokenObtainPairView.as_view(), 
          name ='token_obtain_pair'),
     path('token/refresh/', 
          jwt_views.TokenRefreshView.as_view(), 
          name ='token_refresh'),
     path('token/verify/', jwt_views.TokenVerifyView.as_view(), name='token_verify'),
     path('token/blacklist/', jwt_views.TokenBlacklistView.as_view(), name='token_blacklist')
]
