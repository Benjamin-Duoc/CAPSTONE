import type { User, NewsArticle, Course, Job, Entrepreneurship, PremiumSponsor, PressRelease, PhotojournalismPost, FundingOpportunity, Specialist, ShareablePhoto, ShortCollaboration, EntrepreneurshipTip, SponsoredAd, CommunityPost, SpecialAd, Event, SiteStat } from '../types';
import { newsArticles as initialNewsArticles, pressReleases as initialPressReleases } from '../data/mockData';
// Supabase removed: using localStorage only

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

// Initialize local caches for news/press and users (localStorage)
export const initDatabase = () => {
  if (!localStorage.getItem(DB_USERS_KEY)) {
    localStorage.setItem(DB_USERS_KEY, JSON.stringify([]));
  }
  if (!localStorage.getItem(DB_NEWS_ARTICLES_KEY)) {
    localStorage.setItem(DB_NEWS_ARTICLES_KEY, JSON.stringify(initialNewsArticles));
  }
  if (!localStorage.getItem(DB_PRESS_RELEASES_KEY)) {
    localStorage.setItem(DB_PRESS_RELEASES_KEY, JSON.stringify(initialPressReleases));
  }
  console.log('Database initialized (localStorage).');
};

// User operations
export const insertUser = async (user: Omit<User, 'id'>): Promise<{ success: boolean; message: string }> => {
  try {
    const users = getAllUsers();
    if (users.some(existing => existing.email === user.email)) {
      return { success: false, message: 'El correo electrónico ya está registrado.' };
    }
    const newUser: User = {
      ...user,
      id: Date.now(),
      createdAt: new Date().toISOString(),
    };
    localStorage.setItem(DB_USERS_KEY, JSON.stringify([...users, newUser]));
    return { success: true, message: 'Usuario registrado exitosamente.' };
  } catch (error) {
    console.error('Database Error:', error);
    return { success: false, message: 'Error inesperado al guardar usuario.' };
  }
};

// Get all users (for debugging or admin)
export const getAllUsers = (): User[] => {
  try {
    return JSON.parse(localStorage.getItem(DB_USERS_KEY) || '[]');
  } catch (error) {
    console.error('Error al cargar usuarios:', error);
    return [];
  }
};

// Photojournalism Functions
export const getPhotoPosts = async (): Promise<PhotojournalismPost[]> => {
  const posts = loadPhotojournalismPosts();
  return [...posts].sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime());
};

export const insertPhotoPost = async (post: Omit<PhotojournalismPost, 'id' | 'dateAdded'>): Promise<{ success: boolean; message?: string }> => {
  const newPost: PhotojournalismPost = {
    ...post,
    id: Date.now(),
    dateAdded: new Date().toISOString(),
  };
  const posts = loadPhotojournalismPosts();
  savePhotojournalismPosts([newPost, ...posts]);
  return { success: true };
};

export const updatePhotoPost = async (post: PhotojournalismPost): Promise<{ success: boolean; message?: string }> => {
  const posts = loadPhotojournalismPosts();
  savePhotojournalismPosts(posts.map(item => item.id === post.id ? post : item));
  return { success: true };
};

export const uploadImage = async (file: File): Promise<{ success: boolean; url?: string; message?: string }> => {
  try {
    const base64 = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => reject(new Error('No se pudo leer el archivo.'));
      reader.readAsDataURL(file);
    });
    return { success: true, url: base64 };
  } catch (error) {
    console.error('Error uploading image:', error);
    return { success: false, message: 'Error al cargar la imagen.' };
  }
};

// Login user
export const loginUser = async (email: string, password: string): Promise<{ success: boolean; message: string; user?: User }> => {
  try {
    const users = getAllUsers();
    const user = users.find(item => item.email === email);
    if (!user) {
      return { success: false, message: 'El correo electrónico no está registrado.' };
    }
    if (user.password !== password) {
      return { success: false, message: 'La contraseña es incorrecta.' };
    }
    return { success: true, message: 'Inicio de sesión exitoso.', user };
  } catch (error) {
    console.error('Database Error:', error);
    return { success: false, message: 'Error al iniciar sesión.' };
  }
};
// Delete photo post and image
export const deletePhotoPost = async (postId: number, _imageUrl?: string): Promise<{ success: boolean; message?: string }> => {
  const posts = loadPhotojournalismPosts();
  savePhotojournalismPosts(posts.filter(item => item.id !== postId));
  return { success: true };
};

// Community Posts Functions
export const getCommunityPosts = async (): Promise<CommunityPost[]> => {
  const posts = loadCommunityPosts();
  return [...posts].sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());
};

export const insertCommunityPost = async (
  post: Omit<CommunityPost, 'id'> & { createdBy?: string }
): Promise<{ success: boolean; message?: string }> => {
  const newPost: CommunityPost = {
    ...post,
    id: Date.now(),
    createdAt: new Date().toISOString(),
  };
  const posts = loadCommunityPosts();
  saveCommunityPosts([newPost, ...posts]);
  return { success: true };
};

export const updateCommunityPost = async (
  post: CommunityPost
): Promise<{ success: boolean; message?: string }> => {
  const posts = loadCommunityPosts();
  saveCommunityPosts(posts.map(item => item.id === post.id ? post : item));
  return { success: true };
};

export const deleteCommunityPost = async (
  postId: number
): Promise<{ success: boolean; message?: string }> => {
  const posts = loadCommunityPosts();
  saveCommunityPosts(posts.filter(item => item.id !== postId));
  return { success: true };
};

// Generic data persistence functions
function saveData(key: string, data: any[]) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Error al guardar ${key}:`, error);
  }
}

function loadData(key: string): any[] {
  try {
    return JSON.parse(localStorage.getItem(key) || '[]');
  } catch (error) {
    console.error(`Error al cargar ${key}:`, error);
    return [];
  }
}

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

// News Articles (DB-style async helpers)
export const getAllNews = async (): Promise<NewsArticle[]> => {
  const articles = loadNewsArticles();
  if (articles.length === 0 && initialNewsArticles.length > 0) {
    saveNewsArticles(initialNewsArticles);
    return initialNewsArticles;
  }
  return articles;
};

export const addNews = async (article: NewsArticle): Promise<void> => {
  const articles = loadNewsArticles();
  saveNewsArticles([article, ...articles]);
};

export const updateNews = async (article: NewsArticle): Promise<void> => {
  const articles = loadNewsArticles();
  saveNewsArticles(articles.map(item => item.id === article.id ? article : item));
};

export const deleteNews = async (articleId: number): Promise<void> => {
  const articles = loadNewsArticles();
  saveNewsArticles(articles.filter(item => item.id !== articleId));
};

// Press Releases (DB-style async helpers)
export const getAllPressReleases = async (): Promise<PressRelease[]> => {
  const releases = loadPressReleases();
  if (releases.length === 0 && initialPressReleases.length > 0) {
    savePressReleases(initialPressReleases);
    return initialPressReleases;
  }
  return releases;
};

export const addPressRelease = async (release: PressRelease): Promise<void> => {
  const releases = loadPressReleases();
  savePressReleases([release, ...releases]);
};

export const updatePressRelease = async (release: PressRelease): Promise<void> => {
  const releases = loadPressReleases();
  savePressReleases(releases.map(item => item.id === release.id ? release : item));
};

export const deletePressRelease = async (releaseId: number): Promise<void> => {
  const releases = loadPressReleases();
  savePressReleases(releases.filter(item => item.id !== releaseId));
};
