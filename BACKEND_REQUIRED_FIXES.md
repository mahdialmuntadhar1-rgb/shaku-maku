# Backend Required Fixes (External Cloudflare Worker API)

This repository is frontend-only. Frontend admin checks are UX guards, not security boundaries.

## Required backend security work

1. Add server-side token/session verification for write routes.
2. Add `requireAdmin` middleware using verified user email.
3. Admin allowlist must include:
   - `safaribosafar@gmail.com`
4. Return consistent JSON errors:
   - `401 { "success": false, "error": "Authentication required" }`
   - `403 { "success": false, "error": "Admin authorization required" }`
5. Never trust `adminEmail` from request body/query/header.

## Routes that must be protected server-side

- `POST /api/businesses`
- `PUT /api/businesses/:id`
- `PATCH /api/businesses/:id`
- `DELETE /api/businesses/:id`
- `POST /api/posts`
- `PUT /api/posts/:id`
- `PATCH /api/posts/:id`
- `DELETE /api/posts/:id`
- Any hero/header/media write endpoints

## Public read routes (remain open)

- `GET /api/businesses`
- `GET /api/businesses/:id`
- `GET /api/posts`
- `GET /api/feed/business-posts`
- Public hero/header read endpoints

## Filtering support required in backend

Both businesses and posts APIs must correctly support:

- `governorate`
- `category`
- `page`
- `limit`
- `search`

`governorate + category` must be applied together.

## Environment variables expected in backend

- `ADMIN_EMAILS=safaribosafar@gmail.com`
- `JWT_SECRET=...`
- `AUTH_SECRET=...` (if your stack requires it)

## Worker patch plan (Hono style)

1. Parse `Authorization: Bearer <token>`.
2. Verify JWT/session using server secret.
3. Extract and lowercase user email.
4. `requireAuth` => 401 on missing/invalid session.
5. `requireAdmin` => 403 if user email not in `ADMIN_EMAILS`.
6. Apply middleware on all write routes listed above.

