import type { Language } from '../types';
import { getCategoryName, getGovernorateName, TRANSLATIONS } from './translations';

const valueLabels: Record<string, Record<Language, string>> = {
  open: { ar: 'مفتوح', ku: 'کراوەیە', en: 'Open' },
  closed: { ar: 'مغلق', ku: 'داخراوە', en: 'Closed' },
  verified: { ar: 'موثق', ku: 'سەلمێنراو', en: 'Verified' },
  unverified: { ar: 'غير موثق', ku: 'نەسەلمێنراو', en: 'Unverified' },
  restaurant: { ar: 'مطاعم', ku: 'چێشتخانەکان', en: 'Restaurants' },
  clinic: { ar: 'عيادات طبية', ku: 'کلینیکەکان', en: 'Clinics' },
  salon: { ar: 'صالونات ومراكز تجميل', ku: 'ساڵۆنی جوانکاری', en: 'Beauty Salons' },
  grocery: { ar: 'بقالة', ku: 'خۆراکفرۆشی', en: 'Grocery' }
};

export function displayValue(value: unknown, language: Language): string {
  const key = String(value || '').trim();
  if (!key) return '';

  const lowerKey = key.toLowerCase();
  const translated = valueLabels[lowerKey]?.[language];
  if (translated) return translated;

  const category = getCategoryName(key, language);
  if (category && category !== key) return category;

  const governorate = getGovernorateName(key, language);
  if (governorate && governorate !== key) return governorate;

  return key;
}

export function translate(language: Language, key: keyof typeof TRANSLATIONS.en): string {
  return TRANSLATIONS[language]?.[key] || TRANSLATIONS.ar[key] || TRANSLATIONS.en[key] || String(key);
}
