
import React, { useState } from 'react';
import type { Page } from '../types';
import { insertUser } from '../utils/db';
import Logo from './Logo';

interface RegistrationPageProps {
    onNavigate: (page: Page) => void;
}

const RegistrationPage: React.FC<RegistrationPageProps> = ({ onNavigate }) => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        region: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setError(''); // Clear error on typing
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            setError('Las contraseñas no coinciden.');
            return;
        }

        // Call the database utility
        insertUser({
            firstName: formData.firstName,
            lastName: formData.lastName,
            region: formData.region,
            email: formData.email,
            password: formData.password
        }).then(result => {
            if (result.success) {
                setSuccess(true);
                setTimeout(() => {
                    onNavigate('home');
                }, 2000);
            } else {
                setError(result.message);
            }
        });
    };

    if (success) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-background animate-fade-in p-4">
                <div className="bg-surface p-8 rounded-lg shadow-xl text-center max-w-md w-full border border-gray-200">
                    <div className="text-green-500 mb-4">
                        <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    </div>
                    <h2 className="text-2xl font-bold font-serif text-text-primary mb-2">¡Registro Exitoso!</h2>
                    <p className="text-text-secondary">Bienvenido a CiPress. Serás redirigido al inicio en breve.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-background py-12 px-4 sm:px-6 lg:px-8 animate-fade-in">
            <div className="mb-8">
                <Logo onNavigate={onNavigate} />
            </div>

            <div className="max-w-md w-full space-y-8 bg-surface p-8 rounded-lg shadow-xl border border-gray-200">
                <div className="text-center">
                    <h2 className="mt-2 text-3xl font-extrabold text-text-primary font-serif">Crea tu cuenta</h2>
                    <p className="mt-2 text-sm text-text-secondary">
                        Únete a la comunidad de periodistas innovadores
                    </p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    {error && (
                        <div className="bg-red-50 border-l-4 border-red-500 p-4 text-red-700 text-sm rounded" role="alert">
                            <p>{error}</p>
                        </div>
                    )}

                    <div className="rounded-md shadow-sm space-y-4">
                        <div>
                            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">Nombre(s)</label>
                            <input
                                id="firstName"
                                name="firstName"
                                type="text"
                                required
                                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-400 text-gray-900 rounded-md focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                                placeholder="Ingresa tu o tus nombre"
                                value={formData.firstName}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Apellido</label>
                            <input
                                id="lastName"
                                name="lastName"
                                type="text"
                                required
                                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-400 text-gray-900 rounded-md focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                                placeholder="Ingresa tu o tus apellidos"
                                value={formData.lastName}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="region" className="block text-sm font-medium text-gray-700 mb-1">Región</label>
                            <input
                                id="region"
                                name="region"
                                type="text"
                                required
                                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-400 text-gray-900 rounded-md focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                                placeholder="Ingresa tu region nacional o internacional"
                                value={formData.region}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Correo Electrónico</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-400 text-gray-900 rounded-md focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                                placeholder="Ingresa tu correo"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-400 text-gray-900 rounded-md focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                                placeholder="Ingresa tu contraseña"
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">Repetir Contraseña</label>
                            <input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                required
                                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-400 text-gray-900 rounded-md focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                                placeholder="Repite la contraseña anterior"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-md text-white bg-primary hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary shadow-lg transition-colors duration-200"
                        >
                            Registrarme ahora
                        </button>
                    </div>
                    <div className="text-center">
                        <button type="button" onClick={() => onNavigate('home')} className="text-sm font-medium text-primary hover:text-orange-600">
                            Volver al inicio
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegistrationPage;