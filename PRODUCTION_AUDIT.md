# Shaku Maku Production Notes

## Canonical Deployments

- Frontend: `https://shaku-makut.pages.dev`
- Backend/API: `https://shaku-maku.mahdialmuntadhar1.workers.dev`

## Required Cloudflare Pages Variables

- `VITE_API_URL=https://shaku-maku.mahdialmuntadhar1.workers.dev`
- `VITE_ADMIN_EMAILS=safaribosafar@gmail.com`

## Required Worker Behavior

The Worker must return JSON, not the frontend HTML shell, for:

- `GET /businesses`
- `GET /businesses/:id`
- `POST /businesses`
- `GET /posts`
- `POST /posts`
- `PUT /posts/:id`
- `DELETE /posts/:id`
- `POST /auth/login`
- `POST /auth/register`
- `POST /auth/request-reset`
- `POST /auth/reset-password`

The Worker must answer CORS preflight requests for the Pages origin:

- `Access-Control-Allow-Origin: https://shaku-makut.pages.dev`
- `Access-Control-Allow-Methods: GET,POST,PATCH,DELETE,OPTIONS`
- `Access-Control-Allow-Headers: Content-Type,Authorization`

Admin-only mutations must be authorized server-side from a verified session/JWT email claim. Never trust an `adminEmail` request body from the browser.

## Required Worker Secret

- `JWT_SECRET`: at least 32 characters. Set it with:

```bash
npx wrangler secret put JWT_SECRET
```

## Worker Deployment

```bash
npm install
npx wrangler deploy
```

If Wrangler cannot discover the Cloudflare account from the installed token, set one of:

```bash
$env:CLOUDFLARE_ACCOUNT_ID="your-account-id"
```

or add `account_id = "your-account-id"` to `wrangler.toml`.

## Local Verification

```bash
npm install
npm run build
npm run lint
```
