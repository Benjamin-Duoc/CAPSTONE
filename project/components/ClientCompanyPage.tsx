import React from 'react';
import { User } from '../types';
import UserHeader from './UserHeader';

interface ClientCompanyPageProps {
    currentUser: User;
    onLogout: () => void;
}

const ClientCompanyPage: React.FC<ClientCompanyPageProps> = ({ currentUser, onLogout }) => {
    return (
        <div className="min-h-screen bg-gray-50">
            <UserHeader user={currentUser} userTypeLabel="Empresa" onLogout={onLogout} />
            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="px-4 py-6 sm:px-0">
                    <div className="border-4 border-dashed border-indigo-200 bg-indigo-50 rounded-lg h-96 flex flex-col items-center justify-center">
                        <h2 className="text-2xl font-semibold text-indigo-800">Panel de Empresa</h2>
                        <p className="mt-2 text-indigo-700">Gestiona tus noticias auspiciadas y avisos comerciales.</p>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ClientCompanyPage;
