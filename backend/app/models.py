from django.db import models
from django.contrib.auth.models import User

class Trip(models.Model):
    trip_id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    accommodation = models.CharField(max_length=50)
    country = models.CharField(max_length=50)
    city = models.CharField(max_length=50)
    date = models.DateField()
    tripName = models.CharField(max_length=50)
    tripDuration = models.IntegerField()
    tripPreferences = models.CharField(max_length=50)
    date_created = models.DateTimeField(auto_now_add=True)

class Budget(models.Model):
    budget_id = models.AutoField(primary_key=True)
    trip = models.OneToOneField(Trip, on_delete=models.CASCADE)
    plannedBudget = models.FloatField()
    spentBudget = models.FloatField(null=True, blank=True)
    currency = models.CharField(max_length=50)

class Forecast(models.Model):
    forecast_id = models.AutoField(primary_key=True)
    trip = models.ForeignKey(Trip, on_delete=models.CASCADE)
    location = models.CharField(max_length=50)
    weather_description = models.CharField(max_length=50)
    wind = models.FloatField()
    pressure = models.FloatField()
    temperature = models.FloatField()
    humidity = models.FloatField()
    rain = models.FloatField()
    is_current = models.BooleanField()
    sunset = models.CharField(max_length=50)
    sunrise = models.CharField(max_length=50)
    weather_icon = models.CharField(max_length=50)

    def __str__(self):
        return self.location

class Planner(models.Model):
    planner_id = models.AutoField(primary_key=True)
    trip = models.OneToOneField(Trip, on_delete=models.CASCADE)

class PlaceToVisit(models.Model):
    place_to_visit_id = models.AutoField(primary_key=True)
    planner = models.ForeignKey(Planner, on_delete=models.CASCADE)
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name

class ItemChecklist(models.Model):
    item_checklist_id = models.AutoField(primary_key=True)
    planner = models.OneToOneField(Planner, on_delete=models.CASCADE)

class Item(models.Model):
    item_id = models.AutoField(primary_key=True)
    item_checklist = models.ForeignKey(ItemChecklist, on_delete=models.CASCADE)
    description = models.CharField(max_length=50)
    is_checked = models.BooleanField()
    is_document = models.BooleanField()
    is_vaccination = models.BooleanField()
    is_medicine = models.BooleanField()

    def __str__(self):
        return self.description

class PackingSuggestions(models.Model):
    packing_suggestion_id = models.AutoField(primary_key=True)
    item_checklist = models.ForeignKey(ItemChecklist, on_delete=models.CASCADE)
    description = models.CharField(max_length=50)
    is_checked = models.BooleanField()
    is_accepted = models.BooleanField()

    def __str__(self):
        return self.description

class TransportSuggestions(models.Model):
    transport_suggestion_id = models.AutoField(primary_key=True)
    planner = models.ForeignKey(Planner, on_delete=models.CASCADE)
    suggestion = models.CharField(max_length=50)

    def __str__(self):
        return self.suggestion

class Expense(models.Model):
    expense_id = models.AutoField(primary_key=True)
    budget = models.ForeignKey(Budget, on_delete=models.CASCADE)
    description = models.CharField(max_length=50)
    name = models.CharField(max_length=50)
    exp_type = models.CharField(max_length=50)
    amount = models.FloatField()
    date = models.DateField()

    def __str__(self):
        return self.description