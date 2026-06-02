# Business Cards + Admin Fix Attempt

Date: 20260602-162925

## Business cards

Added:
- .env.production pointing frontend to:
  https://shaku-maku.mahdialmuntadhar1.workers.dev

Added Cloudflare Pages proxy:
- /api/* -> https://shaku-maku.mahdialmuntadhar1.workers.dev/api/:splat
- /health -> https://shaku-maku.mahdialmuntadhar1.workers.dev/health

Reason:
If the frontend calls relative /api/businesses, Pages can now proxy it to the Worker backend.

## Admin email

Target admin:
safaribosafar@gmail.com

Attempted to update common D1 tables:
- users
- profiles
- user_profiles
- accounts

Common admin fields attempted:
- role = admin
- is_admin = 1
- isAdmin = 1

## Next check

Open:
https://shakumaku.pages.dev/

Check:
- Business cards load
- Register/login page works
- safaribosafar@gmail.com can access admin editing
