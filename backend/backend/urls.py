from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt import views as jwt_views
from app import views as app_views

urlpatterns = [
    path('register/', app_views.RegisterView.as_view(), name="register"),
    path('trip/add', app_views.AddTripView.as_view(), name="addtrip"),
    path("trip/getall", app_views.GetTripsView.as_view(), name="getalltrips"),
    path("trip/getbudget", app_views.GetBudgetView.as_view(), name="getbudget"),
    path("trip/addexpense", app_views.AddExpenseView.as_view(), name="addexpense"),
    path("trip/getallexpenses", app_views.GetExpensesView.as_view(), name="getallexpenses"),
    path("trip/putexpense", app_views.ModifyExpenseView.as_view(), name="putexpense"),
    path("trip/getplaces", app_views.GetPlacesView.as_view(), name="getplaces"),
    path("trip/gettransportmeans", app_views.GetTransportMeansView.as_view(), name="gettransportmeans"),
    path("trip/getitems", app_views.GetItemsView.as_view(), name="getitems"),
    path("trip/putitem", app_views.ModifyItemStatusView.as_view(), name="putitem"),
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
