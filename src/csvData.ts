import type { Business, SocialPost } from './types';

export const CSV_CATEGORIES = [
  { id: 'beauty_salons', name: 'Beauty & Salons', nameAr: 'Beauty & Salons', nameKu: 'Beauty & Salons', icon: 'Scissors', color: 'bg-pink-500' },
  { id: 'construction_contractors', name: 'Construction & Contractors', nameAr: 'Construction & Contractors', nameKu: 'Construction & Contractors', icon: 'HardHat', color: 'bg-yellow-600' },
  { id: 'education_training_centers', name: 'Education & Training Centers', nameAr: 'Education & Training Centers', nameKu: 'Education & Training Centers', icon: 'GraduationCap', color: 'bg-indigo-500' },
  { id: 'electronics_tech_shops', name: 'Electronics & Tech Shops', nameAr: 'Electronics & Tech Shops', nameKu: 'Electronics & Tech Shops', icon: 'Smartphone', color: 'bg-violet-500' },
  { id: 'fitness_gyms', name: 'Fitness & Gyms', nameAr: 'Fitness & Gyms', nameKu: 'Fitness & Gyms', icon: 'Dumbbell', color: 'bg-orange-500' },
  { id: 'health_medical_services', name: 'Health & Medical Services', nameAr: 'Health & Medical Services', nameKu: 'Health & Medical Services', icon: 'HeartPulse', color: 'bg-rose-500' },
  { id: 'hotels_hospitality', name: 'Hotels & Hospitality', nameAr: 'Hotels & Hospitality', nameKu: 'Hotels & Hospitality', icon: 'Hotel', color: 'bg-amber-500' },
  { id: 'it_software_services', name: 'IT & Software Services', nameAr: 'IT & Software Services', nameKu: 'IT & Software Services', icon: 'Monitor', color: 'bg-cyan-500' },
  { id: 'real_estate', name: 'Real Estate', nameAr: 'Real Estate', nameKu: 'Real Estate', icon: 'Building2', color: 'bg-blue-500' },
  { id: 'restaurants_cafes', name: 'Restaurants & Cafes', nameAr: 'Restaurants & Cafes', nameKu: 'Restaurants & Cafes', icon: 'Coffee', color: 'bg-emerald-500' }
];

export const CSV_GOVERNORATES = [
  { id: 'anbar', name: 'Anbar', nameAr: 'Anbar', nameKu: 'Anbar' },
  { id: 'babil', name: 'Babil', nameAr: 'Babil', nameKu: 'Babil' },
  { id: 'baghdad', name: 'Baghdad', nameAr: 'Baghdad', nameKu: 'Baghdad' },
  { id: 'basra', name: 'Basra', nameAr: 'Basra', nameKu: 'Basra' },
  { id: 'diyala', name: 'Diyala', nameAr: 'Diyala', nameKu: 'Diyala' },
  { id: 'dohuk', name: 'Dohuk', nameAr: 'Dohuk', nameKu: 'Dohuk' },
  { id: 'erbil', name: 'Erbil', nameAr: 'Erbil', nameKu: 'Erbil' },
  { id: 'halabja', name: 'Halabja', nameAr: 'Halabja', nameKu: 'Halabja' },
  { id: 'karbala', name: 'Karbala', nameAr: 'Karbala', nameKu: 'Karbala' },
  { id: 'kirkuk', name: 'Kirkuk', nameAr: 'Kirkuk', nameKu: 'Kirkuk' },
  { id: 'maysan', name: 'Maysan', nameAr: 'Maysan', nameKu: 'Maysan' },
  { id: 'muthanna', name: 'Muthanna', nameAr: 'Muthanna', nameKu: 'Muthanna' },
  { id: 'najaf', name: 'Najaf', nameAr: 'Najaf', nameKu: 'Najaf' },
  { id: 'nineveh', name: 'Nineveh', nameAr: 'Nineveh', nameKu: 'Nineveh' },
  { id: 'qadisiyyah', name: 'Qadisiyyah', nameAr: 'Qadisiyyah', nameKu: 'Qadisiyyah' },
  { id: 'saladin', name: 'Saladin', nameAr: 'Saladin', nameKu: 'Saladin' },
  { id: 'sulaymaniyah', name: 'Sulaymaniyah', nameAr: 'Sulaymaniyah', nameKu: 'Sulaymaniyah' },
  { id: 'tikrit', name: 'Saladin', nameAr: 'Saladin', nameKu: 'Saladin' },
  { id: 'wasit', name: 'Wasit', nameAr: 'Wasit', nameKu: 'Wasit' }
];

export const CSV_BUSINESSES: Business[] = [
  {
    "id": "csv_0",
    "name": {
      "ar": "",
      "ku": "",
      "en": "Baghdad Tech Hub"
    },
    "description": {
      "ar": "",
      "ku": "",
      "en": "Full-service IT solutions provider offering web development, networking, and software support. Serving businesses across Iraq with expert teams."
    },
    "category": "it_software_services",
    "governorate": "baghdad",
    "rating": 4.5,
    "reviewsCount": 2,
    "image": "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80"
    ],
    "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    "isVerified": true,
    "phoneNumber": "9647994291785",
    "address": {
      "ar": "",
      "ku": "",
      "en": "Street 272, Baghdad"
    },
    "likes": 72,
    "saves": 19,
    "mapCoords": {
      "x": 27,
      "y": 23
    },
    "stories": []
  },
  {
    "id": "csv_1",
    "name": {
      "ar": "فندق دجلة الكبير",
      "ku": "",
      "en": ""
    },
    "description": {
      "ar": "فندق فاخر يطل على نهر دجلة يوفر أجنحة فاخرة وخدمات عالمية المستوى. مطعم وقاعات مؤتمرات.",
      "ku": "",
      "en": ""
    },
    "category": "hotels_hospitality",
    "governorate": "baghdad",
    "rating": 4.4,
    "reviewsCount": 3,
    "image": "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80"
    ],
    "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    "isVerified": false,
    "phoneNumber": "9647858448502",
    "address": {
      "ar": "Street 190, Baghdad",
      "ku": "",
      "en": ""
    },
    "likes": 65,
    "saves": 19,
    "mapCoords": {
      "x": 74,
      "y": 87
    },
    "stories": []
  },
  {
    "id": "csv_2",
    "name": {
      "ar": "",
      "ku": "",
      "en": "Tigris Pharmacy"
    },
    "description": {
      "ar": "",
      "ku": "",
      "en": "Fully stocked pharmacy offering prescription and over-the-counter medications. Delivery available and open 24 hours for emergencies."
    },
    "category": "health_medical_services",
    "governorate": "baghdad",
    "rating": 4.5,
    "reviewsCount": 19,
    "image": "https://images.unsplash.com/photo-1584515933487-779824d29309?w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1584515933487-779824d29309?w=800&q=80"
    ],
    "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    "isVerified": false,
    "phoneNumber": "9647913785529",
    "address": {
      "ar": "",
      "ku": "",
      "en": "Street 165, Baghdad"
    },
    "likes": 124,
    "saves": 42,
    "mapCoords": {
      "x": 45,
      "y": 10
    },
    "stories": []
  },
  {
    "id": "csv_3",
    "name": {
      "ar": "",
      "ku": "ھۆتێلی شاری کوردستان",
      "en": ""
    },
    "description": {
      "ar": "",
      "ku": "ھۆتێلێکی لوکس کە سویتی فاخر و خزمەتگوزاری ئاستی جیھانی دەپێشکەش دەکات. چێشتخانە و سالۆنی کۆنفراس.",
      "en": ""
    },
    "category": "hotels_hospitality",
    "governorate": "baghdad",
    "rating": 3.9,
    "reviewsCount": 8,
    "image": "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80"
    ],
    "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    "isVerified": true,
    "phoneNumber": "",
    "address": {
      "ar": "",
      "ku": "Street 126, Baghdad",
      "en": ""
    },
    "likes": 96,
    "saves": 11,
    "mapCoords": {
      "x": 21,
      "y": 58
    },
    "stories": []
  },
  {
    "id": "csv_4",
    "name": {
      "ar": "صيدلية الشفاء",
      "ku": "",
      "en": ""
    },
    "description": {
      "ar": "صيدلية متكاملة توفر جميع الأدوية والمستلزمات الطبية. خدمة على مدار الساعة وتوصيل للمنازل.",
      "ku": "",
      "en": ""
    },
    "category": "health_medical_services",
    "governorate": "baghdad",
    "rating": 3.9,
    "reviewsCount": 3,
    "image": "https://images.unsplash.com/photo-1584515933487-779824d29309?w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1584515933487-779824d29309?w=800&q=80"
    ],
    "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    "isVerified": true,
    "phoneNumber": "9647918258157",
    "address": {
      "ar": "Street 354, Baghdad",
      "ku": "",
      "en": ""
    },
    "likes": 147,
    "saves": 12,
    "mapCoords": {
      "x": 58,
      "y": 20
    },
    "stories": []
  },
  {
    "id": "csv_5",
    "name": {
      "ar": "مركز لياقة بغداد",
      "ku": "",
      "en": ""
    },
    "description": {
      "ar": "مركز لياقة بدنية مجهز بأحدث الأجهزة الرياضية. مدربون معتمدون وبرامج تدريبية مخصصة.",
      "ku": "",
      "en": ""
    },
    "category": "fitness_gyms",
    "governorate": "baghdad",
    "rating": 4.8,
    "reviewsCount": 13,
    "image": "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80"
    ],
    "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    "isVerified": false,
    "phoneNumber": "9647725662601",
    "address": {
      "ar": "Street 34, Baghdad",
      "ku": "",
      "en": ""
    },
    "likes": 190,
    "saves": 9,
    "mapCoords": {
      "x": 15,
      "y": 39
    },
    "stories": []
  },
  {
    "id": "csv_6",
    "name": {
      "ar": "مدرسة النور الأهلية",
      "ku": "",
      "en": ""
    },
    "description": {
      "ar": "مدرسة أهلية تقدم تعليماً متميزاً للمراحل الابتدائية والمتوسطة. كوادر تدريسية مؤهلة ومناهج حديثة.",
      "ku": "",
      "en": ""
    },
    "category": "education_training_centers",
    "governorate": "baghdad",
    "rating": 3.7,
    "reviewsCount": 10,
    "image": "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80"
    ],
    "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    "isVerified": false,
    "phoneNumber": "9647971018669",
    "address": {
      "ar": "Street 326, Baghdad",
      "ku": "",
      "en": ""
    },
    "likes": 103,
    "saves": 15,
    "mapCoords": {
      "x": 57,
      "y": 55
    },
    "stories": []
  },
  {
    "id": "csv_7",
    "name": {
      "ar": "",
      "ku": "کافێی سلێمانی",
      "en": ""
    },
    "description": {
      "ar": "",
      "ku": "کافێیەکی نوێ لە ناوەندی شار کە قاوەی تایبەت و خوێنراوی سارد دەپێشکەش دەکات. ژینگەیەکی ئارام بۆ خێزانەکان.",
      "en": ""
    },
    "category": "restaurants_cafes",
    "governorate": "baghdad",
    "rating": 4.9,
    "reviewsCount": 22,
    "image": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80"
    ],
    "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    "isVerified": false,
    "phoneNumber": "9647725221327",
    "address": {
      "ar": "",
      "ku": "Street 275, Baghdad",
      "en": ""
    },
    "likes": 172,
    "saves": 15,
    "mapCoords": {
      "x": 78,
      "y": 41
    },
    "stories": []
  },
  {
    "id": "csv_8",
    "name": {
      "ar": "",
      "ku": "",
      "en": "Golden Gate Real Estate"
    },
    "description": {
      "ar": "",
      "ku": "",
      "en": "Specialists in residential and commercial property sales and rentals across Iraq. Over 15 years experience with trusted client relationships."
    },
    "category": "real_estate",
    "governorate": "baghdad",
    "rating": 5.0,
    "reviewsCount": 22,
    "image": "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80"
    ],
    "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    "isVerified": false,
    "phoneNumber": "9647964495198",
    "address": {
      "ar": "",
      "ku": "",
      "en": "Street 87, Baghdad"
    },
    "likes": 66,
    "saves": 48,
    "mapCoords": {
      "x": 51,
      "y": 17
    },
    "stories": []
  },
  {
    "id": "csv_9",
    "name": {
      "ar": "",
      "ku": "خواردنگەی سەرکەوتن",
      "en": ""
    },
    "description": {
      "ar": "",
      "ku": "چێشتخانەیەکی کوردی ئەسیل کە خواردنی دەستپێکردن و کەبابی دەپێشکەش دەکات. ڕۆژانە لە کاتژمێر ١٠ی بەیانی تا نیوەشەو کراوەیە.",
      "en": ""
    },
    "category": "restaurants_cafes",
    "governorate": "baghdad",
    "rating": 4.0,
    "reviewsCount": 10,
    "image": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80"
    ],
    "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    "isVerified": false,
    "phoneNumber": "9647863510132",
    "address": {
      "ar": "",
      "ku": "Street 148, Baghdad",
      "en": ""
    },
    "likes": 155,
    "saves": 50,
    "mapCoords": {
      "x": 50,
      "y": 37
    },
    "stories": []
  },
  {
    "id": "csv_10",
    "name": {
      "ar": "",
      "ku": "",
      "en": "Mesopotamia Grand Hotel"
    },
    "description": {
      "ar": "",
      "ku": "",
      "en": "Luxury riverside hotel offering premium suites and world-class service. Business conference facilities, fine dining, and event hosting available."
    },
    "category": "hotels_hospitality",
    "governorate": "baghdad",
    "rating": 4.9,
    "reviewsCount": 16,
    "image": "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80"
    ],
    "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    "isVerified": false,
    "phoneNumber": "9647713637048",
    "address": {
      "ar": "",
      "ku": "",
      "en": "Street 168, Baghdad"
    },
    "likes": 45,
    "saves": 20,
    "mapCoords": {
      "x": 81,
      "y": 78
    },
    "stories": []
  },
  {
    "id": "csv_11",
    "name": {
      "ar": "",
      "ku": "ئۆفیسی موڵکی زێڕین",
      "en": ""
    },
    "description": {
      "ar": "",
      "ku": "پسپۆڕ لە فرۆشتن و بەکرێدانی خانووبەرە نیشتەجێبوون و بازرگانیەکان. زیاتر لە ١٥ ساڵ ئەزموون.",
      "en": ""
    },
    "category": "real_estate",
    "governorate": "baghdad",
    "rating": 4.8,
    "reviewsCount": 14,
    "image": "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80"
    ],
    "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    "isVerified": false,
    "phoneNumber": "9647986268855",
    "address": {
      "ar": "",
      "ku": "Street 456, Baghdad",
      "en": ""
    },
    "likes": 45,
    "saves": 37,
    "mapCoords": {
      "x": 73,
      "y": 21
    },
    "stories": []
  },
  {
    "id": "csv_12",
    "name": {
      "ar": "شركة البناء الحديث",
      "ku": "",
      "en": ""
    },
    "description": {
      "ar": "شركة مقاولات متخصصة في البناء والتشييد السكني والتجاري. جودة عالية وتسليم في الموعد المحدد.",
      "ku": "",
      "en": ""
    },
    "category": "construction_contractors",
    "governorate": "baghdad",
    "rating": 4.4,
    "reviewsCount": 27,
    "image": "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80"
    ],
    "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    "isVerified": false,
    "phoneNumber": "9647983533001",
    "address": {
      "ar": "Street 250, Baghdad",
      "ku": "",
      "en": ""
    },
    "likes": 162,
    "saves": 9,
    "mapCoords": {
      "x": 59,
      "y": 58
    },
    "stories": []
  },
  {
    "id": "csv_13",
    "name": {
      "ar": "",
      "ku": "",
      "en": "Star Beauty Salon"
    },
    "description": {
      "ar": "",
      "ku": "",
      "en": "Premium ladies salon specializing in hair styling, skincare, and bridal packages. Experienced team using top international brands."
    },
    "category": "beauty_salons",
    "governorate": "baghdad",
    "rating": 5.0,
    "reviewsCount": 29,
    "image": "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80"
    ],
    "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    "isVerified": true,
    "phoneNumber": "9647869205494",
    "address": {
      "ar": "",
      "ku": "",
      "en": "Street 209, Baghdad"
    },
    "likes": 184,
    "saves": 12,
    "mapCoords": {
      "x": 78,
      "y": 44
    },
    "stories": []
  },
  {
    "id": "csv_14",
    "name": {
      "ar": "",
      "ku": "کلۆبی وەرزشی ئەرێن",
      "en": ""
    },
    "description": {
      "ar": "",
      "ku": "سەنتەرێکی تەندروستی کە دەبێتە ئامێرەکانی وەرزشی نوێترین. مەشقدەرانی پەسەندکراو و پرۆگرامی تایبەت.",
      "en": ""
    },
    "category": "fitness_gyms",
    "governorate": "baghdad",
    "rating": 4.2,
    "reviewsCount": 16,
    "image": "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80"
    ],
    "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    "isVerified": false,
    "phoneNumber": "9647945552626",
    "address": {
      "ar": "",
      "ku": "Street 480, Baghdad",
      "en": ""
    },
    "likes": 194,
    "saves": 21,
    "mapCoords": {
      "x": 74,
      "y": 32
    },
    "stories": []
  },
  {
    "id": "csv_15",
    "name": {
      "ar": "",
      "ku": "",
      "en": "Fitness First Baghdad"
    },
    "description": {
      "ar": "",
      "ku": "",
      "en": "State-of-the-art fitness center with modern equipment and certified personal trainers. Custom training programs for all fitness levels."
    },
    "category": "fitness_gyms",
    "governorate": "baghdad",
    "rating": 4.4,
    "reviewsCount": 28,
    "image": "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80"
    ],
    "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    "isVerified": false,
    "phoneNumber": "9647915541839",
    "address": {
      "ar": "",
      "ku": "",
      "en": "Street 145, Baghdad"
    },
    "likes": 165,
    "saves": 17,
    "mapCoords": {
      "x": 29,
      "y": 57
    },
    "stories": []
  },
  {
    "id": "csv_16",
    "name": {
      "ar": "",
      "ku": "",
      "en": "Modern Build Co."
    },
    "description": {
      "ar": "",
      "ku": "",
      "en": "Professional contracting company specializing in residential and commercial construction. High-quality materials with guaranteed on-time delivery."
    },
    "category": "construction_contractors",
    "governorate": "baghdad",
    "rating": 3.5,
    "reviewsCount": 12,
    "image": "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80"
    ],
    "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    "isVerified": false,
    "phoneNumber": "9647972348454",
    "address": {
      "ar": "",
      "ku": "",
      "en": "Street 365, Baghdad"
    },
    "likes": 38,
    "saves": 28,
    "mapCoords": {
      "x": 49,
      "y": 40
    },
    "stories": []
  },
  {
    "id": "csv_17",
    "name": {
      "ar": "",
      "ku": "دەرمانخانەی ژیان",
      "en": ""
    },
    "description": {
      "ar": "",
      "ku": "دەرمانخانەیەکی تەواو کە هەموو دەرمان و پێداویستییەکانی پزیشکی دەپێشکەش دەکات. خزمەتگوزاری ٢٤ کاتژمێر.",
      "en": ""
    },
    "category": "health_medical_services",
    "governorate": "baghdad",
    "rating": 3.6,
    "reviewsCount": 17,
    "image": "https://images.unsplash.com/photo-1584515933487-779824d29309?w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1584515933487-779824d29309?w=800&q=80"
    ],
    "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    "isVerified": true,
    "phoneNumber": "9647714752593",
    "address": {
      "ar": "",
      "ku": "Street 423, Baghdad",
      "en": ""
    },
    "likes": 146,
    "saves": 13,
    "mapCoords": {
      "x": 26,
      "y": 70
    },
    "stories": []
  },
  {
    "id": "csv_18",
    "name": {
      "ar": "",
      "ku": "سالۆنی ژینانەی ستێرە",
      "en": ""
    },
    "description": {
      "ar": "",
      "ku": "سالۆنێکی تایبەت بۆ ژنان کە پسپۆڕی ئامادەکردنی قژ و چاودێری پێست. تیمێکی پسپۆڕ و ئەزموونی بەرز.",
      "en": ""
    },
    "category": "beauty_salons",
    "governorate": "baghdad",
    "rating": 4.8,
    "reviewsCount": 15,
    "image": "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80"
    ],
    "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    "isVerified": true,
    "phoneNumber": "",
    "address": {
      "ar": "",
      "ku": "Street 68, Baghdad",
      "en": ""
    },
    "likes": 148,
    "saves": 49,
    "mapCoords": {
      "x": 35,
      "y": 49
    },
    "stories": []
  },
  {
    "id": "csv_19",
    "name": {
      "ar": "",
      "ku": "ئەکادیمیای زانست",
      "en": ""
    },
    "description": {
      "ar": "",
      "ku": "قوتابخانەیەکی تایبەت کە خوێندنی باش بۆ قۆناغی سەرەتایی و ناوەڕاست دەپێشکەش دەکات. مامۆستایانی پسپۆڕ.",
      "en": ""
    },
    "category": "education_training_centers",
    "governorate": "baghdad",
    "rating": 4.2,
    "reviewsCount": 18,
    "image": "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80"
    ],
    "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    "isVerified": false,
    "phoneNumber": "9647811411291",
    "address": {
      "ar": "",
      "ku": "Street 460, Baghdad",
      "en": ""
    },
    "likes": 73,
    "saves": 19,
    "mapCoords": {
      "x": 18,
      "y": 53
    },
    "stories": []
  },
  {
    "id": "csv_20",
    "name": {
      "ar": "مكتب العقارات الذهبي",
      "ku": "",
      "en": ""
    },
    "description": {
      "ar": "متخصصون في بيع وتأجير العقارات السكنية والتجارية في جميع أنحاء العراق. خبرة أكثر من 15 عاماً.",
      "ku": "",
      "en": ""
    },
    "category": "real_estate",
    "governorate": "baghdad",
    "rating": 4.4,
    "reviewsCount": 2,
    "image": "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80"
    ],
    "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    "isVerified": false,
    "phoneNumber": "9647998268674",
    "address": {
      "ar": "Street 182, Baghdad",
      "ku": "",
      "en": ""
    },
    "likes": 171,
    "saves": 8,
    "mapCoords": {
      "x": 39,
      "y": 18
    },
    "stories": []
  },
  {
    "id": "csv_21",
    "name": {
      "ar": "محل الإلكترونيات الحديث",
      "ku": "",
      "en": ""
    },
    "description": {
      "ar": "أحدث الأجهزة الإلكترونية والهواتف الذكية بأسعار تنافسية. ضمان سنة وخدمة ما بعد البيع.",
      "ku": "",
      "en": ""
    },
    "category": "electronics_tech_shops",
    "governorate": "baghdad",
    "rating": 4.3,
    "reviewsCount": 10,
    "image": "https://images.unsplash.com/photo-1498049860654-af1a5c5668ba?w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1498049860654-af1a5c5668ba?w=800&q=80"
    ],
    "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    "isVerified": false,
    "phoneNumber": "9647827651384",
    "address": {
      "ar": "Street 316, Baghdad",
      "ku": "",
      "en": ""
    },
    "likes": 64,
    "saves": 39,
    "mapCoords": {
      "x": 26,
      "y": 83
    },
    "stories": []
  },
  {
    "id": "csv_22",
    "name": {
      "ar": "",
      "ku": "فرۆشگەی تەکنەلۆژیا",
      "en": ""
    },
    "description": {
      "ar": "",
      "ku": "نوێترین ئامێرە ئەلکترۆنیکەکان و مۆبایلی زیرەک بە نرخی پێشبازیانە. مزگێنی ساڵێک و خزمەتگوزاری دواتر.",
      "en": ""
    },
    "category": "electronics_tech_shops",
    "governorate": "baghdad",
    "rating": 4.2,
    "reviewsCount": 15,
    "image": "https://images.unsplash.com/photo-1498049860654-af1a5c5668ba?w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1498049860654-af1a5c5668ba?w=800&q=80"
    ],
    "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    "isVerified": false,
    "phoneNumber": "9647941945868",
    "address": {
      "ar": "",
      "ku": "Street 144, Baghdad",
      "en": ""
    },
    "likes": 34,
    "saves": 47,
    "mapCoords": {
      "x": 65,
      "y": 55
    },
    "stories": []
  },
  {
    "id": "csv_23",
    "name": {
      "ar": "",
      "ku": "کۆمپانیای بیناسازی نوێ",
      "en": ""
    },
    "description": {
      "ar": "",
      "ku": "کۆمپانیایەکی پەیمانکاری پسپۆڕ لە بینا و ئاوەدانکاری نیشتەجێبوون و بازرگانی. کوالیتی بەرز و گەیاندن لە ماوەی دیاریکراودا.",
      "en": ""
    },
    "category": "construction_contractors",
    "governorate": "baghdad",
    "rating": 4.6,
    "reviewsCount": 23,
    "image": "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80"
    ],
    "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    "isVerified": false,
    "phoneNumber": "9647913939071",
    "address": {
      "ar": "",
      "ku": "Street 280, Baghdad",
      "en": ""
    },
    "likes": 175,
    "saves": 11,
    "mapCoords": {
      "x": 17,
      "y": 61
    },
    "stories": []
  },
  {
    "id": "csv_24",
    "name": {
      "ar": "كافيه العراق",
      "ku": "",
      "en": ""
    },
    "description": {
      "ar": "كافيه عصري في قلب المدينة يقدم القهوة المختصة والمشروبات الباردة. أجواء هادئة ومريحة للعائلات.",
      "ku": "",
      "en": ""
    },
    "category": "restaurants_cafes",
    "governorate": "baghdad",
    "rating": 3.8,
    "reviewsCount": 19,
    "image": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80"
    ],
    "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    "isVerified": false,
    "phoneNumber": "9647929458311",
    "address": {
      "ar": "Street 402, Baghdad",
      "ku": "",
      "en": ""
    },
    "likes": 118,
    "saves": 16,
    "mapCoords": {
      "x": 45,
      "y": 69
    },
    "stories": []
  },
  {
    "id": "csv_25",
    "name": {
      "ar": "صالون نور الجمال",
      "ku": "",
      "en": ""
    },
    "description": {
      "ar": "صالون نسائي متخصص في تصفيف الشعر والعناية بالبشرة. فريق متخصص وخبرة تجميلية عالية.",
      "ku": "",
      "en": ""
    },
    "category": "beauty_salons",
    "governorate": "baghdad",
    "rating": 4.7,
    "reviewsCount": 29,
    "image": "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80"
    ],
    "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    "isVerified": false,
    "phoneNumber": "9647896192478",
    "address": {
      "ar": "Street 1, Baghdad",
      "ku": "",
      "en": ""
    },
    "likes": 22,
    "saves": 46,
    "mapCoords": {
      "x": 79,
      "y": 11
    },
    "stories": []
  },
  {
    "id": "csv_26",
    "name": {
      "ar": "",
      "ku": "",
      "en": "Al-Rasheed Restaurant"
    },
    "description": {
      "ar": "",
      "ku": "",
      "en": "Authentic Iraqi cuisine serving traditional dishes and grilled meats since 1995. Open daily, family-friendly atmosphere with private seating areas."
    },
    "category": "restaurants_cafes",
    "governorate": "baghdad",
    "rating": 4.1,
    "reviewsCount": 17,
    "image": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80"
    ],
    "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    "isVerified": false,
    "phoneNumber": "9647765156203",
    "address": {
      "ar": "",
      "ku": "",
      "en": "Street 410, Baghdad"
    },
    "likes": 112,
    "saves": 8,
    "mapCoords": {
      "x": 31,
      "y": 58
    },
    "stories": []
  },
  {
    "id": "csv_27",
    "name": {
      "ar": "",
      "ku": "",
      "en": "New Horizon Academy"
    },
    "description": {
      "ar": "",
      "ku": "",
      "en": "Private school offering quality education for primary and secondary levels. Qualified teaching staff with modern curricula and extracurricular activities."
    },
    "category": "education_training_centers",
    "governorate": "baghdad",
    "rating": 4.7,
    "reviewsCount": 16,
    "image": "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80"
    ],
    "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    "isVerified": false,
    "phoneNumber": "",
    "address": {
      "ar": "",
      "ku": "",
      "en": "Street 396, Baghdad"
    },
    "likes": 188,
    "saves": 40,
    "mapCoords": {
      "x": 72,
      "y": 29
    },
    "stories": []
  },
  {
    "id": "csv_28",
    "name": {
      "ar": "مطعم الشرقية",
      "ku": "",
      "en": ""
    },
    "description": {
      "ar": "مطعم عراقي أصيل يقدم أشهى المأكولات الشعبية والمشاوي. نفتح يومياً من الساعة 10 صباحاً حتى منتصف الليل.",
      "ku": "",
      "en": ""
    },
    "category": "restaurants_cafes",
    "governorate": "baghdad",
    "rating": 4.4,
    "reviewsCount": 19,
    "image": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80"
    ],
    "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    "isVerified": false,
    "phoneNumber": "9647778652405",
    "address": {
      "ar": "Street 115, Baghdad",
      "ku": "",
      "en": ""
    },
    "likes": 90,
    "saves": 8,
    "mapCoords": {
      "x": 16,
      "y": 84
    },
    "stories": []
  },
  {
    "id": "csv_29",
    "name": {
      "ar": "",
      "ku": "",
      "en": "Smart Electronics"
    },
    "description": {
      "ar": "",
      "ku": "",
      "en": "Latest smartphones, laptops, and electronics at competitive prices. One-year warranty on all products with dedicated after-sales service."
    },
    "category": "electronics_tech_shops",
    "governorate": "baghdad",
    "rating": 3.6,
    "reviewsCount": 18,
    "image": "https://images.unsplash.com/photo-1498049860654-af1a5c5668ba?w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1498049860654-af1a5c5668ba?w=800&q=80"
    ],
    "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    "isVerified": false,
    "phoneNumber": "9647842125421",
    "address": {
      "ar": "",
      "ku": "",
      "en": "Street 293, Baghdad"
    },
    "likes": 57,
    "saves": 9,
    "mapCoords": {
      "x": 86,
      "y": 18
    },
    "stories": []
  },
  {
    "id": "csv_30",
    "name": {
      "ar": "شركة البناء الحديث",
      "ku": "",
      "en": ""
    },
    "description": {
      "ar": "شركة مقاولات متخصصة في البناء والتشييد السكني والتجاري. جودة عالية وتسليم في الموعد المحدد.",
      "ku": "",
      "en": ""
    },
    "category": "construction_contractors",
    "governorate": "basra",
    "rating": 3.7,
    "reviewsCount": 30,
    "image": "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80"
    ],
    "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    "isVerified": false,
    "phoneNumber": "9647802229208",
    "address": {
      "ar": "Street 73, Basra",
      "ku": "",
      "en": ""
    },
    "likes": 158,
    "saves": 43,
    "mapCoords": {
      "x": 15,
      "y": 89
    },
    "stories": []
  },
  {
    "id": "csv_31",
    "name": {
      "ar": "مدرسة النور الأهلية",
      "ku": "",
      "en": ""
    },
    "description": {
      "ar": "مدرسة أهلية تقدم تعليماً متميزاً للمراحل الابتدائية والمتوسطة. كوادر تدريسية مؤهلة ومناهج حديثة.",
      "ku": "",
      "en": ""
    },
    "category": "education_training_centers",
    "governorate": "basra",
    "rating": 4.3,
    "reviewsCount": 12,
    "image": "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80"
    ],
    "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    "isVerified": true,
    "phoneNumber": "9647842704453",
    "address": {
      "ar": "Street 49, Basra",
      "ku": "",
      "en": ""
    },
    "likes": 62,
    "saves": 47,
    "mapCoords": {
      "x": 50,
      "y": 40
    },
    "stories": []
  },
  {
    "id": "csv_32",
    "name": {
      "ar": "مكتب العقارات الذهبي",
      "ku": "",
      "en": ""
    },
    "description": {
      "ar": "متخصصون في بيع وتأجير العقارات السكنية والتجارية في جميع أنحاء العراق. خبرة أكثر من 15 عاماً.",
      "ku": "",
      "en": ""
    },
    "category": "real_estate",
    "governorate": "basra",
    "rating": 4.5,
    "reviewsCount": 16,
    "image": "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80"
    ],
    "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    "isVerified": false,
    "phoneNumber": "9647702394216",
    "address": {
      "ar": "Street 238, Basra",
      "ku": "",
      "en": ""
    },
    "likes": 28,
    "saves": 5,
    "mapCoords": {
      "x": 68,
      "y": 89
    },
    "stories": []
  },
  {
    "id": "csv_33",
    "name": {
      "ar": "",
      "ku": "خواردنگەی سەرکەوتن",
      "en": ""
    },
    "description": {
      "ar": "",
      "ku": "چێشتخانەیەکی کوردی ئەسیل کە خواردنی دەستپێکردن و کەبابی دەپێشکەش دەکات. ڕۆژانە لە کاتژمێر ١٠ی بەیانی تا نیوەشەو کراوەیە.",
      "en": ""
    },
    "category": "restaurants_cafes",
    "governorate": "basra",
    "rating": 3.8,
    "reviewsCount": 10,
    "image": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80"
    ],
    "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    "isVerified": false,
    "phoneNumber": "9647883605773",
    "address": {
      "ar": "",
      "ku": "Street 191, Basra",
      "en": ""
    },
    "likes": 99,
    "saves": 9,
    "mapCoords": {
      "x": 41,
      "y": 57
    },
    "stories": []
  },
  {
    "id": "csv_34",
    "name": {
      "ar": "",
      "ku": "",
      "en": "Mesopotamia Grand Hotel"
    },
    "description": {
      "ar": "",
      "ku": "",
      "en": "Luxury riverside hotel offering premium suites and world-class service. Business conference facilities, fine dining, and event hosting available."
    },
    "category": "hotels_hospitality",
    "governorate": "basra",
    "rating": 4.3,
    "reviewsCount": 11,
    "image": "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80"
    ],
    "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    "isVerified": false,
    "phoneNumber": "9647833002764",
    "address": {
      "ar": "",
      "ku": "",
      "en": "Street 14, Basra"
    },
    "likes": 177,
    "saves": 38,
    "mapCoords": {
      "x": 11,
      "y": 80
    },
    "stories": []
  },
  {
    "id": "csv_35",
    "name": {
      "ar": "مطعم الشرقية",
      "ku": "",
      "en": ""
    },
    "description": {
      "ar": "مطعم عراقي أصيل يقدم أشهى المأكولات الشعبية والمشاوي. نفتح يومياً من الساعة 10 صباحاً حتى منتصف الليل.",
      "ku": "",
      "en": ""
    },
    "category": "restaurants_cafes",
    "governorate": "basra",
    "rating": 4.9,
    "reviewsCount": 6,
    "image": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80"
    ],
    "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    "isVerified": false,
    "phoneNumber": "9647912170841",
    "address": {
      "ar": "Street 450, Basra",
      "ku": "",
      "en": ""
    },
    "likes": 37,
    "saves": 40,
    "mapCoords": {
      "x": 29,
      "y": 44
    },
    "stories": []
  },
  {
    "id": "csv_36",
    "name": {
      "ar": "مركز لياقة بغداد",
      "ku": "",
      "en": ""
    },
    "description": {
      "ar": "مركز لياقة بدنية مجهز بأحدث الأجهزة الرياضية. مدربون معتمدون وبرامج تدريبية مخصصة.",
      "ku": "",
      "en": ""
    },
    "category": "fitness_gyms",
    "governorate": "basra",
    "rating": 4.0,
    "reviewsCount": 23,
    "image": "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80"
    ],
    "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    "isVerified": false,
    "phoneNumber": "9647961029845",
    "address": {
      "ar": "Street 83, Basra",
      "ku": "",
      "en": ""
    },
    "likes": 77,
    "saves": 37,
    "mapCoords": {
      "x": 72,
      "y": 42
    },
    "stories": []
  },
  {
    "id": "csv_37",
    "name": {
      "ar": "",
      "ku": "کلۆبی وەرزشی ئەرێن",
      "en": ""
    },
    "description": {
      "ar": "",
      "ku": "سەنتەرێکی تەندروستی کە دەبێتە ئامێرەکانی وەرزشی نوێترین. مەشقدەرانی پەسەندکراو و پرۆگرامی تایبەت.",
      "en": ""
    },
    "category": "fitness_gyms",
    "governorate": "basra",
    "rating": 4.7,
    "reviewsCount": 3,
    "image": "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80"
    ],
    "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    "isVerified": false,
    "phoneNumber": "9647788478872",
    "address": {
      "ar": "",
      "ku": "Street 186, Basra",
      "en": ""
    },
    "likes": 43,
    "saves": 45,
    "mapCoords": {
      "x": 43,
      "y": 30
    },
    "stories": []
  },
  {
    "id": "csv_38",
    "name": {
      "ar": "محل الإلكترونيات الحديث",
      "ku": "",
      "en": ""
    },
    "description": {
      "ar": "أحدث الأجهزة الإلكترونية والهواتف الذكية بأسعار تنافسية. ضمان سنة وخدمة ما بعد البيع.",
      "ku": "",
      "en": ""
    },
    "category": "electronics_tech_shops",
    "governorate": "basra",
    "rating": 4.1,
    "reviewsCount": 2,
    "image": "https://images.unsplash.com/photo-1498049860654-af1a5c5668ba?w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1498049860654-af1a5c5668ba?w=800&q=80"
    ],
    "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    "isVerified": false,
    "phoneNumber": "",
    "address": {
      "ar": "Street 127, Basra",
      "ku": "",
      "en": ""
    },
    "likes": 186,
    "saves": 14,
    "mapCoords": {
      "x": 79,
      "y": 14
    },
    "stories": []
  },
  {
    "id": "csv_39",
    "name": {
      "ar": "",
      "ku": "کۆمپانیای بیناسازی نوێ",
      "en": ""
    },
    "description": {
      "ar": "",
      "ku": "کۆمپانیایەکی پەیمانکاری پسپۆڕ لە بینا و ئاوەدانکاری نیشتەجێبوون و بازرگانی. کوالیتی بەرز و گەیاندن لە ماوەی دیاریکراودا.",
      "en": ""
    },
    "category": "construction_contractors",
    "governorate": "basra",
    "rating": 4.1,
    "reviewsCount": 3,
    "image": "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80"
    ],
    "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    "isVerified": false,
    "phoneNumber": "",
    "address": {
      "ar": "",
      "ku": "Street 136, Basra",
      "en": ""
    },
    "likes": 20,
    "saves": 27,
    "mapCoords": {
      "x": 36,
      "y": 41
    },
    "stories": []
  },
  {
    "id": "csv_40",
    "name": {
      "ar": "فندق دجلة الكبير",
      "ku": "",
      "en": ""
    },
    "description": {
      "ar": "فندق فاخر يطل على نهر دجلة يوفر أجنحة فاخرة وخدمات عالمية المستوى. مطعم وقاعات مؤتمرات.",
      "ku": "",
      "en": ""
    },
    "category": "hotels_hospitality",
    "governorate": "basra",
    "rating": 4.3,
    "reviewsCount": 29,
    "image": "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80"
    ],
    "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    "isVerified": false,
    "phoneNumber": "9647723571770",
    "address": {
      "ar": "Street 109, Basra",
      "ku": "",
      "en": ""
    },
    "likes": 168,
    "saves": 14,
    "mapCoords": {
      "x": 40,
      "y": 30
    },
    "stories": []
  },
  {
    "id": "csv_41",
    "name": {
      "ar": "",
      "ku": "کافێی سلێمانی",
      "en": ""
    },
    "description": {
      "ar": "",
      "ku": "کافێیەکی نوێ لە ناوەندی شار کە قاوەی تایبەت و خوێنراوی سارد دەپێشکەش دەکات. ژینگەیەکی ئارام بۆ خێزانەکان.",
      "en": ""
    },
    "category": "restaurants_cafes",
    "governorate": "basra",
    "rating": 3.8,
    "reviewsCount": 12,
    "image": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80"
    ],
    "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    "isVerified": true,
    "phoneNumber": "9647916356991",
    "address": {
      "ar": "",
      "ku": "Street 4, Basra",
      "en": ""
    },
    "likes": 115,
    "saves": 47,
    "mapCoords": {
      "x": 41,
      "y": 44
    },
    "stories": []
  },
  {
    "id": "csv_42",
    "name": {
      "ar": "",
      "ku": "",
      "en": "New Horizon Academy"
    },
    "description": {
      "ar": "",
      "ku": "",
      "en": "Private school offering quality education for primary and secondary levels. Qualified teaching staff with modern curricula and extracurricular activities."
    },
    "category": "education_training_centers",
    "governorate": "basra",
    "rating": 4.1,
    "reviewsCount": 3,
    "image": "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80"
    ],
    "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    "isVerified": true,
    "phoneNumber": "9647853912983",
    "address": {
      "ar": "",
      "ku": "",
      "en": "Street 44, Basra"
    },
    "likes": 66,
    "saves": 17,
    "mapCoords": {
      "x": 68,
      "y": 54
    },
    "stories": []
  },
  {
    "id": "csv_43",
    "name": {
      "ar": "",
      "ku": "",
      "en": "Fitness First Baghdad"
    },
    "description": {
      "ar": "",
      "ku": "",
      "en": "State-of-the-art fitness center with modern equipment and certified personal trainers. Custom training programs for all fitness levels."
    },
    "category": "fitness_gyms",
    "governorate": "basra",
    "rating": 3.5,
    "reviewsCount": 8,
    "image": "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80"
    ],
    "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    "isVerified": false,
    "phoneNumber": "9647982014825",
    "address": {
      "ar": "",
      "ku": "",
      "en": "Street 471, Basra"
    },
    "likes": 81,
    "saves": 9,
    "mapCoords": {
      "x": 45,
      "y": 54
    },
    "stories": []
  },
  {
    "id": "csv_44",
    "name": {
      "ar": "",
      "ku": "",
      "en": "Smart Electronics"
    },
    "description": {
      "ar": "",
      "ku": "",
      "en": "Latest smartphones, laptops, and electronics at competitive prices. One-year warranty on all products with dedicated after-sales service."
    },
    "category": "electronics_tech_shops",
    "governorate": "basra",
    "rating": 5.0,
    "reviewsCount": 19,
    "image": "https://images.unsplash.com/photo-1498049860654-af1a5c5668ba?w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1498049860654-af1a5c5668ba?w=800&q=80"
    ],
    "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    "isVerified": false,
    "phoneNumber": "9647895065270",
    "address": {
      "ar": "",
      "ku": "",
      "en": "Street 222, Basra"
    },
    "likes": 17,
    "saves": 12,
    "mapCoords": {
      "x": 43,
      "y": 32
    },
    "stories": []
  },
  {
    "id": "csv_45",
    "name": {
      "ar": "صيدلية الشفاء",
      "ku": "",
      "en": ""
    },
    "description": {
      "ar": "صيدلية متكاملة توفر جميع الأدوية والمستلزمات الطبية. خدمة على مدار الساعة وتوصيل للمنازل.",
      "ku": "",
      "en": ""
    },
    "category": "health_medical_services",
    "governorate": "basra",
    "rating": 4.4,
    "reviewsCount": 13,
    "image": "https://images.unsplash.com/photo-1584515933487-779824d29309?w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1584515933487-779824d29309?w=800&q=80"
    ],
    "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    "isVerified": true,
    "phoneNumber": "",
    "address": {
      "ar": "Street 287, Basra",
      "ku": "",
      "en": ""
    },
    "likes": 90,
    "saves": 32,
    "mapCoords": {
      "x": 87,
      "y": 75
    },
    "stories": []
  },
  {
    "id": "csv_46",
    "name": {
      "ar": "",
      "ku": "",
      "en": "Tigris Pharmacy"
    },
    "description": {
      "ar": "",
      "ku": "",
      "en": "Fully stocked pharmacy offering prescription and over-the-counter medications. Delivery available and open 24 hours for emergencies."
    },
    "category": "health_medical_services",
    "governorate": "basra",
    "rating": 3.9,
    "reviewsCount": 24,
    "image": "https://images.unsplash.com/photo-1584515933487-779824d29309?w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1584515933487-779824d29309?w=800&q=80"
    ],
    "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    "isVerified": false,
    "phoneNumber": "",
    "address": {
      "ar": "",
      "ku": "",
      "en": "Street 14, Basra"
    },
    "likes": 143,
    "saves": 39,
    "mapCoords": {
      "x": 35,
      "y": 56
    },
    "stories": []
  },
  {
    "id": "csv_47",
    "name": {
      "ar": "",
      "ku": "ئەکادیمیای زانست",
      "en": ""
    },
    "description": {
      "ar": "",
      "ku": "قوتابخانەیەکی تایبەت کە خوێندنی باش بۆ قۆناغی سەرەتایی و ناوەڕاست دەپێشکەش دەکات. مامۆستایانی پسپۆڕ.",
      "en": ""
    },
    "category": "education_training_centers",
    "governorate": "basra",
    "rating": 4.0,
    "reviewsCount": 12,
    "image": "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80"
    ],
    "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    "isVerified": false,
    "phoneNumber": "9647725796940",
    "address": {
      "ar": "",
      "ku": "Street 120, Basra",
      "en": ""
    },
    "likes": 41,
    "saves": 24,
    "mapCoords": {
      "x": 74,
      "y": 49
    },
    "stories": []
  },
  {
    "id": "csv_48",
    "name": {
      "ar": "",
      "ku": "",
      "en": "Golden Gate Real Estate"
    },
    "description": {
      "ar": "",
      "ku": "",
      "en": "Specialists in residential and commercial property sales and rentals across Iraq. Over 15 years experience with trusted client relationships."
    },
    "category": "real_estate",
    "governorate": "basra",
    "rating": 4.5,
    "reviewsCount": 19,
    "image": "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80"
    ],
    "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    "isVerified": false,
    "phoneNumber": "9647973771475",
    "address": {
      "ar": "",
      "ku": "",
      "en": "Street 467, Basra"
    },
    "likes": 117,
    "saves": 47,
    "mapCoords": {
      "x": 58,
      "y": 32
    },
    "stories": []
  },
  {
    "id": "csv_49",
    "name": {
      "ar": "",
      "ku": "",
      "en": "Star Beauty Salon"
    },
    "description": {
      "ar": "",
      "ku": "",
      "en": "Premium ladies salon specializing in hair styling, skincare, and bridal packages. Experienced team using top international brands."
    },
    "category": "beauty_salons",
    "governorate": "basra",
    "rating": 4.3,
    "reviewsCount": 2,
    "image": "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80"
    ],
    "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    "isVerified": false,
    "phoneNumber": "9647927526126",
    "address": {
      "ar": "",
      "ku": "",
      "en": "Street 494, Basra"
    },
    "likes": 63,
    "saves": 32,
    "mapCoords": {
      "x": 84,
      "y": 87
    },
    "stories": []
  }
];

export const CSV_POSTS: SocialPost[] = [
  {
    "id": "post_0",
    "businessId": "csv_0",
    "businessName": "Baghdad Tech Hub",
    "businessAvatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    "category": "it_software_services",
    "governorate": "baghdad",
    "mediaUrl": "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80",
    "caption": {
      "ar": "",
      "ku": "",
      "en": "Full-service IT solutions provider offering web development, networking, and software support. Serving businesses across Iraq with expert teams."
    },
    "likes": 399,
    "commentsCount": 37,
    "shares": 3,
    "timeAgo": {
      "ar": "قبل 44 ساعة",
      "ku": "پێش 44 کاتژمێر",
      "en": "44h ago"
    },
    "comments": [],
    "likedByUser": false,
    "savedByUser": false
  },
  {
    "id": "post_1",
    "businessId": "csv_1",
    "businessName": "فندق دجلة الكبير",
    "businessAvatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    "category": "hotels_hospitality",
    "governorate": "baghdad",
    "mediaUrl": "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
    "caption": {
      "ar": "فندق فاخر يطل على نهر دجلة يوفر أجنحة فاخرة وخدمات عالمية المستوى. مطعم وقاعات مؤتمرات.",
      "ku": "",
      "en": ""
    },
    "likes": 307,
    "commentsCount": 15,
    "shares": 23,
    "timeAgo": {
      "ar": "قبل 2 ساعة",
      "ku": "پێش 2 کاتژمێر",
      "en": "2h ago"
    },
    "comments": [],
    "likedByUser": false,
    "savedByUser": false
  },
  {
    "id": "post_2",
    "businessId": "csv_2",
    "businessName": "Tigris Pharmacy",
    "businessAvatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    "category": "health_medical_services",
    "governorate": "baghdad",
    "mediaUrl": "https://images.unsplash.com/photo-1584515933487-779824d29309?w=800&q=80",
    "caption": {
      "ar": "",
      "ku": "",
      "en": "Fully stocked pharmacy offering prescription and over-the-counter medications. Delivery available and open 24 hours for emergencies."
    },
    "likes": 377,
    "commentsCount": 30,
    "shares": 11,
    "timeAgo": {
      "ar": "قبل 11 ساعة",
      "ku": "پێش 11 کاتژمێر",
      "en": "11h ago"
    },
    "comments": [],
    "likedByUser": false,
    "savedByUser": false
  },
  {
    "id": "post_3",
    "businessId": "csv_3",
    "businessName": "ھۆتێلی شاری کوردستان",
    "businessAvatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    "category": "hotels_hospitality",
    "governorate": "baghdad",
    "mediaUrl": "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
    "caption": {
      "ar": "",
      "ku": "ھۆتێلێکی لوکس کە سویتی فاخر و خزمەتگوزاری ئاستی جیھانی دەپێشکەش دەکات. چێشتخانە و سالۆنی کۆنفراس.",
      "en": ""
    },
    "likes": 203,
    "commentsCount": 25,
    "shares": 20,
    "timeAgo": {
      "ar": "قبل 7 ساعة",
      "ku": "پێش 7 کاتژمێر",
      "en": "7h ago"
    },
    "comments": [],
    "likedByUser": false,
    "savedByUser": false
  },
  {
    "id": "post_4",
    "businessId": "csv_4",
    "businessName": "صيدلية الشفاء",
    "businessAvatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    "category": "health_medical_services",
    "governorate": "baghdad",
    "mediaUrl": "https://images.unsplash.com/photo-1584515933487-779824d29309?w=800&q=80",
    "caption": {
      "ar": "صيدلية متكاملة توفر جميع الأدوية والمستلزمات الطبية. خدمة على مدار الساعة وتوصيل للمنازل.",
      "ku": "",
      "en": ""
    },
    "likes": 170,
    "commentsCount": 43,
    "shares": 20,
    "timeAgo": {
      "ar": "قبل 36 ساعة",
      "ku": "پێش 36 کاتژمێر",
      "en": "36h ago"
    },
    "comments": [],
    "likedByUser": false,
    "savedByUser": false
  },
  {
    "id": "post_5",
    "businessId": "csv_5",
    "businessName": "مركز لياقة بغداد",
    "businessAvatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    "category": "fitness_gyms",
    "governorate": "baghdad",
    "mediaUrl": "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80",
    "caption": {
      "ar": "مركز لياقة بدنية مجهز بأحدث الأجهزة الرياضية. مدربون معتمدون وبرامج تدريبية مخصصة.",
      "ku": "",
      "en": ""
    },
    "likes": 60,
    "commentsCount": 17,
    "shares": 28,
    "timeAgo": {
      "ar": "قبل 19 ساعة",
      "ku": "پێش 19 کاتژمێر",
      "en": "19h ago"
    },
    "comments": [],
    "likedByUser": false,
    "savedByUser": false
  },
  {
    "id": "post_6",
    "businessId": "csv_6",
    "businessName": "مدرسة النور الأهلية",
    "businessAvatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    "category": "education_training_centers",
    "governorate": "baghdad",
    "mediaUrl": "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80",
    "caption": {
      "ar": "مدرسة أهلية تقدم تعليماً متميزاً للمراحل الابتدائية والمتوسطة. كوادر تدريسية مؤهلة ومناهج حديثة.",
      "ku": "",
      "en": ""
    },
    "likes": 363,
    "commentsCount": 20,
    "shares": 23,
    "timeAgo": {
      "ar": "قبل 14 ساعة",
      "ku": "پێش 14 کاتژمێر",
      "en": "14h ago"
    },
    "comments": [],
    "likedByUser": false,
    "savedByUser": false
  },
  {
    "id": "post_7",
    "businessId": "csv_7",
    "businessName": "کافێی سلێمانی",
    "businessAvatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    "category": "restaurants_cafes",
    "governorate": "baghdad",
    "mediaUrl": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80",
    "caption": {
      "ar": "",
      "ku": "کافێیەکی نوێ لە ناوەندی شار کە قاوەی تایبەت و خوێنراوی سارد دەپێشکەش دەکات. ژینگەیەکی ئارام بۆ خێزانەکان.",
      "en": ""
    },
    "likes": 256,
    "commentsCount": 27,
    "shares": 9,
    "timeAgo": {
      "ar": "قبل 11 ساعة",
      "ku": "پێش 11 کاتژمێر",
      "en": "11h ago"
    },
    "comments": [],
    "likedByUser": false,
    "savedByUser": false
  },
  {
    "id": "post_8",
    "businessId": "csv_8",
    "businessName": "Golden Gate Real Estate",
    "businessAvatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    "category": "real_estate",
    "governorate": "baghdad",
    "mediaUrl": "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80",
    "caption": {
      "ar": "",
      "ku": "",
      "en": "Specialists in residential and commercial property sales and rentals across Iraq. Over 15 years experience with trusted client relationships."
    },
    "likes": 440,
    "commentsCount": 5,
    "shares": 26,
    "timeAgo": {
      "ar": "قبل 15 ساعة",
      "ku": "پێش 15 کاتژمێر",
      "en": "15h ago"
    },
    "comments": [],
    "likedByUser": false,
    "savedByUser": false
  },
  {
    "id": "post_9",
    "businessId": "csv_9",
    "businessName": "خواردنگەی سەرکەوتن",
    "businessAvatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    "category": "restaurants_cafes",
    "governorate": "baghdad",
    "mediaUrl": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80",
    "caption": {
      "ar": "",
      "ku": "چێشتخانەیەکی کوردی ئەسیل کە خواردنی دەستپێکردن و کەبابی دەپێشکەش دەکات. ڕۆژانە لە کاتژمێر ١٠ی بەیانی تا نیوەشەو کراوەیە.",
      "en": ""
    },
    "likes": 275,
    "commentsCount": 28,
    "shares": 29,
    "timeAgo": {
      "ar": "قبل 42 ساعة",
      "ku": "پێش 42 کاتژمێر",
      "en": "42h ago"
    },
    "comments": [],
    "likedByUser": false,
    "savedByUser": false
  },
  {
    "id": "post_10",
    "businessId": "csv_10",
    "businessName": "Mesopotamia Grand Hotel",
    "businessAvatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    "category": "hotels_hospitality",
    "governorate": "baghdad",
    "mediaUrl": "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
    "caption": {
      "ar": "",
      "ku": "",
      "en": "Luxury riverside hotel offering premium suites and world-class service. Business conference facilities, fine dining, and event hosting available."
    },
    "likes": 402,
    "commentsCount": 40,
    "shares": 14,
    "timeAgo": {
      "ar": "قبل 17 ساعة",
      "ku": "پێش 17 کاتژمێر",
      "en": "17h ago"
    },
    "comments": [],
    "likedByUser": false,
    "savedByUser": false
  },
  {
    "id": "post_11",
    "businessId": "csv_11",
    "businessName": "ئۆفیسی موڵکی زێڕین",
    "businessAvatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    "category": "real_estate",
    "governorate": "baghdad",
    "mediaUrl": "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80",
    "caption": {
      "ar": "",
      "ku": "پسپۆڕ لە فرۆشتن و بەکرێدانی خانووبەرە نیشتەجێبوون و بازرگانیەکان. زیاتر لە ١٥ ساڵ ئەزموون.",
      "en": ""
    },
    "likes": 460,
    "commentsCount": 10,
    "shares": 5,
    "timeAgo": {
      "ar": "قبل 4 ساعة",
      "ku": "پێش 4 کاتژمێر",
      "en": "4h ago"
    },
    "comments": [],
    "likedByUser": false,
    "savedByUser": false
  },
  {
    "id": "post_12",
    "businessId": "csv_12",
    "businessName": "شركة البناء الحديث",
    "businessAvatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    "category": "construction_contractors",
    "governorate": "baghdad",
    "mediaUrl": "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80",
    "caption": {
      "ar": "شركة مقاولات متخصصة في البناء والتشييد السكني والتجاري. جودة عالية وتسليم في الموعد المحدد.",
      "ku": "",
      "en": ""
    },
    "likes": 259,
    "commentsCount": 36,
    "shares": 9,
    "timeAgo": {
      "ar": "قبل 39 ساعة",
      "ku": "پێش 39 کاتژمێر",
      "en": "39h ago"
    },
    "comments": [],
    "likedByUser": false,
    "savedByUser": false
  },
  {
    "id": "post_13",
    "businessId": "csv_13",
    "businessName": "Star Beauty Salon",
    "businessAvatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    "category": "beauty_salons",
    "governorate": "baghdad",
    "mediaUrl": "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80",
    "caption": {
      "ar": "",
      "ku": "",
      "en": "Premium ladies salon specializing in hair styling, skincare, and bridal packages. Experienced team using top international brands."
    },
    "likes": 194,
    "commentsCount": 10,
    "shares": 10,
    "timeAgo": {
      "ar": "قبل 42 ساعة",
      "ku": "پێش 42 کاتژمێر",
      "en": "42h ago"
    },
    "comments": [],
    "likedByUser": false,
    "savedByUser": false
  },
  {
    "id": "post_14",
    "businessId": "csv_14",
    "businessName": "کلۆبی وەرزشی ئەرێن",
    "businessAvatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    "category": "fitness_gyms",
    "governorate": "baghdad",
    "mediaUrl": "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80",
    "caption": {
      "ar": "",
      "ku": "سەنتەرێکی تەندروستی کە دەبێتە ئامێرەکانی وەرزشی نوێترین. مەشقدەرانی پەسەندکراو و پرۆگرامی تایبەت.",
      "en": ""
    },
    "likes": 487,
    "commentsCount": 9,
    "shares": 28,
    "timeAgo": {
      "ar": "قبل 33 ساعة",
      "ku": "پێش 33 کاتژمێر",
      "en": "33h ago"
    },
    "comments": [],
    "likedByUser": false,
    "savedByUser": false
  },
  {
    "id": "post_15",
    "businessId": "csv_15",
    "businessName": "Fitness First Baghdad",
    "businessAvatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    "category": "fitness_gyms",
    "governorate": "baghdad",
    "mediaUrl": "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80",
    "caption": {
      "ar": "",
      "ku": "",
      "en": "State-of-the-art fitness center with modern equipment and certified personal trainers. Custom training programs for all fitness levels."
    },
    "likes": 296,
    "commentsCount": 36,
    "shares": 30,
    "timeAgo": {
      "ar": "قبل 11 ساعة",
      "ku": "پێش 11 کاتژمێر",
      "en": "11h ago"
    },
    "comments": [],
    "likedByUser": false,
    "savedByUser": false
  },
  {
    "id": "post_16",
    "businessId": "csv_16",
    "businessName": "Modern Build Co.",
    "businessAvatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    "category": "construction_contractors",
    "governorate": "baghdad",
    "mediaUrl": "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80",
    "caption": {
      "ar": "",
      "ku": "",
      "en": "Professional contracting company specializing in residential and commercial construction. High-quality materials with guaranteed on-time delivery."
    },
    "likes": 143,
    "commentsCount": 39,
    "shares": 3,
    "timeAgo": {
      "ar": "قبل 4 ساعة",
      "ku": "پێش 4 کاتژمێر",
      "en": "4h ago"
    },
    "comments": [],
    "likedByUser": false,
    "savedByUser": false
  },
  {
    "id": "post_17",
    "businessId": "csv_17",
    "businessName": "دەرمانخانەی ژیان",
    "businessAvatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    "category": "health_medical_services",
    "governorate": "baghdad",
    "mediaUrl": "https://images.unsplash.com/photo-1584515933487-779824d29309?w=800&q=80",
    "caption": {
      "ar": "",
      "ku": "دەرمانخانەیەکی تەواو کە هەموو دەرمان و پێداویستییەکانی پزیشکی دەپێشکەش دەکات. خزمەتگوزاری ٢٤ کاتژمێر.",
      "en": ""
    },
    "likes": 104,
    "commentsCount": 19,
    "shares": 17,
    "timeAgo": {
      "ar": "قبل 36 ساعة",
      "ku": "پێش 36 کاتژمێر",
      "en": "36h ago"
    },
    "comments": [],
    "likedByUser": false,
    "savedByUser": false
  },
  {
    "id": "post_18",
    "businessId": "csv_18",
    "businessName": "سالۆنی ژینانەی ستێرە",
    "businessAvatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    "category": "beauty_salons",
    "governorate": "baghdad",
    "mediaUrl": "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80",
    "caption": {
      "ar": "",
      "ku": "سالۆنێکی تایبەت بۆ ژنان کە پسپۆڕی ئامادەکردنی قژ و چاودێری پێست. تیمێکی پسپۆڕ و ئەزموونی بەرز.",
      "en": ""
    },
    "likes": 363,
    "commentsCount": 44,
    "shares": 12,
    "timeAgo": {
      "ar": "قبل 26 ساعة",
      "ku": "پێش 26 کاتژمێر",
      "en": "26h ago"
    },
    "comments": [],
    "likedByUser": false,
    "savedByUser": false
  },
  {
    "id": "post_19",
    "businessId": "csv_19",
    "businessName": "ئەکادیمیای زانست",
    "businessAvatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    "category": "education_training_centers",
    "governorate": "baghdad",
    "mediaUrl": "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80",
    "caption": {
      "ar": "",
      "ku": "قوتابخانەیەکی تایبەت کە خوێندنی باش بۆ قۆناغی سەرەتایی و ناوەڕاست دەپێشکەش دەکات. مامۆستایانی پسپۆڕ.",
      "en": ""
    },
    "likes": 321,
    "commentsCount": 38,
    "shares": 8,
    "timeAgo": {
      "ar": "قبل 2 ساعة",
      "ku": "پێش 2 کاتژمێر",
      "en": "2h ago"
    },
    "comments": [],
    "likedByUser": false,
    "savedByUser": false
  },
  {
    "id": "post_20",
    "businessId": "csv_20",
    "businessName": "مكتب العقارات الذهبي",
    "businessAvatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    "category": "real_estate",
    "governorate": "baghdad",
    "mediaUrl": "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80",
    "caption": {
      "ar": "متخصصون في بيع وتأجير العقارات السكنية والتجارية في جميع أنحاء العراق. خبرة أكثر من 15 عاماً.",
      "ku": "",
      "en": ""
    },
    "likes": 460,
    "commentsCount": 24,
    "shares": 3,
    "timeAgo": {
      "ar": "قبل 3 ساعة",
      "ku": "پێش 3 کاتژمێر",
      "en": "3h ago"
    },
    "comments": [],
    "likedByUser": false,
    "savedByUser": false
  },
  {
    "id": "post_21",
    "businessId": "csv_21",
    "businessName": "محل الإلكترونيات الحديث",
    "businessAvatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    "category": "electronics_tech_shops",
    "governorate": "baghdad",
    "mediaUrl": "https://images.unsplash.com/photo-1498049860654-af1a5c5668ba?w=800&q=80",
    "caption": {
      "ar": "أحدث الأجهزة الإلكترونية والهواتف الذكية بأسعار تنافسية. ضمان سنة وخدمة ما بعد البيع.",
      "ku": "",
      "en": ""
    },
    "likes": 262,
    "commentsCount": 18,
    "shares": 26,
    "timeAgo": {
      "ar": "قبل 37 ساعة",
      "ku": "پێش 37 کاتژمێر",
      "en": "37h ago"
    },
    "comments": [],
    "likedByUser": false,
    "savedByUser": false
  },
  {
    "id": "post_22",
    "businessId": "csv_22",
    "businessName": "فرۆشگەی تەکنەلۆژیا",
    "businessAvatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    "category": "electronics_tech_shops",
    "governorate": "baghdad",
    "mediaUrl": "https://images.unsplash.com/photo-1498049860654-af1a5c5668ba?w=800&q=80",
    "caption": {
      "ar": "",
      "ku": "نوێترین ئامێرە ئەلکترۆنیکەکان و مۆبایلی زیرەک بە نرخی پێشبازیانە. مزگێنی ساڵێک و خزمەتگوزاری دواتر.",
      "en": ""
    },
    "likes": 230,
    "commentsCount": 32,
    "shares": 28,
    "timeAgo": {
      "ar": "قبل 28 ساعة",
      "ku": "پێش 28 کاتژمێر",
      "en": "28h ago"
    },
    "comments": [],
    "likedByUser": false,
    "savedByUser": false
  },
  {
    "id": "post_23",
    "businessId": "csv_23",
    "businessName": "کۆمپانیای بیناسازی نوێ",
    "businessAvatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    "category": "construction_contractors",
    "governorate": "baghdad",
    "mediaUrl": "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80",
    "caption": {
      "ar": "",
      "ku": "کۆمپانیایەکی پەیمانکاری پسپۆڕ لە بینا و ئاوەدانکاری نیشتەجێبوون و بازرگانی. کوالیتی بەرز و گەیاندن لە ماوەی دیاریکراودا.",
      "en": ""
    },
    "likes": 193,
    "commentsCount": 9,
    "shares": 8,
    "timeAgo": {
      "ar": "قبل 47 ساعة",
      "ku": "پێش 47 کاتژمێر",
      "en": "47h ago"
    },
    "comments": [],
    "likedByUser": false,
    "savedByUser": false
  },
  {
    "id": "post_24",
    "businessId": "csv_24",
    "businessName": "كافيه العراق",
    "businessAvatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    "category": "restaurants_cafes",
    "governorate": "baghdad",
    "mediaUrl": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80",
    "caption": {
      "ar": "كافيه عصري في قلب المدينة يقدم القهوة المختصة والمشروبات الباردة. أجواء هادئة ومريحة للعائلات.",
      "ku": "",
      "en": ""
    },
    "likes": 467,
    "commentsCount": 7,
    "shares": 15,
    "timeAgo": {
      "ar": "قبل 16 ساعة",
      "ku": "پێش 16 کاتژمێر",
      "en": "16h ago"
    },
    "comments": [],
    "likedByUser": false,
    "savedByUser": false
  },
  {
    "id": "post_25",
    "businessId": "csv_25",
    "businessName": "صالون نور الجمال",
    "businessAvatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    "category": "beauty_salons",
    "governorate": "baghdad",
    "mediaUrl": "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80",
    "caption": {
      "ar": "صالون نسائي متخصص في تصفيف الشعر والعناية بالبشرة. فريق متخصص وخبرة تجميلية عالية.",
      "ku": "",
      "en": ""
    },
    "likes": 494,
    "commentsCount": 18,
    "shares": 6,
    "timeAgo": {
      "ar": "قبل 6 ساعة",
      "ku": "پێش 6 کاتژمێر",
      "en": "6h ago"
    },
    "comments": [],
    "likedByUser": false,
    "savedByUser": false
  },
  {
    "id": "post_26",
    "businessId": "csv_26",
    "businessName": "Al-Rasheed Restaurant",
    "businessAvatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    "category": "restaurants_cafes",
    "governorate": "baghdad",
    "mediaUrl": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80",
    "caption": {
      "ar": "",
      "ku": "",
      "en": "Authentic Iraqi cuisine serving traditional dishes and grilled meats since 1995. Open daily, family-friendly atmosphere with private seating areas."
    },
    "likes": 219,
    "commentsCount": 19,
    "shares": 30,
    "timeAgo": {
      "ar": "قبل 1 ساعة",
      "ku": "پێش 1 کاتژمێر",
      "en": "1h ago"
    },
    "comments": [],
    "likedByUser": false,
    "savedByUser": false
  },
  {
    "id": "post_27",
    "businessId": "csv_27",
    "businessName": "New Horizon Academy",
    "businessAvatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    "category": "education_training_centers",
    "governorate": "baghdad",
    "mediaUrl": "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80",
    "caption": {
      "ar": "",
      "ku": "",
      "en": "Private school offering quality education for primary and secondary levels. Qualified teaching staff with modern curricula and extracurricular activities."
    },
    "likes": 171,
    "commentsCount": 16,
    "shares": 2,
    "timeAgo": {
      "ar": "قبل 13 ساعة",
      "ku": "پێش 13 کاتژمێر",
      "en": "13h ago"
    },
    "comments": [],
    "likedByUser": false,
    "savedByUser": false
  },
  {
    "id": "post_28",
    "businessId": "csv_28",
    "businessName": "مطعم الشرقية",
    "businessAvatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    "category": "restaurants_cafes",
    "governorate": "baghdad",
    "mediaUrl": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80",
    "caption": {
      "ar": "مطعم عراقي أصيل يقدم أشهى المأكولات الشعبية والمشاوي. نفتح يومياً من الساعة 10 صباحاً حتى منتصف الليل.",
      "ku": "",
      "en": ""
    },
    "likes": 277,
    "commentsCount": 36,
    "shares": 6,
    "timeAgo": {
      "ar": "قبل 31 ساعة",
      "ku": "پێش 31 کاتژمێر",
      "en": "31h ago"
    },
    "comments": [],
    "likedByUser": false,
    "savedByUser": false
  },
  {
    "id": "post_29",
    "businessId": "csv_29",
    "businessName": "Smart Electronics",
    "businessAvatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    "category": "electronics_tech_shops",
    "governorate": "baghdad",
    "mediaUrl": "https://images.unsplash.com/photo-1498049860654-af1a5c5668ba?w=800&q=80",
    "caption": {
      "ar": "",
      "ku": "",
      "en": "Latest smartphones, laptops, and electronics at competitive prices. One-year warranty on all products with dedicated after-sales service."
    },
    "likes": 461,
    "commentsCount": 18,
    "shares": 13,
    "timeAgo": {
      "ar": "قبل 44 ساعة",
      "ku": "پێش 44 کاتژمێر",
      "en": "44h ago"
    },
    "comments": [],
    "likedByUser": false,
    "savedByUser": false
  },
  {
    "id": "post_30",
    "businessId": "csv_30",
    "businessName": "شركة البناء الحديث",
    "businessAvatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    "category": "construction_contractors",
    "governorate": "basra",
    "mediaUrl": "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80",
    "caption": {
      "ar": "شركة مقاولات متخصصة في البناء والتشييد السكني والتجاري. جودة عالية وتسليم في الموعد المحدد.",
      "ku": "",
      "en": ""
    },
    "likes": 234,
    "commentsCount": 45,
    "shares": 19,
    "timeAgo": {
      "ar": "قبل 6 ساعة",
      "ku": "پێش 6 کاتژمێر",
      "en": "6h ago"
    },
    "comments": [],
    "likedByUser": false,
    "savedByUser": false
  },
  {
    "id": "post_31",
    "businessId": "csv_31",
    "businessName": "مدرسة النور الأهلية",
    "businessAvatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    "category": "education_training_centers",
    "governorate": "basra",
    "mediaUrl": "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80",
    "caption": {
      "ar": "مدرسة أهلية تقدم تعليماً متميزاً للمراحل الابتدائية والمتوسطة. كوادر تدريسية مؤهلة ومناهج حديثة.",
      "ku": "",
      "en": ""
    },
    "likes": 222,
    "commentsCount": 11,
    "shares": 22,
    "timeAgo": {
      "ar": "قبل 17 ساعة",
      "ku": "پێش 17 کاتژمێر",
      "en": "17h ago"
    },
    "comments": [],
    "likedByUser": false,
    "savedByUser": false
  },
  {
    "id": "post_32",
    "businessId": "csv_32",
    "businessName": "مكتب العقارات الذهبي",
    "businessAvatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    "category": "real_estate",
    "governorate": "basra",
    "mediaUrl": "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80",
    "caption": {
      "ar": "متخصصون في بيع وتأجير العقارات السكنية والتجارية في جميع أنحاء العراق. خبرة أكثر من 15 عاماً.",
      "ku": "",
      "en": ""
    },
    "likes": 71,
    "commentsCount": 7,
    "shares": 18,
    "timeAgo": {
      "ar": "قبل 37 ساعة",
      "ku": "پێش 37 کاتژمێر",
      "en": "37h ago"
    },
    "comments": [],
    "likedByUser": false,
    "savedByUser": false
  },
  {
    "id": "post_33",
    "businessId": "csv_33",
    "businessName": "خواردنگەی سەرکەوتن",
    "businessAvatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    "category": "restaurants_cafes",
    "governorate": "basra",
    "mediaUrl": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80",
    "caption": {
      "ar": "",
      "ku": "چێشتخانەیەکی کوردی ئەسیل کە خواردنی دەستپێکردن و کەبابی دەپێشکەش دەکات. ڕۆژانە لە کاتژمێر ١٠ی بەیانی تا نیوەشەو کراوەیە.",
      "en": ""
    },
    "likes": 100,
    "commentsCount": 31,
    "shares": 27,
    "timeAgo": {
      "ar": "قبل 19 ساعة",
      "ku": "پێش 19 کاتژمێر",
      "en": "19h ago"
    },
    "comments": [],
    "likedByUser": false,
    "savedByUser": false
  },
  {
    "id": "post_34",
    "businessId": "csv_34",
    "businessName": "Mesopotamia Grand Hotel",
    "businessAvatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    "category": "hotels_hospitality",
    "governorate": "basra",
    "mediaUrl": "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
    "caption": {
      "ar": "",
      "ku": "",
      "en": "Luxury riverside hotel offering premium suites and world-class service. Business conference facilities, fine dining, and event hosting available."
    },
    "likes": 497,
    "commentsCount": 45,
    "shares": 4,
    "timeAgo": {
      "ar": "قبل 20 ساعة",
      "ku": "پێش 20 کاتژمێر",
      "en": "20h ago"
    },
    "comments": [],
    "likedByUser": false,
    "savedByUser": false
  },
  {
    "id": "post_35",
    "businessId": "csv_35",
    "businessName": "مطعم الشرقية",
    "businessAvatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    "category": "restaurants_cafes",
    "governorate": "basra",
    "mediaUrl": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80",
    "caption": {
      "ar": "مطعم عراقي أصيل يقدم أشهى المأكولات الشعبية والمشاوي. نفتح يومياً من الساعة 10 صباحاً حتى منتصف الليل.",
      "ku": "",
      "en": ""
    },
    "likes": 329,
    "commentsCount": 16,
    "shares": 23,
    "timeAgo": {
      "ar": "قبل 19 ساعة",
      "ku": "پێش 19 کاتژمێر",
      "en": "19h ago"
    },
    "comments": [],
    "likedByUser": false,
    "savedByUser": false
  },
  {
    "id": "post_36",
    "businessId": "csv_36",
    "businessName": "مركز لياقة بغداد",
    "businessAvatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    "category": "fitness_gyms",
    "governorate": "basra",
    "mediaUrl": "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80",
    "caption": {
      "ar": "مركز لياقة بدنية مجهز بأحدث الأجهزة الرياضية. مدربون معتمدون وبرامج تدريبية مخصصة.",
      "ku": "",
      "en": ""
    },
    "likes": 67,
    "commentsCount": 43,
    "shares": 14,
    "timeAgo": {
      "ar": "قبل 4 ساعة",
      "ku": "پێش 4 کاتژمێر",
      "en": "4h ago"
    },
    "comments": [],
    "likedByUser": false,
    "savedByUser": false
  },
  {
    "id": "post_37",
    "businessId": "csv_37",
    "businessName": "کلۆبی وەرزشی ئەرێن",
    "businessAvatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    "category": "fitness_gyms",
    "governorate": "basra",
    "mediaUrl": "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80",
    "caption": {
      "ar": "",
      "ku": "سەنتەرێکی تەندروستی کە دەبێتە ئامێرەکانی وەرزشی نوێترین. مەشقدەرانی پەسەندکراو و پرۆگرامی تایبەت.",
      "en": ""
    },
    "likes": 246,
    "commentsCount": 38,
    "shares": 23,
    "timeAgo": {
      "ar": "قبل 48 ساعة",
      "ku": "پێش 48 کاتژمێر",
      "en": "48h ago"
    },
    "comments": [],
    "likedByUser": false,
    "savedByUser": false
  },
  {
    "id": "post_38",
    "businessId": "csv_38",
    "businessName": "محل الإلكترونيات الحديث",
    "businessAvatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    "category": "electronics_tech_shops",
    "governorate": "basra",
    "mediaUrl": "https://images.unsplash.com/photo-1498049860654-af1a5c5668ba?w=800&q=80",
    "caption": {
      "ar": "أحدث الأجهزة الإلكترونية والهواتف الذكية بأسعار تنافسية. ضمان سنة وخدمة ما بعد البيع.",
      "ku": "",
      "en": ""
    },
    "likes": 318,
    "commentsCount": 38,
    "shares": 5,
    "timeAgo": {
      "ar": "قبل 24 ساعة",
      "ku": "پێش 24 کاتژمێر",
      "en": "24h ago"
    },
    "comments": [],
    "likedByUser": false,
    "savedByUser": false
  },
  {
    "id": "post_39",
    "businessId": "csv_39",
    "businessName": "کۆمپانیای بیناسازی نوێ",
    "businessAvatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    "category": "construction_contractors",
    "governorate": "basra",
    "mediaUrl": "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80",
    "caption": {
      "ar": "",
      "ku": "کۆمپانیایەکی پەیمانکاری پسپۆڕ لە بینا و ئاوەدانکاری نیشتەجێبوون و بازرگانی. کوالیتی بەرز و گەیاندن لە ماوەی دیاریکراودا.",
      "en": ""
    },
    "likes": 72,
    "commentsCount": 25,
    "shares": 25,
    "timeAgo": {
      "ar": "قبل 43 ساعة",
      "ku": "پێش 43 کاتژمێر",
      "en": "43h ago"
    },
    "comments": [],
    "likedByUser": false,
    "savedByUser": false
  },
  {
    "id": "post_40",
    "businessId": "csv_40",
    "businessName": "فندق دجلة الكبير",
    "businessAvatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    "category": "hotels_hospitality",
    "governorate": "basra",
    "mediaUrl": "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
    "caption": {
      "ar": "فندق فاخر يطل على نهر دجلة يوفر أجنحة فاخرة وخدمات عالمية المستوى. مطعم وقاعات مؤتمرات.",
      "ku": "",
      "en": ""
    },
    "likes": 471,
    "commentsCount": 29,
    "shares": 1,
    "timeAgo": {
      "ar": "قبل 12 ساعة",
      "ku": "پێش 12 کاتژمێر",
      "en": "12h ago"
    },
    "comments": [],
    "likedByUser": false,
    "savedByUser": false
  },
  {
    "id": "post_41",
    "businessId": "csv_41",
    "businessName": "کافێی سلێمانی",
    "businessAvatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    "category": "restaurants_cafes",
    "governorate": "basra",
    "mediaUrl": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80",
    "caption": {
      "ar": "",
      "ku": "کافێیەکی نوێ لە ناوەندی شار کە قاوەی تایبەت و خوێنراوی سارد دەپێشکەش دەکات. ژینگەیەکی ئارام بۆ خێزانەکان.",
      "en": ""
    },
    "likes": 423,
    "commentsCount": 47,
    "shares": 4,
    "timeAgo": {
      "ar": "قبل 11 ساعة",
      "ku": "پێش 11 کاتژمێر",
      "en": "11h ago"
    },
    "comments": [],
    "likedByUser": false,
    "savedByUser": false
  },
  {
    "id": "post_42",
    "businessId": "csv_42",
    "businessName": "New Horizon Academy",
    "businessAvatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    "category": "education_training_centers",
    "governorate": "basra",
    "mediaUrl": "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80",
    "caption": {
      "ar": "",
      "ku": "",
      "en": "Private school offering quality education for primary and secondary levels. Qualified teaching staff with modern curricula and extracurricular activities."
    },
    "likes": 440,
    "commentsCount": 17,
    "shares": 8,
    "timeAgo": {
      "ar": "قبل 20 ساعة",
      "ku": "پێش 20 کاتژمێر",
      "en": "20h ago"
    },
    "comments": [],
    "likedByUser": false,
    "savedByUser": false
  },
  {
    "id": "post_43",
    "businessId": "csv_43",
    "businessName": "Fitness First Baghdad",
    "businessAvatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    "category": "fitness_gyms",
    "governorate": "basra",
    "mediaUrl": "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80",
    "caption": {
      "ar": "",
      "ku": "",
      "en": "State-of-the-art fitness center with modern equipment and certified personal trainers. Custom training programs for all fitness levels."
    },
    "likes": 280,
    "commentsCount": 28,
    "shares": 22,
    "timeAgo": {
      "ar": "قبل 42 ساعة",
      "ku": "پێش 42 کاتژمێر",
      "en": "42h ago"
    },
    "comments": [],
    "likedByUser": false,
    "savedByUser": false
  },
  {
    "id": "post_44",
    "businessId": "csv_44",
    "businessName": "Smart Electronics",
    "businessAvatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    "category": "electronics_tech_shops",
    "governorate": "basra",
    "mediaUrl": "https://images.unsplash.com/photo-1498049860654-af1a5c5668ba?w=800&q=80",
    "caption": {
      "ar": "",
      "ku": "",
      "en": "Latest smartphones, laptops, and electronics at competitive prices. One-year warranty on all products with dedicated after-sales service."
    },
    "likes": 155,
    "commentsCount": 5,
    "shares": 4,
    "timeAgo": {
      "ar": "قبل 38 ساعة",
      "ku": "پێش 38 کاتژمێر",
      "en": "38h ago"
    },
    "comments": [],
    "likedByUser": false,
    "savedByUser": false
  },
  {
    "id": "post_45",
    "businessId": "csv_45",
    "businessName": "صيدلية الشفاء",
    "businessAvatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    "category": "health_medical_services",
    "governorate": "basra",
    "mediaUrl": "https://images.unsplash.com/photo-1584515933487-779824d29309?w=800&q=80",
    "caption": {
      "ar": "صيدلية متكاملة توفر جميع الأدوية والمستلزمات الطبية. خدمة على مدار الساعة وتوصيل للمنازل.",
      "ku": "",
      "en": ""
    },
    "likes": 217,
    "commentsCount": 39,
    "shares": 7,
    "timeAgo": {
      "ar": "قبل 8 ساعة",
      "ku": "پێش 8 کاتژمێر",
      "en": "8h ago"
    },
    "comments": [],
    "likedByUser": false,
    "savedByUser": false
  },
  {
    "id": "post_46",
    "businessId": "csv_46",
    "businessName": "Tigris Pharmacy",
    "businessAvatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    "category": "health_medical_services",
    "governorate": "basra",
    "mediaUrl": "https://images.unsplash.com/photo-1584515933487-779824d29309?w=800&q=80",
    "caption": {
      "ar": "",
      "ku": "",
      "en": "Fully stocked pharmacy offering prescription and over-the-counter medications. Delivery available and open 24 hours for emergencies."
    },
    "likes": 55,
    "commentsCount": 45,
    "shares": 30,
    "timeAgo": {
      "ar": "قبل 28 ساعة",
      "ku": "پێش 28 کاتژمێر",
      "en": "28h ago"
    },
    "comments": [],
    "likedByUser": false,
    "savedByUser": false
  },
  {
    "id": "post_47",
    "businessId": "csv_47",
    "businessName": "ئەکادیمیای زانست",
    "businessAvatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    "category": "education_training_centers",
    "governorate": "basra",
    "mediaUrl": "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80",
    "caption": {
      "ar": "",
      "ku": "قوتابخانەیەکی تایبەت کە خوێندنی باش بۆ قۆناغی سەرەتایی و ناوەڕاست دەپێشکەش دەکات. مامۆستایانی پسپۆڕ.",
      "en": ""
    },
    "likes": 229,
    "commentsCount": 23,
    "shares": 13,
    "timeAgo": {
      "ar": "قبل 43 ساعة",
      "ku": "پێش 43 کاتژمێر",
      "en": "43h ago"
    },
    "comments": [],
    "likedByUser": false,
    "savedByUser": false
  },
  {
    "id": "post_48",
    "businessId": "csv_48",
    "businessName": "Golden Gate Real Estate",
    "businessAvatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    "category": "real_estate",
    "governorate": "basra",
    "mediaUrl": "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80",
    "caption": {
      "ar": "",
      "ku": "",
      "en": "Specialists in residential and commercial property sales and rentals across Iraq. Over 15 years experience with trusted client relationships."
    },
    "likes": 311,
    "commentsCount": 22,
    "shares": 13,
    "timeAgo": {
      "ar": "قبل 40 ساعة",
      "ku": "پێش 40 کاتژمێر",
      "en": "40h ago"
    },
    "comments": [],
    "likedByUser": false,
    "savedByUser": false
  },
  {
    "id": "post_49",
    "businessId": "csv_49",
    "businessName": "Star Beauty Salon",
    "businessAvatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    "category": "beauty_salons",
    "governorate": "basra",
    "mediaUrl": "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80",
    "caption": {
      "ar": "",
      "ku": "",
      "en": "Premium ladies salon specializing in hair styling, skincare, and bridal packages. Experienced team using top international brands."
    },
    "likes": 184,
    "commentsCount": 32,
    "shares": 15,
    "timeAgo": {
      "ar": "قبل 42 ساعة",
      "ku": "پێش 42 کاتژمێر",
      "en": "42h ago"
    },
    "comments": [],
    "likedByUser": false,
    "savedByUser": false
  }
];
