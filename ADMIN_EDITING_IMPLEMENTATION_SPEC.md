# Shaku Maku Admin Editing System — Implementation Spec

Created: 20260602-163833

## Goal

Create an easy admin editing system for the live app.

The user wants:

- If admin is logged in, they can double-click sections to edit them.
- Hero section should be editable.
- Sales/promotional section should be editable.
- Social feed should be editable.
- Admin can add, edit, hide, delete social posts.
- Admin can replace images.
- Business and social feed should filter by governorate.
- Business cards are currently good/loading, so do not break them.
- Keep Nabda API untouched. It is already solved.

## Admin email

safaribosafar@gmail.com must be platform admin.

Admin should be checked from backend/database, not only frontend text.

## Required UX

When admin logs in:

1. Show a small floating button:
   Admin Edit Mode ON/OFF

2. When edit mode is ON:
   - Hero section shows edit outline.
   - Double-click hero section opens edit modal.
   - Double-click image opens image replace modal.
   - Double-click sales section opens edit modal.
   - Social feed post has Edit / Hide / Delete buttons.
   - Add New Post button appears above social feed.

3. For image replacement:
   Easiest version:
   - Admin pastes an image URL.
   Better future version:
   - Upload image to Cloudflare R2.

4. For social feed:
   Fields:
   - governorate
   - category
   - language
   - business_name
   - title
   - body
   - image_url
   - likes_count
   - comments_count
   - is_active
   - is_featured

## Governorate filter behavior

There should be one shared governorate selection.

When user selects a governorate:

- Business cards show only that governorate.
- Social feed shows only posts from that governorate.
- If ALL selected, show all.

Important:
Do not show Baghdad social feed if user selected Erbil.
Do not show Erbil businesses if user selected Basra.

## Backend endpoints needed

Create or verify these endpoints:

### CMS sections

GET /api/cms/sections
GET /api/cms/sections/:sectionKey
PUT /api/cms/sections/:sectionKey

### Social feed

GET /api/social-feed?governorate=Baghdad&category=restaurants
POST /api/social-feed
PUT /api/social-feed/:id
DELETE /api/social-feed/:id

### Admin

GET /api/auth/me
GET /api/admin/me

Admin response should include:
{
  "email": "safaribosafar@gmail.com",
  "role": "platform_admin",
  "canEditContent": true,
  "canEditSocialFeed": true,
  "canEditBusinesses": true
}

## Database tables created

Migration file:
migrations/20260602_admin_editing_social_feed.sql

Tables:
- admin_users
- cms_sections
- social_feed_posts

## Frontend components to create

Create:

src/components/admin/AdminEditMode.tsx
src/components/admin/EditSectionModal.tsx
src/components/admin/SocialFeedEditor.tsx
src/components/admin/ImageReplaceModal.tsx

Or adapt existing structure if different.

## Frontend behavior

- Fetch cms_sections from backend.
- Use CMS data for hero and sales sections.
- If CMS data missing, fallback to current hardcoded content.
- Fetch social_feed_posts from backend.
- Filter posts by selected governorate.
- Admin editing should not appear for normal users.
- Business loading must not be broken.

## Do not touch

Do not touch the working Nabda dashboard/API.

Confirmed Nabda send API:

POST https://api.nabdaotp.com/api/v1/messages/send

Header:
Authorization: raw API key only

No Bearer.

## Acceptance checklist

- safaribosafar@gmail.com logs in and sees Platform Admin.
- Admin can toggle edit mode.
- Admin can double-click hero and edit text.
- Admin can replace hero image URL.
- Admin can add social feed post.
- Admin can edit social feed post.
- Admin can hide/delete social feed post.
- Governorate filter controls both businesses and social feed.
- Normal user cannot edit.
- Business cards still load.
- Build passes.
- Deploy succeeds.
