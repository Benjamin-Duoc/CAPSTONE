from app import create_app
from app.extensions import db
import time

print("--- Debug Start ---")
try:
    print("1. Creating app...")
    app = create_app()
    print("2. App created successfully.")
    
    with app.app_context():
        print("3. Inside app context.")
        print("4. Calling db.create_all()...")
        start = time.time()
        db.create_all()
        end = time.time()
        print(f"5. db.create_all() finished in {end - start:.2f} seconds.")
        
except Exception as e:
    print(f"❌ ERROR: {e}")
    import traceback
    traceback.print_exc()

print("--- Debug End ---")
