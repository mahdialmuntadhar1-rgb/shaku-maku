import { Hono } from 'hono';
import { requireAdmin } from './_authz';

type Env = {
  DB: any;
  JWT_SECRET: string;
};

const heroRoutes = new Hono<{ Bindings: Env }>();

function generateId(): string {
  return crypto.randomUUID();
}

function rowToHeroSlide(row: any) {
  return {
    id: String(row.id),
    image: String(row.image_url || ''),
    slogan: {
      ar: String(row.slogan_ar || ''),
      ku: String(row.slogan_ku || ''),
      en: String(row.slogan_en || '')
    },
    badge: {
      ar: String(row.badge_ar || ''),
      ku: String(row.badge_ku || ''),
      en: String(row.badge_en || '')
    },
    governorate: String(row.governorate || 'all'),
    category: String(row.category || 'restaurant'),
    sortOrder: Number(row.sort_order || 0),
    isActive: Number(row.is_active) === 1
  };
}

function cleanText(value: unknown): string {
  return String(value ?? '').trim();
}

function readSlidePayload(data: any) {
  return {
    image_url: cleanText(data.image_url ?? data.image),
    slogan_ar: cleanText(data.slogan_ar ?? data?.slogan?.ar),
    slogan_ku: cleanText(data.slogan_ku ?? data?.slogan?.ku),
    slogan_en: cleanText(data.slogan_en ?? data?.slogan?.en),
    badge_ar: cleanText(data.badge_ar ?? data?.badge?.ar),
    badge_ku: cleanText(data.badge_ku ?? data?.badge?.ku),
    badge_en: cleanText(data.badge_en ?? data?.badge?.en),
    governorate: cleanText(data.governorate || 'all') || 'all',
    category: cleanText(data.category || 'restaurant') || 'restaurant',
    sort_order: Number.isFinite(Number(data.sort_order ?? data.sortOrder)) ? Number(data.sort_order ?? data.sortOrder) : 0,
    is_active: data.is_active === false || data.isActive === false ? 0 : Number(data.is_active ?? data.isActive ?? 1)
  };
}

heroRoutes.get('/', async (c) => {
  try {
    const rows = await c.env.DB.prepare(
      `SELECT *
       FROM hero_slides
       WHERE is_active = 1
       ORDER BY sort_order ASC, created_at ASC`
    ).all();

    return c.json({
      success: true,
      data: (rows.results || []).map(rowToHeroSlide)
    });
  } catch (error: any) {
    return c.json({ success: false, error: error?.message || 'Failed to list hero slides' }, 500);
  }
});

heroRoutes.post('/', async (c) => {
  try {
    const admin = await requireAdmin(c);
    if (admin.ok === false) return admin.response;

    const data = await c.req.json();
    const payload = readSlidePayload(data);

    if (!payload.image_url) {
      return c.json({ success: false, error: 'image_url is required' }, 400);
    }

    const id = cleanText(data.id) || generateId();

    await c.env.DB.prepare(
      `INSERT INTO hero_slides (
        id, image_url, slogan_ar, slogan_ku, slogan_en,
        badge_ar, badge_ku, badge_en, governorate, category,
        sort_order, is_active, created_by, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'), datetime('now'))`
    ).bind(
      id,
      payload.image_url,
      payload.slogan_ar,
      payload.slogan_ku,
      payload.slogan_en,
      payload.badge_ar,
      payload.badge_ku,
      payload.badge_en,
      payload.governorate,
      payload.category,
      payload.sort_order,
      payload.is_active,
      admin.userId
    ).run();

    const row = await c.env.DB.prepare('SELECT * FROM hero_slides WHERE id = ?').bind(id).first();
    return c.json({ success: true, data: rowToHeroSlide(row) }, 201);
  } catch (error: any) {
    return c.json({ success: false, error: error?.message || 'Failed to create hero slide' }, 500);
  }
});

async function updateHeroSlide(c: any) {
  try {
    const admin = await requireAdmin(c);
    if (admin.ok === false) return admin.response;

    const { id } = c.req.param();
    const data = await c.req.json();

    const existing = await c.env.DB.prepare('SELECT id FROM hero_slides WHERE id = ?').bind(id).first();
    if (!existing) {
      return c.json({ success: false, error: 'Hero slide not found' }, 404);
    }

    const normalized = readSlidePayload(data);
    const updates: string[] = [];
    const values: any[] = [];

    const addField = (field: string, value: any) => {
      updates.push(`${field} = ?`);
      values.push(value);
    };

    if (data.image_url !== undefined || data.image !== undefined) addField('image_url', normalized.image_url);
    if (data.slogan_ar !== undefined || data?.slogan?.ar !== undefined) addField('slogan_ar', normalized.slogan_ar);
    if (data.slogan_ku !== undefined || data?.slogan?.ku !== undefined) addField('slogan_ku', normalized.slogan_ku);
    if (data.slogan_en !== undefined || data?.slogan?.en !== undefined) addField('slogan_en', normalized.slogan_en);
    if (data.badge_ar !== undefined || data?.badge?.ar !== undefined) addField('badge_ar', normalized.badge_ar);
    if (data.badge_ku !== undefined || data?.badge?.ku !== undefined) addField('badge_ku', normalized.badge_ku);
    if (data.badge_en !== undefined || data?.badge?.en !== undefined) addField('badge_en', normalized.badge_en);
    if (data.governorate !== undefined) addField('governorate', normalized.governorate);
    if (data.category !== undefined) addField('category', normalized.category);
    if (data.sort_order !== undefined || data.sortOrder !== undefined) addField('sort_order', normalized.sort_order);
    if (data.is_active !== undefined || data.isActive !== undefined) addField('is_active', normalized.is_active);

    if (updates.length === 0) {
      return c.json({ success: false, error: 'No supported fields to update' }, 400);
    }

    updates.push(`updated_at = datetime('now')`);
    values.push(id);

    await c.env.DB.prepare(
      `UPDATE hero_slides SET ${updates.join(', ')} WHERE id = ?`
    ).bind(...values).run();

    const row = await c.env.DB.prepare('SELECT * FROM hero_slides WHERE id = ?').bind(id).first();
    return c.json({ success: true, data: rowToHeroSlide(row) });
  } catch (error: any) {
    return c.json({ success: false, error: error?.message || 'Failed to update hero slide' }, 500);
  }
}

heroRoutes.put('/:id', updateHeroSlide);
heroRoutes.patch('/:id', updateHeroSlide);

heroRoutes.delete('/:id', async (c) => {
  try {
    const admin = await requireAdmin(c);
    if (admin.ok === false) return admin.response;

    const { id } = c.req.param();
    const existing = await c.env.DB.prepare('SELECT id FROM hero_slides WHERE id = ?').bind(id).first();

    if (!existing) {
      return c.json({ success: false, error: 'Hero slide not found' }, 404);
    }

    await c.env.DB.prepare(
      `UPDATE hero_slides
       SET is_active = 0, updated_at = datetime('now')
       WHERE id = ?`
    ).bind(id).run();

    return c.json({ success: true, message: 'Hero slide deleted successfully' });
  } catch (error: any) {
    return c.json({ success: false, error: error?.message || 'Failed to delete hero slide' }, 500);
  }
});

export default heroRoutes;