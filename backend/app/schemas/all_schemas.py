from app.extensions import ma
from app.models.all_models import *

class UserSchema(ma.SQLAlchemyAutoSchema):
    firstName = ma.String(attribute='first_name')
    lastName = ma.String(attribute='last_name')
    
    class Meta:
        model = User
        load_instance = True
        exclude = ('password_hash', 'role_rel', 'first_name', 'last_name') # Exclude internal/sensitive and redundant fields

class AppConfigSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = AppConfig
        load_instance = True

class SiteStatSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = SiteStat
        load_instance = True

class HeroHeadingSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = HeroHeading
        load_instance = True

class NewsArticleSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = NewsArticle
        load_instance = True

class PressReleaseSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = PressRelease
        load_instance = True

class PhotojournalismPostSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = PhotojournalismPost
        load_instance = True

class CommunityPostSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = CommunityPost
        load_instance = True

class CommunityAdSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = CommunityAd
        load_instance = True

class ShortCollaborationSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = ShortCollaboration
        load_instance = True

class CourseSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Course
        load_instance = True

class EntrepreneurshipSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Entrepreneurship
        load_instance = True

class EntrepreneurshipTipSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = EntrepreneurshipTip
        load_instance = True

class EventSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Event
        load_instance = True

class FundingOpportunitySchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = FundingOpportunity
        load_instance = True

class JobSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Job
        load_instance = True

class FreelanceServiceSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = FreelanceService
        load_instance = True

class LegalTopicSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = LegalTopic
        load_instance = True

class LegalFAQSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = LegalFAQ
        load_instance = True

class PromoVideoSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = PromoVideo
        load_instance = True

class NgoSpotlightSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = NgoSpotlight
        load_instance = True

class ShareablePhotoSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = ShareablePhoto
        load_instance = True

class PartnerLogoSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = PartnerLogo
        load_instance = True

class SponsoredAdSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = SponsoredAd
        load_instance = True

class PremiumSponsorSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = PremiumSponsor
        load_instance = True

class TalentProfileSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = TalentProfile
        load_instance = True

class SpecialistSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Specialist
        load_instance = True

class SpecialAdSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = SpecialAd
        load_instance = True

class ResourceSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Resource
        load_instance = True
