import 'dotenv/config';
import express from 'express';

const port = Number(process.env.NABDA_WEBHOOK_PORT || 8787);
const webhookSecret = process.env.NABDA_WEBHOOK_SECRET || '';
const allowedEvents = new Set(['message.sent', 'message.received', 'message.ack']);

const app = express();
app.use(express.json({ limit: '1mb' }));

app.get('/health', (_req, res) => {
  res.json({ ok: true, service: 'nabda-webhook-receiver' });
});

app.post('/webhooks/nabda', (req, res) => {
  if (webhookSecret) {
    const providedSecret = req.header('x-webhook-secret') || req.query.secret;
    if (providedSecret !== webhookSecret) {
      return res.status(401).json({ ok: false, error: 'Unauthorized webhook request' });
    }
  }

  const { instanceId, event, payload = {}, timestamp } = req.body || {};

  if (!allowedEvents.has(event)) {
    return res.status(400).json({ ok: false, error: `Unsupported event: ${event}` });
  }

  const logEntry = {
    receivedAt: new Date().toISOString(),
    instanceId,
    event,
    messageId: payload.messageId,
    status: payload.status,
    phone: payload.phone,
    timestamp
  };

  console.log(JSON.stringify(logEntry));
  return res.json({ ok: true });
});

app.listen(port, () => {
  console.log(`Nabda webhook receiver listening on http://localhost:${port}`);
  console.log(`Webhook path: /webhooks/nabda`);
});
