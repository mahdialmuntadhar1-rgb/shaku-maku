-- Shaku Maku admin bootstrap
-- Admin email: safaribosafar@gmail.com

UPDATE users
SET role = 'admin'
WHERE lower(email) = lower('safaribosafar@gmail.com');

UPDATE users
SET is_admin = 1
WHERE lower(email) = lower('safaribosafar@gmail.com');

UPDATE profiles
SET role = 'admin'
WHERE lower(email) = lower('safaribosafar@gmail.com');

UPDATE profiles
SET is_admin = 1
WHERE lower(email) = lower('safaribosafar@gmail.com');

UPDATE user_profiles
SET role = 'admin'
WHERE lower(email) = lower('safaribosafar@gmail.com');

UPDATE user_profiles
SET is_admin = 1
WHERE lower(email) = lower('safaribosafar@gmail.com');

UPDATE accounts
SET role = 'admin'
WHERE lower(email) = lower('safaribosafar@gmail.com');

UPDATE accounts
SET is_admin = 1
WHERE lower(email) = lower('safaribosafar@gmail.com');
