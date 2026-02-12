import os
import requests

# Base directories
BACKEND_MEDIA_DIR = "media/images"

# Function to download an image
def download_image(url, filepath):
    try:
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
        response = requests.get(url, stream=True, timeout=10, headers=headers)
        if response.status_code == 200:
            with open(filepath, 'wb') as f:
                for chunk in response.iter_content(1024):
                    f.write(chunk)
            print(f"Downloaded: {filepath}")
        else:
            print(f"Failed to download {url}: Status {response.status_code}")
            # Fallback to placeholder
            filename = os.path.basename(filepath)
            name = filename.split('.')[0]
            placeholder_url = f"https://placehold.co/200x100?text={name}"
            print(f"Attempting fallback to {placeholder_url}")
            r2 = requests.get(placeholder_url, stream=True)
            if r2.status_code == 200:
                with open(filepath, 'wb') as f:
                    for chunk in r2.iter_content(1024):
                        f.write(chunk)
                print(f"Downloaded Fallback: {filepath}")

    except Exception as e:
        print(f"Error downloading {url}: {e}")

# Partner Logos
partner_images = [
    ("partner-logos", "colegio-periodistas.png", "https://www.colegiodeperiodistas.cl/wp-content/uploads/2021/05/logo_colegio_periodistas_2021_web.png"),
    ("partner-logos", "inma.svg", "https://www.inma.org/files/images/inma-logo-hp-new.svg"),
    ("partner-logos", "gfmd.png", "https://gfmd.info/wp-content/uploads/2020/09/GFMD-Logo-Long-Colour-Transparent.png"),
]

def main():
    print("Downloading Partner Images...")
    for directory, filename, url in partner_images:
        target_dir = os.path.join(BACKEND_MEDIA_DIR, directory)
        if not os.path.exists(target_dir):
            os.makedirs(target_dir, exist_ok=True)
        
        filepath = os.path.join(target_dir, filename)
        download_image(url, filepath)

if __name__ == "__main__":
    main()
