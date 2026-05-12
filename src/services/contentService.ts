import { DEFAULT_CONTENT } from '../data/defaultContent';
import { doc, getDoc, getFirestore, setDoc, serverTimestamp } from 'firebase/firestore';
import { getFirebaseApp } from './firebaseAuth';
import type { SiteContent } from '../types';

const CONTENT_STORAGE_KEY = 'asher_site_content_v1';
const CONTENT_VERSION_KEY = 'asher_site_content_version';
const CONTENT_VERSION = '2026-05-12-brand-content';
const CONTENT_COLLECTION = 'siteContent';
const CONTENT_DOCUMENT = 'main';

const isRecord = (value: unknown): value is Record<string, unknown> => {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
};

const mergeDeep = <T extends Record<string, unknown>>(base: T, incoming: unknown): T => {
  if (!isRecord(incoming)) {
    return base;
  }

  return Object.entries(base).reduce((merged, [key, value]) => {
    const incomingValue = incoming[key];

    if (Array.isArray(value)) {
      return { ...merged, [key]: Array.isArray(incomingValue) ? incomingValue : value };
    }

    if (isRecord(value)) {
      return { ...merged, [key]: mergeDeep(value, incomingValue) };
    }

    return {
      ...merged,
      [key]: typeof incomingValue === typeof value ? incomingValue : value,
    };
  }, {} as T);
};

export const normalizeContent = (content: unknown): SiteContent => {
  return mergeDeep(DEFAULT_CONTENT as unknown as Record<string, unknown>, content) as unknown as SiteContent;
};

const readJson = <T>(key: string, fallback: T): T => {
  try {
    const rawValue = window.localStorage.getItem(key);
    return rawValue ? JSON.parse(rawValue) as T : fallback;
  } catch {
    return fallback;
  }
};

export const getStoredContent = (): SiteContent | null => {
  if (window.localStorage.getItem(CONTENT_VERSION_KEY) !== CONTENT_VERSION) {
    window.localStorage.removeItem(CONTENT_STORAGE_KEY);
    window.localStorage.setItem(CONTENT_VERSION_KEY, CONTENT_VERSION);
    return null;
  }

  const storedContent = readJson<unknown | null>(CONTENT_STORAGE_KEY, null);
  return storedContent ? normalizeContent(storedContent) : null;
};

export const storeContent = (content: SiteContent): void => {
  window.localStorage.setItem(CONTENT_VERSION_KEY, CONTENT_VERSION);
  window.localStorage.setItem(CONTENT_STORAGE_KEY, JSON.stringify(normalizeContent(content)));
};

export const fetchRemoteContent = async (): Promise<SiteContent | null> => {
  const firebaseApp = getFirebaseApp();

  if (!firebaseApp) {
    return null;
  }

  const database = getFirestore(firebaseApp);
  const snapshot = await getDoc(doc(database, CONTENT_COLLECTION, CONTENT_DOCUMENT));

  if (!snapshot.exists()) {
    return null;
  }

  const data = snapshot.data();
  return normalizeContent(data.content ?? data);
};

export const saveRemoteContent = async (content: SiteContent): Promise<boolean> => {
  const firebaseApp = getFirebaseApp();

  if (!firebaseApp) {
    return false;
  }

  const database = getFirestore(firebaseApp);
  await setDoc(doc(database, CONTENT_COLLECTION, CONTENT_DOCUMENT), {
    content: normalizeContent(content),
    updatedAt: serverTimestamp(),
  }, { merge: true });

  return true;
};

export const isRemoteContentConfigured = (): boolean => {
  return Boolean(getFirebaseApp());
};
