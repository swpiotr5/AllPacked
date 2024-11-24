from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from .models import User
from .serializers import UserSerializer
from .models import Trip
from .serializers import RegisterSerializer
from .serializers import ExpenseSerializer
from .models import Budget
from .models import ItemChecklist
from .models import Planner
from .models import PlaceToVisit
from .models import Expense
from .models import TransportSuggestions
from .models import Item
from .serializers import TripSerializer
from .serializers import ItemSerializer
from .serializers import BudgetSerializer
from .serializers import PlaceToVisitSerializer
from .serializers import TransportSuggestionsSerializer
from rest_framework import status
from django.db import transaction
from datetime import datetime, timedelta
from concurrent.futures import ThreadPoolExecutor, as_completed
from .services.openai_service import OpenAIService 
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
        
    def create_planner(self):
        if not hasattr(self, 'trip'):
            return {"error": "Trip was not created successfully"}
        
        planner = Planner.objects.create(trip=self.trip)
        self.planner = planner
        return planner
        
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
        
    def create_places_to_visit_suggestions(self, trip_data):
        openai_service = OpenAIService()
        response = openai_service.generate_places_to_visit_suggestions(trip_data)
        formatted_suggestions = openai_service.format_places_to_visit_suggestions(response)
        
        errors = []
        for suggestion in formatted_suggestions:
            suggestion['planner'] = self.planner.planner_id
            places_to_visit_serializer = PlaceToVisitSerializer(data=suggestion)
            if places_to_visit_serializer.is_valid():
                places_to_visit_serializer.save()
            else:
                errors.append(places_to_visit_serializer.errors)
        
        if errors:
            print("Errors:", errors)
            return {"errors": errors}
        return True
    
    def create_transport_suggestions(self, trip_data):
        openai_service = OpenAIService()
        response = openai_service.generate_transportation_suggestions(trip_data)
        formatted_suggestions = openai_service.format_transportation_suggestions(response)

        errors = []
        for suggestion in formatted_suggestions:
            suggestion['planner'] = self.planner.planner_id
            transport_suggestions_serializer = TransportSuggestionsSerializer(data=suggestion)
            if transport_suggestions_serializer.is_valid():
                transport_suggestions_serializer.save()
            else:
                errors.append(transport_suggestions_serializer.errors)

        if errors:
            return {"errors": errors}
        return True

    def create_packing_suggestions(self, trip_data):
        openai_service = OpenAIService()
        response = openai_service.generate_packing_suggestions(trip_data)
        formatted_suggestions = openai_service.format_packing_suggestions(response)

        if not hasattr(self, 'planner'):
            return {"error": "Planner was not created successfully"}

        item_checklist = ItemChecklist.objects.create(planner=self.planner)

        errors = []
        for suggestion in formatted_suggestions:
            suggestion['item_checklist'] = item_checklist.item_checklist_id
            suggestion.setdefault('is_checked', False)
            item_serializer = ItemSerializer(data=suggestion)
            if item_serializer.is_valid():
                item_serializer.save()
            else:
                errors.append(item_serializer.errors)

        if errors:
            return {"errors": errors}
        return True
    
    def post(self, request):
        trip_data = request.data.get('trip')
        budget_data = request.data.get('budget')
            
        user = request.user
        trip = self.create_trip(trip_data, user)
        
        if isinstance(trip, Trip):
            planner = self.create_planner()
            if isinstance(planner, dict) and 'error' in planner:
                return Response(planner, status=status.HTTP_400_BAD_REQUEST)
            
            budget_result = self.create_budget(budget_data)
            if budget_result is not True:
                return Response(budget_result, status=status.HTTP_400_BAD_REQUEST)
            
            with ThreadPoolExecutor() as executor:
                futures = {
                    executor.submit(self.create_places_to_visit_suggestions, trip_data): 'places',
                    executor.submit(self.create_transport_suggestions, trip_data): 'transport',
                    executor.submit(self.create_packing_suggestions, trip_data): 'packing'
                }
                
                results = {}
                for future in as_completed(futures):
                    task_name = futures[future]
                    try:
                        result = future.result()
                        if isinstance(result, dict) and 'errors' in result:
                            return Response(result, status=status.HTTP_400_BAD_REQUEST)
                        results[task_name] = result
                    except Exception as e:
                        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            
            response_data = TripSerializer(trip).data
            return Response(response_data, status=status.HTTP_201_CREATED)
        else:
            return Response(trip, status=status.HTTP_400_BAD_REQUEST)
        
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
        
class GetBudgetView(APIView):
    def get(self, request):
        user = request.user
        tripName = request.query_params.get('tripName')
        if user.is_authenticated:
            trip = Trip.objects.filter(user=user, tripName=tripName).first()
            if trip:
                try:
                    budget = Budget.objects.get(trip=trip)
                    budget_data = {
                        'plannedBudget': budget.plannedBudget,
                        'spentBudget': budget.spentBudget,
                        'currency': budget.currency,
                    }
                    return Response(budget_data, status=status.HTTP_200_OK)
                except Budget.DoesNotExist:
                    return Response({"error": "Budget not found for this trip"}, status=status.HTTP_404_NOT_FOUND)
            else:
                return Response({"error": "Trip not found"}, status=status.HTTP_404_NOT_FOUND)
        else:
            return Response({"error": "User not authenticated"}, status=status.HTTP_401_UNAUTHORIZED)
        
class AddExpenseView(APIView):
    def create_expense(self, expense_data, budget):
        context = {'budget': budget}
        expense_serializer = ExpenseSerializer(data=expense_data, context=context)
        
        if expense_serializer.is_valid():
            expense = expense_serializer.save()
            budget.spentBudget = (budget.spentBudget or 0) + expense.amount
            budget.save()
            return True
        else:
            print("Errors:", expense_serializer.errors)  
            return expense_serializer.errors
        
    def post(self, request):
        user = request.user
        expense_data = request.data.get('expense')
        tripName = request.data.get('tripName')

        if user.is_authenticated:
            trip = Trip.objects.filter(user=user, tripName=tripName).first()
            if trip:
                try:
                    budget = Budget.objects.get(trip=trip)
                    if budget:
                        expense = self.create_expense(expense_data, budget)
                        if expense is True:
                            return Response({"success": "Expense added successfully"}, status=status.HTTP_201_CREATED)
                        else:
                            return Response({"error": "Invalid expense data", "details": expense}, status=status.HTTP_400_BAD_REQUEST)
                except Budget.DoesNotExist:
                    return Response({"error": "Budget not found for this trip"}, status=status.HTTP_404_NOT_FOUND)
            else:
                return Response({"error": "Trip not found"}, status=status.HTTP_404_NOT_FOUND)
        else:
            return Response({"error": "User not authenticated"}, status=status.HTTP_401_UNAUTHORIZED)
        
class GetExpensesView(APIView):
    def get(self, request):
        user = request.user
        tripName = request.query_params.get('tripName')
        if user.is_authenticated:
            trip = Trip.objects.filter(user=user, tripName=tripName).first()
            if trip:
                try:
                    budget = Budget.objects.get(trip=trip)
                    if budget:
                        expenses = Expense.objects.filter(budget=budget)
                        expenses_data = ExpenseSerializer(expenses, many=True).data
                        return Response(expenses_data, status=status.HTTP_200_OK)
                except Budget.DoesNotExist:
                    return Response({"error": "Budget not found for this trip"}, status=status.HTTP_404_NOT_FOUND)
            else:
                return Response({"error": "Trip not found"}, status=status.HTTP_404_NOT_FOUND)
        else:
            return Response({"error": "User not authenticated"}, status=status.HTTP_401_UNAUTHORIZED)
        
class ModifyExpenseView(APIView):
    def put(self, request):
            user = request.user
            expense_data = request.data
            expense_id = expense_data.get('expense_id')
            
            if user.is_authenticated:
                try:
                    expense = Expense.objects.get(expense_id=expense_id, budget__trip__user=user)
                    old_amount = expense.amount
                    expense_serializer = ExpenseSerializer(expense, data=expense_data, partial=True)
                    if expense_serializer.is_valid():
                        expense = expense_serializer.save()
                        budget = expense.budget
                        amount_difference = expense.amount - old_amount
                        budget.spentBudget = (budget.spentBudget or 0) + amount_difference
                        budget.save()
                        return Response(expense_serializer.data, status=status.HTTP_200_OK)
                    else:
                        return Response(expense_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
                except Expense.DoesNotExist:
                    return Response({"error": "Expense not found"}, status=status.HTTP_404_NOT_FOUND)
            else:
                return Response({"error": "User not authenticated"}, status=status.HTTP_401_UNAUTHORIZED)
            
class GetPlacesView(APIView):
    def get(self, request):
        user = request.user
        tripName = request.query_params.get('tripName')
        if user.is_authenticated:
            trip = Trip.objects.filter(user=user, tripName=tripName).first()
            if trip:
                try:
                    planner = Planner.objects.get(trip=trip)
                    if planner:
                        places = PlaceToVisit.objects.filter(planner=planner)
                        places_data = PlaceToVisitSerializer(places, many=True).data
                        return Response(places_data, status=status.HTTP_200_OK)
                except Planner.DoesNotExist:
                    return Response({"error": "Planner not found for this trip"}, status=status.HTTP_404_NOT_FOUND)
            else:
                return Response({"error": "Trip not found"}, status=status.HTTP_404_NOT_FOUND)
        else:
            return Response({"error": "User not authenticated"}, status=status.HTTP_401_UNAUTHORIZED)

class GetTransportMeansView(APIView):
    def get(self, request):
        user = request.user
        tripName = request.query_params.get('tripName')
        if user.is_authenticated:
            trip = Trip.objects.filter(user=user, tripName=tripName).first()
            if trip:
                try:
                    planner = Planner.objects.get(trip=trip)
                    if planner:
                        transport_means = TransportSuggestions.objects.filter(planner=planner)
                        transport_means_data = TransportSuggestionsSerializer(transport_means, many=True).data
                        return Response(transport_means_data, status=status.HTTP_200_OK)
                except Planner.DoesNotExist:
                    return Response({"error": "Planner not found for this trip"}, status=status.HTTP_404_NOT_FOUND)
            else:
                return Response({"error": "Trip not found"}, status=status.HTTP_404_NOT_FOUND)
        else:
            return Response({"error": "User not authenticated"}, status=status.HTTP_401_UNAUTHORIZED)

class GetItemsView(APIView):
    def get(self, request):
        user = request.user
        tripName = request.query_params.get('tripName')
        if user.is_authenticated:
            trip = Trip.objects.filter(user=user, tripName=tripName).first()
            if trip:
                try:
                    planner = Planner.objects.get(trip=trip)
                    if planner:
                        items_checklist = ItemChecklist.objects.filter(planner=planner).first()
                        if items_checklist:
                            items = Item.objects.filter(item_checklist=items_checklist)
                            items_serializer = ItemSerializer(items, many=True)
                            return Response(items_serializer.data, status=status.HTTP_200_OK)
                        else:
                            return Response({"error": "Item checklist not found for this planner"}, status=status.HTTP_404_NOT_FOUND)
                except Planner.DoesNotExist:
                    return Response({"error": "Planner not found for this trip"}, status=status.HTTP_404_NOT_FOUND)
            else:
                return Response({"error": "Trip not found"}, status=status.HTTP_404_NOT_FOUND)
        else:
            return Response({"error": "User not authenticated"}, status=status.HTTP_401_UNAUTHORIZED)
        
class ModifyItemStatusView(APIView):
    def put(self, request):
            user = request.user
            item_data = request.data
            item_id = item_data.get('item_id')
            
            if user.is_authenticated:
                try:
                    item = Item.objects.get(item_id=item_id, item_checklist__planner__trip__user=user)
                    item_serializer = ItemSerializer(item, data=item_data, partial=True)
                    if item_serializer.is_valid():
                        item = item_serializer.save()
                        return Response(item_serializer.data, status=status.HTTP_200_OK)
                    else:
                        return Response(item_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
                except Item.DoesNotExist:
                    return Response({"error": "Item not found"}, status=status.HTTP_404_NOT_FOUND)
            else:
                return Response({"error": "User not authenticated"}, status=status.HTTP_401_UNAUTHORIZED)
            
class AddNewItemView(APIView):
    def post(self, request):
        user = request.user
        item_data = request.data
        tripName = item_data.pop('tripName', None)

        if user.is_authenticated:
            trip = Trip.objects.filter(user=user, tripName=tripName).first()
            if trip:
                try:
                    planner = Planner.objects.get(trip=trip)
                    if planner:
                        items_checklist = ItemChecklist.objects.filter(planner=planner).first()
                        if items_checklist:
                            item_data['item_checklist'] = items_checklist.item_checklist_id
                            item_serializer = ItemSerializer(data=item_data)
                            if item_serializer.is_valid():
                                item_serializer.save()
                                return Response(item_serializer.data, status=status.HTTP_201_CREATED)
                            else:
                                return Response(item_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
                        else:
                            return Response({"error": "Item checklist not found for this planner"}, status=status.HTTP_404_NOT_FOUND)
                except Planner.DoesNotExist:
                    return Response({"error": "Planner not found for this trip"}, status=status.HTTP_404_NOT_FOUND)
            else:
                return Response({"error": "Trip not found"}, status=status.HTTP_404_NOT_FOUND)
        else:
            return Response({"error": "User not authenticated"}, status=status.HTTP_401_UNAUTHORIZED)