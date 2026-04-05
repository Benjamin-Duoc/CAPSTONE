from app import create_app
from app.models.all_models import User
import sys

def find_user(name):
    app = create_app()
    with app.app_context():
        users = User.query.filter((User.first_name.ilike(f"%{name}%")) | (User.email.ilike(f"%{name}%"))).all()
        if not users:
            print(f"No user found matching '{name}'.")
            return
        
        print(f"{'ID':<5} | {'Email':<30} | {'Name':<20} | {'Role':<20}")
        print("-" * 80)
        for u in users:
            print(f"{u.id:<5} | {u.email:<30} | {u.first_name + ' ' + u.last_name:<20} | {u.role:<20}")

if __name__ == '__main__':
    if len(sys.argv) > 1:
        find_user(sys.argv[1])
    else:
        print("Usage: python find_user.py <name_or_email>")
