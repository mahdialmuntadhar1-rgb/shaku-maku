import React, { useState, useEffect } from 'react';
import { useAdmin } from '../contexts/AdminContext';

interface SocialPost {
  id: string;
  content: string;
  author: string;
  image?: string;
  createdAt: string;
}

const EditableSocialFeed: React.FC<{ currentLang: string }> = ({ currentLang }) => {
  const { isAdmin } = useAdmin();
  const [posts, setPosts] = useState<SocialPost[]>([]);
  const [newPost, setNewPost] = useState({ content: '', author: '', image: '' });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState('');

  useEffect(() => {
    const stored = localStorage.getItem('social_posts');
    if (stored) {
      setPosts(JSON.parse(stored));
    } else {
      setPosts([
        { id: '1', content: 'مرحباً بكم في شكو ماكو!', author: 'Admin', createdAt: new Date().toISOString() },
        { id: '2', content: 'اكتشف أفضل المطاعم في بغداد', author: 'Admin', createdAt: new Date().toISOString() },
      ]);
    }
  }, []);

  const savePosts = (newPosts: SocialPost[]) => {
    setPosts(newPosts);
    localStorage.setItem('social_posts', JSON.stringify(newPosts));
  };

  const addPost = () => {
    if (!newPost.content.trim()) return;
    const post: SocialPost = {
      id: Date.now().toString(),
      content: newPost.content,
      author: newPost.author || 'Admin',
      image: newPost.image,
      createdAt: new Date().toISOString(),
    };
    savePosts([post, ...posts]);
    setNewPost({ content: '', author: '', image: '' });
  };

  const deletePost = (id: string) => {
    if (confirm('حذف المنشور؟')) {
      savePosts(posts.filter(p => p.id !== id));
    }
  };

  const startEdit = (id: string, content: string) => {
    setEditingId(id);
    setEditContent(content);
  };

  const saveEdit = (id: string) => {
    const updated = posts.map(p => p.id === id ? { ...p, content: editContent } : p);
    savePosts(updated);
    setEditingId(null);
  };

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-2xl font-bold">آخر المنشورات</h3>
        {isAdmin && <span className="text-xs text-emerald-600">وضع المدير – يمكنك التعديل</span>}
      </div>

      {isAdmin && (
        <div className="mb-6 border rounded-lg p-4 bg-gray-50">
          <h4 className="font-semibold mb-2">إضافة منشور جديد</h4>
          <textarea
            rows={3}
            value={newPost.content}
            onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
            className="w-full border p-2 rounded mb-2"
            placeholder="محتوى المنشور..."
          />
          <input
            value={newPost.author}
            onChange={(e) => setNewPost({ ...newPost, author: e.target.value })}
            className="w-full border p-2 rounded mb-2"
            placeholder="الكاتب (اختياري)"
          />
          <input
            value={newPost.image}
            onChange={(e) => setNewPost({ ...newPost, image: e.target.value })}
            className="w-full border p-2 rounded mb-2"
            placeholder="رابط الصورة (اختياري)"
          />
          <button onClick={addPost} className="bg-emerald-600 text-white px-4 py-2 rounded">
            نشر
          </button>
        </div>
      )}

      <div className="space-y-4">
        {posts.map(post => (
          <div key={post.id} className="border-b pb-4">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="font-bold text-emerald-700">{post.author}</div>
                {editingId === post.id ? (
                  <div className="mt-2">
                    <textarea
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                      className="w-full border p-2 rounded"
                      rows={3}
                    />
                    <div className="mt-2 space-x-2">
                      <button onClick={() => saveEdit(post.id)} className="bg-green-600 text-white px-3 py-1 rounded text-sm">حفظ</button>
                      <button onClick={() => setEditingId(null)} className="bg-gray-500 text-white px-3 py-1 rounded text-sm">إلغاء</button>
                    </div>
                  </div>
                ) : (
                  <p className="mt-1 text-gray-800">{post.content}</p>
                )}
                <div className="text-xs text-gray-400 mt-1">{new Date(post.createdAt).toLocaleString()}</div>
              </div>
              {isAdmin && editingId !== post.id && (
                <div className="flex space-x-2">
                  <button onClick={() => startEdit(post.id, post.content)} className="text-blue-600 text-sm">✏️</button>
                  <button onClick={() => deletePost(post.id)} className="text-red-600 text-sm">🗑️</button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EditableSocialFeed;
