import hmac
import hashlib
import requests
import json

# Keys from .env.development
api_key = "3A7FCAD2-0AF1-4FF4-BD80-7FDEBFDL1C7A"
secret_key = "93d63cfdf36d8405073b99cc1039521ebab570a7"
api_url = "https://sandbox.flow.cl/api"

def generate_signature(params, secret):
    sorted_keys = sorted(params.keys())
    to_sign = "".join(f"{key}{params[key]}" for key in sorted_keys)
    return hmac.new(
        secret.encode('utf-8'),
        to_sign.encode('utf-8'),
        hashlib.sha256
    ).hexdigest()

def check_status(token):
    endpoint = f"{api_url}/payment/getStatus"
    params = {
        "apiKey": api_key,
        "token": token
    }
    params["s"] = generate_signature(params, secret_key)
    
    response = requests.get(endpoint, params=params)
    print(f"Status Code: {response.status_code}")
    print(f"Response: {json.dumps(response.json(), indent=2)}")

if __name__ == "__main__":
    token = "FE6F39AE7F39B0D29EB0D97E82B0DF71BD5F17FI"
    check_status(token)
