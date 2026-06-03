import { Language } from '../types';
import { GOVERNORATES, CATEGORIES } from '../data';

export type GovernorateId = string;
export type CategoryId = string;

export const IRAQ_GOVERNORATES = GOVERNORATES.map((gov: any) => ({
  id: String(gov.code || ''),
  en: String(gov.englishLabel || gov.name?.en || gov.code || ''),
  ar: String(gov.name?.ar || gov.englishLabel || gov.code || ''),
  ku: String(gov.name?.ku || gov.englishLabel || gov.code || ''),
  aliases: [
    String(gov.code || ''),
    String(gov.englishLabel || ''),
    String(gov.name?.en || ''),
    String(gov.name?.ar || ''),
    String(gov.name?.ku || '')
  ].filter(Boolean)
}));

export const APP_CATEGORIES = CATEGORIES.map((category: any) => ({
  id: String(category.id || ''),
  en: String(category.name?.en || category.id || ''),
  ar: String(category.name?.ar || category.name?.en || category.id || ''),
  ku: String(category.name?.ku || category.name?.en || category.id || ''),
  aliases: [
    String(category.id || ''),
    String(category.name?.en || ''),
    String(category.name?.ar || ''),
    String(category.name?.ku || '')
  ].filter(Boolean)
}));

const GOVERNORATE_ALIASES: Record<string, string[]> = {
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

const CATEGORY_ALIASES: Record<string, string[]> = {
  restaurant: ['restaurant', 'restaurants', 'food', 'dining', 'eatery', 'kitchen', 'grill', 'fast food', 'burger', 'pizza', 'shawarma', 'restaurants_and_cafes', 'restaurants cafes', 'مطعم', 'مطاعم', 'اكل', 'أكل'],
  cafe_bakery: ['cafe_bakery', 'cafe bakery', 'cafes bakeries', 'cafe', 'cafes', 'café', 'coffee', 'coffee shop', 'bakery', 'bakeries', 'pastry', 'dessert', 'كافيه', 'مقهى', 'مخبز', 'كوفي'],
  supermarket: ['supermarket', 'supermarkets', 'grocery', 'groceries', 'market', 'markets', 'hypermarket', 'سوبرماركت', 'بقالة'],
  mall: ['mall', 'malls', 'shopping', 'retail', 'shopping center', 'shop', 'مول', 'مولات', 'تسوق'],
  pharmacy: ['pharmacy', 'pharmacies', 'drugstore', 'medicine', 'صيدلية', 'صيدليات'],
  hospital: ['hospital', 'hospitals', 'مستشفى', 'مستشفيات'],
  clinic: ['clinic', 'clinics', 'medical center', 'health center', 'health', 'medical', 'health_and_medical_services', 'عيادة', 'عيادات'],
  doctor: ['doctor', 'doctors', 'physician', 'specialist', 'طبيب', 'اطباء', 'أطباء', 'دكتور'],
  dentist: ['dentist', 'dentists', 'dental', 'اسنان', 'أسنان'],
  salon: ['salon', 'salons', 'beauty', 'beauty_and_salons', 'barber', 'hair', 'صالون', 'تجميل', 'حلاقة'],
  spa: ['spa', 'wellness', 'massage', 'سبا', 'مساج'],
  gym: ['gym', 'gyms', 'fitness', 'fitness_and_gyms', 'sport', 'sports club', 'club', 'نادي', 'نوادي', 'رياضة'],
  hotel: ['hotel', 'hotels', 'hotels_and_hospitality', 'resort', 'resorts', 'hospitality', 'فندق', 'فنادق'],
  travel_agency: ['travel_agency', 'travel agency', 'travel agencies', 'travel', 'tourism', 'agency', 'سفر', 'سياحة'],
  university: ['university', 'universities', 'education', 'education_and_training_centers', 'college', 'school', 'training', 'institute', 'academy', 'جامعة', 'جامعات', 'مدرسة', 'معهد'],
  bank: ['bank', 'banks', 'finance', 'atm', 'exchange', 'money', 'مصرف', 'بنك', 'بنوك'],
  real_estate: ['real_estate', 'real estate', 'property', 'properties', 'housing', 'عقار', 'عقارات'],
  lawyer: ['lawyer', 'lawyers', 'legal', 'law', 'محامي', 'محامون', 'قانون'],
  car_dealer: ['car_dealer', 'car dealer', 'car dealers', 'car sales', 'automotive', 'cars', 'سيارات', 'معارض سيارات'],
  car_rental: ['car_rental', 'car rental', 'rental car', 'rent a car', 'تأجير سيارات', 'تاجير سيارات'],
  mobile_shop: ['mobile_shop', 'mobile shop', 'mobile shops', 'electronics', 'electronics_and_tech_shops', 'mobile', 'phone', 'موبايل', 'الكترونيات', 'إلكترونيات'],
  furniture: ['furniture', 'home', 'home furniture', 'decor', 'اثاث', 'أثاث', 'مفروشات'],
  clothing_store: ['clothing_store', 'clothing store', 'clothing', 'fashion', 'clothes', 'ملابس', 'ازياء', 'أزياء'],
  software_company: ['software_company', 'software company', 'software', 'it_and_software_services', 'it', 'technology', 'digital', 'برمجيات', 'تقنية'],
  marketing_agency: ['marketing_agency', 'marketing agency', 'marketing', 'advertising', 'اعلان', 'إعلان', 'تسويق'],
  construction_company: ['construction_company', 'construction company', 'construction', 'construction_and_contractors', 'contractor', 'contractors', 'مقاولات', 'انشاءات', 'إنشاءات'],
  architecture: ['architecture', 'architect', 'design', 'هندسة', 'تصميم'],
  photography: ['photography', 'photo', 'studio', 'camera', 'تصوير', 'استوديو'],
  cinema: ['cinema', 'entertainment', 'events', 'theatre', 'theater', 'movie', 'سينما', 'افلام', 'أفلام'],
  gaming_center: ['gaming_center', 'gaming center', 'gaming', 'game', 'games', 'playstation', 'العاب', 'ألعاب'],
  sports_club: ['sports_club', 'sports club', 'sports clubs', 'football club', 'stadium', 'ملعب', 'ملاعب'],
  pet_shop: ['pet_shop', 'pet shop', 'pet', 'pets', 'veterinary', 'vet', 'حيوانات', 'بيطري'],
  other: ['other', 'services', 'service', 'fuel', 'mosque', 'amenity', 'office', 'craft', 'misc', 'اخرى', 'أخرى', 'خدمات', 'خدمة']
};

function clean(value: unknown): string {
  return String(value || '')
    .toLowerCase()
    .trim()
    .replace(/[أإآ]/g, 'ا')
    .replace(/ة/g, 'ه')
    .replace(/ى/g, 'ي')
    .replace(/[_\-]+/g, ' ')
    .replace(/[\s،,./()[\]{}&]+/g, ' ')
    .trim();
}

function compact(value: unknown): string {
  return clean(value).replace(/\s+/g, '');
}

function findAlias(value: unknown, aliases: Record<string, string[]>, fallback: string): string {
  const raw = clean(value);
  const rawCompact = compact(value);

  for (const [id, values] of Object.entries(aliases)) {
    if (clean(id) === raw || compact(id) === rawCompact) return id;
    if (values.some((alias) => clean(alias) === raw || compact(alias) === rawCompact)) return id;
  }

  return fallback;
}

export function normalizeGovernorate(value: unknown): GovernorateId {
  return findAlias(value, GOVERNORATE_ALIASES, 'all');
}

export function normalizeCategory(value: unknown): CategoryId {
  const normalized = findAlias(value, CATEGORY_ALIASES, 'other');
  return CATEGORIES.some((category: any) => category.id === normalized) ? normalized : 'other';
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