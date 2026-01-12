
import type { User } from '../types';

const DB_USERS_KEY = 'cipress_db_users';

// Initialize the "table"
export const initDatabase = () => {
  if (!localStorage.getItem(DB_USERS_KEY)) {
    localStorage.setItem(DB_USERS_KEY, JSON.stringify([]));
    console.log('Database: Tabla "usuario" creada.');
  }
};

// Insert a user
export const insertUser = (user: Omit<User, 'id'>): { success: boolean; message: string } => {
  try {
    const users: User[] = JSON.parse(localStorage.getItem(DB_USERS_KEY) || '[]');
    
    // Check for duplicate email
    if (users.some(u => u.email === user.email)) {
        return { success: false, message: 'El correo electrónico ya está registrado.' };
    }

    const newUser: User = {
      ...user,
      id: Date.now(), // Simple ID generation
    };

    users.push(newUser);
    localStorage.setItem(DB_USERS_KEY, JSON.stringify(users));
    console.log('Database: Usuario insertado con éxito', newUser);
    return { success: true, message: 'Usuario registrado exitosamente.' };
  } catch (error) {
    console.error('Database Error:', error);
    return { success: false, message: 'Error al guardar en la base de datos.' };
  }
};

// Get all users (for debugging or admin)
export const getAllUsers = (): User[] => {
    return JSON.parse(localStorage.getItem(DB_USERS_KEY) || '[]');
};