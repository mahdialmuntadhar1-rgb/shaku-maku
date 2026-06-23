# D1 Owner ID Finalization Report

## Stack

Shaku Maku uses Cloudflare for this project:

- Frontend: Cloudflare Workers / Pages
- Backend: Cloudflare Worker
- Database: Cloudflare D1

Supabase was cancelled as the wrong stack for this project. No Supabase migrations, Postgres SQL, RLS policies, or Supabase SQL Editor workflow should be used.

## Local Findings

Cloudflare D1 is configured in `wrangler.toml`:

- D1 binding: `DB`
- D1 database name: `shaku_maku_db`
- D1 database id: `6e1cf3c7-0b05-4e85-bae8-83e96044a864`

The local schema file `migrations/20260616_mvp_public_compat.sql` defines `businesses.owner_id` as a nullable `TEXT` column.

Local Worker code expects `businesses.owner_id`:

- `worker/routes/businesses.ts` inserts `owner_id` when creating businesses.
- `worker/routes/submissions.ts` inserts `owner_id` when approving a business submission.
- `worker/routes/admin.ts` updates `businesses.owner_id` when approving a claim.
- `worker/routes/users.ts` counts businesses by `owner_id`.

Local code uses D1 through `c.env.DB.prepare(...)`.

## Live D1 Status

Live remote D1 was inspected read-only against `shaku_maku_db`.

Wrangler reported `0 rows written` for the read-only inspection.

The live `businesses` table already has:

- `owner_id TEXT`
- `phone_number TEXT`

The live `posts` table already has:

- `business_id TEXT NOT NULL`

The live D1 database also has `idx_businesses_owner_id`.

No owner_id migration is needed.

## Migration Decision Rule

Live D1 already has `businesses.owner_id`, so do not create or run a new migration.

If live D1 is missing `businesses.owner_id`, create and review a SQLite-safe D1 migration that only adds a nullable column and an index, with no data deletion or data modification.
