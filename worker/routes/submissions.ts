import { Hono } from 'hono';
import { requireAdmin } from './_authz';

type Env = {
  DB: any;
  JWT_SECRET: string;
};

const submissionsRoutes = new Hono<{ Bindings: Env }>();

async function ensureBusinessSubmissionsTable(db: any) {
  await db.prepare(`
    CREATE TABLE IF NOT EXISTS business_submissions (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      description TEXT,
      address TEXT,
      phone TEXT NOT NULL,
      category TEXT,
      governorate TEXT,
      media_url TEXT,
      status TEXT NOT NULL DEFAULT 'pending',
      source TEXT,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `).run();
}

function cleanText(value: unknown): string {
  return String(value || '').trim();
}

submissionsRoutes.post('/', async (c) => {
  try {
    await ensureBusinessSubmissionsTable(c.env.DB);

    const body = await c.req.json().catch(() => ({}));

    const name = cleanText(body.name || body.name_en || body.name_ar || body.name_ku);
    const phone = cleanText(body.phone || body.phone_number);
    const description = cleanText(body.description || body.description_en || body.description_ar || body.description_ku);
    const address = cleanText(body.address || body.address_en || body.address_ar || body.address_ku);
    const category = cleanText(body.category);
    const governorate = cleanText(body.governorate);
    const mediaUrl = cleanText(body.media_url || body.image || body.avatar);
    const source = cleanText(body.source || 'add_business_form');

    if (!name || !phone) {
      return c.json({
        success: false,
        error: 'Business name and phone number are required'
      }, 400);
    }

    const id = crypto.randomUUID();

    await c.env.DB.prepare(`
      INSERT INTO business_submissions (
        id, name, description, address, phone, category, governorate, media_url, status, source, created_at, updated_at
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'pending', ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
    `).bind(
      id,
      name,
      description,
      address,
      phone,
      category,
      governorate,
      mediaUrl,
      source
    ).run();

    return c.json({
      success: true,
      message: 'Business request received. Admin will review it before publishing.',
      data: { id, status: 'pending' }
    }, 201);
  } catch (error: any) {
    console.error('Business submission create error:', error);
    return c.json({
      success: false,
      error: error?.message || 'Failed to submit business request'
    }, 500);
  }
});

submissionsRoutes.get('/', async (c) => {
  const admin = await requireAdmin(c);
  if (admin.ok === false) return admin.response;

  try {
    await ensureBusinessSubmissionsTable(c.env.DB);

    const status = cleanText(c.req.query('status') || 'pending');
    const limit = Math.min(Number(c.req.query('limit') || 50), 100);

    const rows = await c.env.DB.prepare(`
      SELECT *
      FROM business_submissions
      WHERE (? = 'all' OR status = ?)
      ORDER BY created_at DESC
      LIMIT ?
    `).bind(status, status, limit).all();

    return c.json({
      success: true,
      data: rows.results || []
    });
  } catch (error: any) {
    console.error('Business submission list error:', error);
    return c.json({
      success: false,
      error: error?.message || 'Failed to list business submissions'
    }, 500);
  }
});

submissionsRoutes.patch('/:id', async (c) => {
  const admin = await requireAdmin(c);
  if (admin.ok === false) return admin.response;

  try {
    await ensureBusinessSubmissionsTable(c.env.DB);

    const id = c.req.param('id');
    const body = await c.req.json().catch(() => ({}));
    const status = cleanText(body.status || 'pending');

    if (!['pending', 'approved', 'rejected'].includes(status)) {
      return c.json({ success: false, error: 'Invalid status' }, 400);
    }

    await c.env.DB.prepare(`
      UPDATE business_submissions
      SET status = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `).bind(status, id).run();

    return c.json({
      success: true,
      data: { id, status }
    });
  } catch (error: any) {
    console.error('Business submission update error:', error);
    return c.json({
      success: false,
      error: error?.message || 'Failed to update business submission'
    }, 500);
  }
});

export default submissionsRoutes;
