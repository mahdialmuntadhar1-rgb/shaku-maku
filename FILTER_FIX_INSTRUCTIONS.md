# FILTER FIX INSTRUCTIONS

Created: 20260602-165028

## Required behavior

The app has two filters:

1. Governorate filter
2. Category filter

They must work together.

Examples:

- Governorate = Baghdad, Category = ALL
  Show only businesses from Baghdad.

- Governorate = ALL, Category = Restaurants
  Show restaurants from all governorates.

- Governorate = Baghdad, Category = Restaurants
  Show only Baghdad restaurants.

- Governorate = ALL, Category = ALL
  Show all businesses.

## Problem

Currently, when user selects filters, the frontend sometimes says:
Nothing found.

Likely reason:
Frontend filter labels do not match database values exactly.

Examples:
- Frontend: Baghdad
- Database: بغداد

- Frontend: Restaurants
- Database: مطاعم

- Frontend: Erbil
- Database: اربيل / Erbil / هەولێر

## Correct fix

Do not hardcode frontend-only filtering unless using normalized values.

Best fix:

1. Backend /api/businesses should accept:
   - governorate
   - category
   - page
   - limit

2. Backend should normalize aliases:
   Baghdad = بغداد
   Basra = البصرة
   Erbil = اربيل = هەولێر
   Najaf = النجف
   Karbala = كربلاء
   Mosul/Nineveh = نينوى = الموصل

3. Category should normalize aliases:
   Restaurants = مطاعم
   Doctors = أطباء / عيادات
   Pharmacies = صيدليات
   Cafes = مقاهي
   Hotels = فنادق
   Shopping = تسوق
   Cars = سيارات

4. Frontend must send selected filter values to API:
   /api/businesses?page=1&limit=20&governorate=VALUE&category=VALUE

5. If governorate or category is ALL, do not send that parameter.

6. When changing filter:
   - Reset page to 1
   - Clear old loaded list
   - Fetch new filtered list
   - Show loading state
   - Show results
   - If no results, show useful message:
     "No businesses found in this governorate/category yet."

7. Social feed should use the same governorate filter:
   /api/social-feed?governorate=VALUE&category=VALUE

8. Business cards and social feed must stay synchronized with selected governorate.

## Do not break

- Business cards currently load without filters.
- Do not break unfiltered loading.
- Do not touch Nabda API.
- Do not change official frontend/backend links.

## Files to inspect

Read:
FILTER_DIAGNOSIS_REPORT_20260602-165028.txt

Then inspect frontend files mentioning:
- governorate
- category
- businesses
- filters
- selectedGovernorate
- selectedCategory

## Acceptance tests

1. Open homepage.
2. Businesses load with no filters.
3. Select Baghdad.
4. Only Baghdad businesses show.
5. Select category Restaurants.
6. Only Baghdad restaurants show.
7. Change governorate to Erbil.
8. Only Erbil restaurants show.
9. Change category to ALL.
10. All Erbil businesses show.
11. Social feed changes with governorate too.
