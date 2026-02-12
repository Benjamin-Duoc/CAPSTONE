import React, { useState, useEffect } from 'react';
import type { HeroHeading } from '../../types';

interface HeadingFormProps {
    currentHeading: HeroHeading;
    onSave: (heading: HeroHeading) => void;
    onClose: () => void;
}

const HeadingForm: React.FC<HeadingFormProps> = ({ currentHeading, onSave, onClose }) => {
    const [formData, setFormData] = useState<HeroHeading>(currentHeading);

    useEffect(() => {
        setFormData(currentHeading);
    }, [currentHeading]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-2xl p-6 w-full max-w-lg">
                <h2 className="text-2xl font-bold mb-4">Editar Título Principal</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Texto Principal</label>
                        <input type="text" name="mainText" value={formData.mainText} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary" required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Texto Destacado</label>
                        <input type="text" name="highlightedText" value={formData.highlightedText} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary" required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Subtítulo (opcional)</label>
                        <input type="text" name="subText" value={formData.subText || ''} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Etiqueta del Emprendimiento Destacado</label>
                        <input type="text" name="featuredLabel" value={formData.featuredLabel} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary" required />
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-gray-700">Color del Texto Sobre la Foto</label>
                        <div className="flex items-center space-x-2 mt-1">
                            <input 
                                type="color" 
                                name="textColor" 
                                value={formData.textColor} 
                                onChange={handleChange} 
                                className="p-1 h-10 w-14 block bg-white border border-gray-300 rounded-md shadow-sm cursor-pointer" 
                            />
                            <input
                                type="text"
                                name="textColor"
                                value={formData.textColor}
                                onChange={handleChange}
                                className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary"
                            />
                        </div>
                    </div>
                    <div className="flex justify-end space-x-4 pt-4">
                        <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300">Cancelar</button>
                        <button type="submit" className="px-4 py-2 bg-primary text-white font-semibold rounded-lg shadow-md hover:bg-red-700">Guardar Cambios</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default HeadingForm;