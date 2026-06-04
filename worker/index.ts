
function cleanTaxonomyValue(value) {
  return String(value || '')
    .toLowerCase()
    .trim()
    .replace(/[Ø£Ø¥Ø¢]/g, 'Ø§')
    .replace(/Ø©/g, 'Ù‡')
    .replace(/Ù‰/g, 'ÙŠ')
    .replace(/[_\-]+/g, ' ')
    .replace(/[\sØŒ,./()\[\]{}]+/g, ' ')
    .trim();
}

function compactTaxonomyValue(value) {
  return cleanTaxonomyValue(value).replace(/\s+/g, '');
}

function normalizeGovernorate(value) {
  const raw = cleanTaxonomyValue(value);
  const compact = compactTaxonomyValue(value);
  const aliases = {
    baghdad: ['baghdad','Ø¨ØºØ¯Ø§Ø¯'],
    basra: ['basra','basrah','Ø§Ù„Ø¨ØµØ±Ù‡','Ø§Ù„Ø¨ØµØ±Ø©','Ø¨ØµØ±Ù‡','Ø¨ØµØ±Ø©'],
    nineveh: ['nineveh','ninewa','ninawa','nainawa','mosul','mousl','mousul','Ù†ÙŠÙ†ÙˆÙ‰','Ù†ÙŠÙ†ÙˆÙŠ','Ø§Ù„Ù…ÙˆØµÙ„','Ù…ÙˆØµÙ„'],
    erbil: ['erbil','arbil','hawler','hewler','Ø§Ø±Ø¨ÙŠÙ„','Ø£Ø±Ø¨ÙŠÙ„','Ù‡Û•ÙˆÙ„ÛŽØ±'],
    sulaymaniyah: ['sulaymaniyah','sulaimani','sulaymaniya','suleimani','slemani','Ø§Ù„Ø³Ù„ÙŠÙ…Ø§Ù†ÙŠÙ‡','Ø§Ù„Ø³Ù„ÙŠÙ…Ø§Ù†ÙŠØ©','Ø³Ù„ÙŠÙ…Ø§Ù†ÙŠÙ‡','Ø³Ù„ÙŠÙ…Ø§Ù†ÙŠØ©','Ø³Ù„ÛŽÙ…Ø§Ù†ÛŒ'],
    duhok: ['duhok','dohuk','Ø¯Ù‡ÙˆÙƒ','Ø¯Ù‡Û†Ùƒ'],
    kirkuk: ['kirkuk','ÙƒØ±ÙƒÙˆÙƒ','Ú©Ø±Ú©ÙˆÚ©','Ú©Û•Ø±Ú©ÙˆÙˆÚ©'],
    najaf: ['najaf','Ø§Ù„Ù†Ø¬Ù','Ù†Ø¬Ù'],
    karbala: ['karbala','kerbala','ÙƒØ±Ø¨Ù„Ø§Ø¡','Ú©Ø±Ø¨Ù„Ø§'],
    babil: ['babil','babylon','hillah','hilla','Ø¨Ø§Ø¨Ù„','Ø§Ù„Ø­Ù„Ù‡','Ø§Ù„Ø­Ù„Ø©'],
    anbar: ['anbar','Ø§Ù„Ø§Ù†Ø¨Ø§Ø±','Ø§Ù„Ø£Ù†Ø¨Ø§Ø±','Ø±Ù…Ø§Ø¯ÙŠ','ramadi'],
    diyala: ['diyala','Ø¯ÙŠØ§Ù„Ù‰','Ø¨Ø¹Ù‚ÙˆØ¨Ù‡','Ø¨Ø¹Ù‚ÙˆØ¨Ø©','baquba'],
    wasit: ['wasit','ÙˆØ§Ø³Ø·','Ø§Ù„ÙƒÙˆØª','kut'],
    salah_ad_din: ['salah_ad_din','salahaddin','salah al din','salah ad din','ØµÙ„Ø§Ø­ Ø§Ù„Ø¯ÙŠÙ†','ØªÙƒØ±ÙŠØª','tikrit'],
    maysan: ['maysan','Ù…ÙŠØ³Ø§Ù†','Ø§Ù„Ø¹Ù…Ø§Ø±Ù‡','Ø§Ù„Ø¹Ù…Ø§Ø±Ø©','amara'],
    dhi_qar: ['dhi_qar','dhiqar','Ø°ÙŠ Ù‚Ø§Ø±','Ø°Ù‰ Ù‚Ø§Ø±','Ø§Ù„Ù†Ø§ØµØ±ÙŠÙ‡','Ø§Ù„Ù†Ø§ØµØ±ÙŠØ©','nasiriyah','nasiriya'],
    muthanna: ['muthanna','Ø§Ù„Ù…Ø«Ù†Ù‰','Ø§Ù„Ø³Ù…Ø§ÙˆÙ‡','Ø§Ù„Ø³Ù…Ø§ÙˆØ©','samawah'],
    qadisiyyah: ['qadisiyyah','qadisiyah','diwaniyah','Ø§Ù„Ù‚Ø§Ø¯Ø³ÙŠÙ‡','Ø§Ù„Ù‚Ø§Ø¯Ø³ÙŠØ©','Ø§Ù„Ø¯ÙŠÙˆØ§Ù†ÙŠÙ‡','Ø§Ù„Ø¯ÙŠÙˆØ§Ù†ÙŠØ©','diwaniya']
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
    restaurant: ['restaurant','restaurants','food','Ù…Ø·Ø¹Ù…','Ù…Ø·Ø§Ø¹Ù…','Ø§ÙƒÙ„','Ø£ÙƒÙ„'],
    cafe: ['cafe','cafes','coffee','ÙƒÙˆÙÙŠ','ÙƒØ§ÙÙŠÙ‡','ÙƒØ§ÙÙŠÙ‡Ø§Øª','Ù…Ù‚Ù‡Ù‰'],
    doctor: ['doctor','doctors','Ø·Ø¨ÙŠØ¨','Ø§Ø·Ø¨Ø§Ø¡','Ø£Ø·Ø¨Ø§Ø¡','Ø¯ÙƒØªÙˆØ±'],
    clinic: ['clinic','clinics','Ø¹ÙŠØ§Ø¯Ù‡','Ø¹ÙŠØ§Ø¯Ø©','Ø¹ÙŠØ§Ø¯Ø§Øª','medical'],
    pharmacy: ['pharmacy','pharmacies','ØµÙŠØ¯Ù„ÙŠÙ‡','ØµÙŠØ¯Ù„ÙŠØ©','ØµÙŠØ¯Ù„ÙŠØ§Øª'],
    shopping: ['shopping','shop','market','mall','ØªØ³ÙˆÙ‚','Ø³ÙˆÙ‚','Ù…ÙˆÙ„'],
    clothing: ['clothing','fashion','Ù…Ù„Ø§Ø¨Ø³','Ø§Ø²ÙŠØ§Ø¡','Ø£Ø²ÙŠØ§Ø¡'],
    cars: ['cars','car','auto','automotive','Ø³ÙŠØ§Ø±Ø§Øª','Ø³ÙŠØ§Ø±Ù‡','Ø³ÙŠØ§Ø±Ø©'],
    hotel: ['hotel','hotels','ÙÙ†Ø§Ø¯Ù‚','ÙÙ†Ø¯Ù‚'],
    beauty: ['beauty','salon','spa','ØªØ¬Ù…ÙŠÙ„','ØµØ§Ù„ÙˆÙ†'],
    education: ['education','school','academy','ØªØ¹Ù„ÙŠÙ…','Ù…Ø¯Ø±Ø³Ù‡','Ù…Ø¯Ø±Ø³Ø©','Ù…Ø¹Ù‡Ø¯'],
    real_estate: ['real_estate','real estate','property','Ø¹Ù‚Ø§Ø±','Ø¹Ù‚Ø§Ø±Ø§Øª'],
    services: ['services','service','Ø®Ø¯Ù…Ø§Øª','Ø®Ø¯Ù…Ù‡','Ø®Ø¯Ù…Ø©'],
    electronics: ['electronics','mobile','phone','computer','Ø§Ù„ÙƒØªØ±ÙˆÙ†ÙŠØ§Øª','Ø¥Ù„ÙƒØªØ±ÙˆÙ†ÙŠØ§Øª','Ù…ÙˆØ¨Ø§ÙŠÙ„'],
    gym: ['gym','fitness','sport','sports','Ù†Ø§Ø¯ÙŠ','Ù†ÙˆØ§Ø¯ÙŠ','Ø±ÙŠØ§Ø¶Ù‡','Ø±ÙŠØ§Ø¶Ø©'],
    entertainment: ['entertainment','fun','cinema','ØªØ±ÙÙŠÙ‡','Ø³ÙŠÙ†Ù…Ø§']
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
