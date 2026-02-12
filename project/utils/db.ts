import * as initialData from '../data/mockData';
import type {
  User, Course, Job, Entrepreneurship, NewsArticle, PressRelease,
  NgoSpotlight, FreelanceService, CommunityAd, PremiumSponsor, PromoVideo,
  CommunityPost, PhotojournalismPost, Specialist, ShareablePhoto, Resource,
  FundingOpportunity, Event, LegalTopic, LegalFAQ, HeroHeading,
  ShortCollaboration, EntrepreneurshipTip, SponsoredAd, SpecialAd, SiteStat,
  PartnerLogo, TalentProfile
} from '../types';
import { ENV } from '../src/config/env';

// Use environment-specific API URL
// In development, Vite proxy will forward /api requests to localhost:5000
// In production, use the full API URL from environment variables
const API_BASE = ENV.isDevelopment ? '/api' : ENV.apiUrl;

// --- Case Conversion Helpers ---

const toCamel = (s: string) => {
  return s.replace(/([-_][a-z])/ig, ($1) => {
    return $1.toUpperCase()
      .replace('-', '')
      .replace('_', '');
  });
};

const keysToCamel = (obj: any): any => {
  if (Array.isArray(obj)) {
    return obj.map((v) => keysToCamel(v));
  } else if (obj !== null && obj.constructor === Object) {
    return Object.keys(obj).reduce(
      (result, key) => ({
        ...result,
        [toCamel(key)]: keysToCamel(obj[key]),
      }),
      {},
    );
  }
  return obj;
};

const toSnake = (s: string) => {
  return s.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
};

const keysToSnake = (obj: any): any => {
  if (Array.isArray(obj)) {
    return obj.map((v) => keysToSnake(v));
  } else if (obj !== null && obj.constructor === Object) {
    return Object.keys(obj).reduce(
      (result, key) => ({
        ...result,
        [toSnake(key)]: keysToSnake(obj[key]),
      }),
      {},
    );
  }
  return obj;
};

// --- Generic Fetch Helpers ---

export const uploadImage = async (file: File): Promise<{ success: boolean; url?: string; message?: string }> => {
  // TODO: Implement actual backend upload. For now, return a fake URL or base64.
  // In a real app, this would POST to /api/upload
  console.log('Simulating upload for:', file.name);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        url: URL.createObjectURL(file) // Local preview URL
      });
    }, 1000);
  });
};

const fetchList = async <T>(endpoint: string, fallback: T[] = []): Promise<T[]> => {
  try {
    const res = await fetch(`${API_BASE}${endpoint}`);
    if (!res.ok) throw new Error(`Failed to fetch ${endpoint}`);
    const data = await res.json();
    return keysToCamel(data);
  } catch (err) {
    console.error(`Error fetching ${endpoint}:`, err);
    return fallback;
  }
};


const fetchOne = async <T>(endpoint: string, fallback: T | null = null): Promise<T | null> => {
  try {
    const res = await fetch(`${API_BASE}${endpoint}`);
    if (!res.ok) throw new Error(`Failed to fetch ${endpoint}`);
    const data = await res.json();
    return keysToCamel(data);
  } catch (err) {
    console.error(`Error fetching ${endpoint}:`, err);
    return fallback;
  }
};

const createItem = async <T>(endpoint: string, item: any): Promise<T> => {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(keysToSnake(item))
  });
  if (!res.ok) throw new Error(`Failed to create item in ${endpoint}`);
  const data = await res.json();
  return keysToCamel(data);
};

const updateItem = async <T>(endpoint: string, item: any): Promise<T> => {
  // Ensure ID is present for update
  const res = await fetch(`${API_BASE}${endpoint}`, {
    method: 'POST', // Using POST for save/update as per controller logic
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(keysToSnake(item))
  });
  if (!res.ok) throw new Error(`Failed to update item in ${endpoint}`);
  const data = await res.json();
  return keysToCamel(data);
};

const deleteItem = async (endpoint: string, id: number | string): Promise<void> => {
  const res = await fetch(`${API_BASE}${endpoint}/${id}`, {
    method: 'DELETE'
  });
  if (!res.ok) throw new Error(`Failed to delete item in ${endpoint}`);
};

// --- Serialization Helpers for JSONB columns ---

const serializeReportContent = (item: any) => {
  if (item.reportContent && typeof item.reportContent !== 'string') {
    return { ...item, reportContent: JSON.stringify(item.reportContent) };
  }
  return item;
};

const deserializeReportContent = (item: any) => {
  if (item.reportContent && typeof item.reportContent === 'string') {
    try {
      return { ...item, reportContent: JSON.parse(item.reportContent) };
    } catch (e) {
      console.error("Error parsing reportContent JSON", e);
      return item;
    }
  }
  return item;
};

const transformList = <T>(list: any[]): T[] => {
  return list.map(item => deserializeReportContent(item));
};

// --- Users ---

export const insertUser = async (user: Omit<User, 'id' | 'createdAt'>): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await fetch(`${API_BASE}/users/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(keysToSnake(user)),
    });
    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    return { success: false, message: 'Error de conexión con el servidor.' };
  }
};

export const loginUser = async (email: string, password: string): Promise<{ success: boolean; message: string; user?: User }> => {
  try {
    const response = await fetch(`${API_BASE}/users/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    return await response.json();
  } catch (error) {
    console.error('API Error login:', error);
    return { success: false, message: 'Error de conexión con el servidor.' };
  }
};

export const getAllUsers = async (): Promise<User[]> => {
  try {
    const response = await fetch(`${API_BASE}/users`);
    if (!response.ok) throw new Error('Failed to fetch users');
    return await response.json();
  } catch (error) {
    console.error('API Error getting users:', error);
    return [];
  }
};

export const updateUser = async (user: User): Promise<{ success: boolean; message: string; user?: User }> => {
  try {
    const response = await fetch(`${API_BASE}/users/${user.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(keysToSnake(user)),
    });
    return await response.json();
  } catch (error) {
    console.error('API Error updating user:', error);
    return { success: false, message: 'Error de conexión con el servidor.' };
  }
};

export const deleteUser = async (id: number): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await fetch(`${API_BASE}/users/${id}`, {
      method: 'DELETE',
    });
    return await response.json();
  } catch (error) {
    console.error('API Error deleting user:', error);
    return { success: false, message: 'Error de conexión con el servidor.' };
  }
};

// --- Courses ---
export const getAllCourses = async () => fetchList<Course>('/courses', initialData.courses);
export const createCourse = async (item: Omit<Course, 'id'>) => createItem<Course>('/courses', item);
export const updateCourse = async (item: Course) => updateItem<Course>('/courses', item);
export const deleteCourse = async (id: number) => deleteItem('/courses', id);
export const saveCourses = async (data: Course[]) => { console.warn('saveCourses deprecated'); };


// --- Jobs ---
export const getAllJobs = async () => fetchList<Job>('/jobs', initialData.jobs);
export const createJob = async (item: Omit<Job, 'id'>) => createItem<Job>('/jobs', item);
export const updateJob = async (item: Job) => updateItem<Job>('/jobs', item);
export const deleteJob = async (id: number) => deleteItem('/jobs', id);
export const saveJobs = async (data: Job[]) => { console.warn('saveJobs deprecated'); };

// --- Entrepreneurs ---
export const getAllEntrepreneurs = async () => transformList<Entrepreneurship>(await fetchList<Entrepreneurship>('/entrepreneurships', initialData.entrepreneurs));
export const createEntrepreneur = async (item: Omit<Entrepreneurship, 'id'>) => createItem<Entrepreneurship>('/entrepreneurships', serializeReportContent(item));
export const updateEntrepreneur = async (item: Entrepreneurship) => updateItem<Entrepreneurship>('/entrepreneurships', serializeReportContent(item));
export const deleteEntrepreneur = async (id: number) => deleteItem('/entrepreneurships', id);
export const saveEntrepreneurs = async (data: Entrepreneurship[]) => { console.warn('saveEntrepreneurs deprecated'); };

// --- News ---
export const getAllNews = async () => transformList<NewsArticle>(await fetchList<NewsArticle>('/news-articles', initialData.newsArticles));
export const createNews = async (item: Omit<NewsArticle, 'id'>) => createItem<NewsArticle>('/news-articles', serializeReportContent(item));
export const updateNews = async (item: NewsArticle) => updateItem<NewsArticle>('/news-articles', serializeReportContent(item));
export const deleteNews = async (id: number) => deleteItem('/news-articles', id);
export const addNews = async (item: NewsArticle) => createNews(item);
export const saveNews = async (data: NewsArticle[]) => { console.warn('saveNews deprecated'); };

// --- Press Releases ---
export const getAllPressReleases = async () => transformList<PressRelease>(await fetchList<PressRelease>('/press-releases', initialData.pressReleases));
export const createPressRelease = async (item: Omit<PressRelease, 'id'>) => createItem<PressRelease>('/press-releases', serializeReportContent(item));
export const updatePressRelease = async (item: PressRelease) => updateItem<PressRelease>('/press-releases', serializeReportContent(item));
export const deletePressRelease = async (id: number) => deleteItem('/press-releases', id);
export const addPressRelease = async (item: PressRelease) => createPressRelease(item);
export const savePressReleases = async (data: PressRelease[]) => { console.warn('savePressReleases deprecated'); };

// --- NGO Spotlight ---
export const getNgoSpotlight = async () => fetchList<NgoSpotlight>('/ngo-spotlights', initialData.ngoSpotlight);
export const createNgoSpotlight = async (item: Omit<NgoSpotlight, 'id'>) => createItem<NgoSpotlight>('/ngo-spotlights', item);
export const updateNgoSpotlight = async (item: NgoSpotlight) => updateItem<NgoSpotlight>('/ngo-spotlights', item);
export const deleteNgoSpotlight = async (id: number) => deleteItem('/ngo-spotlights', id);
export const saveNgoSpotlight = async (data: NgoSpotlight[]) => { console.warn('deprecated'); };

// --- Freelance Services ---
const transformFreelanceService = (item: any): FreelanceService => {
  return {
    ...item,
    rating: {
      average: Number(item.ratingAverage || 0),
      count: Number(item.ratingCount || 0)
    }
  };
};

const serializeFreelanceService = (item: any) => {
  const { rating, ...rest } = item;
  if (rating) {
    return {
      ...rest,
      ratingAverage: rating.average,
      ratingCount: rating.count
    };
  }
  return item;
};

export const getFreelanceServices = async () => {
  const list = await fetchList<any>('/freelance-services', initialData.freelanceServices);
  return list.map(transformFreelanceService);
};
export const createFreelanceService = async (item: Omit<FreelanceService, 'id'>) => createItem<FreelanceService>('/freelance-services', serializeFreelanceService(item));
export const updateFreelanceService = async (item: FreelanceService) => updateItem<FreelanceService>('/freelance-services', serializeFreelanceService(item));
export const deleteFreelanceService = async (id: number) => deleteItem('/freelance-services', id);
export const saveFreelanceServices = async (data: FreelanceService[]) => { console.warn('deprecated'); };

// --- Community Ads ---
export const getCommunityAds = async () => fetchList<CommunityAd>('/community-ads', initialData.communityAds);
export const createCommunityAd = async (item: Omit<CommunityAd, 'id'>) => createItem<CommunityAd>('/community-ads', item);
export const updateCommunityAd = async (item: CommunityAd) => updateItem<CommunityAd>('/community-ads', item);
export const deleteCommunityAd = async (id: number) => deleteItem('/community-ads', id);
export const saveCommunityAds = async (data: CommunityAd[]) => { console.warn('deprecated'); };

// --- Premium Sponsors ---
export const getPremiumSponsors = async () => transformList<PremiumSponsor>(await fetchList<PremiumSponsor>('/premium-sponsors', initialData.premiumSponsors));
export const createPremiumSponsor = async (item: Omit<PremiumSponsor, 'id'>) => createItem<PremiumSponsor>('/premium-sponsors', serializeReportContent(item));
export const updatePremiumSponsor = async (item: PremiumSponsor) => updateItem<PremiumSponsor>('/premium-sponsors', serializeReportContent(item));
export const deletePremiumSponsor = async (id: number) => deleteItem('/premium-sponsors', id);
export const savePremiumSponsors = async (data: PremiumSponsor[]) => { console.warn('deprecated'); };

// --- Promo Videos ---
export const getPromoVideos = async () => fetchList<PromoVideo>('/promo-videos', initialData.promoVideos);
export const createPromoVideo = async (item: Omit<PromoVideo, 'id'>) => createItem<PromoVideo>('/promo-videos', item);
export const updatePromoVideo = async (item: PromoVideo) => updateItem<PromoVideo>('/promo-videos', item);
export const deletePromoVideo = async (id: number) => deleteItem('/promo-videos', id);
export const savePromoVideos = async (data: PromoVideo[]) => { console.warn('deprecated'); };

// --- Community Posts ---
export const getCommunityPosts = async () => fetchList<CommunityPost>('/community-posts', initialData.communityPosts);
export const createCommunityPost = async (item: Omit<CommunityPost, 'id'>) => createItem<CommunityPost>('/community-posts', item);
export const updateCommunityPost = async (item: CommunityPost) => updateItem<CommunityPost>('/community-posts', item);
export const deleteCommunityPost = async (id: number) => deleteItem('/community-posts', id);
export const saveCommunityPosts = async (data: CommunityPost[]) => { console.warn('deprecated'); };

// --- Photojournalism ---
export const getPhotojournalismPosts = async () => fetchList<PhotojournalismPost>('/photojournalism-posts', initialData.photojournalismPosts);
export const createPhotojournalismPost = async (item: Omit<PhotojournalismPost, 'id'>) => createItem<PhotojournalismPost>('/photojournalism-posts', item);
export const updatePhotojournalismPost = async (item: PhotojournalismPost) => updateItem<PhotojournalismPost>('/photojournalism-posts', item);
export const deletePhotojournalismPost = async (id: number) => deleteItem('/photojournalism-posts', id);
export const savePhotojournalismPosts = async (data: PhotojournalismPost[]) => { console.warn('deprecated'); };

// --- Specialists ---
export const getSpecialists = async () => fetchList<Specialist>('/specialists', initialData.specialists);
export const createSpecialist = async (item: Omit<Specialist, 'id'>) => createItem<Specialist>('/specialists', item);
export const updateSpecialist = async (item: Specialist) => updateItem<Specialist>('/specialists', item);
export const deleteSpecialist = async (id: number) => deleteItem('/specialists', id);
export const saveSpecialists = async (data: Specialist[]) => { console.warn('deprecated'); };

// --- Shareable Photos ---
export const getShareablePhotos = async () => fetchList<ShareablePhoto>('/shareable-photos', initialData.shareablePhotos);
export const createShareablePhoto = async (item: Omit<ShareablePhoto, 'id'>) => createItem<ShareablePhoto>('/shareable-photos', item);
export const updateShareablePhoto = async (item: ShareablePhoto) => updateItem<ShareablePhoto>('/shareable-photos', item);
export const deleteShareablePhoto = async (id: number) => deleteItem('/shareable-photos', id);
export const saveShareablePhotos = async (data: ShareablePhoto[]) => { console.warn('deprecated'); };

// --- Resources ---
export const getResources = async () => fetchList<Resource>('/resources', initialData.resources);
export const createResource = async (item: Omit<Resource, 'id'>) => createItem<Resource>('/resources', item);
export const updateResource = async (item: Resource) => updateItem<Resource>('/resources', item);
export const deleteResource = async (id: number) => deleteItem('/resources', id);
export const saveResources = async (data: Resource[]) => { console.warn('deprecated'); };

// --- Funding Opportunities ---
export const getFundingOpportunities = async () => fetchList<FundingOpportunity>('/funding-opportunities', initialData.fundingOpportunities);
export const createFundingOpportunity = async (item: Omit<FundingOpportunity, 'id'>) => createItem<FundingOpportunity>('/funding-opportunities', item);
export const updateFundingOpportunity = async (item: FundingOpportunity) => updateItem<FundingOpportunity>('/funding-opportunities', item);
export const deleteFundingOpportunity = async (id: number) => deleteItem('/funding-opportunities', id);
export const saveFundingOpportunities = async (data: FundingOpportunity[]) => { console.warn('deprecated'); };

// --- Events ---
// --- Events ---
const serializeEvent = (item: any) => {
  return {
    ...item,
    dateDisplay: item.date // Compatibility: send date as dateDisplay for older backend versions
  };
};

const transformEvent = (item: any): Event => {
  return {
    ...item,
    date: item.date || item.dateDisplay // Compatibility: Read dateDisplay if date is missing
  };
};

export const getEvents = async () => {
  const list = await fetchList<any>('/events', initialData.events);
  return list.map(transformEvent);
};
export const createEvent = async (item: Omit<Event, 'id'>) => {
  const created = await createItem<Event>('/events', serializeEvent(item));
  return transformEvent(created);
};
export const updateEvent = async (item: Event) => {
  const updated = await updateItem<Event>('/events', serializeEvent(item));
  return transformEvent(updated);
};
export const deleteEvent = async (id: number) => deleteItem('/events', id);
export const saveEvents = async (data: Event[]) => { console.warn('deprecated'); };

// --- Legal Topics ---
export const getLegalTopics = async () => fetchList<LegalTopic>('/legal-topics', initialData.legalTopics);
export const createLegalTopic = async (item: Omit<LegalTopic, 'id'>) => createItem<LegalTopic>('/legal-topics', item);
export const updateLegalTopic = async (item: LegalTopic) => updateItem<LegalTopic>('/legal-topics', item);
export const deleteLegalTopic = async (id: number) => deleteItem('/legal-topics', id);
export const saveLegalTopics = async (data: LegalTopic[]) => { console.warn('deprecated'); };

// --- Legal FAQ ---
export const getLegalFAQs = async () => fetchList<LegalFAQ>('/legal-faqs', []);

// --- Hero Heading ---
export const getHeroHeading = async () => {
  const res = await fetchOne<HeroHeading>('/hero-headings', initialData.heroHeading);
  return res || initialData.heroHeading;
};
export const saveHeroHeading = async (data: HeroHeading) => {
  const res = await fetch(`${API_BASE}/hero-headings`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Failed to save HeroHeading');
  return await res.json();
};

// --- Short Collaborations ---
export const getShortCollaborations = async () => fetchList<ShortCollaboration>('/short-collaborations', initialData.shortCollaborations);
export const createShortCollaboration = async (item: Omit<ShortCollaboration, 'id'>) => createItem<ShortCollaboration>('/short-collaborations', item);
export const updateShortCollaboration = async (item: ShortCollaboration) => updateItem<ShortCollaboration>('/short-collaborations', item);
export const deleteShortCollaboration = async (id: number) => deleteItem('/short-collaborations', id);
export const saveShortCollaborations = async (data: ShortCollaboration[]) => { console.warn('deprecated'); };

// --- Entrepreneurship Tips ---
export const getEntrepreneurshipTips = async () => fetchList<EntrepreneurshipTip>('/entrepreneurship-tips', initialData.entrepreneurshipTips);
export const createEntrepreneurshipTip = async (item: Omit<EntrepreneurshipTip, 'id'>) => createItem<EntrepreneurshipTip>('/entrepreneurship-tips', item);
export const updateEntrepreneurshipTip = async (item: EntrepreneurshipTip) => updateItem<EntrepreneurshipTip>('/entrepreneurship-tips', item);
export const deleteEntrepreneurshipTip = async (id: number) => deleteItem('/entrepreneurship-tips', id);
export const saveEntrepreneurshipTips = async (data: EntrepreneurshipTip[]) => { console.warn('deprecated'); };

// --- Sponsored Ads ---
export const getSponsoredAds = async () => fetchList<SponsoredAd>('/sponsored-ads', initialData.sponsoredAds);
export const createSponsoredAd = async (item: Omit<SponsoredAd, 'id'>) => createItem<SponsoredAd>('/sponsored-ads', item);
export const updateSponsoredAd = async (item: SponsoredAd) => updateItem<SponsoredAd>('/sponsored-ads', item);
export const deleteSponsoredAd = async (id: number) => deleteItem('/sponsored-ads', id);
export const saveSponsoredAds = async (data: SponsoredAd[]) => { console.warn('deprecated'); };

// --- Special Ads ---
export const getSpecialAds = async () => fetchList<SpecialAd>('/special-ads', initialData.specialAds);
export const createSpecialAd = async (item: Omit<SpecialAd, 'id'>) => createItem<SpecialAd>('/special-ads', item);
export const updateSpecialAd = async (item: SpecialAd) => updateItem<SpecialAd>('/special-ads', item);
export const deleteSpecialAd = async (id: number) => deleteItem('/special-ads', id);
export const saveSpecialAds = async (data: SpecialAd[]) => { console.warn('deprecated'); };

// --- Site Stats ---
export const getStats = async () => fetchList<SiteStat>('/site-stats', initialData.siteStats);
export const saveStats = async (data: SiteStat[]) => {
  const res = await fetch(`${API_BASE}/site-stats`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Failed to save SiteStats');
  return await res.json();
};

// --- Partner Logos ---
export const getPartnerLogos = async () => fetchList<PartnerLogo>('/partner-logos', initialData.partnerLogos);
export const createPartnerLogo = async (item: Omit<PartnerLogo, 'id'>) => createItem<PartnerLogo>('/partner-logos', item);
export const updatePartnerLogo = async (item: PartnerLogo) => updateItem<PartnerLogo>('/partner-logos', item);
export const deletePartnerLogo = async (id: number) => deleteItem('/partner-logos', id);
export const savePartnerLogos = async (data: PartnerLogo[]) => { console.warn('deprecated'); };

// --- Talent Profiles ---
export const getTalentProfiles = async () => fetchList<TalentProfile>('/talent-profiles', initialData.talentProfiles);
export const createTalentProfile = async (item: Omit<TalentProfile, 'id'>) => createItem<TalentProfile>('/talent-profiles', item);
export const updateTalentProfile = async (item: TalentProfile) => updateItem<TalentProfile>('/talent-profiles', item);
export const deleteTalentProfile = async (id: number) => deleteItem('/talent-profiles', id);
export const saveTalentProfiles = async (data: TalentProfile[]) => { console.warn('deprecated'); };

// --- Rotation Interval (Config) ---
export const getRotationInterval = async (): Promise<number> => {
  try {
    const configs = await fetchList<{ key: string, value: string }>('/app-configs', []);
    const rotation = configs.find(c => c.key === 'rotationInterval');
    return rotation ? parseFloat(rotation.value) : initialData.rotationInterval;
  } catch (e) {
    return initialData.rotationInterval;
  }
};

export const saveRotationInterval = async (data: number) => {
  try {
    const configs = await fetchList<{ key: string, value: string }>('/app-configs', []);
    const existing = configs.find(c => c.key === 'rotationInterval');

    const payload = existing
      ? { ...existing, value: data.toString() }
      : { key: 'rotationInterval', value: data.toString() };

    await fetch(`${API_BASE}/app-configs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
  } catch (e) {
    console.error("Error saving rotation", e);
  }
};

// ==========================================
// SCRIPT DE POBLADO DE BASE DE DATOS (SEEDING)
// ==========================================

export const initDatabase = async () => {
  console.log('✅ Base de datos manejada por el backend.');
  // Seeding moved to Python backend for better consistency and performance.
};
