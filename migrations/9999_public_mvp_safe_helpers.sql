CREATE TABLE IF NOT EXISTS password_reset_tokens (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  token TEXT NOT NULL UNIQUE,
  used INTEGER NOT NULL DEFAULT 0,
  expires_at TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_password_reset_tokens_token
ON password_reset_tokens(token);

CREATE INDEX IF NOT EXISTS idx_password_reset_tokens_user_id
ON password_reset_tokens(user_id);

CREATE TABLE IF NOT EXISTS hero_slides (
  id TEXT PRIMARY KEY,
  image_url TEXT NOT NULL,
  slogan_ar TEXT,
  slogan_ku TEXT,
  slogan_en TEXT,
  badge_ar TEXT,
  badge_ku TEXT,
  badge_en TEXT,
  governorate TEXT NOT NULL DEFAULT 'all',
  category TEXT NOT NULL DEFAULT 'restaurant',
  sort_order INTEGER NOT NULL DEFAULT 0,
  is_active INTEGER NOT NULL DEFAULT 1,
  created_by TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_hero_slides_active_order
ON hero_slides(is_active, sort_order);

CREATE TABLE IF NOT EXISTS business_submissions (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  address TEXT,
  phone TEXT NOT NULL,
  category TEXT,
  governorate TEXT,
  media_url TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  source TEXT,
  approved_business_id TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_business_submissions_status
ON business_submissions(status);
