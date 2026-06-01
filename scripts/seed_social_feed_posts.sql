-- Seed social feed from real businesses:
-- - Up to 5 posts per governorate
-- - Prioritize category diversity per governorate
-- - Safe to rerun (replaces only prior seeded rows)

DELETE FROM posts WHERE id LIKE 'seed-post-%';

WITH base AS (
  SELECT
    b.id AS business_id,
    TRIM(b.governorate) AS governorate,
    COALESCE(NULLIF(TRIM(b.category), ''), 'Other') AS category,
    COALESCE(NULLIF(TRIM(b.name_ar), ''), NULLIF(TRIM(b.name_en), ''), 'نشاط محلي') AS name_ar,
    COALESCE(NULLIF(TRIM(b.name_ku), ''), NULLIF(TRIM(b.name_en), ''), 'چالاکییەکی ناوخۆیی') AS name_ku,
    COALESCE(NULLIF(TRIM(b.name_en), ''), NULLIF(TRIM(b.name_ar), ''), 'Local Business') AS name_en,
    NULLIF(TRIM(b.image), '') AS image,
    ROW_NUMBER() OVER (PARTITION BY TRIM(b.governorate), COALESCE(NULLIF(TRIM(b.category), ''), 'Other') ORDER BY RANDOM()) AS rn_category
  FROM businesses b
  WHERE b.governorate IS NOT NULL
    AND TRIM(b.governorate) <> ''
),
unique_category_pick AS (
  SELECT
    0 AS priority,
    business_id, governorate, category, name_ar, name_ku, name_en, image
  FROM base
  WHERE rn_category = 1
),
fallback_pick AS (
  SELECT
    1 AS priority,
    business_id, governorate, category, name_ar, name_ku, name_en, image
  FROM base
  WHERE rn_category > 1
),
combined AS (
  SELECT * FROM unique_category_pick
  UNION ALL
  SELECT * FROM fallback_pick
),
picked AS (
  SELECT *
  FROM (
    SELECT
      business_id,
      governorate,
      category,
      name_ar,
      name_ku,
      name_en,
      image,
      ROW_NUMBER() OVER (PARTITION BY governorate ORDER BY priority ASC, RANDOM()) AS rn_gov
    FROM combined
  )
  WHERE rn_gov <= 5
)
INSERT INTO posts (
  id,
  business_id,
  author_id,
  media_url,
  caption_ar,
  caption_ku,
  caption_en,
  likes,
  comments_count,
  shares,
  views,
  promotion_badge_ar,
  promotion_badge_ku,
  promotion_badge_en
)
SELECT
  'seed-post-' || REPLACE(business_id, ' ', '_') AS id,
  business_id,
  NULL AS author_id,
  COALESCE(
    image,
    'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&auto=format&fit=crop&q=80'
  ) AS media_url,
  '📍 ' || name_ar || ' - ' || governorate || ' | تجربة موصى بها اليوم ✨' AS caption_ar,
  '📍 ' || name_ku || ' - ' || governorate || ' | ئەمڕۆ زۆر پێشنیار دەکرێت ✨' AS caption_ku,
  '📍 ' || name_en || ' - ' || governorate || ' | A top local pick today ✨' AS caption_en,
  40 + (ABS(RANDOM()) % 760) AS likes,
  3 + (ABS(RANDOM()) % 120) AS comments_count,
  1 + (ABS(RANDOM()) % 90) AS shares,
  120 + (ABS(RANDOM()) % 8200) AS views,
  '🌟 نشاط مميز' AS promotion_badge_ar,
  '🌟 چالاکییەکی تایبەت' AS promotion_badge_ku,
  '🌟 Featured Local Spot' AS promotion_badge_en
FROM picked;
