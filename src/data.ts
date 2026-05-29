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
    code: 'qadisiya',
    name: {
      ar: 'Ø§Ù„Ù‚Ø§Ø¯Ø³ÙŠØ© ðŸŒ¾',
      ku: 'Ù‚Ø§Ø¯Ø³ÛŒÛ• ðŸŒ¾',
      en: 'Qadisiya ðŸŒ¾'
    },
    englishLabel: 'Qadisiya'
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
    id: 'restaurant',
    icon: 'ðŸ”',
    name: {
      ar: 'Ù…Ø·Ø§Ø¹Ù…',
      ku: 'Ú†ÛŽØ´ØªØ®Ø§Ù†Û•Ú©Ø§Ù†',
      en: 'Restaurants'
    },
    color: 'from-orange-600 to-red-500'
  },
  {
    id: 'cafe_bakery',
    icon: 'â˜•',
    name: {
      ar: 'ÙƒØ§ÙÙŠÙ‡Ø§Øª ÙˆÙ…Ø®Ø§Ø¨Ø²',
      ku: 'Ú©Ø§ÙÛŽ Ùˆ Ù†Ø§Ù†Û•ÙˆØ§Ø®Ø§Ù†Û•Ú©Ø§Ù†',
      en: 'CafÃ©s & Bakeries'
    },
    color: 'from-amber-600 to-yellow-500'
  },
  {
    id: 'supermarket',
    icon: 'ðŸ›’',
    name: {
      ar: 'Ø³ÙˆØ¨Ø±Ù…Ø§Ø±ÙƒØª',
      ku: 'Ø³Û†Ù¾Û•Ø±Ù…Ø§Ø±Ú©ÛŽØªÛ•Ú©Ø§Ù†',
      en: 'Supermarkets'
    },
    color: 'from-green-600 to-emerald-500'
  },
  {
    id: 'mall',
    icon: 'ðŸ›ï¸',
    name: {
      ar: 'Ù…ÙˆÙ„Ø§Øª ÙˆÙ…Ø±Ø§ÙƒØ² ØªØ³ÙˆÙ‚',
      ku: 'Ù…Û†ÚµÛ•Ú©Ø§Ù†',
      en: 'Malls & Shopping'
    },
    color: 'from-pink-600 to-rose-500'
  },
  {
    id: 'pharmacy',
    icon: 'ðŸ’Š',
    name: {
      ar: 'ØµÙŠØ¯Ù„ÙŠØ§Øª',
      ku: 'Ø¯Û•Ø±Ù…Ø§Ù†Ø®Ø§Ù†Û•Ú©Ø§Ù†',
      en: 'Pharmacies'
    },
    color: 'from-cyan-600 to-sky-500'
  },
  {
    id: 'hospital',
    icon: 'ðŸ¥',
    name: {
      ar: 'Ù…Ø³ØªØ´ÙÙŠØ§Øª',
      ku: 'Ù†Û•Ø®Û†Ø´Ø®Ø§Ù†Û•Ú©Ø§Ù†',
      en: 'Hospitals'
    },
    color: 'from-red-600 to-rose-500'
  },
  {
    id: 'clinic',
    icon: 'ðŸ©º',
    name: {
      ar: 'Ø¹ÙŠØ§Ø¯Ø§Øª Ø·Ø¨ÙŠØ©',
      ku: 'Ú©Ù„ÛŒÙ†ÛŒÚ©Û•Ú©Ø§Ù†',
      en: 'Clinics'
    },
    color: 'from-teal-600 to-emerald-500'
  },
  {
    id: 'doctor',
    icon: 'ðŸ‘¨â€âš•ï¸',
    name: {
      ar: 'Ø£Ø·Ø¨Ø§Ø¡ ÙˆØ¹ÙŠØ§Ø¯Ø§Øª Ø®Ø§ØµØ©',
      ku: 'Ø¯Ú©ØªÛ†Ø±Û•Ú©Ø§Ù†',
      en: 'Doctors'
    },
    color: 'from-blue-600 to-sky-500'
  },
  {
    id: 'dentist',
    icon: 'ðŸ¦·',
    name: {
      ar: 'Ø£Ø·Ø¨Ø§Ø¡ Ø£Ø³Ù†Ø§Ù†',
      ku: 'Ù¾Ø²ÛŒØ´Ú©ÛŒ Ø¯Ø¯Ø§Ù†',
      en: 'Dentists'
    },
    color: 'from-cyan-500 to-indigo-500'
  },
  {
    id: 'salon',
    icon: 'ðŸ’ˆ',
    name: {
      ar: 'ØµØ§Ù„ÙˆÙ†Ø§Øª ÙˆÙ…Ø±Ø§ÙƒØ² ØªØ¬Ù…ÙŠÙ„',
      ku: 'Ø³Ø§ÚµÛ†Ù†ÛŒ Ø¬ÙˆØ§Ù†Ú©Ø§Ø±ÛŒ',
      en: 'Beauty Salons'
    },
    color: 'from-purple-600 to-pink-500'
  },
  {
    id: 'spa',
    icon: 'ðŸ’†â€â™€ï¸',
    name: {
      ar: 'Ù…Ø±Ø§ÙƒØ² Ø³Ø¨Ø§ ÙˆØ§Ø³ØªØ¬Ù…Ø§Ù…',
      ku: 'Ø³ÛŽÙ†ØªÛ•Ø±ÛŒ Ø³Ù¾Ø§',
      en: 'Spas & Wellness'
    },
    color: 'from-fuchsia-600 to-pink-500'
  },
  {
    id: 'gym',
    icon: 'ðŸ‹ï¸',
    name: {
      ar: 'ØµØ§Ù„Ø§Øª Ø±ÙŠØ§Ø¶ÙŠØ© ÙˆØ±Ø´Ø§Ù‚Ø©',
      ku: 'Ù‡Û†ÚµÛ•Ú©Ø§Ù†ÛŒ ÙˆÛ•Ø±Ø²Ø´',
      en: 'Gyms & Fitness'
    },
    color: 'from-emerald-600 to-teal-500'
  },
  {
    id: 'hotel',
    icon: 'ðŸ¨',
    name: {
      ar: 'ÙÙ†Ø§Ø¯Ù‚ ÙˆÙ…Ù†ØªØ¬Ø¹Ø§Øª',
      ku: 'Ù‡Û†ØªÛŽÙ„Û•Ú©Ø§Ù†',
      en: 'Hotels & Resorts'
    },
    color: 'from-indigo-600 to-blue-500'
  },
  {
    id: 'travel_agency',
    icon: 'âœˆï¸',
    name: {
      ar: 'ÙˆÙƒØ§Ù„Ø§Øª Ø³ÙØ± ÙˆØ³ÙŠØ§Ø­Ø©',
      ku: 'Ø¨Ø±ÛŒÚ©Ø§Ø±ÛŒ Ú¯Û•Ø´ØªÙˆÚ¯ÙˆØ²Ø§Ø±',
      en: 'Travel Agencies'
    },
    color: 'from-sky-500 to-blue-600'
  },
  {
    id: 'university',
    icon: 'ðŸŽ“',
    name: {
      ar: 'Ø¬Ø§Ù…Ø¹Ø§Øª ÙˆÙ…Ø¹Ø§Ù‡Ø¯',
      ku: 'Ø²Ø§Ù†Ú©Û†Ú©Ø§Ù†',
      en: 'Universities'
    },
    color: 'from-violet-600 to-purple-500'
  },
  {
    id: 'bank',
    icon: 'ðŸ¦',
    name: {
      ar: 'Ø¨Ù†ÙˆÙƒ ÙˆÙ…ØµØ§Ø±Ù',
      ku: 'Ø¨Ø§Ù†Ú©Û•Ú©Ø§Ù†',
      en: 'Banks & Finance'
    },
    color: 'from-green-600 to-teal-600'
  },
  {
    id: 'real_estate',
    icon: 'ðŸ¢',
    name: {
      ar: 'Ø¹Ù‚Ø§Ø±Ø§Øª ÙˆÙ…ÙƒØ§ØªØ¨ Ø¯Ù„Ø§Ù„ÙŠØ©',
      ku: 'Ø¹Û•Ù‚Ø§Ø±Ø§Øª',
      en: 'Real Estate'
    },
    color: 'from-rose-500 to-amber-600'
  },
  {
    id: 'lawyer',
    icon: 'âš–ï¸',
    name: {
      ar: 'Ù…Ø­Ø§Ù…ÙˆÙ† ÙˆØ§Ø³ØªØ´Ø§Ø±Ø§Øª Ù‚Ø§Ù†ÙˆÙ†ÙŠØ©',
      ku: 'Ù¾Ø§Ø±ÛŽØ²Û•Ø±Ø§Ù†',
      en: 'Lawyers & Legal'
    },
    color: 'from-amber-700 to-orange-600'
  },
  {
    id: 'car_dealer',
    icon: 'ðŸš—',
    name: {
      ar: 'Ù…Ø¹Ø§Ø±Ø¶ Ø³ÙŠØ§Ø±Ø§Øª',
      ku: 'Ù¾ÛŒØªØ§Ú©ÛŒ Ø¦Û†ØªÛ†Ù…Ø¨ÛŽÙ„',
      en: 'Car Dealers'
    },
    color: 'from-yellow-500 to-orange-500'
  },
  {
    id: 'car_rental',
    icon: 'ðŸ”‘',
    name: {
      ar: 'ØªØ£Ø¬ÙŠØ± Ø³ÙŠØ§Ø±Ø§Øª',
      ku: 'Ú©Ø±ÛŽÛŒ Ø¦Û†ØªÛ†Ù…Ø¨ÛŽÙ„',
      en: 'Car Rental'
    },
    color: 'from-teal-500 to-cyan-500'
  },
  {
    id: 'mobile_shop',
    icon: 'ðŸ“±',
    name: {
      ar: 'Ù…ØªØ§Ø¬Ø± Ù‡ÙˆØ§ØªÙ ÙˆØ¥Ù„ÙƒØªØ±ÙˆÙ†ÙŠØ§Øª',
      ku: 'Ù…Û†Ø¨Ø§ÛŒÙ„ Ùˆ Ø¦Û•Ù„ÛŒÚ©ØªØ±Û†Ù†ÛŒØ§Øª',
      en: 'Mobile Shops'
    },
    color: 'from-violet-500 to-indigo-500'
  },
  {
    id: 'furniture',
    icon: 'ðŸ›‹ï¸',
    name: {
      ar: 'Ù…ÙØ±ÙˆØ´Ø§Øª ÙˆØ£Ø«Ø§Ø« Ù…Ù†Ø²Ù„ÙŠ',
      ku: 'Ú©Û•Ù„Û•Ù¾ÙˆÙˆØ± Ùˆ Ù…Û†Ø¨Ø§ÛŒÙ„Û•Ú©Ø§Ù†',
      en: 'Furniture'
    },
    color: 'from-amber-800 to-amber-600'
  },
  {
    id: 'clothing_store',
    icon: 'ðŸ‘”',
    name: {
      ar: 'Ù…ØªØ§Ø¬Ø± Ø£Ù„Ø¨Ø³Ø© ÙˆØ£Ø²ÙŠØ§Ø¡',
      ku: 'ÙØ±Û†Ø´Ú¯Ø§Ú©Ø§Ù†ÛŒ Ø¬Ù„ÙˆØ¨Û•Ø±Ú¯',
      en: 'Clothing Stores'
    },
    color: 'from-pink-500 to-purple-500'
  },
  {
    id: 'software_company',
    icon: 'ðŸ’»',
    name: {
      ar: 'Ø´Ø±ÙƒØ§Øª Ø¨Ø±Ù…Ø¬ÙŠØ§Øª ÙˆØªÙ‚Ù†ÙŠØ©',
      ku: 'Ú©Û†Ù…Ù¾Ø§Ù†ÛŒØ§Ú©Ø§Ù†ÛŒ ØªÛ•Ú©Ù†Û•Ù„Û†Ø¬ÛŒØ§',
      en: 'Tech & Software'
    },
    color: 'from-blue-700 to-indigo-600'
  },
  {
    id: 'marketing_agency',
    icon: 'ðŸ“£',
    name: {
      ar: 'ÙˆÙƒØ§Ù„Ø§Øª ØªØ³ÙˆÙŠÙ‚ ÙˆØ¥Ø¹Ù„Ø§Ù†',
      ku: 'Ú•ÛŒÚ©Ù„Ø§Ù… Ùˆ Ù…Ø§Ø±Ú©ÛŽØªÛŒÙ†Ú¯',
      en: 'Marketing Agencies'
    },
    color: 'from-purple-500 to-fuchsia-500'
  },
  {
    id: 'construction_company',
    icon: 'ðŸ—ï¸',
    name: {
      ar: 'Ø´Ø±ÙƒØ§Øª Ù…Ù‚Ø§ÙˆÙ„Ø§Øª ÙˆØ¥Ù†Ø´Ø§Ø¡Ø§Øª',
      ku: 'Ú©Û†Ù…Ù¾Ø§Ù†ÛŒØ§Ú©Ø§Ù†ÛŒ Ø¨ÛŒÙ†Ø§Ø³Ø§Ø²ÛŒ',
      en: 'Construction'
    },
    color: 'from-yellow-600 to-amber-700'
  },
  {
    id: 'architecture',
    icon: 'ðŸ“',
    name: {
      ar: 'Ù…ÙƒØ§ØªØ¨ Ù‡Ù†Ø¯Ø³ÙŠØ© ÙˆØªØµÙ…ÙŠÙ…',
      ku: 'Ø¦Û•Ù†Ø¯Ø§Ø²ÛŒØ§Ø±ÛŒ Ùˆ Ù†Û•Ø®Ø´Û•Ø³Ø§Ø²ÛŒ',
      en: 'Architecture & Design'
    },
    color: 'from-teal-500 to-blue-500'
  },
  {
    id: 'photography',
    icon: 'ðŸ“·',
    name: {
      ar: 'Ø§Ø³ØªÙˆØ¯ÙŠÙˆÙ‡Ø§Øª ØªØµÙˆÙŠØ±',
      ku: 'Ø³ØªÛ†Ø¯ÛŒÛ†Ú©Ø§Ù†ÛŒ ÙˆÛŽÙ†Û•Ú¯Ø±ØªÙ†',
      en: 'Photography'
    },
    color: 'from-pink-600 to-purple-500'
  },
  {
    id: 'cinema',
    icon: 'ðŸŽ¬',
    name: {
      ar: 'Ø³ÙŠÙ†Ù…Ø§ ÙˆØ¹Ø±ÙˆØ¶ Ø£ÙÙ„Ø§Ù…',
      ku: 'Ø³ÛŒÙ†Û•Ù…Ø§Ú©Ø§Ù†',
      en: 'Cinema & Theatres'
    },
    color: 'from-red-600 to-amber-500'
  },
  {
    id: 'gaming_center',
    icon: 'ðŸŽ®',
    name: {
      ar: 'Ù…Ø±Ø§ÙƒØ² Ø£Ù„Ø¹Ø§Ø¨ ÙƒÙˆÙ…Ø¨ÙŠÙˆØªØ±',
      ku: 'Ø³Û•Ù†ØªÛ•Ø±ÛŒ ÛŒØ§Ø±ÛŒÛŒÛ•Ú©Ø§Ù†',
      en: 'Gaming Centers'
    },
    color: 'from-indigo-600 to-purple-600'
  },
  {
    id: 'sports_club',
    icon: 'âš½',
    name: {
      ar: 'Ù†ÙˆØ§Ø¯ÙŠ Ø±ÙŠØ§Ø¶ÙŠØ© ÙˆÙ…Ù„Ø§Ø¹Ø¨',
      ku: 'ÛŒØ§Ù†Û• ÙˆÛ•Ø±Ø²Ø´ÛŒÛŒÛ•Ú©Ø§Ù†',
      en: 'Sports Clubs'
    },
    color: 'from-emerald-500 to-green-600'
  },
  {
    id: 'pet_shop',
    icon: 'ðŸ±',
    name: {
      ar: 'Ù…ØªØ§Ø¬Ø± ÙˆØ¹ÙŠØ§Ø¯Ø§Øª Ø­ÙŠÙˆØ§Ù†Ø§Øª Ø£Ù„ÙŠÙØ©',
      ku: 'Ø¦Ø§Ú˜Û•ÚµÛ• Ù…Ø§ÚµÛŒÛŒÛ•Ú©Ø§Ù†',
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

const RAW_INITIAL_POSTS: SocialPost[] = [
  {
    id: 'post-1',
    businessId: 'b-1',
    businessName: 'Lova CafÃ© - Karrada',
    businessAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    category: 'coffee',
    governorate: 'baghdad',
    mediaUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=80',
    caption: {
      ar: 'ØªØ¨Ø­Ø« Ø¹Ù† Ù‡Ø¯ÙˆØ¡ ÙˆØ¥Ù†Ø¬Ø§Ø²ØŸ Ø£Ø¬ÙˆØ§Ø¡ Ø§Ù„Ø¯Ø±Ø§Ø³Ø© ÙˆØ§Ù„Ø¹Ù…Ù„ ÙÙŠ ÙƒØ§ÙÙŠÙ‡ Ù„ÙˆÙØ§ Ø¨Ø§Ù„ÙƒØ±Ø§Ø¯Ø© ØªÙˆÙØ± Ù„Ùƒ ÙƒÙ„ Ø³Ø¨Ù„ Ø§Ù„Ø±ÙˆØ§Ù‚ Ø§Ù„Ø¨ØºØ¯Ø§Ø¯ÙŠ Ø§Ù„Ø£ØµÙŠÙ„ ðŸ“š Ø§Ù†ØªØ±Ù†Øª ÙØ§Ø¦Ù‚ Ø§Ù„Ø³Ø±Ø¹Ø©ØŒ Ø¨ÙŠØ¦Ø© Ù…Ø±ÙŠØ­Ø© ÙˆØ®Ø§Ù„ÙŠØ© Ù…Ù† Ø§Ù„Ø¶Ø¬ÙŠØ¬ ÙƒØ±ÙˆØ´Ø© Ø³ÙŠÙ†Ù…Ø§Ø¦ÙŠØ© Ø±Ø§Ù‚ÙŠØ©ØŒ ÙˆØ¬Ø±Ø¨ Ø§Ù„ÙƒØ§Ø¨ØªØ´ÙŠÙ†Ùˆ Ù…Ø§Ù„ØªÙ†Ø§ Ù…Ø¹ Ø§Ù„Ù‡ÙŠÙ„ Ø§Ù„Ø¹Ø±Ø§Ù‚ÙŠ Ø§Ù„Ù…Ù…ÙŠØ²! â˜•âœ¨ Ù…ÙØªÙˆØ­ÙˆÙ† ÙŠÙˆÙ…ÙŠØ§Ù‹ Ù„ØºØ§ÙŠØ© Ù…Ù†ØªØµÙ Ø§Ù„Ù„ÙŠÙ„. Ù‡Ø§ØªÙ Ù„Ù„ØªÙˆØ§ØµÙ„: +9647701234567 â€¢ Ø§Ù„ÙƒØ±Ø§Ø¯Ø© Ø¯Ø§Ø®Ù„ØŒ Ù‚Ø±Ø¨ Ø³Ø§Ø­Ø© Ø§Ù„ØªØ­Ø±ÙŠØ§Øª.',
      ku: 'Ú˜ÛŒÙ†Ú¯Û•ÛŒÛ•Ú©ÛŒ Ù‡ÛŽÙ…Ù† Ùˆ Ù†Ø§ÛŒØ§Ø¨ Ø¨Û† Ø®ÙˆÛŽÙ†Ø¯Ù† Ùˆ Ú©Ø§Ø±Ú©Ø±Ø¯Ù† Ù„Û• Ú©Ø§ÙÛŽ Ù„Û†Ú¤Ø§ Ù„Û• Ø¨Û•ØºØ¯Ø§Ø¯ ðŸ“š Ø¦ÛŒÙ†ØªÛ•Ø±Ù†ÛŽØªÛŒ ÙÛŽØ±Ø§ØŒ Ú©Û•Ø´ÛŽÚ©ÛŒ Ø¯ÚµÚ¯ÛŒØ± ÙˆÛ•Ú© Ú•Û†Ú˜ÛŽÚ©ÛŒ Ø¨Û•Ù‡Ø§Ø±ÛŒ Ú•ÙˆÙˆÙ†Ø§Ú©ØŒ Ù„Û•Ú¯Û•Úµ Ù‚Ø§ÙˆÛ•ÛŒ Ù†Ø§ÛŒØ§Ø¨ÛŒ Ù‡ÛŽÙ„ÛŒ Ø¹ÛŽØ±Ø§Ù‚ÛŒ! â˜•âœ¨ Ù‡Û•Ù…ÙˆÙˆ Ú•Û†Ú˜ÛŽÚ© ØªØ§ Ù†ÛŒÙˆÛ•ÛŒ Ø´Û•Ùˆ Ú©Ø±Ø§ÙˆÛ•ÛŒÛ•. ØªÛ•Ù„Û•ÙÛ†Ù†: +9647701234567 â€¢ Ú©Û•Ú•Ø§Ø¯Û•ÛŒ Ù†Ø§ÙˆÛ•ÙˆÛ•.',
      en: 'Vibrant vibes, premium cinematic aesthetic, and quiet spaces to fuel your daily hustle. Come try our specialty Cardamom Espresso Brew at Lova now! ðŸ“š Fast Wi-Fi, cozy reading corners, and outstanding service. Open daily 8:00 AM - Midnight. Contact: +9647701234567 â€¢ Karrada Inside, Near Tahariyat Square â˜•âœ¨'
    },
    likes: 248,
    commentsCount: 2,
    shares: 34,
    views: 1150,
    timeAgo: {
      ar: 'Ù…Ù†Ø° Ù£ Ø³Ø§Ø¹Ø§Øª',
      ku: 'Ù£ Ú©Ø§ØªÚ˜Ù…ÛŽØ± Ù¾ÛŽØ´ Ø¦ÛŽØ³ØªØ§',
      en: '3 hours ago'
    },
    likedByUser: false,
    savedByUser: false,
    comments: [
      { id: 'c1', username: 'hasan_baghdadi', text: 'Ø§Ù„ÙƒØ§ÙÙŠÙ‡ Ø§Ù„Ù…ÙØ¶Ù„ Ø¹Ù†Ø¯ÙŠ Ø¨Ø§Ù„ÙƒØ±Ø§Ø¯Ø©ØŒ Ø§Ù„Ø®Ø¯Ù…Ø© ÙØ¯ Ø´ÙŠ Ø±Ø§Ù‚ÙŠ ÙˆØ§Ù„Ù‚Ù‡ÙˆØ© Ø®Ø±Ø§ÙÙŠØ© ðŸ”¥', time: '1h' },
      { id: 'c2', username: 'layla.iq', text: 'Beautiful location, highly recommended for working remotely. Fast wifi!', time: '30m' }
    ],
    promotionBadge: {
      ar: 'ØªØ±ÙŠÙ†Ø¯ Ø§Ù„ÙƒØ±Ø§Ø¯Ø© ðŸ”¥',
      ku: 'ØªØ±ÛŽÙ†Ø¯ÛŒ Ú©Û•Ú•Ø§Ø¯Û• ðŸ”¥',
      en: 'Karrada Hotspot ðŸ”¥'
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
      ar: 'Ø§Ù„Ù…Ø³ÙƒÙˆÙ Ø§Ù„Ø¨ØºØ¯Ø§Ø¯ÙŠ Ø§Ù„Ø£ØµÙŠÙ„ Ø¹Ù„Ù‰ Ø¶ÙØ§Ù Ù†Ù‡Ø± Ø¯Ø¬Ù„Ø© Ø§Ù„Ø³Ø§Ø­Ø± ÙÙŠ Ø£Ø¨Ùˆ Ù†Ø¤Ø§Ø³! ðŸŸðŸ”¥ Ø³Ù…Ùƒ Ø·Ø§Ø²Ø¬ ÙŠÙØ´ÙˆÙ‰ Ø¹Ù„Ù‰ Ø­Ø·Ø¨ Ø§Ù„ØµÙØµØ§Ù Ù„Ù…Ø°Ø§Ù‚ Ø¨ØºØ¯Ø§Ø¯ÙŠ Ø¯Ø§ÙØ¦ Ù„Ø§ ÙŠÙ†Ø³Ù‰ ÙŠØ±Ø¬Ø¹Ùƒ Ù„Ø£ÙŠØ§Ù… Ø¨ØºØ¯Ø§Ø¯ Ø§Ù„Ù‚Ø¯ÙŠÙ…Ø© Ø§Ù„Ø¯Ø§ÙØ¦Ø©. Ø¨ÙŠØ¦Ø© Ø¹Ø§Ø¦Ù„ÙŠØ© Ø±Ø§Ù‚ÙŠØ© ÙˆÙ…Ø¬Ù„Ø³ Ù…Ø·Ù„ Ø¹Ù„Ù‰ Ø§Ù„Ù†Ù‡Ø± ØªØ­Øª Ø§Ù„Ù†Ø¬ÙˆÙ… Ø§Ù„Ø¨ØºØ¯Ø§Ø¯ÙŠØ© Ø§Ù„Ù„Ø§Ù…Ø¹Ø©. Ù†Ø¹Ù…Ù„ Ù…Ù† 12 Ø¸Ù‡Ø±Ø§Ù‹ Ù„ØºØ§ÙŠØ© 2 Ø¨Ø¹Ø¯ Ù…Ù†ØªØµÙ Ø§Ù„Ù„ÙŠÙ„. Ù‡Ø§ØªÙ Ù„Ù„Ø­Ø¬Ø² ÙˆØ§Ù„Ø§Ø³ØªÙØ³Ø§Ø± Ø§Ù„ÙÙˆØ±ÙŠ: +9647719998822 â€¢ Ø´Ø§Ø±Ø¹ Ø£Ø¨Ùˆ Ù†Ø¤Ø§Ø³ØŒ Ù‚Ø±Ø¨ ØªÙ…Ø«Ø§Ù„ Ø´Ù‡Ø±ÙŠØ§Ø± ÙˆØ´Ù‡Ø±Ø²Ø§Ø¯.',
      ku: 'Ù…Ø§Ø³ÛŒ Ù…Û•Ø³Ú¯ÙˆÙÛŒ Ø¨Û•ØºØ¯Ø§Ø¯ÛŒ Ú•Û•Ø³Û•Ù† Ù„Û•Ø³Û•Ø± Ú©Û•Ù†Ø§Ø±ÛŒ Ú•ÙˆÙˆØ¨Ø§Ø±ÛŒ Ø¯Ø¬Ù„Û•ÛŒ ÙÛŽÙ†Ú©! ðŸŸðŸ”¥ Ù…Ø§Ø³ÛŒ Ø²Û†Ø± ØªØ§Ø²Û• Ø¨Û• ØªØ§Ù…ÛŒ Ø¯Ø§Ø±ÛŒ Ø³Ø±ÙˆØ´ØªÛŒ. Ú¯ÙˆÙ†Ø¬Ø§ÙˆÛ• Ø¨Û† Ø®ÛŽØ²Ø§Ù† Ùˆ Ø¯Û†Ø³Øª Ø¨Û† Ø¨ÛŒÙ†ÛŒÙ†ÛŒ Ø¯ÛŒÙ…Û•Ù†ÛŒ Ø¯Ø¬Ù„Û•. ØªØ§ Ù¢ÛŒ Ø´Û•Ùˆ Ú©Ø±Ø§ÙˆÛ•ÛŒÛ•. ØªÛ•Ù„Û•ÙÛ†Ù†: +9647719998822.',
      en: 'Golden traditional charcoal-grilled Tigris River Masgouf fish served sizzling hot. Experience absolute culinary heaven tonight with your family under the old Baghdad stars and refreshing river breeze. Open 12:00 PM - 2:00 AM. For premium family reservation tables, hotline: +9647719998822 â€¢ Abu Nuwas St ðŸŸðŸ”¥'
    },
    likes: 485,
    commentsCount: 2,
    shares: 82,
    views: 2550,
    timeAgo: {
      ar: 'Ù…Ù†Ø° Ù¤ Ø³Ø§Ø¹Ø§Øª',
      ku: 'Ù¤ Ú©Ø§ØªÚ˜Ù…ÛŽØ± Ù¾ÛŽØ´ Ø¦ÛŽØ³ØªØ§',
      en: '4 hours ago'
    },
    likedByUser: true,
    savedByUser: false,
    comments: [
      { id: 'c3', username: 'ali_basrawi', text: 'Ø£Ø¬Ù…Ù„ Ø¥Ø·Ù„Ø§Ù„Ø© ÙˆØ£Ø±ÙˆØ¹ Ù…Ø³ÙƒÙˆÙ Ù…Ø± Ø¹Ù„ÙŠ Ø¨Ø¨ØºØ¯Ø§Ø¯ Ø­Ø¨ÙŠØ¨Ø© Ù‚Ù„Ø¨ÙŠ â¤ï¸', time: '2h' },
      { id: 'c4', username: 'kurdo_erbil', text: 'Ø²ÙˆØ± Ø¬ÙˆØ§Ù†Ø©ØŒ Ù„Ø§Ø²Ù… Ù†Ø²ÙˆØ±ÙƒÙ… Ø§Ù„Ø£Ø³Ø¨ÙˆØ¹ Ø§Ù„Ù‚Ø§Ø¯Ù… Ø§Ù† Ø´Ø§Ø¡ Ø§Ù„Ù„Ù‡ Ù…Ø¹ Ø§Ù„Ø¹Ø§Ø¦Ù„Ø©', time: '1h' }
    ],
    promotionBadge: {
      ar: 'Ø¹Ø±Ø¶ Ø¹Ø§Ø¦Ù„ÙŠ Ù…Ù…ÙŠØ² ðŸ‘¨â€ðŸ‘©â€ðŸ‘§â€ðŸ‘¦',
      ku: 'Ù¾ÛŽØ´Ù†ÛŒØ§Ø±ÛŒ Ø®ÛŽØ²Ø§Ù†ÛŒ ðŸ‘¨â€ðŸ‘©â€ðŸ‘§â€ðŸ‘¦',
      en: 'Family Deal Special ðŸ‘¨â€ðŸ‘©â€ðŸ‘§â€ðŸ‘¦'
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
      ar: 'Ø¨Ø±ÙƒØ§Ù† Ù…Ù† Ø¬Ø¨Ù†Ø© Ø§Ù„Ø´ÙŠØ¯Ø± Ø§Ù„Ù…Ø¹ØªÙ‚Ø© ÙˆØ§Ù„Ù„Ø­Ù… Ø§Ù„Ø¨Ù„Ø¯ÙŠ Ø§Ù„Ø¹Ø±Ø§Ù‚ÙŠ Ø§Ù„Ø·Ø§Ø²Ø¬! ðŸ”ðŸ§€ Ù‡Ù„ Ø¬Ø±Ø¨Øª Ø¨Ø±ØºØ± Ø§Ù„Ù„Ø­Ù… Ø§Ù„Ù…Ø­Ø´ÙŠ Ø¨Ø¬Ø¨Ù†ØªÙ†Ø§ Ø§Ù„Ù„Ø°ÙŠØ°Ø© ÙÙŠ ÙØ±Ø¹Ù†Ø§ Ø§Ù„Ø¨Ø®ØªÙŠØ§Ø±ÙŠØŸ Ù„Ø­Ù… Ø¨Ù„Ø¯ÙŠ Ù…Ø­Ù„ÙŠ Ø·Ø§Ø²Ø¬ ÙŠØ­Ø¶Ø± ÙŠÙˆÙ…ÙŠØ§Ù‹ Ø®ØµÙŠØµØ§Ù‹ Ù„ÙƒÙ… Ø¨Ø®Ù„Ø·Ø§Øª ÙƒØ±Ø§ÙØª Ø§Ù„Ø³Ø±ÙŠØ©. Ø§Ø´ØªØ±Ù Ø£ÙŠ ÙˆØ¬Ø¨Ø© Ø¨Ø±ØºØ± ÙˆØ§Ø­ØµÙ„ Ø¹Ù„Ù‰ Ø¨Ø·Ø§Ø·Ø§ ÙƒØ±Ø§ÙØª ÙˆØµÙˆØ¯Ø§ Ù…Ø¬Ø§Ù†Ø§Ù‹ Ø¨Ø§Ù„ÙƒØ§Ù…Ù„ Ù„Ù„Ø·Ù„Ø§Ø¨ ÙˆØ§Ù„Ù…ØªØ§Ø¨Ø¹ÙŠÙ†! ðŸŸ Ù‡Ø§ØªÙ: +9647504449900 â€¢ Ø£Ø±Ø¨ÙŠÙ„ØŒ Ø­ÙŠ Ø¨Ø®ØªÙŠØ§Ø±ÙŠØŒ Ø´Ø§Ø±Ø¹ Ø§Ù„Ù…Ø·Ø§Ø¹Ù… Ø§Ù„Ø±Ø¦ÙŠØ³ÙŠ.',
      ku: 'Ú©ÛŽ Ø­Û•Ø²ÛŒ Ù„Û• Ø¨Û•Ø±Ú¯Ø±ÛŒ Ø¨Û•ØªØ§Ù…Û•ØŸ ðŸ”ðŸ§€ Ú¯Û†Ø´ØªÛŒ ÙØ±ÛŽØ´ÛŒ Ú©ÙˆØ±Ø¯ÛŒ Ø¨Û• Ø´ÛŽÙˆØ§Ø² Ùˆ Ø³Û†Ø³ÛŒ ØªØ§ÛŒØ¨Û•Øª Ù„Û• Ú¯Û•Ú•Û•Ú©ÛŒ Ø¨Û•Ø®ØªÛŒØ§Ø±ÛŒ Ù‡Û•ÙˆÙ„ÛŽØ±. Ú˜Û•Ù…Û• Ù‡Û•Ù…Ø¨Û•Ø±Ú¯Ø±ÛŽÚ© Ø¨Ú©Ú•Û• Ùˆ Ù¾Û•ØªØ§ØªÛ•ÛŒ Ú¯Û•Ø±Ù… Ùˆ Ø³Û†Ø¯Ø§ Ø¨ÛŽØ¨Û•Ø±Ø§Ù…Ø¨Û•Ø± ÙˆÛ•Ø±Ø¨Ú¯Ø±Û•! ØªÛ•Ù„Û•ÙÛ†Ù†: +9647504449900.',
      en: 'Oozing cheddar cheese explosion, hand-pressed prime local beef, and gourmet toasted brioche. Your dream burger is waiting for you at Craft Burger Bakhtiyari Erbil! ðŸ”ðŸ§€ Buy any combo and get free craft fries & soda upgrade today! Hotline: +9647504449900 â€¢ Bakhtiyari Main Boulevard ðŸŸ'
    },
    likes: 215,
    commentsCount: 1,
    shares: 29,
    views: 1020,
    timeAgo: {
      ar: 'Ù…Ù†Ø° ÙŠÙˆÙ…',
      ku: 'Ø¯ÙˆÛŽÙ†ÛŽ',
      en: '1 day ago'
    },
    likedByUser: false,
    savedByUser: true,
    comments: [
      { id: 'c5', username: 'shanga_erbil', text: 'The best service and the absolute juiciest burgers in Erbil Bakhtiyari ðŸ”ðŸŸ', time: '18h' }
    ],
    promotionBadge: {
      ar: 'ØªØ±Ù‚ÙŠØ© Ø§Ù„ÙˆØ¬Ø¨Ø© Ù…Ø¬Ø§Ù†Ø§Ù‹ ðŸŸ',
      ku: 'Ù¾Û•ØªØ§ØªÛ•ÛŒ Ø¨Û•Ø®Û†Ú•Ø§ÛŒÛŒ ðŸŸ',
      en: 'Free Fries Upgrade ðŸŸ'
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
      ar: 'Ø§Ø­ØµÙ„ Ø¹Ù„Ù‰ Ø§Ø¨ØªØ³Ø§Ù…Ø© Ø£Ø­Ù„Ø§Ù…Ùƒ Ø§Ù„ÙˆØ§Ø«Ù‚Ø© ÙˆØ§Ù„ØµØ­ÙŠØ©! â­ðŸ¦· Ø¹ÙŠØ§Ø¯Ø© Ø§Ù„Ù†Ø®Ø¨Ø© Ù„Ø·Ø¨ Ø§Ù„Ø£Ø³Ù†Ø§Ù† Ø¨ÙØ±Ø¹Ù‡Ø§ Ø§Ù„ØªØ®ØµØµÙŠ Ø¨Ø§Ù„Ù…Ù†ØµÙˆØ± ØªÙ‚Ø¯Ù… Ø£Ø­Ø¯Ø« ØªÙ‚Ù†ÙŠØ§Øª ØªØ¨ÙŠÙŠØ¶ Ø§Ù„Ø£Ø³Ù†Ø§Ù† Ø¨Ø§Ù„Ù„ÙŠØ²Ø± ÙˆØªØµÙ…ÙŠÙ… Ø§Ø¨ØªØ³Ø§Ù…Ø© Ù‡ÙˆÙ„ÙŠÙˆØ¯ Ø§Ù„Ø¨Ø±Ø§Ù‚Ø© Ø¨Ø¯ÙˆÙ† Ø£Ù„Ù… ÙˆØ¨Ø¥Ø´Ø±Ø§Ù Ù†Ø®Ø¨Ø© Ù…Ù† ÙƒØ¨Ø§Ø± Ø§Ù„Ø£Ø®ØµØ§Ø¦ÙŠÙŠÙ†. ØªÙ†Ø¸ÙŠÙ ÙˆØªÙ„Ù…ÙŠØ¹ Ø£Ø³Ù†Ø§Ù† Ù…Ø¬Ø§Ù†ÙŠ ØªÙ…Ø§Ù…Ø§Ù‹ Ù…Ø¹ Ø£ÙŠ ÙØ­Øµ Ø´Ø§Ù…Ù„ Ù„Ù„Ù…ØªØ§Ø¨Ø¹ÙŠÙ†. Ø§Ø­Ø¬Ø² Ù…ÙˆØ¹Ø¯Ùƒ Ø§Ù„Ø¢Ù†: +964782334455 â€¢ Ø§Ù„Ù…Ù†ØµÙˆØ±ØŒ Ø´Ø§Ø±Ø¹ Ø§Ù„Ø±ÙˆØ§Ø¯ØŒ Ø¹Ù…Ø§Ø±Ø© Ø§Ù„Ù†Ø®Ø¨Ø©ØŒ Ø§Ù„Ø·Ø§Ø¨Ù‚ Ø§Ù„Ø«Ø§Ù†ÙŠ. Ø£ÙˆÙ‚Ø§Øª Ø§Ù„Ø¹Ù…Ù„ Ù…Ù† 3:00 Ù…Ø³Ø§Ø¡Ù‹ Ù„ØºØ§ÙŠØ© 9:00 Ù…Ø³Ø§Ø¡Ù‹.',
      ku: 'Ù¾ÛŽØ¨Ú©Û•Ù†ÛŒÙ†ÛŽÚ©ÛŒ Ø³Ù¾ÛŒÛŒ Ø´Ø§ÛŒØ³ØªÛ• Ùˆ Ù†Ø§ÙˆØ§Ø²Û• Ø¨Û•Ø¯Û•Ø³ØªØ¨Ù‡ÛŽÙ†Û•! â­ðŸ¦· Ú©Ù„ÛŒÙ†ÛŒÚ©ÛŒ Ù†ÙˆØ®Ø¨Û• Ø¨Û† Ù¾Ø²ÛŒØ´Ú©ÛŒ Ø¯Ø¯Ø§Ù†ÛŒ Ø¬ÙˆØ§Ù†Ú©Ø§Ø±ÛŒ Ù„Û• Ø¨Û•ØºØ¯Ø§Ø¯ Ù…Û•Ù†Ø³ÙˆÙˆØ± Ø¨Ø§Ø´ØªØ±ÛŒÙ† Ú†Ø§Ø±Û•Ø³Û•Ø± Ùˆ Ø³Ù¾ÛŒÚ©Ø±Ø¯Ù†Û•ÙˆÛ•ÛŒ Ø¯Ø¯Ø§Ù† Ø¨Û• Ú¯Ø±Û•Ù†ØªÛŒ Ù¾ÛŽØ´Ú©Û•Ø´ Ø¯Û•Ú©Ø§Øª. Ø²Û•Ø±Ø¯Û•Ø®Û•Ù†Û•ÛŒ Ù‡Û†Ù„ÛŒÙˆÙˆØ¯ Ø¨Û•Ø¨ÛŽ Ø¦Ø§Ø²Ø§Ø± Ù¾ÛŽØ´Ú©Û•Ø´Û•. ØªÛ•Ù„Û•ÙÛ†Ù† Ø¨Û† Ø­ÛŒØ¬Ø²Ú©Ø±Ø¯Ù†: +964782334455. Ú©Ø±Ø§ÙˆÛ•ÛŒÛ• Ù„Û• Ù£ÛŒ Ø¦ÛŽÙˆØ§Ø±Û• ØªØ§ Ù©ÛŒ Ø´Û•Ùˆ.',
      en: 'Get the perfect radiant smile you deserve! â­ðŸ¦· Al-Nukhba Clinic offers advanced cosmetic teeth whitening, professional smile design, and pain-free laser scaling. Free cleaning session included with any comprehensive consultation for Saku Maku users! Book today: +964782334455 â€¢ Al-Mansour, Al-Rowad Street, Al-Nukhba Bldg, 2nd floor ðŸ¦·'
    },
    likes: 142,
    commentsCount: 2,
    shares: 55,
    views: 820,
    timeAgo: {
      ar: 'Ù…Ù†Ø° Ù§ Ø³Ø§Ø¹Ø§Øª',
      ku: 'Ù§ Ú©Ø§ØªÚ˜Ù…ÛŽØ± Ù¾ÛŽØ´ Ø¦ÛŽØ³ØªØ§',
      en: '7 hours ago'
    },
    likedByUser: false,
    savedByUser: false,
    comments: [
      { id: 'c11', username: 'dr_samir', text: 'Ø¬Ù‡Ø§Ø² ØªØ¨ÙŠÙŠØ¶ Ø§Ù„Ø£Ø³Ù†Ø§Ù† Ø¨Ø§Ù„Ù„ÙŠØ²Ø± Ø¹Ù†Ø¯Ù‡Ù… ÙØ¯ Ø´ÙŠ Ù…ØªØ·ÙˆØ±ØŒ ÙˆØ²Ø±ØªÙ‡Ù… Ø§Ù„Ø£Ø³Ø¨ÙˆØ¹ Ø§Ù„ÙØ§Øª Ø´ØºÙ„ Ø±Ø§Ù‚ÙŠ', time: '5h' },
      { id: 'c12', username: 'noor_beauty', text: 'Very neat clinic and professional dental care!', time: '2h' }
    ],
    promotionBadge: {
      ar: 'Ø§Ø³ØªØ´Ø§Ø±Ø© Ù…Ø¬Ø§Ù†ÙŠØ© ðŸ©º',
      ku: 'Ù¾Ø´Ú©Ù†ÛŒÙ†ÛŒ Ø¨ÛŽØ¨Û•Ø±Ø§Ù…Ø¨Û•Ø± ðŸ©º',
      en: 'Free Consultation ðŸ©º'
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
      ar: 'ØªØ£Ù„Ù‚ÙŠ Ù‡Ø°Ø§ Ø§Ù„Ù…ÙˆØ³Ù… Ø¨Ø£Ø±ÙˆØ¹ ØªØ´ÙƒÙŠÙ„Ø© Ù…Ù† Ù…Ù„Ø§Ø¨Ø³ Ø§Ù„ÙƒØªØ§Ù† Ø§Ù„Ø®ÙÙŠÙØ© ÙˆØ§Ù„Ø£Ø²ÙŠØ§Ø¡ Ø§Ù„Ù†Ø³Ø§Ø¦ÙŠØ© Ø§Ù„ÙØ§Ø®Ø±Ø©! ðŸ‘—âœ¨ Ù…ØµÙ…Ù…Ø© Ø¨Ø£ÙŠØ¯ÙŠ Ù†Ø®Ø¨Ø© Ù…Ù† Ø§Ù„Ù…Ø¨Ø¯Ø¹ÙŠÙ† Ø§Ù„Ø¹Ø±Ø§Ù‚ÙŠÙŠÙ† Ù„ØªØ¶ÙÙŠ Ø¹Ù„ÙŠÙƒ Ù„Ù…Ø³Ø© Ù…Ù† Ø§Ù„Ø¬Ø§Ø°Ø¨ÙŠØ© ÙˆØ§Ù„Ø£Ù†Ø§Ù‚Ø© ÙÙŠ Ø¹Ø·Ù„Ø§Øª Ø§Ù„Ø¹Ù…Ù„ ÙˆØ§Ù„Ù…Ù†Ø§Ø³Ø¨Ø§Øª Ø§Ù„Ø±Ø³Ù…ÙŠØ©. ØªÙ… Ø¥Ø·Ù„Ø§Ù‚ ØªØ´ÙƒÙŠÙ„Ø© Ø§Ù„ØµÙŠÙ Ø§Ù„Ø¬Ø¯ÙŠØ¯Ø© Ø¨Ø§Ù„ÙƒØ§Ù…Ù„ Ù…Ø¹ Ø®ØµÙ… Ù¡Ù¥Ùª Ù„Ù…Ù† ÙŠØ¯ÙØ¹ Ø¨Ù†Ø¸Ø§Ù… Ø§Ù„ÙƒØ§Ø´! ØªÙØ¶Ù„ÙŠ Ø¨Ø²ÙŠØ§Ø±ØªÙ†Ø§ ÙˆØ§Ø³ØªÙ…ØªØ¹ÙŠ Ø¨ØªØ¬Ø±Ø¨Ø© ØªØ³ÙˆÙ‚ ÙØ±ÙŠØ¯Ø©. Ù‡Ø§ØªÙ Ù„Ù„ØªÙˆØ§ØµÙ„: +964772114488 â€¢ Ø§Ù„Ù…Ù†ØµÙˆØ±ØŒ Ø´Ø§Ø±Ø¹ Ø§Ù„Ø£Ù…ÙŠØ±Ø§ØªØŒ Ù‚Ø±Ø¨ Ø§Ù„Ø³ÙØ§Ø±Ø© Ø§Ù„Ù„ÙŠØ¨ÙŠØ©.',
      ku: 'Ø¦Û•Ù… Ù‡Ø§ÙˆÛŒÙ†Û• Ø¨Û• Ø´ÛŒÚ©ØªØ±ÛŒÙ† Ùˆ Ù†Ø§ÛŒØ§Ø¨ØªØ±ÛŒÙ† Ø¬Ù„ÙˆØ¨Û•Ø±Ú¯ ØªÛŽÙ¾Û•Ú•ÛŽÙ†Û•! ðŸ‘—âœ¨ Ù…Û†Ø¯ÛŽÙ„Û• Ù†ÙˆÛŽÛŒÛ•Ú©Ø§Ù†ÛŒ Ù‡Ø§ÙˆÛŒÙ†Û• Ø¨Û• Ú©Û•ØªØ§Ù†ÛŒ Ø²Û†Ø± ÙÛŽÙ†Ú© Ù„Ø§ÛŒ Ø¦ÛŽÙ…Û• Ø¦Ø§Ù…Ø§Ø¯Û•ÛŒÛ• Ø¨Û• Ø¯Ø§Ø´Ú©Ø§Ù†Ø¯Ù†ÛŒ ØªØ§ÛŒØ¨Û•ØªÛŒ Ù¡Ù¥Ùª Ù„Û•Ú©Ø§ØªÛŒ Ù¾Ø§Ø±Û•Ø¯Ø§Ù†ÛŒ Ù†Û•Ø®ØªÛŒÙ†Û•. Ø¨Ù…Ø§Ù†Ø¨ÛŒÙ†Û• Ù„Û• Ø¨Û•ØºØ¯Ø§Ø¯ØŒ Ù…Û•Ù†Ø³ÙˆÙˆØ±ØŒ Ø´Û•Ù‚Ø§Ù…ÛŒ Ø¦Û•Ù…ÛŒØ±Ø§Øª. ØªÛ•Ù„Û•ÙÛ†Ù†: +964772114488.',
      en: 'Empower your summer style with our gorgeous breathable linen collection! ðŸ‘—âœ¨ Hand-woven luxury details tailored carefully by local creative designers to match your supreme elegance. Active launch deal: Enjoy 15% discount on all purchases settled in physical cash. Visit us now: Mansour, Ameerat St. Tel: +964772114488'
    },
    likes: 205,
    commentsCount: 2,
    shares: 42,
    views: 1120,
    timeAgo: {
      ar: 'Ù…Ù†Ø° Ù¨ Ø³Ø§Ø¹Ø§Øª',
      ku: 'Ù¨ Ú©Ø§ØªÚ˜Ù…ÛŽØ± Ù¾ÛŽØ´ Ø¦ÛŽØ³ØªØ§',
      en: '8 hours ago'
    },
    likedByUser: false,
    savedByUser: false,
    comments: [
      { id: 'c13', username: 'rana.style', text: 'Ø§Ù„ÙƒØªØ§Ù† Ø§Ù„Ø£Ø¨ÙŠØ¶ ÙŠØ¬Ù†Ù† Ø£Ø®Ø°Øª Ù…Ù†Ù‡ ÙØ³ØªØ§Ù† ÙˆÙ…Ø±ÙŠØ­ Ø¨Ø´ÙƒÙ„ Ø¨Ø§Ù„Ø­Ø± ðŸ˜', time: '6h' },
      { id: 'c14', username: 'baghdad_chic', text: 'Highly recommend this house if you love unique, non-commercial clothing.', time: '4h' }
    ],
    promotionBadge: {
      ar: 'Ø®ØµÙ… Ø§Ù„ÙƒØ§Ø´ Ù¡Ù¥Ùª ðŸ‘—',
      ku: 'Ù¡Ù¥Ùª Ø¯Ø§Ø´Ú©Ø§Ù†Ø¯Ù† ðŸ‘—',
      en: '15% Cash Discount ðŸ‘—'
    }
  },
  {
    id: 'post-6',
    businessId: 'b-3',
    businessName: 'Mado CafÃ© - Erbil Citadel Road',
    businessAvatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80',
    category: 'coffee',
    governorate: 'erbil',
    mediaUrl: 'https://images.unsplash.com/photo-1498804103079-a6351b050096?w=800&auto=format&fit=crop&q=80',
    caption: {
      ar: 'Ø­Ù„ÙˆÙ‰ Ø§Ù„Ø¨Ù‚Ù„Ø§ÙˆØ© Ø§Ù„ØªØ±ÙƒÙŠØ© Ù…Ø¹ ÙÙ†Ø¬Ø§Ù† ØºÙ†ÙŠ Ù…Ù† Ø§Ù„Ø¯Ø¨Ù„ Ø§Ø³Ø¨Ø±ÙŠØ³Ùˆ Ø§Ù„Ø³Ø§Ø®Ù† ØªØ­Øª Ù†Ø³ÙŠÙ… Ø¬Ø¨Ø§Ù„ Ø£Ø±Ø¨ÙŠÙ„ ÙˆØ¥Ø·Ù„Ø§Ù„Ø© Ù‚Ù„Ø¹Ø© Ø£Ø±Ø¨ÙŠÙ„ Ø§Ù„Ø³Ø§Ø­Ø±Ø©! ðŸ°â˜• Ø§Ù„Ø¬Ù„Ø³Ø© Ø§Ù„Ø®Ø§Ø±Ø¬ÙŠØ© Ù„Ø§ ØªÙ‚Ø§Ø±Ù†ØŒ ÙˆØªÙØªØ­ Ø§Ù„Ù†ÙØ³ Ù„Ù„Ø¯Ø±Ø§Ø³Ø© ÙˆØ§Ù„Ø¯Ø±Ø¯Ø´Ø© Ù…Ø¹ Ø§Ù„Ø£ØµØ¯Ù‚Ø§Ø¡. Ø§Ø³ØªØ®Ø¯Ù… Ø±Ù…Ø² Ø§Ù„Ø®ØµÙ… Ø§Ù„Ø­ØµØ±ÙŠ "MADO15" Ù„Ù„Ø­ØµÙˆÙ„ Ø¹Ù„Ù‰ Ø­Ù„ÙˆÙ‰ Ù…Ø¬Ø§Ù†Ø§Ù‹ Ù…Ø¹ Ù‚Ù‡ÙˆØªÙƒ. ØªÙˆØ§ØµÙ„ Ù…Ø¹Ù†Ø§: +9647501122334 â€¢ Ø´Ø§Ø±Ø¹ Ù‚Ø¶Ø§Ø¡ Ø§Ù„Ù‚Ù„Ø¹Ø©ØŒ Ù…Ù‚Ø§Ø¨Ù„ Ø­Ø¯ÙŠÙ‚Ø© Ø³Ø§Ù…ÙŠ Ø¹Ø¨Ø¯ Ø§Ù„Ø±Ø­Ù…Ù†. Ù†Ø¹Ù…Ù„ Ù„ØºØ§ÙŠØ© Ø§Ù„Ø³Ø§Ø¹Ø© 1:00 ØµØ¨Ø§Ø­Ø§Ù‹.',
      ku: 'Ø¨Ø§Ù‚Ù„Ø§ÙˆØ§ÛŒ Ø¨Û•Ù†Ø§ÙˆØ¨Ø§Ù†Ú¯ÛŒ ØªÙˆØ±Ú©ÛŒ Ù„Û•Ú¯Û•Úµ Ú©ÙˆÙ¾ÛŽÚ© Ù‚Ø§ÙˆÛ•ÛŒ Ú¯Û•Ø±Ù… Ù„Û•Ø³Û•Ø± Ø´Û•Ù‚Ø§Ù…ÛŒ Ù‚Û•Ù„Ø§ÛŒ Ù‡Û•ÙˆÙ„ÛŽØ±ÛŒ Ø¯ÚµÚ¯ÛŒØ±! ðŸ°â˜• Ú©Û†Ø¯ÛŒ Ø¯Ø§Ø´Ú©Ø§Ù†Ø¯Ù†ÛŒ "MADO15" Ø¨Û•Ú©Ø§Ø±Ø¨Ù‡ÛŽÙ†Û• Ø¨Û† ÙˆÛ•Ø±Ú¯Ø±ØªÙ†ÛŒ Ø´ÛŒØ±ÛŒÙ†ÛŒ Ø¨ÛŽØ¨Û•Ø±Ø§Ù…Ø¨Û•Ø± Ù„Û•Ú¯Û•Úµ Ø¯Û†Ø¨Úµ Ø¦ÛŒØ³Ù¾Ø±ÛŽØ³Û†Ø¯Ø§. ØªØ§ Ù¡ÛŒ Ø´Û•Ùˆ Ú©Ø±Ø§ÙˆÛ•ÛŒÛ•. ØªÛ•Ù„Û•ÙÛ†Ù†: +9647501122334.',
      en: 'Traditional Turkish baklava sweets paired with hot rich Double Espresso under Erbilâ€™s amazing spring breeze and spectacular citadel road view! ðŸ°â˜• Use discount code "MADO15" for an exclusive sweet upgrade on Saku Maku app! Open daily until 1:00 AM. Location: Citadel Road, Erbil. Hotline: +9647501122334'
    },
    likes: 312,
    commentsCount: 2,
    shares: 41,
    views: 1420,
    timeAgo: {
      ar: 'Ù…Ù†Ø° ÙŠÙˆÙ…ÙŠÙ†',
      ku: 'Ù¢ Ú•Û†Ú˜ Ù¾ÛŽØ´ Ø¦ÛŽØ³ØªØ§',
      en: '2 days ago'
    },
    likedByUser: false,
    savedByUser: false,
    comments: [
      { id: 'c15', username: 'danial_kurd', text: 'Ø¨Ø§Ù‚Ù„Ø§ÙˆÛ• Ú©Ø§Ù†ÛŒØ§Ù† Ø²Û†Ø± Ø²Û†Ø± ØªØ§ÛŒØ¨Û•ØªÛ• Ùˆ ØªØ§Ù…ÛŒ ØªÙˆØ±Ú©ÛŒ Ú•Ø§Ø³ØªÛ•Ù‚ÛŒÙ†Û•ÛŒÛ•', time: '1d' },
      { id: 'c16', username: 'ahmed_baghdadi', text: 'Ø§Ù„Ù…Ø§Ø¯Ùˆ ÙƒØ§ÙÙŠÙ‡ ÙØ®Ø± Ù‚Ù„Ø¹Ø© Ø£Ø±Ø¨ÙŠÙ„ØŒ Ø¬Ù„Ø³Ø© Ø±Ø§ÙŠÙ‚Ø© ÙˆØ§Ù„Ø®Ø¯Ù…Ø© Ù…Ù…ØªØ§Ø²Ø©', time: '15h' }
    ],
    promotionBadge: {
      ar: 'Ø¨Ù‚Ù„Ø§ÙˆØ© Ù…Ø¬Ø§Ù†ÙŠØ© ðŸ°',
      ku: 'Ø¨Ø§Ù‚Ù„Ø§ÙˆØ§ÛŒ Ø¨Û•Ù„Ø§Ø´ ðŸ°',
      en: 'Free Baklava Upgrade ðŸ°'
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
      ar: 'Ø¹Ø´Ø§Ù‚ Ø§Ù„Ù‡ÙˆØ§ØªÙ ÙˆØ§Ù„ØªÙ‚Ù†ÙŠØ© ÙÙŠ Ø§Ù„Ø¨ØµØ±Ø©! ðŸ“±ðŸŽ Ø§Ù‚ØªÙ†Ù Ø§Ù„Ø¢Ù† Ø£Ù‚ÙˆÙ‰ Ø§Ù„Ù‡ÙˆØ§ØªÙ Ø§Ù„Ø±Ø§Ø¦Ø¯Ø© Ø¨Ø¶Ù…Ø§Ù† ÙÙ†ÙŠ ÙÙˆØ±ÙŠ Ù…Ø¹ØªÙ…Ø¯ ÙˆØ¨Ø£ÙØ¶Ù„ Ø§Ù„Ø£Ø³Ø¹Ø§Ø± Ø§Ù„Ù…Ù†Ø§ÙØ³Ø© ÙÙŠ Ø§Ù„Ø³ÙˆÙ‚ Ø§Ù„Ø¨ØµØ±Ø§ÙˆÙŠØ©. ÙˆØ§Ø­ØµÙ„ Ø¹Ù„Ù‰ Ø´Ø§Ø­Ù† Ø¨Ø§ÙˆØ±Ø¨Ø§Ù†Ùƒ Ø³Ø±ÙŠØ¹ Ù‡Ø¯ÙŠØ© Ù…Ø¬Ø§Ù†ÙŠØ© Ù…Ø¶Ù…ÙˆÙ†Ø© Ù…Ø¹ Ø£ÙŠ Ù…ÙˆØ¨Ø§ÙŠÙ„ ÙŠØªÙ… Ø´Ø±Ø§Ø¤Ù‡ Ø®Ù„Ø§Ù„ Ù‡Ø°Ø§ Ø§Ù„Ø£Ø³Ø¨ÙˆØ¹. Ø§Ù„Ø¹Ù†ÙˆØ§Ù†: Ø­ÙŠ Ø§Ù„Ø¹Ø´Ø§Ø±ØŒ Ø´Ø§Ø±Ø¹ Ø§Ù„Ù…ÙƒØªØ¨Ø§Øª Ø§Ù„ØªØ¬Ø§Ø±ÙŠ Ø§Ù„Ø¹Ø§Ù…ØŒ Ø§Ù„Ø¨ØµØ±Ø©. Ø§ÙˆÙ‚Ø§Øª Ø§Ù„Ø¹Ù…Ù„ Ù…Ù† 9 ØµØ¨Ø§Ø­Ø§Ù‹ Ù„ØºØ§ÙŠØ© 10 Ù…Ø³Ø§Ø¡Ù‹. Ù‡Ø§ØªÙ Ù„Ù„ØªÙˆØ§ØµÙ„ Ø£Ùˆ Ø§Ù„Ø·Ù„Ø¨: +9647811223344.',
      ku: 'Ø¯ÛŒØ§Ø±ÛŒÛŒÛ•Ú©ÛŒ Ù†Ø§ÛŒØ§Ø¨ Ù„Û• ÙØ±Û†Ø´Ú¯Ø§ÛŒ Ø¦Û•Ù„ ÙÛ•Ù‡Û•Ø¯ Ù„Û• Ø¨Û•Ø³Ø±Û•! ðŸ“±ðŸŽ Ù…Û†Ø¨Ø§ÛŒÙ„ÛŽÚ©ÛŒ Ø¨Û•Ø±Ø² Ø¨Ú©Ú•Û• Ùˆ Ù¾Ø§ÙˆÛ•Ø±Ø¨Ø§Ù†Ú©ÛŽÚ©ÛŒ Ø®ÛŽØ±Ø§ Ø¨Û• Ø¯ÛŒØ§Ø±ÛŒ ÙÛ•Ø±Ù…ÛŒ Ù„Û•Ú¯Û•Úµ Ú©Ú•ÛŒÙ†Ø¯Ø§ ÙˆÛ•Ø±Ø¨Ú¯Ø±Û•. Ù†Ø§ÙˆÙ†ÛŒØ´Ø§Ù†: Ø¨Û•Ø³Ø±Û•ØŒ Ú¯Û•Ú•Û•Ú©ÛŒ Ø¹Û•Ø´Ø§Ø±ØŒ Ø´Û•Ù‚Ø§Ù…ÛŒ Ú©ØªÛŽØ¨Ø®Ø§Ù†Û•Ú©Ø§Ù†. ØªÛ•Ù„Û•ÙÛ†Ù†: +9647811223344.',
      en: "Calling all Basra tech enthusiasts! ðŸ“±ðŸŽ Upgrade your device today at Al-Fahad Mobile Hub with local official warranty and Basra's unmatched competitive rates. Get a free fast-charging branded Powerbank with every flagship phone purchased this week! Ashar, Commercial Maktabat St. Hours: 9:00 AM - 10:00 PM. Call: +9647811223344."
    },
    likes: 235,
    commentsCount: 2,
    shares: 48,
    views: 1200,
    timeAgo: {
      ar: 'Ù…Ù†Ø° Ù¡Ù¢ Ø³Ø§Ø¹Ø©',
      ku: 'Ù¡Ù¢ Ú©Ø§ØªÚ˜Ù…ÛŽØ± Ù¾ÛŽØ´ Ø¦ÛŽØ³ØªØ§',
      en: '12 hours ago'
    },
    likedByUser: false,
    savedByUser: false,
    comments: [
      { id: 'c17', username: 'basra_vip', text: 'Ø´Ø±ÙŠØª Ø¬Ù‡Ø§Ø² Ø³Ø§Ù…Ø³ÙˆÙ†Ø¬ Ø±Ø§Ø¦Ø¯ ÙˆØ­ØµÙ„Øª Ø¹Ù„Ù‰ Ù‡Ø¯ÙŠØªÙŠ ÙˆØ§Ù„Ø¶Ù…Ø§Ù† Ø¹Ø±Ø§Ù‚ÙŠ Ù…Ù…ØªØ§Ø²', time: '8h' },
      { id: 'c18', username: 'electronics_guru', text: 'Highly trustworthy mobile reseller in Basra Ashar. Excellent customer support.', time: '5h' }
    ],
    promotionBadge: {
      ar: 'Ø¨Ø§ÙˆØ±Ø¨Ø§Ù†Ùƒ Ù‡Ø¯ÙŠØ© ðŸŽ',
      ku: 'Ù¾Ø§ÙˆÛ•Ø±Ø¨Ø§Ù†Ú©ÛŒ Ø¨Û•Ø®Û†Ú•Ø§ÛŒÛŒ ðŸŽ',
      en: 'Free Powerbank Gift ðŸŽ'
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
      ar: 'Ø¹Ø´ Ø±ÙØ§Ù‡ÙŠØ© Ø§Ù„Ù…Ù„ÙˆÙƒ ÙˆØªØ°ÙˆÙ‚ Ù†Ø³Ù…Ø§Øª Ø¬Ø¨Ø§Ù„ Ø§Ù„Ø³Ù„ÙŠÙ…Ø§Ù†ÙŠØ© Ø§Ù„Ø¨Ø§Ø±Ø¯Ø© Ø§Ù„Ø³Ø§Ø­Ø±Ø©! ðŸ”ï¸ðŸ¨ ÙŠØ³Ø¹Ø¯Ù†Ø§ ÙÙŠ ÙÙ†Ø¯Ù‚ ØªØ§ÙŠØªØ§Ù†Ùƒ Ø§Ù„Ù…ØµÙ†Ù 5 Ù†Ø¬ÙˆÙ… ØªÙ‚Ø¯ÙŠÙ… Ø¨Ø§Ù‚Ø© Ø§Ù„Ø§Ø³ØªØ¬Ù…Ø§Ù… Ø§Ù„Ø®Ø§ØµØ© Ø¨Ù†Ù‡Ø§ÙŠØ© Ø§Ù„Ø£Ø³Ø¨ÙˆØ¹ØŒ ÙˆØ§Ù„ØªÙŠ ØªØ´Ù…Ù„ Ù„ÙŠÙ„Ø© Ø¥Ø¶Ø§ÙÙŠØ© Ù…Ø¬Ø§Ù†ÙŠØ© Ø¹Ù†Ø¯ Ø­Ø¬Ø² Ù£ Ù„ÙŠØ§Ù„Ù Ù…ØªØªØ§Ù„ÙŠØ© Ø¹Ø¨Ø± Ø§Ù„ØªØ·Ø¨ÙŠÙ‚ØŒ Ù…Ø¹ Ø¯Ø®ÙˆÙ„ Ù…Ø¬Ø§Ù†ÙŠ Ù„Ù„Ø³Ø¨Ø§ Ø§Ù„ØªØ®ØµØµÙŠ ÙˆØ§Ù„Ù…Ø³Ø¨Ø­ Ø§Ù„Ø®Ø§Ø±Ø¬ÙŠ Ø§Ù„Ù…Ø·Ù„ Ø¹Ù„Ù‰ Ø§Ù„Ø¬Ø¨Ø§Ù„. Ø§Ø­Ø¬Ø² Ø§Ø³ØªØ¬Ù…Ø§Ù…Ùƒ Ø§Ù„Ù‡Ø§Ø¯Ø¦ Ø§Ù„Ø¢Ù†: +9647480556633 â€¢ Ø§Ù„Ø³Ù„ÙŠÙ…Ø§Ù†ÙŠØ©ØŒ Ø´Ø§Ø±Ø¹ Ø³Ø§Ù„Ù…ØŒ Ù‚Ø±Ø¨ ØªÙ„Ø§Ù„ Ø³Ø±Ø¬Ù†Ø§Ø±.',
      ku: 'Ø¦Ø§Ø±Ø§Ù…ÛŒ Ùˆ Ø­Û•ÙˆØ§Ù†Û•ÙˆÛ•ÛŒ Ø´Ø§Ù‡Ø§Ù†Û• Ù„Û•Ú¯Û•Úµ Ø¯ÛŒÙ…Û•Ù†ÛŒ Ú©ÛŽÙˆÛ•Ú©Ø§Ù†ÛŒ Ø³Ù„ÛŽÙ…Ø§Ù†ÛŒ Ù„Û• Ù‡Û†ØªÛŽÙ„ÛŒ ØªØ§ÛŒØªØ§Ù†ÛŒÚ©! ðŸ”ï¸ðŸ¨ Ù¾Ø§Ú©ÛŽØ¬ÛŒ Ø¨Û•Ù‡Ø§Ø±ÛŒ ØªÛ•Ù†Ø¯Ø±ÙˆØ³ØªÛŒ Ø³Ù¾Ø§ Ùˆ Ù…Û•Ù„Û•ÙˆØ§Ù†Ú¯Û• Ú†Ø§ÙˆÛ•Ú•ÛŽØªØ§Ù† Ø¯Û•Ú©Ø§Øª Ù„Û• Ù„Ø§ÛŒ ÙÛŽÙ†Ú©ÛŒ Ø¯Ú˜Û• Ú¯Û•Ø±Ù…Ø§ÛŒ Ø³Ù„ÛŽÙ…Ø§Ù†ÛŒ. ØªÛ•Ù„Û•ÙÛ†Ù† Ø¨Û† Ø±Ø²Û•Ø±Ø¨Ú©Ø±Ø¯Ù†: +9647480556633. Ú©Ø§ØªÛŽÚ©ÛŒ Ø´Ø§Ù‡Ø§Ù†Û• Ø¨Ø¨Û• Ø¨Û•Ú•ÛŽÙˆÛ•.',
      en: 'Soak in world-class 5-star comfort and therapeutic mountain air at Titanic Hotel & Spa Sulaymaniyah. ðŸ”ï¸ðŸ¨ Book 3 consecutive nights and get your 4th night absolutely free! Package includes complete access to our multi-sensory spa and mountain-view infinity pool. Salim Street, Near Sarchinar Hills. Call bookings hotline: +9647480556633.'
    },
    likes: 620,
    commentsCount: 2,
    shares: 94,
    views: 3100,
    timeAgo: {
      ar: 'Ù…Ù†Ø° ÙŠÙˆÙ…ÙŠÙ†',
      ku: 'Ù¢ Ú•Û†Ú˜ Ù¾ÛŽØ´ Ø¦ÛŽØ³ØªØ§',
      en: '2 days ago'
    },
    likedByUser: false,
    savedByUser: true,
    comments: [
      { id: 'c6', username: 'ahmed_iraqi', text: 'Ø£Ø¬Ù…Ù„ Ù…ÙƒØ§Ù† Ù„Ù„Ø§Ø³ØªØ±Ø®Ø§Ø¡ Ø¨Ø§Ù„Ø¹Ø±Ø§Ù‚ Ø¨Ù„Ø§ Ù…Ù†Ø§ÙØ³! Ø§Ù„Ø¬Ùˆ Ù‡Ù†Ø§Ùƒ ÙŠØ¬Ù†Ù† ÙˆØ§Ù„Ø³Ø¨Ø§ ÙØ¯ Ø´ÙŠ Ø®Ø±Ø§ÙÙŠ ðŸžï¸', time: '1d' },
      { id: 'c7', username: 'mari_explorer', text: 'Super friendly staff and exceptional luxury services in Kurdistan.', time: '20h' }
    ],
    promotionBadge: {
      ar: 'Ù„ÙŠÙ„Ø© Ù…Ø¬Ø§Ù†ÙŠØ© ðŸ¨',
      ku: 'Ø´Û•ÙˆÛŽÚ©ÛŒ Ø¨Û•Ø¨ÛŽ Ø¨Û•Ø±Ø§Ù…Ø¨Û•Ø± ðŸ¨',
      en: '1 Night Free Special ðŸ¨'
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
      ar: 'ØµØ­ØªÙƒ ÙˆØµØ­Ø© Ø¹Ø§Ø¦Ù„ØªÙƒ Ù‡ÙŠ Ø£Ø«Ù…Ù† Ù…Ø§ ØªÙ…Ù„Ùƒ! ðŸ©ºâ¤ï¸ ÙŠØ³Ø± Ø¹ÙŠØ§Ø¯Ø© Ø±Ø¹Ø§ÙŠØ© Ø§Ù„Ø­ÙŠØ§Ø© Ø§Ù„ØªØ®ØµØµÙŠØ© ÙÙŠ Ø£Ø±Ø¨ÙŠÙ„ Ø§Ù„Ø¥Ø¹Ù„Ø§Ù† Ø¹Ù† Ø­Ù…Ù„Ø© Ø§Ù„ÙØ­Øµ Ø§Ù„ÙˆÙ‚Ø§Ø¦ÙŠ Ø§Ù„Ø´Ø§Ù…Ù„ Ù„Ø¶ØºØ· Ø§Ù„Ø¯Ù… ÙˆÙ…Ø³ØªÙˆÙŠØ§Øª Ø§Ù„Ø³ÙƒØ± ÙƒÙ„ ÙŠÙˆÙ… Ø¬Ù…Ø¹Ø© ÙÙŠ Ø§Ù„ÙØªØ±Ø© Ø§Ù„ØµØ¨Ø§Ø­ÙŠØ©ØŒ Ø¨Ù…Ø±Ø§ÙÙ‚Ø© Ø§Ø³ØªØ´Ø§Ø±Ø§Øª Ø£ÙˆÙ„ÙŠØ© ÙˆØ¥Ø±Ø´Ø§Ø¯Ø§Øª Ø£Ø·Ø¨Ø§Ø¦Ù†Ø§ Ø°ÙˆÙŠ Ø§Ù„ÙƒÙØ§Ø¡Ø© Ø§Ù„Ø¹Ø§Ù„ÙŠØ© Ù„Ù…Ø±Ø¶Ù‰ Ø§Ù„Ù‚Ù„Ø¨ ÙˆØ§Ù„Ø¶ØºØ·. ÙŠØ³Ø¹Ø¯Ù†Ø§ ØªÙ‚Ø¯ÙŠÙ… Ø§Ù„Ø±Ø¹Ø§ÙŠØ© Ù„ÙƒÙ… Ø¯Ø§Ø¦Ù…Ø§Ù‹. Ø§Ù„Ø­Ø¬Ø² ÙÙˆØ±ÙŠ: +9647508881234 â€¢ Ø£Ø±Ø¨ÙŠÙ„ØŒ Ø´Ø§Ø±Ø¹ Ù¡Ù Ù Ù…ØŒ Ù‚Ø±Ø¨ Ù…Ø¬Ø³Ø± Ø¹ÙŠÙ†ÙƒØ§ÙˆØ© ÙˆÙ…Ù‚Ø§Ø·Ø¹Ø© Ø¹Ø´ØªØ§Ø±.',
      ku: 'ØªÛ•Ù†Ø¯Ø±ÙˆØ³ØªÛŒØª Ù„Û• Ø³Û•Ø±ÙˆÙˆÛŒ Ù‡Û•Ù…ÙˆÙˆ Ù¾ÛŽØ´Ø¨ÛŒÙ†ÛŒÛŒÛ•Ú©Û•ÙˆÛ•ÛŒÛ•! ðŸ©ºâ¤ï¸ Ú©Ù„ÛŒÙ†ÛŒÚ©ÛŒ Ú†Ø§ÙˆØ¯ÛŽØ±ÛŒ Ú˜ÛŒØ§Ù† Ù„Û• Ù‡Û•ÙˆÙ„ÛŽØ± Ù¾Ø´Ú©Ù†ÛŒÙ†ÛŒ ÙØ´Ø§Ø±ÛŒ Ø®ÙˆÛŽÙ† Ùˆ Ø´Û•Ú©Ø±Û• Ø¨ÛŽØ¨Û•Ø±Ø§Ù…Ø¨Û•Ø± Ù¾ÛŽØ´Ú©Û•Ø´ Ø¯Û•Ú©Ø§Øª Ù‡Û•Ù…ÙˆÙˆ Ú•Û†Ú˜Ø§Ù†ÛŒ Ù‡Û•ÛŒÙ†ÛŒ Ø¨Û† Ù¾Ø§Ø±Ø§Ø³ØªÙ†ÛŒ ØªÛ•Ù†Ø¯Ø±ÙˆØ³ØªÛŒ Ø®ÛŽØ²Ø§Ù†Û•Ú©Ø§Ù†ØªØ§Ù†. ØªÛ•Ù†Ø¯Ø±ÙˆØ³Øª Ø¨Ù† Ù‡Û•Ù…ÛŒØ´Û•. ØªÛ•Ù„Û•ÙÛ†Ù† Ø¨Û† Ú¯Û•ÛŒØ§Ù†Ø¯Ù†: +9647508881234.',
      en: "Protect your heart and health! ðŸ©ºâ¤ï¸ LifeCare Specialty Clinic Erbil is organizing a free comprehensive wellness screening for diabetes and cardiovascular hypertension this Friday morning. Get expert advice and personalized preventative plans from our experienced medical board. Location: 100m Road, near Ainkawa intersection Erbil. Phone booking: +9647508881234."
    },
    likes: 98,
    commentsCount: 1,
    shares: 15,
    views: 540,
    timeAgo: {
      ar: 'Ù…Ù†Ø° ÙŠÙˆÙ…',
      ku: 'Ø¯ÙˆÛŽÙ†ÛŽ',
      en: '1 day ago'
    },
    likedByUser: false,
    savedByUser: false,
    comments: [
      { id: 'c19', username: 'pary_erbil', text: 'Ø³ÙˆÙ¾Ø§Ø³ Ø¨Û† Ø¦Û•Ù… Ø®Ø²Ù…Û•ØªÚ¯ÙˆØ²Ø§Ø±ÛŒÛŒÛ• Ù†Ø§ÛŒØ§Ø¨Û•ØªØ§Ù† Ù‡Û•Ù…ÛŒØ´Û• ÛŒØ§Ø±Ù…Û•ØªÛŒØ¯Û•Ø±Ù†', time: '12h' }
    ],
    promotionBadge: {
      ar: 'ÙØ­Øµ ÙˆÙ‚Ø§Ø¦ÙŠ Ù…Ø¬Ø§Ù†ÙŠ  â¤ï¸',
      ku: 'Ù¾Ø´Ú©Ù†ÛŒÙ†ÛŒ Ø¨Û•Ø®Û†Ú•Ø§ÛŒÛŒ â¤ï¸',
      en: 'Free Health Screening â¤ï¸'
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
      ar: 'Ø«Ù‚ØªÙƒ ÙˆÙ…Ø¸Ù‡Ø±Ùƒ Ù‡Ù…Ø§ Ø¹Ù†ÙˆØ§Ù† ØªØ£Ù„Ù‚Ù†Ø§ ÙÙŠ ØµØ§Ù„ÙˆÙ† Ù‡ÙŠØ± ØªØ§ÙˆÙ† Ø§Ù„Ø±Ø¬Ø§Ù„ÙŠ! ðŸ’ˆâœ‚ï¸ Ø§Ø­ØµÙ„ Ø¹Ù„Ù‰ Ù‚ØµØ© Ø´Ø¹Ø± Ø³ØªØ§ÙŠÙ„ Ù…Ù…ÙŠØ²Ø© ØªÙ†Ø§Ø³Ø¨ Ø°ÙˆÙ‚Ùƒ ÙˆØªÙ…Ù†Ø­Ùƒ Ø­Ø¶ÙˆØ±Ø§Ù‹ Ø¹ØµØ±ÙŠØ§Ù‹ØŒ Ø¥Ù„Ù‰ Ø¬Ø§Ù†Ø¨ Ø­Ù„Ø§Ù‚Ø© Ø°Ù‚Ù† Ø±Ø§Ù‚ÙŠØ© Ø¨Ø§Ù„Ø¨Ø®Ø§Ø± Ø§Ù„Ø³Ø§Ø®Ù† ÙˆØ¬Ù„Ø³Ø© ØªÙ†Ø¸ÙŠÙ Ø¨Ø´Ø±Ø© Ù…Ø¬Ø§Ù†ÙŠØ© ØªÙ…Ø§Ù…Ø§Ù‹ Ø¨Ù…Ø§Ø³Ùƒ Ø§Ù„ÙØ­Ù… Ø§Ù„Ø£Ø³ÙˆØ¯ Ø§Ù„ÙØ¹Ø§Ù„ Ù„Ù„Ø¹Ù†Ø§ÙŠØ© Ø§Ù„ÙØ§Ø¦Ù‚Ø©. Ù†Ø¹Ù…Ù„ ÙŠÙˆÙ…ÙŠØ§Ù‹ Ù…Ù† Ø§Ù„Ø³Ø§Ø¹Ø© 10:00 ØµØ¨Ø§Ø­Ø§Ù‹ ÙˆÙ„ØºØ§ÙŠØ© 11:00 Ù…Ø³Ø§Ø¡Ù‹. Ø§Ù„Ø¹Ù†ÙˆØ§Ù†: Ø¨ØºØ¯Ø§Ø¯ØŒ Ø§Ù„Ø¬Ø§Ø¯Ø±ÙŠØ©ØŒ Ù‚Ø±Ø¨ Ø¬Ø§Ù…Ø¹Ø© Ø¨ØºØ¯Ø§Ø¯ØŒ ØªÙ‚Ø§Ø·Ø¹ Ø§Ù„Ø­Ø±ÙŠØ©. ØªÙØ¶Ù„ Ø¨Ø§Ù„Ø­Ø¬Ø² Ø§Ù„Ù…Ø³Ø¨Ù‚: +964771225577.',
      ku: 'Ø¬ÙˆØ§Ù†ØªØ± Ùˆ Ø´ÛŒÚ©ØªØ± Ø¨Ø¨Û• Ù„Û• Ø³Ø§ÚµÛ†Ù†ÛŒ Ù‡ÛŽØ± ØªØ§ÙˆÙ†ÛŒ Ù¾ÛŒØ§ÙˆØ§Ù† Ù„Û• Ø¬Ø§Ø¯Ø±ÛŒÛ•ÛŒ Ø¨Û•ØºØ¯Ø§Ø¯! ðŸ’ˆâœ‚ï¸ Ø¨Ø§Ø´ØªØ±ÛŒÙ† Ø®Ø²Ù…Û•ØªÚ¯ÙˆØ²Ø§Ø±ÛŒ ØªØ§Ø´ÛŒÙ†ÛŒ Ù‚Ú˜ Ùˆ Ú†Ø§Ú©Ú©Ø±Ø¯Ù†ÛŒ Ú•ÛŒØ´ Ùˆ Ù…Ø§Ø³Ú©ÛŒ Ø¯Û•Ù…ÙˆÚ†Ø§Ùˆ Ø¨Û•Ø¨ÛŽ Ø¦Ø§Ø²Ø§Ø± Ø¨Û† Ú¯Ø´Øª Ú¯Û•Ù†Ø¬Ø§Ù†. ØªÛ•Ù„Û•ÙÛ†Ù† Ø¨Û† Ù¾Û†Ø´ÛŒÙ†: +964771225577. Ú©Ø±Ø§ÙˆÛ•ÛŒÛ• Ù„Û• Ù¡Ù ÛŒ Ø¨Û•ÛŒØ§Ù†ÛŒ ØªØ§ Ù¡Ù¡ÛŒ Ø´Û•Ùˆ.',
      en: 'Groom with confidence and premium service at Hair Town Barbers Jadriya! ðŸ’ˆâœ‚ï¸ Pamper yourself with a sharp customized haircut, premium hot steam shave, and a complimentary deep exfoliating charcoal face mask mask to restore your skin. Backbeat modern music, amazing barista coffee. Open 10:00 AM - 11:00 PM. Reservations phone: +964771225577 â€¢ Liberty Intersection, Jadriya.'
    },
    likes: 154,
    commentsCount: 2,
    shares: 21,
    views: 780,
    timeAgo: {
      ar: 'Ù…Ù†Ø° Ù¡Ù  Ø³Ø§Ø¹Ø§Øª',
      ku: 'Ù¡Ù  Ú©Ø§ØªÚ˜Ù…ÛŽØ± Ù¾ÛŽØ´ Ø¦ÛŽØ³ØªØ§',
      en: '10 hours ago'
    },
    likedByUser: false,
    savedByUser: false,
    comments: [
      { id: 'c9', username: 'kamal_karrada', text: 'Ø£Ø±Ù‚Ù‰ ØµØ§Ù„ÙˆÙ† Ø­Ù„Ø§Ù‚Ø© ÙˆØ¹Ù†Ø§ÙŠØ© Ø¨Ø¨ØºØ¯Ø§Ø¯ØŒ ÙƒØ§Ø¯Ø± Ù…Ø­ØªØ±Ù ÙˆØ§Ù„Ø®Ø¯Ù…Ø© Ø¹Ø§Ù„Ø¨Ø®Ø§Ø± ÙˆÙ„Ø§ ØºÙ„Ø·Ø© â­', time: '6h' },
      { id: 'c10', username: 'ryan_barber', text: 'Stunning place, the facial remedy is absolute magic.', time: '3h' }
    ],
    promotionBadge: {
      ar: 'ØªÙ†Ø¸ÙŠÙ Ø¨Ø´Ø±Ø© Ù…Ø¬Ø§Ù†ÙŠ ðŸ’†â€â™‚ï¸',
      ku: 'Ù…Ø§Ø³Ú© Ø¨Û•Ù„Ø§Ø´ ðŸ’†â€â™‚ï¸',
      en: 'Free Charcoal Face Mask ðŸ’†â€â™‚ï¸'
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
