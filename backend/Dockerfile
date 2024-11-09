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

# Skopiuj skrypt wait-for-it.sh
COPY wait-for-it.sh /wait-for-it.sh

# Ustawienie zmiennej środowiskowej
ENV PYTHONUNBUFFERED=1

# Uruchom aplikację z opóźnieniem startu
CMD ["./wait-for-it.sh", "${PG_HOST}:${PG_PORT}", "--", "python", "manage.py", "runserver", "0.0.0.0:8000"]