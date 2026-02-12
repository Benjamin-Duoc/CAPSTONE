# run.py
from app import create_app
from app.config import current_config
from datetime import datetime
import os

def print_banner():
    env = os.environ.get('FLASK_ENV', 'development')
    is_production = env == 'production'
    
    print("\n" + "="*70)
    print("🚀 CIPRESS BACKEND INICIANDO...")
    print("="*70)
    print(f"📅 Hora de inicio: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print(f"🌐 URL: http://{current_config.HOST}:{current_config.PORT}")
    print(f"🔗 Frontend: {'https://www.cipress.cl' if is_production else 'http://localhost:3000'}")
    print(f"📁 Entorno: {'Producción' if is_production else 'Desarrollo'}")
    print(f"🔧 Debug: {'Activado' if current_config.DEBUG else 'Desactivado'}")
    print("="*70 + "\n")

def print_routes(app):
    print("📌 ENDPOINTS DISPONIBLES:")
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
   