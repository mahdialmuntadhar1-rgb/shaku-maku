import React, { useState } from 'react';
import { Check, Edit3, Image as ImageIcon, Lock, Save, Trash2 } from 'lucide-react';
import { Business, HeroSlide, Language, SocialPost, UserProfile } from '../types';
import { businessesApi, postsApi } from '../api';

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

  if (userProfile?.role !== 'admin') {
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
    setHeroSlides(prev => prev.map(slide => slide.id === slideId
      ? { ...slide, [field]: { ...slide[field], [currentLang]: value } }
      : slide));
  };

  const updateHeroImage = (slideId: string, file: File | null) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setHeroSlides(prev => prev.map(slide => slide.id === slideId
        ? { ...slide, image: String(reader.result) }
        : slide));
    };
    reader.readAsDataURL(file);
  };

  const approvePost = (postId: string) => {
    setPosts(prev => prev.map(post => post.id === postId ? { ...post, status: 'approved', updatedAt: new Date().toISOString() } : post));
    postsApi.update(postId, { status: 'approved' }).catch(() => undefined);
  };

  const deletePost = (postId: string) => {
    setPosts(prev => prev.filter(post => post.id !== postId));
    postsApi.delete(postId, userProfile.email).catch(() => undefined);
  };

  const savePost = (postId: string) => {
    const caption = editingPostText.trim();
    if (!caption) return;
    setPosts(prev => prev.map(post => post.id === postId
      ? { ...post, caption: { ar: caption, ku: caption, en: caption }, updatedAt: new Date().toISOString() }
      : post));
    postsApi.update(postId, { caption }).catch(() => undefined);
    setEditingPostId(null);
    setEditingPostText('');
  };

  const toggleBusinessVerification = (businessId: string) => {
    setBusinesses(prev => prev.map(business => business.id === businessId
      ? { ...business, isVerified: !business.isVerified }
      : business));
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

    setBusinesses(prev => prev.map(business => business.id === businessId
      ? {
          ...business,
          name: { ar: payload.name, ku: payload.name, en: payload.name },
          description: { ar: payload.description, ku: payload.description, en: payload.description },
          address: { ar: payload.address, ku: payload.address, en: payload.address },
          phoneNumber: payload.phone,
          category: payload.category,
          governorate: payload.governorate as any
        }
      : business));

    try {
      await businessesApi.update(businessId, payload);
      setBusinessStatus(t(currentLang, 'Business saved.', 'تم حفظ النشاط.', 'بازرگانی پاشەکەوت کرا.'));
    } catch {
      setBusinessStatus(t(currentLang, 'Saved locally (backend update failed).', 'تم الحفظ محلياً (فشل تحديث الخادم).', 'تەنها ناوخۆیی پاشەکەوت کرا (نوێکردنەوەی باکێند شکستی هێنا).'));
    }

    setEditingBusinessId(null);
  };

  const deleteBusiness = async (businessId: string) => {
    setBusinesses(prev => prev.filter(business => business.id !== businessId));
    try {
      await businessesApi.delete(businessId);
      setBusinessStatus(t(currentLang, 'Business deleted.', 'تم حذف النشاط.', 'بازرگانی سڕایەوە.'));
    } catch {
      setBusinessStatus(t(currentLang, 'Deleted locally (backend delete failed).', 'تم الحذف محلياً (فشل الحذف من الخادم).', 'تەنها ناوخۆیی سڕایەوە (سڕینەوەی باکێند شکستی هێنا).'));
    }
  };

  const pendingPosts = posts.filter(post => post.status === 'pending').length;

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6 space-y-6" dir={currentLang === 'en' ? 'ltr' : 'rtl'}>
      <div className="bg-[#18191a] border border-white/10 rounded-2xl p-5 text-white">
        <h1 className="text-2xl font-black mb-2">{t(currentLang, 'Admin Control Center', 'مركز تحكم الإدارة', 'ناوەندی کۆنترۆڵی بەڕێوەبەر')}</h1>
        <p className="text-sm text-zinc-400">{userProfile.email}</p>
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
            <span className="text-xs text-zinc-400">{t(currentLang, 'Pending Approval', 'بانتظار الموافقة', 'چاوەڕوانی پەسەندکردن')}</span>
            <strong className="block text-2xl text-amber-300">{pendingPosts}</strong>
          </div>
        </div>
      </div>

      <section className="bg-[#18191a] border border-white/10 rounded-2xl p-5 text-white space-y-4">
        <h2 className="text-lg font-black flex items-center gap-2">
          <ImageIcon className="w-5 h-5 text-luxury-gold" />
          {t(currentLang, 'Hero Editor', 'تعديل الواجهة الرئيسية', 'دەستکاری هیرو')}
        </h2>
        <div className="grid lg:grid-cols-2 gap-4">
          {heroSlides.map(slide => (
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
        <h2 className="text-lg font-black">{t(currentLang, 'Social Feed Moderation', 'إدارة المنشورات', 'بەڕێوەبردنی بابەتەکان')}</h2>
        <div className="space-y-3">
          {posts.length === 0 && <p className="text-sm text-zinc-400">{t(currentLang, 'No posts yet.', 'لا توجد منشورات بعد.', 'هێشتا هیچ بابەتێک نییە.')}</p>}
          {posts.map(post => (
            <div key={post.id} className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <strong className="block text-sm">{post.businessName}</strong>
                  <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${post.status === 'pending' ? 'bg-amber-500/15 text-amber-300' : 'bg-emerald-500/15 text-emerald-300'}`}>
                    {post.status || 'approved'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {post.status === 'pending' && (
                    <button type="button" onClick={() => approvePost(post.id)} className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400"><Check className="w-4 h-4" /></button>
                  )}
                  <button type="button" onClick={() => { setEditingPostId(post.id); setEditingPostText(post.caption[currentLang] || post.caption.en); }} className="p-2 rounded-lg bg-blue-500/10 text-blue-400"><Edit3 className="w-4 h-4" /></button>
                  <button type="button" onClick={() => deletePost(post.id)} className="p-2 rounded-lg bg-red-500/10 text-red-400"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>
              {editingPostId === post.id ? (
                <div className="space-y-2">
                  <textarea value={editingPostText} onChange={(event) => setEditingPostText(event.target.value)} rows={3} className="w-full bg-black/35 border border-white/10 rounded-lg px-3 py-2 text-sm" dir={currentLang === 'en' ? 'ltr' : 'rtl'} />
                  <button type="button" onClick={() => savePost(post.id)} className="px-3 py-2 rounded-lg bg-luxury-gold text-black text-xs font-black flex items-center gap-2"><Save className="w-4 h-4" /> Save</button>
                </div>
              ) : (
                <p className="text-sm text-zinc-300" dir={currentLang === 'en' ? 'ltr' : 'rtl'}><bdi>{post.caption[currentLang]}</bdi></p>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#18191a] border border-white/10 rounded-2xl p-5 text-white space-y-4">
        <h2 className="text-lg font-black">{t(currentLang, 'Business Listings', 'قوائم الأعمال', 'لیستی بازرگانییەکان')}</h2>
        {businessStatus && <p className="text-xs text-zinc-300">{businessStatus}</p>}
        <div className="grid md:grid-cols-2 gap-3">
          {businesses.slice(0, 12).map(business => (
            <div key={business.id} className="bg-white/5 border border-white/10 rounded-xl p-3 space-y-2">
              {editingBusinessId === business.id ? (
                <div className="space-y-2">
                  <input value={businessDraft.name} onChange={(event) => setBusinessDraft(prev => ({ ...prev, name: event.target.value }))} className="w-full bg-black/35 border border-white/10 rounded-lg px-3 py-2 text-xs" />
                  <textarea value={businessDraft.description} onChange={(event) => setBusinessDraft(prev => ({ ...prev, description: event.target.value }))} className="w-full bg-black/35 border border-white/10 rounded-lg px-3 py-2 text-xs" rows={2} />
                  <input value={businessDraft.address} onChange={(event) => setBusinessDraft(prev => ({ ...prev, address: event.target.value }))} className="w-full bg-black/35 border border-white/10 rounded-lg px-3 py-2 text-xs" />
                  <input value={businessDraft.phoneNumber} onChange={(event) => setBusinessDraft(prev => ({ ...prev, phoneNumber: event.target.value }))} className="w-full bg-black/35 border border-white/10 rounded-lg px-3 py-2 text-xs" />
                  <div className="flex items-center gap-2">
                    <button type="button" onClick={() => saveBusiness(business.id)} className="px-3 py-1.5 rounded-lg bg-luxury-gold text-black text-[10px] font-black flex items-center gap-1"><Save className="w-3 h-3" />Save</button>
                    <button type="button" onClick={() => setEditingBusinessId(null)} className="px-3 py-1.5 rounded-lg bg-white/10 text-zinc-200 text-[10px] font-bold">Cancel</button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <strong className="block text-sm truncate">{business.name[currentLang]}</strong>
                    <span className="text-[11px] text-zinc-500">{business.governorate}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <button type="button" onClick={() => startEditBusiness(business)} className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400"><Edit3 className="w-3.5 h-3.5" /></button>
                    <button type="button" onClick={() => deleteBusiness(business.id)} className="p-1.5 rounded-lg bg-red-500/10 text-red-400"><Trash2 className="w-3.5 h-3.5" /></button>
                    <button
                      type="button"
                      onClick={() => toggleBusinessVerification(business.id)}
                      className={`px-2 py-1.5 rounded-lg text-[10px] font-black ${business.isVerified ? 'bg-emerald-500/15 text-emerald-300' : 'bg-white/10 text-zinc-300'}`}
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
