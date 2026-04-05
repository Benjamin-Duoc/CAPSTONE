from app import create_app
from app.models.all_models import User, PremiumSponsor
from app.extensions import db
from werkzeug.security import generate_password_hash
import json

def add_test_clients():
    app = create_app()
    with app.app_context():
        # --- Create Users ---
        password_hash = generate_password_hash("123")
        
        clients_data = [
            {"email": "pia@cliente.cl", "first_name": "Pia", "last_name": "Cliente"},
            {"email": "pedro@cliente.cl", "first_name": "Pedro", "last_name": "Cliente"},
            {"email": "maria@cliente.cl", "first_name": "Maria", "last_name": "Cliente"},
        ]
        
        created_users = []
        for c in clients_data:
            user = User.query.filter_by(email=c["email"]).first()
            if not user:
                user = User(
                    email=c["email"],
                    first_name=c["first_name"],
                    last_name=c["last_name"],
                    role="Cliente",
                    password_hash=password_hash,
                    region="Metropolitana de Santiago"
                )
                db.session.add(user)
                print(f"User {c['email']} created.")
            else:
                user.role = "Cliente"
                print(f"User {c['email']} already exists. Role updated to Cliente.")
            created_users.append(user)
        
        db.session.commit()
        
        # --- Create/Replace Sponsors ---
        # Clear existing sponsors to ensure exactly 3 cards for testing
        print("Clearing existing PremiumSponsor entries...")
        PremiumSponsor.query.delete()
        
        sponsors_data = [
            {
                "user_id": created_users[0].id,
                "name": "Agencia Comunicaciones Pia",
                "tagline": "Expertos en prensa y relaciones públicas",
                "image_url": "https://picsum.photos/seed/sponsor1/400/300",
                "cta_text": "Ver Portafolio",
                "cta_link": "https://example.com/pia",
                "report_content": json.dumps([{"type": "paragraph", "text": "Bienvenido al perfil de Agencia Pia."}])
            },
            {
                "user_id": created_users[1].id,
                "name": "Servicios Digitales Pedro",
                "tagline": "Soluciones tecnológicas para el mañana",
                "image_url": "https://picsum.photos/seed/sponsor2/400/300",
                "cta_text": "Nuestros Planes",
                "cta_link": "https://example.com/pedro",
                "report_content": json.dumps([{"type": "paragraph", "text": "Bienvenido al perfil de Pedro Digital."}])
            },
            {
                "user_id": created_users[2].id,
                "name": "Consultoría Maria",
                "tagline": "Estrategia de medios y comunicación",
                "image_url": "https://picsum.photos/seed/sponsor3/400/300",
                "cta_text": "Agenda una Cita",
                "cta_link": "https://example.com/maria",
                "report_content": json.dumps([{"type": "paragraph", "text": "Bienvenido al perfil de Consultoría Maria."}])
            }
        ]
        
        for s in sponsors_data:
            db.session.add(PremiumSponsor(**s))
            print(f"Sponsor card '{s['name']}' created.")
            
        db.session.commit()
        print("Done! 3 clients and 3 sponsor cards are ready.")

if __name__ == '__main__':
    add_test_clients()
