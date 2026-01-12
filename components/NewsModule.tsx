import React, { useState, useMemo } from 'react';
import { newsArticles } from '../data/mockData';
import type { NewsArticle } from '../types';

interface NewsModuleProps {
    onSelectNewsArticle: (article: NewsArticle) => void;
}

const NewsCard: React.FC<{ article: NewsArticle; isFeatured?: boolean; onClick: () => void; }> = ({ article, isFeatured = false, onClick }) => {
    if (isFeatured) {
        return (
            <button onClick={onClick} className="bg-surface rounded-lg shadow-xl overflow-hidden md:col-span-2 lg:col-span-3 grid md:grid-cols-2 group border border-gray-200 text-left w-full">
                <div className="md:order-2 overflow-hidden">
                    <img src={article.imageUrl} alt={article.title} className="w-full h-64 md:h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
                <div className="p-8 flex flex-col justify-center md:order-1">
                    <span className="text-sm font-bold uppercase text-primary tracking-wide">{article.category}</span>
                    <h2 className="text-3xl font-bold font-serif text-text-primary mt-2 group-hover:text-primary transition-colors">{article.title}</h2>
                    <p className="text-md text-text-secondary mt-4">{article.summary}</p>
                    <p className="text-sm text-gray-500 mt-4">{article.author} &middot; {article.date}</p>
                    <span className="mt-6 text-accent font-semibold group-hover:underline">Leer análisis completo &rarr;</span>
                </div>
            </button>
        )
    }

    return (
        <button onClick={onClick} className="bg-surface rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 group border border-gray-200 text-left w-full">
            <div className="overflow-hidden">
                <img src={article.imageUrl} alt={article.title} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"/>
            </div>
            <div className="p-5">
                <span className="text-xs font-bold uppercase text-primary tracking-wide">{article.category}</span>
                <h3 className="font-bold text-xl font-serif text-text-primary mt-2 h-24 group-hover:text-primary transition-colors">{article.title}</h3>
                <p className="text-sm text-gray-500 mt-3">{article.author} &middot; {article.date}</p>
                 <span className="mt-4 inline-block text-accent font-semibold text-sm group-hover:underline">Leer más &rarr;</span>
            </div>
        </button>
    );
}

const NewsModule: React.FC<NewsModuleProps> = ({ onSelectNewsArticle }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const ITEMS_PER_PAGE = 6;
    
    const featuredArticle = newsArticles[0];
    const otherArticles = newsArticles.slice(1);

    const totalPages = Math.ceil(otherArticles.length / ITEMS_PER_PAGE);

    const currentArticles = useMemo(() => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        return otherArticles.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    }, [currentPage, otherArticles]);
    
    const handlePageChange = (page: number) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };


    return (
        <div className="bg-background min-h-screen">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="text-center mb-12">
                    <h1 className="text-4xl lg:text-5xl font-extrabold font-serif text-text-primary">Análisis y Comunidad</h1>
                    <p className="mt-4 text-lg text-text-secondary max-w-3xl mx-auto">Ideas, debates y tendencias que moldean el futuro del periodismo y los medios.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {featuredArticle && <NewsCard article={featuredArticle} isFeatured={true} onClick={() => onSelectNewsArticle(featuredArticle)} />}
                    {currentArticles.map(article => (
                        <NewsCard key={article.id} article={article} onClick={() => onSelectNewsArticle(article)} />
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

export default NewsModule;