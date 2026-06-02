import { Hono } from 'hono';
import { describe, expect, it } from 'vitest';
import authRoutes from '../worker/routes/auth';

const genericMessage = 'If the email exists, a reset link has been sent';

type JsonResponse = {
  success: boolean;
  message?: string;
  data?: {
    user: {
      role: string;
      is_admin: number;
    };
    token: string;
  };
};

function decodeJwtPayload(token: string): Record<string, unknown> {
  const payload = token.split('.')[1];
  const normalized = payload.replace(/-/g, '+').replace(/_/g, '/');
  const padded = normalized.padEnd(Math.ceil(normalized.length / 4) * 4, '=');
  return JSON.parse(atob(padded));
}

function createDb(firstResults: unknown[] = []) {
  const runs: Array<{ sql: string; bindings: unknown[] }> = [];

  return {
    runs,
    prepare(sql: string) {
      return {
        bindings: [] as unknown[],
        bind(...bindings: unknown[]) {
          this.bindings = bindings;
          return this;
        },
        async first() {
          return firstResults.shift() || null;
        },
        async run() {
          runs.push({ sql, bindings: this.bindings });
          return { success: true };
        }
      };
    }
  };
}

function createApp() {
  const app = new Hono();
  app.route('/auth', authRoutes);
  return app;
}

describe('worker auth routes', () => {
  it('does not return a reset token from forgot-password', async () => {
    const db = createDb([{ id: 'user-1' }]);
    const response = await createApp().request(
      '/auth/forgot-password',
      {
        method: 'POST',
        body: JSON.stringify({ email: 'user@example.com' }),
        headers: { 'Content-Type': 'application/json' }
      },
      { DB: db, JWT_SECRET: 'test-secret' }
    );

    const body = await response.json() as JsonResponse;

    expect(response.status).toBe(200);
    expect(body).toEqual({ success: true, message: genericMessage });
    expect(JSON.stringify(body)).not.toContain('token');
    expect(db.runs.some((run) => run.sql.includes('password_reset_tokens'))).toBe(true);
  });

  it('returns the same generic forgot-password message for unknown emails', async () => {
    const response = await createApp().request(
      '/auth/forgot-password',
      {
        method: 'POST',
        body: JSON.stringify({ email: 'missing@example.com' }),
        headers: { 'Content-Type': 'application/json' }
      },
      { DB: createDb([null]), JWT_SECRET: 'test-secret' }
    );

    await expect(response.json()).resolves.toEqual({ success: true, message: genericMessage });
  });

  it('registers allowlisted emails as normal users and issues expiring JWTs', async () => {
    const db = createDb([null]);
    const response = await createApp().request(
      '/auth/register',
      {
        method: 'POST',
        body: JSON.stringify({
          email: 'former-admin@example.com',
          password: 'password123',
          name: 'Regular User'
        }),
        headers: { 'Content-Type': 'application/json' }
      },
      {
        DB: db,
        JWT_SECRET: 'test-secret',
        ADMIN_EMAILS: 'former-admin@example.com'
      }
    );

    const body = await response.json() as JsonResponse;
    const insert = db.runs.find((run) => run.sql.includes('INSERT INTO users'));
    const jwtPayload = decodeJwtPayload(body.data?.token || '');

    expect(response.status).toBe(200);
    expect(body.data?.user.role).toBe('user');
    expect(body.data?.user.is_admin).toBe(0);
    expect(insert?.bindings.slice(4, 6)).toEqual(['user', 0]);
    expect(typeof jwtPayload.exp).toBe('number');
    expect(jwtPayload.exp as number).toBeGreaterThan(Math.floor(Date.now() / 1000));
  });
});
