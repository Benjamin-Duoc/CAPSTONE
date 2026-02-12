import React, { useState } from 'react';

import type { Entrepreneurship } from '../types';
import { MapPinIcon } from './icons';

type Tab = 'micromedios' | 'directorio' | 'videoteca';

const EntrepreneurCard: React.FC<{ item: Entrepreneurship }> = ({ item }) => (
    <div className="bg-surface rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 group border border-gray-200 hover:border-primary">
        <div className="overflow-hidden">
            <img src={item.imageUrl} alt={item.name} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
        </div>
        <div className="p-5">
            <span className="text-xs font-bold uppercase text-accent tracking-wide">{item.specialty}</span>
            <h3 className="font-bold text-xl font-serif text-text-primary mt-2 group-hover:text-primary transition-colors">{item.name}</h3>
            <p className="text-sm text-text-secondary mt-1">Por {item.founder}</p>
            <p className="text-sm text-text-primary mt-3 h-20 overflow-hidden">{item.description}</p>
            <div className="flex items-center text-primary mt-4">
                <MapPinIcon className="h-4 w-4 mr-1" />
                <span className="text-sm font-semibold">{item.location}</span>
            </div>
        </div>
    </div>
);


interface EntrepreneurshipModuleProps {
    entrepreneurs: Entrepreneurship[];
}

const EntrepreneurshipModule: React.FC<EntrepreneurshipModuleProps> = ({ entrepreneurs }) => {
    const [activeTab, setActiveTab] = useState<Tab>('micromedios');

    const renderContent = () => {
        switch (activeTab) {
            case 'micromedios':
                return (
                    <div>
                        <div className="text-center mb-8">
                            <h2 className="text-2xl font-bold font-serif text-text-primary">Vitrina de Micromedios</h2>
                            <p className="text-text-secondary mt-1">El mapa de los medios independientes y autogestionados de Chile.</p>
                        </div>
                        <div className="h-64 bg-surface border border-gray-200 rounded-lg mb-8 flex items-center justify-center">
                            <p className="text-text-secondary font-semibold">Mapa Interactivo de Chile (Próximamente)</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {entrepreneurs.filter(e => e.type === 'Micromedio').map(item => <EntrepreneurCard key={item.id} item={item} />)}
                        </div>
                    </div>
                );
            case 'directorio':
                return (
                    <div>
                        <div className="text-center mb-8">
                            <h2 className="text-2xl font-bold font-serif text-text-primary">Directorio de Emprendimientos</h2>
                            <p className="text-text-secondary mt-1">Agencias, productoras y consultorías fundadas por periodistas.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {entrepreneurs.filter(e => e.type !== 'Micromedio').map(item => <EntrepreneurCard key={item.id} item={item} />)}
                        </div>
                    </div>
                );
            case 'videoteca':
                return (
                    <div className="text-center py-16 bg-surface rounded-lg shadow-sm border border-gray-200">
                        <h2 className="text-2xl font-bold font-serif text-text-primary">Videoteca de Emprendedores</h2>
                        <p className="text-text-secondary mt-2">Historias de éxito y casos de estudio para inspirar. Próximamente.</p>
                    </div>
                );
            default:
                return null;
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
                    <h1 className="text-4xl lg:text-5xl font-extrabold font-serif text-text-primary">Ecosistema de Emprendimiento</h1>
                    <p className="mt-4 text-lg text-text-secondary max-w-3xl mx-auto">Un espacio para visibilizar, inspirar y conectar a los periodistas que han decidido crear.</p>
                </div>

                <div className="flex justify-center space-x-2 md:space-x-4 mb-8">
                    <TabButton tabName="micromedios" label="Vitrina de Micromedios" />
                    <TabButton tabName="directorio" label="Directorio de Empresas" />
                    <TabButton tabName="videoteca" label="Videoteca" />
                </div>

                <div>
                    {renderContent()}
                </div>
            </div>
        </div>
    );
};

export default EntrepreneurshipModule;