import { Hono } from 'hono';
import { requireAdmin } from './_authz';
import bcrypt from 'bcryptjs';
import { sign } from 'hono/jwt';

type Env = {
  DB: any;
  JWT_SECRET: string;
};

const adminRoutes = new Hono<{ Bindings: Env }>();

async function generateToken(payload: any, secret: string): Promise<string> {
  const expiresInSeconds = 7 * 24 * 60 * 60;
  return await sign(
    {
      ...payload,
      exp: Math.floor(Date.now() / 1000) + expiresInSeconds
    },
    secret
  );
}

// Admin login (same as regular login but for admin panel)
adminRoutes.post('/login', async (c) => {
  try {
    const { email, password } = await c.req.json();

    if (!email || !password) {
      return c.json({ error: 'Email and password are required' }, 400);
    }

    // Find user
    const user = await c.env.DB.prepare(
      "SELECT * FROM users WHERE email = ? AND (is_admin = 1 OR role = 'admin')"
    ).bind(email.toLowerCase()).first() as any;

    if (!user) {
      return c.json({ error: 'Invalid credentials' }, 401);
    }

    // Verify password
    const isValid = await bcrypt.compare(password, user.password_hash);
    if (!isValid) {
      return c.json({ error: 'Invalid credentials' }, 401);
    }

    // Generate token
    const token = await generateToken(
      { id: user.id, email: user.email, role: user.role, is_admin: user.is_admin },
      c.env.JWT_SECRET
    );

    return c.json({
      success: true,
      data: {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          is_admin: user.is_admin
        },
        token
      }
    });
  } catch (error) {
    console.error('Admin login error:', error);
    return c.json({ error: 'Login failed' }, 500);
  }
});

// Get admin stats
adminRoutes.get('/stats', async (c) => {
  try {
    const admin = await requireAdmin(c);
    if (admin.ok === false) return admin.response;

    const userCount = await c.env.DB.prepare('SELECT COUNT(*) as count FROM users').first() as any;
    const businessCount = await c.env.DB.prepare('SELECT COUNT(*) as count FROM businesses').first() as any;
    const postCount = await c.env.DB.prepare('SELECT COUNT(*) as count FROM posts').first() as any;
    const pendingClaims = await c.env.DB.prepare(
      "SELECT COUNT(*) as count FROM business_claims WHERE status = 'pending'"
    ).first() as any;

    return c.json({
      success: true,
      data: {
        users: userCount.count,
        businesses: businessCount.count,
        posts: postCount.count,
        pending_claims: pendingClaims.count
      }
    });
  } catch (error) {
    console.error('Get stats error:', error);
    return c.json({ error: 'Failed to get stats' }, 500);
  }
});

// List all users (admin only)
adminRoutes.get('/users', async (c) => {
  try {
    const admin = await requireAdmin(c);
    if (admin.ok === false) return admin.response;

    const users = await c.env.DB.prepare(
      'SELECT id, email, name, role, is_admin, created_at FROM users ORDER BY created_at DESC'
    ).all();

    return c.json({
      success: true,
      data: users.results
    });
  } catch (error) {
    console.error('List users error:', error);
    return c.json({ error: 'Failed to list users' }, 500);
  }
});

// Update user role (admin only)
adminRoutes.put('/users/:id/role', async (c) => {
  try {
    const admin = await requireAdmin(c);
    if (admin.ok === false) return admin.response;

    const { id } = c.req.param();
    const { role, is_admin } = await c.req.json();

    if (!['user', 'owner', 'admin'].includes(role)) {
      return c.json({ error: 'Invalid role' }, 400);
    }

    if (typeof is_admin !== 'boolean' && is_admin !== 0 && is_admin !== 1) {
      return c.json({ error: 'Invalid admin flag' }, 400);
    }

    const normalizedIsAdmin = role === 'admin' ? 1 : Number(Boolean(is_admin));

    await c.env.DB.prepare(
      'UPDATE users SET role = ?, is_admin = ?, updated_at = datetime("now") WHERE id = ?'
    ).bind(role, normalizedIsAdmin, id).run();

    return c.json({ success: true, message: 'User role updated successfully' });
  } catch (error) {
    console.error('Update user role error:', error);
    return c.json({ error: 'Failed to update user role' }, 500);
  }
});

// List all businesses (admin only)
adminRoutes.get('/businesses', async (c) => {
  try {
    const admin = await requireAdmin(c);
    if (admin.ok === false) return admin.response;

    const businesses = await c.env.DB.prepare(
      'SELECT * FROM businesses ORDER BY created_at DESC'
    ).all();

    return c.json({
      success: true,
      data: businesses.results
    });
  } catch (error) {
    console.error('List businesses error:', error);
    return c.json({ error: 'Failed to list businesses' }, 500);
  }
});

// List business claims (admin only)
adminRoutes.get('/claims', async (c) => {
  try {
    const admin = await requireAdmin(c);
    if (admin.ok === false) return admin.response;

    const claims = await c.env.DB.prepare(
      `SELECT bc.*, b.name_ar, b.name_en, u.email
      FROM business_claims bc
      JOIN businesses b ON bc.business_id = b.id
      JOIN users u ON bc.user_id = u.id
      ORDER BY bc.created_at DESC`
    ).all();

    return c.json({
      success: true,
      data: claims.results
    });
  } catch (error) {
    console.error('List claims error:', error);
    return c.json({ error: 'Failed to list claims' }, 500);
  }
});

// Approve/reject claim (admin only)
adminRoutes.put('/claims/:id', async (c) => {
  try {
    const admin = await requireAdmin(c);
    if (admin.ok === false) return admin.response;

    const { id } = c.req.param();
    const { status } = await c.req.json();

    if (!['approved', 'rejected'].includes(status)) {
      return c.json({ error: 'Invalid status' }, 400);
    }

    const claim = await c.env.DB.prepare(
      'SELECT * FROM business_claims WHERE id = ?'
    ).bind(id).first() as any;

    if (!claim) {
      return c.json({ error: 'Claim not found' }, 404);
    }

    await c.env.DB.prepare(
      'UPDATE business_claims SET status = ?, reviewed_at = datetime("now") WHERE id = ?'
    ).bind(status, id).run();

    // If approved, add as business owner
    if (status === 'approved') {
      await c.env.DB.prepare(
        `INSERT INTO business_owners (id, user_id, business_id, role, verified)
         VALUES (?, ?, ?, 'owner', 1)`
      ).bind(crypto.randomUUID(), claim.user_id, claim.business_id).run();

      await c.env.DB.prepare(
        'UPDATE businesses SET owner_id = ? WHERE id = ?'
      ).bind(claim.user_id, claim.business_id).run();
    }

    return c.json({ success: true, message: `Claim ${status} successfully` });
  } catch (error) {
    console.error('Update claim error:', error);
    return c.json({ error: 'Failed to update claim' }, 500);
  }
});

export default adminRoutes;
