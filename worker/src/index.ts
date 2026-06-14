import type { KVNamespace } from '@cloudflare/workers-types';

export interface Env {
  JWT_SECRET: string;
  USERS_KV?: KVNamespace;
  POSTS_KV?: KVNamespace;
  BUSINESSES_KV?: KVNamespace;
}

type JsonValue = Record<string, unknown> | unknown[];

type UserRecord = {
  id: string;
  email: string;
  name: string;
  passwordHash: string;
  createdAt: string;
};

type SessionPayload = {
  id: string;
  email: string;
  name: string;
  exp: number;
};

const SERVICE_NAME = 'shaku-maku-api';
const ADMIN_EMAIL = 'safaribosafar@gmail.com';
const TOKEN_TTL_SECONDS = 60 * 60 * 24 * 7;

const ALLOWED_ORIGINS = new Set([
  'https://shaku-makut.pages.dev',
  'http://localhost:5173',
  'http://127.0.0.1:5173'
]);

const localUsers = new Map<string, UserRecord>();
let localPosts = seedPosts();
let localBusinesses = seedBusinesses();

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders(request) });
    }

    try {
      if (url.pathname === '/health' && request.method === 'GET') {
        return json(request, { ok: true, service: SERVICE_NAME });
      }

      if ((url.pathname === '/auth/signup' || url.pathname === '/auth/register') && request.method === 'POST') {
        return handleSignup(request, env);
      }

      if (url.pathname === '/auth/login' && request.method === 'POST') {
        return handleLogin(request, env);
      }

      if (url.pathname === '/auth/logout' && request.method === 'POST') {
        return json(request, { success: true, message: 'Logged out' });
      }

      if ((url.pathname === '/auth/forgot-password' || url.pathname === '/auth/request-reset') && request.method === 'POST') {
        return json(request, {
          success: true,
          message: 'If an account exists for this email, password reset instructions will be sent.'
        });
      }

      if (url.pathname === '/auth/reset-password' && request.method === 'POST') {
        return json(request, {
          success: false,
          error: 'Password reset tokens are not configured yet.'
        }, 501);
      }

      if (url.pathname === '/businesses' && request.method === 'GET') {
        return handleListBusinesses(request, env, url);
      }

      if (url.pathname === '/businesses' && request.method === 'POST') {
        const admin = await requireAdmin(request, env);
        if (admin instanceof Response) return admin;
        return handleCreateBusiness(request, env);
      }

      const businessMatch = url.pathname.match(/^\/businesses\/([^/]+)$/);
      if (businessMatch && request.method === 'GET') {
        return handleGetBusiness(request, env, businessMatch[1]);
      }

      if (url.pathname === '/posts' && request.method === 'GET') {
        return handleListPosts(request, env, url);
      }

      if (url.pathname === '/posts' && request.method === 'POST') {
        const session = await requireSession(request, env);
        if (session instanceof Response) return session;
        return handleCreatePost(request, env, session);
      }

      const postMatch = url.pathname.match(/^\/posts\/([^/]+)$/);
      if (postMatch && request.method === 'DELETE') {
        const admin = await requireAdmin(request, env);
        if (admin instanceof Response) return admin;
        return handleDeletePost(request, env, postMatch[1]);
      }

      if (postMatch && request.method === 'PATCH') {
        const admin = await requireAdmin(request, env);
        if (admin instanceof Response) return admin;
        return handlePatchPost(request, env, postMatch[1]);
      }

      return json(request, { success: false, error: `API route not found: ${request.method} ${url.pathname}` }, 404);
    } catch (error) {
      return json(request, {
        success: false,
        error: error instanceof Error ? error.message : 'Unexpected API error'
      }, 500);
    }
  }
};

async function handleSignup(request: Request, env: Env): Promise<Response> {
  const body = await readJson(request);
  const email = normalizeEmail(body.email);
  const password = String(body.password || '');
  const name = String(body.name || email.split('@')[0]).trim();

  if (!email || !password || !name) {
    return json(request, { success: false, error: 'Email, password, and name are required.' }, 400);
  }
  if (password.length < 8) {
    return json(request, { success: false, error: 'Password must be at least 8 characters.' }, 400);
  }

  const existing = await getUser(env, email);
  if (existing) {
    return json(request, { success: false, error: 'An account with this email already exists.' }, 409);
  }

  const user: UserRecord = {
    id: crypto.randomUUID(),
    email,
    name,
    passwordHash: await hashPassword(password),
    createdAt: new Date().toISOString()
  };

  await saveUser(env, user);
  const token = await signToken(env, { id: user.id, email: user.email, name: user.name, exp: tokenExpiry() });

  return json(request, { success: true, token, user: publicUser(user) }, 201);
}

async function handleLogin(request: Request, env: Env): Promise<Response> {
  const body = await readJson(request);
  const email = normalizeEmail(body.email);
  const password = String(body.password || '');

  if (!email || !password) {
    return json(request, { success: false, error: 'Email and password are required.' }, 400);
  }

  const user = await getUser(env, email);
  if (!user || !(await verifyPassword(password, user.passwordHash))) {
    return json(request, { success: false, error: 'Invalid email or password.' }, 401);
  }

  const token = await signToken(env, { id: user.id, email: user.email, name: user.name, exp: tokenExpiry() });
  return json(request, { success: true, token, user: publicUser(user) });
}

async function handleListBusinesses(request: Request, env: Env, url: URL): Promise<Response> {
  let businesses = await getBusinesses(env);
  const governorate = url.searchParams.get('governorate');
  const category = url.searchParams.get('category');
  const search = url.searchParams.get('search')?.toLowerCase();

  if (governorate && governorate !== 'all') {
    businesses = businesses.filter((business) => business.governorate === governorate);
  }
  if (category) {
    businesses = businesses.filter((business) => business.category === category);
  }
  if (search) {
    businesses = businesses.filter((business) => JSON.stringify(business).toLowerCase().includes(search));
  }

  return json(request, { success: true, data: businesses, businesses, total: businesses.length });
}

async function handleGetBusiness(request: Request, env: Env, id: string): Promise<Response> {
  const business = (await getBusinesses(env)).find((item) => String(item.id) === decodeURIComponent(id));
  if (!business) {
    return json(request, { success: false, error: 'Business not found.' }, 404);
  }
  return json(request, { success: true, data: business, business });
}

async function handleCreateBusiness(request: Request, env: Env): Promise<Response> {
  const body = await readJson(request);
  const name = typeof body.name === 'string' ? body.name.trim() : '';
  if (!name) {
    return json(request, { success: false, error: 'Business name is required.' }, 400);
  }

  const business = {
    id: body.id || crypto.randomUUID(),
    name,
    description: body.description || '',
    category: body.category || 'services',
    governorate: body.governorate || 'baghdad',
    rating: Number(body.rating || 0),
    reviewCount: Number(body.reviewCount || body.reviewsCount || 0),
    coverImageUrl: body.coverImageUrl || body.image || '',
    logoUrl: body.logoUrl || body.avatar || '',
    verified: Boolean(body.verified),
    phone: body.phone || body.phoneNumber || '',
    address: body.address || '',
    createdAt: new Date().toISOString()
  };

  const businesses = [business, ...(await getBusinesses(env))];
  await saveBusinesses(env, businesses);
  return json(request, { success: true, data: business, business }, 201);
}

async function handleListPosts(request: Request, env: Env, url: URL): Promise<Response> {
  let posts = await getPosts(env);
  const governorate = url.searchParams.get('governorate');
  if (governorate && governorate !== 'all') {
    posts = posts.filter((post) => post.governorate === governorate);
  }
  return json(request, { success: true, data: posts, posts, total: posts.length });
}

async function handleCreatePost(request: Request, env: Env, session: SessionPayload): Promise<Response> {
  const body = await readJson(request);
  const caption = body.caption && typeof body.caption === 'object'
    ? body.caption
    : { ar: String(body.caption || ''), ku: String(body.caption || ''), en: String(body.caption || '') };

  if (!String(caption.ar || caption.ku || caption.en || '').trim()) {
    return json(request, { success: false, error: 'Post caption is required.' }, 400);
  }

  const post = {
    id: body.id || crypto.randomUUID(),
    businessId: body.businessId || 'community',
    businessName: body.businessName || session.name,
    businessAvatar: body.businessAvatar || '',
    category: body.category || 'community',
    governorate: body.governorate || 'baghdad',
    mediaUrl: body.mediaUrl || '',
    videoUrl: body.videoUrl || '',
    caption,
    likes: Number(body.likes || 0),
    commentsCount: 0,
    comments: [],
    shares: 0,
    views: 0,
    timeAgo: { ar: 'الآن', ku: 'ئێستا', en: 'Just now' },
    authorUid: session.id,
    createdAt: new Date().toISOString()
  };

  const posts = [post, ...(await getPosts(env))];
  await savePosts(env, posts);
  return json(request, { success: true, data: post, post }, 201);
}

async function handleDeletePost(request: Request, env: Env, id: string): Promise<Response> {
  const posts = await getPosts(env);
  const nextPosts = posts.filter((post) => String(post.id) !== decodeURIComponent(id));
  if (nextPosts.length === posts.length) {
    return json(request, { success: false, error: 'Post not found.' }, 404);
  }
  await savePosts(env, nextPosts);
  return json(request, { success: true, deletedId: id });
}

async function handlePatchPost(request: Request, env: Env, id: string): Promise<Response> {
  const updates = await readJson(request);
  const posts = await getPosts(env);
  const postId = decodeURIComponent(id);
  const index = posts.findIndex((post) => String(post.id) === postId);
  if (index === -1) {
    return json(request, { success: false, error: 'Post not found.' }, 404);
  }
  posts[index] = {
    ...posts[index],
    ...pick(updates, ['caption', 'mediaUrl', 'videoUrl', 'promotionBadge', 'governorate', 'category']),
    updatedAt: new Date().toISOString()
  };
  await savePosts(env, posts);
  return json(request, { success: true, data: posts[index], post: posts[index] });
}

async function requireSession(request: Request, env: Env): Promise<SessionPayload | Response> {
  const auth = request.headers.get('Authorization') || '';
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : '';
  if (!token) {
    return json(request, { success: false, error: 'Authentication token is required.' }, 401);
  }
  const payload = await verifyToken(env, token);
  if (!payload) {
    return json(request, { success: false, error: 'Invalid or expired authentication token.' }, 401);
  }
  return payload;
}

async function requireAdmin(request: Request, env: Env): Promise<SessionPayload | Response> {
  const session = await requireSession(request, env);
  if (session instanceof Response) return session;
  if (session.email !== ADMIN_EMAIL) {
    return json(request, { success: false, error: 'Admin permission is required.' }, 403);
  }
  return session;
}

async function getUser(env: Env, email: string): Promise<UserRecord | null> {
  if (env.USERS_KV) {
    return env.USERS_KV.get<UserRecord>(`user:${email}`, 'json');
  }
  return localUsers.get(email) || null;
}

async function saveUser(env: Env, user: UserRecord): Promise<void> {
  if (env.USERS_KV) {
    await env.USERS_KV.put(`user:${user.email}`, JSON.stringify(user));
    return;
  }
  localUsers.set(user.email, user);
}

async function getBusinesses(env: Env): Promise<any[]> {
  if (env.BUSINESSES_KV) {
    const saved = await env.BUSINESSES_KV.get<any[]>('businesses', 'json');
    if (saved) return saved;
  }
  return localBusinesses;
}

async function saveBusinesses(env: Env, businesses: any[]): Promise<void> {
  if (env.BUSINESSES_KV) {
    await env.BUSINESSES_KV.put('businesses', JSON.stringify(businesses));
    return;
  }
  localBusinesses = businesses;
}

async function getPosts(env: Env): Promise<any[]> {
  if (env.POSTS_KV) {
    const saved = await env.POSTS_KV.get<any[]>('posts', 'json');
    if (saved) return saved;
  }
  return localPosts;
}

async function savePosts(env: Env, posts: any[]): Promise<void> {
  if (env.POSTS_KV) {
    await env.POSTS_KV.put('posts', JSON.stringify(posts));
    return;
  }
  localPosts = posts;
}

async function readJson(request: Request): Promise<Record<string, any>> {
  try {
    return await request.json();
  } catch {
    return {};
  }
}

function json(request: Request, body: JsonValue, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      ...corsHeaders(request),
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store'
    }
  });
}

function corsHeaders(request: Request): HeadersInit {
  const origin = request.headers.get('Origin') || '';
  const allowedOrigin = ALLOWED_ORIGINS.has(origin) ? origin : 'https://shaku-makut.pages.dev';
  return {
    'Access-Control-Allow-Origin': allowedOrigin,
    'Access-Control-Allow-Methods': 'GET,POST,PATCH,DELETE,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type,Authorization',
    'Access-Control-Max-Age': '86400',
    'Vary': 'Origin'
  };
}

function normalizeEmail(value: unknown): string {
  return String(value || '').trim().toLowerCase();
}

function publicUser(user: UserRecord) {
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.email === ADMIN_EMAIL ? 'admin' : 'user',
    createdAt: user.createdAt
  };
}

function tokenExpiry(): number {
  return Math.floor(Date.now() / 1000) + TOKEN_TTL_SECONDS;
}

async function hashPassword(password: string): Promise<string> {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const key = await passwordKey(password);
  const derived = await crypto.subtle.deriveBits(
    { name: 'PBKDF2', salt, iterations: 100_000, hash: 'SHA-256' },
    key,
    256
  );
  return `pbkdf2.${base64UrlEncode(salt)}.${base64UrlEncode(new Uint8Array(derived))}`;
}

async function verifyPassword(password: string, stored: string): Promise<boolean> {
  const [, saltValue, hashValue] = stored.split('.');
  if (!saltValue || !hashValue) return false;
  const salt = base64UrlDecode(saltValue);
  const key = await passwordKey(password);
  const derived = await crypto.subtle.deriveBits(
    { name: 'PBKDF2', salt, iterations: 100_000, hash: 'SHA-256' },
    key,
    256
  );
  return timingSafeEqual(base64UrlEncode(new Uint8Array(derived)), hashValue);
}

async function passwordKey(password: string): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(password),
    'PBKDF2',
    false,
    ['deriveBits']
  );
}

async function signToken(env: Env, payload: SessionPayload): Promise<string> {
  const header = base64UrlEncode(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const body = base64UrlEncode(JSON.stringify(payload));
  const signature = await hmac(env, `${header}.${body}`);
  return `${header}.${body}.${signature}`;
}

async function verifyToken(env: Env, token: string): Promise<SessionPayload | null> {
  const [header, body, signature] = token.split('.');
  if (!header || !body || !signature) return null;
  const expected = await hmac(env, `${header}.${body}`);
  if (!timingSafeEqual(signature, expected)) return null;
  const payload = JSON.parse(new TextDecoder().decode(base64UrlDecode(body))) as SessionPayload;
  if (!payload.email || payload.exp < Math.floor(Date.now() / 1000)) return null;
  return payload;
}

async function hmac(env: Env, value: string): Promise<string> {
  const secret = env.JWT_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error('JWT_SECRET must be configured and at least 32 characters long.');
  }
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const signature = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(value));
  return base64UrlEncode(new Uint8Array(signature));
}

function base64UrlEncode(value: string | Uint8Array): string {
  const bytes = typeof value === 'string' ? new TextEncoder().encode(value) : value;
  let binary = '';
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}

function base64UrlDecode(value: string): Uint8Array {
  const padded = value.replace(/-/g, '+').replace(/_/g, '/') + '='.repeat((4 - value.length % 4) % 4);
  const binary = atob(padded);
  return Uint8Array.from(binary, (char) => char.charCodeAt(0));
}

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let result = 0;
  for (let i = 0; i < a.length; i += 1) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return result === 0;
}

function pick(source: Record<string, any>, keys: string[]): Record<string, any> {
  return keys.reduce<Record<string, any>>((acc, key) => {
    if (source[key] !== undefined) acc[key] = source[key];
    return acc;
  }, {});
}

function seedBusinesses() {
  return [
    {
      id: 'baghdad-coffee-1',
      name: 'بيت القهوة البغدادي',
      description: 'مقهى عراقي يقدم القهوة العربية والحلويات المحلية.',
      category: 'coffee',
      governorate: 'baghdad',
      rating: 4.8,
      reviewCount: 128,
      coverImageUrl: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=1200&auto=format&fit=crop',
      logoUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=200&auto=format&fit=crop',
      verified: true,
      phone: '+9647700000001',
      address: 'الكرادة، بغداد'
    },
    {
      id: 'erbil-market-1',
      name: 'بازاڕی هەولێر',
      description: 'متجر محلي للمنتجات الكردية والهدايا اليدوية.',
      category: 'shopping',
      governorate: 'erbil',
      rating: 4.7,
      reviewCount: 96,
      coverImageUrl: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=1200&auto=format&fit=crop',
      logoUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&auto=format&fit=crop',
      verified: true,
      phone: '+9647500000002',
      address: 'Erbil Bazaar'
    },
    {
      id: 'basra-food-1',
      name: 'مطعم شط العرب',
      description: 'أكلات بصرية ومأكولات بحرية طازجة.',
      category: 'restaurant',
      governorate: 'basra',
      rating: 4.6,
      reviewCount: 84,
      coverImageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&auto=format&fit=crop',
      logoUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=200&auto=format&fit=crop',
      verified: true,
      phone: '+9647800000003',
      address: 'العشار، البصرة'
    }
  ];
}

function seedPosts() {
  return [
    {
      id: 'post-welcome-1',
      businessId: 'baghdad-coffee-1',
      businessName: 'بيت القهوة البغدادي',
      businessAvatar: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=200&auto=format&fit=crop',
      category: 'coffee',
      governorate: 'baghdad',
      mediaUrl: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=1200&auto=format&fit=crop',
      caption: {
        ar: 'أهلاً بكم في شكو ماكو. تابعوا عروض المتاجر العراقية القريبة منكم.',
        ku: 'بەخێربێن بۆ شکو ماکو. نوێترین پێشکەشکارییە ناوخۆییەکان ببینن.',
        en: 'Welcome to Shaku Maku. Follow local Iraqi business updates near you.'
      },
      likes: 24,
      commentsCount: 0,
      shares: 3,
      views: 240,
      timeAgo: { ar: 'اليوم', ku: 'ئەمڕۆ', en: 'Today' },
      comments: [],
      authorUid: 'system'
    }
  ];
}
