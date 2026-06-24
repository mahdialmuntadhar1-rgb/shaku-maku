import { CATEGORIES, GOVERNORATES, TRANSLATIONS } from '../data';
import { Language } from '../types';

export { TRANSLATIONS as translations };

export const languageDirections: Record<Language, 'ltr' | 'rtl'> = {
  ar: 'rtl',
  ku: 'rtl',
  en: 'ltr',
};

const valueTranslations: Record<string, Partial<Record<Language, string>>> = {
  Baghdad: { ar: 'بغداد', ku: 'بەغدا' },
  Erbil: { ar: 'أربيل', ku: 'هەولێر' },
  Basra: { ar: 'البصرة', ku: 'بەسرە' },
  Sulaymaniyah: { ar: 'السليمانية', ku: 'سلێمانی' },
  male: { ar: 'ذكر', ku: 'نێر' },
  female: { ar: 'أنثى', ku: 'مێ' },
  user: { ar: 'مستخدم', ku: 'بەکارهێنەر' },
  owner: { ar: 'صاحب مصلحة', ku: 'خاوەنی کار' },
  admin: { ar: 'مدير المنصة', ku: 'بەڕێوەبەر' },
};

export function displayValue(value: unknown, language: Language): string {
  const raw = String(value ?? '').trim();
  if (!raw) return '';

  const governorate = GOVERNORATES.find((item) => item.code === raw || item.englishLabel === raw);
  if (governorate) return governorate.name[language] || governorate.englishLabel;

  const category = CATEGORIES.find((item) => item.id === raw || item.name.en === raw);
  if (category) return category.name[language] || category.name.en;

  return valueTranslations[raw]?.[language] || raw;
}
