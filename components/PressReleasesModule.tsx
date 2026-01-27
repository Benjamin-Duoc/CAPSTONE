import React, { useState, useMemo } from 'react';
import type { PressRelease } from '../types';

// FIX: Define missing props interface
interface PressReleasesModuleProps {
    pressReleases: PressRelease[];
    onSelectPressRelease: (pressRelease: PressRelease) => void;
}

const PressReleaseCard: React.FC<{ release: PressRelease; onClick: () => void }> = ({ release, onClick }) => (
    <button onClick={onClick} className="bg-surface rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 group flex flex-col border border-gray-200 text-left w-full h-full">
      <img src={release.imageUrl} alt={release.title} className="w-full h-40 object-cover" />
      <div className="p-4 flex flex-col flex-grow">
        <span className="text-xs font-bold uppercase text-primary tracking-wide">{release.institution}</span>
        <h3 className="font-bold font-serif text-lg text-text-primary mt-2 group-hover:text-primary transition-colors flex-grow">{release.title}</h3>
        <p className="text-sm text-text-secondary mt-2">{release.summary}</p>
        <p className="text-xs text-gray-500 mt-4 pt-2 border-t border-gray-100">{release.date}</p>
      </div>
    </button>
);

const PressReleasesModule: React.FC<PressReleasesModuleProps> = ({ pressReleases, onSelectPressRelease }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const ITEMS_PER_PAGE = 12;

    const sortedReleases = useMemo(() => {
        const monthMap: { [key: string]: number } = {
            'enero': 0, 'febrero': 1, 'marzo': 2, 'abril': 3, 'mayo': 4, 'junio': 5,
            'julio': 6, 'agosto': 7, 'septiembre': 8, 'octubre': 9, 'noviembre': 10, 'diciembre': 11
        };
        return [...pressReleases].sort((a, b) => {
            try {
                const [dayA, , monthA, , yearA] = a.date.split(' ');
                const [dayB, , monthB, , yearB] = b.date.split(' ');
                const dateA = new Date(parseInt(yearA), monthMap[monthA.replace(',', '').toLowerCase()], parseInt(dayA));
                const dateB = new Date(parseInt(yearB), monthMap[monthB.replace(',', '').toLowerCase()], parseInt(dayB));
                return dateB.getTime() - dateA.getTime();
            } catch (error) {
                // Fallback for potentially malformed dates
                return 0;
            }
        });
    }, [pressReleases]);

    const totalPages = Math.ceil(sortedReleases.length / ITEMS_PER_PAGE);

    const currentReleases = useMemo(() => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        return sortedReleases.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    }, [currentPage, sortedReleases]);

    const handlePageChange = (page: number) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
            window.scrollTo(0, 0);
        }
    };

    return (
        <div className="bg-background min-h-screen">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="text-center mb-12">
                    <h1 className="text-4xl lg:text-5xl font-extrabold font-serif text-text-primary">Periodistas en Acción</h1>
                    <p className="mt-4 text-lg text-text-secondary max-w-3xl mx-auto">Estas son las principales noticias de la semana</p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {currentReleases.map(release => (
                        <PressReleaseCard key={release.id} release={release} onClick={() => onSelectPressRelease(release)} />
                    ))}
                </div>

                {totalPages > 1 && (
                    <div className="flex justify-center items-center space-x-4 mt-12">
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="px-4 py-2 bg-surface border border-gray-300 rounded-md text-sm font-medium text-text-secondary hover:bg-background disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Anterior
                        </button>
                        <span className="text-sm text-text-secondary">
                            Página {currentPage} de {totalPages}
                        </span>
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="px-4 py-2 bg-surface border border-gray-300 rounded-md text-sm font-medium text-text-secondary hover:bg-background disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Siguiente
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PressReleasesModule;