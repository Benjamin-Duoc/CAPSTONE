from app import create_app
from app.extensions import db

app = create_app()
with app.app_context():
    print("🗑️ Borrando todas las tablas...")
    db.drop_all()
    print("✅ Tablas borradas.")
    print("🏗️ Recreando tablas...")
    db.create_all()
    print("✅ Tablas recreadas.")
