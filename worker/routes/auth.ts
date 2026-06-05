import { Hono } from 'hono';
import { sign } from 'hono/jwt';
import bcrypt from 'bcryptjs';
import { requireAuth } from './_authz';

type Env = {
  DB: any;
  JWT_SECRET: string;
  RESEND_API_KEY?: string;
  PASSWORD_RESET_FROM_EMAIL?: string;
  FRONTEND_URL?: string;
};

const authRoutes = new Hono<{ Bindings: Env }>();

// Helper: Generate ID
function generateId(): string {
  return crypto.randomUUID();
}

function normalizeEmail(value: unknown): string {
  return String(value || '').trim().toLowerCase();
}

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isValidPassword(value: unknown): boolean {
  const password = String(value || '');
  return password.length >= 8 && password.length <= 128;
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

function getFrontendUrl(c: any): string {
  return String(c.env.FRONTEND_URL || 'https://shakumaku.pages.dev').replace(/\/+$/, '');
}

async function sendPasswordResetEmail(c: any, email: string, token: string): Promise<boolean> {
  const apiKey = String(c.env.RESEND_API_KEY || '').trim();
  const fromEmail = String(c.env.PASSWORD_RESET_FROM_EMAIL || 'Shaku Maku <noreply@shakumaku.pages.dev>').trim();

  if (!apiKey) {
    console.warn('[ShakuMaku] Password reset email not sent: RESEND_API_KEY is not configured.');
    return false;
  }

  const resetUrl = `${getFrontendUrl(c)}/?resetToken=${encodeURIComponent(token)}&email=${encodeURIComponent(email)}`;

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [email],
      subject: 'Reset your Shaku Maku password',
      html: `
        <div style="font-family:Arial,sans-serif;line-height:1.6;color:#111">
          <h2>Reset your Shaku Maku password</h2>
          <p>Click the button below to reset your password. This link expires in 1 hour.</p>
          <p>
            <a href="${resetUrl}" style="display:inline-block;background:#0F2E2F;color:#fff;padding:12px 18px;border-radius:10px;text-decoration:none;font-weight:bold">
              Reset Password
            </a>
          </p>
          <p>If you did not request this, you can ignore this email.</p>
        </div>
      `
    })
  });

  if (!response.ok) {
    const text = await response.text().catch(() => '');
    console.warn('[ShakuMaku] Password reset email failed:', response.status, text.slice(0, 300));
    return false;
  }

  return true;
}

// Register
authRoutes.post('/register', async (c) => {
  try {
    const { email, password, name } = await c.req.json();

    if (!email || !password) {
      return c.json({ error: 'Email and password are required' }, 400);
    }

    const normalizedEmail = normalizeEmail(email);

    if (!isValidEmail(normalizedEmail)) {
      return c.json({ error: 'Invalid email address' }, 400);
    }

    if (!isValidPassword(password)) {
      return c.json({ error: 'Password must be between 8 and 128 characters' }, 400);
    }

    // Check if user already exists
    const existingUser = await c.env.DB.prepare(
      'SELECT id FROM users WHERE email = ?'
    ).bind(normalizedEmail).first();

    if (existingUser) {
      return c.json({ error: 'User already exists' }, 409);
    }

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

    // Send reset email when email provider is configured.
    // Do not expose the token in API response.
    await sendPasswordResetEmail(c, email.toLowerCase(), resetToken);

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

    if (!isValidPassword(newPassword)) {
      return c.json({ error: 'Password must be between 8 and 128 characters' }, 400);
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
