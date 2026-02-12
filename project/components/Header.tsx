import React, { useState } from 'react';
import type { Page, User } from '../types';
import Logo from './Logo';
interface HeaderProps {
    currentPage: Page;
    onNavigate: (page: Page, subPage?: string) => void;
    isAdminMode: boolean;
    currentUser?: User | null;
    onLogout?: () => void;
}

const Header: React.FC<HeaderProps> = ({ currentPage, onNavigate, isAdminMode, currentUser, onLogout }) => {
    const [showUserMenu, setShowUserMenu] = useState(false); // Estado para el menú desplegable (Del Main)

    // Usamos la lista del MAIN porque incluye "Fotoperiodismo"
    const mainNavItems: { page: Page; label: string }[] = [
        { page: 'opportunities', label: 'Oportunidades Laborales' },
        { page: 'courses', label: 'Capacitación' },
        { page: 'funding', label: 'Fondos' },
        { page: 'photo-gallery', label: 'Galería Fotográfica' },
        { page: 'photojournalism', label: 'Fotoperiodismo' },
    ];

    return (
        <>
            <header className="bg-background/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-24">
                        <div className="flex-shrink-0">
                            <Logo onNavigate={onNavigate} />
                        </div>
                        <nav className="hidden md:flex md:space-x-8">

                            {mainNavItems.map((item) => (
                                <a
                                    key={item.page}
                                    href="#"
                                    onClick={(e) => { e.preventDefault(); onNavigate(item.page); }}
                                    className={`text-base font-medium transition-colors duration-200 relative ${currentPage === item.page ? 'text-text-primary' : 'text-text-secondary hover:text-text-primary'
                                        }`}
                                >
                                    {item.label}
                                    {currentPage === item.page && <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary"></span>}
                                </a>
                            ))}
                        </nav>
                        <div className="flex items-center space-x-4">

                            {/* Menú de Usuario con Dropdown (Versión MAIN mejorada) */}
                            {currentUser ? (
                                <div className="relative">
                                    <button
                                        onClick={() => setShowUserMenu(!showUserMenu)}
                                        className="flex items-center space-x-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg px-4 py-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/20"
                                    >
                                        <div className="text-left hidden sm:block">
                                            <p className="text-sm font-bold text-text-primary leading-tight">{currentUser.firstName} {currentUser.lastName}</p>
                                            <p className="text-xs text-text-secondary truncate w-24">{currentUser.email}</p>
                                        </div>
                                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                                            {currentUser.firstName.charAt(0)}
                                        </div>
                                        <svg className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${showUserMenu ? 'transform rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                        </svg>
                                    </button>

                                    {/* Dropdown Menu */}
                                    {showUserMenu && (
                                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 border border-gray-100 z-50 animate-fade-in">
                                            <div className="px-4 py-2 border-b border-gray-100 sm:hidden">
                                                <p className="text-sm font-bold text-text-primary">{currentUser.firstName} {currentUser.lastName}</p>
                                                <p className="text-xs text-text-secondary truncate">{currentUser.email}</p>
                                            </div>
                                            {(isAdminMode || currentUser?.role === 'Administrador' || currentUser?.role === 'Administrator') && (
                                                <button
                                                    onClick={() => {
                                                        setShowUserMenu(false);
                                                        onNavigate('admin');
                                                    }}
                                                    className="block w-full text-left px-4 py-2 text-sm text-text-primary hover:bg-gray-50 transition-colors"
                                                >
                                                    Administrar
                                                </button>
                                            )}
                                            <button
                                                onClick={() => {
                                                    setShowUserMenu(false);
                                                    if (onLogout) onLogout();
                                                }}
                                                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                                            >
                                                Cerrar sesión
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <>
                                    <a
                                        href="#"
                                        onClick={(e) => { e.preventDefault(); onNavigate('login'); }}
                                        className="text-sm font-medium text-text-secondary hover:text-text-primary hidden sm:block"
                                    >
                                        Ingresar
                                    </a>
                                    <a
                                        href="#"
                                        onClick={(e) => { e.preventDefault(); onNavigate('register'); }}
                                        className="px-4 py-2 text-sm font-bold text-white bg-primary rounded-md hover:bg-orange-600 transition-colors duration-200 shadow-lg shadow-primary/20"
                                    >
                                        Registrarme
                                    </a>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
};

export default Header;