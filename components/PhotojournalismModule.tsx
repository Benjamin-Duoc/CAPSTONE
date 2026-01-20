import React, { useState, useMemo, useEffect } from 'react';
import { entrepreneurs } from '../data/mockData'; // Fallback / unused for now
import type { PhotojournalismPost, User } from '../types';
import { WhatsAppIcon } from './icons';
import { getPhotoPosts, insertPhotoPost, updatePhotoPost, uploadImage } from '../utils/db';

interface PhotojournalismModuleProps {
    posts?: PhotojournalismPost[];
    onSelectPost?: (post: PhotojournalismPost) => void;
    currentUser?: User | null;
}

const PhotoCard: React.FC<{
    post: PhotojournalismPost;
    onClick?: () => void;
    canEdit?: boolean;
    onEdit?: (e: React.MouseEvent) => void;
}> = ({ post, onClick, canEdit, onEdit }) => {
    return (
        <div
            className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow duration-300 group flex flex-col h-full cursor-pointer relative"
            onClick={onClick}
        >
            {canEdit && (
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onEdit?.(e);
                    }}
                    className="absolute top-2 right-2 z-10 bg-white/90 p-2 rounded-full shadow-md hover:bg-white text-primary hover:text-orange-600 transition-colors"
                    title="Editar publicación"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                </button>
            )}
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
    const [editingPost, setEditingPost] = useState<PhotojournalismPost | null>(null);

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
        setEditingPost(null);
        // Refetch posts to show new one
        getPhotoPosts().then(setDbPosts);
    };

    const handleModalClose = () => {
        setIsPhotojournalismModalOpen(false);
        setEditingPost(null);
    }

    const openUploadModal = () => {
        setEditingPost(null);
        setIsPhotojournalismModalOpen(true);
    };

    const handleEditPost = (post: PhotojournalismPost) => {
        setEditingPost(post);
        setIsPhotojournalismModalOpen(true);
    }

    const PhotojournalismPublicationModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
        const [uploadForm, setUploadForm] = useState({
            title: editingPost?.title || '',
            imageUrl: editingPost?.imageUrl || '',
            caption: editingPost?.caption || '',
            dateTaken: editingPost?.dateTaken ? editingPost.dateTaken.split('T')[0] : new Date().toISOString().split('T')[0],
            whatsappContact: editingPost?.whatsappContact || '',
        });
        const [imageFile, setImageFile] = useState<File | null>(null);
        const [isSubmitting, setIsSubmitting] = useState(false);
        const [uploadError, setUploadError] = useState<string | null>(null);

        const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            if (e.target.files && e.target.files[0]) {
                setImageFile(e.target.files[0]);
                // Clear URL if file is selected, or keep it as preview? 
                // Let's clear it to avoid confusion, or perhaps showing a preview would be better.
                // For now, simple logic:
            }
        };

        const handleSubmit = async (e: React.FormEvent) => {
            e.preventDefault();
            if (!currentUser) return;

            setIsSubmitting(true);
            setUploadError(null);

            let finalImageUrl = uploadForm.imageUrl;

            if (imageFile) {
                const uploadResult = await uploadImage(imageFile);
                if (uploadResult.success && uploadResult.url) {
                    finalImageUrl = uploadResult.url;
                } else {
                    setUploadError(uploadResult.message || 'Error al subir la imagen.');
                    setIsSubmitting(false);
                    return;
                }
            }

            if (!finalImageUrl) {
                setUploadError('Por favor sube una imagen o proporciona una URL.');
                setIsSubmitting(false);
                return;
            }

            if (editingPost) {
                const updatedPost: PhotojournalismPost = {
                    ...editingPost,
                    ...uploadForm,
                    imageUrl: finalImageUrl,
                };
                const result = await updatePhotoPost(updatedPost);
                if (result.success) {
                    handleUploadSuccess();
                } else {
                    setUploadError(result.message || 'Error al actualizar la publicación.');
                }
            } else {
                const newPost: Omit<PhotojournalismPost, 'id' | 'dateAdded'> = {
                    ...uploadForm,
                    imageUrl: finalImageUrl,
                    photographerName: `${currentUser.firstName} ${currentUser.lastName}`,
                    photographerAvatarUrl: `https://ui-avatars.com/api/?name=${currentUser.firstName}+${currentUser.lastName}&background=random`,
                    createdBy: currentUser.email,
                };

                const result = await insertPhotoPost(newPost);

                if (result.success) {
                    handleUploadSuccess();
                } else {
                    setUploadError(result.message || 'Error al subir la foto.');
                }
            }
            setIsSubmitting(false);
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
                    <h3 className="text-2xl font-bold font-serif text-primary mb-6">
                        {editingPost ? 'Editar Fotografía' : 'Subir Fotografía'}
                    </h3>

                    {uploadError && (
                        <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md text-sm">
                            {uploadError}
                        </div>
                    )}

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
                            <label className="block text-sm font-medium text-gray-700">Imagen</label>
                            <div className="mt-1 flex flex-col gap-2">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className="block w-full text-sm text-gray-500
                                        file:mr-4 file:py-2 file:px-4
                                        file:rounded-md file:border-0
                                        file:text-sm file:font-semibold
                                        file:bg-primary file:text-white
                                        hover:file:bg-orange-600
                                    "
                                />
                                <div className="text-center text-gray-400 text-xs">- O -</div>
                                <input
                                    type="url"
                                    placeholder="https://... (URL de imagen externa)"
                                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 border p-2"
                                    value={uploadForm.imageUrl}
                                    onChange={e => setUploadForm({ ...uploadForm, imageUrl: e.target.value })}
                                />
                                <p className="text-xs text-gray-500">Sube un archivo o pega una URL.</p>
                            </div>
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
                                {isSubmitting ? (editingPost ? 'Guardando...' : 'Publicando...') : (editingPost ? 'Guardar Cambios' : 'Publicar')}
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
                        onClick={openUploadModal}
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
                                    canEdit={!!currentUser && !!post.createdBy && currentUser.email === post.createdBy}
                                    onEdit={() => handleEditPost(post)}
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
            {isPhotojournalismModalOpen && <PhotojournalismPublicationModal onClose={handleModalClose} />}
        </div>
    );
};

export default PhotojournalismModule;