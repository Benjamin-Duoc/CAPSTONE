from app.extensions import db
from app.models.all_models import User
from werkzeug.security import generate_password_hash, check_password_hash

class UserService:
    def register_user(self, user_data):
        if User.query.filter_by(email=user_data.get('email')).first():
            raise RuntimeException("Email already exists")
        
        new_user = User(
            firstName=user_data.get('firstName'),
            lastName=user_data.get('lastName'),
            region=user_data.get('region'),
            email=user_data.get('email'),
            passwordHash=user_data.get('password'),
            role=user_data.get('role', 'USER')
        )
        db.session.add(new_user)
        db.session.commit()
        return new_user

    def authenticate(self, email, password):
        user = User.query.filter_by(email=email).first()
        if user and user.passwordHash == password:
            return user
        raise RuntimeException("Credenciales inválidas")

    def get_all_users(self):
        return User.query.all()
