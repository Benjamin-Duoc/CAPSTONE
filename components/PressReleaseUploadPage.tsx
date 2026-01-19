
import React from 'react';
import PressReleaseForm from './admin/PressReleaseForm';
import type { PressRelease, Page, User } from '../types';

interface PressReleaseUploadPageProps {
    onNavigate: (page: Page) => void;
    onAddPressRelease: (pressRelease: Omit<PressRelease, 'id'>) => void;
    currentUser: User | null;
}

const PressReleaseUploadPage: React.FC<PressReleaseUploadPageProps> = ({ onNavigate, onAddPressRelease, currentUser }) => {

    const handleSave = (pr: Omit<PressRelease, 'id'>) => {
        onAddPressRelease(pr);
        alert('¡Comunicado enviado con éxito! Estará visible pendiente de aprobación.');
        onNavigate('home');
    };

    const handleClose = () => {
        onNavigate('home');
    };

    if (!currentUser) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
                <div className="bg-white p-8 rounded-lg shadow-xl text-center max-w-md">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Acceso Restringido</h2>
                    <p className="text-gray-600 mb-6">Debes iniciar sesión para subir un comunicado.</p>
                    <button onClick={() => onNavigate('home')} className="bg-primary text-white px-6 py-2 rounded font-bold hover:bg-orange-600">Volver al Inicio</button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 bg-[url('/bg-pattern.svg')]">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-extrabold text-primary font-serif tracking-tight sm:text-5xl mb-2">
                        Tu Voz, Nuestra Plataforma
                    </h1>
                    <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
                        Comparte tus noticias, innovaciones y logros con la comunidad de CiPress.
                        Rellena el formulario a continuación para publicar tu comunicado.
                    </p>
                </div>

                <div className="bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-100">
                    <div className="bg-primary px-6 py-4 border-b border-primary/90">
                        <div className="flex items-center space-x-2">
                            <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                            <h2 className="text-lg font-medium text-white">Editor de Comunicados</h2>
                        </div>
                    </div>
                    <div className="p-8">
                        <PressReleaseForm
                            pressRelease={null}
                            onSave={handleSave}
                            onClose={handleClose}
                            isModal={false}
                        />
                    </div>
                </div>

                <div className="mt-8 text-center">
                    <button onClick={() => onNavigate('home')} className="text-secondary hover:text-primary font-medium transition-colors">
                        &larr; Volver al Inicio
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PressReleaseUploadPage;
