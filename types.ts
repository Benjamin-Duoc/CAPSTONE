
export type Page = 'home' | 'courses' | 'entrepreneurship' | 'opportunities' | 'analysis' | 'contact' | 'community-ads' | 'specialists' | 'photo-gallery' | 'resources' | 'funding' | 'events' | 'legal' | 'photojournalism' | 'admin' | 'press-releases' | 'about' | 'privacy-policy' | 'terms-of-service' | 'community-post' | 'register' | 'login';

export interface User {
    id: number;
    firstName: string;
    lastName: string;
    region: string;
    email: string;
    password: string;
}

export type ReportContentItem =
  | { type: 'paragraph'; text: string }
  | { type: 'image'; src: string; alt: string }
  | { type: 'quote'; text: string; author?: string };

export interface Course {
  id: number;
  title: string;
  category: 'Periodismo de Datos' | 'SEO' | 'Marketing Digital' | 'Podcast' | 'Fact-Checking' | 'Video Móvil';
  level: 'Básico' | 'Intermedio' | 'Avanzado';
  format: 'Video' | 'PDF' | 'Webinar';
  cost: 'Gratis' | 'Pago' | string; // Allow for specific prices
  rating: number;
  reviewCount: number;
  imageUrl: string;
  description: string;
  instructorName: string;
  instructorTitle: string;
  instructorAvatarUrl: string;
  duration: string;
  topics: string[];
  enrollmentStartDate: string;
  enrollmentEndDate: string;
  courseStartDate: string;
  courseEndDate: string;
  accessLink: string;
}

export interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  type: 'Completo' | 'Parcial' | 'Freelance';
  area: 'Prensa' | 'TV' | 'Radio' | 'Digital';
  date: string;
  logoUrl: string;
  description: string;
  applyEmail: string;
}

export interface Entrepreneurship {
    id: number;
    name: string;
    type: 'Micromedio' | 'Agencia' | 'Productora';
    founder: string;
    location: string;
    specialty: 'Investigación' | 'Cultura' | 'Deportes' | 'Local';
    imageUrl: string;
    description: string;
    reportContent?: ReportContentItem[];
    reportAuthor?: string;
    reportDate?: string;
}

export interface NewsArticle {
    id: number;
    title: string;
    category: 'Industria' | 'Tecnología' | 'Legislación' | 'Tendencias';
    author: string;
    date: string;
    imageUrl: string;
    summary: string;
    reportContent?: ReportContentItem[];
}

export interface PressRelease {
    id: number;
    title: string;
    institution: string;
    author: string;
    date: string;
    imageUrl: string;
    summary: string;
    reportContent?: ReportContentItem[];
    reportAuthor?: string;
    reportDate?: string;
}

export interface NgoSpotlight {
    id: number;
    title: string;
    institution: string; // Name of the NGO
    author: string; // Journalist associated
    date: string;
    imageUrl: string;
    summary: string;
}

export interface FreelanceService {
    id: number;
    service: string;
    provider: string;
    category: 'Redacción' | 'Corrección' | 'Fotografía' | 'Community Management' | 'Locución';
    rate: string;
    imageUrl: string;
    description: string;
    portfolioUrl: string;
    rating: {
        average: number;
        count: number;
    };
}

export interface CommunityAd {
    id: number;
    title: string;
    description: string;
    category: 'Venta' | 'Búsqueda' | 'Colaboración';
    authorName: string;
    authorAvatarUrl: string;
    whatsappContact: string;
}

export interface PremiumSponsor {
    id: number;
    name: string;
    tagline: string;
    imageUrl: string;
    ctaText: string;
    ctaLink: string;
    nameColor: string;
    ctaColor: string;
    reportContent?: ReportContentItem[];
    reportAuthor?: string;
    reportDate?: string;
}

export interface PromoVideo {
    id: number;
    title: string;
    description: string;
    thumbnailUrl: string;
}

export interface CommunityPost {
    id: number;
    authorName: string;
    authorAvatarUrl: string;
    postTitle: string;
    postUrl: string;
    comment: string;
}

export interface PhotojournalismPost {
    id: number;
    title: string;
    imageUrl: string;
    caption: string;
    photographerName: string;
    photographerAvatarUrl: string;
    dateTaken: string;
    whatsappContact: string;
    dateAdded: string;
}

export interface Specialist {
    id: number;
    name: string;
    title: string;
    imageUrl: string;
    specialtyDescription: string;
    whatsappContact: string;
    dateAdded: string; // ISO date string for sorting
    textColor: string;
}

export interface ShareablePhoto {
    id: number;
    imageUrl: string;
    caption: string;
    photographerName: string;
    photographerAvatarUrl: string;
    whatsappContact: string;
    keywords: string[];
    dateAdded: string; // ISO date string
    textColor: string;
}

export interface Resource {
    id: number;
    name: string;
    category: 'IA Generativa' | 'Visualización' | 'Fact-Checking' | 'Productividad' | 'Transcripción';
    description: string;
    link: string;
    type: 'Herramienta' | 'Guía' | 'Software';
}

export interface FundingOpportunity {
    id: number;
    title: string;
    organization: string;
    deadline: string;
    type: 'Fondo' | 'Beca' | 'Premio';
    link: string;
}

export interface Event {
    id: number;
    title: string;
    date: string; // e.g., "30 JUL"
    fullDate: string; // e.g., "Martes 30 de Julio, 18:30 hrs."
    location: string; // e.g., "Online" or "Santiago, Chile"
    type: 'Webinar' | 'Taller' | 'Conferencia';
    link: string;
}

export interface LegalTopic {
    id: number;
    title: string;
    description: string;
}

export interface LegalFAQ {
    id: number;
    question: string;
    answer: string;
}

export interface HeroHeading {
    mainText: string;
    highlightedText: string;
    featuredLabel: string;
    textColor: string;
    subText?: string;
}
// FIX: Add missing 'ShortCollaboration' type to resolve compilation error.
export interface ShortCollaboration {
    id: number;
    title: string;
    deadline: string;
    budget: string;
    author: string;
    authorAvatarUrl: string;
    whatsappContact: string;
}

export interface EntrepreneurshipTip {
    id: number;
    title: string;
    description: string;
    expertName: string;
    expertTitle: string;
    thumbnailUrl: string;
    videoUrl: string;
}

export interface SponsoredAd {
  id: number;
  imageUrl: string;
  title: string;
  advertiser: string;
  ctaText: string;
  ctaLink: string;
}

export interface SpecialAd {
  id: 'legal' | 'entrepreneurship';
  title: string;
  description: string;
  ctaText: string;
}

export interface SiteStat {
  id: 'subscribers' | 'visits' | 'regions';
  label: string;
  endValue: number;
  prefix?: string;
}

export interface PartnerLogo {
  id: number;
  name: string;
  logoUrl: string;
  websiteUrl: string;
}

export interface TalentProfile {
  id: number;
  name: string;
  avatarUrl: string;
  title: string; // max 8 words
  skills: [string, string, string]; // Top 3 skills
  availability: 'Presencial' | 'Remoto' | 'Híbrido';
  expectedSalary: string; // e.g., "$1.000.000 CLP"
  region: string;
  linkedinUrl: string;
  experienceYears: number;
}