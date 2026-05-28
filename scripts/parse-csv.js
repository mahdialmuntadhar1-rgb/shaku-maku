const fs = require('fs');
const csvPath = 'C:/Users/HB LAPTOP STORE/Documents/puython-pro-scraper/iraq_businesses_2026-05-26_122423.csv';
const csv = fs.readFileSync(csvPath, 'utf8');
const lines = csv.trim().split('\n');
const header = lines[0].split(',');
const rows = lines.slice(1);

const cats = new Set();
const govs = new Set();
const businesses = [];
const posts = [];

// Unsplash category image mappings
const categoryImages = {
  'IT & Software Services': 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80',
  'Hotels & Hospitality': 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
  'Health & Medical Services': 'https://images.unsplash.com/photo-1584515933487-779824d29309?w=800&q=80',
  'Fitness & Gyms': 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80',
  'Education & Training Centers': 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80',
  'Restaurants & Cafes': 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80',
  'Real Estate': 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80',
  'Construction & Contractors': 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80',
  'Beauty & Salons': 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80',
  'Electronics & Tech Shops': 'https://images.unsplash.com/photo-1498049860654-af1a5c5668ba?w=800&q=80'
};

for (let i = 0; i < rows.length; i++) {
  const line = rows[i];
  if (!line.trim()) continue;
  // Simple CSV parse - handle quoted fields
  const cols = [];
  let current = '';
  let inQuotes = false;
  for (let j = 0; j < line.length; j++) {
    const ch = line[j];
    if (ch === '"') {
      inQuotes = !inQuotes;
    } else if (ch === ',' && !inQuotes) {
      cols.push(current.trim());
      current = '';
    } else {
      current += ch;
    }
  }
  cols.push(current.trim());

  if (cols.length < 14) continue;

  const name = cols[0];
  const lang = cols[1];
  const category = cols[2];
  const governorate = cols[3];
  const address = cols[4];
  const phone = cols[5];
  const mobile = cols[6];
  const whatsapp = cols[7];
  const email = cols[8];
  const website = cols[9];
  const facebook = cols[10];
  const instagram = cols[11];
  const bio = cols[12];
  const lat = parseFloat(cols[13]) || 0;
  const lng = parseFloat(cols[14]) || 0;

  cats.add(category);
  govs.add(governorate);

  const id = `csv_${i}`;
  const categoryId = category.toLowerCase().replace(/[^a-z0-9]/g, '_');
  const govCode = governorate.toLowerCase().replace(/[^a-z0-9]/g, '_');

  businesses.push({
    id,
    name,
    nameAr: lang === 'ar' ? name : '',
    nameKu: lang === 'ku' ? name : '',
    category: categoryId,
    governorate: govCode,
    address,
    addressAr: lang === 'ar' ? address : '',
    phone,
    mobile,
    whatsapp,
    email,
    website,
    facebook,
    instagram,
    description: bio,
    descriptionAr: lang === 'ar' ? bio : '',
    image: categoryImages[category] || 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
    location: { lat, lng },
    likes: Math.floor(Math.random() * 200) + 10,
    saves: Math.floor(Math.random() * 50) + 5,
    reviews: Math.floor(Math.random() * 30) + 2,
    rating: parseFloat((3.5 + Math.random() * 1.5).toFixed(1)),
    verified: Math.random() > 0.7,
    claimed: false,
    storyUrls: [],
    reviewList: []
  });

  posts.push({
    id: `post_${i}`,
    businessName: name,
    businessAvatar: '',
    caption: bio,
    mediaUrl: categoryImages[category] || 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
    governorate: govCode,
    category: categoryId,
    timeAgo: `${Math.floor(Math.random() * 23) + 1}h ago`,
    likes: Math.floor(Math.random() * 500) + 20,
    commentsCount: Math.floor(Math.random() * 50) + 3,
    shares: Math.floor(Math.random() * 30) + 1,
    isPromoted: Math.random() > 0.85,
    isOwnerPost: false,
    createdAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString()
  });
}

console.log('Categories:', [...cats].sort().join(', '));
console.log('Governorates:', [...govs].sort().join(', '));
console.log('Total businesses:', businesses.length);
console.log('Total posts:', posts.length);

// Write businesses JSON
fs.writeFileSync('public/iraq_businesses.json', JSON.stringify(businesses, null, 2));
console.log('Wrote public/iraq_businesses.json');

// Write posts JSON
fs.writeFileSync('public/iraq_posts.json', JSON.stringify(posts, null, 2));
console.log('Wrote public/iraq_posts.json');

// Generate category TS array
const categoryEntries = [...cats].sort().map(cat => {
  const id = cat.toLowerCase().replace(/[^a-z0-9]/g, '_');
  return `  { id: '${id}', name: '${cat}', nameAr: '${cat}', nameKu: '${cat}', icon: 'Briefcase', color: 'bg-amber-500' }`;
});

const govEntries = [...govs].sort().map(gov => {
  const code = gov.toLowerCase().replace(/[^a-z0-9]/g, '_');
  return `  { id: '${code}', name: '${gov}', nameAr: '${gov}', nameKu: '${gov}' }`;
});

const categoryTs = `export const CSV_CATEGORIES = [\n${categoryEntries.join(',\n')}\n];`;
const govTs = `export const CSV_GOVERNORATES = [\n${govEntries.join(',\n')}\n];`;

fs.writeFileSync('src/csvData.ts', `${categoryTs}\n\n${govTs}\n\nexport const CSV_BUSINESSES = ${JSON.stringify(businesses.slice(0, 50), null, 2)};\n`);
console.log('Wrote src/csvData.ts');
