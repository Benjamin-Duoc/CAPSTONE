import sys
import os

# Añadir el directorio actual al path para asegurar que 'app' se encuentre
sys.path.insert(0, os.path.dirname(__file__))

# Importar la aplicación de Flask desde run.py
from run import app as application

# El objeto 'application' es lo que Passenger busca por defecto
