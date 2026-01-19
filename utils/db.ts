
import type { User, NewsArticle, PressRelease } from '../types';
import { newsArticles as initialNewsArticles, pressReleases as initialPressReleases } from '../data/mockData';

const DB_USERS_KEY = 'cipress_db_users';
const DB_NAME = 'CipressDB';
const DB_VERSION = 2; // Version 2 to ensure both stores are created
const STORE_NEWS = 'news';
const STORE_PRESS_RELEASES = 'press_releases';

// --- LocalStorage for Users (Legacy) ---

// Initialize the "table" for users and IndexedDB
export const initDatabase = () => {
  if (!localStorage.getItem(DB_USERS_KEY)) {
    localStorage.setItem(DB_USERS_KEY, JSON.stringify([]));
    console.log('Database: Tabla "usuario" creada (localStorage).');
  }
  // Init IndexedDB
  initIndexedDB();
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

// --- IndexedDB Logic ---

let db: IDBDatabase | null = null;

const initIndexedDB = () => {
  const request = indexedDB.open(DB_NAME, DB_VERSION);

  request.onerror = (event) => {
    console.error("IndexedDB error:", event);
  };

  request.onupgradeneeded = (event) => {
    const db = (event.target as IDBOpenDBRequest).result;

    // Create News Store
    if (!db.objectStoreNames.contains(STORE_NEWS)) {
      const newsStore = db.createObjectStore(STORE_NEWS, { keyPath: 'id' });
      // Seed data
      initialNewsArticles.forEach(article => {
        newsStore.add(article);
      });
      console.log('IndexedDB: Object store "news" created and seeded.');
    }

    // Create Press Releases Store
    if (!db.objectStoreNames.contains(STORE_PRESS_RELEASES)) {
      const prStore = db.createObjectStore(STORE_PRESS_RELEASES, { keyPath: 'id' });
      // Seed data
      initialPressReleases.forEach(pr => {
        prStore.add(pr);
      });
      console.log('IndexedDB: Object store "press_releases" created and seeded.');
    }
  };

  request.onsuccess = (event) => {
    db = (event.target as IDBOpenDBRequest).result;
    console.log("IndexedDB: Database opened successfully.");
  };
};

const getDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    if (db) {
      resolve(db);
      return;
    }
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onsuccess = (event) => {
      db = (event.target as IDBOpenDBRequest).result;
      resolve(db);
    };
    request.onerror = (event) => {
      reject((event.target as IDBOpenDBRequest).error);
    };
  });
};

// --- CRUD News ---

export const getAllNews = async (): Promise<NewsArticle[]> => {
  const db = await getDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NEWS], 'readonly');
    const store = transaction.objectStore(STORE_NEWS);
    const request = store.getAll();
    request.onsuccess = () => resolve(request.result as NewsArticle[]);
    request.onerror = () => reject(request.error);
  });
};

export const addNews = async (article: NewsArticle): Promise<void> => {
  const db = await getDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NEWS], 'readwrite');
    const store = transaction.objectStore(STORE_NEWS);
    const request = store.add(article);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
};

export const updateNews = async (article: NewsArticle): Promise<void> => {
  const db = await getDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NEWS], 'readwrite');
    const store = transaction.objectStore(STORE_NEWS);
    const request = store.put(article);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
};

export const deleteNews = async (id: number): Promise<void> => {
  const db = await getDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NEWS], 'readwrite');
    const store = transaction.objectStore(STORE_NEWS);
    const request = store.delete(id);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
};

// --- CRUD Press Releases ---

export const getAllPressReleases = async (): Promise<PressRelease[]> => {
  const db = await getDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_PRESS_RELEASES], 'readonly');
    const store = transaction.objectStore(STORE_PRESS_RELEASES);
    const request = store.getAll();
    request.onsuccess = () => resolve(request.result as PressRelease[]);
    request.onerror = () => reject(request.error);
  });
};

export const addPressRelease = async (pr: PressRelease): Promise<void> => {
  const db = await getDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_PRESS_RELEASES], 'readwrite');
    const store = transaction.objectStore(STORE_PRESS_RELEASES);
    const request = store.add(pr);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
};

export const updatePressRelease = async (pr: PressRelease): Promise<void> => {
  const db = await getDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_PRESS_RELEASES], 'readwrite');
    const store = transaction.objectStore(STORE_PRESS_RELEASES);
    const request = store.put(pr);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
};

export const deletePressRelease = async (id: number): Promise<void> => {
  const db = await getDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_PRESS_RELEASES], 'readwrite');
    const store = transaction.objectStore(STORE_PRESS_RELEASES);
    const request = store.delete(id);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
};