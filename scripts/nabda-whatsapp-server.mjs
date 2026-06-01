import 'dotenv/config';
import express from 'express';
import fs from 'node:fs/promises';
import path from 'node:path';

const app = express();
const port = Number(process.env.WHATSAPP_SERVER_PORT || 5050);
const dailyLimit = Number(process.env.WHATSAPP_DAILY_LIMIT || 200);
const maxBatchSize = Number(process.env.WHATSAPP_MAX_BATCH_SIZE || 50);
const defaultDelaySeconds = Number(process.env.WHATSAPP_DEFAULT_DELAY_SECONDS || 5);
const maxMessageLength = Number(process.env.NABDA_MAX_MESSAGE_LENGTH || 255);
const maxRetries = 2;
const allowedPrefixes = new Set(['750', '751', '770', '771', '772', '773', '774', '780', '781', '782', '783', '790', '791', '792', '793']);
const consentFooter = '\n\nReply STOP to opt out.';

let usageDate = new Date().toISOString().slice(0, 10);
let sentToday = 0;

app.use(express.json({ limit: '5mb' }));
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.sendStatus(204);
  return next();
});
app.use(express.static(process.cwd()));

function resetUsageIfNeeded() {
  const today = new Date().toISOString().slice(0, 10);
  if (today !== usageDate) {
    usageDate = today;
    sentToday = 0;
  }
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function normalizeText(value) {
  return String(value || '').trim();
}

function normalizeKey(value) {
  return normalizeText(value).toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, '');
}

function parseOptIn(value) {
  return ['true', 'yes', 'y', '1', 'opt_in', 'opt-in'].includes(normalizeText(value).toLowerCase());
}

function normalizePhone(rawPhone) {
  const original = normalizeText(rawPhone);
  if (!original) return { ok: false, original, error: 'Missing phone number' };

  let digits = original.replace(/[^\d+]/g, '');
  if (digits.startsWith('00')) digits = `+${digits.slice(2)}`;

  if (digits.includes('0000000') || /(\d)\1{6,}/.test(digits)) {
    return { ok: false, original, normalized: digits, error: 'Rejected padded or low-variety number' };
  }

  if (digits.startsWith('+964')) {
    digits = `+964${digits.slice(4).replace(/^0+/, '')}`;
  } else if (digits.startsWith('964')) {
    digits = `+964${digits.slice(3).replace(/^0+/, '')}`;
  } else if (digits.startsWith('0')) {
    digits = `+964${digits.slice(1)}`;
  } else if (/^7\d{9}$/.test(digits)) {
    digits = `+964${digits}`;
  } else if (!digits.startsWith('+')) {
    return { ok: false, original, normalized: digits, error: 'Unsupported format' };
  }

  if (!/^\+9647\d{9}$/.test(digits)) {
    return { ok: false, original, normalized: digits, error: 'Invalid Iraqi mobile. Expected +9647XXXXXXXXX' };
  }

  const prefix = digits.slice(4, 7);
  if (!allowedPrefixes.has(prefix)) {
    return { ok: false, original, normalized: digits, error: `Unsupported Iraqi mobile prefix ${prefix}` };
  }

  return { ok: true, original, normalized: digits };
}

function fallbackName(language) {
  const lang = normalizeText(language).toLowerCase();
  if (lang === 'ar') return 'عزيزنا';
  if (lang === 'ku') return 'بەڕێز';
  return 'Dear customer';
}

function renderTemplate(template, recipient) {
  const variables = {
    business_name: recipient.business_name || fallbackName(recipient.language),
    contact_name: recipient.contact_name || fallbackName(recipient.language),
    governorate: recipient.governorate || '',
    city: recipient.city || '',
    category: recipient.category || '',
    language: recipient.language || ''
  };

  return normalizeText(template).replace(/\{\{\s*([\w.]+)\s*\}\}/g, (_, key) => {
    const normalizedKey = normalizeKey(key);
    return variables[normalizedKey] ?? '';
  });
}

function ensureConsentFooter(message) {
  if (/stop|unsubscribe|opt out/i.test(message)) return message;
  return `${message}${consentFooter}`;
}

function normalizeRecipient(input) {
  return {
    phone_number: input.phone_number || input.phone || input.mobile || input.whatsapp || '',
    business_name: input.business_name || input.businessName || input.name || '',
    contact_name: input.contact_name || input.contactName || '',
    governorate: input.governorate || '',
    city: input.city || '',
    category: input.category || '',
    language: input.language || 'en',
    opt_in: input.opt_in ?? input.optIn ?? input.opted_in ?? false,
    notes: input.notes || '',
    message: input.message || ''
  };
}

function applyFilters(recipients, filters = {}) {
  const governorates = new Set((filters.governorates || []).map(normalizeKey).filter(Boolean));
  const categories = new Set((filters.categories || []).map(normalizeKey).filter(Boolean));

  return recipients.filter((recipient) => {
    const govOk = governorates.size === 0 || governorates.has('all') || governorates.has(normalizeKey(recipient.governorate));
    const categoryOk = categories.size === 0 || categories.has('all') || categories.has(normalizeKey(recipient.category));
    return govOk && categoryOk;
  });
}

function validateCampaign(body, { requireOptIn = true } = {}) {
  const campaignName = normalizeText(body.campaignName) || 'bulk-whatsapp-campaign';
  const source = normalizeText(body.source) || 'dashboard';
  const globalMessage = normalizeText(body.message);
  const maxRecipients = Math.max(0, Number(body.maxRecipients || 0));
  const requestedBatchSize = Math.max(1, Number(body.batchSize || 1));
  const batchSize = Math.min(requestedBatchSize, maxBatchSize);
  const requestedDelayMs = Number(body.delayMs || defaultDelaySeconds * 1000);
  const delayMs = Math.max(requestedDelayMs, defaultDelaySeconds * 1000);
  const rawRecipients = Array.isArray(body.recipients) ? body.recipients.map(normalizeRecipient) : [];
  const filteredRecipients = applyFilters(rawRecipients, body.filters || {});
  const limitedRecipients = maxRecipients > 0 ? filteredRecipients.slice(0, maxRecipients) : filteredRecipients;
  const seen = new Set();
  const valid = [];
  const skipped = [];
  let duplicates = 0;

  if (!globalMessage && !limitedRecipients.some((recipient) => normalizeText(recipient.message))) {
    throw Object.assign(new Error('Message is required'), { statusCode: 400 });
  }

  for (const recipient of limitedRecipients) {
    const phone = normalizePhone(recipient.phone_number);
    if (!phone.ok) {
      skipped.push({ phone: recipient.phone_number, status: 'skipped', error: phone.error });
      continue;
    }

    if (seen.has(phone.normalized)) {
      duplicates += 1;
      skipped.push({ phone: phone.normalized, status: 'skipped', error: 'Duplicate in campaign' });
      continue;
    }
    seen.add(phone.normalized);

    if (requireOptIn && !parseOptIn(recipient.opt_in)) {
      skipped.push({ phone: phone.normalized, status: 'skipped', error: 'Recipient is not opted in' });
      continue;
    }

    const message = ensureConsentFooter(renderTemplate(recipient.message || globalMessage, recipient));
    if (!message.trim()) {
      skipped.push({ phone: phone.normalized, status: 'skipped', error: 'Empty personalized message' });
      continue;
    }

    if (message.length > maxMessageLength) {
      skipped.push({ phone: phone.normalized, status: 'skipped', error: `Message exceeds ${maxMessageLength} characters` });
      continue;
    }

    valid.push({ ...recipient, phone: phone.normalized, message });
  }

  return {
    campaignName,
    source,
    totalInput: rawRecipients.length,
    filtered: filteredRecipients.length,
    total: limitedRecipients.length,
    valid,
    skipped,
    duplicates,
    delayMs,
    batchSize
  };
}

function buildNabdaEndpoint() {
  const apiUrl = process.env.NABDA_API_URL?.replace(/\/+$/, '');
  const sendPath = process.env.NABDA_SEND_PATH || '/api/v1/messages/send';
  if (!apiUrl) throw Object.assign(new Error('NABDA_API_URL is missing'), { statusCode: 500 });
  return `${apiUrl}${sendPath.startsWith('/') ? sendPath : `/${sendPath}`}`;
}

function readApiKey() {
  const apiKey = process.env.NABDA_API_KEY;
  if (!apiKey) throw Object.assign(new Error('NABDA_API_KEY is missing'), { statusCode: 500 });
  return apiKey;
}

function extractMessageId(body) {
  return body?.messageId || body?.id || body?.data?.messageId || body?.data?.id || body?.payload?.messageId;
}

async function sendToNabda(endpoint, apiKey, payload) {
  let lastError;

  for (let attempt = 0; attempt <= maxRetries; attempt += 1) {
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          Authorization: `${process.env.NABDA_AUTH_PREFIX || ''}${apiKey}`,
          'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify(payload)
      });
      const text = await response.text();
      let body;
      try {
        body = text ? JSON.parse(text) : {};
      } catch {
        body = { raw: text };
      }
      if (!response.ok) throw new Error(`HTTP ${response.status}: ${JSON.stringify(body)}`);
      return { ok: true, status: response.status, body, messageId: extractMessageId(body), attempts: attempt + 1 };
    } catch (error) {
      lastError = error;
      if (attempt < maxRetries) await sleep(1000 * (attempt + 1));
    }
  }

  return { ok: false, error: lastError?.message || 'Unknown Nabda error', attempts: maxRetries + 1 };
}

async function writeReport(report) {
  const reportsDir = path.resolve('reports');
  await fs.mkdir(reportsDir, { recursive: true });
  const reportPath = path.join(reportsDir, `whatsapp-${Date.now()}.json`);
  await fs.writeFile(reportPath, JSON.stringify(report, null, 2), 'utf8');
  return reportPath;
}

function errorResponse(res, error) {
  const status = error.statusCode || 500;
  return res.status(status).json({ success: false, error: error.message });
}

app.get('/api/whatsapp/health', (_req, res) => {
  resetUsageIfNeeded();
  res.json({
    success: true,
    service: 'nabda-whatsapp-server',
    dailyLimit,
    remainingToday: Math.max(0, dailyLimit - sentToday),
    maxBatchSize,
    defaultDelaySeconds
  });
});

app.post('/api/whatsapp/dry-run', (req, res) => {
  try {
    const campaign = validateCampaign(req.body, { requireOptIn: true });
    res.json({
      success: true,
      campaignName: campaign.campaignName,
      total: campaign.total,
      valid: campaign.valid.length,
      skipped: campaign.skipped.length,
      duplicates: campaign.duplicates,
      results: [
        ...campaign.valid.map((recipient) => ({
          phone: recipient.phone,
          business: recipient.business_name,
          governorate: recipient.governorate,
          category: recipient.category,
          status: 'dry_run',
          message: recipient.message
        })),
        ...campaign.skipped
      ]
    });
  } catch (error) {
    errorResponse(res, error);
  }
});

app.post('/api/whatsapp/test-send', async (req, res) => {
  try {
    if (!req.body?.optInConfirmed) {
      throw Object.assign(new Error('Test send requires optInConfirmed=true'), { statusCode: 400 });
    }

    const phone = normalizePhone(req.body.phone);
    if (!phone.ok) throw Object.assign(new Error(phone.error), { statusCode: 400 });

    const message = ensureConsentFooter(normalizeText(req.body.message || 'Hello from Shaku Maku'));
    if (message.length > maxMessageLength) {
      throw Object.assign(new Error(`Message exceeds ${maxMessageLength} characters`), { statusCode: 400 });
    }

    resetUsageIfNeeded();
    if (sentToday + 1 > dailyLimit) throw Object.assign(new Error('WHATSAPP_DAILY_LIMIT reached'), { statusCode: 429 });

    const result = await sendToNabda(buildNabdaEndpoint(), readApiKey(), { phone: phone.normalized, message });
    if (!result.ok) throw Object.assign(new Error(result.error), { statusCode: 502 });
    sentToday += 1;

    const response = {
      success: true,
      campaignName: 'test-message',
      total: 1,
      sent: 1,
      failed: 0,
      skipped: 0,
      duplicates: 0,
      results: [{ phone: phone.normalized, status: 'sent', messageId: result.messageId }]
    };
    response.reportPath = await writeReport(response);
    res.json(response);
  } catch (error) {
    errorResponse(res, error);
  }
});

app.post('/api/whatsapp/bulk-send', async (req, res) => {
  const cancelled = { value: false };
  req.on('aborted', () => {
    cancelled.value = true;
  });
  res.on('close', () => {
    if (!res.writableEnded) cancelled.value = true;
  });

  try {
    if (!req.body?.dryRunPassed) {
      throw Object.assign(new Error('Run and pass dry-run validation before live sending'), { statusCode: 400 });
    }

    resetUsageIfNeeded();
    const campaign = validateCampaign(req.body, { requireOptIn: true });
    if (campaign.valid.length === 0) {
      throw Object.assign(new Error('No valid opted-in recipients to send'), { statusCode: 400 });
    }
    if (campaign.valid.length > maxBatchSize) {
      throw Object.assign(new Error(`Campaign exceeds WHATSAPP_MAX_BATCH_SIZE=${maxBatchSize}`), { statusCode: 400 });
    }
    if (sentToday + campaign.valid.length > dailyLimit) {
      throw Object.assign(new Error(`WHATSAPP_DAILY_LIMIT exceeded. Remaining today: ${Math.max(0, dailyLimit - sentToday)}`), { statusCode: 429 });
    }

    const endpoint = buildNabdaEndpoint();
    const apiKey = readApiKey();
    const results = [...campaign.skipped];
    let sent = 0;
    let failed = 0;

    for (let index = 0; index < campaign.valid.length; index += 1) {
      if (cancelled.value) {
        results.push({ phone: campaign.valid[index].phone, status: 'skipped', error: 'Client cancelled request' });
        continue;
      }

      const recipient = campaign.valid[index];
      const result = await sendToNabda(endpoint, apiKey, { phone: recipient.phone, message: recipient.message });

      if (result.ok) {
        sent += 1;
        sentToday += 1;
        results.push({
          phone: recipient.phone,
          business: recipient.business_name,
          governorate: recipient.governorate,
          category: recipient.category,
          status: 'sent',
          messageId: result.messageId
        });
      } else {
        failed += 1;
        results.push({
          phone: recipient.phone,
          business: recipient.business_name,
          governorate: recipient.governorate,
          category: recipient.category,
          status: 'failed',
          error: result.error
        });
      }

      if (index + 1 < campaign.valid.length) await sleep(campaign.delayMs);
    }

    const response = {
      success: true,
      campaignName: campaign.campaignName,
      total: campaign.valid.length,
      sent,
      failed,
      skipped: campaign.skipped.length,
      duplicates: campaign.duplicates,
      results
    };
    response.reportPath = await writeReport(response);
    res.json(response);
  } catch (error) {
    errorResponse(res, error);
  }
});

app.listen(port, () => {
  console.log(`Nabda WhatsApp server listening on http://localhost:${port}`);
  console.log('Bulk endpoint: POST /api/whatsapp/bulk-send');
  console.log('Test endpoint: POST /api/whatsapp/test-send');
});
