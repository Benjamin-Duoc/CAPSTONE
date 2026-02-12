
import React, { useState, useMemo } from 'react';
import type { Job, FreelanceService, TalentProfile } from '../types';
import { BriefcaseIcon, MapPinIcon, SearchIcon, LinkedInIcon, StarIcon, LightBulbIcon } from './icons';
import TalentProfileForm from './admin/TalentProfileForm';

interface OpportunitiesModuleProps {
    jobs: Job[];
    onSelectJob: (job: Job) => void;
    initialTab?: string;
    talentProfiles: TalentProfile[];
    onAddTalentProfile: (profile: Omit<TalentProfile, 'id'>) => void;
    rotationInterval: number;
    freelanceServices: FreelanceService[];
    onRateFreelanceService: (serviceId: number, rating: number) => void;
}

type Tab = 'jobs' | 'talents' | 'classifieds';

const JobCard: React.FC<{ job: Job; onSelect: () => void }> = ({ job, onSelect }) => (
    <button onClick={onSelect} className="w-full text-left bg-surface p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6 border border-gray-200 group">
        <img src={job.logoUrl} alt={`${job.company} logo`} className="w-16 h-16 rounded-full flex-shrink-0 object-cover border-2 border-gray-200"/>
        <div className="flex-grow">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center">
                <h3 className="font-bold font-serif text-xl text-text-primary group-hover:text-primary transition-colors">{job.title}</h3>
                <span className="text-sm text-highlight font-semibold mt-1 sm:mt-0">{job.date}</span>
            </div>
            <p className="text-md text-text-secondary">{job.company}</p>
            <div className="flex items-center text-sm text-gray-500 mt-2 space-x-4">
                <div className="flex items-center"><MapPinIcon className="h-4 w-4 mr-1"/><span>{job.location}</span></div>
                <div className="flex items-center"><BriefcaseIcon className="h-4 w-4 mr-1"/><span>{job.type}</span></div>
            </div>
        </div>
        <div className="self-start sm:self-center flex-shrink-0 px-4 py-2 text-sm font-semibold text-white bg-primary rounded-md group-hover:bg-orange-600 transition-colors">
            Ver Detalles
        </div>
    </button>
);

const ServiceCard: React.FC<{ service: FreelanceService; onRate: (serviceId: number, rating: number) => void }> = ({ service, onRate }) => {
    const [userRating, setUserRating] = useState<number | null>(null);
    const [hoverRating, setHoverRating] = useState<number | null>(null);

    const handleRating = (rating: number) => {
        if (!userRating) {
            setUserRating(rating);
            onRate(service.id, rating);
        }
    };
    
    return (
        <div className="bg-surface rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-200 overflow-hidden group flex flex-col h-full">
            <div className="h-40 overflow-hidden">
                 <img src={service.imageUrl} alt={service.service} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
            </div>
            <div className="p-5 flex flex-col flex-grow">
                <span className="text-xs font-bold uppercase text-accent tracking-wide">{service.category}</span>
                <h3 className="font-bold font-serif text-lg text-text-primary mt-1">{service.service}</h3>
                <p className="text-sm text-text-secondary mt-2">Por: <span className="font-semibold text-text-primary">{service.provider}</span></p>
                <p className="text-sm text-text-primary mt-2 font-mono bg-background p-2 rounded">Tarifa: {service.rate}</p>
                
                <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex justify-between items-center">
                        <p className="text-sm font-semibold text-text-primary">
                            Nota: {service.rating.average.toFixed(1)} / 7.0
                        </p>
                        <p className="text-xs text-text-secondary">
                            ({service.rating.count} {service.rating.count === 1 ? 'evaluación' : 'evaluaciones'})
                        </p>
                    </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-100">
                    {userRating ? (
                        <p className="text-center font-semibold text-accent">¡Gracias por tu evaluación!</p>
                    ) : (
                        <>
                            <p className="text-center text-sm font-semibold text-text-secondary mb-2">¡Evalúa este servicio!</p>
                            <div 
                                className="flex justify-center items-center space-x-1"
                                onMouseLeave={() => setHoverRating(null)}
                            >
                                {[1, 2, 3, 4, 5, 6, 7].map(star => (
                                    <button
                                        key={star}
                                        onClick={() => handleRating(star)}
                                        onMouseEnter={() => setHoverRating(star)}
                                        className="focus:outline-none"
                                        aria-label={`Calificar con ${star}`}
                                    >
                                        <StarIcon 
                                            className={`h-6 w-6 transition-colors duration-200 ${
                                                (hoverRating ?? userRating ?? 0) >= star 
                                                ? 'text-highlight' 
                                                : 'text-gray-300'
                                            }`} 
                                        />
                                    </button>
                                ))}
                            </div>
                        </>
                    )}
                </div>

                <div className="mt-auto pt-5 grid grid-cols-2 gap-3">
                    <a href={service.portfolioUrl} target="_blank" rel="noopener noreferrer" className="w-full px-4 py-2 text-sm font-semibold text-center text-white bg-secondary rounded-md hover:bg-blue-900 transition-colors">
                        Ver Portafolio
                    </a>
                    <button className="w-full px-4 py-2 text-sm font-semibold text-white bg-primary rounded-md hover:bg-orange-600 transition-colors">
                        Contactar
                    </button>
                </div>
            </div>
        </div>
    );
};

const TalentProfileCard: React.FC<{ profile: TalentProfile }> = ({ profile }) => (
    <div className="bg-surface rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-200 p-5 flex flex-col text-center items-center">
        <img src={profile.avatarUrl} alt={profile.name} className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg" />
        <h3 className="font-bold text-lg text-text-primary mt-3">{profile.name}</h3>
        <p className="text-sm text-primary font-semibold text-center h-10">{profile.title}</p>
        <div className="mt-3 flex flex-wrap justify-center gap-2">
            {profile.skills.map((skill, index) => (
                <span key={index} className="text-xs font-semibold bg-secondary/10 text-secondary px-2 py-1 rounded-full">{skill}</span>
            ))}
        </div>
        <div className="mt-4 pt-4 border-t border-gray-100 w-full text-sm text-text-secondary space-y-1">
            <p><span className="font-semibold">Disponibilidad:</span> {profile.availability}</p>
            <p><span className="font-semibold">Región:</span> {profile.region}</p>
            <p><span className="font-semibold">Experiencia:</span> {profile.experienceYears} {profile.experienceYears === 1 ? 'año' : 'años'}</p>
        </div>
        <a href={profile.linkedinUrl} target="_blank" rel="noopener noreferrer" className="w-full mt-4 px-4 py-2 text-sm font-bold text-white bg-[#0077B5] rounded-md hover:bg-[#005E92] transition-colors flex items-center justify-center space-x-2">
            <LinkedInIcon className="h-5 w-5" />
            <span>Ver Perfil en LinkedIn</span>
        </a>
    </div>
);


const OpportunitiesModule: React.FC<OpportunitiesModuleProps> = ({ jobs, onSelectJob, initialTab, talentProfiles, onAddTalentProfile, rotationInterval, freelanceServices, onRateFreelanceService }) => {
    const [activeTab, setActiveTab] = useState<Tab>((initialTab as Tab) || 'jobs');
    const [searchTerm, setSearchTerm] = useState('');
    const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
    const [isTalentFormOpen, setIsTalentFormOpen] = useState(false);
    
    // Talent Pagination
    const [talentCurrentPage, setTalentCurrentPage] = useState(1);
    const TALENTS_PER_PAGE = 15;

    // Service Pagination
    const [serviceCurrentPage, setServiceCurrentPage] = useState(1);
    const SERVICES_PER_PAGE = 15;

    const shuffledTalentProfiles = useMemo(() => {
        // Create a seed based on the current time divided by the rotation interval.
        // This ensures the order is the same for all users within the same time window.
        const intervalMilliseconds = (rotationInterval || 1) * 60 * 60 * 1000;
        const timeSeed = Math.floor(Date.now() / intervalMilliseconds);

        // Simple pseudo-random number generator using the seed
        let seed = timeSeed;
        const seededRandom = () => {
            const x = Math.sin(seed++) * 10000;
            return x - Math.floor(x);
        };

        // Fisher-Yates shuffle algorithm with our seeded random function
        const array = [...talentProfiles];
        let currentIndex = array.length;
        let randomIndex;

        while (currentIndex !== 0) {
            randomIndex = Math.floor(seededRandom() * currentIndex);
            currentIndex--;
            [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
        }
        
        return array;
    }, [talentProfiles, rotationInterval]);
    
    const shuffledFreelanceServices = useMemo(() => {
        const intervalMilliseconds = (rotationInterval || 1) * 60 * 60 * 1000;
        const timeSeed = Math.floor(Date.now() / intervalMilliseconds);

        let seed = timeSeed + 1; // Use a different seed to avoid same shuffle as talents
        const seededRandom = () => {
            const x = Math.sin(seed++) * 10000;
            return x - Math.floor(x);
        };

        const array = [...freelanceServices];
        let currentIndex = array.length;
        let randomIndex;

        while (currentIndex !== 0) {
            randomIndex = Math.floor(seededRandom() * currentIndex);
            currentIndex--;
            [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
        }
        
        return array;
    }, [freelanceServices, rotationInterval]);


    const filteredServices = useMemo(() => {
        if (!searchTerm) return shuffledFreelanceServices;
        return shuffledFreelanceServices.filter(service =>
            service.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
            service.provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
            service.category.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm, shuffledFreelanceServices]);

    const totalServicePages = Math.ceil(filteredServices.length / SERVICES_PER_PAGE);
    const currentServices = useMemo(() => {
        const startIndex = (serviceCurrentPage - 1) * SERVICES_PER_PAGE;
        return filteredServices.slice(startIndex, startIndex + SERVICES_PER_PAGE);
    }, [serviceCurrentPage, filteredServices]);

     const handleServicePageChange = (page: number) => {
        if (page > 0 && page <= totalServicePages) {
            setServiceCurrentPage(page);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const totalTalentPages = Math.ceil(shuffledTalentProfiles.length / TALENTS_PER_PAGE);

    const currentTalentProfiles = useMemo(() => {
        const startIndex = (talentCurrentPage - 1) * TALENTS_PER_PAGE;
        return shuffledTalentProfiles.slice(startIndex, startIndex + TALENTS_PER_PAGE);
    }, [talentCurrentPage, shuffledTalentProfiles]);

    const handleTalentPageChange = (page: number) => {
        if (page > 0 && page <= totalTalentPages) {
            setTalentCurrentPage(page);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };
    
    const handleSaveTalentProfile = (newProfile: Omit<TalentProfile, 'id'>) => {
        onAddTalentProfile(newProfile);
        setIsTalentFormOpen(false);
    };

    const ServicePublicationModal: React.FC<{ onClose: () => void }> = ({ onClose }) => (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4 animate-fade-in" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="modal-title-service">
            <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-md text-center relative" onClick={e => e.stopPropagation()}>
                <button onClick={onClose} className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-3xl font-bold" aria-label="Cerrar modal">&times;</button>
                <h3 id="modal-title-service" className="text-2xl font-bold font-serif text-secondary">Beneficio Exclusivo para Suscriptores Gratuitos</h3>
                <p className="mt-4 text-text-secondary">Para publicar tu servicio profesional en nuestro directorio, necesitas una suscripción gratuita activa en CiPress.</p>
                <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
                    <a href="#" className="px-6 py-3 text-base font-bold text-white bg-primary rounded-md hover:bg-orange-600 transition-colors">
                        Registrarme
                    </a>
                    <a href="#" className="px-6 py-3 text-base font-bold text-secondary bg-gray-200 rounded-md hover:bg-gray-300 transition-colors">
                        Ingresar
                    </a>
                </div>
            </div>
        </div>
    );
    
    const FreelanceServiceBanner: React.FC<{ onClick: () => void }> = ({ onClick }) => (
        <div className="mt-12 p-8 bg-surface rounded-lg shadow-lg border-2 border-dashed border-accent/20 text-center">
            <h3 className="text-2xl font-bold font-serif text-text-primary">
                ¿Ofreces servicios como freelance?
            </h3>
            <p className="text-text-secondary mt-2">
                Aumenta tu visibilidad y conecta con potenciales clientes en la comunidad de periodistas innovadores.
            </p>
            <button
                onClick={onClick}
                className="mt-6 inline-block px-8 py-3 text-base font-bold text-white bg-accent rounded-md hover:bg-lime-600 transition-colors duration-200 shadow-lg"
            >
                Sube tu servicio profesional
            </button>
        </div>
    );

    const renderContent = () => {
        switch (activeTab) {
            case 'jobs':
                return (
                    <div className="space-y-6">
                        <div className="text-center">
                            <h2 className="text-2xl font-bold font-serif text-text-primary">Oportunidades Laborales</h2>
                            <p className="text-text-secondary mt-1">Encuentra tu próximo desafío profesional en el sector.</p>
                        </div>
                        <div className="bg-background p-4 rounded-lg text-center border border-gray-200">
                            <p className="text-base text-text-secondary">
                                Para publicar, envía tu aviso de trabajo a <a href="mailto:contacto@cipress.cl" className="font-semibold text-primary hover:underline">contacto@cipress.cl</a>
                            </p>
                        </div>
                        {jobs.map(job => <JobCard key={job.id} job={job} onSelect={() => onSelectJob(job)} />)}
                    </div>
                );
            case 'talents':
                return (
                    <div>
                        <div className="text-center">
                            <h2 className="text-2xl font-bold font-serif text-text-primary">Base de Datos de Talentos</h2>
                            <p className="text-text-secondary mt-1">Crea tu perfil y deja que los reclutadores te encuentren.</p>
                        </div>
                        <div className="bg-secondary/10 border-l-4 border-secondary text-secondary p-4 rounded-r-lg my-8 flex items-start" role="alert">
                            <div className="flex-shrink-0">
                                <LightBulbIcon className="h-6 w-6 text-secondary" />
                            </div>
                            <div className="ml-3">
                                <h3 className="text-base font-bold text-secondary">¡Mantén tu perfil visible!</h3>
                                <p className="text-sm mt-1 text-blue-900">
                                    Para que nuestro algoritmo te considere activamente en las búsquedas, es importante que actualices tus antecedentes al menos cada 3 meses.
                                </p>
                            </div>
                        </div>
                         <div className="bg-gradient-to-r from-secondary to-blue-900 rounded-lg p-6 my-8 flex flex-col sm:flex-row justify-between items-center text-center sm:text-left text-white shadow-lg">
                            <div>
                                <h3 className="font-bold font-serif text-xl text-highlight">¿Buscas tu próxima oportunidad?</h3>
                                <p className="mt-1 text-sm text-blue-300">Crea tu perfil en nuestra base de talentos. Es un beneficio gratuito para suscriptores.</p>
                            </div>
                            <button onClick={() => setIsTalentFormOpen(true)} className="mt-4 sm:mt-0 flex-shrink-0 px-5 py-2 font-bold text-secondary bg-highlight rounded-md hover:bg-yellow-300 transition-colors duration-200 shadow-md">
                                Crear mi Perfil
                            </button>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {currentTalentProfiles.map(profile => <TalentProfileCard key={profile.id} profile={profile} />)}
                        </div>
                         {totalTalentPages > 1 && (
                            <div className="flex justify-center items-center space-x-4 mt-12">
                                <button
                                    onClick={() => handleTalentPageChange(talentCurrentPage - 1)}
                                    disabled={talentCurrentPage === 1}
                                    className="px-4 py-2 bg-surface border border-gray-300 rounded-md text-sm font-medium text-text-secondary hover:bg-background disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Anterior
                                </button>
                                <span className="text-sm text-text-secondary">
                                    Página {talentCurrentPage} de {totalTalentPages}
                                </span>
                                <button
                                    onClick={() => handleTalentPageChange(talentCurrentPage + 1)}
                                    disabled={talentCurrentPage === totalTalentPages}
                                    className="px-4 py-2 bg-surface border border-gray-300 rounded-md text-sm font-medium text-text-secondary hover:bg-background disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Siguiente
                                </button>
                            </div>
                        )}
                    </div>
                );
            case 'classifieds':
                 return (
                    <div>
                        <div className="text-center mb-8">
                            <h2 className="text-2xl font-bold font-serif text-text-primary">Servicios Profesionales</h2>
                            <p className="text-text-secondary mt-1">Ofrece tus servicios como freelance a la comunidad.</p>
                        </div>
                         <div className="mb-8 relative">
                            <input
                                type="text"
                                placeholder="Buscar por servicio, profesional o categoría..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary transition-colors"
                                aria-label="Buscar servicios freelance"
                            />
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <SearchIcon className="h-5 w-5 text-gray-400" />
                            </div>
                        </div>
                         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {currentServices.map(service => <ServiceCard key={service.id} service={service} onRate={onRateFreelanceService} />)}
                        </div>
                         {filteredServices.length === 0 && (
                            <div className="text-center py-16 bg-surface rounded-lg shadow-sm border border-gray-200 mt-6">
                                <h3 className="text-xl font-semibold text-text-primary">No se encontraron servicios</h3>
                                <p className="text-text-secondary mt-2">Intenta con otra palabra clave.</p>
                            </div>
                        )}
                        {totalServicePages > 1 && (
                            <div className="flex justify-center items-center space-x-4 mt-12">
                                <button
                                    onClick={() => handleServicePageChange(serviceCurrentPage - 1)}
                                    disabled={serviceCurrentPage === 1}
                                    className="px-4 py-2 bg-surface border border-gray-300 rounded-md text-sm font-medium text-text-secondary hover:bg-background disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Anterior
                                </button>
                                <span className="text-sm text-text-secondary">
                                    Página {serviceCurrentPage} de {totalServicePages}
                                </span>
                                <button
                                    onClick={() => handleServicePageChange(serviceCurrentPage + 1)}
                                    disabled={serviceCurrentPage === totalServicePages}
                                    className="px-4 py-2 bg-surface border border-gray-300 rounded-md text-sm font-medium text-text-secondary hover:bg-background disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Siguiente
                                </button>
                            </div>
                        )}
                        <FreelanceServiceBanner onClick={() => setIsServiceModalOpen(true)} />
                    </div>
                );
        }
    };
    
    const TabButton: React.FC<{ tabName: Tab; label: string }> = ({ tabName, label }) => (
        <button
            onClick={() => setActiveTab(tabName)}
            className={`px-4 py-2 text-sm font-semibold rounded-md transition-colors ${activeTab === tabName ? 'bg-primary text-white' : 'bg-gray-200 text-text-secondary hover:bg-gray-300'}`}
        >
            {label}
        </button>
    );

    return (
        <div className="bg-background min-h-screen">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="text-center mb-12">
                    <h1 className="text-4xl lg:text-5xl font-extrabold font-serif text-text-primary">Oportunidades y Conexiones</h1>
                    <p className="mt-4 text-lg text-text-secondary max-w-3xl mx-auto">El núcleo para conectar la oferta y la demanda de talento periodístico innovador.</p>
                </div>
                
                <div className="flex justify-center flex-wrap gap-2 md:gap-4 mb-8">
                    <TabButton tabName="jobs" label="Oportunidades Laborales" />
                    <TabButton tabName="talents" label="Base de Talentos" />
                    <TabButton tabName="classifieds" label="Servicios Freelance" />
                </div>
                
                <div>
                    {renderContent()}
                </div>
            </div>
            {isServiceModalOpen && <ServicePublicationModal onClose={() => setIsServiceModalOpen(false)} />}
            {isTalentFormOpen && <TalentProfileForm talentProfile={null} onSave={handleSaveTalentProfile} onClose={() => setIsTalentFormOpen(false)} />}
        </div>
    );
};

export default OpportunitiesModule;