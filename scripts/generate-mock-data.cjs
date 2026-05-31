const fs = require('fs');
const path = require('path');

const csvPath = path.resolve(__dirname, '..', '..', 'DATA-FINAL-GOOSD-MOBILE.csv');
const outPath = path.resolve(__dirname, '..', 'src', 'mockData.ts');

function parseCSV(input) {
  const rows = [];
  let row = [];
  let field = '';
  let quoted = false;

  for (let i = 0; i < input.length; i += 1) {
    const char = input[i];
    const next = input[i + 1];

    if (quoted) {
      if (char === '"' && next === '"') {
        field += '"';
        i += 1;
      } else if (char === '"') {
        quoted = false;
      } else {
        field += char;
      }
      continue;
    }

    if (char === '"') {
      quoted = true;
    } else if (char === ',') {
      row.push(field);
      field = '';
    } else if (char === '\n') {
      row.push(field.replace(/\r$/, ''));
      rows.push(row);
      row = [];
      field = '';
    } else {
      field += char;
    }
  }

  if (field.length > 0 || row.length > 0) {
    row.push(field.replace(/\r$/, ''));
    rows.push(row);
  }

  return rows.filter((candidate) => candidate.some((value) => value !== ''));
}

const governorateMap = {
  Baghdad: 'baghdad',
  Erbil: 'erbil',
  Basra: 'basra',
  Sulaymaniyah: 'sulaymaniyah',
  Najaf: 'najaf',
  Mosul: 'mosul',
  Karbala: 'karbala',
  Kirkuk: 'kirkuk',
  Anbar: 'anbar',
  Duhok: 'duhok',
  Babil: 'babil',
  Babylon: 'babil',
  Diyala: 'diyala',
  Wasit: 'wasit',
  Saladin: 'saladin',
  Maysan: 'maysan',
  'Dhi Qar': 'dhiqar',
  Dhiqar: 'dhiqar',
  Muthanna: 'muthanna',
  Qadisiya: 'qadisiya',
  Halabja: 'halabja'
};

const categoryMap = {
  'Restaurants & Cafes': 'restaurant',
  'Hotels & Accommodation': 'hotel',
  'Hospitals & Clinics': 'clinic',
  'Shopping & Retail': 'mall',
  'Education & Schools': 'university',
  'Beauty & Salons': 'salon',
  'Gyms & Fitness': 'gym',
  'Banks & Finance': 'bank',
  'Real Estate': 'real_estate',
  'Auto Repair Shops': 'car_dealer',
  Pharmacies: 'pharmacy',
  'Technology & Mobile': 'mobile_shop',
  'Furniture & Home': 'furniture',
  'Clothing & Fashion': 'clothing_store',
  'Travel & Tourism': 'travel_agency'
};

const categoryImages = {
  restaurant: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=80',
  hotel: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&auto=format&fit=crop&q=80',
  clinic: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=800&auto=format&fit=crop&q=80',
  mall: 'https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?w=800&auto=format&fit=crop&q=80',
  university: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&auto=format&fit=crop&q=80',
  salon: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&auto=format&fit=crop&q=80',
  gym: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&auto=format&fit=crop&q=80',
  bank: 'https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?w=800&auto=format&fit=crop&q=80',
  real_estate: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&auto=format&fit=crop&q=80',
  car_dealer: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&auto=format&fit=crop&q=80',
  pharmacy: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=800&auto=format&fit=crop&q=80',
  mobile_shop: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80',
  furniture: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&auto=format&fit=crop&q=80',
  clothing_store: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&auto=format&fit=crop&q=80',
  travel_agency: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&auto=format&fit=crop&q=80'
};

const avatar = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=160&h=160&fit=crop&q=80';

function clean(value) {
  return String(value ?? '').trim();
}

function number(value, fallback = 0) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function mapCoords(longitude, latitude) {
  const x = Math.max(5, Math.min(95, ((longitude - 38) / 11) * 100));
  const y = Math.max(5, Math.min(95, (1 - (latitude - 29) / 8) * 100));
  return {
    x: Number(x.toFixed(1)),
    y: Number(y.toFixed(1))
  };
}

const input = fs.readFileSync(csvPath, 'utf8').replace(/^\uFEFF/, '');
const rows = parseCSV(input);
const headers = rows.shift();
const records = rows.map((row) => Object.fromEntries(headers.map((header, index) => [header, row[index] ?? ''])));

const businesses = records.map((record, index) => {
  const category = categoryMap[clean(record.category)] || 'restaurant';
  const governorate = governorateMap[clean(record.governorate)] || 'baghdad';
  const name = clean(record.business_name) || `Business ${index + 1}`;
  const address = clean(record.address) || clean(record.governorate) || 'Iraq';
  const phone = clean(record.phone_number);
  const website = clean(record.website);
  const rating = number(record.rating, 4);
  const reviewsCount = number(record.reviews_count, 0);
  const image = categoryImages[category] || categoryImages.restaurant;
  const description = website ? `${address} - ${website}` : address;
  const sourceUrl = clean(record.source_url);

  return {
    id: `csv-biz-${index + 1}`,
    name: { ar: name, ku: name, en: name },
    description: { ar: description, ku: description, en: description },
    category,
    governorate,
    rating,
    reviewsCount,
    image,
    images: [image],
    avatar,
    isVerified: rating >= 4.2,
    phoneNumber: phone,
    address: { ar: address, ku: address, en: address },
    likes: Math.max(0, Math.round(reviewsCount * (rating / 5) + 12)),
    saves: Math.max(0, Math.round(reviewsCount * 0.35)),
    mapCoords: mapCoords(number(record.longitude, 43.5), number(record.latitude, 33)),
    likedByUser: false,
    savedByUser: false,
    featuredDeal: sourceUrl && sourceUrl !== 'mock://generator' ? { ar: sourceUrl, ku: sourceUrl, en: sourceUrl } : undefined
  };
});

const output = `// Auto-generated from: ${csvPath.replace(/\\/g, '\\\\')}
// Encoding: UTF-8
// Generated on ${new Date().toISOString()}

import type { Business } from './types';

export const MOCK_BUSINESSES: Business[] = ${JSON.stringify(businesses, null, 2)};

export const mockBusinesses = MOCK_BUSINESSES;
export default MOCK_BUSINESSES;
`;

fs.writeFileSync(outPath, output, 'utf8');
console.log(`Generated ${businesses.length} businesses -> ${outPath}`);
