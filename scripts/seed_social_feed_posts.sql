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
      LOWER(category) AS category_lc,
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
  CASE
      WHEN category_lc LIKE '%restaurant%' OR category_lc LIKE '%cafe%' OR category_lc LIKE '%bakery%' OR category_lc LIKE '%food%'
        THEN CASE (ABS(RANDOM()) % 3)
          WHEN 0 THEN 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1400&auto=format&fit=crop&q=80'
          WHEN 1 THEN 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1400&auto=format&fit=crop&q=80'
          ELSE 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1400&auto=format&fit=crop&q=80'
        END
      WHEN category_lc LIKE '%clinic%' OR category_lc LIKE '%hospital%' OR category_lc LIKE '%health%' OR category_lc LIKE '%doctor%' OR category_lc LIKE '%dentist%' OR category_lc LIKE '%pharmacy%'
        THEN CASE (ABS(RANDOM()) % 3)
          WHEN 0 THEN 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1400&auto=format&fit=crop&q=80'
          WHEN 1 THEN 'https://images.unsplash.com/photo-1584515933487-779824d29309?w=1400&auto=format&fit=crop&q=80'
          ELSE 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=1400&auto=format&fit=crop&q=80'
        END
      WHEN category_lc LIKE '%law%' OR category_lc LIKE '%lawyer%' OR category_lc LIKE '%legal%'
        THEN CASE (ABS(RANDOM()) % 2)
          WHEN 0 THEN 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1400&auto=format&fit=crop&q=80'
          ELSE 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1400&auto=format&fit=crop&q=80'
        END
      WHEN category_lc LIKE '%real estate%' OR category_lc LIKE '%construction%' OR category_lc LIKE '%architecture%'
        THEN CASE (ABS(RANDOM()) % 3)
          WHEN 0 THEN 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1400&auto=format&fit=crop&q=80'
          WHEN 1 THEN 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1400&auto=format&fit=crop&q=80'
          ELSE 'https://images.unsplash.com/photo-1460472178825-e5240623afd5?w=1400&auto=format&fit=crop&q=80'
        END
      WHEN category_lc LIKE '%software%' OR category_lc LIKE '%tech%' OR category_lc LIKE '%it%' OR category_lc LIKE '%mobile%' OR category_lc LIKE '%electronics%'
        THEN CASE (ABS(RANDOM()) % 3)
          WHEN 0 THEN 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1400&auto=format&fit=crop&q=80'
          WHEN 1 THEN 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1400&auto=format&fit=crop&q=80'
          ELSE 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1400&auto=format&fit=crop&q=80'
        END
      WHEN category_lc LIKE '%education%' OR category_lc LIKE '%school%' OR category_lc LIKE '%university%'
        THEN CASE (ABS(RANDOM()) % 2)
          WHEN 0 THEN 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1400&auto=format&fit=crop&q=80'
          ELSE 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1400&auto=format&fit=crop&q=80'
        END
      WHEN category_lc LIKE '%hotel%' OR category_lc LIKE '%travel%'
        THEN CASE (ABS(RANDOM()) % 2)
          WHEN 0 THEN 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1400&auto=format&fit=crop&q=80'
          ELSE 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1400&auto=format&fit=crop&q=80'
        END
      WHEN category_lc LIKE '%beauty%' OR category_lc LIKE '%salon%' OR category_lc LIKE '%spa%'
        THEN CASE (ABS(RANDOM()) % 2)
          WHEN 0 THEN 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1400&auto=format&fit=crop&q=80'
          ELSE 'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=1400&auto=format&fit=crop&q=80'
        END
      WHEN category_lc LIKE '%gym%' OR category_lc LIKE '%sports%'
        THEN CASE (ABS(RANDOM()) % 2)
          WHEN 0 THEN 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1400&auto=format&fit=crop&q=80'
          ELSE 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=1400&auto=format&fit=crop&q=80'
        END
      WHEN category_lc LIKE '%bank%' OR category_lc LIKE '%finance%'
        THEN CASE (ABS(RANDOM()) % 2)
          WHEN 0 THEN 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=1400&auto=format&fit=crop&q=80'
          ELSE 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=1400&auto=format&fit=crop&q=80'
        END
      ELSE 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1400&auto=format&fit=crop&q=80'
    END AS media_url,
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
