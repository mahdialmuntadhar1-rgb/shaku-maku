
function cleanTaxonomyValue(value) {
  return String(value || '')
    .toLowerCase()
    .trim()
    .replace(/[Ã˜Â£Ã˜Â¥Ã˜Â¢]/g, 'Ã˜Â§')
    .replace(/Ã˜Â©/g, 'Ã™â€¡')
    .replace(/Ã™â€°/g, 'Ã™Å ')
    .replace(/[_\-]+/g, ' ')
    .replace(/[\sÃ˜Å’,./()\[\]{}]+/g, ' ')
    .trim();
}

function compactTaxonomyValue(value) {
  return cleanTaxonomyValue(value).replace(/\s+/g, '');
}

function normalizeGovernorate(value) {
  const raw = cleanTaxonomyValue(value);
  const compact = compactTaxonomyValue(value);
  const aliases = {
    baghdad: ['baghdad','Ã˜Â¨Ã˜ÂºÃ˜Â¯Ã˜Â§Ã˜Â¯'],
    basra: ['basra','basrah','Ã˜Â§Ã™â€žÃ˜Â¨Ã˜ÂµÃ˜Â±Ã™â€¡','Ã˜Â§Ã™â€žÃ˜Â¨Ã˜ÂµÃ˜Â±Ã˜Â©','Ã˜Â¨Ã˜ÂµÃ˜Â±Ã™â€¡','Ã˜Â¨Ã˜ÂµÃ˜Â±Ã˜Â©'],
    nineveh: ['nineveh','ninewa','ninawa','nainawa','mosul','mousl','mousul','Ã™â€ Ã™Å Ã™â€ Ã™Ë†Ã™â€°','Ã™â€ Ã™Å Ã™â€ Ã™Ë†Ã™Å ','Ã˜Â§Ã™â€žÃ™â€¦Ã™Ë†Ã˜ÂµÃ™â€ž','Ã™â€¦Ã™Ë†Ã˜ÂµÃ™â€ž'],
    erbil: ['erbil','arbil','hawler','hewler','Ã˜Â§Ã˜Â±Ã˜Â¨Ã™Å Ã™â€ž','Ã˜Â£Ã˜Â±Ã˜Â¨Ã™Å Ã™â€ž','Ã™â€¡Ã›â€¢Ã™Ë†Ã™â€žÃ›Å½Ã˜Â±'],
    sulaymaniyah: ['sulaymaniyah','sulaimani','sulaymaniya','suleimani','slemani','Ã˜Â§Ã™â€žÃ˜Â³Ã™â€žÃ™Å Ã™â€¦Ã˜Â§Ã™â€ Ã™Å Ã™â€¡','Ã˜Â§Ã™â€žÃ˜Â³Ã™â€žÃ™Å Ã™â€¦Ã˜Â§Ã™â€ Ã™Å Ã˜Â©','Ã˜Â³Ã™â€žÃ™Å Ã™â€¦Ã˜Â§Ã™â€ Ã™Å Ã™â€¡','Ã˜Â³Ã™â€žÃ™Å Ã™â€¦Ã˜Â§Ã™â€ Ã™Å Ã˜Â©','Ã˜Â³Ã™â€žÃ›Å½Ã™â€¦Ã˜Â§Ã™â€ Ã›Å’'],
    duhok: ['duhok','dohuk','Ã˜Â¯Ã™â€¡Ã™Ë†Ã™Æ’','Ã˜Â¯Ã™â€¡Ã›â€ Ã™Æ’'],
    kirkuk: ['kirkuk','Ã™Æ’Ã˜Â±Ã™Æ’Ã™Ë†Ã™Æ’','ÃšÂ©Ã˜Â±ÃšÂ©Ã™Ë†ÃšÂ©','ÃšÂ©Ã›â€¢Ã˜Â±ÃšÂ©Ã™Ë†Ã™Ë†ÃšÂ©'],
    najaf: ['najaf','Ã˜Â§Ã™â€žÃ™â€ Ã˜Â¬Ã™Â','Ã™â€ Ã˜Â¬Ã™Â'],
    karbala: ['karbala','kerbala','Ã™Æ’Ã˜Â±Ã˜Â¨Ã™â€žÃ˜Â§Ã˜Â¡','ÃšÂ©Ã˜Â±Ã˜Â¨Ã™â€žÃ˜Â§'],
    babil: ['babil','babylon','hillah','hilla','Ã˜Â¨Ã˜Â§Ã˜Â¨Ã™â€ž','Ã˜Â§Ã™â€žÃ˜Â­Ã™â€žÃ™â€¡','Ã˜Â§Ã™â€žÃ˜Â­Ã™â€žÃ˜Â©'],
    anbar: ['anbar','Ã˜Â§Ã™â€žÃ˜Â§Ã™â€ Ã˜Â¨Ã˜Â§Ã˜Â±','Ã˜Â§Ã™â€žÃ˜Â£Ã™â€ Ã˜Â¨Ã˜Â§Ã˜Â±','Ã˜Â±Ã™â€¦Ã˜Â§Ã˜Â¯Ã™Å ','ramadi'],
    diyala: ['diyala','Ã˜Â¯Ã™Å Ã˜Â§Ã™â€žÃ™â€°','Ã˜Â¨Ã˜Â¹Ã™â€šÃ™Ë†Ã˜Â¨Ã™â€¡','Ã˜Â¨Ã˜Â¹Ã™â€šÃ™Ë†Ã˜Â¨Ã˜Â©','baquba'],
    wasit: ['wasit','Ã™Ë†Ã˜Â§Ã˜Â³Ã˜Â·','Ã˜Â§Ã™â€žÃ™Æ’Ã™Ë†Ã˜Âª','kut'],
    salah_ad_din: ['salah_ad_din','salahaddin','salah al din','salah ad din','Ã˜ÂµÃ™â€žÃ˜Â§Ã˜Â­ Ã˜Â§Ã™â€žÃ˜Â¯Ã™Å Ã™â€ ','Ã˜ÂªÃ™Æ’Ã˜Â±Ã™Å Ã˜Âª','tikrit'],
    maysan: ['maysan','Ã™â€¦Ã™Å Ã˜Â³Ã˜Â§Ã™â€ ','Ã˜Â§Ã™â€žÃ˜Â¹Ã™â€¦Ã˜Â§Ã˜Â±Ã™â€¡','Ã˜Â§Ã™â€žÃ˜Â¹Ã™â€¦Ã˜Â§Ã˜Â±Ã˜Â©','amara'],
    dhi_qar: ['dhi_qar','dhiqar','Ã˜Â°Ã™Å  Ã™â€šÃ˜Â§Ã˜Â±','Ã˜Â°Ã™â€° Ã™â€šÃ˜Â§Ã˜Â±','Ã˜Â§Ã™â€žÃ™â€ Ã˜Â§Ã˜ÂµÃ˜Â±Ã™Å Ã™â€¡','Ã˜Â§Ã™â€žÃ™â€ Ã˜Â§Ã˜ÂµÃ˜Â±Ã™Å Ã˜Â©','nasiriyah','nasiriya'],
    muthanna: ['muthanna','Ã˜Â§Ã™â€žÃ™â€¦Ã˜Â«Ã™â€ Ã™â€°','Ã˜Â§Ã™â€žÃ˜Â³Ã™â€¦Ã˜Â§Ã™Ë†Ã™â€¡','Ã˜Â§Ã™â€žÃ˜Â³Ã™â€¦Ã˜Â§Ã™Ë†Ã˜Â©','samawah'],
    qadisiyyah: ['qadisiyyah','qadisiyah','diwaniyah','Ã˜Â§Ã™â€žÃ™â€šÃ˜Â§Ã˜Â¯Ã˜Â³Ã™Å Ã™â€¡','Ã˜Â§Ã™â€žÃ™â€šÃ˜Â§Ã˜Â¯Ã˜Â³Ã™Å Ã˜Â©','Ã˜Â§Ã™â€žÃ˜Â¯Ã™Å Ã™Ë†Ã˜Â§Ã™â€ Ã™Å Ã™â€¡','Ã˜Â§Ã™â€žÃ˜Â¯Ã™Å Ã™Ë†Ã˜Â§Ã™â€ Ã™Å Ã˜Â©','diwaniya']
  };

  for (const [id, values] of Object.entries(aliases)) {
    if (cleanTaxonomyValue(id) === raw || compactTaxonomyValue(id) === compact) return id;
    if (values.some((alias) => cleanTaxonomyValue(alias) === raw || compactTaxonomyValue(alias) === compact)) return id;
  }

  return String(value || '').trim();
}

function normalizeCategory(value) {
  const raw = cleanTaxonomyValue(value);
  const compact = compactTaxonomyValue(value);
  const aliases = {
    restaurant: ['restaurant','restaurants','food','Ã™â€¦Ã˜Â·Ã˜Â¹Ã™â€¦','Ã™â€¦Ã˜Â·Ã˜Â§Ã˜Â¹Ã™â€¦','Ã˜Â§Ã™Æ’Ã™â€ž','Ã˜Â£Ã™Æ’Ã™â€ž'],
    cafe: ['cafe','cafes','coffee','Ã™Æ’Ã™Ë†Ã™ÂÃ™Å ','Ã™Æ’Ã˜Â§Ã™ÂÃ™Å Ã™â€¡','Ã™Æ’Ã˜Â§Ã™ÂÃ™Å Ã™â€¡Ã˜Â§Ã˜Âª','Ã™â€¦Ã™â€šÃ™â€¡Ã™â€°'],
    doctor: ['doctor','doctors','Ã˜Â·Ã˜Â¨Ã™Å Ã˜Â¨','Ã˜Â§Ã˜Â·Ã˜Â¨Ã˜Â§Ã˜Â¡','Ã˜Â£Ã˜Â·Ã˜Â¨Ã˜Â§Ã˜Â¡','Ã˜Â¯Ã™Æ’Ã˜ÂªÃ™Ë†Ã˜Â±'],
    clinic: ['clinic','clinics','Ã˜Â¹Ã™Å Ã˜Â§Ã˜Â¯Ã™â€¡','Ã˜Â¹Ã™Å Ã˜Â§Ã˜Â¯Ã˜Â©','Ã˜Â¹Ã™Å Ã˜Â§Ã˜Â¯Ã˜Â§Ã˜Âª','medical'],
    pharmacy: ['pharmacy','pharmacies','Ã˜ÂµÃ™Å Ã˜Â¯Ã™â€žÃ™Å Ã™â€¡','Ã˜ÂµÃ™Å Ã˜Â¯Ã™â€žÃ™Å Ã˜Â©','Ã˜ÂµÃ™Å Ã˜Â¯Ã™â€žÃ™Å Ã˜Â§Ã˜Âª'],
    shopping: ['shopping','shop','market','mall','Ã˜ÂªÃ˜Â³Ã™Ë†Ã™â€š','Ã˜Â³Ã™Ë†Ã™â€š','Ã™â€¦Ã™Ë†Ã™â€ž'],
    clothing: ['clothing','fashion','Ã™â€¦Ã™â€žÃ˜Â§Ã˜Â¨Ã˜Â³','Ã˜Â§Ã˜Â²Ã™Å Ã˜Â§Ã˜Â¡','Ã˜Â£Ã˜Â²Ã™Å Ã˜Â§Ã˜Â¡'],
    cars: ['cars','car','auto','automotive','Ã˜Â³Ã™Å Ã˜Â§Ã˜Â±Ã˜Â§Ã˜Âª','Ã˜Â³Ã™Å Ã˜Â§Ã˜Â±Ã™â€¡','Ã˜Â³Ã™Å Ã˜Â§Ã˜Â±Ã˜Â©'],
    hotel: ['hotel','hotels','Ã™ÂÃ™â€ Ã˜Â§Ã˜Â¯Ã™â€š','Ã™ÂÃ™â€ Ã˜Â¯Ã™â€š'],
    beauty: ['beauty','salon','spa','Ã˜ÂªÃ˜Â¬Ã™â€¦Ã™Å Ã™â€ž','Ã˜ÂµÃ˜Â§Ã™â€žÃ™Ë†Ã™â€ '],
    education: ['education','school','academy','Ã˜ÂªÃ˜Â¹Ã™â€žÃ™Å Ã™â€¦','Ã™â€¦Ã˜Â¯Ã˜Â±Ã˜Â³Ã™â€¡','Ã™â€¦Ã˜Â¯Ã˜Â±Ã˜Â³Ã˜Â©','Ã™â€¦Ã˜Â¹Ã™â€¡Ã˜Â¯'],
    real_estate: ['real_estate','real estate','property','Ã˜Â¹Ã™â€šÃ˜Â§Ã˜Â±','Ã˜Â¹Ã™â€šÃ˜Â§Ã˜Â±Ã˜Â§Ã˜Âª'],
    services: ['services','service','Ã˜Â®Ã˜Â¯Ã™â€¦Ã˜Â§Ã˜Âª','Ã˜Â®Ã˜Â¯Ã™â€¦Ã™â€¡','Ã˜Â®Ã˜Â¯Ã™â€¦Ã˜Â©'],
    electronics: ['electronics','mobile','phone','computer','Ã˜Â§Ã™â€žÃ™Æ’Ã˜ÂªÃ˜Â±Ã™Ë†Ã™â€ Ã™Å Ã˜Â§Ã˜Âª','Ã˜Â¥Ã™â€žÃ™Æ’Ã˜ÂªÃ˜Â±Ã™Ë†Ã™â€ Ã™Å Ã˜Â§Ã˜Âª','Ã™â€¦Ã™Ë†Ã˜Â¨Ã˜Â§Ã™Å Ã™â€ž'],
    gym: ['gym','fitness','sport','sports','Ã™â€ Ã˜Â§Ã˜Â¯Ã™Å ','Ã™â€ Ã™Ë†Ã˜Â§Ã˜Â¯Ã™Å ','Ã˜Â±Ã™Å Ã˜Â§Ã˜Â¶Ã™â€¡','Ã˜Â±Ã™Å Ã˜Â§Ã˜Â¶Ã˜Â©'],
    entertainment: ['entertainment','fun','cinema','Ã˜ÂªÃ˜Â±Ã™ÂÃ™Å Ã™â€¡','Ã˜Â³Ã™Å Ã™â€ Ã™â€¦Ã˜Â§']
  };

  for (const [id, values] of Object.entries(aliases)) {
    if (cleanTaxonomyValue(id) === raw || compactTaxonomyValue(id) === compact) return id;
    if (values.some((alias) => cleanTaxonomyValue(alias) === raw || compactTaxonomyValue(alias) === compact)) return id;
  }

  return String(value || '').trim();
}

import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { HTTPException } from 'hono/http-exception';
import authRoutes from './routes/auth';
import userRoutes from './routes/users';
import businessRoutes from './routes/businesses';
import feedRoutes from './routes/feed';
import heroRoutes from './routes/hero';
import adminRoutes from './routes/admin';
import submissionsRoutes from './routes/submissions';

type Env = {
  DB: any;
  JWT_SECRET: string;
  CORS_ORIGIN: string;
};

const app = new Hono<{ Bindings: Env }>();

// CORS middleware - allow specific origins
const ALLOWED_ORIGINS = [
  'https://shakumaku.pages.dev',
  'http://localhost:5173',
  'http://localhost:5175',
  'http://localhost:3000',
  'http://127.0.0.1:5173',
  'http://127.0.0.1:5175',
  'http://127.0.0.1:3000'
];

app.use('/*', cors({
  origin: (origin, c) => {
    if (!origin) return '*';
    if (ALLOWED_ORIGINS.includes(origin)) return origin;

    const configuredOrigin = String(c.env?.CORS_ORIGIN || '').trim();
    if (configuredOrigin && configuredOrigin === origin) return origin;

    return ALLOWED_ORIGINS[0];
  },
  allowMethods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  exposeHeaders: ['Content-Length', 'X-Requested-With'],
  credentials: true,
  maxAge: 86400,
}));

app.get('/', (c) => {
  return c.json({ 
    status: 'ok', 
    message: 'Saku Maku API is running',
    version: '1.0.0'
  });
});
app.get('/health', async (c) => {
  try {
    await c.env.DB.prepare('SELECT 1 as ok').first();
    return c.json({ ok: true, service: 'shaku-maku-api', database: 'connected' });
  } catch {
    return c.json({ ok: false, service: 'shaku-maku-api', database: 'disconnected' }, 500);
  }
});
app.get('/api/health', async (c) => {
  try {
    await c.env.DB.prepare('SELECT 1 as ok').first();
    return c.json({ success: true, status: 'ok', database: 'connected' });
  } catch {
    return c.json({ success: false, status: 'error', database: 'disconnected' }, 500);
  }
});

app.get('/api/debug/db', async (c) => {
  try {
    const bindingExists = Boolean(c.env.DB);
    if (!bindingExists) {
      return c.json({
        success: false,
        error: 'Database binding missing',
        binding_exists: false
      }, 500);
    }

    const tablesResult = await c.env.DB.prepare(
      `SELECT name FROM sqlite_master WHERE type='table' ORDER BY name`
    ).all();
    const tableNames = (tablesResult.results || []).map((row: any) => String(row.name));
    const hasTable = (name: string) => tableNames.includes(name);

    const businessCountRow = hasTable('businesses')
      ? await c.env.DB.prepare('SELECT COUNT(*) as count FROM businesses').first() as any
      : { count: 0 };

    const categoryCountRow = hasTable('categories')
      ? await c.env.DB.prepare('SELECT COUNT(*) as count FROM categories').first() as any
      : hasTable('businesses')
        ? await c.env.DB.prepare('SELECT COUNT(DISTINCT category) as count FROM businesses').first() as any
        : { count: 0 };

    const governorateCountRow = hasTable('governorates')
      ? await c.env.DB.prepare('SELECT COUNT(*) as count FROM governorates').first() as any
      : hasTable('businesses')
        ? await c.env.DB.prepare('SELECT COUNT(DISTINCT governorate) as count FROM businesses').first() as any
        : { count: 0 };

    const latestBusinessSample = hasTable('businesses')
      ? await c.env.DB.prepare(
          'SELECT id, name_ar, name_en, category, governorate, created_at FROM businesses ORDER BY created_at DESC LIMIT 1'
        ).first()
      : null;

    return c.json({
      success: true,
      binding_exists: true,
      tables: tableNames,
      counts: {
        businesses: Number(businessCountRow?.count || 0),
        categories: Number(categoryCountRow?.count || 0),
        governorates: Number(governorateCountRow?.count || 0),
      },
      latest_business_sample: latestBusinessSample
    });
  } catch (error: any) {
    return c.json({
      success: false,
      error: error?.message || 'DB debug failed'
    }, 500);
  }
});

app.get('/api/categories', async (c) => {
  try {
    const rows = await c.env.DB.prepare(
      'SELECT category, COUNT(*) as count FROM businesses WHERE category IS NOT NULL AND category != "" GROUP BY category ORDER BY count DESC'
    ).all();
    return c.json({ success: true, data: rows.results || [] });
  } catch (error) {
    console.error('Categories route error:', error);
    return c.json({ success: false, error: 'Failed to list categories' }, 500);
  }
});

app.get('/api/governorates', async (c) => {
  try {
    const rows = await c.env.DB.prepare(
      'SELECT governorate, COUNT(*) as count FROM businesses WHERE governorate IS NOT NULL AND governorate != "" GROUP BY governorate ORDER BY count DESC'
    ).all();
    return c.json({ success: true, data: rows.results || [] });
  } catch (error) {
    console.error('Governorates route error:', error);
    return c.json({ success: false, error: 'Failed to list governorates' }, 500);
  }
});

// API routes
app.route('/api/auth', authRoutes);
app.route('/api/users', userRoutes);
app.route('/api/businesses', businessRoutes);
app.route('/api/business-submissions', submissionsRoutes);
app.route('/api/feed', feedRoutes);
app.route('/api/hero-slides', heroRoutes);
app.route('/api', feedRoutes); // aliases: /api/posts, /api/business-posts, etc.
app.route('/api/admin', adminRoutes);

// 404 handler
app.notFound((c) => {
  return c.json({ success: false, error: 'Not found' }, 404);
});

// Error handler
app.onError((err, c) => {
  if (err instanceof HTTPException) {
    if (err.status === 401) {
      return c.json({ success: false, error: 'Authentication required' }, 401);
    }
    if (err.status === 403) {
      return c.json({ success: false, error: 'Admin authorization required' }, 403);
    }
    return c.json({ success: false, error: err.message || 'Request failed' }, err.status);
  }
  console.error('Error:', err);
  return c.json({ 
    success: false,
    error: err.message || 'Internal Server Error'
  }, 500);
});

export default app;


