import requests
import json

BASE_URL = "http://127.0.0.1:5000/api"

def debug_update():
    # 1. Login as Pedro
    session = requests.Session()
    login_res = session.post(f"{BASE_URL}/users/login", json={
        "email": "pedro@cliente.cl",
        "password": "123"
    })
    print("Login status:", login_res.status_code)
    if login_res.status_code != 200:
        print("Login failed:", login_res.text)
        return

    # 2. Try to update sponsor ID 2
    update_data = {
        "name": "Pedro's Updated Agency",
        "tagline": "New Tagline",
    }
    update_res = session.put(f"{BASE_URL}/premium-sponsors/2", json=update_data)
    print("Update status:", update_res.status_code)
    print("Update response:", update_res.text)

if __name__ == '__main__':
    debug_update()
