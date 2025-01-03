from django.urls import path
from . import views

urlpatterns = [
    path('register/', views.RegisterView.as_view(), name="register"),
    path('trip/add', views.AddTripView.as_view(), name="addtrip"),
    path("trip/getall", views.GetTripsView.as_view(), name="getalltrips"),
    path("trip/getbudget", views.GetBudgetView.as_view(), name="getbudget"),
    path("trip/addexpense", views.AddExpenseView.as_view(), name="addexpense"),
    path("trip/getallexpenses", views.GetExpensesView.as_view(), name="getallexpenses"),
    path("trip/putexpense", views.ModifyExpenseView.as_view(), name="putexpense"),
    path("trip/getplaces", views.GetPlacesView.as_view(), name="getplaces"),
    path("trip/gettransportmeans", views.GetTransportMeansView.as_view(), name="gettransportmeans"),
    path("trip/getitems", views.GetItemsView.as_view(), name="getitems"),
    path("trip/putitem", views.ModifyItemStatusView.as_view(), name="putitem"),
    path("trip/additem", views.AddNewItemView.as_view(), name="additem")
]