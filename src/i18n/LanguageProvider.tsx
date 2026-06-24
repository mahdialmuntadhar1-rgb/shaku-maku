import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { Language } from '../types';
import { displayValue, languageDirections, translations } from './translations';

const STORAGE_KEY = 'preferred_lang';

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (typeof translations)[Language];
  dir: 'ltr' | 'rtl';
  displayValue: (value: unknown) => string;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

function readStoredLanguage(): Language {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored === 'ar' || stored === 'ku' || stored === 'en' ? stored : 'ar';
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>(readStoredLanguage);
  const dir = languageDirections[language];

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, language);
    document.documentElement.lang = language;
    document.documentElement.dir = dir;
  }, [dir, language]);

  const setLanguage = useCallback((nextLanguage: Language) => {
    setLanguageState(nextLanguage);
  }, []);

  const value = useMemo<LanguageContextValue>(() => ({
    language,
    setLanguage,
    t: translations[language],
    dir,
    displayValue: (valueToDisplay: unknown) => displayValue(valueToDisplay, language),
  }), [dir, language, setLanguage]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used inside LanguageProvider');
  }
  return context;
}
