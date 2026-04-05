import sys
import os
import traceback

print("--- Diagnostico de Inicio Cipress ---")
print(f"Python version: {sys.version}")
print(f"Current Directory: {os.getcwd()}")

try:
    print("\n1. Probando importacion de 'app'...")
    from app import create_app
    print("   [OK] Importacion exitosa.")

    print("\n2. Probando creacion de la aplicacion...")
    app = create_app()
    print("   [OK] Aplicacion creada exitosamente.")

    print("\n3. Probando conexion a Base de Datos...")
    with app.app_context():
        from app.extensions import db
        from sqlalchemy import text
        db.session.execute(text("SELECT 1")).fetchone()
    print("   [OK] Conexion a Base de Datos exitosa.")

    print("\n4. Verificando Configuracion de Flow...")
    from app.utils.flow import FlowClient
    with app.app_context():
        flow = FlowClient()
        if flow.is_configured():
            print("   [OK] API Keys de Flow detectadas.")
        else:
            print("   [!!!] FALTA CONFIGURACION DE FLOW (FLOW_API_KEY / FLOW_SECRET_KEY)")

    print("\n--- TODO PARECE CORRECTO A NIVEL DE CODIGO ---")
    print("Si sigues viendo error 500, revisa los logs de Apache/Litespeed y los permisos de las carpetas.")

except Exception as e:
    print("\n!!! ERROR DETECTADO !!!")
    print("-" * 50)
    traceback.print_exc()
    print("-" * 50)
