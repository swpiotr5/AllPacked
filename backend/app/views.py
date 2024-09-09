from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import User
from .serializers import UserSerializer

# User APIs

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
            trip_serializer = TripSerializer(data=trip_data)
            if trip_serializer.is_valid():
                trip = trip_serializer.save()
                planner_data = {'trip': trip.id}
                planner_serializer = PlannerSerializer(data=planner_data)
                if planner_serializer.is_valid():
                    planner_serializer.save()
                else:
                    return Response(planner_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
                budget_data.update({'trip': trip.id})
                budget_serializer = BudgetSerializer(data=budget_data)
                if budget_serializer.is_valid():
                    budget_serializer.save()
                else:
                    return Response(budget_serializer.errors, status=status.HTTP_400_BAD_REQUEST)        
        return HttpResponse("Records added successfully")
    except Exception as e:
        return HttpResponse("Error updating records: " + str(e))

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


