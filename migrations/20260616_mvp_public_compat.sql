CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT,
  name TEXT,
  role TEXT DEFAULT 'user',
  is_admin INTEGER DEFAULT 0,
  photo_url TEXT,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS businesses (
  id TEXT PRIMARY KEY,
  owner_id TEXT,
  name_ar TEXT,
  name_ku TEXT,
  name_en TEXT,
  description_ar TEXT,
  description_ku TEXT,
  description_en TEXT,
  category TEXT,
  governorate TEXT,
  phone_number TEXT,
  address_ar TEXT,
  address_ku TEXT,
  address_en TEXT,
  image TEXT,
  avatar TEXT,
  is_verified INTEGER DEFAULT 0,
  map_coords_x REAL,
  map_coords_y REAL,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS posts (
  id TEXT PRIMARY KEY,
  business_id TEXT,
  author_id TEXT,
  media_url TEXT,
  caption_ar TEXT,
  caption_ku TEXT,
  caption_en TEXT,
  promotion_badge_ar TEXT,
  promotion_badge_ku TEXT,
  promotion_badge_en TEXT,
  video_url TEXT,
  file_attachment_name TEXT,
  file_attachment_size TEXT,
  file_attachment_type TEXT,
  governorate TEXT,
  category TEXT DEFAULT 'community',
  likes INTEGER DEFAULT 0,
  comments_count INTEGER DEFAULT 0,
  shares INTEGER DEFAULT 0,
  views INTEGER DEFAULT 0,
  status TEXT DEFAULT 'approved',
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS likes (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  target_id TEXT NOT NULL,
  target_type TEXT NOT NULL,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_likes_unique
ON likes(user_id, target_id, target_type);

CREATE TABLE IF NOT EXISTS saves (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  business_id TEXT NOT NULL,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS comments (
  id TEXT PRIMARY KEY,
  post_id TEXT NOT NULL,
  user_id TEXT NOT NULL,
  text TEXT NOT NULL,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS business_claims (
  id TEXT PRIMARY KEY,
  business_id TEXT NOT NULL,
  user_id TEXT NOT NULL,
  status TEXT DEFAULT 'pending',
  created_at TEXT DEFAULT (datetime('now')),
  reviewed_at TEXT
);

CREATE TABLE IF NOT EXISTS business_owners (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  business_id TEXT NOT NULL,
  role TEXT DEFAULT 'owner',
  verified INTEGER DEFAULT 0,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS password_reset_tokens (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  token TEXT UNIQUE NOT NULL,
  expires_at TEXT NOT NULL,
  used INTEGER DEFAULT 0,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS hero_slides (
  id TEXT PRIMARY KEY,
  title_ar TEXT,
  title_ku TEXT,
  title_en TEXT,
  subtitle_ar TEXT,
  subtitle_ku TEXT,
  subtitle_en TEXT,
  image_url TEXT,
  cta_ar TEXT,
  cta_ku TEXT,
  cta_en TEXT,
  sort_order INTEGER DEFAULT 0,
  is_active INTEGER DEFAULT 1,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS business_submissions (
  id TEXT PRIMARY KEY,
  status TEXT DEFAULT 'pending',
  name_ar TEXT,
  name_ku TEXT,
  name_en TEXT,
  description_ar TEXT,
  description_ku TEXT,
  description_en TEXT,
  category TEXT,
  governorate TEXT,
  phone_number TEXT,
  address_ar TEXT,
  address_ku TEXT,
  address_en TEXT,
  image TEXT,
  avatar TEXT,
  submitter_email TEXT,
  submitter_phone TEXT,
  payload_json TEXT,
  created_at TEXT DEFAULT (datetime('now')),
  reviewed_at TEXT,
  reviewed_by TEXT
);

CREATE INDEX IF NOT EXISTS idx_businesses_gov_cat ON businesses(governorate, category);
CREATE INDEX IF NOT EXISTS idx_posts_created ON posts(created_at);
CREATE INDEX IF NOT EXISTS idx_posts_gov_cat ON posts(governorate, category);
CREATE INDEX IF NOT EXISTS idx_submissions_status ON business_submissions(status, created_at);
