import React from 'react';
import { User } from '../types';
import UserHeader from './UserHeader';

interface PremiumCollaboratorPageProps {
    currentUser: User;
    onLogout: () => void;
}

const PremiumCollaboratorPage: React.FC<PremiumCollaboratorPageProps> = ({ currentUser, onLogout }) => {
    return (
        <div className="min-h-screen bg-gray-50">
            <UserHeader user={currentUser} userTypeLabel="Cliente" onLogout={onLogout} />
            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="px-4 py-6 sm:px-0">
                    <div className="border-4 border-dashed border-yellow-200 bg-yellow-50 rounded-lg h-96 flex flex-col items-center justify-center">
                        <h2 className="text-2xl font-semibold text-yellow-800">Panel de Cliente</h2>
                        <p className="mt-2 text-yellow-700">Accede a herramientas exclusivas y gestión de contenido premium.</p>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default PremiumCollaboratorPage;
