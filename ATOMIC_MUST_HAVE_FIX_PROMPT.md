You are a senior full-stack TypeScript, React, Vite, Cloudflare Workers, Hono, and D1 engineer.

PROJECT:
Shaku Maku business directory/social app.

LOCAL ROOT:
C:\Users\HB LAPTOP STORE\.windsurf\shaku-maku

CURRENT BRANCH:
fix/public-shipping-manual-quality-gate

IMPORTANT:
Do not deploy.
Do not add nice-to-have features.
Do not redesign the app.
Do not add chat, payments, ads, analytics, AI, subscriptions, or new modules.
Fix only the missing public-shipping must-haves.
Keep npm run check green.
At the end, report files changed and exact verification results.

CURRENT GREEN BASELINE:
npm run check currently means:
- typecheck
- tests
- build

MUST-HAVE 1 — FIX HERO CONTRACT COMPLETELY

Problem:
Backend worker/routes/hero.ts still uses old fields:
- title_ar/title_ku/title_en
- subtitle_ar/subtitle_ku/subtitle_en
- cta_ar/cta_ku/cta_en

Frontend src/App.tsx and HeroSlide type use:
- image
- slogan { ar, ku, en }
- badge { ar, ku, en }
- governorate
- category

Required fix:
1. Replace worker/routes/hero.ts with canonical API/D1 fields:
- id TEXT PRIMARY KEY
- image_url TEXT NOT NULL DEFAULT ''
- slogan_ar TEXT NOT NULL DEFAULT ''
- slogan_ku TEXT NOT NULL DEFAULT ''
- slogan_en TEXT NOT NULL DEFAULT ''
- badge_ar TEXT NOT NULL DEFAULT ''
- badge_ku TEXT NOT NULL DEFAULT ''
- badge_en TEXT NOT NULL DEFAULT ''
- governorate TEXT NOT NULL DEFAULT 'all'
- category TEXT NOT NULL DEFAULT 'restaurant'
- sort_order INTEGER NOT NULL DEFAULT 0
- is_active INTEGER NOT NULL DEFAULT 1
- created_at TEXT DEFAULT datetime('now')
- updated_at TEXT DEFAULT datetime('now')

2. Add safe migration:
migrations/20260616_public_shipping_must_haves.sql

Migration must:
- Add missing hero_slides columns using ALTER TABLE where needed.
- Not drop old columns.
- Not delete existing data.
- Copy old hero text into new slogan/badge fields where possible only if new fields are empty.

3. Fix src/api.ts heroSlidesApi so:
- list maps API rows to frontend HeroSlide:
  image_url -> image
  slogan_ar/ku/en -> slogan
  badge_ar/ku/en -> badge
  sort_order -> sortOrder
  is_active -> isActive
- create/update map frontend HeroSlide payload to API:
  image -> image_url
  slogan.ar/ku/en -> slogan_ar/ku/en
  badge.ar/ku/en -> badge_ar/ku/en
  sortOrder -> sort_order
  isActive -> is_active

4. Fix src/App.tsx hero sync payload if needed.
Hero edits must persist to backend and survive refresh.

MUST-HAVE 2 — FIX BUSINESS SUBMISSIONS APPROVE/REJECT/DELETE

Problem:
worker/routes/submissions.ts approves a submission and returns only { business_id }.
Frontend admin expects the full created business row.
There is no backend DELETE route for /business-submissions/:id.

Required fix:
1. In worker/routes/submissions.ts:
- Keep POST public submission.
- Keep GET admin list.
- PATCH approved must:
  - check current submission status first.
  - if already approved, do not create duplicate business.
  - create the business only once.
  - update submission status to approved.
  - return:
    { success: true, data: { business: <full business row>, business_id: <id> } }
- PATCH rejected must update status to rejected and return success.
- Add DELETE /api/business-submissions/:id, admin-only.
- Approval must not duplicate businesses.

2. Update src/api.ts businessSubmissionsApi:
- add delete(id)
- approve/reject unwrap properly
- approve returns full business if backend returns it.

3. Update src/components/AdminPanel.tsx:
- load submissions using businessSubmissionsApi.list.
- approve/reject using businessSubmissionsApi.approve/reject.
- approved submission adds/updates business list using returned data.business.
- approved/rejected/deleted submission is removed from pending list.
- deleteBusinessSubmission calls businessSubmissionsApi.delete.

MUST-HAVE 3 — FIX BUSINESS LIKE/SAVE AND ADMIN VERIFY PERSISTENCE

Problem:
src/App.tsx has local-only business like/save with TODO comments.
src/components/AdminPanel.tsx toggles verification locally only.

Required fix:
1. In worker/routes/businesses.ts:
- Add authenticated endpoints:
  POST /businesses/:id/like
  POST /businesses/:id/save
- Both require Bearer JWT authentication.
- Confirm business exists.
- Toggle the like/save row.
- Return:
  { success: true, data: { liked: boolean, like_count: number } }
  { success: true, data: { saved: boolean, save_count: number } }

2. Add safe DB support/migration for:
- likes table with user_id, target_id, target_type
- saves table with user_id, business_id

3. Update src/api.ts businessesApi:
- add like(id)
- add save(id)
- remove CATEGORY_DB_MAP use from list filters.
- send normalized category IDs directly, not translated display labels like Restaurants or Cafés & Bakeries.

4. Update src/App.tsx:
- handleToggleLike calls businessesApi.like.
- handleToggleSave calls businessesApi.save.
- Use optimistic UI with rollback on failure.
- Use backend returned boolean/count to correct UI.
- Remove local-only TODO.

5. Update src/components/AdminPanel.tsx:
- toggleBusinessVerification calls businessesApi.update(businessId, { is_verified: nextValue ? 1 : 0 }).
- Roll back UI if backend fails.
- Show error message if backend fails.

MUST-HAVE 4 — REMOVE FAKE SUCCESS POST CREATION

Problem:
Admin post creation currently builds an optimistic local post with a local-post-* id.

Required fix:
- In src/components/AdminPanel.tsx, remove fake/local fallback success.
- Admin post creation must call backend postsApi.create.
- If backend fails, show error and do not mutate posts.
- If backend succeeds, use returned backend post data or refetch posts.
- No fake success for public shipping.

MUST-HAVE 5 — CLEAN PUBLIC TEXT MOJIBAKE

Problem:
Visible mojibake exists, including Arabic/Kurdish strings.

Required fix:
- Search src/**/*.{ts,tsx} for:
  Ø
  Ù
  Û
  Ú
  Ã
  ΓÇ
  ├
- Replace visible UI strings with valid Arabic/Kurdish/English.
- At minimum fix timeAgo in src/App.tsx to:
  ar: 'الآن'
  ku: 'ئێستا'
  en: 'Just now'

MUST-HAVE 6 — UPDATE STALE DOCS ONLY IF PRESENT

Required fix:
- Update BACKEND_REQUIRED_FIXES.md so it does not say repo is frontend-only.
- State that Worker backend exists.
- State completed public-shipping areas:
  - hero contract
  - business submissions
  - persistent business like/save
  - admin verification persistence
  - fake-success removal
  - mojibake cleanup

VALIDATION:
Run:
1. npm run check
2. npm run build
3. git diff --name-only
4. git status --short

Do not deploy.

ACCEPTANCE CRITERIA:
- npm run check passes.
- npm run build passes.
- Hero slides persist to D1 and map correctly to frontend HeroSlide.
- Business submission approve returns full business object and does not duplicate on repeated approval.
- Business submission delete endpoint exists and AdminPanel uses it.
- Business like/save persists through backend.
- Admin business verification persists through backend.
- Admin post creation does not fake success.
- Category filters use normalized IDs, not translated display labels.
- Visible mojibake in public UI is fixed.
- No secrets are hardcoded.
- No unrelated features are added.

FINAL RESPONSE FORMAT:
Report:
- Files changed
- Migration added
- Must-haves fixed
- Commands run
- Check/build result
- Anything still not fixed
