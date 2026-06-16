import { Hono } from 'hono';
import { requireAdmin } from './_authz';

type Env = { DB: any; JWT_SECRET: string };

const heroRoutes = new Hono<{ Bindings: Env }>();

const fallbackSlides = [
  {
    id: 'default-hero-1',
    title_ar: 'اكتشف أفضل الأماكن حولك',
    title_ku: 'باشترین شوێنەکان لە دەوروبەرت بدۆزەوە',
    title_en: 'Discover the best places around you',
    subtitle_ar: 'شكو ماكو يجمع الدليل المحلي والمنشورات الاجتماعية في مكان واحد.',
    subtitle_ku: 'شکو ماکو ڕێنمای ناوخۆیی و پۆستە کۆمەڵایەتییەکان لە یەک شوێن کۆدەکاتەوە.',
    subtitle_en: 'Shaku Maku brings local discovery and social posts into one place.',
    image_url: '',
    cta_ar: 'ابدأ البحث',
    cta_ku: 'گەڕان دەست پێ بکە',
    cta_en: 'Start exploring',
    sort_order: 1,
    is_active: 1
  }
];

async function ensureHeroTable(db: any) {
  await db.prepare(`
    CREATE TABLE IF NOT EXISTS hero_slides (
      id TEXT PRIMARY KEY,
      title_ar TEXT,
      title_ku TEXT,
      title_en TEXT,
      subtitle_ar TEXT,
      subtitle_ku TEXT,
      subtitle_en TEXT,
      image_url TEXT,
      cta_ar TEXT,
      cta_ku TEXT,
      cta_en TEXT,
      sort_order INTEGER DEFAULT 0,
      is_active INTEGER DEFAULT 1,
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now'))
    )
  `).run();
}

function clean(value: unknown): string {
  return String(value || '').trim();
}

heroRoutes.get('/', async (c) => {
  try {
    await ensureHeroTable(c.env.DB);
    const rows = await c.env.DB.prepare(`
      SELECT *
      FROM hero_slides
      WHERE COALESCE(is_active, 1) = 1
      ORDER BY sort_order ASC, created_at ASC
    `).all();

    const data = rows.results && rows.results.length ? rows.results : fallbackSlides;
    return c.json({ success: true, data });
  } catch (error) {
    console.error('Hero slides list error:', error);
    return c.json({ success: true, data: fallbackSlides });
  }
});

heroRoutes.post('/', async (c) => {
  const admin = await requireAdmin(c);
  if (admin.ok === false) return admin.response;

  await ensureHeroTable(c.env.DB);
  const data = await c.req.json();
  const id = crypto.randomUUID();

  await c.env.DB.prepare(`
    INSERT INTO hero_slides (
      id, title_ar, title_ku, title_en, subtitle_ar, subtitle_ku, subtitle_en,
      image_url, cta_ar, cta_ku, cta_en, sort_order, is_active
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).bind(
    id,
    clean(data.title_ar),
    clean(data.title_ku),
    clean(data.title_en),
    clean(data.subtitle_ar),
    clean(data.subtitle_ku),
    clean(data.subtitle_en),
    clean(data.image_url),
    clean(data.cta_ar),
    clean(data.cta_ku),
    clean(data.cta_en),
    Number(data.sort_order || 0),
    data.is_active === false || data.is_active === 0 ? 0 : 1
  ).run();

  const slide = await c.env.DB.prepare('SELECT * FROM hero_slides WHERE id = ?').bind(id).first();
  return c.json({ success: true, data: slide }, 201);
});

heroRoutes.patch('/:id', async (c) => {
  const admin = await requireAdmin(c);
  if (admin.ok === false) return admin.response;

  await ensureHeroTable(c.env.DB);
  const { id } = c.req.param();
  const data = await c.req.json();

  const allowed = [
    'title_ar', 'title_ku', 'title_en',
    'subtitle_ar', 'subtitle_ku', 'subtitle_en',
    'image_url', 'cta_ar', 'cta_ku', 'cta_en',
    'sort_order', 'is_active'
  ];

  const updates: string[] = [];
  const values: any[] = [];

  for (const field of allowed) {
    if (data[field] !== undefined) {
      updates.push(`${field} = ?`);
      values.push(field === 'sort_order' || field === 'is_active' ? Number(data[field]) : clean(data[field]));
    }
  }

  if (!updates.length) return c.json({ success: false, error: 'Invalid input' }, 400);

  updates.push('updated_at = datetime("now")');
  values.push(id);

  await c.env.DB.prepare(`UPDATE hero_slides SET ${updates.join(', ')} WHERE id = ?`).bind(...values).run();
  const slide = await c.env.DB.prepare('SELECT * FROM hero_slides WHERE id = ?').bind(id).first();

  return c.json({ success: true, data: slide });
});

heroRoutes.delete('/:id', async (c) => {
  const admin = await requireAdmin(c);
  if (admin.ok === false) return admin.response;

  await ensureHeroTable(c.env.DB);
  const { id } = c.req.param();

  await c.env.DB.prepare('DELETE FROM hero_slides WHERE id = ?').bind(id).run();
  return c.json({ success: true, message: 'Hero slide deleted' });
});

export default heroRoutes;
