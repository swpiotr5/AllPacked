from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from .models import User
from .serializers import UserSerializer
from .models import Trip
from .serializers import RegisterSerializer
from .serializers import TripSerializer
from .serializers import BudgetSerializer
from rest_framework import status
from django.db import transaction
from datetime import datetime, timedelta

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
    
class AddTripView(APIView):
    def create_trip(self, trip_data, user):
        if user is None:
            return None
        trip_data['user'] = user.id
        trip_serializer = TripSerializer(data=trip_data)
        
        if trip_serializer.is_valid():
            self.trip = trip_serializer.save()  
            return self.trip
        else:
            return trip_serializer.errors
        
    def create_budget(self, budget_data):
        if not hasattr(self, 'trip'):
            return {"error": "Trip was not created successfully"}
        
        budget_data.update({'trip': self.trip.trip_id}) 
        budget_serializer = BudgetSerializer(data=budget_data)
        
        if budget_serializer.is_valid():
            budget_serializer.save()
            return True
        else:
            print("Errors:", budget_serializer.errors)  
            return budget_serializer.errors
        
    def post(self, request):
        trip_data = request.data.get('trip')
        budget_data = request.data.get('budget')
            
        user = request.user 
        if user is None:
            return Response({"error": "User not authenticated"}, status=status.HTTP_401_UNAUTHORIZED)

        try:
            with transaction.atomic():
                trip = self.create_trip(trip_data, user)
                if not trip:
                    return Response({"error": "Invalid trip data", "details": trip}, status=status.HTTP_400_BAD_REQUEST)
                
                self.create_budget(budget_data)
                
            return Response({"message": "Records added successfully"}, status=status.HTTP_201_CREATED)
        
        except Exception as e:
            print("Error:", str(e))  
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class GetTripsView(APIView):
    def get(self, request):
        user = request.user
        if user.is_authenticated:
            trips = Trip.objects.filter(user=user)
            valid_trips = []
            current_date = datetime.now().date()

            for trip in trips:
                end_date = trip.date + timedelta(days=trip.tripDuration)
                if end_date >= current_date:
                    valid_trips.append(trip)

            serializer = TripSerializer(valid_trips, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response({"error": "User not authenticated"}, status=status.HTTP_401_UNAUTHORIZED)