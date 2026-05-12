import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { DEFAULT_CONTENT } from '../data/defaultContent';
import {
  fetchRemoteContent,
  getStoredContent,
  isRemoteContentConfigured,
  normalizeContent,
  saveRemoteContent,
  storeContent,
} from '../services/contentService';
import type { ContentState, SiteContent } from '../types';

const ContentContext = createContext<ContentState | null>(null);

export function ContentProvider({ children }: { children: ReactNode }) {
  const [content, setContentState] = useState<SiteContent>(DEFAULT_CONTENT);
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

    try {
      const remoteContent = await fetchRemoteContent();

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
    const isSavedRemotely = await saveRemoteContent(normalizedContent);
    setSource(isSavedRemotely ? 'remote' : 'local');
  }, []);

  useEffect(() => {
    void loadContent();
  }, [loadContent]);

  const value = useMemo<ContentState>(() => ({
    content,
    isLoading,
    error,
    source,
    isRemoteConfigured: isRemoteContentConfigured(),
    setContent,
    updateContent,
    saveContent,
    reloadContent: loadContent,
  }), [content, error, isLoading, loadContent, saveContent, setContent, source, updateContent]);

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
