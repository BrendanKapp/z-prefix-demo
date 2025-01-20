from flask import Flask, request, jsonify
from flask_jwt_extended import JWTManager, jwt_required, create_access_token
from flask_cors import CORS
from models import db, User, Item
from werkzeug.security import generate_password_hash, check_password_hash
from config import Config

app = Flask(__name__)
app.config.from_object(Config)
CORS(app)
db.init_app(app)
jwt = JWTManager(app)

with app.app_context():
    db.create_all()

# Register Route
@app.route('/api/register', methods=['POST'])
def register():
    data = request.get_json()

    email = data.get('email')
    password = data.get('password')

    if User.query.filter_by(email=email).first():
        return jsonify({"message": "User already exists"}), 400

    hashed_password = generate_password_hash(password, method='sha256')
    new_user = User(email=email, password=hashed_password)

    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "User registered successfully"}), 201


# Login Route
@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()

    email = data.get('email')
    password = data.get('password')

    user = User.query.filter_by(email=email).first()

    if not user or not check_password_hash(user.password, password):
        return jsonify({"message": "Invalid credentials"}), 401

    auth_token = create_access_token(identity=user.id)

    return jsonify(authToken=auth_token), 200


# Create Item Route (Authenticated)
@app.route('/api/items', methods=['POST'])
@jwt_required()
def create_item():
    data = request.get_json()

    name = data.get('name')
    description = data.get('description')
    quantity = int(data.get('quantity'))

    current_user_id = get_jwt_identity()

    new_item = Item(name=name, description=description, quantity=quantity, user_id=current_user_id)
    db.session.add(new_item)
    db.session.commit()

    return jsonify({"message": "Item created successfully"}), 201

# Get My Items Route (Private)
@app.route('/api/inventory', methods=['GET'])
@jwt_required()
def get_inventory():
    current_user_id = get_jwt_identity()
    
    items = Item.query.filter_by(user_id=current_user_id).all()
    items_list = [{"id": item.id, "name": item.name, "description": item.description} for item in items]

    return jsonify(items_list), 200

# Get All Items Route (Public)
@app.route('/api/items', methods=['GET'])
def get_items():
    items = Item.query.all()
    items_list = [{"id": item.id, "name": item.name, "description": item.description[:100] + ('...' if len(item.description) > 100 else ''), "quantity": item.quantity} for item in items]

    return jsonify(items_list), 200


# Get Single Item Route (Public)
@app.route('/api/items/<int:id>', methods=['GET'])
def get_item(id):
    item = Item.query.get_or_404(id)
    item_data = {
        "id": item.id,
        "name": item.name,
        "description": item.description,
        "quantity": item.quantity
    }
    return jsonify(item_data), 200


# Update Item Route (Authenticated)
@app.route('/api/items/<int:id>', methods=['PUT'])
@jwt_required()
def update_item(id):
    data = request.get_json()

    item = Item.query.get_or_404(id)
    current_user_id = get_jwt_identity()

    if item.user_id != current_user_id:
        return jsonify({"message": "Unauthorized"}), 403

    item.name = data.get('name', item.name)
    item.description = data.get('description', item.description)
    item.quantity = data.get('quantity', item.quantity)

    db.session.commit()

    return jsonify({"name": item.name, "description": item.description, "quantity": item.quantity}), 200


# Delete Item Route (Authenticated)
@app.route('/api/items/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_item(id):
    item = Item.query.get_or_404(id)
    current_user_id = get_jwt_identity()

    if item.user_id != current_user_id:
        return jsonify({"message": "Unauthorized"}), 403

    db.session.delete(item)
    db.session.commit()

    return jsonify({"message": "Item deleted successfully"}), 200


# Helper function to get JWT identity
from flask_jwt_extended import get_jwt_identity

if __name__ == '__main__':
    app.run(debug=True)

