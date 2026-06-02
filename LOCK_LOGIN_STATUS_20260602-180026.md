# LOCK LOGIN STATUS

Created: 20260602-180026

## Purpose
Freeze the current working login state so later work does not break auth.

## Current stable auth files
- src/api.ts
- src/components/AuthModal.tsx
- src/contexts/AuthContext.tsx

## Locked truths
- Public app: https://shakumaku.pages.dev
- Backend: https://shaku-maku.mahdialmuntadhar1.workers.dev
- Admin email: safaribosafar@gmail.com

## Freeze rules
- Do not rewrite auth unless auth work is explicitly intended.
- Before any future deploy, test:
  - login
  - register
  - forgot password
- Content/UI/filter work should avoid auth files unless necessary.

## Local backup
.\freeze-login-20260602-180026

## Suggested git rollback tag
stable-login-20260602-180026
