# DO NOT CONFUSE THIS API AGAIN

This file is the locked truth for Shaku Maku / Nabda bulk messaging.

## CONFIRMED WORKING NABDA SEND API

POST:
https://api.nabdaotp.com/api/v1/messages/send

Headers:
Authorization: API_KEY_HERE
Content-Type: application/json
Accept: application/json

IMPORTANT:
Do NOT use Bearer.

WRONG:
Authorization: Bearer sk_xxxxx

CORRECT:
Authorization: sk_xxxxx

Body:
{
  "phone": "+9647704413300",
  "message": "message text"
}

Phone numbers must be normalized to:
+964XXXXXXXXXX

## WHAT WE CONFIRMED

PowerShell test worked:
HTTP 200
Message sent successfully

The local browser dashboard also worked and the message was received.

## WHAT FAILED BEFORE

Do not use these again:

https://api.nabdaotp.com/inst/INSTANCE_ID/messages/send
https://api.nabdaotp.com/messages/send
Authorization: Bearer API_KEY
Login token for message sending
Instance token for message sending

Login and select-instance worked, but send failed with 401 when using tokens.

The correct bulk send uses the raw API key directly in Authorization.

## LOCAL BULK DASHBOARD

Folder:
nabda-local-dashboard

Start file:
START-DASHBOARD.bat

Local URL:
http://localhost:8787

Important:
Keep the black command window open while using the dashboard.
If the black window closes, the dashboard stops.

Dashboard features:
- Manual phone list
- CSV by governorate
- Preview
- Deduplicate numbers
- Normalize Iraqi numbers to +964
- Test my number
- Bulk send
- Export report CSV

## MAIN SHAKU MAKU LINKS

Frontend:
https://shakumaku.pages.dev/

Backend:
https://shaku-maku.mahdialmuntadhar1.workers.dev/

Backend health:
https://shaku-maku.mahdialmuntadhar1.workers.dev/health

Businesses API:
https://shaku-maku.mahdialmuntadhar1.workers.dev/api/businesses?page=1&limit=10

## CURRENT MAIN APP STATUS

Working:
- Frontend live
- Backend live
- Backend database connected
- Businesses API returns real data
- Nabda bulk dashboard works

Still needs work:
- Auth/login/register/logout/password reset final verification
- Make safaribosafar@gmail.com admin
- Admin edit access for hero section
- Admin edit access for sales section
- Admin edit access for social feed
- Admin edit access for content sections
- Social feed design and population
- Business category-specific images
- Governorate/category filtering final verification

## INSTRUCTION FOR ANY AI OR DEVELOPER

Before changing anything, read this file.

Do not rediscover the Nabda API.
Do not change the working Nabda bulk sender unless intentionally improving it.
Do not confuse the Shaku Maku backend API with the Nabda WhatsApp API.

They are separate systems.

## SECURITY NOTE

The old Nabda API key and password were exposed during testing.
Rotate Nabda API key and password.
Never commit the real API key to GitHub.
