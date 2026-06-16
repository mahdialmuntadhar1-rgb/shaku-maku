import { Hono } from 'hono';
import { requireAdmin } from './_authz';

type Env = { DB: any; JWT_SECRET: string };

const submissionsRoutes = new Hono<{ Bindings: Env }>();

function clean(value: unknown): string {
  return String(value || '').trim();
}

async function ensureSubmissionsTable(db: any) {
  await db.prepare(`
    CREATE TABLE IF NOT EXISTS business_submissions (
      id TEXT PRIMARY KEY,
      status TEXT DEFAULT 'pending',
      name_ar TEXT,
      name_ku TEXT,
      name_en TEXT,
      description_ar TEXT,
      description_ku TEXT,
      description_en TEXT,
      category TEXT,
      governorate TEXT,
      phone_number TEXT,
      address_ar TEXT,
      address_ku TEXT,
      address_en TEXT,
      image TEXT,
      avatar TEXT,
      submitter_email TEXT,
      submitter_phone TEXT,
      payload_json TEXT,
      created_at TEXT DEFAULT (datetime('now')),
      reviewed_at TEXT,
      reviewed_by TEXT
    )
  `).run();
}

submissionsRoutes.post('/', async (c) => {
  try {
    await ensureSubmissionsTable(c.env.DB);
    const data = await c.req.json();

    const name = clean(data.name_ar || data.name_ku || data.name_en || data.name);
    const category = clean(data.category);
    const governorate = clean(data.governorate);
    const phone = clean(data.phone_number || data.phone || data.submitter_phone);

    if (!name || !category || !governorate || !phone) {
      return c.json({
        success: false,
        error: 'Business name, category, governorate, and phone are required'
      }, 400);
    }

    const id = crypto.randomUUID();

    await c.env.DB.prepare(`
      INSERT INTO business_submissions (
        id, status, name_ar, name_ku, name_en,
        description_ar, description_ku, description_en,
        category, governorate, phone_number,
        address_ar, address_ku, address_en,
        image, avatar, submitter_email, submitter_phone, payload_json
      )
      VALUES (?, 'pending', ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(
      id,
      clean(data.name_ar || name),
      clean(data.name_ku || name),
      clean(data.name_en || name),
      clean(data.description_ar || data.description || ''),
      clean(data.description_ku || data.description || ''),
      clean(data.description_en || data.description || ''),
      category,
      governorate,
      phone,
      clean(data.address_ar || data.address || ''),
      clean(data.address_ku || data.address || ''),
      clean(data.address_en || data.address || ''),
      clean(data.image || ''),
      clean(data.avatar || ''),
      clean(data.submitter_email || data.email || ''),
      clean(data.submitter_phone || data.phone || phone),
      JSON.stringify(data)
    ).run();

    return c.json({
      success: true,
      data: { id, status: 'pending' },
      message: 'Business submitted for admin review'
    }, 201);
  } catch (error) {
    console.error('Create business submission error:', error);
    return c.json({ success: false, error: 'Failed to submit business' }, 500);
  }
});

submissionsRoutes.get('/', async (c) => {
  const admin = await requireAdmin(c);
  if (admin.ok === false) return admin.response;

  await ensureSubmissionsTable(c.env.DB);
  const status = clean(c.req.query('status') || 'pending');

  const rows = await c.env.DB.prepare(`
    SELECT *
    FROM business_submissions
    WHERE status = ?
    ORDER BY created_at DESC
    LIMIT 200
  `).bind(status).all();

  return c.json({ success: true, data: rows.results || [] });
});

submissionsRoutes.patch('/:id', async (c) => {
  const admin = await requireAdmin(c);
  if (admin.ok === false) return admin.response;

  await ensureSubmissionsTable(c.env.DB);
  const { id } = c.req.param();
  const data = await c.req.json();
  const status = clean(data.status);

  if (!['approved', 'rejected', 'pending'].includes(status)) {
    return c.json({ success: false, error: 'Invalid status' }, 400);
  }

  const submission = await c.env.DB.prepare('SELECT * FROM business_submissions WHERE id = ?').bind(id).first() as any;
  if (!submission) return c.json({ success: false, error: 'Submission not found' }, 404);

  await c.env.DB.prepare(`
    UPDATE business_submissions
    SET status = ?, reviewed_at = datetime('now'), reviewed_by = ?
    WHERE id = ?
  `).bind(status, admin.userId, id).run();

  if (status === 'approved') {
    const businessId = crypto.randomUUID();

    await c.env.DB.prepare(`
      INSERT INTO businesses (
        id, owner_id, name_ar, name_ku, name_en,
        description_ar, description_ku, description_en,
        category, governorate, phone_number,
        address_ar, address_ku, address_en,
        image, avatar, is_verified
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0)
    `).bind(
      businessId,
      admin.userId,
      submission.name_ar || '',
      submission.name_ku || submission.name_ar || '',
      submission.name_en || submission.name_ar || '',
      submission.description_ar || '',
      submission.description_ku || '',
      submission.description_en || '',
      submission.category || '',
      submission.governorate || '',
      submission.phone_number || '',
      submission.address_ar || '',
      submission.address_ku || '',
      submission.address_en || '',
      submission.image || '',
      submission.avatar || ''
    ).run();

    return c.json({
      success: true,
      message: 'Submission approved and business created',
      data: { business_id: businessId }
    });
  }

  return c.json({ success: true, message: `Submission ${status}` });
});

export default submissionsRoutes;
