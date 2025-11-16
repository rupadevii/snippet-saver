from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models.snippet import Snippet
from extensions import db

snippet_routes = Blueprint("snippet", __name__)

@snippet_routes.route("/", methods=["GET"])
@jwt_required()
def get_snippets():
    user_id = get_jwt_identity()
    snippets = Snippet.query.filter_by(user_id = user_id).all()
    return jsonify([{
        "id": s.id,
        "title": s.title,
        "code": s.code,
        "language": s.language,
        "description": s.description,
        "created_at": s.created_at
    } for s in snippets]), 200

@snippet_routes.route("/", methods=["POST"])
@jwt_required()
def add_snippet():
    user_id = get_jwt_identity()
    data = request.get_json()
    snippet = Snippet(
        user_id=user_id,
        title=data["title"],
        code=data["code"],
        language=data["language"],
        description=data.get("description", "")
    )
    db.session.add(snippet)
    db.session.commit()
    return jsonify({"msg": "Snippet added!"}), 201

@snippet_routes.route("/<int:id>", methods=["PUT"])
@jwt_required()
def update_snippet(id):
    user_id = get_jwt_identity()
    snippet = Snippet.query.filter_by(id=id, user_id=user_id).first_or_404()
    data = request.get_json()
    snippet.title = data["title"]
    snippet.code = data["code"]
    snippet.language = data["language"]
    snippet.description = data.get("description", "")
    db.session.commit()
    return jsonify({"msg": "Snippet updated!"}), 200

@snippet_routes.route("/<int:id>", methods=["DELETE"])
@jwt_required()
def delete_snippet(id):
    user_id = get_jwt_identity()
    snippet = Snippet.query.filter_by(id=id, user_id=user_id).first_or_404()
    db.session.delete(snippet)
    db.session.commit()
    return jsonify({"msg": "Snippet deleted!"}), 200