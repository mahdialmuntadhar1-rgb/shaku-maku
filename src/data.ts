import { Governorate, Category, Business, SocialPost, HeroSlide } from './types';

export const GOVERNORATES: Governorate[] = [
  {
    code: 'all',
    name: {
      ar: 'ÙƒÙ„ Ø§Ù„Ø¹Ø±Ø§Ù‚ ðŸ‡®ðŸ‡¶',
      ku: 'Ù‡Û•Ù…ÙˆÙˆ Ø¹ÛŽØ±Ø§Ù‚ ðŸ‡®ðŸ‡¶',
      en: 'All Iraq ðŸ‡®ðŸ‡¶'
    },
    englishLabel: 'All Iraq'
  },
  {
    code: 'baghdad',
    name: {
      ar: 'Ø¨ØºØ¯Ø§Ø¯ ðŸ°',
      ku: 'Ø¨Û•ØºØ¯Ø§Ø¯ ðŸ°',
      en: 'Baghdad ðŸ°'
    },
    englishLabel: 'Baghdad'
  },
  {
    code: 'erbil',
    name: {
      ar: 'Ø£Ø±Ø¨ÙŠÙ„ ðŸ”ï¸',
      ku: 'Ù‡Û•ÙˆÙ„ÛŽØ± ðŸ”ï¸',
      en: 'Erbil ðŸ”ï¸'
    },
    englishLabel: 'Erbil'
  },
  {
    code: 'basra',
    name: {
      ar: 'Ø§Ù„Ø¨ØµØ±Ø© ðŸŒ´',
      ku: 'Ø¨Û•Ø³Ø±Û• ðŸŒ´',
      en: 'Basra ðŸŒ´'
    },
    englishLabel: 'Basra'
  },
  {
    code: 'sulaymaniyah',
    name: {
      ar: 'Ø§Ù„Ø³Ù„ÙŠÙ…Ø§Ù†ÙŠØ© ðŸŒ¸',
      ku: 'Ø³Ù„ÛŽÙ…Ø§Ù†ÛŒ ðŸŒ¸',
      en: 'Sulaymaniyah ðŸŒ¸'
    },
    englishLabel: 'Sulaymaniyah'
  },
  {
    code: 'mosul',
    name: {
      ar: 'Ø§Ù„Ù…ÙˆØµÙ„ ðŸ',
      ku: 'Ù…ÙˆÙˆØ³Úµ ðŸ',
      en: 'Mosul ðŸ'
    },
    englishLabel: 'Mosul'
  },
  {
    code: 'najaf',
    name: {
      ar: 'Ø§Ù„Ù†Ø¬Ù âœ¨',
      ku: 'Ù†Û•Ø¬Û•Ù âœ¨',
      en: 'Najaf âœ¨'
    },
    englishLabel: 'Najaf'
  },
  {
    code: 'karbala',
    name: {
      ar: 'ÙƒØ±Ø¨Ù„Ø§Ø¡ ðŸ•Œ',
      ku: 'Ú©Û•Ø±Ø¨Û•Ù„Ø§ ðŸ•Œ',
      en: 'Karbala ðŸ•Œ'
    },
    englishLabel: 'Karbala'
  },
  {
    code: 'kirkuk',
    name: {
      ar: 'ÙƒØ±ÙƒÙˆÙƒ ðŸ›¢ï¸',
      ku: 'Ú©Û•Ø±Ú©ÙˆÙˆÚ© ðŸ›¢ï¸',
      en: 'Kirkuk ðŸ›¢ï¸'
    },
    englishLabel: 'Kirkuk'
  },
  {
    code: 'anbar',
    name: {
      ar: 'Ø§Ù„Ø£Ù†Ø¨Ø§Ø± ðŸŒµ',
      ku: 'Ø¦Û•Ù†Ø¨Ø§Ø± ðŸŒµ',
      en: 'Anbar ðŸŒµ'
    },
    englishLabel: 'Anbar'
  },
  {
    code: 'duhok',
    name: {
      ar: 'Ø¯Ù‡ÙˆÙƒ ðŸ”ï¸',
      ku: 'Ø¯Ù‡Û†Ú© ðŸ”ï¸',
      en: 'Duhok ðŸ”ï¸'
    },
    englishLabel: 'Duhok'
  },
  {
    code: 'babil',
    name: {
      ar: 'Ø¨Ø§Ø¨Ù„ ðŸ¦',
      ku: 'Ø¨Ø§Ø¨Ù„ ðŸ¦',
      en: 'Babylon ðŸ¦'
    },
    englishLabel: 'Babylon'
  },
  {
    code: 'diyala',
    name: {
      ar: 'Ø¯ÙŠØ§Ù„Ù‰ ðŸŠ',
      ku: 'Ø¯ÛŒØ§Ù„Û• ðŸŠ',
      en: 'Diyala ðŸŠ'
    },
    englishLabel: 'Diyala'
  },
  {
    code: 'wasit',
    name: {
      ar: 'ÙˆØ§Ø³Ø· ðŸŒ¾',
      ku: 'ÙˆØ§Ø³Ø· ðŸŒ¾',
      en: 'Wasit ðŸŒ¾'
    },
    englishLabel: 'Wasit'
  },
  {
    code: 'saladin',
    name: {
      ar: 'ØµÙ„Ø§Ø­ Ø§Ù„Ø¯ÙŠÙ† ðŸ°',
      ku: 'Ø³Û•ÚµØ§Ø­Û•Ø¯Ø¯ÛŒÙ† ðŸ°',
      en: 'Saladin ðŸ°'
    },
    englishLabel: 'Saladin'
  },
  {
    code: 'maysan',
    name: {
      ar: 'Ù…ÙŠØ³Ø§Ù† ðŸŒŠ',
      ku: 'Ù…ÛŒØ³Ø§Ù† ðŸŒŠ',
      en: 'Maysan ðŸŒŠ'
    },
    englishLabel: 'Maysan'
  },
  {
    code: 'dhiqar',
    name: {
      ar: 'Ø°ÙŠ Ù‚Ø§Ø± ðŸ›ï¸',
      ku: 'Ø²ÛŒÙ‚Ø§Ø± ðŸ›ï¸',
      en: 'Dhi Qar ðŸ›ï¸'
    },
    englishLabel: 'Dhi Qar'
  },
  {
    code: 'muthanna',
    name: {
      ar: 'Ø§Ù„Ù…Ø«Ù†Ù‰ ðŸœï¸',
      ku: 'Ù…ÙˆØ³Û•Ù†Ø§ ðŸœï¸',
      en: 'Muthanna ðŸœï¸'
    },
    englishLabel: 'Muthanna'
  },
  {
    code: 'qadisiyyah',
    name: {
      ar: 'Ø§Ù„Ù‚Ø§Ø¯Ø³ÙŠØ© ðŸŒ¾',
      ku: 'Ù‚Ø§Ø¯Ø³ÛŒÛ• ðŸŒ¾',
      en: 'Qadisiyyah ðŸŒ¾'
    },
    englishLabel: 'Qadisiyyah'
  },
  {
    code: 'nineveh',
    name: {
      ar: 'Ù†ÙŠÙ†ÙˆÙ‰ ðŸ',
      ku: 'Ù†Û•ÛŒÙ†Û•ÙˆØ§ ðŸ',
      en: 'Nineveh ðŸ'
    },
    englishLabel: 'Nineveh'
  },
  {
    code: 'halabja',
    name: {
      ar: 'Ø­Ù„Ø¨Ø¬Ø© ðŸŽ',
      ku: 'Ù‡Û•ÚµÛ•Ø¨Ø¬Û• ðŸŽ',
      en: 'Halabja ðŸŽ'
    },
    englishLabel: 'Halabja'
  }
];

export const CATEGORIES: Category[] = [
  {
    id: 'restaurants_cafes',
    icon: 'â˜•',
    name: {
      ar: 'Ù…Ø·Ø§Ø¹Ù… ÙˆÙƒØ§ÙÙŠÙ‡Ø§Øª',
      ku: 'Ú†ÛŽØ´ØªØ®Ø§Ù†Û• Ùˆ Ú©Ø§ÙÛŽ',
      en: 'Restaurants & Cafes'
    },
    color: 'from-emerald-600 to-teal-500'
  },
  {
    id: 'hotels_hospitality',
    icon: 'ðŸ¨',
    name: {
      ar: 'ÙÙ†Ø§Ø¯Ù‚ ÙˆØ¶ÙŠØ§ÙØ©',
      ku: 'Ù‡Û†ØªÛŽÙ„ Ùˆ Ù…ÛŒÙˆØ§Ù†Ø¯Ø§Ø±ÛŒ',
      en: 'Hotels & Hospitality'
    },
    color: 'from-amber-600 to-yellow-500'
  },
  {
    id: 'health_medical_services',
    icon: 'ï¿½',
    name: {
      ar: 'ØµØ­Ø© ÙˆØ®Ø¯Ù…Ø§Øª Ø·Ø¨ÙŠØ©',
      ku: 'ØªÛ•Ù†Ø¯Ø±ÙˆØ³ØªÛŒ Ùˆ Ø®Ø²Ù…Û•ØªÚ¯ÙˆØ²Ø§Ø±ÛŒ Ù¾Ø²ÛŒØ´Ú©ÛŒ',
      en: 'Health & Medical Services'
    },
    color: 'from-rose-600 to-pink-500'
  },
  {
    id: 'fitness_gyms',
    icon: 'ðŸ‹ï¸',
    name: {
      ar: 'Ù„ÙŠØ§Ù‚Ø© ÙˆØµØ§Ù„Ø§Øª Ø±ÙŠØ§Ø¶ÙŠØ©',
      ku: 'ÙˆØ±Ø²Ø´ Ùˆ Ø³Ø§Ù„Û†Ù†ÛŒ ÙˆÛ•Ø±Ø²Ø´ÛŒ',
      en: 'Fitness & Gyms'
    },
    color: 'from-orange-600 to-red-500'
  },
  {
    id: 'education_training_centers',
    icon: 'ðŸŽ“',
    name: {
      ar: 'ØªØ¹Ù„ÙŠÙ… ÙˆÙ…Ø±Ø§ÙƒØ² ØªØ¯Ø±ÙŠØ¨',
      ku: 'Ø®ÙˆÛŽÙ†Ø¯Ù† Ùˆ Ù‚ÙˆØªØ§Ø¨Ø®Ø§Ù†Û•',
      en: 'Education & Training Centers'
    },
    color: 'from-indigo-600 to-purple-500'
  },
  {
    id: 'real_estate',
    icon: 'ðŸ¢',
    name: {
      ar: 'Ø¹Ù‚Ø§Ø±Ø§Øª',
      ku: 'Ø¹Û•Ù‚Ø§Ø±Ø§Øª',
      en: 'Real Estate'
    },
    color: 'from-blue-600 to-sky-500'
  },
  {
    id: 'construction_contractors',
    icon: 'ðŸ—ï¸',
    name: {
      ar: 'Ù…Ù‚Ø§ÙˆÙ„Ø§Øª ÙˆØ¨Ù†Ø§Ø¡',
      ku: 'Ø¨ÛŒÙ†Ø§Ø³Ø§Ø²ÛŒ Ùˆ Ù¾Û•ÛŒÙ…Ø§Ù†Ú©Ø§Ø±',
      en: 'Construction & Contractors'
    },
    color: 'from-yellow-600 to-amber-700'
  },
  {
    id: 'beauty_salons',
    icon: 'ï¿½',
    name: {
      ar: 'ØµØ§Ù„ÙˆÙ†Ø§Øª ÙˆÙ…Ø±Ø§ÙƒØ² ØªØ¬Ù…ÙŠÙ„',
      ku: 'Ø³Ø§ÚµÛ†Ù†ÛŒ Ø¬ÙˆØ§Ù†Ú©Ø§Ø±ÛŒ',
      en: 'Beauty & Salons'
    },
    color: 'from-purple-600 to-pink-500'
  },
  {
    id: 'electronics_tech_shops',
    icon: 'ï¿½',
    name: {
      ar: 'Ø¥Ù„ÙƒØªØ±ÙˆÙ†ÙŠØ§Øª ÙˆØªÙ‚Ù†ÙŠØ©',
      ku: 'Ø¦Û•Ù„ÛŒÚ©ØªØ±Û†Ù†ÛŒØ§Øª Ùˆ ØªÛ•Ú©Ù†Û•Ù„Û†Ú˜ÛŒØ§',
      en: 'Electronics & Tech Shops'
    },
    color: 'from-violet-600 to-indigo-500'
  },
  {
    id: 'it_software_services',
    icon: 'ðŸ’»',
    name: {
      ar: 'IT ÙˆØ®Ø¯Ù…Ø§Øª Ø¨Ø±Ù…Ø¬ÙŠØ©',
      ku: 'IT Ùˆ Ø®Ø²Ù…Û•ØªÚ¯ÙˆØ²Ø§Ø±ÛŒ Ù†Û•Ø±Ù…Û•ÙˆØ§ÚµÛ•',
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
      ar: 'Ø§ÙƒØªØ´Ù Ø§Ù„Ø¹Ø±Ø§Ù‚ Ø¨Ø·Ø±ÙŠÙ‚Ø© Ù…Ø®ØªÙ„ÙØ© âš¡',
      ku: 'Ø¹ÛŽØ±Ø§Ù‚ Ø¨Û• Ø´ÛŽÙˆØ§Ø²ÛŽÚ©ÛŒ Ø¬ÛŒØ§ÙˆØ§Ø² Ø¨Ø¯Û†Ø²Û•Ø±Û•ÙˆÛ• âš¡',
      en: 'Discover Iraq Differently âš¡'
    },
    governorate: 'baghdad',
    category: 'cafe_bakery',
    badge: {
      ar: 'ØªØ±ÙŠÙ†Ø¯ Ø§Ù„Ø£Ø³Ø¨ÙˆØ¹ ðŸ”¥',
      ku: 'ØªØ±ÛŽÙ†Ø¯ÛŒ Ù‡Û•ÙØªÛ• ðŸ”¥',
      en: 'Weekly Trend ðŸ”¥'
    }
  },
  {
    id: 'slide-2',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1600&auto=format&fit=crop&q=80',
    slogan: {
      ar: 'Ø£Ù…Ø§ÙƒÙ† Ø¨ØºØ¯Ø§Ø¯ Ø§Ù„Ø£ÙƒØ«Ø± ØªÙØ§Ø¹Ù„Ø§Ù‹ ðŸ°',
      ku: 'Ú†Ø§Ù„Ø§Ú©ØªØ±ÛŒÙ† Ø´ÙˆÛŽÙ†Û•Ú©Ø§Ù†ÛŒ Ø¨Û•ØºØ¯Ø§Ø¯ ðŸ°',
      en: "Baghdadâ€™s Trending Places ðŸ°"
    },
    governorate: 'baghdad',
    category: 'hotel',
    badge: {
      ar: 'ØªÙ‚ÙŠÙŠÙ… Ø¹Ø§Ù„ÙŠ â­',
      ku: 'Ù†Ù…Ø±Û•ÛŒ Ø¨Û•Ø±Ø² â­',
      en: 'Top Rated â­'
    }
  },
  {
    id: 'slide-4',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=1600&auto=format&fit=crop&q=80',
    slogan: {
      ar: 'Ù…Ø¯ÙŠÙ†ØªÙƒ ØªÙ†Ø¨Ø¶ Ø¨Ø§Ù„Ø­ÙŠØ§Ø© ðŸŒŸ',
      ku: 'Ø´Ø§Ø±Û•Ú©Û•Øª Ø²ÛŒÙ†Ø¯ÙˆÙˆÛ• Ùˆ Ø¯Û•Ø¯Ø±Û•ÙˆØ´ÛŽØªÛ•ÙˆÛ• ðŸŒŸ',
      en: 'Your City is Alive ðŸŒŸ'
    },
    governorate: 'erbil',
    category: 'restaurant',
    badge: {
      ar: 'Ù…Ø·Ø§Ø¹Ù… Ø¹ØµØ±ÙŠØ© ðŸ”',
      ku: 'Ú†ÛŽØ´ØªØ®Ø§Ù†Û•ÛŒ Ø³Û•Ø±Ø¯Û•Ù…ÛŒØ§Ù†Û• ðŸ”',
      en: 'Trendy Dining ðŸ”'
    }
  },
  {
    id: 'slide-3',
    image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1600&auto=format&fit=crop&q=80',
    slogan: {
      ar: 'ØªØ³ÙˆÙ‘Ù‚ Ù…Ù† Ø£ÙØ¶Ù„ Ø§Ù„Ø¨ÙˆØªÙŠÙƒØ§Øª Ø§Ù„Ù…Ø­Ù„ÙŠØ© ðŸ›ï¸',
      ku: 'Ù„Û• Ø¨Ø§Ø´ØªØ±ÛŒÙ† Ù¾Û†Ø´Ø§Ú©Û• Ù†Ø§ÙˆØ®Û†ÛŒÛŒÛ•Ú©Ø§Ù† Ø¨Ú©Ú•Û• ðŸ›ï¸',
      en: 'Shop Best Local Boutiques ðŸ›'
    },
    governorate: 'erbil',
    category: 'mall',
    badge: {
      ar: 'Ø®ØµÙˆÙ…Ø§Øª Ù…Ù…ÙŠØ²Ø© ðŸ·ï¸',
      ku: 'Ø¯Ø§Ø´Ú©Ø§Ù†Ø¯Ù†ÛŒ ØªØ§ÛŒØ¨Û•Øª ðŸ·ï¸',
      en: 'Special Offers ðŸ·ï¸'
    }
  }
];

const RAW_INITIAL_BUSINESSES: Business[] = [
  // COFFEE SECTION
  {
    id: 'b-1',
    name: {
      ar: 'ÙƒØ§ÙÙŠÙ‡ Ù„ÙˆÙØ§ - Ø§Ù„ÙƒØ±Ø§Ø¯Ø©',
      ku: 'Ú©Ø§ÙÛŽ Ù„Û†Ú¤Ø§ - Ú©Û•Ú•Ø§Ø¯Û•',
      en: 'Lova CafÃ© - Karrada'
    },
    description: {
      ar: 'Ù…Ù† Ø£ÙØ¶Ù„ Ø§Ù„ÙƒØ§ÙÙŠÙ‡Ø§Øª Ø§Ù„Ø´Ø¨Ø§Ø¨ÙŠØ© ÙÙŠ Ø§Ù„ÙƒØ±Ø§Ø¯Ø©ØŒ ÙŠØªÙ…ÙŠØ² Ø¨Ø¯ÙŠÙƒÙˆØ± Ø³ÙŠÙ†Ù…Ø§Ø¦ÙŠ Ø±Ø§Ø¦Ø¹ ÙˆØ¬Ù„Ø³Ø§Øª Ù‡Ø§Ø¯Ø¦Ø© Ù„Ù„Ù…Ø°Ø§ÙƒØ±Ø© ÙˆØ§Ù„Ø¹Ù…Ù„ ÙˆÙ…Ø¹ Ø§Ù„Ø£ØµØ¯Ù‚Ø§Ø¡.',
      ku: 'ÛŒÛ•Ú©ÛŽÚ© Ù„Û• Ø¨Ø§Ø´ØªØ±ÛŒÙ† Ú©Ø§ÙÛŽÛŒ Ú¯Û•Ù†Ø¬Ø§Ù†Û• Ù„Û• Ú©Û•Ú•Ø§Ø¯Û•ØŒ ØªØ§ÛŒØ¨Û•ØªÙ…Û•Ù†Ø¯Û• Ø¨Û• Ø¯ÛŒÚ©Û†Ø±ÛŽÚ©ÛŒ Ù†Ø§ÛŒØ§Ø¨ Ùˆ Ø´ÙˆÛŽÙ†ÛŒ Ù‡ÛŽÙ…Ù† Ø¨Û† Ø®ÙˆÛŽÙ†Ø¯Ù† ÛŒØ§Ù† Ú†Ø§ÙˆÙ¾ÛŽÚ©Û•ÙˆØªÙ†.',
      en: 'One of the best youth-oriented cafÃ©s in Karrada, featuring premium cinematic decor, quiet study corners, and vibrant vibes.'
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
      ar: 'Ø¨ØºØ¯Ø§Ø¯ØŒ Ø§Ù„ÙƒØ±Ø§Ø¯Ø© Ø¯Ø§Ø®Ù„ØŒ Ù‚Ø±Ø¨ Ø³Ø§Ø­Ø© Ø§Ù„ØªØ­Ø±ÙŠØ§Øª',
      ku: 'Ø¨Û•ØºØ¯Ø§Ø¯ØŒ Ú©Û•Ú•Ø§Ø¯Û•ÛŒ Ù†Ø§ÙˆÛ•ÙˆÛ•ØŒ Ù†Ø²ÛŒÚ© Ù…Û•ÛŒØ¯Ø§Ù†ÛŒ ØªÛ•Ø­Û•Ø±ÛŒØ§Øª',
      en: 'Baghdad, Karrada Inside, Near Tahariyat Square'
    },
    likes: 542,
    saves: 219,
    featuredDeal: {
      ar: 'Ø®ØµÙ… Ù¢Ù Ùª Ù„Ø­Ø§Ù…Ù„ÙŠ Ø¨Ø·Ø§Ù‚Ø§Øª Ø§Ù„Ø·Ù„Ø§Ø¨ Ø·ÙˆØ§Ù„ Ø£ÙŠØ§Ù… Ø§Ù„Ø£Ø³Ø¨ÙˆØ¹ ðŸŽ“',
      ku: 'Ù¢Ù Ùª Ø¯Ø§Ø´Ú©Ø§Ù†Ø¯Ù† Ø¨Û† Ù‚ÙˆØªØ§Ø¨ÛŒØ§Ù† Ù„Û• Ù‡Û•Ù…ÙˆÙˆ Ú•Û†Ú˜Û•Ú©Ø§Ù†ÛŒ Ù‡Û•ÙØªÛ•Ø¯Ø§ ðŸŽ“',
      en: '20% discount for student card holders on weekdays ðŸŽ“'
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
      ar: 'Ù‚Ù‡ÙˆØ© Ø§Ù„Ù…Ø§Ø´ - Ø§Ù„Ù…Ù†ØµÙˆØ±',
      ku: 'Ú©Ø§ÙÛŽÛŒ Ø¦Û•Ù„Ù…Ø§Ø´ - Ù…Û•Ù†Ø³ÙˆÙˆØ±',
      en: 'Al-Mash Specialty Coffee - Mansour'
    },
    description: {
      ar: 'Ù‚Ù‡ÙˆØ© Ù…Ø®ØªØµØ© Ù…Ø­Ø¶Ø±Ø© Ø¨Ø£Ø±Ù‚Ù‰ Ø£Ù†ÙˆØ§Ø¹ Ø§Ù„Ø¨Ù† Ø§Ù„Ø¹Ø§Ù„Ù…ÙŠ Ø¨Ø£ÙŠØ¯ÙŠ Ø¨Ø§Ø±ÙŠØ³ØªØ§ Ø¹Ø±Ø§Ù‚ÙŠÙŠÙ† Ù…Ø­ØªØ±ÙÙŠÙ†. Ø£Ø¬ÙˆØ§Ø¡ Ù‡Ø§Ø¯Ø¦Ø© ÙˆØ±Ø§Ù‚ÙŠØ©.',
      ku: 'Ù‚Ø§ÙˆÛ•ÛŒÛ•Ú©ÛŒ ØªØ§ÛŒØ¨Û•Øª Ú©Û• Ù„Û• Ø¨Ø§Ø´ØªØ±ÛŒÙ† Ø¬Û†Ø±Û•Ú©Ø§Ù†ÛŒ Ø¯Û•Ù†Ú©Û• Ù‚Ø§ÙˆÛ•ÛŒ Ø¬ÛŒÙ‡Ø§Ù†ÛŒ Ø¦Ø§Ù…Ø§Ø¯Û•Ú©Ø±Ø§ÙˆÛ• Ù„Û•Ù„Ø§ÛŒÛ•Ù† Ø¨Ø§Ø±ÛŒØ³ØªØ§ÛŒ Ø¹ÛŽØ±Ø§Ù‚ÛŒ Ú©Ø§Ø±Ø§Ù…Û•.',
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
      ar: 'Ø¨ØºØ¯Ø§Ø¯ØŒ Ø§Ù„Ù…Ù†ØµÙˆØ±ØŒ Ø´Ø§Ø±Ø¹ Ù¡Ù¤ Ø±Ù…Ø¶Ø§Ù†ØŒ Ø®Ù„Ù Ù…ÙˆÙ„ Ø§Ù„Ù…Ù†ØµÙˆØ±',
      ku: 'Ø¨Û•ØºØ¯Ø§Ø¯ØŒ Ù…Û•Ù†Ø³ÙˆÙˆØ±ØŒ Ø´Û•Ù‚Ø§Ù…ÛŒ Ù¡Ù¤ Ú•Û•Ù…Û•Ø²Ø§Ù†ØŒ Ù¾Ø´Øª Ù…Û†ÚµÛŒ Ù…Û•Ù†Ø³ÙˆÙˆØ±',
      en: 'Baghdad, Mansour, 14 Ramadan St, Behind Mansour Mall'
    },
    likes: 388,
    saves: 145,
    featuredDeal: {
      ar: 'Ø¹Ø±Ø¶ Ø¨Ø§Ø±ÙŠØ³ØªØ§: ÙÙ†Ø¬Ø§Ù† Ù‚Ù‡ÙˆØ© Ù…Ø¬Ø§Ù†ÙŠ Ù„ÙƒÙ„ Ù£ Ù…Ø´Ø§Ø±ÙƒØ§Øª Ù„Ù„Ù‚ØµØ© â˜•',
      ku: 'Ø¯ÛŒØ§Ø±ÛŒ Ø¨Ø§Ø±ÛŒØ³ØªØ§: Ù‚Ø§ÙˆÛ•ÛŒÛ•Ú©ÛŒ Ø¨ÛŽØ¨Û•Ø±Ø§Ù…Ø¨Û•Ø± Ø¨Û•Ø±Ø§Ù…Ø¨Û•Ø± Ø¨ÚµØ§ÙˆÚ©Ø±Ø¯Ù†Û•ÙˆÛ•ÛŒ Ù£ Ø³ØªÛ†Ø±ÛŒ â˜•',
      en: 'Barista Special: A free cup of coffee with every 3 story shares! â˜•'
    },
    mapCoords: { x: 38, y: 48 },
    stories: []
  },
  {
    id: 'b-3',
    name: {
      ar: 'Ù…Ø§Ø¯Ùˆ ÙƒØ§ÙÙŠÙ‡ - Ø§Ù…Ø¨Ø±Ø§Ø·ÙˆØ±ÙŠØ© Ø§Ù„Ø¨Ù† Ø£Ø±Ø¨ÙŠÙ„',
      ku: 'Ù…Ø§Ø¯Û† Ú©Ø§ÙÛŽ - Ù‚Û•ÚµØ§ÛŒ Ù‡Û•ÙˆÙ„ÛŽØ±',
      en: 'Mado CafÃ© - Erbil Citadel Road'
    },
    description: {
      ar: 'Ø§Ù„ÙØ±Ø¹ Ø§Ù„Ø´Ù‡ÙŠØ± Ù„Ù„Ù‚Ù‡ÙˆØ© ÙˆØ§Ù„Ø­Ù„ÙˆÙ‰ Ø§Ù„ØªØ±ÙƒÙŠØ© Ø§Ù„ÙØ§Ø®Ø±Ø© Ø¨Ø£Ø·Ù„Ø§Ù„Ø© ÙØ±ÙŠØ¯Ø© ÙˆÙ…Ù‚Ø§Ø¹Ø¯ Ø®Ø§Ø±Ø¬ÙŠØ© ÙˆØ¯Ø§Ø®Ù„ÙŠØ© Ù…Ø±ÙŠØ­Ø© Ø¬Ø¯Ø§Ù‹.',
      ku: 'Ù„Ù‚ÛŒ Ø¨Û•Ù†Ø§ÙˆØ¨Ø§Ù†Ú¯ÛŒ Ù‚Ø§ÙˆÛ• Ùˆ Ø´ÛŒØ±ÛŒÙ†ÛŒ ØªÙˆØ±Ú©ÛŒ Ø¨Û• Ø¯ÛŒÙ…Û•Ù†ÛŽÚ©ÛŒ Ø³Û•Ø±Ù†Ø¬Ú•Ø§Ú©ÛŽØ´ Ùˆ Ø¯Ø§Ù†ÛŒØ´ØªÙ†ÛŒ Ø¯Û•Ø±Û•Ú©ÛŒ Ø²Û†Ø± Ø¦Ø§Ø³ÙˆÙˆØ¯Û•.',
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
      ar: 'Ø£Ø±Ø¨ÙŠÙ„ØŒ Ø´Ø§Ø±Ø¹ Ù‚Ø¶Ø§Ø¡ Ø§Ù„Ù‚Ù„Ø¹Ø©ØŒ Ù…Ù‚Ø§Ø¨Ù„ Ø­Ø¯ÙŠÙ‚Ø© Ø³Ø§Ù…ÙŠ Ø¹Ø¨Ø¯ Ø§Ù„Ø±Ø­Ù…Ù†',
      ku: 'Ù‡Û•ÙˆÙ„ÛŽØ±ØŒ Ø´Û•Ù‚Ø§Ù…ÛŒ Ù‚Û•Ø²Ø§ÛŒ Ù‚Û•ÚµØ§ØŒ Ø¨Û•Ø±Ø§Ù…Ø¨Û•Ø± Ù¾Ø§Ø±Ú©ÛŒ Ø³Ø§Ù…ÛŒ Ø¹Û•Ø¨Ø¯ÙˆÙ„Ú•Û•Ø­Ù…Ø§Ù†',
      en: 'Erbil, Citadel District Road, Opposite Sami Abdulrahman Park'
    },
    likes: 812,
    saves: 430,
    featuredDeal: {
      ar: 'Ø­Ù„ÙˆÙ‰ Ø¨Ù‚Ù„Ø§ÙˆØ© Ù…Ø¬Ø§Ù†ÙŠØ© Ù…Ø¹ ÙƒÙ„ ÙƒÙˆØ¨ Ù‚Ù‡ÙˆØ© Ø¯Ø¨Ù„ Ø§Ø³Ø¨Ø±ÙŠØ³Ùˆ ðŸ°',
      ku: 'Ø´ÛŒØ±ÛŒÙ†ÛŒ Ø¨Ø§Ù‚Ù„Ø§ÙˆØ§ÛŒ Ø¨ÛŽØ¨Û•Ø±Ø§Ù…Ø¨Û•Ø± Ù„Û•Ú¯Û•Úµ Ù‡Û•Ø± Ú©ÙˆÙ¾ÛŽÚ© Ù‚Ø§ÙˆÛ•ÛŒ Ø¯Û†Ø¨Úµ Ø¦ÛŒØ³Ù¾Ø±ÛŽØ³Û† ðŸ°',
      en: 'Free baklava pastry with every purchase of a Double Espresso ðŸ°'
    },
    mapCoords: { x: 55, y: 22 }
  },

  // DINING SECTION
  {
    id: 'b-4',
    name: {
      ar: 'Ù…Ø·Ø¹Ù… ÙˆÙ…Ø±Ø³Ù‰ Ù…Ø³ÙƒÙˆÙ Ø¯Ø¬Ù„Ø©',
      ku: 'Ú†ÛŽØ´ØªØ®Ø§Ù†Û• Ùˆ Ù‡ÛŽÙ„Ø§Ù†Û•ÛŒ Ù…Ø§Ø³ÛŒ Ø¯Ø¬Ù„Û•',
      en: 'Meskouf Tigris Riverfront'
    },
    description: {
      ar: 'Ø£Ø´Ù‡Ø± Ù…Ø·Ø¹Ù… Ù„Ù„Ù…Ø³ÙƒÙˆÙ Ø§Ù„Ø¨ØºØ¯Ø§Ø¯ÙŠ Ø§Ù„Ø£ØµÙŠÙ„ Ø¹Ù„Ù‰ Ø¶ÙØ§Ù Ù†Ù‡Ø± Ø¯Ø¬Ù„Ø© Ù…Ø¨Ø§Ø´Ø±Ø©. Ø§Ù„Ø£Ø³Ù…Ø§Ùƒ Ø·Ø§Ø²Ø¬Ø© ÙˆØ§Ù„Ù…Ø°Ø§Ù‚ Ø¹Ù„Ù‰ Ø§Ù„Ø­Ø·Ø¨.',
      ku: 'Ø¨Û•Ù†Ø§ÙˆØ¨Ø§Ù†Ú¯ØªØ±ÛŒÙ† Ú†ÛŽØ´ØªØ®Ø§Ù†Û•ÛŒ Ù…Ø§Ø³ÛŒ Ù…Û•Ø³Ú¯ÙˆÙÛŒ Ø¨Û•ØºØ¯Ø§Ø¯ÛŒ Ù„Û•Ø³Û•Ø± Ú©Û•Ù†Ø§Ø±ÛŒ Ú•ÙˆÙˆØ¨Ø§Ø±ÛŒ Ø¯Ø¬Ù„Û• Ø¨Û• ØªØ§Ù…ÛŒ Ø¯Ø§Ø±Û•ÙˆÛ•.',
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
      ar: 'Ø¨ØºØ¯Ø§Ø¯ØŒ Ø´Ø§Ø±Ø¹ Ø£Ø¨Ùˆ Ù†Ø¤Ø§Ø³ØŒ Ù‚Ø±Ø¨ ØªÙ…Ø«Ø§Ù„ Ø´Ù‡Ø±ÙŠØ§Ø± ÙˆØ´Ù‡Ø±Ø²Ø§Ø¯',
      ku: 'Ø¨Û•ØºØ¯Ø§Ø¯ØŒ Ø´Û•Ù‚Ø§Ù…ÛŒ Ø¦Û•Ø¨Ùˆ Ù†ÙˆØ¦Ø§Ø³ØŒ Ù†Ø²ÛŒÚ© Ù¾Û•ÛŒÚ©Û•Ø±ÛŒ Ø´Û•Ù‡Ø±ÛŒØ§Ø± Ùˆ Ø´Û•Ù‡Ø±Û•Ø²Ø§Ø¯',
      en: 'Baghdad, Abu Nuwas Street, Near Sheherazade & Shahriyar Statue'
    },
    likes: 920,
    saves: 560,
    featuredDeal: {
      ar: 'Ø®ØµÙ… Ø¹Ø§Ø¦Ù„ÙŠ Ù¡Ù¥Ùª Ø¹Ù„Ù‰ Ø§Ù„Ø·Ù„Ø¨Ø§Øª Ø§Ù„ØªÙŠ ØªØªØ¬Ø§ÙˆØ² Ù£ ÙƒÙŠÙ„ÙˆØºØ±Ø§Ù…Ø§Øª Ù…Ø³Ù…ÙƒÙˆÙ ðŸŸ',
      ku: 'Ø¯Ø§Ø´Ú©Ø§Ù†Ø¯Ù†ÛŒ Ø®ÛŽØ²Ø§Ù†ÛŒ Ù¡Ù¥Ùª Ø¨Û† Ú©Ú•ÛŒÙ†ÛŒ Ù…Ø§Ø³ÛŒ Ø³Û•Ø±ÙˆÙˆÛŒ Ù£ Ú©ÛŒÙ„Û†Ú¯Ø±Ø§Ù… ðŸŸ',
      en: 'Family Special: 15% off on fish orders exceeding 3 Kg ðŸŸ'
    },
    mapCoords: { x: 44, y: 52 }
  },
  {
    id: 'b-5',
    name: {
      ar: 'Ø¨Ø±ØºØ± ÙƒØ±Ø§ÙØª - Ø¨Ø®ØªÙŠØ§Ø±ÙŠ Ø£Ø±Ø¨ÙŠÙ„',
      ku: 'Ø¨Û•Ø±Ú¯Ø± Ú©Ø±Ø§ÙØª - Ø¨Û•Ø®ØªÛŒØ§Ø±ÛŒ',
      en: 'Craft Burger - Bakhtiyari Erbil'
    },
    description: {
      ar: 'Ø¨Ø±ØºØ± Ù„Ø­Ù… Ø¹Ø±Ø§Ù‚ÙŠ Ù…Ø­Ù„ÙŠ Ø·Ø§Ø²Ø¬ Ø¨Ø®Ù„Ø·Ø§Øª Ø³Ø±ÙŠØ© Ø±Ø§Ø¦Ø¹Ø© ÙˆØµÙˆØµØ§Øª Ù…Ù…ÙŠØ²Ø©ØŒ Ø§Ù„Ù…ÙƒØ§Ù† Ø§Ù„Ù…ÙØ¶Ù„ Ù„Ù„Ø´Ø¨Ø§Ø¨ ÙÙŠ Ø£Ø±Ø¨ÙŠÙ„.',
      ku: 'Ø¨Û•Ø±Ú¯Ø±ÛŒ Ú¯Û†Ø´ØªÛŒ ÙØ±ÛŽØ´ÛŒ Ú©ÙˆØ±Ø¯ÛŒ Ø¨Û• Ø´ÛŽÙˆØ§Ø² Ùˆ Ø³Û†Ø³ÛŒ ØªØ§ÛŒØ¨Û•ØªØŒ Ø´ÙˆÛŽÙ†ÛŒ Ø¯ÚµØ®ÙˆØ§Ø²ÛŒ Ú¯Û•Ù†Ø¬Ø§Ù† Ù„Û• Ù‡Û•ÙˆÙ„ÛŽØ±.',
      en: 'Premium hand-pressed local beef burgers with signature fusion sauces, loved by Erbilâ€™s young crowds.'
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
      ar: 'Ø£Ø±Ø¨ÙŠÙ„ØŒ Ø­ÙŠ Ø¨Ø®ØªÙŠØ§Ø±ÙŠØŒ Ø´Ø§Ø±Ø¹ Ø§Ù„Ù…Ø·Ø§Ø¹Ù… Ø§Ù„Ø±Ø¦ÙŠØ³ÙŠ',
      ku: 'Ù‡Û•ÙˆÙ„ÛŽØ±ØŒ Ú¯Û•Ú•Û•Ú©ÛŒ Ø¨Û•Ø®ØªÛŒØ§Ø±ÛŒØŒ Ø´Û•Ù‚Ø§Ù…ÛŒ Ø³Û•Ø±Û•Ú©ÛŒ Ú†ÛŽØ´ØªØ®Ø§Ù†Û•Ú©Ø§Ù†',
      en: 'Erbil, Bakhtiyari District, Main Restaurant Boulevard'
    },
    likes: 470,
    saves: 215,
    featuredDeal: {
      ar: 'Ø§Ø´ØªØ±Ù ÙˆØ¬Ø¨Ø© Ø¨Ø±ØºØ± ÙˆØ§Ø­ØµÙ„ Ø¹Ù„Ù‰ Ø¨Ø·Ø§Ø·Ø§ ÙƒØ±Ø§ÙØª ÙˆØµÙˆØ¯Ø§ Ù…Ø¬Ø§Ù†Ø§Ù‹ Ø¨Ø§Ù„ÙƒØ§Ù…Ù„ ðŸŸ',
      ku: 'Ú˜Û•Ù…Û• Ø¨Û•Ø±Ú¯Ø±ÛŽÚ© Ø¨Ú©Ú•Û• Ùˆ Ù¾Û•ØªØ§ØªÛ•ÛŒ Ú¯Û•Ø±Ù… Ùˆ Ø³Û†Ø¯Ø§ Ø¨ÛŽØ¨Û•Ø±Ø§Ù…Ø¨Û•Ø± ÙˆÛ•Ø±Ø¨Ú¯Ø±Û• ðŸŸ',
      en: 'Combo Upgrade: Buy any single burger and get free Craft Fries & Soda! ðŸŸ'
    },
    mapCoords: { x: 57, y: 24 }
  },

  // SHOPPING SECTION
  {
    id: 'b-6',
    name: {
      ar: 'Ø¨Ø§Ø¨Ù„ Ø¯ÙŠØ²Ø§ÙŠÙ† Ø¨ÙˆØ« - Ø¨ØºØ¯Ø§Ø¯ Ù…ÙˆÙ„',
      ku: 'Ø¯ÛŒØ²Ø§ÛŒÙ† Ù…Û†ÚµÛŒ Ø¨Ø§Ø¨Ù„ - Ø¨Û•ØºØ¯Ø§Ø¯ Ù…Û†Úµ',
      en: 'Babylon Design Booth - Baghdad Mall'
    },
    description: {
      ar: 'Ø¨ÙˆØªÙŠÙƒ Ø±Ø§Ù‚ÙŠ Ù„Ø¹Ø±Ø¶ ØªØµØ§Ù…ÙŠÙ… Ø§Ù„Ù…ÙˆØ¶Ø© ÙˆØ§Ù„Ø£Ø²ÙŠØ§Ø¡ ÙˆØ§Ù„Ù…Ù„Ø§Ø¨Ø³ Ù„Ù„Ù…ØµÙ…Ù…ÙŠÙ† Ø§Ù„Ø¹Ø±Ø§Ù‚ÙŠÙŠÙ† Ø§Ù„Ø´Ø¨Ø§Ø¨ ÙˆØ§Ù„Ù…Ø§Ø±ÙƒØ§Øª Ø§Ù„Ø¹Ø§Ù„Ù…ÙŠØ© Ø§Ù„ÙØ®Ù…Ø©.',
      ku: 'Ø¯ÙˆÚ©Ø§Ù†ÛŒ Ø¨Ø±Ø§Ù†Ø¯ÛŒ Ø³Û•Ø±Ù†Ø¬Ú•Ø§Ú©ÛŽØ´ Ø¨Û† Ø¬Ù„ÙˆØ¨Û•Ø±Ú¯ÛŒ Ù†ÙˆÛŽØªØ±ÛŒÙ† Ø¯ÛŒØ²Ø§ÛŒÙ†Û•Ø±Û• Ø¹ÛŽØ±Ø§Ù‚ÛŒÛŒÛ• Ú¯Û•Ù†Ø¬Û•Ú©Ø§Ù† Ùˆ Ù…Ø§Ø±Ú©Û• Ø¬ÛŒÙ‡Ø§Ù†ÛŒÛŒÛ•Ú©Ø§Ù†.',
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
      ar: 'Ø¨ØºØ¯Ø§Ø¯ØŒ Ø§Ù„Ø­Ø§Ø±Ø«ÙŠØ©ØŒ Ø¯Ø§Ø®Ù„ Ø¨ØºØ¯Ø§Ø¯ Ù…ÙˆÙ„ØŒ Ø§Ù„Ø·Ø§Ø¨Ù‚ Ø§Ù„Ø£Ø±Ø¶ÙŠ',
      ku: 'Ø¨Û•ØºØ¯Ø§Ø¯ØŒ Ø­Ø§Ø±Ø³ÛŒÛ•ØŒ Ù„Û•Ù†Ø§Ùˆ Ø¨Û•ØºØ¯Ø§Ø¯ Ù…Û†ÚµØŒ Ù‚Ø§ØªÛŒ Ø²Û•Ù…ÛŒÙ†ÛŒ',
      en: 'Baghdad, Harthiya, Inside Baghdad Mall, Ground Floor'
    },
    likes: 290,
    saves: 180,
    featuredDeal: {
      ar: 'Ø®ØµÙ… Ø®Ø§Øµ Ù¡Ù Ùª Ù„Ù„Ù…ØªØ§Ø¨Ø¹ÙŠÙ† Ø¹Ù„Ù‰ Ù…Ù†ØµØ© Ø´ÙƒÙˆ Ù…Ø§ÙƒÙˆ Ø¹Ù†Ø¯ Ø§Ù„Ø¯ÙØ¹ Ø¨Ø¨Ø·Ø§Ù‚Ø© ÙÙŠØ²Ø§ ðŸ’³',
      ku: 'Ø¯Ø§Ø´Ú©Ø§Ù†Ø¯Ù†ÛŒ Ù¡Ù Ùª Ø¨Û† Ù¾Û•ÛŒÚ•Û•ÙˆØ§Ù†ÛŒ Ø³Ø§ÙƒÛ† Ù…Ø§ÙƒÛ† Ù„Û•Ú©Ø§ØªÛŒ Ù¾Ø§Ø±Û•Ø¯Ø§Ù† Ø¨Û• ÙÛŒØ²Ø§Ú©Ø§Ø±Øª ðŸ’³',
      en: '10% exclusive discount for Saku Maku users paying with credit card ðŸ’³'
    },
    mapCoords: { x: 39, y: 51 }
  },

  // HOTELS SECTION
  {
    id: 'b-7',
    name: {
      ar: 'ÙÙ†Ø¯Ù‚ ÙˆÙƒØ§Ø²ÙŠÙ†Ùˆ ØªØ§ÙŠØªØ§Ù†Ùƒ Ø§Ù„Ø³Ù„ÙŠÙ…Ø§Ù†ÙŠØ©',
      ku: 'Ù‡Û†ØªÛŽÙ„ Ùˆ Ø³Ù¾Ø§ÛŒ ØªØ§ÛŒØªØ§Ù†ÛŒÚ© Ø³Ù„ÛŽÙ…Ø§Ù†ÛŒ',
      en: 'Titanic Hotel & Spa Sulaymaniyah'
    },
    description: {
      ar: 'ÙÙ†Ø¯Ù‚ Ù¥ Ù†Ø¬ÙˆÙ… ÙØ®Ù… ÙˆÙ…Ø°Ù‡Ù„ØŒ ÙŠÙ‚Ø¯Ù… Ø®Ø¯Ù…Ø§Øª Ø¹Ù„Ø§Ø¬ÙŠØ© ÙˆØ³Ø¨Ø§ Ù…ØªÙƒØ§Ù…Ù„ØŒ Ù…Ø¹ Ù…Ø·Ø§Ø¹Ù… ÙØ§Ø®Ø±Ø© ÙˆØ¬Ù„Ø³Ø§Øª ØªØ·Ù„ Ø¹Ù„Ù‰ Ø¬Ø¨Ø§Ù„ Ø§Ù„Ø³Ù„ÙŠÙ…Ø§Ù†ÙŠØ©.',
      ku: 'Ù‡Û†ØªÛŽÙ„ÛŒ Ù¥ Ø¦Û•Ø³ØªÛŽØ±Û•ÛŒ Ø´Ø§Ù‡Ø§Ù†Û•ØŒ Ø®Ø²Ù…Û•ØªÚ¯ÙˆØ²Ø§Ø±ÛŒ Ø³Ù¾Ø§ÛŒ Ù†Ø§ÙˆØ§Ø²Û• Ùˆ Ú†ÛŽØ´ØªØ®Ø§Ù†Û•ÛŒ Ù†Ø§ÙˆØ¯Ø§Ø±ÛŒ Ù‡Û•ÛŒÛ• Ù„Û•Ú¯Û•Úµ Ø¯ÛŒÙ…Û•Ù†ÛŒ Ú©ÛŽÙˆÛ•Ú©Ø§Ù†ÛŒ Ø³Ù„ÛŽÙ…Ø§Ù†ÛŒ.',
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
      ar: 'Ø§Ù„Ø³Ù„ÙŠÙ…Ø§Ù†ÙŠØ©ØŒ Ø´Ø§Ø±Ø¹ Ø³Ø§Ù„Ù…ØŒ Ù‚Ø±Ø¨ ØªÙ„Ø§Ù„ Ø³Ø±Ø¬Ù†Ø§Ø± ÙˆØ±Ø´Ø§Ù‚Ø©',
      ku: 'Ø³Ù„ÛŽÙ…Ø§Ù†ÛŒØŒ Ø´Û•Ù‚Ø§Ù…ÛŒ Ø³Ø§Ù„Ù…ØŒ Ù†Ø²ÛŒÚ© Ù†Ø§ÙˆÚ†Û•ÛŒ Ú¯Û•Ø´ØªÛŒØ§Ø±ÛŒ Ø³Û•Ø±Ú†Ù†Ø§Ø±',
      en: 'Sulaymaniyah, Salim Street, Near Sarchinar Hills'
    },
    likes: 1200,
    saves: 780,
    featuredDeal: {
      ar: 'Ù„ÙŠÙ„Ø© Ù…Ø¬Ø§Ù†ÙŠØ© Ø¥Ø¶Ø§ÙÙŠØ© Ø¹Ù†Ø¯ Ø­Ø¬Ø² Ù£ Ù„ÙŠØ§Ù„Ù Ù…ØªØªØ§Ù„ÙŠØ© Ø¹Ø¨Ø± Ø§Ù„ØªØ·Ø¨ÙŠÙ‚ ðŸ¨',
      ku: 'Ø´Û•ÙˆÛŽÚ©ÛŒ Ø¨ÛŽØ¨Û•Ø±Ø§Ù…Ø¨Û•Ø± Ù„Û•Ú©Ø§ØªÛŒ Ø­Ø¬Ø²Ú©Ø±Ø¯Ù†ÛŒ Ù£ Ø´Û•Ùˆ Ø¨Û•Ø¯ÙˆØ§ÛŒÛ•Ú©Ø¯Ø§ ðŸ¨',
      en: 'Relax Package: Get 1 night free when booking a 3-night weekend escape ðŸ¨'
    },
    mapCoords: { x: 68, y: 31 }
  },

  // PHARMACIES
  {
    id: 'b-8',
    name: {
      ar: 'ØµÙŠØ¯Ù„ÙŠØ© Ø§Ø¨Ù† Ø­ÙŠØ§Ù† Ø§Ù„Ù…Ø±ÙƒØ²ÙŠØ© - Ø§Ù„Ø¨ØµØ±Ø©',
      ku: 'Ø¯Û•Ø±Ù…Ø§Ù†Ø®Ø§Ù†Û•ÛŒ Ù†Ø§ÙˆÛ•Ù†Ø¯ÛŒ Ø¦ÛŒØ¨Ù† Ø­Û•ÛŒØ§Ù†',
      en: 'Ibn Hayyan Central Pharmacy'
    },
    description: {
      ar: 'Ø§Ù„ØµÙŠØ¯Ù„ÙŠØ© Ø§Ù„Ø£ÙƒØ¨Ø± ÙˆØ§Ù„Ø£Ø­Ø¯Ø« ÙÙŠ Ø§Ù„Ø¨ØµØ±Ø©ØŒ ØªÙˆÙØ± ÙƒÙ„ Ø£Ù†ÙˆØ§Ø¹ Ø§Ù„Ø¹Ù„Ø§Ø¬Ø§Øª ÙˆØ§Ù„Ù…ÙƒÙ…Ù„Ø§Øª ÙˆØ£Ø¬Ù‡Ø²Ø© Ø§Ù„ÙØ­Øµ Ø¹Ù„Ù‰ Ù…Ø¯Ø§Ø± Ù¢Ù¤ Ø³Ø§Ø¹Ø©.',
      ku: 'Ú¯Û•ÙˆØ±Û•ØªØ±ÛŒÙ† Ùˆ Ù†ÙˆÛŽØªØ±ÛŒÙ† Ø¯Û•Ø±Ù…Ø§Ù†Ø®Ø§Ù†Û• Ù„Û• Ø¨Û•Ø³Ø±Û•ØŒ Ú†Ø§Ø±Û•Ø³Û•Ø± Ùˆ Ø¦Ø§Ù…ÛŽØ±Û•Ú©Ø§Ù†ÛŒ Ù¾Ø´Ú©Ù†ÛŒÙ† Ø¯Ø§Ø¨ÛŒÙ† Ø¯Û•Ú©Ø§Øª Ø¨Û• Ù¢Ù¤ Ú©Ø§ØªÚ˜Ù…ÛŽØ±.',
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
      ar: 'Ø§Ù„Ø¨ØµØ±Ø©ØŒ Ø­ÙŠ Ø§Ù„Ø¹Ø´Ø§Ø±ØŒ Ù‚Ø±Ø¨ Ù…Ø³ØªØ´ÙÙ‰ Ø§Ù„Ø¨ØµØ±Ø© Ø§Ù„Ø¹Ø§Ù…',
      ku: 'Ø¨Û•Ø³Ø±Û•ØŒ Ú¯Û•Ú•Û•Ú©ÛŒ Ø¹Û•Ø´Ø§Ø±ØŒ Ù†Ø²ÛŒÚ© Ù†Û•Ø®Û†Ø´Ø®Ø§Ù†Û•ÛŒ Ú¯Ø´ØªÛŒ Ø¨Û•Ø³Ø±Û•',
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
      ar: 'ØµØ§Ù„ÙˆÙ† Ù‡ÙŠØ± ØªØ§ÙˆÙ† Ø§Ù„Ø±Ø¬Ø§Ù„ÙŠ - Ø§Ù„Ø¬Ø§Ø¯Ø±ÙŠØ©',
      ku: 'Ø³Ø§ÚµÛ†Ù†ÛŒ Ù‡ÛŽØ± ØªØ§ÙˆÙ†ÛŒ Ù¾ÛŒØ§ÙˆØ§Ù† - Ø¬Ø§Ø¯Ø±ÛŒÛ•',
      en: 'Hair Town Barbers - Jadriya'
    },
    description: {
      ar: 'Ø¨Ø§Ù‚Ø© Ù…Ù† Ø£ÙØ¶Ù„ Ù…ØªØ®ØµØµÙŠ Ø§Ù„Ø­Ù„Ø§Ù‚Ø© ÙˆØ§Ù„Ø¹Ù†Ø§ÙŠØ© Ø¨Ø§Ù„Ø¨Ø´Ø±Ø© Ù„Ù„Ø±Ø¬Ø§Ù„ ÙÙŠ Ø§Ù„Ø¬Ø§Ø¯Ø±ÙŠØ©. Ø£Ø¬ÙˆØ§Ø¡ Ø¹ØµØ±ÙŠØ© ÙˆÙ…ÙˆØ³ÙŠÙ‚Ù‰ Ø±Ø§Ø¦Ø¹Ø©.',
      ku: 'Ø¨Ø§Ø´ØªØ±ÛŒÙ† Ø³Û•Ø±ØªØ§Ø´Ø®Ø§Ù†Û• Ùˆ Ù…Û•Ú©Û†ÛŒ Ú†Ø§ÙˆØ¯ÛŽØ±ÛŒ Ù¾ÛŽØ³Øª Ø¨Û† Ù¾ÛŒØ§ÙˆØ§Ù† Ù„Û• Ø¬Ø§Ø¯Ø±ÛŒÛ•ÛŒ Ø¨Û•ØºØ¯Ø§Ø¯ Ø¨Û• Ù…ÙˆØ²ÛŒÚ©ÛŒ Ø®Û†Ø´Û•ÙˆÛ•.',
      en: 'High-end menâ€™s grooming, luxury styling, and facial remedies in Jadriya with upbeat modern vibes.'
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
      ar: 'Ø¨ØºØ¯Ø§Ø¯ØŒ Ø§Ù„Ø¬Ø§Ø¯Ø±ÙŠØ©ØŒ Ù‚Ø±Ø¨ Ø¬Ø§Ù…Ø¹Ø© Ø¨ØºØ¯Ø§Ø¯ØŒ ØªÙ‚Ø§Ø·Ø¹ Ø§Ù„Ø­Ø±ÙŠØ©',
      ku: 'Ø¨Û•ØºØ¯Ø§Ø¯ØŒ Ø¬Ø§Ø¯Ø±ÛŒÛ•ØŒ Ù†Ø²ÛŒÚ© Ø²Ø§Ù†Ú©Û†ÛŒ Ø¨Û•ØºØ¯Ø§Ø¯ØŒ Ú†ÙˆØ§Ø±Ú•ÛŒØ§Ù†ÛŒ Ø­ÙˆÚ•ÛŒÛŒÛ•',
      en: 'Baghdad, Jadriya, Near Baghdad University, Liberty Intersection'
    },
    likes: 218,
    saves: 85,
    featuredDeal: {
      ar: 'Ø¬Ù„Ø³Ø© ØªÙ†Ø¸ÙŠÙ Ø¨Ø´Ø±Ø© Ù…Ø¬Ø§Ù†ÙŠØ© Ù…Ø¹ ÙƒÙ„ Ø­Ù„Ø§Ù‚Ø© Ø´Ø¹Ø± Ø³ØªØ§ÙŠÙ„ ðŸ’‡',
      ku: 'Ù¾Ø§Ú©Ú©Ø±Ø¯Ù†Û•ÙˆÛ•ÛŒ Ù¾ÛŽØ³Øª Ø¯ÛŒØ§Ø±ÛŒ Ø¨ÛŽØ¨Û•Ø±Ø§Ù…Ø¨Û•Ø± Ù„Û•Ú¯Û•Úµ Ù‡Û•Ø± ØªØ§Ø´ÛŒÙ†ÛŒ Ù‚Ú˜ÛŽÚ© ðŸ’‡',
      en: 'Grooming Pack: Free charcoal facial mask with any premium stylized haircut ðŸ’‡'
    },
    mapCoords: { x: 44, y: 56 }
  },

  // ENTERTAINMENT
  {
    id: 'b-10',
    name: {
      ar: 'Ù…Ø¯ÙŠÙ†Ø© Ø£Ù„Ø¹Ø§Ø¨ Ø§Ù„Ø³Ù†Ø¯Ø¨Ø§Ø¯ Ù„Ø§Ù†Ø¯ - Ø¨ØºØ¯Ø§Ø¯',
      ku: 'Ø´Ø§Ø±ÛŒ ÛŒØ§Ø±ÛŒÛŒÛ•Ú©Ø§Ù†ÛŒ Ø³ÛŽÙ†Ø¯Ø¨Ø§Ø¯ Ù„Ø§Ù†Ø¯ - Ø¨Û•ØºØ¯Ø§Ø¯',
      en: 'Sindbad Land Amusement Park'
    },
    description: {
      ar: 'Ø§Ù„ÙˆØ¬Ù‡Ø© Ø§Ù„ØªØ±ÙÙŠÙ‡ÙŠØ© Ø§Ù„Ø¹Ø§Ø¦Ù„ÙŠØ© Ø§Ù„Ø£ÙƒØ¨Ø± ÙÙŠ Ø§Ù„Ø¹Ø§ØµÙ…Ø© Ø¨ØºØ¯Ø§Ø¯ØŒ ØªØ¶Ù… Ø£Ù„Ø¹Ø§Ø¨Ø§Ù‹ Ù„Ø¬Ù…ÙŠØ¹ Ø§Ù„Ø£Ø¹Ù…Ø§Ø± ÙˆØ¨Ø­ÙŠØ±Ø§Øª Ø§ØµØ·Ù†Ø§Ø¹ÙŠØ© ÙˆÙ…Ø·Ø§Ø¹Ù… Ù…ØªÙ†ÙˆØ¹Ø©.',
      ku: 'Ú¯Û•ÙˆØ±Û•ØªØ±ÛŒÙ† ÛŒØ§Ø±ÛŒÚ¯Ø§ÛŒ Ø®ÛŽØ²Ø§Ù†ÛŒ Ù„Û• Ø¨Û•ØºØ¯Ø§Ø¯ØŒ Ú†Û•Ù†Ø¯ÛŒÙ† ÛŒØ§Ø±ÛŒ Ø³Û•Ø±Ù†Ø¬Ú•Ø§Ú©ÛŽØ´ Ùˆ Ø¨Û•Ø³ØªÛ•Ø± Ùˆ Ú†ÛŽØ´ØªØ®Ø§Ù†Û• Ù„Û•Ø®Û†Ø¯Û•Ú¯Ø±ÛŽØª.',
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
      ar: 'Ø¨ØºØ¯Ø§Ø¯ØŒ Ø´Ø§Ø±Ø¹ ÙÙ„Ø³Ø·ÙŠÙ†ØŒ Ù…Ø¬Ø§ÙˆØ± Ø¬Ø§Ù…Ø¹Ø© Ø§Ù„Ù…Ø³ØªÙ†ØµØ±ÙŠØ©',
      ku: 'Ø¨Û•ØºØ¯Ø§Ø¯ØŒ Ø´Û•Ù‚Ø§Ù…ÛŒ ÙÛ•Ù„Û•Ø³ØªÛŒÙ†ØŒ ØªÛ•Ù†ÛŒØ´Øª Ø²Ø§Ù†Ú©Û†ÛŒ Ù…ÙˆØ³ØªÛ•Ù†Ø³Û•Ø±ÛŒÛ•',
      en: 'Baghdad, Palestine Street, Next to Mustansiriya University'
    },
    likes: 1450,
    saves: 920,
    featuredDeal: {
      ar: 'Ø¨Ø§Ù‚Ø© Ø§Ù„Ø£Ù„Ø¹Ø§Ø¨ Ø§Ù„Ø¹Ø§Ø¦Ù„ÙŠØ© Ø§Ù„ÙƒØ§Ù…Ù„Ø© Ø¨Ø®ØµÙ… Ù£Ù Ùª ÙÙŠ Ø¹Ø·Ù„Ø© Ù†Ù‡Ø§ÙŠØ© Ø§Ù„Ø£Ø³Ø¨ÙˆØ¹ ðŸŽ¡',
      ku: 'Ø¯Ø§Ø´Ú©Ø§Ù†Ø¯Ù†ÛŒ Ù£Ù Ùª Ø¨Û† Ø¨Ú•ÙˆØ§Ù†Ø§Ù…Û•ÛŒ Ø®ÛŽØ²Ø§Ù†ÛŒ Ù„Û• Ú•Û†Ú˜Ø§Ù†ÛŒ Ù¾Ø´ÙˆÙˆØ¯Ø§ ðŸŽ¡',
      en: 'Weekend Joy: 30% discount on family all-access passes ðŸŽ¡'
    },
    mapCoords: { x: 47, y: 50 }
  },

  // CLINICS SECTION
  {
    id: 'b-11',
    name: {
      ar: 'Ø¹ÙŠØ§Ø¯Ø© Ø§Ù„Ù†Ø®Ø¨Ø© Ù„Ø·Ø¨ Ø§Ù„Ø£Ø³Ù†Ø§Ù† Ø§Ù„ØªØ¬Ù…ÙŠÙ„ÙŠ',
      ku: 'Ú©Ù„ÛŒÙ†ÛŒÚ©ÛŒ Ù†ÙˆØ®Ø¨Û• Ø¨Û† Ù¾Ø²ÛŒØ´Ú©ÛŒ Ø¯Ø¯Ø§Ù†ÛŒ Ø¬ÙˆØ§Ù†Ú©Ø§Ø±ÛŒ',
      en: 'Al-Nukhba Cosmetic Dental Clinic'
    },
    description: {
      ar: 'Ø¹ÙŠØ§Ø¯Ø© ØªØ®ØµØµÙŠØ© ØªÙ‚Ø¯Ù… Ø£Ø­Ø¯Ø« ØªÙ‚Ù†ÙŠØ§Øª ØªØ¬Ù…ÙŠÙ„ ÙˆØ²Ø±Ø§Ø¹Ø© Ø§Ù„Ø£Ø³Ù†Ø§Ù†ØŒ Ø§Ø¨ØªØ³Ø§Ù…Ø© Ù‡ÙˆÙ„ÙŠÙˆØ¯ØŒ ÙˆØªÙ†Ø¸ÙŠÙ ÙˆØªØ¨ÙŠÙŠØ¶ Ø§Ù„Ø£Ø³Ù†Ø§Ù† Ø¨Ø£Ø­Ø¯Ø« Ø£Ø¬Ù‡Ø²Ø© Ø§Ù„Ù„ÙŠØ²Ø± ÙˆØ¨Ø¥Ø´Ø±Ø§Ù Ù†Ø®Ø¨Ø© Ù…Ù† Ø§Ù„Ø£Ø·Ø¨Ø§Ø¡.',
      ku: 'Ú©Ù„ÛŒÙ†ÛŒÚ©ÛŽÚ©ÛŒ ØªØ§ÛŒØ¨Û•ØªÙ…Û•Ù†Ø¯ Ú©Û• Ù†ÙˆÛŽØªØ±ÛŒÙ† ØªÛ•Ú©Ù†Û•Ù„Û†Ø¬ÛŒØ§ÛŒ Ø¬ÙˆØ§Ù†Ú©Ø§Ø±ÛŒ Ùˆ Ú†Ø§Ù†Ø¯Ù†ÛŒ Ø¯Ø¯Ø§Ù† Ù¾ÛŽØ´Ú©Û•Ø´ Ø¯Û•Ú©Ø§Øª Ù„Û•Ú˜ÛŽØ± Ø³Û•Ø±Ù¾Û•Ø±Ø´ØªÛŒ Ù¾Ø²ÛŒØ´Ú©Ø§Ù†ÛŒ Ù„ÛŽÙ‡Ø§ØªÙˆÙˆ.',
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
      ar: 'Ø¨ØºØ¯Ø§Ø¯ØŒ Ø§Ù„Ù…Ù†ØµÙˆØ±ØŒ Ø´Ø§Ø±Ø¹ Ø§Ù„Ø±ÙˆØ§Ø¯ØŒ Ø¹Ù…Ø§Ø±Ø© Ø§Ù„Ù†Ø®Ø¨Ø©ØŒ Ø§Ù„Ø·Ø§Ø¨Ù‚ Ø§Ù„Ø«Ø§Ù†ÙŠ',
      ku: 'Ø¨Û•ØºØ¯Ø§Ø¯ØŒ Ù…Û•Ù†Ø³ÙˆÙˆØ±ØŒ Ø´Û•Ù‚Ø§Ù…ÛŒ Ú•Û•ÙˆØ§Ø¯ØŒ Ø¨Ø§ÚµÛ•Ø®Ø§Ù†Û•ÛŒ Ù†ÙˆØ®Ø¨Û•ØŒ Ù‚Ø§ØªÛŒ Ø¯ÙˆÙˆÛ•Ù…',
      en: 'Baghdad, Mansour, Al-Rowad Street, Al-Nukhba Building, 2nd Floor'
    },
    likes: 412,
    saves: 234,
    featuredDeal: {
      ar: 'Ø¬Ù„Ø³Ø© ØªÙ†Ø¸ÙŠÙ ÙˆØªÙ„Ù…ÙŠØ¹ Ø£Ø³Ù†Ø§Ù† Ù…Ø¬Ø§Ù†ÙŠØ© Ù…Ø¹ Ø£ÙŠ ÙØ­Øµ Ø´Ø§Ù…Ù„ ðŸ¦·',
      ku: 'Ù¾Ø§Ú©Ú©Ø±Ø¯Ù†Û•ÙˆÛ•ÛŒ Ø¯Ø¯Ø§Ù† Ø¨ÛŽØ¨Û•Ø±Ø§Ù…Ø¨Û•Ø± Ù„Û•Ú¯Û•Úµ Ù‡Û•Ø± Ù¾Ø´Ú©Ù†ÛŒÙ†ÛŽÚ©ÛŒ Ú¯Ø´ØªÛŒ Ø¯Ø¯Ø§Ù† ðŸ¦·',
      en: 'Smile Promo: Free professional dental scaling with any comprehensive checkup ðŸ¦·'
    },
    mapCoords: { x: 37, y: 49 }
  },
  {
    id: 'b-12',
    name: {
      ar: 'Ø¹ÙŠØ§Ø¯Ø© Ø±Ø¹Ø§ÙŠØ© Ø§Ù„Ø­ÙŠØ§Ø© Ø§Ù„ØªØ®ØµØµÙŠØ© - Ø¥Ø±Ø¨ÙŠÙ„',
      ku: 'Ú©Ù„ÛŒÙ†ÛŒÚ©ÛŒ Ú†Ø§ÙˆØ¯ÛŽØ±ÛŒ Ú˜ÛŒØ§Ù† - Ù‡Û•ÙˆÙ„ÛŽØ±',
      en: 'LifeCare Specialty Medical Clinic'
    },
    description: {
      ar: 'Ù…Ø¬Ù…Ø¹ Ø·Ø¨ÙŠ Ù…ØªÙƒØ§Ù…Ù„ Ù„ØªÙ‚Ø¯ÙŠÙ… Ø£ÙØ¶Ù„ Ø§Ù„Ø§Ø³ØªØ´Ø§Ø±Ø§Øª Ø§Ù„Ø·Ø¨ÙŠØ© ÙÙŠ Ù…Ø¬Ø§Ù„Ø§Øª Ø£Ù…Ø±Ø§Ø¶ Ø§Ù„Ù‚Ù„Ø¨ ÙˆØ§Ù„Ø£Ù†Ù ÙˆØ§Ù„Ø£Ø°Ù† ÙˆØ§Ù„Ø­Ù†Ø¬Ø±Ø© ÙˆØ§Ù„Ø£Ø´Ø¹Ø© ØªØ­Øª Ø¥Ø´Ø±Ø§Ù Ø·Ø§Ù‚Ù… Ø·Ø¨ÙŠ Ø¹Ø§Ù„ÙŠ Ø§Ù„ÙƒÙØ§Ø¡Ø©.',
      ku: 'Ú©Û†Ù…Û•ÚµÚ¯Û•ÛŒÛ•Ú©ÛŒ Ù¾Ø²ÛŒØ´Ú©ÛŒ Ú¯Ø´ØªÚ¯ÛŒØ± Ø¨Û† Ù¾ÛŽØ´Ú©Û•Ø´Ú©Ø±Ø¯Ù†ÛŒ Ø¨Ø§Ø´ØªØ±ÛŒÙ† Ù¾Ø´Ú©Ù†ÛŒÙ†ÛŒ Ù¾Ø²ÛŒØ´Ú©ÛŒ Ù„Û•Ú˜ÛŽØ± Ø¯Û•Ø³ØªÛŒ Ù¾Ø²ÛŒØ´Ú©Ø§Ù†ÛŒ Ø®Ø§ÙˆÛ•Ù† Ø¦Û•Ø²Ù…ÙˆÙˆÙ†.',
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
      ar: 'Ø£Ø±Ø¨ÙŠÙ„ØŒ Ø´Ø§Ø±Ø¹ Ù¡Ù Ù Ù…ØŒ Ù‚Ø±Ø¨ Ù…Ø¬Ø³Ø± Ø¹ÙŠÙ†ÙƒØ§ÙˆØ© ÙˆÙ…Ù‚Ø§Ø·Ø¹Ø© Ø¹Ø´ØªØ§Ø±',
      ku: 'Ù‡Û•ÙˆÙ„ÛŽØ±ØŒ Ø´Û•Ù‚Ø§Ù…ÛŒ Ù¡Ù Ù  Ù…Û•ØªØ±ÛŒØŒ Ù†Ø²ÛŒÚ© Ù¾Ø±Ø¯ÛŒ Ø¹Û•Ù†Ú©Ø§ÙˆÛ•',
      en: 'Erbil, 100m Road, near Ainkawa intersection'
    },
    likes: 195,
    saves: 84,
    featuredDeal: {
      ar: 'ÙØ­Øµ Ø³ÙƒØ± ÙˆØ¶ØºØ· Ù…Ø¬Ø§Ù†ÙŠ Ù„Ù„Ø¬Ù…ÙŠØ¹ ÙƒÙ„ ÙŠÙˆÙ… Ø¬Ù…Ø¹Ø© ØµØ¨Ø§Ø­Ø§Ù‹ ðŸ©º',
      ku: 'Ù¾Ø´Ú©Ù†ÛŒÙ†ÛŒ Ø´Û•Ú©Ø±Û• Ùˆ Ù¾Û•Ø³ØªØ§Ù†ÛŒ Ø®ÙˆÛŽÙ† Ø¨ÛŽØ¨Û•Ø±Ø§Ù…Ø¨Û•Ø± Ù‡Û•Ù…ÙˆÙˆ Ú•Û†Ú˜Ø§Ù†ÛŒ Ù‡Û•ÛŒÙ†ÛŒ ðŸ©º',
      en: 'Friday Wellness: Free blood pressure and diabetes screening every Friday morning ðŸ©º'
    },
    mapCoords: { x: 56, y: 25 }
  },

  // SHOPS & BOUTIQUES
  {
    id: 'b-13',
    name: {
      ar: 'Ø£Ù†Ø§Ù‚Ø© Ø¨ØºØ¯Ø§Ø¯ Ù„Ù„Ø£Ø²ÙŠØ§Ø¡ ÙˆØ§Ù„Ù…ÙˆØ¶Ø©',
      ku: 'Ø¯ÙˆÚ©Ø§Ù†ÛŒ Ù¾Û†Ø´Ø§Ú©ÛŒ Ø´Ø§Ù‡Ø§Ù†Û•ÛŒ Ø¨Û•ØºØ¯Ø§Ø¯',
      en: 'Baghdad Elegance Fashion House'
    },
    description: {
      ar: 'ÙˆØ¬Ù‡ØªÙƒ Ø§Ù„Ø£ÙˆÙ„Ù‰ Ù„Ø£Ø­Ø¯Ø« Ø®Ø·ÙˆØ· Ø§Ù„Ù…ÙˆØ¶Ø© ÙˆØ§Ù„Ø£Ø²ÙŠØ§Ø¡ Ø§Ù„Ù†Ø³Ø§Ø¦ÙŠØ© Ø§Ù„Ø±Ø§Ù‚ÙŠØ©ØŒ Ù…Ù„Ø§Ø¨Ø³ ØµÙŠÙÙŠØ© Ø®ÙÙŠÙØ©ØŒ ÙØ³Ø§ØªÙŠÙ† Ù…Ù†Ø§Ø³Ø¨Ø§ØªØŒ ÙˆÙ…Ù„Ø§Ø¨Ø³ Ø±Ø³Ù…ÙŠØ© Ø¨ØªØµØ§Ù…ÙŠÙ… ØªÙ†Ø§Ø³Ø¨ Ø°ÙˆÙ‚Ùƒ Ø§Ù„Ø±ÙÙŠØ¹.',
      ku: 'Ø¨Ø§Ø´ØªØ±ÛŒÙ† Ø´ÙˆÛŽÙ† Ø¨Û† Ø¬Ù„ÛŒ Ù…Û†Ø¯ÛŽØ±Ù† Ùˆ Ù†ÙˆÛŽÛŒ Ú˜Ù†Ø§Ù† Ùˆ Ø¯ÛŒØ²Ø§ÛŒÙ†ÛŒ Ù‡Ø§ÙˆÚ†Û•Ø±Ø® Ú¯ÙˆÙ†Ø¬Ø§Ùˆ Ù„Û•Ú¯Û•Úµ Ø­Û•Ø²Û•Ú©Ø§Ù†ØªØ§Ù†.',
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
      ar: 'Ø¨ØºØ¯Ø§Ø¯ØŒ Ø§Ù„Ù…Ù†ØµÙˆØ±ØŒ Ø´Ø§Ø±Ø¹ Ø§Ù„Ø£Ù…ÙŠØ±Ø§ØªØŒ Ù‚Ø±Ø¨ Ø§Ù„Ø³ÙØ§Ø±Ø© Ø§Ù„Ù„ÙŠØ¨ÙŠØ©',
      ku: 'Ø¨Û•ØºØ¯Ø§Ø¯ØŒ Ù…Û•Ù†Ø³ÙˆÙˆØ±ØŒ Ø´Û•Ù‚Ø§Ù…ÛŒ Ø¦Û•Ù…ÛŒØ±Ø§ØªØŒ Ù†Ø²ÛŒÚ© Ø¨Ø§ÚµÛŒÛ†Ø²Ø®Ø§Ù†Û•ÛŒ Ù„ÛŒØ¨ÛŒØ§',
      en: 'Baghdad, Mansour, Ameerat Street, near Libyan Embassy'
    },
    likes: 310,
    saves: 192,
    featuredDeal: {
      ar: 'Ø®ØµÙ… Ù¡Ù¥Ùª Ø¹Ù„Ù‰ Ø§Ù„ØªØ´ÙƒÙŠÙ„Ø© Ø§Ù„ØµÙŠÙÙŠØ© Ø§Ù„Ø¬Ø¯ÙŠØ¯Ø© Ø¹Ù†Ø¯ Ø§Ù„Ø¯ÙØ¹ Ø§Ù„ÙÙˆØ±ÙŠ ÙƒØ§Ø´ ðŸ‘—ðŸ’ƒ',
      ku: 'Ø¯Ø§Ø´Ú©Ø§Ù†Ø¯Ù†ÛŒ Ù¡Ù¥Ùª Ø¨Û† Ù‡Û•Ù…ÙˆÙˆ Ù…Û†Ø¯ÛŽÙ„Û• Ù†ÙˆÛŽÛŒÛ•Ú©Ø§Ù†ÛŒ Ù‡Ø§ÙˆÛŒÙ†Û• Ø¨Û• Ù¾Ø§Ø±Û•Ø¯Ø§Ù†ÛŒ Ú©Ø§Ø´ ðŸ‘—ðŸ’ƒ',
      en: 'Summer Launch: 15% discount on the entire new collection for physical cash payments ðŸ‘—ðŸ’ƒ'
    },
    mapCoords: { x: 39, y: 47 }
  },
  {
    id: 'b-14',
    name: {
      ar: 'Ø§Ù„ÙÙ‡Ø¯ Ù„Ù„Ø§ØªØµØ§Ù„Ø§Øª ÙˆØ§Ù„Ø¥Ù„ÙƒØªØ±ÙˆÙ†ÙŠØ§Øª - Ø§Ù„Ø¨ØµØ±Ø©',
      ku: 'Ø¦Û•Ù„ ÙÛ•Ù‡Û•Ø¯ Ø¨Û† Ù…Û†Ø¨Ø§ÛŒÙ„ Ùˆ ØªÛ•Ú©Ù†Û•Ù„Û†Ø¬ÛŒØ§',
      en: 'Al-Fahad Electronics & Mobile Hub'
    },
    description: {
      ar: 'Ø§Ù„Ù…Ø±ÙƒØ² Ø§Ù„Ø£ÙƒØ¨Ø± Ù„ÙƒØ§ÙØ© Ø£Ù†ÙˆØ§Ø¹ Ø§Ù„Ù‡ÙˆØ§ØªÙ Ø§Ù„Ø°ÙƒÙŠØ© Ø§Ù„Ø­Ø¯ÙŠØ«Ø© ÙˆØ¥ÙƒØ³Ø³ÙˆØ§Ø±Ø§ØªÙ‡Ø§ØŒ Ù„Ø§Ø¨ØªÙˆØ¨Ø§ØªØŒ ÙˆØ£Ø¬Ù‡Ø²Ø© Ù„ÙˆØ­ÙŠØ© Ø¨Ø¶Ù…Ø§Ù† Ø±Ø³Ù…ÙŠ Ø­Ù‚ÙŠÙ‚ÙŠ ÙˆØ£Ù†Ø³Ø¨ Ø§Ù„Ø£Ø³Ø¹Ø§Ø± Ø§Ù„ØªÙ†Ø§ÙØ³ÙŠØ© Ø¨Ø§Ù„Ø¨ØµØ±Ø©.',
      ku: 'Ú¯Û•ÙˆØ±Û•ØªØ±ÛŒÙ† Ù…Û•Ú©Û†ÛŒ Ù…Û†Ø¨Ø§ÛŒÙ„Û• Ø²ÛŒØ±Û•Ú©Û•Ú©Ø§Ù† Ùˆ Ø¦ÛŽÚ©Ø³Ø³ÙˆØ§Ø±Ø§Øª Ø¨Û• Ú¯Û•Ø±Û•Ù†ØªÛŒ Ú•Ø§Ø³ØªÛ•Ù‚ÛŒÙ†Û• Ùˆ Ù†Ø²Ù…ØªØ±ÛŒÙ† Ù†Ø±Ø® Ù„Û• Ø¨Û•Ø³Ø±Û•.',
      en: 'Basraâ€™s reliable tech store supplying the newest smartphones, gaming laptops, and mobile accessories with official local warranties.'
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
      ar: 'Ø§Ù„Ø¨ØµØ±Ø©ØŒ Ø­ÙŠ Ø§Ù„Ø¹Ø´Ø§Ø±ØŒ Ø´Ø§Ø±Ø¹ Ø§Ù„Ù…ÙƒØªØ¨Ø§Øª Ø§Ù„ØªØ¬Ø§Ø±ÙŠ Ø§Ù„Ø¹Ø§Ù…',
      ku: 'Ø¨Û•ØºØ¯Ø§Ø¯ØŒ Ú¯Û•Ú•Û•Ú©ÛŒ Ø¹Û•Ø´Ø§Ø±ØŒ Ø´Û•Ù‚Ø§Ù…ÛŒ Ú©ØªÛŽØ¨Ø®Ø§Ù†Û•Ú©Ø§Ù†',
      en: 'Basra, Ashar, Commercial Maktabat Street'
    },
    likes: 422,
    saves: 215,
    featuredDeal: {
      ar: 'Ø´Ø§Ø­Ù† Ø¨Ø§ÙˆØ±Ø¨Ø§Ù†Ùƒ Ø£ØµÙ„ÙŠ Ù‡Ø¯ÙŠØ© Ù…Ø¹ Ø´Ø±Ø§Ø¡ Ø£ÙŠ Ø¬ÙˆØ§Ù„ Ø±Ø§Ø¦Ø¯ ðŸ“±ðŸŽ',
      ku: 'Ø¨Ø§ÙˆÛ•Ø± Ø¨Ø§Ù†Ú©ÛŒ Ø¦Û•Ø³ÚµÛŒ Ø¯ÛŒØ§Ø±ÛŒ Ù„Û•Ú¯Û•Úµ Ú©Ú•ÛŒÙ†ÛŒ Ù‡Û•Ø± Ù…Û†Ø¨Ø§ÛŒÙ„ÛŽÚ©ÛŒ Ø¨Û•Ø±Ø² ðŸ“±ðŸŽ',
      en: 'Tech Pack: Free branded fast-charging Powerbank with any flagship smartphone purchase ðŸ“±ðŸŽ'
    },
    mapCoords: { x: 81, y: 89 }
  }
];

// Realistic post templates by category
const POST_TEMPLATES: Record<string, { en: string[]; ar: string[]; ku: string[] }> = {
  restaurant: {
    en: [
      'Fresh grilled family platters now available! Dine in or order delivery. Open daily 10 AM â€“ 11 PM.',
      'Weekend special: Buy 2 mains get 1 free. Call now to reserve your table!',
      'New chef\'s special menu launched today. Come taste the difference.',
      'Hosting a private event? We offer catering services across the city. Contact us for details.',
      'Daily fresh bread baked in-house. Authentic Iraqi flavors since 2010.'
    ],
    ar: [
      'Ø£Ø·Ø¨Ø§Ù‚ Ù…Ø´ÙˆÙŠØ© Ø·Ø§Ø²Ø¬Ø© Ù…ØªØ§Ø­Ø© Ø§Ù„Ø¢Ù† Ù„Ù„Ø¹Ø§Ø¦Ù„Ø§Øª! ØªÙ†Ø§ÙˆÙ„ Ø§Ù„Ø·Ø¹Ø§Ù… ÙÙŠ Ø§Ù„Ù…ÙƒØ§Ù† Ø£Ùˆ Ø§Ø·Ù„Ø¨ Ø§Ù„ØªÙˆØµÙŠÙ„. Ù…ÙØªÙˆØ­ ÙŠÙˆÙ…ÙŠØ§Ù‹ Ù…Ù† 10 ØµØ¨Ø§Ø­Ø§Ù‹ Ø­ØªÙ‰ 11 Ù…Ø³Ø§Ø¡Ù‹.',
      'Ø¹Ø±Ø¶ Ù†Ù‡Ø§ÙŠØ© Ø§Ù„Ø£Ø³Ø¨ÙˆØ¹: Ø§Ø´ØªØ±Ù Ø·Ø¨Ù‚ÙŠÙ† Ø±Ø¦ÙŠØ³ÙŠÙŠÙ† ÙˆØ§Ø­ØµÙ„ Ø¹Ù„Ù‰ Ø§Ù„Ø«Ø§Ù„Ø« Ù…Ø¬Ø§Ù†Ø§Ù‹. Ø§ØªØµÙ„ Ø§Ù„Ø¢Ù† Ù„Ø­Ø¬Ø² Ø·Ø§ÙˆÙ„ØªÙƒ!',
      'Ù‚Ø§Ø¦Ù…Ø© Ø·Ø¹Ø§Ù… Ø¬Ø¯ÙŠØ¯Ø© Ù…Ù† Ø§Ù„Ø´ÙŠÙ Ø£Ø·Ù„Ù‚Øª Ø§Ù„ÙŠÙˆÙ…. ØªØ¹Ø§Ù„ Ùˆ taste Ø§Ù„ÙØ±Ù‚.',
      'ØªØ³ØªØ¶ÙŠÙ Ø­Ø¯Ø«Ø§Ù‹ Ø®Ø§ØµØ§Ù‹ØŸ Ù†Ù‚Ø¯Ù… Ø®Ø¯Ù…Ø§Øª Ø§Ù„ÙˆÙ„Ø§Ø¦Ù… ÙÙŠ Ø¬Ù…ÙŠØ¹ Ø£Ù†Ø­Ø§Ø¡ Ø§Ù„Ù…Ø¯ÙŠÙ†Ø©. Ø§ØªØµÙ„ Ø¨Ù†Ø§ Ù„Ù„ØªÙØ§ØµÙŠÙ„.',
      'Ø®Ø¨Ø² Ø·Ø§Ø²Ø¬ ÙŠÙˆÙ…ÙŠØ§Ù‹ Ù…Ø®Ø¨ÙˆØ² ÙÙŠ Ø§Ù„Ù…Ù†Ø²Ù„. Ù†ÙƒÙ‡Ø§Øª Ø¹Ø±Ø§Ù‚ÙŠØ© Ø£ØµÙŠÙ„Ø© Ù…Ù†Ø° Ø¹Ø§Ù… 2010.'
    ],
    ku: [
      'Ø¬ÛŽÚ¯Ø§ÛŒ Ø®ÙˆØ§Ø±Ø¯Ù†ÛŒ ØªØ§ÛŒØ¨Û•ØªÛŒ Ø®ÛŽØ²Ø§Ù†ÛŒ Ù„Û•Ø¨Û•Ø±Ø¯Û•Ø³ØªÛ•! Ù„Û• Ù†Ø§ÙˆØ®Û†Ø¯Ø§ Ø¨Ø®Û† ÛŒØ§Ù† Ø¯Ø§ÙˆØ§ÛŒ Ú¯Û•ÛŒØ§Ù†Ø¯Ù† Ø¨Ú©Û•. Ú•Û†Ú˜Ø§Ù†Û• Ú©Ø±Ø§ÙˆÛ•ÛŒÛ• Ù„Û• 10 Ø¨Û•Ø±ÙˆØ§Ø± ØªØ§ 11 Ø´Û•Ùˆ.',
      'ØªØ§ÛŒØ¨Û•ØªÛŒ Ú¾Û•ÙØªÛ•: 2 Ø®ÙˆØ§Ø±Ø¯Ù†ÛŒ Ø³Û•Ø±Û•Ú©ÛŒ Ø¨Ú©Ú•Û•ØŒ 3ÛŒÛ•Ù… Ø¨Û•Ø®Û†Ú•Ø§ÛŒÛŒÛ•. Ø¦ÛŽØ³ØªØ§ Ù¾Û•ÛŒÙˆÛ•Ù†Ø¯ÛŒ Ø¨Ú©Û• Ø¨Û† Ø¯Ø§ÙˆØ§Ú©Ø±Ø¯Ù†ÛŒ Ù…ÛŽØ²!',
      'Ù„ÛŒØ³ØªÛŒ Ø®ÙˆØ§Ø±Ø¯Ù†ÛŒ Ù†ÙˆÛŽÛŒ Ø´ÛŽÙ Ø¨Û•Ú•ÛŽÙˆÛ•Ú†ÙˆÙˆ. Ø¨ÛŽÙ† Ùˆ Ø¬ÛŒØ§ÙˆØ§Ø²ÛŒ ØªØ§Ù… Ø¨Ú©Û•.',
      'Ø¨Û•Ø±Ù†Ø§Ù…Û•ÛŒÛ•Ú©ÛŒ ØªØ§ÛŒØ¨Û•Øª Ø¯Ø§Ø¨Û•Ø´ Ø¯Û•Ú©Û•ÛŒØªØŸ Ø®Ø²Ù…Û•ØªÚ¯ÙˆØ²Ø§Ø±ÛŒ Ø¨Û•Ú•ÛŽÙˆÛ•Ø¨Ø±Ø¯Ù†ÛŒ Ø¨Û•Ø³Û•Ø± Ø´Ø§Ø±Ø¯Ø§ Ù¾ÛŽØ´Ú©Û•Ø´ Ø¯Û•Ú©Û•ÛŒÙ†. Ù¾Û•ÛŒÙˆÛ•Ù†Ø¯ÛŒÙ…Ø§Ù† Ø¨Ú©Û• Ø¨Û† ÙˆØ±Ø¯Û•Ú©Ø§Ø±ÛŒ.',
      'Ù†Ø§Ù†ÛŽÚ©ÛŒ ØªØ§Ø²Û• Ú•Û†Ú˜Ø§Ù†Û• Ù„Û• Ù†Ø§ÙˆØ®Û†Ø¯Ø§ Ø¯Û•Ú©Ú•ÛŽÙ†. ØªØ§Ù…ÛŒ Ø¹ÛŽØ±Ø§Ù‚ÛŒ Ú•Û•Ø³Û•Ù† Ù„Û• 2010Û•ÙˆÛ•.'
    ]
  },
  cafe_bakery: {
    en: [
      'Morning brew alert! Specialty coffee and fresh pastries daily from 7 AM. Free WiFi & cozy vibes.',
      'New seasonal cake collection just dropped. Perfect for birthdays and gatherings.',
      'Study-friendly environment with quiet zones. Students get 15% off after 2 PM.',
      'Weekend brunch menu: avocado toast, eggs Benedict, and fresh juice combos.',
      'Grab your loyalty card â€” buy 5 coffees, get the 6th free!'
    ],
    ar: [
      'ØªÙ†Ø¨ÙŠÙ‡ Ø§Ù„Ù‚Ù‡ÙˆØ© Ø§Ù„ØµØ¨Ø§Ø­ÙŠØ©! Ù‚Ù‡ÙˆØ© Ù…Ù…ÙŠØ²Ø© ÙˆØ­Ù„ÙˆÙŠØ§Øª Ø·Ø§Ø²Ø¬Ø© ÙŠÙˆÙ…ÙŠØ§Ù‹ Ù…Ù† Ø§Ù„Ø³Ø§Ø¹Ø© 7 ØµØ¨Ø§Ø­Ø§Ù‹. ÙˆØ§ÙŠ ÙØ§ÙŠ Ù…Ø¬Ø§Ù†ÙŠ ÙˆØ£Ø¬ÙˆØ§Ø¡ Ù…Ø±ÙŠØ­Ø©.',
      'Ù…Ø¬Ù…ÙˆØ¹Ø© ÙƒÙŠÙƒ Ù…ÙˆØ³Ù…ÙŠØ© Ø¬Ø¯ÙŠØ¯Ø© ÙˆØµÙ„Øª Ù„Ù„ØªÙˆ. Ù…Ø«Ø§Ù„ÙŠØ© Ù„Ø£Ø¹ÙŠØ§Ø¯ Ø§Ù„Ù…ÙŠÙ„Ø§Ø¯ ÙˆØ§Ù„ØªØ¬Ù…Ø¹Ø§Øª.',
      'Ø¨ÙŠØ¦Ø© Ù…Ù†Ø§Ø³Ø¨Ø© Ù„Ù„Ø¯Ø±Ø§Ø³Ø© Ù…Ø¹ Ù…Ù†Ø§Ø·Ù‚ Ù‡Ø§Ø¯Ø¦Ø©. Ø§Ù„Ø·Ù„Ø§Ø¨ ÙŠØ­ØµÙ„ÙˆÙ† Ø¹Ù„Ù‰ Ø®ØµÙ… 15% Ø¨Ø¹Ø¯ Ø§Ù„Ø³Ø§Ø¹Ø© 2 Ø¸Ù‡Ø±Ø§Ù‹.',
      'Ù‚Ø§Ø¦Ù…Ø© Ø¨Ø±Ø§Ù†Ø´ Ù†Ù‡Ø§ÙŠØ© Ø§Ù„Ø£Ø³Ø¨ÙˆØ¹: ØªÙˆØ³Øª Ø§Ù„Ø£ÙÙˆÙƒØ§Ø¯ÙˆØŒ Ø¨ÙŠØ¶ Ø¨Ù†Ø¯ÙŠÙƒØªØŒ ÙˆØ¹ØµØ§Ø¦Ø± Ø·Ø§Ø²Ø¬Ø©.',
      'Ø§Ø­ØµÙ„ Ø¹Ù„Ù‰ Ø¨Ø·Ø§Ù‚Ø© Ø§Ù„ÙˆÙ„Ø§Ø¡ â€” Ø§Ø´ØªØ±Ù 5 Ù‚Ù‡ÙˆØ§Øª ÙˆØ§Ø­ØµÙ„ Ø¹Ù„Ù‰ Ø§Ù„Ø³Ø§Ø¯Ø³Ø© Ù…Ø¬Ø§Ù†Ø§Ù‹!'
    ],
    ku: [
      'Ø¦Ø§Ú¯Ø§Ø¯Ø§Ø±ÛŒ Ù‚Ø§ÙˆÛ•ÛŒ Ø¨Û•ÛŒØ§Ù†ÛŒ! Ù‚Ø§ÙˆÛ•ÛŒ ØªØ§ÛŒØ¨Û•ØªÛŒ Ùˆ Ø´ÛŒØ±ÛŒÙ†ÛŒ ØªØ§Ø²Û• Ú•Û†Ú˜Ø§Ù†Û• Ù„Û• 7 Ø¨Û•ÛŒØ§Ù†ÛŒÛ•ÙˆÛ•. ÙˆØ§ÛŒ ÙØ§ÛŒ Ø¦Ø§Ø²Ø§Ø¯ Ùˆ Ú©Û•Ø´ Ùˆ Ù‡Û•ÙˆØ§ÛŒÛ•Ú©ÛŒ Ø®Û†Ø´.',
      'Ú©Û†Ù„ÛŽÚ©Ø´Ù†ÛŒ Ú©ÛŒÚ©ÛŒ ÙˆÛ•Ø±Ø²ÛŒ Ù†ÙˆÛŽ ØªØ§Ø²Û• Ø¯Ø§Ø¨Û•Ø²ÛŽÙ†Ø±Ø§ÙˆÛ•. Ø¦Û•Ù…Û• Ø¨Û† Ú•Û†Ú˜ÛŒ Ù„Û•Ø¯Ø§ÛŒÚ©Ø¨ÙˆÙˆÙ† Ùˆ Ú©Û†Ø¨ÙˆÙˆÙ†Û•ÙˆÛ•Ú©Ø§Ù†.',
      'Ú˜ÛŒÙ†Ú¯Û•ÛŒ Ø®ÙˆÛŽÙ†Ø¯Ù† Ø¨Û• Ù†Ø§ÙˆÚ†Û• Ø¦Ø§Ø±Ø§Ù…Û•Ú©Ø§Ù†. Ø®ÙˆÛŽÙ†Ø¯Ú©Ø§Ø±Ø§Ù† 15% Ø¯Ø§Ø´Ú©Ø§Ù† ÙˆÛ•Ø±Ø¯Û•Ú¯Ø±Ù† Ø¯ÙˆØ§ÛŒ 2 Ø¯ÙˆØ§Ù†ÛŒØ§Ù†.',
      'Ù„ÛŒØ³ØªÛŒ Ø¨Ø±Ø§Ù†Ú†ÛŒ Ú¾Û•ÙØªÛ•: ØªÛ†Ø³ØªÛŒ Ø¦Û•Ú¤Û†Ú©Ø§Ø¯Û†ØŒ Ø¦ÛŽÚ¯ Ø¨ÛŽÙ†ÛŽØ¯ÛŒÚ©ØªØŒ Ùˆ Ø´ÛŒØ±Û•ÛŒ ØªØ§Ø²Û•.',
      'Ú©Ø§Ø±ØªÛŒ Ø¯ÚµØ³Û†Ø²ÛŒÛ•Ú©Û•Øª Ø¨Ú¯Ø±Û• â€” 5 Ù‚Ø§ÙˆÛ• Ø¨Ú©Ú•Û•ØŒ 6ÛŒÛ•Ù… Ø¨Û•Ø®Û†Ú•Ø§ÛŒÛŒÛ•!'
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
      'Ø¹Ø±ÙˆØ¶ Ø§Ù„Ø£Ø³Ø¨ÙˆØ¹ Ù‡Ù†Ø§! Ù…Ù†ØªØ¬Ø§Øª Ø·Ø§Ø²Ø¬Ø©ØŒ Ø£Ù„Ø¨Ø§Ù†ØŒ ÙˆÙ…Ø³ØªÙ„Ø²Ù…Ø§Øª Ø§Ù„Ù…Ø·Ø¨Ø® Ø¨Ø£Ø³Ø¹Ø§Ø± Ù„Ø§ ØªÙÙ‚Ù‡Ø±.',
      'Ù‚Ø³Ù… Ø§Ù„Ø£ØºØ°ÙŠØ© Ø§Ù„Ø¹Ø¶ÙˆÙŠØ© Ø§Ù„Ø¬Ø¯ÙŠØ¯ Ù…ÙØªÙˆØ­ Ø§Ù„Ø¢Ù†. Ø¨Ø¶Ø§Ø¦Ø¹ Ù…Ø³ØªÙˆØ±Ø¯Ø© ÙˆÙ…Ø­Ù„ÙŠØ© ÙÙŠ Ù…ÙƒØ§Ù† ÙˆØ§Ø­Ø¯.',
      'Ø¹Ø¨ÙˆØ§Øª Ø§Ù„Ù‚ÙŠÙ…Ø© Ø§Ù„Ø¹Ø§Ø¦Ù„ÙŠØ© Ù…ØªØ§Ø­Ø©. ÙˆÙÙ‘Ø± Ø£ÙƒØ«Ø± Ø¹Ù†Ø¯ Ø§Ù„Ø´Ø±Ø§Ø¡ Ø¨Ø§Ù„Ø¬Ù…Ù„Ø©.',
      'Ù…ÙØªÙˆØ­ 24/7 Ù„Ø±Ø§Ø­ØªÙƒ. Ø®Ø¯Ù…Ø© Ø§Ù„ØªÙˆØµÙŠÙ„ Ù„Ù„Ù…Ù†Ø§Ø²Ù„ Ù…ØªØ§Ø­Ø© ÙÙŠ Ø¬Ù…ÙŠØ¹ Ø£Ù†Ø­Ø§Ø¡ Ø§Ù„Ù…Ø­Ø§ÙØ¸Ø©.',
      'Ù…Ø³ØªÙ„Ø²Ù…Ø§Øª Ø±Ù…Ø¶Ø§Ù† Ù…ØªÙˆÙØ±Ø© Ø§Ù„Ø¢Ù†. ØªÙ…Ø±ØŒ Ø¹ØµØ§Ø¦Ø±ØŒ ÙˆØ­Ù„ÙˆÙŠØ§Øª ØªÙ‚Ù„ÙŠØ¯ÙŠØ©.'
    ],
    ku: [
      'Ø¦Û†ÙÛ•Ø±ÛŒ Ú¾Û•ÙØªÛ•ÛŒÛŒ Ù„ÛŽØ±Û•ÛŒÛ•! Ø¨Û•Ø±Ù‡Û•Ù…ÛŽÚ©ÛŒ ØªØ§Ø²Û•ØŒ Ø´ÛŒØ± Ùˆ Ø¨Û•Ø³ÚµÛ•Ú©Ø§Ù†ÛŒ Ù†Ø§ÙˆÙ†Ø® Ø¨Û• Ù†Ø±Ø®ÛŽÚ©ÛŒ Ù†Ø§ØªÛ•Ø¨Ø§Ùˆ.',
      'Ø¨Û•Ø´ÛŒ Ø¦Û†Ø±Ú¯Ø§Ù†ÛŒÚ©ÛŒ Ù†ÙˆÛŽ Ø¦ÛŽØ³ØªØ§ Ú©Ø±Ø§ÙˆÛ•ÛŒÛ•. Ø¨Û•Ø±Ù‡Û•Ù…Û• Ú¾Û•Ù†Ø§Ø±Ø¯Û•Ú©Ø±Ø§ÙˆÛ•Ú©Ø§Ù† Ùˆ Ø¯ÚµØ®ÙˆØ§Ø²Ø§Ù†ÛŒ Ù†Ø§ÙˆØ®Û†ÛŒÛŒ Ù„Û• Ú©Ù†Ø§Ø±ÛŒ ÛŒÛ•Ú©ØªØ±Ø¯Ø§Ù†.',
      'Ù¾Ø§Ú©ÛŽØ¬ÛŒ Ø¨Û•Ù‡Ø§ÛŒ Ø®ÛŽØ²Ø§Ù†ÛŒ Ù„Û•Ø¨Û•Ø±Ø¯Û•Ø³ØªÛ•. Ø²ÛŒØ§ØªØ± Ù¾Ø§Ø´Û•Ú©Û•ÙˆØª Ø¨Ú©Û• Ú©Ø§ØªÛŽÚ© Ø¨Û• Ú©Û†Ù…Û•Úµ Ø¯Û•Ú©Ú•ÛŒØª.',
      'Ù¢Ù¤/Ù§ Ú©Ø±Ø§ÙˆÛ•ÛŒÛ• Ø¨Û† Ø¦Ø§Ø³Ø§Ù†ÛŒÛ•Ú©Û•Øª. Ú¯Û•ÛŒØ§Ù†Ø¯Ù†ÛŒ Ù†Ø§ÙˆØ®Û† Ù„Û•Ø³Û•Ø±Ø¬Û•Ù… Ù¾Ø§Ø±ÛŽØ²Ú¯Ø§Ú©Û• Ø¨Û•Ø±Ø¯Û•Ø³ØªÛ•.',
      'Ù¾ÛŽØ¯Ø§ÙˆÛŒØ³ØªÛŒÛ•Ú©Ø§Ù†ÛŒ Ú•Û•Ù…Û•Ø²Ø§Ù† Ø¦ÛŽØ³ØªØ§ Ù„Û• Ú©Û†Ú¯Ø§Ú©Û•Ù…Ø§Ù†Ø¯Ø§Ù†. Ø®ÙˆØ±Ù…Ø§ØŒ Ø´ÛŒØ±Û• Ùˆ Ø´ÛŒØ±ÛŒÙ†ÛŒÛ• Ú©Û†Ù†Û•Ú©Ø§Ù†.'
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
      'Ù…Ù‡Ø±Ø¬Ø§Ù† Ø§Ù„ØªØ³ÙˆÙ‚ Ù†Ù‡Ø§ÙŠØ© Ø§Ù„Ø£Ø³Ø¨ÙˆØ¹ ÙŠØ¨Ø¯Ø£ Ø§Ù„Ø¬Ù…Ø¹Ø©! Ø®ØµÙˆÙ…Ø§Øª ØªØµÙ„ Ø¥Ù„Ù‰ 70% Ø¹Ù„Ù‰ Ø§Ù„Ù…Ø§Ø±ÙƒØ§Øª Ø§Ù„Ù…Ø®ØªØ§Ø±Ø©.',
      'Ù…ØªØ§Ø¬Ø± Ø¯ÙˆÙ„ÙŠØ© Ø¬Ø¯ÙŠØ¯Ø© Ù…ÙØªÙˆØ­Ø© Ø§Ù„Ø¢Ù† ÙÙŠ Ø§Ù„Ø·Ø§Ø¨Ù‚ Ø§Ù„Ø«Ø§Ù†ÙŠ. Ø§Ø³ØªÙƒØ´Ù Ø£Ø­Ø¯Ø« ØµÙŠØ­Ø§Øª Ø§Ù„Ù…ÙˆØ¶Ø©.',
      'Ù…Ù†Ø·Ù‚Ø© Ø§Ù„ØªØ±ÙÙŠÙ‡ Ù„Ù„Ø£Ø·ÙØ§Ù„ ØªÙˆØ³Ø¹Øª. Ø§ØµØ·Ø­Ø¨ Ø§Ù„Ø¹Ø§Ø¦Ù„Ø© Ø¨Ø£ÙƒÙ…Ù„Ù‡Ø§ Ù„ÙŠÙˆÙ… Ù…Ù…ØªØ¹.',
      'Ù…ÙˆÙ‚Ù Ø³ÙŠØ§Ø±Ø§Øª Ù…Ø¬Ø§Ù†ÙŠ Ù„Ù„Ø³Ø§Ø¹ØªÙŠÙ† Ø§Ù„Ø£ÙˆÙ„ÙŠÙŠÙ†. Ø®Ø¯Ù…Ø© Ø§Ù„Ú¤Ø§Ù„ÙŠÙ‡ Ù…ØªØ§Ø­Ø© Ø¹Ù†Ø¯ Ø§Ù„Ø¨ÙˆØ§Ø¨Ø© 3.',
      'ØªØ¬Ø¯ÙŠØ¯ Ù…Ø·Ø¹Ù… Ø§Ù„Ù…Ø­ÙƒÙ…Ø© Ø§ÙƒØªÙ…Ù„! 12 Ù…Ø·Ø¹Ù… ÙˆÙ…Ù‚Ù‡Ù‰ Ø¬Ø¯ÙŠØ¯ Ù„ØªØ¬Ø±Ø¨ØªÙ‡Ù….'
    ],
    ku: [
      'ÙÛŒØ³ØªÛŒÚ¤Ø§ÚµÛŒ Ú©Ú•ÛŒÙ†ÛŒ Ú¾Û•ÙØªÛ• Ù„Û• Ú¾Û•ÛŒÙ†ÛŒ Ø¯Û•Ø³ØªÙ¾ÛŽØ¯Û•Ú©Ø§Øª! Ø¯Ø§Ø´Ú©Ø§Ù† ØªØ§ 70% Ù„Û•Ø³Û•Ø± Ù†ÛŒØ´Ø§Ù†Û• Ú¾Û•ÚµØ¨Ú˜ÛŽØ±Ø¯Ø±Ø§ÙˆÛ•Ú©Ø§Ù†.',
      'Ø¯ÙˆÚ©Ø§Ù†Û• Ù†ÛŽÙˆØ¯Û•ÙˆÚµÛ•ØªÛŒÛŒÛ• Ù†ÙˆÛŽÛŒÛ•Ú©Ø§Ù† Ø¦ÛŽØ³ØªØ§ Ù„Û• Ù†Ù‡Û†Ù…ÛŒ 2Û•Ù… Ú©Ø±Ø§ÙˆÛ•Ù†. Ù†ÙˆÛŽØªØ±ÛŒÙ† Ø¨Ø§Ù†Ú¯Û•ÙˆØ§Ø²ÛŒ ÙØ§Ø´Ù†Û•Ú©Û•Øª Ø¯Û†Ø²Û•ÙˆÛ•.',
      'Ù†Ø§ÙˆÚ†Û•ÛŒ Ú©ÛŽØ´ Ùˆ Ø´Ø§Ø®ÛŒÚ©Ø§Ù†ÛŒ Ù…Ù†Ø¯Ø§ÚµØ§Ù† ÙØ±Ø§ÙˆØ§Ù† Ú©Ø±Ø§. Ú¾Û•Ù…ÙˆÙˆ Ø®ÛŽØ²Ø§Ù†Û•Ú©Û•Øª Ø¨ÛŽÙ† Ø¨Û† Ú•Û†Ú˜ÛŽÚ©ÛŒ Ø®Û†Ø´.',
      'Ù¾Ø§Ø±Ú©ÛŒÙ†Ú¯ÛŒ Ø¨Û•Ø®Û†Ú•Ø§ÛŒÛŒ Ø¨Û† 2 Ú©Ø§ØªÚ˜Ù…ÛŽØ±ÛŒ ÛŒÛ•Ú©Û•Ù…. Ø®Ø²Ù…Û•ØªÚ¯ÙˆØ²Ø§Ø±ÛŒ Ú¤Ø§Ù„ÛŽØª Ù„Û• Ø¯Û•Ø±Ú¯Ø§ÛŒ 3 Ø¨Û•Ø±Ø¯Û•Ø³ØªÛ•.',
      'Ù†ÙˆÛŽÚ©Ø±Ø¯Ù†Û•ÙˆÛ•ÛŒ Ù‚ÙˆØªØ§Ø¨Ø®Ø§Ù†Û•ÛŒ Ø®ÙˆØ§Ø±Ø¯Ù† ØªÛ•ÙˆØ§Ùˆ Ø¨ÙˆÙˆ! 12 Ú†ÛŽØ´ØªØ®Ø§Ù†Û• Ùˆ Ú©Ø§ÙÛŽÛŒ Ù†ÙˆÛŽ Ø¨Û† ØªØ§Ù…Ú©Ø±Ø¯Ù†.'
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
      'ÙØ­Øµ Ø¶ØºØ· Ø§Ù„Ø¯Ù… Ù…Ø¬Ø§Ù†Ø§Ù‹ ÙƒÙ„ Ø«Ù„Ø§Ø«Ø§Ø¡. Ø§Ø¯Ø®Ù„ Ù…Ø¨Ø§Ø´Ø±Ø©ØŒ Ù„Ø§ Ø­Ø§Ø¬Ø© Ù„Ù…ÙˆØ¹Ø¯ Ù…Ø³Ø¨Ù‚.',
      'Ù‚Ø³Ù… Ø§Ù„ÙÙŠØªØ§Ù…ÙŠÙ†Ø§Øª ÙˆØ§Ù„Ù…ÙƒÙ…Ù„Ø§Øª Ø§Ù„Ø¬Ø¯ÙŠØ¯ Ù…Ø®Ø²Ù‘Ù†. Ø§Ø³Ø£Ù„ ØµÙŠØ¯Ù„Ø§Ù†ÙŠÙ‘Ù†Ø§ Ù„Ù„Ø­ØµÙˆÙ„ Ø¹Ù„Ù‰ Ø§Ù„Ù†ØµÙŠØ­Ø©.',
      'Ø®Ø¯Ù…Ø© ØªÙˆØµÙŠÙ„ Ø§Ù„ÙˆØµÙØ§Øª Ø§Ù„Ø·Ø¨ÙŠØ© Ù…ØªØ§Ø­Ø© Ø§Ù„Ø¢Ù†. Ø§ØªØµÙ„ Ø¨Ù†Ø§ Ù„ØªØ±ØªÙŠØ¨ Ø§Ù„ØªÙˆØµÙŠÙ„ ÙÙŠ Ù†ÙØ³ Ø§Ù„ÙŠÙˆÙ….',
      'Ù„Ù‚Ø§Ø­Ø§Øª Ø§Ù„Ø¥Ù†ÙÙ„ÙˆÙ†Ø²Ø§ Ù…ØªØ§Ø­Ø©. Ø§Ø­Ù…Ù Ø¹Ø§Ø¦Ù„ØªÙƒ Ù‡Ø°Ø§ Ø§Ù„Ù…ÙˆØ³Ù….',
      'Ù…Ø³ØªÙ„Ø²Ù…Ø§Øª Ø±Ø¹Ø§ÙŠØ© Ø§Ù„Ø£Ø·ÙØ§Ù„: Ø­ÙØ§Ø¶Ø§ØªØŒ Ø­Ù„ÙŠØ¨ ØµÙ†Ø§Ø¹ÙŠØŒ ÙˆØ¹Ù†Ø§ÙŠØ© Ø¨Ø§Ù„Ø¨Ø´Ø±Ø©. Ø¬Ù…ÙŠØ¹ Ø§Ù„Ù…Ø§Ø±ÙƒØ§Øª Ø§Ù„Ù…ÙˆØ«ÙˆÙ‚Ø© ÙÙŠ Ù…ÙƒØ§Ù† ÙˆØ§Ø­Ø¯.'
    ],
    ku: [
      'Ù¾Ø´Ú©Ù†ÛŒÙ†ÛŒ Ú•ÛŽÚ˜Û•ÛŒ Ø®ÙˆÛŽÙ†ÛŒ Ø¨ÛŽ Ø¨Û•Ø±Ø§Ù…Ø¨Û•Ø± Ú¾Û•Ø± Ø³ÛŽØ´Û•Ù…Ù…Û•ÛŒÛ•Ú©. Ø¨ÛŽ Ø¯Ø§ÙˆØ§Ú©Ø±Ø¯Ù†ØŒ Ù¾ÛŽÙˆÛŒØ³Øª Ø¨Û• Ú†Ø§Ø±Û•Ø³Û•Ø±ÛŒ Ù¾ÛŽØ´ÙˆÙˆ Ù†Ø§Ú©Ø§Øª.',
      'Ø¨Û•Ø´ÛŒ Ú¤ÛŒØªØ§Ù…ÛŒÙ† Ùˆ Ù…Ø§Ø¯Ø¯Û• Ú©Û†Ù…Û•ÚµÚ©Û•Ø±Û• Ù†ÙˆÛŽÛŒÛ•Ú©Ø§Ù† Ù¾Ú•Ú©Ø±Ø§ÙˆÙ†Û•ØªÛ•ÙˆÛ•. Ø¯Û•Ø±Ù…Ø§Ù†Ø³Ø§Ø²Ù…Ø§Ù† Ø¨Ù¾Ø±Ø³Û• Ø¨Û† Ø¦Ø§Ù…Û†Ú˜Ú¯Ø§Ø±ÛŒ.',
      'Ø®Ø²Ù…Û•ØªÚ¯ÙˆØ²Ø§Ø±ÛŒ Ú¯Û•ÛŒØ§Ù†Ø¯Ù†ÛŒ Ø¯Û•Ø±Ù…Ø§Ù† Ø¦ÛŽØ³ØªØ§ Ø¨Û•Ø±Ø¯Û•Ø³ØªÛ•. Ù¾Û•ÛŒÙˆÛ•Ù†Ø¯ÛŒÙ…Ø§Ù† Ø¨Ú©Û• Ø¨Û† Ú•ÛŽÚ©Ø®Ø³ØªÙ†ÛŒ Ú¯Û•ÛŒØ§Ù†Ø¯Ù†ÛŒ Ú¾Û•Ù…Ø§Ù† Ú•Û†Ú˜.',
      'ØªÛŽÚ©Û•ÚµÚ©Ø§Ø±ÛŒ ÙÚµÛ† Ø¨Û•Ø±Ø¯Û•Ø³ØªÛ•. Ø¦Û•Ù… ÙˆÛ•Ø±Ø²Û• Ø®ÛŽØ²Ø§Ù†Û•Ú©Û•Øª Ø¨Ù¾Ø§Ø±ÛŽØ²Û•.',
      'Ù¾ÛŽØ¯Ø§ÙˆÛŒØ³ØªÛŒÛŒÛ•Ú©Ø§Ù†ÛŒ Ù…Ù†Ø¯Ø§ÚµÛŒ: Ø¬Ù„Û•Ø¨Û•Ø±Ú¯Û•ØŒ Ø´ÛŒØ± Ùˆ Ú†Ø§ÙˆØ¯ÛŽØ±ÛŒ Ù¾ÛŽØ³Øª. Ú¾Û•Ù…ÙˆÙˆ Ù†ÛŒØ´Ø§Ù†Û• Ø¦Û•Ù…Ù†ÛŒÛ•Ú©Ø§Ù† Ù„Û• Ø´ÙˆÛŽÙ†ÛŽÚ©Ø¯Ø§.'
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
      'Ø®Ø¯Ù…Ø§Øª Ø§Ù„Ø·ÙˆØ§Ø±Ø¦ 24/7 Ù…Ø¹ Ù…Ø±Ø§ÙØ¹ Ø§Ù„Ø¹Ù†Ø§ÙŠØ© Ø§Ù„Ù…Ø±ÙƒØ²Ø© Ø§Ù„Ø­Ø¯ÙŠØ«Ø©. ØµØ­ØªÙƒ Ù‡ÙŠ Ø£ÙˆÙ„ÙˆÙŠØªÙ†Ø§.',
      'Ø§Ø³ØªØ´Ø§Ø±Ø§Øª Ø§Ù„Ø£Ø®ØµØ§Ø¦ÙŠÙŠÙ† Ù…ØªØ§Ø­Ø©: Ø£Ù…Ø±Ø§Ø¶ Ø§Ù„Ù‚Ù„Ø¨ØŒ Ø§Ù„Ø¹Ø¸Ø§Ù…ØŒ ÙˆØ·Ø¨ Ø§Ù„Ø£Ø·ÙØ§Ù„. Ø§Ø­Ø¬Ø² Ø¹Ø¨Ø± Ø§Ù„Ø¥Ù†ØªØ±Ù†Øª.',
      'Ø¨Ø§Ù‚Ø§Øª Ø§Ù„ÙØ­Øµ Ø§Ù„ØµØ­ÙŠ ØªØ¨Ø¯Ø£ Ø¨Ø£Ø³Ø¹Ø§Ø± Ù…Ø¹Ù‚ÙˆÙ„Ø©. ÙØ­Øµ Ø´Ø§Ù…Ù„ Ù„Ù„Ø¬Ø³Ù… Ù…ØªØ§Ø­.',
      'Ù‚Ø³Ù… Ø§Ù„ÙˆÙ„Ø§Ø¯Ø© Ø§Ù„Ø¬Ø¯ÙŠØ¯ Ù…Ø¹ Ø£Ø¬Ù†Ø­Ø© Ø®Ø§ØµØ©. Ø£Ø·Ø¨Ø§Ø¡ Ù†Ø³Ø§Ø¡ Ø°ÙˆÙˆ Ø®Ø¨Ø±Ø© Ù…ØªÙˆØ§Ø¬Ø¯ÙˆÙ†.',
      'Ù†Ù‚Ø¨Ù„ Ø¬Ù…ÙŠØ¹ Ø®Ø·Ø· Ø§Ù„ØªØ£Ù…ÙŠÙ† Ø§Ù„Ø±Ø¦ÙŠØ³ÙŠØ©. Ø®Ø¯Ù…Ø© Ø§Ù„Ø¹Ù„Ø§Ø¬ Ø¨Ø¯ÙˆÙ† Ù†Ù‚Ø¯ Ù…ØªØ§Ø­Ø©.'
    ],
    ku: [
      'Ø®Ø²Ù…Û•ØªÚ¯ÙˆØ²Ø§Ø±ÛŒ Ú¾Ø§ØªÙˆÚ†Û† 24/7 Ù„Û•Ú¯Û•Úµ Ø¦Û†ØªÛŽÙ„Û•Ú©Ø§Ù†ÛŒ ICU ÛŒ Ø¦Û•Ù…Ø±ÛŒ. ØªÛ•Ù†Ø¯Ø±ÙˆØ³ØªÛŒ ØªÛ•Ø±Ø¬ÛŒØ­ÛŒ Ø¦ÛŽÙ…Û•ÛŒÛ•.',
      'ÙˆØªØ§Ø±Û•Ú©Ø§Ù†ÛŒ Ù¾Ø²ÛŒØ´Ú©ÛŒ ØªØ§ÛŒØ¨Û•ØªÛŒ Ø¨Û•Ø±Ø¯Û•Ø³ØªÙ†: Ø¯ÚµØŒ Ø¦ÛŽØ³Ú© Ùˆ Ù…Ù†Ø¯Ø§ÚµØ¨ÙˆÙˆÙ†. Ù„Û•Ø³Û•Ø±Ú¾ÛŽÚµ Ø¯Ø§ÙˆØ§Ø¨Ú©Û•.',
      'Ù¾Ø§Ú©ÛŽØ¬ÛŒ Ù¾Ø´Ú©Ù†ÛŒÙ†ÛŒ ØªÛ•Ù†Ø¯Ø±ÙˆØ³ØªÛŒ Ø¨Û• Ù†Ø±Ø®ÛŽÚ©ÛŒ Ú¯ÙˆÙ†Ø¬Ø§Ùˆ Ø¯Û•Ø³ØªÙ¾ÛŽØ¯Û•Ú©Ø§Øª. Ù¾Ø´Ú©Ù†ÛŒÙ†ÛŒ ØªÛ•ÙˆØ§ÙˆÛŒ Ù„Û•Ø´ Ø¨Û•Ø±Ø¯Û•Ø³ØªÛ•.',
      'Ø¨Û•Ø´ÛŒ Ù…Ù†Ø¯Ø§ÚµØ¨ÙˆÙˆÙ†ÛŒ Ù†ÙˆÛŽ Ù„Û•Ú¯Û•Úµ Ú˜ÙˆÙˆØ±ÛŒ ØªØ§ÛŒØ¨Û•Øª. Ù¾Ø²ÛŒØ´Ú©Ø§Ù†ÛŒ Ø¦ÛŽÚ©Ø³Ù¾ÛŽØ±ØªÛŒ Ú˜Ù†Ø§Ù† Ù„Û• Ù¾Û•ÛŒÙˆÛ•Ù†Ø¯ÛŒØ¯Ø§Ù†.',
      'Ú¾Û•Ù…ÙˆÙˆ Ù¾Ù„Ø§Ù†Û• Ø³Û•Ø±Û•Ú©ÛŒÛŒÛ•Ú©Ø§Ù†ÛŒ Ø¨ÛŒÙ…Û• ÙˆÛ•Ø±Ø¯Û•Ú¯Ø±ÛŒÙ†. Ø®Ø²Ù…Û•ØªÚ¯ÙˆØ²Ø§Ø±ÛŒ Ú†Ø§Ø±Û•Ø³Û•Ø±ÛŒ Ø¨ÛŽ Ù¾Ø§Ø±Û• Ø¨Û•Ø±Ø¯Û•Ø³ØªÛ•.'
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
      'Ù…ÙˆØ§Ø¹ÙŠØ¯ ÙÙŠ Ù†ÙØ³ Ø§Ù„ÙŠÙˆÙ… Ù…ØªØ§Ø­Ø©. Ø§Ø³ØªÙ‚Ø¨Ø§Ù„ Ø§Ù„Ø²ÙˆØ§Ø± Ù…Ø¨Ø§Ø´Ø±Ø© Ù„Ù„Ø­Ø§Ù„Ø§Øª Ø§Ù„Ø¨Ø³ÙŠØ·Ø©.',
      'ÙØ­ÙˆØµØ§Øª Ùˆ ØªÙ†Ø¸ÙŠÙ Ø§Ù„Ø£Ø³Ù†Ø§Ù† Ø¨Ù†ØµÙ Ø§Ù„Ø³Ø¹Ø± Ù‡Ø°Ø§ Ø§Ù„Ø´Ù‡Ø± ÙÙ‚Ø·.',
      'Ø¹ÙŠØ§Ø¯Ø© Ø§Ù„Ø£Ø·ÙØ§Ù„ Ù…ÙØªÙˆØ­Ø© Ø£ÙŠØ§Ù… Ø§Ù„Ø³Ø¨Øª. ØªØ·Ø¹ÙŠÙ…Ø§Øª ÙˆÙ…ØªØ§Ø¨Ø¹Ø© Ø§Ù„Ù†Ù…Ùˆ.',
      'Ø¬Ù„Ø³Ø§Øª Ø§Ù„Ø¹Ù„Ø§Ø¬ Ø§Ù„Ø·Ø¨ÙŠØ¹ÙŠ Ù…ØªØ§Ø­Ø© Ø§Ù„Ø¢Ù†. Ø£Ø®ØµØ§Ø¦ÙŠÙˆÙ† Ù…Ø¤Ù‡Ù„ÙˆÙ† ÙÙŠ Ø§Ù„ÙØ±ÙŠÙ‚.',
      'ØªØ­Ø§Ù„ÙŠÙ„ Ù…Ø®ØªØ¨Ø±ÙŠØ© Ø¨Ù†ØªØ§Ø¦Ø¬ Ø³Ø±ÙŠØ¹Ø©. ÙØ­ÙˆØµØ§Øª Ø§Ù„Ø¯Ù…ØŒ Ø§Ù„Ø£Ø´Ø¹Ø© Ø§Ù„Ø³ÙŠÙ†ÙŠØ©ØŒ ÙˆØ§Ù„Ø£Ù„ØªØ±Ø§Ø³Ø§ÙˆÙ†Ø¯ Ù…ØªØ§Ø­Ø©.'
    ],
    ku: [
      'Ú†Ø§Ø±Û•Ø³Û•Ø±ÛŒ Ú¾Û•Ù…Ø§Ù† Ú•Û†Ú˜ Ø¨Û•Ø±Ø¯Û•Ø³ØªÛ•. Ø¨Û† Ù†Û•Ø®Û†Ø´ÛŒÛŒÛ• Ø¨Ú†ÙˆÙˆÚ©Û•Ú©Ø§Ù† Ø¨Û•Ø®ÛŽØ±Ø§ÛŒÛŒ Ù‚Ø¨ÙˆÚµ Ø¯Û•Ú©Ø±ÛŽÙ†.',
      'Ù¾Ø´Ú©Ù†ÛŒÙ† Ùˆ Ù¾Ø§Ú©Ú©Ø±Ø¯Ù†Û•ÙˆÛ•ÛŒ Ø¯Ø¯Ø§Ù† Ù„Û•Ú¯Û•Úµ Ù†ÛŒÙˆÛ• Ù†Ø±Ø® Ø¦Û•Ù… Ù…Ø§Ù†Ú¯Û• ØªÛ•Ù†Ù‡Ø§.',
      'Ù†Û•Ø®Û†Ø´Ø®Ø§Ù†Û•ÛŒ Ù…Ù†Ø¯Ø§ÚµØ§Ù† Ù„Û• Ø´Û•Ù…Ù…Û• Ú©Ø±Ø§ÙˆÛ•ÛŒÛ•. Ú¤Ø§Ú©Ø³ÛŒÙ† Ùˆ Ú†Ø§ÙˆØ¯ÛŽØ±ÛŒ Ú¯Û•Ø´Û•Ø³Û•Ù†Ø¯Ù†.',
      'Ø¯Ø§Ù…Û•Ø²Ø±Ø§Ù†Ø¯Ù†ÛŒ ÙÛŽØ²ÛŒÛ†ØªÛŽØ±Ø§Ù¾ÛŒ Ø¦ÛŽØ³ØªØ§ Ù¾ÛŽØ´Ú©Û•Ø´ Ø¯Û•Ú©Ø±ÛŽØª. Ú†Ø§Ø±Û•Ø³Ø§Ø²Ø§Ù†ÛŒ Ø¦ÛŽÚ©Ø³Ù¾ÛŽØ± Ù„Û• Ú©Ø§Ø±Ù…Û•Ù†Ø¯ÛŒØ¯Ø§Ù†.',
      'ØªØ§Ù‚ÛŒÚ©Ø±Ø¯Ù†Û•ÙˆÛ•ÛŒ ØªØ§Ù‚ÛŒÚ¯Û• Ø¨Û• Ø¦Û•Ù†Ø¬Ø§Ù…ÛŒ Ø®ÛŽØ±Ø§. Ø®ÙˆÛŽÙ†ØŒ X-ray Ùˆ Ø¦Ø§ÚµØªØ±Ø§Ø³Ø§ÙˆÙ†Ø¯ Ø¨Û•Ø±Ø¯Û•Ø³ØªÛ•.'
    ]
  },
  doctor: {
    en: [
      'Board-certified specialist with 15+ years experience. Accepting new patients.',
      'Second opinion consultations available. Bring your medical records.',
      'Telemedicine appointments via video call. Stay home, stay safe.',
      'Evening clinic hours: 5 PM â€“ 9 PM, Monday through Thursday.',
      'Home visits for elderly and disabled patients. Call to schedule.'
    ],
    ar: [
      'Ø£Ø®ØµØ§Ø¦ÙŠ Ù…Ø¹ØªÙ…Ø¯ Ø¨Ø®Ø¨Ø±Ø© 15+ Ø³Ù†Ø©. Ù†Ù‚Ø¨Ù„ Ù…Ø±Ø¶Ù‰ Ø¬Ø¯Ø¯.',
      'Ø§Ø³ØªØ´Ø§Ø±Ø§Øª Ø±Ø£ÙŠ Ø«Ø§Ù†Ù Ù…ØªØ§Ø­Ø©. Ø§Ø¬Ù„Ø¨ Ø³Ø¬Ù„Ø§ØªÙƒ Ø§Ù„Ø·Ø¨ÙŠØ©.',
      'Ù…ÙˆØ§Ø¹ÙŠØ¯ Ø·Ø¨ÙŠØ© Ø¹Ù† Ø¨Ø¹Ø¯ Ø¹Ø¨Ø± Ù…ÙƒØ§Ù„Ù…Ø© Ø§Ù„ÙÙŠØ¯ÙŠÙˆ. Ø§Ø¨Ù‚ÙŽ ÙÙŠ Ø§Ù„Ù…Ù†Ø²Ù„ØŒ Ø§Ø¨Ù‚ÙŽ Ø¢Ù…Ù†Ø§Ù‹.',
      'Ø³Ø§Ø¹Ø§Øª Ø§Ù„Ø¹ÙŠØ§Ø¯Ø© Ø§Ù„Ù…Ø³Ø§Ø¦ÙŠØ©: 5 Ù…Ø³Ø§Ø¡Ù‹ â€“ 9 Ù…Ø³Ø§Ø¡Ù‹ØŒ Ù…Ù† Ø§Ù„Ø§Ø«Ù†ÙŠÙ† Ø¥Ù„Ù‰ Ø§Ù„Ø®Ù…ÙŠØ³.',
      'Ø²ÙŠØ§Ø±Ø§Øª Ù…Ù†Ø²Ù„ÙŠØ© Ù„Ù„Ù…Ø±Ø¶Ù‰ Ø§Ù„Ù…Ø³Ù†ÙŠÙ† ÙˆØ°ÙˆÙŠ Ø§Ù„Ø¥Ø¹Ø§Ù‚Ø©. Ø§ØªØµÙ„ Ù„ØªØ­Ø¯ÙŠØ¯ Ù…ÙˆØ¹Ø¯.'
    ],
    ku: [
      'Ù¾Ø²ÛŒØ´Ú©ÛŒ ØªØ§ÛŒØ¨Û•ØªÛŒ Ù¾Û•Ø³Û•Ù†Ø¯Ú©Ø±Ø§Ùˆ Ù„Û•Ú¯Û•Úµ 15+ Ø³Ø§Úµ Ø¦Û•Ø²Ù…ÙˆÙˆÙ†. Ù†Û•Ø®Û†Ø´ÛŒ Ù†ÙˆÛŽ ÙˆÛ•Ø±Ø¯Û•Ú¯Ø±ÛŒÙ†.',
      'ÙˆØªØ§Ø±Û•Ú©Ø§Ù†ÛŒ Ú•Ø§ÛŒ Ø¯ÙˆÙˆÛ•Ù… Ø¨Û•Ø±Ø¯Û•Ø³ØªÛ•. ØªÛ†Ù…Ø§Ø±Û•Ú©Ø§Ù†ÛŒ Ù¾Ø²ÛŒØ´Ú©ÛŒ Ø®Û†Øª Ø¨ÛŽÙ†Û•.',
      'Ú†Ø§Ø±Û•Ø³Û•Ø±ÛŒ ØªÛ•Ù„Û•Ù…ÛŒØ²ÛŒÙ†ÛŒ Ú•Ø§Ø³ØªÛ•ÙˆØ®Û†. Ù„Û• Ù…Ø§ÚµÛ•ÙˆÛ• Ø¨Ù…ÛŽÙ†Û•ÙˆÛ•ØŒ Ø³Û•Ù„Ø§Ù…Û•Øª Ø¨Ù…ÛŽÙ†Û•ÙˆÛ•.',
      'Ú©Ø§ØªÚ˜Ù…ÛŽØ±ÛŒ Ù†Û•Ø®Û†Ø´Ø®Ø§Ù†Û•ÛŒ Ø¦ÛŽÙˆØ§Ø±Û•: 5 Ø¦ÛŽÙˆØ§Ø±Û• â€“ 9 Ø¦ÛŽÙˆØ§Ø±Û•ØŒ Ø¯ÙˆØ´Ù†ÛŽÙ† ØªØ§ Ù¾ÛŽÙ†Ø¬Ø´Û•Ù…Ù…Û•.',
      'Ø³Û•Ø±Ø¯Ø§Ù†ÛŒ Ù…Ø§Úµ Ø¨Û† Ù†Û•Ø®Û†Ø´Ø§Ù†Û• Ù¾ÛŒØ± Ùˆ Ú©Û•Ù… ØªÙˆØ§Ù†Ø§. Ù¾Û•ÛŒÙˆÛ•Ù†Ø¯ÛŒ Ø¨Ú©Û• Ø¨Û† Ø¯Ø§Ù†Ø§Ù†ÛŒ Ú©Ø§Øª.'
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
      'Ø¨Ø§Ù‚Ø§Øª ØªØ¬Ø¯ÙŠØ¯ Ø§Ù„Ø§Ø¨ØªØ³Ø§Ù…Ø© Ù…ØªØ§Ø­Ø© Ø§Ù„Ø¢Ù†. ØªØ¨ÙŠÙŠØ¶ØŒ Ù‚Ø´ÙˆØ±ØŒ Ùˆ ØªÙ‚ÙˆÙŠÙ… Ø§Ù„Ø£Ø³Ù†Ø§Ù†.',
      'Ø¹Ù„Ø§Ø¬ Ø¹ØµØ¨ Ø§Ù„Ø£Ø³Ù†Ø§Ù† Ø¨Ø¯ÙˆÙ† Ø£Ù„Ù… Ø¨Ø§Ø³ØªØ®Ø¯Ø§Ù… Ø£Ø­Ø¯Ø« Ø§Ù„ØªÙ‚Ù†ÙŠØ§Øª. Ø§Ø­Ø¬Ø² Ù…ÙˆØ¹Ø¯Ùƒ.',
      'Ø±Ø¹Ø§ÙŠØ© Ø£Ø³Ù†Ø§Ù† Ø§Ù„Ø£Ø·ÙØ§Ù„: Ø¨ÙŠØ¦Ø© ÙˆØ¯ÙˆØ¯Ø©ØŒ Ù†Ù‡Ø¬ Ù„Ø·ÙŠÙ. Ø£ÙˆÙ„ Ø²ÙŠØ§Ø±Ø© Ù…Ø¬Ø§Ù†ÙŠØ© ØªØ­Øª 5 Ø³Ù†ÙˆØ§Øª.',
      'Ø®Ø¯Ù…Ø© Ø·ÙˆØ§Ø±Ø¦ Ø§Ù„Ø£Ø³Ù†Ø§Ù† 7 Ø£ÙŠØ§Ù… ÙÙŠ Ø§Ù„Ø£Ø³Ø¨ÙˆØ¹. Ø³Ù† Ù…ÙƒØ³ÙˆØ±ØŸ Ù†Ø­Ù† Ù†ØºØ·ÙŠÙƒ.',
      'Ø§Ø³ØªØ´Ø§Ø±Ø§Øª Invisalign Ù…Ø¬Ø§Ù†ÙŠØ© Ù‡Ø°Ø§ Ø§Ù„Ø´Ù‡Ø±. Ø±ØªÙ‘Ø¨ Ø£Ø³Ù†Ø§Ù†Ùƒ Ø¨Ø³Ø±ÙŠØ©.'
    ],
    ku: [
      'Ù¾Ø§Ú©ÛŽØ¬ÛŒ Ù†ÙˆÛŽÚ©Ø±Ø¯Ù†Û•ÙˆÛ•ÛŒ Ù¾ÛŽÚ©Û•Ù†ÛŒÙ† Ø¦ÛŽØ³ØªØ§ Ù„Û•Ø¨Û•Ø±Ø¯Û•Ø³ØªÛ•. Ø³Ù¾ÛŒ Ú©Ø±Ø¯Ù†Û•ÙˆÛ•ØŒ Ú¤ÛŒÙ†ÛŽØ± Ùˆ Ø¯Û•Ø±Ø²ÛŒÙ†.',
      'Ú†Ø§Ø±Û•Ø³Û•Ø±ÛŒ Ú•Û•Ú¯ÛŒ Ø¯Ø¯Ø§Ù† Ø¨Û•Ø¨ÛŽ Ø¦Ø§Ø²Ø§Ø± Ø¨Û• Ø¨Û•Ú©Ø§Ø±Ú¾ÛŽÙ†Ø§Ù†ÛŒ Ù†ÙˆÛŽØªØ±ÛŒÙ† ØªÛ•Ú©Ù†Û•Ù„Û†Ú˜ÛŒØ§. Ú†Ø§Ø±Û•Ø³Û•Ø±ÛŒ Ø®Û†Øª Ø¯Ø§Ø¨Ù†ÛŽ.',
      'Ú†Ø§ÙˆØ¯ÛŽØ±ÛŒ Ø¯Ø¯Ø§Ù†ÛŒ Ù…Ù†Ø¯Ø§ÚµØ§Ù†: Ú˜ÛŒÙ†Ú¯Û•ÛŒÛ•Ú©ÛŒ Ø¯Û†Ø³ØªØ§Ù†Û•ØŒ Ú•ÛŽÚ¯Û•ÛŒÛ•Ú©ÛŒ Ù†Û•Ø±Ù…. ÛŒÛ•Ú©Û•Ù… Ø³Û•Ø±Ø¯Ø§Ù† Ø¨ÛŽ Ø¨Û•Ø±Ø§Ù…Ø¨Û•Ø±Û• Ø¨Û† Ø®ÙˆØ§Ø±ÛŽ 5 Ø³Ø§Úµ.',
      'Ø®Ø²Ù…Û•ØªÚ¯ÙˆØ²Ø§Ø±ÛŒ Ø¯Ø¯Ø§Ù†ÛŒ ÙÛ•ÙˆØ§Ø±ÛŒ 7 Ú•Û†Ú˜ Ù„Û• Ú¾Û•ÙØªÛ•ÛŒÛ•Ú©Ø¯Ø§. Ø¯Ø¯Ø§Ù†ÛŒ Ø´Ú©Ø§ÙˆØŸ Ø¦ÛŽÙ…Û• Ø¯Û•ÛŒÙ¾Ø§Ø±ÛŽØ²ÛŒÙ†.',
      'ÙˆØªØ§Ø±Û•Ú©Ø§Ù†ÛŒ Invisalign Ø¨ÛŽ Ø¨Û•Ø±Ø§Ù…Ø¨Û•Ø±Û• Ø¦Û•Ù… Ù…Ø§Ù†Ú¯Û•. Ø¯Ø¯Ø§Ù†ÛŒ Ø®Û†Øª Ø¨Û• Ù†Ù‡ÛŽÙ†ÛŒ Ú•ÛŽÚ©Ø¨Ø®Û•.'
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
      'Ù…Ø¬Ù…ÙˆØ¹Ø© Ø£Ù„ÙˆØ§Ù† Ø´Ø¹Ø± Ø¬Ø¯ÙŠØ¯Ø© ÙˆØµÙ„Øª! Ø¨Ø§Ù„Ø§ÙŠØ§Ø¬ØŒ Ø£ÙˆÙ…Ø¨Ø±ÙŠØŒ ÙˆØ£Ù„ÙˆØ§Ù† Ù†Ø§Ø¨Ø¶Ø© Ø¨Ø§Ù„Ø­ÙŠØ§Ø©.',
      'Ø¨Ø§Ù‚Ø§Øª Ø§Ù„Ø¹Ø±ÙˆØ³: Ø´Ø¹Ø±ØŒ Ù…ÙƒÙŠØ§Ø¬ØŒ ÙˆØ­Ù†Ø©. Ø§Ø­Ø¬Ø² Ø¨Ø§Ù‚Ø© ÙŠÙˆÙ…Ùƒ Ø§Ù„Ø®Ø§Øµ.',
      'Ø§Ù„Ø¹Ù†Ø§ÙŠØ© Ø¨Ø§Ù„Ø±Ø¬Ø§Ù„: Ù‚ØµØ§ØªØŒ ØªØ´Ø°ÙŠØ¨ Ø§Ù„Ù„Ø­ÙŠØ©ØŒ ÙˆØ­Ù„Ø§Ù‚Ø© Ù…Ù†Ø´ÙØ© Ø³Ø§Ø®Ù†Ø©.',
      'Ù„ÙŠÙ„Ø© Ø§Ù„Ø³ÙŠØ¯Ø§Øª ÙƒÙ„ Ø£Ø±Ø¨Ø¹Ø§Ø¡: 20% Ø®ØµÙ… Ø¹Ù„Ù‰ Ø¬Ù…ÙŠØ¹ Ø§Ù„Ø®Ø¯Ù…Ø§Øª Ø¨Ø¹Ø¯ Ø§Ù„Ø³Ø§Ø¹Ø© 6 Ù…Ø³Ø§Ø¡Ù‹.',
      'ÙÙ† Ø§Ù„Ø£Ø¸Ø§ÙØ± Ø§Ù„Ø§Ø­ØªØ±Ø§ÙÙŠ ÙˆØ³Ø¨Ø§ Ø§Ù„Ø£Ø¸Ø§ÙØ±. Ø¬ÙŠÙ„ ÙˆØ£ÙƒØ±ÙŠÙ„ÙŠÙƒ Ù…ØªØ§Ø­.'
    ],
    ku: [
      'Ú©Û†Ù„ÛŽÚ©Ø´Ù†ÛŒ Ú•Û•Ù†Ú¯ÛŒ Ù‚Ú˜ÛŒ Ù†ÙˆÛŽ Ú¯Û•ÛŒØ´Øª! Ø¨Ø§Ù„Ø§ÛŒØ§Ø¬ØŒ Ø¦Û†Ù…Ø¨Ú•Û• Ùˆ Ú•Û•Ù†Ú¯ÛŒ Ø²ÛŒÙ†Ø¯ÙˆÙˆ.',
      'Ù¾Ø§Ú©ÛŽÚ˜ÛŒ Ø¨Û•Ú•Û†Ú˜Ú¯Ø§Ø±ÛŒ: Ù‚Ú˜ØŒ Ø¦Ø§Ø±Ø§ÛŒØ´ Ùˆ Ø­Û•Ù†Û•. Ø¨Û† Ú•Û†Ú˜ÛŒ ØªØ§ÛŒØ¨Û•ØªÛŒ Ø®Û†Øª Ø¯Ø§Ø¨Ù†ÛŽ.',
      'Ø®Ø²Ù…Û•ØªÚ¯ÙˆØ²Ø§Ø±ÛŒ Ù¾ÛŒØ§ÙˆØ§Ù†: Ø¨Ú•ÛŒÙ†ØŒ Ú•Ø´ØªÙ†ÛŒ Ú•ÛŒØ´ Ùˆ Ø®å·ÛŒÙ†ÛŒ Ú¯Û•Ø±Ù….',
      'Ø´Û•ÙˆÛŽ Ø¦Ø§ÙØ±Û•ØªØ§Ù† Ú¾Û•Ø± Ú†ÙˆØ§Ø±Ø´Û•Ù…Ù…Û•: 20% Ø¯Ø§Ø´Ú©Ø§Ù† Ø¨Û† Ú¾Û•Ù…ÙˆÙˆ Ø®Ø²Ù…Û•ØªÚ¯ÙˆØ²Ø§Ø±ÛŒÛ•Ú©Ø§Ù† Ø¯ÙˆØ§ÛŒ 6 Ø¦ÛŽÙˆØ§Ø±Û•.',
      'Ù†Û•Ø®Ø´Û•ÛŒ Ù†Ø§Ø®Û†Ù†ÛŒ Ù¾ÛŒØ´Û•ÛŒÛŒ Ùˆ Ø³Ù¾Ø§. Ø¬ÛŽÙ„ Ùˆ Ø¯Ø±ÛŽÚ˜Ú©Ø±Ø¯Ù†Û•ÙˆÛ•ÛŒ Ø¦Ø§Ú©Ø±Ù„ÛŒÚ© Ø¨Û•Ø±Ø¯Û•Ø³ØªÛ•.'
    ]
  },
  gym: {
    en: [
      'Summer body challenge starts Monday! Sign up and get 1 free PT session.',
      'New equipment installed: cable machines, squat racks, and rowing stations.',
      'Ladies-only hours: 7 AM â€“ 12 PM daily. Private training area available.',
      'Protein bar and shake station now open. Refuel after your workout.',
      'Group classes: yoga, spinning, HIIT, and boxing. Check the weekly schedule.'
    ],
    ar: [
      'ØªØ­Ø¯ÙŠ Ø¬Ø³Ù… Ø§Ù„ØµÙŠÙ ÙŠØ¨Ø¯Ø£ Ø§Ù„Ø§Ø«Ù†ÙŠÙ†! Ø³Ø¬Ù‘Ù„ ÙˆØ§Ø­ØµÙ„ Ø¹Ù„Ù‰ Ø¬Ù„Ø³Ø© ØªØ¯Ø±ÙŠØ¨ Ø´Ø®ØµÙŠ Ù…Ø¬Ø§Ù†ÙŠØ©.',
      'Ù…Ø¹Ø¯Ø§Øª Ø¬Ø¯ÙŠØ¯Ø© ØªÙ… ØªØ±ÙƒÙŠØ¨Ù‡Ø§: Ø£Ø¬Ù‡Ø²Ø© ÙƒØ§Ø¨Ù„ØŒ Ø£Ø±ÙØ¹ Ø§Ù„Ù‚Ø±ÙØµØ§Ø¡ØŒ ÙˆÙ…Ø­Ø·Ø§Øª Ø§Ù„ØªØ¬Ø¯ÙŠÙ.',
      'Ø³Ø§Ø¹Ø§Øª Ø§Ù„Ø³ÙŠØ¯Ø§Øª ÙÙ‚Ø·: 7 ØµØ¨Ø§Ø­Ø§Ù‹ â€“ 12 Ø¸Ù‡Ø±Ø§Ù‹ ÙŠÙˆÙ…ÙŠØ§Ù‹. Ù…Ù†Ø·Ù‚Ø© ØªØ¯Ø±ÙŠØ¨ Ø®Ø§ØµØ© Ù…ØªØ§Ø­Ø©.',
      'Ù…Ø­Ø·Ø© Ø§Ù„Ø¨Ø±ÙˆØªÙŠÙ† ÙˆØ§Ù„Ø´ÙŠÙƒ Ø§Ù„Ø¢Ù† Ù…ÙØªÙˆØ­Ø©. Ø£Ø¹Ø¯ Ø§Ù„ØªØºØ°ÙŠØ© Ø¨Ø¹Ø¯ ØªÙ…Ø±ÙŠÙ†Ùƒ.',
      'Ø¯Ø±ÙˆØ³ Ø¬Ù…Ø§Ø¹ÙŠØ©: ÙŠÙˆØºØ§ØŒ Ø³Ø¨ÙŠÙ†ÙŠÙ†ØºØŒ HIITØŒ ÙˆÙ…Ù„Ø§ÙƒÙ…Ø©. ØªØ­Ù‚Ù‚ Ù…Ù† Ø§Ù„Ø¬Ø¯ÙˆÙ„ Ø§Ù„Ø£Ø³Ø¨ÙˆØ¹ÙŠ.'
    ],
    ku: [
      'Ø¨Û•Ø±Ù†Ø§Ù…Û•ÛŒ Ù„Û•Ø´ÛŽ Ø¨Û•Ú¾Ø§Ø±ÛŒ Ù„Û• Ø¯ÙˆÙˆØ´Û•Ù…Ù…Û• Ø¯Û•Ø³ØªÙ¾ÛŽØ¯Û•Ú©Ø§Øª! ØªÛ†Ù…Ø§Ø± Ø¨Ú©Û• Ùˆ 1 Ø¬Û•Ù„Ø³ÛŒ Ú•Ø§Ù‡ÛŽÙ†Ø§Ù†ÛŒ ØªØ§ÛŒØ¨Û•ØªÛŒ Ø¨Û•Ø®Û†Ú•Ø§ÛŒÛŒ ÙˆÛ•Ø±Ú¯Ø±Û•.',
      'Ø¦Ø§Ù…Ø±Ø§Ø²ÛŒ Ù†ÙˆÛŽ Ø¯Ø§Ù…Û•Ø²Ø±ÛŽÙ†Ø±Ø§: Ø¦Ø§Ù…ÛŽØ±ÛŒ Ú©Û•Ø¨Ù„ØŒ Ø³ØªØ§Ù†Ø¯Û•Ú©Ø§Ù†ÛŒ Ø³Ú©ÙˆØ§Øª Ùˆ Ø´Û•Ù¾Û†Ù„ÛŽÙ†.',
      'Ú©Ø§ØªÚ˜Ù…ÛŽØ±ÛŒ ØªÛ•Ù†Ù‡Ø§ Ø¦Ø§ÙØ±Û•ØªØ§Ù†: 7 Ø¨Û•ÛŒØ§Ù†ÛŒ â€“ 12 Ù†ÛŒÙˆÛ•Ú•Û† Ú•Û†Ú˜Ø§Ù†Û•. Ù†Ø§ÙˆÚ†Û•ÛŒ Ú•Ø§Ù‡ÛŽÙ†Ø§Ù†ÛŽÚ©ÛŒ ØªØ§ÛŒØ¨Û•Øª Ø¨Û•Ø±Ø¯Û•Ø³ØªÛ•.',
      'Ø¨Û•Ø´ÛŒ Ø¨Û•Ø±ÛŒ Ù¾Ú•Û†ØªÛŒÙ† Ùˆ Ø´ÛŒÚ© Ø¦ÛŽØ³ØªØ§ Ú©Ø±Ø§ÙˆÛ•ÛŒÛ•. Ø¯ÙˆØ§ÛŒ Ú•Ø§Ù‡ÛŽÙ†Ø§Ù†Û•Ú©Û•Øª Ø®Û†Ø±Ø§Ú©ÛŒ Ø¨Û•Ú©Ø§Ø±Ø¯Û•Ú¾ÛŽÙ†Û•.',
      'Ù¾Û†Ù„Û• Ú©Û†Ù…Û•ÚµØ§ÛŒÛ•ØªÛŒÛ•Ú©Ø§Ù†: ÛŒÛ†Ú¯Ø§ØŒ Ø³Ù¾ÛŒÙ†ÛŒÙ†Ú¯ØŒ HIIT Ùˆ Ø¨ÙˆÚ©Ø³ÛŒÙ†Ú¯. Ø¨Û•Ù†Ø¯Û•Ø±ÛŒ Ú¾Û•ÙØªÛ•ÛŒÛ•Ú©Û• Ø¨Ø¨ÛŒÙ†Û•.'
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
      'Ø¨Ø§Ù‚Ø§Øª Ø§Ù„Ø¥Ù‚Ø§Ù…Ø© Ø§Ù„Ø¯Ø§Ø®Ù„ÙŠØ© ØªØ¨Ø¯Ø£ Ù…Ù† 49$ Ù„Ù„ÙŠÙ„Ø©. Ù…Ø³Ø¨Ø­ØŒ Ø³Ø¨Ø§ØŒ ÙˆØ¥ÙØ·Ø§Ø± Ù…Ø´Ù…ÙˆÙ„.',
      'Ù…Ø³Ø§ÙØ± Ù„Ù„Ø£Ø¹Ù…Ø§Ù„ØŸ Ø§Ø³ØªÙ…ØªØ¹ Ø¨ÙˆØ§ÙŠ ÙØ§ÙŠ ÙØ§Ø¦Ù‚ Ø§Ù„Ø³Ø±Ø¹Ø©ØŒ ØºØ±Ù Ø§Ø¬ØªÙ…Ø§Ø¹Ø§ØªØŒ ÙˆÙ…ÙˆØ§ØµÙ„Ø§Øª Ø§Ù„Ù…Ø·Ø§Ø±.',
      'Ø­Ø¬ÙˆØ²Ø§Øª Ù‚Ø§Ø¹Ø§Øª Ø§Ù„Ø£Ø¹Ø±Ø§Ø³ Ù…ÙØªÙˆØ­Ø© Ù„Ø¹Ø§Ù… 2025. ØµØ§Ù„Ø§Øª Ø£Ù†ÙŠÙ‚Ø© ÙˆØ§Ù„ÙˆÙ„Ø§Ø¦Ù… Ù…Ø´Ù…ÙˆÙ„Ø©.',
      'Ø¨ÙˆÙÙŠÙ‡ Ø§Ù„Ø¹Ø§Ø¦Ù„Ø© Ù†Ù‡Ø§ÙŠØ© Ø§Ù„Ø£Ø³Ø¨ÙˆØ¹: Ù…Ø·Ø¨Ø® Ø¯ÙˆÙ„ÙŠØŒ Ù…Ø­Ø·Ø§Øª Ø·Ù‡ÙŠ Ù…Ø¨Ø§Ø´Ø±ØŒ Ø§Ù„Ø£Ø·ÙØ§Ù„ ÙŠØ£ÙƒÙ„ÙˆÙ† Ù…Ø¬Ø§Ù†Ø§Ù‹.',
      'Ù„Ø§ÙˆÙ†Ø¬ Ø§Ù„Ø³Ø·Ø­ Ù…ÙØªÙˆØ­ Ø§Ù„Ø¢Ù†. Ø¥Ø·Ù„Ø§Ù„Ø§Øª Ø§Ù„ØºØ±ÙˆØ¨ØŒ ÙƒÙˆÙƒØªÙŠÙ„Ø§ØªØŒ ÙˆØ´ÙŠØ´Ø© ÙŠÙˆÙ…ÙŠØ§Ù‹ Ù…Ù† 6 Ù…Ø³Ø§Ø¡Ù‹.'
    ],
    ku: [
      'Ù¾Ø§Ú©ÛŽØ¬ÛŒ Ù…Ø§Ù†Û•ÙˆÛ• Ù„Û• Ø´Ø§Ø±Û•ÙˆÛ• Ù„Û• 49$/Ø´Û•Ùˆ Ø¯Û•Ø³ØªÙ¾ÛŽØ¯Û•Ú©Ø§Øª. Ø­Û•ÙˆØ´Û•ØŒ Ø³Ù¾Ø§ Ùˆ Ø¨Û•ÛŒØ§Ù†ÛŒ Ù„Û•Ú¯Û•ÚµÛ•.',
      'Ú¯Û•Ø´ØªÛŒØ§Ø±ÛŒ Ú©Ø§Ø±ØŸ Ø®Û†Ø´ÛŒ Ø¨Ú¯Ø±Û• Ù„Û• ÙˆØ§ÛŒ ÙØ§ÛŒ Ø®ÛŽØ±Ø§ØŒ Ú˜ÙˆÙˆØ±ÛŒ Ú©Û†Ø¨ÙˆÙˆÙ†Û•ÙˆÛ• Ùˆ Ø´Û†ÙÛŽØ±ÛŒ ÙÚ•Û†Ú©Û•Ø®Ø§Ù†Û•.',
      'Ø¯Ø§ÙˆØ§Ú©Ø±Ø¯Ù†ÛŒ Ø´ÙˆÛŽÙ†ÛŒ Ø¨Ø§Ú˜ÛŽÚ•ÛŒ Ø¹Û•Ú•ÙˆØ³ÛŒ Ø¨Û† 2025 Ú©Ø±Ø§ÙˆÛ•ÛŒÛ•. ØªØ§Ù„Ø§Ø±Û• Ø´ÛŽÙˆØ§Ø²Û•Ú©Ø§Ù† Ùˆ Ø®Ø²Ù…Û•ØªÚ¯ÙˆØ²Ø§Ø±ÛŒ Ø®ÙˆØ§Ø±Ø¯Ù† Ù„Û•Ú¯Û•ÚµÛ•.',
      'Ø¨ÙˆÙÛŽÛŒ Ø®ÛŽØ²Ø§Ù†ÛŒ Ú¾Û•ÙØªÛ•: Ø®ÙˆØ§Ø±Ø¯Ù†ÛŒ Ù†ÛŽÙˆØ¯Û•ÙˆÚµÛ•ØªÛŒØŒ Ø³ØªØ§Ù†Ø¯Û•Ú©Ø§Ù†ÛŒ Ú†ÛŽØ´ØªÙ„ÛŽÙ†Ø§Ù†ÛŒ Ú•Ø§Ø³ØªÛ•ÙˆØ®Û†ØŒ Ù…Ù†Ø¯Ø§ÚµØ§Ù† Ø¨Û•Ø®Û†Ú•Ø§ÛŒÛŒ Ø¯Û•ÛŒØ®Û†Ù†.',
      'Ù„Ø§ÙˆÙ†Ø¬ÛŒ Ø³Û•Ø±Ø¨Ø§Ù† Ø¦ÛŽØ³ØªØ§ Ú©Ø±Ø§ÙˆÛ•ÛŒÛ•. Ø¯ÛŒÙ…Û•Ù†ÛŒ Ø®Û†Ø±Ø¦Ø§ÙˆØ§Ø¨ÙˆÙˆÙ†ØŒ Ú©ÙˆÚ©ØªÛŽÙ„ Ùˆ Ø´ÛŽØ´Û• Ú•Û†Ú˜Ø§Ù†Û• Ù„Û• 6 Ø¦ÛŽÙˆØ§Ø±Û•.'
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
      'Ø¨Ø§Ù‚Ø§Øª Ø§Ù„Ø¹Ø·Ù„Ø§Øª Ø§Ù„ØµÙŠÙÙŠØ© Ø¥Ù„Ù‰ ØªØ±ÙƒÙŠØ§ØŒ Ø¯Ø¨ÙŠØŒ ÙˆÙ…Ø§Ù„ÙŠØ²ÙŠØ§ Ø§Ù„Ø¢Ù† Ù„Ù„Ø­Ø¬Ø².',
      'Ø¨Ø§Ù‚Ø§Øª Ø§Ù„Ø¹Ù…Ø±Ø© ØªØ¨Ø¯Ø£ Ø¨Ø£Ø³Ø¹Ø§Ø± ØªÙ†Ø§ÙØ³ÙŠØ©. Ø§Ù„ØªØ£Ø´ÙŠØ±Ø© ÙˆØ§Ù„Ù…ÙˆØ§ØµÙ„Ø§Øª Ù…Ø´Ù…ÙˆÙ„ØªØ§Ù†.',
      'Ø®Ø¯Ù…Ø§Øª Ø¥Ø¯Ø§Ø±Ø© Ø§Ù„Ø³ÙØ± Ù„Ù„Ø´Ø±ÙƒØ§Øª. Ø­Ø¬ÙˆØ²Ø§Øª Ø¬Ù…Ø§Ø¹ÙŠØ© ÙˆØ±Ø­Ù„Ø§Øª ØªØ­ÙÙŠØ²ÙŠØ©.',
      'Ø­Ø²Ù… Ø§Ù„Ø·ÙŠØ±Ø§Ù† + Ø§Ù„ÙÙ†Ø¯Ù‚ Ø¨Ø®ØµÙ… 20% Ø¹Ù†Ø¯ Ø§Ù„Ø­Ø¬Ø² Ù…Ø¹Ø§Ù‹.',
      'Ø®Ø· Ø³Ø§Ø®Ù† Ù„Ø¯Ø¹Ù… Ø§Ù„Ø³ÙØ± 24/7. Ø£Ù…ØªØ¹Ø© Ù…ÙÙ‚ÙˆØ¯Ø©ØŸ Ø±Ø­Ù„Ø© Ù…Ù„ØºØ§Ø©ØŸ Ù†Ø­Ù† Ù†ØªØ¹Ø§Ù…Ù„ Ù…Ø¹Ù‡Ø§.'
    ],
    ku: [
      'Ù¾Ø§Ú©ÛŽØ¬ÛŒ Ú¤Ø§Ú©Ø§Ù†Ø³ÛŒ Ú¾Ø§ÙˆÛŒÙ† Ø¨Û† ØªÙˆØ±Ú©ÛŒØ§ØŒ Ø¯ÙˆØ¨Û•ÛŒ Ùˆ Ù…Ø§Ù„ÛŒØ²ÛŒØ§ Ø¦ÛŽØ³ØªØ§ Ø¯Û•Ú©Ø±ÛŽÙ†.',
      'Ù¾Ø§Ú©ÛŽØ¬ÛŒ Ø¹ÙˆÙ…Ú•Û• Ø¨Û• Ù†Ø±Ø®ÛŽÚ©ÛŒ Ù¾ÛŽØ´Ø¨Ú•Ú©ÛŽÙˆÛ•Ø±Ø§Ù†Û• Ø¯Û•Ø³ØªÙ¾ÛŽØ¯Û•Ú©Ø§Øª. Ú¤ÛŒØ²Ø§ Ùˆ Ú¯ÙˆØ§Ø³ØªÙ†Û•ÙˆÛ• Ù„Û•Ú¯Û•ÚµÛ•.',
      'Ø®Ø²Ù…Û•ØªÚ¯ÙˆØ²Ø§Ø±ÛŒ Ø¨Û•Ú•ÛŽÙˆÛ•Ø¨Ø±Ø¯Ù†ÛŒ Ú¯Û•Ø´ØªÛŒ Ú©Û†Ù…Ù¾Ø§Ù†ÛŒØ§. Ø¯Ø§ÙˆØ§Ú©Ø±Ø¯Ù†ÛŒ Ú©Û†Ù…Û•Úµ Ùˆ Ú¯Û•Ø´ØªÛŒ Ù¾Ø§Ø¯Ø§Ø´Øª.',
      'Ù¾Ø§Ú©ÛŽØ¬ÛŒ ÙÚ•ÛŒÙ† + Ú¾Û†ØªÛŽÙ„ Ø¨Û• 20% Ø¯Ø§Ø´Ú©Ø§Ù† Ú©Ø§ØªÛŽÚ© ÛŒÛ•Ú©ØªØ± Ø¯Ø§Ø¯Û•Ù†ÛŽÙ†.',
      'Ú¾ÛŽÚµÛŒ Ù¾Ø´ØªÚ¯ÛŒØ±ÛŒ Ú¯Û•Ø´Øª 24/7. Ø¨Ø§Ø± Ùˆ Ù‚Ø§Ù¾ÛŒ ÙˆÙ† Ø¨ÙˆÙˆÛ•ØŸ ÙÚ•Û†Ú©Û• Ú¾Û•ÚµÙˆÛ•Ø´ÛŽÙ†Ø±Ø§ÙˆÛ•ØªÛ•ÙˆÛ•ØŸ Ø¦ÛŽÙ…Û• Ú†Ø§Ø±Û•Ø³Û•Ø± Ø¯Û•Ú©Û•ÛŒÙ†.'
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
      'Ø§Ù„ØªØ³Ø¬ÙŠÙ„ Ù„Ù„ÙØµÙ„ Ø§Ù„Ø®Ø±ÙŠÙÙŠ Ù…ÙØªÙˆØ­ Ø§Ù„Ø¢Ù†. Ù…Ù†Ø­ Ø¯Ø±Ø§Ø³ÙŠØ© Ù…ØªØ§Ø­Ø© Ù„Ù„Ø·Ù„Ø§Ø¨ Ø§Ù„Ù…ØªÙ…ÙŠØ²ÙŠÙ†.',
      'Ø¨Ø±Ø§Ù…Ø¬ Ù…Ø§Ø¬Ø³ØªÙŠØ± Ø¬Ø¯ÙŠØ¯Ø© ÙÙŠ ØªÙƒÙ†ÙˆÙ„ÙˆØ¬ÙŠØ§ Ø§Ù„Ù…Ø¹Ù„ÙˆÙ…Ø§ØªØŒ Ø§Ù„Ø£Ø¹Ù…Ø§Ù„ØŒ ÙˆØ§Ù„Ù‡Ù†Ø¯Ø³Ø©. Ù‚Ø¯Ù‘Ù… Ù‚Ø¨Ù„ Ø§Ù„Ù…ÙˆØ¹Ø¯ Ø§Ù„Ù†Ù‡Ø§Ø¦ÙŠ.',
      'ÙŠÙˆÙ… Ù…ÙØªÙˆØ­ ÙÙŠ Ø§Ù„Ø­Ø±Ù… Ø§Ù„Ø¬Ø§Ù…Ø¹ÙŠ Ù‡Ø°Ø§ Ø§Ù„Ø³Ø¨Øª. Ø¬ÙˆÙ„Ø§ØªØŒ ÙˆØ±Ø´ Ø¹Ù…Ù„ØŒ ÙˆØ§Ù„ØªÙ‚Ø§Ø¡ Ø£Ø¹Ø¶Ø§Ø¡ Ø§Ù„Ù‡ÙŠØ¦Ø© Ø§Ù„ØªØ¯Ø±ÙŠØ³ÙŠØ©.',
      'ØµÙÙˆÙ Ù…Ø³Ø§Ø¦ÙŠØ© ÙˆÙ†Ù‡Ø§ÙŠØ© Ø§Ù„Ø£Ø³Ø¨ÙˆØ¹ Ù„Ù„Ù…Ù‡Ù†ÙŠÙŠÙ† Ø§Ù„Ø¹Ø§Ù…Ù„ÙŠÙ†. Ø¬Ø¯ÙˆÙ„Ø© Ù…Ø±Ù†Ø©.',
      'Ù…Ù†Ø­ Ø¨Ø­Ø«ÙŠØ© Ù…ØªØ§Ø­Ø©. Ø´Ø§Ø±Ùƒ Ù…Ø¹ Ù‚Ø§Ø¯Ø© Ø§Ù„ØµÙ†Ø§Ø¹Ø© ÙÙŠ Ù…Ø´Ø§Ø±ÙŠØ¹ Ù…Ø¨ØªÙƒØ±Ø©.'
    ],
    ku: [
      'ØªÛ†Ù…Ø§Ø±Ú©Ø±Ø¯Ù†ÛŒ Ø³ÛŽÙ…Ø³ØªÛ•Ø±ÛŒ Ù¾Ø§ÛŒØ²ÛŒ Ø¦ÛŽØ³ØªØ§ Ú©Ø±Ø§ÙˆÛ•ÛŒÛ•. Ø¨ÙˆØ±Ø³ÛŒ Ø®ÙˆÛŽÙ†Ø¯Ù† Ø¨Û† Ù‚ÙˆØªØ§Ø¨ÛŒØ§Ù†Û• Ø³Û•Ø±Ú©Û•ÙˆØªÙˆÙˆÛ•Ú©Ø§Ù†.',
      'Ø¨Û•Ø±Ù†Ø§Ù…Û•ÛŒ Ù…Ø§Ø³ØªÛ•Ø±ÛŒ Ù†ÙˆÛŽ Ù„Û• ITØŒ Ø¨Ø§Ø²Ø±Ú¯Ø§Ù†ÛŒ Ùˆ Ø¦Û•Ù†Ø¯Ø§Ø²ÛŒØ§Ø±ÛŒ. Ù¾ÛŽØ´ Ú©Ø§ØªÛŒ Ú©Û†ØªØ§ÛŒÛŒ Ø¯Ø§ÙˆØ§ÛŒ Ø¨Ú©Û•.',
      'Ú•Û†Ú˜ÛŒ Ø¯Û•Ø±Ú¯Ø§ÛŒ Ú©Ø±Ø§ÙˆÛ•ÛŒ Ú©ÛŒÛ•Ù…Ù¾Û•Ø³ÛŒ Ø¦Û•Ù… Ø´Û•Ù…Ù…Û•ÛŒÛ•. Ú¯Û•Ø´ØªØŒ ÙˆØ±Ú©Ø´Û†Ù¾Û•Ú©Ø§Ù† Ùˆ Ú©Û†Ø¨ÙˆÙ†Û•ÙˆÛ•ÛŒ ÙØ§Ú©Û•ÚµØªÛŒ.',
      'Ù¾Û†Ù„Û•Ú©Ø§Ù†ÛŒ Ø¦ÛŽÙˆØ§Ø±Û• Ùˆ Ú¾Û•ÙØªÛ• Ø¨Û† Ù¾ÛŒØ´Û•Ú¯Ø±Ø§Ù†ÛŒ Ú©Ø§Ø±. Ø®Ø´ØªÛ•Ú©Ø±Ø¯Ù†ÛŒ Ù†Ø§Ø³Ú©.',
      'Ø¨ÙˆØ±Ø³ÛŒ ØªÙˆÛŽÚ˜ÛŒÙ†Û•ÙˆÛ• Ø¨Û•Ø±Ø¯Û•Ø³ØªÛ•. Ù„Û•Ú¯Û•Úµ Ù¾ÛŽØ´Û•Ù†Ú¯Ø§Ù†ÛŒ Ù¾ÛŒØ´Û•Ø³Ø§Ø²ÛŒ Ù„Û• Ù¾Ø±Û†Ú˜Û• Ù†ÙˆÛŽÛŒÛ•Ú©Ø§Ù† Ù‡Ø§ÙˆÚ©Ø§Ø±ÛŒ Ø¨Ú©Û•.'
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
      'Ù…Ø´Ø§Ø±ÙŠØ¹ Ø¨Ù†Ø§Ø¡ Ø³ÙƒÙ†ÙŠØ© ÙˆØªØ¬Ø§Ø±ÙŠØ©. Ø§Ø³ØªØ´Ø§Ø±Ø§Øª ÙˆØªÙ‚Ø¯ÙŠØ±Ø§Øª Ù…Ø¬Ø§Ù†ÙŠØ©.',
      'Ø®Ø¯Ù…Ø§Øª Ø§Ù„ØªØ¬Ø¯ÙŠØ¯: Ù…Ø·Ø§Ø¨Ø®ØŒ Ø­Ù…Ø§Ù…Ø§ØªØŒ ÙˆØªØ¬Ø¯ÙŠØ¯Ø§Øª Ù…Ù†Ø²Ù„ÙŠØ© ÙƒØ§Ù…Ù„Ø©.',
      'Ù…Ù‡Ù†Ø¯Ø³ÙˆÙ† Ù…Ø±Ø®ØµÙˆÙ† ÙˆÙ…Ù‚Ø§ÙˆÙ„ÙˆÙ† Ù…Ø¹ØªÙ…Ø¯ÙˆÙ†. Ù…ÙˆØ§Ø¯ Ø¹Ø§Ù„ÙŠØ© Ø§Ù„Ø¬ÙˆØ¯Ø©ØŒ Ø¹Ù…Ù„ Ù…Ø¶Ù…ÙˆÙ†.',
      'Ù…Ø¬Ù…Ø¹ Ø³ÙƒÙ†ÙŠ Ø¬Ø¯ÙŠØ¯ Ø³ÙŠØªÙ… Ø¥Ø·Ù„Ø§Ù‚Ù‡ Ø§Ù„Ø´Ù‡Ø± Ø§Ù„Ù…Ù‚Ø¨Ù„. Ø§Ù„Ø­Ø¬Ø² Ø§Ù„Ù…Ø³Ø¨Ù‚ Ù…Ø¹ Ø¯ÙØ¹Ø§Øª Ù…Ø±Ù†Ø©.',
      'Ø£Ø®ØµØ§Ø¦ÙŠÙˆ Ø§Ù„Ù‡ÙŠØ§ÙƒÙ„ Ø§Ù„Ù…Ø¹Ø¯Ù†ÙŠØ© ÙˆØ§Ù„Ø®Ø±Ø³Ø§Ù†Ø©. Ù…Ø³ØªÙˆØ¯Ø¹Ø§Øª ØµÙ†Ø§Ø¹ÙŠØ© ÙˆÙ…ØµØ§Ù†Ø¹.'
    ],
    ku: [
      'Ù¾Ø±Û†Ú˜Û•Ú©Ø§Ù†ÛŒ Ø¨ÛŒÙ†Ø§ÛŒ Ù†ÛŒØ´ØªÛ•Ø¬ÛŽ Ùˆ Ø¨Ø§Ø²Ø±Ú¯Ø§Ù†ÛŒ. ÙˆØªÙˆÛŽÚ˜ Ùˆ Ú¾Û•Ú˜Ù…Ø§Ø±ÛŒ Ø¨ÛŽ Ø¨Û•Ø±Ø§Ù…Ø¨Û•Ø±.',
      'Ø®Ø²Ù…Û•ØªÚ¯ÙˆØ²Ø§Ø±ÛŒ Ù†ÙˆÛŽÚ©Ø±Ø¯Ù†Û•ÙˆÛ•: Ù†Ø§ÙˆØ®Û†ÛŒÛŒØŒ Ø­Û•Ù…Ø§Ù… Ùˆ Ø¯Û•Ø³ØªÚ©Ø§Ø±ÛŒ ØªÛ•ÙˆØ§ÙˆÛŒ Ù…Ø§Úµ.',
      'Ø¦Û•Ù†Ø¯Ø§Ø²ÛŒØ§Ø±Ø§Ù†ÛŒ Ø¨Ú•ÛŒØ§Ø± Ùˆ Ù¾ÛŽØ´Û•Ù†Ú¯Ø§Ù†ÛŒ Ù¾Û•Ø³Û•Ù†Ø¯Ú©Ø±Ø§Ùˆ. Ù…Ø§Ø¯Û•ÛŒ Ø¨Û•Ø±Ø² Ùˆ Ú©Ø§Ø±ÛŽÚ©ÛŒ ØªÛ•Ø­Û•ØªÛŒØ¯Ø§Ø±.',
      'Ú©Û†Ù…Û•ÚµÛ• Ø¦Û•Ù¾Ø§Ø±ØªÙ…Ø§Ù†ÛŒ Ù†ÙˆÛŽ Ù…Ø§Ù†Ú¯ÛŒ Ø¯Ø§Ù‡Ø§ØªÙˆÙˆ Ø¯Û•Ú©Ø±ÛŽØªÛ•ÙˆÛ•. Ù¾ÛŽØ´Ø¯Ø§ÙˆØ§Ù†ÛŒÙ† Ù„Û•Ú¯Û•Úµ Ù¾Ø§Ø±Û•Ø¯Ø§Ù†ÛŽÚ©ÛŒ Ù†Ø§Ø³Ú©.',
      'Ù¾ÛŒØ´Û•Ù†Ø§Ø³Û•Ú©Ø§Ù†ÛŒ Ø¨Ù†Û•Ù…Ø§ÚµÛ•ÛŒ Ù¾Û†Ù„ Ùˆ Ú©Û†Ù†Ú©Ø±ÛŒØª. Ú©Û†Ú¯Ø§Ú©Ø§Ù†ÛŒ Ù¾ÛŒØ´Û•Ø³Ø§Ø²ÛŒ Ùˆ ÙØ§Ø¨Ø±ÛŒÚ©Û•Ú©Ø§Ù†.'
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
      'ØªÙˆØµÙŠÙ„ Ø³Ø±ÙŠØ¹ ÙÙŠ Ø¬Ù…ÙŠØ¹ Ù…Ø­Ø§ÙØ¸Ø§Øª Ø§Ù„Ø¹Ø±Ø§Ù‚. ØªÙˆØµÙŠÙ„ ÙÙŠ Ù†ÙØ³ Ø§Ù„ÙŠÙˆÙ… ÙÙŠ Ø§Ù„Ù…Ø¯Ù† Ø§Ù„Ø±Ø¦ÙŠØ³ÙŠØ©.',
      'Ø­Ù„ÙˆÙ„ Ø§Ù„ØªØ®Ø²ÙŠÙ† ÙˆØ§Ù„Ù…Ø³ØªÙˆØ¯Ø¹Ø§Øª. Ù…Ø±Ø§ÙÙ‚ Ù…ÙƒÙŠÙØ© Ù…ØªØ§Ø­Ø©.',
      'Ø£Ø³Ø·ÙˆÙ„ Ù…Ù† Ø§Ù„Ø´Ø§Ø­Ù†Ø§Øª Ø§Ù„Ø­Ø¯ÙŠØ«Ø© ÙˆØ§Ù„Ù…Ø±ÙƒØ¨Ø§Øª Ø§Ù„Ù…Ø¨Ø±Ø¯Ø©. Ù†Ù‚Ù„ Ø¢Ù…Ù†ØŒ ÙÙŠ ÙƒÙ„ Ù…Ø±Ø©.',
      'Ø®Ø¯Ù…Ø§Øª Ø¥Ù†Ø¬Ø§Ø² Ø§Ù„Ø·Ù„Ø¨Ø§Øª Ø§Ù„Ø¥Ù„ÙƒØªØ±ÙˆÙ†ÙŠØ©. Ø§Ø®ØªÙŠØ§Ø±ØŒ ØªØºÙ„ÙŠÙØŒ ÙˆØ´Ø­Ù† Ù„Ù…ØªØ¬Ø±Ùƒ Ø§Ù„Ø¥Ù„ÙƒØªØ±ÙˆÙ†ÙŠ.',
      'ØªØ®Ù„ÙŠØµ Ø¬Ù…Ø±ÙƒÙŠ ÙˆØ´Ø­Ù† Ø¯ÙˆÙ„ÙŠ. Ø®Ø¯Ù…Ø© Ù…Ù† Ø§Ù„Ø¨Ø§Ø¨ Ø¥Ù„Ù‰ Ø§Ù„Ø¨Ø§Ø¨ ÙÙŠ Ø¬Ù…ÙŠØ¹ Ø£Ù†Ø­Ø§Ø¡ Ø§Ù„Ø¹Ø§Ù„Ù….'
    ],
    ku: [
      'Ú¯Û•ÛŒØ§Ù†Ø¯Ù†ÛŒ Ø®ÛŽØ±Ø§ Ù„Û• Ø³Û•Ø±Ø¬Û•Ù… Ù¾Ø§Ø±ÛŽØ²Ú¯Ø§Ú©Ø§Ù†ÛŒ Ø¹ÛŽØ±Ø§Ù‚. Ú¯Û•ÛŒØ§Ù†Ø¯Ù†ÛŒ Ú¾Û•Ù…Ø§Ù† Ú•Û†Ú˜ Ù„Û• Ø´Ø§Ø±Û• Ú¯Û•ÙˆØ±Û•Ú©Ø§Ù†.',
      'Ú†Ø§Ø±Û•Ø³Û•Ø±ÛŒ Ú©Û†Ú¯Ø§ Ùˆ Ø®Û•Ø²ÛŽÙ†. Ø¦Û†ØªÛŽÙ„ÛŒ Ú†Ø§ÙˆØ¯ÛŽØ±ÛŒ Ú©Û•ÛŒØ³Û•ÛŒ Ø¨Û•Ø±Ø¯Û•Ø³ØªÛ•.',
      'ÙÙ„ÛŒØªÛŽÚ©ÛŒ Ú©Ø§Ù…ÛŽÙ†Û•ÛŒ Ù†ÙˆÛŽ Ùˆ Ø¦Û†ØªÛ†Ù…Ø¨ÛŽÙ„ÛŒ Ø³Ø§Ø±Ø¯Ú©Û•Ø±Û•ÙˆÛ•. Ú¯ÙˆØ§Ø³ØªÙ†Û•ÙˆÛ•ÛŒ Ø¦Û•Ù…Ù†ØŒ Ú¾Û•Ù…ÙˆÙˆ Ø¬Ø§Ø±ÛŽÚ©.',
      'Ø®Ø²Ù…Û•ØªÚ¯ÙˆØ²Ø§Ø±ÛŒ Ù¾Ø§Ø¨Û•Ù†Ø¯Ø¨ÙˆÙˆÙ†ÛŒ Ø¨Ø§Ø²Ø±Ú¯Ø§Ù†ÛŒ Ø¦Û•Ù„ÛŒÚ©ØªØ±Û†Ù†ÛŒ. Ù‡Û•ÚµØ¨Ú˜Ø§Ø±Ø¯Ù†ØŒ Ù¾Ø§Ú©Ú©Ø±Ø¯Ù†Û•ÙˆÛ• Ùˆ Ú¯Û•ÛŒØ§Ù†Ø¯Ù† Ø¨Û† Ø¯ÙˆÚ©Ø§Ù†ÛŒ Ø¦Û†Ù†Ù„Ø§ÛŒÙ†ÛŒ Ø®Û†Øª.',
      'Ú†Ø§Ø±Û•Ø³Û•Ø±ÛŒ Ú¯ÙˆÙ…Ø±Ú¯ Ùˆ Ú¯Û•ÛŒØ§Ù†Ø¯Ù†ÛŒ Ù†ÛŽÙˆØ¯Û•ÙˆÚµÛ•ØªÛŒ. Ø®Ø²Ù…Û•ØªÚ¯ÙˆØ²Ø§Ø±ÛŒ Ø¯Û•Ø±Ú¯Ø§ Ø¨Û† Ø¯Û•Ø±Ú¯Ø§ Ù„Û• Ø³Û•Ø±Ø§Ù†Ø³Û•Ø±ÛŒ Ø¬ÛŒÚ¾Ø§Ù†.'
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
      'Ù…ÙØªÙˆØ­ Ø§Ù„Ø¢Ù† Ù„Ù„Ø£Ø¹Ù…Ø§Ù„! ØªÙØ¶Ù„ Ø¨Ø²ÙŠØ§Ø±ØªÙ†Ø§ Ø§Ù„ÙŠÙˆÙ… Ù„Ù„Ø­ØµÙˆÙ„ Ø¹Ù„Ù‰ Ø®Ø¯Ù…Ø© Ø¹Ø§Ù„ÙŠØ© Ø§Ù„Ø¬ÙˆØ¯Ø© ÙˆØ£Ø³Ø¹Ø§Ø± Ø±Ø§Ø¦Ø¹Ø©.',
      'Ø¹Ø±Ø¶ ØªØ±ÙˆÙŠØ¬ÙŠ Ø®Ø§Øµ Ù‡Ø°Ø§ Ø§Ù„Ø£Ø³Ø¨ÙˆØ¹ ÙÙ‚Ø·. Ù„Ø§ ØªÙÙˆØª Ø£ÙØ¶Ù„ Ø¹Ø±ÙˆØ¶Ù†Ø§!',
      'Ø±Ø¶Ø§ Ø§Ù„Ø¹Ù…Ù„Ø§Ø¡ Ù‡Ùˆ Ø£ÙˆÙ„ÙˆÙŠØªÙ†Ø§. Ù…ØµÙ†Ù Ø¨Ù€ 4.5+ Ù†Ø¬ÙˆÙ… Ù…Ù† Ù…Ø¬ØªÙ…Ø¹Ù†Ø§.',
      'ØªØ§Ø¨Ø¹Ù†Ø§ Ù„Ù„Ø­ØµÙˆÙ„ Ø¹Ù„Ù‰ ØªØ­Ø¯ÙŠØ«Ø§Øª Ø­ÙˆÙ„ Ø§Ù„Ù…Ù†ØªØ¬Ø§Øª Ø§Ù„Ø¬Ø¯ÙŠØ¯Ø©ØŒ Ø§Ù„Ø¹Ø±ÙˆØ¶ØŒ ÙˆØ§Ù„Ø£Ø­Ø¯Ø§Ø«.',
      'Ø§ØªØµÙ„ Ø¨Ù†Ø§ Ù„Ù„Ø§Ø³ØªÙØ³Ø§Ø±Ø§ØªØŒ Ø§Ù„Ø­Ø¬ÙˆØ²Ø§ØªØŒ Ø£Ùˆ Ø§Ù„Ø·Ù„Ø¨Ø§Øª Ø§Ù„Ø®Ø§ØµØ©. Ù†Ø­Ù† Ù‡Ù†Ø§ Ù„Ù„Ù…Ø³Ø§Ø¹Ø¯Ø©!'
    ],
    ku: [
      'Ø¦ÛŽØ³ØªØ§ Ø¨Û† Ú©Ø§Ø± Ú©Ø±Ø§ÙˆÛ•ÛŒÛ•! Ø¦Û•Ù…Ú•Û† Ø³Û•Ø±Ø¯Ø§Ù…Ø§Ù† Ø¨Ú©Û• Ø¨Û† Ø®Ø²Ù…Û•ØªÚ¯ÙˆØ²Ø§Ø±ÛŒ Ø¨Ø§Ø´ Ùˆ Ù†Ø±Ø®ÛŽÚ©ÛŒ Ø¨Ø§Ø´.',
      'Ø¨Û•Ø±Ù†Ø§Ù…Û•ÛŒ ØªØ§ÛŒØ¨Û•ØªÛŒ Ø¦Û•Ù… Ú¾Û•ÙØªÛ•ÛŒÛ• ØªÛ•Ù†Ù‡Ø§. Ù„Û• Ø¨Ø§Ø´ØªØ±ÛŒÙ† Ø¦Û†ÙÛ•Ø±Û•Ú©Ø§Ù† Ø¬ÛŽÙ…Ø§Ú¾ÛŽÚµÛ•!',
      'Ø¦Ø§Ø±Û•Ø²ÙˆÙˆÛŒ Ú©Ú•ÛŒØ§Ø±Ø§Ù† ØªÛ•Ø±Ø¬ÛŒØ­ÛŒ Ø¦ÛŽÙ…Û•ÛŒÛ•. Ù„Û• Ù„Ø§ÛŒÛ•Ù† Ú©Û†Ù…Û•ÚµÚ¯Û•Ú©Û•Ù…Ø§Ù†Û•ÙˆÛ• 4.5+ Ø¦Û•Ø³ØªÛŽØ±Û•.',
      'Ø¯ÙˆØ§ÛŒ Ø¨Ú©Û• Ø¨Û† Ù†ÙˆÛŽÚ©Ø§Ø±ÛŒÛŒÛ•Ú©Ø§Ù† Ø¯Û•Ø±Ø¨Ø§Ø±Û•ÛŒ Ø¨Û•Ø±Ù‡Û•Ù…Û• Ù†ÙˆÛŽÛŒÛ•Ú©Ø§Ù†ØŒ Ø¦Û†ÙÛ•Ø±Û•Ú©Ø§Ù† Ùˆ Ú•ÙˆÙˆØ¯Ø§ÙˆÛ•Ú©Ø§Ù†.',
      'Ù¾Û•ÛŒÙˆÛ•Ù†Ø¯ÛŒÙ…Ø§Ù† Ø¨Ú©Û• Ø¨Û† Ù¾Ø±Ø³ÛŒØ§Ø±ØŒ Ø¯Ø§ÙˆØ§Ú©Ø±Ø¯Ù† ÛŒØ§Ù† Ø¯Ø§ÙˆØ§Ú©Ø§Ø±ÛŒ ØªØ§ÛŒØ¨Û•ØªÛŒ. Ø¦ÛŽØ±Û•ÛŒÛŒÙ† Ø¨Û† ÛŒØ§Ø±Ù…Û•ØªÛŒ!'
    ]
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
    { ar: 'Ù…Ù†Ø° Ø³Ø§Ø¹Ø©', ku: 'Ù¾ÛŽØ´ 1 Ú©Ø§ØªÚ˜Ù…ÛŽØ±', en: '1 hour ago' },
    { ar: 'Ù…Ù†Ø° 3 Ø³Ø§Ø¹Ø§Øª', ku: 'Ù¾ÛŽØ´ 3 Ú©Ø§ØªÚ˜Ù…ÛŽØ±', en: '3 hours ago' },
    { ar: 'Ù…Ù†Ø° 5 Ø³Ø§Ø¹Ø§Øª', ku: 'Ù¾ÛŽØ´ 5 Ú©Ø§ØªÚ˜Ù…ÛŽØ±', en: '5 hours ago' },
    { ar: 'Ø§Ù„Ø£Ù…Ø³', ku: 'Ø¯ÙˆÛŽÙ†ÛŽ', en: 'Yesterday' },
    { ar: 'Ù…Ù†Ø° ÙŠÙˆÙ…ÙŠÙ†', ku: 'Ù¾ÛŽØ´ 2 Ú•Û†Ú˜', en: '2 days ago' },
    { ar: 'Ù…Ù†Ø° 3 Ø£ÙŠØ§Ù…', ku: 'Ù¾ÛŽØ´ 3 Ú•Û†Ú˜', en: '3 days ago' },
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
    appName: 'Ø´ÙƒÙˆ Ù…Ø§ÙƒÙˆ',
    appSlogan: 'Ù…Ù†ØµØ© Ø§Ø³ØªÙƒØ´Ø§Ù Ø§Ù„Ø£Ù…Ø§ÙƒÙ† ÙˆØ§Ù„Ø´Ø±ÙƒØ§Øª ÙÙŠ Ø§Ù„Ø¹Ø±Ø§Ù‚ Ø¨Ø±ÙˆØ­ Ø§Ø¬ØªÙ…Ø§Ø¹ÙŠØ© Ø¹ØµØ±ÙŠØ© âœ¨',
    searchPlaceholder: 'Ø§Ø¨Ø­Ø« Ø¹Ù† ÙƒØ§ÙÙŠÙ‡ØŒ Ù…Ø·Ø¹Ù…ØŒ ØµØ§Ù„ÙˆÙ† ØªØ¬Ù…ÙŠÙ„...',
    allIraq: 'ÙƒÙ„ Ø§Ù„Ø¹Ø±Ø§Ù‚ ðŸ‡®ðŸ‡¶',
    allCategories: 'Ø§Ù„ÙƒÙ„',
    heroBadge: 'Ø§Ø³ØªÙƒØ´Ù Ø§Ù„Ø¹Ø±Ø§Ù‚ ðŸš€',
    ctaDiscover: 'Ø§Ø³ØªÙƒØ´Ù Ø§Ù„Ø¢Ù†',
    governorateLabel: 'Ø§Ù„Ù…Ø­Ø§ÙØ¸Ø©:',
    categoryHeader: 'ØªØµÙØ­ Ø§Ù„ÙØ¦Ø§Øª',
    loadMore: 'Ø¹Ø±Ø¶ Ø§Ù„Ù…Ø²ÙŠØ¯',
    showLess: 'Ø¹Ø±Ø¶ Ø£Ù‚Ù„',
    noBusinessesFound: 'Ù„Ù… ÙŠØªÙ… Ø§Ù„Ø¹Ø«ÙˆØ± Ø¹Ù„Ù‰ Ø£Ù…Ø§ÙƒÙ† ÙÙŠ Ù‡Ø°Ù‡ Ø§Ù„Ù…Ø­Ø§ÙØ¸Ø© Ø­Ø§Ù„ÙŠØ§Ù‹.',
    verified: 'Ù…ÙˆØ«Ù‚',
    address: 'Ø§Ù„Ø¹Ù†ÙˆØ§Ù†',
    phone: 'Ø±Ù‚Ù… Ø§Ù„Ù‡Ø§ØªÙ',
    specialOffer: 'Ø¹Ø±Ø¶ Ù…Ù…ÙŠØ²',
    likes: 'Ø¥Ø¹Ø¬Ø§Ø¨',
    saves: 'Ø­ÙØ¸',
    share: 'Ù…Ø´Ø§Ø±ÙƒØ©',
    comment: 'ØªØ¹Ù„ÙŠÙ‚',
    addComment: 'Ø¥Ø¶Ø§ÙØ© ØªØ¹Ù„ÙŠÙ‚...',
    postedBy: 'Ø¨ÙˆØ§Ø³Ø·Ø©',
    exploreFeed: 'Ù†Ø¨Ø¶ Ø§Ù„Ø´Ø§Ø±Ø¹ (Ø§Ù„ÙÙŠØ¯ Ø§Ù„Ø¬Ø°Ø§Ø¨)',
    exploreTab: 'Ø§Ø³ØªÙƒØ´Ø§Ù Ø§Ù„Ø£Ù…Ø§ÙƒÙ†',
    mapTab: 'Ø®Ø±ÙŠØ·Ø© Ø§Ù„Ù…Ø­Ù„ÙŠØ§Øª',
    addBusinessTab: 'Ø£Ø¶Ù Ø¹Ù…Ù„Ùƒ Ù…Ø¬Ø§Ù†Ø§Ù‹',
    aboutTab: 'ÙƒÙ„ Ø´ÙŠ Ø¹Ù†Ø§',
    addBusinessTitle: 'Ø§Ù†Ø¶Ù… Ù„Ù€ Ø´ÙƒÙˆ Ù…Ø§ÙƒÙˆ ÙˆØ³ÙˆÙ‘Ù‚ Ù„Ø¹Ù…Ù„Ùƒ Ù…Ø¬Ø§Ù†Ø§Ù‹! ðŸš€',
    addBusinessSubtitle: 'Ù†ÙˆØµÙ„ Ø¹Ù…Ù„Ùƒ Ù„Ø¢Ù„Ø§Ù Ø§Ù„Ø´Ø¨Ø§Ø¨ ÙˆÙ…Ø­Ø¨ÙŠ Ø§Ù„Ø§Ø³ØªÙƒØ´Ø§Ù ÙÙŠ Ù…Ø­Ø§ÙØ¸ØªÙƒ ÙˆØ¨Ø£Ø¬ÙˆØ§Ø¡ ØªÙŠÙƒ ØªÙˆÙƒ ÙˆØ¥Ù†Ø³ØªØºØ±Ø§Ù…',
    formBizName: 'Ø§Ø³Ù… Ø§Ù„Ø¹Ù…Ù„ Ø§Ù„ØªØ¬Ø§Ø±ÙŠ',
    formCategory: 'ÙØ¦Ø© Ø§Ù„Ø¹Ù…Ù„',
    formGov: 'Ø§Ù„Ù…Ø­Ø§ÙØ¸Ø©',
    formPhone: 'Ø±Ù‚Ù… Ø§Ù„Ù‡Ø§ØªÙ Ù„Ù„ØªÙˆØ§ØµÙ„',
    formAddress: 'Ø¹Ù†ÙˆØ§Ù† Ø§Ù„Ø¹Ù…Ù„ Ø§Ù„ØªÙØµÙŠÙ„ÙŠ',
    formDesc: 'ØµÙ Ø¹Ù…Ù„Ùƒ Ø¨Ø·Ø±ÙŠÙ‚Ø© ØªØ¬Ø°Ø¨ Ø§Ù„Ø´Ø¨Ø§Ø¨ ÙˆØ§Ù„Ù…Ø³ØªÙƒØ´ÙÙŠÙ†',
    formImage: 'Ø±Ø§Ø¨Ø· ØµÙˆØ±Ø© Ø§Ù„Ù„Ø§Ù†Ø¯Ø³ÙƒÙŠØ¨ (Ø§Ø®ØªÙŠØ§Ø±ÙŠ)',
    btnSubmit: 'Ø§Ù†Ø´Ø± Ø¹Ù…Ù„Ùƒ Ø§Ù„Ø¢Ù† Ø¹Ù„Ù‰ Ø´ÙƒÙˆ Ù…Ø§ÙƒÙˆ ðŸŽ‰',
    successMsg: 'ØªÙ… Ù†Ø´Ø± Ù…Ø´Ø±ÙˆØ¹Ùƒ Ø¨Ù†Ø¬Ø§Ø­! Ø³ÙŠØ¸Ù‡Ø± ÙÙˆØ±Ø§Ù‹ ÙÙŠ Ø§Ù„Ø£Ù‚Ø³Ø§Ù… Ø§Ù„Ù…Ø­Ø¯Ø¯Ø©.',
    interactiveMapIntro: 'Ø§Ù†Ù‚Ø± Ø¹Ù„Ù‰ Ø§Ù„Ù…Ø­Ø§ÙØ¸Ø© Ø¨Ø§Ù„Ø®Ø±ÙŠØ·Ø© Ø§Ù„ØªÙØ§Ø¹Ù„ÙŠØ© Ù„ØªØµÙÙŠØ© ÙˆØ§ÙƒØªØ´Ø§Ù Ø§Ù„Ø£Ù…Ø§ÙƒÙ† ÙˆØ§Ù„ØªØ±ÙŠÙ†Ø¯Ø§Øª ÙÙˆØ±Ø§Ù‹! ðŸ“ŠðŸ“',
    postTitle: 'Ù…Ù†Ø´ÙˆØ±Ø§Øª Ø§Ù„Ø£Ù†Ø´Ø·Ø© ÙˆØ§Ù„ØªØ±ÙŠÙ†Ø¯Ø§Øª',
    reviewsTitle: 'Ø¢Ø±Ø§Ø¡ ÙˆØªÙ‚ÙŠÙŠÙ…Ø§Øª Ù…Ø¬ØªÙ…Ø¹ Ø´ÙƒÙˆ Ù…Ø§ÙƒÙˆ',
    exploreCount: 'Ø£Ù…Ø§ÙƒÙ† ØªÙ… Ø§Ø³ØªÙƒØ´Ø§ÙÙ‡Ø§',
    addPostPlaceholder: 'Ø§ÙƒØªØ¨ ØªØ¹Ù„ÙŠÙ‚Ùƒ Ø¨ØµÙØªÙƒ Ø²Ø§Ø¦Ø±...',
    ratingLabel: 'Ø§Ù„ØªÙ‚ÙŠÙŠÙ…:',
    mapPinClick: 'Ø§Ø¶ØºØ· Ø¹Ù„Ù‰ Ø§Ù„Ø¯Ø¨ÙˆØ³ Ø¨Ø§Ù„Ø®Ø±ÙŠØ·Ø© Ù„Ø¹Ø±Ø¶ ØªÙØ§ØµÙŠÙ„ Ø§Ù„Ù…ÙƒØ§Ù†',
    close: 'Ø¥ØºÙ„Ø§Ù‚',
    viewDetails: 'Ø¹Ø±Ø¶ Ø§Ù„ØªÙØ§ØµÙŠÙ„',
    ownerBadge: 'Ø±Ø§Ø¦Ø¯ Ø£Ø¹Ù…Ø§Ù„ Ø¹Ø±Ø§Ù‚ÙŠ ðŸ‘‘',
    sharesCount: 'Ù…Ø´Ø§Ø±ÙƒØ©',
    socialMediaFeelTitle: 'Ù‚ØµØµ ÙˆØªØ±ÙŠÙ†Ø¯Ø§Øª Ø­ÙŠØ© ðŸ”¥',
    storyLineTitle: 'Ù‚ØµØµ ØªÙØ§Ø¹Ù„ÙŠØ© Ù„Ù„Ù…Ø­Ù„Ø§Øª',
    karradaPlace: 'Ø­ÙŠ Ø§Ù„ÙƒØ±Ø§Ø¯Ø©ØŒ Ø¨ØºØ¯Ø§Ø¯',
    welcomeAlert: 'Ø£Ù‡Ù„Ø§Ù‹ Ø¨Ùƒ ÙÙŠ Ø´ÙƒÙˆ Ù…Ø§ÙƒÙˆ! Ø§Ù„Ù…Ù†ØµØ© ØªÙ… ØªØ±Ù‚ÙŠØªÙ‡Ø§ Ø¥Ù„Ù‰ ØªØ¬Ø±Ø¨Ø© ØªÙØ§Ø¹Ù„ÙŠØ© Ø¨Ø§Ù„ÙƒØ§Ù…Ù„ ðŸ¦âš¡',
    dealsCorner: 'Ø±ÙƒÙ† Ø§Ù„Ø¹Ø±ÙˆØ¶ Ø§Ù„Ø³Ø§Ø®Ù†Ø© ðŸ”¥'
  },
  ku: {
    appName: 'Ø³Ø§ÙƒÛ† Ù…Ø§ÙƒÛ†',
    appSlogan: 'Ø³Û•Ú©Û†ÛŒ Ù‡Û•Ø±Û• Ù…Û†Ø¯ÛŽØ±Ù†ÛŒ Ø¹ÛŽØ±Ø§Ù‚ÛŒ Ø¨Û† Ø¯Û†Ø²ÛŒÙ†Û•ÙˆÛ•ÛŒ Ú©Ø§ÙÛŽØŒ Ú†ÛŽØ´ØªØ®Ø§Ù†Û• Ùˆ Ù…Ø§Ø±Ú©Û• Ù„Û†Ú©Ø§ÚµÛŒÛŒÛ•Ú©Ø§Ù† âœ¨',
    searchPlaceholder: 'Ø¨Ú¯Û•Ú•ÛŽ Ø¨Û† Ú©Ø§ÙÛŽØŒ Ú†ÛŽØ´ØªØ®Ø§Ù†Û•ØŒ Ø³Ø§ÚµÛ†Ù†ÛŒ Ø¬ÙˆØ§Ù†ÛŒ...',
    allIraq: 'Ù‡Û•Ù…ÙˆÙˆ Ø¹ÛŽØ±Ø§Ù‚ ðŸ‡®ðŸ‡¶',
    allCategories: 'Ù‡Û•Ù…ÙˆÙˆ',
    heroBadge: 'Ø¹ÛŽØ±Ø§Ù‚ Ø¨Ø¯Û†Ø²Û•Ø±Û•ÙˆÛ• ðŸš€',
    ctaDiscover: 'Ø¦ÛŽØ³ØªØ§ Ø¨Ø¯Û†Ø²Û•Ø±Û•ÙˆÛ•',
    governorateLabel: 'Ù¾Ø§Ø±ÛŽØ²Ú¯Ø§:',
    categoryHeader: 'Ù¾Û†Ù„Û•Ú©Ø§Ù† Ø¨Ø¨ÛŒÙ†Û•',
    loadMore: 'Ø²ÛŒØ§ØªØ± Ø¨Ø¨ÛŒÙ†Û•',
    showLess: 'Ú©Û•Ù…ØªØ± Ø¨Ø¨ÛŒÙ†Û•',
    noBusinessesFound: 'Ù‡ÛŒÚ† Ø´ÙˆÛŽÙ†ÛŽÚ© Ù„Û•Ù… Ù¾Ø§Ø±ÛŽØ²Ú¯Ø§ÛŒÛ•Ø¯Ø§ Ù†Û•Ø¯Û†Ø²Ø±Ø§ÛŒÛ•ÙˆÛ•.',
    verified: 'Ù¾Û•Ø³Û•Ù†Ø¯Ú©Ø±Ø§Ùˆ',
    address: 'Ù†Ø§ÙˆÙ†ÛŒØ´Ø§Ù†',
    phone: 'Ú˜Ù…Ø§Ø±Û•ÛŒ Ù…Û†Ø¨Ø§ÛŒÙ„',
    specialOffer: 'Ù¾ÛŽØ´Ù†ÛŒØ§Ø±ÛŒ ØªØ§ÛŒØ¨Û•Øª',
    likes: 'Ù„Ø§ÛŒÚ©',
    saves: 'Ù¾Ø§Ø´Û•Ú©Û•ÙˆØª',
    share: 'Ø¨ÚµØ§ÙˆÚ©Ø±Ø¯Ù†Û•ÙˆÛ•',
    comment: 'Ú©Û†Ù…ÛŽÙ†Øª',
    addComment: 'Ú©Û†Ù…ÛŽÙ†Øª Ø¨Ù†ÙˆÙˆØ³Û•...',
    postedBy: 'Ù„Û•Ù„Ø§ÛŒÛ•Ù†',
    exploreFeed: 'ØªÛ†Ú•ÛŒ Ú©Û†Ù…Û•ÚµØ§ÛŒÛ•ØªÛŒ (ØªØ±ÛŽÙ†Ø¯Û•Ú©Ø§Ù†)',
    exploreTab: 'Ø¯Û†Ø²ÛŒÙ†Û•ÙˆÛ•ÛŒ Ø´ÙˆÛŽÙ†Û•Ú©Ø§Ù†',
    mapTab: 'Ù†Û•Ø®Ø´Û•ÛŒ Ù†Ø§ÙˆØ®Û†ÛŒÛŒ',
    addBusinessTab: 'Ø¨ÛŽØ¨Û•Ø±Ø§Ù…Ø¨Û•Ø± Ù¾Ú•Û†Ú˜Û•Ú©Û•Øª Ø¯Ø§Ø¨Ù†ÛŽ',
    aboutTab: 'Ø¯Û•Ø±Ø¨Ø§Ø±Û•ÛŒ Ø¦ÛŽÙ…Û•',
    addBusinessTitle: 'Ø¨Ø¨ÛŒØªÛ• Ù‡Ø§ÙˆØ¨Û•Ø´ÛŒ Ø³Ø§ÙƒÛ† Ù…Ø§ÙƒÛ† Ùˆ Ù¾Ú•Û†Ú˜Û•Ú©Û•Øª Ø¨ÚµØ§ÙˆÚ©Û•Ø±Û•ÙˆÛ•! ðŸš€',
    addBusinessSubtitle: 'Ù¾Ú•Û†Ú˜Û•Ú©Û•Øª Ø¨Ú¯Û•ÛŒÛ•Ù†Û• Ø¨Û• Ù‡Û•Ø²Ø§Ø±Ø§Ù† Ú¯Û•Ù†Ø¬ Ùˆ Ø¯Û†Ø³Øª Ù„Û• Ù¾Ø§Ø±ÛŽØ²Ú¯Ø§Ú©Û•Øª Ø¨Û• ØªØ§Ù… Ùˆ ØªÛ•Ø³Ù„ÛŒÙ…ÛŒ ØªÛŒÚ© ØªÛ†Ú© Ùˆ Ø¦ÛŒÙ†Ø³ØªØ§Ú¯Ø±Ø§Ù…',
    formBizName: 'Ù†Ø§ÙˆÛŒ Ú©Ø§Ø±Û•Ú©Û•',
    formCategory: 'Ù¾Û†Ù„ÛŒ Ú©Ø§Ø±Û•Ú©Û•',
    formGov: 'Ù¾Ø§Ø±ÛŽØ²Ú¯Ø§',
    formPhone: 'Ú˜Ù…Ø§Ø±Û•ÛŒ Ù…Û†Ø¨Ø§ÛŒÙ„',
    formAddress: 'Ù†Ø§ÙˆÙ†ÛŒØ´Ø§Ù†ÛŒ ØªÛ•ÙˆØ§Ùˆ',
    formDesc: 'Ø¨Ø§Ø³Ú©Ø±Ø¯Ù†ÛŒ Ú©Ø§Ø±Û•Ú©Û•Øª Ø¨Û• Ø´ÛŽÙˆØ§Ø²ÛŽÚ© Ú©Û• Ú¯Û•Ù†Ø¬Ø§Ù† Ø³Û•Ø±Ù†Ø¬Ú•Ø§Ú©ÛŽØ´ Ø¨Ú©Ø§Øª',
    formImage: 'Ù„ÛŒÙ†Ú©ÛŒ ÙˆÛŽÙ†Û•ÛŒ Ø³Û•Ø±Û•Ú©ÛŒ (Ø¦Ø§Ø±Û•Ø²ÙˆÙˆÙ…Û•Ù†Ø¯Ø§Ù†Û•)',
    btnSubmit: 'Ú©Ø§Ø±Û•Ú©Û•Øª Ø¨ÚµØ§ÙˆÚ©Û•Ø±Û•ÙˆÛ• Ø¦ÛŽØ³ØªØ§ Ù„Û•Ø³Û•Ø± Ø³Ø§ÙƒÛ† Ù…Ø§ÙƒÛ† ðŸŽ‰',
    successMsg: 'Ú©Ø§Ø±Û•Ú©Û•Øª Ø¨Û• Ø³Û•Ø±Ú©Û•ÙˆØªÙˆÙˆÛŒÛŒ Ø¨ÚµØ§ÙˆÚ©Ø±Ø§ÛŒÛ•ÙˆÛ•! ÛŒÛ•Ú©Ø³Û•Ø± Ø¯Û•Ø±Ø¯Û•Ú©Û•ÙˆÛŽØª.',
    interactiveMapIntro: 'Ù„Û•Ø³Û•Ø± Ù†Û•Ø®Ø´Û• Ø¯Û•Ø³Øª Ù„Û•Ø³Û•Ø± Ù¾Ø§Ø±ÛŽØ²Ú¯Ø§Ú©Û• Ø¯Ø§Ø¨Ù†ÛŽ Ø¨Û† ØªØµÙÛŒÛ•Ú©Ø±Ø¯Ù† Ùˆ Ø¯Û†Ø²ÛŒÙ†Û•ÙˆÛ•ÛŒ ØªØ±ÛŽÙ†Ø¯Û•Ú©Ø§Ù† ÛŒÛ•Ú©Ø³Û•Ø±! ðŸ“ŠðŸ“',
    postTitle: 'Ø¨ÚµØ§ÙˆÚ©Ø±Ø§ÙˆÛ• Ùˆ Ú†Ø§Ù„Ø§Ú©ÛŒÛŒÛ•Ú©Ø§Ù†',
    reviewsTitle: 'Ù¾ÛŽØ¯Ø§Ú†ÙˆÙˆÙ†Û•ÙˆÛ•ÛŒ ÙÛŒØ¯ Ø¨Ø§Ú©Û•Ú©Ø§Ù†ÛŒ Ú©Û†Ù…Û•ÚµÚ¯Û•ÛŒ Ø³Ø§ÙƒÛ† Ù…Ø§ÙƒÛ†',
    exploreCount: 'Ø´ÙˆÛŽÙ†ÛŒ Ø¯Û†Ø²Ø±Ø§ÙˆÛ•',
    addPostPlaceholder: 'Ú©Û†Ù…ÛŽÙ†ØªÛŒ Ø®Û†Øª Ø¯Ø§Ø¨Ù†ÛŽ ÙˆÛ•Ú© Ú¯Û•Ø´ØªÛŒØ§Ø±...',
    ratingLabel: 'Ù†Ù…Ø±Û•:',
    mapPinClick: 'Ú©Ù„ÛŒÚ© Ù„Û•Ø³Û•Ø± Ø¯Û•Ø±Ø²ÛŒ Ù†Û•Ø®Ø´Û•Ú©Û• Ø¨Ú©Û• Ø¨Û† Ø¨ÛŒÙ†ÛŒÙ†ÛŒ ÙˆØ±Ø¯Û•Ú©Ø§Ø±ÛŒÛŒÛ•Ú©Ø§Ù†',
    close: 'Ø¯Ø§Ø®Ø³ØªÙ†',
    viewDetails: 'Ø¨ÛŒÙ†ÛŒÙ†ÛŒ ÙˆØ±Ø¯Û•Ú©Ø§Ø±ÛŒ',
    ownerBadge: 'Ù¾Ø§Ø¯Ø´Ø§ÛŒ Ø¨Ø§Ø²Ø±Ú¯Ø§Ù†ÛŒ ðŸ‘‘',
    sharesCount: 'Ø¨ÚµØ§ÙˆÚ©Ø±Ø¯Ù†Û•ÙˆÛ•',
    socialMediaFeelTitle: 'Ø³ØªÛ†Ø±ÛŒ Ùˆ ØªØ±ÛŽÙ†Ø¯Û•Ú©Ø§Ù† Ù„Û• Ø¹ÛŽØ±Ø§Ù‚ ðŸ”¥',
    storyLineTitle: 'Ø³ØªÛ†Ø±ÛŒ Ø¨Ø§Ø²Ø±Ú¯Ø§Ù†Ø§Ù†',
    karradaPlace: 'Ú©Û•Ú•Ø§Ø¯Û•ØŒ Ø¨Û•ØºØ¯Ø§Ø¯',
    welcomeAlert: 'Ø¨Û•Ø®ÛŽØ±Ø¨ÛŽÙ† Ø¨Û† Ø³Ø§ÙƒÛ† Ù…Ø§ÙƒÛ†! Ø³Û•Ú©Û†Ú©Û•Ù…Ø§Ù† Ú†Ø§Ú©Ø³Ø§Ø²ÛŒ Ú¯Û•ÙˆØ±Û•ÛŒ Ø¨Û† Ú©Ø±Ø§ÙˆÛ• ðŸ¦âš¡',
    dealsCorner: 'Ø¹Û•Ø±Ø²Û• ØªØ§ÛŒØ¨Û•Øª Ùˆ Ø³Ø§Ø±Ø¯ Ù†Û•Ú©Ø±Ø§ÙˆÛ•Ú©Ø§Ù† ðŸ”¥'
  },
  en: {
    appName: 'Saku Maku',
    appSlogan: 'Iraqâ€™s vibrant social-business discovery engine bringing spaces to life âœ¨',
    searchPlaceholder: 'Search beautiful cafÃ©s, food spots, lounges...',
    allIraq: 'All Iraq ðŸ‡®ðŸ‡¶',
    allCategories: 'All',
    heroBadge: 'Explore Iraq ðŸš€',
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
    addBusinessTitle: 'Claim Your Spotlight on Saku Maku ðŸš€',
    addBusinessSubtitle: 'Get discovered by thousands of stylish local youth looking for their next destination.',
    formBizName: 'Business / Boutique Name',
    formCategory: 'Business Category',
    formGov: 'Governorate Location',
    formPhone: 'Contact Number',
    formAddress: 'Full Street Address',
    formDesc: 'Write a compelling aesthetic description',
    formImage: 'Landscape Image URL (Optional)',
    btnSubmit: 'Launch on Saku Maku Feed! ðŸŽ‰',
    successMsg: 'Congratulation! Your business is now live on our street feed catalogs.',
    interactiveMapIntro: 'Interactive map of Iraq. Tap any governorate bubble or pin to quickly filter trending spots in that urban hub! ðŸ“ŠðŸ“',
    postTitle: 'Community Feed & Live Broadcasts',
    reviewsTitle: 'Community Voice & Reviews',
    exploreCount: 'Spots Decoded',
    addPostPlaceholder: 'Express your local experience...',
    ratingLabel: 'Rating:',
    mapPinClick: 'Tap on a pin to open the active business popup',
    close: 'Close',
    viewDetails: 'Explore Hub',
    ownerBadge: 'Iraqi Entrepreneur ðŸ‘‘',
    sharesCount: 'Shares',
    socialMediaFeelTitle: 'Live Stories & Feeds ðŸ”¥',
    storyLineTitle: 'Active Merchant Stories',
    karradaPlace: 'Karrada, Baghdad',
    welcomeAlert: 'Welcome to Saku Maku! The platform has been fully enhanced into an interactive social application ðŸ¦âš¡',
    dealsCorner: 'Promo Corner ðŸ”¥'
  }
};
