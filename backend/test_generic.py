from app import create_app
from app.models.all_models import AppConfig, Course
from app.services.generic_service import GenericService

app = create_app()
with app.app_context():
    print("Testing Course:")
    print(GenericService(Course).get_all())
    print("Testing AppConfig:")
    print(GenericService(AppConfig).get_all())
