import sqlite3
import os

def migrate():
    db_path = 'backend/instance/cipress.db'
    if not os.path.exists(db_path):
        print(f"Error: {db_path} does not exist.")
        return
        
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    try:
        # Check if user_id already exists
        cursor.execute("PRAGMA table_info(entrepreneurship)")
        columns = [col[1] for col in cursor.fetchall()]
        if 'user_id' not in columns:
            print("Adding user_id column to entrepreneurship table...")
            cursor.execute("ALTER TABLE entrepreneurship ADD COLUMN user_id INTEGER;")
            conn.commit()
            print("Successfully added user_id column.")
        else:
            print("user_id column already exists.")
            
        # Also check other tables that might need it if we are at it
        # Based on previous session, mainly entrepreneurship was updated
            
    except Exception as e:
        print(f"Error during migration: {e}")
        conn.rollback()
    finally:
        conn.close()

if __name__ == "__main__":
    migrate()
