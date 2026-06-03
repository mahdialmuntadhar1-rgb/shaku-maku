-- Make database category values match frontend CATEGORIES ids exactly.

UPDATE businesses SET category = 'restaurant' WHERE category IN ('restaurants_and_cafes', 'restaurants cafes', 'food', 'dining');
UPDATE businesses SET category = 'cafe_bakery' WHERE category IN ('cafe', 'cafes', 'coffee', 'coffee_shop', 'bakery', 'bakeries', 'cafes_and_bakeries');
UPDATE businesses SET category = 'supermarket' WHERE category IN ('market', 'markets', 'grocery', 'groceries');
UPDATE businesses SET category = 'mall' WHERE category IN ('shopping', 'shop', 'retail', 'shopping_center');
UPDATE businesses SET category = 'clinic' WHERE category IN ('health', 'medical', 'health_and_medical_services', 'medical_services');
UPDATE businesses SET category = 'salon' WHERE category IN ('beauty', 'beauty_and_salons', 'barber', 'hair');
UPDATE businesses SET category = 'gym' WHERE category IN ('fitness', 'fitness_and_gyms', 'sports', 'sport');
UPDATE businesses SET category = 'hotel' WHERE category IN ('hotels_and_hospitality', 'hotels_and_resorts', 'resort', 'resorts');
UPDATE businesses SET category = 'university' WHERE category IN ('education', 'education_and_training_centers', 'training', 'school', 'college');
UPDATE businesses SET category = 'bank' WHERE category IN ('atm', 'finance', 'banks_and_finance', 'exchange');
UPDATE businesses SET category = 'mobile_shop' WHERE category IN ('electronics', 'electronics_and_tech_shops', 'tech_shop', 'phone', 'mobile');
UPDATE businesses SET category = 'furniture' WHERE category IN ('home', 'home_furniture', 'decor');
UPDATE businesses SET category = 'software_company' WHERE category IN ('it_and_software_services', 'tech_and_software', 'technology', 'software');
UPDATE businesses SET category = 'construction_company' WHERE category IN ('construction_and_contractors', 'contractor', 'contractors');
UPDATE businesses SET category = 'cinema' WHERE category IN ('entertainment', 'events', 'movie', 'movies', 'theater', 'theatre');
UPDATE businesses SET category = 'other' WHERE category IN ('fuel', 'mosque', 'services', 'service', 'amenity', 'office', 'craft');
UPDATE businesses SET category = 'other' WHERE category IS NULL OR trim(category) = '';