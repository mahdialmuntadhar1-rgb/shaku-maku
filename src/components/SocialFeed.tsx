import React, { useEffect, useMemo, useState } from 'react';
import { CheckCircle2, Edit3, Eye, Heart, ImagePlus, Loader2, MapPin, MessageCircle, Phone, Repeat2, Save, Send, Share2, Trash2, X } from 'lucide-react';
import { API_BASE_URL, getApiErrorMessage, postsApi } from '../api';
import { CATEGORIES, GOVERNORATES } from '../data';
import { normalizeGovernorate, normalizeCategory, getGovernorateLabel, getCategoryLabel } from '../utils/taxonomy';
import { buildLocalizedSocialPosts, LOCALIZED_SOCIAL_POST_COUNT } from '../data/socialFeedSeed';
import { GovernorateCode, Language, SocialPost } from '../types';

interface SocialFeedProps {
  currentLang: Language;
  selectedGov: GovernorateCode;
  posts: SocialPost[];
  setPosts: React.Dispatch<React.SetStateAction<SocialPost[]>>;
  onSignIn: () => void;
  user: any;
}

const text = {
  en: {
    composerTitle: 'Create Post',
    placeholder: 'What do you want to share?',
    post: 'Post',
    media: 'Upload photo or video',
    signIn: 'Please sign in to create a post.',
    empty: 'No more posts for this filter.',
    backendOn: 'Backend Connected',
    backendOff: 'Backend Offline',
    failed: 'Post failed',
    published: 'Post created',
    feedTitle: 'Shaku Maku Social Pulse',
    feedSub: 'Real-looking local business updates from every Iraqi governorate.',
    allCategories: 'All categories',
    allGovs: 'All Iraq',
    showMore: 'Load more posts',
    phone: 'Call',
    address: 'Address',
    likes: 'Likes',
    comments: 'Comments',
    shares: 'Shares',
    views: 'Views',
    seeded: 'localized demo engagement',
    edit: 'Edit',
    save: 'Save',
    cancel: 'Cancel',
    delete: 'Delete',
    deleted: 'Post deleted',
    updated: 'Post updated',
  },
  ar: {
    composerTitle: 'إنشاء منشور',
    placeholder: 'ماذا تريد أن تشارك؟',
    post: 'نشر',
    media: 'رفع صورة أو فيديو',
    signIn: 'يرجى تسجيل الدخول لإنشاء منشور.',
    empty: 'لا توجد منشورات إضافية لهذا الفلتر.',
    backendOn: 'الخادم متصل',
    backendOff: 'الخادم غير متصل',
    failed: 'فشل إنشاء المنشور',
    published: 'تم إنشاء المنشور',
    feedTitle: 'نبض شكو ماكو الاجتماعي',
    feedSub: 'منشورات محلية بشكل فيسبوك/إنستغرام لكل محافظة عراقية.',
    allCategories: 'جميع الفئات',
    allGovs: 'كل العراق',
    showMore: 'تحميل منشورات أكثر',
    phone: 'اتصال',
    address: 'العنوان',
    likes: 'إعجاب',
    comments: 'تعليق',
    shares: 'مشاركة',
    views: 'مشاهدة',
    seeded: 'تفاعل تجريبي محلي',
    edit: 'تعديل',
    save: 'حفظ',
    cancel: 'إلغاء',
    delete: 'حذف',
    deleted: 'تم حذف المنشور',
    updated: 'تم تحديث المنشور',
  },
  ku: {
    composerTitle: 'دروستکردنی بابەت',
    placeholder: 'چی دەتەوێت هاوبەش بکەیت؟',
    post: 'بڵاوکردنەوە',
    media: 'بارکردنی وێنە یان ڤیدیۆ',
    signIn: 'تکایە بچۆ ژوورەوە بۆ دروستکردنی بابەت.',
    empty: 'هیچ بابەتێکی تر بۆ ئەم فلتەرە نییە.',
    backendOn: 'باکەند پەیوەستە',
    backendOff: 'باکەند ناچالاکە',
    failed: 'دروستکردنی بابەت سەرکەوتوو نەبوو',
    published: 'بابەتەکە دروستکرا',
    feedTitle: 'نەبزی کۆمەڵایەتی شکو ماکو',
    feedSub: 'پۆستە ناوخۆییەکان بە شێوەی فەیسبووک/ئیستاگرام بۆ هەموو پارێزگاکان.',
    allCategories: 'هەموو پۆلەکان',
    allGovs: 'هەموو عێراق',
    showMore: 'پۆستی زیاتر پیشان بدە',
    phone: 'پەیوەندی',
    address: 'ناونیشان',
    likes: 'لایک',
    comments: 'کۆمێنت',
    shares: 'هاوبەشکردن',
    views: 'بینین',
    seeded: 'کارلێکی نموونەیی',
    edit: 'دەستکاری',
    save: 'پاشەکەوت',
    cancel: 'هەڵوەشاندنەوە',
    delete: 'سڕینەوە',
    deleted: 'بابەتەکە سڕایەوە',
    updated: 'بابەتەکە نوێکرایەوە',
  }
} as const;

function isLocalAdminSocialFeed() {
  try {
    const raw = localStorage.getItem('current_user') || localStorage.getItem('user') || '{}';
    const parsed = JSON.parse(raw);
    const email = String(parsed?.email || '').trim().toLowerCase();
    const role = String(parsed?.role || '').trim().toLowerCase();
    return email === 'safaribosafar@gmail.com' || role === 'admin';
  } catch {
    return false;
  }
}

const FALLBACK_AVATAR =
  'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&h=120&fit=crop&q=80';
const FALLBACK_MEDIA =
  'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&auto=format&fit=crop&q=80';

function compactNumber(value = 0): string {
  if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
  if (value >= 1000) return `${(value / 1000).toFixed(value >= 10000 ? 0 : 1)}K`;
  return String(value);
}

function getLocalized(value: any, lang: Language): string {
  if (!value) return '';
  if (typeof value === 'string') return value;
  return String(value[lang] || value.ar || value.ku || value.en || '');
}

const KURDISH_FIRST_GOVERNORATES = new Set([
  'erbil',
  'sulaymaniyah',
  'duhok',
  'halabja',
  'kirkuk'
]);

function getRegionalMainLanguage(gov: GovernorateCode): Language {
  return KURDISH_FIRST_GOVERNORATES.has(String(gov)) ? 'ku' : 'ar';
}

function getCaptionDisplay(post: SocialPost, currentLang: Language) {
  const regionalLang = getRegionalMainLanguage(post.governorate);
  const mainText = getLocalized(post.caption, regionalLang) || getLocalized(post.caption, currentLang);
  const selectedText = getLocalized(post.caption, currentLang);
  const englishText = getLocalized(post.caption, 'en');

  let translationLabel = '';
  let translationText = '';

  if (currentLang !== regionalLang && selectedText && selectedText !== mainText) {
    translationLabel =
      currentLang === 'ar'
        ? 'الترجمة العربية'
        : currentLang === 'ku'
        ? 'وەرگێڕانی کوردی'
        : 'English translation';

    translationText = selectedText;
  } else if (currentLang === regionalLang && englishText && englishText !== mainText) {
    translationLabel =
      currentLang === 'ku'
        ? 'English translation'
        : currentLang === 'ar'
        ? 'الترجمة الإنجليزية'
        : 'English translation';

    translationText = englishText;
  }

  return {
    mainText,
    mainLang: regionalLang,
    translationLabel,
    translationText,
    translationLang: currentLang !== regionalLang ? currentLang : 'en'
  };
}

function mapApiPostToUi(post: any): SocialPost {
  return {
    id: String(post.id),
    businessId: String(post.business_id || ''),
    businessName: post.business_name_ar || post.business_name_en || 'Shaku Maku',
    businessAvatar: post.business_avatar || FALLBACK_AVATAR,
    category: String(post.category || 'restaurant'),
    governorate: String(post.governorate || 'all').toLowerCase().replace(/\s+/g, '') as GovernorateCode,
    mediaUrl: String(post.media_url || ''),
    caption: {
      ar: String(post.caption_ar || post.caption_en || ''),
      ku: String(post.caption_ku || post.caption_en || ''),
      en: String(post.caption_en || post.caption_ar || ''),
    },
    likes: Number(post.likes || 0),
    commentsCount: Number(post.comments_count || 0),
    shares: Number(post.shares || 0),
    views: Number(post.views || 0),
    timeAgo: { ar: 'الآن', ku: 'ئێستا', en: 'Just now' },
    likedByUser: false,
    savedByUser: false,
    comments: [],
    videoUrl: post.video_url || undefined,
    status: post.status || 'pending',
    updatedAt: post.updated_at || undefined,
  };
}

function getCategoryMeta(categoryId: string, lang: Language) {
  const category = CATEGORIES.find((item) => item.id === categoryId);
  return {
    icon: category?.icon || '🏢',
    name: category?.name?.[lang] || category?.name?.ar || categoryId,
  };
}

function getGovName(govCode: GovernorateCode, lang: Language) {
  const gov = GOVERNORATES.find((item) => item.code === govCode);
  return gov?.name?.[lang] || gov?.name?.ar || govCode;
}

export default function SocialFeed({
  currentLang,
  selectedGov,
  posts,
  setPosts,
  onSignIn,
  user
}: SocialFeedProps) {
  const isRtl = currentLang !== 'en';
  const t = text[currentLang];

  const [apiConnected, setApiConnected] = useState<boolean | null>(null);
  const [caption, setCaption] = useState('');
  const [attachmentDataUrl, setAttachmentDataUrl] = useState<string>('');
  const [attachmentKind, setAttachmentKind] = useState<'image' | 'video' | null>(null);
  const [statusText, setStatusText] = useState('');
  const [posting, setPosting] = useState(false);
  const [generatedPosts, setGeneratedPosts] = useState<SocialPost[]>(() => buildLocalizedSocialPosts([]));
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [visibleCount, setVisibleCount] = useState(12);
  const isAdmin = String(user?.email || '').toLowerCase() === 'safaribosafar@gmail.com' || user?.role === 'admin' || isLocalAdminSocialFeed();
  const [editingPostId, setEditingPostId] = useState<string | null>(null);
  const [editCaption, setEditCaption] = useState('');
  const [postActionStatus, setPostActionStatus] = useState('');

  useEffect(() => {
    let cancelled = false;
    const probeAndLoadBusinesses = async () => {
      try {
        const [healthResponse, businessesResponse] = await Promise.allSettled([
          fetch(`${API_BASE_URL}/api/health`),
          fetch(`${API_BASE_URL}/api/businesses?page=1&limit=500`),
        ]);

        if (!cancelled) {
          setApiConnected(healthResponse.status === 'fulfilled' && healthResponse.value.ok);
        }

        if (businessesResponse.status === 'fulfilled' && businessesResponse.value.ok) {
          const payload = await businessesResponse.value.json();
          const localized = buildLocalizedSocialPosts(payload);
          if (!cancelled && localized.length >= LOCALIZED_SOCIAL_POST_COUNT) {
            setGeneratedPosts(localized);
          }
        }
      } catch {
        if (!cancelled) setApiConnected(false);
      }
    };
    probeAndLoadBusinesses();
    const updatePostLocally = (postId: string, updater: (post: SocialPost) => SocialPost) => {
    setPosts((prev) => prev.map((post) => (post.id === postId ? updater(post) : post)));
    setGeneratedPosts((prev) => prev.map((post) => (post.id === postId ? updater(post) : post)));
  };

  const removePostLocally = (postId: string) => {
    setPosts((prev) => prev.filter((post) => post.id !== postId));
    setGeneratedPosts((prev) => prev.filter((post) => post.id !== postId));
  };

  const startEditPost = (post: SocialPost) => {
    setEditingPostId(post.id);
    setEditCaption(getLocalized(post.caption, currentLang));
    setPostActionStatus('');
  };

  const cancelEditPost = () => {
    setEditingPostId(null);
    setEditCaption('');
  };

  const saveEditedPost = async (post: SocialPost) => {
    const cleanCaption = editCaption.trim();
    if (!cleanCaption) return;

    updatePostLocally(post.id, (current) => ({
      ...current,
      caption: {
        ...current.caption,
        ar: cleanCaption,
        ku: cleanCaption,
        en: cleanCaption
      }
    }));

    try {
      await postsApi.update(post.id, { caption: cleanCaption });
      setPostActionStatus(t.updated);
    } catch (error) {
      setPostActionStatus(`${t.failed}: ${getApiErrorMessage(error)}`);
    } finally {
      setEditingPostId(null);
      setEditCaption('');
    }
  };

  const deletePost = async (post: SocialPost) => {
    const ok = window.confirm(currentLang === 'en' ? 'Delete this post?' : currentLang === 'ku' ? 'ئەم بابەتە بسڕدرێتەوە؟' : 'هل تريد حذف هذا المنشور؟');
    if (!ok) return;

    removePostLocally(post.id);

    try {
      await postsApi.delete(post.id);
      setPostActionStatus(t.deleted);
    } catch (error) {
      setPostActionStatus(`${t.deleted}. ${getApiErrorMessage(error)}`);
    }
  };

  return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    setVisibleCount(12);
  }, [selectedGov, selectedCategory]);

  const mergedPosts = useMemo(() => {
    const byId = new Map<string, SocialPost>();
    [...posts, ...generatedPosts].forEach((post) => {
      if (!byId.has(post.id)) byId.set(post.id, post);
    });
    return Array.from(byId.values());
  }, [posts, generatedPosts]);

  const categoriesInFeed = useMemo(() => {
    const ids = Array.from(new Set(mergedPosts.map((post) => post.category).filter(Boolean)));
    return ids.sort((a, b) => getCategoryMeta(a, currentLang).name.localeCompare(getCategoryMeta(b, currentLang).name));
  }, [mergedPosts, currentLang]);

  const filteredPosts = useMemo(() => {
    return mergedPosts.filter((post) => {
      const govMatch = selectedGov === 'all' || normalizeGovernorate(post.governorate) === normalizeGovernorate(selectedGov);
      const categoryMatch = selectedCategory === 'all' || normalizeCategory(post.category) === normalizeCategory(selectedCategory);
      return govMatch && categoryMatch;
    });
  }, [mergedPosts, selectedGov, selectedCategory]);

  const visiblePosts = filteredPosts.slice(0, visibleCount);

  const onPickMedia = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const value = String(reader.result || '');
      if (!value) return;
      setAttachmentDataUrl(value);
      setAttachmentKind(file.type.startsWith('video/') ? 'video' : 'image');
    };
    reader.readAsDataURL(file);
  };

  const onCreatePost = async (event: React.FormEvent) => {
    event.preventDefault();
    setStatusText('');

    if (!user) {
      setStatusText(t.signIn);
      onSignIn();
      return;
    }

    if (!caption.trim()) return;

    setPosting(true);
    try {
      const payload = {
        caption_ar: caption.trim(),
        caption_ku: caption.trim(),
        caption_en: caption.trim(),
        media_url: attachmentKind === 'image' ? attachmentDataUrl || null : null,
        video_url: attachmentKind === 'video' ? attachmentDataUrl || null : null,
      };

      const response = await postsApi.create(payload);
      const created = response?.data ? mapApiPostToUi(response.data) : null;

      if (created) {
        setPosts((prev) => [created, ...prev]);
      }

      setCaption('');
      setAttachmentDataUrl('');
      setAttachmentKind(null);
      setStatusText(t.published);
    } catch (error) {
      setStatusText(`${t.failed}: ${getApiErrorMessage(error)}`);
    } finally {
      setPosting(false);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-5 social-live-red-zone" dir={isRtl ? 'rtl' : 'ltr'}>
      <section className="relative overflow-hidden bg-[#1a0d12] border border-red-400/25 rounded-[2rem] p-5 text-white shadow-[0_0_40px_rgba(244,63,94,0.18)]">
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top_left,rgba(244,63,94,0.22),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(127,29,29,0.55),transparent_40%)]" />
        <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-[11px] font-black text-luxury-gold uppercase tracking-[0.25em] mb-2">
              <Repeat2 className="w-4 h-4" />
              <span>Social Feed</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-black leading-tight">{t.feedTitle}</h2>
            <p className="text-sm text-zinc-300 mt-2 max-w-2xl">{t.feedSub}</p>
            <p className="text-[11px] text-zinc-400 mt-2">
              {LOCALIZED_SOCIAL_POST_COUNT} seeded localized posts + backend posts. {t.seeded}.
            </p>
          </div>
          <span className={`self-start text-[11px] px-3 py-1.5 rounded-full border ${apiConnected ? 'bg-emerald-500/15 text-emerald-200 border-emerald-400/30' : 'bg-red-500/15 text-red-200 border-red-400/30'}`}>
            {apiConnected ? t.backendOn : t.backendOff}
          </span>
        </div>
      </section>

      <section className="bg-[#18191a] border border-white/10 rounded-2xl p-4 text-white">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-bold">{t.composerTitle}</h2>
        </div>

        <form onSubmit={onCreatePost} className="space-y-3">
          <textarea
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder={t.placeholder}
            rows={3}
            lang={currentLang === 'ku' ? 'ku' : currentLang}
            className="w-full rounded-xl bg-[#242526] border border-white/10 p-3 text-sm text-white placeholder-zinc-400 outline-none focus:border-luxury-gold resize-none"
            required
          />

          {attachmentDataUrl && (
            <div className="rounded-xl border border-white/10 p-2 bg-black/20">
              {attachmentKind === 'video' ? (
                <video src={attachmentDataUrl} controls className="w-full max-h-72 rounded-md object-contain" />
              ) : (
                <img src={attachmentDataUrl} alt="preview" className="w-full max-h-72 rounded-md object-contain" />
              )}
            </div>
          )}

          <div className="flex flex-wrap items-center gap-2">
            <label className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-[#242526] border border-white/10 text-xs font-semibold cursor-pointer hover:bg-[#2f3031]">
              <ImagePlus className="w-4 h-4" />
              <span>{t.media}</span>
              <input type="file" accept="image/*,video/*" className="hidden" onChange={onPickMedia} />
            </label>

            <button
              type="submit"
              disabled={posting || !caption.trim()}
              className="px-4 py-2 rounded-xl bg-luxury-gold hover:bg-yellow-500 disabled:opacity-60 text-[#101515] text-xs font-black inline-flex items-center gap-2"
            >
              {posting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              <span>{t.post}</span>
            </button>
          </div>
        </form>

        {statusText ? (
          <p className="text-xs text-zinc-300 mt-3" lang={currentLang === 'ku' ? 'ku' : currentLang}>
            {statusText}
          </p>
        ) : null}
        {postActionStatus ? (
          <p className="text-xs text-emerald-300 mt-2" lang={currentLang === 'ku' ? 'ku' : currentLang}>
            {postActionStatus}
          </p>
        ) : null}
      </section>

      <section className="bg-white border border-zinc-200 rounded-2xl p-3 shadow-sm space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-black text-zinc-600 px-2">{selectedGov === 'all' ? t.allGovs : getGovName(selectedGov, currentLang)}</span>
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 rounded-full text-[11px] font-black border transition ${selectedCategory === 'all' ? 'bg-[#0F2E2F] text-white border-[#0F2E2F]' : 'bg-zinc-50 text-zinc-700 border-zinc-200 hover:border-luxury-gold'}`}
          >
            {t.allCategories}
          </button>
          {categoriesInFeed.map((categoryId) => {
            const meta = getCategoryMeta(categoryId, currentLang);
            return (
              <button
                key={categoryId}
                onClick={() => setSelectedCategory(categoryId)}
                className={`px-3 py-1.5 rounded-full text-[11px] font-bold border transition ${selectedCategory === categoryId ? 'bg-luxury-gold text-[#101515] border-luxury-gold' : 'bg-zinc-50 text-zinc-700 border-zinc-200 hover:border-luxury-gold'}`}
              >
                {meta.icon} {meta.name}
              </button>
            );
          })}
        </div>
      </section>

      <section className="space-y-4">
        {visiblePosts.length === 0 ? (
          <div className="bg-white border border-zinc-200 rounded-2xl p-5 text-sm text-zinc-300 text-center">
            {t.empty}
          </div>
        ) : (
          visiblePosts.map((post) => {
            const category = getCategoryMeta(post.category, currentLang);
            const captionDisplay = getCaptionDisplay(post, currentLang);
            const captionText = captionDisplay.mainText;
            const badge = getLocalized(post.promotionBadge, currentLang);
            const contactText = String(post.authorEmail || '').trim();
            const isPhone = /^\+?\d[\d\s()-]{6,}$/.test(contactText);
            return (
              <article key={post.id} className="bg-[#170b10] border border-red-400/25 rounded-[1.8rem] shadow-[0_0_0_1px_rgba(251,113,133,0.12),0_0_28px_rgba(244,63,94,0.16)] overflow-hidden hover:shadow-[0_0_42px_rgba(244,63,94,0.24)] transition-shadow text-white">
                <div className="p-4 flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={post.businessAvatar || FALLBACK_AVATAR}
                      alt={post.businessName}
                      className="w-11 h-11 rounded-full object-cover border border-zinc-200"
                      referrerPolicy="no-referrer"
                      onError={(event) => {
                        event.currentTarget.src = FALLBACK_AVATAR;
                      }}
                    />
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5 min-w-0">
                        <p className="text-sm md:text-base font-black text-white truncate">{post.businessName}</p>
                        {badge ? <CheckCircle2 className="w-4 h-4 text-luxury-teal shrink-0" /> : null}
                      </div>
                      <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-zinc-300 mt-0.5">
                        <span>{post.timeAgo[currentLang]}</span>
                        <span>•</span>
                        <span>{category.icon} {category.name}</span>
                        <span>•</span>
                        <span><MapPin className="w-3 h-3 inline" /> {getGovName(post.governorate, currentLang)}</span>
                      </div>
                    </div>
                  </div>
                  {isAdmin ? (
                    <div className="shrink-0 flex flex-col gap-1">
                      <button
                        type="button"
                        onClick={() => startEditPost(post)}
                        className="inline-flex items-center gap-1 rounded-xl border border-blue-200 bg-blue-50 px-2.5 py-1 text-[10px] font-black text-blue-700 hover:bg-blue-100"
                      >
                        <Edit3 className="w-3 h-3" /> {t.edit}
                      </button>
                      <button
                        type="button"
                        onClick={() => deletePost(post)}
                        className="inline-flex items-center gap-1 rounded-xl border border-red-200 bg-red-50 px-2.5 py-1 text-[10px] font-black text-red-700 hover:bg-red-100"
                      >
                        <Trash2 className="w-3 h-3" /> {t.delete}
                      </button>
                    </div>
                  ) : null}

                  {badge ? (
                    <span className="shrink-0 text-[10px] font-black px-2.5 py-1 rounded-full bg-luxury-gold/15 text-[#7a5b00] border border-luxury-gold/30">
                      {badge}
                    </span>
                  ) : null}
                </div>

                <div className="px-4 pb-3">
                  {editingPostId === post.id ? (
                    <div className="space-y-2">
                      <textarea
                        value={editCaption}
                        onChange={(event) => setEditCaption(event.target.value)}
                        rows={4}
                        className="w-full rounded-2xl border border-luxury-gold/40 bg-white p-3 text-sm font-bold text-white outline-none focus:border-luxury-gold"
                        lang={currentLang === 'ku' ? 'ku' : currentLang}
                        dir={isRtl ? 'rtl' : 'ltr'}
                      />
                      <div className="flex flex-wrap gap-2">
                        <button
                          type="button"
                          onClick={() => saveEditedPost(post)}
                          className="inline-flex items-center gap-1 rounded-xl bg-emerald-600 px-3 py-2 text-xs font-black text-white"
                        >
                          <Save className="w-3.5 h-3.5" /> {t.save}
                        </button>
                        <button
                          type="button"
                          onClick={cancelEditPost}
                          className="inline-flex items-center gap-1 rounded-xl bg-zinc-200 px-3 py-2 text-xs font-black text-zinc-800"
                        >
                          <X className="w-3.5 h-3.5" /> {t.cancel}
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <p
                        className="text-[15px] text-zinc-100 leading-7 whitespace-pre-line"
                        lang={captionDisplay.mainLang === 'ku' ? 'ku' : captionDisplay.mainLang}
                        dir={captionDisplay.mainLang === 'en' ? 'ltr' : 'rtl'}
                      >
                        {captionText}
                      </p>

                      {captionDisplay.translationText ? (
                        <div
                          className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2"
                          lang={captionDisplay.translationLang === 'ku' ? 'ku' : captionDisplay.translationLang}
                          dir={captionDisplay.translationLang === 'en' ? 'ltr' : 'rtl'}
                        >
                          <div className="text-[10px] font-black uppercase tracking-wide text-zinc-400 mb-1">
                            {captionDisplay.translationLabel}
                          </div>
                          <p className="text-[13px] leading-6 text-zinc-300 whitespace-pre-line">
                            {captionDisplay.translationText}
                          </p>
                        </div>
                      ) : null}
                    </div>
                  )}
                  <div className="flex flex-wrap gap-2 mt-3">
                    <span className="text-[11px] font-bold text-luxury-teal bg-luxury-teal/10 rounded-full px-2 py-1">#شكو_ماكو</span>
                    <span className="text-[11px] font-bold text-luxury-teal bg-luxury-teal/10 rounded-full px-2 py-1">#{category.name.replace(/\s+/g, '_')}</span>
                    <span className="text-[11px] font-bold text-luxury-teal bg-luxury-teal/10 rounded-full px-2 py-1">#{getGovName(post.governorate, currentLang).replace(/\s+/g, '_')}</span>
                  </div>
                </div>

                {post.videoUrl ? (
                  <div className="w-full aspect-square overflow-hidden bg-black border-y border-red-400/20">
                    <video src={post.videoUrl} controls className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <div className="w-full aspect-square overflow-hidden bg-black border-y border-red-400/20">
                    <img
                      src={post.mediaUrl || FALLBACK_MEDIA}
                      alt="post media"
                      className="w-full h-full object-cover"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      onError={(event) => {
                        event.currentTarget.src = FALLBACK_MEDIA;
                      }}
                    />
                  </div>
                )}

                <div className="p-4">
                  <div className="flex items-center justify-between text-[12px] text-zinc-300 border-b border-red-400/15 pb-3">
                    <span className="inline-flex items-center gap-1.5">
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-red-500 text-white"><Heart className="w-3.5 h-3.5 fill-current" /></span>
                      {compactNumber(post.likes)} {t.likes}
                    </span>
                    <span>{compactNumber(post.commentsCount)} {t.comments} · {compactNumber(post.shares)} {t.shares} · {compactNumber(post.views || 0)} {t.views}</span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 py-2 border-b border-red-400/15">
                    <button className="py-2 rounded-xl hover:bg-zinc-50 text-zinc-700 text-xs font-black inline-flex items-center justify-center gap-1.5">
                      <Heart className="w-4 h-4" /> {t.likes}
                    </button>
                    <button className="py-2 rounded-xl hover:bg-zinc-50 text-zinc-700 text-xs font-black inline-flex items-center justify-center gap-1.5">
                      <MessageCircle className="w-4 h-4" /> {t.comments}
                    </button>
                    <button className="py-2 rounded-xl hover:bg-zinc-50 text-zinc-700 text-xs font-black inline-flex items-center justify-center gap-1.5">
                      <Share2 className="w-4 h-4" /> {t.shares}
                    </button>
                  </div>

                  {contactText ? (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {isPhone ? (
                        <a href={`tel:${contactText.replace(/\s+/g, '')}`} className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#0F2E2F] text-white text-xs font-black">
                          <Phone className="w-4 h-4" /> {t.phone}
                        </a>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-zinc-100 text-zinc-700 text-xs font-bold">
                          <MapPin className="w-4 h-4" /> {t.address}: {contactText}
                        </span>
                      )}
                    </div>
                  ) : null}

                  {post.comments?.length ? (
                    <div className="mt-3 space-y-2">
                      {post.comments.slice(0, 3).map((comment) => (
                        <div key={comment.id} className="rounded-2xl px-3 py-2 text-xs bg-zinc-50 border border-red-400/15 text-zinc-800">
                          <span className="font-black me-1 text-white">@{comment.username}</span>
                          <span>{comment.text}</span>
                        </div>
                      ))}
                    </div>
                  ) : null}
                </div>
              </article>
            );
          })
        )}
      </section>

      {visibleCount < filteredPosts.length ? (
        <div className="text-center">
          <button
            onClick={() => setVisibleCount((count) => count + 12)}
            className="px-5 py-3 rounded-2xl bg-[#0F2E2F] text-white text-sm font-black shadow-lg hover:bg-[#123a3c] inline-flex items-center gap-2"
          >
            <Eye className="w-4 h-4" />
            {t.showMore}
          </button>
        </div>
      ) : filteredPosts.length > 0 ? (
        <div className="text-center text-xs text-zinc-300 py-2">{t.empty}</div>
      ) : null}
    </div>
  );
}
