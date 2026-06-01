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
