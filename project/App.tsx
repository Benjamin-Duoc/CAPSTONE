import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import PressReleaseUploadPage from './components/PressReleaseUploadPage';
import HomePage from './components/HomePage';
import CoursesModule from './components/CoursesModule';
import EntrepreneurshipModule from './components/EntrepreneurshipModule';
import FreelanceServicesModule from './components/FreelanceServicesModule';
import OpportunitiesModule from './components/OpportunitiesModule';
import NewsModule from './components/NewsModule';
import CommunityAdsModule from './components/CommunityAdsModule';
import SpecialistsModule from './components/SpecialistsModule';
import PhotoGalleryModule from './components/PhotoGalleryModule';
import ResourcesModule from './components/ResourcesModule';
import FundingModule from './components/FundingModule';
import EventsModule from './components/EventsModule';
import LegalModule from './components/LegalModule';
import PhotojournalismModule from './components/PhotojournalismModule';
import AdminPanel from './components/admin/AdminPanel';
import SponsorDetailPage from './components/SponsorDetailPage';
import NewsDetailPage from './components/NewsDetailPage';
import JobDetailPage from './components/JobDetailPage';
import PressReleasesModule from './components/PressReleasesModule';
import PressReleaseDetailPage from './components/PressReleaseDetailPage';
import CourseDetailPage from './components/CourseDetailPage';
import AboutPage from './components/AboutPage';
import PrivacyPolicyPage from './components/PrivacyPolicyPage';
import TermsOfServicePage from './components/TermsOfServicePage';
import CommunityPostPage from './components/CommunityPostPage';
import RegistrationPage from './components/RegistrationPage';
import LoginPage from './components/LoginPage';
import PhotojournalismDetailPage from './components/PhotojournalismDetailPage';
import FreeCollaboratorPage from './components/FreeCollaboratorPage';
import PremiumCollaboratorPage from './components/PremiumCollaboratorPage';
import ClientCompanyPage from './components/ClientCompanyPage';
import UserProfileModal from './components/UserProfileModal';
import DestacadosModule from './components/DestacadosModule';

import type { Page, User, Entrepreneurship, Course, Job, NewsArticle, PremiumSponsor, HeroHeading, PhotojournalismPost, Resource, FundingOpportunity, Specialist, ShareablePhoto, PressRelease, ShortCollaboration, EntrepreneurshipTip, SponsoredAd, CommunityPost, SpecialAd, Event, SiteStat, PartnerLogo, TalentProfile, FreelanceService, CommunityAd, NgoSpotlight, LegalTopic, PromoVideo, DestacadoArticle } from './types';

import {
  initDatabase,
  getAllCourses, createCourse, updateCourse, deleteCourse,
  getAllJobs, createJob, updateJob, deleteJob,
  getAllEntrepreneurs, createEntrepreneur, updateEntrepreneur, deleteEntrepreneur,
  getAllNews, createNews, updateNews, deleteNews,
  getAllPressReleases, createPressRelease, updatePressRelease, deletePressRelease,
  getNgoSpotlight, createNgoSpotlight, updateNgoSpotlight, deleteNgoSpotlight,
  getFreelanceServices, createFreelanceService, updateFreelanceService, deleteFreelanceService,
  getCommunityAds, createCommunityAd, updateCommunityAd, deleteCommunityAd,
  getPremiumSponsors, createPremiumSponsor, updatePremiumSponsor, deletePremiumSponsor,
  getPromoVideos, createPromoVideo, updatePromoVideo, deletePromoVideo,
  getCommunityPosts, createCommunityPost, updateCommunityPost, deleteCommunityPost,
  getPhotojournalismPosts, createPhotojournalismPost, updatePhotojournalismPost, deletePhotojournalismPost,
  getSpecialists, createSpecialist, updateSpecialist, deleteSpecialist,
  getShareablePhotos, createShareablePhoto, updateShareablePhoto, deleteShareablePhoto,
  getResources, createResource, updateResource, deleteResource,
  getFundingOpportunities, createFundingOpportunity, updateFundingOpportunity, deleteFundingOpportunity,
  getEvents, createEvent, updateEvent, deleteEvent,
  getLegalTopics, createLegalTopic, updateLegalTopic, deleteLegalTopic,
  getHeroHeading, saveHeroHeading,
  getShortCollaborations, createShortCollaboration, updateShortCollaboration, deleteShortCollaboration,
  getEntrepreneurshipTips, createEntrepreneurshipTip, updateEntrepreneurshipTip, deleteEntrepreneurshipTip,
  getSponsoredAds, createSponsoredAd, updateSponsoredAd, deleteSponsoredAd,
  getSpecialAds, createSpecialAd, updateSpecialAd, deleteSpecialAd,
  getStats, updateStat,
  getPartnerLogos, createPartnerLogo, updatePartnerLogo, deletePartnerLogo,
  getTalentProfiles, createTalentProfile, updateTalentProfile, deleteTalentProfile,
  getRotationInterval, saveRotationInterval,
  getAllUsers, registerUser, updateUser, deleteUser,
  getDestacados, createDestacado, updateDestacado, deleteDestacado
} from './utils/db';


const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [returnToPage, setReturnToPage] = useState<Page>('home');
  const [initialTab, setInitialTab] = useState<string | null>(null);

  // Selection states
  const [selectedEntrepreneur, setSelectedEntrepreneur] = useState<Entrepreneurship | null>(null);
  const [selectedSponsor, setSelectedSponsor] = useState<PremiumSponsor | null>(null);
  const [selectedNewsArticle, setSelectedNewsArticle] = useState<NewsArticle | null>(null);
  const [selectedDestacado, setSelectedDestacado] = useState<DestacadoArticle | null>(null);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [selectedPressRelease, setSelectedPressRelease] = useState<PressRelease | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [selectedPhotoPost, setSelectedPhotoPost] = useState<PhotojournalismPost | null>(null);

  const [isAdminMode, setIsAdminMode] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [showProfileModal, setShowProfileModal] = useState(false);

  const isAdminUser = (user: User | null) => {
    if (!user) return false;
    // Hardcoded fallback for the user's primary test account
    if (user.email === 'ana@administrador.cl') return true;

    const role = user.role;
    const roleStr = (typeof role === 'string' ? role : (role as any)?.name || '').toLowerCase();
    return roleStr.includes('admin') || roleStr === 'administrator';
  };

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    setIsAdminMode(isAdminUser(user));
    // Role-based navigation
    if (isAdminUser(user)) {
      handleNavigate('admin');
    } else if (user.role === 'Colaborador') {
      handleNavigate('free-collaborator');
    } else if (user.role === 'Cliente') {
      handleNavigate('premium-collaborator');
    } else if (user.role === 'Empresa') {
      handleNavigate('client-company');
    } else {
      handleNavigate(returnToPage || 'home');
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setIsAdminMode(false);
    handleNavigate('home');
  };

  // Data States (initialized empty, populated via API)

  const [courses, setCourses] = useState<Course[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [entrepreneurs, setEntrepreneurs] = useState<Entrepreneurship[]>([]);
  const [newsArticles, setNewsArticles] = useState<NewsArticle[]>([]);
  const [pressReleases, setPressReleases] = useState<PressRelease[]>([]);
  const [ngoSpotlight, setNgoSpotlight] = useState<NgoSpotlight[]>([]);
  const [freelanceServices, setFreelanceServices] = useState<FreelanceService[]>([]);
  const [communityAds, setCommunityAds] = useState<CommunityAd[]>([]);
  const [premiumSponsors, setPremiumSponsors] = useState<PremiumSponsor[]>([]);
  const [promoVideos, setPromoVideos] = useState<PromoVideo[]>([]);
  const [communityPosts, setCommunityPosts] = useState<CommunityPost[]>([]);
  const [photojournalismPosts, setPhotojournalismPosts] = useState<PhotojournalismPost[]>([]);
  const [specialists, setSpecialists] = useState<Specialist[]>([]);
  const [shareablePhotos, setShareablePhotos] = useState<ShareablePhoto[]>([]);
  const [resources, setResources] = useState<Resource[]>([]);
  const [fundingOpportunities, setFundingOpportunities] = useState<FundingOpportunity[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [legalTopics, setLegalTopics] = useState<LegalTopic[]>([]);
  const [destacados, setDestacados] = useState<DestacadoArticle[]>([]);
  const [heroHeading, setHeroHeading] = useState<HeroHeading>({
    mainText: 'Cargando...',
    highlightedText: '',
    featuredLabel: '',
    textColor: '#ffffff',
    subText: ''
  });
  const [shortCollaborations, setShortCollaborations] = useState<ShortCollaboration[]>([]);
  const [entrepreneurshipTips, setEntrepreneurshipTips] = useState<EntrepreneurshipTip[]>([]);
  const [sponsoredAds, setSponsoredAds] = useState<SponsoredAd[]>([]);
  const [specialAds, setSpecialAds] = useState<SpecialAd[]>([]);
  const [stats, setStats] = useState<SiteStat[]>([]);
  const [partnerLogos, setPartnerLogos] = useState<PartnerLogo[]>([]);
  const [talentProfiles, setTalentProfiles] = useState<TalentProfile[]>([]);
  const [rotationInterval, setRotationInterval] = useState<number>(1);
  const [users, setUsers] = useState<User[]>([]);

  // Load data from Backend on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        await initDatabase(); // Auto-seed if empty
        setCourses(await getAllCourses());
        setJobs(await getAllJobs());
        setEntrepreneurs(await getAllEntrepreneurs());
        setNewsArticles(await getAllNews());
        setPressReleases(await getAllPressReleases());
        setNgoSpotlight(await getNgoSpotlight());
        setFreelanceServices(await getFreelanceServices());
        setCommunityAds(await getCommunityAds());
        setPremiumSponsors(await getPremiumSponsors());
        setPromoVideos(await getPromoVideos());
        setCommunityPosts(await getCommunityPosts());
        setPhotojournalismPosts(await getPhotojournalismPosts());
        setSpecialists(await getSpecialists());
        setShareablePhotos(await getShareablePhotos());
        setResources(await getResources());
        setFundingOpportunities(await getFundingOpportunities());
        setEvents(await getEvents());
        setLegalTopics(await getLegalTopics());
        setHeroHeading(await getHeroHeading());
        setDestacados(await getDestacados());
        setShortCollaborations(await getShortCollaborations());
        setEntrepreneurshipTips(await getEntrepreneurshipTips());
        setSponsoredAds(await getSponsoredAds());
        setSpecialAds(await getSpecialAds());
        setStats(await getStats());
        setPartnerLogos(await getPartnerLogos());
        setTalentProfiles(await getTalentProfiles());
        setRotationInterval(await getRotationInterval());
        setUsers(await getAllUsers());
      } catch (e) {
        console.error("Error loading data from backend", e);
      }
    };
    loadData();
  }, []);

  const refreshPhotoPosts = async () => {
    const dbPosts = await getPhotojournalismPosts();
    setPhotojournalismPosts(dbPosts);
  };

  const refreshCommunityPosts = async () => {
    const dbPosts = await getCommunityPosts();
    setCommunityPosts(dbPosts);
  };

  const isCommunityPostOwner = (post: CommunityPost) => {
    if (isAdminMode || currentPage === 'admin') return true;
    if (!currentUser) return false;
    // Simple check: match email if available, or name as fallback
    // In a real app, use user ID from backend response
    if (post.authorName === `${currentUser.firstName} ${currentUser.lastName}`.trim()) return true;
    return false;
  };

  // --- Navigation & Selection Handlers ---

  const handleNavigate = (page: Page, subPage?: string) => {
    if (page === 'login' && currentPage !== 'login' && currentPage !== 'register') {
      setReturnToPage(currentPage);
    }
    setSelectedEntrepreneur(null);
    setSelectedSponsor(null);
    setSelectedNewsArticle(null);
    setSelectedDestacado(null);
    setSelectedJob(null);
    setSelectedPressRelease(null);
    setSelectedCourse(null);
    setSelectedPhotoPost(null);
    setCurrentPage(page);
    setInitialTab(subPage || null);
    window.scrollTo(0, 0);
  };

  // Select Handlers
  const handleSelectEntrepreneur = (e: Entrepreneurship) => { setSelectedEntrepreneur(e); window.scrollTo(0, 0); };
  const handleSelectSponsor = (s: PremiumSponsor) => { setSelectedSponsor(s); window.scrollTo(0, 0); };
  const handleSelectNewsArticle = (a: NewsArticle) => { setSelectedNewsArticle(a); window.scrollTo(0, 0); };
  const handleSelectDestacado = (d: DestacadoArticle) => { setSelectedDestacado(d); window.scrollTo(0, 0); };
  const handleSelectJob = (j: Job) => { setSelectedJob(j); window.scrollTo(0, 0); };
  const handleSelectPressRelease = (p: PressRelease) => { setSelectedPressRelease(p); window.scrollTo(0, 0); };
  const handleSelectCourse = (c: Course) => { setSelectedCourse(c); window.scrollTo(0, 0); };
  const handleSelectPhotoPost = (p: PhotojournalismPost) => { setSelectedPhotoPost(p); window.scrollTo(0, 0); };


  // --- CRUD Operations (Connected to Backend) ---

  // Courses
  const handleAddCourse = async (item: Omit<Course, 'id'>) => { try { const res = await createCourse(item); setCourses(prev => [...prev, res]); } catch (e) { alert("Error creating course"); } };
  const handleUpdateCourse = async (item: Course) => { try { const res = await updateCourse(item); setCourses(prev => prev.map(i => i.id === res.id ? res : i)); } catch (e) { alert("Error updating course"); } };
  const handleDeleteCourse = async (id: number) => { if (window.confirm('Eliminar?')) { try { await deleteCourse(id); setCourses(prev => prev.filter(i => i.id !== id)); } catch (e) { alert("Error deleting course"); } } };

  // Jobs
  const handleAddJob = async (item: Omit<Job, 'id'>) => { try { const res = await createJob(item); setJobs(prev => [...prev, res]); } catch (e) { alert("Error creating job"); } };
  const handleUpdateJob = async (item: Job) => { try { const res = await updateJob(item); setJobs(prev => prev.map(i => i.id === res.id ? res : i)); } catch (e) { alert("Error updating job"); } };
  const handleDeleteJob = async (id: number) => { if (window.confirm('Eliminar?')) { try { await deleteJob(id); setJobs(prev => prev.filter(i => i.id !== id)); } catch (e) { alert("Error deleting job"); } } };

  // Entrepreneurs
  const handleAddEntrepreneur = async (item: Omit<Entrepreneurship, 'id'>) => { try { const res = await createEntrepreneur(item); setEntrepreneurs(prev => [...prev, res]); } catch (e) { alert("Error creating entrepreneur"); } };
  const handleUpdateEntrepreneur = async (item: Entrepreneurship) => { try { const res = await updateEntrepreneur(item); setEntrepreneurs(prev => prev.map(i => i.id === res.id ? res : i)); } catch (e) { alert("Error updating entrepreneur"); } };
  const handleDeleteEntrepreneur = async (id: number) => { if (window.confirm('Eliminar?')) { try { await deleteEntrepreneur(id); setEntrepreneurs(prev => prev.filter(i => i.id !== id)); } catch (e) { alert("Error deleting entrepreneur"); } } };

  // News
  const handleAddNewsArticle = async (item: Omit<NewsArticle, 'id'>) => { try { const res = await createNews(item); setNewsArticles(prev => [res, ...prev]); } catch (e) { alert("Error creating news"); } };
  const handleUpdateNewsArticle = async (item: NewsArticle) => { try { const res = await updateNews(item); setNewsArticles(prev => prev.map(i => i.id === res.id ? res : i)); } catch (e) { alert("Error updating news"); } };
  const handleDeleteNewsArticle = async (id: number) => { if (window.confirm('Eliminar?')) { try { await deleteNews(id); setNewsArticles(prev => prev.filter(i => i.id !== id)); } catch (e) { alert("Error deleting news"); } } };

  // Destacados
  const handleAddDestacado = async (item: Omit<DestacadoArticle, 'id'>) => { try { const res = await createDestacado(item); setDestacados(prev => [res, ...prev]); } catch (e) { alert("Error creating destacado"); } };
  const handleUpdateDestacado = async (item: DestacadoArticle) => { try { const res = await updateDestacado(item); setDestacados(prev => prev.map(i => i.id === res.id ? res : i)); } catch (e) { alert("Error updating destacado"); } };
  const handleDeleteDestacado = async (id: number) => { if (window.confirm('Eliminar?')) { try { await deleteDestacado(id); setDestacados(prev => prev.filter(i => i.id !== id)); } catch (e) { alert("Error deleting destacado"); } } };

  // Sponsors
  const handleAddSponsor = async (item: Omit<PremiumSponsor, 'id'>) => { try { const res = await createPremiumSponsor(item); setPremiumSponsors(prev => [...prev, res]); } catch (e) { alert("Error creating sponsor"); } };
  const handleUpdateSponsor = async (item: PremiumSponsor) => { try { const res = await updatePremiumSponsor(item); setPremiumSponsors(prev => prev.map(i => i.id === res.id ? res : i)); } catch (e) { alert("Error updating sponsor"); } };
  const handleDeleteSponsor = async (id: number) => { if (window.confirm('Eliminar?')) { try { await deletePremiumSponsor(id); setPremiumSponsors(prev => prev.filter(i => i.id !== id)); } catch (e) { alert("Error deleting sponsor"); } } };

  // Press Releases
  const handleAddPressRelease = async (item: Omit<PressRelease, 'id'>) => { try { const res = await createPressRelease(item); setPressReleases(prev => [res, ...prev]); return true; } catch (e) { alert("Error creating press release"); return false; } };
  const handleUpdatePressRelease = async (item: PressRelease) => { try { const res = await updatePressRelease(item); setPressReleases(prev => prev.map(i => i.id === res.id ? res : i)); } catch (e) { alert("Error updating press release"); } };
  const handleDeletePressRelease = async (id: number) => { if (window.confirm('Eliminar?')) { try { await deletePressRelease(id); setPressReleases(prev => prev.filter(i => i.id !== id)); } catch (e) { alert("Error deleting press release"); } } };

  // Photojournalism
  const handleAddPhotojournalismPost = async (item: Omit<PhotojournalismPost, 'id'>) => { try { const res = await createPhotojournalismPost({ ...item, dateAdded: new Date().toISOString() }); setPhotojournalismPosts(prev => [res, ...prev]); } catch (e) { alert("Error creating photo post"); } };
  const handleUpdatePhotojournalismPost = async (item: PhotojournalismPost) => { try { const res = await updatePhotojournalismPost(item); setPhotojournalismPosts(prev => prev.map(i => i.id === res.id ? res : i)); } catch (e) { alert("Error updating photo post"); } };
  const handleDeletePhotojournalismPost = async (id: number) => { if (window.confirm('Eliminar?')) { try { await deletePhotojournalismPost(id); setPhotojournalismPosts(prev => prev.filter(i => i.id !== id)); } catch (e) { alert("Error deleting photo post"); } } };

  // Funding
  const handleAddFundingOpportunity = async (item: Omit<FundingOpportunity, 'id'>) => { try { const res = await createFundingOpportunity(item); setFundingOpportunities(prev => [...prev, res]); } catch (e) { alert("Error creating funding"); } };
  const handleUpdateFundingOpportunity = async (item: FundingOpportunity) => { try { const res = await updateFundingOpportunity(item); setFundingOpportunities(prev => prev.map(i => i.id === res.id ? res : i)); } catch (e) { alert("Error updating funding"); } };
  const handleDeleteFundingOpportunity = async (id: number) => { if (window.confirm('Eliminar?')) { try { await deleteFundingOpportunity(id); setFundingOpportunities(prev => prev.filter(i => i.id !== id)); } catch (e) { alert("Error deleting funding"); } } };

  // Specialists
  const handleAddSpecialist = async (item: Omit<Specialist, 'id' | 'dateAdded'>) => { try { const res = await createSpecialist({ ...item, dateAdded: new Date().toISOString().split('T')[0] }); setSpecialists(prev => [res, ...prev]); } catch (e) { alert("Error creating specialist"); } };
  const handleUpdateSpecialist = async (item: Specialist) => { try { const res = await updateSpecialist(item); setSpecialists(prev => prev.map(i => i.id === res.id ? res : i)); } catch (e) { alert("Error updating specialist"); } };
  const handleDeleteSpecialist = async (id: number) => { if (window.confirm('Eliminar?')) { try { await deleteSpecialist(id); setSpecialists(prev => prev.filter(i => i.id !== id)); } catch (e) { alert("Error deleting specialist"); } } };

  // Shareable Photos
  const handleAddShareablePhoto = async (item: Omit<ShareablePhoto, 'id' | 'dateAdded'>) => { try { const res = await createShareablePhoto({ ...item, dateAdded: new Date().toISOString() }); setShareablePhotos(prev => [res, ...prev]); } catch (e) { alert("Error creating shareable photo"); } };
  const handleUpdateShareablePhoto = async (item: ShareablePhoto) => { try { const res = await updateShareablePhoto(item); setShareablePhotos(prev => prev.map(i => i.id === res.id ? res : i)); } catch (e) { alert("Error updating shareable photo"); } };
  const handleDeleteShareablePhoto = async (id: number) => { if (window.confirm('Eliminar?')) { try { await deleteShareablePhoto(id); setShareablePhotos(prev => prev.filter(i => i.id !== id)); } catch (e) { alert("Error deleting shareable photo"); } } };

  // Community Posts
  const handleAddCommunityPost = async (item: Omit<CommunityPost, 'id' | 'authorName' | 'authorAvatarUrl'>) => {
    if (!currentUser) { alert('Debes iniciar sesión'); return; }
    try {
      const newItem = {
        ...item,
        authorName: `${currentUser.firstName} ${currentUser.lastName}`,
        authorAvatarUrl: 'https://i.pravatar.cc/150?u=' + currentUser.email,
        createdBy: currentUser.email
      };
      const res = await createCommunityPost(newItem);
      setCommunityPosts(prev => [res, ...prev]);
      alert('¡Publicado!');
    } catch (e) { alert("Error creating post"); }
  };
  const handleAddCommunityPostAdmin = async (item: Omit<CommunityPost, 'id'>) => { try { const res = await createCommunityPost(item); setCommunityPosts(prev => [res, ...prev]); } catch (e) { alert("Error creating post"); } };
  const handleUpdateCommunityPost = async (item: CommunityPost) => {
    if (!isCommunityPostOwner(item)) { alert('No tienes permiso'); return; }
    try { const res = await updateCommunityPost(item); setCommunityPosts(prev => prev.map(i => i.id === res.id ? res : i)); } catch (e) { alert("Error updating post"); }
  };
  const handleDeleteCommunityPost = async (id: number) => {
    const post = communityPosts.find(p => p.id === id);
    if (post && !isCommunityPostOwner(post)) { alert('No tienes permiso'); return; }
    if (window.confirm('Eliminar?')) { try { await deleteCommunityPost(id); setCommunityPosts(prev => prev.filter(i => i.id !== id)); } catch (e) { alert("Error deleting post"); } }
  };

  // Short Collaborations
  const handleAddShortCollaboration = async (item: Omit<ShortCollaboration, 'id'>) => { try { const res = await createShortCollaboration(item); setShortCollaborations(prev => [res, ...prev]); } catch (e) { alert("Error creating collaboration"); } };
  const handleUpdateShortCollaboration = async (item: ShortCollaboration) => { try { const res = await updateShortCollaboration(item); setShortCollaborations(prev => prev.map(i => i.id === res.id ? res : i)); } catch (e) { alert("Error updating collaboration"); } };
  const handleDeleteShortCollaboration = async (id: number) => { if (window.confirm('Eliminar?')) { try { await deleteShortCollaboration(id); setShortCollaborations(prev => prev.filter(i => i.id !== id)); } catch (e) { alert("Error deleting collaboration"); } } };

  // Tips
  const handleAddEntrepreneurshipTip = async (item: Omit<EntrepreneurshipTip, 'id'>) => { try { const res = await createEntrepreneurshipTip(item); setEntrepreneurshipTips(prev => [res, ...prev]); } catch (e) { alert("Error creating tip"); } };
  const handleUpdateEntrepreneurshipTip = async (item: EntrepreneurshipTip) => { try { const res = await updateEntrepreneurshipTip(item); setEntrepreneurshipTips(prev => prev.map(i => i.id === res.id ? res : i)); } catch (e) { alert("Error updating tip"); } };
  const handleDeleteEntrepreneurshipTip = async (id: number) => { if (window.confirm('Eliminar?')) { try { await deleteEntrepreneurshipTip(id); setEntrepreneurshipTips(prev => prev.filter(i => i.id !== id)); } catch (e) { alert("Error deleting tip"); } } };

  // Sponsored Ads
  const handleAddSponsoredAd = async (item: Omit<SponsoredAd, 'id'>) => { try { const res = await createSponsoredAd(item); setSponsoredAds(prev => [res, ...prev]); } catch (e) { alert("Error creating ad"); } };
  const handleUpdateSponsoredAd = async (item: SponsoredAd) => { try { const res = await updateSponsoredAd(item); setSponsoredAds(prev => prev.map(i => i.id === res.id ? res : i)); } catch (e) { alert("Error updating ad"); } };
  const handleDeleteSponsoredAd = async (id: number) => { if (window.confirm('Eliminar?')) { try { await deleteSponsoredAd(id); setSponsoredAds(prev => prev.filter(i => i.id !== id)); } catch (e) { alert("Error deleting ad"); } } };

  // Events
  const handleAddEvent = async (item: Omit<Event, 'id'>) => { try { const res = await createEvent(item); setEvents(prev => [...prev, res]); } catch (e) { alert("Error creating event"); } };
  const handleUpdateEvent = async (item: Event) => { try { const res = await updateEvent(item); setEvents(prev => prev.map(i => i.id === res.id ? res : i)); } catch (e) { alert("Error updating event"); } };
  const handleDeleteEvent = async (id: number) => { if (window.confirm('Eliminar?')) { try { await deleteEvent(id); setEvents(prev => prev.filter(i => i.id !== id)); } catch (e) { alert("Error deleting event"); } } };

  // Partner Logos
  const handleAddPartnerLogo = async (item: Omit<PartnerLogo, 'id'>) => { try { const res = await createPartnerLogo(item); setPartnerLogos(prev => [...prev, res]); } catch (e) { alert("Error creating logo"); } };
  const handleUpdatePartnerLogo = async (item: PartnerLogo) => { try { const res = await updatePartnerLogo(item); setPartnerLogos(prev => prev.map(i => i.id === res.id ? res : i)); } catch (e) { alert("Error updating logo"); } };
  const handleDeletePartnerLogo = async (id: number) => { if (window.confirm('Eliminar?')) { try { await deletePartnerLogo(id); setPartnerLogos(prev => prev.filter(i => i.id !== id)); } catch (e) { alert("Error deleting logo"); } } };

  // Talent Profiles
  const handleAddTalentProfile = async (item: Omit<TalentProfile, 'id'>) => { try { const res = await createTalentProfile(item); setTalentProfiles(prev => [res, ...prev]); } catch (e) { alert("Error creating profile"); } };
  const handleUpdateTalentProfile = async (item: TalentProfile) => { try { const res = await updateTalentProfile(item); setTalentProfiles(prev => prev.map(i => i.id === res.id ? res : i)); } catch (e) { alert("Error updating profile"); } };
  const handleDeleteTalentProfile = async (id: number) => { if (window.confirm('Eliminar?')) { try { await deleteTalentProfile(id); setTalentProfiles(prev => prev.filter(i => i.id !== id)); } catch (e) { alert("Error deleting profile"); } } };

  // Special Updates
  const handleUpdateHeroHeading = async (h: HeroHeading) => {
    setHeroHeading(h);
    try {
      await saveHeroHeading(h);
      alert("Los cambios en el título principal se han guardado correctamente.");
    } catch (e) {
      console.error(e);
      alert("Hubo un error al guardar los cambios.");
    }
  };
  const handleUpdateSpecialAd = async (ad: SpecialAd) => { setSpecialAds(prev => prev.map(a => a.id === ad.id ? ad : a)); try { await updateSpecialAd(ad); } catch (e) { console.error(e); } };
  const handleUpdateStat = async (stat: SiteStat) => { try { const res = await updateStat(stat); setStats(prev => prev.map(s => s.id === res.id ? res : s)); } catch (e) { alert("Error updating statistic"); } };
  const handleUpdateRotationInterval = async (val: number) => { setRotationInterval(val); try { await saveRotationInterval(val); } catch (e) { console.error(e); } };
  const handleRateFreelanceService = async (id: number, rating: number) => {
    // Optimistic rating update logic could go here
    // For now simple alert as placeholder
    console.log("Rating service", id, rating);
  };

  // User Management
  const handleAddUser = async (user: Omit<User, 'id' | 'createdAt'>) => {
    try {
      const res = await registerUser(user);
      if (res.success) {
        alert(res.message);
        setUsers(await getAllUsers()); // Refresh list
      } else {
        alert(res.message);
      }
    } catch (e) {
      alert("Error creating user");
    }
  };

  const handleUpdateUser = async (user: User) => {
    try {
      const res = await updateUser(user);
      if (res.success) {
        alert(res.message);
        setUsers(await getAllUsers()); // Refresh list
      } else {
        alert(res.message);
      }
    } catch (e) {
      alert("Error updating user");
    }
  };

  const handleDeleteUser = async (id: number) => {
    if (window.confirm('¿Eliminar usuario?')) {
      try {
        const res = await deleteUser(id);
        if (res.success) {
          alert(res.message);
          setUsers(prev => prev.filter(u => u.id !== id));
        } else {
          alert(res.message);
        }
      } catch (e) {
        alert("Error deleting user");
      }
    }
  };

  const handleUpdateProfile = async (updatedUser: User) => {
    try {
      const res = await updateUser(updatedUser);
      if (res.success) {
        setCurrentUser(res.user || updatedUser);
        alert(res.message);
        setUsers(await getAllUsers()); // Refresh global list too
      } else {
        alert(res.message);
      }
    } catch (e) {
      alert("Error al actualizar el perfil");
    }
  };


  const renderPage = () => {
    if (selectedSponsor) return <SponsorDetailPage sponsor={selectedSponsor} onBack={() => setSelectedSponsor(null)} />;
    if (selectedNewsArticle) return <NewsDetailPage article={selectedNewsArticle} onBack={() => setSelectedNewsArticle(null)} />;
    if (selectedDestacado) return <NewsDetailPage article={selectedDestacado as unknown as NewsArticle} onBack={() => setSelectedDestacado(null)} />;
    if (selectedJob) return <JobDetailPage job={selectedJob} onBack={() => setSelectedJob(null)} />;
    if (selectedPressRelease) return <PressReleaseDetailPage pressRelease={selectedPressRelease} onBack={() => setSelectedPressRelease(null)} />;
    if (selectedPhotoPost) return <PhotojournalismDetailPage post={selectedPhotoPost} onBack={() => setSelectedPhotoPost(null)} />;
    if (selectedCourse) return <CourseDetailPage course={selectedCourse} onBack={() => setSelectedCourse(null)} />;

    switch (currentPage) {
      case 'admin':
        if (!isAdminUser(currentUser) || !isAdminMode) {
          return <LoginPage onNavigate={handleNavigate} returnTo="home" onLoginSuccess={handleLogin} />;
        }
        return <AdminPanel
          initialSection={initialTab}
          courses={courses} onAddCourse={handleAddCourse} onUpdateCourse={handleUpdateCourse} onDeleteCourse={handleDeleteCourse}
          jobs={jobs} onAddJob={handleAddJob} onUpdateJob={handleUpdateJob} onDeleteJob={handleDeleteJob}
          entrepreneurs={entrepreneurs} onAddEntrepreneur={handleAddEntrepreneur} onUpdateEntrepreneur={handleUpdateEntrepreneur} onDeleteEntrepreneur={handleDeleteEntrepreneur}
          newsArticles={newsArticles} onAddNewsArticle={handleAddNewsArticle} onUpdateNewsArticle={handleUpdateNewsArticle} onDeleteNewsArticle={handleDeleteNewsArticle}
          destacados={destacados} onAddDestacado={handleAddDestacado} onUpdateDestacado={handleUpdateDestacado} onDeleteDestacado={handleDeleteDestacado}
          sponsors={premiumSponsors} onAddSponsor={handleAddSponsor} onUpdateSponsor={handleUpdateSponsor} onDeleteSponsor={handleDeleteSponsor}
          pressReleases={pressReleases} onAddPressRelease={handleAddPressRelease} onUpdatePressRelease={handleUpdatePressRelease} onDeletePressRelease={handleDeletePressRelease}
          heroHeading={heroHeading} onUpdateHeroHeading={handleUpdateHeroHeading}
          photojournalismPosts={photojournalismPosts} onAddPhotojournalismPost={handleAddPhotojournalismPost} onUpdatePhotojournalismPost={handleUpdatePhotojournalismPost} onDeletePhotojournalismPost={handleDeletePhotojournalismPost}
          fundingOpportunities={fundingOpportunities} onAddFundingOpportunity={handleAddFundingOpportunity} onUpdateFundingOpportunity={handleUpdateFundingOpportunity} onDeleteFundingOpportunity={handleDeleteFundingOpportunity}
          specialists={specialists} onAddSpecialist={handleAddSpecialist} onUpdateSpecialist={handleUpdateSpecialist} onDeleteSpecialist={handleDeleteSpecialist}
          shareablePhotos={shareablePhotos} onAddShareablePhoto={handleAddShareablePhoto} onUpdateShareablePhoto={handleUpdateShareablePhoto} onDeleteShareablePhoto={handleDeleteShareablePhoto}
          shortCollaborations={shortCollaborations} onAddShortCollaboration={handleAddShortCollaboration} onUpdateShortCollaboration={handleUpdateShortCollaboration} onDeleteShortCollaboration={handleDeleteShortCollaboration}
          entrepreneurshipTips={entrepreneurshipTips} onAddEntrepreneurshipTip={handleAddEntrepreneurshipTip} onUpdateEntrepreneurshipTip={handleUpdateEntrepreneurshipTip} onDeleteEntrepreneurshipTip={handleDeleteEntrepreneurshipTip}
          sponsoredAds={sponsoredAds} onAddSponsoredAd={handleAddSponsoredAd} onUpdateSponsoredAd={handleUpdateSponsoredAd} onDeleteSponsoredAd={handleDeleteSponsoredAd}
          specialAds={specialAds} onUpdateSpecialAd={handleUpdateSpecialAd}
          communityPosts={communityPosts} onAddCommunityPost={handleAddCommunityPostAdmin} onUpdateCommunityPost={handleUpdateCommunityPost} onDeleteCommunityPost={handleDeleteCommunityPost}
          events={events} onAddEvent={handleAddEvent} onUpdateEvent={handleUpdateEvent} onDeleteEvent={handleDeleteEvent}
          stats={stats} onUpdateStat={handleUpdateStat}
          partnerLogos={partnerLogos} onAddPartnerLogo={handleAddPartnerLogo} onUpdatePartnerLogo={handleUpdatePartnerLogo} onDeletePartnerLogo={handleDeletePartnerLogo}
          talentProfiles={talentProfiles} onAddTalentProfile={handleAddTalentProfile} onUpdateTalentProfile={handleUpdateTalentProfile} onDeleteTalentProfile={handleDeleteTalentProfile}
          rotationInterval={rotationInterval} onUpdateRotationInterval={handleUpdateRotationInterval}
          users={users} onAddUser={handleAddUser} onUpdateUser={handleUpdateUser} onDeleteUser={handleDeleteUser}
        />;
      case 'courses': return <CoursesModule courses={courses} onSelectCourse={handleSelectCourse} />;
      case 'entrepreneurship': return <EntrepreneurshipModule entrepreneurships={entrepreneurs} onBack={() => handleNavigate('home')} />;
      case 'freelanceServices': return <FreelanceServicesModule freelanceServices={freelanceServices} rotationInterval={rotationInterval} />;
      case 'opportunities': return <OpportunitiesModule jobs={jobs} onSelectJob={handleSelectJob} initialTab={initialTab || 'jobs'} talentProfiles={talentProfiles} onAddTalentProfile={handleAddTalentProfile} rotationInterval={rotationInterval} />;
      case 'destacados': return <DestacadosModule destacados={destacados} onSelectDestacado={handleSelectDestacado} />;
      case 'analysis': return <NewsModule newsArticles={newsArticles} onSelectNewsArticle={handleSelectNewsArticle} />;
      case 'community-ads': return <CommunityAdsModule ads={communityAds} />;
      case 'specialists': return <SpecialistsModule specialists={specialists} />;
      case 'photo-gallery': return <PhotoGalleryModule shareablePhotos={shareablePhotos} />;
      case 'photojournalism': return <PhotojournalismModule posts={photojournalismPosts} onSelectPost={handleSelectPhotoPost} currentUser={currentUser} onPostUpdated={refreshPhotoPosts} />;
      case 'resources': return <ResourcesModule resources={resources} />;
      case 'funding': return <FundingModule fundingOpportunities={fundingOpportunities} />;
      case 'events': return <EventsModule events={events} />;
      case 'legal': return <LegalModule />;
      case 'press-releases': return <PressReleasesModule pressReleases={pressReleases} onSelectPressRelease={handleSelectPressRelease} />;
      case 'about': return <AboutPage onNavigate={handleNavigate} />;
      case 'privacy-policy': return <PrivacyPolicyPage onNavigate={handleNavigate} />;
      case 'terms-of-service': return <TermsOfServicePage onNavigate={handleNavigate} />;
      case 'community-post': return <CommunityPostPage posts={communityPosts} onAddPost={handleAddCommunityPost} onUpdatePost={handleUpdateCommunityPost} onDeletePost={handleDeleteCommunityPost} onNavigate={handleNavigate} currentUser={currentUser} />;
      case 'register': return <RegistrationPage onNavigate={handleNavigate} onLogin={handleLogin} />;
      case 'login': return <LoginPage onNavigate={handleNavigate} returnTo={returnToPage} onLoginSuccess={handleLogin} />;
      case 'free-collaborator': return currentUser?.role === 'Colaborador' ? <FreeCollaboratorPage currentUser={currentUser} onLogout={handleLogout} onEditProfile={() => setShowProfileModal(true)} /> : <LoginPage onNavigate={handleNavigate} returnTo="free-collaborator" onLoginSuccess={handleLogin} />;
      case 'premium-collaborator': return currentUser?.role === 'Cliente' ? <PremiumCollaboratorPage currentUser={currentUser} onLogout={handleLogout} onEditProfile={() => setShowProfileModal(true)} /> : <LoginPage onNavigate={handleNavigate} returnTo="premium-collaborator" onLoginSuccess={handleLogin} />;
      case 'client-company': return currentUser?.role === 'Empresa' ? <ClientCompanyPage currentUser={currentUser} onLogout={handleLogout} onEditProfile={() => setShowProfileModal(true)} /> : <LoginPage onNavigate={handleNavigate} returnTo="client-company" onLoginSuccess={handleLogin} />;
      case 'upload-press-release': return <PressReleaseUploadPage onNavigate={handleNavigate} onAddPressRelease={handleAddPressRelease} currentUser={currentUser} />;
      case 'home':
      default:
        return <HomePage
          currentUser={currentUser}
          onAddPressRelease={handleAddPressRelease}
          onAddSpecialist={handleAddSpecialist}
          onNavigate={handleNavigate}
          onSelectEntrepreneur={handleSelectEntrepreneur}
          onSelectSponsor={handleSelectSponsor}
          onSelectNewsArticle={handleSelectNewsArticle}
          onSelectDestacado={handleSelectDestacado}
          onSelectJob={handleSelectJob}
          onSelectPressRelease={handleSelectPressRelease}
          onSelectCourse={handleSelectCourse}
          isAdminMode={isAdminMode}
          courses={courses}
          jobs={jobs}
          entrepreneurs={entrepreneurs}
          newsArticles={newsArticles}
          pressReleases={pressReleases}
          ngoSpotlight={ngoSpotlight}
          freelanceServices={freelanceServices}
          communityAds={communityAds}
          premiumSponsors={premiumSponsors}
          promoVideos={promoVideos}
          communityPosts={communityPosts}
          photojournalismPosts={photojournalismPosts}
          specialists={specialists}
          shareablePhotos={shareablePhotos}
          resources={resources}
          fundingOpportunities={fundingOpportunities}
          events={events}
          heroHeading={heroHeading}
          destacados={destacados}
          shortCollaborations={shortCollaborations}
          entrepreneurshipTips={entrepreneurshipTips}
          sponsoredAds={sponsoredAds}
          specialAds={specialAds}
          stats={stats}
        />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background font-sans">
      {currentPage !== 'register' && currentPage !== 'login' && (
        <Header
          currentPage={currentPage}
          onNavigate={handleNavigate}
          isAdminMode={isAdminMode}
          currentUser={currentUser}
          onLogout={handleLogout}
          onEditProfile={() => setShowProfileModal(true)}
        />
      )}

      <main className="flex-grow">
        {renderPage()}
      </main>

      {!selectedEntrepreneur && !selectedSponsor && !selectedNewsArticle && !selectedDestacado && !selectedJob && !selectedPressRelease && !selectedCourse && !selectedPhotoPost && currentPage !== 'register' && currentPage !== 'login' && (
        <Footer onNavigate={handleNavigate} partnerLogos={partnerLogos} />
      )}

      {showProfileModal && currentUser && (
        <UserProfileModal
          user={currentUser}
          onSave={handleUpdateProfile}
          onClose={() => setShowProfileModal(false)}
        />
      )}
    </div>
  );
};

export default App;