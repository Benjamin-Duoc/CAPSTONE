
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
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
import LoginPage from './components/LoginPage';
import PhotojournalismDetailPage from './components/PhotojournalismDetailPage';
import type { Page, User, Entrepreneurship, Course, Job, NewsArticle, PremiumSponsor, HeroHeading, PhotojournalismPost, Resource, FundingOpportunity, Specialist, ShareablePhoto, PressRelease, ShortCollaboration, EntrepreneurshipTip, SponsoredAd, CommunityPost, SpecialAd, Event, SiteStat, PartnerLogo, TalentProfile, FreelanceService } from './types';
import { initDatabase, getPhotoPosts } from './utils/db'; // Updated import

import * as data from './data/mockData';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [returnToPage, setReturnToPage] = useState<Page>('home'); // Track page to return to after login
  const [initialTab, setInitialTab] = useState<string | null>(null);
  const [selectedEntrepreneur, setSelectedEntrepreneur] = useState<Entrepreneurship | null>(null);
  const [selectedSponsor, setSelectedSponsor] = useState<PremiumSponsor | null>(null);
  const [selectedNewsArticle, setSelectedNewsArticle] = useState<NewsArticle | null>(null);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [selectedPressRelease, setSelectedPressRelease] = useState<PressRelease | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null); // State for selected course
  const [selectedPhotoPost, setSelectedPhotoPost] = useState<PhotojournalismPost | null>(null); // State for selected photo post
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null); // Persistent user state

  // Centralized data state for the entire application
  const [courses, setCourses] = useState(data.courses);
  const [jobs, setJobs] = useState(data.jobs);
  const [entrepreneurs, setEntrepreneurs] = useState(data.entrepreneurs);
  const [newsArticles, setNewsArticles] = useState(data.newsArticles);
  const [pressReleases, setPressReleases] = useState(data.pressReleases);
  const [ngoSpotlight, setNgoSpotlight] = useState(data.ngoSpotlight);
  const [freelanceServices, setFreelanceServices] = useState(data.freelanceServices);
  const [communityAds, setCommunityAds] = useState(data.communityAds);
  const [premiumSponsors, setPremiumSponsors] = useState(data.premiumSponsors);
  const [promoVideos, setPromoVideos] = useState(data.promoVideos);
  const [communityPosts, setCommunityPosts] = useState(data.communityPosts);
  const [photojournalismPosts, setPhotojournalismPosts] = useState(data.photojournalismPosts);
  const [specialists, setSpecialists] = useState(data.specialists);
  const [shareablePhotos, setShareablePhotos] = useState(data.shareablePhotos);
  const [resources, setResources] = useState(data.resources);
  const [fundingOpportunities, setFundingOpportunities] = useState(data.fundingOpportunities);
  const [events, setEvents] = useState(data.events);
  const [legalTopics, setLegalTopics] = useState(data.legalTopics);
  const [heroHeading, setHeroHeading] = useState(data.heroHeading);
  const [shortCollaborations, setShortCollaborations] = useState(data.shortCollaborations);
  const [entrepreneurshipTips, setEntrepreneurshipTips] = useState(data.entrepreneurshipTips);
  const [sponsoredAds, setSponsoredAds] = useState(data.sponsoredAds);
  const [specialAds, setSpecialAds] = useState(data.specialAds);
  const [stats, setStats] = useState(data.siteStats);
  const [partnerLogos, setPartnerLogos] = useState(data.partnerLogos);
  const [talentProfiles, setTalentProfiles] = useState(data.talentProfiles);
  const [rotationInterval, setRotationInterval] = useState(data.rotationInterval);

  useEffect(() => {
    initDatabase();

    // Fetch real photo posts from DB
    getPhotoPosts().then(dbPosts => {
      if (dbPosts && dbPosts.length > 0) {
        setPhotojournalismPosts(dbPosts);
      }
    });

    // Check for persisted user
    const savedUser = localStorage.getItem('cipress_user');
    if (savedUser) {
      try {
        setCurrentUser(JSON.parse(savedUser));
      } catch (e) {
        console.error('Error restoring session:', e);
        localStorage.removeItem('cipress_user');
      }
    }
  }, []);

  const refreshPhotoPosts = async () => {
    const dbPosts = await getPhotoPosts();
    if (dbPosts && dbPosts.length > 0) {
      setPhotojournalismPosts(dbPosts);
    }
  };

  const handleNavigate = (page: Page, subPage?: string) => {
    // If navigating to login, save the current page (unless we are already on login or register)
    if (page === 'login' && currentPage !== 'login' && currentPage !== 'register') {
      setReturnToPage(currentPage);
    }

    setSelectedEntrepreneur(null); // Reset detail page when navigating
    setSelectedSponsor(null);
    setSelectedNewsArticle(null);
    setSelectedJob(null);
    setSelectedPressRelease(null);
    setSelectedCourse(null);
    setSelectedPhotoPost(null);
    setCurrentPage(page);
    setInitialTab(subPage || null);
    window.scrollTo(0, 0); // Scroll to top on navigation
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

  const handleSelectPhotoPost = (post: PhotojournalismPost) => {
    setSelectedPhotoPost(post);
    window.scrollTo(0, 0);
  };

  // CRUD Operations for Courses
  const handleAddCourse = (newCourse: Omit<Course, 'id'>) => {
    setCourses(prev => [...prev, { ...newCourse, id: Date.now() }]);
  };
  const handleUpdateCourse = (updatedCourse: Course) => {
    setCourses(prev => prev.map(c => c.id === updatedCourse.id ? updatedCourse : c));
  };
  const handleDeleteCourse = (courseId: number) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este curso?')) {
      setCourses(prev => prev.filter(c => c.id !== courseId));
    }
  };

  // CRUD Operations for Jobs
  const handleAddJob = (newJob: Omit<Job, 'id'>) => {
    setJobs(prev => [...prev, { ...newJob, id: Date.now() }]);
  };
  const handleUpdateJob = (updatedJob: Job) => {
    setJobs(prev => prev.map(j => j.id === updatedJob.id ? updatedJob : j));
  };
  const handleDeleteJob = (jobId: number) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta oportunidad?')) {
      setJobs(prev => prev.filter(j => j.id !== jobId));
    }
  };

  // CRUD Operations for Entrepreneurs
  const handleAddEntrepreneur = (newEntrepreneur: Omit<Entrepreneurship, 'id'>) => {
    setEntrepreneurs(prev => [...prev, { ...newEntrepreneur, id: Date.now() }]);
  };
  const handleUpdateEntrepreneur = (updatedEntrepreneur: Entrepreneurship) => {
    setEntrepreneurs(prev => prev.map(e => e.id === updatedEntrepreneur.id ? updatedEntrepreneur : e));
  };
  const handleDeleteEntrepreneur = (entrepreneurId: number) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este emprendimiento?')) {
      setEntrepreneurs(prev => prev.filter(e => e.id !== entrepreneurId));
    }
  };

  // CRUD Operations for News Articles
  const handleAddNewsArticle = (newArticle: Omit<NewsArticle, 'id'>) => {
    setNewsArticles(prev => [{ ...newArticle, id: Date.now() }, ...prev]);
  };
  const handleUpdateNewsArticle = (updatedArticle: NewsArticle) => {
    setNewsArticles(prev => prev.map(a => a.id === updatedArticle.id ? updatedArticle : a));
  };
  const handleDeleteNewsArticle = (articleId: number) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este artículo?')) {
      setNewsArticles(prev => prev.filter(a => a.id !== articleId));
    }
  };

  // CRUD Operations for Sponsors
  const handleAddSponsor = (newSponsor: Omit<PremiumSponsor, 'id'>) => {
    setPremiumSponsors(prev => [...prev, { ...newSponsor, id: Date.now() }]);
  };
  const handleUpdateSponsor = (updatedSponsor: PremiumSponsor) => {
    setPremiumSponsors(prev => prev.map(s => s.id === updatedSponsor.id ? updatedSponsor : s));
  };
  const handleDeleteSponsor = (sponsorId: number) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este sponsor?')) {
      setPremiumSponsors(prev => prev.filter(s => s.id !== sponsorId));
    }
  };

  // CRUD Operations for Press Releases
  const handleAddPressRelease = (newPressRelease: Omit<PressRelease, 'id'>) => {
    setPressReleases(prev => [{ ...newPressRelease, id: Date.now() }, ...prev]);
  };
  const handleUpdatePressRelease = (updatedPressRelease: PressRelease) => {
    setPressReleases(prev => prev.map(pr => pr.id === updatedPressRelease.id ? updatedPressRelease : pr));
  };
  const handleDeletePressRelease = (pressReleaseId: number) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este comunicado?')) {
      setPressReleases(prev => prev.filter(pr => pr.id !== pressReleaseId));
    }
  };

  // CRUD for Photojournalism
  const handleAddPhotojournalismPost = (newPost: Omit<PhotojournalismPost, 'id'>) => {
    setPhotojournalismPosts(prev => [{ ...newPost, id: Date.now(), dateAdded: new Date().toISOString() }, ...prev]);
  };
  const handleUpdatePhotojournalismPost = (updatedPost: PhotojournalismPost) => {
    setPhotojournalismPosts(prev => prev.map(p => p.id === updatedPost.id ? updatedPost : p));
  };
  const handleDeletePhotojournalismPost = (postId: number) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta publicación de fotoperiodismo?')) {
      setPhotojournalismPosts(prev => prev.filter(p => p.id !== postId));
    }
  };

  // CRUD for Funding Opportunities
  const handleAddFundingOpportunity = (newFunding: Omit<FundingOpportunity, 'id'>) => {
    setFundingOpportunities(prev => [...prev, { ...newFunding, id: Date.now() }]);
  };
  const handleUpdateFundingOpportunity = (updatedFunding: FundingOpportunity) => {
    setFundingOpportunities(prev => prev.map(f => f.id === updatedFunding.id ? updatedFunding : f));
  };
  const handleDeleteFundingOpportunity = (fundingId: number) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta oportunidad de financiamiento?')) {
      setFundingOpportunities(prev => prev.filter(f => f.id !== fundingId));
    }
  };

  // CRUD for Specialists
  const handleAddSpecialist = (newSpecialist: Omit<Specialist, 'id' | 'dateAdded'>) => {
    setSpecialists(prev => [{ ...newSpecialist, id: Date.now(), dateAdded: new Date().toISOString() }, ...prev]);
  };
  const handleUpdateSpecialist = (updatedSpecialist: Specialist) => {
    setSpecialists(prev => prev.map(s => s.id === updatedSpecialist.id ? updatedSpecialist : s));
  };
  const handleDeleteSpecialist = (specialistId: number) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este especialista?')) {
      setSpecialists(prev => prev.filter(s => s.id !== specialistId));
    }
  };

  // CRUD for Shareable Photos
  const handleAddShareablePhoto = (newPhoto: Omit<ShareablePhoto, 'id' | 'dateAdded'>) => {
    setShareablePhotos(prev => [{ ...newPhoto, id: Date.now(), dateAdded: new Date().toISOString() }, ...prev]);
  };
  const handleUpdateShareablePhoto = (updatedPhoto: ShareablePhoto) => {
    setShareablePhotos(prev => prev.map(p => p.id === updatedPhoto.id ? updatedPhoto : p));
  };
  const handleDeleteShareablePhoto = (photoId: number) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta foto?')) {
      setShareablePhotos(prev => prev.filter(p => p.id !== photoId));
    }
  };

  // CRUD for Community Posts
  const handleAddCommunityPost = (newPost: Omit<CommunityPost, 'id' | 'authorName' | 'authorAvatarUrl'>) => {
    const newCommunityPost: CommunityPost = {
      ...newPost,
      id: Date.now(),
      authorName: 'Usuario Activo', // Hardcoded for now
      authorAvatarUrl: 'https://i.pravatar.cc/40?u=activeuser', // Hardcoded
    };
    setCommunityPosts(prev => [newCommunityPost, ...prev]);
  };
  const handleAddCommunityPostAdmin = (newPost: Omit<CommunityPost, 'id'>) => {
    setCommunityPosts(prev => [{ ...newPost, id: Date.now() }, ...prev]);
  };
  const handleUpdateCommunityPost = (updatedPost: CommunityPost) => {
    setCommunityPosts(prev => prev.map(p => p.id === updatedPost.id ? updatedPost : p));
  };
  const handleDeleteCommunityPost = (postId: number) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta publicación?')) {
      setCommunityPosts(prev => prev.filter(p => p.id !== postId));
    }
  };

  // CRUD for Short Collaborations
  const handleAddShortCollaboration = (newCollaboration: Omit<ShortCollaboration, 'id'>) => {
    setShortCollaborations(prev => [{ ...newCollaboration, id: Date.now() }, ...prev]);
  };
  const handleUpdateShortCollaboration = (updatedCollaboration: ShortCollaboration) => {
    setShortCollaborations(prev => prev.map(c => c.id === updatedCollaboration.id ? updatedCollaboration : c));
  };
  const handleDeleteShortCollaboration = (collaborationId: number) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta colaboración?')) {
      setShortCollaborations(prev => prev.filter(c => c.id !== collaborationId));
    }
  };

  // CRUD for Entrepreneurship Tips
  const handleAddEntrepreneurshipTip = (newTip: Omit<EntrepreneurshipTip, 'id'>) => {
    setEntrepreneurshipTips(prev => [{ ...newTip, id: Date.now() }, ...prev]);
  };
  const handleUpdateEntrepreneurshipTip = (updatedTip: EntrepreneurshipTip) => {
    setEntrepreneurshipTips(prev => prev.map(t => t.id === updatedTip.id ? updatedTip : t));
  };
  const handleDeleteEntrepreneurshipTip = (tipId: number) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este video?')) {
      setEntrepreneurshipTips(prev => prev.filter(t => t.id !== tipId));
    }
  };

  // CRUD for Sponsored Ads
  const handleAddSponsoredAd = (newAd: Omit<SponsoredAd, 'id'>) => {
    setSponsoredAds(prev => [...prev, { ...newAd, id: Date.now() }]);
  };
  const handleUpdateSponsoredAd = (updatedAd: SponsoredAd) => {
    setSponsoredAds(prev => prev.map(ad => ad.id === updatedAd.id ? updatedAd : ad));
  };
  const handleDeleteSponsoredAd = (adId: number) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este anuncio?')) {
      setSponsoredAds(prev => prev.filter(ad => ad.id !== adId));
    }
  };

  // CRUD for Events
  const handleAddEvent = (newEvent: Omit<Event, 'id'>) => {
    setEvents(prev => [...prev, { ...newEvent, id: Date.now() }]);
  };
  const handleUpdateEvent = (updatedEvent: Event) => {
    setEvents(prev => prev.map(e => e.id === updatedEvent.id ? updatedEvent : e));
  };
  const handleDeleteEvent = (eventId: number) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este evento?')) {
      setEvents(prev => prev.filter(e => e.id !== eventId));
    }
  };

  // CRUD for Partner Logos
  const handleAddPartnerLogo = (newLogo: Omit<PartnerLogo, 'id'>) => {
    setPartnerLogos(prev => [...prev, { ...newLogo, id: Date.now() }]);
  };
  const handleUpdatePartnerLogo = (updatedLogo: PartnerLogo) => {
    setPartnerLogos(prev => prev.map(logo => logo.id === updatedLogo.id ? updatedLogo : logo));
  };
  const handleDeletePartnerLogo = (logoId: number) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este logo?')) {
      setPartnerLogos(prev => prev.filter(logo => logo.id !== logoId));
    }
  };

  // CRUD for Talent Profiles
  const handleAddTalentProfile = (newProfile: Omit<TalentProfile, 'id'>) => {
    setTalentProfiles(prev => [{ ...newProfile, id: Date.now() }, ...prev]);
  };
  const handleUpdateTalentProfile = (updatedProfile: TalentProfile) => {
    setTalentProfiles(prev => prev.map(p => p.id === updatedProfile.id ? updatedProfile : p));
  };
  const handleDeleteTalentProfile = (profileId: number) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este perfil de talento?')) {
      setTalentProfiles(prev => prev.filter(p => p.id !== profileId));
    }
  };

  // CRUD for Freelance Services (rating)
  const handleRateFreelanceService = (serviceId: number, rating: number) => {
    setFreelanceServices(prevServices =>
      prevServices.map(service => {
        if (service.id === serviceId) {
          const newCount = service.rating.count + 1;
          const newAverage = ((service.rating.average * service.rating.count) + rating) / newCount;
          return {
            ...service,
            rating: {
              average: newAverage,
              count: newCount,
            },
          };
        }
        return service;
      })
    );
  };


  // Update operation for Hero Heading
  const handleUpdateHeroHeading = (updatedHeading: HeroHeading) => {
    setHeroHeading(updatedHeading);
  };

  // Update operation for Special Ads
  const handleUpdateSpecialAd = (updatedAd: SpecialAd) => {
    setSpecialAds(prev => prev.map(ad => ad.id === updatedAd.id ? updatedAd : ad));
  };

  // Update operation for Stats
  const handleUpdateStat = (updatedStat: SiteStat) => {
    setStats(prev => prev.map(s => s.id === updatedStat.id ? updatedStat : s));
  };

  // Update operation for Rotation Interval
  const handleUpdateRotationInterval = (interval: number) => {
    setRotationInterval(interval);
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
    if (selectedPhotoPost) {
      return <PhotojournalismDetailPage post={selectedPhotoPost} onBack={() => setSelectedPhotoPost(null)} />;
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
        return <PhotojournalismModule posts={photojournalismPosts} onSelectPost={handleSelectPhotoPost} currentUser={currentUser} onPostUpdated={refreshPhotoPosts} />;
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
        return <RegistrationPage onNavigate={handleNavigate} />;
      case 'login':
        return <LoginPage
          onNavigate={handleNavigate}
          returnTo={returnToPage}
          onLoginSuccess={(user) => {
            setCurrentUser(user);
            localStorage.setItem('cipress_user', JSON.stringify(user));
          }}
        />;
      case 'home':
      default:
        return <HomePage
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
          currentUser={currentUser}
        />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background font-sans">
      {/* Conditionally render Header: Keep it for consistency unless specific design requires hiding */}
      {currentPage !== 'register' && currentPage !== 'login' && (
        <Header
          currentPage={currentPage}
          onNavigate={handleNavigate}
          isAdminMode={isAdminMode}
          currentUser={currentUser}
          onLogout={() => {
            setCurrentUser(null);
            localStorage.removeItem('cipress_user');
            handleNavigate('home');
          }}
        />
      )}

      <main className="flex-grow">
        {renderPage()}
      </main>
      {/* Hide footer on detail page for a more focused view */}
      {!selectedEntrepreneur && !selectedSponsor && !selectedNewsArticle && !selectedJob && !selectedPressRelease && !selectedCourse && currentPage !== 'register' && currentPage !== 'login' && <Footer onNavigate={handleNavigate} isAdminMode={isAdminMode} onToggleAdmin={() => setIsAdminMode(!isAdminMode)} partnerLogos={partnerLogos} />}
    </div>
  );
};

export default App;