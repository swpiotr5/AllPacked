# Użyj oficjalnego obrazu Python jako obrazu bazowego
FROM python:3.10-slim

# Ustaw katalog roboczy
WORKDIR /app

# Skopiuj plik requirements.txt do katalogu roboczego
COPY requirements.txt .

# Zaktualizuj pip do najnowszej wersji
RUN pip install --upgrade pip

# Zainstaluj zależności
RUN pip install -r requirements.txt

# Skopiuj resztę kodu aplikacji do katalogu roboczego
COPY . .

# Ustawienie zmiennej środowiskowej
ENV PYTHONUNBUFFERED=1

ENTRYPOINT ["/app/entrypoint.sh"]
RUN chmod +x /app/entrypoint.sh

# Uruchom aplikację z opóźnieniem startu
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]