# Nabda OTP Bulk WhatsApp Messaging

This project uses a local/server-side Node script for Nabda WhatsApp sends. Do not put `NABDA_API_KEY` in React, Vite, HTML, or any browser code.

Nabda docs: https://api.nabdaotp.com/docs

## Environment

Create `.env.local` or set these variables in your shell:

```env
NABDA_API_URL="https://api.nabdaotp.com/inst/4b56a3b6-72e3-4ee5-94ec-c1758bef8b98"
NABDA_API_KEY="YOUR_ROTATED_NABDA_API_KEY"
NABDA_SEND_PATH="/api/v1/messages/send"
NABDA_AUTH_PREFIX=""
NABDA_MAX_MESSAGE_LENGTH="255"
```

The documented send endpoint is `POST /api/v1/messages/send` with:

```json
{
  "phone": "+9647700000000",
  "message": "Hello from Shaku Maku"
}
```

The docs define `Authorization` as an API-key header. If Nabda support tells you to use a bearer token instead, set:

```env
NABDA_AUTH_PREFIX="Bearer "
```

Rotate any API key that was pasted into chat, screenshots, or client-side files.

## Compliance

Use this only for contacts who opted in to WhatsApp messages. The script:

- defaults to dry-run mode
- requires `--send` for real messages
- deduplicates phone numbers per campaign
- throttles sends with `delayMs`
- retries failed sends up to 2 times
- adds `Reply STOP to opt out.` unless the message already includes stop/unsubscribe/opt-out wording
- writes a JSON result report

## Direct Recipients

Dry run:

```powershell
npm run whatsapp:bulk -- --recipients "07704413300,+9647704413300,9647704413300" --message "Hello from Shaku Maku" --campaignName "test-dry-run" --dry-run
```

Real send:

```powershell
npm run whatsapp:bulk -- --recipients "+9647704413300" --message "Hello from Shaku Maku" --campaignName "single-test" --delayMs 3000 --send
```

Do not run the real-send command until the recipient has opted in and you are ready to send.

## JSON Campaign

```json
{
  "campaignName": "june-directory-update",
  "source": "admin-panel",
  "dryRun": true,
  "delayMs": 2500,
  "batchSize": 1,
  "tags": ["directory", "june"],
  "message": "Hello {{name}}, your business {{businessName}} is listed on Shaku Maku.",
  "variables": {
    "language": "ar"
  },
  "recipients": [
    {
      "phone": "07704413300",
      "name": "Customer",
      "businessName": "Example Business",
      "language": "ar"
    }
  ]
}
```

Run it:

```powershell
npm run whatsapp:bulk -- --input campaign.json --dry-run
```

## CSV Campaign

Supported columns:

```csv
phone,name,businessName,language,message
07704413300,Customer,Example Business,ar,Hello {{name}}, your business {{businessName}} is listed on Shaku Maku.
```

If the `message` column is present, it is used for that recipient. Otherwise the global `--message` value is used:

```powershell
npm run whatsapp:bulk -- --input contacts.csv --message "Hello {{name}} from Shaku Maku" --dry-run
```

## Phone Normalization

Accepted Iraqi mobile formats include:

- `07704413300`
- `9647704413300`
- `+9647704413300`
- `7704413300`

The script normalizes them to `+9647XXXXXXXXX` and rejects invalid values with clear report entries.

## Webhook Receiver

Local development receiver:

```powershell
npm run whatsapp:webhook
```

Endpoint:

```text
POST http://localhost:8787/webhooks/nabda
```

Supported events:

- `message.sent`
- `message.received`
- `message.ack`

For production Nabda webhooks, use a public HTTPS URL. Localhost only works through a secure tunnel or deployed backend.

## HTML Dashboard With Live Send

The upgraded dashboard is stored at:

```text
C:\Users\HB LAPTOP STORE\Documents\bulk-message-claudeai-scriptholly\nabda_whatsapp_bulk_platform_upgraded.html
```

It does not expose `NABDA_API_KEY`. For live sends, start the secure local backend first:

```powershell
cd "C:\Users\HB LAPTOP STORE\Documents\puython-pro-scraper\shaku-maku"
npm run whatsapp:server
```

Backend endpoints:

```text
GET  http://localhost:5050/api/whatsapp/health
POST http://localhost:5050/api/whatsapp/dry-run
POST http://localhost:5050/api/whatsapp/test-send
POST http://localhost:5050/api/whatsapp/bulk-send
```

Required live-send environment:

```env
NABDA_API_URL="https://api.nabdaotp.com/inst/4b56a3b6-72e3-4ee5-94ec-c1758bef8b98"
NABDA_API_KEY="YOUR_ROTATED_NABDA_API_KEY"
NABDA_INSTANCE_ID="4b56a3b6-72e3-4ee5-94ec-c1758bef8b98"
NABDA_SEND_PATH="/api/v1/messages/send"
WHATSAPP_DAILY_LIMIT="200"
WHATSAPP_MAX_BATCH_SIZE="50"
WHATSAPP_DEFAULT_DELAY_SECONDS="5"
```

Dashboard CSV columns:

```csv
phone_number,business_name,contact_name,governorate,city,category,language,opt_in,notes
+9647701234567,Example Business,Ali,Baghdad,Baghdad,Restaurants,en,yes,opted-in
```

Live sending rules enforced by the backend:

- `NABDA_API_KEY` must exist server-side
- dry-run must be passed before live send
- `opt_in` must be `true`, `yes`, or `1`
- invalid, padded, short, duplicate, or unsupported-prefix numbers are skipped
- `WHATSAPP_DAILY_LIMIT` and `WHATSAPP_MAX_BATCH_SIZE` are enforced
- messages are sent through Nabda one at a time with delay
- result reports are saved in the repo `reports` folder
