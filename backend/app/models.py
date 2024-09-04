from django.db import models

# Create your models here.
class User(models.Model):
    email = models.CharField(max_length=50)
    password = models.CharField(max_length=50)
    date_created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.email

class Trip(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    country = models.CharField(max_length=50)
    city = models.CharField(max_length=50)
    date = models.DateField()
    duration = models.IntegerField()
    date_created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.country

class Forecast(models.Model):
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
    trip = models.OneToOneField(Trip, on_delete=models.CASCADE)

class PlaceToVisit(models.Model):
    planner = models.ForeignKey(Planner, on_delete=models.CASCADE)
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name
    
class ItemChecklist(models.Model):
    planner = models.OneToOneField(Planner, on_delete=models.CASCADE)

class Item(models.Model):
    item_checklist = models.ForeignKey(ItemChecklist, on_delete=models.CASCADE)
    description = models.CharField(max_length=50)
    is_checked = models.BooleanField()
    is_document = models.BooleanField()
    is_vaccination = models.BooleanField()
    is_medicine = models.BooleanField()

    def __str__(self):
        return self.description

class PackingSuggestions(models.Model):
    item_checklist = models.ForeignKey(ItemChecklist, on_delete=models.CASCADE)
    description = models.CharField(max_length=50)
    is_checked = models.BooleanField()
    is_accepted = models.BooleanField()

    def __str__(self):
        return self.description

class TransportSuggestions(models.Model):
    planner = models.ForeignKey(Planner, on_delete=models.CASCADE)
    suggestion = models.CharField(max_length=50)

    def __str__(self):
        return self.suggestion

class Budget(models.Model):
    trip = models.OneToOneField(Trip, on_delete=models.CASCADE)
    planned_budget = models.FloatField()
    spent_budget = models.FloatField()
    currency = models.CharField(max_length=50)

class Expense(models.Model):
    budget = models.ForeignKey(Budget, on_delete=models.CASCADE)
    description = models.CharField(max_length=50)
    name = models.CharField(max_length=50)
    exp_type = models.CharField(max_length=50)
    amount = models.FloatField()
    date = models.DateField()

    def __str__(self):
        return self.description
