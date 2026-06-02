# Shaku Maku Lock Status

Date: 20260602-160802

## Locked working state

### Bulk WhatsApp / Nabda

- Nabda API sending confirmed working.
- Correct endpoint:
  https://api.nabdaotp.com/api/v1/messages/send
- Correct authorization:
  Authorization: API_KEY
- Important: Do not use Bearer before the API key.
- Body:
  {
    "phone": "+964XXXXXXXXXX",
    "message": "message text"
  }

### Local dashboard

- Local dashboard folder:
  nabda-local-dashboard
- Start file:
  START-DASHBOARD.bat
- Local URL:
  http://localhost:8787
- Features:
  - Manual phone list
  - CSV by governorate
  - Preview
  - Deduplication
  - Iraqi phone normalization to +964
  - Test my number
  - Bulk send
  - Export report CSV

### Main application

Current known status:

- Frontend live.
- Backend live.
- Backend health confirms database connected.
- Businesses API returns real data.
- Auth/login/admin still needs final fix/verification.
- Social feed still needs admin edit and design/content improvement.
- Business category images still need better category-specific logic.
- Governorate/category filtering still needs final verification.

## Next work should start from here

Recommended next priorities:

1. Fix and verify auth/login/register/logout/password reset.
2. Make safaribosafar@gmail.com admin in the database.
3. Admin can edit hero, sales section, social feed, and content sections.
4. Social feed should look real and beautiful.
5. Business cards should load backend data reliably.
6. Category images should match each category.
7. Governorate/category filters should work correctly.

## Security note

Nabda API key/password were exposed during testing.
Rotate Nabda password and API key after finishing this checkpoint.
