# Deployment guide

This repo should be deployed with a single, explicit setup:

- **Frontend**: Cloudflare Pages
- **API**: external API configured through `VITE_API_URL`
- **Admin configuration**: `VITE_ADMIN_EMAILS`
- **Production auth fallback**: disabled

## 1. Prepare environment variables

Set these in your Cloudflare Pages project:

- `VITE_API_URL`
- `VITE_ADMIN_EMAILS`
- `VITE_ALLOW_LOCAL_AUTH_FALLBACK=false`

Do **not** expose server-only variables such as `NABDA_API_KEY` in frontend runtime config.

## 2. Build configuration

- Framework preset: `Vite`
- Build command: `npm run build`
- Output directory: `dist`
- Node.js: `20+`

## 3. Before you deploy

Run locally:

```bash
npm install
npm run check
npm run build
```

## 4. Recommended production behavior

- Service worker enabled
- Manifest served from `/public`
- Frontend talks only to the configured API URL
- No local auth fallback unless explicitly enabled
- Backend remains the source of truth for permissions

## 5. Post-deploy smoke test

- App loads without console errors
- Auth works against the intended backend
- Business and post feeds load
- PWA install prompt appears on supported devices
- Offline shell fallback works after first load
