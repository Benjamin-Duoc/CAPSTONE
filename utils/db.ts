import type { User } from '../types';
import { supabase } from './supabaseClient';

// Initialize the "table" - No-op for Supabase as table is pre-created
export const initDatabase = () => {
  console.log('Database: Connected to Supabase (users table managed in cloud).');
};

// Insert a user
export const insertUser = async (user: Omit<User, 'id'>): Promise<{ success: boolean; message: string }> => {
  try {
    // Check for duplicate email directly in Supabase? 
    // Although the unique constraint will handle it, it's nice to check or catch the error.
    // Let's rely on the unique constraint error from Supabase for simplicity and speed.

    const { error } = await supabase
      .from('users')
      .insert([
        {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          region: user.region,
          password: user.password
        }
      ]);

    if (error) {
      if (error.code === '23505') { // Postgres unique violation code
        return { success: false, message: 'El correo electrónico ya está registrado.' };
      }
      console.error('Supabase Error:', error);
      return { success: false, message: 'Error al guardar en la base de datos.' };
    }

    console.log('Database: Usuario insertado con éxito en Supabase');
    return { success: true, message: 'Usuario registrado exitosamente.' };
  } catch (error) {
    console.error('Database Error:', error);
    return { success: false, message: 'Error inesperado al guardar usuario.' };
  }
};

// Get all users (for debugging or admin)
export const getAllUsers = async (): Promise<User[]> => {
  const { data, error } = await supabase.from('users').select('*');
  if (error) {
    console.error('Supabase Error:', error);
    return [];
  }
  return data as User[];
};

// Login user
export const loginUser = async (email: string, password: string): Promise<{ success: boolean; message: string; user?: User }> => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (error || !data) {
      // Could be 'PGRST116' if no rows found
      return { success: false, message: 'El correo electrónico no está registrado o hubo un error.' };
    }

    // In a real app, use Supabase Auth or bcrypt. Here we compare plain text as per ERS simulation.
    if (data.password !== password) {
      return { success: false, message: 'La contraseña es incorrecta.' };
    }

    console.log('Database: Inicio de sesión exitoso', data);
    return { success: true, message: 'Inicio de sesión exitoso.', user: data as User };
  } catch (error) {
    console.error('Database Error:', error);
    return { success: false, message: 'Error al iniciar sesión.' };
  }
};
