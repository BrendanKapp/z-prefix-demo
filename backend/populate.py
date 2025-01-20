from app import app, db
from models import User, Item

def populate_db():
    with app.app_context():
        # Create default users (if not already created)
        if not User.query.filter_by(email='rocket@supra.coders').first():
            user1 = User(email='rocket@supra.coders', password='rocket')
            db.session.add(user1)
        
        if not User.query.filter_by(email='admin@supra.coders').first():
            user2 = User(email='admin@supra.coders', password='admin')
            db.session.add(user2)

        # Create default items (if not already created)
        if not Item.query.first():
            item1 = Item(name='Merlin Engine', description='The Merlin engine is a liquid rocket engine using LOX/RP-1, providing up to 845 kN of thrust for Falcon 9 and Falcon Heavy rockets, designed for reusability and high performance.', quantity=9, user_id=1)
            item2 = Item(name='GPS Satellite', description='Global Position System satellite.', quantity=31, user_id=2)
            item3 = Item(name='Chocolate Milk', description='Making long days short.', quantity=1000000, user_id=2)

            db.session.add_all([item1, item2, item3])

        db.session.commit()

    print("Database populated with default data.")

if __name__ == '__main__':
    populate_db()

