# Shaku Maku

Shaku Maku is a multilingual React + Vite app for discovering Iraqi businesses, browsing community posts, and managing lightweight owner/admin workflows.

## What this repo contains

- A Vite + React frontend
- Typed domain models for businesses, posts, users, claims, and hero slides
- Local auth/session helpers
- API integration through `VITE_API_URL`
- Firestore rules and security notes
- Helper scripts for WhatsApp bulk messaging and webhook handling

## Recommended architecture

This repository contains both:
- a React frontend (`src/`)
- a Cloudflare Worker API (`worker/`)

### Frontend
- React 19
- TypeScript
- Vite
- Tailwind CSS

### Backend
- Worker source: `worker/index.ts` and `worker/routes/*`
- Wrangler config: `wrangler.toml`
- Frontend API target: `VITE_API_URL` (must point to the deployed Worker origin, not `/api`)

## Getting started

### Prerequisites
- Node.js 20+
- npm 10+

### Install
```bash
npm install
```

### Configure environment variables
Copy the example file and fill in the values you actually use:

```bash
cp .env.example .env.local
```

Required frontend variables:

- `VITE_API_URL` (example: `https://shaku-maku.mahdialmuntadhar1.workers.dev`)
- `VITE_ADMIN_EMAILS` (example: `mahdialmuntadhar1@gmail.com`)

Optional:
- `VITE_ALLOW_LOCAL_AUTH_FALLBACK=false` (dev-only, ignored in production)
- server-only Nabda / WhatsApp variables for local scripts

### Run locally
```bash
npm run dev
```

### Quality checks
```bash
npm run check
```

## Scripts

- `npm run dev` â€” start Vite dev server
- `npm run build` â€” production build
- `npm run preview` â€” preview production build locally
- `npm run typecheck` â€” TypeScript validation
- `npm run lint` â€” ESLint
- `npm run test` â€” Vitest
- `npm run check` â€” typecheck + lint + test
- `npm run whatsapp:bulk` â€” bulk WhatsApp sender
- `npm run whatsapp:webhook` â€” webhook receiver
- `npm run whatsapp:server` â€” local WhatsApp server

## Deployment

The deployment target is:

- **Frontend**: Cloudflare Pages (`shakumaku.pages.dev`)
- **API**: Cloudflare Worker (`shaku-maku.mahdialmuntadhar1.workers.dev`)
- **Legacy frontend host**: `shaku-maku.mahdialmuntadhar1.workers.dev` (do not use as API base)

See [`deployment-steps.md`](./deployment-steps.md) for the cleaned-up deployment path.

Minimal deploy commands:

```bash
npm run deploy:worker
npm run deploy:pages
```

Important: Pages must deploy `dist/` output. If Pages serves `/src/main.tsx`, build config is wrong.

## Security notes

- Do not expose `NABDA_API_KEY` in frontend code.
- Do not hardcode admin emails in source files.
- Local auth fallback is only allowed in local development when explicitly enabled.
- Treat frontend role checks as UX only; backend authorization must remain authoritative.

## Repository cleanup applied in this fix pack

- Replaced the generic AI Studio README
- Renamed package metadata to match the project
- Added linting, testing, and CI
- Added service worker registration and a basic offline cache
- Removed hardcoded admin emails from session logic
- Disabled local auth fallback in production by default
- Expanded `.gitignore` for generated reports and editor artifacts

## Still recommended after applying this pack

- Split `src/App.tsx` into hooks and feature modules
- Wire likes, saves, profile updates, and business creation to real backend endpoints
- Remove already-committed generated report files from git history if they are not meant to stay in the repo
