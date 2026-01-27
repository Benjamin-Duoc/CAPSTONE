
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import PressReleaseUploadPage from './components/PressReleaseUploadPage';
import HomePage from './components/HomePage';
import CoursesModule from './components/CoursesModule';
import EntrepreneurshipModule from './components/EntrepreneurshipModule';
import OpportunitiesModule from './components/OpportunitiesModule';
import NewsModule from './components/NewsModule';
import EntrepreneurshipDetailPage from './components/EntrepreneurshipDetailPage';
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
import type { Page, User, Entrepreneurship, Course, Job, NewsArticle, PremiumSponsor, HeroHeading, PhotojournalismPost, Resource, FundingOpportunity, Specialist, ShareablePhoto, PressRelease, ShortCollaboration, EntrepreneurshipTip, SponsoredAd, CommunityPost, SpecialAd, Event, SiteStat, PartnerLogo, TalentProfile, FreelanceService } from './types';
import * as mockData from './data/mockData';
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
  getStats, saveStats,
  getPartnerLogos, createPartnerLogo, updatePartnerLogo, deletePartnerLogo,
  getTalentProfiles, createTalentProfile, updateTalentProfile, deleteTalentProfile,
  getRotationInterval, saveRotationInterval
} from './utils/db';


const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [initialTab, setInitialTab] = useState<string | null>(null);
  const [selectedEntrepreneur, setSelectedEntrepreneur] = useState<Entrepreneurship | null>(null);
  const [selectedSponsor, setSelectedSponsor] = useState<PremiumSponsor | null>(null);
  const [selectedNewsArticle, setSelectedNewsArticle] = useState<NewsArticle | null>(null);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [selectedPressRelease, setSelectedPressRelease] = useState<PressRelease | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    handleNavigate('home');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    handleNavigate('home');
  };

  // State initialized with Mock Data for immediate render, then updated via API
  const [courses, setCourses] = useState(mockData.courses);
  const [jobs, setJobs] = useState(mockData.jobs);
  const [entrepreneurs, setEntrepreneurs] = useState(mockData.entrepreneurs);
  const [newsArticles, setNewsArticles] = useState(mockData.newsArticles);
  const [pressReleases, setPressReleases] = useState(mockData.pressReleases);
  const [ngoSpotlight, setNgoSpotlight] = useState(mockData.ngoSpotlight);
  const [freelanceServices, setFreelanceServices] = useState(mockData.freelanceServices);
  const [communityAds, setCommunityAds] = useState(mockData.communityAds);
  const [premiumSponsors, setPremiumSponsors] = useState(mockData.premiumSponsors);
  const [promoVideos, setPromoVideos] = useState(mockData.promoVideos);
  const [communityPosts, setCommunityPosts] = useState(mockData.communityPosts);
  const [photojournalismPosts, setPhotojournalismPosts] = useState(mockData.photojournalismPosts);
  const [specialists, setSpecialists] = useState(mockData.specialists);
  const [shareablePhotos, setShareablePhotos] = useState(mockData.shareablePhotos);
  const [resources, setResources] = useState(mockData.resources);
  const [fundingOpportunities, setFundingOpportunities] = useState(mockData.fundingOpportunities);
  const [events, setEvents] = useState(mockData.events);
  const [legalTopics, setLegalTopics] = useState(mockData.legalTopics);
  const [heroHeading, setHeroHeading] = useState(mockData.heroHeading);
  const [shortCollaborations, setShortCollaborations] = useState(mockData.shortCollaborations);
  const [entrepreneurshipTips, setEntrepreneurshipTips] = useState(mockData.entrepreneurshipTips);
  const [sponsoredAds, setSponsoredAds] = useState(mockData.sponsoredAds);
  const [specialAds, setSpecialAds] = useState(mockData.specialAds);
  const [stats, setStats] = useState(mockData.siteStats);
  const [partnerLogos, setPartnerLogos] = useState(mockData.partnerLogos);
  const [talentProfiles, setTalentProfiles] = useState(mockData.talentProfiles);
  const [rotationInterval, setRotationInterval] = useState(mockData.rotationInterval);

  useEffect(() => {
    const loadData = async () => {
      try {
        await initDatabase();
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
        setShortCollaborations(await getShortCollaborations());
        setEntrepreneurshipTips(await getEntrepreneurshipTips());
        setSponsoredAds(await getSponsoredAds());
        setSpecialAds(await getSpecialAds());
        setStats(await getStats());
        setPartnerLogos(await getPartnerLogos());
        setTalentProfiles(await getTalentProfiles());
        setRotationInterval(await getRotationInterval());
      } catch (e) {
        console.error("Error loading data from backend", e);
      }
    };
    loadData();
  }, []);

  const handleNavigate = (page: Page, subPage?: string) => {
    setSelectedEntrepreneur(null);
    setSelectedSponsor(null);
    setSelectedNewsArticle(null);
    setSelectedJob(null);
    setSelectedPressRelease(null);
    setSelectedCourse(null);
    setCurrentPage(page);
    setInitialTab(subPage || null);
    window.scrollTo(0, 0);
  };

  const handleSelectEntrepreneur = (entrepreneur: Entrepreneurship) => {
    setSelectedEntrepreneur(entrepreneur);
    window.scrollTo(0, 0);
  };

  const handleSelectSponsor = (sponsor: PremiumSponsor) => {
    setSelectedSponsor(sponsor);
    window.scrollTo(0, 0);
  };

  const handleSelectNewsArticle = (article: NewsArticle) => {
    setSelectedNewsArticle(article);
    window.scrollTo(0, 0);
  };

  const handleSelectJob = (job: Job) => {
    setSelectedJob(job);
    window.scrollTo(0, 0);
  };

  const handleSelectPressRelease = (pressRelease: PressRelease) => {
    setSelectedPressRelease(pressRelease);
    window.scrollTo(0, 0);
  };

  const handleSelectCourse = (course: Course) => {
    setSelectedCourse(course);
    window.scrollTo(0, 0);
  };

  // --- CRUD Operations ---
  // Note: All operations now use async calls to backend

  const handleAddCourse = async (newCourse: Omit<Course, 'id'>) => {
    try {
      const created = await createCourse(newCourse);
      setCourses(prev => [...prev, created]);
    } catch (e) { console.error(e); alert("Error creating course"); }
  };
  const handleUpdateCourse = async (updatedCourse: Course) => {
    try {
      const updated = await updateCourse(updatedCourse);
      setCourses(prev => prev.map(c => c.id === updated.id ? updated : c));
    } catch (e) { console.error(e); alert("Error updating course"); }
  };
  const handleDeleteCourse = async (courseId: number) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este curso?')) {
      try {
        await deleteCourse(courseId);
        setCourses(prev => prev.filter(c => c.id !== courseId));
      } catch (e) { console.error(e); alert("Error deleting course"); }
    }
  };

  const handleAddJob = async (newJob: Omit<Job, 'id'>) => {
    try {
      const created = await createJob(newJob);
      setJobs(prev => [...prev, created]);
    } catch (e) { console.error(e); alert("Error creating job"); }
  };
  const handleUpdateJob = async (updatedJob: Job) => {
    try {
      const updated = await updateJob(updatedJob);
      setJobs(prev => prev.map(j => j.id === updated.id ? updated : j));
    } catch (e) { console.error(e); alert("Error updating job"); }
  };
  const handleDeleteJob = async (jobId: number) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta oportunidad?')) {
      try {
        await deleteJob(jobId);
        setJobs(prev => prev.filter(j => j.id !== jobId));
      } catch (e) { console.error(e); alert("Error deleting job"); }
    }
  };

  const handleAddEntrepreneur = async (newEntrepreneur: Omit<Entrepreneurship, 'id'>) => {
    try {
      const created = await createEntrepreneur(newEntrepreneur);
      setEntrepreneurs(prev => [...prev, created]);
    } catch (e) { console.error(e); alert("Error creating entrepreneur"); }
  };
  const handleUpdateEntrepreneur = async (updatedEntrepreneur: Entrepreneurship) => {
    try {
      const updated = await updateEntrepreneur(updatedEntrepreneur);
      setEntrepreneurs(prev => prev.map(e => e.id === updated.id ? updated : e));
    } catch (e) { console.error(e); alert("Error updating entrepreneur"); }
  };
  const handleDeleteEntrepreneur = async (entrepreneurId: number) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este emprendimiento?')) {
      try {
        await deleteEntrepreneur(entrepreneurId);
        setEntrepreneurs(prev => prev.filter(e => e.id !== entrepreneurId));
      } catch (e) { console.error(e); alert("Error deleting entrepreneur"); }
    }
  };

  const handleAddNewsArticle = async (newArticle: Omit<NewsArticle, 'id'>) => {
    try {
      const created = await createNews(newArticle);
      setNewsArticles(prev => [created, ...prev]);
    } catch (e) { console.error(e); alert("Error creating news"); }
  };
  const handleUpdateNewsArticle = async (updatedArticle: NewsArticle) => {
    try {
      const updated = await updateNews(updatedArticle);
      setNewsArticles(prev => prev.map(a => a.id === updated.id ? updated : a));
    } catch (e) { console.error(e); alert("Error updating news"); }
  };
  const handleDeleteNewsArticle = async (articleId: number) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este artículo?')) {
      try {
        await deleteNews(articleId);
        setNewsArticles(prev => prev.filter(a => a.id !== articleId));
      } catch (e) { console.error(e); alert("Error deleting news"); }
    }
  };

  const handleAddSponsor = async (newSponsor: Omit<PremiumSponsor, 'id'>) => {
    try {
      const created = await createPremiumSponsor(newSponsor);
      setPremiumSponsors(prev => [...prev, created]);
    } catch (e) { console.error(e); alert("Error creating sponsor"); }
  };
  const handleUpdateSponsor = async (updatedSponsor: PremiumSponsor) => {
    try {
      const updated = await updatePremiumSponsor(updatedSponsor);
      setPremiumSponsors(prev => prev.map(s => s.id === updated.id ? updated : s));
    } catch (e) { console.error(e); alert("Error updating sponsor"); }
  };
  const handleDeleteSponsor = async (sponsorId: number) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este sponsor?')) {
      try {
        await deletePremiumSponsor(sponsorId);
        setPremiumSponsors(prev => prev.filter(s => s.id !== sponsorId));
      } catch (e) { console.error(e); alert("Error deleting sponsor"); }
    }
  };

  const handleAddPressRelease = async (newPressRelease: Omit<PressRelease, 'id'>) => {
    try {
      const created = await createPressRelease(newPressRelease);
      setPressReleases(prev => [created, ...prev]);
      return true;
    } catch (e) {
      console.error(e);
      alert("Error creating press release");
      return false;
    }
  };
  const handleUpdatePressRelease = async (updatedPressRelease: PressRelease) => {
    try {
      const updated = await updatePressRelease(updatedPressRelease);
      setPressReleases(prev => prev.map(p => p.id === updated.id ? updated : p));
    } catch (e) { console.error(e); alert("Error updating press release"); }
  };
  const handleDeletePressRelease = async (pressReleaseId: number) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este comunicado?')) {
      try {
        await deletePressRelease(pressReleaseId);
        setPressReleases(prev => prev.filter(p => p.id !== pressReleaseId));
      } catch (e) { console.error(e); alert("Error deleting press release"); }
    }
  };

  const handleAddPhotojournalismPost = async (newPost: Omit<PhotojournalismPost, 'id'>) => {
    try {
      const item = { ...newPost, dateAdded: new Date().toISOString() };
      const created = await createPhotojournalismPost(item);
      setPhotojournalismPosts(prev => [created, ...prev]);
    } catch (e) { console.error(e); alert("Error creating post"); }
  };
  const handleUpdatePhotojournalismPost = async (updatedPost: PhotojournalismPost) => {
    try {
      const updated = await updatePhotojournalismPost(updatedPost);
      setPhotojournalismPosts(prev => prev.map(p => p.id === updated.id ? updated : p));
    } catch (e) { console.error(e); alert("Error updating post"); }
  };
  const handleDeletePhotojournalismPost = async (postId: number) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta publicación de fotoperiodismo?')) {
      try {
        await deletePhotojournalismPost(postId);
        setPhotojournalismPosts(prev => prev.filter(p => p.id !== postId));
      } catch (e) { console.error(e); alert("Error deleting post"); }
    }
  };

  const handleAddFundingOpportunity = async (newFunding: Omit<FundingOpportunity, 'id'>) => {
    try {
      const created = await createFundingOpportunity(newFunding);
      setFundingOpportunities(prev => [...prev, created]);
    } catch (e) { console.error(e); alert("Error creating funding opportunity"); }
  };
  const handleUpdateFundingOpportunity = async (updatedFunding: FundingOpportunity) => {
    try {
      const updated = await updateFundingOpportunity(updatedFunding);
      setFundingOpportunities(prev => prev.map(f => f.id === updated.id ? updated : f));
    } catch (e) { console.error(e); alert("Error updating funding opportunity"); }
  };
  const handleDeleteFundingOpportunity = async (fundingId: number) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta oportunidad?')) {
      try {
        await deleteFundingOpportunity(fundingId);
        setFundingOpportunities(prev => prev.filter(f => f.id !== fundingId));
      } catch (e) { console.error(e); alert("Error deleting funding opportunity"); }
    }
  };

  const handleAddSpecialist = async (newSpecialist: Omit<Specialist, 'id' | 'dateAdded'>) => {
    try {
      const item = { ...newSpecialist, dateAdded: new Date().toISOString() };
      const created = await createSpecialist(item);
      setSpecialists(prev => [created, ...prev]);
    } catch (e) { console.error(e); alert("Error creating specialist"); }
  };
  const handleUpdateSpecialist = async (updatedSpecialist: Specialist) => {
    try {
      const updated = await updateSpecialist(updatedSpecialist);
      setSpecialists(prev => prev.map(s => s.id === updated.id ? updated : s));
    } catch (e) { console.error(e); alert("Error updating specialist"); }
  };
  const handleDeleteSpecialist = async (specialistId: number) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este especialista?')) {
      try {
        await deleteSpecialist(specialistId);
        setSpecialists(prev => prev.filter(s => s.id !== specialistId));
      } catch (e) { console.error(e); alert("Error deleting specialist"); }
    }
  };

  const handleAddShareablePhoto = async (newPhoto: Omit<ShareablePhoto, 'id' | 'dateAdded'>) => {
    try {
      const item = { ...newPhoto, dateAdded: new Date().toISOString() };
      const created = await createShareablePhoto(item);
      setShareablePhotos(prev => [created, ...prev]);
    } catch (e) { console.error(e); alert("Error creating photo"); }
  };
  const handleUpdateShareablePhoto = async (updatedPhoto: ShareablePhoto) => {
    try {
      const updated = await updateShareablePhoto(updatedPhoto);
      setShareablePhotos(prev => prev.map(p => p.id === updated.id ? updated : p));
    } catch (e) { console.error(e); alert("Error updating photo"); }
  };
  const handleDeleteShareablePhoto = async (photoId: number) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta foto?')) {
      try {
        await deleteShareablePhoto(photoId);
        setShareablePhotos(prev => prev.filter(p => p.id !== photoId));
      } catch (e) { console.error(e); alert("Error deleting photo"); }
    }
  };

  const handleAddCommunityPost = async (newPost: Omit<CommunityPost, 'id' | 'authorName' | 'authorAvatarUrl'>) => {
    try {
      const item = {
        ...newPost,
        authorName: 'Usuario Activo',
        authorAvatarUrl: 'https://i.pravatar.cc/40?u=activeuser',
      };
      const created = await createCommunityPost(item);
      setCommunityPosts(prev => [created, ...prev]);
    } catch (e) { console.error(e); alert("Error creating post"); }
  };
  const handleAddCommunityPostAdmin = async (newPost: Omit<CommunityPost, 'id'>) => {
    try {
      const created = await createCommunityPost(newPost);
      setCommunityPosts(prev => [created, ...prev]);
    } catch (e) { console.error(e); alert("Error creating post"); }
  };
  const handleUpdateCommunityPost = async (updatedPost: CommunityPost) => {
    try {
      const updated = await updateCommunityPost(updatedPost);
      setCommunityPosts(prev => prev.map(p => p.id === updated.id ? updated : p));
    } catch (e) { console.error(e); alert("Error updating post"); }
  };
  const handleDeleteCommunityPost = async (postId: number) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta publicación?')) {
      try {
        await deleteCommunityPost(postId);
        setCommunityPosts(prev => prev.filter(p => p.id !== postId));
      } catch (e) { console.error(e); alert("Error deleting post"); }
    }
  };

  const handleAddShortCollaboration = async (newCollaboration: Omit<ShortCollaboration, 'id'>) => {
    try {
      const created = await createShortCollaboration(newCollaboration);
      setShortCollaborations(prev => [created, ...prev]);
    } catch (e) { console.error(e); alert("Error creating collaboration"); }
  };
  const handleUpdateShortCollaboration = async (updatedCollaboration: ShortCollaboration) => {
    try {
      const updated = await updateShortCollaboration(updatedCollaboration);
      setShortCollaborations(prev => prev.map(c => c.id === updated.id ? updated : c));
    } catch (e) { console.error(e); alert("Error updating collaboration"); }
  };
  const handleDeleteShortCollaboration = async (collaborationId: number) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta colaboración?')) {
      try {
        await deleteShortCollaboration(collaborationId);
        setShortCollaborations(prev => prev.filter(c => c.id !== collaborationId));
      } catch (e) { console.error(e); alert("Error deleting collaboration"); }
    }
  };

  const handleAddEntrepreneurshipTip = async (newTip: Omit<EntrepreneurshipTip, 'id'>) => {
    try {
      const created = await createEntrepreneurshipTip(newTip);
      setEntrepreneurshipTips(prev => [created, ...prev]);
    } catch (e) { console.error(e); alert("Error creating tip"); }
  };
  const handleUpdateEntrepreneurshipTip = async (updatedTip: EntrepreneurshipTip) => {
    try {
      const updated = await updateEntrepreneurshipTip(updatedTip);
      setEntrepreneurshipTips(prev => prev.map(t => t.id === updated.id ? updated : t));
    } catch (e) { console.error(e); alert("Error updating tip"); }
  };
  const handleDeleteEntrepreneurshipTip = async (tipId: number) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este tip?')) {
      try {
        await deleteEntrepreneurshipTip(tipId);
        setEntrepreneurshipTips(prev => prev.filter(t => t.id !== tipId));
      } catch (e) { console.error(e); alert("Error deleting tip"); }
    }
  };

  const handleAddSponsoredAd = async (newAd: Omit<SponsoredAd, 'id'>) => {
    try {
      const created = await createSponsoredAd(newAd);
      setSponsoredAds(prev => [...prev, created]);
    } catch (e) { console.error(e); alert("Error creating ad"); }
  };
  const handleUpdateSponsoredAd = async (updatedAd: SponsoredAd) => {
    try {
      const updated = await updateSponsoredAd(updatedAd);
      setSponsoredAds(prev => prev.map(ad => ad.id === updated.id ? updated : ad));
    } catch (e) { console.error(e); alert("Error updating ad"); }
  };
  const handleDeleteSponsoredAd = async (adId: number) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este anuncio?')) {
      try {
        await deleteSponsoredAd(adId);
        setSponsoredAds(prev => prev.filter(ad => ad.id !== adId));
      } catch (e) { console.error(e); alert("Error deleting ad"); }
    }
  };

  const handleAddEvent = async (newEvent: Omit<Event, 'id'>) => {
    try {
      const created = await createEvent(newEvent);
      setEvents(prev => [...prev, created]);
    } catch (e) { console.error(e); alert("Error creating event"); }
  };
  const handleUpdateEvent = async (updatedEvent: Event) => {
    try {
      const updated = await updateEvent(updatedEvent);
      setEvents(prev => prev.map(e => e.id === updated.id ? updated : e));
    } catch (e) { console.error(e); alert("Error updating event"); }
  };
  const handleDeleteEvent = async (eventId: number) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este evento?')) {
      try {
        await deleteEvent(eventId);
        setEvents(prev => prev.filter(e => e.id !== eventId));
      } catch (e) { console.error(e); alert("Error deleting event"); }
    }
  };

  const handleAddPartnerLogo = async (newLogo: Omit<PartnerLogo, 'id'>) => {
    try {
      const created = await createPartnerLogo(newLogo);
      setPartnerLogos(prev => [...prev, created]);
    } catch (e) { console.error(e); alert("Error creating logo"); }
  };
  const handleUpdatePartnerLogo = async (updatedLogo: PartnerLogo) => {
    try {
      const updated = await updatePartnerLogo(updatedLogo);
      setPartnerLogos(prev => prev.map(l => l.id === updated.id ? updated : l));
    } catch (e) { console.error(e); alert("Error updating logo"); }
  };
  const handleDeletePartnerLogo = async (logoId: number) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este logo?')) {
      try {
        await deletePartnerLogo(logoId);
        setPartnerLogos(prev => prev.filter(l => l.id !== logoId));
      } catch (e) { console.error(e); alert("Error deleting logo"); }
    }
  };

  const handleAddTalentProfile = async (newProfile: Omit<TalentProfile, 'id'>) => {
    try {
      const created = await createTalentProfile(newProfile);
      setTalentProfiles(prev => [created, ...prev]);
    } catch (e) { console.error(e); alert("Error creating profile"); }
  };
  const handleUpdateTalentProfile = async (updatedProfile: TalentProfile) => {
    try {
      const updated = await updateTalentProfile(updatedProfile);
      setTalentProfiles(prev => prev.map(p => p.id === updated.id ? updated : p));
    } catch (e) { console.error(e); alert("Error updating profile"); }
  };
  const handleDeleteTalentProfile = async (profileId: number) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este perfil?')) {
      try {
        await deleteTalentProfile(profileId);
        setTalentProfiles(prev => prev.filter(p => p.id !== profileId));
      } catch (e) { console.error(e); alert("Error deleting profile"); }
    }
  };

  // Freelance service rating
  const handleRateFreelanceService = async (serviceId: number, rating: number) => {
    // Optimistic update
    const service = freelanceServices.find(s => s.id === serviceId);
    if (!service) return;

    const newCount = service.rating.count + 1;
    const newAverage = ((service.rating.average * service.rating.count) + rating) / newCount;
    const updatedService = {
      ...service,
      rating: {
        average: newAverage,
        count: newCount,
      },
    };
    // Update local immediately
    setFreelanceServices(prev => prev.map(s => s.id === serviceId ? updatedService : s));

    try {
      await updateFreelanceService(updatedService);
    } catch (e) {
      console.error(e);
      // revert if failed? keeping simple for now.
    }
  };

  const handleUpdateHeroHeading = async (updatedHeading: HeroHeading) => {
    // Optimistic
    setHeroHeading(updatedHeading);
    try {
      await saveHeroHeading(updatedHeading);
    } catch (e) { console.error(e); alert("Error saving heading"); }
  };

  const handleUpdateSpecialAd = async (updatedAd: SpecialAd) => {
    // Only two ads exist, identified by string ID.
    // Backend API handles update of single item or list?
    // My db.ts `updateSpecialAd` calls POST /special-ads with body.
    // If backend controller takes `SpecialAd`, it should update based on ID.
    setSpecialAds(prev => prev.map(ad => ad.id === updatedAd.id ? updatedAd : ad));
    try {
      await updateSpecialAd(updatedAd);
    } catch (e) { console.error(e); alert("Error saving ad"); }
  };

  const handleUpdateStat = async (updatedStat: SiteStat) => {
    // Optimistic
    const newStats = stats.map(s => s.id === updatedStat.id ? updatedStat : s);
    setStats(newStats);
    try {
      // SiteStat logic uses saveStats(List)
      await saveStats(newStats);
    } catch (e) { console.error(e); alert("Error saving stats"); }
  };

  const handleUpdateRotationInterval = async (interval: number) => {
    setRotationInterval(interval);
    try {
      await saveRotationInterval(interval);
    } catch (e) { console.error(e); }
  };

  const renderPage = () => {
    if (selectedSponsor) {
      return <SponsorDetailPage sponsor={selectedSponsor} onBack={() => setSelectedSponsor(null)} />;
    }
    if (selectedEntrepreneur) {
      return <EntrepreneurshipDetailPage entrepreneur={selectedEntrepreneur} onBack={() => setSelectedEntrepreneur(null)} />;
    }
    if (selectedNewsArticle) {
      return <NewsDetailPage article={selectedNewsArticle} onBack={() => setSelectedNewsArticle(null)} />;
    }
    if (selectedJob) {
      return <JobDetailPage job={selectedJob} onBack={() => setSelectedJob(null)} />;
    }
    if (selectedPressRelease) {
      return <PressReleaseDetailPage pressRelease={selectedPressRelease} onBack={() => setSelectedPressRelease(null)} />;
    }
    if (selectedCourse) {
      return <CourseDetailPage course={selectedCourse} onBack={() => setSelectedCourse(null)} />;
    }

    switch (currentPage) {
      case 'admin':
        return <AdminPanel
          courses={courses}
          onAddCourse={handleAddCourse}
          onUpdateCourse={handleUpdateCourse}
          onDeleteCourse={handleDeleteCourse}
          jobs={jobs}
          onAddJob={handleAddJob}
          onUpdateJob={handleUpdateJob}
          onDeleteJob={handleDeleteJob}
          entrepreneurs={entrepreneurs}
          onAddEntrepreneur={handleAddEntrepreneur}
          onUpdateEntrepreneur={handleUpdateEntrepreneur}
          onDeleteEntrepreneur={handleDeleteEntrepreneur}
          newsArticles={newsArticles}
          onAddNewsArticle={handleAddNewsArticle}
          onUpdateNewsArticle={handleUpdateNewsArticle}
          onDeleteNewsArticle={handleDeleteNewsArticle}
          sponsors={premiumSponsors}
          onAddSponsor={handleAddSponsor}
          onUpdateSponsor={handleUpdateSponsor}
          onDeleteSponsor={handleDeleteSponsor}
          pressReleases={pressReleases}
          onAddPressRelease={handleAddPressRelease}
          onUpdatePressRelease={handleUpdatePressRelease}
          onDeletePressRelease={handleDeletePressRelease}
          heroHeading={heroHeading}
          onUpdateHeroHeading={handleUpdateHeroHeading}
          photojournalismPosts={photojournalismPosts}
          onAddPhotojournalismPost={handleAddPhotojournalismPost}
          onUpdatePhotojournalismPost={handleUpdatePhotojournalismPost}
          onDeletePhotojournalismPost={handleDeletePhotojournalismPost}
          fundingOpportunities={fundingOpportunities}
          onAddFundingOpportunity={handleAddFundingOpportunity}
          onUpdateFundingOpportunity={handleUpdateFundingOpportunity}
          onDeleteFundingOpportunity={handleDeleteFundingOpportunity}
          specialists={specialists}
          onAddSpecialist={handleAddSpecialist}
          onUpdateSpecialist={handleUpdateSpecialist}
          onDeleteSpecialist={handleDeleteSpecialist}
          shareablePhotos={shareablePhotos}
          onAddShareablePhoto={handleAddShareablePhoto}
          onUpdateShareablePhoto={handleUpdateShareablePhoto}
          onDeleteShareablePhoto={handleDeleteShareablePhoto}
          shortCollaborations={shortCollaborations}
          onAddShortCollaboration={handleAddShortCollaboration}
          onUpdateShortCollaboration={handleUpdateShortCollaboration}
          onDeleteShortCollaboration={handleDeleteShortCollaboration}
          entrepreneurshipTips={entrepreneurshipTips}
          onAddEntrepreneurshipTip={handleAddEntrepreneurshipTip}
          onUpdateEntrepreneurshipTip={handleUpdateEntrepreneurshipTip}
          onDeleteEntrepreneurshipTip={handleDeleteEntrepreneurshipTip}
          sponsoredAds={sponsoredAds}
          onAddSponsoredAd={handleAddSponsoredAd}
          onUpdateSponsoredAd={handleUpdateSponsoredAd}
          onDeleteSponsoredAd={handleDeleteSponsoredAd}
          specialAds={specialAds}
          onUpdateSpecialAd={handleUpdateSpecialAd}
          communityPosts={communityPosts}
          onAddCommunityPost={handleAddCommunityPostAdmin}
          onUpdateCommunityPost={handleUpdateCommunityPost}
          onDeleteCommunityPost={handleDeleteCommunityPost}
          events={events}
          onAddEvent={handleAddEvent}
          onUpdateEvent={handleUpdateEvent}
          onDeleteEvent={handleDeleteEvent}
          stats={stats}
          onUpdateStat={handleUpdateStat}
          partnerLogos={partnerLogos}
          onAddPartnerLogo={handleAddPartnerLogo}
          onUpdatePartnerLogo={handleUpdatePartnerLogo}
          onDeletePartnerLogo={handleDeletePartnerLogo}
          talentProfiles={talentProfiles}
          onAddTalentProfile={handleAddTalentProfile}
          onUpdateTalentProfile={handleUpdateTalentProfile}
          onDeleteTalentProfile={handleDeleteTalentProfile}
          rotationInterval={rotationInterval}
          onUpdateRotationInterval={handleUpdateRotationInterval}
        />;
      case 'courses':
        return <CoursesModule courses={courses} onSelectCourse={handleSelectCourse} />;
      case 'entrepreneurship':
        return <EntrepreneurshipModule />;
      case 'opportunities':
        return <OpportunitiesModule
          jobs={jobs}
          onSelectJob={handleSelectJob}
          initialTab={initialTab || 'jobs'}
          talentProfiles={talentProfiles}
          onAddTalentProfile={handleAddTalentProfile}
          rotationInterval={rotationInterval}
          freelanceServices={freelanceServices}
          onRateFreelanceService={handleRateFreelanceService}
        />;
      case 'analysis':
        return <NewsModule onSelectNewsArticle={handleSelectNewsArticle} />;
      case 'community-ads':
        return <CommunityAdsModule />;
      case 'specialists':
        return <SpecialistsModule specialists={specialists} />;
      case 'photo-gallery':
        return <PhotoGalleryModule shareablePhotos={shareablePhotos} />;
      case 'photojournalism':
        return <PhotojournalismModule />;
      case 'resources':
        return <ResourcesModule resources={resources} />;
      case 'funding':
        return <FundingModule fundingOpportunities={fundingOpportunities} />;
      case 'events':
        return <EventsModule events={events} />;
      case 'legal':
        return <LegalModule />;
      case 'press-releases':
        return <PressReleasesModule pressReleases={pressReleases} onSelectPressRelease={handleSelectPressRelease} />;
      case 'about':
        return <AboutPage onNavigate={handleNavigate} />;
      case 'privacy-policy':
        return <PrivacyPolicyPage onNavigate={handleNavigate} />;
      case 'terms-of-service':
        return <TermsOfServicePage onNavigate={handleNavigate} />;
      case 'community-post':
        return <CommunityPostPage
          posts={communityPosts}
          onAddPost={handleAddCommunityPost}
          onNavigate={handleNavigate}
        />;
      case 'register':
        return <RegistrationPage onNavigate={handleNavigate} onLogin={handleLogin} />;
      case 'upload-press-release':
        return <PressReleaseUploadPage onNavigate={handleNavigate} onAddPressRelease={handleAddPressRelease} currentUser={currentUser} />;
      case 'home':
      default:
        return <HomePage
          currentUser={currentUser}
          onAddPressRelease={handleAddPressRelease}
          onNavigate={handleNavigate}
          onSelectEntrepreneur={handleSelectEntrepreneur}
          onSelectSponsor={handleSelectSponsor}
          onSelectNewsArticle={handleSelectNewsArticle}
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
      {currentPage !== 'register' && <Header currentPage={currentPage} onNavigate={handleNavigate} isAdminMode={isAdminMode} currentUser={currentUser} onLogout={handleLogout} />}

      <main className="flex-grow">
        {renderPage()}
      </main>
      {!selectedEntrepreneur && !selectedSponsor && !selectedNewsArticle && !selectedJob && !selectedPressRelease && !selectedCourse && currentPage !== 'register' && <Footer onNavigate={handleNavigate} isAdminMode={isAdminMode} onToggleAdmin={() => setIsAdminMode(!isAdminMode)} partnerLogos={partnerLogos} />}
    </div>
  );
};

export default App;