import { Hono } from 'hono';
import { requireAdmin } from './_authz';

type Env = {
  DB: any;
  JWT_SECRET: string;
};

const businessRoutes = new Hono<{ Bindings: Env }>();

// Helper: Generate ID
function generateId(): string {
  return crypto.randomUUID();
}


// List businesses with filters
businessRoutes.get('/', async (c) => {
  try {
    const { page = '1', limit = '20', governorate, category, search } = c.req.query();
    
    const limitNum = parseInt(limit);
    const pageNum = parseInt(page);
    const offset = (pageNum - 1) * limitNum;

    let query = `
      SELECT b.*, 
        (SELECT COUNT(*) FROM likes WHERE target_id = b.id AND target_type = 'business') as like_count,
        (SELECT COUNT(*) FROM saves WHERE business_id = b.id) as save_count
      FROM businesses b
      WHERE 1=1
    `;
    const params: any[] = [];

    if (governorate && governorate !== 'all') {
      query += ' AND b.governorate = ?';
      params.push(governorate);
    }

    if (category) {
      query += ' AND b.category = ?';
      params.push(category);
    }

    if (search) {
      query += ' AND (b.name_ar LIKE ? OR b.name_en LIKE ? OR b.description_ar LIKE ? OR b.description_en LIKE ?)';
      const searchPattern = `%${search}%`;
      params.push(searchPattern, searchPattern, searchPattern, searchPattern);
    }

    query += ' ORDER BY b.created_at DESC LIMIT ? OFFSET ?';
    params.push(limitNum, offset);

    const businesses = await c.env.DB.prepare(query).bind(...params).all();

    return c.json({
      success: true,
      data: businesses.results,
      pagination: {
        page: pageNum,
        limit: limitNum,
        count: businesses.results.length
      }
    });
  } catch (error) {
    console.error('List businesses error:', error);
    return c.json({ success: false, error: 'Failed to list businesses' }, 500);
  }
});

// Get single business
businessRoutes.get('/:id', async (c) => {
  try {
    const { id } = c.req.param();

    const business = await c.env.DB.prepare(
      `SELECT b.*, 
        (SELECT COUNT(*) FROM likes WHERE target_id = b.id AND target_type = 'business') as like_count,
        (SELECT COUNT(*) FROM saves WHERE business_id = b.id) as save_count
      FROM businesses b
      WHERE b.id = ?`
    ).bind(id).first() as any;

    if (!business) {
      return c.json({ success: false, error: 'Not found' }, 404);
    }

    return c.json({
      success: true,
      data: business
    });
  } catch (error) {
    console.error('Get business error:', error);
    return c.json({ success: false, error: 'Failed to get business' }, 500);
  }
});

// Create business (admin only)
businessRoutes.post('/', async (c) => {
  try {
    const admin = await requireAdmin(c);
    if (admin.ok === false) return admin.response;
    const data = await c.req.json();

    if (!data?.name_ar || !data?.name_ku || !data?.name_en || !data?.category || !data?.governorate) {
      return c.json({ success: false, error: 'Invalid input' }, 400);
    }

    const businessId = generateId();

    await c.env.DB.prepare(
      `INSERT INTO businesses (
        id, owner_id, name_ar, name_ku, name_en,
        description_ar, description_ku, description_en,
        category, governorate, phone_number,
        address_ar, address_ku, address_en,
        image, avatar, is_verified,
        map_coords_x, map_coords_y
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    ).bind(
      businessId,
      admin.userId,
      data.name_ar,
      data.name_ku,
      data.name_en,
      data.description_ar || null,
      data.description_ku || null,
      data.description_en || null,
      data.category,
      data.governorate,
      data.phone_number || null,
      data.address_ar || null,
      data.address_ku || null,
      data.address_en || null,
      data.image || null,
      data.avatar || null,
      data.is_verified || 0,
      data.map_coords_x || null,
      data.map_coords_y || null
    ).run();

    const business = await c.env.DB.prepare(
      'SELECT * FROM businesses WHERE id = ?'
    ).bind(businessId).first();

    return c.json({
      success: true,
      data: business
    });
  } catch (error) {
    console.error('Create business error:', error);
    return c.json({ success: false, error: 'Failed to create business' }, 500);
  }
});

async function updateBusiness(c: any) {
  try {
    const admin = await requireAdmin(c);
    if (admin.ok === false) return admin.response;
    const { id } = c.req.param();
    const data = await c.req.json();

    const business = await c.env.DB.prepare(
      'SELECT id FROM businesses WHERE id = ?'
    ).bind(id).first() as any;

    if (!business) {
      return c.json({ success: false, error: 'Not found' }, 404);
    }

    const updates: string[] = [];
    const values: any[] = [];

    const allowedFields = [
      'name_ar', 'name_ku', 'name_en',
      'description_ar', 'description_ku', 'description_en',
      'category', 'governorate', 'phone_number',
      'address_ar', 'address_ku', 'address_en',
      'image', 'avatar', 'is_verified',
      'map_coords_x', 'map_coords_y'
    ];

    for (const field of allowedFields) {
      if (data[field] !== undefined) {
        updates.push(`${field} = ?`);
        values.push(data[field]);
      }
    }

    if (updates.length === 0) {
      return c.json({ success: false, error: 'Invalid input' }, 400);
    }

    updates.push('updated_at = datetime("now")');
    values.push(id);

    await c.env.DB.prepare(
      `UPDATE businesses SET ${updates.join(', ')} WHERE id = ?`
    ).bind(...values).run();

    return c.json({ success: true, message: 'Business updated successfully' });
  } catch (error) {
    console.error('Update business error:', error);
    return c.json({ success: false, error: 'Failed to update business' }, 500);
  }
}

// Update business (admin only)
businessRoutes.put('/:id', updateBusiness);
businessRoutes.patch('/:id', updateBusiness);

// Delete business (admin only)
businessRoutes.delete('/:id', async (c) => {
  try {
    const admin = await requireAdmin(c);
    if (admin.ok === false) return admin.response;
    const { id } = c.req.param();

    const business = await c.env.DB.prepare(
      'SELECT id FROM businesses WHERE id = ?'
    ).bind(id).first() as any;

    if (!business) {
      return c.json({ success: false, error: 'Not found' }, 404);
    }

    await c.env.DB.prepare('DELETE FROM businesses WHERE id = ?').bind(id).run();

    return c.json({ success: true, message: 'Business deleted successfully' });
  } catch (error) {
    console.error('Delete business error:', error);
    return c.json({ success: false, error: 'Failed to delete business' }, 500);
  }
});

export default businessRoutes;
