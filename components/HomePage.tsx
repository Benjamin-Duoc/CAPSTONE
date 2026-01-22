
import React, { useState, useEffect, useRef } from 'react';
import { SearchIcon, PlayIcon, ArrowUpRightIcon, WhatsAppIcon, CalendarIcon, TrophyIcon, BookmarkIcon, ScaleIcon, UserGroupIcon, LightBulbIcon, ChartBarIcon, LatinAmericaMapIcon, BriefcaseIcon, PencilAltIcon, StarIcon } from './icons';
import type { Page, Job, Course, Entrepreneurship, NewsArticle, PremiumSponsor, PromoVideo, CommunityPost, PhotojournalismPost, FreelanceService, CommunityAd, Specialist, ShareablePhoto, Resource, FundingOpportunity, Event, NgoSpotlight, PressRelease, HeroHeading, ShortCollaboration, EntrepreneurshipTip, SponsoredAd, SpecialAd, SiteStat } from '../types';

interface HomePageProps {
  onNavigate: (page: Page, subPage?: string) => void;
  onSelectEntrepreneur: (entrepreneur: Entrepreneurship) => void;
  onSelectSponsor: (sponsor: PremiumSponsor) => void;
  onSelectNewsArticle: (article: NewsArticle) => void;
  onSelectJob: (job: Job) => void;
  onSelectPressRelease: (pressRelease: PressRelease) => void;
  onSelectCourse: (course: Course) => void;
  isAdminMode: boolean;
  courses: Course[];
  jobs: Job[];
  entrepreneurs: Entrepreneurship[];
  newsArticles: NewsArticle[];
  pressReleases: PressRelease[];
  ngoSpotlight: NgoSpotlight[];
  freelanceServices: FreelanceService[];
  communityAds: CommunityAd[];
  premiumSponsors: PremiumSponsor[];
  promoVideos: PromoVideo[];
  communityPosts: CommunityPost[];
  photojournalismPosts: PhotojournalismPost[];
  specialists: Specialist[];
  shareablePhotos: ShareablePhoto[];
  resources: Resource[];
  fundingOpportunities: FundingOpportunity[];
  events: Event[];
  heroHeading: HeroHeading;
  shortCollaborations: ShortCollaboration[];
  entrepreneurshipTips: EntrepreneurshipTip[];
  sponsoredAds: SponsoredAd[];
  specialAds: SpecialAd[];
  stats: SiteStat[];
}

// A custom hook for counting up animation
const useCountUp = (end: number, duration: number, start: boolean) => {
    const [count, setCount] = useState(0);
    const frameRate = 1000 / 60;
    const totalFrames = Math.round(duration / frameRate);

    useEffect(() => {
        if (!start) return;

        let frame = 0;
        const counter = setInterval(() => {
            frame++;
            const progress = frame / totalFrames;
            const currentCount = Math.round(end * progress);
            
            setCount(currentCount);

            if (frame === totalFrames) {
                clearInterval(counter);
                setCount(end); // ensure it ends on the exact number
            }
        }, frameRate);

        return () => clearInterval(counter);
    }, [end, duration, start, frameRate, totalFrames]);

    return count;
};

const StatItem: React.FC<{ icon: React.ReactNode; endValue: number; label: string; start: boolean; prefix?: string }> = ({ icon, endValue, label, start, prefix }) => {
    const count = useCountUp(endValue, 2000, start);
    return (
        <div className="flex flex-col items-center text-center">
            {icon}
            <p className="text-4xl lg:text-5xl font-bold font-serif mt-4">{prefix}{count.toLocaleString('es-CL')}</p>
            <p className="text-lg text-orange-100 mt-2 max-w-xs">{label}</p>
        </div>
    );
};

const StatsCounter: React.FC<{ stats: any[] }> = ({ stats }) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            { threshold: 0.1 }
        );

        const currentRef = ref.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, []);

    return (
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {stats.map((stat, index) => (
                <StatItem 
                    key={index} 
                    icon={stat.icon} 
                    endValue={stat.endValue} 
                    label={stat.label} 
                    prefix={stat.prefix}
                    start={isVisible} 
                />
            ))}
        </div>
    );
};

const NgoSpotlightCard: React.FC<{ item: NgoSpotlight }> = ({ item }) => (
    <div className="bg-surface p-4 rounded-lg group block border border-gray-200 hover:shadow-lg transition-shadow duration-300 text-left w-full">
        <div className="overflow-hidden rounded-md">
             <img src={item.imageUrl} alt={item.title} className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"/>
        </div>
        <span className="text-xs font-bold uppercase text-secondary mt-4 inline-block">{item.institution}</span>
        <h3 className="font-semibold font-serif text-text-primary mt-1">{item.title}</h3>
        <p className="text-sm text-text-secondary mt-1">{item.summary}</p>
    </div>
);

const FeaturedEntrepreneurCard: React.FC<{ entrepreneur: Entrepreneurship; onClick: () => void; label: string; textColor: string; }> = ({ entrepreneur, onClick, label, textColor }) => (
    <button 
        onClick={onClick} 
        className="relative w-full text-left rounded-lg overflow-hidden group col-span-1 md:col-span-2 shadow-xl hover:shadow-2xl transition-shadow duration-300 h-96 focus:outline-none focus:ring-4 focus:ring-primary focus:ring-opacity-50"
    >
        <img 
            src={entrepreneur.imageUrl} 
            alt={entrepreneur.name} 
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="relative p-8 h-full flex flex-col justify-end">
            <span 
                style={{ color: textColor }}
                className="text-base font-bold uppercase tracking-wider"
            >
                {label}
            </span>
            <h3 
                style={{ color: textColor }}
                className="text-5xl font-bold font-serif mt-2"
            >
                {entrepreneur.name}
            </h3>
            <p 
                style={{ color: textColor }}
                className="mt-2 max-w-lg font-bold"
            >
                {entrepreneur.description}
            </p>
        </div>
    </button>
);


const PremiumBannerCard: React.FC<{ sponsor: PremiumSponsor; onClick: () => void; }> = ({ sponsor, onClick }) => (
    <button 
        onClick={onClick} 
        className="block w-full text-left bg-surface rounded-lg overflow-hidden group shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-200 focus:outline-none focus:ring-4 focus:ring-highlight focus:ring-opacity-50"
    >
        <div className="h-32 overflow-hidden bg-gray-100">
            <img 
                src={sponsor.imageUrl} 
                alt={sponsor.name} 
                className="w-full h-full object-cover"
            />
        </div>
        <div className="p-4">
            <h3 className="text-xl font-bold font-serif text-text-primary truncate">{sponsor.name}</h3>
            <p className="text-sm text-text-secondary truncate">{sponsor.tagline}</p>
            <p className="text-base font-bold group-hover:underline mt-2" style={{ color: sponsor.ctaColor }}>
                {sponsor.ctaText} &rarr;
            </p>
        </div>
    </button>
);


// Fix: Updated NewsArticle prop to allow for a generic category string.
// This allows the component to be reused for press releases where 'institution' is used as the category.
const NewsCard: React.FC<{ article: Omit<NewsArticle, 'category'> & { category: string }; onClick: () => void }> = ({ article, onClick }) => (
    <button onClick={onClick} className="bg-surface p-4 rounded-lg group block border border-gray-200 hover:shadow-lg transition-shadow duration-300 text-left w-full">
        <div className="overflow-hidden rounded-md">
             <img src={article.imageUrl} alt={article.title} className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"/>
        </div>
        <span className="text-xs font-bold uppercase text-primary mt-4 inline-block">{article.category}</span>
        <h3 className="font-semibold font-serif text-text-primary mt-1 group-hover:text-primary transition-colors">{article.title}</h3>
    </button>
);

const VideoCard: React.FC<{ video: PromoVideo }> = ({ video }) => (
    <a href="#" className="bg-surface rounded-lg group block border border-gray-200 hover:shadow-lg transition-shadow duration-300 overflow-hidden">
        <div className="relative">
            <img src={video.thumbnailUrl} alt={video.title} className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300" />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <PlayIcon className="h-14 w-14 text-white/70 group-hover:text-white transition-colors duration-300" />
            </div>
        </div>
        <div className="p-4">
            <h3 className="font-semibold font-serif text-text-primary group-hover:text-primary transition-colors">{video.title}</h3>
            <p className="text-sm text-text-secondary mt-1">{video.description}</p>
        </div>
    </a>
);


const JobCard: React.FC<{ job: Job; onSelect: () => void; }> = ({ job, onSelect }) => (
  <button onClick={onSelect} className="bg-surface p-4 rounded-lg flex items-center space-x-4 border border-gray-200 hover:shadow-md transition-shadow duration-300 w-full text-left group">
    <img src={job.logoUrl} alt={`${job.company} logo`} className="w-12 h-12 rounded-full flex-shrink-0 object-cover"/>
    <div className="flex-grow">
        <p className="text-sm text-text-secondary">{job.company}</p>
        <h3 className="font-semibold text-text-primary leading-tight truncate group-hover:text-primary transition-colors">{job.title}</h3>
        <p className="text-xs text-text-secondary">{job.location}</p>
    </div>
    <div className="text-xs font-bold text-primary whitespace-nowrap group-hover:underline">Ver</div>
  </button>
);

const CourseCard: React.FC<{ course: Course, onSelect: () => void }> = ({ course, onSelect }) => (
    <button onClick={onSelect} className="w-full text-left bg-surface rounded-lg overflow-hidden group border border-gray-200 hover:shadow-md transition-shadow duration-300 flex flex-col">
        <img src={course.imageUrl} alt={course.title} className="w-full h-32 object-cover"/>
        <div className="p-4 flex flex-col flex-grow">
            <span className={`text-xs font-bold uppercase ${course.cost === 'Gratis' ? 'text-green-600' : 'text-highlight'}`}>{course.category}</span>
            <h3 className="font-semibold text-base text-text-primary mt-1 flex-grow h-12">{course.title}</h3>
        </div>
    </button>
);

const CommunityPostCard: React.FC<{ post: CommunityPost }> = ({ post }) => (
    <div className="bg-surface p-4 rounded-lg border border-gray-200">
        <div className="flex items-start space-x-3">
            <img src={post.authorAvatarUrl} alt={post.authorName} className="w-10 h-10 rounded-full flex-shrink-0" />
            <div>
                <p className="font-semibold text-text-primary text-sm">{post.authorName}</p>
                <p className="text-sm text-text-secondary italic">"{post.comment}"</p>
            </div>
        </div>
        <a href={post.postUrl} target="_blank" rel="noopener noreferrer" className="mt-3 group flex items-center justify-between bg-background p-3 rounded-md hover:bg-gray-200 transition-colors">
            <span className="font-semibold text-sm text-primary group-hover:underline pr-2">{post.postTitle}</span>
            <ArrowUpRightIcon className="h-5 w-5 text-primary flex-shrink-0" />
        </a>
    </div>
);

const PhotojournalismCard: React.FC<{ post: PhotojournalismPost }> = ({ post }) => (
    <div className="bg-surface rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-300">
        <img src={post.imageUrl} alt={post.title} className="w-full h-auto max-h-[500px] object-cover" />
        <div className="p-6">
            <div className="flex flex-col sm:flex-row items-start justify-between mb-4 gap-4">
                <div>
                    <h3 className="text-2xl font-bold font-serif text-text-primary">{post.title}</h3>
                    <p className="text-sm text-text-secondary">Foto del {post.dateTaken}</p>
                </div>
                <div className="flex items-center space-x-3 flex-shrink-0">
                    <img src={post.photographerAvatarUrl} alt={post.photographerName} className="w-12 h-12 rounded-full object-cover" />
                    <div className="text-right">
                        <p className="font-semibold text-text-primary text-sm">{post.photographerName}</p>
                        <a href={`https://wa.me/${post.whatsappContact}`} target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:underline flex items-center justify-end">
                            <WhatsAppIcon className="h-4 w-4 mr-1" />
                            Contactar
                        </a>
                    </div>
                </div>
            </div>
            <p className="text-text-secondary leading-relaxed whitespace-pre-wrap">{post.caption}</p>
        </div>
    </div>
);

const EntrepreneurialJournalistCard: React.FC<{ service: FreelanceService }> = ({ service }) => (
    <div className="bg-surface rounded-lg border border-gray-200 flex flex-col hover:shadow-md transition-shadow duration-300 h-full group overflow-hidden">
        <div className="h-40 overflow-hidden">
             <img src={service.imageUrl} alt={service.service} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        </div>
        <div className="p-4 flex flex-col flex-grow">
            <span className="text-xs font-bold uppercase text-accent">{service.category}</span>
            <h4 className="font-semibold text-text-primary leading-tight mt-1">{service.service}</h4>
            <p className="text-sm text-text-secondary mt-2 flex-grow">{service.description}</p>
            <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between items-center">
                <div className="flex items-center space-x-1">
                    <StarIcon className="h-5 w-5 text-highlight" />
                    <span className="font-bold text-text-primary">{service.rating.average.toFixed(1)}</span>
                    <span className="text-xs text-text-secondary">/ 7 ({service.rating.count})</span>
                </div>
                <a href={service.portfolioUrl} target="_blank" rel="noopener noreferrer" className="px-4 py-2 text-sm font-bold text-white bg-primary rounded-md hover:bg-orange-600 transition-colors duration-200 shadow-sm shadow-primary/20">
                    Portafolio
                </a>
            </div>
        </div>
    </div>
);

const CommunityAdCard: React.FC<{ ad: CommunityAd }> = ({ ad }) => {
    const categoryColors: { [key in CommunityAd['category']]: string } = {
        'Venta': 'bg-secondary/10 text-secondary',
        'Búsqueda': 'bg-highlight/20 text-yellow-800',
        'Colaboración': 'bg-accent/20 text-green-800',
    };
    
    return (
        <div className="bg-surface p-5 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-200 flex flex-col h-full">
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                    <img src={ad.authorAvatarUrl} alt={ad.authorName} className="w-10 h-10 rounded-full object-cover" />
                    <p className="font-semibold text-text-primary">{ad.authorName}</p>
                </div>
                <span className={`text-xs font-bold px-2 py-1 rounded-full ${categoryColors[ad.category]}`}>{ad.category}</span>
            </div>
            <h3 className="font-bold font-serif text-lg text-text-primary mt-1 flex-grow">{ad.title}</h3>
            <p className="text-sm text-text-secondary my-3">{ad.description}</p>
            <a href={`https://wa.me/${ad.whatsappContact}`} target="_blank" rel="noopener noreferrer" className="w-full mt-auto px-4 py-2 text-sm font-bold text-white bg-[#25D366] rounded-md hover:bg-[#1DAE51] transition-colors flex items-center justify-center space-x-2">
                <WhatsAppIcon className="h-5 w-5" />
                <span>Contactar por WhatsApp</span>
            </a>
        </div>
    );
};

const SpecialistCard: React.FC<{ specialist: Specialist }> = ({ specialist }) => {
    return (
        <div className="bg-surface rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-200 flex flex-col h-full overflow-hidden group">
            <div className="relative h-56">
                <img src={specialist.imageUrl} alt={specialist.name} className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-4">
                    <h3 className="text-2xl font-bold font-serif" style={{ color: specialist.textColor }}>{specialist.name}</h3>
                    <p className="text-base font-bold" style={{ color: specialist.textColor, opacity: 0.9 }}>{specialist.title}</p>
                </div>
            </div>
            <div className="p-4 flex flex-col flex-grow">
                <p className="text-sm text-text-secondary flex-grow">{specialist.specialtyDescription}</p>
                <a 
                    href={`https://wa.me/${specialist.whatsappContact}`} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-full mt-4 px-4 py-2 text-sm font-bold text-white bg-[#25D366] rounded-md hover:bg-[#1DAE51] transition-colors flex items-center justify-center space-x-2"
                >
                    <WhatsAppIcon className="h-5 w-5" />
                    <span>Contactar</span>
                </a>
            </div>
        </div>
    );
};

const ShareablePhotoCard: React.FC<{ photo: ShareablePhoto }> = ({ photo }) => (
    <div className="bg-surface rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-200 flex flex-col h-full overflow-hidden group">
        <div className="relative">
            <img src={photo.imageUrl} alt={photo.caption} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
            <div className="absolute top-2 left-2 flex items-center bg-black/50 p-2 rounded-lg text-base font-bold">
                <img src={photo.photographerAvatarUrl} alt={photo.photographerName} className="w-6 h-6 rounded-full mr-2 border-2 border-white" />
                <span style={{ color: photo.textColor }}>{photo.photographerName}</span>
            </div>
        </div>
        <div className="p-4 flex flex-col flex-grow">
            <p className="text-sm text-text-secondary flex-grow italic">"{photo.caption}"</p>
            <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-xs font-semibold text-text-primary text-center mb-2">¿Necesitas más fotos como esta?</p>
                <a href={`https://wa.me/${photo.whatsappContact}`} target="_blank" rel="noopener noreferrer" className="w-full px-4 py-2 text-sm font-bold text-white bg-[#25D366] rounded-md hover:bg-[#1DAE51] transition-colors flex items-center justify-center space-x-2">
                    <WhatsAppIcon className="h-5 w-5" />
                    <span>Contactar al autor</span>
                </a>
            </div>
        </div>
    </div>
);

const EventCard: React.FC<{ event: Event }> = ({ event }) => (
    <div className="bg-surface p-4 rounded-lg flex items-center space-x-4 border border-gray-200 hover:shadow-md transition-shadow duration-300">
        <div className="flex-shrink-0 text-center bg-background rounded-md p-3 w-20">
            <p className="text-3xl font-bold font-serif text-primary">{event.date.split(' ')[0]}</p>
            <p className="text-sm font-semibold text-text-secondary -mt-1">{event.date.split(' ')[1]}</p>
        </div>
        <div className="flex-grow">
            <span className="text-xs font-bold uppercase text-accent">{event.type}</span>
            <h3 className="font-semibold text-text-primary leading-tight mt-1">{event.title}</h3>
            <p className="text-sm text-text-secondary">{event.location}</p>
        </div>
        <a href={event.link} className="text-xs font-bold text-primary whitespace-nowrap hover:underline self-center">Ver más</a>
    </div>
);

const ResourceCard: React.FC<{ resource: Resource }> = ({ resource }) => (
    <a href={resource.link} className="bg-surface p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow duration-300 group flex flex-col">
        <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-accent tracking-wide">{resource.category}</span>
            <BookmarkIcon className="h-5 w-5 text-gray-300 group-hover:text-accent transition-colors" />
        </div>
        <h3 className="font-semibold text-text-primary mt-2 flex-grow">{resource.name}</h3>
        <p className="text-sm text-text-secondary mt-1">{resource.description}</p>
    </a>
);

const FundingCard: React.FC<{ item: FundingOpportunity }> = ({ item }) => (
    <div className="bg-surface p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow duration-300 flex flex-col">
        <div className="flex items-center justify-between">
            <span className={`text-xs font-bold px-2 py-1 rounded-full ${item.type === 'Fondo' ? 'bg-accent/20 text-green-800' : item.type === 'Beca' ? 'bg-secondary/10 text-secondary' : 'bg-highlight/20 text-yellow-800'}`}>{item.type}</span>
            <TrophyIcon className="h-5 w-5 text-gray-300" />
        </div>
        <h3 className="font-semibold text-text-primary mt-3">{item.title}</h3>
        <p className="text-sm text-text-secondary mt-1">{item.organization}</p>
        <div className="mt-4 pt-3 border-t border-gray-200 flex-grow flex flex-col justify-end">
            <p className="text-xs text-gray-500">Fecha Límite</p>
            <p className="font-bold text-primary">{item.deadline}</p>
        </div>
    </div>
);

const LegalModulePreview: React.FC<{ ad: SpecialAd, onNavigate: (page: Page) => void }> = ({ ad, onNavigate }) => (
    <div className="bg-gradient-to-br from-accent to-lime-600 text-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 group">
        <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 bg-white/20 p-3 rounded-full">
                <ScaleIcon className="h-6 w-6 text-white" />
            </div>
            <div>
                <h3 className="font-bold font-serif text-white">{ad.title}</h3>
                <p className="text-sm text-lime-100 mt-1">{ad.description}</p>
                <button 
                    onClick={() => onNavigate('legal')} 
                    className="mt-4 text-sm font-bold bg-white text-accent px-4 py-2 rounded-md hover:bg-gray-100 transition-colors"
                >
                    {ad.ctaText}
                </button>
            </div>
        </div>
    </div>
);

const EntrepreneurshipAdCard: React.FC<{ ad: SpecialAd }> = ({ ad }) => (
    <div className="bg-gradient-to-br from-secondary to-blue-800 text-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 group">
        <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 bg-white/20 p-3 rounded-full">
                <LightBulbIcon className="h-6 w-6 text-white" />
            </div>
            <div>
                <h3 className="font-bold font-serif text-white">{ad.title}</h3>
                <p className="text-sm text-blue-200 mt-1">{ad.description}</p>
                <button 
                    className="mt-4 text-sm font-bold bg-highlight text-secondary px-4 py-2 rounded-md hover:bg-yellow-300 transition-colors"
                >
                    {ad.ctaText}
                </button>
            </div>
        </div>
    </div>
);

const ShortCollaborationCard: React.FC<{ collaboration: ShortCollaboration }> = ({ collaboration }) => {
    return (
        <div className="bg-surface p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow duration-300 w-full text-left group">
            <div className="flex items-center space-x-3 mb-3">
                <img src={collaboration.authorAvatarUrl} alt={collaboration.author} className="w-10 h-10 rounded-full object-cover" />
                <div>
                    <p className="font-semibold text-sm text-text-primary">{collaboration.author}</p>
                    <p className="text-xs text-text-secondary">Busca Colaborador</p>
                </div>
            </div>
            <h3 className="font-semibold text-text-primary group-hover:text-primary transition-colors leading-tight">{collaboration.title}</h3>
            <div className="flex justify-between items-center text-xs text-text-secondary mt-3 pt-3 border-t border-gray-100">
                <div>
                    <p className="font-bold">Plazo:</p>
                    <p>{collaboration.deadline}</p>
                </div>
                 <div className="text-right">
                    <p className="font-bold">Presupuesto:</p>
                    <p>{collaboration.budget}</p>
                </div>
            </div>
            <a href={`https://wa.me/${collaboration.whatsappContact}`} target="_blank" rel="noopener noreferrer" className="w-full mt-4 px-4 py-2 text-sm font-bold text-white bg-[#25D366] rounded-md hover:bg-[#1DAE51] transition-colors flex items-center justify-center space-x-2">
                <WhatsAppIcon className="h-5 w-5" />
                <span>Contactar</span>
            </a>
        </div>
    )
};

const FeaturedSourceCard: React.FC<{ specialist: Specialist }> = ({ specialist }) => {
    if (!specialist) return null;

    return (
        <div className="bg-surface p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
             <div className="flex items-center space-x-4">
                <img 
                    src={specialist.imageUrl} 
                    alt={specialist.name} 
                    className="w-16 h-16 rounded-full object-cover border-2 border-white shadow"
                />
                <div>
                    <h4 className="font-semibold text-text-primary">{specialist.name}</h4>
                    <p className="text-xs text-primary font-semibold">{specialist.title}</p>
                </div>
            </div>
            <div className="mt-3 pt-3 border-t border-gray-100">
                <p className="text-xs text-text-secondary text-center mb-2">"{specialist.specialtyDescription}"</p>
                <a 
                    href={`https://wa.me/${specialist.whatsappContact}`} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-full mt-2 px-4 py-2 text-xs font-bold text-white bg-[#25D366] rounded-md hover:bg-[#1DAE51] transition-colors flex items-center justify-center space-x-1"
                >
                    <WhatsAppIcon className="h-4 w-4" />
                    <span>Contactar</span>
                </a>
            </div>
        </div>
    );
};

const FundingPreviewCard: React.FC<{ item: FundingOpportunity }> = ({ item }) => (
    <div className="bg-surface p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow duration-300 group">
        <div className="flex justify-between items-start">
            <div>
                <span className={`text-xs font-bold px-2 py-1 rounded-full ${item.type === 'Fondo' ? 'bg-accent/20 text-green-800' : item.type === 'Beca' ? 'bg-secondary/10 text-secondary' : 'bg-highlight/20 text-yellow-800'}`}>{item.type}</span>
                <h4 className="font-semibold text-text-primary mt-2 group-hover:text-primary transition-colors">{item.title}</h4>
                <p className="text-sm text-text-secondary">{item.organization}</p>
            </div>
            <TrophyIcon className="h-6 w-6 text-gray-300 group-hover:text-highlight transition-colors flex-shrink-0 ml-2" />
        </div>
        <div className="mt-3 pt-3 border-t border-gray-100">
            <p className="text-xs text-gray-500">Fecha Límite</p>
            <p className="font-bold text-primary text-sm">{item.deadline}</p>
        </div>
    </div>
);


const AdminButton: React.FC<{onClick: () => void}> = ({onClick}) => (
    <button onClick={onClick} className="ml-4 text-xs font-mono px-2 py-1 bg-highlight text-gray-900 rounded hover:bg-yellow-400 transition-colors">[ Administrar ]</button>
);

const HomePage: React.FC<HomePageProps> = (props) => {
  const { 
    onNavigate, onSelectEntrepreneur, onSelectSponsor, onSelectNewsArticle, onSelectJob, onSelectPressRelease, onSelectCourse, isAdminMode, courses, jobs, entrepreneurs, newsArticles,
    pressReleases, premiumSponsors, specialists, ngoSpotlight, communityPosts,
    freelanceServices, photojournalismPosts, events,
    resources, fundingOpportunities, shareablePhotos, heroHeading, shortCollaborations, entrepreneurshipTips,
    sponsoredAds, communityAds, specialAds, stats
  } = props;
  
  const [isPressReleaseModalOpen, setIsPressReleaseModalOpen] = useState(false);
  const [isSourceModalOpen, setIsSourceModalOpen] = useState(false);
  const [isEntrepreneurModalOpen, setIsEntrepreneurModalOpen] = useState(false);
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const [isCommunityAdModalOpen, setIsCommunityAdModalOpen] = useState(false);
  const [isPhotojournalismModalOpen, setIsPhotojournalismModalOpen] = useState(false);
  const [isCollaborationModalOpen, setIsCollaborationModalOpen] = useState(false);

  const iconMap: { [key in SiteStat['id']]: React.ReactNode } = {
      subscribers: <UserGroupIcon className="h-12 w-12 text-highlight" />,
      visits: <ChartBarIcon className="h-12 w-12 text-highlight" />,
      regions: <LatinAmericaMapIcon className="h-12 w-12 text-highlight" />,
  };

  const statsWithIcons = stats.map(stat => ({
      ...stat,
      icon: iconMap[stat.id]
  }));

  const PressReleasePublicationModal: React.FC<{ onClose: () => void }> = ({ onClose }) => (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4 animate-fade-in" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="modal-title-pr">
          <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-md text-center relative" onClick={e => e.stopPropagation()}>
              <button onClick={onClose} className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-3xl font-bold" aria-label="Cerrar modal">&times;</button>
              <h3 id="modal-title-pr" className="text-2xl font-bold font-serif text-secondary">Beneficio Exclusivo para Suscriptores Gratuitos</h3>
              <p className="mt-4 text-text-secondary">Para publicar un comunicado de prensa, necesitas una suscripción gratuita activa en CiPress.</p>
              <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
                  <button onClick={() => onNavigate('register')} className="px-6 py-3 text-base font-bold text-white bg-primary rounded-md hover:bg-orange-600 transition-colors">
                      Registrarme
                  </button>
                  <a href="#" className="px-6 py-3 text-base font-bold text-secondary bg-gray-200 rounded-md hover:bg-gray-300 transition-colors">
                      Ingresar
                  </a>
              </div>
          </div>
      </div>
  );
  
  const SourcePublicationModal: React.FC<{ onClose: () => void }> = ({ onClose }) => (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4 animate-fade-in" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="modal-title-source">
          <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-md text-center relative" onClick={e => e.stopPropagation()}>
              <button onClick={onClose} className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-3xl font-bold" aria-label="Cerrar modal">&times;</button>
              <h3 id="modal-title-source" className="text-2xl font-bold font-serif text-secondary">Beneficio Exclusivo para Suscriptores Gratuitos</h3>
              <p className="mt-4 text-text-secondary">Para publicar una fuente experta en nuestro repositorio, necesitas una suscripción gratuita activa en CiPress.</p>
              <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
                  <button onClick={() => onNavigate('register')} className="px-6 py-3 text-base font-bold text-white bg-primary rounded-md hover:bg-orange-600 transition-colors">
                      Registrarme
                  </button>
                  <a href="#" className="px-6 py-3 text-base font-bold text-secondary bg-gray-200 rounded-md hover:bg-gray-300 transition-colors">
                      Ingresar
                  </a>
              </div>
          </div>
      </div>
  );

  const EntrepreneurPublicationModal: React.FC<{ onClose: () => void }> = ({ onClose }) => (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4 animate-fade-in" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="modal-title-entrepreneur">
          <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-md text-center relative" onClick={e => e.stopPropagation()}>
              <button onClick={onClose} className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-3xl font-bold" aria-label="Cerrar modal">&times;</button>
              <h3 id="modal-title-entrepreneur" className="text-2xl font-bold font-serif text-secondary">Beneficio Exclusivo para Suscriptores Gratuitos</h3>
              <p className="mt-4 text-text-secondary">Para publicar tu emprendimiento en nuestra vitrina, necesitas una suscripción gratuita activa en CiPress.</p>
              <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
                  <button onClick={() => onNavigate('register')} className="px-6 py-3 text-base font-bold text-white bg-primary rounded-md hover:bg-orange-600 transition-colors">
                      Registrarme
                  </button>
                  <a href="#" className="px-6 py-3 text-base font-bold text-secondary bg-gray-200 rounded-md hover:bg-gray-300 transition-colors">
                      Ingresar
                  </a>
              </div>
          </div>
      </div>
  );

  const PhotoPublicationModal: React.FC<{ onClose: () => void }> = ({ onClose }) => (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4 animate-fade-in" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="modal-title-photo">
          <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-md text-center relative" onClick={e => e.stopPropagation()}>
              <button onClick={onClose} className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-3xl font-bold" aria-label="Cerrar modal">&times;</button>
              <h3 id="modal-title-photo" className="text-2xl font-bold font-serif text-secondary">Beneficio Exclusivo para Suscriptores Gratuitos</h3>
              <p className="mt-4 text-text-secondary">Para publicar tu acierto fotográfico en nuestra galería, necesitas una suscripción gratuita activa en CiPress.</p>
              <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
                  <button onClick={() => onNavigate('register')} className="px-6 py-3 text-base font-bold text-white bg-primary rounded-md hover:bg-orange-600 transition-colors">
                      Registrarme
                  </button>
                  <a href="#" className="px-6 py-3 text-base font-bold text-secondary bg-gray-200 rounded-md hover:bg-gray-300 transition-colors">
                      Ingresar
                  </a>
              </div>
          </div>
      </div>
  );
  
  const PhotojournalismPublicationModal: React.FC<{ onClose: () => void }> = ({ onClose }) => (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4 animate-fade-in" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="modal-title-photojournalism">
          <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-md text-center relative" onClick={e => e.stopPropagation()}>
              <button onClick={onClose} className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-3xl font-bold" aria-label="Cerrar modal">&times;</button>
              <h3 id="modal-title-photojournalism" className="text-2xl font-bold font-serif text-secondary">Beneficio Exclusivo para Suscriptores Gratuitos</h3>
              <p className="mt-4 text-text-secondary">Para publicar tu acierto fotográfico en nuestro repositorio, necesitas una suscripción gratuita activa en CiPress.</p>
              <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
                  <button onClick={() => onNavigate('register')} className="px-6 py-3 text-base font-bold text-white bg-primary rounded-md hover:bg-orange-600 transition-colors">
                      Registrarme
                  </button>
                  <a href="#" className="px-6 py-3 text-base font-bold text-secondary bg-gray-200 rounded-md hover:bg-gray-300 transition-colors">
                      Ingresar
                  </a>
              </div>
          </div>
      </div>
    );

    const CommunityAdPublicationModal: React.FC<{ onClose: () => void }> = ({ onClose }) => (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4 animate-fade-in" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="modal-title-ad">
            <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-md text-center relative" onClick={e => e.stopPropagation()}>
                <button onClick={onClose} className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-3xl font-bold" aria-label="Cerrar modal">&times;</button>
                <h3 id="modal-title-ad" className="text-2xl font-bold font-serif text-secondary">Beneficio Exclusivo para Suscriptores Gratuitos</h3>
                <p className="mt-4 text-text-secondary">Para publicar un aviso clasificado, necesitas una suscripción gratuita activa en CiPress.</p>
                <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
                    <button onClick={() => onNavigate('register')} className="px-6 py-3 text-base font-bold text-white bg-primary rounded-md hover:bg-orange-600 transition-colors">
                        Registrarme
                    </button>
                    <a href="#" className="px-6 py-3 text-base font-bold text-secondary bg-gray-200 rounded-md hover:bg-gray-300 transition-colors">
                        Ingresar
                    </a>
                </div>
            </div>
        </div>
    );
    
    const CollaborationPublicationModal: React.FC<{ onClose: () => void }> = ({ onClose }) => (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4 animate-fade-in" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="modal-title-collab">
            <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-md text-center relative" onClick={e => e.stopPropagation()}>
                <button onClick={onClose} className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-3xl font-bold" aria-label="Cerrar modal">&times;</button>
                <h3 id="modal-title-collab" className="text-2xl font-bold font-serif text-secondary">Beneficio Exclusivo para Suscriptores Gratuitos</h3>
                <p className="mt-4 text-text-secondary">Para publicar un aviso de colaboración, necesitas una suscripción gratuita activa en CiPress.</p>
                <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
                    <button onClick={() => onNavigate('register')} className="px-6 py-3 text-base font-bold text-white bg-primary rounded-md hover:bg-orange-600 transition-colors">
                        Registrarme
                    </button>
                    <a href="#" className="px-6 py-3 text-base font-bold text-secondary bg-gray-200 rounded-md hover:bg-gray-300 transition-colors">
                        Ingresar
                    </a>
                </div>
            </div>
        </div>
    );

  const SponsoredAdCard: React.FC<{ ad: SponsoredAd }> = ({ ad }) => (
    <a href={ad.ctaLink} target="_blank" rel="noopener noreferrer" className="block relative bg-surface rounded-lg border border-gray-200 hover:shadow-lg transition-shadow duration-300 group overflow-hidden h-64 text-left">
        <img src={ad.imageUrl} alt={ad.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-4 w-full">
            <p className="text-sm font-bold text-white uppercase tracking-wider opacity-80">{ad.advertiser}</p>
            <h4 className="font-semibold text-lg text-white mt-1">{ad.title}</h4>
            <div className="mt-4">
                <span className="bg-highlight text-secondary text-sm font-bold px-4 py-2 rounded-md group-hover:bg-yellow-300 transition-colors">
                    {ad.ctaText}
                </span>
            </div>
        </div>
        <span className="absolute top-2 right-2 text-xs font-bold text-text-secondary bg-background/80 px-2 py-1 rounded-full backdrop-blur-sm">Anuncio</span>
    </a>
  );

  const ClassifiedAdCard: React.FC<{ ad: CommunityAd }> = ({ ad }) => (
    <div className="bg-surface p-3 rounded-lg border border-gray-200 hover:shadow-sm transition-shadow duration-300 group flex items-center justify-between">
        <div className="flex-grow overflow-hidden">
            <h4 className="font-semibold text-sm text-text-primary group-hover:text-primary transition-colors truncate">{ad.title}</h4>
            <div className="flex items-center space-x-2 mt-1">
                <img src={ad.authorAvatarUrl} alt={ad.authorName} className="w-5 h-5 rounded-full object-cover" />
                <p className="text-xs text-text-secondary truncate">{ad.authorName}</p>
            </div>
        </div>
        <a 
            href={`https://wa.me/${ad.whatsappContact}`} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex-shrink-0 ml-2 p-2 rounded-full bg-green-100 hover:bg-green-200 transition-colors"
            aria-label="Contactar por WhatsApp"
        >
            <WhatsAppIcon className="h-5 w-5 text-green-600" />
        </a>
    </div>
  );

  // Sort news articles by ID (newest first - higher IDs are more recent)
  const sortedNewsArticles = [...newsArticles].sort((a, b) => b.id - a.id);
  const mainNewsArticle = sortedNewsArticles[0];
  const otherNewsArticles = sortedNewsArticles.slice(1, 3);
  const entrepreneurshipTip = [...entrepreneurshipTips].sort((a, b) => b.id - a.id)[0];
  const legalAd = specialAds.find(ad => ad.id === 'legal');
  const entrepreneurshipAd = specialAds.find(ad => ad.id === 'entrepreneurship');

  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 space-y-16 py-12">
        
        {/* Hero Section: Featured Entrepreneur */}
        <section>
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="font-serif text-3xl md:text-4xl font-bold text-text-primary">
                  {heroHeading.mainText} <span className="text-primary">{heroHeading.highlightedText}</span>.
              </h1>
              {heroHeading.subText && <p className="mt-2 text-xl text-text-secondary">{heroHeading.subText}</p>}
            </div>
            {isAdminMode && <AdminButton onClick={() => onNavigate('admin')} />}
          </div>
          {entrepreneurs.length > 0 && 
            <FeaturedEntrepreneurCard 
                entrepreneur={entrepreneurs[0]} 
                onClick={() => onSelectEntrepreneur(entrepreneurs[0])}
                label={heroHeading.featuredLabel}
                textColor={heroHeading.textColor}
            />
          }
        </section>

        {/* Premium Sponsors Section */}
        <section>
            <div className="flex items-center justify-center mb-4">
                <h2 className="text-center text-lg font-semibold text-text-secondary tracking-widest uppercase">Confían en CiPress</h2>
                {isAdminMode && <AdminButton onClick={() => onNavigate('admin')} />}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {premiumSponsors.map(sponsor => (
                    <PremiumBannerCard key={sponsor.id} sponsor={sponsor} onClick={() => onSelectSponsor(sponsor)} />
                ))}
            </div>
        </section>


        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: News & Analysis */}
            <div className="lg:col-span-2 space-y-16">

                {/* News & Analysis Section */}
                <section>
                    <div className="flex justify-between items-center border-b-2 border-primary pb-2 mb-6">
                        <h2 className="text-3xl font-bold font-serif text-text-primary">Innovación para el Periodismo Emprendedor</h2>
                        <button onClick={() => onNavigate('analysis')} className="font-semibold text-primary hover:underline">Ver todo &rarr;</button>
                        {isAdminMode && <AdminButton onClick={() => onNavigate('admin', 'news')} />}
                    </div>
                    {mainNewsArticle && (
                        <div className="grid grid-cols-1 gap-6">
                            <button onClick={() => onSelectNewsArticle(mainNewsArticle)} className="bg-surface rounded-lg group block border border-gray-200 hover:shadow-lg transition-shadow duration-300 text-left shadow-md grid md:grid-cols-2 gap-4">
                                <div className="p-6 flex flex-col justify-center">
                                    <span className="text-xs font-bold uppercase text-primary tracking-wide">{mainNewsArticle.category}</span>
                                    <h3 className="text-3xl font-bold font-serif text-text-primary mt-3 group-hover:text-primary transition-colors">{mainNewsArticle.title}</h3>
                                    <p className="text-text-secondary mt-4 text-base">{mainNewsArticle.summary}</p>
                                </div>
                                <div className="p-4">
                                    <div className="overflow-hidden rounded-md h-64">
                                        <img src={mainNewsArticle.imageUrl} alt={mainNewsArticle.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"/>
                                    </div>
                                </div>
                            </button>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {otherNewsArticles.map(article => (
                                    <NewsCard key={article.id} article={article} onClick={() => onSelectNewsArticle(article)} />
                                ))}
                            </div>
                        </div>
                    )}
                </section>

                {/* Press Releases Section */}
                <section>
                    <div className="flex justify-between items-center border-b-2 border-secondary pb-2 mb-6">
                        <h2 className="text-3xl font-bold font-serif text-text-primary">Periodistas en Acción</h2>
                        <button onClick={() => onNavigate('press-releases')} className="font-semibold text-secondary hover:underline">Ver todo &rarr;</button>
                        {isAdminMode && <AdminButton onClick={() => onNavigate('admin')} />}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {pressReleases.slice(0, 4).map(release => (
                            <NewsCard 
                                key={release.id} 
                                article={{
                                    ...release,
                                    category: release.institution,
                                }} 
                                onClick={() => onSelectPressRelease(release)} 
                            />
                        ))}
                    </div>
                    <div className={`bg-secondary/5 p-4 rounded-lg mt-8 border border-secondary/10 flex flex-col sm:flex-row justify-between items-center text-center sm:text-left gap-4 bg-[url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20'%3e%3cpath d='M-5,5 l10,-10 M0,20 l20,-20 M15,25 l10,-10' stroke='%231e3a8a' stroke-width='1' stroke-opacity='0.2'/%3e%3c/svg%3e")]`}>
                        <div>
                            <h3 className="font-semibold text-base text-secondary">¿Tienes una noticia que contar?</h3>
                            <p className="text-xs text-blue-800">Con tu suscripción gratuita, publica tu comunicado directamente en nuestra plataforma.</p>
                        </div>
                        <button 
                            onClick={() => setIsPressReleaseModalOpen(true)}
                            className="flex-shrink-0 px-5 py-2 text-sm font-bold text-white bg-secondary rounded-md hover:bg-blue-900 transition-colors duration-200 shadow-sm"
                        >
                            Sube tu comunicado
                        </button>
                    </div>
                </section>

                {/* Courses Section */}
                <section>
                    <div className="flex justify-between items-center border-b-2 border-primary pb-2 mb-6">
                        <h2 className="text-3xl font-bold font-serif text-text-primary">Capacitación</h2>
                        <button onClick={() => onNavigate('courses')} className="font-semibold text-primary hover:underline">Ver todo &rarr;</button>
                        {isAdminMode && <AdminButton onClick={() => onNavigate('admin')} />}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                        {courses.slice(0, 4).map(course => <CourseCard key={course.id} course={course} onSelect={() => onSelectCourse(course)} />)}
                    </div>
                </section>
                
                {/* Emprender es Mundial Section */}
                {entrepreneurshipTip && (
                    <section>
                        <div className="flex justify-between items-center border-b-2 border-highlight pb-2 mb-6">
                            <h2 className="text-3xl font-bold font-serif text-text-primary">Emprender es Mundial</h2>
                            {isAdminMode && <AdminButton onClick={() => onNavigate('admin')} />}
                        </div>
                        <a href={entrepreneurshipTip.videoUrl} target="_blank" rel="noopener noreferrer" className="relative block w-full h-80 rounded-lg overflow-hidden group shadow-xl hover:shadow-2xl transition-shadow duration-300">
                            <img src={entrepreneurshipTip.thumbnailUrl} alt={entrepreneurshipTip.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <PlayIcon className="h-20 w-20 text-white/70 group-hover:text-white transition-all duration-300 transform group-hover:scale-110" />
                            </div>
                            <div className="relative p-8 h-full flex flex-col justify-end text-white">
                                <h3 className="text-3xl font-bold font-serif">{entrepreneurshipTip.title}</h3>
                                <p className="mt-2 max-w-2xl text-lg">{entrepreneurshipTip.description}</p>
                                <p className="mt-4 font-semibold text-highlight">{entrepreneurshipTip.expertName}, <span className="font-normal text-white">{entrepreneurshipTip.expertTitle}</span></p>
                            </div>
                        </a>
                    </section>
                )}

                {/* Entrepreneurial Journalists Section */}
                <section>
                    <div className="flex justify-between items-center border-b-2 border-accent pb-2 mb-6">
                        <h2 className="text-3xl font-bold font-serif text-text-primary">Emprendimientos Periodísticos</h2>
                        <button onClick={() => onNavigate('entrepreneurship')} className="font-semibold text-accent hover:underline">Ver todos &rarr;</button>
                        {isAdminMode && <AdminButton onClick={() => onNavigate('admin')} />}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {freelanceServices.slice(0, 3).map(service => (
                            <EntrepreneurialJournalistCard key={service.id} service={service} />
                        ))}
                    </div>
                    <div className={`bg-accent/5 p-4 rounded-lg mt-8 border border-accent/10 flex flex-col sm:flex-row justify-between items-center text-center sm:text-left gap-4 bg-[url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20'%3e%3cpath d='M-5,5 l10,-10 M0,20 l20,-20 M15,25 l10,-10' stroke='%2384cc16' stroke-width='1' stroke-opacity='0.2'/%3e%3c/svg%3e")]`}>
                        <div>
                            <h3 className="font-semibold text-base text-green-800">¿Tienes un medio, agencia o empresa establecida?</h3>
                            <p className="text-xs text-green-700">Suscríbete gratis a nuestra página y dale visibilidad en nuestra vitrina para captar nuevos clientes.</p>
                        </div>
                        <button 
                            onClick={() => setIsEntrepreneurModalOpen(true)}
                            className="flex-shrink-0 px-5 py-2 text-sm font-bold text-white bg-accent rounded-md hover:bg-lime-600 transition-colors duration-200 shadow-sm"
                        >
                            Sube tu empresa
                        </button>
                    </div>
                </section>

                {/* Community Activity Section */}
                <section>
                     <div className="flex justify-between items-center border-b-2 border-accent pb-2 mb-6">
                        <h2 className="text-3xl font-bold font-serif text-text-primary">Actividad de la Comunidad</h2>
                        <button onClick={() => onNavigate('community-post')} className="font-semibold text-accent hover:underline">Ver toda la actividad &rarr;</button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {communityPosts.slice(0, 4).map(post => <CommunityPostCard key={post.id} post={post} />)}
                    </div>
                    <div className={`bg-accent/5 p-4 rounded-lg mt-8 border border-accent/10 flex flex-col sm:flex-row justify-between items-center text-center sm:text-left gap-4 bg-[url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20'%3e%3cpath d='M-5,5 l10,-10 M0,20 l20,-20 M15,25 l10,-10' stroke='%2384cc16' stroke-width='1' stroke-opacity='0.2'/%3e%3c/svg%3e")]`}>
                        <div>
                            <h3 className="font-semibold text-base text-green-800">¿Quieres iniciar un debate?</h3>
                            <p className="text-xs text-green-700">Comparte enlaces, ideas y opiniones con la comunidad de innovadores.</p>
                        </div>
                        <button 
                            onClick={() => onNavigate('community-post')}
                            className="flex-shrink-0 px-5 py-2 text-sm font-bold text-white bg-accent rounded-md hover:bg-lime-600 transition-colors duration-200 shadow-sm"
                        >
                            Publicar en la comunidad
                        </button>
                    </div>
                </section>
                
                {/* Photojournalism Section */}
                <section>
                    <div className="flex justify-between items-center border-b-2 border-primary pb-2 mb-6">
                        <h2 className="text-3xl font-bold font-serif text-text-primary">Foto-Periodismo</h2>
                        <button onClick={() => onNavigate('photojournalism')} className="font-semibold text-primary hover:underline">Ver repositorio &rarr;</button>
                        {isAdminMode && <AdminButton onClick={() => onNavigate('admin')} />}
                    </div>
                    {photojournalismPosts.length > 0 && <PhotojournalismCard post={photojournalismPosts[0]} />}
                    
                    <div className="bg-primary/5 p-4 rounded-lg mt-8 border border-primary/10 flex flex-col sm:flex-row justify-between items-center text-center sm:text-left gap-4">
                        <div>
                            <h3 className="font-semibold text-base text-primary">¿Capturaste un momento noticioso?</h3>
                            <p className="text-xs text-orange-800">Con tu suscripción gratuita, publica tu acierto y dale difusión a tu perspectiva.</p>
                        </div>
                        <button 
                            onClick={() => setIsPhotojournalismModalOpen(true)}
                            className="flex-shrink-0 px-5 py-2 text-sm font-bold text-white bg-primary rounded-md hover:bg-orange-600 transition-colors duration-200 shadow-sm"
                        >
                            Sube tu foto
                        </button>
                    </div>
                </section>
                
            </div>

            {/* Right Sidebar */}
            <aside className="lg:col-span-1 space-y-8">
                {/* Opportunities Section */}
                <section>
                    <div className="flex justify-between items-center border-b-2 border-secondary pb-2 mb-4">
                        <h3 className="text-2xl font-bold font-serif text-text-primary">Oportunidades Laborales</h3>
                        <button onClick={() => onNavigate('opportunities')} className="font-semibold text-secondary hover:underline text-sm">Ver todas</button>
                        {isAdminMode && <AdminButton onClick={() => onNavigate('admin')} />}
                    </div>
                    <div className="space-y-4">
                        {jobs.slice(0, 2).map(job => <JobCard key={job.id} job={job} onSelect={() => onSelectJob(job)} />)}
                    </div>
                </section>
                
                 {/* Urgent Collaborations Section */}
                <section className="bg-primary/5 border border-primary/10 rounded-lg p-6 space-y-4">
                    <div className="flex items-center space-x-3">
                        <LightBulbIcon className="h-8 w-8 text-primary" />
                        <h3 className="text-2xl font-bold font-serif text-primary">Colaboraciones Urgentes</h3>
                    </div>
                    <div className="space-y-4">
                        {shortCollaborations.slice(0, 2).map(collab => <ShortCollaborationCard key={collab.id} collaboration={collab} />)}
                    </div>
                    <button
                        onClick={() => setIsCollaborationModalOpen(true)}
                        className="w-full mt-4 py-2 text-sm font-bold text-white bg-primary rounded-md hover:bg-orange-600 transition-colors shadow-md">
                        Sube tu aviso
                    </button>
                </section>
                
                {sponsoredAds.length > 0 && <SponsoredAdCard ad={sponsoredAds[0]} />}

                {/* Featured Source Section */}
                <section className="bg-secondary/5 border border-secondary/10 rounded-lg p-6 space-y-4">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-3">
                            <UserGroupIcon className="h-8 w-8 text-secondary" />
                            <h3 className="text-2xl font-bold font-serif text-secondary">Fuentes Destacadas</h3>
                        </div>
                        <button onClick={() => onNavigate('specialists')} className="font-semibold text-secondary hover:underline text-sm">Ver todas</button>
                    </div>
                    <div className="space-y-4">
                        {specialists.slice(0, 3).map(specialist => (
                            <FeaturedSourceCard key={specialist.id} specialist={specialist} />
                        ))}
                    </div>
                    <div className="bg-secondary/10 p-4 rounded-lg text-center mt-2 border border-secondary/20">
                        <h4 className="font-bold text-secondary">¿Conoces a un experto?</h4>
                        <p className="mt-1 text-xs text-blue-800">Promueve tus fuentes confiables en la comunidad periodística. Es un beneficio gratuito para suscriptores.</p>
                        <button
                            onClick={() => setIsSourceModalOpen(true)}
                            className="mt-3 inline-block px-4 py-2 text-sm font-bold text-white bg-secondary rounded-md hover:bg-blue-900 transition-colors duration-200"
                        >
                            Sube tu fuente
                        </button>
                    </div>
                </section>

                {/* SWAPPED: Was Events Section, now it's a NubeVeloz Ad */}
                {sponsoredAds.length > 1 && <SponsoredAdCard ad={sponsoredAds[1]} />}

                {/* Funding Section */}
                <section>
                    <div className="flex justify-between items-center border-b-2 border-secondary pb-2 mb-4">
                        <h3 className="text-2xl font-bold font-serif text-text-primary">Fondos & Becas</h3>
                        <button onClick={() => onNavigate('funding')} className="font-semibold text-secondary hover:underline text-sm">Ver todos</button>
                        {isAdminMode && <AdminButton onClick={() => onNavigate('admin')} />}
                    </div>
                    <div className="space-y-4">
                        {fundingOpportunities.slice(0, 2).map(item => <FundingPreviewCard key={item.id} item={item} />)}
                    </div>
                </section>

                {/* SWAPPED: Was Ad Section, now contains Events and the other NubeVeloz Ad */}
                <section>
                    <div className="space-y-8">
                        {/* Events Section content moved here */}
                        <div>
                            <div className="flex justify-between items-center border-b-2 border-secondary pb-2 mb-4">
                                <h3 className="text-2xl font-bold font-serif text-text-primary">Próximos Eventos</h3>
                                <button onClick={() => onNavigate('events')} className="font-semibold text-secondary hover:underline text-sm">Ver calendario</button>
                            </div>
                            <div className="space-y-4">
                                {events.slice(0, 3).map(event => <EventCard key={event.id} event={event} />)}
                            </div>
                        </div>
                        {/* The remaining ad(s) from sponsoredAds */}
                        {sponsoredAds.slice(2).map(ad => <SponsoredAdCard key={ad.id} ad={ad} />)}
                    </div>
                </section>

                {/* Entrepreneurship Ad */}
                <section>
                    {entrepreneurshipAd && <EntrepreneurshipAdCard ad={entrepreneurshipAd} />}
                </section>

                {/* Classified Ads Section */}
                <section>
                    <div className="bg-surface p-4 rounded-lg shadow-md border border-gray-200">
                        <h3 className="font-bold font-serif text-text-primary text-center mb-3">Avisos Clasificados</h3>
                        <p className="text-xs text-center text-text-secondary mb-3">Compra y venta de equipos, libros y lo que sea sin clasificación.</p>
                        <div className="space-y-3">
                            {communityAds.slice(0, 2).map(ad => (
                                <ClassifiedAdCard key={ad.id} ad={ad} />
                            ))}
                        </div>
                        <div className="mt-4 grid grid-cols-2 gap-2">
                             <button
                                onClick={() => onNavigate('community-ads')}
                                className="w-full py-2 text-sm font-bold text-secondary bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
                            >
                                Ver más
                            </button>
                            <button
                                onClick={() => setIsCommunityAdModalOpen(true)}
                                className="w-full py-2 text-sm font-bold text-white bg-secondary rounded-md hover:bg-blue-800 transition-colors"
                            >
                                Sube tu aviso
                            </button>
                        </div>
                    </div>
                </section>
                
                {/* Legal Module Preview */}
                <section>
                    {legalAd && <LegalModulePreview ad={legalAd} onNavigate={onNavigate} />}
                </section>
                
                {/* Contact Section */}
                <section>
                    <div className="bg-surface p-6 rounded-lg shadow-md border border-gray-200">
                        <h3 className="text-xl font-bold font-serif text-text-primary mb-2">Contacto CiPress</h3>
                        <p className="text-sm text-text-secondary">
                            ¿Tienes ideas, sugerencias o material para visibilizar en nuestra plataforma? Escríbenos a <a href="mailto:contacto@cipress.cl" className="text-primary font-semibold hover:underline">contacto@cipress.cl</a>.
                        </p>
                    </div>
                </section>

            </aside>
        </div>

        {/* Photo Gallery Section */}
        <section>
            <div className="flex justify-between items-center border-b-2 border-secondary pb-2 mb-6">
                <h2 className="text-3xl font-bold font-serif text-text-primary">Galería Fotográfica</h2>
                <button onClick={() => onNavigate('photo-gallery')} className="font-semibold text-secondary hover:underline">Ver galería completa &rarr;</button>
                {isAdminMode && <AdminButton onClick={() => onNavigate('admin')} />}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {shareablePhotos.slice(0, 4).map(photo => <ShareablePhotoCard key={photo.id} photo={photo} />)}
            </div>
             <div className={`bg-secondary/5 p-4 rounded-lg mt-8 border border-secondary/10 flex flex-col sm:flex-row justify-between items-center text-center sm:text-left gap-4 bg-[url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20'%3e%3cpath d='M-5,5 l10,-10 M0,20 l20,-20 M15,25 l10,-10' stroke='%231e3a8a' stroke-width='1' stroke-opacity='0.2'/%3e%3c/svg%3e")]`}>
                <div>
                    <h3 className="font-semibold text-base text-secondary">¿Tienes material gráfico para vender o compartir? ¿Haces fotografía profesional para eventos?</h3>
                    <p className="text-xs text-blue-800">Sube una muestra de tu trabajo y sé contactado por quienes lo buscan.</p>
                </div>
                <button
                    onClick={() => setIsPhotoModalOpen(true)}
                    className="flex-shrink-0 px-5 py-2 text-sm font-bold text-white bg-secondary rounded-md hover:bg-blue-900 transition-colors duration-200 shadow-sm"
                >
                    Sube tu foto
                </button>
            </div>
        </section>

        {/* New Opportunities Banner */}
        <section>
            <div className="bg-gradient-to-r from-secondary to-blue-900 text-white rounded-lg p-8 md:p-12">
                <div className="text-center mb-10">
                    <h2 className="text-3xl md:text-4xl font-bold font-serif text-white">Conecta con tu Próxima Oportunidad Laboral</h2>
                    <p className="mt-2 text-lg text-blue-200 max-w-2xl mx-auto">Explora ofertas de trabajo disponibles en el mercado, únete a nuestra base de talentos o promociona tus servicios freelance.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <button onClick={() => onNavigate('opportunities', 'jobs')} className="bg-white/10 p-8 rounded-lg text-center hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-1 group">
                        <div className="inline-block p-4 bg-primary rounded-full mb-4">
                            <BriefcaseIcon className="h-8 w-8 text-white" />
                        </div>
                        <h3 className="text-xl font-bold font-serif text-white">Revisar Ofertas</h3>
                        <p className="mt-2 text-blue-200">Encuentra tu próximo desafío profesional en nuestra bolsa de trabajo exclusiva para comunicadores.</p>
                        <span className="mt-4 inline-block font-semibold text-highlight group-hover:underline">Explorar &rarr;</span>
                    </button>
                    <button onClick={() => onNavigate('opportunities', 'talents')} className="bg-white/10 p-8 rounded-lg text-center hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-1 group">
                        <div className="inline-block p-4 bg-accent rounded-full mb-4">
                            <UserGroupIcon className="h-8 w-8 text-white" />
                        </div>
                        <h3 className="text-xl font-bold font-serif text-white">Banco de Talentos</h3>
                        <p className="mt-2 text-blue-200">Inscríbete en nuestro directorio de profesionales y deja que las oportunidades te encuentren a ti.</p>
                        <span className="mt-4 inline-block font-semibold text-highlight group-hover:underline">Inscribirse &rarr;</span>
                    </button>
                    <button onClick={() => onNavigate('opportunities', 'classifieds')} className="bg-white/10 p-8 rounded-lg text-center hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-1 group">
                        <div className="inline-block p-4 bg-highlight rounded-full mb-4">
                            <PencilAltIcon className="h-8 w-8 text-white" />
                        </div>
                        <h3 className="text-xl font-bold font-serif text-white">Ofrecer Servicios</h3>
                        <p className="mt-2 text-blue-200">¿Eres freelance? Promociona tus servicios de redacción, fotografía, gestión de redes y más.</p>
                        <span className="mt-4 inline-block font-semibold text-highlight group-hover:underline">Publicar &rarr;</span>
                    </button>
                </div>
            </div>
        </section>

        {/* Stats Counter Section */}
        <section className="bg-gradient-to-br from-orange-400 to-orange-500 text-white py-16 rounded-lg">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold font-serif">Somos el Círculo de Periodistas Emprendedores e Innovadores de Chile</h2>
            </div>
            <StatsCounter stats={statsWithIcons} />
        </section>
      </div>
      
      {isPressReleaseModalOpen && <PressReleasePublicationModal onClose={() => setIsPressReleaseModalOpen(false)} />}
      {isSourceModalOpen && <SourcePublicationModal onClose={() => setIsSourceModalOpen(false)} />}
      {isEntrepreneurModalOpen && <EntrepreneurPublicationModal onClose={() => setIsEntrepreneurModalOpen(false)} />}
      {isPhotoModalOpen && <PhotoPublicationModal onClose={() => setIsPhotoModalOpen(false)} />}
      {isCommunityAdModalOpen && <CommunityAdPublicationModal onClose={() => setIsCommunityAdModalOpen(false)} />}
      {isPhotojournalismModalOpen && <PhotojournalismPublicationModal onClose={() => setIsPhotojournalismModalOpen(false)} />}
      {isCollaborationModalOpen && <CollaborationPublicationModal onClose={() => setIsCollaborationModalOpen(false)} />}
    </div>
  );
};

export default HomePage;