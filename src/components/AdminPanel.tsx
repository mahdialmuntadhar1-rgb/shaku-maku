import React, { useState } from 'react';
import { Check, Edit3, Image as ImageIcon, Lock, Save, Trash2 } from 'lucide-react';
import { api, API_BASE_URL, businessesApi, getApiErrorMessage, postsApi } from '../api';
import { readSession } from '../auth/session';
import { Business, HeroSlide, Language, SocialPost, UserProfile } from '../types';

interface AdminPanelProps {
  currentLang: Language;
  businesses: Business[];
  setBusinesses: React.Dispatch<React.SetStateAction<Business[]>>;
  posts: SocialPost[];
  setPosts: React.Dispatch<React.SetStateAction<SocialPost[]>>;
  userProfile: UserProfile | null;
  heroSlides: HeroSlide[];
  setHeroSlides: React.Dispatch<React.SetStateAction<HeroSlide[]>>;
}

interface DiagnosticItem {
  label: string;
  ok: boolean;
  status: string;
  detail: string;
}

const t = (lang: Language, en: string, ar: string, ku: string) => {
  if (lang === 'ar') return ar;
  if (lang === 'ku') return ku;
  return en;
};

const AdminPanel: React.FC<AdminPanelProps> = ({
  currentLang,
  businesses,
  setBusinesses,
  posts,
  setPosts,
  userProfile,
  heroSlides,
  setHeroSlides
}) => {
  const [editingPostId, setEditingPostId] = useState<string | null>(null);
  const [editingPostText, setEditingPostText] = useState('');
  const [editingBusinessId, setEditingBusinessId] = useState<string | null>(null);
  const [businessDraft, setBusinessDraft] = useState({
    name: '',
    description: '',
    address: '',
    phoneNumber: '',
    category: '',
    governorate: ''
  });
  const [businessStatus, setBusinessStatus] = useState('');
  const [postStatus, setPostStatus] = useState('');
  const [savingNewPost, setSavingNewPost] = useState(false);
  const [newPostDraft, setNewPostDraft] = useState({
    businessId: '',
    captionAr: '',
    captionKu: '',
    captionEn: '',
    mediaUrl: '',
    videoUrl: ''
  });
  const [diagnostics, setDiagnostics] = useState<DiagnosticItem[]>([]);
  const [diagnosticsLoading, setDiagnosticsLoading] = useState(false);
  const session = readSession();
  const signedInEmail = (userProfile?.email || session?.user?.email || '').toLowerCase();
  const hasAdminAccess =
    signedInEmail === 'safaribosafar@gmail.com' ||
    userProfile?.role === 'admin' ||
    session?.user?.role === 'admin';

  if (!hasAdminAccess) {
    return (
      <div className="max-w-3xl mx-auto bg-[#18191a] border border-red-500/25 rounded-2xl p-8 text-center shadow-xl">
        <Lock className="w-10 h-10 text-red-400 mx-auto mb-3" />
        <h1 className="text-xl font-black text-white">
          {t(currentLang, 'Admin access required', 'يلزم حساب مدير', 'هەژماری بەڕێوەبەر پێویستە')}
        </h1>
      </div>
    );
  }

  const updateHeroField = (slideId: string, field: 'slogan' | 'badge', value: string) => {
    setHeroSlides((prev) =>
      prev.map((slide) =>
        slide.id === slideId
          ? { ...slide, [field]: { ...slide[field], [currentLang]: value } }
          : slide
      )
    );
  };

  const updateHeroImage = (slideId: string, file: File | null) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setHeroSlides((prev) =>
        prev.map((slide) => (slide.id === slideId ? { ...slide, image: String(reader.result) } : slide))
      );
    };
    reader.readAsDataURL(file);
  };

  const addHeroSlide = () => {
    const now = Date.now();
    setHeroSlides((prev) => [
      ...prev,
      {
        id: `hero-${now}`,
        image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1400&auto=format&fit=crop&q=85',
        slogan: {
          ar: 'إعلان جديد من شكو ماكو',
          ku: 'ڕیکلامی نوێ لە شەکو مەکو',
          en: 'New Shaku Maku promotion'
        },
        governorate: 'all' as any,
        category: 'restaurant',
        badge: {
          ar: 'مساحة ترويجية',
          ku: 'شوێنی ڕیکلام',
          en: 'Promotional space'
        }
      }
    ]);
  };

  const deleteHeroSlide = (slideId: string) => {
    setHeroSlides((prev) => {
      if (prev.length <= 1) return prev;
      return prev.filter((slide) => slide.id !== slideId);
    });
  };

  const approvePost = async (postId: string) => {
    try {
      await postsApi.update(postId, { status: 'approved' });
      setPosts((prev) =>
        prev.map((post) =>
          post.id === postId ? { ...post, status: 'approved', updatedAt: new Date().toISOString() } : post
        )
      );
      setPostStatus(t(currentLang, 'Post approved.', 'تمت الموافقة على المنشور.', 'بابەتەکە پەسەندکرا.'));
    } catch (error) {
      setPostStatus(getApiErrorMessage(error));
    }
  };

  const deletePost = async (postId: string) => {
    try {
      await postsApi.delete(postId);
      setPosts((prev) => prev.filter((post) => post.id !== postId));
      setPostStatus(t(currentLang, 'Post deleted.', 'تم حذف المنشور.', 'بابەتەکە سڕایەوە.'));
    } catch (error) {
      setPostStatus(getApiErrorMessage(error));
    }
  };

  const createPost = async () => {
    const linkedBusiness = businesses.find((business) => business.id === newPostDraft.businessId) || businesses[0];
    const captionAr = newPostDraft.captionAr.trim();
    const captionKu = newPostDraft.captionKu.trim() || captionAr;
    const captionEn = newPostDraft.captionEn.trim() || captionAr;
    const mediaUrl = newPostDraft.mediaUrl.trim();
    const videoUrl = newPostDraft.videoUrl.trim();

    if (!captionAr && !captionKu && !captionEn) {
      setPostStatus(t(currentLang, 'Write a caption first.', 'اكتب النص أولاً.', 'سەرەتا دەقێک بنووسە.'));
      return;
    }

    if (!linkedBusiness) {
      setPostStatus(t(currentLang, 'No business available to link this post.', 'لا يوجد نشاط لربط المنشور به.', 'هیچ بازرگانییەک نییە.'));
      return;
    }

    const optimisticPost: SocialPost = {
      id: `local-post-${Date.now()}`,
      businessId: linkedBusiness.id,
      businessName: linkedBusiness.name[currentLang] || linkedBusiness.name.en,
      businessAvatar: linkedBusiness.avatar,
      category: linkedBusiness.category,
      governorate: linkedBusiness.governorate,
      mediaUrl,
      caption: {
        ar: captionAr || captionKu || captionEn,
        ku: captionKu || captionAr || captionEn,
        en: captionEn || captionAr || captionKu
      },
      likes: 0,
      commentsCount: 0,
      shares: 0,
      views: 0,
      timeAgo: { ar: 'الآن', ku: 'ئێستا', en: 'Just now' },
      likedByUser: false,
      savedByUser: false,
      comments: [],
      videoUrl: videoUrl || undefined,
      status: 'approved',
      updatedAt: new Date().toISOString(),
      authorEmail: signedInEmail
    };

    try {
      setSavingNewPost(true);

      try {
        const created: any = await postsApi.create({
          business_id: linkedBusiness.id,
          caption_ar: optimisticPost.caption.ar,
          caption_ku: optimisticPost.caption.ku,
          caption_en: optimisticPost.caption.en,
          media_url: mediaUrl,
          video_url: videoUrl || null,
          category: linkedBusiness.category,
          governorate: linkedBusiness.governorate,
          status: 'approved'
        });

        const createdId = created?.id || created?.data?.id || optimisticPost.id;
        setPosts((prev) => [{ ...optimisticPost, id: String(createdId) }, ...prev]);
        setPostStatus(t(currentLang, 'Post added.', 'تمت إضافة المنشور.', 'بابەتەکە زیادکرا.'));
      } catch (backendError) {
        console.warn('Post backend create failed, using local fallback:', backendError);
        setPosts((prev) => [optimisticPost, ...prev]);
        setPostStatus(t(currentLang, 'Post added locally. Backend create route may need review.', 'تمت إضافة المنشور محلياً. قد يحتاج الخادم للمراجعة.', 'بابەتەکە ناوخۆیی زیادکرا.'));
      }

      setNewPostDraft({
        businessId: '',
        captionAr: '',
        captionKu: '',
        captionEn: '',
        mediaUrl: '',
        videoUrl: ''
      });
    } finally {
      setSavingNewPost(false);
    }
  };

  const savePost = async (postId: string) => {
    const caption = editingPostText.trim();
    if (!caption) return;

    try {
      await postsApi.update(postId, { caption });
      setPosts((prev) =>
        prev.map((post) =>
          post.id === postId
            ? { ...post, caption: { ar: caption, ku: caption, en: caption }, updatedAt: new Date().toISOString() }
            : post
        )
      );
      setEditingPostId(null);
      setEditingPostText('');
      setPostStatus(t(currentLang, 'Post updated.', 'تم تحديث المنشور.', 'بابەتەکە نوێکرایەوە.'));
    } catch (error) {
      setPostStatus(getApiErrorMessage(error));
    }
  };

  const toggleBusinessVerification = (businessId: string) => {
    setBusinesses((prev) =>
      prev.map((business) =>
        business.id === businessId ? { ...business, isVerified: !business.isVerified } : business
      )
    );
  };

  const startEditBusiness = (business: Business) => {
    setEditingBusinessId(business.id);
    setBusinessDraft({
      name: business.name[currentLang] || business.name.en,
      description: business.description[currentLang] || business.description.en,
      address: business.address[currentLang] || business.address.en,
      phoneNumber: business.phoneNumber || '',
      category: business.category,
      governorate: business.governorate
    });
  };

  const saveBusiness = async (businessId: string) => {
    const payload = {
      name: businessDraft.name.trim(),
      description: businessDraft.description.trim(),
      address: businessDraft.address.trim(),
      phone: businessDraft.phoneNumber.trim(),
      category: businessDraft.category.trim(),
      governorate: businessDraft.governorate.trim()
    };

    try {
      await businessesApi.update(businessId, payload);
      setBusinesses((prev) =>
        prev.map((business) =>
          business.id === businessId
            ? {
                ...business,
                name: { ar: payload.name, ku: payload.name, en: payload.name },
                description: {
                  ar: payload.description,
                  ku: payload.description,
                  en: payload.description
                },
                address: { ar: payload.address, ku: payload.address, en: payload.address },
                phoneNumber: payload.phone,
                category: payload.category,
                governorate: payload.governorate as any
              }
            : business
        )
      );
      setBusinessStatus(t(currentLang, 'Business saved.', 'تم حفظ النشاط.', 'بازرگانی پاشەکەوت کرا.'));
      setEditingBusinessId(null);
    } catch (error) {
      setBusinessStatus(getApiErrorMessage(error));
    }
  };

  const deleteBusiness = async (businessId: string) => {
    try {
      await businessesApi.delete(businessId);
      setBusinesses((prev) => prev.filter((business) => business.id !== businessId));
      setBusinessStatus(t(currentLang, 'Business deleted.', 'تم حذف النشاط.', 'بازرگانی سڕایەوە.'));
    } catch (error) {
      setBusinessStatus(getApiErrorMessage(error));
    }
  };

  const runDiagnostics = async () => {
    setDiagnosticsLoading(true);
    const next: DiagnosticItem[] = [];

    const capture = async (label: string, call: () => Promise<{ status: number; data: any }>) => {
      try {
        const response = await call();
        const preview = JSON.stringify(response.data).slice(0, 180);
        next.push({
          label,
          ok: response.status >= 200 && response.status < 400,
          status: String(response.status),
          detail: preview || 'OK'
        });
      } catch (error: any) {
        const status = error?.response?.status ? String(error.response.status) : 'NETWORK';
        next.push({
          label,
          ok: false,
          status,
          detail: getApiErrorMessage(error)
        });
      }
    };

    next.push({
      label: 'Auth/session',
      ok: Boolean(session?.token && session?.user?.email),
      status: session ? 'ACTIVE' : 'NONE',
      detail: session ? `Signed in as ${session.user.email}` : 'No active session'
    });

    await capture('GET /api/businesses', () => api.get('/businesses', { params: { page: 1, limit: 1 } }));
    await capture('GET /api/posts', () => api.get('/posts', { params: { page: 1, limit: 1 } }));
    await capture('GET /api/feed/business-posts', () =>
      api.get('/feed/business-posts', { params: { page: 1, limit: 1 } })
    );
    await capture('Filter probe (governorate+category)', () =>
      api.get('/businesses', {
        params: { governorate: 'Baghdad', category: 'Restaurants', page: 1, limit: 5 }
      })
    );
    await capture('Write route probe (OPTIONS /api/businesses)', () => api.options('/businesses'));

    setDiagnostics(next);
    setDiagnosticsLoading(false);
  };

  const pendingPosts = posts.filter((post) => post.status === 'pending').length;
  const displayEmail = userProfile?.email || session?.user?.email || 'admin@shaku-maku';

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6 space-y-6" dir={currentLang === 'en' ? 'ltr' : 'rtl'}>
      <div className="bg-[#18191a] border border-white/10 rounded-2xl p-5 text-white">
        <h1 className="text-2xl font-black mb-2">
          {t(currentLang, 'Admin Control Center', 'مركز تحكم الإدارة', 'ناوەندی کۆنترۆڵی بەڕێوەبەر')}
        </h1>
        <p className="text-sm text-zinc-400">{displayEmail}</p>
        <div className="grid sm:grid-cols-3 gap-3 mt-5">
          <div className="bg-white/5 rounded-xl p-4 border border-white/10">
            <span className="text-xs text-zinc-400">{t(currentLang, 'Businesses', 'الأعمال', 'بازرگانییەکان')}</span>
            <strong className="block text-2xl">{businesses.length}</strong>
          </div>
          <div className="bg-white/5 rounded-xl p-4 border border-white/10">
            <span className="text-xs text-zinc-400">{t(currentLang, 'Posts', 'المنشورات', 'بابەتەکان')}</span>
            <strong className="block text-2xl">{posts.length}</strong>
          </div>
          <div className="bg-white/5 rounded-xl p-4 border border-amber-500/25">
            <span className="text-xs text-zinc-400">
              {t(currentLang, 'Pending Approval', 'بانتظار الموافقة', 'چاوەڕوانی پەسەندکردن')}
            </span>
            <strong className="block text-2xl text-amber-300">{pendingPosts}</strong>
          </div>
        </div>
      </div>

      <section className="bg-[#18191a] border border-white/10 rounded-2xl p-5 text-white space-y-3">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-lg font-black">Admin API Diagnostics</h2>
          <button
            type="button"
            onClick={runDiagnostics}
            disabled={diagnosticsLoading}
            className="px-3 py-2 rounded-lg bg-luxury-gold text-black text-xs font-black disabled:opacity-60"
          >
            {diagnosticsLoading ? 'Running...' : 'Run checks'}
          </button>
        </div>
        <div className="text-xs text-zinc-400 space-y-1">
          <p>API base: {API_BASE_URL}</p>
          <p>Signed-in email: {signedInEmail || 'none'}</p>
          <p>Backend admin role: {hasAdminAccess ? 'yes' : 'no'}</p>
        </div>
        {diagnostics.length > 0 && (
          <div className="space-y-2">
            {diagnostics.map((item) => (
              <div key={item.label} className="bg-white/5 border border-white/10 rounded-lg p-3">
                <div className="flex items-center justify-between gap-2 text-xs">
                  <span className="font-bold">{item.label}</span>
                  <span className={item.ok ? 'text-emerald-300' : 'text-red-300'}>
                    {item.ok ? 'OK' : 'FAIL'} ({item.status})
                  </span>
                </div>
                <p className="text-[11px] text-zinc-400 mt-1 break-all">{item.detail}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="bg-[#18191a] border border-white/10 rounded-2xl p-5 text-white space-y-4">
        <h2 className="text-lg font-black flex items-center gap-2">
          <ImageIcon className="w-5 h-5 text-luxury-gold" />
          {t(currentLang, 'Hero Editor', 'تعديل الواجهة الرئيسية', 'دەستکاری هیرو')}
        </h2>
        <p className="text-xs text-amber-300">
          Hero edits save to this app immediately and persist in browser storage.
        </p>
        <button
          type="button"
          onClick={addHeroSlide}
          className="px-3 py-2 rounded-lg bg-luxury-gold text-black text-xs font-black"
        >
          Add promotional slide
        </button>
        <div className="grid lg:grid-cols-2 gap-4">
          {heroSlides.map((slide) => (
            <div key={slide.id} className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-3">
              <img src={slide.image} alt="" className="w-full h-36 object-cover rounded-lg bg-black" />
              <input
                value={slide.slogan[currentLang]}
                onChange={(event) => updateHeroField(slide.id, 'slogan', event.target.value)}
                className="w-full bg-black/35 border border-white/10 rounded-lg px-3 py-2 text-sm"
                dir={currentLang === 'en' ? 'ltr' : 'rtl'}
              />
              <input
                value={slide.badge[currentLang]}
                onChange={(event) => updateHeroField(slide.id, 'badge', event.target.value)}
                className="w-full bg-black/35 border border-white/10 rounded-lg px-3 py-2 text-sm"
                dir={currentLang === 'en' ? 'ltr' : 'rtl'}
              />
              <input
                type="file"
                accept="image/*"
                onChange={(event) => updateHeroImage(slide.id, event.target.files?.[0] || null)}
                className="block w-full text-xs text-zinc-300 file:mr-3 file:rounded-lg file:border-0 file:bg-luxury-gold file:px-3 file:py-2 file:text-black file:font-bold"
              />
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#18191a] border border-white/10 rounded-2xl p-5 text-white space-y-4">
        <h2 className="text-lg font-black">
          {t(currentLang, 'Social Feed Moderation', 'إدارة المنشورات', 'بەڕێوەبردنی بابەتەکان')}
        </h2>
        {postStatus && <p className="text-xs text-zinc-300">{postStatus}</p>}

        <div className="bg-white/5 border border-luxury-gold/20 rounded-xl p-4 space-y-3">
          <h3 className="text-sm font-black text-luxury-gold">Create New Social Post</h3>

          <select
            value={newPostDraft.businessId}
            onChange={(event) => setNewPostDraft((prev) => ({ ...prev, businessId: event.target.value }))}
            className="w-full bg-black/35 border border-white/10 rounded-lg px-3 py-2 text-xs"
          >
            <option value="">Link to first available business</option>
            {businesses.slice(0, 80).map((business) => (
              <option key={business.id} value={business.id}>
                {business.name[currentLang] || business.name.en}
              </option>
            ))}
          </select>

          <textarea
            value={newPostDraft.captionAr}
            onChange={(event) => setNewPostDraft((prev) => ({ ...prev, captionAr: event.target.value }))}
            placeholder="Arabic caption"
            rows={2}
            className="w-full bg-black/35 border border-white/10 rounded-lg px-3 py-2 text-xs"
            dir="rtl"
          />

          <textarea
            value={newPostDraft.captionKu}
            onChange={(event) => setNewPostDraft((prev) => ({ ...prev, captionKu: event.target.value }))}
            placeholder="Kurdish caption"
            rows={2}
            className="w-full bg-black/35 border border-white/10 rounded-lg px-3 py-2 text-xs"
            dir="rtl"
          />

          <textarea
            value={newPostDraft.captionEn}
            onChange={(event) => setNewPostDraft((prev) => ({ ...prev, captionEn: event.target.value }))}
            placeholder="English caption"
            rows={2}
            className="w-full bg-black/35 border border-white/10 rounded-lg px-3 py-2 text-xs"
            dir="ltr"
          />

          <input
            value={newPostDraft.mediaUrl}
            onChange={(event) => setNewPostDraft((prev) => ({ ...prev, mediaUrl: event.target.value }))}
            placeholder="Image/media URL"
            className="w-full bg-black/35 border border-white/10 rounded-lg px-3 py-2 text-xs"
            dir="ltr"
          />

          <input
            value={newPostDraft.videoUrl}
            onChange={(event) => setNewPostDraft((prev) => ({ ...prev, videoUrl: event.target.value }))}
            placeholder="Optional video URL"
            className="w-full bg-black/35 border border-white/10 rounded-lg px-3 py-2 text-xs"
            dir="ltr"
          />

          <button
            type="button"
            onClick={() => void createPost()}
            disabled={savingNewPost}
            className="px-3 py-2 rounded-lg bg-luxury-gold text-black text-xs font-black disabled:opacity-60"
          >
            {savingNewPost ? 'Saving...' : 'Add post'}
          </button>
        </div>

        <div className="space-y-3">
          {posts.length === 0 && (
            <p className="text-sm text-zinc-400">
              {t(currentLang, 'No posts yet.', 'لا توجد منشورات بعد.', 'هێشتا هیچ بابەتێک نییە.')}
            </p>
          )}
          {posts.map((post) => (
            <div key={post.id} className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <strong className="block text-sm">{post.businessName}</strong>
                  <span
                    className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                      post.status === 'pending'
                        ? 'bg-amber-500/15 text-amber-300'
                        : 'bg-emerald-500/15 text-emerald-300'
                    }`}
                  >
                    {post.status || 'approved'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {post.status === 'pending' && (
                    <button
                      type="button"
                      onClick={() => void approvePost(post.id)}
                      className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400"
                    >
                      <Check className="w-4 h-4" />
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => {
                      setEditingPostId(post.id);
                      setEditingPostText(post.caption[currentLang] || post.caption.en);
                    }}
                    className="p-2 rounded-lg bg-blue-500/10 text-blue-400"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => void deletePost(post.id)}
                    className="p-2 rounded-lg bg-red-500/10 text-red-400"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              {editingPostId === post.id ? (
                <div className="space-y-2">
                  <textarea
                    value={editingPostText}
                    onChange={(event) => setEditingPostText(event.target.value)}
                    rows={3}
                    className="w-full bg-black/35 border border-white/10 rounded-lg px-3 py-2 text-sm"
                    dir={currentLang === 'en' ? 'ltr' : 'rtl'}
                  />
                  <button
                    type="button"
                    onClick={() => void savePost(post.id)}
                    className="px-3 py-2 rounded-lg bg-luxury-gold text-black text-xs font-black flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" /> Save
                  </button>
                </div>
              ) : (
                <p className="text-sm text-zinc-300" dir={currentLang === 'en' ? 'ltr' : 'rtl'}>
                  <bdi>{post.caption[currentLang]}</bdi>
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#18191a] border border-white/10 rounded-2xl p-5 text-white space-y-4">
        <h2 className="text-lg font-black">
          {t(currentLang, 'Business Listings', 'قوائم الأعمال', 'لیستی بازرگانییەکان')}
        </h2>
        {businessStatus && <p className="text-xs text-zinc-300">{businessStatus}</p>}
        <div className="grid md:grid-cols-2 gap-3">
          {businesses.slice(0, 12).map((business) => (
            <div key={business.id} className="bg-white/5 border border-white/10 rounded-xl p-3 space-y-2">
              {editingBusinessId === business.id ? (
                <div className="space-y-2">
                  <input
                    value={businessDraft.name}
                    onChange={(event) => setBusinessDraft((prev) => ({ ...prev, name: event.target.value }))}
                    className="w-full bg-black/35 border border-white/10 rounded-lg px-3 py-2 text-xs"
                  />
                  <textarea
                    value={businessDraft.description}
                    onChange={(event) =>
                      setBusinessDraft((prev) => ({ ...prev, description: event.target.value }))
                    }
                    className="w-full bg-black/35 border border-white/10 rounded-lg px-3 py-2 text-xs"
                    rows={2}
                  />
                  <input
                    value={businessDraft.address}
                    onChange={(event) => setBusinessDraft((prev) => ({ ...prev, address: event.target.value }))}
                    className="w-full bg-black/35 border border-white/10 rounded-lg px-3 py-2 text-xs"
                  />
                  <input
                    value={businessDraft.phoneNumber}
                    onChange={(event) =>
                      setBusinessDraft((prev) => ({ ...prev, phoneNumber: event.target.value }))
                    }
                    className="w-full bg-black/35 border border-white/10 rounded-lg px-3 py-2 text-xs"
                  />
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => void saveBusiness(business.id)}
                      className="px-3 py-1.5 rounded-lg bg-luxury-gold text-black text-[10px] font-black flex items-center gap-1"
                    >
                      <Save className="w-3 h-3" />
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditingBusinessId(null)}
                      className="px-3 py-1.5 rounded-lg bg-white/10 text-zinc-200 text-[10px] font-bold"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <strong className="block text-sm truncate">{business.name[currentLang]}</strong>
                    <span className="text-[11px] text-zinc-500">{business.governorate}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => startEditBusiness(business)}
                      className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => void deleteBusiness(business.id)}
                      className="p-1.5 rounded-lg bg-red-500/10 text-red-400"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => toggleBusinessVerification(business.id)}
                      className={`px-2 py-1.5 rounded-lg text-[10px] font-black ${
                        business.isVerified
                          ? 'bg-emerald-500/15 text-emerald-300'
                          : 'bg-white/10 text-zinc-300'
                      }`}
                    >
                      {business.isVerified ? 'Verified' : 'Verify'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AdminPanel;
