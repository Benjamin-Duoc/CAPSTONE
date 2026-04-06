import sqlite3
import os

db_path = os.path.join(os.path.dirname(__file__), 'instance', 'cipress.db')
print(f"Connecting to: {db_path}")

try:
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    
    # Check current columns
    cursor.execute("PRAGMA table_info(short_collaborations)")
    columns = [row[1] for row in cursor.fetchall()]
    print(f"Current columns: {columns}")
    
    if 'author_user_id' not in columns:
        print("Adding column author_user_id...")
        cursor.execute("ALTER TABLE short_collaborations ADD COLUMN author_user_id INTEGER;")
        conn.commit()
        print("Column added successfully!")
    else:
        print("Column already exists.")
        
except Exception as e:
    print(f"An error occurred: {e}")
finally:
    if conn:
        conn.close()
