/**
 * Environment configuration
 * Loads environment-specific variables from .env files
 */

interface EnvConfig {
    apiUrl: string;
    mediaUrl: string;
    isDevelopment: boolean;
    isProduction: boolean;
}

// Vite exposes env variables through import.meta.env
// Variables prefixed with VITE_ are available in the client
const getEnvConfig = (): EnvConfig => {
    const mode = import.meta.env.MODE;
    const isDevelopment = mode === 'development';
    const isProduction = mode === 'production';

    // Get API URL from environment or use defaults
    const apiUrl = import.meta.env.VITE_API_URL ||
        (isDevelopment
            ? 'http://localhost:5000/backendcipress/api'
            : 'https://www.cipress.cl/backendcipress/api');

    // Get Media URL from environment or use defaults
    const mediaUrl = import.meta.env.VITE_MEDIA_URL ||
        (isDevelopment
            ? 'http://localhost:5000/backendcipress/media'
            : 'https://www.cipress.cl/backendcipress/media');

    return {
        apiUrl,
        mediaUrl,
        isDevelopment,
        isProduction,
    };
};

export const ENV = getEnvConfig();

// Helper function to get full media URL
export const getMediaUrl = (path: string): string => {
    if (!path) return '';

    // If path is already a full URL, return as is
    if (path.startsWith('http://') || path.startsWith('https://')) {
        return path;
    }

    // Remove leading slash if present
    const cleanPath = path.startsWith('/') ? path.slice(1) : path;

    // Combine media URL with path
    return `${ENV.mediaUrl}/${cleanPath}`;
};

// Helper function to get full API URL
export const getApiUrl = (endpoint: string): string => {
    // Remove leading slash if present
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;

    return `${ENV.apiUrl}/${cleanEndpoint}`;
};

// Log configuration on load (only in development)
if (ENV.isDevelopment) {
    console.log('🔧 Environment Configuration:', {
        mode: import.meta.env.MODE,
        apiUrl: ENV.apiUrl,
        mediaUrl: ENV.mediaUrl,
    });
}
