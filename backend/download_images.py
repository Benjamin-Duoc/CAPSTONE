import os
import requests
from urllib.parse import urlparse

# Base directories
BACKEND_MEDIA_DIR = "media/images"
PUBLIC_IMAGES_DIR = "../project/public/images"

# Ensure directories exist
os.makedirs(PUBLIC_IMAGES_DIR, exist_ok=True)

# Function to download an image
def download_image(url, filepath):
    try:
        response = requests.get(url, stream=True, timeout=10)
        if response.status_code == 200:
            with open(filepath, 'wb') as f:
                for chunk in response.iter_content(1024):
                    f.write(chunk)
            print(f"Downloaded: {filepath}")
        else:
            print(f"Failed to download {url}: Status {response.status_code}")
    except Exception as e:
        print(f"Error downloading {url}: {e}")

# Static Images
static_images = [
    ("/assets/images/LOGO-CIPRESS-2.png", os.path.join(PUBLIC_IMAGES_DIR, "LOGO-CIPRESS-2.png")),
    ("https://www.cipress.cl/images/LOGO-CIPRESS.png", os.path.join(PUBLIC_IMAGES_DIR, "LOGO-CIPRESS.png")), # Just in case
]

# Variable Images (Directory, Filename, URL)
# Using seeds from CreateDB and MockData
variable_images = [
    # Courses
    ("courses", "course1.jpg", "https://picsum.photos/seed/course1/1200/800"),
    ("courses", "course2.jpg", "https://picsum.photos/seed/course2/1200/800"),
    ("courses", "course3.jpg", "https://picsum.photos/seed/course3/1200/800"),
    ("courses", "course4.jpg", "https://picsum.photos/seed/course4/1200/800"),
    ("courses", "course5.jpg", "https://picsum.photos/seed/course5/1200/800"),
    ("courses", "course6.jpg", "https://picsum.photos/seed/course6/1200/800"),
    
    # Jobs (Logos)
    ("jobs", "logo1.jpg", "https://picsum.photos/seed/logo1/100/100"),
    ("jobs", "logo2.jpg", "https://picsum.photos/seed/logo2/100/100"),
    ("jobs", "logo3.jpg", "https://picsum.photos/seed/logo3/100/100"),
    ("jobs", "logo4.jpg", "https://picsum.photos/seed/logo4/100/100"),
    ("jobs", "logo5.jpg", "https://picsum.photos/seed/logo5/100/100"),
    ("jobs", "logo6.jpg", "https://picsum.photos/seed/logo6/100/100"),
    ("jobs", "logo7.jpg", "https://picsum.photos/seed/logo7/100/100"),

    # Entrepreneurships
    ("entrepreneurships", "public-square-life.jpg", "https://picsum.photos/seed/public-square-life/1200/800"),
    ("entrepreneurships", "ent2.jpg", "https://picsum.photos/seed/ent2/400/225"),
    ("entrepreneurships", "ent3.jpg", "https://picsum.photos/seed/ent3/400/225"),
    ("entrepreneurships", "ent4.jpg", "https://picsum.photos/seed/ent4/400/225"),
    ("entrepreneurships", "reportaje1.jpg", "https://picsum.photos/seed/reportaje1/800/500"),
    ("entrepreneurships", "reportaje2.jpg", "https://picsum.photos/seed/reportaje2/800/500"),

    # News Articles
    ("news-articles", "news1.jpg", "https://picsum.photos/seed/news1/400/225"),
    ("news-articles", "news2.jpg", "https://picsum.photos/seed/news2/400/225"),
    ("news-articles", "news3.jpg", "https://picsum.photos/seed/news3/400/225"),
    ("news-articles", "news4.jpg", "https://picsum.photos/seed/news4/400/225"),
    ("news-articles", "news-report1.jpg", "https://picsum.photos/seed/news-report1/800/500"),

    # Press Releases
    ("press-releases", "pr1.jpg", "https://picsum.photos/seed/pr1/400/225"),
    ("press-releases", "pr2.jpg", "https://picsum.photos/seed/pr2/400/225"),
    ("press-releases", "pr3.jpg", "https://picsum.photos/seed/pr3/400/225"),
    ("press-releases", "pr4.jpg", "https://picsum.photos/seed/pr4/400/225"),
    ("press-releases", "pr5.jpg", "https://picsum.photos/seed/pr5/400/225"),
    ("press-releases", "pr6.jpg", "https://picsum.photos/seed/pr6/400/225"),
    ("press-releases", "pr7.jpg", "https://picsum.photos/seed/pr7/400/225"),
    ("press-releases", "pr8.jpg", "https://picsum.photos/seed/pr8/400/225"),
    ("press-releases", "pr9.jpg", "https://picsum.photos/seed/pr9/400/225"),
    ("press-releases", "pr10.jpg", "https://picsum.photos/seed/pr10/400/225"),
    ("press-releases", "pr11.jpg", "https://picsum.photos/seed/pr11/400/225"),
    ("press-releases", "pr12.jpg", "https://picsum.photos/seed/pr12/400/225"),
    ("press-releases", "pr13.jpg", "https://picsum.photos/seed/pr13/400/225"),
    ("press-releases", "pr-report1.jpg", "https://picsum.photos/seed/pr-report1/800/500"),

    # NGO Spotlight
    ("ngo-spotlights", "ngo1.jpg", "https://picsum.photos/seed/ngo1/400/225"),
    ("ngo-spotlights", "ngo2.jpg", "https://picsum.photos/seed/ngo2/400/225"),
    ("ngo-spotlights", "ngo3.jpg", "https://picsum.photos/seed/ngo3/400/225"),
    ("ngo-spotlights", "ngo4.jpg", "https://picsum.photos/seed/ngo4/400/225"),

    # Freelance Services
    ("freelance-services", "freelance1.jpg", "https://picsum.photos/seed/freelance1/400/225"),
    ("freelance-services", "freelance2.jpg", "https://picsum.photos/seed/freelance2/400/225"),
    ("freelance-services", "freelance3.jpg", "https://picsum.photos/seed/freelance3/400/225"),
    ("freelance-services", "freelance4.jpg", "https://picsum.photos/seed/freelance4/400/225"),
    ("freelance-services", "freelance5.jpg", "https://picsum.photos/seed/freelance5/400/225"),

    # Premium Sponsors
    ("premium-sponsors", "premium1.jpg", "https://picsum.photos/seed/premium1/1200/800"),
    ("premium-sponsors", "premium2.jpg", "https://picsum.photos/seed/premium2/500/300"),
    ("premium-sponsors", "premium3.jpg", "https://picsum.photos/seed/premium3/500/300"),
    ("premium-sponsors", "sponsor-report1.jpg", "https://picsum.photos/seed/sponsor-report1/800/500"),
    ("premium-sponsors", "banco-futuro-report.jpg", "https://picsum.photos/seed/banco-futuro-report/800/500"),

    # Promo Videos (Thumbnails)
    ("promo-videos", "video1.jpg", "https://picsum.photos/seed/video1/400/225"),
    ("promo-videos", "video2.jpg", "https://picsum.photos/seed/video2/400/225"),

    # Photojournalism
    ("photojournalism-posts", "photojournalism1.jpg", "https://picsum.photos/seed/photojournalism1/800/450"),
    ("photojournalism-posts", "photojournalism2.jpg", "https://picsum.photos/seed/photojournalism2/800/450"),
    ("photojournalism-posts", "photojournalism3.jpg", "https://picsum.photos/seed/photojournalism3/800/450"),
    ("photojournalism-posts", "photojournalism4.jpg", "https://picsum.photos/seed/photojournalism4/800/450"),
    ("photojournalism-posts", "photojournalism5.jpg", "https://picsum.photos/seed/photojournalism5/800/450"),
    ("photojournalism-posts", "photojournalism6.jpg", "https://picsum.photos/seed/photojournalism6/800/450"),

    # Specialists
    ("specialists", "spec1.jpg", "https://picsum.photos/seed/spec1/400/400"),
    ("specialists", "spec2.jpg", "https://picsum.photos/seed/spec2/400/400"),
    ("specialists", "spec3.jpg", "https://picsum.photos/seed/spec3/400/400"),
    ("specialists", "spec4.jpg", "https://picsum.photos/seed/spec4/400/400"),
    ("specialists", "spec5.jpg", "https://picsum.photos/seed/spec5/400/400"),
    ("specialists", "spec6.jpg", "https://picsum.photos/seed/spec6/400/400"),
    ("specialists", "spec7.jpg", "https://picsum.photos/seed/spec7/400/400"),
    ("specialists", "spec8.jpg", "https://picsum.photos/seed/spec8/400/400"),
    ("specialists", "spec9.jpg", "https://picsum.photos/seed/spec9/400/400"),

    # Shareable Photos
    ("shareable-photos", "gallery1.jpg", "https://picsum.photos/seed/gallery1/600/400"),
    ("shareable-photos", "gallery2.jpg", "https://picsum.photos/seed/gallery2/600/400"),
    ("shareable-photos", "gallery3.jpg", "https://picsum.photos/seed/gallery3/600/400"),
    ("shareable-photos", "gallery4.jpg", "https://picsum.photos/seed/gallery4/600/400"),
    ("shareable-photos", "gallery5.jpg", "https://picsum.photos/seed/gallery5/600/400"),
    ("shareable-photos", "gallery6.jpg", "https://picsum.photos/seed/gallery6/600/400"),

    # Enterpreneurship Tips
    ("entrepreneurship-tips", "emprender-mundial.jpg", "https://picsum.photos/seed/emprender-mundial/1200/600"),
    ("entrepreneurship-tips", "emprender-mundial-2.jpg", "https://picsum.photos/seed/emprender-mundial-2/1200/600"),

    # Sponsored Ads
    ("sponsored-ads", "ad1.jpg", "https://picsum.photos/seed/ad1/300/200"),
    ("sponsored-ads", "ad2.jpg", "https://picsum.photos/seed/ad2/300/200"),
    ("sponsored-ads", "ad3.jpg", "https://picsum.photos/seed/ad3/300/200"),

    # Partner Logos
    ("partner-logos", "colegio-periodistas.png", "/assets/images/logo_colegio_periodistas_2021_web.png"),
    ("partner-logos", "inma.svg", "/assets/images/inma-logo-hp-new.svg"),
    ("partner-logos", "gfmd.png", "/assets/images/GFMD-Logo-Long-Colour-Transparent.png"),

    # Users / Avatars
    ("users", "isidora.jpg", "https://i.pravatar.cc/150?u=isidora"),
    ("users", "javier.jpg", "https://i.pravatar.cc/150?u=javier"),
    ("users", "carolina.jpg", "https://i.pravatar.cc/150?u=carolina"),
    ("users", "tomas.jpg", "https://i.pravatar.cc/150?u=tomas"),
    ("users", "martin.jpg", "https://i.pravatar.cc/150?u=martin"),
    ("users", "andrea.jpg", "https://i.pravatar.cc/150?u=andrea"),
    ("users", "javiera.jpg", "https://i.pravatar.cc/150?u=javiera"),
    ("users", "ricardo.jpg", "https://i.pravatar.cc/150?u=ricardo"),
    ("users", "daniela.jpg", "https://i.pravatar.cc/150?u=daniela"),
    ("users", "mateo.jpg", "https://i.pravatar.cc/150?u=mateo"),
    ("users", "catalina.jpg", "https://i.pravatar.cc/150?u=catalina"),
    ("users", "ignacio.jpg", "https://i.pravatar.cc/150?u=ignacio"),
    ("users", "comms.jpg", "https://i.pravatar.cc/150?u=comms"),
    ("users", "verdechile.jpg", "https://i.pravatar.cc/150?u=verdechile"),
    ("users", "relatos.jpg", "https://i.pravatar.cc/150?u=relatos")
]

def main():
    print("Downloading Static Images...")
    for url, path in static_images:
        download_image(url, path)

    print("\nDownloading Variable Images...")
    for directory, filename, url in variable_images:
        target_dir = os.path.join(BACKEND_MEDIA_DIR, directory)
        if not os.path.exists(target_dir):
            os.makedirs(target_dir, exist_ok=True)
        
        filepath = os.path.join(target_dir, filename)
        if not os.path.exists(filepath):  # Don't re-download if exists
            download_image(url, filepath)
        else:
            print(f"Skipping {filepath}, already exists.")

if __name__ == "__main__":
    main()
