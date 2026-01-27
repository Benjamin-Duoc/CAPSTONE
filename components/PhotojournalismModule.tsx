
import React, { useState, useMemo } from 'react';
import { photojournalismPosts } from '../data/mockData';
import type { PhotojournalismPost } from '../types';
import { WhatsAppIcon } from './icons';

const PhotoCard: React.FC<{ post: PhotojournalismPost }> = ({ post }) => {
    return (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow duration-300 group flex flex-col h-full">
            <img src={post.imageUrl} alt={post.title} className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300" />
            <div className="p-4 flex flex-col flex-grow">
                <h3 className="font-bold font-serif text-lg text-text-primary mt-1 mb-2 group-hover:text-primary transition-colors">{post.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed flex-grow">{post.caption}</p>
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                     <div className="flex items-center space-x-2">
                        <img src={post.photographerAvatarUrl} alt={post.photographerName} className="w-8 h-8 rounded-full object-cover" />
                        <div>
                            <p className="font-semibold text-text-primary text-sm">{post.photographerName}</p>
                            <p className="text-xs text-text-secondary">{post.dateTaken}</p>
                        </div>
                    </div>
                    <a href={`https://wa.me/${post.whatsappContact}`} target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:underline flex items-center justify-end">
                        <WhatsAppIcon className="h-4 w-4 mr-1" />
                        Contactar
                    </a>
                </div>
            </div>
        </div>
    );
};


const PhotojournalismModule: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [isPhotojournalismModalOpen, setIsPhotojournalismModalOpen] = useState(false);
    const ITEMS_PER_PAGE = 9;

    const sortedPosts = useMemo(() => {
        return [...photojournalismPosts].sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime());
    }, []);

    const totalPages = Math.ceil(sortedPosts.length / ITEMS_PER_PAGE);

    const currentPosts = useMemo(() => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        return sortedPosts.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    }, [currentPage, sortedPosts]);

    const handlePageChange = (page: number) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };
    
    const PhotojournalismPublicationModal: React.FC<{ onClose: () => void }> = ({ onClose }) => (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4 animate-fade-in" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="modal-title-photojournalism">
          <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-md text-center relative" onClick={e => e.stopPropagation()}>
              <button onClick={onClose} className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-3xl font-bold" aria-label="Cerrar modal">&times;</button>
              <h3 id="modal-title-photojournalism" className="text-2xl font-bold font-serif text-secondary">Beneficio Exclusivo para Suscriptores Gratuitos</h3>
              <p className="mt-4 text-text-secondary">Para publicar tu acierto fotográfico en nuestro repositorio, necesitas una suscripción gratuita activa en CiPress.</p>
              <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
                  <a href="#" className="px-6 py-3 text-base font-bold text-white bg-primary rounded-md hover:bg-orange-600 transition-colors">
                      Registrarme
                  </a>
                  <a href="#" className="px-6 py-3 text-base font-bold text-secondary bg-gray-200 rounded-md hover:bg-gray-300 transition-colors">
                      Ingresar
                  </a>
              </div>
          </div>
      </div>
    );

    return (
        <div className="bg-background min-h-screen">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="text-center mb-12">
                    <h1 className="text-4xl lg:text-5xl font-extrabold font-serif text-text-primary">Repositorio de Foto-Periodismo</h1>
                    <p className="mt-4 text-lg text-text-secondary max-w-3xl mx-auto">Explora el archivo visual de nuestra comunidad. Cada imagen cuenta una historia.</p>
                </div>

                <div className="bg-primary/5 p-4 rounded-lg mb-8 border border-primary/10 flex flex-col sm:flex-row justify-between items-center text-center sm:text-left gap-4">
                    <div>
                        <h3 className="font-semibold text-base text-primary">¿Tienes una noticia gráfica?</h3>
                        <p className="text-xs text-orange-800">Con tu suscripción gratuita, publica tu acierto y dale difusión a tu perspectiva.</p>
                    </div>
                    <button 
                        onClick={() => setIsPhotojournalismModalOpen(true)}
                        className="flex-shrink-0 px-5 py-2 text-sm font-bold text-white bg-primary rounded-md hover:bg-orange-600 transition-colors duration-200 shadow-sm"
                    >
                        Sube tu foto
                    </button>
                </div>


                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {currentPosts.map(post => (
                        <PhotoCard key={post.id} post={post} />
                    ))}
                </div>

                {totalPages > 1 && (
                    <div className="flex justify-center items-center space-x-4 mt-12">
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-text-secondary hover:bg-surface disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Anterior
                        </button>
                        <span className="text-sm text-text-secondary">
                            Página {currentPage} de {totalPages}
                        </span>
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-text-secondary hover:bg-surface disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Siguiente
                        </button>
                    </div>
                )}
            </div>
            {isPhotojournalismModalOpen && <PhotojournalismPublicationModal onClose={() => setIsPhotojournalismModalOpen(false)} />}
        </div>
    );
};

export default PhotojournalismModule;