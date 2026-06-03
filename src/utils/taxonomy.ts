import { Language } from '../types';

export type GovernorateId =
  | 'all'
  | 'baghdad'
  | 'erbil'
  | 'basra'
  | 'sulaymaniyah'
  | 'mosul'
  | 'najaf'
  | 'karbala'
  | 'kirkuk'
  | 'anbar'
  | 'duhok'
  | 'babil'
  | 'diyala'
  | 'wasit'
  | 'saladin'
  | 'maysan'
  | 'dhiqar'
  | 'muthanna'
  | 'qadisiya'
  | 'halabja';

export type CategoryId =
  | 'restaurant'
  | 'cafe_bakery'
  | 'supermarket'
  | 'mall'
  | 'pharmacy'
  | 'hospital'
  | 'clinic'
  | 'doctor'
  | 'dentist'
  | 'salon'
  | 'spa'
  | 'gym'
  | 'hotel'
  | 'travel_agency'
  | 'university'
  | 'bank'
  | 'real_estate'
  | 'lawyer'
  | 'car_dealer'
  | 'car_rental'
  | 'mobile_shop'
  | 'furniture'
  | 'clothing_store'
  | 'software_company'
  | 'marketing_agency'
  | 'construction_company'
  | 'architecture'
  | 'photography'
  | 'cinema'
  | 'gaming_center'
  | 'sports_club'
  | 'pet_shop'
  | 'other';

const GOVERNORATE_ALIASES: Record<GovernorateId, string[]> = {
  all: ['all', 'iraq', 'العراق', 'عێراق'],
  baghdad: ['baghdad', 'bagdad', 'بغداد'],
  erbil: ['erbil', 'arbil', 'hawler', 'hewler', 'اربيل', 'أربيل', 'هەولێر'],
  basra: ['basra', 'basrah', 'البصرة', 'بصرة'],
  sulaymaniyah: ['sulaymaniyah', 'sulaymania', 'sulaimani', 'suleimani', 'slemani', 'السليمانية', 'سليمانية', 'سلێمانی'],
  mosul: ['mosul', 'mousl', 'mousul', 'nineveh', 'ninewa', 'ninawa', 'nainawa', 'niniveh', 'neneveh', 'نينوى', 'نينوي', 'الموصل', 'موصل'],
  najaf: ['najaf', 'النجف', 'نجف'],
  karbala: ['karbala', 'kerbala', 'كربلاء', 'کربلا'],
  kirkuk: ['kirkuk', 'كركوك', 'کرکوک', 'کەرکووک'],
  anbar: ['anbar', 'الانبار', 'الأنبار', 'رمادي', 'ramadi'],
  duhok: ['duhok', 'dohuk', 'دهوك', 'دهۆك', 'دهوک'],
  babil: ['babil', 'babylon', 'hillah', 'hilla', 'بابل', 'الحلة', 'حلة'],
  diyala: ['diyala', 'ديالى', 'بعقوبة', 'baquba'],
  wasit: ['wasit', 'واسط', 'الكوت', 'kut'],
  saladin: ['saladin', 'salahaddin', 'salahaldin', 'salah al din', 'salah ad din', 'salah_ad_din', 'صلاح الدين', 'صلاحالدين', 'تكريت', 'tikrit'],
  maysan: ['maysan', 'ميسان', 'العمارة', 'amara'],
  dhiqar: ['dhiqar', 'dhi qar', 'dhi_qar', 'ذي قار', 'ذيقار', 'ذى قار', 'الناصرية', 'nasiriyah', 'nasiriya'],
  muthanna: ['muthanna', 'المثنى', 'المثني', 'السماوة', 'samawah'],
  qadisiya: ['qadisiya', 'qadisiyah', 'qadisiyyah', 'القادسية', 'الديوانية', 'diwaniya', 'diwaniyah'],
  halabja: ['halabja', 'حلبجة', 'حلبجه', 'هەڵەبجە']
};

const CATEGORY_ALIASES: Record<CategoryId, string[]> = {
  restaurant: ['restaurant', 'restaurants', 'food', 'dining', 'eatery', 'kitchen', 'grill', 'fast food', 'burger', 'pizza', 'shawarma', 'مطعم', 'مطاعم', 'اكل', 'أكل'],
  cafe_bakery: ['cafe_bakery', 'cafe bakery', 'cafe', 'cafes', 'café', 'coffee', 'coffee shop', 'bakery', 'bakeries', 'pastry', 'dessert', 'كافيه', 'مقهى', 'مخبز', 'كوفي'],
  supermarket: ['supermarket', 'supermarkets', 'grocery', 'groceries', 'market', 'markets', 'hypermarket', 'سوبرماركت', 'بقالة'],
  mall: ['mall', 'malls', 'shopping', 'retail', 'shopping center', 'مول', 'مولات', 'تسوق'],
  pharmacy: ['pharmacy', 'pharmacies', 'drugstore', 'medicine', 'صيدلية', 'صيدليات'],
  hospital: ['hospital', 'hospitals', 'مستشفى', 'مستشفيات'],
  clinic: ['clinic', 'clinics', 'medical center', 'health center', 'health', 'medical', 'lab', 'laboratory', 'عيادة', 'عيادات'],
  doctor: ['doctor', 'doctors', 'physician', 'specialist', 'طبيب', 'اطباء', 'أطباء', 'دكتور'],
  dentist: ['dentist', 'dentists', 'dental', 'اسنان', 'أسنان'],
  salon: ['salon', 'salons', 'beauty', 'barber', 'hair', 'cosmetic', 'makeup', 'صالون', 'تجميل', 'حلاقة'],
  spa: ['spa', 'wellness', 'massage', 'سبا', 'مساج'],
  gym: ['gym', 'gyms', 'fitness', 'sport', 'sports club', 'club', 'نادي', 'نوادي', 'رياضة'],
  hotel: ['hotel', 'hotels', 'resort', 'resorts', 'hospitality', 'motel', 'فندق', 'فنادق'],
  travel_agency: ['travel_agency', 'travel agency', 'travel', 'tourism', 'tour', 'agency', 'airline', 'ticket', 'سفر', 'سياحة'],
  university: ['university', 'universities', 'college', 'school', 'education', 'training', 'institute', 'academy', 'جامعة', 'جامعات', 'مدرسة', 'معهد'],
  bank: ['bank', 'banks', 'finance', 'exchange', 'money', 'insurance', 'مصرف', 'بنك', 'بنوك'],
  real_estate: ['real_estate', 'real estate', 'property', 'properties', 'housing', 'apartment', 'عقار', 'عقارات'],
  lawyer: ['lawyer', 'lawyers', 'legal', 'law', 'attorney', 'محامي', 'محامون', 'قانون'],
  car_dealer: ['car_dealer', 'car dealer', 'car dealers', 'car sales', 'automotive', 'auto sales', 'vehicle', 'cars', 'سيارات', 'معارض سيارات'],
  car_rental: ['car_rental', 'car rental', 'rental car', 'rent a car', 'تأجير سيارات', 'تاجير سيارات'],
  mobile_shop: ['mobile_shop', 'mobile shop', 'mobile shops', 'mobile', 'phone', 'phones', 'smartphone', 'electronics', 'tech shop', 'computer', 'موبايل', 'الكترونيات', 'إلكترونيات'],
  furniture: ['furniture', 'home furniture', 'decor', 'اثاث', 'أثاث', 'مفروشات'],
  clothing_store: ['clothing_store', 'clothing store', 'clothing', 'fashion', 'clothes', 'boutique', 'apparel', 'ملابس', 'ازياء', 'أزياء'],
  software_company: ['software_company', 'software company', 'software', 'it', 'technology', 'digital', 'programming', 'web design', 'tech software', 'برمجيات', 'تقنية'],
  marketing_agency: ['marketing_agency', 'marketing agency', 'marketing', 'advertising', 'media agency', 'اعلان', 'إعلان', 'تسويق'],
  construction_company: ['construction_company', 'construction company', 'construction', 'contractor', 'contractors', 'building', 'مقاولات', 'انشاءات', 'إنشاءات'],
  architecture: ['architecture', 'architect', 'design', 'هندسة', 'تصميم'],
  photography: ['photography', 'photo', 'studio', 'camera', 'تصوير', 'استوديو'],
  cinema: ['cinema', 'theatre', 'theater', 'movie', 'سينما', 'افلام', 'أفلام'],
  gaming_center: ['gaming_center', 'gaming center', 'gaming', 'game', 'games', 'playstation', 'العاب', 'ألعاب'],
  sports_club: ['sports_club', 'sports club', 'sports clubs', 'football club', 'stadium', 'ملعب', 'ملاعب'],
  pet_shop: ['pet_shop', 'pet shop', 'pet', 'pets', 'veterinary', 'vet', 'حيوانات', 'بيطري'],
  other: ['other', 'services', 'service', 'entertainment', 'misc', 'اخرى', 'أخرى', 'خدمات', 'خدمة']
};

function clean(value: unknown): string {
  return String(value || '')
    .toLowerCase()
    .trim()
    .replace(/[أإآ]/g, 'ا')
    .replace(/ة/g, 'ه')
    .replace(/ى/g, 'ي')
    .replace(/[_\-]+/g, ' ')
    .replace(/[\s،,./()()[\]{}&]+/g, ' ')
    .trim();
}

function compact(value: unknown): string {
  return clean(value).replace(/\s+/g, '');
}

function lookupAlias<T extends string>(value: unknown, aliases: Record<T, string[]>, fallback: T): T {
  const raw = clean(value);
  const rawCompact = compact(value);

  for (const [id, values] of Object.entries(aliases) as Array<[T, string[]]>) {
    if (clean(id) === raw || compact(id) === rawCompact) return id;
    if (values.some((alias) => clean(alias) === raw || compact(alias) === rawCompact)) return id;
  }

  return fallback;
}

export function normalizeGovernorate(value: unknown): GovernorateId {
  return lookupAlias(value, GOVERNORATE_ALIASES, 'all');
}

export function normalizeCategory(value: unknown): CategoryId {
  return lookupAlias(value, CATEGORY_ALIASES, 'other');
}

export function getGovernorateLabel(id: unknown, lang: Language): string {
  const normalized = normalizeGovernorate(id);
  const labels: Record<GovernorateId, Record<Language, string>> = {
    all: { en: 'All Iraq', ar: 'كل العراق', ku: 'هەموو عێراق' },
    baghdad: { en: 'Baghdad', ar: 'بغداد', ku: 'بەغداد' },
    erbil: { en: 'Erbil', ar: 'أربيل', ku: 'هەولێر' },
    basra: { en: 'Basra', ar: 'البصرة', ku: 'بەسرە' },
    sulaymaniyah: { en: 'Sulaymaniyah', ar: 'السليمانية', ku: 'سلێمانی' },
    mosul: { en: 'Mosul / Nineveh', ar: 'الموصل / نينوى', ku: 'مووسڵ / نەینەوا' },
    najaf: { en: 'Najaf', ar: 'النجف', ku: 'نەجەف' },
    karbala: { en: 'Karbala', ar: 'كربلاء', ku: 'کەربەلا' },
    kirkuk: { en: 'Kirkuk', ar: 'كركوك', ku: 'کەرکووک' },
    anbar: { en: 'Anbar', ar: 'الأنبار', ku: 'ئەنبار' },
    duhok: { en: 'Duhok', ar: 'دهوك', ku: 'دهۆک' },
    babil: { en: 'Babylon', ar: 'بابل', ku: 'بابل' },
    diyala: { en: 'Diyala', ar: 'ديالى', ku: 'دیالە' },
    wasit: { en: 'Wasit', ar: 'واسط', ku: 'واسط' },
    saladin: { en: 'Saladin', ar: 'صلاح الدين', ku: 'سەڵاحەددین' },
    maysan: { en: 'Maysan', ar: 'ميسان', ku: 'میسان' },
    dhiqar: { en: 'Dhi Qar', ar: 'ذي قار', ku: 'زیقار' },
    muthanna: { en: 'Muthanna', ar: 'المثنى', ku: 'موسەنا' },
    qadisiya: { en: 'Qadisiya', ar: 'القادسية', ku: 'قادسیە' },
    halabja: { en: 'Halabja', ar: 'حلبجة', ku: 'هەڵەبجە' }
  };

  return labels[normalized]?.[lang] || labels[normalized]?.en || String(id || '');
}

export function getCategoryLabel(id: unknown, lang: Language): string {
  const normalized = normalizeCategory(id);
  return String(normalized || id || '');
}