from app import create_app
from app.models.all_models import User
from app.extensions import db

app = create_app()
with app.app_context():
    users = User.query.order_by(User.id.desc()).limit(5).all()
    for u in users:
        print(f"ID: {u.id}, Email: '{u.email}', Role: {u.role}")
