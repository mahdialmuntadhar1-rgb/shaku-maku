import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Compass, Flame, Map, PlusCircle, BookOpen, Search, X, 
  Sparkles, Heart, Star, ChevronLeft, ChevronRight, CheckCircle2, Play, Lock,
  ChevronDown, MapPin, Coffee, MessageCircle, Share2, Store
} from 'lucide-react';
import { Language, GovernorateCode, Business, SocialPost, UserProfile, HeroSlide } from './types';
import { CATEGORIES, GOVERNORATES, HERO_SLIDES } from './data';
import { LANGUAGE_OPTIONS, TRANSLATIONS } from './i18n/translations';
import { useLanguage } from './i18n/LanguageProvider';
import { authApi, businessesApi, postsApi, heroSlidesApi } from './api';

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
  const compact = raw.replace(/[\s_\-Ã˜Å’]+/g, '');

  const map: Record<string, GovernorateCode> = {
    all: 'all',
    iraq: 'all',
    'Ã˜Â§Ã™â€žÃ˜Â¹Ã˜Â±Ã˜Â§Ã™â€š': 'all',
    'Ã˜Â¹Ã›Å½Ã˜Â±Ã˜Â§Ã™â€š': 'all',
    baghdad: 'baghdad',
    'Ã˜Â¨Ã˜ÂºÃ˜Â¯Ã˜Â§Ã˜Â¯': 'baghdad',
    erbil: 'erbil',
    'Ã˜Â§Ã˜Â±Ã˜Â¨Ã™Å Ã™â€ž': 'erbil',
    'Ã˜Â£Ã˜Â±Ã˜Â¨Ã™Å Ã™â€ž': 'erbil',
    'Ã™â€¡Ã›â€¢Ã™Ë†Ã™â€žÃ›Å½Ã˜Â±': 'erbil',
    basra: 'basra',
    'Ã˜Â§Ã™â€žÃ˜Â¨Ã˜ÂµÃ˜Â±Ã˜Â©': 'basra',
    'Ã˜Â¨Ã›â€¢Ã˜Â³Ã˜Â±Ã›â€¢': 'basra',
    sulaymaniyah: 'sulaymaniyah',
    sulaymania: 'sulaymaniyah',
    slemani: 'sulaymaniyah',
    'Ã˜Â§Ã™â€žÃ˜Â³Ã™â€žÃ™Å Ã™â€¦Ã˜Â§Ã™â€ Ã™Å Ã˜Â©': 'sulaymaniyah',
    'Ã˜Â³Ã™â€žÃ›Å½Ã™â€¦Ã˜Â§Ã™â€ Ã›Å’': 'sulaymaniyah',
    mosul: 'mosul',
    mousl: 'mosul',
    mousul: 'mosul',
    nineveh: 'mosul',
    ninewa: 'mosul',
    ninawa: 'mosul',
    nainawa: 'mosul',
    niniveh: 'mosul',
    neneveh: 'mosul',
    'Ã™â€ Ã™Å Ã™â€ Ã™Ë†Ã™â€°': 'mosul',
    'Ã™â€ Ã™Å Ã™â€ Ã™Ë†Ã™Å ': 'mosul',
    'Ã˜Â§Ã™â€žÃ™â€¦Ã™Ë†Ã˜ÂµÃ™â€ž': 'mosul',
    najaf: 'najaf',
    'Ã˜Â§Ã™â€žÃ™â€ Ã˜Â¬Ã™Â': 'najaf',
    karbala: 'karbala',
    'Ã™Æ’Ã˜Â±Ã˜Â¨Ã™â€žÃ˜Â§Ã˜Â¡': 'karbala',
    kirkuk: 'kirkuk',
    'Ã™Æ’Ã˜Â±Ã™Æ’Ã™Ë†Ã™Æ’': 'kirkuk',
    anbar: 'anbar',
    'Ã˜Â§Ã™â€žÃ˜Â£Ã™â€ Ã˜Â¨Ã˜Â§Ã˜Â±': 'anbar',
    duhok: 'duhok',
    'Ã˜Â¯Ã™â€¡Ã™Ë†Ã™Æ’': 'duhok',
    'Ã˜Â¯Ã™â€¡Ã™Ë†ÃšÂ©': 'duhok',
    babil: 'babil',
    babylon: 'babil',
    'Ã˜Â¨Ã˜Â§Ã˜Â¨Ã™â€ž': 'babil',
    diyala: 'diyala',
    'Ã˜Â¯Ã™Å Ã˜Â§Ã™â€žÃ™â€°': 'diyala',
    wasit: 'wasit',
    'Ã™Ë†Ã˜Â§Ã˜Â³Ã˜Â·': 'wasit',
    saladin: 'saladin',
    salahaddin: 'saladin',
    salahaldin: 'saladin',
    'Ã˜ÂµÃ™â€žÃ˜Â§Ã˜Â­Ã˜Â§Ã™â€žÃ˜Â¯Ã™Å Ã™â€ ': 'saladin',
    maysan: 'maysan',
    'Ã™â€¦Ã™Å Ã˜Â³Ã˜Â§Ã™â€ ': 'maysan',
    dhiqar: 'dhiqar',
    'Ã˜Â°Ã™Å Ã™â€šÃ˜Â§Ã˜Â±': 'dhiqar',
    'Ã˜Â°Ã™Å _Ã™â€šÃ˜Â§Ã˜Â±': 'dhiqar',
    muthanna: 'muthanna',
    'Ã˜Â§Ã™â€žÃ™â€¦Ã˜Â«Ã™â€ Ã™â€°': 'muthanna',
    qadisiya: 'qadisiya',
    qadisiyah: 'qadisiya',
    'Ã˜Â§Ã™â€žÃ™â€šÃ˜Â§Ã˜Â¯Ã˜Â³Ã™Å Ã˜Â©': 'qadisiya',
    halabja: 'halabja',
    'Ã˜Â­Ã™â€žÃ˜Â¨Ã˜Â¬Ã˜Â©': 'halabja',
  };

  if (map[compact]) return map[compact];

  for (const gov of GOVERNORATES) {
    const codeKey = gov.code.toLowerCase().replace(/[\s_\-Ã˜Å’]+/g, '');
    const englishKey = gov.englishLabel.toLowerCase().replace(/[\s_\-Ã˜Å’]+/g, '');
    const enKey = gov.name.en.toLowerCase().replace(/[\s_\-Ã˜Å’]+/g, '');
    const arKey = gov.name.ar.toLowerCase().replace(/[\s_\-Ã˜Å’]+/g, '');
    const kuKey = gov.name.ku.toLowerCase().replace(/[\s_\-Ã˜Å’]+/g, '');
    if (compact === codeKey || compact === englishKey || compact === enKey || compact === arKey || compact === kuKey) {
      return gov.code;
    }
  }

  const administrativeWordsRemoved = compact
    .replace(/governorate/g, '')
    .replace(/province/g, '')
    .replace(/Ã™â€¦Ã˜Â­Ã˜Â§Ã™ÂÃ˜Â¸Ã˜Â©/g, '')
    .replace(/Ã˜Â§Ã™â€žÃ™â€¦Ã˜Â­Ã˜Â§Ã™ÂÃ˜Â¸Ã˜Â©/g, '')
    .replace(/Ã™Â¾Ã˜Â§Ã˜Â±Ã›Å½Ã˜Â²ÃšÂ¯Ã˜Â§Ã›Å’/g, '')
    .replace(/Ã™Â¾Ã˜Â§Ã˜Â±Ã›Å½Ã˜Â²ÃšÂ¯Ã˜Â§/g, '');

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
    .replace(/[\s\-_Ã˜Å’.,()\[\]{}]+/g, '')
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

  const compact = raw.toLowerCase().replace(/[\s_\-&/Ã˜Å’]+/g, '');
  const byId = CATEGORIES.find((cat) => cat.id.toLowerCase() === compact || cat.id.toLowerCase() === raw.toLowerCase());
  if (byId) return byId.id;

  const byName = CATEGORIES.find((cat) => {
    const en = cat.name.en.toLowerCase().replace(/[\s_\-&/Ã˜Å’]+/g, '');
    const ar = cat.name.ar.toLowerCase().replace(/[\s_\-&/Ã˜Å’]+/g, '');
    const ku = cat.name.ku.toLowerCase().replace(/[\s_\-&/Ã˜Å’]+/g, '');
    return compact === en || compact === ar || compact === ku;
  });
  if (byName) return byName.id;

  const map: Record<string, string> = {
    restaurant: 'restaurant',
    restaurants: 'restaurant',
    food: 'restaurant',
    'Ã™â€¦Ã˜Â·Ã˜Â¹Ã™â€¦': 'restaurant',
    'Ã™â€¦Ã˜Â·Ã˜Â§Ã˜Â¹Ã™â€¦': 'restaurant',
    'Ã˜Â®Ã™Ë†Ã˜Â§Ã˜Â±Ã˜Â¯Ã™â€ ÃšÂ¯Ã™â€¡': 'restaurant',
    'Ãšâ€ Ã›Å½Ã˜Â´Ã˜ÂªÃ˜Â®Ã˜Â§Ã™â€ Ã™â€¡': 'restaurant',
    'restaurants & cafes': 'restaurant',
    cafe: 'cafe_bakery',
    'cafÃƒÂ©': 'cafe_bakery',
    bakery: 'cafe_bakery',
    'Ã™Æ’Ã˜Â§Ã™ÂÃ™Å Ã™â€¡': 'cafe_bakery',
    'Ã™â€¦Ã˜Â®Ã˜Â¨Ã˜Â²': 'cafe_bakery',
    'ÃšÂ©Ã˜Â§Ã™ÂÃ›Å½': 'cafe_bakery',
    'Ã™â€ Ã˜Â§Ã™â€ Ã›â€¢Ã™Ë†Ã˜Â§Ã˜Â®Ã˜Â§Ã™â€ Ã™â€¡': 'cafe_bakery',
    'cafÃƒÂ©s & bakeries': 'cafe_bakery',
    'cafes & bakeries': 'cafe_bakery',
    supermarket: 'supermarket',
    supermarkets: 'supermarket',
    market: 'supermarket',
    shopping: 'mall',
    mall: 'mall',
    'Ã™â€¦Ã™Ë†Ã™â€ž': 'mall',
    'malls & shopping': 'mall',
    pharmacy: 'pharmacy',
    'Ã˜ÂµÃ™Å Ã˜Â¯Ã™â€žÃ™Å Ã˜Â©': 'pharmacy',
    'Ã˜Â¯Ã›â€¢Ã˜Â±Ã™â€¦Ã˜Â§Ã™â€ Ã˜Â®Ã˜Â§Ã™â€ Ã™â€¡': 'pharmacy',
    pharmacies: 'pharmacy',
    hospital: 'hospital',
    'Ã™â€¦Ã˜Â³Ã˜ÂªÃ˜Â´Ã™ÂÃ™â€°': 'hospital',
    'Ã™â€ Ã›â€¢Ã˜Â®Ã›â€ Ã˜Â´Ã˜Â®Ã˜Â§Ã™â€ Ã™â€¡': 'hospital',
    hospitals: 'hospital',
    clinic: 'clinic',
    'Ã˜Â¹Ã™Å Ã˜Â§Ã˜Â¯Ã˜Â©': 'clinic',
    'ÃšÂ©Ã™â€žÃ›Å’Ã™â€ Ã›Å’ÃšÂ©': 'clinic',
    clinics: 'clinic',
    doctor: 'doctor',
    'Ã˜Â·Ã˜Â¨Ã™Å Ã˜Â¨': 'doctor',
    'Ã˜Â¯ÃšÂ©Ã˜ÂªÃ›â€ Ã˜Â±': 'doctor',
    doctors: 'doctor',
    dentist: 'dentist',
    'Ã˜Â·Ã˜Â¨Ã™Å Ã˜Â¨Ã˜Â§Ã˜Â³Ã™â€ Ã˜Â§Ã™â€ ': 'dentist',
    'Ã™Â¾Ã˜Â²Ã›Å’Ã˜Â´ÃšÂ©Ã›Å’Ã˜Â¯Ã˜Â¯Ã˜Â§Ã™â€ ': 'dentist',
    dentists: 'dentist',
    salon: 'salon',
    'Ã˜ÂªÃ˜Â¬Ã™â€¦Ã™Å Ã™â€ž': 'salon',
    'Ã˜Â³Ã˜Â§ÃšÂµÃ›â€ Ã™â€ ': 'salon',
    'beauty salons': 'salon',
    'beauty & salons': 'salon',
    gym: 'gym',
    'Ã™â€ Ã˜Â§Ã˜Â¯Ã™Å ': 'gym',
    'Ã™Ë†Ã›â€¢Ã˜Â±Ã˜Â²Ã˜Â´': 'gym',
    'spas & wellness': 'spa',
    'fitness & gyms': 'gym',
    'gyms & fitness': 'gym',
    hotel: 'hotel',
    'Ã™ÂÃ™â€ Ã˜Â¯Ã™â€š': 'hotel',
    'Ã™â€¡Ã›â€ Ã˜ÂªÃ›Å½Ã™â€ž': 'hotel',
    'hotels & hospitality': 'hotel',
    'hotels & resorts': 'hotel',
    'travel agencies': 'travel_agency',
    education: 'university',
    school: 'university',
    university: 'university',
    'Ã˜Â¬Ã˜Â§Ã™â€¦Ã˜Â¹Ã˜Â©': 'university',
    'Ã˜Â²Ã˜Â§Ã™â€ ÃšÂ©Ã›â€ ': 'university',
    universities: 'university',
    electronics: 'mobile_shop',
    mobile: 'mobile_shop',
    'Ã™â€¦Ã™Ë†Ã˜Â¨Ã˜Â§Ã™Å Ã™â€ž': 'mobile_shop',
    'Ã™â€¦Ã›â€ Ã˜Â¨Ã˜Â§Ã›Å’Ã™â€ž': 'mobile_shop',
    services: 'other',
    service: 'other',
    'Ã˜Â®Ã˜Â¯Ã™â€¦Ã˜Â©': 'other',
    'Ã˜Â®Ã˜Â¯Ã™â€¦Ã˜Â§Ã˜Âª': 'other',
    other: 'other',
    'Ã˜Â§Ã˜Â®Ã˜Â±Ã™â€°': 'other',
    'Ã™â€¡Ã›Å’Ã˜ÂªÃ˜Â±': 'other',
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
    compactMap[k.toLowerCase().replace(/[\s_\-&/Ã˜Å’]+/g, '')] = v;
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
  const { currentLang, setLanguage, hasSavedLanguage } = useLanguage();
  const [user, setUser] = useState<any>(authApi.getCurrentUser());
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  
  const [showLanguageGate, setShowLanguageGate] = useState<boolean>(() => !hasSavedLanguage);
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

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('token') || params.get('resetToken')) {
      setAuthModalOpen(true);
    }
  }, []);

  const t = TRANSLATIONS[currentLang];
  const isRtl = currentLang === 'ar' || currentLang === 'ku';
  const liveDataError = businessesLoadError || postsLoadError;
  const verifiedUserForUi = user
    ? { ...user, role: userProfile?.role || 'user', is_admin: isAdmin ? 1 : 0 }
    : null;

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
    setIsAdmin(false);
    setUserProfile((prev) => ({
      uid: String(user.id || prev?.uid || localEmail),
      displayName: user.name || user.email?.split('@')[0] || 'User',
      photoURL: '',
      email: user.email,
      createdAt: prev?.createdAt || new Date().toISOString(),
      role: 'user',
      onboarded: true,
      businessId: null
    }));
    authApi.getMe()
      .then((me) => {
        const role = ((me.role as any) || 'user');
        const backendIsAdmin = role === 'admin' || Number((me as any).is_admin || 0) === 1;

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
        setIsAdmin(backendIsAdmin);
      })
      .catch((error) => {
        console.warn('Could not verify authenticated profile with backend:', error);
        setUserProfile(null);
        setIsAdmin(false);
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

  // Load hero slides from backend database.
  // Fallback stays local so the app never goes blank if API is temporarily unavailable.
  useEffect(() => {
    let cancelled = false;

    const fetchHeroSlides = async () => {
      try {
        const slides = await heroSlidesApi.list();

        if (cancelled) return;

        if (Array.isArray(slides) && slides.length > 0) {
          setHeroSlides(slides as HeroSlide[]);
          localStorage.setItem('hero_slides', JSON.stringify(slides));
        }
      } catch (error) {
        console.warn('Could not load hero slides from database; using local fallback:', error);
      }
    };

    fetchHeroSlides();

    return () => {
      cancelled = true;
    };
  }, []);

  // Sync hero slide edits from Hero component to backend database.
  const syncHeroSlidesToDatabase = (previousSlides: HeroSlide[], nextSlides: HeroSlide[]) => {
    const previousById = new globalThis.Map(previousSlides.map((slide) => [slide.id, slide]));
    const nextById = new globalThis.Map(nextSlides.map((slide) => [slide.id, slide]));

    void (async () => {
      try {
        for (let index = 0; index < nextSlides.length; index += 1) {
          const slide = nextSlides[index];
          const previous = previousById.get(slide.id);

          const payload = {
            id: slide.id,
            image: slide.image,
            slogan: slide.slogan,
            badge: slide.badge,
            governorate: slide.governorate || 'all',
            category: slide.category || 'restaurant',
            sortOrder: index + 1,
            isActive: true
          };

          if (!previous) {
            await heroSlidesApi.create(payload);
            continue;
          }

          if (JSON.stringify(previous) !== JSON.stringify(slide)) {
            try {
              await heroSlidesApi.update(slide.id, payload);
            } catch (error: any) {
              if (error?.response?.status === 404) {
                await heroSlidesApi.create(payload);
              } else {
                throw error;
              }
            }
          }
        }

        for (const previous of previousSlides) {
          if (!nextById.has(previous.id)) {
            await heroSlidesApi.delete(previous.id);
          }
        }
      } catch (error: any) {
        console.error('Could not sync hero slides to database:', error);

        const status = error?.response?.status ? `HTTP ${error.response.status}` : 'NETWORK/UNKNOWN';
        const backendMessage =
          error?.response?.data?.error ||
          error?.response?.data?.message ||
          error?.message ||
          'Unknown backend error';

        window.alert(
          `Could not save hero changes. Please try again.\n\nReason: ${status} - ${backendMessage}\n\nFix: log out, log in again with an admin account, then try saving the hero again.`
        );
        setHeroSlides(previousSlides);
      }
    })();
  };

  const setHeroSlidesAndSync: React.Dispatch<React.SetStateAction<HeroSlide[]>> = (action) => {
    setHeroSlides((previousSlides) => {
      const nextSlides = typeof action === 'function'
        ? (action as (prevState: HeroSlide[]) => HeroSlide[])(previousSlides)
        : action;

      syncHeroSlidesToDatabase(previousSlides, nextSlides);
      return nextSlides;
    });
  };
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
        email: biz.email || '',
        website: biz.website || '',
        whatsapp: biz.whatsapp || '',
        facebook: biz.facebook || '',
        instagram: biz.instagram || '',
        source_url: biz.source_url || '',
        source_name: biz.source_name || '',
        status: biz.status || '',
        verification_status: biz.verification_status || '',
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

        // Progressive loading:
        // Show the first batch fast, then continue loading the rest quietly.
        const limit = 50;
        const maxPages = 100;
        const allRows: any[] = [];
        const seenIds = new Set<string>();

        const publishBusinesses = () => {
          if (cancelled) return;

          const transformedBusinesses = allRows.map(transformBusiness);
          const dedupedBusinesses = dedupeBusinessesByIdentity(transformedBusinesses);

          setBusinesses(dedupedBusinesses);
          setBusinessesLoadError(null);

          try {
            localStorage.setItem('cached_businesses_v1', JSON.stringify(dedupedBusinesses));
          } catch (cacheError) {
            console.warn('[ShakuMaku] business cache skipped:', cacheError);
          }
        };

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

          // First page appears quickly.
          if (page === 1) {
            publishBusinesses();
            setBusinessesLoading(false);
          }

          // Update visible list during background loading.
          if (page % 5 === 0) {
            publishBusinesses();
          }
        }

        if (cancelled) return;

        publishBusinesses();
        console.log("[ShakuMaku] all businesses loaded progressively:", allRows.length);
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
        const response = await postsApi.list({ limit: 120 });
        const transformedPosts: SocialPost[] = (response || []).map((post: any) => ({
          id: post.id,
          businessId: post.business_id,
          businessName: post.business_name_ar || post.business_name_en || '',
          businessAvatar: post.business_avatar || '',
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

  const handleAddLiveBusiness = async (newBiz: Omit<Business, 'rating' | 'reviewsCount' | 'likes' | 'saves'>) => {
    const response = await businessesApi.create({
      name_ar: newBiz.name.ar,
      name_ku: newBiz.name.ku,
      name_en: newBiz.name.en,
      description_ar: newBiz.description.ar,
      description_ku: newBiz.description.ku,
      description_en: newBiz.description.en,
      address_ar: newBiz.address.ar,
      address_ku: newBiz.address.ku,
      address_en: newBiz.address.en,
      phone_number: newBiz.phoneNumber,
      category: newBiz.category,
      governorate: newBiz.governorate,
      image: newBiz.image,
      avatar: newBiz.avatar,
      is_verified: newBiz.isVerified ? 1 : 0,
      map_coords_x: newBiz.mapCoords.x,
      map_coords_y: newBiz.mapCoords.y,
      email: newBiz.email,
      website: newBiz.website,
      whatsapp: newBiz.whatsapp,
      facebook: newBiz.facebook,
      instagram: newBiz.instagram,
      source_url: newBiz.source_url,
      source_name: newBiz.source_name,
      status: newBiz.status || 'approved',
      verification_status: newBiz.verification_status || 'unverified'
    });
    const row = (response as any)?.data || response;
    setBusinesses((prev) => [
      {
        ...newBiz,
        id: String(row?.id || newBiz.id),
        rating: Number(row?.rating || 0),
        reviewsCount: Number(row?.reviews_count || 0),
        likes: Number(row?.likes || row?.like_count || 0),
        saves: Number(row?.saves || row?.save_count || 0)
      },
      ...prev
    ]);
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
    setLanguage(lang);
    setShowLanguageGate(false);
  };

  if (showLanguageGate) {
    return (
      <div className="min-h-screen bg-[#1A1A1A] flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-[#111] border border-luxury-gold/30 rounded-3xl p-6 space-y-4 text-center">
          <h2 className="text-white font-black text-xl">{t.languageGateTitle}</h2>
          <p className="text-zinc-400 text-sm">{t.languageGateSubtitle}</p>
          {LANGUAGE_OPTIONS.map((language) => (
            <button
              key={language.code}
              onClick={() => chooseLanguage(language.code)}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-luxury-teal to-luxury-gold text-white font-black cursor-pointer"
              dir={language.dir}
              lang={language.code}
            >
              {language.label}
            </button>
          ))}
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
          setLanguage(lang);
        }}
        selectedGov={selectedGov}
        onChangeGov={(gov) => {
          setSelectedGov(gov);
          // Auto scroll to discovery catalog on change
          setActiveTab('discover');
        }}
        user={verifiedUserForUi}
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
          setSlides={setHeroSlidesAndSync}
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
              <span>
                {t.selectGovernorate}
              </span>
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
                <ChevronDown className={'w-4 h-4 text-luxury-gold transition-transform duration-300 ' + (govDropdownOpen ? 'rotate-180' : '')} />
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
                      className={
                        'text-left px-2.5 py-1.5 text-[11px] rounded-lg flex items-center justify-between transition-all cursor-pointer ' +
                        (selectedGov === gov.code
                          ? 'bg-gradient-to-r from-luxury-teal to-luxury-gold/85 text-white font-extrabold shadow'
                          : 'text-zinc-300 hover:bg-white/5 font-semibold')
                      }
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
              <span>
                🔎 {t.filterByCategory}
              </span>
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
                    {selectedCategory ? CATEGORIES.find(c => c.id === selectedCategory)?.icon || '🏷️' : '🏷️'}
                  </span>
                  <span>
                    {selectedCategory
                      ? CATEGORIES.find(c => c.id === selectedCategory)?.name[currentLang]
                      : t.allCategories}
                  </span>
                </div>
                <ChevronDown className={'w-4 h-4 text-luxury-gold transition-transform duration-300 ' + (categoryDropdownOpen ? 'rotate-180' : '')} />
              </button>

              {categoryDropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-1.5 bg-[#121215] border border-luxury-gold/20 rounded-xl shadow-2xl p-1 z-50 grid grid-cols-2 gap-1 animate-fade-in max-h-[220px] overflow-y-auto custom-scrollbar font-sans">
                  <button
                    onClick={() => {
                      setSelectedCategory(null);
                      setCategoryDropdownOpen(false);
                      setActiveTab('discover');
                    }}
                    className={
                      'text-left px-2.5 py-1.5 text-[11px] rounded-lg flex items-center justify-between transition-all cursor-pointer ' +
                      (selectedCategory === null
                        ? 'bg-gradient-to-r from-luxury-teal to-luxury-gold/85 text-white font-extrabold shadow'
                        : 'text-zinc-300 hover:bg-white/5 font-semibold')
                    }
                  >
                    <span>
                      🏷️ {t.allCategories}
                    </span>
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
                      className={
                        'text-left px-2.5 py-1.5 text-[11px] rounded-lg flex items-center justify-between transition-all cursor-pointer ' +
                        (selectedCategory === cat.id
                          ? 'bg-gradient-to-r from-luxury-teal to-luxury-gold/85 text-white font-extrabold shadow'
                          : 'text-zinc-300 hover:bg-white/5 font-semibold')
                      }
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

        {/* Visual Dual Entry Cards: Chaykhana + Shko Maku */}
        <div className="mt-4 mb-6 max-w-5xl mx-auto px-1.5 sm:px-3" dir={currentLang === 'en' ? 'ltr' : 'rtl'}>
          <div className="grid grid-cols-2 gap-2.5 sm:gap-5">
            {/* Chaykhana Social Card */}
            <button
              type="button"
              onClick={() => {
                setActiveTab('feed');
                const catElem = document.getElementById('discovery-catalog-section');
                if (catElem) catElem.scrollIntoView({ behavior: 'smooth' });
              }}
              className={
                'group relative min-h-[270px] overflow-hidden rounded-[2.25rem] border p-6 text-center transition-all duration-300 hover:scale-[1.015] active:scale-[0.985] ' +
                (activeTab === 'feed'
                  ? 'border-rose-300/90 bg-[#2a1118] shadow-[0_0_42px_rgba(244,63,94,0.38)]'
                  : 'border-rose-300/35 bg-[#1a0d12]/95 shadow-[0_0_28px_rgba(244,63,94,0.18)] hover:border-rose-300/80')
              }
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(244,63,94,0.32),transparent_38%),radial-gradient(circle_at_bottom_right,rgba(251,113,133,0.22),transparent_42%)]" />
              <div className="relative z-10 flex h-full flex-col items-center justify-between gap-2 sm:gap-4">
                <div>
                  <h3 className="text-lg xs:text-xl sm:text-5xl font-black text-rose-100 leading-tight [font-family:Tahoma,Arial,sans-serif]">
                    {t.chaykhana}
                  </h3>
                  <p className="mt-1 text-[11px] sm:text-lg font-bold text-rose-100/75 [font-family:Tahoma,Arial,sans-serif]">
                    {t.chaykhanaSub}
                  </p>
                </div>

                <div className="relative flex items-center justify-center">
                  <div className="absolute h-12 w-12 sm:h-24 sm:w-24 rounded-full bg-rose-400/20 blur-2xl" />
                  <Coffee className="relative h-20 w-20 text-rose-100 drop-shadow-[0_0_18px_rgba(255,190,190,0.5)]" />
                </div>

                <div className="flex items-center justify-center gap-3">
                  <span className="rounded-2xl bg-white/10 p-3 text-rose-100"><MessageCircle className="h-5 w-5" /></span>
                  <span className="rounded-2xl bg-white/10 p-3 text-rose-100"><Heart className="h-5 w-5" /></span>
                  <span className="rounded-2xl bg-white/10 p-3 text-rose-100"><Share2 className="h-5 w-5" /></span>
                </div>

                <div className="w-full rounded-full border border-rose-200/45 px-2 py-2 sm:px-5 sm:py-3 text-[11px] sm:text-sm font-black text-rose-50 [font-family:Tahoma,Arial,sans-serif]">
                  {t.enter}
                </div>
              </div>
            </button>

            {/* Shko Maku Business Card */}
            <button
              type="button"
              onClick={() => {
                setActiveTab('discover');
                const catElem = document.getElementById('discovery-catalog-section');
                if (catElem) catElem.scrollIntoView({ behavior: 'smooth' });
              }}
              className={
                'group relative min-h-[270px] overflow-hidden rounded-[2.25rem] border p-6 text-center transition-all duration-300 hover:scale-[1.015] active:scale-[0.985] ' +
                (activeTab === 'discover'
                  ? 'border-cyan-200/90 bg-[#0b2529] shadow-[0_0_42px_rgba(34,211,238,0.38)]'
                  : 'border-cyan-200/35 bg-[#0b171a]/95 shadow-[0_0_28px_rgba(34,211,238,0.18)] hover:border-cyan-200/80')
              }
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.30),transparent_38%),radial-gradient(circle_at_bottom_right,rgba(20,184,166,0.22),transparent_42%)]" />
              <div className="relative z-10 flex h-full flex-col items-center justify-between gap-2 sm:gap-4">
                <div>
                  <h3 className="text-lg xs:text-xl sm:text-5xl font-black text-cyan-100 leading-tight [font-family:Tahoma,Arial,sans-serif]">
                    {t.appName}
                  </h3>
                  <p className="mt-1 text-[11px] sm:text-lg font-bold text-cyan-100/75 [font-family:Tahoma,Arial,sans-serif]">
                    {t.businessDirectory}
                  </p>
                </div>

                <div className="relative flex items-center justify-center">
                  <div className="absolute h-12 w-12 sm:h-24 sm:w-24 rounded-full bg-cyan-300/20 blur-2xl" />
                  <div className="relative grid grid-cols-2 gap-3 text-cyan-100">
                    <Search className="h-11 w-11" />
                    <Store className="h-11 w-11" />
                    <MapPin className="h-11 w-11" />
                    <Sparkles className="h-11 w-11" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-1 sm:gap-2 w-full text-[9px] sm:text-sm font-black [font-family:Tahoma,Arial,sans-serif]">
                  <span className="rounded-full border border-cyan-100/25 bg-white/10 px-1.5 py-1 sm:px-3 sm:py-2 text-cyan-50">
                    {t.cafes}
                  </span>
                  <span className="rounded-full border border-cyan-100/25 bg-white/10 px-1.5 py-1 sm:px-3 sm:py-2 text-cyan-50">
                    {t.restaurants}
                  </span>
                  <span className="rounded-full border border-cyan-100/25 bg-white/10 px-1.5 py-1 sm:px-3 sm:py-2 text-cyan-50">
                    {t.doctors}
                  </span>
                  <span className="rounded-full border border-cyan-100/25 bg-white/10 px-1.5 py-1 sm:px-3 sm:py-2 text-cyan-50">
                    {t.more}
                  </span>
                </div>

                <div className="w-full rounded-full border border-cyan-100/45 px-2 py-2 sm:px-5 sm:py-3 text-[11px] sm:text-sm font-black text-cyan-50 [font-family:Tahoma,Arial,sans-serif]">
                  {t.enter}
                </div>
              </div>
            </button>
          </div>

          <p className="mt-3 sm:mt-5 text-center text-[11px] sm:text-sm font-bold text-zinc-400 [font-family:Tahoma,Arial,sans-serif]">
            {t.chooseSection}
          </p>
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
                  user={verifiedUserForUi}
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
                  user={verifiedUserForUi}
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

            {activeTab === 'admin' && isAdmin && (
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

        {isAdmin && (
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
        )}
        
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
