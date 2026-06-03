import { verify } from 'hono/jwt';

type AuthPayload = {
  id?: string;
  email?: string;
  role?: string;
  is_admin?: number | boolean;
  [key: string]: any;
};

export async function requireAuth(c: any): Promise<{ ok: true; payload: AuthPayload } | { ok: false; response: Response }> {
  const authHeader = c.req.header('Authorization') || c.req.header('authorization') || '';
  if (!authHeader.startsWith('Bearer ')) {
    return {
      ok: false,
      response: c.json({ success: false, error: 'Authentication required' }, 401)
    };
  }

  const token = authHeader.slice('Bearer '.length).trim();
  if (!token) {
    return {
      ok: false,
      response: c.json({ success: false, error: 'Authentication required' }, 401)
    };
  }

  try {
    const payload = await verify(token, c.env.JWT_SECRET, 'HS256');
    return { ok: true, payload: payload as AuthPayload };
  } catch {
    return {
      ok: false,
      response: c.json({ success: false, error: 'Authentication required' }, 401)
    };
  }
}

export async function requireAdmin(c: any): Promise<{ ok: true; userId: string; payload: AuthPayload } | { ok: false; response: Response }> {
  const auth = await requireAuth(c);
  if (auth.ok === false) return auth;

  const tokenUserId = String(auth.payload.id || '').trim();
  const tokenEmail = String(auth.payload.email || '').trim().toLowerCase();

  const user = await c.env.DB.prepare(
    `SELECT id, email, is_admin, role
     FROM users
     WHERE id = ?
        OR lower(email) = ?
     LIMIT 1`
  ).bind(tokenUserId, tokenEmail).first() as any;

  if (!user) {
    return {
      ok: false,
      response: c.json({ success: false, error: 'Authentication required' }, 401)
    };
  }

  const isAdmin = Number(user.is_admin) === 1 || user.role === 'admin';
  if (!isAdmin) {
    return {
      ok: false,
      response: c.json({ success: false, error: 'Admin authorization required' }, 403)
    };
  }

  return { ok: true, userId: user.id, payload: auth.payload };
}
