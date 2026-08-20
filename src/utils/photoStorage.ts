// Photo storage helper for user's real uploaded photos (persists in localStorage)

export interface UserPhoto {
  id: string;
  title: string;
  subtitle: string;
  src: string;
  badge: string;
  isCustom?: boolean;
}

const STORAGE_KEY = 'ssjs_custom_photos_v1';

export const loadStoredPhotos = (defaultPhotos: UserPhoto[]): UserPhoto[] => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.error('Error loading stored photos:', err);
  }
  return defaultPhotos;
};

export const saveStoredPhotos = (photos: UserPhoto[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(photos));
  } catch (err) {
    console.error('Error saving photos to storage:', err);
  }
};

export const readFileAsDataUrl = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};
