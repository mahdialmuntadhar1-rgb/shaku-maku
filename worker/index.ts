
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
    baghdad: ['baghdad', 'بغداد'],
    basra: ['basra', 'basrah', 'البصرة', 'بصرة', 'بەسرە'],
    nineveh: ['nineveh', 'ninewa', 'ninawa', 'mosul', 'الموصل', 'موصل', 'نينوى', 'مووسڵ', 'نەینەوا'],
    erbil: ['erbil', 'arbil', 'hawler', 'hewler', 'اربيل', 'أربيل', 'هەولێر'],
    sulaymaniyah: ['sulaymaniyah', 'sulaimani', 'sulaymaniya', 'slemani', 'السليمانية', 'سليمانية', 'سلێمانی'],
    duhok: ['duhok', 'dohuk', 'دهوك', 'دهۆک'],
    kirkuk: ['kirkuk', 'كركوك', 'کرکوک', 'کەرکووک'],
    najaf: ['najaf', 'النجف', 'نجف', 'نەجەف'],
    karbala: ['karbala', 'kerbala', 'كربلاء', 'کەربەلا'],
    babil: ['babil', 'babylon', 'hillah', 'hilla', 'بابل', 'الحلة', 'حلة'],
    anbar: ['anbar', 'الانبار', 'الأنبار', 'رمادي', 'ramadi', 'ئەنبار'],
    diyala: ['diyala', 'ديالى', 'بعقوبة', 'baquba', 'دیالە'],
    wasit: ['wasit', 'واسط', 'الكوت', 'kut'],
    salah_ad_din: ['salah_ad_din', 'salahaddin', 'salah al din', 'salah ad din', 'صلاح الدين', 'تكريت', 'tikrit', 'سەڵاحەددین'],
    maysan: ['maysan', 'ميسان', 'العمارة', 'amara', 'میسان'],
    dhi_qar: ['dhi_qar', 'dhiqar', 'dhi qar', 'ذي قار', 'الناصرية', 'nasiriyah', 'nasiriya', 'زیقار'],
    muthanna: ['muthanna', 'المثنى', 'السماوة', 'samawah', 'موسەنا'],
    qadisiyyah: ['qadisiyyah', 'qadisiyah', 'diwaniyah', 'القادسية', 'الديوانية', 'diwaniya', 'قادسیە']
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
    restaurant: ['restaurant', 'restaurants', 'food', 'مطعم', 'مطاعم', 'اكل', 'أكل', 'چێشتخانە'],
    cafe: ['cafe', 'cafes', 'coffee', 'كوفي', 'كافيه', 'كافيهات', 'مقهى', 'کافێ'],
    doctor: ['doctor', 'doctors', 'طبيب', 'اطباء', 'أطباء', 'دكتور', 'دکتۆر'],
    clinic: ['clinic', 'clinics', 'عياده', 'عيادة', 'عيادات', 'medical', 'کلینیک'],
    pharmacy: ['pharmacy', 'pharmacies', 'صيدليه', 'صيدلية', 'صيدليات', 'دەرمانخانە'],
    shopping: ['shopping', 'shop', 'market', 'mall', 'تسوق', 'سوق', 'مول', 'مۆڵ'],
    clothing: ['clothing', 'fashion', 'ملابس', 'ازياء', 'أزياء', 'جلوبەرگ'],
    cars: ['cars', 'car', 'auto', 'automotive', 'سيارات', 'سياره', 'سيارة', 'ئۆتۆمبێل'],
    hotel: ['hotel', 'hotels', 'فنادق', 'فندق', 'هۆتێل'],
    beauty: ['beauty', 'salon', 'spa', 'تجميل', 'صالون', 'جوانکاری'],
    education: ['education', 'school', 'academy', 'تعليم', 'مدرسه', 'مدرسة', 'معهد', 'زانکۆ', 'قوتابخانە'],
    real_estate: ['real_estate', 'real estate', 'property', 'عقار', 'عقارات', 'عەقارات'],
    services: ['services', 'service', 'خدمات', 'خدمه', 'خدمة', 'خزمەتگوزاری'],
    electronics: ['electronics', 'mobile', 'phone', 'computer', 'الكترونيات', 'إلكترونيات', 'موبايل', 'مۆبایل'],
    gym: ['gym', 'fitness', 'sport', 'sports', 'نادي', 'نوادي', 'رياضه', 'رياضة', 'وەرزش'],
    entertainment: ['entertainment', 'fun', 'cinema', 'ترفيه', 'سينما', 'سینەما']
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

// Public launch API security headers.
// These protect API responses from common browser-side risks.
app.use('/*', async (c, next) => {
  c.header('X-Content-Type-Options', 'nosniff');
  c.header('Referrer-Policy', 'strict-origin-when-cross-origin');
  c.header('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), payment=(), usb=()');
  c.header('X-Frame-Options', 'DENY');

  if (c.req.path.startsWith('/api/auth/')) {
    c.header('Cache-Control', 'no-store');
  }

  await next();
});
// Public launch safety rate limiter.
// This protects sensitive public endpoints from simple spam/brute-force abuse.
// Cloudflare WAF/Turnstile is still recommended later for stronger protection.
type RateLimitRule = {
  keyPrefix: string;
  windowMs: number;
  max: number;
};

const RATE_LIMIT_BUCKETS = new Map<string, { count: number; resetAt: number }>();

function getClientIp(c: any): string {
  const forwarded = c.req.header('CF-Connecting-IP')
    || c.req.header('X-Forwarded-For')
    || c.req.header('X-Real-IP')
    || 'unknown';

  return String(forwarded).split(',')[0].trim() || 'unknown';
}

function getRateLimitRule(method: string, path: string): RateLimitRule | null {
  const m = String(method || '').toUpperCase();
  const p = String(path || '').toLowerCase();

  if (m === 'POST' && p === '/api/auth/login') {
    return { keyPrefix: 'auth-login', windowMs: 15 * 60 * 1000, max: 12 };
  }

  if (m === 'POST' && p === '/api/auth/register') {
    return { keyPrefix: 'auth-register', windowMs: 60 * 60 * 1000, max: 6 };
  }

  if (m === 'POST' && p === '/api/auth/forgot-password') {
    return { keyPrefix: 'auth-forgot-password', windowMs: 60 * 60 * 1000, max: 5 };
  }

  if (m === 'POST' && p === '/api/auth/reset-password') {
    return { keyPrefix: 'auth-reset-password', windowMs: 60 * 60 * 1000, max: 8 };
  }

  if (m === 'POST' && p === '/api/feed/posts') {
    return { keyPrefix: 'feed-create-post', windowMs: 10 * 60 * 1000, max: 15 };
  }

  if (m === 'POST' && /^\/api\/feed\/posts\/[^/]+\/comments$/.test(p)) {
    return { keyPrefix: 'feed-create-comment', windowMs: 10 * 60 * 1000, max: 25 };
  }

  return null;
}

app.use('/*', async (c, next) => {
  const rule = getRateLimitRule(c.req.method, c.req.path);

  if (!rule) {
    return next();
  }

  const now = Date.now();
  const ip = getClientIp(c);
  const key = `${rule.keyPrefix}:${ip}`;
  const current = RATE_LIMIT_BUCKETS.get(key);

  if (!current || current.resetAt <= now) {
    RATE_LIMIT_BUCKETS.set(key, {
      count: 1,
      resetAt: now + rule.windowMs
    });

    return next();
  }

  if (current.count >= rule.max) {
    const retryAfterSeconds = Math.max(1, Math.ceil((current.resetAt - now) / 1000));

    c.header('Retry-After', String(retryAfterSeconds));

    return c.json({
      success: false,
      error: 'Too many requests. Please try again later.'
    }, 429);
  }

  current.count += 1;
  RATE_LIMIT_BUCKETS.set(key, current);

  return next();
});


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
  // Public launch safety:
  // Do not expose database structure, counts, or sample rows publicly.
  return c.json({ success: false, error: 'Not found' }, 404);
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


