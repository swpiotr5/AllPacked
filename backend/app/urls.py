from django.urls import path
from . import views

urlpatterns = [
    path('register/', views.RegisterView.as_view(), name="register"),
    path('all_users', views.getUsers),
    path('user/<str:pk>', views.getUser),
    path('create_user', views.addUser),
    path('update_user/<str:pk>', views.updateUser),
    path('delete_user/<str:pk>', views.deleteUser),
]