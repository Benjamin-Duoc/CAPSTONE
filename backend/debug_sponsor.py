import urllib.request
import urllib.parse
import json
from http.cookiejar import CookieJar

cookie_jar = CookieJar()
opener = urllib.request.build_opener(urllib.request.HTTPCookieProcessor(cookie_jar))
urllib.request.install_opener(opener)

login_url = "http://localhost:5000/api/users/login"
login_payload = json.dumps({"email": "pia@premium.cl", "password": "123"}).encode('utf-8')
req = urllib.request.Request(login_url, data=login_payload, headers={'Content-Type': 'application/json'})
try:
    with urllib.request.urlopen(req) as response:
        print("Login status:", response.status)
except urllib.error.HTTPError as e:
    print("Login error:", e.code, e.reason, e.read().decode())

update_url = "http://localhost:5000/api/premium-sponsors/2"
sponsor_payload = json.dumps({
    "id": 2,
    "user_id": 5,
    "name": "Cliente Prueba Update 2",
    "tagline": "Test tagline 2",
    "image_url": "",
    "cta_link": "http://example.com"
}).encode('utf-8')

# PUT
req2 = urllib.request.Request(update_url, data=sponsor_payload, headers={'Content-Type': 'application/json'}, method='PUT')
try:
    with urllib.request.urlopen(req2) as response2:
        print("Update status:", response2.status)
        print("Update response:", response2.read().decode())
except urllib.error.HTTPError as e:
    print("Update error:", e.code, e.reason, e.read().decode())
