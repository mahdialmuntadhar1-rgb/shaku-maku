UPDATE users
SET role = 'admin',
    is_admin = 1,
    password_hash = '$2a$10$kEky1TGI9/ImQtr2ZP9Gm.avKmCTfhk0ooWvv6X.KoyngZIfxcRvK',
    updated_at = datetime('now')
WHERE lower(email) = 'safaribosafar@gmail.com';
