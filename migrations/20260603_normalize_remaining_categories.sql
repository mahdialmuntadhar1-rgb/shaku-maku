-- Normalize remaining imported category names so all rows match frontend dropdown IDs.

UPDATE businesses SET category = 'bank' WHERE category = 'atm';
UPDATE businesses SET category = 'other' WHERE category = 'fuel';
UPDATE businesses SET category = 'other' WHERE category = 'mosque';
UPDATE businesses SET category = 'cinema' WHERE category = 'entertainment';
UPDATE businesses SET category = 'cinema' WHERE category = 'events';
UPDATE businesses SET category = 'other' WHERE category = 'services';
UPDATE businesses SET category = 'restaurant' WHERE category = 'restaurants_and_cafes';
UPDATE businesses SET category = 'furniture' WHERE category = 'home';
UPDATE businesses SET category = 'university' WHERE category = 'education_and_training_centers';
UPDATE businesses SET category = 'salon' WHERE category = 'beauty_and_salons';
UPDATE businesses SET category = 'mobile_shop' WHERE category = 'electronics_and_tech_shops';
UPDATE businesses SET category = 'construction_company' WHERE category = 'construction_and_contractors';
UPDATE businesses SET category = 'clinic' WHERE category = 'health_and_medical_services';
UPDATE businesses SET category = 'hotel' WHERE category = 'hotels_and_hospitality';
UPDATE businesses SET category = 'gym' WHERE category = 'fitness_and_gyms';
UPDATE businesses SET category = 'software_company' WHERE category = 'it_and_software_services';
UPDATE businesses SET category = 'other' WHERE category = 'amenity';
UPDATE businesses SET category = 'other' WHERE category = 'office';
UPDATE businesses SET category = 'mall' WHERE category = 'shop';
UPDATE businesses SET category = 'other' WHERE category = 'craft';
UPDATE businesses SET category = 'other' WHERE category IS NULL OR trim(category) = '';