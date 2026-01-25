import React, { useState } from 'react';
import type { Page, CommunityPost, User } from '../types';
import { ArrowUpRightIcon } from './icons';

interface CommunityPostPageProps {
    posts: CommunityPost[];
    onAddPost: (post: Omit<CommunityPost, 'id' | 'authorName' | 'authorAvatarUrl'>) => void;
    onNavigate: (page: Page) => void;
    currentUser: User | null;
}

const CommunityPostCard: React.FC<{ post: CommunityPost }> = ({ post }) => (
    <div className="bg-surface p-4 rounded-lg border border-gray-200">
        <div className="flex items-start space-x-3">
            <img src={post.authorAvatarUrl} alt={post.authorName} className="w-10 h-10 rounded-full flex-shrink-0" />
            <div>
                <p className="font-semibold text-text-primary text-sm">{post.authorName}</p>
                <p className="text-sm text-text-secondary italic">"{post.comment}"</p>
            </div>
        </div>
        <a href={post.postUrl} target="_blank" rel="noopener noreferrer" className="mt-3 group flex items-center justify-between bg-background p-3 rounded-md hover:bg-gray-200 transition-colors">
            <span className="font-semibold text-sm text-primary group-hover:underline pr-2">{post.postTitle}</span>
            <ArrowUpRightIcon className="h-5 w-5 text-primary flex-shrink-0" />
        </a>
    </div>
);

const CommunityPostPage: React.FC<CommunityPostPageProps> = ({ posts, onAddPost, onNavigate, currentUser }) => {
    const [postTitle, setPostTitle] = useState('');
    const [postUrl, setPostUrl] = useState('');
    const [comment, setComment] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    const ITEMS_PER_PAGE = 6;

    // Sort posts by createdAt (descending) or id if createdAt is missing
    const sortedPosts = [...posts].sort((a, b) => {
        const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;

        if (dateA !== dateB) {
            return dateB - dateA;
        }
        return b.id - a.id;
    });

    const totalPages = Math.ceil(sortedPosts.length / ITEMS_PER_PAGE);

    // Get current posts
    const indexOfLastPost = currentPage * ITEMS_PER_PAGE;
    const indexOfFirstPost = indexOfLastPost - ITEMS_PER_PAGE;
    const currentPosts = sortedPosts.slice(indexOfFirstPost, indexOfLastPost);

    // Change page
    const paginate = (pageNumber: number) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!postTitle.trim() || !postUrl.trim() || !comment.trim()) {
            alert('Por favor, completa todos los campos.');
            return;
        }

        setIsSubmitting(true);
        await onAddPost({ postTitle, postUrl, comment });
        setPostTitle('');
        setPostUrl('');
        setComment('');
        setIsSubmitting(false);
    };

    return (
        <div className="bg-background min-h-screen animate-fade-in">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <button
                    onClick={() => onNavigate('home')}
                    className="mb-8 inline-flex items-center text-primary font-semibold hover:underline"
                    aria-label="Volver a la página de inicio"
                >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                    Volver
                </button>
                <div className="text-center mb-12">
                    <h1 className="text-4xl lg:text-5xl font-extrabold font-serif text-text-primary">Actividad de la Comunidad</h1>
                    <p className="mt-4 text-lg text-text-secondary max-w-3xl mx-auto">Comparte artículos, inicia debates y conecta con otros periodistas innovadores.</p>
                </div>

                <div className="max-w-3xl mx-auto bg-surface p-8 rounded-lg shadow-lg border border-gray-200 mb-12">
                    <h2 className="text-2xl font-bold font-serif text-secondary mb-6">Compartir un nuevo artículo</h2>

                    {!currentUser ? (
                        <div className="text-center py-8">
                            <p className="text-lg text-text-secondary mb-4">Debes iniciar sesión para compartir artículos.</p>
                            <button
                                onClick={() => onNavigate('login')}
                                className="px-6 py-2 text-base font-bold text-white bg-primary rounded-md hover:bg-orange-600 transition-colors shadow-md"
                            >
                                Iniciar Sesión
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="postTitle" className="block text-sm font-medium text-gray-700">Título del Artículo</label>
                                <input
                                    type="text"
                                    id="postTitle"
                                    value={postTitle}
                                    onChange={(e) => setPostTitle(e.target.value)}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary"
                                    placeholder="Ej: The Guardian lanza nueva experiencia digital pagada"
                                    required
                                    disabled={isSubmitting}
                                />
                            </div>
                            <div>
                                <label htmlFor="postUrl" className="block text-sm font-medium text-gray-700">Enlace (URL)</label>
                                <input
                                    type="text"
                                    id="postUrl"
                                    value={postUrl}
                                    onChange={(e) => setPostUrl(e.target.value)}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary"
                                    placeholder="https://www.ejemplo.com/articulo"
                                    required
                                    disabled={isSubmitting}
                                />
                            </div>
                            <div>
                                <label htmlFor="comment" className="block text-sm font-medium text-gray-700">Tu Comentario o Resumen</label>
                                <textarea
                                    id="comment"
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    rows={3}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary"
                                    placeholder="¿Por qué es interesante este artículo? ¿Qué debate abre?"
                                    required
                                    disabled={isSubmitting}
                                />
                            </div>
                            <div className="text-right">
                                <button
                                    type="submit"
                                    className="px-6 py-2 text-base font-bold text-white bg-primary rounded-md hover:bg-orange-600 transition-colors shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? 'Publicando...' : 'Publicar'}
                                </button>
                            </div>
                        </form>
                    )}
                </div>
                <h2 className="text-3xl font-bold font-serif text-text-primary mb-6 border-b-2 border-accent pb-2">Últimas publicaciones</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {currentPosts.map(post => (
                        <CommunityPostCard key={post.id} post={post} />
                    ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="mt-12 flex justify-center items-center space-x-2">
                        <button
                            onClick={() => paginate(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="p-2 rounded-md border border-gray-300 bg-surface text-text-secondary hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            aria-label="Página anterior"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                        </button>

                        <div className="flex items-center space-x-1">
                            {[...Array(totalPages)].map((_, i) => (
                                <button
                                    key={i + 1}
                                    onClick={() => paginate(i + 1)}
                                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${currentPage === i + 1
                                        ? 'bg-primary text-white shadow-md'
                                        : 'bg-surface text-text-secondary border border-gray-300 hover:bg-gray-50'
                                        }`}
                                >
                                    {i + 1}
                                </button>
                            ))}
                        </div>

                        <button
                            onClick={() => paginate(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="p-2 rounded-md border border-gray-300 bg-surface text-text-secondary hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            aria-label="Página siguiente"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                        </button>
                    </div>
                )}

            </div>
        </div>
    );
};

export default CommunityPostPage;
