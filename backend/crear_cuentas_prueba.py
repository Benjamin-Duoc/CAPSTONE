from app import create_app
from app.models.all_models import User
from app.extensions import db
from werkzeug.security import generate_password_hash

def run():
    app = create_app()
    with app.app_context():
        p_hash = generate_password_hash('123')
        u1 = User.query.filter_by(email='gratis@cipress.cl').first()
        u2 = User.query.filter_by(email='premium@cipress.cl').first()
        
        if not u1:
            u1 = User(email='gratis@cipress.cl', first_name='Cuenta', last_name='Prueba Gratis', role='Colaborador Gratis', password_hash=p_hash, region='Metropolitana')
            db.session.add(u1)
            print("Cuenta gratis@cipress.cl (Colaborador Gratis) creada.")
        else:
            u1.role = 'Colaborador Gratis'
            print("Cuenta gratis@cipress.cl ya existe. Rol restablecido.")
            
        if not u2:
            u2 = User(email='premium@cipress.cl', first_name='Cuenta', last_name='Prueba Premium', role='Colaborador Premium', password_hash=p_hash, region='Metropolitana')
            db.session.add(u2)
            print("Cuenta premium@cipress.cl (Colaborador Premium) creada.")
        else:
            u2.role = 'Colaborador Premium'
            print("Cuenta premium@cipress.cl ya existe. Rol restablecido.")
        
        db.session.commit()
        print("\n¡Listo! Puedes decirle a tu jefa que use estos correos con la clave: 123")

if __name__ == '__main__':
    run()
