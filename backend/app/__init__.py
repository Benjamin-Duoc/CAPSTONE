from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_cors import CORS
from flask_migrate import Migrate
from datetime import datetime
from .config import current_config

from .extensions import db, ma

def create_app(config_class=None):
    app = Flask(__name__)
    
    # Use provided config or current_config from environment
    if config_class is None:
        config_class = current_config
    
    app.config.from_object(config_class)
    
    # Initialize config-specific setup
    config_class.init_app(app)

    # Inicializar extensiones
    db.init_app(app)
    ma.init_app(app)
    
    # 🔥 Sembrado automático DESACTIVADO (Usar create-db.py)
    # run_seed(app)
    
    # Configuración Global
    app.url_map.strict_slashes = False
    
    # CORS Configuration - Use environment-specific origins
    cors_origins = app.config.get('CORS_ORIGINS', ['*'])
    CORS(app, 
         resources={r"/api/*": {"origins": cors_origins}}, 
         supports_credentials=True)
    
    Migrate(app, db)


    # =========================================================================
    # RUTAS BASE (ESTANDARIZADAS)
    # =========================================================================
    @app.route('/health')
    def health_check():
        return jsonify({"status": "healthy", "database": "connected"}), 200

    @app.route('/api/verify')
    def verify_api():
        return jsonify({"message": "API is standardized under /api"}), 200

    # =========================================================================
    # MEDIA FILES SERVING
    # =========================================================================
    from flask import send_from_directory
    import os
    
    @app.route('/backendcipress/media/<path:filename>')
    def serve_media(filename):
        """Serve media files from the media folder"""
        media_folder = os.path.join(os.path.dirname(__file__), '..', app.config.get('MEDIA_FOLDER', 'media'))
        return send_from_directory(media_folder, filename)
    
    
    
    # =========================================================================
    # REGISTRAR LOS BLUEPRINTS EXISTENTES (tu código original)
    # =========================================================================
    
    from .routes.user_routes import user_bp
    app.register_blueprint(user_bp)

    from .routes.route_factory import create_crud_blueprint
    from .models.all_models import (
        AppConfig, CommunityAd, CommunityPost, Course, Entrepreneurship,
        EntrepreneurshipTip, Event, FreelanceService, FundingOpportunity,
        HeroHeading, Job, LegalFAQ, LegalTopic, NewsArticle, NgoSpotlight,
        PartnerLogo, PhotojournalismPost, PremiumSponsor, PressRelease,
        PromoVideo, Resource, ShareablePhoto, ShortCollaboration, SiteStat,
        SpecialAd, Specialist, SponsoredAd, TalentProfile
    )
    from .schemas.all_schemas import (
        AppConfigSchema, CommunityAdSchema, CommunityPostSchema, CourseSchema,
        EntrepreneurshipSchema, EntrepreneurshipTipSchema, EventSchema,
        FreelanceServiceSchema, FundingOpportunitySchema, HeroHeadingSchema,
        JobSchema, LegalFAQSchema, LegalTopicSchema, NewsArticleSchema,
        NgoSpotlightSchema, PartnerLogoSchema, PhotojournalismPostSchema,
        PremiumSponsorSchema, PressReleaseSchema, PromoVideoSchema,
        ResourceSchema, ShareablePhotoSchema, ShortCollaborationSchema,
        SiteStatSchema, SpecialAdSchema, SpecialistSchema, SponsoredAdSchema,
        TalentProfileSchema
    )

    modules = [
        ('app_config', AppConfig, AppConfigSchema, '/api/app-configs'),
        ('community_ads', CommunityAd, CommunityAdSchema, '/api/community-ads'),
        ('community_posts', CommunityPost, CommunityPostSchema, '/api/community-posts'),
        ('courses', Course, CourseSchema, '/api/courses'),
        ('entrepreneurship', Entrepreneurship, EntrepreneurshipSchema, '/api/entrepreneurships'),
        ('entrepreneurship_tips', EntrepreneurshipTip, EntrepreneurshipTipSchema, '/api/entrepreneurship-tips'),
        ('events', Event, EventSchema, '/api/events'),
        ('freelance_services', FreelanceService, FreelanceServiceSchema, '/api/freelance-services'),
        ('funding_opportunities', FundingOpportunity, FundingOpportunitySchema, '/api/funding-opportunities'),
        ('hero_heading', HeroHeading, HeroHeadingSchema, '/api/hero-headings'),
        ('jobs', Job, JobSchema, '/api/jobs'),
        ('legal_faqs', LegalFAQ, LegalFAQSchema, '/api/legal-faqs'),
        ('legal_topics', LegalTopic, LegalTopicSchema, '/api/legal-topics'),
        ('news_articles', NewsArticle, NewsArticleSchema, '/api/news-articles'),
        ('ngo_spotlights', NgoSpotlight, NgoSpotlightSchema, '/api/ngo-spotlights'),
        ('partner_logos', PartnerLogo, PartnerLogoSchema, '/api/partner-logos'),
        ('photojournalism_posts', PhotojournalismPost, PhotojournalismPostSchema, '/api/photojournalism-posts'),
        ('premium_sponsors', PremiumSponsor, PremiumSponsorSchema, '/api/premium-sponsors'),
        ('press_releases', PressRelease, PressReleaseSchema, '/api/press-releases'),
        ('promo_videos', PromoVideo, PromoVideoSchema, '/api/promo-videos'),
        ('resources', Resource, ResourceSchema, '/api/resources'),
        ('shareable_photos', ShareablePhoto, ShareablePhotoSchema, '/api/shareable-photos'),
        ('short_collaborations', ShortCollaboration, ShortCollaborationSchema, '/api/short-collaborations'),
        ('site_stats', SiteStat, SiteStatSchema, '/api/site-stats'),
        ('special_ads', SpecialAd, SpecialAdSchema, '/api/special-ads'),
        ('specialists', Specialist, SpecialistSchema, '/api/specialists'),
        ('sponsored_ads', SponsoredAd, SponsoredAdSchema, '/api/sponsored-ads'),
        ('talent_profiles', TalentProfile, TalentProfileSchema, '/api/talent-profiles'),
    ]

    for name, model, schema, prefix in modules:
        app.register_blueprint(create_crud_blueprint(name, model, schema, prefix))
    
    # =========================================================================
    # CONSOLE LOG PARA DEBUG (se muestra al iniciar)
    # =========================================================================
    
    print("\n" + "="*60)
    print("🚀 CIPRESS BACKEND INICIADO")
    print("="*60)
    print(f"📅 Hora de inicio: {datetime.utcnow().isoformat()}")
    print(f"🌐 URL: http://localhost:5000")
    print(f"🔗 Frontend esperado: http://localhost:3000")
    print("\n📌 ENDPOINTS SINGULARES (para frontend):")
    print("  • GET  /hero-heading")
    print("  • GET  /app-config")
    print("  • GET  /freelance-services")
    print("  • GET  /ngo-spotlights")
    print("  • GET  /courses")
    print("  • GET  /jobs")
    print("  • GET  /community-ads")
    print("  • GET  /community-posts")
    print("  • GET  /events")
    print("  • GET  /legal-faqs")
    print("  • GET  /legal-topics")
    print("  • GET  /news-articles")
    print("  • GET  /press-releases")
    print("  • GET  /resources")
    print("\n📌 ENDPOINTS API (plural con /api/):")
    print("  • GET  /api/users")
    print("  • GET  /api/hero-headings")
    print("  • GET  /api/app-configs")
    print("  • ... y todos los demás modelos")
    print("="*60 + "\n")

    return app