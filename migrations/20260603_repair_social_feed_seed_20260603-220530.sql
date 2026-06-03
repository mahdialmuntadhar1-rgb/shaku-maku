-- Repair Social Feed seed.
-- Goal: 5 real-business social posts per governorate.
-- Safe to rerun: removes only seed-social-* posts first.

DELETE FROM posts WHERE id LIKE 'seed-social-%';

WITH
admin_user AS (
  SELECT COALESCE(
    (SELECT id FROM users WHERE lower(email) = 'safaribosafar@gmail.com' LIMIT 1),
    (SELECT id FROM users LIMIT 1),
    'seed-admin'
  ) AS author_id
),
valid_businesses AS (
  SELECT
    b.*,
    ROW_NUMBER() OVER (
      PARTITION BY b.governorate, b.category
      ORDER BY
        COALESCE(b.is_verified, 0) DESC,
        COALESCE(b.rating, 0) DESC,
        b.id ASC
    ) AS category_rank
  FROM businesses b
  WHERE b.governorate IN (
    'baghdad','erbil','basra','sulaymaniyah','mosul','najaf','karbala','kirkuk','anbar',
    'duhok','babil','diyala','wasit','saladin','maysan','dhiqar','muthanna','qadisiya','halabja'
  )
  AND b.category IN (
    'restaurant','cafe_bakery','supermarket','mall','pharmacy','hospital','clinic','doctor','dentist',
    'salon','spa','gym','hotel','travel_agency','university','bank','real_estate','lawyer','car_dealer',
    'car_rental','mobile_shop','furniture','clothing_store','software_company','marketing_agency',
    'construction_company','architecture','photography','cinema','gaming_center','sports_club','pet_shop','other'
  )
),
one_per_category AS (
  SELECT *
  FROM valid_businesses
  WHERE category_rank = 1
),
ranked AS (
  SELECT
    *,
    ROW_NUMBER() OVER (
      PARTITION BY governorate
      ORDER BY
        CASE category
          WHEN 'restaurant' THEN 1
          WHEN 'cafe_bakery' THEN 2
          WHEN 'real_estate' THEN 3
          WHEN 'university' THEN 4
          WHEN 'hotel' THEN 5
          WHEN 'clinic' THEN 6
          WHEN 'pharmacy' THEN 7
          WHEN 'bank' THEN 8
          WHEN 'gym' THEN 9
          WHEN 'mobile_shop' THEN 10
          WHEN 'cinema' THEN 11
          ELSE 20
        END,
        COALESCE(name_en, name_ar, name_ku, id)
    ) AS governorate_rank
  FROM one_per_category
),
picked AS (
  SELECT *
  FROM ranked
  WHERE governorate_rank <= 5
)
INSERT INTO posts (
  id,
  business_id,
  author_id,
  media_url,
  caption_ar,
  caption_ku,
  caption_en,
  promotion_badge_ar,
  promotion_badge_ku,
  promotion_badge_en,
  video_url,
  file_attachment_name,
  file_attachment_size,
  file_attachment_type,
  created_at,
  updated_at
)
SELECT
  'seed-social-' || governorate || '-' || governorate_rank,
  id,
  (SELECT author_id FROM admin_user),
  CASE category
    WHEN 'restaurant' THEN 'https://images.unsplash.com/photo-1544025162-d76694265947?w=1200&auto=format&fit=crop&q=85'
    WHEN 'cafe_bakery' THEN 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1200&auto=format&fit=crop&q=85'
    WHEN 'real_estate' THEN 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&auto=format&fit=crop&q=85'
    WHEN 'university' THEN 'https://images.unsplash.com/photo-1562774053-701939374585?w=1200&auto=format&fit=crop&q=85'
    WHEN 'hotel' THEN 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&auto=format&fit=crop&q=85'
    WHEN 'clinic' THEN 'https://images.unsplash.com/photo-1584982751601-97dcc096659c?w=1200&auto=format&fit=crop&q=85'
    WHEN 'pharmacy' THEN 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=1200&auto=format&fit=crop&q=85'
    WHEN 'bank' THEN 'https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?w=1200&auto=format&fit=crop&q=85'
    WHEN 'gym' THEN 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&auto=format&fit=crop&q=85'
    WHEN 'mobile_shop' THEN 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=1200&auto=format&fit=crop&q=85'
    WHEN 'cinema' THEN 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1200&auto=format&fit=crop&q=85'
    ELSE 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&auto=format&fit=crop&q=85'
  END,
  'منشور جديد من ' || COALESCE(NULLIF(name_ar, ''), NULLIF(name_en, ''), 'نشاط محلي') ||
  ' على شكو ماكو. اكتشفه ضمن تصنيف ' || category || ' في محافظة ' || governorate || '.',
  'بابەتی نوێ لە ' || COALESCE(NULLIF(name_ku, ''), NULLIF(name_en, ''), 'شوێنێکی ناوخۆیی') ||
  ' لە شەکو مەکو. لە پۆلی ' || category || ' لە پارێزگای ' || governorate || '.',
  'New post from ' || COALESCE(NULLIF(name_en, ''), NULLIF(name_ar, ''), 'a local business') ||
  ' on Shaku Maku. Discover it under ' || category || ' in ' || governorate || '.',
  CASE category
    WHEN 'restaurant' THEN 'مطاعم'
    WHEN 'cafe_bakery' THEN 'كافيهات'
    WHEN 'real_estate' THEN 'عقارات'
    WHEN 'university' THEN 'تعليم'
    WHEN 'hotel' THEN 'فنادق'
    WHEN 'clinic' THEN 'صحة'
    WHEN 'pharmacy' THEN 'صيدليات'
    WHEN 'bank' THEN 'مصارف'
    ELSE 'نشاط مميز'
  END,
  CASE category
    WHEN 'restaurant' THEN 'چێشتخانە'
    WHEN 'cafe_bakery' THEN 'کافێ'
    WHEN 'real_estate' THEN 'عەقارات'
    WHEN 'university' THEN 'فێرکردن'
    WHEN 'hotel' THEN 'هۆتێل'
    WHEN 'clinic' THEN 'تەندروستی'
    WHEN 'pharmacy' THEN 'دەرمانخانە'
    WHEN 'bank' THEN 'بانک'
    ELSE 'شوێنی تایبەت'
  END,
  CASE category
    WHEN 'restaurant' THEN 'Restaurants'
    WHEN 'cafe_bakery' THEN 'Cafés'
    WHEN 'real_estate' THEN 'Real Estate'
    WHEN 'university' THEN 'Education'
    WHEN 'hotel' THEN 'Hotels'
    WHEN 'clinic' THEN 'Health'
    WHEN 'pharmacy' THEN 'Pharmacy'
    WHEN 'bank' THEN 'Banks'
    ELSE 'Featured'
  END,
  null,
  null,
  null,
  null,
  datetime('now', '-' || ((governorate_rank * 23) + (abs(random()) % 240)) || ' minutes'),
  datetime('now')
FROM picked;