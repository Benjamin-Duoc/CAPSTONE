import json
from datetime import datetime, date
from app.extensions import db
from app.models.all_models import (
    AppConfig, User, HeroHeading, NewsArticle, PressRelease, 
    PhotojournalismPost, CommunityPost, CommunityAd, ShortCollaboration, 
    Event, Course, Entrepreneurship, EntrepreneurshipTip, FundingOpportunity, 
    Job, FreelanceService, LegalTopic, LegalFAQ, PromoVideo, NgoSpotlight, 
    ShareablePhoto, PartnerLogo, SponsoredAd, PremiumSponsor, TalentProfile, 
    Specialist, SpecialAd, Resource, SiteStat
)

def run_seed(app):
    """
    Poblar la base de datos con datos iniciales completos.
    """
    with app.app_context():
        # Verificación de bandera de sembrado
        seed_done = AppConfig.query.filter_by(key="INITIAL_SEED_DONE").first()
        if seed_done and seed_done.value == "true" and NewsArticle.query.count() > 1:
            return False

        print("⚡ Sembrador: Restaurando datos completos desde mockData...")
        db.create_all()

        # --- USUARIO ADMIN ---
        if not User.query.filter_by(email="admin@cipress.cl").first():
            db.session.add(User(
                first_name="Admin", last_name="Cipress", region="Metropolitana de Santiago",
                email="admin@cipress.cl", role="ADMIN", 
                password_hash="scrypt:32768:8:1$v3vW5g8X$6d9e..." # Simplified for brevity
            ))

        # --- HERO HEADING ---
        if HeroHeading.query.count() == 0:
            db.session.add(HeroHeading(
                main_text="El periodismo chileno está",
                highlighted_text="emprendiendo",
                sub_text="Únete al Círculo de Periodistas Emprendedores e Innovadores de Chile",
                featured_label="Emprendimiento de la Semana",
                text_color="#FFFFFF"
            ))

        # --- SITE STATS ---
        if SiteStat.query.count() == 0:
            db.session.add(SiteStat(id="subscribers", label="suscritos entre los 18 y 64 años de edad", end_value=10000, prefix="+ de "))
            db.session.add(SiteStat(id="visits", label="Visitas Diarias", end_value=6500, prefix=""))
            db.session.add(SiteStat(id="regions", label="Regiones de Chile presentes entre suscritos y usuarios, diariamente", end_value=16, prefix=""))

        # --- NEWS ARTICLES ---
        if NewsArticle.query.count() == 0:
            articles = [
                {
                    "title": "La IA Generativa y su Impacto en las Salas de Redacción Chilenas",
                    "category": "Tecnología", "author": "Equipo Editorial", "date": "15 de Julio, 2024",
                    "image_url": "https://picsum.photos/seed/news1/400/225",
                    "summary": "Un análisis profundo sobre cómo herramientas como Gemini y ChatGPT están transformando la producción de noticias.",
                    "report_content": json.dumps([
                        {"type": "paragraph", "text": "La inteligencia artificial generativa ha irrumpido en las salas de redacción de todo el mundo..."},
                        {"type": "quote", "text": "La IA no es una amenaza para el periodismo, sino una oportunidad para potenciarlo.", "author": "Directora de Innovación"}
                    ])
                },
                {"title": "Nuevos Modelos de Suscripción Ganan Terreno", "category": "Industria", "author": "Isidora Paz", "date": "12 de Julio, 2024", "image_url": "https://picsum.photos/seed/news2/400/225", "summary": "Exploramos casos de éxito de medios chilenos."},
                {"title": "Avanza Proyecto de Ley sobre Protección a Periodistas", "category": "Legislación", "author": "Tomás Reyes", "date": "10 de Julio, 2024", "image_url": "https://picsum.photos/seed/news3/400/225", "summary": "Las claves del nuevo marco legal."},
            ]
            for data in articles:
                db.session.add(NewsArticle(**data))

        # --- COURSES ---
        if Course.query.count() == 0:
            courses_data = [
                {
                    "title": "Periodismo de Datos: De Cero a Experto", "category": "Periodismo de Datos",
                    "level": "Básico", "format": "Video", "cost": "$45.000 CLP", "rating": 4.9, "review_count": 123,
                    "image_url": "https://picsum.photos/seed/course1/1200/800", "instructor_name": "Isidora Paz",
                    "duration": "6 Semanas", "topics": json.dumps(["Introducción", "Web Scraping", "Limpieza"])
                },
                {"title": "SEO para Medios", "category": "SEO", "level": "Intermedio", "format": "Video", "cost": "$60.000 CLP", "rating": 4.8, "review_count": 98, "image_url": "https://picsum.photos/seed/course2/1200/800", "instructor_name": "Javier Fuentes"},
            ]
            for data in courses_data:
                db.session.add(Course(**data))

        # --- JOBS ---
        if Job.query.count() == 0:
            jobs_data = [
                {"title": "Periodista de Investigación", "company": "CIPER Chile", "location": "Santiago", "type": "Completo", "area": "Prensa", "date": "Hace 2 días", "logo_url": "https://picsum.photos/seed/logo1/100/100", "description": "Buscamos a un periodista riguroso..."},
                {"title": "Productor Periodístico Matinal", "company": "Canal 13", "location": "Santiago", "type": "Completo", "area": "TV", "date": "Hace 5 días", "logo_url": "https://picsum.photos/seed/logo2/100/100"},
            ]
            for data in jobs_data:
                db.session.add(Job(**data))

        # --- PHOTOJOURNALISM ---
        if PhotojournalismPost.query.count() == 0:
            photos = [
                {"title": "El Espejo Roto de Aculeo", "image_url": "https://picsum.photos/seed/photojournalism1/800/450", "caption": "La sequía avanza implacable...", "photographer_name": "Ignacio Paredes", "date_taken": "15 de Julio, 2024", "whatsapp_contact": "56987654321"},
                {"title": "Murales que Hablan en Valparaíso", "image_url": "https://picsum.photos/seed/photojournalism2/800/450", "photographer_name": "Javiera Latorre"},
            ]
            for data in photos:
                db.session.add(PhotojournalismPost(**data))

        # --- FREELANCE SERVICES ---
        if FreelanceService.query.count() == 0:
            services = [
                {"service": "Redacción de Artículos SEO", "provider": "Camila Rojas", "category": "Redacción", "rate": "$30.000 / artículo", "image_url": "https://picsum.photos/seed/freelance1/400/225", "rating_average": 6.5, "rating_count": 22},
                {"service": "Fotografía de Eventos Corporativos", "provider": "Andrea López", "category": "Fotografía", "rate": "$80.000 / hora", "rating_average": 7.0, "rating_count": 31},
            ]
            for data in services:
                db.session.add(FreelanceService(**data))

        # --- PREMIUM SPONSORS ---
        if PremiumSponsor.query.count() == 0:
            sponsors = [
                {"name": "Tech Solutions", "tagline": "Impulsando la transformación digital", "image_url": "https://picsum.photos/seed/premium1/1200/800", "cta_text": "Descubre", "name_color": "#FFFFFF", "cta_color": "#FFC300"},
                {"name": "Banco Futuro", "tagline": "La banca para los que innovan", "image_url": "https://picsum.photos/seed/premium2/500/300"},
            ]
            for data in sponsors:
                db.session.add(PremiumSponsor(**data))

        # --- PARTNER LOGOS ---
        if PartnerLogo.query.count() == 0:
            partners = [
                {"name": "Colegio de Periodistas", "logo_url": "https://www.colegiodeperiodistas.cl/wp-content/uploads/2021/05/logo_colegio_periodistas_2021_web.png", "website_url": "https://www.colegiodeperiodistas.cl/"},
                {"name": "INMA", "logo_url": "https://www.inma.org/files/images/inma-logo-hp-new.svg", "website_url": "https://www.inma.org/"},
            ]
            for data in partners:
                db.session.add(PartnerLogo(**data))

        # --- TALENT PROFILES ---
        if TalentProfile.query.count() == 0:
            talents = [
                {"name": "Javiera Latorre", "title": "Periodista de datos", "skills": json.dumps(["Análisis", "Visualización"]), "availability": "Remoto", "region": "Metropolitana"},
                {"name": "Ricardo Núñez", "title": "Productor audiovisual", "skills": json.dumps(["Editing", "Camera"]), "availability": "Híbrido"},
            ]
            for data in talents:
                db.session.add(TalentProfile(**data))

        # --- SPECIALISTS ---
        if Specialist.query.count() == 0:
            specialists_data = [
                {"name": "Dra. Carolina Vera", "title": "Climatóloga, U. de Chile", "image_url": "https://picsum.photos/seed/spec1/400/400", "specialty_description": "Experta en cambio climático, modelos atmosféricos y fenómenos extremos en Sudamérica. Ideal para análisis sobre sequía y eventos climáticos.", "whatsapp_contact": "56911112222", "date_added": date(2024, 7, 25)},
                {"name": "Marcos Sánchez", "title": "Analista Económico Senior", "image_url": "https://picsum.photos/seed/spec2/400/400", "specialty_description": "Especialista en macroeconomía, mercados financieros chilenos y proyecciones de crecimiento. Comenta sobre IPC, IMACEC y políticas fiscales.", "whatsapp_contact": "56922223333", "date_added": date(2024, 7, 24)},
                {"name": "Javiera Lorca", "title": "Socióloga y Urbanista, PUCV", "image_url": "https://picsum.photos/seed/spec3/400/400", "specialty_description": "Investiga sobre desarrollo urbano, segregación residencial y políticas de vivienda. Voz autorizada en planificación de ciudades.", "whatsapp_contact": "56933334444", "date_added": date(2024, 7, 23)},
                {"name": "Ricardo Núñez", "title": "Experto en Ciberseguridad", "image_url": "https://picsum.photos/seed/spec4/400/400", "specialty_description": "Analiza tendencias en ciberataques, protección de datos y legislación digital. Perfecto para temas de hacking y seguridad informática.", "whatsapp_contact": "56944445555", "date_added": date(2024, 7, 22)},
            ]
            for data in specialists_data:
                db.session.add(Specialist(**data))

        # --- ENTREPRENEURSHIP TIPS (Emprender es Mundial) ---
        if EntrepreneurshipTip.query.count() == 0:
            tips = [
                {
                    "title": "Cómo Construir tu Marca Personal como Periodista",
                    "description": "Descubre las claves para posicionarte como un experto en tu nicho y atraer nuevas oportunidades profesionales.",
                    "expert_name": "Ana González",
                    "expert_title": "Consultora de Marca Personal",
                    "thumbnail_url": "https://picsum.photos/seed/emprender-mundial-2/1200/600",
                    "video_url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                },
                {
                    "title": "Los 3 Pilares para Monetizar tu Medio Digital",
                    "description": "Aprende a construir un modelo de negocio sostenible para tu proyecto periodístico con estrategias probadas de membresías, contenido premium y diversificación de ingresos.",
                    "expert_name": "Javier Consuegra",
                    "expert_title": "Estratega de Medios Digitales",
                    "thumbnail_url": "https://picsum.photos/seed/emprender-mundial/1200/600",
                    "video_url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                }
            ]
            for data in tips:
                db.session.add(EntrepreneurshipTip(**data))

        # --- FUNDING OPPORTUNITIES ---
        if FundingOpportunity.query.count() == 0:
            funding = [
                {"title": "Fondo de Apoyo a Medios de Comunicación Social Regionales", "organization": "Gobierno de Chile", "deadline": "31 de Agosto, 2024", "type": "Fondo", "link": "#"},
                {"title": "Beca de Periodismo de Investigación", "organization": "Fundación para la Prensa", "deadline": "15 de Septiembre, 2024", "type": "Beca", "link": "#"},
                {"title": "Premio Nacional de Periodismo Digital", "organization": "Universidad Alberto Hurtado", "deadline": "30 de Septiembre, 2024", "type": "Premio", "link": "#"},
                {"title": "Google News Initiative", "organization": "Google", "deadline": "10 de Octubre, 2024", "type": "Fondo", "link": "#"}
            ]
            for data in funding:
                db.session.add(FundingOpportunity(**data))

        # --- ENTREPRENEURSHIP (Emprendimientos destacados) ---
        if Entrepreneurship.query.count() == 0:
            ents = [
                {
                    "name": "La Pública", "type": "Micromedio", "founder": "Ana González", "location": "Santiago",
                    "specialty": "Investigación", "image_url": "https://picsum.photos/seed/public-square-life/1200/800",
                    "description": "Medio digital enfocado en investigación periodística...",
                    "report_author": "Catalina Riquelme", "report_date": "18 de Julio, 2024",
                    "report_content": json.dumps([{"type": "paragraph", "text": "En un ecosistema mediático..."}])
                },
                {"name": "Contenido Central", "type": "Agencia", "founder": "Carlos Pérez", "location": "Santiago", "specialty": "Cultura", "image_url": "https://picsum.photos/seed/ent2/400/225", "description": "Agencia de comunicaciones estratégica."},
                {"name": "Relatos del Sur", "type": "Productora", "founder": "María Inés Soto", "location": "Concepción", "specialty": "Local", "image_url": "https://picsum.photos/seed/ent3/400/225", "description": "Documentales y reportajes regionales."}
            ]
            for data in ents:
                db.session.add(Entrepreneurship(**data))

        # --- COMMUNITY POSTS ---
        if CommunityPost.query.count() == 0:
            posts = [
                {"author_name": "Javiera Latorre", "post_title": "The Guardian launches new paid-for ‘digital experience’", "comment": "Interesante el nuevo modelo...", "post_url": "#"},
                {"author_name": "Ricardo Núñez", "post_title": "How Axios is using AI to expand local news coverage", "comment": "El uso de IA para potenciar...", "post_url": "#"},
                {"author_name": "Carolina Soto", "post_title": "SembraMedia report on digital media trends", "comment": "El último reporte de SembraMedia tiene datos...", "post_url": "#"}
            ]
            for data in posts:
                db.session.add(CommunityPost(**data))

        # --- COMMUNITY ADS ---
        if CommunityAd.query.count() == 0:
            ads = [
                {"title": "Vendo cámara Sony A7 III casi nueva", "description": "Poco uso, con lente 28-70mm...", "category": "Venta", "author_name": "Ignacio Paredes", "whatsapp_contact": "56987654321"},
                {"title": "Busco fuente experta en crisis hídrica", "description": "Para reportaje de largo aliento...", "category": "Búsqueda", "author_name": "Catalina Riquelme", "whatsapp_contact": "56912345678"}
            ]
            for data in ads:
                db.session.add(CommunityAd(**data))

        # --- EVENTS ---
        if Event.query.count() == 0:
            events = [
                {"title": "Webinar: Cómo usar la IA para potenciar tu medio", "date_display": "05 AGO", "full_date": "Lunes 05 de Agosto, 19:00 hrs.", "location": "Online", "type": "Webinar", "link": "#"},
                {"title": "Taller presencial de Fotoperiodismo con celular", "date_display": "17 AGO", "full_date": "Sábado 17 de Agosto, 10:00 hrs.", "location": "Santiago, Chile", "type": "Taller", "link": "#"}
            ]
            for data in events:
                db.session.add(Event(**data))

        # --- CONFIG FINAL ---
        if not AppConfig.query.filter_by(key="rotationInterval").first():
            db.session.add(AppConfig(key="rotationInterval", value="1", description="Intervalo de rotación en horas"))
        
        if not seed_done:
            db.session.add(AppConfig(key="INITIAL_SEED_DONE", value="true", description="Sembrado inicial completado"))
        else:
            seed_done.value = "true"

        db.session.commit()
        print("🏁 Sembrador: Restauración completada con éxito.")
        return True

if __name__ == '__main__':
    from app import create_app
    app = create_app()
    run_seed(app)
