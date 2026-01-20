import React, { useState, useMemo, useEffect } from 'react';
import { entrepreneurs } from '../data/mockData'; // Fallback / unused for now
import type { PhotojournalismPost, User } from '../types';
import { WhatsAppIcon } from './icons';
import { getPhotoPosts, insertPhotoPost } from '../utils/db';

interface PhotojournalismModuleProps {
    posts?: PhotojournalismPost[];
    onSelectPost?: (post: PhotojournalismPost) => void;
    currentUser?: User | null;
}

const PhotoCard: React.FC<{ post: PhotojournalismPost; onClick?: () => void }> = ({ post, onClick }) => {
    return (
        <div
            className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow duration-300 group flex flex-col h-full cursor-pointer"
            onClick={onClick}
        >
            <img src={post.imageUrl} alt={post.title} className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300" />
            <div className="p-4 flex flex-col flex-grow">
                <h3 className="font-bold font-serif text-lg text-text-primary mt-1 mb-2 group-hover:text-primary transition-colors">{post.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed flex-grow line-clamp-3">{post.caption}</p>
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                    <div className="flex items-center space-x-2">
                        <img src={post.photographerAvatarUrl} alt={post.photographerName} className="w-8 h-8 rounded-full object-cover" />
                        <div>
                            <p className="font-semibold text-text-primary text-sm">{post.photographerName}</p>
                            <p className="text-xs text-text-secondary">{post.dateTaken ? new Date(post.dateTaken).toLocaleDateString() : 'Fecha desc.'}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


const PhotojournalismModule: React.FC<PhotojournalismModuleProps> = ({ posts = [], onSelectPost, currentUser }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [isPhotojournalismModalOpen, setIsPhotojournalismModalOpen] = useState(false);
    const [dbPosts, setDbPosts] = useState<PhotojournalismPost[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const ITEMS_PER_PAGE = 9;

    // Fetch posts from Supabase on mount
    useEffect(() => {
        const fetchPosts = async () => {
            setIsLoading(true);
            const data = await getPhotoPosts();
            setDbPosts(data);
            setIsLoading(false);
        };
        fetchPosts();
    }, []);

    // Combine props posts (mock) with DB posts. If DB has posts, prefer them. 
    // If DB is empty (initial load or no data), use props.posts (mock data) to avoid emptiness, unless we want to show empty state.
    // For now, let's merge or prioritize DB.
    const effectivePosts = dbPosts.length > 0 ? dbPosts : posts;

    const sortedPosts = useMemo(() => {
        return [...effectivePosts].sort((a, b) => new Date(b.dateAdded || 0).getTime() - new Date(a.dateAdded || 0).getTime());
    }, [effectivePosts]);

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

    const handleUploadSuccess = () => {
        setIsPhotojournalismModalOpen(false);
        // Refetch posts to show new one
        getPhotoPosts().then(setDbPosts);
    };

    const PhotojournalismPublicationModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
        const [uploadForm, setUploadForm] = useState({
            title: '',
            imageUrl: '',
            caption: '',
            dateTaken: new Date().toISOString().split('T')[0],
            whatsappContact: '',
        });
        const [isSubmitting, setIsSubmitting] = useState(false);

        const handleSubmit = async (e: React.FormEvent) => {
            e.preventDefault();
            if (!currentUser) return;

            setIsSubmitting(true);
            const newPost: Omit<PhotojournalismPost, 'id' | 'dateAdded'> = {
                ...uploadForm,
                photographerName: `${currentUser.firstName} ${currentUser.lastName}`,
                photographerAvatarUrl: `https://ui-avatars.com/api/?name=${currentUser.firstName}+${currentUser.lastName}&background=random`,
            };

            const result = await insertPhotoPost(newPost);
            setIsSubmitting(false);

            if (result.success) {
                handleUploadSuccess();
            } else {
                alert(result.message || 'Error al subir la foto');
            }
        };

        if (!currentUser) {
            return (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4 animate-fade-in" onClick={onClose}>
                    <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-md text-center relative" onClick={e => e.stopPropagation()}>
                        <button onClick={onClose} className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-3xl font-bold">&times;</button>
                        <h3 className="text-2xl font-bold font-serif text-secondary">Inicia Sesión para Publicar</h3>
                        <p className="mt-4 text-text-secondary">Para publicar tu acierto fotográfico, necesitas una cuenta activa en CiPress.</p>
                        <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
                            <button onClick={onClose} className="px-6 py-3 text-base font-bold text-white bg-primary rounded-md hover:bg-orange-600 transition-colors">
                                Volver
                            </button>
                        </div>
                    </div>
                </div>
            );
        }

        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4 animate-fade-in overflow-y-auto" onClick={onClose}>
                <div className="bg-white rounded-lg shadow-2xl p-6 w-full max-w-lg relative" onClick={e => e.stopPropagation()}>
                    <button onClick={onClose} className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-2xl font-bold">&times;</button>
                    <h3 className="text-2xl font-bold font-serif text-primary mb-6">Subir Fotografía</h3>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Título</label>
                            <input
                                required
                                type="text"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 border p-2"
                                value={uploadForm.title}
                                onChange={e => setUploadForm({ ...uploadForm, title: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">URL de la Imagen</label>
                            <input
                                required
                                type="url"
                                placeholder="https://..."
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 border p-2"
                                value={uploadForm.imageUrl}
                                onChange={e => setUploadForm({ ...uploadForm, imageUrl: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Descripción / Epígrafe</label>
                            <textarea
                                required
                                rows={3}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 border p-2"
                                value={uploadForm.caption}
                                onChange={e => setUploadForm({ ...uploadForm, caption: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Fecha de Captura</label>
                            <input
                                required
                                type="date"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 border p-2"
                                value={uploadForm.dateTaken}
                                onChange={e => setUploadForm({ ...uploadForm, dateTaken: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Contacto (WhatsApp)</label>
                            <input
                                required
                                type="tel"
                                placeholder="56912345678"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 border p-2"
                                value={uploadForm.whatsappContact}
                                onChange={e => setUploadForm({ ...uploadForm, whatsappContact: e.target.value })}
                            />
                        </div>

                        <div className="pt-4 flex justify-end space-x-3">
                            <button type="button" onClick={onClose} className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">Cancelar</button>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50"
                            >
                                {isSubmitting ? 'Publicando...' : 'Publicar'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    };

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

                {isLoading ? (
                    <div className="flex justify-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {currentPosts.map(post => (
                                <PhotoCard
                                    key={post.id}
                                    post={post}
                                    onClick={() => onSelectPost?.(post)}
                                />
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
                    </>
                )}
            </div>
            {isPhotojournalismModalOpen && <PhotojournalismPublicationModal onClose={() => setIsPhotojournalismModalOpen(false)} />}
        </div>
    );
};

export default PhotojournalismModule;