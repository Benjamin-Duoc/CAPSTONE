import urllib.request
import urllib.error

url = 'https://www.cipress.cl/backendcipress/api/courses'
try:
    with urllib.request.urlopen(url) as response:
        print("Status", response.status)
        print(response.read().decode('utf-8'))
except urllib.error.HTTPError as e:
    print(f"Failed with {e.code}")
    print(e.read().decode('utf-8'))
except Exception as e:
    print(e)
