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
            attrs['username'] = email.split('@')[0]

        return attrs

    def create(self, validated_data):
        # Haszowanie hasła przed zapisaniem
        password = validated_data.pop('password', None)
        hashed_password = make_password(password)
        
        # Tworzenie użytkownika z odpowiednimi danymi
        user = User.objects.create(password=hashed_password, **validated_data)
        return user


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class TripSerializer(serializers.ModelSerializer):
    class Meta:
        model = Trip
        fields = '__all__'

class ForecastSerializer(serializers.ModelSerializer):
    class Meta:
        model = Forecast
        fields = '__all__'

class PlannerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Planner
        fields = '__all__'

class PlaceToVisitSerializer(serializers.ModelSerializer):
    class Meta:
        model = PlaceToVisit
        fields = '__all__'

class ItemChecklistSerializer(serializers.ModelSerializer):
    class Meta:
        model = ItemChecklist
        fields = '__all__'

class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = '__all__'
    
class PackingSuggestionsSerializer(serializers.ModelSerializer):
    class Meta:
        model = PackingSuggestions
        fields = '__all__'

class TransportSuggestionsSerializer(serializers.ModelSerializer):
    class Meta:
        model = TransportSuggestions
        fields = '__all__'
    
class ExpenseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Expense
        fields = '__all__'

class BudgetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Budget
        fields = '__all__'

