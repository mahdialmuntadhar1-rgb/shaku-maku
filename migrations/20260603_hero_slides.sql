CREATE TABLE IF NOT EXISTS hero_slides (
  id TEXT PRIMARY KEY,
  image_url TEXT NOT NULL,
  slogan_ar TEXT NOT NULL DEFAULT '',
  slogan_ku TEXT NOT NULL DEFAULT '',
  slogan_en TEXT NOT NULL DEFAULT '',
  badge_ar TEXT NOT NULL DEFAULT '',
  badge_ku TEXT NOT NULL DEFAULT '',
  badge_en TEXT NOT NULL DEFAULT '',
  governorate TEXT NOT NULL DEFAULT 'all',
  category TEXT NOT NULL DEFAULT 'restaurant',
  sort_order INTEGER NOT NULL DEFAULT 0,
  is_active INTEGER NOT NULL DEFAULT 1,
  created_by TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_hero_slides_active_order
ON hero_slides(is_active, sort_order, created_at);

INSERT OR IGNORE INTO hero_slides (
  id, image_url,
  slogan_ar, slogan_ku, slogan_en,
  badge_ar, badge_ku, badge_en,
  governorate, category, sort_order, is_active
) VALUES
(
  'hero-default-iraq-food',
  'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1400&auto=format&fit=crop&q=85',
  'اكتشف أفضل الأماكن حولك',
  'باشترین شوێنەکان لە دەوروبەرت بدۆزەرەوە',
  'Discover the best places around you',
  'مطاعم وكافيهات',
  'چێشتخانە و کافێ',
  'Restaurants & Cafes',
  'all',
  'restaurant',
  1,
  1
),
(
  'hero-default-local-business',
  'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1400&auto=format&fit=crop&q=85',
  'كل الأعمال العراقية في مكان واحد',
  'هەموو کارە عێراقییەکان لە یەک شوێن',
  'Iraqi businesses in one place',
  'دليل الأعمال',
  'ڕێبەری کار',
  'Business Hub',
  'all',
  'shopping',
  2,
  1
),
(
  'hero-default-social-feed',
  'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1400&auto=format&fit=crop&q=85',
  'تابع العروض والمنشورات الجديدة',
  'داشکاندن و پۆستە نوێکان ببینە',
  'Follow offers and new posts',
  'نبض الشارع',
  'پۆستە نوێکان',
  'Social Feed',
  'all',
  'services',
  3,
  1
);