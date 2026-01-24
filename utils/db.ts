
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
// Insert a user (Calls Backend API)
export const insertUser = async (user: Omit<User, 'id' | 'createdAt'>): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await fetch('http://localhost:8080/api/users/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API Error:', error);
    return { success: false, message: 'Error de conexión con el servidor.' };
  }
};

// Get all users (for debugging or admin)
export const getAllUsers = (): User[] => {
  return JSON.parse(localStorage.getItem(DB_USERS_KEY) || '[]');
};