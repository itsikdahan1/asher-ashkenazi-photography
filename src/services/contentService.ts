import { DEFAULT_CONTENT } from '../data/defaultContent';
import type { ContentSyncSettings, SiteContent } from '../types';

const CONTENT_STORAGE_KEY = 'asher_site_content_v1';
const SETTINGS_STORAGE_KEY = 'asher_content_settings_v1';

const initialSettings: ContentSyncSettings = {
  apiUrl: import.meta.env.VITE_CONTENT_API_URL ?? '',
  adminToken: '',
};

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

export const getStoredSettings = (): ContentSyncSettings => {
  const storedSettings = readJson<ContentSyncSettings>(SETTINGS_STORAGE_KEY, initialSettings);
  return {
    apiUrl: storedSettings.apiUrl || initialSettings.apiUrl,
    adminToken: storedSettings.adminToken || '',
  };
};

export const storeSettings = (settings: ContentSyncSettings): void => {
  window.localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
};

export const getStoredContent = (): SiteContent | null => {
  const storedContent = readJson<unknown | null>(CONTENT_STORAGE_KEY, null);
  return storedContent ? normalizeContent(storedContent) : null;
};

export const storeContent = (content: SiteContent): void => {
  window.localStorage.setItem(CONTENT_STORAGE_KEY, JSON.stringify(normalizeContent(content)));
};

export const fetchRemoteContent = async (apiUrl: string): Promise<SiteContent | null> => {
  if (!apiUrl.trim()) {
    return null;
  }

  const response = await fetch(apiUrl, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('לא ניתן לטעון תוכן מגוגל כרגע');
  }

  const data = await response.json();
  return normalizeContent(data.content ?? data);
};

export const saveRemoteContent = async (settings: ContentSyncSettings, content: SiteContent): Promise<void> => {
  if (!settings.apiUrl.trim()) {
    return;
  }

  if (!settings.adminToken.trim()) {
    throw new Error('כדי לשמור לגוגל צריך להזין טוקן מנהל');
  }

  const response = await fetch(settings.apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'text/plain;charset=utf-8',
    },
    body: JSON.stringify({
      token: settings.adminToken,
      content: normalizeContent(content),
    }),
  });

  if (!response.ok) {
    throw new Error('השמירה לגוגל נכשלה');
  }

  const data = await response.json().catch(() => ({ ok: true }));

  if (data.ok === false) {
    throw new Error(data.error || 'השמירה לגוגל נכשלה');
  }
};
