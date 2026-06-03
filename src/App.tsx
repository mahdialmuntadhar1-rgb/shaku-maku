import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Compass, Flame, Map, PlusCircle, BookOpen, Search, X, 
  Sparkles, Heart, Star, ChevronLeft, ChevronRight, CheckCircle2, Play, Lock,
  ChevronDown, MapPin
} from 'lucide-react';
import { Language, GovernorateCode, Business, SocialPost, UserProfile, HeroSlide } from './types';
import { TRANSLATIONS, CATEGORIES, GOVERNORATES, HERO_SLIDES } from './data';
import { authApi, businessesApi, postsApi } from './api';

// Saku Maku Modular Components
import Header from './components/Header';
import Hero from './components/Hero';
import PWAInstallButton from './components/PWAInstallButton';
import CategorySwiper from './components/CategorySwiper';
import BusinessFeed from './components/BusinessFeed';
import SocialFeed from './components/SocialFeed';
import InteractiveMap from './components/InteractiveMap';
import AddBusinessForm from './components/AddBusinessForm';
import AboutSakuMaku from './components/AboutSakuMaku';
import AdminPanel from './components/AdminPanel';
import AuthModal from './components/AuthModal';

const FALLBACK_BUSINESS_IMAGE =
  'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&auto=format&fit=crop&q=80';
const FALLBACK_AVATAR =
  'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&h=120&fit=crop&q=80';

const CATEGORY_IMAGE_POOLS: Record<string, string[]> = {
  restaurant: [
    'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&auto=format&fit=crop&q=80'
  ],
  cafe_bakery: [
    'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1200&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=1200&auto=format&fit=crop&q=80'
  ],
  clinic: [
    'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=1200&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1584982751601-97dcc096659c?w=1200&auto=format&fit=crop&q=80'
  ],
  hospital: [
    'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1200&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=1200&auto=format&fit=crop&q=80'
  ],
  doctor: [
    'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=1200&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1631217868264-e6b90bb7e133?w=1200&auto=format&fit=crop&q=80'
  ],
  dentist: [
    'https://images.unsplash.com/photo-1588776814546-daab30f310ce?w=1200&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=1200&auto=format&fit=crop&q=80'
  ],
  pharmacy: [
    'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=1200&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=1200&auto=format&fit=crop&q=80'
  ],
  lawyer: [
    'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1200&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1453945619913-79ec89a82c51?w=1200&auto=format&fit=crop&q=80'
  ],
  salon: [
    'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=1200&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=1200&auto=format&fit=crop&q=80'
  ],
  gym: [
    'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=1200&auto=format&fit=crop&q=80'
  ],
  hotel: [
    'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1200&auto=format&fit=crop&q=80'
  ],
  supermarket: [
    'https://images.unsplash.com/photo-1542838132-92c53300491e?w=1200&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1579113800032-c38bd7635818?w=1200&auto=format&fit=crop&q=80'
  ],
  mall: [
    'https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?w=1200&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=1200&auto=format&fit=crop&q=80'
  ],
  mobile_shop: [
    'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=1200&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=1200&auto=format&fit=crop&q=80'
  ],
  real_estate: [
    'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&auto=format&fit=crop&q=80'
  ],
  university: [
    'https://images.unsplash.com/photo-1562774053-701939374585?w=1200&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200&auto=format&fit=crop&q=80'
  ],
  other: [
    'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&auto=format&fit=crop&q=80'
  ]
};

function hashSeed(value: string): number {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function isLikelyGenericBusinessImage(url: string): boolean {
  const normalized = url.toLowerCase();
  return normalized.includes('photo-1441986300917-64674bd600d8');
}

function resolveBusinessCardImage(rawImage: unknown, categoryId: string, businessId: unknown): string {
  const original = String(rawImage || '').trim();
  if (original && !isLikelyGenericBusinessImage(original)) return original;

  const pool = CATEGORY_IMAGE_POOLS[categoryId] || CATEGORY_IMAGE_POOLS.other;
  const index = hashSeed(`${businessId || ''}-${categoryId}`) % pool.length;
  return pool[index];
}

function normalizeList(payload: any): any[] {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.businesses)) return payload.businesses;
  if (Array.isArray(payload?.data?.businesses)) return payload.data.businesses;
  if (Array.isArray(payload?.results)) return payload.results;
  return [];
}

function normalizeGovernorate(value: unknown): GovernorateCode {
  const raw = String(value || '').toLowerCase().trim();
  if (!raw) return 'all';
  const compact = raw.replace(/[\s_\-،]+/g, '');

  const map: Record<string, GovernorateCode> = {
    all: 'all',
    iraq: 'all',
    'العراق': 'all',
    'عێراق': 'all',
    baghdad: 'baghdad',
    'بغداد': 'baghdad',
    erbil: 'erbil',
    'اربيل': 'erbil',
    'أربيل': 'erbil',
    'هەولێر': 'erbil',
    basra: 'basra',
    'البصرة': 'basra',
    'بەسرە': 'basra',
    sulaymaniyah: 'sulaymaniyah',
    sulaymania: 'sulaymaniyah',
    slemani: 'sulaymaniyah',
    'السليمانية': 'sulaymaniyah',
    'سلێمانی': 'sulaymaniyah',
    mosul: 'mosul',
    'الموصل': 'mosul',
    najaf: 'najaf',
    'النجف': 'najaf',
    karbala: 'karbala',
    'كربلاء': 'karbala',
    kirkuk: 'kirkuk',
    'كركوك': 'kirkuk',
    anbar: 'anbar',
    'الأنبار': 'anbar',
    duhok: 'duhok',
    'دهوك': 'duhok',
    'دهوک': 'duhok',
    babil: 'babil',
    babylon: 'babil',
    'بابل': 'babil',
    diyala: 'diyala',
    'ديالى': 'diyala',
    wasit: 'wasit',
    'واسط': 'wasit',
    saladin: 'saladin',
    salahaddin: 'saladin',
    salahaldin: 'saladin',
    'صلاحالدين': 'saladin',
    maysan: 'maysan',
    'ميسان': 'maysan',
    dhiqar: 'dhiqar',
    'ذيقار': 'dhiqar',
    'ذي_قار': 'dhiqar',
    muthanna: 'muthanna',
    'المثنى': 'muthanna',
    qadisiya: 'qadisiya',
    qadisiyah: 'qadisiya',
    'القادسية': 'qadisiya',
    halabja: 'halabja',
    'حلبجة': 'halabja',
  };

  if (map[compact]) return map[compact];

  for (const gov of GOVERNORATES) {
    const codeKey = gov.code.toLowerCase().replace(/[\s_\-،]+/g, '');
    const englishKey = gov.englishLabel.toLowerCase().replace(/[\s_\-،]+/g, '');
    const enKey = gov.name.en.toLowerCase().replace(/[\s_\-،]+/g, '');
    const arKey = gov.name.ar.toLowerCase().replace(/[\s_\-،]+/g, '');
    const kuKey = gov.name.ku.toLowerCase().replace(/[\s_\-،]+/g, '');
    if (compact === codeKey || compact === englishKey || compact === enKey || compact === arKey || compact === kuKey) {
      return gov.code;
    }
  }

  const administrativeWordsRemoved = compact
    .replace(/governorate/g, '')
    .replace(/province/g, '')
    .replace(/محافظة/g, '')
    .replace(/المحافظة/g, '')
    .replace(/پارێزگای/g, '')
    .replace(/پارێزگا/g, '');

  if (map[administrativeWordsRemoved]) {
    return map[administrativeWordsRemoved];
  }

  const fuzzyMatch = Object.entries(map).find(([alias, code]) => {
    if (!alias || alias === 'all' || alias === 'iraq') return false;
    if (alias.length < 4) return false;
    return compact.includes(alias) || administrativeWordsRemoved.includes(alias);
  });

  if (fuzzyMatch) {
    return fuzzyMatch[1];
  }

  return compact as GovernorateCode;
}

function normalizeDedupeText(value: unknown): string {
  return String(value || '')
    .toLowerCase()
    .trim()
    .replace(/[\s\-_،.,()\[\]{}]+/g, '')
    .replace(/[^\p{L}\p{N}]+/gu, '');
}

function dedupeBusinessesByIdentity(items: Business[]): Business[] {
  const seen = new Set<string>();

  return items.filter((biz) => {
    const nameKey = normalizeDedupeText(
      biz.name?.en || biz.name?.ar || biz.name?.ku || ''
    );
    const govKey = normalizeDedupeText(biz.governorate || '');
    const catKey = normalizeDedupeText(biz.category || '');

    // Strong rule: same business name inside same governorate and category = one card.
    // Do NOT use phone as the primary key because imported duplicates can have
    // different placeholder/fake phone values.
    const identityKey = `name:${nameKey}|gov:${govKey}|cat:${catKey}`;

    if (!nameKey) return true;
    if (seen.has(identityKey)) return false;

    seen.add(identityKey);
    return true;
  });
}

function normalizeCategory(value: unknown): string {
  const raw = String(value || '').trim();
  if (!raw) return 'other';

  const compact = raw.toLowerCase().replace(/[\s_\-&/،]+/g, '');
  const byId = CATEGORIES.find((cat) => cat.id.toLowerCase() === compact || cat.id.toLowerCase() === raw.toLowerCase());
  if (byId) return byId.id;

  const byName = CATEGORIES.find((cat) => {
    const en = cat.name.en.toLowerCase().replace(/[\s_\-&/،]+/g, '');
    const ar = cat.name.ar.toLowerCase().replace(/[\s_\-&/،]+/g, '');
    const ku = cat.name.ku.toLowerCase().replace(/[\s_\-&/،]+/g, '');
    return compact === en || compact === ar || compact === ku;
  });
  if (byName) return byName.id;

  const map: Record<string, string> = {
    restaurant: 'restaurant',
    restaurants: 'restaurant',
    food: 'restaurant',
    'مطعم': 'restaurant',
    'مطاعم': 'restaurant',
    'خواردنگه': 'restaurant',
    'چێشتخانه': 'restaurant',
    'restaurants & cafes': 'restaurant',
    cafe: 'cafe_bakery',
    'café': 'cafe_bakery',
    bakery: 'cafe_bakery',
    'كافيه': 'cafe_bakery',
    'مخبز': 'cafe_bakery',
    'کافێ': 'cafe_bakery',
    'نانەواخانه': 'cafe_bakery',
    'cafés & bakeries': 'cafe_bakery',
    'cafes & bakeries': 'cafe_bakery',
    supermarket: 'supermarket',
    supermarkets: 'supermarket',
    market: 'supermarket',
    shopping: 'mall',
    mall: 'mall',
    'مول': 'mall',
    'malls & shopping': 'mall',
    pharmacy: 'pharmacy',
    'صيدلية': 'pharmacy',
    'دەرمانخانه': 'pharmacy',
    pharmacies: 'pharmacy',
    hospital: 'hospital',
    'مستشفى': 'hospital',
    'نەخۆشخانه': 'hospital',
    hospitals: 'hospital',
    clinic: 'clinic',
    'عيادة': 'clinic',
    'کلینیک': 'clinic',
    clinics: 'clinic',
    doctor: 'doctor',
    'طبيب': 'doctor',
    'دکتۆر': 'doctor',
    doctors: 'doctor',
    dentist: 'dentist',
    'طبيباسنان': 'dentist',
    'پزیشکیددان': 'dentist',
    dentists: 'dentist',
    salon: 'salon',
    'تجميل': 'salon',
    'ساڵۆن': 'salon',
    'beauty salons': 'salon',
    'beauty & salons': 'salon',
    gym: 'gym',
    'نادي': 'gym',
    'وەرزش': 'gym',
    'spas & wellness': 'spa',
    'fitness & gyms': 'gym',
    'gyms & fitness': 'gym',
    hotel: 'hotel',
    'فندق': 'hotel',
    'هۆتێل': 'hotel',
    'hotels & hospitality': 'hotel',
    'hotels & resorts': 'hotel',
    'travel agencies': 'travel_agency',
    education: 'university',
    school: 'university',
    university: 'university',
    'جامعة': 'university',
    'زانکۆ': 'university',
    universities: 'university',
    electronics: 'mobile_shop',
    mobile: 'mobile_shop',
    'موبايل': 'mobile_shop',
    'مۆبایل': 'mobile_shop',
    services: 'other',
    service: 'other',
    'خدمة': 'other',
    'خدمات': 'other',
    other: 'other',
    'اخرى': 'other',
    'هیتر': 'other',
    'banks & finance': 'bank',
    'real estate': 'real_estate',
    'lawyers & legal': 'lawyer',
    'car dealers': 'car_dealer',
    'car rental': 'car_rental',
    'mobile shops': 'mobile_shop',
    'electronics & tech shops': 'mobile_shop',
    furniture: 'furniture',
    'clothing stores': 'clothing_store',
    'tech & software': 'software_company',
    'it & software services': 'software_company',
    'marketing agencies': 'marketing_agency',
    construction: 'construction_company',
    'construction & contractors': 'construction_company',
    'architecture & design': 'architecture',
    photography: 'photography',
    'cinema & theatres': 'cinema',
    'gaming centers': 'gaming_center',
    'sports clubs': 'sports_club',
    'pet shops': 'pet_shop',
    'education & training centers': 'university',
    'health & medical services': 'clinic',
  };

  const compactMap: Record<string, string> = {};
  Object.entries(map).forEach(([k, v]) => {
    compactMap[k.toLowerCase().replace(/[\s_\-&/،]+/g, '')] = v;
  });

  const exact = compactMap[compact];
  if (exact) return exact;

  // Fuzzy backend category matching.
  // Many imported database rows use broad labels such as Food, Dining,
  // Health, Medical, Shopping, Tech, Automotive, etc.
  const keywordRules: Array<[string, string[]]> = [
    ['restaurant', ['restaurant', 'restaurants', 'food', 'foods', 'dining', 'eatery', 'kitchen', 'grill', 'fastfood', 'burger', 'pizza', 'shawarma', 'catering']],
    ['cafe_bakery', ['cafe', 'cafes', 'coffee', 'coffeeshop', 'bakery', 'bakeries', 'pastry', 'dessert', 'sweets', 'cake']],
    ['pharmacy', ['pharmacy', 'pharmacies', 'drugstore', 'medicine', 'medicines']],
    ['hospital', ['hospital', 'hospitals']],
    ['clinic', ['clinic', 'clinics', 'medicalcenter', 'healthcenter', 'health', 'medical', 'lab', 'laboratory']],
    ['doctor', ['doctor', 'doctors', 'physician', 'specialist']],
    ['dentist', ['dentist', 'dentists', 'dental']],
    ['supermarket', ['supermarket', 'supermarkets', 'grocery', 'groceries', 'market', 'markets', 'hypermarket', 'minimarket']],
    ['mall', ['mall', 'malls', 'shopping', 'retail', 'store', 'stores']],
    ['salon', ['salon', 'salons', 'beauty', 'barber', 'hair', 'cosmetic', 'makeup']],
    ['spa', ['spa', 'wellness', 'massage']],
    ['gym', ['gym', 'gyms', 'fitness', 'sport', 'sportsclub', 'club']],
    ['hotel', ['hotel', 'hotels', 'resort', 'resorts', 'hospitality', 'motel']],
    ['travel_agency', ['travel', 'tourism', 'tour', 'agency', 'airline', 'ticket']],
    ['university', ['university', 'universities', 'college', 'school', 'education', 'training', 'institute', 'academy']],
    ['bank', ['bank', 'banks', 'finance', 'exchange', 'money', 'insurance']],
    ['real_estate', ['realestate', 'property', 'properties', 'housing', 'apartment', 'apartments']],
    ['lawyer', ['lawyer', 'lawyers', 'legal', 'law', 'attorney']],
    ['car_dealer', ['cardealer', 'carsales', 'automotive', 'autosales', 'vehicle']],
    ['car_rental', ['carrental', 'rentalcar', 'rentacar']],
    ['mobile_shop', ['mobile', 'mobiles', 'phone', 'phones', 'smartphone', 'electronics', 'techshop', 'computer']],
    ['furniture', ['furniture', 'homefurniture', 'decor']],
    ['clothing_store', ['clothing', 'fashion', 'clothes', 'boutique', 'apparel']],
    ['software_company', ['software', 'it', 'technology', 'digital', 'programming', 'webdesign']],
    ['marketing_agency', ['marketing', 'advertising', 'mediaagency', 'agency']],
    ['construction_company', ['construction', 'contractor', 'contractors', 'building']],
    ['architecture', ['architecture', 'architect', 'design']],
    ['photography', ['photography', 'photo', 'studio', 'camera']],
    ['cinema', ['cinema', 'theatre', 'theater', 'movie']],
    ['gaming_center', ['gaming', 'game', 'games', 'playstation']],
    ['pet_shop', ['pet', 'pets', 'veterinary', 'vet']]
  ];

  for (const [categoryId, keywords] of keywordRules) {
    if (keywords.some((keyword) => compact.includes(keyword))) {
      return categoryId;
    }
  }

  return 'other';
}

export default function App() {
  const preferredLang = (localStorage.getItem('preferred_lang') as Language | null);
  const [user, setUser] = useState<any>(authApi.getCurrentUser());
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  
  const [currentLang, setCurrentLang] = useState<Language>(preferredLang || 'ar');
  const [showLanguageGate, setShowLanguageGate] = useState<boolean>(!preferredLang);
  const [selectedGov, setSelectedGov] = useState<GovernorateCode>('all'); // Default: All Iraq
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Saku Maku core Reactive businesses database
  const [businesses, setBusinesses] = useState<Business[]>(() => {
    try {
      const cached = localStorage.getItem('cached_businesses_v1');
      if (!cached) return [];
      const parsed = JSON.parse(cached);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });
  const [businessesLoading, setBusinessesLoading] = useState(false);
  
  // Saku Maku elevated Live Social posts stream
  const [posts, setPosts] = useState<SocialPost[]>([]);
  const [businessesLoadError, setBusinessesLoadError] = useState<string | null>(null);
  const [postsLoadError, setPostsLoadError] = useState<string | null>(null);
  
  // Navigation active tab
  const [activeTab, setActiveTab] = useState<'discover' | 'feed' | 'map' | 'add' | 'about' | 'admin'>('discover');
  
  // Real-time keyword filter
  const [searchQuery, setSearchQuery] = useState('');
  
  // Merchant active story popup state
  const [activeStory, setActiveStory] = useState<string[] | null>(null);
  const [activeStoryIdx, setActiveStoryIdx] = useState(0);
  const [storyProgress, setStoryProgress] = useState(0);
  const [govDropdownOpen, setGovDropdownOpen] = useState(false);
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);

  const t = TRANSLATIONS[currentLang];
  const isRtl = currentLang === 'ar' || currentLang === 'ku';
  const liveDataError = businessesLoadError || postsLoadError;

  const formatLiveDataError = (endpoint: string, error: any) => {
    const status = error?.response?.status ?? 'NETWORK';
    const message = error?.response?.data?.error || error?.message || 'Unknown error';
    return `Could not load live database data (${endpoint}) [${status}] ${message}`;
  };

  // Hero slides persisted locally so admin edits survive refreshes.
  const [heroSlides, setHeroSlides] = useState<HeroSlide[]>(() => {
    try {
      const saved = localStorage.getItem('hero_slides');
      if (!saved) return HERO_SLIDES;
      const parsed = JSON.parse(saved);
      return Array.isArray(parsed) && parsed.length ? parsed : HERO_SLIDES;
    } catch {
      return HERO_SLIDES;
    }
  });

  const handleCustomEmailLogin = async (_customEmail: string) => {};

  useEffect(() => {
    document.documentElement.dir = currentLang === 'en' ? 'ltr' : 'rtl';
    document.documentElement.lang = currentLang;
  }, [currentLang]);

  useEffect(() => {
    const syncAuthState = () => setUser(authApi.getCurrentUser());
    window.addEventListener('auth-changed', syncAuthState);
    return () => window.removeEventListener('auth-changed', syncAuthState);
  }, []);

  useEffect(() => {
    if (!user) {
      setUserProfile(null);
      setIsAdmin(false);
      return;
    }

    const localEmail = String(user.email || '').toLowerCase();
    setIsAdmin(user.role === 'admin' || localEmail === 'safaribosafar@gmail.com');
    setUserProfile((prev) => ({
      uid: String(user.id || prev?.uid || localEmail),
      displayName: user.name || user.email?.split('@')[0] || 'User',
      photoURL: '',
      email: user.email,
      createdAt: prev?.createdAt || new Date().toISOString(),
      role: localEmail === 'safaribosafar@gmail.com' ? 'admin' : (user.role || prev?.role || 'user'),
      onboarded: true,
      businessId: null
    }));
    authApi.getMe()
      .then((me) => {
        const meEmail = String(me.email || '').toLowerCase();
        const role = meEmail === 'safaribosafar@gmail.com' ? 'admin' : ((me.role as any) || 'user');

        setUserProfile({
          uid: me.id,
          displayName: me.name || me.email.split('@')[0],
          photoURL: '',
          email: me.email,
          createdAt: new Date().toISOString(),
          role,
          onboarded: true,
          businessId: null
        });
        setIsAdmin(role === 'admin');
      })
      .catch((error) => {
        console.warn('Using local auth profile because /auth/me failed:', error);
      });
  }, [user]);

  useEffect(() => {
    try {
      const safeHeroSlides = heroSlides.map((slide) => {
        const image = String(slide.image || '');

        // Browser localStorage is small. Large uploaded base64 images can crash the app.
        // Keep URL images, but do not persist huge base64 images.
        if (image.startsWith('data:image') && image.length > 350000) {
          return {
            ...slide,
            image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1400&auto=format&fit=crop&q=85'
          };
        }

        return slide;
      });

      const payload = JSON.stringify(safeHeroSlides);

      // Keep localStorage payload under a safer size.
      if (payload.length > 3000000) {
        console.warn('hero_slides too large for localStorage; clearing saved hero slides.');
        localStorage.removeItem('hero_slides');
        return;
      }

      localStorage.setItem('hero_slides', payload);
    } catch (error) {
      console.warn('Could not save hero_slides to localStorage:', error);
      try {
        localStorage.removeItem('hero_slides');
      } catch {}
    }
  }, [heroSlides]);

  // Secure logout
  const handleSecureLogout = async () => {
    try {
      await authApi.logout();
      setUser(null);
      setUserProfile(null);
      setIsAdmin(false);
      setActiveTab('discover');
      sessionStorage.clear();
      console.log("Session terminated.");
    } catch (err) {
      console.error("Logout error: ", err);
    }
  };

  const handleUpdateRole = async (newRole: 'user' | 'owner' | 'admin') => {
    // Role updates would need Firestore support
    console.log("Role update not implemented yet");
  };

  const handleUpdateProfile = async (updatedFields: Partial<UserProfile>) => {
    // Profile updates would need Firestore support
    console.log("Profile update not implemented yet");
  };

  // Fetch ALL businesses from API, page by page.
  // Important: do not send governorate/category filters here.
  // We load the full backend dataset first, then filter locally below.
  // This prevents empty results when the backend and frontend use different category/governorate labels.
  useEffect(() => {
    let cancelled = false;

    const transformBusiness = (biz: any): Business => {
      const category = normalizeCategory(biz.category);
      const governorate = normalizeGovernorate(biz.governorate);
      const sourceImages = biz.images ? String(biz.images).split(',').map((value) => value.trim()).filter(Boolean) : [];
      const cleanSourceImages = sourceImages.filter((value) => !isLikelyGenericBusinessImage(value));
      const mainImage = resolveBusinessCardImage(biz.image || cleanSourceImages[0], category, biz.id);
      const gallery = [mainImage, ...cleanSourceImages.filter((value) => value !== mainImage)];

      return {
        id: String(biz.id),
        name: {
          ar: biz.name_ar || biz.name_en || '',
          ku: biz.name_ku || biz.name_en || '',
          en: biz.name_en || ''
        },
        description: {
          ar: biz.description_ar || '',
          ku: biz.description_ku || '',
          en: biz.description_en || ''
        },
        category,
        governorate,
        rating: Number(biz.rating || 0),
        reviewsCount: Number(biz.reviews_count || 0),
        image: mainImage,
        images: gallery.length > 0 ? gallery : [FALLBACK_BUSINESS_IMAGE],
        avatar: biz.avatar || FALLBACK_AVATAR,
        isVerified: Boolean(biz.is_verified),
        phoneNumber: biz.phone_number || '',
        address: {
          ar: biz.address_ar || '',
          ku: biz.address_ku || '',
          en: biz.address_en || ''
        },
        likes: Number(biz.likes || biz.like_count || 0),
        saves: Number(biz.saves || biz.save_count || 0),
        mapCoords: { x: Number(biz.map_coords_x || 0), y: Number(biz.map_coords_y || 0) },
        likedByUser: false,
        savedByUser: false
      };
    };

    const fetchBusinesses = async () => {
      try {
        setBusinessesLoading(true);
        const limit = 50;
        const maxPages = 100;
        const allRows: any[] = [];
        const seenIds = new Set<string>();

        for (let page = 1; page <= maxPages; page += 1) {
          const response = await businessesApi.list({ page, limit });
          const rows = normalizeList(response);

          if (rows.length === 0) break;

          let newRowsThisPage = 0;

          for (const row of rows) {
            const id = String(row?.id || '');
            if (!id) continue;
            if (seenIds.has(id)) continue;
            seenIds.add(id);
            allRows.push(row);
            newRowsThisPage += 1;
          }

          if (newRowsThisPage === 0) break;
          // Keep going until an empty or duplicate page. Backend may cap page size.
        }

        if (cancelled) return;

        const transformedBusinesses = allRows.map(transformBusiness);

        console.log("[ShakuMaku] all businesses loaded:", transformedBusinesses.length);

        const dedupedBusinesses = dedupeBusinessesByIdentity(transformedBusinesses);
        setBusinesses(dedupedBusinesses);
        localStorage.setItem('cached_businesses_v1', JSON.stringify(dedupedBusinesses));
        setBusinessesLoadError(null);
      } catch (error) {
        console.error("Error fetching all businesses from API:", error);
        if (cancelled) return;

        // Keep cached/previous businesses visible instead of clearing the screen.
        setBusinessesLoadError(formatLiveDataError('/api/businesses', error));
      } finally {
        if (!cancelled) {
          setBusinessesLoading(false);
        }
      }
    };

    fetchBusinesses();

    return () => {
      cancelled = true;
    };
  }, []);

  // Fetch posts from API
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await postsApi.list({ limit: 50 });
        const transformedPosts: SocialPost[] = (response || []).map((post: any) => ({
          id: post.id,
          businessId: post.business_id,
          businessName: post.business_name_ar || post.business_name_en || '',
          businessAvatar: post.business_avatar || FALLBACK_AVATAR,
          category: normalizeCategory(post.category),
          governorate: normalizeGovernorate(post.governorate),
          mediaUrl: post.media_url || '',
          caption: {
            ar: post.caption_ar || '',
            ku: post.caption_ku || '',
            en: post.caption_en || ''
          },
          likes: Number(post.likes || 0),
          commentsCount: Number(post.comments_count || 0),
          shares: Number(post.shares || 0),
          views: Number(post.views || 0),
          timeAgo: { ar: 'الآن', ku: 'ئێستا', en: 'Just now' },
          likedByUser: false,
          savedByUser: false,
          comments: [],
          promotionBadge: post.promotion_badge_en || post.promotion_badge_ar || post.promotion_badge_ku ? {
            ar: post.promotion_badge_ar || '',
            ku: post.promotion_badge_ku || '',
            en: post.promotion_badge_en || ''
          } : undefined,
          videoUrl: post.video_url || undefined,
          fileAttachment: post.file_attachment_name ? {
            name: post.file_attachment_name,
            size: String(post.file_attachment_size || ''),
            type: post.file_attachment_type || undefined
          } : undefined,
          authorUid: post.author_id || undefined
        }));
        setPosts(transformedPosts);
        setPostsLoadError(null);
      } catch (error) {
        console.error("Error fetching posts from API:", error);
        setPosts([]);
        setPostsLoadError(formatLiveDataError('/api/feed/business-posts', error));
      }
    };

    fetchPosts();
  }, []);

  // Filter business array based on search input + governorate matches + category
  const filteredBusinesses = useMemo(() => {
    return businesses.filter(b => {
      // Governorate Match
      const govMatch = selectedGov === 'all' || normalizeGovernorate(b.governorate) === normalizeGovernorate(selectedGov);

      // Category Match
      const catMatch = !selectedCategory || normalizeCategory(b.category) === normalizeCategory(selectedCategory);
      
      // Keyword Match (case-insensitive across translated fields)
      const keyword = searchQuery.toLowerCase().trim();
      const keywordMatch = !keyword || 
        b.name[currentLang].toLowerCase().includes(keyword) ||
        b.name.en.toLowerCase().includes(keyword) ||
        b.description[currentLang].toLowerCase().includes(keyword) ||
        b.address[currentLang].toLowerCase().includes(keyword) ||
        b.category.toLowerCase().includes(keyword);
        
      return govMatch && catMatch && keywordMatch;
    });
  }, [businesses, selectedGov, selectedCategory, searchQuery, currentLang]);

  // Handle Likes state toggle (local state for now, API support needed)
  const handleToggleLike = async (bizId: string) => {
    const target = businesses.find(b => b.id === bizId);
    if (!target) return;
    const liked = !target.likedByUser;
    setBusinesses(businesses.map(b => 
      b.id === bizId 
        ? { ...b, likedByUser: liked, likes: liked ? b.likes + 1 : b.likes - 1 }
        : b
    ));
    // TODO: Call API to persist like
  };

  // Handle Saves state toggle (local state for now, API support needed)
  const handleToggleSave = async (bizId: string) => {
    const target = businesses.find(b => b.id === bizId);
    if (!target) return;
    const saved = !target.savedByUser;
    setBusinesses(businesses.map(b => 
      b.id === bizId 
        ? { ...b, savedByUser: saved, saves: saved ? b.saves + 1 : b.saves - 1 }
        : b
    ));
    // TODO: Call API to persist save
  };

  // Callback to add a new business (API support needed)
  const handleAddLiveBusiness = async (newBiz: Omit<Business, 'rating' | 'reviewsCount' | 'likes' | 'saves'>) => {
    console.log("Add business not implemented in backend yet");
    // TODO: Call API to create business
  };

  // Stories auto advancing timer handler
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (activeStory) {
      interval = setInterval(() => {
        setStoryProgress(prev => {
          if (prev >= 100) {
            // Next image or close stories
            if (activeStoryIdx < activeStory.length - 1) {
              setActiveStoryIdx(prevIdx => prevIdx + 1);
              return 0;
            } else {
              // Close
              setActiveStory(null);
              setActiveStoryIdx(0);
              return 0;
            }
          }
          return prev + 2.5; // reaches 100 in 4s
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [activeStory, activeStoryIdx]);

  const handleNextStoryImg = () => {
    if (activeStory && activeStoryIdx < activeStory.length - 1) {
      setActiveStoryIdx(activeStoryIdx + 1);
      setStoryProgress(0);
    } else {
      setActiveStory(null);
      setActiveStoryIdx(0);
    }
  };

  const handlePrevStoryImg = () => {
    if (activeStory && activeStoryIdx > 0) {
      setActiveStoryIdx(activeStoryIdx - 1);
      setStoryProgress(0);
    }
  };

  const chooseLanguage = (lang: Language) => {
    setCurrentLang(lang);
    localStorage.setItem('preferred_lang', lang);
    setShowLanguageGate(false);
  };

  if (showLanguageGate) {
    return (
      <div className="min-h-screen bg-[#1A1A1A] flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-[#111] border border-luxury-gold/30 rounded-3xl p-6 space-y-4 text-center">
          <h2 className="text-white font-black text-xl">Choose Language</h2>
          <p className="text-zinc-400 text-sm">اختر لغتك / زمانەکەت هەڵبژێرە</p>
          <button onClick={() => chooseLanguage('ar')} className="w-full py-3 rounded-2xl bg-gradient-to-r from-luxury-teal to-luxury-gold text-white font-black cursor-pointer">العربية</button>
          <button onClick={() => chooseLanguage('ku')} className="w-full py-3 rounded-2xl bg-gradient-to-r from-luxury-teal to-luxury-gold text-white font-black cursor-pointer">کوردی</button>
          <button onClick={() => chooseLanguage('en')} className="w-full py-3 rounded-2xl bg-gradient-to-r from-luxury-teal to-luxury-gold text-white font-black cursor-pointer">English</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-luxury-neutral pb-28 text-[#1A1A1A] flex flex-col selection:bg-luxury-gold selection:text-[#1A1A1A] relative overflow-hidden" dir={isRtl ? 'rtl' : 'ltr'}>
      
      {/* Elegant Warm Luxury Atmosphere Glow */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-5%] left-[-5%] w-[450px] h-[450px] bg-luxury-gold/10 rounded-full blur-[130px]"></div>
        <div className="absolute bottom-[-5%] right-[-5%] w-[450px] h-[450px] bg-luxury-teal/5 rounded-full blur-[130px]"></div>
      </div>

      {/* Dynamic Saku Maku top header */}
<PWAInstallButton currentLang={currentLang} />

      <Header
        currentLang={currentLang}
        onChangeLang={(lang) => {
          setCurrentLang(lang);
          localStorage.setItem('preferred_lang', lang);
          // Sync HTML document direction and language attributes for responsive RTL/LTR transition support
          document.documentElement.dir = lang === 'en' ? 'ltr' : 'rtl';
          document.documentElement.lang = lang;
        }}
        selectedGov={selectedGov}
        onChangeGov={(gov) => {
          setSelectedGov(gov);
          // Auto scroll to discovery catalog on change
          setActiveTab('discover');
        }}
        user={user}
        userProfile={userProfile}
        onSignIn={() => setAuthModalOpen(true)}
        onSignOut={handleSecureLogout}
        onUpdateRole={handleUpdateRole}
        activeTab={activeTab}
        onChangeTab={(tab: any) => setActiveTab(tab)}
        onCustomEmailLogin={handleCustomEmailLogin}
      />

      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        currentLang={currentLang}
        onCustomEmailLogin={handleCustomEmailLogin}
      />

      <main className="flex-grow max-w-7xl w-full mx-auto px-4 py-6">
        {liveDataError && (
          <div className="mb-5 max-w-3xl mx-auto bg-red-950/85 border border-red-400/40 rounded-xl px-4 py-3 text-red-100 text-xs md:text-sm font-medium">
            {liveDataError}
          </div>
        )}


        {/* Global Search Interface bar */}
        <div className="mb-8 max-w-xl mx-auto relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-luxury-teal to-luxury-gold rounded-2xl blur opacity-35 group-hover:opacity-60 transition duration-500"></div>
          <div className="relative flex items-center bg-[#1A1A1A]/90 rounded-2xl border border-luxury-gold/30 overflow-hidden px-4.5 py-1">
            <Search className="w-4.5 h-4.5 text-luxury-gold shrink-0" />
            
            <input
              type="text"
              placeholder={t.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                // switch tab immediately to discovery catalogue on search
                if (activeTab !== 'discover') setActiveTab('discover');
              }}
              className="w-full bg-transparent text-white text-xs px-3 py-3 focus:outline-none placeholder-zinc-500 font-medium"
            />

            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="p-1 rounded-full bg-zinc-800 hover:bg-zinc-750 text-zinc-400 hover:text-white transition cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Cinematic Auto Sliding Hero Banner */}
        <Hero
          currentLang={currentLang}
          slides={heroSlides}
          isAdmin={isAdmin}
          setSlides={setHeroSlides}
          onExploreClick={() => {
            setActiveTab('discover');
            const catElem = document.getElementById('discovery-catalog-section');
            if (catElem) catElem.scrollIntoView({ behavior: 'smooth' });
          }}
          onSelectGov={(gov) => {
            setSelectedGov(gov);
            setActiveTab('discover');
          }}
        />

        {/* Custom Premium Governorate & Category Filtering Dropdowns (Directly beneath Hero Banner) */}
        <div className="mb-6 max-w-sm mx-auto px-2 space-y-4 relative z-30">
          <div>
            <div className="text-[10px] font-black text-luxury-gold uppercase tracking-wider mb-1.5 text-center flex items-center justify-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-luxury-gold shrink-0" />
              <span>{currentLang === 'en' ? 'Select Iraqi Governorate / Region' : currentLang === 'ku' ? 'پارێزگایەک دەستنیشان بکە' : 'اختر المحافظة العراقية لتصفح المتاجر'}</span>
            </div>
            
            <div className="relative">
              <button
                onClick={() => {
                  setGovDropdownOpen(!govDropdownOpen);
                  setCategoryDropdownOpen(false);
                }}
                className="w-full flex items-center justify-between text-xs font-bold bg-[#16161a] hover:bg-[#1f1f26] text-white px-4 py-3 rounded-xl border border-luxury-gold/30 hover:border-luxury-gold/60 transition-all shadow-xl shadow-black/40 cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <span className="text-base">📍</span>
                  <span>{GOVERNORATES.find(g => g.code === selectedGov)?.name[currentLang]}</span>
                </div>
                <ChevronDown className={`w-4 h-4 text-luxury-gold transition-transform duration-300 ${govDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {govDropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-1.5 bg-[#121215] border border-luxury-gold/20 rounded-xl shadow-2xl p-1 z-50 grid grid-cols-2 gap-1 animate-fade-in max-h-[220px] overflow-y-auto custom-scrollbar font-sans">
                  {GOVERNORATES.map((gov) => (
                    <button
                      key={gov.code}
                      onClick={() => {
                        setSelectedGov(gov.code);
                        setGovDropdownOpen(false);
                        setActiveTab('discover');
                      }}
                      className={`text-left px-2.5 py-1.5 text-[11px] rounded-lg flex items-center justify-between transition-all cursor-pointer ${
                        selectedGov === gov.code
                          ? 'bg-gradient-to-r from-luxury-teal to-luxury-gold/85 text-white font-extrabold shadow'
                          : 'text-zinc-300 hover:bg-white/5 font-semibold'
                      }`}
                    >
                      <span className="truncate">{gov.name[currentLang]}</span>
                      {selectedGov === gov.code && <span className="text-[9px]">✨</span>}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div>
            <div className="text-[10px] font-black text-luxury-gold uppercase tracking-wider mb-1.5 text-center flex items-center justify-center gap-1.5">
              <span>{currentLang === 'en' ? '🔍 Filter by Category' : currentLang === 'ku' ? '🔍 بەپێی پۆل دەستنیشان بکە' : '🔍 تصفية حسب الفئة'}</span>
            </div>
            
            <div className="relative">
              <button
                onClick={() => {
                  setCategoryDropdownOpen(!categoryDropdownOpen);
                  setGovDropdownOpen(false);
                }}
                className="w-full flex items-center justify-between text-xs font-bold bg-[#16161a] hover:bg-[#1f1f26] text-white px-4 py-3 rounded-xl border border-luxury-gold/30 hover:border-luxury-gold/60 transition-all shadow-xl shadow-black/40 cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <span className="text-base">
                    {selectedCategory ? CATEGORIES.find(c => c.id === selectedCategory)?.icon || '🏢' : '🏢'}
                  </span>
                  <span>
                    {selectedCategory 
                      ? CATEGORIES.find(c => c.id === selectedCategory)?.name[currentLang] 
                      : (currentLang === 'en' ? 'All Categories' : currentLang === 'ku' ? 'هەموو پۆلەکان' : 'جميع الفئات')}
                  </span>
                </div>
                <ChevronDown className={`w-4 h-4 text-luxury-gold transition-transform duration-300 ${categoryDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {categoryDropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-1.5 bg-[#121215] border border-luxury-gold/20 rounded-xl shadow-2xl p-1 z-50 grid grid-cols-2 gap-1 animate-fade-in max-h-[220px] overflow-y-auto custom-scrollbar font-sans animate-fade-in">
                  <button
                    onClick={() => {
                      setSelectedCategory(null);
                      setCategoryDropdownOpen(false);
                      setActiveTab('discover');
                    }}
                    className={`text-left px-2.5 py-1.5 text-[11px] rounded-lg flex items-center justify-between transition-all cursor-pointer ${
                      selectedCategory === null
                        ? 'bg-gradient-to-r from-luxury-teal to-luxury-gold/85 text-white font-extrabold shadow'
                        : 'text-zinc-300 hover:bg-white/5 font-semibold'
                    }`}
                  >
                    <span>🍔 {currentLang === 'en' ? 'All Categories' : currentLang === 'ku' ? 'هەموو پۆلەکان' : 'جميع الفئات'}</span>
                    {selectedCategory === null && <span className="text-[9px]">✨</span>}
                  </button>

                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => {
                        setSelectedCategory(cat.id);
                        setCategoryDropdownOpen(false);
                        setActiveTab('discover');
                      }}
                      className={`text-left px-2.5 py-1.5 text-[11px] rounded-lg flex items-center justify-between transition-all cursor-pointer ${
                        selectedCategory === cat.id
                          ? 'bg-gradient-to-r from-luxury-teal to-luxury-gold/85 text-white font-extrabold shadow'
                          : 'text-zinc-300 hover:bg-white/5 font-semibold'
                      }`}
                    >
                      <span className="truncate">{cat.icon} {cat.name[currentLang]}</span>
                      {selectedCategory === cat.id && <span className="text-[9px]">✨</span>}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Dynamic Dual Discovery Buttons (Optimized: Square, side-by-side on mobile layout) */}
        <div className="mt-6 mb-8 grid grid-cols-2 gap-3.5 max-w-xl mx-auto px-2">
          {/* Button: Main category of businesses */}
          <button
            onClick={() => {
              setActiveTab('discover');
              const catElem = document.getElementById('discovery-catalog-section');
              if (catElem) catElem.scrollIntoView({ behavior: 'smooth' });
            }}
            className={`flex flex-col items-center justify-center p-4 rounded-3xl border aspect-square text-center transition-all duration-300 transform hover:scale-[1.02] cursor-pointer relative group overflow-hidden ${
              activeTab === 'discover'
                ? 'bg-[#1A1A1A] border-[#0F2E2F] text-white shadow-xl shadow-[#0F2E2F]/15'
                : 'bg-white border-zinc-200 text-zinc-800 hover:border-luxury-gold hover:bg-zinc-50/50'
            }`}
          >
            <div className={`w-11 h-11 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center text-xl sm:text-2xl mb-2 sm:mb-3 transition-colors duration-300 shrink-0 ${
              activeTab === 'discover' ? 'bg-[#0F2E2F]/80 text-luxury-gold' : 'bg-zinc-100 text-zinc-500 group-hover:bg-luxury-gold/10 group-hover:text-luxury-gold'
            }`}>
              🏢
            </div>
            
            <span className={`text-xs sm:text-sm md:text-base font-black block leading-tight tracking-tight ${activeTab === 'discover' ? 'text-white' : 'text-[#1A1A1A]'}`}>
              {currentLang === 'en' ? 'Businesses' : currentLang === 'ku' ? 'شوێنەکان' : 'المحلات'}
            </span>
            
            <span className={`text-[9px] sm:text-[10px] md:text-[11px] leading-tight font-medium mt-1 sm:mt-1.5 block opacity-70 px-1 line-clamp-2 max-w-full ${activeTab === 'discover' ? 'text-zinc-300' : 'text-zinc-500'}`}>
              {currentLang === 'en' ? 'Explore cafes & spas' : currentLang === 'ku' ? 'گەڕان بەدوای پۆلەکاندا' : 'استكشف المحلات والخدمات'}
            </span>
            
            <div className={`absolute bottom-3 text-xs font-bold transition-opacity transition-transform duration-300 ${activeTab === 'discover' ? 'text-luxury-gold opacity-100' : 'text-zinc-400 opacity-0 group-hover:opacity-100 translateY(2px)'}`}>
              ➔
            </div>
          </button>

          {/* Button: Social media Pulse Feed */}
          <button
            onClick={() => {
              setActiveTab('feed');
              const catElem = document.getElementById('discovery-catalog-section');
              if (catElem) catElem.scrollIntoView({ behavior: 'smooth' });
            }}
            className={`flex flex-col items-center justify-center p-4 rounded-3xl border aspect-square text-center transition-all duration-300 transform hover:scale-[1.02] cursor-pointer relative group overflow-hidden ${
              activeTab === 'feed'
                ? 'bg-[#1A1A1A] border-[#0F2E2F] text-white shadow-xl shadow-[#0F2E2F]/15'
                : 'bg-white border-zinc-200 text-zinc-800 hover:border-luxury-gold hover:bg-zinc-50/50'
            }`}
          >
            <div className={`w-11 h-11 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center text-xl sm:text-2xl mb-2 sm:mb-3 relative transition-colors duration-300 shrink-0 ${
              activeTab === 'feed' ? 'bg-[#0F2E2F]/80 text-luxury-gold' : 'bg-zinc-100 text-zinc-500 group-hover:bg-luxury-gold/10 group-hover:text-luxury-gold'
            }`}>
              📸
              <span className="absolute -top-1 -right-1 w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-red-550 bg-red-500 animate-ping"></span>
            </div>
            
            <span className={`text-xs sm:text-sm md:text-base font-black block leading-tight tracking-tight ${activeTab === 'feed' ? 'text-white' : 'text-[#1A1A1A]'}`}>
              {currentLang === 'en' ? 'Social Feed' : currentLang === 'ku' ? 'پۆستە نوێکان' : 'نبض الشارع'}
            </span>
            
            <span className={`text-[9px] sm:text-[10px] md:text-[11px] leading-tight font-medium mt-1 sm:mt-1.5 block opacity-70 px-1 line-clamp-2 max-w-full ${activeTab === 'feed' ? 'text-zinc-300' : 'text-zinc-500'}`}>
              {currentLang === 'en' ? 'Stories & photo updates' : currentLang === 'ku' ? 'بڵاوکراوەکان و وێنەکان' : 'عروض ومشاركات حية'}
            </span>

            <div className={`absolute bottom-3 text-xs font-bold transition-opacity transition-transform duration-300 ${activeTab === 'feed' ? 'text-luxury-gold opacity-100' : 'text-zinc-400 opacity-0 group-hover:opacity-100 translateY(2px)'}`}>
              ➔
            </div>
          </button>
        </div>

        {/* Core Dashboard Content Switcher tabs */}
        <div id="discovery-catalog-section" className="space-y-6">
          
          <AnimatePresence mode="wait">
            {activeTab === 'discover' && (
              <motion.div
                key="discover"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="space-y-6"
              >
                {/* Category Square discovery grid */}
                <CategorySwiper
                  currentLang={currentLang}
                  selectedCategory={selectedCategory}
                  onSelectCategory={setSelectedCategory}
                />

                {/* Saku Maku Dynamic Grouped Businesses section catalog */}
                <BusinessFeed
                  currentLang={currentLang}
                  selectedGov={selectedGov}
                  selectedCategory={selectedCategory}
                  businesses={filteredBusinesses}
                  businessesLoading={businessesLoading}
                  onToggleLike={handleToggleLike}
                  onToggleSave={handleToggleSave}
                  onSelectStory={(stories) => {
                    setActiveStory(stories);
                    setActiveStoryIdx(0);
                    setStoryProgress(0);
                  }}
                  isAdmin={isAdmin}
                  setBusinesses={setBusinesses}
                />
              </motion.div>
            )}

            {activeTab === 'feed' && (
              <motion.div
                key="feed"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
              >
                {/* Visual Instagram style reels feed list */}
                <SocialFeed
                  currentLang={currentLang}
                  selectedGov={selectedGov}
                  posts={posts}
                  setPosts={setPosts}
                  onSignIn={() => setAuthModalOpen(true)}
                  user={user}
                />
              </motion.div>
            )}

            {activeTab === 'map' && (
              <motion.div
                key="map"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
              >
                {/* Immersive interactive vector radar pins map */}
                <InteractiveMap
                  currentLang={currentLang}
                  selectedGov={selectedGov}
                  onSelectGov={setSelectedGov}
                  businesses={businesses}
                />
              </motion.div>
            )}

            {activeTab === 'add' && (
              <motion.div
                key="add"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
              >
                {/* Submitting claim form for local owners OR active Owner Campaign Dashboard */}
                <AddBusinessForm
                  currentLang={currentLang}
                  onAddBusiness={handleAddLiveBusiness}
                  user={user}
                  userProfile={userProfile}
                  onUpdateProfile={handleUpdateProfile}
                  onSignIn={() => setAuthModalOpen(true)}
                  businesses={businesses}
                  posts={posts}
                />
              </motion.div>
            )}

            {activeTab === 'about' && (
              <motion.div
                key="about"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
              >
                {/* Local mission statement panel */}
                <AboutSakuMaku currentLang={currentLang} />
              </motion.div>
            )}

            {activeTab === 'admin' && (
              <motion.div
                key="admin"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
              >
                {/* Admin moderation control tower */}
                <AdminPanel
                  currentLang={currentLang}
                  businesses={businesses}
                  setBusinesses={setBusinesses}
                  posts={posts}
                  setPosts={setPosts}
                  userProfile={userProfile}
                  heroSlides={heroSlides}
                  setHeroSlides={setHeroSlides}
                />
              </motion.div>
            )}
          </AnimatePresence>

        </div>

      </main>

      {/* Floating Modern bottom-menu navigation bar (optimized for youth mobile thumb-reach) */}
      <div className="fixed bottom-6 inset-x-4 max-w-lg mx-auto bg-[#1A1A1A]/95 backdrop-blur-xl border border-luxury-gold/35 px-4.5 py-2.5 rounded-[24px] shadow-2xl z-40 flex items-center justify-between gap-1 select-none">
        
        <button
          onClick={() => setActiveTab('discover')}
          className={`flex flex-col items-center justify-center flex-1 py-1 px-2.5 rounded-xl transition-all duration-300 cursor-pointer ${
            activeTab === 'discover'
              ? 'text-luxury-gold font-bold bg-white/5 border border-luxury-gold/25'
              : 'text-zinc-400 hover:text-white'
          }`}
          id="nav-tab-discover"
        >
          <Compass className="w-5 h-5 mb-1" />
          <span className="text-[9px] font-black tracking-tight">{t.exploreTab.split(' ')[0]}</span>
        </button>

        <button
          onClick={() => setActiveTab('feed')}
          className={`flex flex-col items-center justify-center flex-1 py-1 px-2.5 rounded-xl transition-all duration-300 cursor-pointer ${
            activeTab === 'feed'
              ? 'text-luxury-gold font-bold bg-white/5 border border-luxury-gold/25'
              : 'text-zinc-400 hover:text-white'
          }`}
          id="nav-tab-feed"
        >
          <div className="relative">
            <Flame className="w-5 h-5 mb-1 text-inherit" />
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
          </div>
          <span className="text-[9px] font-black tracking-tight">Pulse Feed</span>
        </button>

        <button
          onClick={() => setActiveTab('map')}
          className={`flex flex-col items-center justify-center flex-1 py-1 px-2.5 rounded-xl transition-all duration-300 cursor-pointer ${
            activeTab === 'map'
              ? 'text-luxury-gold font-bold bg-white/5 border border-luxury-gold/25'
              : 'text-zinc-400 hover:text-white'
          }`}
          id="nav-tab-map"
        >
          <Map className="w-5 h-5 mb-1" />
          <span className="text-[9px] font-black tracking-tight">{t.mapTab.split(' ')[0]}</span>
        </button>

        <button
          onClick={() => setActiveTab('add')}
          className={`flex flex-col items-center justify-center flex-1 py-1 px-2.5 rounded-xl transition-all duration-300 cursor-pointer ${
            activeTab === 'add'
              ? 'text-luxury-coral font-bold bg-white/5 border border-luxury-coral/25'
              : 'text-zinc-400 hover:text-white'
          }`}
          id="nav-tab-add"
        >
          <PlusCircle className="w-5 h-5 mb-1" />
          <span className="text-[9px] font-black tracking-tight">Host</span>
        </button>

        <button
          onClick={() => setActiveTab('about')}
          className={`flex flex-col items-center justify-center flex-1 py-1 px-2.5 rounded-xl transition-all duration-300 cursor-pointer ${
            activeTab === 'about'
              ? 'text-luxury-gold font-bold bg-white/5 border border-luxury-gold/25'
              : 'text-zinc-400 hover:text-white'
          }`}
          id="nav-tab-about"
        >
          <BookOpen className="w-5 h-5 mb-1" />
          <span className="text-[9px] font-black tracking-tight">Mission</span>
        </button>

        <button
          onClick={() => setActiveTab('admin')}
          className={`flex flex-col items-center justify-center flex-1 py-1 px-2.5 rounded-xl transition-all duration-300 cursor-pointer ${
            activeTab === 'admin'
              ? 'text-luxury-gold font-bold bg-white/5 border border-luxury-gold/25'
              : 'text-zinc-400 hover:text-white/80'
          }`}
          id="nav-tab-admin"
        >
          <Lock className="w-5 h-5 mb-1" />
          <span className="text-[9px] font-black tracking-tight">Admin</span>
        </button>
        
      </div>

      {/* Full screen merchant stories slide player (Auto playing and manual controller) */}
      <AnimatePresence>
        {activeStory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black backdrop-blur-3xl flex flex-col items-center justify-center p-4 select-none"
            onClick={() => setActiveStory(null)}
          >
            <div
              className="relative w-full max-w-sm h-[75vh] md:h-[80vh] rounded-3xl overflow-hidden bg-zinc-950 border border-zinc-800 flex items-center justify-center shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              
              {/* Slides loading progress bar indicators */}
              <div className="absolute top-4 inset-x-4 z-10 flex gap-1">
                {activeStory.map((_, idx) => (
                  <div key={idx} className="h-1 bg-zinc-800 rounded-full flex-1 overflow-hidden">
                    <div 
                      className="h-full bg-cyan-400 transition-all duration-100 ease-linear"
                      style={{ 
                        width: idx < activeStoryIdx 
                          ? '100%' 
                          : idx === activeStoryIdx 
                            ? `${storyProgress}%` 
                            : '0%' 
                      }}
                    ></div>
                  </div>
                ))}
              </div>

              {/* Story Header */}
              <div className="absolute top-8 inset-x-4 z-10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full border border-pink-400 p-0.5 overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=50&auto=format&fit=crop&q=80"
                      alt="Merchant Story avatar"
                      className="w-full h-full rounded-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white block">Saku Maku Partner</span>
                    <span className="text-[9px] text-zinc-400 block font-mono">Baghdad Local Campaign</span>
                  </div>
                </div>

                <button 
                  onClick={() => setActiveStory(null)}
                  className="p-1.5 rounded-full bg-slate-900/60 hover:bg-slate-900 text-white/85"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Story main photograh content */}
              <img
                src={activeStory[activeStoryIdx]}
                alt="Active Saku Maku Story Broadcast"
                className="w-full h-full object-cover select-none pointer-events-none"
                referrerPolicy="no-referrer"
              />

              {/* Story navigation gestures drawers */}
              <div className="absolute inset-y-16 inset-x-0 flex justify-between">
                <button 
                  onClick={handlePrevStoryImg}
                  className="w-1/3 h-full cursor-west-resize hover:bg-white/5 transition duration-300"
                  aria-label="Previous story page"
                ></button>
                <button 
                  onClick={handleNextStoryImg}
                  className="w-1/3 h-full cursor-east-resize hover:bg-white/5 transition duration-300"
                  aria-label="Next story page"
                ></button>
              </div>

              {/* Bottom detail engagement row */}
              <div className="absolute bottom-6 inset-x-4 z-10 flex items-center justify-between bg-gradient-to-t from-black/85 to-transparent p-3 rounded-xl border border-zinc-900/40 backdrop-blur-sm">
                <div className="flex flex-col">
                  <span className="text-[10px] text-cyan-400 font-extrabold flex items-center gap-1 uppercase">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Exclusive Trend</span>
                  </span>
                  <span className="text-xs text-zinc-200 mt-1">Tap left/right to browse slide</span>
                </div>

                <div className="flex gap-2">
                  <button 
                    onClick={() => setStoryProgress(prev => Math.min(prev + 10, 100))}
                    className="p-2 rounded-full bg-pink-600/80 text-white hover:scale-105 transition"
                  >
                    <Heart className="w-4 h-4 fill-white" />
                  </button>
                </div>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
