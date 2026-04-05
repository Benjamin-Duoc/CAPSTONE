import sqlite3
import os

def check_db():
    db_path = 'backend/instance/cipress.db'
    if not os.path.exists(db_path):
        print(f"Error: {db_path} does not exist.")
        return
        
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    try:
        cursor.execute("PRAGMA table_info(entrepreneurship)")
        columns = cursor.fetchall()
        if not columns:
            print("Table 'entrepreneurship' not found.")
        for col in columns:
            print(col)
    except Exception as e:
        print(f"Error: {e}")
    finally:
        conn.close()

if __name__ == "__main__":
    check_db()
