import { SocialPost, GovernorateCode } from './types';

export interface CSVBiz {
  name: {
    ar: string;
    ku: string;
    en: string;
  };
  category: 'restaurant' | 'cafe_bakery' | 'pharmacy' | 'gym' | 'university' | 'hotel' | 'real_estate' | 'salon' | 'mobile_shop';
  bio: {
    ar: string;
    ku: string;
    en: string;
  };
  phone?: string;
  website?: string;
  facebook?: string;
  instagram?: string;
}

export const CSV_BASE_BUSINESSES: CSVBiz[] = [
  {
    name: {
      ar: 'Ø¨ÙˆØ§Ø¨Ø© Ø¨ØºØ¯Ø§Ø¯ Ù„Ù„Ø­Ù„ÙˆÙ„ Ø§Ù„Ø¨Ø±Ù…Ø¬ÙŠØ©',
      ku: 'Ø¯Û•Ø±ÙˆØ§Ø²Û•ÛŒ ØªÛ•Ú©Ù†Û•Ù„Û†Ú˜ÛŒØ§ - Ø¨Û•ØºØ¯Ø§ ØªÛŽÚ© Ù‡ÛŽØ¨',
      en: 'Baghdad Tech Hub'
    },
    category: 'mobile_shop',
    bio: {
      ar: 'Ù…Ø²ÙˆØ¯ Ø­Ù„ÙˆÙ„ Ø¨Ø±Ù…Ø¬ÙŠØ© Ù…ØªÙƒØ§Ù…Ù„Ø© ØªÙ‚Ø¯Ù… ØªØ·ÙˆÙŠØ± Ù…ÙˆØ§Ù‚Ø¹ Ø§Ù„ÙˆÙŠØ¨ ÙˆØ§Ù„Ø´Ø¨ÙƒØ§Øª ÙˆØ§Ù„Ø¯Ø¹Ù… Ø§Ù„ÙÙ†ÙŠ Ù„Ù„Ø´Ø±ÙƒØ§Øª Ø¨Ù…Ø®ØªÙ„Ù Ø£Ø­Ø¬Ø§Ù…Ù‡Ø§.',
      ku: 'Ù¾ÛŽØ´Ú©Û•Ø´Ú©Ø±Ø¯Ù†ÛŒ Ø¨Ø§Ø´ØªØ±ÛŒÙ† Ø®Ø²Ù…Û•ØªÚ¯ÙˆØ²Ø§Ø±ÛŒ ØªÛ•Ú©Ù†Û•Ù„Û†Ø¬ÛŒØ§ Ùˆ Ù¾Ø±Û†Ú¯Ø±Ø§Ù…Ø³Ø§Ø²ÛŒ Ø¨Û† Ú©Û†Ù…Ù¾Ø§Ù†ÛŒØ§Ú©Ø§Ù†.',
      en: 'Full-service IT solutions provider offering web development, networking, and software support for firms.'
    },
    phone: '+9647994291785',
    facebook: 'fb.com/baghdadtechhub'
  },
  {
    name: {
      ar: 'ÙÙ†Ø¯Ù‚ Ø¯Ø¬Ù„Ø© Ø§Ù„ÙƒØ¨ÙŠØ±',
      ku: 'Ú¾Û†ØªÛŽÙ„ÛŒ Ø¯Ø¬Ù„Û•ÛŒ Ú¯Û•ÙˆØ±Û•',
      en: 'Grand Tigris Hotel'
    },
    category: 'hotel',
    bio: {
      ar: 'ÙÙ†Ø¯Ù‚ ÙØ§Ø®Ø± ÙŠØ·Ù„ Ø¹Ù„Ù‰ Ø¶ÙØ§Ù Ù†Ù‡Ø± Ø¯Ø¬Ù„Ø© Ø§Ù„Ø³Ø§Ø­Ø±ØŒ ÙŠÙˆÙØ± Ø£Ø¬Ù†Ø­Ø© Ù…Ù„ÙƒÙŠØ© Ø±Ø§Ù‚ÙŠØ© ÙˆÙ‚Ø§Ø¹Ø§Øª Ù„Ù„Ù…Ø¤ØªÙ…Ø±Ø§Øª ÙˆØ£ÙØ®Ø± Ø§Ù„Ù…Ø·Ø§Ø¨Ø®.',
      ku: 'Ú¾Û†ØªÛŽÙ„ÛŽÚ©ÛŒ Ù„ÙˆÚ©Ø³ Ú©Û• Ø³ÙˆÛŒØªÛŒ Ø´Ø§Ù‡Ø§Ù†Û• Ùˆ Ø®Ø²Ù…Û•ØªÚ¯ÙˆØ²Ø§Ø±ÛŒ Ø¦Ø§Ø³ØªÛŒ Ø¬ÛŒÚ¾Ø§Ù†ÛŒ Ù¾ÛŽØ´Ú©Û•Ø´ Ø¯Û•Ú©Ø§Øª.',
      en: 'Luxury riverside hotel offering premium suites, state-of-the-art conference halls, and magnificent dining.'
    },
    phone: '+9647858448502'
  },
  {
    name: {
      ar: 'ØµÙŠØ¯Ù„ÙŠØ© Ø§Ù„Ù†Ù‡Ø±ÙŠÙ† Ø§Ù„ØªØ®ØµØµÙŠØ©',
      ku: 'Ø¯Û•Ø±Ù…Ø§Ù†Ø®Ø§Ù†Û•ÛŒ Ø¯Ø¬Ù„Û•',
      en: 'Tigris Pharmacy'
    },
    category: 'pharmacy',
    bio: {
      ar: 'ØµÙŠØ¯Ù„ÙŠØ© Ù…ØªÙƒØ§Ù…Ù„Ø© ØªÙˆÙØ± ÙƒØ§ÙØ© Ø§Ù„Ø£Ø¯ÙˆÙŠØ© ÙˆØ§Ù„Ù…Ø³ØªÙ„Ø²Ù…Ø§Øª Ø§Ù„Ø·Ø¨ÙŠØ© Ø§Ù„Ù…Ø¹ØªÙ…Ø¯Ø© ÙˆØ®Ø¨Ø±Ø© ØªØ¶Ù…Ù† Ø³Ù„Ø§Ù…ØªÙƒÙ… ÙˆØªÙˆØµÙŠÙ„ Ø³Ø±ÙŠØ¹.',
      ku: 'Ø¯Û•Ø±Ù…Ø§Ù†Ø®Ø§Ù†Û•ÛŒÛ•Ú©ÛŒ Ú¯Ø´ØªÚ¯ÛŒØ± Ø¨Û† Ù¾ÛŽØ´Ú©Û•Ø´Ú©Ø±Ø¯Ù†ÛŒ Ø¨Ø§Ø´ØªØ±ÛŒÙ† Ú†Ø§Ø±Û•Ø³Û•Ø± Ùˆ Ø¯Û•Ø±Ù…Ø§Ù†ÛŒ Ù¾Ø²ÛŒØ´Ú©ÛŒ.',
      en: 'Fully stocked pharmacy offering certified prescription medications and fast medical delivery services.'
    },
    phone: '+9647913785529'
  },
  {
    name: {
      ar: 'Ú¾Û†ØªÛŽÙ„ÛŒ Ø´Ø§Ø±ÛŒ Ú©ÙˆØ±Ø¯Ø³ØªØ§Ù†',
      ku: 'Ú¾Û†ØªÛŽÙ„ÛŒ Ø´Ø§Ø±ÛŒ Ú©ÙˆØ±Ø¯Ø³ØªØ§Ù†',
      en: 'Kurdistan City Hotel'
    },
    category: 'hotel',
    bio: {
      ar: 'ÙÙ†Ø¯Ù‚ Ù…ØªÙ…ÙŠØ² ÙŠÙ‚Ø¯Ù… ØªØ¬Ø±Ø¨Ø© Ø¥Ù‚Ø§Ù…Ø© Ø±Ø§Ù‚ÙŠØ© Ù…Ø¹ ØºØ±Ù Ù…Ø¬Ù‡Ø²Ø© Ø¨Ø§Ù„ÙƒØ§Ù…Ù„ ÙˆÙ…Ø·Ø¹Ù… ÙŠØ¹ÙƒØ³ Ø§Ù„Ø«Ù‚Ø§ÙØ© Ø§Ù„ÙƒØ±Ø¯ÙŠØ© Ø§Ù„Ø£ØµÙŠÙ„Ø©.',
      ku: 'Ú¾Û†ØªÛŽÙ„ÛŽÚ©ÛŒ Ù„ÙˆÚ©Ø³ Ú©Û• Ø³ÙˆÛŒØªÛŒ ÙØ§Ø®Ø± Ùˆ Ø®Ø²Ù…Û•ØªÚ¯ÙˆØ²Ø§Ø±ÛŒ Ù†Ø§ÛŒØ§Ø¨ Ù¾ÛŽØ´Ú©Û•Ø´ Ø¯Û•Ú©Ø§Øª Ø¨Û† Ú¯Û•Ø´ØªÛŒØ§Ø±Ø§Ù†.',
      en: 'A premium hotel delivering authentic Kurdish hospitality, exquisite dining, and family suites.'
    },
    phone: '+9647701103987'
  },
  {
    name: {
      ar: 'ØµÙŠØ¯Ù„ÙŠØ© Ø§Ù„Ø´ÙØ§Ø¡ Ù„Ù„Ù…Ø³ØªÙ„Ø²Ù…Ø§Øª',
      ku: 'Ø¯Û•Ø±Ù…Ø§Ù†Ø®Ø§Ù†Û•ÛŒ Ø´ÛŒÙØ§',
      en: 'Al-Shifa Pharmacy'
    },
    category: 'pharmacy',
    bio: {
      ar: 'ØªÙˆÙÙŠØ± Ù…ØªÙ…ÙŠØ² Ù„Ù„Ø£Ø¯ÙˆÙŠØ© Ø§Ù„Ø§Ø³ØªÙŠØ±Ø§Ø¯ÙŠØ© ÙˆØªØ£Ù…ÙŠÙ† Ø§Ù„Ù…Ø³ØªÙ„Ø²Ù…Ø§Øª Ø§Ù„Ø·Ø¨ÙŠØ© Ù„Ù„Ø£Ù…Ø±Ø§Ø¶ Ø§Ù„Ù…Ø²Ù…Ù†Ø© Ø¨Ø¯Ù‚Ø© ÙˆÙ†ØµØ­ ØµÙŠØ¯Ù„Ø§Ù†ÙŠ Ù…ÙˆØ«ÙˆÙ‚.',
      ku: 'Ø¯Ø§Ø¨ÛŒÙ†Ú©Ø±Ø¯Ù†ÛŒ Ù‡Û•Ù…ÙˆÙˆ Ø¯Û•Ø±Ù…Ø§Ù†Û• Ù¾Ø²ÛŒØ´Ú©ÛŒÛŒÛ•Ú©Ø§Ù† Ø¨Û• Ú†Ø§ÙˆØ¯ÛŽØ±ÛŒ Ø¨Ø§Ø´ØªØ±ÛŒÙ† Ù¾Ø²ÛŒØ´Ú©ÛŒ Ø¯Û•Ø±Ù…Ø§Ù†Ø³Ø§Ø².',
      en: 'Supplying verified medications and baby goods under veteran medical experts 24 hours daily.'
    },
    phone: '+9647918258157'
  },
  {
    name: {
      ar: 'Ù…Ø±ÙƒØ² Ù„ÙŠØ§Ù‚Ø© Ø¨ØºØ¯Ø§Ø¯ Ù„Ù„Ø±Ø¬Ø§Ù„ ÙˆØ§Ù„Ø³ÙŠØ¯Ø§Øª',
      ku: 'Ø³Û•Ù†ØªÛ•Ø±ÛŒ Ú•Ø§Ù‡ÛŽÙ†Ø§Ù†ÛŒ ÙÛŒØªÙ†Ø³ÛŒ Ø¨Û•ØºØ¯Ø§',
      en: 'Baghdad Fitness Center'
    },
    category: 'gym',
    bio: {
      ar: 'ØµØ§Ù„Ø© Ø±ÙŠØ§Ø¶ÙŠØ© Ù…Ø¬Ù‡Ø²Ø© Ø¨Ø§Ù„ÙƒØ§Ù…Ù„ Ø¨Ø£Ø­Ø¯Ø« Ø§Ù„Ø£Ø¬Ù‡Ø²Ø© Ø§Ù„Ø­Ø¯ÙŠØ¯ÙŠØ© ÙˆØ§Ù„ÙƒØ§Ø±Ø¯ÙŠÙˆ Ù…Ø¹ ÙƒØ§Ø¨ØªÙ† Ù…Ø®ØµØµ Ù„Ø¨Ù†Ø§Ø¡ Ø§Ù„Ø£Ø¬Ø³Ø§Ù… ÙˆØ§Ù„ØªÙ†Ø­ÙŠÙ.',
      ku: 'Ø¨Ø§Ø´ØªØ±ÛŒÙ† Ù‡Û†ÚµÛŒ ÙˆÛ•Ø±Ø²Ø´ Ù…Ø¬Ù‡Ø² Ø¨Û• Ø¦Ø§Ù…ÛŽØ±ÛŒ Ù…Û†Ø¯ÛŽØ±Ù† Ùˆ Ú•Ø§Ù‡ÛŽÙ†Û•Ø±ÛŒ Ø®Ø§ÙˆÛ•Ù† Ø¦Û•Ø²Ù…ÙˆÙˆÙ†.',
      en: 'State-of-the-art conditioning athletic center with custom strength programs and top local coaches.'
    },
    phone: '+9647725662601'
  },
  {
    name: {
      ar: 'Ù…Ø¯Ø±Ø³Ø© Ø§Ù„Ù†ÙˆØ± Ø§Ù„Ø£Ù‡Ù„ÙŠØ© Ø§Ù„Ù†Ù…ÙˆØ°Ø¬ÙŠØ©',
      ku: 'Ù‚ÙˆØªØ§Ø¨Ø®Ø§Ù†Û•ÛŒ Ù†ÙˆÙˆØ±ÛŒ Ø¦Û•Ù‡Ù„ÛŒ',
      en: 'Al-Noor Private Academy'
    },
    category: 'university',
    bio: {
      ar: 'Ù…Ø¯Ø±Ø³Ø© Ø£Ù‡Ù„ÙŠØ© ØªÙ„ØªØ²Ù… Ø¨ØªÙ‚Ø¯ÙŠÙ… ØªØ¹Ù„ÙŠÙ… Ø°ÙŠ Ø¬ÙˆØ¯Ø© Ù…ØªÙ…ÙŠØ²Ø© Ù„ÙƒØ§ÙØ© Ø§Ù„Ù…Ø±Ø§Ø­Ù„ Ø§Ù„Ø§Ø¨ØªØ¯Ø§Ø¦ÙŠØ© ÙˆØ§Ù„Ù…ØªÙˆØ³Ø·Ø© Ø¨Ù†Ø¸Ù… Ø¥Ù„ÙƒØªØ±ÙˆÙ†ÙŠØ©.',
      ku: 'Ù‚ÙˆØªØ§Ø¨Ø®Ø§Ù†Û•ÛŒÛ•Ú©ÛŒ ØªØ§ÛŒØ¨Û•Øª Ø¨Û• Ù¾Ú•Û†Ú¯Ø±Ø§Ù…ÛŒ Ù…Û†Ø¯ÛŽØ±Ù† Ø¨Û† Ù¾Û•Ø±Û•Ù¾ÛŽØ¯Ø§Ù†ÛŒ Ø²Ø§Ù†Ø³ØªÛŒ Ø®ÙˆÛŽÙ†Ø¯Ú©Ø§Ø±Ø§Ù†.',
      en: 'Private elementary and secondary school offering elite digital tutoring and certified educational systems.'
    },
    phone: '+9647971018669'
  },
  {
    name: {
      ar: 'ÙƒØ§ÙÙŠÙ‡ Ø§Ù„Ø³Ù„ÙŠÙ…Ø§Ù†ÙŠØ© Ø§Ù„ØªØ±Ø§Ø«ÙŠ',
      ku: 'Ú©Ø§ÙÛŽÛŒ Ø³Ù„ÛŽÙ…Ø§Ù†ÛŒ',
      en: 'Slemani CafÃ©'
    },
    category: 'cafe_bakery',
    bio: {
      ar: 'Ù…ÙƒØ§Ù† Ù‡Ø§Ø¯Ø¦ ÙˆØ¬Ù…ÙŠÙ„ Ù„ØªØ°ÙˆÙ‚ Ø§Ù„Ø´Ø§ÙŠ Ø§Ù„ÙƒØ±Ø¯ÙŠ Ø§Ù„ÙØ§Ø®Ø± ÙˆØ§Ù„Ù‚Ù‡ÙˆØ© Ø§Ù„Ù…Ø®ØªØµØ© Ù…Ø¹ Ù…Ø¹Ø¬Ù†Ø§Øª ÙŠÙˆÙ…ÙŠØ© Ø·Ø§Ø²Ø¬Ø© ÙÙŠ Ù‚Ù„Ø¨ Ø§Ù„Ù…Ù†Ø·Ù‚Ø©.',
      ku: 'Ø¨Ø§Ø´ØªØ±ÛŒÙ† Ø´ÙˆÛŽÙ† Ø¨Û† Ø®ÙˆØ§Ø±Ø¯Ù†Û•ÙˆÛ•ÛŒ Ù‚Ø§ÙˆÛ•ÛŒ Ù†Ø§ÛŒØ§Ø¨ Ùˆ Ú†Ø§ Ù„Û•Ú¯Û•Úµ Ú©Û•Ø´ÛŽÚ©ÛŒ Ø¦Ø§Ø±Ø§Ù…ÛŒ Ù…Ø§ÚµØ¨Ø§Øª.',
      en: 'Relaxing lounge serving specialty Kurdish tea, fresh pastries, and double-shot espressos.'
    },
    phone: '+9647725221327'
  },
  {
    name: {
      ar: 'Ø§Ù„Ø¨ÙˆØ§Ø¨Ø© Ø§Ù„Ø°Ù‡Ø¨ÙŠØ© Ù„Ù„ØªØ³ÙˆÙŠÙ‚ Ø§Ù„Ø¹Ù‚Ø§Ø±ÙŠ',
      ku: 'Ù†ÙˆÙˆØ³ÛŒÙ†Ú¯Û•ÛŒ Ø¹Û•Ù‚Ø§Ø±Ø§ØªÛŒ Ø¯Û•Ø±ÙˆØ§Ø²Û•ÛŒ Ø²ÛŽÚ•ÛŒÙ†',
      en: 'Golden Gate Real Estate'
    },
    category: 'real_estate',
    bio: {
      ar: 'Ù†Ø®Ø¨Ø© Ù…Ø³ØªØ´Ø§Ø±ÙŠ Ø§Ù„Ø¹Ù‚Ø§Ø± ÙÙŠ Ø§Ù„Ø¹Ø±Ø§Ù‚ Ù„Ø¨ÙŠØ¹ ÙˆØ´Ø±Ø§Ø¡ Ø§Ù„Ø¨ÙŠÙˆØª ÙˆØ§Ù„Ø´Ù‚Ù‚ Ø§Ù„Ø³ÙƒÙ†ÙŠØ© Ø§Ù„ÙØ§Ø®Ø±Ø© ÙˆØ§Ù„Ø£Ø±Ø§Ø¶ÙŠ Ø¨Ù…ØµØ¯Ø§Ù‚ÙŠØ© Ù…Ø·Ù„Ù‚Ø©.',
      ku: 'Ú©Ú•ÛŒÙ† Ùˆ ÙØ±Û†Ø´ØªÙ†ÛŒ Ø®Ø§Ù†ÙˆÙˆ Ùˆ Ø´ÙˆÙ‚Û• Ø¨Û• Ø¨Ø§Ø´ØªØ±ÛŒÙ† Ù…ØªÙ…Ø§Ù†Û• Ùˆ Ú¯Ø±Û•Ù†ØªÛŒ ÛŒØ§Ø³Ø§ÛŒÛŒ.',
      en: 'basras leading brokerage firm specializing in luxury villas, residential plots and modern office lets.'
    },
    phone: '+9647964495198'
  },
  {
    name: {
      ar: 'Ø®ÙˆØ§Ø±Ø¯Ù†Ú¯Û•ÛŒ Ø³Û•Ø±Ú©Û•ÙˆØªÙ† Ù„Ù„ÙˆØ¬Ø¨Ø§Øª Ø§Ù„ÙƒØ±Ø¯ÙŠØ©',
      ku: 'Ø®ÙˆØ§Ø±Ø¯Ù†Ú¯Û•ÛŒ Ø³Û•Ø±Ú©Û•ÙˆØªÙ†',
      en: 'Sarkawtin Kurdish Restaurant'
    },
    category: 'restaurant',
    bio: {
      ar: 'Ù…Ø·Ø¹Ù… ÙƒÙˆØ±Ø¯ÙŠ Ø´Ù‡ÙŠØ± ÙŠÙ‚Ø¯Ù… Ø£Ø´Ù‡Ù‰ Ø§Ù„Ù‚ÙˆØ²ÙŠ ÙˆØ§Ù„Ù…Ø´Ø§ÙˆÙŠ Ø§Ù„ÙƒØ±Ø¯ÙŠØ© ÙˆØ§Ù„Ø´ÙˆØ±Ø¨Ø§Øª Ø§Ù„Ø³Ø§Ø®Ù†Ø© Ø§Ù„Ø·Ø§Ø²Ø¬Ø© ÙŠÙˆÙ…ÙŠØ§Ù‹ Ø¨ÙƒÙ„ ØªØ±Ø­Ø§Ø¨.',
      ku: 'Ú†ÛŽØ´ØªØ®Ø§Ù†Û•ÛŒÛ•Ú©ÛŒ Ù†Ø§ÛŒØ§Ø¨ÛŒ Ú©ÙˆØ±Ø¯ÛŒ Ø¨Û† Ù¾ÛŽØ´Ú©Û•Ø´Ú©Ø±Ø¯Ù†ÛŒ ØªØ§Ù…ØªØ±ÛŒÙ† Ù‚Û†Ø²ÛŒ Ùˆ Ú©Ø¨Ø§Ø¨ Ø¨Û† Ù…ÛŒÙˆØ§Ù†Ø§Ù†.',
      en: 'Iconic traditional Kurdish diner offering wood-fired kebabs, sizzling stews, and generous hospitality.'
    },
    phone: '+9647863510132'
  },
  {
    name: {
      ar: 'ÙÙ†Ø¯Ù‚ Ø¨Ø§Ø¨Ù„ Ø§Ù„Ø±Ø§ÙØ¯ÙŠÙ† Ø§Ù„ÙƒØ¨ÙŠØ±',
      ku: 'Ú¾Û†ØªÛŽÙ„ÛŒ Ù…ÛŒØ³Û†Ù¾Û†ØªØ§Ù…ÛŒØ§ Ú¯Ø±Ø§Ù†Ø¯',
      en: 'Mesopotamia Grand Hotel'
    },
    category: 'hotel',
    bio: {
      ar: 'ÙˆØ§Ø­Ø© Ø§Ù„Ø¶ÙŠØ§ÙØ© ÙØ¦Ø© Ø§Ù„Ø®Ù…Ø³ Ù†Ø¬ÙˆÙ… Ù…Ø¹ Ø¥Ø·Ù„Ø§Ù„Ø§Øª Ø³Ø§Ø­Ø±Ø© ÙˆÙ…Ø±Ø§ÙÙ‚ Ø§Ø³ØªØ¬Ù…Ø§Ù… ØªØ¶Ù…Ù† Ù„Ùƒ Ø£Ø¹Ù„Ù‰ Ù…Ø³ØªÙˆÙŠØ§Øª Ø§Ù„ÙØ®Ø§Ù…Ø©.',
      ku: 'Ú¯Û•ÙˆØ±Û•ØªØ±ÛŒÙ† Ù‡Û†ØªÛŽÙ„ÛŒ Ù¾ÛŽÙ†Ø¬ Ø¦Û•Ø³ØªÛŽØ±Û• Ø¨Û• Ø´Ø§Ù‡Ø§Ù†Û•ØªØ±ÛŒÙ† Ø®Ø²Ù…Û•ØªÚ¯ÙˆØ²Ø§Ø±ÛŒ Ø¨Û† Ú¯Û•Ø´ØªÛŒØ§Ø±Ø§Ù†.',
      en: 'A premier 5-star hospitality hub overlooking historic landmarks, featuring majestic halls and a gym.'
    },
    phone: '+9647713637048'
  },
  {
    name: {
      ar: 'Ù…ÙƒØªØ¨ Ù…ÙˆÚµÚ©ÛŒ Ø²ÛŽÚ•ÛŒÙ† Ù„Ù„Ø¹Ù‚Ø§Ø±Ø§Øª Ø§Ù„Ù…Ø¹Ø§ØµØ±Ø©',
      ku: 'Ø¦Û†ÙÛŒØ³ÛŒ Ù…ÙˆÚµÚ©ÛŒ Ø²ÛŽÚ•ÛŒÙ†',
      en: 'Golden Property Real Estate'
    },
    category: 'real_estate',
    bio: {
      ar: 'Ù…ÙƒØªØ¨ Ù…Ø±Ø®Øµ Ø±Ø³Ù…ÙŠØ§Ù‹ Ù„Ø®Ø¯Ù…Ø§Øª Ø§Ù„Ø¹Ù‚Ø§Ø±Ø§Øª ÙˆØ§Ù„Ø§Ø³ØªØ«Ù…Ø§Ø±Ø§Øª Ø§Ù„ØªØ¬Ø§Ø±ÙŠØ© ÙˆØ§Ù„ÙˆØ³Ø§Ø·Ø© Ø§Ù„Ù…ÙˆØ«ÙˆÙ‚Ø© Ù„Ø£ØµØ­Ø§Ø¨ Ø§Ù„Ø£Ø¹Ù…Ø§Ù„.',
      ku: 'Ù†ÙˆÙˆØ³ÛŒÙ†Ú¯Û•ÛŒ Ú©Ú•ÛŒÙ†ÛŒ Ø®Ø§Ù†ÙˆØ¨Û•Ø±Û•ÛŒ Ø²ÛŽÚ•ÛŒÙ† Ø¨Û† Ø´ÙˆÛŽÙ†Û• Ø¨Ø§Ø²Ø±Ú¯Ø§Ù†ÛŒÛŒÛ•Ú©Ø§Ù† Ø¨Û• Ø¨Ø§Ø´ØªØ±ÛŒÙ† Ú¯Ø±ÛŽØ¨Û•Ø³Øª.',
      en: 'Licensed property investment firm focused on commercial property acquisitions and modern apartments.'
    },
    phone: '+9647986268855'
  },
  {
    name: {
      ar: 'Ø´Ø±ÙƒØ© Ø§Ù„Ø¨Ù†Ø§Ø¡ Ø§Ù„Ø­Ø¯ÙŠØ« Ù„Ù„Ù…Ù‚Ø§ÙˆÙ„Ø§Øª Ø§Ù„Ø¹Ø§Ù…Ø©',
      ku: 'Ú©Û†Ù…Ù¾Ø§Ù†ÛŒØ§ÛŒ Ø¨ÛŒÙ†Ø§Ø³Ø§Ø²ÛŒ Ú¯Ø´ØªÛŒ Ù‡Ø§ÙˆÚ†Û•Ø±Ø®',
      en: 'Modern Build Co.'
    },
    category: 'real_estate',
    bio: {
      ar: 'Ù†ØµÙ…Ù… ÙˆÙ†Ø¨Ù†ÙŠ Ù…Ø³ØªÙ‚Ø¨Ù„Ùƒ Ø¨Ø£Ø¹Ù„Ù‰ Ù…ÙˆØ§ØµÙØ§Øª Ø§Ù„Ø³Ù„Ø§Ù…Ø© Ø§Ù„Ù‡Ù†Ø¯Ø³ÙŠØ© ÙˆØªØ´ÙŠÙŠØ¯ Ø§Ù„ÙÙ„Ù„ Ø§Ù„Ø³ÙƒÙ†ÙŠØ© ÙˆØ£Ø¨Ø±Ø§Ø¬ Ø§Ù„Ø£Ø¹Ù…Ø§Ù„.',
      ku: 'Ø¯ÛŒØ²Ø§ÛŒÙ† Ùˆ Ø¯Ø±ÙˆØ³ØªÚ©Ø±Ø¯Ù†ÛŒ Ø¨Ø§ÚµÛ•Ø®Ø§Ù†Û•Ú©Ø§Ù† Ø¨Û• Ø¨Ø§Ø´ØªØ±ÛŒÙ† Ú©Û•Ø±Û•Ø³ØªÛ• Ùˆ Ú©ÙˆØ§Ù„ÛŒØªÛŒ Ù¾ÛŽØ´Ú©Û•ÙˆØªÙˆÙˆ.',
      en: 'General engineering enterprise designing robust high-rises and premium smart homes.'
    },
    phone: '+9647983533001'
  },
  {
    name: {
      ar: 'ØµØ§Ù„ÙˆÙ† Ù†Ø¬Ù…Ø© Ø§Ù„ØªØ¬Ù…ÙŠÙ„ Ø§Ù„Ù†Ø³Ø§Ø¦ÙŠ',
      ku: 'Ø³Ø§ÚµÛ†Ù†ÛŒ Ø¬ÙˆØ§Ù†Ú©Ø§Ø±ÛŒ Ø³ØªÛŽØ±Û•',
      en: 'Star Beauty Salon & Spa'
    },
    category: 'salon',
    bio: {
      ar: 'ØµØ§Ù„ÙˆÙ† Ø±Ø§Ù‚ÙŠ ÙˆÙ…ØªØ·ÙˆØ± ÙŠÙ‚Ø¯Ù… ØªØ³Ø±ÙŠØ­Ø§Øª ÙˆÙ‚ØµØ§Øª Ø´Ø¹Ø± Ø¹ØµØ±ÙŠØ©ØŒ Ø±Ø¹Ø§ÙŠØ© Ø·Ø¨ÙŠØ© Ù„Ù„Ø¨Ø´Ø±Ø©ØŒ ÙˆØ¨Ø§Ù‚Ø§Øª Ù…ÙƒÙŠØ§Ø¬ Ø§Ù„Ø¹Ø±Ø§Ø¦Ø³.',
      ku: 'Ù¾ÛŽØ´Ú©Û•Ø´Ú©Ø±Ø¯Ù†ÛŒ Ø¬ÙˆØ§Ù†ØªØ±ÛŒÙ† Ù…ÛŒÚ©ÛŒØ§Ø¬ÛŒ Ø®Ø§Ù†Ù…Ø§Ù† Ùˆ Ú†Ø§Ú©Ú©Ø±Ø¯Ù†ÛŒ Ù‚Ú˜ Ø¨Û† Ú¯Ø´Øª Ø¨Û†Ù†Û•Ú©Ø§Ù†.',
      en: 'Premium luxury makeover escape providing therapeutic skincare, modern hairstyling, and bridal makeup.'
    },
    phone: '+9647869205494'
  },
  {
    name: {
      ar: 'Ú©Ù„Û†Ø¨ÛŒ ÙˆÛ•Ø±Ø²Ø´ÛŒ Ø¦Û•Ø±ÛŽÙ† Ù„Ù„Ø±Ø´Ø§Ù‚Ø©',
      ku: 'Ú©Ù„Û†Ø¨ÛŒ ÙˆÛ•Ø±Ø²Ø´ÛŒ Ø¦Û•Ø±ÛŽÙ†',
      en: 'Areen Sports & Physical Club'
    },
    category: 'gym',
    bio: {
      ar: 'Ù†Ø§Ø¯ÙŠ Ø±ÙŠØ§Ø¶ÙŠ Ù…ØªÙƒØ§Ù…Ù„ Ù„Ù„Ø±Ø´Ø§Ù‚Ø© ÙˆØªÙ†Ø³ÙŠÙ‚ Ø§Ù„Ù‚ÙˆØ§Ù… Ø¨Ø¥Ø´Ø±Ø§Ù Ø®Ø¨Ø±Ø§Ø¡ ØªØºØ°ÙŠØ© ÙˆÙ…Ø¹Ø¯Ø§Øª ØªÙØªØ­ Ø§Ù„Ù†ÙØ³ Ù„Ù„ØªØ¯Ø±ÙŠØ¨ Ø§Ù„Ù…Ù…ØªØ§Ø².',
      ku: 'Ø³Û•Ù†ØªÛ•Ø±ÙŠ ØªÛ•Ù†Ø¯Ø±ÙˆØ³ØªÛŒ Ø¨Ø§Ø´ Ø¨Û† Ù„Ø§ÙˆØ§Ø²Ø¨ÙˆÙˆÙ† Ùˆ Ø²ÛŒØ§Ø¯Ú©Ø±Ø¯Ù†ÛŒ Ù…Ø§Ø³ÙˆÙ„Ú©Û• Ø¨Û• Ø¨Ø§Ø´ØªØ±ÛŒÙ† Ø¨Û•Ø±Ù†Ø§Ù…Û•.',
      en: 'Ultra-modern cardiovascular wellness lounge offering specialized training plans and fitness tracks.'
    },
    phone: '+9647945552626'
  },
  {
    name: {
      ar: 'ÙƒØ§ÙÙŠÙ‡ Ø§Ù„Ø±Ø§ÙØ¯ÙŠÙ† Ø§Ù„Ø­Ø¯ÙŠØ«',
      ku: 'ÙƒØ§ÙÙŠÙ‡ Ø¹ÛŽØ±Ø§Ù‚ÛŒ Ù†ÙˆÛŽ',
      en: 'Iraq Cafe & Specialty Brew'
    },
    category: 'cafe_bakery',
    bio: {
      ar: 'ÙƒØ§ÙÙŠÙ‡ Ø´Ø¨Ø§Ø¨ÙŠ ÙˆØ¹Ø§Ø¦Ù„ÙŠ ÙŠÙˆÙØ± Ø¬Ù„Ø³Ø§Øª Ø³Ø§Ø­Ø±Ø© Ù„Ù…Ø´Ø§Ù‡Ø¯Ø© Ø§Ù„Ù…Ø¨Ø§Ø±ÙŠØ§ØªØŒ Ù„Ø¹Ø¨ Ø§Ù„Ø´Ø·Ø±Ù†Ø¬ØŒ Ù…Ø¹ Ø£Ù„Ø° Ø£Ù†ÙˆØ§Ø¹ Ø§Ù„Ø­Ù„ÙˆÙŠØ§Øª ÙˆØ§Ù„Ù‚Ù‡ÙˆØ©.',
      ku: 'Ú©Ø§ÙÛŽÛŒÛ•Ú©ÛŒ Ú¯Û•Ù†Ø¬Ø§Ù†Û• Ø¨Û• Ù‚Ø§ÙˆÛ•ÛŒ Ø¨Û•ØªØ§Ù… Ùˆ Ú©Û•Ø´ÛŽÚ©ÛŒ Ù¾Ú• ÛŒØ§Ø±ÛŒ Ø¨Û• ØªÛ•Ù„Û•ÙØ²ÛŒÛ†Ù†ÛŒ Ú¯Û•ÙˆØ±Û•.',
      en: 'Vibrant local hub specializing in cardamom drip coffee, double cold brews, and watching live sports.'
    },
    phone: '+9647929458311'
  },
  {
    name: {
      ar: 'ØµØ§Ù„ÙˆÙ† Ù†ÙˆØ± Ø§Ù„Ø¬Ù…Ø§Ù„ Ù„Ù„Ø£ÙˆÙ„Ø§Ø¯ ÙˆØ§Ù„Ø±Ø¬Ø§Ù„',
      ku: 'Ø³Ø§ÚµÛ†Ù†ÛŒ Ù†ÙˆÙˆØ±ÛŒ Ø¬ÙˆØ§Ù†Ú©Ø§Ø±ÛŒ Ù¾ÛŒØ§ÙˆØ§Ù†',
      en: 'Noor Al-Jamal Men Salon'
    },
    category: 'salon',
    bio: {
      ar: 'Ø­Ù„Ø§Ù‚Ø© ÙˆÙ‚ØµØ§Øª Ø´Ø¹Ø± ÙˆØ¨Ø®Ø§Ø± Ø³Ø§Ø®Ù† ÙˆØ¬Ù„Ø³Ø§Øª Ù„ÙŠØ²Ø± ÙˆÙ…Ø³Ø§Ø¬ Ù…Ø±ÙŠØ­Ø© Ù„Ù„Ø§Ø³ØªØ±Ø®Ø§Ø¡ ÙˆØ§Ù„Ø¹Ù†Ø§ÙŠØ© Ø§Ù„ÙƒØ§Ù…Ù„Ø© Ø¨Ù…Ø¸Ù‡Ø±Ùƒ Ø§Ù„Ø£Ù†ÙŠÙ‚.',
      ku: 'Ø¨Ø§Ø´ØªØ±ÛŒÙ† Ù‡ÛŽÚµÛŒ Ø¬ÙˆØ§Ù†Ú©Ø§Ø±ÛŒ Ù¾ÛŒØ§ÙˆØ§Ù† Ø¨Û• Ø³ØªØ§ÙÛŒ Ø²Û†Ø± Ø¨Û•ØªÙˆØ§Ù†Ø§ Ù„Û• Ù‚Ú˜ Ùˆ Ú†Ø§Ú©Ú©Ø±Ø¯Ù†ÛŒ Ú•ÛŒØ´.',
      en: 'Professional sharp haircuts, hot steam beard treatments, facial repairs, and head massages.'
    },
    phone: '+9647896192478'
  },
  {
    name: {
      ar: 'Ù…Ø·Ø¹Ù… Ø§Ù„Ø±Ø´ÙŠØ¯ Ø§Ù„Ø¨ØºØ¯Ø§Ø¯ÙŠ Ø§Ù„Ø´Ù‡ÙŠØ±',
      ku: 'Ú†ÛŽØ´ØªØ®Ø§Ù†Û•ÛŒ Ú•Û•Ø´ÛŒØ¯',
      en: 'Al-Rasheed Restaurant'
    },
    category: 'restaurant',
    bio: {
      ar: 'Ù…Ø·Ø¹Ù… ÙˆÙ…Ø´Ø§ÙˆÙŠ Ù…Ù…ÙŠØ²Ø© ØªÙ‚Ø¯Ù… Ø§Ù„Ù…Ø´ÙˆÙŠØ§Øª ÙˆØ§Ù„Ù…Ø­Ø§Ø´ÙŠ ÙˆØ§Ù„Ø´ÙˆØ±Ø¨Ø§Øª Ø§Ù„Ø¹Ø±Ø§Ù‚ÙŠØ© Ø§Ù„Ø¹Ø±ÙŠÙ‚Ø© Ø¨Ù†ÙØ­Ø© ØªØ±Ø§Ø«ÙŠØ© Ù„Ø§ ØªÙ‚Ø§ÙˆÙ… Ù„Ù„Ø¬Ù…ÙŠØ¹.',
      ku: 'Ú†ÛŽØ´ØªØ®Ø§Ù†Û•ÛŒÛ•Ú©ÛŒ Ø¹ÛŽØ±Ù‚ÛŒ Ú©Û†Ù† Ø¨Û† Ù¾ÛŽØ´Ú©Û•Ø´Ú©Ø±Ø¯Ù†ÛŒ Ú©Û•Ø¨Ø§Ø¨ÛŒ Ú•Û•Ø³Û•Ù† Ùˆ Ú¯Û†Ø´ØªÛŒ Ø³ÙˆÙˆØ±.',
      en: 'Historical culinary landmark serving premium sizzling kebabs, loaded rice dishes and traditional teas.'
    },
    phone: '+9647765156203'
  },
  {
    name: {
      ar: 'Ø£ÙƒØ§Ø¯ÙŠÙ…ÙŠØ© Ø§Ù„Ø¢ÙØ§Ù‚ Ø§Ù„Ø¬Ø¯ÙŠØ¯Ø©',
      ku: 'Ù‚ÙˆØªØ§Ø¨Ø®Ø§Ù†Û•ÛŒ Ø¦Ø§Ø³Û†ÛŒ Ù†ÙˆÛŽÛŒ ØªØ§ÛŒØ¨Û•Øª',
      en: 'New Horizon Academy'
    },
    category: 'university',
    bio: {
      ar: 'Ù…Ø¤Ø³Ø³Ø© ØªØ¹Ù„ÙŠÙ…ÙŠØ© Ù†Ù…ÙˆØ°Ø¬ÙŠØ© ØªÙ‡ØªÙ… Ø¨Ø¨Ù†Ø§Ø¡ Ø§Ù„Ø´Ø®ØµÙŠØ© ÙˆØ§Ù„Ø°ÙƒØ§Ø¡ Ø§Ù„Ø¥Ø¨Ø¯Ø§Ø¹ÙŠ ÙˆØ§Ù„Ù„ØºØ§Øª Ø§Ù„Ø£Ø¬Ù†Ø¨ÙŠØ© Ù„Ù„Ø£Ø·ÙØ§Ù„ ÙˆØ§Ù„ÙŠØ§ÙØ¹ÙŠÙ†.',
      ku: 'Ù¾ÛŽØ´Ú©Û•Ø´Ú©Ø±Ø¯Ù†ÛŒ Ø²ÛŒØ§ØªØ±ÛŒÙ† Ø¦Ø§Ø³ØªÛŒ Ø²Ù…Ø§Ù†Û•ÙˆØ§Ù†ÛŒ Ùˆ Ø²Ø§Ù†Ø³ØªÛŒ Ù‡Ø§ÙˆÚ†Û•Ø±Ø® Ø¨Û† Ø¨Û•Ù‡ÛŽØ²Ø¨ÙˆÙˆÙ†ÛŒ Ø¦Ø§Ø³ØªÛŒ Ù…Ù†Ø§ÚµØ§Ù†.',
      en: 'Certified global schooling system centered on digital intelligence and fluent English language training.'
    },
    phone: '+9647853912983'
  },
  {
    name: {
      ar: 'Ù…Ø·Ø¹Ù… Ø§Ù„Ø´Ø±Ù‚ÙŠØ© Ù„Ù„Ù…Ø£ÙƒÙˆÙ„Ø§Øª Ø§Ù„Ø¨Ø­Ø±ÙŠØ© ÙˆØ§Ù„Ù…Ø´ÙˆÙŠØ§Øª',
      ku: 'Ú†ÛŽØ´ØªØ®Ø§Ù†Û•ÛŒ Ø´Û•Ø±Ù‚ÛŒÛ•ÛŒ Ø¨Û•Ù†Ø§ÙˆØ¨Ø§Ù†Ú¯',
      en: 'Al-Sharqiya Charcoal Grills'
    },
    category: 'restaurant',
    bio: {
      ar: 'Ø£Ø¬ÙˆØ¯ Ø§Ù„Ù…Ø´Ø±ÙˆØ¨Ø§Øª Ø§Ù„Ø³Ø§Ø®Ù†Ø© ÙˆØ§Ù„Ø¨Ø§Ø±Ø¯Ø© ÙˆØ£Ø·Ø¨Ø§Ù‚ Ø§Ù„Ù…Ø´ÙˆÙŠØ§Øª Ø§Ù„Ø­Ù„Ø¨ÙŠØ© ÙˆØ§Ù„Ø³Ù…Ùƒ Ø§Ù„Ù…Ø³ÙƒÙˆÙ Ø§Ù„Ø£ØµÙ„ÙŠ ÙÙŠ ØµØ§Ù„Ø© Ù…Ù…ÙŠØ²Ø© ÙˆÙ…ÙƒÙŠÙØ©.',
      ku: 'Ø¨Ø§Ø´ØªØ±ÛŒÙ† Ù…Ø§Ø³ÛŒ Ù…Û•Ø³Ú¯ÙˆÙ Ùˆ Ú©Û•Ø¨Ø§Ø¨ Ø¨Û• Ø´ÛŽÙˆØ§Ø²ÛŒ Ø¹ÛŽØ±Ø§Ù‚ÛŒ Ú•Û•Ø³Û•Ù† Ø¨Û† Ù…Ø§ÚµØ¨Ø§ØªÛ•Ú©Ø§Ù†.',
      en: 'Symphony of golden wood-grilled river fish, organic salad bars, and luxury family floor seating.'
    },
    phone: '+9647778652405'
  },
  {
    name: {
      ar: 'Ø§Ù„Ù…Ù†Ø§Ø±Ø© Ø§Ù„Ø°ÙƒÙŠØ© Ù„Ù„Ø¥Ù„ÙƒØªØ±ÙˆÙ†ÙŠØ§Øª ÙˆÙ‡ÙˆØ§ØªÙ Ø§Ù„Ø¬ÙŠÙ„ Ø§Ù„Ø®Ø§Ù…Ø³',
      ku: 'ØªÛ•Ú©Ù†Û•Ù„Û†Ø¬ÛŒØ§ÛŒ Ø²ÛŒØ±Û•Ú©ÛŒ ÙÛŒØ¯ÛŽÚµ',
      en: 'Smart Electronics & Tech Hub'
    },
    category: 'mobile_shop',
    bio: {
      ar: 'Ù…ØªØ¬Ø±ÙƒÙ… Ø§Ù„Ù…Ø¹ØªÙ…Ø¯ Ù„Ø´Ø±Ø§Ø¡ Ø£Ø­Ø¯Ø« Ø§Ù„Ù‡ÙˆØ§ØªÙ Ø§Ù„Ø°ÙƒÙŠØ© ÙˆØ¨Ø·Ø§Ù‚Ø§Øª Ø§Ù„Ø¬ÙŠÙ…Ø² ÙˆØ¥ÙƒØ³Ø³ÙˆØ§Ø±Ø§Øª Ø§Ù„Ø­ÙˆØ§Ø³ÙŠØ¨ Ø¨Ø¶Ù…Ø§Ù†Ø§Øª Ø±Ø³Ù…ÙŠØ© Ø­Ù‚ÙŠÙ‚ÙŠØ©.',
      ku: 'Ø¯Ø§Ø¨ÛŒÙ†Ú©Ø±Ø¯Ù†ÛŒ Ù‡Û•Ù…ÙˆÙˆ Ø¬Û†Ø±Û• Ù…Û†Ø¨Ø§ÛŒÙ„ÛŽÚ©ÛŒ Ø²ÛŒØ±Û•Ú© Ùˆ Ù¾Ù„Û•ÛŒØ³ØªÛ•ÛŒØ´Ù† Ø¨Û• Ù†Ø²Ù…ØªØ±ÛŒÙ† Ù†Ø±Ø® Ù„Û• Ø¨Ø§Ø²Ø§Ú•.',
      en: 'Premier device reseller specializing in custom gaming rigs, tablets and smart audio systems.'
    },
    phone: '+9647842125421'
  }
];

export interface PostTemplate {
  caption: { ar: string; ku: string; en: string };
  badge: { ar: string; ku: string; en: string };
  mediaUrl: string;
}

const VARIED_IMAGES: Record<string, string[]> = {
  restaurant: [
    'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&auto=format&fit=crop&q=80'
  ],
  cafe_bakery: [
    'https://images.unsplash.com/photo-1498804103079-a6351b050096?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=800&auto=format&fit=crop&q=80'
  ],
  pharmacy: [
    'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1585435557343-3b092031a831?w=800&auto=format&fit=crop&q=80'
  ],
  gym: [
    'https://images.unsplash.com/photo-1534438327276-14e5302c3a48?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1576678927484-cc907957088c?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=800&auto=format&fit=crop&q=80'
  ],
  university: [
    'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1562774053-701939374585?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1592280771190-3e2e4d571d0a?w=800&auto=format&fit=crop&q=80'
  ],
  hotel: [
    'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&auto=format&fit=crop&q=80'
  ],
  real_estate: [
    'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop&q=80'
  ],
  salon: [
    'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=800&auto=format&fit=crop&q=80'
  ],
  mobile_shop: [
    'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1531297484001-792221af43a4?w=800&auto=format&fit=crop&q=80'
  ]
};

export const BUSINESS_AVATARS = [
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&auto=format&fit=crop&q=80'
];

export const POST_TEMPLATES_BY_CATEGORY: Record<string, PostTemplate[]> = {
  restaurant: [
    {
      caption: {
        ar: 'Ù…ÙŠÙ† ÙŠØ´ØªÙ‡ÙŠ Ù…Ø´Ø§ÙˆÙŠ Ø¹Ù„Ù‰ Ø­Ø·Ø¨ Ø§Ù„Ø³Ù†Ø¯ÙŠØ§Ù† Ø¹Ø§Ù„Ø­Ù‚ØŸ ðŸ¢ðŸ”¥ Ø·Ø¨Ù‚ Ø§Ù„ÙƒØ¨Ø§Ø¨ Ø§Ù„Ù…Ø´ÙƒÙ„ Ù…Ø§Ù„ØªÙ†Ø§ ÙŠØ­Ø¶Ø± Ù…Ù† Ø£ÙØ¶Ù„ Ù„Ø­ÙˆÙ… Ø§Ù„ØºÙ†Ù… Ø§Ù„Ø¹Ø±Ø§Ù‚ÙŠØ© Ø§Ù„Ø·Ø§Ø²Ø¬Ø© ÙˆØªØªØ¨ÙŠÙ„Ø© Ø³Ø±ÙŠØ© Ù…Ù…ÙŠØ²Ø©! ÙƒØ±ÙˆØ´Ø© Ø®ÙÙŠÙØ© Ø¯Ø§ÙÙŠØ© Ù…Ø¹ Ø§Ù„Ø¹Ø§Ø¦Ù„Ø© ØªØ®Ù„ÙŠ ÙŠÙˆÙ…Ùƒ ÙˆÙ„Ø§ Ø£Ø±ÙˆØ¹. Ù‡Ø§ØªÙ Ù„Ù„Ø­Ø¬Ø² ÙˆØ§Ù„Ø§Ø³ØªÙØ³Ø§Ø± Ù…ØªÙˆÙØ± Ø¨Ø§Ù„ÙˆØµÙ. Ø²ÙˆØ±ÙˆÙ†Ø§ Ø§Ù„ÙŠÙˆÙ…!',
        ku: 'Ú©ÛŽ Ø­Û•Ø²ÛŒ Ù„Û• Ú©Ø¨Ø§Ø¨ÛŒ Ú•Û•Ø³Û•Ù†ÛŒ Ø¹ÛŽØ±Ø§Ù‚ÛŒÛŒÛ•ØŸ ðŸ¢ðŸ”¥ Ø¦Ø§Ù…Ø§Ø¯Û•Ú©Ø±Ø§Ùˆ Ø¨Û• Ú¯Û†Ø´ØªÛŒ ÙØ±ÛŽØ´ Ø¨Û• ØªØ§Ù…ÛŒ Ø¯Ø§Ø±ÛŒ Ø³Ø±ÙˆØ´ØªÛŒ. Ù¾ÛŽØ´ÙˆØ§Ø²ÛŒ Ù„Û• Ú¯Ø´Øª Ú©Ú•ÛŒØ§Ø±Ø§Ù† Ùˆ Ø®ÛŽØ²Ø§Ù†Û•Ú©Ø§Ù† Ø¯Û•Ú©Û•ÛŒÙ† Ø¨Û• Ø¯Ø§Ø´Ú©Ø§Ù†Ø¯Ù†ÛŒ ØªØ§ÛŒØ¨Û•Øª.',
        en: "Gourmet, wood-fired Iraqi kebabs grilled to absolute perfection tonight! ðŸ¢ðŸ”¥ Hand-pressed local cuts blended with proprietary family spices. Bring your loved ones to enjoy our relaxing family hall with tables overlooking the scenery!"
      },
      badge: { ar: 'Ù…Ø´Ø§ÙˆÙŠ Ù…Ù„ÙˆÙƒÙŠØ© ðŸ”¥', ku: 'Ú©Û•Ø¨Ø§Ø¨ÛŒ Ú•Û•Ø³Û•Ù† ðŸ”¥', en: 'King Grill Deal ðŸ”¥' },
      mediaUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80'
    },
    {
      caption: {
        ar: 'Ø¬Ù…Ø¹ØªÙ†Ø§ Ø£Ø­Ù„Ù‰ ÙˆØ£Ù…ÙŠØ² Ù…Ø¹ Ø§Ù„Ù‚ÙˆØ²ÙŠ Ø§Ù„Ø¹Ø±Ø§Ù‚ÙŠ Ø§Ù„ÙØ§Ø®Ø± Ù…Ù† Ù…Ø·Ø¹Ù…Ù†Ø§ Ø§Ù„Ø­Ø¨ÙŠØ¨! ðŸ‘¨â€ðŸ‘©â€ðŸ‘§â€ðŸ‘¦ Ø·Ø¹Ù… ÙŠØ±Ø¬Ø¹Ùƒ Ù„Ø¯ÙØ¡ Ù…Ø§Ø¦Ø¯Ø© Ø§Ù„Ø£Ù…Ù‡Ø§Øª ÙˆØ§Ù„Ù‚Ø±ÙŠØ© Ø§Ù„Ø¹Ø±Ø§Ù‚ÙŠØ© Ø§Ù„Ø¯Ø§ÙØ¦Ø©. Ø§Ù„Ø±Ø² Ù…Ø²ÙŠÙ† Ø¨Ø§Ù„Ù…ÙƒØ³Ø±Ø§Øª ÙˆØ§Ù„Ø²Ø¹ÙØ±Ø§Ù† Ù…Ø¹ Ø§Ù„Ù„Ø­Ù… Ø§Ù„Ø¨Ù„Ø¯ÙŠ Ø§Ù„Ø°Ø§Ø¦Ø¨. Ø¬Ø±Ø¨ÙˆÙ‡ Ø§Ù„ÙŠÙˆÙ… ÙˆÙ…ØªØ¹ÙˆØ§ Ø´Ù‡ÙŠØªÙƒÙ…. Ù†ÙØªØ­ Ù„ØºØ§ÙŠØ© Ø§Ù„Ø³Ø§Ø¹Ø© 1:00 ØµØ¨Ø§Ø­Ø§Ù‹.',
        ku: 'Ø¨Û• Ø®Û†Ø´ØªØ±ÛŒÙ† Ú˜Û•Ù…ÛŒ Ù‚Û†Ø²ÛŒ Ø¹ÛŽØ±Ø§Ù‚ÛŒ Ø¦ÛŽÙˆØ§Ø±Û•Ú©Û•Øª Ú•ÙˆÙˆÙ†Ø§Ú© Ø¨Ú©Û•Ø±Û•ÙˆÛ•! ðŸ‘¨â€ðŸ‘©â€ðŸ‘§â€ðŸ‘¦ Ú¯Û†Ø´ØªÛŒ Ú¯Û•Ø±Ù… Ùˆ Ø²Û•Ø¹ÙÛ•Ø±Ø§Ù†ÛŒ Ø´Ø§Ù‡Ø§Ù†Û•. ØªØ§ Ø¯Ø±Û•Ù†Ú¯Ø§Ù†ÛŒ Ø´Û•Ùˆ Ú©Ø±Ø§ÙˆÛ•ÛŒÛ• Ø¨Û† Ù¾ÛŽØ´ÙˆØ§Ø²ÛŒÚ©Ø±Ø¯Ù†ÛŒ Ø¦ÛŽÙˆÛ•.',
        en: 'Indulge in our signature slow-roasted local Quzi! ðŸ‘¨â€ðŸ‘©â€ðŸ‘§â€ðŸ‘¦ Tender, fall-off-the-bone meat, hand-harvested basmati rice, saffron hints, and generous premium nuts topping. Relish authentic heritage tonight.'
      },
      badge: { ar: 'Ù‚ÙˆØ²ÙŠ Ø´ÙŠÙˆØ®ÙŠ ðŸ¥©', ku: 'Ù‚Û†Ø²ÛŒ Ø¨Û•ØªØ§Ù… ðŸ¥©', en: 'Sovereign Quzi ðŸ¥©' },
      mediaUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80'
    }
  ],
  cafe_bakery: [
    {
      caption: {
        ar: 'ØµØ¨Ø§Ø­ Ø§Ù„Ø±ÙˆØ§Ù‚ ÙˆÙ†Ø³ÙŠÙ… Ø§Ù„ØµØ¨Ø§Ø­ Ø§Ù„Ø¯Ø§ÙØ¦! â˜•ðŸ¥ Ø§Ø¨Ø¯Ø£ ÙŠÙˆÙ…Ùƒ Ù…Ø¹Ù†Ø§ Ø¨Ø§Ù„Ø·Ø§Ù‚Ø© ÙˆØ§Ù„Ø¥ÙŠØ¬Ø§Ø¨ÙŠØ© ÙˆØ¹Ø·Ø± Ø§Ù„Ù‚Ù‡ÙˆØ© Ø§Ù„Ù…Ø®ØªØµØ© Ø§Ù„Ù…Ø¬Ù‡Ø²Ø© Ø¨Ø¹Ù†Ø§ÙŠØ©. Ø§Ù„ÙƒØ§Ø¨ØªØ´ÙŠÙ†Ùˆ Ù…Ø§Ù„ØªÙ†Ø§ Ù…Ø¹ Ø±ØºÙˆØ© ÙƒØ«ÙŠÙØ© ÙˆÙ‡ÙŠÙ„ Ø¹Ø±Ø§Ù‚ÙŠ Ù…Ù…ÙŠØ² ÙØ¯ Ø´ÙŠ ÙŠØ±ÙŠØ­ Ø§Ù„Ø¨Ø§Ù„! Ø§Ù†ØªØ±Ù†Øª ÙØ§Ø¦Ù‚ Ø§Ù„Ø³Ø±Ø¹Ø© ÙˆØ²Ø§ÙˆÙŠØ© Ù‡Ø§Ø¯Ø¦Ø© Ù„Ø¹Ø´Ø§Ù‚ Ø§Ù„Ø¹Ù…Ù„ ÙˆØ§Ù„Ø¯Ø±Ø§Ø³Ø© ÙˆØ§Ù„Ù…Ø·Ø§Ù„Ø¹Ø©.',
        ku: 'Ø¨Û•ÛŒØ§Ù†ÛŒØªØ§Ù† Ø¨Ø§Ø´ Ø¨Û• ØªØ§Ù…ÛŒ Ú©Ø§Ù¾ÙˆÚ†ÛŒÙ†Û†ÛŒ Ù‡ÛŽÙ„ÛŒ Ù†Ø§ÛŒØ§Ø¨! â˜•ðŸ¥ Ú©Û•Ø´ÛŽÚ©ÛŒ Ø²Û†Ø± Ø¦Ø§Ø±Ø§Ù… Ø¨Û† Ú©Ø§Ø±Ú©Ø±Ø¯Ù† Ùˆ Ø®ÙˆÛŽÙ†Ø¯Ù† Ù„Û•Ú¯Û•Úµ Ø®ÛŽØ±Ø§ØªØ±ÛŒÙ† Ù‡ÛŽÚµÛŒ Ø¦ÛŒÙ†ØªÛ•Ø±Ù†ÛŽØª.',
        en: 'Fuel your morning hustle with our award-winning Cardamom Infused Capuccino paired with flaky warm butter croissants. â˜•ðŸ¥ Blazing fast fibre Wi-Fi, cozy acoustic music, and peaceful reading nooks in the heart of the district.'
      },
      badge: { ar: 'Ø±ÙˆØ§Ù‚ ØµØ¨Ø§Ø­ÙŠ â˜•', ku: 'Ø±Û•ÙˆØ§Ù‚ÛŒ Ø¨Û•ÛŒØ§Ù†ÛŒØ§Ù† â˜•', en: 'Morning Hustle â˜•' },
      mediaUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=80'
    },
    {
      caption: {
        ar: 'Ø­Ù„ÙˆÙ‰ Ù…ØªÙ…ÙŠØ²Ø© Ù…Ø¹ ÙƒÙˆØ¨ Ø¯Ø¨Ù„ Ø§Ø³Ø¨Ø±ÙŠØ³Ùˆ Ø³Ø§Ø­Ø±! ðŸ°â˜• Ø®Ø° ÙØ§ØµÙ„ Ù…Ù† Ø¶ØºÙˆØ· Ø§Ù„Ø¹Ù…Ù„ Ø§Ù„ÙŠÙˆÙ…ÙŠ ÙˆØ¯Ù„Ù‘Ø¹ Ø±ÙˆØ­Ùƒ Ø¨Ø´Ø±Ø§Ø¦Ø­ Ø§Ù„ÙƒÙŠÙƒ Ø§Ù„Ø·Ø§Ø²Ø¬Ø© ÙˆØ§Ù„Ù…Ø­Ø´ÙˆØ© Ø¨Ø§Ù„ÙƒØ±Ø§Ù…ÙŠÙ„ Ø§Ù„Ù…Ù…Ù„Ø­ ÙˆØ§Ù„Ù…Ø¹Ø¯ Ø¨ÙŠØ¯ÙŠ Ø®Ø¨Ø±Ø§Ø¦Ù†Ø§ Ø¨Ù…ÙƒÙˆÙ†Ø§Øª Ù…Ø³ØªÙˆØ±Ø¯Ø© ÙØ§Ø®Ø±Ø©. Ø¨Ø§Ù†ØªØ¸Ø§Ø±ÙƒÙ… ÙÙŠ Ø¬Ù„Ø³Ø§ØªÙ†Ø§ Ø§Ù„Ø¹Ø§Ø¦Ù„ÙŠØ© Ø§Ù„Ø±Ø§Ù‚ÙŠØ© ÙˆØ§Ù„Ù…ÙØªÙˆØ­Ø©.',
        ku: 'Ø´ÛŒØ±ÛŒÙ†ÛŒ Ø´ÛŒÚ© Ùˆ Ù‚Ø§ÙˆÛ•ÛŒ Ú¯Û•Ø±Ù… Ø¨Û† Ø­Û•ÙˆØ§Ù†Û•ÙˆÛ•ÛŒ Ø¦ÛŽÙˆÛ•! ðŸ°â˜• Ù¾ÛŽØ´ÙˆØ§Ø²ÛŒ Ù„Û• Ú¯Û•Ù†Ø¬Ø§Ù† Ùˆ Ù…Û†Ø­Ø¨ÛŒÙ†Ø§Ù† Ø¯Û•Ú©Û•ÛŒÙ† Ú•Û†Ú˜Ø§Ù†Û• ØªØ§ Ø¯Ø±Û•Ù†Ú¯.',
        en: 'Satisfy your sweet cravings with our fresh artisanal Salted Caramel cakes and premium double espresso brews. ðŸ°â˜• Unwind safely in our outdoor heated terrace.'
      },
      badge: { ar: 'Ø¯Ù‚Ø§Ø¦Ù‚ Ø§Ù„Ø³Ø¹Ø§Ø¯Ø© ðŸ°', ku: 'Ú©Ø§Øª Ø¨Û† Ø­Û•ÙˆØ§Ù†Û•ÙˆÛ• ðŸ°', en: 'Gourmet Dessert ðŸ°' },
      mediaUrl: 'https://images.unsplash.com/photo-1498804103079-a6351b050096?w=800&auto=format&fit=crop&q=80'
    }
  ],
  pharmacy: [
    {
      caption: {
        ar: 'ØµØ­ØªÙƒÙ… ÙˆØ³Ù„Ø§Ù…Ø© Ø¹ÙˆØ§Ø¦Ù„ÙƒÙ… Ù‡ÙŠ Ø£Ù…Ø§Ù†ØªÙ†Ø§ Ø§Ù„Ø£ÙˆÙ„Ù‰! ðŸ’Šâ¤ï¸ ØªÙØ¶Ù„ Ø¨Ø²ÙŠØ§Ø±Ø© ØµÙŠØ¯Ù„ÙŠØªÙ†Ø§ Ø§Ù„Ù…Ø¹ØªÙ…Ø¯Ø© Ù„Ù„Ø­ØµÙˆÙ„ Ø¹Ù„Ù‰ Ù†ØµØ­ ÙˆØ¥Ø±Ø´Ø§Ø¯ Ø·Ø¨ÙŠ Ù…Ù† Ø£ÙƒÙØ£ Ø§Ù„ØµÙŠØ§Ø¯Ù„Ø© Ø§Ù„Ù…Ø­ØªØ±ÙÙŠÙ†ØŒ Ù…Ø¹ ØªÙˆÙÙŠØ± ÙƒØ§Ù…Ù„ Ù„Ø¨Ø±ÙˆØªÙˆÙƒÙˆÙ„Ø§Øª Ø¹Ù„Ø§Ø¬ Ø£Ù…Ø±Ø§Ø¶ Ø§Ù„Ø¶ØºØ· ÙˆØ§Ù„Ø³ÙƒØ±ÙŠ Ø§Ù„Ù…Ø²Ù…Ù†Ø© Ø§Ù„Ù…Ø³ØªÙˆØ±Ø¯Ø© ÙˆØ¨Ø¶Ù…Ø§Ù† Ø­Ù‚ÙŠÙ‚ÙŠ ÙˆØªÙˆØµÙŠÙ„ ÙÙˆØ±ÙŠ Ù„Ø¨ÙŠØªÙƒ.',
        ku: 'ØªÛ•Ù†Ø¯Ø±ÙˆØ³ØªÛŒØªØ§Ù† Ù„Û• Ø³Û•Ø±ÙˆÙˆÛŒ Ù‡Û•Ù…ÙˆÙˆ Ù¾ÛŽÙˆÛŒØ³ØªÛŒÛŒÛ•Ú©Û•ÙˆÛ•ÛŒÛ•! ðŸ’Šâ¤ï¸ Ø¯Ø§Ø¨ÛŒÙ†Ú©Ø±Ø¯Ù†ÛŒ ØªÛ•ÙˆØ§ÙˆÛŒ Ø¯Û•Ø±Ù…Ø§Ù†Û•Ú©Ø§Ù†ÛŒ Ù†Û•Ø®Û†Ø´ÛŒ Ø¯Ø±ÛŽÚ˜Ø®Ø§ÛŒÛ•Ù† Ø¨Û• Ú¯Ø±Û•Ù†ØªÛŒ Ù†Ù…Ø±Û• ÛŒÛ•Ú© Ø¨Û† Ø¦ÛŽÙˆÛ•.',
        en: "Your health is our absolute highest priority. ðŸ’Šâ¤ï¸ Stop by today for a complete consultation on imported medicine treatments, authentic certifications, and professional prescription guidance. Fast doorstep delivery is active!"
      },
      badge: { ar: 'Ø±Ø¹Ø§ÙŠØ© ÙˆØ«Ù‚Ø© â¤ï¸', ku: 'Ú†Ø§ÙˆØ¯ÛŽØ±ÛŒ Ùˆ Ù…ØªÙ…Ø§Ù†Û• â¤ï¸', en: 'Certified Healthcare â¤ï¸' },
      mediaUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&auto=format&fit=crop&q=80'
    }
  ],
  gym: [
    {
      caption: {
        ar: 'Ø­Ø±Ù‚ Ø§Ù„Ø³Ø¹Ø±Ø§Øª ÙˆØ¨Ù†Ø§Ø¡ Ø§Ù„Ø¹Ø¶Ù„Ø§Øª Ø¨Ù‚ÙˆØ© ÙˆØ§Ø­ØªØ±Ø§ÙÙŠØ©! ðŸ’ªðŸ‹ï¸ Ø§Ù†Ø¶Ù… Ø¥Ù„ÙŠÙ†Ø§ Ø§Ù„ÙŠÙˆÙ… ÙˆØ§Ø³ØªÙ…ØªØ¹ Ø¨Ø¬Ù„Ø³Ø§Øª ØªØ¯Ø±ÙŠØ¨ Ø­ØµØ±ÙŠØ© Ù…Ø¹ ÙƒØ¨Ø§ØªÙ† Ù…Ø¹ØªÙ…Ø¯ÙŠÙ†ØŒ ÙˆÙ…Ø¹Ø¯Ø§Øª Ù‚ÙˆÙŠØ© Ù…ØªÙƒØ§Ù…Ù„Ø© ØªØ³Ø§Ø¹Ø¯Ùƒ Ø¹Ù„Ù‰ ØªØ­Ù‚ÙŠÙ‚ Ø­Ù„Ù… Ø§Ù„Ø±Ø´Ø§Ù‚Ø© ÙˆØ§Ù„ØµØ­Ø© ÙˆØªÙ†Ø³ÙŠÙ‚ Ø§Ù„Ù‚ÙˆØ§Ù… Ø¨Ø£ÙØ¶Ù„ Ø§Ù„Ø£Ø³Ø¹Ø§Ø± ÙˆØ¨ÙˆÙÙŠÙ‡ Ù…ÙƒÙ…Ù„Ø§Øª ØºØ°Ø§Ø¦ÙŠØ© Ø£ØµÙ„ÙŠ Ø¨Ø§Ù„ÙƒØ§Ù…Ù„.',
        ku: 'Ø¬Û•Ø³ØªÛ•ÛŒ Ø®Û†Øª Ø¨Ú¯Û†Ú•Û• Ø¨Û• Ø¨Û•Ù‡ÛŽØ²ØªØ±ÛŒÙ† Ú•Ø§Ù‡ÛŽÙ†Ø§Ù† Ù„Û• Ø³Ø§ÚµÛ†Ù†ÛŒ ÙˆÛ•Ø±Ø²Ø´ÛŒ! ðŸ’ªðŸ‹ï¸ Ú•Ø§Ù‡ÛŽÙ†Û•Ø±ÛŒ ØªØ§ÛŒØ¨Û•ØªÛŒØŒ Ø¦Ø§Ù…ÛŽØ±ÛŒ Ù…Û†Ø¯ÛŽØ±Ù† Ùˆ Ø¨Ø§Ø´ØªØ±ÛŒÙ† Ø¨Û•Ø±Ù†Ø§Ù…Û•ÛŒ Ø®Û†Ø±Ø§Ú©.',
        en: "Crush your limits and shape your dream physique with our world-class cardio lines, lifting machinery, and direct mentorship from regional powerlifting champions. Join today and receive physical diagnostics!"
      },
      badge: { ar: 'ØªØ­Ø¯ÙŠ Ø§Ù„Ø£Ø¨Ø·Ø§Ù„ ðŸ‹ï¸', ku: 'Ø¨Ø¨Ù† Ø¨Û• Ù¾Ø§ÚµÛ•ÙˆØ§Ù† ðŸ‹ï¸', en: 'Unleash Power ðŸ‹ï¸' },
      mediaUrl: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800&auto=format&fit=crop&q=80'
    }
  ],
  university: [
    {
      caption: {
        ar: 'Ø¥Ù„Ù‡Ø§Ù… Ø¨Ù„Ø§ Ø­Ø¯ÙˆØ¯ Ù„Ø¬ÙŠÙ„ Ø§Ù„Ù…Ø³ØªÙ‚Ø¨Ù„ Ø§Ù„ÙˆØ§Ø¹Ø¯! ðŸŽ“ðŸ“š ÙŠØ³Ø¹Ø¯Ù†Ø§ Ø§Ø³ØªÙ‚Ø¨Ø§Ù„ Ø·Ù„Ø¨Ø§Øª Ø§Ù„ØªØ³Ø¬ÙŠÙ„ Ù„Ù„ÙØµÙ„ Ø§Ù„Ø¯Ø±Ø§Ø³ÙŠ Ø§Ù„Ø¬Ø¯ÙŠØ¯ Ø¨Ù…Ù†Ø§Ù‡Ø¬ Ø¹Ù„Ù…ÙŠØ© ÙˆØ¹Ù…Ù„ÙŠØ© ØªÙØ§Ø¹Ù„ÙŠØ© Ø­Ø¯ÙŠØ«Ø©ØŒ ØºØ±Ù ØµÙÙŠØ© Ù…Ø¬Ù‡Ø²Ø© Ø¨Ø£Ø­Ø¯Ø« ØªÙ‚Ù†ÙŠØ§Øª Ø§Ù„Ø¹Ø±Ø¶ Ø§Ù„Ø°ÙƒÙŠ ÙˆÙƒØ§Ø¯Ø± ØªØ¹Ù„ÙŠÙ…ÙŠ ÙŠÙ…ØªÙ„Ùƒ Ø³Ù†ÙŠÙ† Ù…Ù† Ø§Ù„Ø®Ø¨Ø±Ø© ÙÙŠ ØªÙˆØ¬ÙŠÙ‡ Ù…Ù‡Ø§Ø±Ø§Øª Ø§Ù„Ø·Ø§Ù„Ø¨ ÙˆØ¥Ø¨Ø¯Ø§Ø¹Ù‡.',
        ku: 'Ø¯Û•Ø³ØªÙ¾ÛŽÚ©Ø±Ø¯Ù†ÛŒ Ù‚Û†Ù†Ø§ØºÛŽÚ©ÛŒ Ù†ÙˆÛŽ Ù„Û• ÙÛŽØ±Ø¨ÙˆÙˆÙ† Ùˆ ÙÛŽØ±Ú©Ø§Ø±ÛŒ Ù†Ø§ÛŒØ§Ø¨ Ø¨Û† Ù…Ù†Ø§ÚµÛ•Ú©Ø§Ù†ØªØ§Ù†! ðŸŽ“ðŸ“š Ù‚ÙˆØªØ§Ø¨Ø®Ø§Ù†Û•ÛŒ Ù…Û†Ø¯ÛŽØ±Ù† Ø¨Û• Ø¨Ø§Ø´ØªØ±ÛŒÙ† Ù…Ø§Ù…Û†Ø³ØªØ§ÛŒØ§Ù†.',
        en: "Shaping the minds of tomorrow's visionary leaders today. ðŸŽ“ðŸ“š Admissions are now active for high-caliber programs with interactive tech-labs, certified professional tutors, and holistic extracurricular pursuits. Book a campus trip!"
      },
      badge: { ar: 'Ø¹Ù„Ù… ÙˆØªÙ…ÙŠØ² ðŸŽ“', ku: 'Ø¯Ø§Ù‡Ø§ØªÙˆÙˆÛŒÛ•Ú©ÛŒ Ú¯Û•Ø´ ðŸŽ“', en: 'Admissions Open ðŸŽ“' },
      mediaUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&auto=format&fit=crop&q=80'
    }
  ],
  hotel: [
    {
      caption: {
        ar: 'Ø§Ù„Ø§Ø³ØªØ¬Ù…Ø§Ù… Ø§Ù„ÙØ®Ù… Ø§Ù„Ø°ÙŠ ØªØ¨Ø­Ø« Ø¹Ù†Ù‡ ØªØ­Øª Ù†Ø¬ÙˆÙ… Ø§Ù„Ù…Ø³Ø§Ø¡ Ø§Ù„Ø¨Ø§Ø±Ø¯Ø©! ðŸ¨ðŸ”ï¸ Ø¨Ø§Ù‚Ø© Ù†Ù‡Ø§ÙŠØ© Ø§Ù„Ø£Ø³Ø¨ÙˆØ¹ Ø§Ù„ÙØ§Ø®Ø±Ø© ØµÙ…Ù…Øª Ù„ØªÙ…Ù†Ø­ Ø±ØºØ¯ Ø§Ù„Ø¹ÙŠØ´ Ø¨Ø£Ø³Ø¹Ø§Ø± Ù…Ù…ØªØ§Ø²Ø©ØŒ Ø¨ÙˆÙÙŠÙ‡ Ù…ÙØªÙˆØ­ Ù…Ø¹ Ø·Ù‡Ø§Ø© Ø¹Ø§Ù„Ù…ÙŠÙŠÙ† ÙˆØµØ§Ù„ÙˆÙ† Ø³Ø¨Ø§ ØªØ®ØµØµÙŠ Ù„Ø¥Ø¹Ø§Ø¯Ø© Ø§Ù„Ù†Ø´Ø§Ø· ÙˆØ§Ù„Ø­ÙŠÙˆÙŠØ© Ù„Ø¬Ø³Ø¯Ùƒ ÙˆØ¹Ù‚Ù„Ùƒ. Ø§Ø­Ø¬Ø² Ø§Ù„ÙŠÙˆÙ… Ø¨Ù…ÙƒØ§Ù„Ù…Ø© Ø³Ø±ÙŠØ¹Ø©.',
        ku: 'Ø®Û†Ø´ØªØ±ÛŒÙ† Ú©Ø§ØªÛŒ Ø­Û•ÙˆØ§Ù†Û•ÙˆÛ•ÛŒ Ø´Ø§Ù‡Ø§Ù†Û• Ù„Û•Ú¯Û•Úµ Ø¯ÛŒÙ…Û•Ù†ÛŒ Ø¯ÚµÚ¯ÛŒØ± Ùˆ Ù…Û•Ù„Û•ÙˆØ§Ù†Ú¯Û•! ðŸ¨ðŸ”ï¸ ØªÛŒÙ…ÛŒ Ù…ÛŽÙˆØ§Ù†Ø¯Ø§Ø±ÛŒ Ø¨Ø§Ø´ Ù„Û• Ø®Ø²Ù…Û•ØªÛŒ Ø¦ÛŽÙˆÛ•Ø¯Ø§ÛŒÛ•.',
        en: 'Indulge in unmatched 5-star mountain luxury and therapeutic relaxation packages. ðŸ¨ðŸ”ï¸ Enjoy multi-cuisine breakfast buffets, deep tissue herbal massages, and fully private executive suites. Secure your grand retreat today.'
      },
      badge: { ar: 'Ø¥Ù‚Ø§Ù…Ø© Ù…Ù„ÙƒÙŠØ© ðŸ¨', ku: 'Ù…Ø§Ù†Û•ÙˆÛ•ÛŒ Ø´Ø§Ù‡Ø§Ù†Û• ðŸ¨', en: '5-Star Luxury ðŸ¨' },
      mediaUrl: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&auto=format&fit=crop&q=80'
    }
  ],
  real_estate: [
    {
      caption: {
        ar: 'ÙÙŠÙ„Ø§ ÙØ®Ù…Ø© ÙˆØ¹ØµØ±ÙŠØ© Ù…Ø®ØµØµØ© Ù„Ø°ÙˆÙ‚Ùƒ Ø§Ù„Ø±ÙÙŠØ¹! ðŸ¢ðŸ”‘ Ù†Ø­Ù† ÙÙŠ Ù…ÙƒØªØ¨Ù†Ø§ Ù…Ø±Ø®ØµÙˆÙ† Ù„ØªÙ‚Ø±ÙŠØ¨ Ø§Ù„Ù…Ø³Ø§ÙØ§Øª ÙˆØªÙˆÙÙŠØ± Ø£ÙØ¶Ù„ Ø§Ù„Ø¹Ø±ÙˆØ¶ Ø§Ù„Ù‚Ø§Ù†ÙˆÙ†ÙŠØ© Ø§Ù„Ù…ÙˆØ«ÙˆÙ‚Ø© Ù„ØªØ£Ø¬ÙŠØ± ÙˆØ´Ø±Ø§Ø¡ Ø§Ù„ÙÙ„Ù„ ÙˆØ§Ù„Ø´Ù‚Ù‚ ÙÙŠ Ø§Ù„Ù…ÙˆØ§Ù‚Ø¹ Ø§Ù„Ø§Ø³ØªØ±Ø§ØªÙŠØ¬ÙŠØ© Ø¨Ø£ÙØ¶Ù„ ØªØ³Ù‡ÙŠÙ„Ø§Øª Ø³Ø¯Ø§Ø¯ ÙˆØ¹Ø§Ø¦Ø¯ Ø§Ø³ØªØ«Ù…Ø§Ø±ÙŠ Ù…Ø¶Ù…ÙˆÙ† ÙˆÙ…Ø³ØªØ´Ø§Ø± Ø¹Ù‚Ø§Ø±ÙŠ Ù…ØªØ§Ø­ Ø¯Ø§Ø¦Ù…Ø§Ù‹.',
        ku: 'Ø´ÙˆÙ‚Û• ÛŒØ§Ù† Ú¤ÛŽÙ„Ø§ÛŒ Ø®Û•ÙˆÙ†Û•Ú©Ø§Ù†Øª Ù„ÛŽØ±Û• Ø¨Û•Ø¯Û•Ø³ØªØ¨Ù‡ÛŽÙ†Û• ÛŒØ§Ø³Ø§ÛŒÛŒ Ø¨Û• ÙÛ•Ø±Ù…ÛŒ! ðŸ¢ðŸ”‘ Ø¨Ø§Ø´ØªØ±ÛŒÙ† ÛŒØ§Ø±Ù…Û•ØªÛŒØ¯Û•Ø±ÛŒ ÛŒØ§Ø³Ø§ÛŒÛŒ Ø¨Û† Ú©Ú•ÛŒÙ†ÛŒ Ø®Ø§Ù†ÙˆÙˆ.',
        en: 'Find your absolute dream modern estate or luxury commercial space today with our elite property consultants. ðŸ¢ðŸ”‘ Unlocked premium villas in high-security compounds with flexible payments. Call us for secure deals.'
      },
      badge: { ar: 'Ø¹Ù‚Ø§Ø± Ù…ÙˆØ«ÙˆÙ‚ ðŸ¢', ku: 'Ø¹Û•Ù‚Ø§Ø±Ø§ØªÛŒ ÙÛ•Ø±Ù…ÛŒ ðŸ¢', en: 'Prime Properties ðŸ¢' },
      mediaUrl: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&auto=format&fit=crop&q=80'
    }
  ],
  salon: [
    {
      caption: {
        ar: 'Ø£Ù†Ø§Ù‚ØªÙƒ ÙˆØªØ³Ø±ÙŠØ­ØªÙƒ ØªÙ†Ø·Ù‚ Ø¨Ø¬Ø§Ø°Ø¨ÙŠØªÙƒ ÙˆØ«Ù‚ØªÙƒ! ðŸ’ˆðŸ’‡ Ø³ØªØ§ÙŠÙ„Ø§Øª Ø¹ØµØ±ÙŠØ© Ù„Ù‚Øµ ÙˆØªÙ‡Ø°ÙŠØ¨ Ø§Ù„Ù„Ø­Ù‰ ÙˆØ§Ù„Ø¹Ù†Ø§ÙŠØ© Ø§Ù„Ù…ØªÙƒØ§Ù…Ù„Ø© Ø¨Ø§Ù„Ø¨Ø´Ø±Ø© Ø¹Ù† Ø·Ø±ÙŠÙ‚ Ø§Ø³ØªØ®Ø¯Ø§Ù… Ù…Ø§Ø³ÙƒØ§Øª Ø§Ù„Ø·ÙŠÙ† ÙˆØ£Ø¬Ù‡Ø²Ø© Ø§Ù„Ø¨Ø®Ø§Ø± Ø§Ù„Ù…ØºØ°ÙŠØ© ÙˆØ§Ù„Ù…Ø¹Ø·Ø±Ø© Ù„ØªÙ†Ø¸ÙŠÙ Ù…ØªÙƒØ§Ù…Ù„ ÙˆØ¹Ù†Ø§ÙŠØ© Ù„Ø§ ØªØ¶Ø§Ù‡Ù‰ ØªÙ…Ù†Ø­Ùƒ Ø­Ø¶ÙˆØ±Ø§Ù‹ Ù…ØªÙ…ÙŠØ²Ø§Ù‹ ÙˆØ³Ø· Ø§Ù„Ø¬Ù…ÙŠØ¹.',
        ku: 'Ø´ÛŒÚ©ØªØ±ÛŒÙ† Ø³ØªØ§ÛŒÙ„ÛŒ ØªØ§Ø´ÛŒÙ†ÛŒ Ù‚Ú˜ Ùˆ Ú†Ø§Ú©Ú©Ø±Ø¯Ù†ÛŒ Ú•ÛŒØ´ Ù„ÛŽØ±Û• Ø¨Û• Ø¨Ø§Ø´ØªØ±ÛŒÙ† Ø¨Û•Ø³ØªÛ•Ø±! ðŸ’ˆðŸ’‡ Ú©Û•Ø´ÛŽÚ©ÛŒ Ø²Û†Ø± Ø¦Ø§Ø±Ø§Ù…ÛŒ Ù¾ÛŒØ§ÙˆØ§Ù† Ù„Û• Ù‡Û†ÚµÛŒ Ø³Ø§ÚµÛ†Ù†.',
        en: 'Sharp customized skin-fades, premium charcoal face treatments, and outstanding organic beard repair packages from the top barbers in town! ðŸ’ˆðŸ’‡ Relaxing chill beats and custom organic barista coffee for every guest.'
      },
      badge: { ar: 'Ù…Ø¸Ù‡Ø± Ø§Ù„Ø£Ù†Ø§Ù‚Ø© ðŸ’ˆ', ku: 'Ø³ØªØ§ÛŒÙ„ÛŒ Ø´Ø§Ù‡Ø§Ù†Û• ðŸ’ˆ', en: 'Master Barber style ðŸ’ˆ' },
      mediaUrl: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800&auto=format&fit=crop&q=80'
    }
  ],
  mobile_shop: [
    {
      caption: {
        ar: 'Ø§Ù‚ØªÙ†Ù Ø§Ù„ÙŠÙˆÙ… Ø£Ù‚ÙˆÙ‰ Ù‡ÙˆØ§ØªÙ Ø§Ù„Ø¬ÙŠÙ„ Ø§Ù„Ø®Ø§Ù…Ø³ ÙˆØ§Ù„Ø³Ù…Ø§Ø¹Ø§Øª Ø¨Ø£Ø³Ø¹Ø§Ø± Ø®Ø±Ø§ÙÙŠØ© ÙˆÙ…ÙƒÙÙˆÙ„Ø©! ðŸ“±ðŸ”¥ Ù…ØªØ¬Ø± Ø§Ù„Ø´Ø±Ø§Ø¡ Ø§Ù„Ù…Ø¹ØªÙ…Ø¯ ÙŠÙˆÙØ± Ù„Ùƒ Ø¶Ù…Ø§Ù† Ø­Ù‚ÙŠÙ‚ÙŠ Ù„Ù…Ø¯Ø© Ø³Ù†Ø© ÙƒØ§Ù…Ù„Ø© Ù…Ø¹ Ø´Ø§Ø­Ù† ÙˆØ¨Ø§ÙˆØ±Ø¨Ø§Ù†Ùƒ Ø³Ø±ÙŠØ¹ Ù‡Ø¯ÙŠØ© Ù…Ø¶Ù…ÙˆÙ†Ø© Ù„ÙƒÙ„ Ù‡Ø§ØªÙ ÙŠØªÙ… Ø´Ø±Ø§Ø¤Ù‡ Ø®Ù„Ø§Ù„ Ø§Ù„Ø£Ø³Ø¨ÙˆØ¹. Ø²Ø±Ù†Ø§ ÙˆØ§ÙƒØªØ´Ù Ù‡Ø¯Ø§ÙŠØ§ ÙˆÙ…Ø²Ø§ÙŠØ§ Ù…Ù…ØªØ§Ø²Ø©.',
        ku: 'Ù†ÙˆÛŽØªØ±ÛŒÙ† Ù…Û†Ø¨Ø§ÛŒÙ„ÛŒ Ø²ÛŒØ±Û•Ú© Ùˆ Ù‡ÛŽØ¯ÙÛ†Ù† Ø¨Ú©Ú•Û• Ø¨Û• Ø¨Ø§Ø´ØªØ±ÛŒÙ† Ú¯Ø±Û•Ù†ØªÛŒ ÙÛ•Ø±Ù…ÛŒ Ø³Ø§ÚµÛŽÚ©! ðŸ“±ðŸ”¥ Ø¯ÛŒØ§Ø±ÛŒ Ø¨Û•Ù†Ø±Ø® Ùˆ Ù¾Ø§ÙˆÛ•Ø±Ø¨Ø§Ù†Ú©ÛŒ Ø¨Û•Ù„Ø§Ø´ Ù„Û•Ú¯Û•Úµ Ú©Ú•ÛŒÙ†.',
        en: "Upgrade your handheld setups today with Basra's unmatched competitive pricing on official flagship mobile devices and robust laptop assets. ðŸ“±ðŸ”¥ Receive a free fast-charging high-capacity powerbank with any purchase today!"
      },
      badge: { ar: 'Ù‡Ø¯Ø§ÙŠØ§ Ù…Ù…ØªØ§Ø²Ø© ðŸ“±', ku: 'Ø¯ÛŒØ§Ø±ÛŒ Ù†Ø§ÛŒØ§Ø¨ ðŸ“±', en: 'Tech Upgrade ðŸ“±' },
      mediaUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&auto=format&fit=crop&q=80'
    }
  ]
};

/**
 * Dynamically picks a business from the CSV list and builds an elegant Social Media post tailored to its category 
 * with randomly customized comments, view count, reaction numbers, and time markers.
 */
export function generateLivePostFromCSV(gov: GovernorateCode): SocialPost {
  const govLabel = {
    all: { ar: 'Ø§Ù„Ø¹Ø±Ø§Ù‚', ku: 'Ø¹ÛŽØ±Ø§Ù‚', en: 'Iraq' },
    baghdad: { ar: 'Ø¨ØºØ¯Ø§Ø¯', ku: 'Ø¨Û•ØºØ¯Ø§Ø¯', en: 'Baghdad' },
    erbil: { ar: 'Ø¥Ø±Ø¨ÙŠÙ„', ku: 'Ù‡Û•ÙˆÙ„ÛŽØ±', en: 'Erbil' },
    basra: { ar: 'Ø§Ù„Ø¨ØµØ±Ø©', ku: 'Ø¨Û•Ø³Ø±Û•', en: 'Basra' },
    sulaymaniyah: { ar: 'Ø§Ù„Ø³Ù„ÙŠÙ…Ø§Ù†ÙŠØ©', ku: 'Ø³Ù„ÛŽÙ…Ø§Ù†ÛŒ', en: 'Sulaymaniyah' },
    najaf: { ar: 'Ø§Ù„Ù†Ø¬Ù', ku: 'Ù†Û•Ø¬Û•Ù', en: 'Najaf' },
    mosul: { ar: 'Ù†ÙŠÙ†ÙˆÙ‰', ku: 'Ù…ÙˆØ³Úµ', en: 'Nineveh' },
    karbala: { ar: 'ÙƒØ±Ø¨Ù„Ø§Ø¡ Ø§Ù„Ù…Ù‚Ø¯Ø³Ø©', ku: 'Ú©Û•Ø±Ø¨Û•Ù„Ø§', en: 'Karbala' },
    kirkuk: { ar: 'ÙƒØ±ÙƒÙˆÙƒ', ku: 'Ú©Û•Ø±Ú©ÙˆÚ©', en: 'Kirkuk' },
    anbar: { ar: 'Ø§Ù„Ø£Ù†Ø¨Ø§Ø±', ku: 'Ø¦Û•Ù†Ø¨Ø§Ø±', en: 'Anbar' },
    duhok: { ar: 'Ø¯Ù‡ÙˆÙƒ', ku: 'Ø¯Ù‡Û†Ú©', en: 'Dohuk' },
    babil: { ar: 'Ø¨Ø§Ø¨Ù„', ku: 'Ø¨Ø§Ø¨Ù„', en: 'Babil' },
    diyala: { ar: 'Ø¯ÙŠØ§Ù„Ù‰', ku: 'Ø¯ÛŒØ§Ù„Û•', en: 'Diyala' },
    wasit: { ar: 'ÙˆØ§Ø³Ø·', ku: 'ÙˆØ§Ø³Øª', en: 'Wasit' },
    saladin: { ar: 'ØµÙ„Ø§Ø­ Ø§Ù„Ø¯ÙŠÙ†', ku: 'Ø³Û•Ù„Ø§Ø­Û•Ø¯ÛŒÙ†', en: 'Saladin' },
    maysan: { ar: 'Ù…ÙŠØ³Ø§Ù†', ku: 'Ù…ÛŒØ³Ø§Ù†', en: 'Maysan' },
    dhiqar: { ar: 'Ø°ÙŠ Ù‚Ø§Ø±', ku: 'Ø²ÛŒ Ù‚Ø§Ø±', en: 'Dhi Qar' },
    muthanna: { ar: 'Ø§Ù„Ù…Ø«Ù†Ù‰', ku: 'Ù…ÙˆØ³Û•Ù†Ø§', en: 'Muthanna' },
    qadisiya: { ar: 'Ø§Ù„Ù‚Ø§Ø¯Ø³ÙŠØ©', ku: 'Ù‚Ø§Ø¯Ø³ÛŒÛ•', en: 'Qadisiya' },
    halabja: { ar: 'Ø­Ù„Ø¨Ø¬Ø© Ø§Ù„Ø´Ù‡ÙŠØ¯Ø©', ku: 'Ù‡Û•ÚµÛ•Ø¨Ø¬Û•', en: 'Halabja' }
  }[gov];

  // Pick a random master business
  const randomBizIdx = Math.floor(Math.random() * CSV_BASE_BUSINESSES.length);
  const baseBiz = CSV_BASE_BUSINESSES[randomBizIdx];

  // Pick static localized elements
  const templates = POST_TEMPLATES_BY_CATEGORY[baseBiz.category] || POST_TEMPLATES_BY_CATEGORY['restaurant'];
  const template = templates[Math.floor(Math.random() * templates.length)];

  // Pick a random varied image for this category
  const categoryImages = VARIED_IMAGES[baseBiz.category] || VARIED_IMAGES['restaurant'];
  const variedMediaUrl = categoryImages[randomBizIdx % categoryImages.length];

  // Randomized engagements
  const likes = Math.floor(Math.random() * 210) + 15;
  const commentsCount = Math.floor(Math.random() * 5) + 1;
  const shares = Math.floor(Math.random() * 45) + 3;
  const views = likes * (Math.floor(Math.random() * 5) + 6);

  // Believable comments
  const commentPool = [
    { id: 'ca', username: 'hasan_bagh', textAr: 'ÙˆØ§Ù„Ù„Ù‡ Ø´ØºÙ„ÙƒÙ… Ø±Ø§Ù‚ÙŠ ÙˆØªØ³ØªØ§Ù‡Ù„ÙˆÙ† ÙƒÙ„ Ø®ÙŠØ± â­', textKu: 'Ø¯Û•Ø³ØªØ§Ù† Ø®Û†Ø´ Ø¨ÛŽØª Ú©Ø§Ø±ÛŽÚ©ÛŒ Ø²Û†Ø± Ø¬ÙˆØ§Ù†Û•', textEn: 'Excellent service, highly recommended!' },
    { id: 'cb', username: 'sara_kurd', textAr: 'Ø¹Ø§Ø´Øª Ø§Ù„Ø£ÙŠØ§Ø¯ÙŠ Ø¯Ø§Ø¦Ù…Ø§Ù‹ Ù…ØªÙ…ÙŠØ²ÙŠÙ† ÙˆÙ…Ø¹Ø§Ù…Ù„Ø© Ø±Ø§Ù‚ÙŠØ©', textKu: 'Ø²ÙˆØ± Ø¬ÙˆØ§Ù†Ø© Ø¨Ø§Ø´ØªØ±ÛŒÙ†Ù† Ù‡Û•Ù…ÛŒØ´Û• Ø³Û•Ø±ÙƒÛ•ÙˆØªÙˆÙˆ Ø¨Ù†', textEn: 'Beautiful setup and lovely customer support!' },
    { id: 'cc', username: 'ali_iraqi', textAr: 'Ø²Ø±ØªÙ‡ Ø§Ù„Ø¨Ø§Ø±Ø­Ø© ÙˆÙ…Ø¹Ø§Ù…Ù„Ø© Ø±Ø§Ù‚ÙŠØ© ÙˆØ§Ù„Ø£Ø³Ø¹Ø§Ø± Ø¬Ø¯Ø§Ù‹ Ù…Ù†Ø§Ø³Ø¨Ø©', textKu: 'ØªØ§Ù‚ÛŒ Ù…Ø§Ù†ÛŒ ÙƒØ±Ø§ÙˆÛ• Ø²Û†Ø± ØªØ§ÛŒØ¨Û•Øª Ø¨ÙˆÙˆ', textEn: 'Will definitely visit with my family this week.' },
    { id: 'cd', username: 'dr_noor', textAr: 'Ø³Ø±Ø¹Ø© Ø¨Ø§Ù„ØªÙˆØµÙŠÙ„ ÙˆØ«Ù‚Ø© Ù…Ù…ØªØ§Ø²Ø© Ø±Ø¨ÙŠ ÙŠØ±Ø²Ù‚ÙƒÙ… ðŸ˜‡', textKu: 'Ø³Û•Ø±Ú©Û•ÙˆØªÙˆÙˆ Ø¨Ù† Ø®Ø²Ù…Û•ØªÚ¯ÙˆØ²Ø§Ø±ÛŒØªØ§Ù† Ø®ÛŽØ±Ø§ÛŒÛ• Ú†Ø§Ú©Û•', textEn: 'Superb! Legit and very smooth interaction.' }
  ];

  const selectedComments = [];
  for (let i = 0; i < commentsCount; i++) {
    const c = commentPool[(randomBizIdx + i) % commentPool.length];
    selectedComments.push({
      id: `c-gen-${Date.now()}-${i}`,
      username: c.username,
      text: c.textAr, // simple fallback
      time: '2h'
    });
  }

  const timesAr = ['Ù…Ù†Ø° Ø³Ø§Ø¹Ø©', 'Ù…Ù†Ø° Ù£ Ø³Ø§Ø¹Ø§Øª', 'Ù…Ù†Ø° Ù§ Ø³Ø§Ø¹Ø§Øª', 'Ù…Ù†Ø° ÙŠÙˆÙ…', 'Ù…Ù†Ø° ÙŠÙˆÙ…ÙŠÙ†'];
  const timesKu = ['Ù¡ Ú©Ø§ØªÚ˜Ù…ÛŽØ± Ù¾ÛŽØ´ Ø¦ÛŽØ³ØªØ§', 'Ù£ Ú©Ø§ØªÚ˜Ù…ÛŽØ± Ù¾ÛŽØ´ Ø¦ÛŽØ³ØªØ§', 'Ù§ Ú©Ø§ØªÚ˜Ù…ÛŽØ± Ù¾ÛŽØ´ Ø¦ÛŽØ³ØªØ§', 'Ø¯ÙˆÛŽÙ†ÛŽ', 'Ù¢ Ú•Û†Ú˜ Ù¾ÛŽØ´ Ø¦ÛŽØ³ØªØ§'];
  const timesEn = ['1 hour ago', '3 hours ago', '7 hours ago', 'yesterday', '2 days ago'];
  const timeIdx = Math.floor(Math.random() * timesAr.length);

  // Address and contact info inclusion matching the business
  const contactLineAr = baseBiz.phone 
    ? `\n\nðŸ“ž Ù„Ù„ØªÙˆØ§ØµÙ„ ÙˆØ§Ù„Ø§Ø³ØªÙØ³Ø§Ø±: ${baseBiz.phone} â€¢ Ø§Ù„Ù…ÙˆÙ‚Ø¹: ${govLabel.ar}ØŒ ${baseBiz.name.ar}`
    : `\n\nðŸ“ Ø§Ù„Ù…ÙˆÙ‚Ø¹: ${govLabel.ar}ØŒ ${baseBiz.name.ar}`;

  const contactLineKu = baseBiz.phone 
    ? `\n\nðŸ“ž Ø¨Û† Ù¾Û•ÛŒÙˆÛ•Ù†Ø¯ÛŒ Ùˆ Ø²Ø§Ù†ÛŒØ§Ø±ÛŒ: ${baseBiz.phone} â€¢ Ù†Ø§ÙˆÙ†ÛŒØ´Ø§Ù†: ${govLabel.ku}`
    : `\n\nðŸ“ Ù†Ø§ÙˆÙ†ÛŒØ´Ø§Ù†: ${govLabel.ku}`;

  const contactLineEn = baseBiz.phone 
    ? `\n\nðŸ“ž Hotline & Booking: ${baseBiz.phone} â€¢ Location: ${govLabel.en}`
    : `\n\nðŸ“ Address: ${govLabel.en}`;

  return {
    id: `csv-post-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    businessId: `csv-biz-${randomBizIdx}`,
    businessName: `${baseBiz.name.ar} - ${govLabel?.ar || 'Ø§Ù„Ø¹Ø±Ø§Ù‚'}`,
    businessAvatar: BUSINESS_AVATARS[randomBizIdx % BUSINESS_AVATARS.length],
    category: baseBiz.category,
    governorate: gov,
    mediaUrl: variedMediaUrl,
    caption: {
      ar: template.caption.ar + contactLineAr,
      ku: template.caption.ku + contactLineKu,
      en: template.caption.en + contactLineEn
    },
    likes,
    commentsCount,
    shares,
    views,
    timeAgo: {
      ar: timesAr[timeIdx],
      ku: timesKu[timeIdx],
      en: timesEn[timeIdx]
    },
    comments: selectedComments,
    likedByUser: false,
    savedByUser: false,
    promotionBadge: template.badge
  };
}
