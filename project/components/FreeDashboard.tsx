import React from 'react';
import type { User, PressRelease } from '../types';
import PressReleaseForm from './admin/PressReleaseForm';
import { ArrowLeftOnRectangleIcon } from '@heroicons/react/24/outline';

interface FreeDashboardProps {
    currentUser: User | null;
    onLogout: () => void;
    pressReleases: PressRelease[];
    onAddPressRelease: (pressRelease: Omit<PressRelease, 'id'>) => Promise<void>;
    onUpdatePressRelease: (pressRelease: PressRelease) => Promise<void>;
    onDeletePressRelease: (id: number) => Promise<void>;
}

const FreeDashboard: React.FC<FreeDashboardProps> = ({
    currentUser,
    onLogout,
    pressReleases,
    onAddPressRelease,
    onUpdatePressRelease,
    onDeletePressRelease
}) => {
    return (
        <div className="flex h-screen bg-neutral font-sans">
            {/* Minimal Sidebar for Logout */}
            <div className="w-64 bg-surface border-r border-gray-200 flex flex-col justify-between hidden md:flex">
                <div>
                    <div className="p-6 border-b border-gray-200">
                        <h2 className="text-xl font-bold font-serif text-text-primary">Colaborador</h2>
                        <p className="text-sm text-text-secondary mt-1 truncate">{currentUser?.email}</p>
                        <span className="inline-block mt-2 px-2 py-1 bg-gray-100 text-gray-600 font-bold text-xs uppercase rounded">Cta. Básica</span>
                    </div>
                </div>
                <div className="p-4 border-t border-gray-200">
                    <button
                        onClick={onLogout}
                        className="flex items-center space-x-3 w-full p-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors font-medium"
                    >
                        <ArrowLeftOnRectangleIcon className="h-5 w-5" />
                        <span>Cerrar Sesión</span>
                    </button>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 overflow-y-auto bg-neutral">
                {/* Mobile Header */}
                <div className="md:hidden bg-surface flex items-center justify-between p-4 border-b border-gray-200">
                    <h2 className="text-lg font-bold font-serif text-text-primary">Colaborador</h2>
                    <button onClick={onLogout} className="text-red-500 hover:text-red-700">
                        <ArrowLeftOnRectangleIcon className="h-6 w-6" />
                    </button>
                </div>

                <div className="p-4 md:p-8 max-w-5xl mx-auto">
                    <div className="bg-primary/5 border-l-4 border-primary p-4 rounded-r-lg mb-8">
                        <h3 className="text-lg font-bold text-primary">Panel de Redacción</h3>
                        <p className="text-text-secondary mt-1">
                            Como colaborador gratuito, sus comunicados se publican automáticamente en el repositorio general y tienen visibilidad rotativa enPortada durante el horario nocturno (12:00 PM a 04:00 AM).
                        </p>
                    </div>

                    <div className="bg-surface rounded-xl shadow-sm border border-gray-200 overflow-hidden p-6 max-w-4xl mx-auto">
                        <PressReleaseForm 
                            pressRelease={null}
                            onSave={async (data) => {
                                await onAddPressRelease(data);
                                alert("¡Comunicado subido con éxito! Pasará a la rotación gratuita.");
                                window.location.reload();
                            }}
                            onClose={() => {
                                window.location.href = '/';
                            }}
                            isModal={false}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FreeDashboard;
