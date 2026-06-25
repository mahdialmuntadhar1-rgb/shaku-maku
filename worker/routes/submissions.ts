import { Hono } from 'hono';
import { requireAdmin } from './_authz';

type Env = {
  DB: any;
  JWT_SECRET: string;
};

const submissionsRoutes = new Hono<{ Bindings: Env }>();

function cleanText(value: unknown): string {
  return String(value || '').trim();
}

function fallbackText(value: unknown, fallback: string): string {
  const cleaned = cleanText(value);
  return cleaned || fallback;
}

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
      approved_business_id TEXT,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `).run();

  const columns = await db.prepare(`PRAGMA table_info(business_submissions)`).all();
  const names = (columns.results || []).map((column: any) => String(column.name));

  const optionalColumns: Record<string, string> = {
    approved_business_id: 'TEXT',
    email: 'TEXT',
    website: 'TEXT',
    whatsapp: 'TEXT',
    facebook: 'TEXT',
    instagram: 'TEXT',
    source_url: 'TEXT',
    source_name: 'TEXT',
    verification_status: `TEXT NOT NULL DEFAULT 'pending'`
  };

  for (const [name, definition] of Object.entries(optionalColumns)) {
    if (!names.includes(name)) {
      await db.prepare(`ALTER TABLE business_submissions ADD COLUMN ${name} ${definition}`).run();
    }
  }
}

async function ensureBusinessFields(db: any) {
  const columns = await db.prepare(`PRAGMA table_info(businesses)`).all();
  const names = new Set((columns.results || []).map((column: any) => String(column.name)));
  const optionalColumns: Record<string, string> = {
    email: 'TEXT',
    website: 'TEXT',
    whatsapp: 'TEXT',
    facebook: 'TEXT',
    instagram: 'TEXT',
    source_url: 'TEXT',
    source_name: 'TEXT',
    status: `TEXT NOT NULL DEFAULT 'approved'`,
    verification_status: `TEXT NOT NULL DEFAULT 'unverified'`
  };

  for (const [name, definition] of Object.entries(optionalColumns)) {
    if (!names.has(name)) {
      await db.prepare(`ALTER TABLE businesses ADD COLUMN ${name} ${definition}`).run();
    }
  }
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
    const email = cleanText(body.email);
    const website = cleanText(body.website);
    const whatsapp = cleanText(body.whatsapp);
    const facebook = cleanText(body.facebook);
    const instagram = cleanText(body.instagram);
    const sourceUrl = cleanText(body.source_url);
    const sourceName = cleanText(body.source_name);

    if (!name || !phone) {
      return c.json({
        success: false,
        error: 'Business name and phone number are required'
      }, 400);
    }

    const id = crypto.randomUUID();

    await c.env.DB.prepare(`
      INSERT INTO business_submissions (
        id, name, description, address, phone, category, governorate, media_url,
        email, website, whatsapp, facebook, instagram, source_url, source_name,
        status, source, approved_business_id, verification_status, created_at, updated_at
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending', ?, NULL, 'pending', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
    `).bind(
      id,
      name,
      description,
      address,
      phone,
      category,
      governorate,
      mediaUrl,
      email,
      website,
      whatsapp,
      facebook,
      instagram,
      sourceUrl,
      sourceName,
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

    const submission = await c.env.DB.prepare(`
      SELECT *
      FROM business_submissions
      WHERE id = ?
      LIMIT 1
    `).bind(id).first() as any;

    if (!submission) {
      return c.json({ success: false, error: 'Business request not found' }, 404);
    }

    let publishedBusiness: any = null;
    let approvedBusinessId = cleanText(submission.approved_business_id);

    if (status === 'approved') {
      await ensureBusinessFields(c.env.DB);
      if (approvedBusinessId) {
        publishedBusiness = await c.env.DB.prepare(
          'SELECT * FROM businesses WHERE id = ?'
        ).bind(approvedBusinessId).first();
      }

      if (!publishedBusiness) {
        approvedBusinessId = crypto.randomUUID();

        const name = fallbackText(submission.name, 'New Business');
        const description = cleanText(submission.description);
        const address = cleanText(submission.address);
        const category = fallbackText(submission.category, 'services');
        const governorate = fallbackText(submission.governorate, 'baghdad');
        const phone = cleanText(submission.phone);
        const mediaUrl = cleanText(submission.media_url);

        await c.env.DB.prepare(`
          INSERT INTO businesses (
            id, owner_id, name_ar, name_ku, name_en,
            description_ar, description_ku, description_en,
            category, governorate, phone_number,
            address_ar, address_ku, address_en,
            image, avatar, is_verified,
            map_coords_x, map_coords_y,
            email, website, whatsapp, facebook, instagram,
            source_url, source_name, status, verification_status
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `).bind(
          approvedBusinessId,
          admin.userId,
          name,
          name,
          name,
          description || null,
          description || null,
          description || null,
          category,
          governorate,
          phone || null,
          address || null,
          address || null,
          address || null,
          mediaUrl || null,
          mediaUrl || null,
          0,
          null,
          null,
          cleanText(submission.email) || null,
          cleanText(submission.website) || null,
          cleanText(submission.whatsapp) || phone || null,
          cleanText(submission.facebook) || null,
          cleanText(submission.instagram) || null,
          cleanText(submission.source_url) || null,
          cleanText(submission.source_name) || cleanText(submission.source) || null,
          'approved',
          'unverified'
        ).run();

        publishedBusiness = await c.env.DB.prepare(
          'SELECT * FROM businesses WHERE id = ?'
        ).bind(approvedBusinessId).first();
      }
    }

    await c.env.DB.prepare(`
      UPDATE business_submissions
      SET status = ?, approved_business_id = COALESCE(?, approved_business_id), updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `).bind(
      status,
      status === 'approved' ? approvedBusinessId : null,
      id
    ).run();

    return c.json({
      success: true,
      data: {
        id,
        status,
        approved_business_id: status === 'approved' ? approvedBusinessId : submission.approved_business_id || null,
        business: publishedBusiness || null
      }
    });
  } catch (error: any) {
    console.error('Business submission update error:', error);
    return c.json({
      success: false,
      error: error?.message || 'Failed to update business submission'
    }, 500);
  }
});

submissionsRoutes.delete('/:id', async (c) => {
  const admin = await requireAdmin(c);
  if (admin.ok === false) return admin.response;

  try {
    await ensureBusinessSubmissionsTable(c.env.DB);

    const id = c.req.param('id');

    const existing = await c.env.DB.prepare(`
      SELECT id
      FROM business_submissions
      WHERE id = ?
      LIMIT 1
    `).bind(id).first();

    if (!existing) {
      return c.json({ success: false, error: 'Business request not found' }, 404);
    }

    await c.env.DB.prepare(`
      DELETE FROM business_submissions
      WHERE id = ?
    `).bind(id).run();

    return c.json({
      success: true,
      data: { id, deleted: true }
    });
  } catch (error: any) {
    console.error('Business submission delete error:', error);
    return c.json({
      success: false,
      error: error?.message || 'Failed to delete business submission'
    }, 500);
  }
});

export default submissionsRoutes;
