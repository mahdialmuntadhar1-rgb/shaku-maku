# NEXT STEP — FIX FILTERS

Give this to Codex / Windsurf:

Read first:
1. FILTER_TRUTH_DO_NOT_CONFUSE.md
2. FILTER_FIX_INSTRUCTIONS.md
3. DO_NOT_CONFUSE_API_AGAIN.md
4. LOCK_STATUS.md

Task:
Fix governorate and category filtering.

The database already has data. Do not change the database.

Frontend must send the exact database values:
- governorate = English governorate name, example Baghdad
- category = slug value, example restaurant

Do not send Arabic labels to the API.

When user clicks Arabic/Kurdish/English filter labels, map them to correct API values.

Correct examples:
- بغداد -> Baghdad
- مطاعم -> restaurant
- مقاهي -> cafe
- صيدليات -> pharmacy
- عيادات -> clinic
- عقارات -> real_estate

API call:
GET /api/businesses?page=1&limit=20&governorate=Baghdad&category=restaurant

If ALL:
- do not include that parameter.

On filter change:
- reset page to 1
- clear old business list
- fetch filtered data from backend
- show loading state
- show result count
- if none, show useful empty message

Social feed:
Use the same selected governorate and category where possible.

Acceptance test:
1. Open homepage.
2. Businesses load without filters.
3. Select Baghdad.
4. Only Baghdad businesses show.
5. Select restaurants.
6. Only Baghdad restaurants show.
7. Change governorate to Erbil.
8. Only Erbil restaurants show.
9. Change category to ALL.
10. All Erbil businesses show.
