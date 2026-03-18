import hmac
import hashlib
import requests
import json

# Manual keys from .env.development to be sure
api_key = "3A7FCAD2-0AF1-4FF4-BD80-7FDEBFDL1C7A"
secret_key = "93d63cfdf36d8405073b99cc1039521ebab570a7"
api_url = "https://sandbox.flow.cl/api"

def generate_signature(params, secret):
    sorted_keys = sorted(params.keys())
    to_sign = "".join(f"{key}{params[key]}" for key in sorted_keys)
    print(f"To sign: {to_sign}")
    return hmac.new(
        secret.encode('utf-8'),
        to_sign.encode('utf-8'),
        hashlib.sha256
    ).hexdigest()

def test_create_payment(email):
    print(f"\n--- Testing with email: {email} ---")
    endpoint = f"{api_url}/payment/create"
    params = {
        "apiKey": api_key,
        "commerceOrder": f"TEST_{int(time.time())}",
        "subject": "Test Payment",
        "amount": 3000,
        "email": email,
        "urlReturn": "http://localhost:3000/dashboard",
        "urlConfirmation": "http://localhost:5000/api/payments/confirm"
    }
    params["s"] = generate_signature(params, secret_key)
    
    response = requests.post(endpoint, data=params)
    print(f"Status Code: {response.status_code}")
    print(f"Response: {response.text}")

if __name__ == "__main__":
    import time
    test_create_payment("test@flow.cl")
