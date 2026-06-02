# LOCK STATUS

This checkpoint locks the current working level.

## Bulk messaging

Status:
WORKING

Correct Nabda send format:
POST https://api.nabdaotp.com/api/v1/messages/send

Header:
Authorization: raw API key only

Do not use:
Bearer

Body:
{
  "phone": "+964...",
  "message": "..."
}

Local dashboard:
nabda-local-dashboard

Start:
START-DASHBOARD.bat

Open:
http://localhost:8787

## Main application

Current known status:
- Frontend live
- Backend live
- Backend health connected to database
- Businesses endpoint returns real data

Still pending:
- Auth/login/register/logout/reset password
- Admin role for safaribosafar@gmail.com
- Admin edit sections
- Social feed
- Category images
- Governorate/category filters

## Next priority

Do not touch Nabda API again.
Next work should be:
1. Auth and admin
2. Social feed
3. Business data loading
4. Category images
5. Filters
