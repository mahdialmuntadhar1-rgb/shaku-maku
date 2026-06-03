
function cleanTaxonomyValue(value) {
  return String(value || '')
    .toLowerCase()
    .trim()
    .replace(/[أإآ]/g, 'ا')
    .replace(/ة/g, 'ه')
    .replace(/ى/g, 'ي')
    .replace(/[_\-]+/g, ' ')
    .replace(/[\s،,./()\[\]{}]+/g, ' ')
    .trim();
}

function compactTaxonomyValue(value) {
  return cleanTaxonomyValue(value).replace(/\s+/g, '');
}

function normalizeGovernorate(value) {
  const raw = cleanTaxonomyValue(value);
  const compact = compactTaxonomyValue(value);
  const aliases = {
    baghdad: ['baghdad','بغداد'],
    basra: ['basra','basrah','البصره','البصرة','بصره','بصرة'],
    nineveh: ['nineveh','ninewa','ninawa','nainawa','mosul','mousl','mousul','نينوى','نينوي','الموصل','موصل'],
    erbil: ['erbil','arbil','hawler','hewler','اربيل','أربيل','هەولێر'],
    sulaymaniyah: ['sulaymaniyah','sulaimani','sulaymaniya','suleimani','slemani','السليمانيه','السليمانية','سليمانيه','سليمانية','سلێمانی'],
    duhok: ['duhok','dohuk','دهوك','دهۆك'],
    kirkuk: ['kirkuk','كركوك','کرکوک','کەرکووک'],
    najaf: ['najaf','النجف','نجف'],
    karbala: ['karbala','kerbala','كربلاء','کربلا'],
    babil: ['babil','babylon','hillah','hilla','بابل','الحله','الحلة'],
    anbar: ['anbar','الانبار','الأنبار','رمادي','ramadi'],
    diyala: ['diyala','ديالى','بعقوبه','بعقوبة','baquba'],
    wasit: ['wasit','واسط','الكوت','kut'],
    salah_ad_din: ['salah_ad_din','salahaddin','salah al din','salah ad din','صلاح الدين','تكريت','tikrit'],
    maysan: ['maysan','ميسان','العماره','العمارة','amara'],
    dhi_qar: ['dhi_qar','dhiqar','ذي قار','ذى قار','الناصريه','الناصرية','nasiriyah','nasiriya'],
    muthanna: ['muthanna','المثنى','السماوه','السماوة','samawah'],
    qadisiyyah: ['qadisiyyah','qadisiyah','diwaniyah','القادسيه','القادسية','الديوانيه','الديوانية','diwaniya']
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
    restaurant: ['restaurant','restaurants','food','مطعم','مطاعم','اكل','أكل'],
    cafe: ['cafe','cafes','coffee','كوفي','كافيه','كافيهات','مقهى'],
    doctor: ['doctor','doctors','طبيب','اطباء','أطباء','دكتور'],
    clinic: ['clinic','clinics','عياده','عيادة','عيادات','medical'],
    pharmacy: ['pharmacy','pharmacies','صيدليه','صيدلية','صيدليات'],
    shopping: ['shopping','shop','market','mall','تسوق','سوق','مول'],
    clothing: ['clothing','fashion','ملابس','ازياء','أزياء'],
    cars: ['cars','car','auto','automotive','سيارات','سياره','سيارة'],
    hotel: ['hotel','hotels','فنادق','فندق'],
    beauty: ['beauty','salon','spa','تجميل','صالون'],
    education: ['education','school','academy','تعليم','مدرسه','مدرسة','معهد'],
    real_estate: ['real_estate','real estate','property','عقار','عقارات'],
    services: ['services','service','خدمات','خدمه','خدمة'],
    electronics: ['electronics','mobile','phone','computer','الكترونيات','إلكترونيات','موبايل'],
    gym: ['gym','fitness','sport','sports','نادي','نوادي','رياضه','رياضة'],
    entertainment: ['entertainment','fun','cinema','ترفيه','سينما']
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
  'https://shakumako.pages.dev',
  'https://f9f5f957.shaku-maku2026.pages.dev',
  'https://shaku-maku2026.pages.dev',
  'http://localhost:5173',
  'http://localhost:3000',
  'http://127.0.0.1:5173',
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
