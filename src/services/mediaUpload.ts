import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { getFirebaseApp } from './firebaseAuth';

const MAX_IMAGE_SIZE_BYTES = 10 * 1024 * 1024;

const safeFileName = (fileName: string) => {
  const extension = fileName.split('.').pop()?.toLowerCase() || 'jpg';
  return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}.${extension}`;
};

export const uploadSiteImage = async (file: File, folder: string): Promise<string> => {
  if (!file.type.startsWith('image/')) {
    throw new Error('אפשר להעלות רק קובצי תמונה');
  }

  if (file.size > MAX_IMAGE_SIZE_BYTES) {
    throw new Error('התמונה גדולה מדי. המקסימום הוא 10MB');
  }

  const firebaseApp = getFirebaseApp();

  if (!firebaseApp) {
    throw new Error('Firebase לא מוגדר. לא ניתן להעלות קבצים.');
  }

  const storage = getStorage(firebaseApp);
  const imageRef = ref(storage, `site-media/${folder}/${safeFileName(file.name)}`);
  await uploadBytes(imageRef, file, { contentType: file.type });
  return getDownloadURL(imageRef);
};
