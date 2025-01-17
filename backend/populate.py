from app import app, db
from models import User, Item

def populate_db():
    with app.app_context():
        # Create default users (if not already created)
        if not User.query.filter_by(email='bob@bob.bob').first():
            user1 = User(email='bob@bob.bob', password='bob')
            db.session.add(user1)
        
        if not User.query.filter_by(email='admin@bob.bob').first():
            user2 = User(email='admin@bob.bob', password='bob')
            db.session.add(user2)

        # Create default items (if not already created)
        if not Item.query.first():
            item1 = Item(name='Item 1', description='This is the first item description, which is long enough to test the truncation functionality of the description.', quantity=10, user_id=1)
            item2 = Item(name='Item 2', description='Second item with a shorter description.', quantity=20, user_id=2)
            item3 = Item(name='Item 3', description='Short description.', quantity=5, user_id=2)

            db.session.add_all([item1, item2, item3])

        db.session.commit()

    print("Database populated with default data.")

if __name__ == '__main__':
    populate_db()

