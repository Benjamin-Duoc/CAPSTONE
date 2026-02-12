from flask import Blueprint, request, jsonify
from app.services.user_service import UserService
from app.schemas.all_schemas import UserSchema

user_bp = Blueprint('user', __name__, url_prefix='/api/users')
service = UserService()
schema = UserSchema()
list_schema = UserSchema(many=True)

@user_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    try:
        user = service.register_user(data)
        return jsonify({
            "success": True,
            "message": "Usuario registrado exitosamente",
            "userId": user.id
        }), 201
    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 400

@user_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    try:
        user = service.authenticate(data.get('email'), data.get('password'))
        return jsonify({
            "success": True,
            "message": "Login exitoso",
            "user": schema.dump(user)
        }), 200
    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 401

@user_bp.route('', methods=['GET'])
def get_all():
    users = service.get_all_users()
    return jsonify(list_schema.dump(users)), 200
