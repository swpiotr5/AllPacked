from django.urls import path
from . import views

urlpatterns = [
    path('register/', views.RegisterView.as_view(), name="register"),
    path('trip/add', views.AddTripView.as_view(), name="addtrip")
]