import { Hono } from 'hono';
import { requireAuth } from './_authz';

type Env = {
  DB: any;
  JWT_SECRET: string;
};

const feedRoutes = new Hono<{ Bindings: Env }>();

function generateId(): string {
  return crypto.randomUUID();
}

function cleanText(value: unknown): string {
  return String(value || '').trim();
}

function cleanGov(value: unknown): string {
  return cleanText(value).toLowerCase().replace(/[\s_\-،]+/g, '');
}

async function isAdminUser(c: any, payload: any): Promise<boolean> {
  const email = cleanText(payload?.email).toLowerCase();
  const role = cleanText(payload?.role).toLowerCase();

  if (email === 'safaribosafar@gmail.com' || role === 'admin') return true;

  const row = await c.env.DB.prepare(
    'SELECT role, is_admin FROM users WHERE id = ? OR lower(email) = ? LIMIT 1'
  ).bind(cleanText(payload?.id), email).first() as any;

  return cleanText(row?.role).toLowerCase() === 'admin' || Number(row?.is_admin || 0) === 1;
}

async function pickFallbackBusinessId(c: any, governorate: string): Promise<string> {
  const gov = cleanGov(governorate);

  let row = await c.env.DB.prepare(
    'SELECT id FROM businesses WHERE lower(replace(replace(replace(governorate, " ", ""), "_", ""), "-", "")) = ? ORDER BY created_at DESC LIMIT 1'
  ).bind(gov).first() as any;

  if (!row?.id) {
    row = await c.env.DB.prepare(
      'SELECT id FROM businesses ORDER BY created_at DESC LIMIT 1'
    ).first() as any;
  }

  return cleanText(row?.id);
}

async function listPosts(c: any) {
  try {
    const { page = '1', limit = '120', governorate, category, search } = c.req.query();
    const limitNum = Math.min(Math.max(parseInt(limit, 10) || 120, 1), 200);
    const pageNum = Math.max(parseInt(page, 10) || 1, 1);
    const offset = (pageNum - 1) * limitNum;

    let query = `
      SELECT
        p.*,
        COALESCE(p.governorate, b.governorate, '') as governorate,
        COALESCE(p.category, b.category, 'community') as category,
        CASE
          WHEN COALESCE(p.category, '') = 'community' THEN COALESCE(u.name, u.email, 'Shaku Maku User')
          ELSE COALESCE(b.name_ar, b.name_en, u.name, u.email, 'Shaku Maku')
        END as business_name_ar,
        CASE
          WHEN COALESCE(p.category, '') = 'community' THEN COALESCE(u.name, u.email, 'Shaku Maku User')
          ELSE COALESCE(b.name_en, b.name_ar, u.name, u.email, 'Shaku Maku')
        END as business_name_en,
        COALESCE(b.avatar, u.photo_url, '') as business_avatar,
        u.name as author_name,
        u.email as author_email,
        u.photo_url as author_avatar
      FROM posts p
      LEFT JOIN businesses b ON p.business_id = b.id
      LEFT JOIN users u ON p.author_id = u.id
      WHERE 1=1
    `;

    const params: any[] = [];

    if (governorate && governorate !== 'all') {
      query += ' AND lower(replace(replace(replace(COALESCE(p.governorate, b.governorate, ""), " ", ""), "_", ""), "-", "")) = ?';
      params.push(cleanGov(governorate));
    }

    if (category && category !== 'all') {
      query += ' AND COALESCE(p.category, b.category, "community") = ?';
      params.push(category);
    }

    if (search) {
      query += ' AND (p.caption_ar LIKE ? OR p.caption_ku LIKE ? OR p.caption_en LIKE ? OR b.name_ar LIKE ? OR b.name_en LIKE ? OR u.name LIKE ?)';
      const searchPattern = `%${search}%`;
      params.push(searchPattern, searchPattern, searchPattern, searchPattern, searchPattern, searchPattern);
    }

    query += ' ORDER BY p.created_at DESC LIMIT ? OFFSET ?';
    params.push(limitNum, offset);

    const posts = await c.env.DB.prepare(query).bind(...params).all();

    return c.json({
      success: true,
      data: posts.results,
      pagination: {
        page: pageNum,
        limit: limitNum,
        count: posts.results.length
      }
    });
  } catch (error) {
    console.error('List posts error:', error);
    return c.json({ success: false, error: 'Failed to list posts' }, 500);
  }
}

feedRoutes.get('/business-posts', listPosts);
feedRoutes.get('/posts', listPosts);

feedRoutes.get('/posts/:id', async (c) => {
  try {
    const { id } = c.req.param();

    const post = await c.env.DB.prepare(
      `SELECT
        p.*,
        COALESCE(p.governorate, b.governorate, '') as governorate,
        COALESCE(p.category, b.category, 'community') as category,
        COALESCE(b.name_ar, u.name, u.email, 'Shaku Maku') as business_name_ar,
        COALESCE(b.name_en, b.name_ar, u.name, u.email, 'Shaku Maku') as business_name_en,
        COALESCE(b.avatar, u.photo_url, '') as business_avatar,
        u.name as author_name,
        u.email as author_email,
        u.photo_url as author_avatar
      FROM posts p
      LEFT JOIN businesses b ON p.business_id = b.id
      LEFT JOIN users u ON p.author_id = u.id
      WHERE p.id = ?`
    ).bind(id).first() as any;

    if (!post) return c.json({ success: false, error: 'Not found' }, 404);

    return c.json({ success: true, data: post });
  } catch (error) {
    console.error('Get post error:', error);
    return c.json({ success: false, error: 'Failed to get post' }, 500);
  }
});

feedRoutes.post('/posts', async (c) => {
  try {
    const auth = await requireAuth(c);
    if (auth.ok === false) return auth.response;

    const payload = auth.payload as any;
    const data = await c.req.json();

    const governorate = cleanGov(data?.governorate);
    if (!governorate) {
      return c.json({ success: false, error: 'Governorate is required' }, 400);
    }

    const caption =
      cleanText(data?.caption_ar) ||
      cleanText(data?.caption_ku) ||
      cleanText(data?.caption_en);

    if (!caption) {
      return c.json({ success: false, error: 'Caption is required' }, 400);
    }

    if (caption.length > 2000) {
      return c.json({ success: false, error: 'Caption is too long' }, 400);
    }

    let businessId = cleanText(data?.business_id);

    if (businessId) {
      const business = await c.env.DB.prepare('SELECT id FROM businesses WHERE id = ?').bind(businessId).first() as any;
      if (!business?.id) return c.json({ success: false, error: 'Invalid business_id' }, 400);
    } else {
      businessId = await pickFallbackBusinessId(c, governorate);
      if (!businessId) return c.json({ success: false, error: 'No business available for posting' }, 400);
    }

    const postId = generateId();
    const category = cleanText(data?.category) || 'community';

    await c.env.DB.prepare(
      `INSERT INTO posts (
        id, business_id, author_id, media_url,
        caption_ar, caption_ku, caption_en,
        promotion_badge_ar, promotion_badge_ku, promotion_badge_en,
        video_url, file_attachment_name, file_attachment_size, file_attachment_type,
        governorate, category
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    ).bind(
      postId,
      businessId,
      cleanText(payload?.id),
      data.media_url || null,
      data.caption_ar || caption,
      data.caption_ku || caption,
      data.caption_en || caption,
      data.promotion_badge_ar || null,
      data.promotion_badge_ku || null,
      data.promotion_badge_en || null,
      data.video_url || null,
      data.file_attachment_name || null,
      data.file_attachment_size || null,
      data.file_attachment_type || null,
      governorate,
      category
    ).run();

    const post = await c.env.DB.prepare(
      `SELECT
        p.*,
        COALESCE(p.governorate, b.governorate, '') as governorate,
        COALESCE(p.category, b.category, 'community') as category,
        CASE
          WHEN COALESCE(p.category, '') = 'community' THEN COALESCE(u.name, u.email, 'Shaku Maku User')
          ELSE COALESCE(b.name_ar, b.name_en, u.name, u.email, 'Shaku Maku')
        END as business_name_ar,
        COALESCE(b.name_en, b.name_ar, u.name, u.email, 'Shaku Maku') as business_name_en,
        COALESCE(b.avatar, u.photo_url, '') as business_avatar,
        u.name as author_name,
        u.email as author_email,
        u.photo_url as author_avatar
      FROM posts p
      LEFT JOIN businesses b ON p.business_id = b.id
      LEFT JOIN users u ON p.author_id = u.id
      WHERE p.id = ?`
    ).bind(postId).first();

    return c.json({ success: true, data: post });
  } catch (error) {
    console.error('Create post error:', error);
    return c.json({ success: false, error: 'Failed to create post' }, 500);
  }
});

async function updatePost(c: any) {
  try {
    const auth = await requireAuth(c);
    if (auth.ok === false) return auth.response;

    const payload = auth.payload as any;
    const { id } = c.req.param();
    const data = await c.req.json();

    const post = await c.env.DB.prepare('SELECT id, author_id FROM posts WHERE id = ?').bind(id).first() as any;
    if (!post) return c.json({ success: false, error: 'Not found' }, 404);

    const admin = await isAdminUser(c, payload);
    const owner = cleanText(post.author_id) && cleanText(post.author_id) === cleanText(payload?.id);

    if (!admin && !owner) {
      return c.json({ success: false, error: 'Not allowed' }, 403);
    }

    const allowedFields = [
      'media_url', 'caption_ar', 'caption_ku', 'caption_en',
      'promotion_badge_ar', 'promotion_badge_ku', 'promotion_badge_en',
      'video_url', 'file_attachment_name', 'file_attachment_size', 'file_attachment_type',
      'governorate', 'category'
    ];

    const updates: string[] = [];
    const values: any[] = [];

    for (const field of allowedFields) {
      if (data[field] !== undefined) {
        updates.push(`${field} = ?`);
        values.push(data[field]);
      }
    }

    if (updates.length === 0) return c.json({ success: false, error: 'Invalid input' }, 400);

    updates.push('updated_at = datetime("now")');
    values.push(id);

    await c.env.DB.prepare(`UPDATE posts SET ${updates.join(', ')} WHERE id = ?`).bind(...values).run();

    return c.json({ success: true, message: 'Post updated successfully' });
  } catch (error) {
    console.error('Update post error:', error);
    return c.json({ success: false, error: 'Failed to update post' }, 500);
  }
}

feedRoutes.put('/posts/:id', updatePost);
feedRoutes.patch('/posts/:id', updatePost);

feedRoutes.delete('/posts/:id', async (c) => {
  try {
    const auth = await requireAuth(c);
    if (auth.ok === false) return auth.response;

    const payload = auth.payload as any;
    const { id } = c.req.param();

    const post = await c.env.DB.prepare('SELECT id, author_id FROM posts WHERE id = ?').bind(id).first() as any;
    if (!post) return c.json({ success: false, error: 'Not found' }, 404);

    const admin = await isAdminUser(c, payload);
    const owner = cleanText(post.author_id) && cleanText(post.author_id) === cleanText(payload?.id);

    if (!admin && !owner) {
      return c.json({ success: false, error: 'Not allowed' }, 403);
    }

    await c.env.DB.prepare('DELETE FROM comments WHERE post_id = ?').bind(id).run();
    await c.env.DB.prepare('DELETE FROM likes WHERE target_id = ? AND target_type = ?').bind(id, 'post').run();
    await c.env.DB.prepare('DELETE FROM posts WHERE id = ?').bind(id).run();

    return c.json({ success: true, message: 'Post deleted successfully' });
  } catch (error) {
    console.error('Delete post error:', error);
    return c.json({ success: false, error: 'Failed to delete post' }, 500);
  }
});

feedRoutes.post('/posts/like', async (c) => {
  try {
    const auth = await requireAuth(c);
    if (auth.ok === false) return auth.response;

    const payload = auth.payload as any;
    const { postId } = await c.req.json();

    if (!postId) return c.json({ success: false, error: 'Invalid input' }, 400);

    const existingLike = await c.env.DB.prepare(
      'SELECT id FROM likes WHERE user_id = ? AND target_id = ? AND target_type = ?'
    ).bind(payload.id, postId, 'post').first();

    if (existingLike) {
      await c.env.DB.prepare(
        'DELETE FROM likes WHERE user_id = ? AND target_id = ? AND target_type = ?'
      ).bind(payload.id, postId, 'post').run();

      await c.env.DB.prepare(
        'UPDATE posts SET likes = CASE WHEN likes > 0 THEN likes - 1 ELSE 0 END WHERE id = ?'
      ).bind(postId).run();

      return c.json({ success: true, liked: false });
    }

    const likeId = generateId();

    await c.env.DB.prepare(
      'INSERT INTO likes (id, user_id, target_id, target_type) VALUES (?, ?, ?, ?)'
    ).bind(likeId, payload.id, postId, 'post').run();

    await c.env.DB.prepare(
      'UPDATE posts SET likes = likes + 1 WHERE id = ?'
    ).bind(postId).run();

    return c.json({ success: true, liked: true });
  } catch (error) {
    console.error('Like post error:', error);
    return c.json({ success: false, error: 'Failed to like post' }, 500);
  }
});

feedRoutes.post('/posts/:id/share', async (c) => {
  try {
    const { id } = c.req.param();

    await c.env.DB.prepare(
      'UPDATE posts SET shares = shares + 1 WHERE id = ?'
    ).bind(id).run();

    return c.json({ success: true, shared: true });
  } catch (error) {
    console.error('Share post error:', error);
    return c.json({ success: false, error: 'Failed to share post' }, 500);
  }
});

feedRoutes.get('/posts/:id/comments', async (c) => {
  try {
    const { id } = c.req.param();

    const comments = await c.env.DB.prepare(
      `SELECT c.*, u.name as username, u.photo_url as user_avatar
      FROM comments c
      LEFT JOIN users u ON c.user_id = u.id
      WHERE c.post_id = ?
      ORDER BY c.created_at DESC`
    ).bind(id).all();

    return c.json({ success: true, data: comments.results });
  } catch (error) {
    console.error('Get comments error:', error);
    return c.json({ success: false, error: 'Failed to get comments' }, 500);
  }
});

feedRoutes.post('/posts/:id/comments', async (c) => {
  try {
    const auth = await requireAuth(c);
    if (auth.ok === false) return auth.response;

    const payload = auth.payload as any;
    const { id } = c.req.param();
    const { text } = await c.req.json();

    const commentText = cleanText(text);

    if (!commentText) return c.json({ success: false, error: 'Invalid input' }, 400);

    if (commentText.length > 1000) {
      return c.json({ success: false, error: 'Comment is too long' }, 400);
    }

    const commentId = generateId();

    await c.env.DB.prepare(
      'INSERT INTO comments (id, post_id, user_id, text) VALUES (?, ?, ?, ?)'
    ).bind(commentId, id, payload.id, commentText).run();

    await c.env.DB.prepare(
      'UPDATE posts SET comments_count = comments_count + 1 WHERE id = ?'
    ).bind(id).run();

    const comment = await c.env.DB.prepare(
      `SELECT c.*, u.name as username, u.photo_url as user_avatar
      FROM comments c
      LEFT JOIN users u ON c.user_id = u.id
      WHERE c.id = ?`
    ).bind(commentId).first();

    return c.json({ success: true, data: comment });
  } catch (error) {
    console.error('Create comment error:', error);
    return c.json({ success: false, error: 'Failed to create comment' }, 500);
  }
});

export default feedRoutes;
