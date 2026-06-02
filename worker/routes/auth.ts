import { Hono } from 'hono';
import { sign } from 'hono/jwt';
import bcrypt from 'bcryptjs';
import { requireAuth } from './_authz';

type Env = {
  DB: any;
  JWT_SECRET: string;
};

const authRoutes = new Hono<{ Bindings: Env }>();

// Helper: Generate ID
function generateId(): string {
  return crypto.randomUUID();
}

// Helper: Hash password
async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, 10);
}

// Helper: Verify password
async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return await bcrypt.compare(password, hash);
}

// Helper: Generate JWT token
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

const PASSWORD_RESET_MESSAGE = 'If the email exists, a reset link has been sent';

// Register
authRoutes.post('/register', async (c) => {
  try {
    const { email, password, name } = await c.req.json();

    if (!email || !password) {
      return c.json({ error: 'Email and password are required' }, 400);
    }

    // Check if user already exists
    const existingUser = await c.env.DB.prepare(
      'SELECT id FROM users WHERE email = ?'
    ).bind(email.toLowerCase()).first();

    if (existingUser) {
      return c.json({ error: 'User already exists' }, 409);
    }

    const normalizedEmail = email.toLowerCase();
    // Hash password
    const passwordHash = await hashPassword(password);
    const userId = generateId();

    // Insert user
    await c.env.DB.prepare(
      `INSERT INTO users (id, email, password_hash, name, role, is_admin)
       VALUES (?, ?, ?, ?, ?, ?)`
    ).bind(
      userId,
      normalizedEmail,
      passwordHash,
      name || email.split('@')[0],
      'user',
      0
    ).run();

    // Generate token
    const token = await generateToken(
      { id: userId, email: normalizedEmail, role: 'user', is_admin: 0 },
      c.env.JWT_SECRET
    );

    return c.json({
      success: true,
      data: {
        user: {
          id: userId,
          email: normalizedEmail,
          name: name || email.split('@')[0],
          role: 'user',
          is_admin: 0
        },
        token
      }
    });
  } catch (error) {
    console.error('Register error:', error);
    return c.json({ error: 'Registration failed' }, 500);
  }
});

// Login
authRoutes.post('/login', async (c) => {
  try {
    const { email, password } = await c.req.json();

    if (!email || !password) {
      return c.json({ error: 'Email and password are required' }, 400);
    }

    // Find user
    const user = await c.env.DB.prepare(
      'SELECT * FROM users WHERE email = ?'
    ).bind(email.toLowerCase()).first() as any;

    if (!user) {
      return c.json({ error: 'Invalid credentials' }, 401);
    }

    // Verify password
    const isValid = await verifyPassword(password, user.password_hash);
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
    console.error('Login error:', error);
    return c.json({ error: 'Login failed' }, 500);
  }
});

// Logout
authRoutes.post('/logout', async (c) => {
  return c.json({ success: true, message: 'Logged out successfully' });
});

// Get current user (protected)
authRoutes.get('/me', async (c) => {
  try {
    const auth = await requireAuth(c);
    if (auth.ok === false) return auth.response;
    const payload = auth.payload as any;
    
    const user = await c.env.DB.prepare(
      'SELECT id, email, name, role, is_admin, photo_url, created_at FROM users WHERE id = ?'
    ).bind(payload.id).first() as any;

    if (!user) {
      return c.json({ error: 'User not found' }, 404);
    }

    return c.json({
      success: true,
      data: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        is_admin: user.is_admin,
        photo_url: user.photo_url,
        created_at: user.created_at
      }
    });
  } catch (error) {
    console.error('Get me error:', error);
    return c.json({ error: 'Failed to get user' }, 500);
  }
});

// Forgot password
authRoutes.post('/forgot-password', async (c) => {
  try {
    const { email } = await c.req.json();

    if (!email) {
      return c.json({ error: 'Email is required' }, 400);
    }

    // Find user
    const user = await c.env.DB.prepare(
      'SELECT id FROM users WHERE email = ?'
    ).bind(email.toLowerCase()).first() as any;

    if (!user) {
      // Don't reveal if user exists or not
      return c.json({ 
        success: true, 
        message: PASSWORD_RESET_MESSAGE
      });
    }

    // Generate reset token
    const tokenId = generateId();
    const resetToken = generateId();
    const expiresAt = new Date(Date.now() + 3600000).toISOString().replace('T', ' ').replace('Z', ''); // 1 hour

    // Delete any existing tokens for this user
    await c.env.DB.prepare(
      'DELETE FROM password_reset_tokens WHERE user_id = ?'
    ).bind(user.id).run();

    // Insert new token
    await c.env.DB.prepare(
      `INSERT INTO password_reset_tokens (id, user_id, token, expires_at)
       VALUES (?, ?, ?, ?)`
    ).bind(tokenId, user.id, resetToken, expiresAt).run();

    return c.json({
      success: true,
      message: PASSWORD_RESET_MESSAGE
    });
  } catch (error) {
    console.error('Forgot password error:', error);
    return c.json({ error: 'Failed to generate reset token' }, 500);
  }
});

// Reset password
authRoutes.post('/reset-password', async (c) => {
  try {
    const { email, token, newPassword } = await c.req.json();

    if (!email || !token || !newPassword) {
      return c.json({ error: 'Email, token, and new password are required' }, 400);
    }

    // Find valid token
    const resetToken = await c.env.DB.prepare(
      `SELECT prt.*, u.email 
       FROM password_reset_tokens prt
       JOIN users u ON prt.user_id = u.id
       WHERE prt.token = ? AND u.email = ? AND prt.used = 0 AND prt.expires_at > datetime('now')`
    ).bind(token, email.toLowerCase()).first() as any;

    if (!resetToken) {
      return c.json({ error: 'Invalid or expired reset token' }, 400);
    }

    // Hash new password
    const passwordHash = await hashPassword(newPassword);

    // Update user password
    await c.env.DB.prepare(
      'UPDATE users SET password_hash = ?, updated_at = datetime("now") WHERE id = ?'
    ).bind(passwordHash, resetToken.user_id).run();

    // Mark token as used
    await c.env.DB.prepare(
      'UPDATE password_reset_tokens SET used = 1 WHERE id = ?'
    ).bind(resetToken.id).run();

    return c.json({
      success: true,
      message: 'Password reset successfully'
    });
  } catch (error) {
    console.error('Reset password error:', error);
    return c.json({ error: 'Failed to reset password' }, 500);
  }
});

export default authRoutes;
