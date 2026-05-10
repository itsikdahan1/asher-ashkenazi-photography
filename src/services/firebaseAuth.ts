import { initializeApp, type FirebaseApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, type User } from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

export const allowedAdminEmails = ['asher7676@gmail.com', 'itsikdahan1@gmail.com'];

export const isFirebaseConfigured = Object.values(firebaseConfig).every((value) => Boolean(value?.trim()));

let app: FirebaseApp | null = null;

export const getFirebaseAuth = () => {
  if (!isFirebaseConfigured) {
    return null;
  }

  app ??= initializeApp(firebaseConfig);
  return getAuth(app);
};

export const isAllowedAdminEmail = (email: string | null | undefined) => {
  return Boolean(email && allowedAdminEmails.includes(email.trim().toLowerCase()));
};

export const signInWithGoogle = async (): Promise<User> => {
  const auth = getFirebaseAuth();

  if (!auth) {
    throw new Error('Firebase לא מוגדר. יש להגדיר את משתני הסביבה של Firebase ב-Vercel.');
  }

  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });

  const result = await signInWithPopup(auth, provider);

  if (!isAllowedAdminEmail(result.user.email)) {
    await signOut(auth);
    throw new Error('כתובת המייל הזו אינה מורשית לניהול האתר.');
  }

  return result.user;
};

export const signOutAdmin = async () => {
  const auth = getFirebaseAuth();

  if (auth) {
    await signOut(auth);
  }
};
