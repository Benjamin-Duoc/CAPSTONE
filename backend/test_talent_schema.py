from app import create_app
from app.extensions import db
from app.schemas.all_schemas import TalentProfileSchema

app = create_app()

with app.app_context():
    schema = TalentProfileSchema()
    data = {
        "name": "Test",
        "avatar_url": "https://i.pravatar.cc/150",
        "title": "Ingeniero",
        "skills": ["a", "b", "c"],
        "availability": "Remoto",
        "expected_salary": "",
        "region": "Santiago",
        "linkedin_url": "",
        "experience_years": 0
    }
    try:
        profile = schema.load(data, session=db.session)
        print("Success:", profile)
    except Exception as e:
        print("Validation Error:", str(e))
