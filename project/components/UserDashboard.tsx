import React, { useState } from 'react';
import type { User, PremiumSponsor, PressRelease } from '../types';
import MyProfileView from './dashboard/MyProfileView';
import ConfianEnCipressView from './dashboard/ConfianEnCipressView';
import RedactarComunicadoView from './dashboard/RedactarComunicadoView';
import { 
    UserIcon, 
    CreditCardIcon, 
    PencilSquareIcon, 
    PhotoIcon, 
    BriefcaseIcon, 
    SparklesIcon, 
    BuildingOfficeIcon,
    LockClosedIcon,
    ArrowLeftOnRectangleIcon 
} from '@heroicons/react/24/outline';

interface UserDashboardProps {
    currentUser: User | null;
    onLogout: () => void;
    onNavigate: (page: string) => void;
    onUpdateProfile: (updates: Partial<User>) => Promise<void>;
    premiumSponsors: PremiumSponsor[];
    onAddSponsor: (sponsor: Omit<PremiumSponsor, 'id'>) => Promise<void>;
    onUpdateSponsor: (sponsor: PremiumSponsor) => Promise<void>;
    pressReleases: PressRelease[];
    onAddPressRelease: (pressRelease: Omit<PressRelease, 'id'>) => Promise<void>;
    onUpdatePressRelease: (pressRelease: PressRelease) => Promise<void>;
    onDeletePressRelease: (id: number) => Promise<void>;
}

type MenuSection = 'Mi Perfil' | 'Suscripción' | 'Redactar Comunicado' | 'Mis Galerías' | 'Confían en CiPress' | 'Mis Servicios Freelance' | 'Mi Perfil de Talento' | 'Publicar Oferta Laboral';

interface MenuItem {
    name: MenuSection;
    icon: React.ComponentType<any>;
    category: 'Mi Cuenta' | 'Mis Publicaciones' | 'Área Comercial' | 'Área Laboral';
    visibleFor: string[]; // roles
    lockedFor: string[]; // roles
}

const MENU_ITEMS: MenuItem[] = [
    { name: 'Mi Perfil', icon: UserIcon, category: 'Mi Cuenta', visibleFor: ['all'], lockedFor: [] },
    { name: 'Suscripción', icon: CreditCardIcon, category: 'Mi Cuenta', visibleFor: ['all'], lockedFor: [] },
    
    { name: 'Redactar Comunicado', icon: PencilSquareIcon, category: 'Mis Publicaciones', visibleFor: ['all'], lockedFor: [] },
    { name: 'Mis Galerías', icon: PhotoIcon, category: 'Mis Publicaciones', visibleFor: ['all'], lockedFor: ['colaborador'] },
    
    { name: 'Confían en CiPress', icon: BuildingOfficeIcon, category: 'Área Comercial', visibleFor: ['cliente', 'empresa', 'administrador'], lockedFor: [] },
    { name: 'Mis Servicios Freelance', icon: SparklesIcon, category: 'Área Comercial', visibleFor: ['cliente', 'administrador'], lockedFor: ['colaborador'] },
    
    { name: 'Mi Perfil de Talento', icon: UserIcon, category: 'Área Laboral', visibleFor: ['all'], lockedFor: [] },
    { name: 'Publicar Oferta Laboral', icon: BriefcaseIcon, category: 'Área Laboral', visibleFor: ['empresa', 'administrador'], lockedFor: [] },
];

const UserDashboard: React.FC<UserDashboardProps> = ({ 
    currentUser, onLogout, onNavigate, onUpdateProfile, 
    premiumSponsors, onAddSponsor, onUpdateSponsor,
    pressReleases, onAddPressRelease, onUpdatePressRelease, onDeletePressRelease
}) => {
    const [activeSection, setActiveSection] = useState<MenuSection>('Mi Perfil');

    // Mapeo seguro del rol (todo a lowercase)
    const userRole = (typeof currentUser?.role === 'string' 
        ? currentUser.role 
        : (currentUser?.role as any)?.name || '').toLowerCase();
        
    // Función auxiliar para determinar visibilidad
    const isVisible = (item: MenuItem) => {
        if (item.visibleFor.includes('all')) return true;
        if (userRole === 'administrador') return true;
        return item.visibleFor.some(role => userRole.includes(role));
    };

    // Función auxiliar para determinar si está bloqueado (Freemium Upsell)
    const isLocked = (item: MenuItem) => {
        if (userRole === 'administrador') return false;
        return item.lockedFor.some(role => userRole.includes(role));
    };

    // Agrupar ítems visibles por categoría
    const categories = ['Mi Cuenta', 'Mis Publicaciones', 'Área Comercial', 'Área Laboral'];

    const handleMenuClick = (item: MenuItem) => {
        if (isLocked(item)) {
            // TODO: Cambiar por un modal bonito de "Hazte Premium"
            alert(`La sección "${item.name}" requiere un plan Premium. ¡Actualiza tu suscripción para acceder a esta función exclusiva!`);
            return;
        }
        setActiveSection(item.name);
    };

    const renderContent = () => {
        switch (activeSection) {
            case 'Mi Perfil':
                return currentUser ? <MyProfileView currentUser={currentUser} onSaveProfile={onUpdateProfile} /> : <div className="p-8 text-center text-gray-500 font-medium">Cargando perfil...</div>;
            case 'Suscripción':
                return <div className="p-8 text-center text-gray-500 font-medium">Información de "Suscripción" (Próximamente)</div>;
            case 'Redactar Comunicado':
                return currentUser ? <RedactarComunicadoView 
                    currentUser={currentUser}
                    userPressReleases={pressReleases.filter(pr => pr.author === `${currentUser.firstName} ${currentUser.lastName}`.trim() || pr.authorUserId === currentUser.id)}
                    onSavePressRelease={async (data) => {
                        if ('id' in data) {
                            await onUpdatePressRelease(data as PressRelease);
                        } else {
                            await onAddPressRelease({ ...data, authorUserId: currentUser.id } as Omit<PressRelease, 'id'>);
                        }
                    }}
                    onDeletePressRelease={onDeletePressRelease}
                /> : <div className="p-8 text-center text-gray-500 font-medium">Cargando...</div>;
            case 'Mi Perfil de Talento':
            case 'Publicar Oferta Laboral':
                return <div className="p-8 text-center text-gray-500 font-medium">Vista para "{activeSection}" en construcción...</div>;
            case 'Mis Galerías':
                return <div className="p-8 text-center text-gray-500 font-medium">Información de "Mis Galerías" (Próximamente)</div>;
            case 'Confían en CiPress':
                return currentUser ? <ConfianEnCipressView 
                    currentUser={currentUser} 
                    premiumSponsors={premiumSponsors}
                    onSave={async (data) => {
                        const existingSponsor = premiumSponsors.find(s => s.userId === currentUser?.id);
                        if (existingSponsor) {
                            await onUpdateSponsor({ ...existingSponsor, ...data } as PremiumSponsor);
                        } else {
                            await onAddSponsor({ ...data, nameColor: '#000000', ctaColor: '#FF6B00', id: Date.now() } as Omit<PremiumSponsor, 'id'>);
                        }
                    }}
                /> : <div className="p-8 text-center text-gray-500 font-medium">Cargando...</div>;
            case 'Mis Servicios Freelance':
                return null;
            default:
                return null;
        }
    };

    return (
        <div className="bg-gray-50 flex flex-col md:flex-row animate-fade-in">
            {/* Sidebar Lateral Inteligente */}
            <aside className="w-full md:w-64 bg-white border-b md:border-b-0 md:border-r border-gray-200 flex flex-col md:sticky md:top-20 md:h-[calc(100vh-80px)] z-20">
                <div className="p-6 border-b border-gray-100 flex items-center mb-2">
                    <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold text-lg mr-3 shadow-inner">
                        {currentUser?.firstName?.charAt(0) || 'U'}
                    </div>
                    <div>
                        <h2 className="font-bold text-gray-800 leading-tight">Mi Espacio</h2>
                        <p className="text-xs text-primary font-medium">{currentUser?.role || 'Cargando...'}</p>
                    </div>
                </div>

                <div className="flex-grow overflow-y-auto px-4 py-4 space-y-6">
                    {categories.map(cat => {
                        const itemsInCategory = MENU_ITEMS.filter(item => item.category === cat && isVisible(item));
                        if (itemsInCategory.length === 0) return null;

                        return (
                            <div key={cat}>
                                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 px-2">
                                    {cat}
                                </h3>
                                <ul className="space-y-1">
                                    {itemsInCategory.map(item => {
                                        const active = activeSection === item.name;
                                        const locked = isLocked(item);
                                        const Icon = item.icon;

                                        return (
                                            <li key={item.name}>
                                                <button
                                                    onClick={() => handleMenuClick(item)}
                                                    className={`w-full flex items-center px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 
                                                        ${active 
                                                            ? 'bg-primary text-white shadow-md' 
                                                            : locked 
                                                                ? 'text-gray-400 hover:bg-gray-100' 
                                                                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'}
                                                    `}
                                                >
                                                    <Icon className={`w-5 h-5 mr-3 ${active ? 'text-white' : locked ? 'text-gray-300' : 'text-gray-500'}`} />
                                                    <span className="flex-grow text-left">{item.name}</span>
                                                    {locked && <LockClosedIcon className="w-4 h-4 text-orange-400 ml-2 animate-pulse" />}
                                                </button>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        );
                    })}
                </div>

                <div className="p-4 border-t border-gray-200 mt-4">
                    <button 
                        onClick={onLogout}
                        className="w-full flex items-center px-4 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                        <ArrowLeftOnRectangleIcon className="w-5 h-5 mr-3 text-red-500" />
                        Cerrar Sesión
                    </button>
                </div>
            </aside>

            {/* Contenido Principal */}
            <main className="flex-1 bg-white relative z-10 min-h-[calc(100vh-80px)] shadow-[-10px_0_15px_-3px_rgba(0,0,0,0.02)] pt-4 md:pt-0 pb-12 md:pb-24">
                {renderContent()}
            </main>
        </div>
    );
};

export default UserDashboard;
