import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { Language } from '../types';
import { getDirection, normalizeLanguage, TRANSLATIONS } from './translations';

const PRIMARY_STORAGE_KEY = 'preferred_lang';
const SECONDARY_STORAGE_KEY = 'shaku_maku_language';

type LanguageContextValue = {
  language: Language;
  currentLang: Language;
  setLanguage: (language: Language) => void;
  hasSavedLanguage: boolean;
  t: Record<keyof typeof TRANSLATIONS.en, string>;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

function readSavedLanguage(): { language: Language; hasSavedLanguage: boolean } {
  const primary = normalizeLanguage(localStorage.getItem(PRIMARY_STORAGE_KEY));
  const rawPrimary = localStorage.getItem(PRIMARY_STORAGE_KEY);
  if (rawPrimary === 'ar' || rawPrimary === 'ku' || rawPrimary === 'en') {
    return { language: primary, hasSavedLanguage: true };
  }

  const secondary = normalizeLanguage(localStorage.getItem(SECONDARY_STORAGE_KEY));
  const rawSecondary = localStorage.getItem(SECONDARY_STORAGE_KEY);
  if (rawSecondary === 'ar' || rawSecondary === 'ku' || rawSecondary === 'en') {
    return { language: secondary, hasSavedLanguage: true };
  }

  return { language: 'ar', hasSavedLanguage: false };
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const initial = readSavedLanguage();
  const [language, setLanguageState] = useState<Language>(initial.language);
  const [hasSavedLanguage, setHasSavedLanguage] = useState(initial.hasSavedLanguage);

  const setLanguage = useCallback((nextLanguage: Language) => {
    setLanguageState(nextLanguage);
    setHasSavedLanguage(true);
    localStorage.setItem(PRIMARY_STORAGE_KEY, nextLanguage);
    localStorage.setItem(SECONDARY_STORAGE_KEY, nextLanguage);
    window.dispatchEvent(new Event('languagechange'));
  }, []);

  useEffect(() => {
    const dir = getDirection(language);
    document.documentElement.lang = language;
    document.documentElement.dir = dir;
    document.documentElement.dataset.language = language;
  }, [language]);

  const value = useMemo<LanguageContextValue>(() => ({
    language,
    currentLang: language,
    setLanguage,
    hasSavedLanguage,
    t: TRANSLATIONS[language] || TRANSLATIONS.ar
  }), [hasSavedLanguage, language, setLanguage]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}
