from backend.app import create_app
import json

def test_endpoint():
    app = create_app()
    with app.app_context():
        client = app.test_client()
        response = client.get('/api/entrepreneurships')
        print(f"Status Code: {response.status_code}")
        if response.status_code == 200:
            print("Success: Endpoint is working!")
            # print(response.get_json()[:2]) # Print first two items
        else:
            print(f"Error: {response.get_data(as_text=True)}")

if __name__ == "__main__":
    test_endpoint()
