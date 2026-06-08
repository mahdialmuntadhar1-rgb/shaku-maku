SELECT
  lower(trim(COALESCE(name_en, name_ar, name_ku))) AS business_name,
  governorate,
  category,
  COUNT(*) AS duplicate_count,
  GROUP_CONCAT(phone_number, ' | ') AS phones
FROM businesses
WHERE COALESCE(name_en, name_ar, name_ku, '') != ''
GROUP BY business_name, governorate, category
HAVING COUNT(*) > 1
ORDER BY duplicate_count DESC
LIMIT 100;
