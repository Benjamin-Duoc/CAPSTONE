from app import create_app
from app.models.all_models import User
from app.extensions import db
import sys

def change_role(email, new_role):
    app = create_app()
    with app.app_context():
        user = User.query.filter_by(email=email).first()
        if not user:
            print(f"User {email} not found.")
            return
        
        user.role = new_role
        db.session.commit()
        print(f"User {email} role changed to {new_role} successfully.")

if __name__ == '__main__':
    if len(sys.argv) > 2:
        change_role(sys.argv[1], sys.argv[2])
    else:
        print("Usage: python change_role.py <email> <new_role>")
