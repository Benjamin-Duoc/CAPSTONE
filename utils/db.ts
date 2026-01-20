import type { User, NewsArticle, Course, Job, Entrepreneurship, PremiumSponsor, PressRelease, PhotojournalismPost, FundingOpportunity, Specialist, ShareablePhoto, ShortCollaboration, EntrepreneurshipTip, SponsoredAd, CommunityPost, SpecialAd, Event, SiteStat } from '../types';

const DB_USERS_KEY = 'cipress_db_users';
const DB_NEWS_ARTICLES_KEY = 'cipress_db_news_articles';
const DB_COURSES_KEY = 'cipress_db_courses';
const DB_JOBS_KEY = 'cipress_db_jobs';
const DB_ENTREPRENEURS_KEY = 'cipress_db_entrepreneurs';
const DB_SPONSORS_KEY = 'cipress_db_sponsors';
const DB_PRESS_RELEASES_KEY = 'cipress_db_press_releases';
const DB_PHOTOJOURNALISM_KEY = 'cipress_db_photojournalism';
const DB_FUNDING_KEY = 'cipress_db_funding';
const DB_SPECIALISTS_KEY = 'cipress_db_specialists';
const DB_SHAREABLE_PHOTOS_KEY = 'cipress_db_shareable_photos';
const DB_COLLABORATIONS_KEY = 'cipress_db_collaborations';
const DB_ENTREPRENEURSHIP_TIPS_KEY = 'cipress_db_entrepreneurship_tips';
const DB_SPONSORED_ADS_KEY = 'cipress_db_sponsored_ads';
const DB_COMMUNITY_POSTS_KEY = 'cipress_db_community_posts';
const DB_SPECIAL_ADS_KEY = 'cipress_db_special_ads';
const DB_EVENTS_KEY = 'cipress_db_events';
const DB_STATS_KEY = 'cipress_db_stats';

// Initialize the "database"
export const initDatabase = () => {
  if (!localStorage.getItem(DB_USERS_KEY)) {
    localStorage.setItem(DB_USERS_KEY, JSON.stringify([]));
    console.log('Database: Tabla "usuarios" creada.');
  }
};

// User operations
export const insertUser = (user: Omit<User, 'id'>): { success: boolean; message: string } => {
  try {
    const users: User[] = JSON.parse(localStorage.getItem(DB_USERS_KEY) || '[]');
    
    // Check for duplicate email
    if (users.some(u => u.email === user.email)) {
        return { success: false, message: 'El correo electrónico ya está registrado.' };
    }

    const newUser: User = {
      ...user,
      id: Date.now(), // Simple ID generation
    };

    users.push(newUser);
    localStorage.setItem(DB_USERS_KEY, JSON.stringify(users));
    console.log('Database: Usuario insertado con éxito', newUser);
    return { success: true, message: 'Usuario registrado exitosamente.' };
  } catch (error) {
    console.error('Database Error:', error);
    return { success: false, message: 'Error al guardar en la base de datos.' };
  }
};

// Get all users (for debugging or admin)
export const getAllUsers = (): User[] => {
    return JSON.parse(localStorage.getItem(DB_USERS_KEY) || '[]');
};

// Generic data persistence functions
const saveData = (key: string, data: any[]) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Error al guardar ${key}:`, error);
  }
};

const loadData = (key: string): any[] => {
  try {
    return JSON.parse(localStorage.getItem(key) || '[]');
  } catch (error) {
    console.error(`Error al cargar ${key}:`, error);
    return [];
  }
};

// News Articles
export const saveNewsArticles = (articles: NewsArticle[]) => saveData(DB_NEWS_ARTICLES_KEY, articles);
export const loadNewsArticles = (): NewsArticle[] => loadData(DB_NEWS_ARTICLES_KEY);

// Courses
export const saveCourses = (courses: Course[]) => saveData(DB_COURSES_KEY, courses);
export const loadCourses = (): Course[] => loadData(DB_COURSES_KEY);

// Jobs
export const saveJobs = (jobs: Job[]) => saveData(DB_JOBS_KEY, jobs);
export const loadJobs = (): Job[] => loadData(DB_JOBS_KEY);

// Entrepreneurs
export const saveEntrepreneurs = (entrepreneurs: Entrepreneurship[]) => saveData(DB_ENTREPRENEURS_KEY, entrepreneurs);
export const loadEntrepreneurs = (): Entrepreneurship[] => loadData(DB_ENTREPRENEURS_KEY);

// Sponsors
export const saveSponsors = (sponsors: PremiumSponsor[]) => saveData(DB_SPONSORS_KEY, sponsors);
export const loadSponsors = (): PremiumSponsor[] => loadData(DB_SPONSORS_KEY);

// Press Releases
export const savePressReleases = (releases: PressRelease[]) => saveData(DB_PRESS_RELEASES_KEY, releases);
export const loadPressReleases = (): PressRelease[] => loadData(DB_PRESS_RELEASES_KEY);

// Photojournalism Posts
export const savePhotojournalismPosts = (posts: PhotojournalismPost[]) => saveData(DB_PHOTOJOURNALISM_KEY, posts);
export const loadPhotojournalismPosts = (): PhotojournalismPost[] => loadData(DB_PHOTOJOURNALISM_KEY);

// Funding Opportunities
export const saveFundingOpportunities = (funding: FundingOpportunity[]) => saveData(DB_FUNDING_KEY, funding);
export const loadFundingOpportunities = (): FundingOpportunity[] => loadData(DB_FUNDING_KEY);

// Specialists
export const saveSpecialists = (specialists: Specialist[]) => saveData(DB_SPECIALISTS_KEY, specialists);
export const loadSpecialists = (): Specialist[] => loadData(DB_SPECIALISTS_KEY);

// Shareable Photos
export const saveShareablePhotos = (photos: ShareablePhoto[]) => saveData(DB_SHAREABLE_PHOTOS_KEY, photos);
export const loadShareablePhotos = (): ShareablePhoto[] => loadData(DB_SHAREABLE_PHOTOS_KEY);

// Short Collaborations
export const saveShortCollaborations = (collaborations: ShortCollaboration[]) => saveData(DB_COLLABORATIONS_KEY, collaborations);
export const loadShortCollaborations = (): ShortCollaboration[] => loadData(DB_COLLABORATIONS_KEY);

// Entrepreneurship Tips
export const saveEntrepreneurshipTips = (tips: EntrepreneurshipTip[]) => saveData(DB_ENTREPRENEURSHIP_TIPS_KEY, tips);
export const loadEntrepreneurshipTips = (): EntrepreneurshipTip[] => loadData(DB_ENTREPRENEURSHIP_TIPS_KEY);

// Sponsored Ads
export const saveSponsoredAds = (ads: SponsoredAd[]) => saveData(DB_SPONSORED_ADS_KEY, ads);
export const loadSponsoredAds = (): SponsoredAd[] => loadData(DB_SPONSORED_ADS_KEY);

// Community Posts
export const saveCommunityPosts = (posts: CommunityPost[]) => saveData(DB_COMMUNITY_POSTS_KEY, posts);
export const loadCommunityPosts = (): CommunityPost[] => loadData(DB_COMMUNITY_POSTS_KEY);

// Special Ads
export const saveSpecialAds = (ads: SpecialAd[]) => saveData(DB_SPECIAL_ADS_KEY, ads);
export const loadSpecialAds = (): SpecialAd[] => loadData(DB_SPECIAL_ADS_KEY);

// Events
export const saveEvents = (events: Event[]) => saveData(DB_EVENTS_KEY, events);
export const loadEvents = (): Event[] => loadData(DB_EVENTS_KEY);

// Stats
export const saveStats = (stats: SiteStat[]) => saveData(DB_STATS_KEY, stats);
export const loadStats = (): SiteStat[] => loadData(DB_STATS_KEY);