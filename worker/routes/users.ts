import { Hono } from 'hono';
import { requireAuth } from './_authz';

type Env = {
  DB: any;
  JWT_SECRET: string;
};

const userRoutes = new Hono<{ Bindings: Env }>();

// Get user profile (protected)
userRoutes.get('/profile', async (c) => {
  try {
    const auth = await requireAuth(c);
    if (auth.ok === false) return auth.response;
    const payload = auth.payload as any;
    
    const user = await c.env.DB.prepare(
      `SELECT u.*, 
        (SELECT COUNT(*) FROM businesses WHERE owner_id = u.id) as business_count
       FROM users u
       WHERE u.id = ?`
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
        created_at: user.created_at,
        business_count: user.business_count
      }
    });
  } catch (error) {
    console.error('Get profile error:', error);
    return c.json({ error: 'Failed to get profile' }, 500);
  }
});

// Update user profile (protected)
userRoutes.put('/profile', async (c) => {
  try {
    const auth = await requireAuth(c);
    if (auth.ok === false) return auth.response;
    const payload = auth.payload as any;
    const { name, photo_url } = await c.req.json();

    const updates: string[] = [];
    const values: any[] = [];

    if (name) {
      updates.push('name = ?');
      values.push(name);
    }
    if (photo_url !== undefined) {
      updates.push('photo_url = ?');
      values.push(photo_url);
    }

    if (updates.length === 0) {
      return c.json({ error: 'No fields to update' }, 400);
    }

    updates.push('updated_at = datetime("now")');
    values.push(payload.id);

    await c.env.DB.prepare(
      `UPDATE users SET ${updates.join(', ')} WHERE id = ?`
    ).bind(...values).run();

    return c.json({ success: true, message: 'Profile updated successfully' });
  } catch (error) {
    console.error('Update profile error:', error);
    return c.json({ error: 'Failed to update profile' }, 500);
  }
});

export default userRoutes;
