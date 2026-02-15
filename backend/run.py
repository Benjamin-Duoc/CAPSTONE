# run.py
from app import create_app
from app.config import current_config
from datetime import datetime
import os

def print_banner():
    env = os.environ.get('FLASK_ENV', 'development')
    is_production = env == 'production'

def print_routes(app):
    for rule in app.url_map.iter_rules():
        if rule.endpoint != 'static':
            methods = ','.join(sorted(rule.methods - {'HEAD', 'OPTIONS'}))
            print(f"  • {methods:6} {rule.rule}")
    print()

if __name__ == '__main__':
    # Mostrar banner antes de crear la app
    print_banner()

    # Crear aplicación
    app = create_app()
    
    # Mostrar rutas después de crear la app
    print_routes(app)
    
    # Iniciar servidor con configuración del entorno
    app.run(
        host=current_config.HOST,
        port=current_config.PORT,
        debug=current_config.DEBUG
    )
   