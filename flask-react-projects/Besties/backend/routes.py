from flask import Blueprint, request, jsonify
from models import Friend
from extensions import db  # 改成從 extensions 引入 db

api_bp = Blueprint('api', __name__)

@api_bp.route("/api/friends", methods=["GET"])
def get_friends():
    friends = Friend.query.all()
    result = [friend.to_json() for friend in friends]
    return jsonify(result)

@api_bp.route("/api/friends", methods=["POST"])
def create_friend():
    data = request.json
    required_fields = ["name", "role", "description", "gender"]
    for field in required_fields:
        if field not in data or not data.get(field):
            return jsonify({"error": f'Missing required field: {field}'}), 400

    name = data.get("name")
    role = data.get("role")
    description = data.get("description")
    gender = data.get("gender")

    if gender == "male":
        img_url = f"https://avatar.iran.liara.run/public/boy?username={name}"
    elif gender == "female":
        img_url = f"https://avatar.iran.liara.run/public/girl?username={name}"
    else:
        img_url = None

    new_friend = Friend(name=name, role=role, description=description, gender=gender, img_url=img_url)
    db.session.add(new_friend)
    db.session.commit()

    return jsonify(new_friend.to_json()), 201

@api_bp.route("/api/friends/<int:id>", methods=["DELETE"])
def delete_friend(id):
    friend = Friend.query.get(id)
    if friend is None:
        return jsonify({"error": "Friend not found"}), 404

    db.session.delete(friend)
    db.session.commit()

    return jsonify({"msg": "Friend deleted"}), 200

@api_bp.route("/api/friends/<int:id>", methods=["PATCH"])
def update_friend(id):
    friend = Friend.query.get(id)
    if friend is None:
        return jsonify({"error": "Friend not found"}), 404

    data = request.json
    friend.name = data.get("name", friend.name)
    friend.role = data.get("role", friend.role)
    friend.description = data.get("description", friend.description)
    friend.gender = data.get("gender", friend.gender)

    db.session.commit()

    return jsonify(friend.to_json()), 200
