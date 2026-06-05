import { Language } from '../types';

export type GovernorateId =
  | 'baghdad'
  | 'basra'
  | 'nineveh'
  | 'erbil'
  | 'sulaymaniyah'
  | 'duhok'
  | 'kirkuk'
  | 'najaf'
  | 'karbala'
  | 'babil'
  | 'anbar'
  | 'diyala'
  | 'wasit'
  | 'salah_ad_din'
  | 'maysan'
  | 'dhi_qar'
  | 'muthanna'
  | 'qadisiyyah';

export type CategoryId =
  | 'restaurant'
  | 'cafe'
  | 'doctor'
  | 'clinic'
  | 'pharmacy'
  | 'shopping'
  | 'clothing'
  | 'cars'
  | 'hotel'
  | 'beauty'
  | 'education'
  | 'real_estate'
  | 'services'
  | 'electronics'
  | 'gym'
  | 'entertainment';

export const IRAQ_GOVERNORATES: Array<{
  id: GovernorateId;
  en: string;
  ar: string;
  ku: string;
  aliases: string[];
}> = [
  { id: 'baghdad', en: 'Baghdad', ar: 'بغداد', ku: 'بەغدا', aliases: ['baghdad', 'بغداد'] },
  { id: 'basra', en: 'Basra', ar: 'البصرة', ku: 'بەسرە', aliases: ['basra', 'البصرة', 'بصرة', 'basrah'] },
  { id: 'nineveh', en: 'Nineveh / Mosul', ar: 'نينوى / الموصل', ku: 'نەینەوا / مووسڵ', aliases: ['nineveh', 'ninewa', 'ninawa', 'nainawa', 'mosul', 'mousl', 'mousul', 'نينوى', 'نينوي', 'الموصل', 'موصل'] },
  { id: 'erbil', en: 'Erbil', ar: 'أربيل', ku: 'هەولێر', aliases: ['erbil', 'arbil', 'hawler', 'hewler', 'اربيل', 'أربيل', 'هەولێر'] },
  { id: 'sulaymaniyah', en: 'Sulaymaniyah', ar: 'السليمانية', ku: 'سلێمانی', aliases: ['sulaymaniyah', 'sulaimani', 'sulaymaniya', 'suleimani', 'slemani', 'السليمانية', 'سليمانية', 'سلێمانی'] },
  { id: 'duhok', en: 'Duhok', ar: 'دهوك', ku: 'دهۆك', aliases: ['duhok', 'dohuk', 'دهوك', 'دهۆك'] },
  { id: 'kirkuk', en: 'Kirkuk', ar: 'كركوك', ku: 'کەرکووک', aliases: ['kirkuk', 'كركوك', 'کرکوک', 'کەرکووک'] },
  { id: 'najaf', en: 'Najaf', ar: 'النجف', ku: 'نەجەف', aliases: ['najaf', 'النجف', 'نجف'] },
  { id: 'karbala', en: 'Karbala', ar: 'كربلاء', ku: 'کەربەلا', aliases: ['karbala', 'kerbala', 'كربلاء', 'کربلا'] },
  { id: 'babil', en: 'Babil / Hillah', ar: 'بابل / الحلة', ku: 'بابیل', aliases: ['babil', 'babylon', 'hillah', 'hilla', 'بابل', 'الحلة', 'حلة'] },
  { id: 'anbar', en: 'Anbar', ar: 'الأنبار', ku: 'ئەنبار', aliases: ['anbar', 'الانبار', 'الأنبار', 'رمادي', 'ramadi'] },
  { id: 'diyala', en: 'Diyala', ar: 'ديالى', ku: 'دیالە', aliases: ['diyala', 'ديالى', 'بعقوبة', 'baquba'] },
  { id: 'wasit', en: 'Wasit', ar: 'واسط', ku: 'واسیت', aliases: ['wasit', 'واسط', 'الكوت', 'kut'] },
  { id: 'salah_ad_din', en: 'Salah ad-Din / Tikrit', ar: 'صلاح الدين / تكريت', ku: 'سەلاحەدین', aliases: ['salah_ad_din', 'salahaddin', 'salah al din', 'salah ad din', 'صلاح الدين', 'تكريت', 'tikrit'] },
  { id: 'maysan', en: 'Maysan', ar: 'ميسان', ku: 'مەیسان', aliases: ['maysan', 'ميسان', 'العمارة', 'amara'] },
  { id: 'dhi_qar', en: 'Dhi Qar / Nasiriyah', ar: 'ذي قار / الناصرية', ku: 'زیقار', aliases: ['dhi_qar', 'dhiqar', 'ذي قار', 'ذى قار', 'الناصرية', 'nasiriyah', 'nasiriya'] },
  { id: 'muthanna', en: 'Muthanna', ar: 'المثنى', ku: 'موثەننا', aliases: ['muthanna', 'المثنى', 'السماوة', 'samawah'] },
  { id: 'qadisiyyah', en: 'Qadisiyyah / Diwaniyah', ar: 'القادسية / الديوانية', ku: 'قادسیە', aliases: ['qadisiyyah', 'qadisiyah', 'diwaniyah', 'القادسية', 'الديوانية', 'diwaniya'] }
];

export const APP_CATEGORIES: Array<{
  id: CategoryId;
  en: string;
  ar: string;
  ku: string;
  aliases: string[];
}> = [
  { id: 'restaurant', en: 'Restaurants', ar: 'مطاعم', ku: 'چێشتخانە', aliases: ['restaurant', 'restaurants', 'food', 'مطعم', 'مطاعم', 'اكل', 'أكل'] },
  { id: 'cafe', en: 'Cafes', ar: 'كافيهات', ku: 'کافێ', aliases: ['cafe', 'cafes', 'coffee', 'كوفي', 'كافيه', 'كافيهات', 'مقهى'] },
  { id: 'doctor', en: 'Doctors', ar: 'أطباء', ku: 'پزیشک', aliases: ['doctor', 'doctors', 'طبيب', 'اطباء', 'أطباء', 'دكتور'] },
  { id: 'clinic', en: 'Clinics', ar: 'عيادات', ku: 'کلینیک', aliases: ['clinic', 'clinics', 'عيادة', 'عيادات', 'medical'] },
  { id: 'pharmacy', en: 'Pharmacies', ar: 'صيدليات', ku: 'دەرمانخانە', aliases: ['pharmacy', 'pharmacies', 'صيدلية', 'صيدليات'] },
  { id: 'shopping', en: 'Shopping', ar: 'تسوق', ku: 'بازاڕکردن', aliases: ['shopping', 'shop', 'market', 'mall', 'تسوق', 'سوق', 'مول'] },
  { id: 'clothing', en: 'Clothing', ar: 'ملابس', ku: 'جلوبەرگ', aliases: ['clothing', 'fashion', 'ملابس', 'ازياء', 'أزياء'] },
  { id: 'cars', en: 'Cars', ar: 'سيارات', ku: 'ئۆتۆمبێل', aliases: ['cars', 'car', 'auto', 'automotive', 'سيارات', 'سيارة'] },
  { id: 'hotel', en: 'Hotels', ar: 'فنادق', ku: 'هوتێل', aliases: ['hotel', 'hotels', 'فنادق', 'فندق'] },
  { id: 'beauty', en: 'Beauty', ar: 'تجميل', ku: 'جوانکاری', aliases: ['beauty', 'salon', 'spa', 'تجميل', 'صالون'] },
  { id: 'education', en: 'Education', ar: 'تعليم', ku: 'پەروەردە', aliases: ['education', 'school', 'academy', 'تعليم', 'مدرسة', 'معهد'] },
  { id: 'real_estate', en: 'Real estate', ar: 'عقارات', ku: 'خانووبەرە', aliases: ['real_estate', 'real estate', 'property', 'عقار', 'عقارات'] },
  { id: 'services', en: 'Services', ar: 'خدمات', ku: 'خزمەتگوزاری', aliases: ['services', 'service', 'خدمات', 'خدمة'] },
  { id: 'electronics', en: 'Electronics', ar: 'إلكترونيات', ku: 'ئەلیکترۆنیات', aliases: ['electronics', 'mobile', 'phone', 'computer', 'الكترونيات', 'إلكترونيات', 'موبايل'] },
  { id: 'gym', en: 'Gyms', ar: 'نوادي رياضية', ku: 'یانەی وەرزشی', aliases: ['gym', 'fitness', 'sport', 'sports', 'نادي', 'نوادي', 'رياضة'] },
  { id: 'entertainment', en: 'Entertainment', ar: 'ترفيه', ku: 'کات بەسەربردن', aliases: ['entertainment', 'fun', 'cinema', 'ترفيه', 'سينما'] }
];

function clean(value: unknown): string {
  return String(value || '')
    .toLowerCase()
    .trim()
    .replace(/[أإآ]/g, 'ا')
    .replace(/ة/g, 'ه')
    .replace(/ى/g, 'ي')
    .replace(/[_\-]+/g, ' ')
    .replace(/[\s،,./()\[\]{}]+/g, ' ')
    .trim();
}

function compact(value: unknown): string {
  return clean(value).replace(/\s+/g, '');
}

export function normalizeGovernorate(value: unknown): GovernorateId {
  const raw = clean(value);
  const rawCompact = compact(value);

  for (const gov of IRAQ_GOVERNORATES) {
    if (clean(gov.id) === raw || compact(gov.id) === rawCompact) return gov.id;
    if (clean(gov.en) === raw || clean(gov.ar) === raw || clean(gov.ku) === raw) return gov.id;
    if (gov.aliases.some((alias) => clean(alias) === raw || compact(alias) === rawCompact)) return gov.id;
  }

  return rawCompact === 'all' ? ('all' as GovernorateId) : (String(value || '').trim() as GovernorateId);
}

export function normalizeCategory(value: unknown): CategoryId {
  const raw = clean(value);
  const rawCompact = compact(value);

  for (const category of APP_CATEGORIES) {
    if (clean(category.id) === raw || compact(category.id) === rawCompact) return category.id;
    if (clean(category.en) === raw || clean(category.ar) === raw || clean(category.ku) === raw) return category.id;
    if (category.aliases.some((alias) => clean(alias) === raw || compact(alias) === rawCompact)) return category.id;
  }

  return String(value || '').trim() as CategoryId;
}

export function getGovernorateLabel(id: unknown, lang: Language): string {
  const normalized = normalizeGovernorate(id);
  const gov = IRAQ_GOVERNORATES.find((item) => item.id === normalized);
  if (!gov) return String(id || '');
  return gov[lang] || gov.en;
}

export function getCategoryLabel(id: unknown, lang: Language): string {
  const normalized = normalizeCategory(id);
  const category = APP_CATEGORIES.find((item) => item.id === normalized);
  if (!category) return String(id || '');
  return category[lang] || category.en;
}
