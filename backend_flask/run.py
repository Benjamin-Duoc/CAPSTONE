# run.py
from app import create_app
from datetime import datetime

def print_banner():
    print("\n" + "="*70)
    print("🚀 CIPRESS BACKEND INICIANDO...")
    print("="*70)
    print(f"📅 Hora de inicio: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print(f"🌐 URL: http://localhost:5000")
    print(f"🔗 Frontend: http://localhost:3000")
    print(f"📁 Entorno: {'Producción' if not __debug__ else 'Desarrollo'}")
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
    
    # Iniciar servidor
    app.run(
        host='0.0.0.0',
        port=5000,
        debug=True
    )   