from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from django.contrib.auth.password_validation import validate_password
from django.contrib.auth import authenticate
from django.contrib.auth.hashers import make_password, check_password
from django.contrib.auth.models import User
from .models import *

from django.contrib.auth.models import User
from rest_framework import serializers
from django.contrib.auth.hashers import make_password
from rest_framework.validators import UniqueValidator

class RegisterSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
        required=True,
        validators=[UniqueValidator(queryset=User.objects.all())]
    )
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    confirm_password = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ('id', 'email', 'password', 'confirm_password')

    def validate(self, attrs):
        email = attrs.get('email')
        
        if User.objects.filter(email=email).exists():
            raise serializers.ValidationError({"email": "User with this email already exists."})
        
        if attrs['password'] != attrs['confirm_password']:
            raise serializers.ValidationError({"password": "Provided password does not match with confirm password."})

        attrs.pop('confirm_password', None)

        if not attrs.get('username'):
            attrs['username'] = email

        return attrs

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        hashed_password = make_password(password)
        
        user = User.objects.create(password=hashed_password, **validated_data)
        return user


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class TripSerializer(serializers.ModelSerializer):
    class Meta:
        model = Trip
        fields = ['accommodation', 'country', 'city', 'date', 'tripName', 'tripDuration', 'tripPreferences', 'user']

class PlannerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Planner
        fields = '__all__'

class PlaceToVisitSerializer(serializers.ModelSerializer):
    class Meta:
        model = PlaceToVisit
        fields = ['place_to_visit_id', 'planner', 'name', 'type', 'cost', 'duration', 'priority', 'description', 'tips']

class TransportSuggestionsSerializer(serializers.ModelSerializer):
    class Meta:
        model = TransportSuggestions
        fields = ['transport_suggestion_id', 'planner', 'name', 'affordability', 'approximate_cost', 'advantages', 'disadvantages', 'recommendation']

class ItemChecklistSerializer(serializers.ModelSerializer):
    class Meta:
        model = ItemChecklist
        fields = ['item_checklist_id', 'planner']

class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = ['item_id', 'item_checklist', 'name', 'is_checked', 'is_document', 'is_vaccination']

class ExpenseSerializer(serializers.ModelSerializer):
    budget = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Expense
        fields = ['expense_id', 'budget', 'description', 'name', 'exp_type', 'amount', 'date']

    def create(self, validated_data):
        budget = self.context.get('budget')
        if not budget:
            raise serializers.ValidationError({"budget": "This field is required."})
        
        validated_data['budget'] = budget
        return Expense.objects.create(**validated_data)


class BudgetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Budget
        fields = ['plannedBudget', 'spentBudget', 'currency', 'trip']
        extra_kwargs = {
            'spentBudget': {'required': False},  
        }

