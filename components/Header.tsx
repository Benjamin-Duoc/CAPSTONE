
import React, { useState } from 'react';
import type { Page, User } from '../types';
import Logo from './Logo';
import { getAllUsers } from '../utils/db';

interface HeaderProps {
  currentPage: Page;
  onNavigate: (page: Page, subPage?: string) => void;
  isAdminMode: boolean;
}

const Header: React.FC<HeaderProps> = ({ currentPage, onNavigate, isAdminMode }) => {
  const [showUsersModal, setShowUsersModal] = useState(false);
  const [users, setUsers] = useState<User[]>([]);

  const mainNavItems: { page: Page; label: string }[] = [
    { page: 'opportunities', label: 'Oportunidades Laborales' },
    { page: 'courses', label: 'Capacitación' },
    { page: 'funding', label: 'Fondos' },
    { page: 'photo-gallery', label: 'Galería Fotográfica' },
  ];

  const handleShowUsers = () => {
      const dbUsers = getAllUsers();
      setUsers(dbUsers);
      setShowUsersModal(true);
  };

  return (
    <>
        <header className="bg-background/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-20">
            <div className="flex-shrink-0">
                <Logo onNavigate={onNavigate} />
            </div>
            <nav className="hidden md:flex md:space-x-8">
                {isAdminMode && (
                    <a
                    href="#"
                    onClick={(e) => { e.preventDefault(); onNavigate('admin'); }}
                    className={`text-base font-bold transition-colors duration-200 relative ${
                        currentPage === 'admin' ? 'text-accent' : 'text-text-secondary hover:text-accent'
                    }`}
                >
                    Panel de Administración
                    {currentPage === 'admin' && <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-accent"></span>}
                </a>
                )}
                {mainNavItems.map((item) => (
                <a
                    key={item.page}
                    href="#"
                    onClick={(e) => { e.preventDefault(); onNavigate(item.page); }}
                    className={`text-base font-medium transition-colors duration-200 relative ${
                    currentPage === item.page ? 'text-text-primary' : 'text-text-secondary hover:text-text-primary'
                    }`}
                >
                    {item.label}
                    {currentPage === item.page && <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary"></span>}
                </a>
                ))}
            </nav>
            <div className="flex items-center space-x-4">
                {/* DB View Button */}
                <button 
                    onClick={handleShowUsers}
                    className="text-xs font-mono text-blue-600 bg-blue-50 px-2 py-1 rounded border border-blue-200 hover:bg-blue-100 transition-colors"
                    title="Ver tabla 'usuario' de la base de datos"
                >
                    Ver Usuarios DB
                </button>

                <a href="#" className="text-sm font-medium text-text-secondary hover:text-text-primary hidden sm:block">
                Ingresar
                </a>
                <a 
                    href="#" 
                    onClick={(e) => { e.preventDefault(); onNavigate('register'); }}
                    className="px-4 py-2 text-sm font-bold text-white bg-primary rounded-md hover:bg-orange-600 transition-colors duration-200 shadow-lg shadow-primary/20"
                >
                Registrarme
                </a>
            </div>
            </div>
        </div>
        </header>

        {/* Modal de Usuarios */}
        {showUsersModal && (
            <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-4 animate-fade-in" onClick={() => setShowUsersModal(false)}>
                <div className="bg-surface rounded-lg shadow-2xl p-6 w-full max-w-5xl max-h-[85vh] overflow-hidden flex flex-col border border-gray-200" onClick={e => e.stopPropagation()}>
                    <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
                        <div>
                            <h3 className="text-2xl font-bold font-serif text-text-primary">Base de Datos: Tabla 'usuario'</h3>
                            <p className="text-sm text-text-secondary mt-1">Mostrando todos los registros almacenados localmente.</p>
                        </div>
                        <button onClick={() => setShowUsersModal(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                        </button>
                    </div>
                    
                    <div className="overflow-auto flex-grow bg-gray-50 rounded-md border border-gray-200">
                        {users.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-64 text-text-secondary">
                                <svg className="w-16 h-16 mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
                                <p className="text-lg font-medium">La tabla está vacía.</p>
                                <p className="text-sm">Regístrate para ver datos aquí.</p>
                            </div>
                        ) : (
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-100 sticky top-0">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">ID</th>
                                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Nombre</th>
                                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Apellido</th>
                                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Email</th>
                                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Región</th>
                                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Contraseña</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {users.map((u, index) => (
                                        <tr key={u.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">{u.id}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{u.firstName}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{u.lastName}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">{u.email}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{u.region}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400 font-mono tracking-widest">••••••</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                    <div className="mt-6 flex justify-end">
                        <button 
                            onClick={() => setShowUsersModal(false)} 
                            className="px-6 py-2 bg-primary text-white font-bold rounded-md hover:bg-orange-600 transition-colors shadow-md"
                        >
                            Cerrar
                        </button>
                    </div>
                </div>
            </div>
        )}
    </>
  );
};

export default Header;
