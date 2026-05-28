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
    code: 'qadisiyyah',
    name: {
      ar: 'القادسية 🌾',
      ku: 'قادسیە 🌾',
      en: 'Qadisiyyah 🌾'
    },
    englishLabel: 'Qadisiyyah'
  },
  {
    code: 'nineveh',
    name: {
      ar: 'نينوى 🍏',
      ku: 'نەینەوا 🍏',
      en: 'Nineveh 🍏'
    },
    englishLabel: 'Nineveh'
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
    id: 'restaurants_cafes',
    icon: '☕',
    name: {
      ar: 'مطاعم وكافيهات',
      ku: 'چێشتخانە و کافێ',
      en: 'Restaurants & Cafes'
    },
    color: 'from-emerald-600 to-teal-500'
  },
  {
    id: 'hotels_hospitality',
    icon: '🏨',
    name: {
      ar: 'فنادق وضيافة',
      ku: 'هۆتێل و میوانداری',
      en: 'Hotels & Hospitality'
    },
    color: 'from-amber-600 to-yellow-500'
  },
  {
    id: 'health_medical_services',
    icon: '�',
    name: {
      ar: 'صحة وخدمات طبية',
      ku: 'تەندروستی و خزمەتگوزاری پزیشکی',
      en: 'Health & Medical Services'
    },
    color: 'from-rose-600 to-pink-500'
  },
  {
    id: 'fitness_gyms',
    icon: '🏋️',
    name: {
      ar: 'لياقة وصالات رياضية',
      ku: 'ورزش و سالۆنی وەرزشی',
      en: 'Fitness & Gyms'
    },
    color: 'from-orange-600 to-red-500'
  },
  {
    id: 'education_training_centers',
    icon: '🎓',
    name: {
      ar: 'تعليم ومراكز تدريب',
      ku: 'خوێندن و قوتابخانە',
      en: 'Education & Training Centers'
    },
    color: 'from-indigo-600 to-purple-500'
  },
  {
    id: 'real_estate',
    icon: '🏢',
    name: {
      ar: 'عقارات',
      ku: 'عەقارات',
      en: 'Real Estate'
    },
    color: 'from-blue-600 to-sky-500'
  },
  {
    id: 'construction_contractors',
    icon: '🏗️',
    name: {
      ar: 'مقاولات وبناء',
      ku: 'بیناسازی و پەیمانکار',
      en: 'Construction & Contractors'
    },
    color: 'from-yellow-600 to-amber-700'
  },
  {
    id: 'beauty_salons',
    icon: '�',
    name: {
      ar: 'صالونات ومراكز تجميل',
      ku: 'ساڵۆنی جوانکاری',
      en: 'Beauty & Salons'
    },
    color: 'from-purple-600 to-pink-500'
  },
  {
    id: 'electronics_tech_shops',
    icon: '�',
    name: {
      ar: 'إلكترونيات وتقنية',
      ku: 'ئەلیکترۆنیات و تەکنەلۆژیا',
      en: 'Electronics & Tech Shops'
    },
    color: 'from-violet-600 to-indigo-500'
  },
  {
    id: 'it_software_services',
    icon: '💻',
    name: {
      ar: 'IT وخدمات برمجية',
      ku: 'IT و خزمەتگوزاری نەرمەواڵە',
      en: 'IT & Software Services'
    },
    color: 'from-cyan-600 to-blue-500'
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
  },

  // CLINICS SECTION
  {
    id: 'b-11',
    name: {
      ar: 'عيادة النخبة لطب الأسنان التجميلي',
      ku: 'کلینیکی نوخبە بۆ پزیشکی ددانی جوانکاری',
      en: 'Al-Nukhba Cosmetic Dental Clinic'
    },
    description: {
      ar: 'عيادة تخصصية تقدم أحدث تقنيات تجميل وزراعة الأسنان، ابتسامة هوليود، وتنظيف وتبييض الأسنان بأحدث أجهزة الليزر وبإشراف نخبة من الأطباء.',
      ku: 'کلینیکێکی تایبەتمەند کە نوێترین تەکنەلۆجیای جوانکاری و چاندنی ددان پێشکەش دەکات لەژێر سەرپەرشتی پزیشکانی لێهاتوو.',
      en: 'A premier dental medical facility specializing in Hollywood smiles, advanced implants, and pain-free laser whitening under top-rated specialists.'
    },
    category: 'clinic',
    governorate: 'baghdad',
    rating: 4.9,
    reviewsCount: 156,
    image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&auto=format&fit=crop&q=80'
    ],
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&auto=format&fit=crop&q=80',
    isVerified: true,
    phoneNumber: '+964782334455',
    address: {
      ar: 'بغداد، المنصور، شارع الرواد، عمارة النخبة، الطابق الثاني',
      ku: 'بەغداد، مەنسوور، شەقامی ڕەواد، باڵەخانەی نوخبە، قاتی دووەم',
      en: 'Baghdad, Mansour, Al-Rowad Street, Al-Nukhba Building, 2nd Floor'
    },
    likes: 412,
    saves: 234,
    featuredDeal: {
      ar: 'جلسة تنظيف وتلميع أسنان مجانية مع أي فحص شامل 🦷',
      ku: 'پاککردنەوەی ددان بێبەرامبەر لەگەڵ هەر پشکنینێکی گشتی ددان 🦷',
      en: 'Smile Promo: Free professional dental scaling with any comprehensive checkup 🦷'
    },
    mapCoords: { x: 37, y: 49 }
  },
  {
    id: 'b-12',
    name: {
      ar: 'عيادة رعاية الحياة التخصصية - إربيل',
      ku: 'کلینیکی چاودێری ژیان - هەولێر',
      en: 'LifeCare Specialty Medical Clinic'
    },
    description: {
      ar: 'مجمع طبي متكامل لتقديم أفضل الاستشارات الطبية في مجالات أمراض القلب والأنف والأذن والحنجرة والأشعة تحت إشراف طاقم طبي عالي الكفاءة.',
      ku: 'کۆمەڵگەیەکی پزیشکی گشتگیر بۆ پێشکەشکردنی باشترین پشکنینی پزیشکی لەژێر دەستی پزیشکانی خاوەن ئەزموون.',
      en: 'A comprehensive multi-specialty wellness clinic offering superior family medicine, cardiology consultations, and diagnostic testing in Erbil.'
    },
    category: 'clinic',
    governorate: 'erbil',
    rating: 4.8,
    reviewsCount: 88,
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&auto=format&fit=crop&q=80'
    ],
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&auto=format&fit=crop&q=80',
    isVerified: true,
    phoneNumber: '+9647508881234',
    address: {
      ar: 'أربيل، شارع ١٠٠م، قرب مجسر عينكاوة ومقاطعة عشتار',
      ku: 'هەولێر، شەقامی ١٠٠ مەتری، نزیک پردی عەنکاوە',
      en: 'Erbil, 100m Road, near Ainkawa intersection'
    },
    likes: 195,
    saves: 84,
    featuredDeal: {
      ar: 'فحص سكر وضغط مجاني للجميع كل يوم جمعة صباحاً 🩺',
      ku: 'پشکنینی شەکرە و پەستانی خوێن بێبەرامبەر هەموو ڕۆژانی هەینی 🩺',
      en: 'Friday Wellness: Free blood pressure and diabetes screening every Friday morning 🩺'
    },
    mapCoords: { x: 56, y: 25 }
  },

  // SHOPS & BOUTIQUES
  {
    id: 'b-13',
    name: {
      ar: 'أناقة بغداد للأزياء والموضة',
      ku: 'دوکانی پۆشاکی شاهانەی بەغداد',
      en: 'Baghdad Elegance Fashion House'
    },
    description: {
      ar: 'وجهتك الأولى لأحدث خطوط الموضة والأزياء النسائية الراقية، ملابس صيفية خفيفة، فساتين مناسبات، وملابس رسمية بتصاميم تناسب ذوقك الرفيع.',
      ku: 'باشترین شوێن بۆ جلی مۆدێرن و نوێی ژنان و دیزاینی هاوچەرخ گونجاو لەگەڵ حەزەکانتان.',
      en: 'A premier premium boutique housing the finest collection of signature ladies apparel, elegant summer dresses, hand-woven linens and stylish bags.'
    },
    category: 'clothing_store',
    governorate: 'baghdad',
    rating: 4.7,
    reviewsCount: 114,
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&auto=format&fit=crop&q=80'
    ],
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    isVerified: true,
    phoneNumber: '+964772114488',
    address: {
      ar: 'بغداد، المنصور، شارع الأميرات، قرب السفارة الليبية',
      ku: 'بەغداد، مەنسوور، شەقامی ئەمیرات، نزیک باڵیۆزخانەی لیبیا',
      en: 'Baghdad, Mansour, Ameerat Street, near Libyan Embassy'
    },
    likes: 310,
    saves: 192,
    featuredDeal: {
      ar: 'خصم ١٥٪ على التشكيلة الصيفية الجديدة عند الدفع الفوري كاش 👗💃',
      ku: 'داشکاندنی ١٥٪ بۆ هەموو مۆدێلە نوێیەکانی هاوینە بە پارەدانی کاش 👗💃',
      en: 'Summer Launch: 15% discount on the entire new collection for physical cash payments 👗💃'
    },
    mapCoords: { x: 39, y: 47 }
  },
  {
    id: 'b-14',
    name: {
      ar: 'الفهد للاتصالات والإلكترونيات - البصرة',
      ku: 'ئەل فەهەد بۆ مۆبایل و تەکنەلۆجیا',
      en: 'Al-Fahad Electronics & Mobile Hub'
    },
    description: {
      ar: 'المركز الأكبر لكافة أنواع الهواتف الذكية الحديثة وإكسسواراتها، لابتوبات، وأجهزة لوحية بضمان رسمي حقيقي وأنسب الأسعار التنافسية بالبصرة.',
      ku: 'گەورەترین مەکۆی مۆبایلە زیرەکەکان و ئێکسسوارات بە گەرەنتی ڕاستەقینە و نزمترین نرخ لە بەسرە.',
      en: 'Basra’s reliable tech store supplying the newest smartphones, gaming laptops, and mobile accessories with official local warranties.'
    },
    category: 'mobile_shop',
    governorate: 'basra',
    rating: 4.8,
    reviewsCount: 198,
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&auto=format&fit=crop&q=80'
    ],
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
    isVerified: true,
    phoneNumber: '+9647811223344',
    address: {
      ar: 'البصرة، حي العشار، شارع المكتبات التجاري العام',
      ku: 'بەغداد، گەڕەکی عەشار، شەقامی کتێبخانەکان',
      en: 'Basra, Ashar, Commercial Maktabat Street'
    },
    likes: 422,
    saves: 215,
    featuredDeal: {
      ar: 'شاحن باوربانك أصلي هدية مع شراء أي جوال رائد 📱🎁',
      ku: 'باوەر بانکی ئەسڵی دیاری لەگەڵ کڕینی هەر مۆبایلێکی بەرز 📱🎁',
      en: 'Tech Pack: Free branded fast-charging Powerbank with any flagship smartphone purchase 📱🎁'
    },
    mapCoords: { x: 81, y: 89 }
  }
];

<<<<<<< HEAD
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
      ar: 'تبحث عن هدوء وإنجاز؟ أجواء الدراسة والعمل في كافيه لوفا بالكرادة توفر لك كل سبل الرواق البغدادي الأصيل 📚 انترنت فائق السرعة، بيئة مريحة وخالية من الضجيج كروشة سينمائية راقية، وجرب الكابتشينو مالتنا مع الهيل العراقي المميز! ☕✨ مفتوحون يومياً لغاية منتصف الليل. هاتف للتواصل: +9647701234567 • الكرادة داخل، قرب ساحة التحريات.',
      ku: 'ژینگەیەکی هێمن و نایاب بۆ خوێندن و کارکردن لە کافێ لۆڤا لە بەغداد 📚 ئینتەرنێتی فێرا، کەشێکی دڵگیر وەک ڕۆژێکی بەهاری ڕووناک، لەگەڵ قاوەی نایابی هێلی عێراقی! ☕✨ هەموو ڕۆژێک تا نیوەی شەو کراوەیە. تەلەفۆن: +9647701234567 • کەڕادەی ناوەوە.',
      en: 'Vibrant vibes, premium cinematic aesthetic, and quiet spaces to fuel your daily hustle. Come try our specialty Cardamom Espresso Brew at Lova now! 📚 Fast Wi-Fi, cozy reading corners, and outstanding service. Open daily 8:00 AM - Midnight. Contact: +9647701234567 • Karrada Inside, Near Tahariyat Square ☕✨'
    },
    likes: 248,
    commentsCount: 2,
    shares: 34,
    views: 1150,
    timeAgo: {
      ar: 'منذ ٣ ساعات',
      ku: '٣ کاتژمێر پێش ئێستا',
      en: '3 hours ago'
    },
    likedByUser: false,
    savedByUser: false,
    comments: [
      { id: 'c1', username: 'hasan_baghdadi', text: 'الكافيه المفضل عندي بالكرادة، الخدمة فد شي راقي والقهوة خرافية 🔥', time: '1h' },
      { id: 'c2', username: 'layla.iq', text: 'Beautiful location, highly recommended for working remotely. Fast wifi!', time: '30m' }
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
      ar: 'المسكوف البغدادي الأصيل على ضفاف نهر دجلة الساحر في أبو نؤاس! 🐟🔥 سمك طازج يُشوى على حطب الصفصاف لمذاق بغدادي دافئ لا ينسى يرجعك لأيام بغداد القديمة الدافئة. بيئة عائلية راقية ومجلس مطل على النهر تحت النجوم البغدادية اللامعة. نعمل من 12 ظهراً لغاية 2 بعد منتصف الليل. هاتف للحجز والاستفسار الفوري: +9647719998822 • شارع أبو نؤاس، قرب تمثال شهريار وشهرزاد.',
      ku: 'ماسی مەسگوفی بەغدادی ڕەسەن لەسەر کەناری ڕووباری دجلەی فێنک! 🐟🔥 ماسی زۆر تازە بە تامی داری سروشتی. گونجاوە بۆ خێزان و دۆست بۆ بینینی دیمەنی دجلە. تا ٢ی شەو کراوەیە. تەلەفۆن: +9647719998822.',
      en: 'Golden traditional charcoal-grilled Tigris River Masgouf fish served sizzling hot. Experience absolute culinary heaven tonight with your family under the old Baghdad stars and refreshing river breeze. Open 12:00 PM - 2:00 AM. For premium family reservation tables, hotline: +9647719998822 • Abu Nuwas St 🐟🔥'
    },
    likes: 485,
    commentsCount: 2,
    shares: 82,
    views: 2550,
    timeAgo: {
      ar: 'منذ ٤ ساعات',
      ku: '٤ کاتژمێر پێش ئێستا',
      en: '4 hours ago'
    },
    likedByUser: true,
    savedByUser: false,
    comments: [
      { id: 'c3', username: 'ali_basrawi', text: 'أجمل إطلالة وأروع مسكوف مر علي ببغداد حبيبة قلبي ❤️', time: '2h' },
      { id: 'c4', username: 'kurdo_erbil', text: 'زور جوانة، لازم نزوركم الأسبوع القادم ان شاء الله مع العائلة', time: '1h' }
    ],
    promotionBadge: {
      ar: 'عرض عائلي مميز 👨‍👩‍👧‍👦',
      ku: 'پێشنیاری خێزانی 👨‍👩‍👧‍👦',
      en: 'Family Deal Special 👨‍👩‍👧‍👦'
    }
  },
  {
    id: 'post-3',
    businessId: 'b-5',
    businessName: 'Craft Burger - Bakhtiyari Erbil',
    businessAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&auto=format&fit=crop&q=80',
    category: 'dining',
    governorate: 'erbil',
    mediaUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&auto=format&fit=crop&q=80',
    caption: {
      ar: 'بركان من جبنة الشيدر المعتقة واللحم البلدي العراقي الطازج! 🍔🧀 هل جربت برغر اللحم المحشي بجبنتنا اللذيذة في فرعنا البختياري؟ لحم بلدي محلي طازج يحضر يومياً خصيصاً لكم بخلطات كرافت السرية. اشترِ أي وجبة برغر واحصل على بطاطا كرافت وصودا مجاناً بالكامل للطلاب والمتابعين! 🍟 هاتف: +9647504449900 • أربيل، حي بختياري، شارع المطاعم الرئيسي.',
      ku: 'کێ حەزی لە بەرگری بەتامە؟ 🍔🧀 گۆشتی فرێشی کوردی بە شێواز و سۆسی تایبەت لە گەڕەکی بەختیاری هەولێر. ژەمە هەمبەرگرێک بکڕە و پەتاتەی گەرم و سۆدا بێبەرامبەر وەربگرە! تەلەفۆن: +9647504449900.',
      en: 'Oozing cheddar cheese explosion, hand-pressed prime local beef, and gourmet toasted brioche. Your dream burger is waiting for you at Craft Burger Bakhtiyari Erbil! 🍔🧀 Buy any combo and get free craft fries & soda upgrade today! Hotline: +9647504449900 • Bakhtiyari Main Boulevard 🍟'
    },
    likes: 215,
    commentsCount: 1,
    shares: 29,
    views: 1020,
    timeAgo: {
      ar: 'منذ يوم',
      ku: 'دوێنێ',
      en: '1 day ago'
    },
    likedByUser: false,
    savedByUser: true,
    comments: [
      { id: 'c5', username: 'shanga_erbil', text: 'The best service and the absolute juiciest burgers in Erbil Bakhtiyari 🍔🍟', time: '18h' }
    ],
    promotionBadge: {
      ar: 'ترقية الوجبة مجاناً 🍟',
      ku: 'پەتاتەی بەخۆڕایی 🍟',
      en: 'Free Fries Upgrade 🍟'
    }
  },
  {
    id: 'post-4',
    businessId: 'b-11',
    businessName: 'Al-Nukhba Cosmetic Dental Clinic',
    businessAvatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&auto=format&fit=crop&q=80',
    category: 'clinic',
    governorate: 'baghdad',
    mediaUrl: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&auto=format&fit=crop&q=80',
    caption: {
      ar: 'احصل على ابتسامة أحلامك الواثقة والصحية! ⭐🦷 عيادة النخبة لطب الأسنان بفرعها التخصصي بالمنصور تقدم أحدث تقنيات تبييض الأسنان بالليزر وتصميم ابتسامة هوليود البراقة بدون ألم وبإشراف نخبة من كبار الأخصائيين. تنظيف وتلميع أسنان مجاني تماماً مع أي فحص شامل للمتابعين. احجز موعدك الآن: +964782334455 • المنصور، شارع الرواد، عمارة النخبة، الطابق الثاني. أوقات العمل من 3:00 مساءً لغاية 9:00 مساءً.',
      ku: 'پێبکەنینێکی سپیی شایستە و ناوازە بەدەستبهێنە! ⭐🦷 کلینیکی نوخبە بۆ پزیشکی ددانی جوانکاری لە بەغداد مەنسوور باشترین چارەسەر و سپیکردنەوەی ددان بە گرەنتی پێشکەش دەکات. زەردەخەنەی هۆلیوود بەبێ ئازار پێشکەشە. تەلەفۆن بۆ حیجزکردن: +964782334455. کراوەیە لە ٣ی ئێوارە تا ٩ی شەو.',
      en: 'Get the perfect radiant smile you deserve! ⭐🦷 Al-Nukhba Clinic offers advanced cosmetic teeth whitening, professional smile design, and pain-free laser scaling. Free cleaning session included with any comprehensive consultation for Saku Maku users! Book today: +964782334455 • Al-Mansour, Al-Rowad Street, Al-Nukhba Bldg, 2nd floor 🦷'
    },
    likes: 142,
    commentsCount: 2,
    shares: 55,
    views: 820,
    timeAgo: {
      ar: 'منذ ٧ ساعات',
      ku: '٧ کاتژمێر پێش ئێستا',
      en: '7 hours ago'
    },
    likedByUser: false,
    savedByUser: false,
    comments: [
      { id: 'c11', username: 'dr_samir', text: 'جهاز تبييض الأسنان بالليزر عندهم فد شي متطور، وزرتهم الأسبوع الفات شغل راقي', time: '5h' },
      { id: 'c12', username: 'noor_beauty', text: 'Very neat clinic and professional dental care!', time: '2h' }
    ],
    promotionBadge: {
      ar: 'استشارة مجانية 🩺',
      ku: 'پشکنینی بێبەرامبەر 🩺',
      en: 'Free Consultation 🩺'
    }
  },
  {
    id: 'post-5',
    businessId: 'b-13',
    businessName: 'Baghdad Elegance Fashion House',
    businessAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    category: 'clothing_store',
    governorate: 'baghdad',
    mediaUrl: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&auto=format&fit=crop&q=80',
    caption: {
      ar: 'تألقي هذا الموسم بأروع تشكيلة من ملابس الكتان الخفيفة والأزياء النسائية الفاخرة! 👗✨ مصممة بأيدي نخبة من المبدعين العراقيين لتضفي عليك لمسة من الجاذبية والأناقة في عطلات العمل والمناسبات الرسمية. تم إطلاق تشكيلة الصيف الجديدة بالكامل مع خصم ١٥٪ لمن يدفع بنظام الكاش! تفضلي بزيارتنا واستمتعي بتجربة تسوق فريدة. هاتف للتواصل: +964772114488 • المنصور، شارع الأميرات، قرب السفارة الليبية.',
      ku: 'ئەم هاوینە بە شیکترین و نایابترین جلوبەرگ تێپەڕێنە! 👗✨ مۆدێلە نوێیەکانی هاوینە بە کەتانی زۆر فێنک لای ئێمە ئامادەیە بە داشکاندنی تایبەتی ١٥٪ لەکاتی پارەدانی نەختینە. بمانبینە لە بەغداد، مەنسوور، شەقامی ئەمیرات. تەلەفۆن: +964772114488.',
      en: 'Empower your summer style with our gorgeous breathable linen collection! 👗✨ Hand-woven luxury details tailored carefully by local creative designers to match your supreme elegance. Active launch deal: Enjoy 15% discount on all purchases settled in physical cash. Visit us now: Mansour, Ameerat St. Tel: +964772114488'
    },
    likes: 205,
    commentsCount: 2,
    shares: 42,
    views: 1120,
    timeAgo: {
      ar: 'منذ ٨ ساعات',
      ku: '٨ کاتژمێر پێش ئێستا',
      en: '8 hours ago'
    },
    likedByUser: false,
    savedByUser: false,
    comments: [
      { id: 'c13', username: 'rana.style', text: 'الكتان الأبيض يجنن أخذت منه فستان ومريح بشكل بالحر 😍', time: '6h' },
      { id: 'c14', username: 'baghdad_chic', text: 'Highly recommend this house if you love unique, non-commercial clothing.', time: '4h' }
    ],
    promotionBadge: {
      ar: 'خصم الكاش ١٥٪ 👗',
      ku: '١٥٪ داشکاندن 👗',
      en: '15% Cash Discount 👗'
    }
  },
  {
    id: 'post-6',
    businessId: 'b-3',
    businessName: 'Mado Café - Erbil Citadel Road',
    businessAvatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80',
    category: 'coffee',
    governorate: 'erbil',
    mediaUrl: 'https://images.unsplash.com/photo-1498804103079-a6351b050096?w=800&auto=format&fit=crop&q=80',
    caption: {
      ar: 'حلوى البقلاوة التركية مع فنجان غني من الدبل اسبريسو الساخن تحت نسيم جبال أربيل وإطلالة قلعة أربيل الساحرة! 🍰☕ الجلسة الخارجية لا تقارن، وتفتح النفس للدراسة والدردشة مع الأصدقاء. استخدم رمز الخصم الحصري "MADO15" للحصول على حلوى مجاناً مع قهوتك. تواصل معنا: +9647501122334 • شارع قضاء القلعة، مقابل حديقة سامي عبد الرحمن. نعمل لغاية الساعة 1:00 صباحاً.',
      ku: 'باقلاوای بەناوبانگی تورکی لەگەڵ کوپێک قاوەی گەرم لەسەر شەقامی قەلای هەولێری دڵگیر! 🍰☕ کۆدی داشکاندنی "MADO15" بەکاربهێنە بۆ وەرگرتنی شیرینی بێبەرامبەر لەگەڵ دۆبڵ ئیسپرێسۆدا. تا ١ی شەو کراوەیە. تەلەفۆن: +9647501122334.',
      en: 'Traditional Turkish baklava sweets paired with hot rich Double Espresso under Erbil’s amazing spring breeze and spectacular citadel road view! 🍰☕ Use discount code "MADO15" for an exclusive sweet upgrade on Saku Maku app! Open daily until 1:00 AM. Location: Citadel Road, Erbil. Hotline: +9647501122334'
    },
    likes: 312,
    commentsCount: 2,
    shares: 41,
    views: 1420,
    timeAgo: {
      ar: 'منذ يومين',
      ku: '٢ ڕۆژ پێش ئێستا',
      en: '2 days ago'
    },
    likedByUser: false,
    savedByUser: false,
    comments: [
      { id: 'c15', username: 'danial_kurd', text: 'باقلاوە کانیان زۆر زۆر تایبەتە و تامی تورکی ڕاستەقینەیە', time: '1d' },
      { id: 'c16', username: 'ahmed_baghdadi', text: 'المادو كافيه فخر قلعة أربيل، جلسة رايقة والخدمة ممتازة', time: '15h' }
    ],
    promotionBadge: {
      ar: 'بقلاوة مجانية 🍰',
      ku: 'باقلاوای بەلاش 🍰',
      en: 'Free Baklava Upgrade 🍰'
    }
  },
  {
    id: 'post-7',
    businessId: 'b-14',
    businessName: 'Al-Fahad Electronics & Mobile Hub',
    businessAvatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
    category: 'mobile_shop',
    governorate: 'basra',
    mediaUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&auto=format&fit=crop&q=80',
    caption: {
      ar: 'عشاق الهواتف والتقنية في البصرة! 📱🎁 اقتنِ الآن أقوى الهواتف الرائدة بضمان فني فوري معتمد وبأفضل الأسعار المنافسة في السوق البصراوية. واحصل على شاحن باوربانك سريع هدية مجانية مضمونة مع أي موبايل يتم شراؤه خلال هذا الأسبوع. العنوان: حي العشار، شارع المكتبات التجاري العام، البصرة. اوقات العمل من 9 صباحاً لغاية 10 مساءً. هاتف للتواصل أو الطلب: +9647811223344.',
      ku: 'دیارییەکی نایاب لە فرۆشگای ئەل فەهەد لە بەسرە! 📱🎁 مۆبایلێکی بەرز بکڕە و پاوەربانکێکی خێرا بە دیاری فەرمی لەگەڵ کڕیندا وەربگرە. ناونیشان: بەسرە، گەڕەکی عەشار، شەقامی کتێبخانەکان. تەلەفۆن: +9647811223344.',
      en: "Calling all Basra tech enthusiasts! 📱🎁 Upgrade your device today at Al-Fahad Mobile Hub with local official warranty and Basra's unmatched competitive rates. Get a free fast-charging branded Powerbank with every flagship phone purchased this week! Ashar, Commercial Maktabat St. Hours: 9:00 AM - 10:00 PM. Call: +9647811223344."
    },
    likes: 235,
    commentsCount: 2,
    shares: 48,
    views: 1200,
    timeAgo: {
      ar: 'منذ ١٢ ساعة',
      ku: '١٢ کاتژمێر پێش ئێستا',
      en: '12 hours ago'
    },
    likedByUser: false,
    savedByUser: false,
    comments: [
      { id: 'c17', username: 'basra_vip', text: 'شريت جهاز سامسونج رائد وحصلت على هديتي والضمان عراقي ممتاز', time: '8h' },
      { id: 'c18', username: 'electronics_guru', text: 'Highly trustworthy mobile reseller in Basra Ashar. Excellent customer support.', time: '5h' }
    ],
    promotionBadge: {
      ar: 'باوربانك هدية 🎁',
      ku: 'پاوەربانکی بەخۆڕایی 🎁',
      en: 'Free Powerbank Gift 🎁'
    }
  },
  {
    id: 'post-8',
    businessId: 'b-7',
    businessName: 'Titanic Hotel & Spa Sulaymaniyah',
    businessAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    category: 'hotels',
    governorate: 'sulaymaniyah',
    mediaUrl: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&auto=format&fit=crop&q=80',
    caption: {
      ar: 'عش رفاهية الملوك وتذوق نسمات جبال السليمانية الباردة الساحرة! 🏔️🏨 يسعدنا في فندق تايتانك المصنف 5 نجوم تقديم باقة الاستجمام الخاصة بنهاية الأسبوع، والتي تشمل ليلة إضافية مجانية عند حجز ٣ ليالٍ متتالية عبر التطبيق، مع دخول مجاني للسبا التخصصي والمسبح الخارجي المطل على الجبال. احجز استجمامك الهادئ الآن: +9647480556633 • السليمانية، شارع سالم، قرب تلال سرجنار.',
      ku: 'ئارامی و حەوانەوەی شاهانە لەگەڵ دیمەنی کێوەکانی سلێمانی لە هۆتێلی تایتانیک! 🏔️🏨 پاکێجی بەهاری تەندروستی سپا و مەلەوانگە چاوەڕێتان دەکات لە لای فێنکی دژە گەرمای سلێمانی. تەلەفۆن بۆ رزەربکردن: +9647480556633. کاتێکی شاهانە ببە بەڕێوە.',
      en: 'Soak in world-class 5-star comfort and therapeutic mountain air at Titanic Hotel & Spa Sulaymaniyah. 🏔️🏨 Book 3 consecutive nights and get your 4th night absolutely free! Package includes complete access to our multi-sensory spa and mountain-view infinity pool. Salim Street, Near Sarchinar Hills. Call bookings hotline: +9647480556633.'
    },
    likes: 620,
    commentsCount: 2,
    shares: 94,
    views: 3100,
    timeAgo: {
      ar: 'منذ يومين',
      ku: '٢ ڕۆژ پێش ئێستا',
      en: '2 days ago'
    },
    likedByUser: false,
    savedByUser: true,
    comments: [
      { id: 'c6', username: 'ahmed_iraqi', text: 'أجمل مكان للاسترخاء بالعراق بلا منافس! الجو هناك يجنن والسبا فد شي خرافي 🏞️', time: '1d' },
      { id: 'c7', username: 'mari_explorer', text: 'Super friendly staff and exceptional luxury services in Kurdistan.', time: '20h' }
    ],
    promotionBadge: {
      ar: 'ليلة مجانية 🏨',
      ku: 'شەوێکی بەبێ بەرامبەر 🏨',
      en: '1 Night Free Special 🏨'
    }
  },
  {
    id: 'post-9',
    businessId: 'b-12',
    businessName: 'LifeCare Specialty Medical Clinic',
    businessAvatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&auto=format&fit=crop&q=80',
    category: 'clinic',
    governorate: 'erbil',
    mediaUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&auto=format&fit=crop&q=80',
    caption: {
      ar: 'صحتك وصحة عائلتك هي أثمن ما تملك! 🩺❤️ يسر عيادة رعاية الحياة التخصصية في أربيل الإعلان عن حملة الفحص الوقائي الشامل لضغط الدم ومستويات السكر كل يوم جمعة في الفترة الصباحية، بمرافقة استشارات أولية وإرشادات أطبائنا ذوي الكفاءة العالية لمرضى القلب والضغط. يسعدنا تقديم الرعاية لكم دائماً. الحجز فوري: +9647508881234 • أربيل، شارع ١٠٠م، قرب مجسر عينكاوة ومقاطعة عشتار.',
      ku: 'تەندروستیت لە سەرووی هەموو پێشبینییەکەوەیە! 🩺❤️ کلینیکی چاودێری ژیان لە هەولێر پشکنینی فشاری خوێن و شەکرە بێبەرامبەر پێشکەش دەکات هەموو ڕۆژانی هەینی بۆ پاراستنی تەندروستی خێزانەکانتان. تەندروست بن هەمیشە. تەلەفۆن بۆ گەیاندن: +9647508881234.',
      en: "Protect your heart and health! 🩺❤️ LifeCare Specialty Clinic Erbil is organizing a free comprehensive wellness screening for diabetes and cardiovascular hypertension this Friday morning. Get expert advice and personalized preventative plans from our experienced medical board. Location: 100m Road, near Ainkawa intersection Erbil. Phone booking: +9647508881234."
    },
    likes: 98,
    commentsCount: 1,
    shares: 15,
    views: 540,
    timeAgo: {
      ar: 'منذ يوم',
      ku: 'دوێنێ',
      en: '1 day ago'
    },
    likedByUser: false,
    savedByUser: false,
    comments: [
      { id: 'c19', username: 'pary_erbil', text: 'سوپاس بۆ ئەم خزمەتگوزارییە نایابەتان هەمیشە یارمەتیدەرن', time: '12h' }
    ],
    promotionBadge: {
      ar: 'فحص وقائي مجاني  ❤️',
      ku: 'پشکنینی بەخۆڕایی ❤️',
      en: 'Free Health Screening ❤️'
    }
  },
  {
    id: 'post-10',
    businessId: 'b-9',
    businessName: 'Hair Town Barbers - Jadriya',
    businessAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    category: 'salon',
    governorate: 'baghdad',
    mediaUrl: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800&auto=format&fit=crop&q=80',
    caption: {
      ar: 'ثقتك ومظهرك هما عنوان تألقنا في صالون هير تاون الرجالي! 💈✂️ احصل على قصة شعر ستايل مميزة تناسب ذوقك وتمنحك حضوراً عصرياً، إلى جانب حلاقة ذقن راقية بالبخار الساخن وجلسة تنظيف بشرة مجانية تماماً بماسك الفحم الأسود الفعال للعناية الفائقة. نعمل يومياً من الساعة 10:00 صباحاً ولغاية 11:00 مساءً. العنوان: بغداد، الجادرية، قرب جامعة بغداد، تقاطع الحرية. تفضل بالحجز المسبق: +964771225577.',
      ku: 'جوانتر و شیکتر ببە لە ساڵۆنی هێر تاونی پیاوان لە جادریەی بەغداد! 💈✂️ باشترین خزمەتگوزاری تاشینی قژ و چاککردنی ڕیش و ماسکی دەموچاو بەبێ ئازار بۆ گشت گەنجان. تەلەفۆن بۆ پۆشین: +964771225577. کراوەیە لە ١٠ی بەیانی تا ١١ی شەو.',
      en: 'Groom with confidence and premium service at Hair Town Barbers Jadriya! 💈✂️ Pamper yourself with a sharp customized haircut, premium hot steam shave, and a complimentary deep exfoliating charcoal face mask mask to restore your skin. Backbeat modern music, amazing barista coffee. Open 10:00 AM - 11:00 PM. Reservations phone: +964771225577 • Liberty Intersection, Jadriya.'
    },
    likes: 154,
    commentsCount: 2,
    shares: 21,
    views: 780,
    timeAgo: {
      ar: 'منذ ١٠ ساعات',
      ku: '١٠ کاتژمێر پێش ئێستا',
      en: '10 hours ago'
    },
    likedByUser: false,
    savedByUser: false,
    comments: [
      { id: 'c9', username: 'kamal_karrada', text: 'أرقى صالون حلاقة وعناية ببغداد، كادر محترف والخدمة عالبخار ولا غلطة ⭐', time: '6h' },
      { id: 'c10', username: 'ryan_barber', text: 'Stunning place, the facial remedy is absolute magic.', time: '3h' }
    ],
    promotionBadge: {
      ar: 'تنظيف بشرة مجاني 💆‍♂️',
      ku: 'ماسک بەلاش 💆‍♂️',
      en: 'Free Charcoal Face Mask 💆‍♂️'
    }
=======
// Realistic post templates by category
const POST_TEMPLATES: Record<string, { en: string[]; ar: string[]; ku: string[] }> = {
  restaurant: {
    en: [
      'Fresh grilled family platters now available! Dine in or order delivery. Open daily 10 AM – 11 PM.',
      'Weekend special: Buy 2 mains get 1 free. Call now to reserve your table!',
      'New chef\'s special menu launched today. Come taste the difference.',
      'Hosting a private event? We offer catering services across the city. Contact us for details.',
      'Daily fresh bread baked in-house. Authentic Iraqi flavors since 2010.'
    ],
    ar: [
      'أطباق مشوية طازجة متاحة الآن للعائلات! تناول الطعام في المكان أو اطلب التوصيل. مفتوح يومياً من 10 صباحاً حتى 11 مساءً.',
      'عرض نهاية الأسبوع: اشترِ طبقين رئيسيين واحصل على الثالث مجاناً. اتصل الآن لحجز طاولتك!',
      'قائمة طعام جديدة من الشيف أطلقت اليوم. تعال و taste الفرق.',
      'تستضيف حدثاً خاصاً؟ نقدم خدمات الولائم في جميع أنحاء المدينة. اتصل بنا للتفاصيل.',
      'خبز طازج يومياً مخبوز في المنزل. نكهات عراقية أصيلة منذ عام 2010.'
    ],
    ku: [
      'جێگای خواردنی تایبەتی خێزانی لەبەردەستە! لە ناوخۆدا بخۆ یان داوای گەیاندن بکە. ڕۆژانە کراوەیە لە 10 بەروار تا 11 شەو.',
      'تایبەتی ھەفتە: 2 خواردنی سەرەکی بکڕە، 3یەم بەخۆڕاییە. ئێستا پەیوەندی بکە بۆ داواکردنی مێز!',
      'لیستی خواردنی نوێی شێف بەڕێوەچوو. بێن و جیاوازی تام بکە.',
      'بەرنامەیەکی تایبەت دابەش دەکەیت؟ خزمەتگوزاری بەڕێوەبردنی بەسەر شاردا پێشکەش دەکەین. پەیوەندیمان بکە بۆ وردەکاری.',
      'نانێکی تازە ڕۆژانە لە ناوخۆدا دەکڕێن. تامی عێراقی ڕەسەن لە 2010ەوە.'
    ]
  },
  cafe_bakery: {
    en: [
      'Morning brew alert! Specialty coffee and fresh pastries daily from 7 AM. Free WiFi & cozy vibes.',
      'New seasonal cake collection just dropped. Perfect for birthdays and gatherings.',
      'Study-friendly environment with quiet zones. Students get 15% off after 2 PM.',
      'Weekend brunch menu: avocado toast, eggs Benedict, and fresh juice combos.',
      'Grab your loyalty card — buy 5 coffees, get the 6th free!'
    ],
    ar: [
      'تنبيه القهوة الصباحية! قهوة مميزة وحلويات طازجة يومياً من الساعة 7 صباحاً. واي فاي مجاني وأجواء مريحة.',
      'مجموعة كيك موسمية جديدة وصلت للتو. مثالية لأعياد الميلاد والتجمعات.',
      'بيئة مناسبة للدراسة مع مناطق هادئة. الطلاب يحصلون على خصم 15% بعد الساعة 2 ظهراً.',
      'قائمة برانش نهاية الأسبوع: توست الأفوكادو، بيض بنديكت، وعصائر طازجة.',
      'احصل على بطاقة الولاء — اشترِ 5 قهوات واحصل على السادسة مجاناً!'
    ],
    ku: [
      'ئاگاداری قاوەی بەیانی! قاوەی تایبەتی و شیرینی تازە ڕۆژانە لە 7 بەیانیەوە. وای فای ئازاد و کەش و هەوایەکی خۆش.',
      'کۆلێکشنی کیکی وەرزی نوێ تازە دابەزێنراوە. ئەمە بۆ ڕۆژی لەدایکبوون و کۆبوونەوەکان.',
      'ژینگەی خوێندن بە ناوچە ئارامەکان. خوێندکاران 15% داشکان وەردەگرن دوای 2 دوانیان.',
      'لیستی برانچی ھەفتە: تۆستی ئەڤۆکادۆ، ئێگ بێنێدیکت، و شیرەی تازە.',
      'کارتی دڵسۆزیەکەت بگرە — 5 قاوە بکڕە، 6یەم بەخۆڕاییە!'
    ]
  },
  supermarket: {
    en: [
      'Weekly deals are here! Fresh produce, dairy, and pantry staples at unbeatable prices.',
      'New organic section now open. Imported goods and local favorites side by side.',
      'Family value packs available. Save more when you buy in bulk.',
      'Open 24/7 for your convenience. Home delivery available across the governorate.',
      'Ramadan essentials now in stock. Dates, juices, and traditional sweets.'
    ],
    ar: [
      'عروض الأسبوع هنا! منتجات طازجة، ألبان، ومستلزمات المطبخ بأسعار لا تُقهر.',
      'قسم الأغذية العضوية الجديد مفتوح الآن. بضائع مستوردة ومحلية في مكان واحد.',
      'عبوات القيمة العائلية متاحة. وفّر أكثر عند الشراء بالجملة.',
      'مفتوح 24/7 لراحتك. خدمة التوصيل للمنازل متاحة في جميع أنحاء المحافظة.',
      'مستلزمات رمضان متوفرة الآن. تمر، عصائر، وحلويات تقليدية.'
    ],
    ku: [
      'ئۆفەری ھەفتەیی لێرەیە! بەرهەمێکی تازە، شیر و بەسڵەکانی ناونخ بە نرخێکی ناتەباو.',
      'بەشی ئۆرگانیکی نوێ ئێستا کراوەیە. بەرهەمە ھەناردەکراوەکان و دڵخوازانی ناوخۆیی لە کناری یەکتردان.',
      'پاکێجی بەهای خێزانی لەبەردەستە. زیاتر پاشەکەوت بکە کاتێک بە کۆمەڵ دەکڕیت.',
      '٢٤/٧ کراوەیە بۆ ئاسانیەکەت. گەیاندنی ناوخۆ لەسەرجەم پارێزگاکە بەردەستە.',
      'پێداویستیەکانی ڕەمەزان ئێستا لە کۆگاکەماندان. خورما، شیرە و شیرینیە کۆنەکان.'
    ]
  },
  mall: {
    en: [
      'Weekend shopping festival starts Friday! Up to 70% off on selected brands.',
      'New international stores now open on the 2nd floor. Explore the latest fashion trends.',
      'Kids entertainment zone expanded. Bring the whole family for a fun day out.',
      'Free parking for the first 2 hours. Valet service available at Gate 3.',
      'Food court renovation complete! 12 new restaurants and cafes to try.'
    ],
    ar: [
      'مهرجان التسوق نهاية الأسبوع يبدأ الجمعة! خصومات تصل إلى 70% على الماركات المختارة.',
      'متاجر دولية جديدة مفتوحة الآن في الطابق الثاني. استكشف أحدث صيحات الموضة.',
      'منطقة الترفيه للأطفال توسعت. اصطحب العائلة بأكملها ليوم ممتع.',
      'موقف سيارات مجاني للساعتين الأوليين. خدمة الڤاليه متاحة عند البوابة 3.',
      'تجديد مطعم المحكمة اكتمل! 12 مطعم ومقهى جديد لتجربتهم.'
    ],
    ku: [
      'فیستیڤاڵی کڕینی ھەفتە لە ھەینی دەستپێدەکات! داشکان تا 70% لەسەر نیشانە ھەڵبژێردراوەکان.',
      'دوکانە نێودەوڵەتییە نوێیەکان ئێستا لە نهۆمی 2ەم کراوەن. نوێترین بانگەوازی فاشنەکەت دۆزەوە.',
      'ناوچەی کێش و شاخیکانی منداڵان فراوان کرا. ھەموو خێزانەکەت بێن بۆ ڕۆژێکی خۆش.',
      'پارکینگی بەخۆڕایی بۆ 2 کاتژمێری یەکەم. خزمەتگوزاری ڤالێت لە دەرگای 3 بەردەستە.',
      'نوێکردنەوەی قوتابخانەی خواردن تەواو بوو! 12 چێشتخانە و کافێی نوێ بۆ تامکردن.'
    ]
  },
  pharmacy: {
    en: [
      'Free blood pressure check every Tuesday. Walk in, no appointment needed.',
      'New vitamins and supplements section stocked. Ask our pharmacist for advice.',
      'Prescription delivery service now available. Call us to arrange same-day delivery.',
      'Flu shots available. Protect your family this season.',
      'Baby care essentials: diapers, formula, and skincare. All trusted brands in one place.'
    ],
    ar: [
      'فحص ضغط الدم مجاناً كل ثلاثاء. ادخل مباشرة، لا حاجة لموعد مسبق.',
      'قسم الفيتامينات والمكملات الجديد مخزّن. اسأل صيدلانيّنا للحصول على النصيحة.',
      'خدمة توصيل الوصفات الطبية متاحة الآن. اتصل بنا لترتيب التوصيل في نفس اليوم.',
      'لقاحات الإنفلونزا متاحة. احمِ عائلتك هذا الموسم.',
      'مستلزمات رعاية الأطفال: حفاضات، حليب صناعي، وعناية بالبشرة. جميع الماركات الموثوقة في مكان واحد.'
    ],
    ku: [
      'پشکنینی ڕێژەی خوێنی بێ بەرامبەر ھەر سێشەممەیەک. بێ داواکردن، پێویست بە چارەسەری پێشوو ناکات.',
      'بەشی ڤیتامین و ماددە کۆمەڵکەرە نوێیەکان پڕکراونەتەوە. دەرمانسازمان بپرسە بۆ ئامۆژگاری.',
      'خزمەتگوزاری گەیاندنی دەرمان ئێستا بەردەستە. پەیوەندیمان بکە بۆ ڕێکخستنی گەیاندنی ھەمان ڕۆژ.',
      'تێکەڵکاری فڵۆ بەردەستە. ئەم وەرزە خێزانەکەت بپارێزە.',
      'پێداویستییەکانی منداڵی: جلەبەرگە، شیر و چاودێری پێست. ھەموو نیشانە ئەمنیەکان لە شوێنێکدا.'
    ]
  },
  hospital: {
    en: [
      '24/7 emergency services with modern ICU facilities. Your health is our priority.',
      'Specialist consultations available: cardiology, orthopedics, and pediatrics. Book online.',
      'Health checkup packages starting at affordable rates. Full body screening available.',
      'New maternity ward with private suites. Experienced obstetricians on call.',
      'Accepting all major insurance plans. Cashless treatment facility available.'
    ],
    ar: [
      'خدمات الطوارئ 24/7 مع مرافع العناية المركزة الحديثة. صحتك هي أولويتنا.',
      'استشارات الأخصائيين متاحة: أمراض القلب، العظام، وطب الأطفال. احجز عبر الإنترنت.',
      'باقات الفحص الصحي تبدأ بأسعار معقولة. فحص شامل للجسم متاح.',
      'قسم الولادة الجديد مع أجنحة خاصة. أطباء نساء ذوو خبرة متواجدون.',
      'نقبل جميع خطط التأمين الرئيسية. خدمة العلاج بدون نقد متاحة.'
    ],
    ku: [
      'خزمەتگوزاری ھاتوچۆ 24/7 لەگەڵ ئۆتێلەکانی ICU ی ئەمری. تەندروستی تەرجیحی ئێمەیە.',
      'وتارەکانی پزیشکی تایبەتی بەردەستن: دڵ، ئێسک و منداڵبوون. لەسەرھێڵ داوابکە.',
      'پاکێجی پشکنینی تەندروستی بە نرخێکی گونجاو دەستپێدەکات. پشکنینی تەواوی لەش بەردەستە.',
      'بەشی منداڵبوونی نوێ لەگەڵ ژووری تایبەت. پزیشکانی ئێکسپێرتی ژنان لە پەیوەندیدان.',
      'ھەموو پلانە سەرەکییەکانی بیمە وەردەگرین. خزمەتگوزاری چارەسەری بێ پارە بەردەستە.'
    ]
  },
  clinic: {
    en: [
      'Same-day appointments available. Walk-ins welcome for minor ailments.',
      'Dental checkups and cleanings at half price this month only.',
      'Pediatric clinic open Saturdays. Vaccinations and growth monitoring.',
      'Physiotherapy sessions now offered. Experienced therapists on staff.',
      'Lab tests with fast results. Blood work, X-rays, and ultrasound available.'
    ],
    ar: [
      'مواعيد في نفس اليوم متاحة. استقبال الزوار مباشرة للحالات البسيطة.',
      'فحوصات و تنظيف الأسنان بنصف السعر هذا الشهر فقط.',
      'عيادة الأطفال مفتوحة أيام السبت. تطعيمات ومتابعة النمو.',
      'جلسات العلاج الطبيعي متاحة الآن. أخصائيون مؤهلون في الفريق.',
      'تحاليل مختبرية بنتائج سريعة. فحوصات الدم، الأشعة السينية، والألتراساوند متاحة.'
    ],
    ku: [
      'چارەسەری ھەمان ڕۆژ بەردەستە. بۆ نەخۆشییە بچووکەکان بەخێرایی قبوڵ دەکرێن.',
      'پشکنین و پاککردنەوەی ددان لەگەڵ نیوە نرخ ئەم مانگە تەنها.',
      'نەخۆشخانەی منداڵان لە شەممە کراوەیە. ڤاکسین و چاودێری گەشەسەندن.',
      'دامەزراندنی فێزیۆتێراپی ئێستا پێشکەش دەکرێت. چارەسازانی ئێکسپێر لە کارمەندیدان.',
      'تاقیکردنەوەی تاقیگە بە ئەنجامی خێرا. خوێن، X-ray و ئاڵتراساوند بەردەستە.'
    ]
  },
  doctor: {
    en: [
      'Board-certified specialist with 15+ years experience. Accepting new patients.',
      'Second opinion consultations available. Bring your medical records.',
      'Telemedicine appointments via video call. Stay home, stay safe.',
      'Evening clinic hours: 5 PM – 9 PM, Monday through Thursday.',
      'Home visits for elderly and disabled patients. Call to schedule.'
    ],
    ar: [
      'أخصائي معتمد بخبرة 15+ سنة. نقبل مرضى جدد.',
      'استشارات رأي ثانٍ متاحة. اجلب سجلاتك الطبية.',
      'مواعيد طبية عن بعد عبر مكالمة الفيديو. ابقَ في المنزل، ابقَ آمناً.',
      'ساعات العيادة المسائية: 5 مساءً – 9 مساءً، من الاثنين إلى الخميس.',
      'زيارات منزلية للمرضى المسنين وذوي الإعاقة. اتصل لتحديد موعد.'
    ],
    ku: [
      'پزیشکی تایبەتی پەسەندکراو لەگەڵ 15+ ساڵ ئەزموون. نەخۆشی نوێ وەردەگرین.',
      'وتارەکانی ڕای دووەم بەردەستە. تۆمارەکانی پزیشکی خۆت بێنە.',
      'چارەسەری تەلەمیزینی ڕاستەوخۆ. لە ماڵەوە بمێنەوە، سەلامەت بمێنەوە.',
      'کاتژمێری نەخۆشخانەی ئێوارە: 5 ئێوارە – 9 ئێوارە، دوشنێن تا پێنجشەممە.',
      'سەردانی ماڵ بۆ نەخۆشانە پیر و کەم توانا. پەیوەندی بکە بۆ دانانی کات.'
    ]
  },
  dentist: {
    en: [
      'Smile makeover packages now available. Whitening, veneers, and braces.',
      'Pain-free root canal treatment using latest technology. Book your appointment.',
      'Kids dental care: friendly environment, gentle approach. First visit free under 5.',
      'Emergency dental service 7 days a week. Broken tooth? We\'ve got you covered.',
      'Invisalign consultations free this month. Straighten your teeth discreetly.'
    ],
    ar: [
      'باقات تجديد الابتسامة متاحة الآن. تبييض، قشور، و تقويم الأسنان.',
      'علاج عصب الأسنان بدون ألم باستخدام أحدث التقنيات. احجز موعدك.',
      'رعاية أسنان الأطفال: بيئة ودودة، نهج لطيف. أول زيارة مجانية تحت 5 سنوات.',
      'خدمة طوارئ الأسنان 7 أيام في الأسبوع. سن مكسور؟ نحن نغطيك.',
      'استشارات Invisalign مجانية هذا الشهر. رتّب أسنانك بسرية.'
    ],
    ku: [
      'پاکێجی نوێکردنەوەی پێکەنین ئێستا لەبەردەستە. سپی کردنەوە، ڤینێر و دەرزین.',
      'چارەسەری ڕەگی ددان بەبێ ئازار بە بەکارھێنانی نوێترین تەکنەلۆژیا. چارەسەری خۆت دابنێ.',
      'چاودێری ددانی منداڵان: ژینگەیەکی دۆستانە، ڕێگەیەکی نەرم. یەکەم سەردان بێ بەرامبەرە بۆ خوارێ 5 ساڵ.',
      'خزمەتگوزاری ددانی فەواری 7 ڕۆژ لە ھەفتەیەکدا. ددانی شکاو؟ ئێمە دەیپارێزین.',
      'وتارەکانی Invisalign بێ بەرامبەرە ئەم مانگە. ددانی خۆت بە نهێنی ڕێکبخە.'
    ]
  },
  salon: {
    en: [
      'New hair color collection arrived! Balayage, ombre, and vibrant tones.',
      'Bridal packages: hair, makeup, and henna. Book your special day package.',
      'Gentlemen\'s grooming: cuts, beard trims, and hot towel shaves.',
      'Ladies\' night every Wednesday: 20% off all services after 6 PM.',
      'Professional nail art and spa manicures. Gel and acrylic extensions available.'
    ],
    ar: [
      'مجموعة ألوان شعر جديدة وصلت! بالاياج، أومبري، وألوان نابضة بالحياة.',
      'باقات العروس: شعر، مكياج، وحنة. احجز باقة يومك الخاص.',
      'العناية بالرجال: قصات، تشذيب اللحية، وحلاقة منشفة ساخنة.',
      'ليلة السيدات كل أربعاء: 20% خصم على جميع الخدمات بعد الساعة 6 مساءً.',
      'فن الأظافر الاحترافي وسبا الأظافر. جيل وأكريليك متاح.'
    ],
    ku: [
      'کۆلێکشنی ڕەنگی قژی نوێ گەیشت! بالایاج، ئۆمبڕە و ڕەنگی زیندوو.',
      'پاکێژی بەڕۆژگاری: قژ، ئارایش و حەنە. بۆ ڕۆژی تایبەتی خۆت دابنێ.',
      'خزمەتگوزاری پیاوان: بڕین، ڕشتنی ڕیش و خ巍ینی گەرم.',
      'شەوێ ئافرەتان ھەر چوارشەممە: 20% داشکان بۆ ھەموو خزمەتگوزاریەکان دوای 6 ئێوارە.',
      'نەخشەی ناخۆنی پیشەیی و سپا. جێل و درێژکردنەوەی ئاکرلیک بەردەستە.'
    ]
  },
  gym: {
    en: [
      'Summer body challenge starts Monday! Sign up and get 1 free PT session.',
      'New equipment installed: cable machines, squat racks, and rowing stations.',
      'Ladies-only hours: 7 AM – 12 PM daily. Private training area available.',
      'Protein bar and shake station now open. Refuel after your workout.',
      'Group classes: yoga, spinning, HIIT, and boxing. Check the weekly schedule.'
    ],
    ar: [
      'تحدي جسم الصيف يبدأ الاثنين! سجّل واحصل على جلسة تدريب شخصي مجانية.',
      'معدات جديدة تم تركيبها: أجهزة كابل، أرفع القرفصاء، ومحطات التجديف.',
      'ساعات السيدات فقط: 7 صباحاً – 12 ظهراً يومياً. منطقة تدريب خاصة متاحة.',
      'محطة البروتين والشيك الآن مفتوحة. أعد التغذية بعد تمرينك.',
      'دروس جماعية: يوغا، سبينينغ، HIIT، وملاكمة. تحقق من الجدول الأسبوعي.'
    ],
    ku: [
      'بەرنامەی لەشێ بەھاری لە دووشەممە دەستپێدەکات! تۆمار بکە و 1 جەلسی ڕاهێنانی تایبەتی بەخۆڕایی وەرگرە.',
      'ئامرازی نوێ دامەزرێنرا: ئامێری کەبل، ستاندەکانی سکوات و شەپۆلێن.',
      'کاتژمێری تەنها ئافرەتان: 7 بەیانی – 12 نیوەڕۆ ڕۆژانە. ناوچەی ڕاهێنانێکی تایبەت بەردەستە.',
      'بەشی بەری پڕۆتین و شیک ئێستا کراوەیە. دوای ڕاهێنانەکەت خۆراکی بەکاردەھێنە.',
      'پۆلە کۆمەڵایەتیەکان: یۆگا، سپینینگ، HIIT و بوکسینگ. بەندەری ھەفتەیەکە ببینە.'
    ]
  },
  hotel: {
    en: [
      'Staycation packages starting from $49/night. Pool, spa, and breakfast included.',
      'Business traveler? Enjoy high-speed WiFi, meeting rooms, and airport shuttle.',
      'Wedding venue bookings open for 2025. Elegant halls and catering included.',
      'Weekend family buffet: international cuisine, live cooking stations, kids eat free.',
      'Rooftop lounge now open. Sunset views, cocktails, and shisha daily from 6 PM.'
    ],
    ar: [
      'باقات الإقامة الداخلية تبدأ من 49$ لليلة. مسبح، سبا، وإفطار مشمول.',
      'مسافر للأعمال؟ استمتع بواي فاي فائق السرعة، غرف اجتماعات، ومواصلات المطار.',
      'حجوزات قاعات الأعراس مفتوحة لعام 2025. صالات أنيقة والولائم مشمولة.',
      'بوفيه العائلة نهاية الأسبوع: مطبخ دولي، محطات طهي مباشر، الأطفال يأكلون مجاناً.',
      'لاونج السطح مفتوح الآن. إطلالات الغروب، كوكتيلات، وشيشة يومياً من 6 مساءً.'
    ],
    ku: [
      'پاکێجی مانەوە لە شارەوە لە 49$/شەو دەستپێدەکات. حەوشە، سپا و بەیانی لەگەڵە.',
      'گەشتیاری کار؟ خۆشی بگرە لە وای فای خێرا، ژووری کۆبوونەوە و شۆفێری فڕۆکەخانە.',
      'داواکردنی شوێنی باژێڕی عەڕوسی بۆ 2025 کراوەیە. تالارە شێوازەکان و خزمەتگوزاری خواردن لەگەڵە.',
      'بوفێی خێزانی ھەفتە: خواردنی نێودەوڵەتی، ستاندەکانی چێشتلێنانی ڕاستەوخۆ، منداڵان بەخۆڕایی دەیخۆن.',
      'لاونجی سەربان ئێستا کراوەیە. دیمەنی خۆرئاوابوون، کوکتێل و شێشە ڕۆژانە لە 6 ئێوارە.'
    ]
  },
  travel_agency: {
    en: [
      'Summer holiday packages to Turkey, Dubai, and Malaysia now booking.',
      'Umrah packages starting at competitive rates. Visa and transport included.',
      'Corporate travel management services. Group bookings and incentive trips.',
      'Flight + hotel bundles at 20% off when booked together.',
      '24/7 travel support hotline. Lost luggage? Cancelled flight? We handle it.'
    ],
    ar: [
      'باقات العطلات الصيفية إلى تركيا، دبي، وماليزيا الآن للحجز.',
      'باقات العمرة تبدأ بأسعار تنافسية. التأشيرة والمواصلات مشمولتان.',
      'خدمات إدارة السفر للشركات. حجوزات جماعية ورحلات تحفيزية.',
      'حزم الطيران + الفندق بخصم 20% عند الحجز معاً.',
      'خط ساخن لدعم السفر 24/7. أمتعة مفقودة؟ رحلة ملغاة؟ نحن نتعامل معها.'
    ],
    ku: [
      'پاکێجی ڤاکانسی ھاوین بۆ تورکیا، دوبەی و مالیزیا ئێستا دەکرێن.',
      'پاکێجی عومڕە بە نرخێکی پێشبڕکێوەرانە دەستپێدەکات. ڤیزا و گواستنەوە لەگەڵە.',
      'خزمەتگوزاری بەڕێوەبردنی گەشتی کۆمپانیا. داواکردنی کۆمەڵ و گەشتی پاداشت.',
      'پاکێجی فڕین + ھۆتێل بە 20% داشکان کاتێک یەکتر دادەنێن.',
      'ھێڵی پشتگیری گەشت 24/7. بار و قاپی ون بووە؟ فڕۆکە ھەڵوەشێنراوەتەوە؟ ئێمە چارەسەر دەکەین.'
    ]
  },
  university: {
    en: [
      'Fall semester admissions now open. Scholarships available for outstanding students.',
      'New master\'s programs in IT, business, and engineering. Apply before deadline.',
      'Campus open day this Saturday. Tours, workshops, and meet the faculty.',
      'Evening and weekend classes for working professionals. Flexible scheduling.',
      'Research grants available. Partner with industry leaders on innovative projects.'
    ],
    ar: [
      'التسجيل للفصل الخريفي مفتوح الآن. منح دراسية متاحة للطلاب المتميزين.',
      'برامج ماجستير جديدة في تكنولوجيا المعلومات، الأعمال، والهندسة. قدّم قبل الموعد النهائي.',
      'يوم مفتوح في الحرم الجامعي هذا السبت. جولات، ورش عمل، والتقاء أعضاء الهيئة التدريسية.',
      'صفوف مسائية ونهاية الأسبوع للمهنيين العاملين. جدولة مرنة.',
      'منح بحثية متاحة. شارك مع قادة الصناعة في مشاريع مبتكرة.'
    ],
    ku: [
      'تۆمارکردنی سێمستەری پایزی ئێستا کراوەیە. بورسی خوێندن بۆ قوتابیانە سەرکەوتووەکان.',
      'بەرنامەی ماستەری نوێ لە IT، بازرگانی و ئەندازیاری. پێش کاتی کۆتایی داوای بکە.',
      'ڕۆژی دەرگای کراوەی کیەمپەسی ئەم شەممەیە. گەشت، ورکشۆپەکان و کۆبونەوەی فاکەڵتی.',
      'پۆلەکانی ئێوارە و ھەفتە بۆ پیشەگرانی کار. خشتەکردنی ناسک.',
      'بورسی توێژینەوە بەردەستە. لەگەڵ پێشەنگانی پیشەسازی لە پرۆژە نوێیەکان هاوکاری بکە.'
    ]
  },
  construction: {
    en: [
      'Residential and commercial building projects. Free consultation and estimates.',
      'Renovation services: kitchens, bathrooms, and full home makeovers.',
      'Licensed engineers and certified contractors. Quality materials, guaranteed work.',
      'New apartment complex launching next month. Pre-booking with flexible payments.',
      'Steel structure and concrete specialists. Industrial warehouses and factories.'
    ],
    ar: [
      'مشاريع بناء سكنية وتجارية. استشارات وتقديرات مجانية.',
      'خدمات التجديد: مطابخ، حمامات، وتجديدات منزلية كاملة.',
      'مهندسون مرخصون ومقاولون معتمدون. مواد عالية الجودة، عمل مضمون.',
      'مجمع سكني جديد سيتم إطلاقه الشهر المقبل. الحجز المسبق مع دفعات مرنة.',
      'أخصائيو الهياكل المعدنية والخرسانة. مستودعات صناعية ومصانع.'
    ],
    ku: [
      'پرۆژەکانی بینای نیشتەجێ و بازرگانی. وتوێژ و ھەژماری بێ بەرامبەر.',
      'خزمەتگوزاری نوێکردنەوە: ناوخۆیی، حەمام و دەستکاری تەواوی ماڵ.',
      'ئەندازیارانی بڕیار و پێشەنگانی پەسەندکراو. مادەی بەرز و کارێکی تەحەتیدار.',
      'کۆمەڵە ئەپارتمانی نوێ مانگی داهاتوو دەکرێتەوە. پێشداوانین لەگەڵ پارەدانێکی ناسک.',
      'پیشەناسەکانی بنەماڵەی پۆل و کۆنکریت. کۆگاکانی پیشەسازی و فابریکەکان.'
    ]
  },
  logistics: {
    en: [
      'Express delivery across all Iraqi governorates. Same-day delivery in major cities.',
      'Warehousing and storage solutions. Climate-controlled facilities available.',
      'Fleet of modern trucks and refrigerated vehicles. Safe transport, every time.',
      'E-commerce fulfillment services. Pick, pack, and ship for your online store.',
      'Customs clearance and international shipping. Door-to-door service worldwide.'
    ],
    ar: [
      'توصيل سريع في جميع محافظات العراق. توصيل في نفس اليوم في المدن الرئيسية.',
      'حلول التخزين والمستودعات. مرافق مكيفة متاحة.',
      'أسطول من الشاحنات الحديثة والمركبات المبردة. نقل آمن، في كل مرة.',
      'خدمات إنجاز الطلبات الإلكترونية. اختيار، تغليف، وشحن لمتجرك الإلكتروني.',
      'تخليص جمركي وشحن دولي. خدمة من الباب إلى الباب في جميع أنحاء العالم.'
    ],
    ku: [
      'گەیاندنی خێرا لە سەرجەم پارێزگاکانی عێراق. گەیاندنی ھەمان ڕۆژ لە شارە گەورەکان.',
      'چارەسەری کۆگا و خەزێن. ئۆتێلی چاودێری کەیسەی بەردەستە.',
      'فلیتێکی کامێنەی نوێ و ئۆتۆمبێلی ساردکەرەوە. گواستنەوەی ئەمن، ھەموو جارێک.',
      'خزمەتگوزاری پابەندبوونی بازرگانی ئەلیکترۆنی. هەڵبژاردن، پاککردنەوە و گەیاندن بۆ دوکانی ئۆنلاینی خۆت.',
      'چارەسەری گومرگ و گەیاندنی نێودەوڵەتی. خزمەتگوزاری دەرگا بۆ دەرگا لە سەرانسەری جیھان.'
    ]
  },
  default: {
    en: [
      'Now open for business! Visit us today for quality service and great prices.',
      'Special promotion this week only. Don\'t miss out on our best deals!',
      'Customer satisfaction is our priority. Rated 4.5+ stars by our community.',
      'Follow us for updates on new products, offers, and events.',
      'Contact us for inquiries, bookings, or custom orders. We\'re here to help!'
    ],
    ar: [
      'مفتوح الآن للأعمال! تفضل بزيارتنا اليوم للحصول على خدمة عالية الجودة وأسعار رائعة.',
      'عرض ترويجي خاص هذا الأسبوع فقط. لا تفوت أفضل عروضنا!',
      'رضا العملاء هو أولويتنا. مصنف بـ 4.5+ نجوم من مجتمعنا.',
      'تابعنا للحصول على تحديثات حول المنتجات الجديدة، العروض، والأحداث.',
      'اتصل بنا للاستفسارات، الحجوزات، أو الطلبات الخاصة. نحن هنا للمساعدة!'
    ],
    ku: [
      'ئێستا بۆ کار کراوەیە! ئەمڕۆ سەردامان بکە بۆ خزمەتگوزاری باش و نرخێکی باش.',
      'بەرنامەی تایبەتی ئەم ھەفتەیە تەنها. لە باشترین ئۆفەرەکان جێماھێڵە!',
      'ئارەزووی کڕیاران تەرجیحی ئێمەیە. لە لایەن کۆمەڵگەکەمانەوە 4.5+ ئەستێرە.',
      'دوای بکە بۆ نوێکارییەکان دەربارەی بەرهەمە نوێیەکان، ئۆفەرەکان و ڕووداوەکان.',
      'پەیوەندیمان بکە بۆ پرسیار، داواکردن یان داواکاری تایبەتی. ئێرەیین بۆ یارمەتی!'
    ]
>>>>>>> 4639a50 (Apply-plan-PWA-CSV-posts-cleanup)
  }
};

// Sample businesses for realistic post generation
const SAMPLE_BUSINESSES = [
  { name: 'Al-Yasmin Restaurant', category: 'restaurant', gov: 'baghdad', avatar: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=100&auto=format&fit=crop&q=80' },
  { name: 'Costa Cafe Baghdad', category: 'cafe_bakery', gov: 'baghdad', avatar: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=100&auto=format&fit=crop&q=80' },
  { name: 'Grand Mall', category: 'mall', gov: 'erbil', avatar: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=100&auto=format&fit=crop&q=80' },
  { name: 'Basra Supermarket', category: 'supermarket', gov: 'basra', avatar: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=100&auto=format&fit=crop&q=80' },
  { name: 'Al-Rashid Pharmacy', category: 'pharmacy', gov: 'najaf', avatar: 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=100&auto=format&fit=crop&q=80' },
  { name: 'Mosul Medical Center', category: 'clinic', gov: 'mosul', avatar: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=100&auto=format&fit=crop&q=80' },
  { name: 'Erbil Grand Hospital', category: 'hospital', gov: 'erbil', avatar: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=100&auto=format&fit=crop&q=80' },
  { name: 'Dr. Ahmed Clinic', category: 'doctor', gov: 'karbala', avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100&auto=format&fit=crop&q=80' },
  { name: 'Pearl Dental Care', category: 'dentist', gov: 'sulaymaniyah', avatar: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=100&auto=format&fit=crop&q=80' },
  { name: 'Golden Salon', category: 'salon', gov: 'baghdad', avatar: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=100&auto=format&fit=crop&q=80' },
  { name: 'Power Gym', category: 'gym', gov: 'basra', avatar: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=100&auto=format&fit=crop&q=80' },
  { name: 'Royal Hotel Erbil', category: 'hotel', gov: 'erbil', avatar: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=100&auto=format&fit=crop&q=80' },
  { name: 'Iraqi Travel Co', category: 'travel_agency', gov: 'baghdad', avatar: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=100&auto=format&fit=crop&q=80' },
  { name: 'Baghdad University', category: 'university', gov: 'baghdad', avatar: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=100&auto=format&fit=crop&q=80' },
  { name: 'Al-Mustafa Builders', category: 'construction', gov: 'duhok', avatar: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=100&auto=format&fit=crop&q=80' },
  { name: 'Fast Iraq Logistics', category: 'logistics', gov: 'kirkuk', avatar: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=100&auto=format&fit=crop&q=80' },
];

// Generate realistic posts from sample businesses
function generateRealPosts(): SocialPost[] {
  const posts: SocialPost[] = [];
  const timeAgoOptions = [
    { ar: 'منذ ساعة', ku: 'پێش 1 کاتژمێر', en: '1 hour ago' },
    { ar: 'منذ 3 ساعات', ku: 'پێش 3 کاتژمێر', en: '3 hours ago' },
    { ar: 'منذ 5 ساعات', ku: 'پێش 5 کاتژمێر', en: '5 hours ago' },
    { ar: 'الأمس', ku: 'دوێنێ', en: 'Yesterday' },
    { ar: 'منذ يومين', ku: 'پێش 2 ڕۆژ', en: '2 days ago' },
    { ar: 'منذ 3 أيام', ku: 'پێش 3 ڕۆژ', en: '3 days ago' },
  ];
  
  const commentUsers = [
    { name: 'ali_iraqi', avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&auto=format&fit=crop&q=80' },
    { name: 'sara_kurd', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80' },
    { name: 'basra_guy', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80' },
    { name: 'noor_baghdad', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&auto=format&fit=crop&q=80' },
    { name: 'kurdi_boy', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80' },
  ];

  SAMPLE_BUSINESSES.forEach((biz, index) => {
    const templates = POST_TEMPLATES[biz.category] || POST_TEMPLATES.default;
    const templateIndex = index % templates.en.length;
    const timeAgo = timeAgoOptions[index % timeAgoOptions.length];
    
    // Generate realistic engagement numbers
    const likes = Math.floor(Math.random() * 150) + 12;
    const shares = Math.floor(Math.random() * 35) + 2;
    const commentsCount = Math.floor(Math.random() * 12) + 1;
    
    // Generate 1-3 realistic comments
    const comments = [];
    const numComments = Math.floor(Math.random() * 3) + 1;
    for (let c = 0; c < numComments; c++) {
      const user = commentUsers[(index + c) % commentUsers.length];
      comments.push({
        id: `c-${index}-${c}`,
        username: user.name,
        userAvatar: user.avatar,
        text: ['Great service!', 'Love this place!', 'Will visit soon', 'Prices are good', 'Recommended!'][c],
        time: ['2h', '5h', '1d', '3h', '6h'][c]
      });
    }
    
    posts.push({
      id: `post-${index + 1}`,
      businessId: `biz-${index + 1}`,
      businessName: biz.name,
      businessAvatar: biz.avatar,
      category: biz.category,
      governorate: biz.gov as any,
      mediaUrl: `https://images.unsplash.com/photo-${[1509042239860, 1554118811, 1568901346375, 1540555700478, 1517248135467, 1523050854058, 1534438327276, 1566073771259, 1488646953014, 1552566626, 1571902943202, 1582407947304, 1600596542815, 1560518883, 1586528116311, 1504307651254][index]}?w=800&auto=format&fit=crop&q=80`,
      caption: {
        ar: templates.ar[templateIndex],
        ku: templates.ku[templateIndex],
        en: templates.en[templateIndex]
      },
      likes,
      commentsCount,
      shares,
      timeAgo,
      likedByUser: false,
      savedByUser: false,
      comments
    });
  });

  return posts;
}

const RAW_INITIAL_POSTS: SocialPost[] = generateRealPosts();

const CATEGORY_COMPAT_MAP: Record<string, string> = {
  coffee: 'restaurants_cafes',
  dining: 'restaurants_cafes',
  shopping: 'electronics_tech_shops',
  hotels: 'hotels_hospitality',
  salons: 'beauty_salons',
  gyms: 'fitness_gyms',
  pharmacies: 'health_medical_services',
  entertainment: 'restaurants_cafes',
  universities: 'education_training_centers'
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
