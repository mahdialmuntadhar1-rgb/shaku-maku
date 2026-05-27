import { Governorate, Category, Business, SocialPost, HeroSlide } from './types';

export const GOVERNORATES: Governorate[] = [
  {
    code: 'all',
    name: {
      ar: 'كل العراق 🇮🇶',
      ku: 'هەموو عێراق 🇮🇶',
      en: 'All Iraq 🇮🇶'
    },
    englishLabel: 'All Iraq'
  },
  {
    code: 'baghdad',
    name: {
      ar: 'بغداد 🏰',
      ku: 'بەغداد 🏰',
      en: 'Baghdad 🏰'
    },
    englishLabel: 'Baghdad'
  },
  {
    code: 'erbil',
    name: {
      ar: 'أربيل 🏔️',
      ku: 'هەولێر 🏔️',
      en: 'Erbil 🏔️'
    },
    englishLabel: 'Erbil'
  },
  {
    code: 'basra',
    name: {
      ar: 'البصرة 🌴',
      ku: 'بەسرە 🌴',
      en: 'Basra 🌴'
    },
    englishLabel: 'Basra'
  },
  {
    code: 'sulaymaniyah',
    name: {
      ar: 'السليمانية 🌸',
      ku: 'سلێمانی 🌸',
      en: 'Sulaymaniyah 🌸'
    },
    englishLabel: 'Sulaymaniyah'
  },
  {
    code: 'mosul',
    name: {
      ar: 'الموصل 🍏',
      ku: 'مووسڵ 🍏',
      en: 'Mosul 🍏'
    },
    englishLabel: 'Mosul'
  },
  {
    code: 'najaf',
    name: {
      ar: 'النجف ✨',
      ku: 'نەجەف ✨',
      en: 'Najaf ✨'
    },
    englishLabel: 'Najaf'
  },
  {
    code: 'karbala',
    name: {
      ar: 'كربلاء 🕌',
      ku: 'کەربەلا 🕌',
      en: 'Karbala 🕌'
    },
    englishLabel: 'Karbala'
  },
  {
    code: 'kirkuk',
    name: {
      ar: 'كركوك 🛢️',
      ku: 'کەرکووک 🛢️',
      en: 'Kirkuk 🛢️'
    },
    englishLabel: 'Kirkuk'
  },
  {
    code: 'anbar',
    name: {
      ar: 'الأنبار 🌵',
      ku: 'ئەنبار 🌵',
      en: 'Anbar 🌵'
    },
    englishLabel: 'Anbar'
  },
  {
    code: 'duhok',
    name: {
      ar: 'دهوك 🏔️',
      ku: 'دهۆک 🏔️',
      en: 'Duhok 🏔️'
    },
    englishLabel: 'Duhok'
  },
  {
    code: 'babil',
    name: {
      ar: 'بابل 🦁',
      ku: 'بابل 🦁',
      en: 'Babylon 🦁'
    },
    englishLabel: 'Babylon'
  },
  {
    code: 'diyala',
    name: {
      ar: 'ديالى 🍊',
      ku: 'دیالە 🍊',
      en: 'Diyala 🍊'
    },
    englishLabel: 'Diyala'
  },
  {
    code: 'wasit',
    name: {
      ar: 'واسط 🌾',
      ku: 'واسط 🌾',
      en: 'Wasit 🌾'
    },
    englishLabel: 'Wasit'
  },
  {
    code: 'saladin',
    name: {
      ar: 'صلاح الدين 🏰',
      ku: 'سەڵاحەددین 🏰',
      en: 'Saladin 🏰'
    },
    englishLabel: 'Saladin'
  },
  {
    code: 'maysan',
    name: {
      ar: 'ميسان 🌊',
      ku: 'میسان 🌊',
      en: 'Maysan 🌊'
    },
    englishLabel: 'Maysan'
  },
  {
    code: 'dhiqar',
    name: {
      ar: 'ذي قار 🏛️',
      ku: 'زیقار 🏛️',
      en: 'Dhi Qar 🏛️'
    },
    englishLabel: 'Dhi Qar'
  },
  {
    code: 'muthanna',
    name: {
      ar: 'المثنى 🏜️',
      ku: 'موسەنا 🏜️',
      en: 'Muthanna 🏜️'
    },
    englishLabel: 'Muthanna'
  },
  {
    code: 'qadisiya',
    name: {
      ar: 'القادسية 🌾',
      ku: 'قادسیە 🌾',
      en: 'Qadisiya 🌾'
    },
    englishLabel: 'Qadisiya'
  },
  {
    code: 'halabja',
    name: {
      ar: 'حلبجة 🍎',
      ku: 'هەڵەبجە 🍎',
      en: 'Halabja 🍎'
    },
    englishLabel: 'Halabja'
  }
];

export const CATEGORIES: Category[] = [
  {
    id: 'restaurant',
    icon: '🍔',
    name: {
      ar: 'مطاعم',
      ku: 'چێشتخانەکان',
      en: 'Restaurants'
    },
    color: 'from-orange-600 to-red-500'
  },
  {
    id: 'cafe_bakery',
    icon: '☕',
    name: {
      ar: 'كافيهات ومخابز',
      ku: 'کافێ و نانەواخانەکان',
      en: 'Cafés & Bakeries'
    },
    color: 'from-amber-600 to-yellow-500'
  },
  {
    id: 'supermarket',
    icon: '🛒',
    name: {
      ar: 'سوبرماركت',
      ku: 'سۆپەرمارکێتەکان',
      en: 'Supermarkets'
    },
    color: 'from-green-600 to-emerald-500'
  },
  {
    id: 'mall',
    icon: '🛍️',
    name: {
      ar: 'مولات ومراكز تسوق',
      ku: 'مۆڵەکان',
      en: 'Malls & Shopping'
    },
    color: 'from-pink-600 to-rose-500'
  },
  {
    id: 'pharmacy',
    icon: '💊',
    name: {
      ar: 'صيدليات',
      ku: 'دەرمانخانەکان',
      en: 'Pharmacies'
    },
    color: 'from-cyan-600 to-sky-500'
  },
  {
    id: 'hospital',
    icon: '🏥',
    name: {
      ar: 'مستشفيات',
      ku: 'نەخۆشخانەکان',
      en: 'Hospitals'
    },
    color: 'from-red-600 to-rose-500'
  },
  {
    id: 'clinic',
    icon: '🩺',
    name: {
      ar: 'عيادات طبية',
      ku: 'کلینیکەکان',
      en: 'Clinics'
    },
    color: 'from-teal-600 to-emerald-500'
  },
  {
    id: 'doctor',
    icon: '👨‍⚕️',
    name: {
      ar: 'أطباء وعيادات خاصة',
      ku: 'دکتۆرەکان',
      en: 'Doctors'
    },
    color: 'from-blue-600 to-sky-500'
  },
  {
    id: 'dentist',
    icon: '🦷',
    name: {
      ar: 'أطباء أسنان',
      ku: 'پزیشکی ددان',
      en: 'Dentists'
    },
    color: 'from-cyan-500 to-indigo-500'
  },
  {
    id: 'salon',
    icon: '💈',
    name: {
      ar: 'صالونات ومراكز تجميل',
      ku: 'ساڵۆنی جوانکاری',
      en: 'Beauty Salons'
    },
    color: 'from-purple-600 to-pink-500'
  },
  {
    id: 'spa',
    icon: '💆‍♀️',
    name: {
      ar: 'مراكز سبا واستجمام',
      ku: 'سێنتەری سپا',
      en: 'Spas & Wellness'
    },
    color: 'from-fuchsia-600 to-pink-500'
  },
  {
    id: 'gym',
    icon: '🏋️',
    name: {
      ar: 'صالات رياضية ورشاقة',
      ku: 'هۆڵەکانی وەرزش',
      en: 'Gyms & Fitness'
    },
    color: 'from-emerald-600 to-teal-500'
  },
  {
    id: 'hotel',
    icon: '🏨',
    name: {
      ar: 'فنادق ومنتجعات',
      ku: 'هۆتێلەکان',
      en: 'Hotels & Resorts'
    },
    color: 'from-indigo-600 to-blue-500'
  },
  {
    id: 'travel_agency',
    icon: '✈️',
    name: {
      ar: 'وكالات سفر وسياحة',
      ku: 'بریکاری گەشتوگوزار',
      en: 'Travel Agencies'
    },
    color: 'from-sky-500 to-blue-600'
  },
  {
    id: 'university',
    icon: '🎓',
    name: {
      ar: 'جامعات ومعاهد',
      ku: 'زانکۆکان',
      en: 'Universities'
    },
    color: 'from-violet-600 to-purple-500'
  },
  {
    id: 'bank',
    icon: '🏦',
    name: {
      ar: 'بنوك ومصارف',
      ku: 'بانکەکان',
      en: 'Banks & Finance'
    },
    color: 'from-green-600 to-teal-600'
  },
  {
    id: 'real_estate',
    icon: '🏢',
    name: {
      ar: 'عقارات ومكاتب دلالية',
      ku: 'عەقارات',
      en: 'Real Estate'
    },
    color: 'from-rose-500 to-amber-600'
  },
  {
    id: 'lawyer',
    icon: '⚖️',
    name: {
      ar: 'محامون واستشارات قانونية',
      ku: 'پارێزەران',
      en: 'Lawyers & Legal'
    },
    color: 'from-amber-700 to-orange-600'
  },
  {
    id: 'car_dealer',
    icon: '🚗',
    name: {
      ar: 'معارض سيارات',
      ku: 'پیتاکی ئۆتۆمبێل',
      en: 'Car Dealers'
    },
    color: 'from-yellow-500 to-orange-500'
  },
  {
    id: 'car_rental',
    icon: '🔑',
    name: {
      ar: 'تأجير سيارات',
      ku: 'کرێی ئۆتۆمبێل',
      en: 'Car Rental'
    },
    color: 'from-teal-500 to-cyan-500'
  },
  {
    id: 'mobile_shop',
    icon: '📱',
    name: {
      ar: 'متاجر هواتف وإلكترونيات',
      ku: 'مۆبایل و ئەلیکترۆنیات',
      en: 'Mobile Shops'
    },
    color: 'from-violet-500 to-indigo-500'
  },
  {
    id: 'furniture',
    icon: '🛋️',
    name: {
      ar: 'مفروشات وأثاث منزلي',
      ku: 'کەلەپوور و مۆبایلەکان',
      en: 'Furniture'
    },
    color: 'from-amber-800 to-amber-600'
  },
  {
    id: 'clothing_store',
    icon: '👔',
    name: {
      ar: 'متاجر ألبسة وأزياء',
      ku: 'فرۆشگاکانی جلوبەرگ',
      en: 'Clothing Stores'
    },
    color: 'from-pink-500 to-purple-500'
  },
  {
    id: 'software_company',
    icon: '💻',
    name: {
      ar: 'شركات برمجيات وتقنية',
      ku: 'کۆمپانیاکانی تەکنەلۆجیا',
      en: 'Tech & Software'
    },
    color: 'from-blue-700 to-indigo-600'
  },
  {
    id: 'marketing_agency',
    icon: '📣',
    name: {
      ar: 'وكالات تسويق وإعلان',
      ku: 'ڕیکلام و مارکێتینگ',
      en: 'Marketing Agencies'
    },
    color: 'from-purple-500 to-fuchsia-500'
  },
  {
    id: 'construction_company',
    icon: '🏗️',
    name: {
      ar: 'شركات مقاولات وإنشاءات',
      ku: 'کۆمپانیاکانی بیناسازی',
      en: 'Construction'
    },
    color: 'from-yellow-600 to-amber-700'
  },
  {
    id: 'architecture',
    icon: '📐',
    name: {
      ar: 'مكاتب هندسية وتصميم',
      ku: 'ئەندازیاری و نەخشەسازی',
      en: 'Architecture & Design'
    },
    color: 'from-teal-500 to-blue-500'
  },
  {
    id: 'photography',
    icon: '📷',
    name: {
      ar: 'استوديوهات تصوير',
      ku: 'ستۆدیۆکانی وێنەگرتن',
      en: 'Photography'
    },
    color: 'from-pink-600 to-purple-500'
  },
  {
    id: 'cinema',
    icon: '🎬',
    name: {
      ar: 'سينما وعروض أفلام',
      ku: 'سینەماکان',
      en: 'Cinema & Theatres'
    },
    color: 'from-red-600 to-amber-500'
  },
  {
    id: 'gaming_center',
    icon: '🎮',
    name: {
      ar: 'مراكز ألعاب كومبيوتر',
      ku: 'سەنتەری یارییەکان',
      en: 'Gaming Centers'
    },
    color: 'from-indigo-600 to-purple-600'
  },
  {
    id: 'sports_club',
    icon: '⚽',
    name: {
      ar: 'نوادي رياضية وملاعب',
      ku: 'یانە وەرزشییەکان',
      en: 'Sports Clubs'
    },
    color: 'from-emerald-500 to-green-600'
  },
  {
    id: 'pet_shop',
    icon: '🐱',
    name: {
      ar: 'متاجر وعيادات حيوانات أليفة',
      ku: 'ئاژەڵە ماڵییەکان',
      en: 'Pet Shops'
    },
    color: 'from-orange-500 to-amber-500'
  }
];

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'slide-1',
    image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1600&auto=format&fit=crop&q=80',
    slogan: {
      ar: 'اكتشف العراق بطريقة مختلفة ⚡',
      ku: 'عێراق بە شێوازێکی جیاواز بدۆزەرەوە ⚡',
      en: 'Discover Iraq Differently ⚡'
    },
    governorate: 'baghdad',
    category: 'cafe_bakery',
    badge: {
      ar: 'تريند الأسبوع 🔥',
      ku: 'ترێندی هەفتە 🔥',
      en: 'Weekly Trend 🔥'
    }
  },
  {
    id: 'slide-2',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1600&auto=format&fit=crop&q=80',
    slogan: {
      ar: 'أماكن بغداد الأكثر تفاعلاً 🏰',
      ku: 'چالاکترین شوێنەکانی بەغداد 🏰',
      en: "Baghdad’s Trending Places 🏰"
    },
    governorate: 'baghdad',
    category: 'hotel',
    badge: {
      ar: 'تقييم عالي ⭐',
      ku: 'نمرەی بەرز ⭐',
      en: 'Top Rated ⭐'
    }
  },
  {
    id: 'slide-4',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=1600&auto=format&fit=crop&q=80',
    slogan: {
      ar: 'مدينتك تنبض بالحياة 🌟',
      ku: 'شارەکەت زیندووە و دەدرەوشێتەوە 🌟',
      en: 'Your City is Alive 🌟'
    },
    governorate: 'erbil',
    category: 'restaurant',
    badge: {
      ar: 'مطاعم عصرية 🍔',
      ku: 'چێشتخانەی سەردەمیانە 🍔',
      en: 'Trendy Dining 🍔'
    }
  },
  {
    id: 'slide-3',
    image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1600&auto=format&fit=crop&q=80',
    slogan: {
      ar: 'تسوّق من أفضل البوتيكات المحلية 🛍️',
      ku: 'لە باشترین پۆشاکە ناوخۆییەکان بکڕە 🛍️',
      en: 'Shop Best Local Boutiques 🛍'
    },
    governorate: 'erbil',
    category: 'mall',
    badge: {
      ar: 'خصومات مميزة 🏷️',
      ku: 'داشکاندنی تایبەت 🏷️',
      en: 'Special Offers 🏷️'
    }
  }
];

const RAW_INITIAL_BUSINESSES: Business[] = [
  // COFFEE SECTION
  {
    id: 'b-1',
    name: {
      ar: 'كافيه لوفا - الكرادة',
      ku: 'کافێ لۆڤا - کەڕادە',
      en: 'Lova Café - Karrada'
    },
    description: {
      ar: 'من أفضل الكافيهات الشبابية في الكرادة، يتميز بديكور سينمائي رائع وجلسات هادئة للمذاكرة والعمل ومع الأصدقاء.',
      ku: 'یەکێک لە باشترین کافێی گەنجانە لە کەڕادە، تایبەتمەندە بە دیکۆرێکی نایاب و شوێنی هێمن بۆ خوێندن یان چاوپێکەوتن.',
      en: 'One of the best youth-oriented cafés in Karrada, featuring premium cinematic decor, quiet study corners, and vibrant vibes.'
    },
    category: 'coffee',
    governorate: 'baghdad',
    rating: 4.9,
    reviewsCount: 312,
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&auto=format&fit=crop&q=80'
    ],
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    isVerified: true,
    phoneNumber: '+9647701234567',
    address: {
      ar: 'بغداد، الكرادة داخل، قرب ساحة التحريات',
      ku: 'بەغداد، کەڕادەی ناوەوە، نزیک مەیدانی تەحەریات',
      en: 'Baghdad, Karrada Inside, Near Tahariyat Square'
    },
    likes: 542,
    saves: 219,
    featuredDeal: {
      ar: 'خصم ٢٠٪ لحاملي بطاقات الطلاب طوال أيام الأسبوع 🎓',
      ku: '٢٠٪ داشکاندن بۆ قوتابیان لە هەموو ڕۆژەکانی هەفتەدا 🎓',
      en: '20% discount for student card holders on weekdays 🎓'
    },
    mapCoords: { x: 45, y: 55 },
    stories: [
      'https://images.unsplash.com/photo-1498804103079-a6351b050096?w=400&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&auto=format&fit=crop&q=80'
    ]
  },
  {
    id: 'b-2',
    name: {
      ar: 'قهوة الماش - المنصور',
      ku: 'کافێی ئەلماش - مەنسوور',
      en: 'Al-Mash Specialty Coffee - Mansour'
    },
    description: {
      ar: 'قهوة مختصة محضرة بأرقى أنواع البن العالمي بأيدي باريستا عراقيين محترفين. أجواء هادئة وراقية.',
      ku: 'قاوەیەکی تایبەت کە لە باشترین جۆرەکانی دەنکە قاوەی جیهانی ئامادەکراوە لەلایەن باریستای عێراقی کارامە.',
      en: 'Specialty coffee prepared with the finest international beans by professional Iraqi baristas in a sleek neo-industrial hub.'
    },
    category: 'coffee',
    governorate: 'baghdad',
    rating: 4.8,
    reviewsCount: 189,
    image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&auto=format&fit=crop&q=80'
    ],
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    isVerified: true,
    phoneNumber: '+9647805556677',
    address: {
      ar: 'بغداد، المنصور، شارع ١٤ رمضان، خلف مول المنصور',
      ku: 'بەغداد، مەنسوور، شەقامی ١٤ ڕەمەزان، پشت مۆڵی مەنسوور',
      en: 'Baghdad, Mansour, 14 Ramadan St, Behind Mansour Mall'
    },
    likes: 388,
    saves: 145,
    featuredDeal: {
      ar: 'عرض باريستا: فنجان قهوة مجاني لكل ٣ مشاركات للقصة ☕',
      ku: 'دیاری باریستا: قاوەیەکی بێبەرامبەر بەرامبەر بڵاوکردنەوەی ٣ ستۆری ☕',
      en: 'Barista Special: A free cup of coffee with every 3 story shares! ☕'
    },
    mapCoords: { x: 38, y: 48 },
    stories: []
  },
  {
    id: 'b-3',
    name: {
      ar: 'مادو كافيه - امبراطورية البن أربيل',
      ku: 'مادۆ کافێ - قەڵای هەولێر',
      en: 'Mado Café - Erbil Citadel Road'
    },
    description: {
      ar: 'الفرع الشهير للقهوة والحلوى التركية الفاخرة بأطلالة فريدة ومقاعد خارجية وداخلية مريحة جداً.',
      ku: 'لقی بەناوبانگی قاوە و شیرینی تورکی بە دیمەنێکی سەرنجڕاکێش و دانیشتنی دەرەکی زۆر ئاسوودە.',
      en: 'The renowned luxury brand for premium Turkish coffee, legendary ice creams and pastries with comfortable scenic seating.'
    },
    category: 'coffee',
    governorate: 'erbil',
    rating: 4.7,
    reviewsCount: 450,
    image: 'https://images.unsplash.com/photo-1498804103079-a6351b050096?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1498804103079-a6351b050096?w=800&auto=format&fit=crop&q=80'
    ],
    avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80',
    isVerified: true,
    phoneNumber: '+9647501122334',
    address: {
      ar: 'أربيل، شارع قضاء القلعة، مقابل حديقة سامي عبد الرحمن',
      ku: 'هەولێر، شەقامی قەزای قەڵا، بەرامبەر پارکی سامی عەبدولڕەحمان',
      en: 'Erbil, Citadel District Road, Opposite Sami Abdulrahman Park'
    },
    likes: 812,
    saves: 430,
    featuredDeal: {
      ar: 'حلوى بقلاوة مجانية مع كل كوب قهوة دبل اسبريسو 🍰',
      ku: 'شیرینی باقلاوای بێبەرامبەر لەگەڵ هەر کوپێک قاوەی دۆبڵ ئیسپرێسۆ 🍰',
      en: 'Free baklava pastry with every purchase of a Double Espresso 🍰'
    },
    mapCoords: { x: 55, y: 22 }
  },

  // DINING SECTION
  {
    id: 'b-4',
    name: {
      ar: 'مطعم ومرسى مسكوف دجلة',
      ku: 'چێشتخانە و هێلانەی ماسی دجلە',
      en: 'Meskouf Tigris Riverfront'
    },
    description: {
      ar: 'أشهر مطعم للمسكوف البغدادي الأصيل على ضفاف نهر دجلة مباشرة. الأسماك طازجة والمذاق على الحطب.',
      ku: 'بەناوبانگترین چێشتخانەی ماسی مەسگوفی بەغدادی لەسەر کەناری ڕووباری دجلە بە تامی دارەوە.',
      en: 'The absolute prime location for traditional fire-grilled Iraqi Masgouf fish directly on the breathtaking Tigris riverbank.'
    },
    category: 'dining',
    governorate: 'baghdad',
    rating: 4.9,
    reviewsCount: 520,
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&auto=format&fit=crop&q=80'
    ],
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    isVerified: true,
    phoneNumber: '+9647719998822',
    address: {
      ar: 'بغداد، شارع أبو نؤاس، قرب تمثال شهريار وشهرزاد',
      ku: 'بەغداد، شەقامی ئەبو نوئاس، نزیک پەیکەری شەهریار و شەهرەزاد',
      en: 'Baghdad, Abu Nuwas Street, Near Sheherazade & Shahriyar Statue'
    },
    likes: 920,
    saves: 560,
    featuredDeal: {
      ar: 'خصم عائلي ١٥٪ على الطلبات التي تتجاوز ٣ كيلوغرامات مسمكوف 🐟',
      ku: 'داشکاندنی خێزانی ١٥٪ بۆ کڕینی ماسی سەرووی ٣ کیلۆگرام 🐟',
      en: 'Family Special: 15% off on fish orders exceeding 3 Kg 🐟'
    },
    mapCoords: { x: 44, y: 52 }
  },
  {
    id: 'b-5',
    name: {
      ar: 'برغر كرافت - بختياري أربيل',
      ku: 'بەرگر کرافت - بەختیاری',
      en: 'Craft Burger - Bakhtiyari Erbil'
    },
    description: {
      ar: 'برغر لحم عراقي محلي طازج بخلطات سرية رائعة وصوصات مميزة، المكان المفضل للشباب في أربيل.',
      ku: 'بەرگری گۆشتی فرێشی کوردی بە شێواز و سۆسی تایبەت، شوێنی دڵخوازی گەنجان لە هەولێر.',
      en: 'Premium hand-pressed local beef burgers with signature fusion sauces, loved by Erbil’s young crowds.'
    },
    category: 'dining',
    governorate: 'erbil',
    rating: 4.8,
    reviewsCount: 228,
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&auto=format&fit=crop&q=80'
    ],
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&auto=format&fit=crop&q=80',
    isVerified: true,
    phoneNumber: '+9647504449900',
    address: {
      ar: 'أربيل، حي بختياري، شارع المطاعم الرئيسي',
      ku: 'هەولێر، گەڕەکی بەختیاری، شەقامی سەرەکی چێشتخانەکان',
      en: 'Erbil, Bakhtiyari District, Main Restaurant Boulevard'
    },
    likes: 470,
    saves: 215,
    featuredDeal: {
      ar: 'اشترِ وجبة برغر واحصل على بطاطا كرافت وصودا مجاناً بالكامل 🍟',
      ku: 'ژەمە بەرگرێک بکڕە و پەتاتەی گەرم و سۆدا بێبەرامبەر وەربگرە 🍟',
      en: 'Combo Upgrade: Buy any single burger and get free Craft Fries & Soda! 🍟'
    },
    mapCoords: { x: 57, y: 24 }
  },

  // SHOPPING SECTION
  {
    id: 'b-6',
    name: {
      ar: 'بابل ديزاين بوث - بغداد مول',
      ku: 'دیزاین مۆڵی بابل - بەغداد مۆڵ',
      en: 'Babylon Design Booth - Baghdad Mall'
    },
    description: {
      ar: 'بوتيك راقي لعرض تصاميم الموضة والأزياء والملابس للمصممين العراقيين الشباب والماركات العالمية الفخمة.',
      ku: 'دوکانی براندی سەرنجڕاکێش بۆ جلوبەرگی نوێترین دیزاینەرە عێراقییە گەنجەکان و مارکە جیهانییەکان.',
      en: 'Curated high-fashion boutique hosting local Iraqi creative designers and high-end international streetwear.'
    },
    category: 'shopping',
    governorate: 'baghdad',
    rating: 4.6,
    reviewsCount: 120,
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&auto=format&fit=crop&q=80'
    ],
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    isVerified: true,
    phoneNumber: '+9647700011122',
    address: {
      ar: 'بغداد، الحارثية، داخل بغداد مول، الطابق الأرضي',
      ku: 'بەغداد، حارسیە، لەناو بەغداد مۆڵ، قاتی زەمینی',
      en: 'Baghdad, Harthiya, Inside Baghdad Mall, Ground Floor'
    },
    likes: 290,
    saves: 180,
    featuredDeal: {
      ar: 'خصم خاص ١٠٪ للمتابعين على منصة شكو ماكو عند الدفع ببطاقة فيزا 💳',
      ku: 'داشکاندنی ١٠٪ بۆ پەیڕەوانی ساكۆ ماكۆ لەکاتی پارەدان بە فیزاکارت 💳',
      en: '10% exclusive discount for Saku Maku users paying with credit card 💳'
    },
    mapCoords: { x: 39, y: 51 }
  },

  // HOTELS SECTION
  {
    id: 'b-7',
    name: {
      ar: 'فندق وكازينو تايتانك السليمانية',
      ku: 'هۆتێل و سپای تایتانیک سلێمانی',
      en: 'Titanic Hotel & Spa Sulaymaniyah'
    },
    description: {
      ar: 'فندق ٥ نجوم فخم ومذهل، يقدم خدمات علاجية وسبا متكامل، مع مطاعم فاخرة وجلسات تطل على جبال السليمانية.',
      ku: 'هۆتێلی ٥ ئەستێرەی شاهانە، خزمەتگوزاری سپای ناوازە و چێشتخانەی ناوداری هەیە لەگەڵ دیمەنی کێوەکانی سلێمانی.',
      en: 'Luxury 5-star resort boasting world-class spas, spectacular infinity pool, and fine dining under the gorgeous mountain breeze.'
    },
    category: 'hotels',
    governorate: 'sulaymaniyah',
    rating: 4.9,
    reviewsCount: 610,
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&auto=format&fit=crop&q=80'
    ],
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    isVerified: true,
    phoneNumber: '+9647480556633',
    address: {
      ar: 'السليمانية، شارع سالم، قرب تلال سرجنار ورشاقة',
      ku: 'سلێمانی، شەقامی سالم، نزیک ناوچەی گەشتیاری سەرچنار',
      en: 'Sulaymaniyah, Salim Street, Near Sarchinar Hills'
    },
    likes: 1200,
    saves: 780,
    featuredDeal: {
      ar: 'ليلة مجانية إضافية عند حجز ٣ ليالٍ متتالية عبر التطبيق 🏨',
      ku: 'شەوێکی بێبەرامبەر لەکاتی حجزکردنی ٣ شەو بەدوایەکدا 🏨',
      en: 'Relax Package: Get 1 night free when booking a 3-night weekend escape 🏨'
    },
    mapCoords: { x: 68, y: 31 }
  },

  // PHARMACIES
  {
    id: 'b-8',
    name: {
      ar: 'صيدلية ابن حيان المركزية - البصرة',
      ku: 'دەرمانخانەی ناوەندی ئیبن حەیان',
      en: 'Ibn Hayyan Central Pharmacy'
    },
    description: {
      ar: 'الصيدلية الأكبر والأحدث في البصرة، توفر كل أنواع العلاجات والمكملات وأجهزة الفحص على مدار ٢٤ ساعة.',
      ku: 'گەورەترین و نوێترین دەرمانخانە لە بەسرە، چارەسەر و ئامێرەکانی پشکنین دابین دەکات بە ٢٤ کاتژمێر.',
      en: 'The largest fully-stocked modern pharmaceutical hub in Basra, equipped with state-of-the-art diagnostic products 24/7.'
    },
    category: 'pharmacies',
    governorate: 'basra',
    rating: 4.8,
    reviewsCount: 140,
    image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&auto=format&fit=crop&q=80'
    ],
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
    isVerified: false,
    phoneNumber: '+964781445588',
    address: {
      ar: 'البصرة، حي العشار، قرب مستشفى البصرة العام',
      ku: 'بەسرە، گەڕەکی عەشار، نزیک نەخۆشخانەی گشتی بەسرە',
      en: 'Basra, Ashar District, Near Basra General Hospital'
    },
    likes: 154,
    saves: 72,
    mapCoords: { x: 80, y: 91 }
  },

  // SALONS
  {
    id: 'b-9',
    name: {
      ar: 'صالون هير تاون الرجالي - الجادرية',
      ku: 'ساڵۆنی هێر تاونی پیاوان - جادریە',
      en: 'Hair Town Barbers - Jadriya'
    },
    description: {
      ar: 'باقة من أفضل متخصصي الحلاقة والعناية بالبشرة للرجال في الجادرية. أجواء عصرية وموسيقى رائعة.',
      ku: 'باشترین سەرتاشخانە و مەکۆی چاودێری پێست بۆ پیاوان لە جادریەی بەغداد بە موزیکی خۆشەوە.',
      en: 'High-end men’s grooming, luxury styling, and facial remedies in Jadriya with upbeat modern vibes.'
    },
    category: 'salons',
    governorate: 'baghdad',
    rating: 4.7,
    reviewsCount: 94,
    image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800&auto=format&fit=crop&q=80'
    ],
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    isVerified: true,
    phoneNumber: '+964771225577',
    address: {
      ar: 'بغداد، الجادرية، قرب جامعة بغداد، تقاطع الحرية',
      ku: 'بەغداد، جادریە، نزیک زانکۆی بەغداد، چوارڕیانی حوڕییە',
      en: 'Baghdad, Jadriya, Near Baghdad University, Liberty Intersection'
    },
    likes: 218,
    saves: 85,
    featuredDeal: {
      ar: 'جلسة تنظيف بشرة مجانية مع كل حلاقة شعر ستايل 💇',
      ku: 'پاککردنەوەی پێست دیاری بێبەرامبەر لەگەڵ هەر تاشینی قژێک 💇',
      en: 'Grooming Pack: Free charcoal facial mask with any premium stylized haircut 💇'
    },
    mapCoords: { x: 44, y: 56 }
  },

  // ENTERTAINMENT
  {
    id: 'b-10',
    name: {
      ar: 'مدينة ألعاب السندباد لاند - بغداد',
      ku: 'شاری یارییەکانی سێندباد لاند - بەغداد',
      en: 'Sindbad Land Amusement Park'
    },
    description: {
      ar: 'الوجهة الترفيهية العائلية الأكبر في العاصمة بغداد، تضم ألعاباً لجميع الأعمار وبحيرات اصطناعية ومطاعم متنوعة.',
      ku: 'گەورەترین یاریگای خێزانی لە بەغداد، چەندین یاری سەرنجڕاکێش و بەستەر و چێشتخانە لەخۆدەگرێت.',
      en: 'The largest and most beloved family entertainment park in Baghdad, featuring high-thrill rollercoasters, quiet lakes, and food stalls.'
    },
    category: 'entertainment',
    governorate: 'baghdad',
    rating: 4.8,
    reviewsCount: 780,
    image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=800&auto=format&fit=crop&q=80'
    ],
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
    isVerified: true,
    phoneNumber: '+9647710002222',
    address: {
      ar: 'بغداد، شارع فلسطين، مجاور جامعة المستنصرية',
      ku: 'بەغداد، شەقامی فەلەستین، تەنیشت زانکۆی موستەنسەریە',
      en: 'Baghdad, Palestine Street, Next to Mustansiriya University'
    },
    likes: 1450,
    saves: 920,
    featuredDeal: {
      ar: 'باقة الألعاب العائلية الكاملة بخصم ٣٠٪ في عطلة نهاية الأسبوع 🎡',
      ku: 'داشکاندنی ٣٠٪ بۆ بڕوانامەی خێزانی لە ڕۆژانی پشوودا 🎡',
      en: 'Weekend Joy: 30% discount on family all-access passes 🎡'
    },
    mapCoords: { x: 47, y: 50 }
  }
];

const RAW_INITIAL_POSTS: SocialPost[] = [
  {
    id: 'post-1',
    businessId: 'b-1',
    businessName: 'Lova Café - Karrada',
    businessAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    category: 'coffee',
    governorate: 'baghdad',
    mediaUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=80',
    caption: {
      ar: 'أجواء دراسة ممتازة و هدوء يخليك تنجز شغلك بكل رواق وجلسات تهبل بالكرادة! جرب الكابتشينو مالتنا مع الهيل العراقي المميز ☕✨ الكرادة ترحب بيك!',
      ku: 'ئێوارەیەکی چاوەڕواننەکراو لە کافێ لۆڤا! قاوەی تایبەت بە جوانی بەهارات لەگەڵ دانیشتنی نایاب ☕✨',
      en: 'Vibrant vibes, premium aesthetic, and quiet spaces to fuel your hustle. Come try our specialty cardamom espresso brew at Lova now! ☕✨'
    },
    likes: 842,
    commentsCount: 46,
    shares: 112,
    timeAgo: {
      ar: 'منذ ساعتين',
      ku: '٢ کاتژمێر پێش ئێستا',
      en: '2 hours ago'
    },
    likedByUser: false,
    savedByUser: false,
    comments: [
      { id: 'c1', username: 'hasan_baghdadi', text: 'الكافيه المفضل عندي بالكرادة، الخدمة فد شي راقي 🔥', time: '1h' },
      { id: 'c2', username: 'marta.iq', text: 'Spotted! Beautiful location, highly recommended for working remotely.', time: '30m' }
    ],
    promotionBadge: {
      ar: 'تريند الكرادة 🔥',
      ku: 'ترێندی کەڕادە 🔥',
      en: 'Karrada Hotspot 🔥'
    }
  },
  {
    id: 'post-2',
    businessId: 'b-4',
    businessName: 'Meskouf Tigris Riverfront',
    businessAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    category: 'dining',
    governorate: 'baghdad',
    mediaUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80',
    caption: {
      ar: 'المسكوف الأصلي على ضفاف نهر دجلة الساحر! سمك طازج و شوي على الحطب يرجعك لأيام بغداد القديمة الدافئة 🐟🔥 جيب العائلة اليوم و خذ طعم زمان.',
      ku: 'ماسی مەسگوفی ڕەسەن لەسەر دیمەنی دجلەی فێنک! تامێکی شاهانە کە قەت لە بیر ناچێتەوە 🐟🔥',
      en: 'Golden charcoal-grilled Tigris River Masgouf served sizzling hot. Experience absolute culinary heaven tonight under the old Baghdad stars. 🐟🔥'
    },
    likes: 1250,
    commentsCount: 92,
    shares: 345,
    timeAgo: {
      ar: 'منذ ٤ ساعات',
      ku: '٤ کاتژمێر پێش ئێستا',
      en: '4 hours ago'
    },
    likedByUser: true,
    savedByUser: false,
    comments: [
      { id: 'c3', username: 'ali_basrawi', text: 'أجمل إطلالة وأروع سمك ببغداد حبيبة قلبي ❤️', time: '2h' },
      { id: 'c4', username: 'kurdo_erbil', text: 'زور جوانة، لازم نزوركم الأسبوع الجاي ان شاء الله', time: '1h' }
    ],
    promotionBadge: {
      ar: 'عرض خاص 🏷️',
      ku: 'داشکاندنی تایبەت 🏷️',
      en: 'Exclusive Offer 🏷'
    }
  },
  {
    id: 'post-3',
    businessId: 'b-5',
    businessName: 'Craft Burger - Erbil',
    businessAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&auto=format&fit=crop&q=80',
    category: 'dining',
    governorate: 'erbil',
    mediaUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&auto=format&fit=crop&q=80',
    caption: {
      ar: 'منو جرب برغر اللحم المحشي بجبنة الشيدر المعتقة في فرعنا البختياري؟ 🍔🧀 لحم بلدي محلي طازج يحضر يومياً خصيصاً لكم. تعال جرب العشق!',
      ku: 'کێ بەختیاری لایە؟ ژەمە هەمبەرگرە نوێیەکەمان بە پەنیر ئامادەیە بۆ ئێوە 🍔🧀 بێن و چێژ وەربگرن!',
      en: 'Oozing cheddar cheese, hand-pressed prime Iraqi beef, toasted brioche bun. Your dream burger is waiting for you in Bakhtiyari Erbil! 🍔🧀'
    },
    likes: 673,
    commentsCount: 29,
    shares: 48,
    timeAgo: {
      ar: 'منذ يوم',
      ku: 'دوێنێ',
      en: '1 day ago'
    },
    likedByUser: false,
    savedByUser: true,
    comments: [
      { id: 'c5', username: 'shanga_erbil', text: 'the best service and very delicious burgers in town 🍔🍟', time: '18h' }
    ]
  },
  {
    id: 'post-4',
    businessId: 'b-7',
    businessName: 'Titanic Hotel & Spa',
    businessAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    category: 'hotels',
    governorate: 'sulaymaniyah',
    mediaUrl: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&auto=format&fit=crop&q=80',
    caption: {
      ar: 'أجواء المساء الساحرة بجوار مسبح فندق تايتانك في السليمانية الجميلة 🌸🏔️ هواء نقي وجلسات استجمام تعيد لك النشاط و تسعد الروح والقلب.',
      ku: 'ئێوارەیەکی فێنک لە تەنیشت مسبەحی هۆتێلی تایتانیک لە سلێمانی دڵگیر 🌸🏔️ کاتێکی شاهانە بەسەربەرە.',
      en: 'Unwind under the therapeutic mountain breeze of beautiful Sulaymaniyah. Book your luxury spa retreat pool-side weekend today! 🌸🏔️'
    },
    likes: 2190,
    commentsCount: 154,
    shares: 280,
    timeAgo: {
      ar: 'منذ يومين',
      ku: '٢ ڕۆژ پێش ئێستا',
      en: '2 days ago'
    },
    likedByUser: false,
    savedByUser: true,
    comments: [
      { id: 'c6', username: 'ahmed_iraqi', text: 'أجمل مكان للاسترخاء بالعراق بلا منافس! الجو هناك يجنن 🏞️', time: '1d' }
    ],
    promotionBadge: {
      ar: 'تقييم ممتاز 🌟',
      ku: 'لێکدانەوەی نایاب 🌟',
      en: 'Excellent Rating 🌟'
    }
  }
];

const CATEGORY_COMPAT_MAP: Record<string, string> = {
  coffee: 'cafe_bakery',
  dining: 'restaurant',
  shopping: 'mall',
  hotels: 'hotel',
  salons: 'salon',
  gyms: 'gym',
  pharmacies: 'pharmacy',
  entertainment: 'cinema',
  universities: 'university'
};

export const INITIAL_BUSINESSES: Business[] = RAW_INITIAL_BUSINESSES.map(biz => ({
  ...biz,
  category: CATEGORY_COMPAT_MAP[biz.category] || biz.category
}));

export const INITIAL_POSTS: SocialPost[] = RAW_INITIAL_POSTS.map(post => ({
  ...post,
  category: CATEGORY_COMPAT_MAP[post.category] || post.category
}));

export const TRANSLATIONS = {
  ar: {
    appName: 'شكو ماكو',
    appSlogan: 'منصة استكشاف الأماكن والشركات في العراق بروح اجتماعية عصرية ✨',
    searchPlaceholder: 'ابحث عن كافيه، مطعم، صالون تجميل...',
    allIraq: 'كل العراق 🇮🇶',
    allCategories: 'الكل',
    heroBadge: 'استكشف العراق 🚀',
    ctaDiscover: 'استكشف الآن',
    governorateLabel: 'المحافظة:',
    categoryHeader: 'تصفح الفئات',
    loadMore: 'عرض المزيد',
    showLess: 'عرض أقل',
    noBusinessesFound: 'لم يتم العثور على أماكن في هذه المحافظة حالياً.',
    verified: 'موثق',
    address: 'العنوان',
    phone: 'رقم الهاتف',
    specialOffer: 'عرض مميز',
    likes: 'إعجاب',
    saves: 'حفظ',
    share: 'مشاركة',
    comment: 'تعليق',
    addComment: 'إضافة تعليق...',
    postedBy: 'بواسطة',
    exploreFeed: 'نبض الشارع (الفيد الجذاب)',
    exploreTab: 'استكشاف الأماكن',
    mapTab: 'خريطة المحليات',
    addBusinessTab: 'أضف عملك مجاناً',
    aboutTab: 'كل شي عنا',
    addBusinessTitle: 'انضم لـ شكو ماكو وسوّق لعملك مجاناً! 🚀',
    addBusinessSubtitle: 'نوصل عملك لآلاف الشباب ومحبي الاستكشاف في محافظتك وبأجواء تيك توك وإنستغرام',
    formBizName: 'اسم العمل التجاري',
    formCategory: 'فئة العمل',
    formGov: 'المحافظة',
    formPhone: 'رقم الهاتف للتواصل',
    formAddress: 'عنوان العمل التفصيلي',
    formDesc: 'صف عملك بطريقة تجذب الشباب والمستكشفين',
    formImage: 'رابط صورة اللاندسكيب (اختياري)',
    btnSubmit: 'انشر عملك الآن على شكو ماكو 🎉',
    successMsg: 'تم نشر مشروعك بنجاح! سيظهر فوراً في الأقسام المحددة.',
    interactiveMapIntro: 'انقر على المحافظة بالخريطة التفاعلية لتصفية واكتشاف الأماكن والتريندات فوراً! 📊📍',
    postTitle: 'منشورات الأنشطة والتريندات',
    reviewsTitle: 'آراء وتقييمات مجتمع شكو ماكو',
    exploreCount: 'أماكن تم استكشافها',
    addPostPlaceholder: 'اكتب تعليقك بصفتك زائر...',
    ratingLabel: 'التقييم:',
    mapPinClick: 'اضغط على الدبوس بالخريطة لعرض تفاصيل المكان',
    close: 'إغلاق',
    viewDetails: 'عرض التفاصيل',
    ownerBadge: 'رائد أعمال عراقي 👑',
    sharesCount: 'مشاركة',
    socialMediaFeelTitle: 'قصص وتريندات حية 🔥',
    storyLineTitle: 'قصص تفاعلية للمحلات',
    karradaPlace: 'حي الكرادة، بغداد',
    welcomeAlert: 'أهلاً بك في شكو ماكو! المنصة تم ترقيتها إلى تجربة تفاعلية بالكامل 🦁⚡',
    dealsCorner: 'ركن العروض الساخنة 🔥'
  },
  ku: {
    appName: 'ساكۆ ماكۆ',
    appSlogan: 'سەکۆی هەرە مۆدێرنی عێراقی بۆ دۆزینەوەی کافێ، چێشتخانە و مارکە لۆکاڵییەکان ✨',
    searchPlaceholder: 'بگەڕێ بۆ کافێ، چێشتخانە، ساڵۆنی جوانی...',
    allIraq: 'هەموو عێراق 🇮🇶',
    allCategories: 'هەموو',
    heroBadge: 'عێراق بدۆزەرەوە 🚀',
    ctaDiscover: 'ئێستا بدۆزەرەوە',
    governorateLabel: 'پارێزگا:',
    categoryHeader: 'پۆلەکان ببینە',
    loadMore: 'زیاتر ببینە',
    showLess: 'کەمتر ببینە',
    noBusinessesFound: 'هیچ شوێنێک لەم پارێزگایەدا نەدۆزرایەوە.',
    verified: 'پەسەندکراو',
    address: 'ناونیشان',
    phone: 'ژمارەی مۆبایل',
    specialOffer: 'پێشنیاری تایبەت',
    likes: 'لایک',
    saves: 'پاشەکەوت',
    share: 'بڵاوکردنەوە',
    comment: 'کۆمێنت',
    addComment: 'کۆمێنت بنووسە...',
    postedBy: 'لەلایەن',
    exploreFeed: 'تۆڕی کۆمەڵایەتی (ترێندەکان)',
    exploreTab: 'دۆزینەوەی شوێنەکان',
    mapTab: 'نەخشەی ناوخۆیی',
    addBusinessTab: 'بێبەرامبەر پڕۆژەکەت دابنێ',
    aboutTab: 'دەربارەی ئێمە',
    addBusinessTitle: 'ببیتە هاوبەشی ساكۆ ماكۆ و پڕۆژەکەت بڵاوکەرەوە! 🚀',
    addBusinessSubtitle: 'پڕۆژەکەت بگەیەنە بە هەزاران گەنج و دۆست لە پارێزگاکەت بە تام و تەسلیمی تیک تۆک و ئینستاگرام',
    formBizName: 'ناوی کارەکە',
    formCategory: 'پۆلی کارەکە',
    formGov: 'پارێزگا',
    formPhone: 'ژمارەی مۆبایل',
    formAddress: 'ناونیشانی تەواو',
    formDesc: 'باسکردنی کارەکەت بە شێوازێک کە گەنجان سەرنجڕاکێش بکات',
    formImage: 'لینکی وێنەی سەرەکی (ئارەزوومەندانە)',
    btnSubmit: 'کارەکەت بڵاوکەرەوە ئێستا لەسەر ساكۆ ماكۆ 🎉',
    successMsg: 'کارەکەت بە سەرکەوتوویی بڵاوکرایەوە! یەکسەر دەردەکەوێت.',
    interactiveMapIntro: 'لەسەر نەخشە دەست لەسەر پارێزگاکە دابنێ بۆ تصفیەکردن و دۆزینەوەی ترێندەکان یەکسەر! 📊📍',
    postTitle: 'بڵاوکراوە و چالاکییەکان',
    reviewsTitle: 'پێداچوونەوەی فید باکەکانی کۆمەڵگەی ساكۆ ماكۆ',
    exploreCount: 'شوێنی دۆزراوە',
    addPostPlaceholder: 'کۆمێنتی خۆت دابنێ وەک گەشتیار...',
    ratingLabel: 'نمرە:',
    mapPinClick: 'کلیک لەسەر دەرزی نەخشەکە بکە بۆ بینینی وردەکارییەکان',
    close: 'داخستن',
    viewDetails: 'بینینی وردەکاری',
    ownerBadge: 'پادشای بازرگانی 👑',
    sharesCount: 'بڵاوکردنەوە',
    socialMediaFeelTitle: 'ستۆری و ترێندەکان لە عێراق 🔥',
    storyLineTitle: 'ستۆری بازرگانان',
    karradaPlace: 'کەڕادە، بەغداد',
    welcomeAlert: 'بەخێربێن بۆ ساكۆ ماكۆ! سەکۆکەمان چاکسازی گەورەی بۆ کراوە 🦁⚡',
    dealsCorner: 'عەرزە تایبەت و سارد نەکراوەکان 🔥'
  },
  en: {
    appName: 'Saku Maku',
    appSlogan: 'Iraq’s vibrant social-business discovery engine bringing spaces to life ✨',
    searchPlaceholder: 'Search beautiful cafés, food spots, lounges...',
    allIraq: 'All Iraq 🇮🇶',
    allCategories: 'All',
    heroBadge: 'Explore Iraq 🚀',
    ctaDiscover: 'Explore Now',
    governorateLabel: 'Governorate:',
    categoryHeader: 'Discovery Categories',
    loadMore: 'Load More',
    showLess: 'Show Less',
    noBusinessesFound: 'No trending places hosted in this governorate yet.',
    verified: 'Verified Portal',
    address: 'Address',
    phone: 'Phone No.',
    specialOffer: 'Active Promo & Perks',
    likes: 'Likes',
    saves: 'Saves',
    share: 'Share',
    comment: 'Comment',
    addComment: 'Write a comment...',
    postedBy: 'posted by',
    exploreFeed: 'Street Pulse (Social Feed)',
    exploreTab: 'Explore Places',
    mapTab: 'Interactive Maps',
    addBusinessTab: 'Host your Business free',
    aboutTab: 'Our Mission',
    addBusinessTitle: 'Claim Your Spotlight on Saku Maku 🚀',
    addBusinessSubtitle: 'Get discovered by thousands of stylish local youth looking for their next destination.',
    formBizName: 'Business / Boutique Name',
    formCategory: 'Business Category',
    formGov: 'Governorate Location',
    formPhone: 'Contact Number',
    formAddress: 'Full Street Address',
    formDesc: 'Write a compelling aesthetic description',
    formImage: 'Landscape Image URL (Optional)',
    btnSubmit: 'Launch on Saku Maku Feed! 🎉',
    successMsg: 'Congratulation! Your business is now live on our street feed catalogs.',
    interactiveMapIntro: 'Interactive map of Iraq. Tap any governorate bubble or pin to quickly filter trending spots in that urban hub! 📊📍',
    postTitle: 'Community Feed & Live Broadcasts',
    reviewsTitle: 'Community Voice & Reviews',
    exploreCount: 'Spots Decoded',
    addPostPlaceholder: 'Express your local experience...',
    ratingLabel: 'Rating:',
    mapPinClick: 'Tap on a pin to open the active business popup',
    close: 'Close',
    viewDetails: 'Explore Hub',
    ownerBadge: 'Iraqi Entrepreneur 👑',
    sharesCount: 'Shares',
    socialMediaFeelTitle: 'Live Stories & Feeds 🔥',
    storyLineTitle: 'Active Merchant Stories',
    karradaPlace: 'Karrada, Baghdad',
    welcomeAlert: 'Welcome to Saku Maku! The platform has been fully enhanced into an interactive social application 🦁⚡',
    dealsCorner: 'Promo Corner 🔥'
  }
};
