from flask import Blueprint, jsonify
from datetime import datetime, timedelta
from app.models.all_models import PressRelease, User
from app.schemas.all_schemas import PressReleaseSchema

home_bp = Blueprint('home_routes', __name__)

@home_bp.route('/api/featured-content', methods=['GET'])
def get_featured_content():
    """
    Returns exactly 4 featured news/press releases for the home page
    based on the strict time-of-day and role business rules.
    """
    now = datetime.now()
    current_hour = now.hour
    
    # Query base: PressReleases joined with User
    # We use a join to be able to filter by user's role
    query = PressRelease.query.outerjoin(User, PressRelease.author_user_id == User.id)
    
    results = []
    
    # ---------------------------------------------------------
    # PRIME TIME (08:00 AM - 11:59 AM)
    # ---------------------------------------------------------
    if 8 <= current_hour < 12:
        three_hours_ago = now - timedelta(hours=3)
        premium_posts = query.filter(
            User.role == 'Colaborador Premium',
            PressRelease.created_at >= three_hours_ago
        ).order_by(PressRelease.created_at.desc()).limit(4).all()
        
        results.extend(premium_posts)
        
        # Fill empty slots with Free posts if less than 4 Premium posts available
        slots_to_fill = 4 - len(premium_posts)
        if slots_to_fill > 0:
            free_posts = query.filter(
                (User.role == 'Colaborador Gratis') | (User.role.is_(None))
            ).order_by(PressRelease.created_at.desc()).limit(slots_to_fill).all()
            results.extend(free_posts)
            
    # ---------------------------------------------------------
    # THE GHOST / FALLBACK TIME (04:00 AM - 07:59 AM)
    # ---------------------------------------------------------
    elif 4 <= current_hour < 8:
        # Show top 4 most recent Free posts statically
        results = query.filter(
            (User.role == 'Colaborador Gratis') | (User.role.is_(None))
        ).order_by(PressRelease.created_at.desc()).limit(4).all()
        
    # ---------------------------------------------------------
    # FREE ROTATION (12:00 PM - 03:59 AM)
    # ---------------------------------------------------------
    else:
        all_free_posts = query.filter(
            (User.role == 'Colaborador Gratis') | (User.role.is_(None))
        ).order_by(PressRelease.created_at.desc()).all()
        
        if all_free_posts:
            page_size = 4
            total_pages = max(1, (len(all_free_posts) + page_size - 1) // page_size)
            
            # Rotate pages every hour
            current_page_idx = current_hour % total_pages
            
            start_idx = current_page_idx * page_size
            end_idx = start_idx + page_size
            results = all_free_posts[start_idx:end_idx]
            
    # Dump exactly 4 (or less if not enough in DB)
    schema = PressReleaseSchema(many=True)
    return jsonify(schema.dump(results[:4])), 200
