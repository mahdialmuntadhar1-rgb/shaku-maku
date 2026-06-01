import { Hono } from 'hono';
import { requireAdmin, requireAuth } from './_authz';

type Env = {
  DB: any;
  JWT_SECRET: string;
};

const feedRoutes = new Hono<{ Bindings: Env }>();

// Helper: Generate ID
function generateId(): string {
  return crypto.randomUUID();
}


async function listPosts(c: any) {
  try {
    const { page = '1', limit = '20', governorate, category, search } = c.req.query();
    const limitNum = parseInt(limit);
    const pageNum = parseInt(page);
    const offset = (pageNum - 1) * limitNum;

    let query = `SELECT p.*, 
        b.name_ar as business_name_ar, b.name_en as business_name_en,
        b.avatar as business_avatar, b.category, b.governorate
      FROM posts p
      JOIN businesses b ON p.business_id = b.id
      WHERE 1=1`;
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
      query += ' AND (p.caption_ar LIKE ? OR p.caption_en LIKE ? OR b.name_ar LIKE ? OR b.name_en LIKE ?)';
      const searchPattern = `%${search}%`;
      params.push(searchPattern, searchPattern, searchPattern, searchPattern);
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

// List posts
feedRoutes.get('/business-posts', listPosts);
feedRoutes.get('/posts', listPosts);

feedRoutes.get('/posts/:id', async (c) => {
  try {
    const { id } = c.req.param();
    const post = await c.env.DB.prepare(
      `SELECT p.*,
        b.name_ar as business_name_ar, b.name_en as business_name_en,
        b.avatar as business_avatar, b.category, b.governorate
      FROM posts p
      JOIN businesses b ON p.business_id = b.id
      WHERE p.id = ?`
    ).bind(id).first() as any;
    if (!post) {
      return c.json({ success: false, error: 'Not found' }, 404);
    }
    return c.json({ success: true, data: post });
  } catch (error) {
    console.error('Get post error:', error);
    return c.json({ success: false, error: 'Failed to get post' }, 500);
  }
});

// Create post (admin only)
feedRoutes.post('/posts', async (c) => {
  try {
    const admin = await requireAdmin(c);
    if (admin.ok === false) return admin.response;
    const data = await c.req.json();
    if (!data?.business_id) {
      return c.json({ success: false, error: 'Invalid input' }, 400);
    }

    const postId = generateId();

    await c.env.DB.prepare(
      `INSERT INTO posts (
        id, business_id, author_id, media_url,
        caption_ar, caption_ku, caption_en,
        promotion_badge_ar, promotion_badge_ku, promotion_badge_en,
        video_url, file_attachment_name, file_attachment_size, file_attachment_type
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    ).bind(
      postId,
      data.business_id,
      admin.userId,
      data.media_url || null,
      data.caption_ar || null,
      data.caption_ku || null,
      data.caption_en || null,
      data.promotion_badge_ar || null,
      data.promotion_badge_ku || null,
      data.promotion_badge_en || null,
      data.video_url || null,
      data.file_attachment_name || null,
      data.file_attachment_size || null,
      data.file_attachment_type || null
    ).run();

    const post = await c.env.DB.prepare(
      `SELECT p.*, 
        b.name_ar as business_name_ar, b.name_en as business_name_en,
        b.avatar as business_avatar, b.category, b.governorate
      FROM posts p
      JOIN businesses b ON p.business_id = b.id
      WHERE p.id = ?`
    ).bind(postId).first();

    return c.json({
      success: true,
      data: post
    });
  } catch (error) {
    console.error('Create post error:', error);
    return c.json({ success: false, error: 'Failed to create post' }, 500);
  }
});

async function updatePost(c: any) {
  try {
    const admin = await requireAdmin(c);
    if (admin.ok === false) return admin.response;
    const { id } = c.req.param();
    const data = await c.req.json();

    const post = await c.env.DB.prepare('SELECT id FROM posts WHERE id = ?').bind(id).first() as any;
    if (!post) {
      return c.json({ success: false, error: 'Not found' }, 404);
    }

    const allowedFields = [
      'media_url', 'caption_ar', 'caption_ku', 'caption_en',
      'promotion_badge_ar', 'promotion_badge_ku', 'promotion_badge_en',
      'video_url', 'file_attachment_name', 'file_attachment_size', 'file_attachment_type'
    ];
    const updates: string[] = [];
    const values: any[] = [];
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
    const admin = await requireAdmin(c);
    if (admin.ok === false) return admin.response;
    const { id } = c.req.param();
    const post = await c.env.DB.prepare('SELECT id FROM posts WHERE id = ?').bind(id).first() as any;
    if (!post) {
      return c.json({ success: false, error: 'Not found' }, 404);
    }
    await c.env.DB.prepare('DELETE FROM posts WHERE id = ?').bind(id).run();
    return c.json({ success: true, message: 'Post deleted successfully' });
  } catch (error) {
    console.error('Delete post error:', error);
    return c.json({ success: false, error: 'Failed to delete post' }, 500);
  }
});

// Like post (protected)
feedRoutes.post('/posts/like', async (c) => {
  try {
    const auth = await requireAuth(c);
    if (auth.ok === false) return auth.response;
    const payload = auth.payload as any;
    const { postId } = await c.req.json();

    if (!postId) {
      return c.json({ success: false, error: 'Invalid input' }, 400);
    }

    // Check if already liked
    const existingLike = await c.env.DB.prepare(
      'SELECT id FROM likes WHERE user_id = ? AND target_id = ? AND target_type = ?'
    ).bind(payload.id, postId, 'post').first();

    if (existingLike) {
      // Unlike
      await c.env.DB.prepare(
        'DELETE FROM likes WHERE user_id = ? AND target_id = ? AND target_type = ?'
      ).bind(payload.id, postId, 'post').run();

      await c.env.DB.prepare(
        'UPDATE posts SET likes = likes - 1 WHERE id = ?'
      ).bind(postId).run();

      return c.json({ success: true, liked: false });
    } else {
      // Like
      const likeId = generateId();
      await c.env.DB.prepare(
        'INSERT INTO likes (id, user_id, target_id, target_type) VALUES (?, ?, ?, ?)'
      ).bind(likeId, payload.id, postId, 'post').run();

      await c.env.DB.prepare(
        'UPDATE posts SET likes = likes + 1 WHERE id = ?'
      ).bind(postId).run();

      return c.json({ success: true, liked: true });
    }
  } catch (error) {
    console.error('Like post error:', error);
    return c.json({ success: false, error: 'Failed to like post' }, 500);
  }
});

// Get comments for post
feedRoutes.get('/posts/:id/comments', async (c) => {
  try {
    const { id } = c.req.param();

    const comments = await c.env.DB.prepare(
      `SELECT c.*, u.name as username, u.photo_url as user_avatar
      FROM comments c
      JOIN users u ON c.user_id = u.id
      WHERE c.post_id = ?
      ORDER BY c.created_at DESC`
    ).bind(id).all();

    return c.json({
      success: true,
      data: comments.results
    });
  } catch (error) {
    console.error('Get comments error:', error);
    return c.json({ success: false, error: 'Failed to get comments' }, 500);
  }
});

// Create comment (protected)
feedRoutes.post('/posts/:id/comments', async (c) => {
  try {
    const auth = await requireAuth(c);
    if (auth.ok === false) return auth.response;
    const payload = auth.payload as any;
    const { id } = c.req.param();
    const { text } = await c.req.json();

    if (!text) {
      return c.json({ success: false, error: 'Invalid input' }, 400);
    }

    const commentId = generateId();

    await c.env.DB.prepare(
      'INSERT INTO comments (id, post_id, user_id, text) VALUES (?, ?, ?, ?)'
    ).bind(commentId, id, payload.id, text).run();

    await c.env.DB.prepare(
      'UPDATE posts SET comments_count = comments_count + 1 WHERE id = ?'
    ).bind(id).run();

    const comment = await c.env.DB.prepare(
      `SELECT c.*, u.name as username, u.photo_url as user_avatar
      FROM comments c
      JOIN users u ON c.user_id = u.id
      WHERE c.id = ?`
    ).bind(commentId).first();

    return c.json({
      success: true,
      data: comment
    });
  } catch (error) {
    console.error('Create comment error:', error);
    return c.json({ success: false, error: 'Failed to create comment' }, 500);
  }
});

export default feedRoutes;
