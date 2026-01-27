import React, { useState, useEffect } from 'react';
import type { ShortCollaboration } from '../../types';

interface ShortCollaborationFormProps {
    collaboration: ShortCollaboration | null;
    onSave: (collaboration: ShortCollaboration | Omit<ShortCollaboration, 'id'>) => void;
    onClose: () => void;
}

// FIX: Add missing 'whatsappContact' property to resolve compilation error.
const initialCollaborationState: Omit<ShortCollaboration, 'id'> = {
    title: '',
    deadline: '',
    budget: '',
    author: '',
    authorAvatarUrl: 'https://i.pravatar.cc/40',
    whatsappContact: '',
};

const ShortCollaborationForm: React.FC<ShortCollaborationFormProps> = ({ collaboration, onSave, onClose }) => {
    const [formData, setFormData] = useState(initialCollaborationState);

    useEffect(() => {
        if (collaboration) {
            setFormData(collaboration);
        } else {
            setFormData(initialCollaborationState);
        }
    }, [collaboration]);

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
            <div className="bg-white rounded-lg shadow-2xl p-6 w-full max-w-lg max-h-full overflow-y-auto">
                <h2 className="text-2xl font-bold mb-4">{collaboration ? 'Editar Colaboración' : 'Añadir Colaboración'}</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Título</label>
                        <input type="text" name="title" value={formData.title} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3" required />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Plazo</label>
                            <input type="text" name="deadline" value={formData.deadline} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3" required />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Presupuesto</label>
                            <input type="text" name="budget" value={formData.budget} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3" required />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Autor</label>
                        <input type="text" name="author" value={formData.author} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3" required />
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-gray-700">URL de Avatar del Autor</label>
                        <input type="text" name="authorAvatarUrl" value={formData.authorAvatarUrl} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3" />
                    </div>
                    {/* FIX: Add input field for 'whatsappContact'. */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Contacto de WhatsApp (sin +)</label>
                        <input type="text" name="whatsappContact" value={formData.whatsappContact} onChange={handleChange} placeholder="Ej: 56912345678" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3" required />
                    </div>
                    <div className="flex justify-end space-x-4 pt-4">
                        <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300">Cancelar</button>
                        <button type="submit" className="px-4 py-2 bg-primary text-white font-semibold rounded-lg shadow-md hover:bg-red-700">Guardar</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ShortCollaborationForm;