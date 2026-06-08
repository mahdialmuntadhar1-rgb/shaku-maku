SELECT
  phone_number,
  COUNT(*) AS duplicate_count,
  GROUP_CONCAT(COALESCE(name_en, name_ar, name_ku), ' | ') AS business_names
FROM businesses
WHERE COALESCE(phone_number, '') != ''
GROUP BY phone_number
HAVING COUNT(*) > 1
ORDER BY duplicate_count DESC
LIMIT 100;
