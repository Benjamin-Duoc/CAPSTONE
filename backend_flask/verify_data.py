import sqlite3
import os

# Path to the database
db_path = 'cipress.db'

if not os.path.exists(db_path):
    print(f"Error: Database file '{db_path}' not found.")
    exit(1)

try:
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()

    # Get a list of all tables
    cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
    tables = cursor.fetchall()

    print(f"Connected to database: {db_path}")
    print(f"Found {len(tables)} tables.")
    print("-" * 30)

    for table_name in tables:
        table = table_name[0]
        print(f"\nTable: {table}")
        
        # Get column names
        cursor.execute(f"PRAGMA table_info({table});")
        columns = [col[1] for col in cursor.fetchall()]
        print(f"Columns: {', '.join(columns)}")

        # Get first 5 rows
        cursor.execute(f"SELECT * FROM {table} LIMIT 5;")
        rows = cursor.fetchall()
        
        if rows:
            print("First 5 rows:")
            for row in rows:
                print(row)
        else:
            print("Table is empty.")
        print("-" * 30)

    conn.close()

except sqlite3.Error as e:
    print(f"SQLite error: {e}")
except Exception as e:
    print(f"An error occurred: {e}")
