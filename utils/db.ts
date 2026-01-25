import type { User, PhotojournalismPost, CommunityPost } from '../types';
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

// Photojournalism Functions
export const getPhotoPosts = async (): Promise<PhotojournalismPost[]> => {
  const { data, error } = await supabase
    .from('photojournalism')
    .select('*')
    .order('dateAdded', { ascending: false });

  if (error) {
    console.error('Error fetching photo posts:', error);
    return [];
  }
  return data as PhotojournalismPost[];
};

export const insertPhotoPost = async (post: Omit<PhotojournalismPost, 'id' | 'dateAdded'>): Promise<{ success: boolean; message?: string }> => {
  const { error } = await supabase
    .from('photojournalism')
    .insert([{
      ...post,
      dateAdded: new Date().toISOString()
    }]);

  if (error) {
    console.error('Error inserting photo post:', error);
    return { success: false, message: 'Error al guardar la publicación.' };
  }
  return { success: true };
};

export const updatePhotoPost = async (post: PhotojournalismPost): Promise<{ success: boolean; message?: string }> => {
  const { error } = await supabase
    .from('photojournalism')
    .update({
      title: post.title,
      caption: post.caption,
      imageUrl: post.imageUrl,
      dateTaken: post.dateTaken,
      whatsappContact: post.whatsappContact
    })
    .eq('id', post.id);

  if (error) {
    console.error('Error updating photo post:', error);
    return { success: false, message: 'Error al actualizar la publicación.' };
  }
  return { success: true };
};

export const uploadImage = async (file: File): Promise<{ success: boolean; url?: string; message?: string }> => {
  const fileExt = file.name.split('.').pop();
  const fileName = `${Math.random()}.${fileExt}`;
  const filePath = `${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from('photos')
    .upload(filePath, file);

  if (uploadError) {
    console.error('Error uploading image:', uploadError);
    return { success: false, message: `Error al subir la imagen: ${uploadError.message}` };
  }

  const { data } = supabase.storage.from('photos').getPublicUrl(filePath);
  return { success: true, url: data.publicUrl };
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
// Delete photo post and image
export const deletePhotoPost = async (postId: number, imageUrl?: string): Promise<{ success: boolean; message?: string }> => {
  // 1. Delete record from database
  const { error: dbError } = await supabase
    .from('photojournalism')
    .delete()
    .eq('id', postId);

  if (dbError) {
    console.error('Error deleting photo post:', dbError);
    return { success: false, message: 'Error al eliminar la publicación.' };
  }

  // 2. Delete image from storage if it exists (optional but recommended)
  if (imageUrl) {
    try {
      // Extract file path from URL
      // URL format: .../storage/v1/object/public/photos/filename.ext
      const urlParts = imageUrl.split('/photos/');
      if (urlParts.length > 1) {
        const filePath = urlParts[1];
        const { error: storageError } = await supabase.storage
          .from('photos')
          .remove([filePath]);

        if (storageError) {
          console.warn('Error cleaning up storage:', storageError);
          // We return success true anyway because the post itself is gone
        }
      }
    } catch (e) {
      console.error('Error processing image URL for deletion:', e);
    }
  }

  return { success: true };
};

// Community Posts Functions
export const getCommunityPosts = async (): Promise<CommunityPost[]> => {
  const { data, error } = await supabase
    .from('community_posts')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching community posts:', error);
    return [];
  }

  // Map database fields to match CommunityPost type
  return (data || []).map(post => ({
    id: post.id,
    postTitle: post.post_title,
    postUrl: post.post_url,
    comment: post.comment,
    authorName: post.author_name,
    authorAvatarUrl: post.author_avatar_url || 'https://i.pravatar.cc/40?u=default',
    createdAt: post.created_at
  }));
};

export const insertCommunityPost = async (
  post: Omit<CommunityPost, 'id'> & { createdBy?: string }
): Promise<{ success: boolean; message?: string }> => {
  const { error } = await supabase
    .from('community_posts')
    .insert([{
      post_title: post.postTitle,
      post_url: post.postUrl,
      comment: post.comment,
      author_name: post.authorName,
      author_avatar_url: post.authorAvatarUrl,
      created_by: post.createdBy,
      created_at: new Date().toISOString()
    }]);

  if (error) {
    console.error('Error inserting community post:', error);
    return { success: false, message: 'Error al guardar la publicación.' };
  }
  return { success: true };
};

export const updateCommunityPost = async (
  post: CommunityPost
): Promise<{ success: boolean; message?: string }> => {
  const { error } = await supabase
    .from('community_posts')
    .update({
      post_title: post.postTitle,
      post_url: post.postUrl,
      comment: post.comment,
      author_name: post.authorName,
      author_avatar_url: post.authorAvatarUrl
    })
    .eq('id', post.id);

  if (error) {
    console.error('Error updating community post:', error);
    return { success: false, message: 'Error al actualizar la publicación.' };
  }
  return { success: true };
};

export const deleteCommunityPost = async (
  postId: number
): Promise<{ success: boolean; message?: string }> => {
  const { error } = await supabase
    .from('community_posts')
    .delete()
    .eq('id', postId);

  if (error) {
    console.error('Error deleting community post:', error);
    return { success: false, message: 'Error al eliminar la publicación.' };
  }
  return { success: true };
};

