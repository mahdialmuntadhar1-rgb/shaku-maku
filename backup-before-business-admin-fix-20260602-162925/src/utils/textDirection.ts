import type { Language } from '../types';

const RTL_TEXT_RE = /[\u0591-\u07FF\uFB1D-\uFDFD\uFE70-\uFEFC]/;

export const isRtlLanguage = (language: Language) => language === 'ar' || language === 'ku';

export const languageToDir = (language: Language): 'rtl' | 'ltr' =>
  isRtlLanguage(language) ? 'rtl' : 'ltr';

export const languageToTag = (language: Language) =>
  language === 'ku' ? 'ku' : language;

export const detectTextDirection = (value: string): 'rtl' | 'ltr' =>
  RTL_TEXT_RE.test(value) ? 'rtl' : 'ltr';

export const bidiProps = (value: string, fallbackLanguage: Language) => ({
  dir: value ? detectTextDirection(value) : languageToDir(fallbackLanguage),
  lang: value && detectTextDirection(value) === 'rtl' ? languageToTag(fallbackLanguage) : 'en'
});
