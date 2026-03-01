import React from 'react';
import { Entrepreneurship } from '../types';
import { EntrepreneurshipCard } from './EntrepreneurshipCard';
import { ChevronLeftIcon } from './icons';

interface Props {
    entrepreneurships: Entrepreneurship[];
    onBack?: () => void;
}

const EntrepreneurshipModule: React.FC<Props> = ({ entrepreneurships, onBack }) => {
    return (
        <div className="bg-slate-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-10 border-b border-gray-200 pb-4">
                    <h1 className="text-3xl md:text-5xl font-bold font-serif text-slate-800">
                        Emprendimientos Periodísticos
                    </h1>
                    {onBack && (
                        <button
                            onClick={onBack}
                            className="flex items-center text-secondary hover:text-blue-800 transition-colors font-semibold"
                        >
                            <ChevronLeftIcon className="h-5 w-5 mr-1" />
                            Volver
                        </button>
                    )}
                </div>

                {entrepreneurships.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {entrepreneurships.map(ent => (
                            <EntrepreneurshipCard
                                key={ent.id}
                                entrepreneurship={ent}
                                onPortfolioClick={(url) => window.open(url, '_blank')}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white rounded-xl border border-gray-100 shadow-sm">
                        <p className="text-gray-500 text-lg">Aún no hay emprendimientos registrados en esta categoría.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EntrepreneurshipModule;