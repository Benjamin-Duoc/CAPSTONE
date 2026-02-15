import React from 'react';
import { User } from '../types';
import UserHeader from './UserHeader';

interface FreeCollaboratorPageProps {
    currentUser: User;
    onLogout: () => void;
    onEditProfile?: () => void;
}

const FreeCollaboratorPage: React.FC<FreeCollaboratorPageProps> = ({ currentUser, onLogout, onEditProfile }) => {
    return (
        <div className="min-h-screen bg-gray-50">
            <UserHeader user={currentUser} userTypeLabel="Colaborador" onLogout={onLogout} onEditProfile={onEditProfile} />
            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="px-4 py-6 sm:px-0">
                    <div className="border-4 border-dashed border-gray-200 rounded-lg h-96 flex flex-col items-center justify-center">
                        <h2 className="text-2xl font-semibold text-gray-700">Panel de Colaborador</h2>
                        <p className="mt-2 text-gray-500">Aquí podrás gestionar tus comunicados, fotos y eventos.</p>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default FreeCollaboratorPage;
