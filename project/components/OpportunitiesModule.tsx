
import React, { useState, useMemo } from 'react';
import type { Job, TalentProfile } from '../types';
import { BriefcaseIcon, MapPinIcon, LightBulbIcon, LinkedInIcon } from './icons';
import TalentProfileForm from './admin/TalentProfileForm';

interface OpportunitiesModuleProps {
    jobs: Job[];
    onSelectJob: (job: Job) => void;
    initialTab?: string;
    talentProfiles: TalentProfile[];
    onAddTalentProfile: (profile: Omit<TalentProfile, 'id'>) => void;
    rotationInterval: number;
}

type Tab = 'jobs' | 'talents';

const JobCard: React.FC<{ job: Job; onSelect: () => void }> = ({ job, onSelect }) => (
    <button onClick={onSelect} className="w-full text-left bg-surface p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6 border border-gray-200 group">
        <img src={job.logoUrl} alt={`${job.company} logo`} className="w-16 h-16 rounded-full flex-shrink-0 object-cover border-2 border-gray-200" />
        <div className="flex-grow">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center">
                <h3 className="font-bold font-serif text-xl text-text-primary group-hover:text-primary transition-colors">{job.title}</h3>
                <span className="text-sm text-highlight font-semibold mt-1 sm:mt-0">{job.date}</span>
            </div>
            <p className="text-md text-text-secondary">{job.company}</p>
            <div className="flex items-center text-sm text-gray-500 mt-2 space-x-4">
                <div className="flex items-center"><MapPinIcon className="h-4 w-4 mr-1" /><span>{job.location}</span></div>
                <div className="flex items-center"><BriefcaseIcon className="h-4 w-4 mr-1" /><span>{job.type}</span></div>
            </div>
        </div>
        <div className="self-start sm:self-center flex-shrink-0 px-4 py-2 text-sm font-semibold text-white bg-primary rounded-md group-hover:bg-orange-600 transition-colors">
            Ver Detalles
        </div>
    </button>
);

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


const OpportunitiesModule: React.FC<OpportunitiesModuleProps> = ({ jobs, onSelectJob, initialTab, talentProfiles, onAddTalentProfile, rotationInterval }) => {
    const [activeTab, setActiveTab] = useState<Tab>((initialTab as Tab) || 'jobs');
    const [isTalentFormOpen, setIsTalentFormOpen] = useState(false);

    // Talent Pagination
    const [talentCurrentPage, setTalentCurrentPage] = useState(1);
    const TALENTS_PER_PAGE = 15;



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
                </div>

                <div>
                    {renderContent()}
                </div>
            </div>
            {isTalentFormOpen && <TalentProfileForm talentProfile={null} onSave={handleSaveTalentProfile} onClose={() => setIsTalentFormOpen(false)} />}
        </div>
    );
};

export default OpportunitiesModule;