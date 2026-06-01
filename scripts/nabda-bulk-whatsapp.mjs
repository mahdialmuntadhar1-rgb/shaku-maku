import 'dotenv/config';
import fs from 'node:fs/promises';
import path from 'node:path';

const DEFAULT_DELAY_MS = 2500;
const DEFAULT_BATCH_SIZE = 1;
const MAX_RETRIES = 2;
const CONSENT_FOOTER = '\n\nReply STOP to opt out.';
const DEFAULT_MAX_MESSAGE_LENGTH = 255;

function parseArgs(argv) {
  const args = {};
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (!arg.startsWith('--')) continue;

    const key = arg.slice(2);
    if (['dry-run', 'send', 'help'].includes(key)) {
      args[key] = true;
    } else {
      args[key] = argv[i + 1];
      i += 1;
    }
  }
  return args;
}

function printHelp() {
  console.log(`
Nabda OTP bulk WhatsApp sender

Safe default: dry-run. Real sending requires --send.

Examples:
  npm run whatsapp:bulk -- --input campaign.json --dry-run
  npm run whatsapp:bulk -- --input contacts.csv --message "Hello {{name}}" --dry-run
  npm run whatsapp:bulk -- --recipients "07704413300,+9647704413300" --message "Hello" --send

Required env for real send:
  NABDA_API_URL=https://api.nabdaotp.com/inst/<instance-id>
  NABDA_API_KEY=sk_xxx

Optional env:
  NABDA_SEND_PATH=/api/v1/messages/send
  NABDA_AUTH_PREFIX=
  NABDA_MAX_MESSAGE_LENGTH=255
`);
}

function parseList(value) {
  if (!value) return [];
  return String(value)
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
}

function parseJson(value, fallback = undefined) {
  if (!value) return fallback;
  try {
    return JSON.parse(value);
  } catch (error) {
    throw new Error(`Invalid JSON: ${value}`);
  }
}

function parseCSV(text) {
  const rows = [];
  let row = [];
  let field = '';
  let quoted = false;

  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];
    const next = text[i + 1];

    if (quoted) {
      if (char === '"' && next === '"') {
        field += '"';
        i += 1;
      } else if (char === '"') {
        quoted = false;
      } else {
        field += char;
      }
      continue;
    }

    if (char === '"') {
      quoted = true;
    } else if (char === ',') {
      row.push(field);
      field = '';
    } else if (char === '\n') {
      row.push(field.replace(/\r$/, ''));
      rows.push(row);
      row = [];
      field = '';
    } else {
      field += char;
    }
  }

  if (field.length > 0 || row.length > 0) {
    row.push(field.replace(/\r$/, ''));
    rows.push(row);
  }

  const [headers, ...dataRows] = rows.filter((candidate) => candidate.some((value) => value.trim() !== ''));
  if (!headers) return [];

  return dataRows.map((dataRow) =>
    Object.fromEntries(headers.map((header, index) => [header.trim(), (dataRow[index] ?? '').trim()]))
  );
}

async function loadCampaign(inputPath) {
  if (!inputPath) return {};

  const absolutePath = path.resolve(inputPath);
  const content = await fs.readFile(absolutePath, 'utf8');

  if (inputPath.toLowerCase().endsWith('.csv')) {
    return {
      recipients: parseCSV(content).map((row) => ({
        phone: row.phone || row.Phone || row.mobile || row.Mobile || row.whatsapp || row.WhatsApp,
        name: row.name || row.Name,
        businessName: row.businessName || row.business_name || row.BusinessName,
        language: row.language || row.lang,
        message: row.message || row.Message
      }))
    };
  }

  return JSON.parse(content);
}

function normalizePhone(rawPhone) {
  const original = String(rawPhone ?? '').trim();
  if (!original) {
    return { ok: false, original, error: 'Missing phone number' };
  }

  let digits = original.replace(/[^\d+]/g, '');
  if (digits.startsWith('00')) digits = `+${digits.slice(2)}`;

  if (digits.startsWith('+964')) {
    digits = `+964${digits.slice(4).replace(/^0+/, '')}`;
  } else if (digits.startsWith('964')) {
    digits = `+964${digits.slice(3).replace(/^0+/, '')}`;
  } else if (digits.startsWith('0')) {
    digits = `+964${digits.slice(1)}`;
  } else if (/^7\d{9}$/.test(digits)) {
    digits = `+964${digits}`;
  } else if (!digits.startsWith('+')) {
    return { ok: false, original, error: 'Unsupported phone format. Use Iraqi local or international format.' };
  }

  if (!/^\+9647\d{9}$/.test(digits)) {
    return { ok: false, original, normalized: digits, error: 'Invalid Iraqi mobile number. Expected +9647XXXXXXXXX.' };
  }

  return { ok: true, original, normalized: digits };
}

function renderTemplate(template, variables) {
  return String(template).replace(/\{\{\s*([\w.]+)\s*\}\}/g, (_, key) => {
    const value = variables[key];
    return value === undefined || value === null ? '' : String(value);
  });
}

function ensureConsentFooter(message) {
  if (/stop|unsubscribe|opt out/i.test(message)) return message;
  return `${message}${CONSENT_FOOTER}`;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function buildEndpoint() {
  const apiUrl = process.env.NABDA_API_URL?.replace(/\/+$/, '');
  const sendPath = process.env.NABDA_SEND_PATH || '/api/v1/messages/send';
  if (!apiUrl) throw new Error('NABDA_API_URL is required for real sends.');
  return `${apiUrl}${sendPath.startsWith('/') ? sendPath : `/${sendPath}`}`;
}

async function postWithRetries(endpoint, apiKey, payload) {
  let lastError;

  for (let attempt = 0; attempt <= MAX_RETRIES; attempt += 1) {
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          Authorization: `${process.env.NABDA_AUTH_PREFIX || ''}${apiKey}`,
          'Content-Type': 'application/json'
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

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${JSON.stringify(body)}`);
      }

      return { ok: true, status: response.status, body, attempts: attempt + 1 };
    } catch (error) {
      lastError = error;
      if (attempt < MAX_RETRIES) await sleep(1000 * (attempt + 1));
    }
  }

  return { ok: false, error: lastError?.message || 'Unknown send error', attempts: MAX_RETRIES + 1 };
}

function normalizeRecipient(input) {
  if (typeof input === 'string') return { phone: input };
  return input || {};
}

function dedupeRecipients(recipients) {
  const seen = new Set();
  const unique = [];
  const duplicates = [];

  for (const recipient of recipients.map(normalizeRecipient)) {
    const phone = normalizePhone(recipient.phone);
    if (!phone.ok) {
      unique.push({ ...recipient, phoneResult: phone });
      continue;
    }

    if (seen.has(phone.normalized)) {
      duplicates.push({ ...recipient, phone: phone.normalized });
      continue;
    }

    seen.add(phone.normalized);
    unique.push({ ...recipient, phone: phone.normalized, phoneResult: phone });
  }

  return { unique, duplicates };
}

function buildMessage(globalMessage, recipient, variables) {
  const baseMessage = recipient.message || globalMessage;
  if (!baseMessage) throw new Error('message is required, either globally or per CSV recipient.');

  const mergedVariables = {
    name: recipient.name || '',
    businessName: recipient.businessName || '',
    language: recipient.language || '',
    ...variables
  };

  const renderedMessage = ensureConsentFooter(renderTemplate(baseMessage, mergedVariables).trim());
  const maxLength = Number(process.env.NABDA_MAX_MESSAGE_LENGTH || DEFAULT_MAX_MESSAGE_LENGTH);

  if (renderedMessage.length > maxLength) {
    throw new Error(`Message is ${renderedMessage.length} characters. Nabda SendMessageDto maxLength is ${maxLength}.`);
  }

  return renderedMessage;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    printHelp();
    return;
  }

  const campaign = await loadCampaign(args.input);
  const cliRecipients = parseList(args.recipients);
  const variables = {
    ...(campaign.variables || {}),
    ...(parseJson(args.variables, {}) || {})
  };

  const recipients = cliRecipients.length > 0 ? cliRecipients : campaign.recipients || [];
  const dryRun = args.send ? false : args['dry-run'] !== 'false' && campaign.dryRun !== false;
  const delayMs = Number(args.delayMs || campaign.delayMs || DEFAULT_DELAY_MS);
  const batchSize = Number(args.batchSize || campaign.batchSize || DEFAULT_BATCH_SIZE);
  const message = args.message || campaign.message;
  const campaignName = args.campaignName || campaign.campaignName || 'manual-bulk-whatsapp';
  const templateName = args.templateName || campaign.templateName;
  const tags = parseList(args.tags).length ? parseList(args.tags) : campaign.tags || [];
  const source = args.source || campaign.source || 'script';

  const { unique, duplicates } = dedupeRecipients(recipients);
  const endpoint = dryRun ? null : buildEndpoint();
  const apiKey = process.env.NABDA_API_KEY;

  if (!dryRun && !apiKey) {
    throw new Error('NABDA_API_KEY is required for real sends.');
  }

  const report = {
    campaignName,
    source,
    dryRun,
    endpoint: endpoint || '(dry-run)',
    totalInput: recipients.length,
    duplicatesSkipped: duplicates.length,
    invalid: [],
    sent: [],
    failed: []
  };

  console.log(`[${campaignName}] ${dryRun ? 'Dry run' : 'Real send'} started`);
  console.log(`Recipients: ${unique.length}, duplicates skipped: ${duplicates.length}, delayMs: ${delayMs}, batchSize: ${batchSize}`);

  for (let index = 0; index < unique.length; index += batchSize) {
    const batch = unique.slice(index, index + batchSize);

    await Promise.all(batch.map(async (recipient) => {
      if (!recipient.phoneResult?.ok) {
        report.invalid.push({
          phone: recipient.phone,
          error: recipient.phoneResult?.error || 'Invalid phone number'
        });
        return;
      }

      let renderedMessage;
      try {
        renderedMessage = buildMessage(message, recipient, variables);
      } catch (error) {
        report.failed.push({
          phone: recipient.phone,
          status: 'FAILED_VALIDATION',
          error: error.message
        });
        console.error(`[validation failed] ${recipient.phone}: ${error.message}`);
        return;
      }

      const payload = {
        phone: recipient.phone,
        message: renderedMessage
      };

      if (templateName) payload.templateName = templateName;

      const metadata = {
        campaignName,
        tags,
        source,
        recipient: {
          name: recipient.name,
          businessName: recipient.businessName,
          language: recipient.language
        }
      };

      if (dryRun) {
        report.sent.push({ phone: recipient.phone, status: 'DRY_RUN', message: renderedMessage, metadata });
        console.log(`[dry-run] ${recipient.phone}: ${renderedMessage.slice(0, 80)}${renderedMessage.length > 80 ? '...' : ''}`);
        return;
      }

      const result = await postWithRetries(endpoint, apiKey, payload);
      if (result.ok) {
        report.sent.push({ phone: recipient.phone, status: 'SENT', attempts: result.attempts, body: result.body, metadata });
        console.log(`[sent] ${recipient.phone}`);
      } else {
        report.failed.push({ phone: recipient.phone, status: 'FAILED', attempts: result.attempts, error: result.error, metadata });
        console.error(`[failed] ${recipient.phone}: ${result.error}`);
      }
    }));

    if (index + batchSize < unique.length && delayMs > 0) {
      await sleep(delayMs);
    }
  }

  const reportPath = path.resolve(`nabda-bulk-report-${Date.now()}.json`);
  await fs.writeFile(reportPath, JSON.stringify(report, null, 2), 'utf8');
  console.log(`Report saved: ${reportPath}`);

  if (report.failed.length || report.invalid.length) {
    process.exitCode = 1;
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
