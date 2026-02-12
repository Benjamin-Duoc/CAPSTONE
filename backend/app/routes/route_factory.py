from flask import Blueprint, request, jsonify
from app.services.generic_service import GenericService

def create_crud_blueprint(name, model, schema, url_prefix):
    bp = Blueprint(name, __name__, url_prefix=url_prefix)
    service = GenericService(model)
    single_schema = schema()
    list_schema = schema(many=True)

    @bp.route('', methods=['GET'])
    def get_all():
        items = service.get_all()
        return jsonify(list_schema.dump(items))

    @bp.route('/<int:id>', methods=['GET'])
    def get_by_id(id):
        item = service.get_by_id(id)
        if item:
            return jsonify(single_schema.dump(item))
        return jsonify({"error": "Not found"}), 404

    @bp.route('', methods=['POST'])
    def save():
        data = request.get_json()
        item = service.save(data)
        return jsonify(single_schema.dump(item)), 201

    @bp.route('/<int:id>', methods=['DELETE'])
    def delete(id):
        if service.delete(id):
            return '', 204
        return jsonify({"error": "Not found"}), 404

    return bp
