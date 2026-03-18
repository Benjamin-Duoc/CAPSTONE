from app import create_app
from app.models.all_models import User
from app.extensions import db
import sys

def promote_user(email):
    app = create_app()
    with app.app_context():
        user = User.query.filter_by(email=email).first()
        if not user:
            print(f"User {email} not found.")
            return
        
        user.role = 'Colaborador Premium'
        db.session.commit()
        print(f"User {email} promoted to Colaborador Premium successfully.")

if __name__ == '__main__':
    if len(sys.argv) > 1:
        promote_user(sys.argv[1])
    else:
        print("Usage: python promote_user.py <email>")
