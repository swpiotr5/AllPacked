from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from .models import User
from .serializers import UserSerializer
from .serializers import RegisterSerializer
from rest_framework import status
from django.db import transaction

# User APIs

class RegisterView(APIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

@api_view(['GET'])
def getUsers(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getUser(request, pk):
    user = User.objects.get(id=pk)
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)

@api_view(['POST'])
def addUser(request):
    serializer = UserSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)

@api_view(['PUT'])
def updateUser(request, pk):
    user = User.objects.get(id=pk)
    serializer = UserSerializer(instance=user, data=request.data)

    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)

@api_view(['DELETE'])
def deleteUser(request, pk):
    user = User.objects.get(id=pk)
    user.delete()

    return Response('User removed.')

#Trip APIs with creating budget, planner and item checklist

@api_view(['GET'])
def getUserTrips(request, user_id):
    user_trips = Trip.objects.filter(user = user_id)
    serializer = TripSerializer(trips, many=True)

    return Response(serializer.data)

@api_view(['PUT'])
def addTrip(request):
    trip_data = request.data.get('trip')
    budget_data = request.data.get('budget')

    try:
        with transaction.atomic():
            # Trip creation
            trip_serializer = TripSerializer(data=trip_data)
            if trip_serializer.is_valid():
                trip = trip_serializer.save()
            else:
                return Response(trip_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

            # Planner creation
            planner_data = {'trip': trip}
            planner_serializer = PlannerSerializer(data=planner_data)
            if planner_serializer.is_valid():
                planner = planner_serializer.save()
            else:
                return Response(planner_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

            # Budget creation
            budget_data.update({'trip': trip}) 
            budget_serializer = BudgetSerializer(data=budget_data)
            if budget_serializer.is_valid():
                budget_serializer.save()
            else:
                return Response(budget_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

            # Item Checklist creation
            item_checklist_data = {'planner': planner}  
            item_checklist_serializer = ItemChecklistSerializer(data=item_checklist_data)
            if item_checklist_serializer.is_valid():
                item_checklist_serializer.save()
            else:
                return Response(item_checklist_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        return Response({"message": "Records added successfully"}, status=status.HTTP_201_CREATED)
    
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

#Forecast API

@api_view(['GET'])
def getForecastsByTripId(request, trip_id):
    forecasts_by_trip = Forecast.objects.filter(trip = trip_id)
    serializer = ForecastSerializer(forecasts_by_trip, many=True)

    return Response(serializer.data)

@api_view(['PUT'])
def addForecast(request):
    serializer = ForecastSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)


#Expense API

@api_view(['PUT'])
def addExpenseByBudgetId(request):
    expense_serializer = ExpenseSerializer(data=request.data)

    if expense_serializer.is_valid():
        expense_serializer.save()
    else:
        return Response(expense_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    return Response({"message": "Records added successfully"}, status=status.HTTP_201_CREATED)

@api_view(['GET'])
def getExpensesByBudgetId(request, budget_id):
    expense_by_budget = Expense.objects.filter(budget = budget_id)
    serializer = ExpenseSerializer(expense_by_budget, many=True)

    return Response(serializer.data)

#Item API

@api_view(['PUT'])
def addItemByChecklistId(request):
    item_serializer = ItemSerializer(data=request.data)

    if item_serializer.is_valid():
        item_serializer.save()
    else:
        return Response(item_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    return Response({"message": "Records added successfully"}, status=status.HTTP_201_CREATED)

@api_view(['GET'])
def getItemsByChecklistId(request, item_checklist_id):
    item_by_checklist = Item.objects.filter(item_checklist = item_checklist_id)
    serializer = ItemSerializer(item_by_checklist, many=True)

    return Response(serializer.data)
