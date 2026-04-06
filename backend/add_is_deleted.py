import sqlite3
import os

def run():
    db_path = 'instance/cipress.db'
    if not os.path.exists(db_path):
        db_path = 'cipress.db'

    print(f"Using DB: {db_path}")
    conn = sqlite3.connect(db_path)
    c = conn.cursor()
    
    try:
        c.execute('ALTER TABLE press_release ADD COLUMN is_deleted BOOLEAN DEFAULT 0')
        print("Added is_deleted to press_release")
    except Exception as e:
        print(f"Error PR: {e}")
        
    try:
        c.execute('ALTER TABLE shareable_photo ADD COLUMN is_deleted BOOLEAN DEFAULT 0')
        print("Added is_deleted to shareable_photo")
    except Exception as e:
        print(f"Error Photos: {e}")

    conn.commit()
    conn.close()

if __name__ == '__main__':
    run()
