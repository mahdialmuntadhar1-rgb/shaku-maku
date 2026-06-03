import { Business, GovernorateCode, SocialPost } from '../types';

const GOVERNORATE_CODES: Exclude<GovernorateCode, 'all'>[] = [
  'baghdad', 'basra', 'mosul', 'erbil', 'sulaymaniyah', 'duhok', 'kirkuk', 'najaf', 'karbala',
  'babil', 'anbar', 'diyala', 'wasit', 'saladin', 'dhiqar', 'maysan', 'muthanna', 'qadisiya', 'halabja'
];

const GOV_LABELS: Record<Exclude<GovernorateCode, 'all'>, { ar: string; ku: string; en: string }> = {
  baghdad: { ar: 'بغداد', ku: 'بەغداد', en: 'Baghdad' },
  basra: { ar: 'البصرة', ku: 'بەسرە', en: 'Basra' },
  mosul: { ar: 'نينوى', ku: 'مووسڵ', en: 'Nineveh' },
  erbil: { ar: 'أربيل', ku: 'هەولێر', en: 'Erbil' },
  sulaymaniyah: { ar: 'السليمانية', ku: 'سلێمانی', en: 'Sulaymaniyah' },
  duhok: { ar: 'دهوك', ku: 'دهۆک', en: 'Duhok' },
  kirkuk: { ar: 'كركوك', ku: 'کەرکووک', en: 'Kirkuk' },
  najaf: { ar: 'النجف', ku: 'نەجەف', en: 'Najaf' },
  karbala: { ar: 'كربلاء', ku: 'کەربەلا', en: 'Karbala' },
  babil: { ar: 'بابل', ku: 'بابل', en: 'Babylon' },
  anbar: { ar: 'الأنبار', ku: 'ئەنبار', en: 'Anbar' },
  diyala: { ar: 'ديالى', ku: 'دیالە', en: 'Diyala' },
  wasit: { ar: 'واسط', ku: 'واسط', en: 'Wasit' },
  saladin: { ar: 'صلاح الدين', ku: 'سەڵاحەددین', en: 'Saladin' },
  dhiqar: { ar: 'ذي قار', ku: 'زیقار', en: 'Dhi Qar' },
  maysan: { ar: 'ميسان', ku: 'میسان', en: 'Maysan' },
  muthanna: { ar: 'المثنى', ku: 'موسەنا', en: 'Muthanna' },
  qadisiya: { ar: 'القادسية', ku: 'قادسیە', en: 'Qadisiya' },
  halabja: { ar: 'حلبجة', ku: 'هەڵەبجە', en: 'Halabja' },
};

const CATEGORY_ROTATION = [
  'restaurant', 'cafe_bakery', 'clinic', 'pharmacy', 'hotel', 'salon', 'gym', 'mobile_shop', 'real_estate',
  'clothing_store', 'car_dealer', 'university', 'travel_agency', 'supermarket', 'doctor', 'dentist', 'lawyer', 'sports_club', 'other'
];

const CATEGORY_LABELS: Record<string, { ar: string; ku: string; en: string; icon: string }> = {
  restaurant: { ar: 'مطعم', ku: 'چێشتخانە', en: 'Restaurant', icon: '🍔' },
  cafe_bakery: { ar: 'كافيه', ku: 'کافێ', en: 'Cafe', icon: '☕' },
  clinic: { ar: 'عيادة', ku: 'کلینیک', en: 'Clinic', icon: '🩺' },
  pharmacy: { ar: 'صيدلية', ku: 'دەرمانخانە', en: 'Pharmacy', icon: '💊' },
  hotel: { ar: 'فندق', ku: 'هۆتێل', en: 'Hotel', icon: '🏨' },
  salon: { ar: 'صالون تجميل', ku: 'ساڵۆن', en: 'Salon', icon: '💈' },
  gym: { ar: 'جيم', ku: 'هۆڵی وەرزش', en: 'Gym', icon: '🏋️' },
  mobile_shop: { ar: 'موبايلات', ku: 'مۆبایل', en: 'Mobile shop', icon: '📱' },
  real_estate: { ar: 'عقارات', ku: 'عەقارات', en: 'Real estate', icon: '🏢' },
  clothing_store: { ar: 'أزياء', ku: 'جلوبەرگ', en: 'Fashion', icon: '👔' },
  car_dealer: { ar: 'سيارات', ku: 'ئۆتۆمبێل', en: 'Cars', icon: '🚗' },
  university: { ar: 'تعليم', ku: 'فێربوون', en: 'Education', icon: '🎓' },
  travel_agency: { ar: 'سفر وسياحة', ku: 'گەشتوگوزار', en: 'Travel', icon: '✈️' },
  supermarket: { ar: 'سوبرماركت', ku: 'سۆپەرمارکێت', en: 'Supermarket', icon: '🛒' },
  doctor: { ar: 'طبيب', ku: 'دکتۆر', en: 'Doctor', icon: '👨‍⚕️' },
  dentist: { ar: 'طبيب أسنان', ku: 'پزیشکی ددان', en: 'Dentist', icon: '🦷' },
  lawyer: { ar: 'محامي', ku: 'پارێزەر', en: 'Lawyer', icon: '⚖️' },
  sports_club: { ar: 'نادي رياضي', ku: 'یانەی وەرزشی', en: 'Sports club', icon: '⚽' },
  other: { ar: 'خدمات', ku: 'خزمەتگوزاری', en: 'Services', icon: '🏢' },
};

const CATEGORY_IMAGES: Record<string, string[]> = {
  restaurant: ['https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&auto=format&fit=crop&q=80', 'https://images.unsplash.com/photo-1544025162-d76694265947?w=1200&auto=format&fit=crop&q=80'],
  cafe_bakery: ['https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1200&auto=format&fit=crop&q=80', 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=1200&auto=format&fit=crop&q=80'],
  clinic: ['https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=1200&auto=format&fit=crop&q=80', 'https://images.unsplash.com/photo-1584982751601-97dcc096659c?w=1200&auto=format&fit=crop&q=80'],
  pharmacy: ['https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=1200&auto=format&fit=crop&q=80', 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=1200&auto=format&fit=crop&q=80'],
  hotel: ['https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&auto=format&fit=crop&q=80', 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1200&auto=format&fit=crop&q=80'],
  salon: ['https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=1200&auto=format&fit=crop&q=80', 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=1200&auto=format&fit=crop&q=80'],
  gym: ['https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&auto=format&fit=crop&q=80', 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=1200&auto=format&fit=crop&q=80'],
  mobile_shop: ['https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=1200&auto=format&fit=crop&q=80', 'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=1200&auto=format&fit=crop&q=80'],
  real_estate: ['https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&auto=format&fit=crop&q=80', 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&auto=format&fit=crop&q=80'],
  clothing_store: ['https://images.unsplash.com/photo-1445205170230-053b83016050?w=1200&auto=format&fit=crop&q=80', 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=1200&auto=format&fit=crop&q=80'],
  car_dealer: ['https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200&auto=format&fit=crop&q=80', 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1200&auto=format&fit=crop&q=80'],
  university: ['https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200&auto=format&fit=crop&q=80', 'https://images.unsplash.com/photo-1562774053-701939374585?w=1200&auto=format&fit=crop&q=80'],
  travel_agency: ['https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1200&auto=format&fit=crop&q=80', 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200&auto=format&fit=crop&q=80'],
  supermarket: ['https://images.unsplash.com/photo-1542838132-92c53300491e?w=1200&auto=format&fit=crop&q=80', 'https://images.unsplash.com/photo-1579113800032-c38bd7635818?w=1200&auto=format&fit=crop&q=80'],
  doctor: ['https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=1200&auto=format&fit=crop&q=80', 'https://images.unsplash.com/photo-1631217868264-e6b90bb7e133?w=1200&auto=format&fit=crop&q=80'],
  dentist: ['https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=1200&auto=format&fit=crop&q=80', 'https://images.unsplash.com/photo-1588776814546-daab30f310ce?w=1200&auto=format&fit=crop&q=80'],
  lawyer: ['https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1200&auto=format&fit=crop&q=80', 'https://images.unsplash.com/photo-1453945619913-79ec89a82c51?w=1200&auto=format&fit=crop&q=80'],
  sports_club: ['https://images.unsplash.com/photo-1521412644187-c49fa049e84d?w=1200&auto=format&fit=crop&q=80', 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=1200&auto=format&fit=crop&q=80'],
  other: ['https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&auto=format&fit=crop&q=80', 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&auto=format&fit=crop&q=80'],
};

const AVATARS = [
  'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=160&h=160&fit=crop&q=80',
  'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=160&h=160&fit=crop&q=80',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=160&h=160&fit=crop&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=160&h=160&fit=crop&q=80',
];

function seed(value: string): number {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function pick<T>(items: T[], key: string): T {
  return items[seed(key) % items.length];
}

function normalizeList(payload: unknown): any[] {
  const input: any = payload;
  if (Array.isArray(input)) return input;
  if (Array.isArray(input?.data)) return input.data;
  if (Array.isArray(input?.businesses)) return input.businesses;
  if (Array.isArray(input?.data?.businesses)) return input.data.businesses;
  if (Array.isArray(input?.results)) return input.results;
  return [];
}

function normalizeGov(value: unknown): GovernorateCode {
  const compact = String(value || '').toLowerCase().replace(/[\s_\-،]+/g, '');
  const map: Record<string, GovernorateCode> = {
    baghdad: 'baghdad', 'بغداد': 'baghdad',
    basra: 'basra', 'البصرة': 'basra', 'بەسرە': 'basra',
    mosul: 'mosul', 'نينوى': 'mosul', 'الموصل': 'mosul', nineveh: 'mosul',
    erbil: 'erbil', 'اربيل': 'erbil', 'أربيل': 'erbil', 'هەولێر': 'erbil',
    sulaymaniyah: 'sulaymaniyah', slemani: 'sulaymaniyah', 'السليمانية': 'sulaymaniyah', 'سلێمانی': 'sulaymaniyah',
    duhok: 'duhok', 'دهوك': 'duhok', 'دهوک': 'duhok', 'دهۆک': 'duhok',
    kirkuk: 'kirkuk', 'كركوك': 'kirkuk', 'کەرکووک': 'kirkuk',
    najaf: 'najaf', 'النجف': 'najaf',
    karbala: 'karbala', 'كربلاء': 'karbala', 'کەربەلا': 'karbala',
    babil: 'babil', babylon: 'babil', 'بابل': 'babil',
    anbar: 'anbar', 'الأنبار': 'anbar', 'الانبار': 'anbar',
    diyala: 'diyala', 'ديالى': 'diyala', 'دیالە': 'diyala',
    wasit: 'wasit', 'واسط': 'wasit',
    saladin: 'saladin', 'صلاحالدين': 'saladin', 'صلاح الدين': 'saladin',
    dhiqar: 'dhiqar', 'ذيقار': 'dhiqar', 'ذي قار': 'dhiqar',
    maysan: 'maysan', 'ميسان': 'maysan',
    muthanna: 'muthanna', 'المثنى': 'muthanna',
    qadisiya: 'qadisiya', 'القادسية': 'qadisiya',
    halabja: 'halabja', 'حلبجة': 'halabja', 'هەڵەبجە': 'halabja',
  };
  return map[compact] || 'all';
}

function normalizeCategory(value: unknown): string {
  const compact = String(value || '').toLowerCase().replace(/[\s_\-&/،]+/g, '');
  const map: Record<string, string> = {
    restaurant: 'restaurant', restaurants: 'restaurant', food: 'restaurant', 'مطاعم': 'restaurant', 'مطعم': 'restaurant',
    cafe: 'cafe_bakery', bakery: 'cafe_bakery', 'كافيه': 'cafe_bakery', 'کافێ': 'cafe_bakery',
    clinic: 'clinic', 'عيادة': 'clinic', 'عيادات': 'clinic', 'کلینیک': 'clinic',
    pharmacy: 'pharmacy', 'صيدلية': 'pharmacy', 'صيدليات': 'pharmacy', 'دەرمانخانه': 'pharmacy',
    hotel: 'hotel', 'فندق': 'hotel', 'فنادق': 'hotel', 'هۆتێل': 'hotel',
    salon: 'salon', 'تجميل': 'salon', 'صالون': 'salon', 'ساڵۆن': 'salon',
    gym: 'gym', fitness: 'gym', 'نادي': 'gym', 'جيم': 'gym', 'وەرزش': 'gym',
    mobile: 'mobile_shop', electronics: 'mobile_shop', 'موبايل': 'mobile_shop', 'مۆبایل': 'mobile_shop',
    realestate: 'real_estate', 'عقارات': 'real_estate',
    clothing: 'clothing_store', fashion: 'clothing_store', 'ملابس': 'clothing_store', 'ازياء': 'clothing_store',
    car: 'car_dealer', cars: 'car_dealer', 'سيارات': 'car_dealer',
    education: 'university', university: 'university', school: 'university', 'تعليم': 'university',
    travel: 'travel_agency', 'سفر': 'travel_agency', 'سياحة': 'travel_agency',
    supermarket: 'supermarket', market: 'supermarket', 'سوبرماركت': 'supermarket',
    doctor: 'doctor', 'طبيب': 'doctor', 'دکتۆر': 'doctor',
    dentist: 'dentist', 'اسنان': 'dentist', 'ددان': 'dentist',
    lawyer: 'lawyer', 'محامي': 'lawyer',
    sportsclub: 'sports_club', 'ملعب': 'sports_club',
  };
  return map[compact] || (CATEGORY_LABELS[compact] ? compact : 'other');
}

function cleanImage(value: unknown): string {
  const url = String(value || '').trim();
  if (!url || url.includes('photo-1441986300917-64674bd600d8')) return '';
  return url;
}

function getBizField(biz: any, keys: string[], fallback = ''): string {
  for (const key of keys) {
    const value = String(biz?.[key] || '').trim();
    if (value) return value;
  }
  return fallback;
}

function buildFallbackName(gov: Exclude<GovernorateCode, 'all'>, category: string, index: number): string {
  const label = CATEGORY_LABELS[category] || CATEGORY_LABELS.other;
  const govLabel = GOV_LABELS[gov];
  const styles = ['النخبة', 'المدينة', 'الرافدين', 'الدار', 'الخير'];
  return `${label.ar} ${styles[index % styles.length]} - ${govLabel.ar}`;
}

function makeCaption(gov: Exclude<GovernorateCode, 'all'>, category: string, businessName: string, index: number) {
  const label = CATEGORY_LABELS[category] || CATEGORY_LABELS.other;
  const govLabel = GOV_LABELS[gov];
  const isKurdishArea = ['erbil', 'sulaymaniyah', 'duhok', 'halabja', 'kirkuk'].includes(gov);
  const mixed = index === 4;

  const ar = [
    `تدور على ${label.ar} مرتب في ${govLabel.ar}؟ ${businessName} من الأماكن اللي تستاهل التجربة، معلوماته واضحة على شكو ماكو.`,
    `عرض جديد من ${businessName} في ${govLabel.ar}. شوف الرقم والعنوان واحجز بسهولة من شكو ماكو.`,
    `مكان قريب منك، تقييمات أوضح، وخدمة أسهل. ${businessName} صار ضمن ترشيحات شكو ماكو اليوم.`,
    `زبائن أكثر يكتشفون ${businessName} هذا الأسبوع. إذا تدور على ${label.ar} موثوق، هذا المنشور إلك.`,
    `New spot in ${govLabel.en}! ${businessName} — كل التفاصيل والاتصال موجودة داخل شكو ماكو.`
  ][index % 5];

  const ku = [
    `شوێنێکی باش بۆ ${label.ku} لە ${govLabel.ku}. ${businessName} ئێستا لە شکو ماکو بە زانیاری تەواوەوە بەردەستە.`,
    `${businessName} لە ${govLabel.ku}، ژمارە و ناونیشانەکەی بە ئاسانی بدۆزەوە لە شکو ماکو.`,
    `ئەگەر بەدوای ${label.ku} دەگەڕێیت، ئەم شوێنە یەکێکە لە پێشنیارە جوانەکانی ئەمڕۆ.`,
    `زۆر کەس ئەم هەفتە ${businessName} دەبینن. وردەکاری و پەیوەندی لە شکو ماکو هەیە.`,
    `Fresh place in ${govLabel.en}! ${businessName} — زانیاری تەواو لە شکو ماکو.`
  ][index % 5];

  const en = mixed
    ? `Fresh local business in ${govLabel.en}. ${businessName} is now easy to discover on Shaku Maku.`
    : `Discover ${businessName}, a local ${label.en.toLowerCase()} in ${govLabel.en}, with clear contact and location details.`;

  return {
    ar,
    ku: isKurdishArea ? ku : ar,
    en,
  };
}

function makeComments(key: string) {
  const pool = [
    { username: 'ali_iq', text: 'المكان مرتب بصراحة', time: 'قبل 12 د' },
    { username: 'zainab', text: 'شنو أوقات الدوام؟', time: 'قبل 18 د' },
    { username: 'karwan', text: 'زۆر جوانە', time: 'قبل 25 د' },
    { username: 'noor', text: 'عدكم توصيل؟', time: 'قبل 34 د' },
    { username: 'hama', text: 'ناونیشانەکە لە کوێیە؟', time: 'قبل 41 د' },
    { username: 'mustafa', text: 'جربته، خوش مكان', time: 'قبل 1 س' },
    { username: 'sara', text: 'السعر شكد؟', time: 'قبل 2 س' },
  ];
  const start = seed(key) % pool.length;
  return [0, 1, 2].map((offset) => {
    const item = pool[(start + offset) % pool.length];
    return { id: `${key}-comment-${offset}`, ...item };
  });
}

export function buildLocalizedSocialPosts(source: unknown): SocialPost[] {
  const rows = normalizeList(source);
  const realBusinesses = rows.map((row) => {
    const biz = row as Partial<Business> & Record<string, any>;
    const governorate = normalizeGov(biz.governorate);
    const category = normalizeCategory(biz.category);
    const imageCandidates = [biz.image, biz.media_url, biz.logo, biz.cover_image, ...(String(biz.images || '').split(',') || [])];
    const image = imageCandidates.map(cleanImage).find(Boolean) || '';
    return {
      id: String(biz.id || biz.business_id || seed(JSON.stringify(biz))),
      name: getBizField(biz, ['name_ar', 'business_name_ar', 'name_en', 'business_name_en', 'name'], 'شكو ماكو بزنس'),
      avatar: cleanImage(biz.avatar || biz.logo) || pick(AVATARS, String(biz.id || biz.name_ar || Math.random())),
      category,
      governorate,
      image,
      phone: getBizField(biz, ['phone_number', 'phone', 'whatsapp', 'mobile']),
      address: getBizField(biz, ['address_ar', 'address', 'address_en', 'location']),
      verified: Boolean(biz.is_verified || biz.verified),
    };
  }).filter((biz) => biz.governorate !== 'all');

  const usedRealIds = new Set<string>();
  const posts: SocialPost[] = [];

  GOVERNORATE_CODES.forEach((gov, govIndex) => {
    for (let slot = 0; slot < 5; slot += 1) {
      const category = CATEGORY_ROTATION[(govIndex + slot * 3) % CATEGORY_ROTATION.length];
      const real = realBusinesses.find((biz) => biz.governorate === gov && biz.category === category && !usedRealIds.has(biz.id))
        || realBusinesses.find((biz) => biz.governorate === gov && !usedRealIds.has(biz.id));

      if (real) usedRealIds.add(real.id);

      const key = `${gov}-${category}-${slot}`;
      const categoryImages = CATEGORY_IMAGES[real?.category || category] || CATEGORY_IMAGES.other;
      const businessName = real?.name || buildFallbackName(gov, category, slot);
      const image = real?.image || pick(categoryImages, key);
      const activeCategory = real?.category || category;
      const label = CATEGORY_LABELS[activeCategory] || CATEGORY_LABELS.other;
      const likesBase = 18 + (seed(`${key}-likes`) % 2380);
      const smallBusinessLikes = slot < 3 ? 18 + (seed(`${key}-small`) % 240) : likesBase;
      const isSponsored = slot === 1 || slot === 4;
      const isVerified = Boolean(real?.verified || slot === 0 || slot === 3);

      posts.push({
        id: `localized-${key}`,
        businessId: real?.id || `seed-${key}`,
        businessName,
        businessAvatar: real?.avatar || pick(AVATARS, key),
        category: activeCategory,
        governorate: gov,
        mediaUrl: image,
        caption: makeCaption(gov, activeCategory, businessName, slot),
        likes: isSponsored ? Math.max(520, likesBase) : smallBusinessLikes,
        commentsCount: 2 + (seed(`${key}-comments`) % 178),
        shares: seed(`${key}-shares`) % 91,
        views: 100 + (seed(`${key}-views`) % 19900),
        timeAgo: {
          ar: slot === 0 ? 'منذ 12 دقيقة' : slot === 1 ? 'منذ ساعة' : `منذ ${slot + 1} ساعات`,
          ku: slot === 0 ? '12 خولەک پێش ئێستا' : slot === 1 ? 'کاتژمێرێک پێش ئێستا' : `${slot + 1} کاتژمێر پێش ئێستا`,
          en: slot === 0 ? '12 min ago' : slot === 1 ? '1 hour ago' : `${slot + 1} hours ago`,
        },
        likedByUser: false,
        savedByUser: false,
        comments: makeComments(key),
        promotionBadge: isSponsored ? {
          ar: 'إعلان ممول',
          ku: 'ڕیکلامی پارەدراو',
          en: 'Sponsored',
        } : isVerified ? {
          ar: 'موثّق',
          ku: 'پشتڕاستکراو',
          en: 'Verified',
        } : undefined,
        status: 'approved',
        updatedAt: new Date(Date.now() - seed(key) % 604800000).toISOString(),
        authorEmail: real?.phone || real?.address || `${label.en.toLowerCase().replace(/\s+/g, '')}@shakumaku.local`,
      });
    }
  });

  return posts;
}

export const LOCALIZED_SOCIAL_POST_COUNT = GOVERNORATE_CODES.length * 5;
