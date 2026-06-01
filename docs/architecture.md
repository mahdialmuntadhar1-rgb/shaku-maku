# Architecture

## Summary

Shaku Maku is a frontend-first application that renders business discovery, social feed, and lightweight admin flows. It uses an external API for data and session-backed auth state in the browser.

## Current layers

### UI
- React
- Vite
- Tailwind CSS
- Lucide icons
- Motion

### Domain
- `src/types.ts` defines business, post, user, claim, and hero-slide types

### Data access
- `src/api.ts` centralizes Axios config and API helpers
- Backend base URL is normalized from `VITE_API_URL`

### Auth and authorization
- `src/auth/session.ts` owns session normalization and persistence
- `src/contexts/AuthContext.tsx` owns current-user state
- `src/contexts/AdminContext.tsx` derives admin capability from the current session

## Recommended boundaries

Frontend responsibilities:
- rendering
- local UI state
- optimistic UX
- session persistence
- localization
- PWA shell

Backend responsibilities:
- authentication
- authorization
- data validation
- writes for likes, saves, profile updates, and business creation
- admin-only actions

## Refactor target for `App.tsx`

The app shell should be split into feature hooks:

- `useDocumentLanguage`
- `useBusinesses`
- `usePosts`
- `useStoryPlayer`
- `useDiscoveryFilters`

The current `App.tsx` is a good candidate for extraction, but it should be refactored with the local source checked out so the JSX can be preserved safely.
