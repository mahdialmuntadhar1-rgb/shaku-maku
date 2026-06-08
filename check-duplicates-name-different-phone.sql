SELECT
  lower(trim(COALESCE(name_en, name_ar, name_ku))) AS business_name,
  governorate,
  category,
  COUNT(*) AS records,
  COUNT(DISTINCT phone_number) AS different_phones,
  GROUP_CONCAT(phone_number, ' | ') AS phones
FROM businesses
WHERE COALESCE(name_en, name_ar, name_ku, '') != ''
GROUP BY business_name, governorate, category
HAVING COUNT(*) > 1 AND COUNT(DISTINCT phone_number) > 1
ORDER BY records DESC
LIMIT 100;
