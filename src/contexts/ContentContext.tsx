import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { DEFAULT_CONTENT } from '../data/defaultContent';
import {
  fetchRemoteContent,
  getStoredContent,
  getStoredSettings,
  normalizeContent,
  saveRemoteContent,
  storeContent,
  storeSettings,
} from '../services/contentService';
import type { ContentState, ContentSyncSettings, SiteContent } from '../types';

const ContentContext = createContext<ContentState | null>(null);

export function ContentProvider({ children }: { children: ReactNode }) {
  const [content, setContentState] = useState<SiteContent>(DEFAULT_CONTENT);
  const [settings, setSettings] = useState<ContentSyncSettings>({ apiUrl: '', adminToken: '' });
  const [source, setSource] = useState<ContentState['source']>('default');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const setContent = useCallback((nextContent: SiteContent) => {
    setContentState(normalizeContent(nextContent));
  }, []);

  const updateContent = useCallback((updater: (content: SiteContent) => SiteContent) => {
    setContentState((currentContent) => normalizeContent(updater(currentContent)));
  }, []);

  const loadContent = useCallback(async () => {
    setIsLoading(true);
    setError('');

    const storedSettings = getStoredSettings();
    setSettings(storedSettings);

    try {
      const remoteContent = await fetchRemoteContent(storedSettings.apiUrl);

      if (remoteContent) {
        setContentState(remoteContent);
        storeContent(remoteContent);
        setSource('remote');
        return;
      }
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : 'טעינת התוכן נכשלה');
    } finally {
      setIsLoading(false);
    }

    const storedContent = getStoredContent();

    if (storedContent) {
      setContentState(storedContent);
      setSource('local');
      return;
    }

    setContentState(DEFAULT_CONTENT);
    setSource('default');
  }, []);

  const saveContent = useCallback(async (nextContent: SiteContent) => {
    const normalizedContent = normalizeContent(nextContent);
    setContentState(normalizedContent);
    storeContent(normalizedContent);
    await saveRemoteContent(settings, normalizedContent);
    setSource(settings.apiUrl.trim() ? 'remote' : 'local');
  }, [settings]);

  const saveSettings = useCallback((nextSettings: ContentSyncSettings) => {
    const cleanSettings = {
      apiUrl: nextSettings.apiUrl.trim(),
      adminToken: nextSettings.adminToken.trim(),
    };

    setSettings(cleanSettings);
    storeSettings(cleanSettings);
  }, []);

  useEffect(() => {
    void loadContent();
  }, [loadContent]);

  const value = useMemo<ContentState>(() => ({
    content,
    isLoading,
    error,
    source,
    settings,
    setContent,
    updateContent,
    saveContent,
    saveSettings,
    reloadContent: loadContent,
  }), [content, error, isLoading, loadContent, saveContent, saveSettings, setContent, settings, source, updateContent]);

  return (
    <ContentContext.Provider value={value}>
      {children}
    </ContentContext.Provider>
  );
}

export function useContent() {
  const context = useContext(ContentContext);

  if (!context) {
    throw new Error('useContent must be used inside ContentProvider');
  }

  return context;
}
