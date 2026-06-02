-- ============================================================
-- Shaku Maku Admin Editing + Social Feed CMS
-- Created: 20260602-163833
-- Purpose:
-- - Editable hero section
-- - Editable sales/promotional sections
-- - Editable social feed posts
-- - Governorate-based content filtering
-- - Admin email allowlist
-- ============================================================

CREATE TABLE IF NOT EXISTS admin_users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT NOT NULL UNIQUE,
  role TEXT NOT NULL DEFAULT 'admin',
  can_edit_content INTEGER NOT NULL DEFAULT 1,
  can_edit_social_feed INTEGER NOT NULL DEFAULT 1,
  can_edit_businesses INTEGER NOT NULL DEFAULT 1,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT OR IGNORE INTO admin_users (
  email,
  role,
  can_edit_content,
  can_edit_social_feed,
  can_edit_businesses
) VALUES (
  'safaribosafar@gmail.com',
  'platform_admin',
  1,
  1,
  1
);

CREATE TABLE IF NOT EXISTS cms_sections (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  section_key TEXT NOT NULL UNIQUE,
  section_type TEXT NOT NULL DEFAULT 'general',
  title_ar TEXT,
  title_ku TEXT,
  title_en TEXT,
  subtitle_ar TEXT,
  subtitle_ku TEXT,
  subtitle_en TEXT,
  body_ar TEXT,
  body_ku TEXT,
  body_en TEXT,
  image_url TEXT,
  button_text_ar TEXT,
  button_text_ku TEXT,
  button_text_en TEXT,
  button_url TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  is_active INTEGER NOT NULL DEFAULT 1,
  data_json TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT OR IGNORE INTO cms_sections (
  section_key,
  section_type,
  title_ar,
  subtitle_ar,
  body_ar,
  image_url,
  button_text_ar,
  sort_order,
  is_active
) VALUES
(
  'hero',
  'hero',
  'شكو ماكو',
  'اكتشف الأعمال والخدمات القريبة منك في العراق',
  'منصة عراقية تجمع الأعمال والخدمات حسب المحافظة والتصنيف بطريقة سهلة وواضحة.',
  '',
  'ابدأ الآن',
  1,
  1
),
(
  'sales',
  'sales',
  'خلّي نشاطك يوصل لزبائن أكثر',
  'ظهور أقوى للأعمال المحلية',
  'أضف نشاطك، حدّث معلوماتك، وخلي الناس توصل لك بسهولة.',
  '',
  'انضم مجاناً',
  2,
  1
);

CREATE TABLE IF NOT EXISTS social_feed_posts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  governorate TEXT NOT NULL DEFAULT 'عام',
  category TEXT NOT NULL DEFAULT 'عام',
  language TEXT NOT NULL DEFAULT 'ar',
  business_name TEXT,
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  image_url TEXT,
  phone TEXT,
  address TEXT,
  likes_count INTEGER NOT NULL DEFAULT 0,
  comments_count INTEGER NOT NULL DEFAULT 0,
  shares_count INTEGER NOT NULL DEFAULT 0,
  is_featured INTEGER NOT NULL DEFAULT 0,
  is_active INTEGER NOT NULL DEFAULT 1,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_social_feed_governorate
ON social_feed_posts(governorate);

CREATE INDEX IF NOT EXISTS idx_social_feed_category
ON social_feed_posts(category);

CREATE INDEX IF NOT EXISTS idx_social_feed_active
ON social_feed_posts(is_active);

INSERT OR IGNORE INTO social_feed_posts (
  id,
  governorate,
  category,
  language,
  business_name,
  title,
  body,
  image_url,
  likes_count,
  comments_count,
  is_featured,
  is_active,
  sort_order
) VALUES
(
  1,
  'Baghdad',
  'مطاعم',
  'ar',
  'مطعم محلي',
  'مكان جديد يستحق التجربة',
  'اكتشف أماكن وخدمات محلية قريبة منك عبر شكو ماكو.',
  '',
  42,
  8,
  1,
  1,
  1
),
(
  2,
  'Erbil',
  'عيادات',
  'ar',
  'خدمة محلية',
  'معلومات أوضح تساعدك تختار بثقة',
  'تابع أحدث الأعمال والخدمات حسب محافظتك وتصنيفك.',
  '',
  35,
  5,
  0,
  1,
  2
),
(
  3,
  'Basra',
  'تسوق',
  'ar',
  'نشاط محلي',
  'كل محافظة إلها محتوى خاص',
  'اختار المحافظة وشوف الأعمال والمنشورات المناسبة لمكانك.',
  '',
  28,
  4,
  0,
  1,
  3
);
