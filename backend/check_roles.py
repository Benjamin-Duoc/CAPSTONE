from app import create_app
from app.models.all_models import User
import sys

def check_user_roles():
    app = create_app()
    with app.app_context():
        users = User.query.all()
        print(f"{'ID':<5} | {'Email':<30} | {'Role':<25}")
        print("-" * 65)
        for user in users:
            print(f"{user.id:<5} | {user.email:<30} | {user.role:<25}")

if __name__ == '__main__':
    check_user_roles()
