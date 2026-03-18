from app import create_app
import unittest

class TestAPI(unittest.TestCase):
    def setUp(self):
        self.app = create_app()
        self.client = self.app.test_client()

    def test_featured_content(self):
        print("\nTesting /api/featured-content...")
        response = self.client.get('/api/featured-content')
        print(f"Status: {response.status_code}")
        if response.status_code == 500:
            print("Response Data:")
            print(response.data.decode('utf-8'))
        
    def test_courses(self):
        print("\nTesting /api/courses...")
        response = self.client.get('/api/courses')
        print(f"Status: {response.status_code}")
        if response.status_code == 500:
            print("Response Data:")
            print(response.data.decode('utf-8'))

    def test_status(self):
        print("\nTesting /api/payments/status/dummy_token...")
        response = self.client.get('/api/payments/status/dummy_token')
        print(f"Status: {response.status_code}")
        if response.status_code == 500:
            print("Response Data:")
            print(response.data.decode('utf-8'))

if __name__ == '__main__':
    unittest.main()
