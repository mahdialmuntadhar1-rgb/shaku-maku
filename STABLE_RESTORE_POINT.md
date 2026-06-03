# Stable Checkpoint: Shaku Maku Error-Free Version

Date: 2026-06-03 19:58:21

This checkpoint is the stable version where:

- Database loads successfully.
- Arabic/Kurdish text distortion is fixed.
- Red live database error is gone.
- Grey loaded-businesses developer notification should be removed.
- Global glow/background bug is disabled.
- One install button remains.
- safaribosafar@gmail.com is treated as admin.
- Hero section supports inline admin editing, upload, add slide, delete slide.

Important:
Hero uploaded photos currently save to browser localStorage, not database.
For permanent shared uploads, add backend storage using Cloudflare R2/D1 later.

Restore command:
git fetch --all --tags
git reset --hard stable-shaku-maku-error-free-2026-06-03
npm install
npm run build
npm run dev
