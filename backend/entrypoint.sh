#!/bin/bash
echo "Create migrations"
python manage.py makemigrations backend

echo "Apply migrations"
python manage.py migrate

echo "Run server"
python manage.py runserver 0.0.0.0:8000