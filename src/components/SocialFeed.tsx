import React, { useMemo, useState } from 'react';
import { CheckCircle2, Edit3, Heart, ImagePlus, Loader2, MapPin, MessageCircle, Repeat2, Save, Send, Share2, Trash2, X } from 'lucide-react';
import { getApiErrorMessage, postsApi } from '../api';
import { CATEGORIES, GOVERNORATES } from '../data';
import { normalizeGovernorate } from '../utils/taxonomy';
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
    chooseGov: 'Choose governorate',
    govRequired: 'Please choose a governorate before posting.',
    signIn: 'Please sign in to create a post.',
    empty: 'No posts for this governorate yet.',
    feedTitle: 'Chaykhana Social Feed',
    feedSub: 'Local posts by governorate. Choose your city and see what is new.',
    showMore: 'Load more posts',
    likes: 'Likes',
    comments: 'Comments',
    shares: 'Shares',
    views: 'Views',
    edit: 'Edit',
    save: 'Save',
    cancel: 'Cancel',
    delete: 'Delete',
    deleted: 'Post deleted',
    updated: 'Post updated',
    failed: 'Action failed',
    published: 'Post created',
    commentPlaceholder: 'Write a comment...',
    commentSend: 'Comment',
    copied: 'Link copied',
    backendLoaded: 'backend database posts loaded',
    fallbackLoaded: 'fallback posts until backend loads',
  },
  ar: {
    composerTitle: 'إنشاء منشور',
    placeholder: 'ماذا تريد أن تشارك؟',
    post: 'نشر',
    media: 'رفع صورة أو فيديو',
    chooseGov: 'اختر المحافظة',
    govRequired: 'يرجى اختيار المحافظة قبل النشر.',
    signIn: 'يرجى تسجيل الدخول لإنشاء منشور.',
    empty: 'لا توجد منشورات لهذه المحافظة حالياً.',
    feedTitle: 'چايخانة شكو ماكو',
    feedSub: 'منشورات محلية حسب المحافظة. اختر مدينتك وشوف شنو الجديد.',
    showMore: 'تحميل منشورات أكثر',
    likes: 'إعجاب',
    comments: 'تعليق',
    shares: 'مشاركة',
    views: 'مشاهدة',
    edit: 'تعديل',
    save: 'حفظ',
    cancel: 'إلغاء',
    delete: 'حذف',
    deleted: 'تم حذف المنشور',
    updated: 'تم تحديث المنشور',
    failed: 'فشل الإجراء',
    published: 'تم إنشاء المنشور',
    commentPlaceholder: 'اكتب تعليق...',
    commentSend: 'تعليق',
    copied: 'تم نسخ الرابط',
    backendLoaded: 'منشور من قاعدة البيانات',
    fallbackLoaded: 'منشورات احتياطية إلى أن يعمل الخادم',
  },
  ku: {
    composerTitle: 'دروستکردنی بابەت',
    placeholder: 'چی دەتەوێت هاوبەش بکەیت؟',
    post: 'بڵاوکردنەوە',
    media: 'بارکردنی وێنە یان ڤیدیۆ',
    chooseGov: 'پارێزگا هەڵبژێرە',
    govRequired: 'تکایە پێش بڵاوکردنەوە پارێزگا هەڵبژێرە.',
    signIn: 'تکایە بچۆ ژوورەوە بۆ دروستکردنی بابەت.',
    empty: 'هیچ بابەتێک بۆ ئەم پارێزگایە نییە.',
    feedTitle: 'چایخانەی شکو ماکو',
    feedSub: 'پۆستە ناوخۆییەکان بەپێی پارێزگا. شارەکەت هەڵبژێرە و ببینە چی نوێیە.',
    showMore: 'پۆستی زیاتر پیشان بدە',
    likes: 'لایک',
    comments: 'کۆمێنت',
    shares: 'هاوبەشکردن',
    views: 'بینین',
    edit: 'دەستکاری',
    save: 'پاشەکەوت',
    cancel: 'هەڵوەشاندنەوە',
    delete: 'سڕینەوە',
    deleted: 'بابەتەکە سڕایەوە',
    updated: 'بابەتەکە نوێکرایەوە',
    failed: 'کردارەکە سەرکەوتوو نەبوو',
    published: 'بابەتەکە دروستکرا',
    commentPlaceholder: 'کۆمێنت بنووسە...',
    commentSend: 'کۆمێنت',
    copied: 'لینک کۆپی کرا',
    backendLoaded: 'پۆستی داتابەیس بارکرا',
    fallbackLoaded: 'پۆستی جێگرەوە تا باکەند کاردەکات',
  }
} as const;

const VIRTUAL_AVATAR_THEMES = [
  'from-rose-500 to-orange-400',
  'from-amber-500 to-yellow-300',
  'from-emerald-500 to-teal-300',
  'from-cyan-500 to-blue-400',
  'from-violet-500 to-fuchsia-400',
  'from-pink-500 to-rose-300',
  'from-slate-700 to-zinc-500',
  'from-lime-500 to-emerald-300'
];

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

function getCategoryMeta(categoryId: string, lang: Language) {
  const category = CATEGORIES.find((item) => item.id === categoryId);
  return {
    icon: category?.icon || '💬',
    name: category?.name?.[lang] || category?.name?.ar || (categoryId === 'community' ? 'Community' : categoryId),
  };
}

function getGovName(govCode: GovernorateCode | string, lang: Language) {
  const gov = GOVERNORATES.find((item) => item.code === govCode);
  return gov?.name?.[lang] || gov?.name?.ar || govCode;
}

function hashText(value: string): number {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = ((hash << 5) - hash) + value.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function getVirtualAvatar(post: SocialPost, lang: Language) {
  const meta = getCategoryMeta(post.category || 'community', lang);
  const key = String(post.id || post.businessId || post.businessName || post.category || post.governorate);
  const theme = VIRTUAL_AVATAR_THEMES[hashText(key) % VIRTUAL_AVATAR_THEMES.length];
  return { icon: meta.icon || '✨', theme };
}

function mapApiPostToUi(post: any): SocialPost {
  return {
    id: String(post.id),
    businessId: String(post.business_id || ''),
    businessName: post.business_name_ar || post.business_name_en || post.author_name || 'Shaku Maku',
    businessAvatar: post.business_avatar || post.author_avatar || '',
    category: String(post.category || 'community'),
    governorate: normalizeGovernorate(post.governorate || 'all') as GovernorateCode,
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
    status: post.status || 'approved',
    updatedAt: post.updated_at || undefined,
    authorUid: post.author_id || undefined,
    authorEmail: post.author_email || undefined,
  };
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

  const [caption, setCaption] = useState('');
  const [selectedPostGov, setSelectedPostGov] = useState<GovernorateCode | ''>('');
  const [attachmentDataUrl, setAttachmentDataUrl] = useState<string>('');
  const [attachmentKind, setAttachmentKind] = useState<'image' | 'video' | null>(null);
  const [statusText, setStatusText] = useState('');
  const [posting, setPosting] = useState(false);
  const [visibleCount, setVisibleCount] = useState(12);
  const [editingPostId, setEditingPostId] = useState<string | null>(null);
  const [editCaption, setEditCaption] = useState('');
  const [commentsOpen, setCommentsOpen] = useState<Record<string, boolean>>({});
  const [commentsByPost, setCommentsByPost] = useState<Record<string, any[]>>({});
  const [commentDrafts, setCommentDrafts] = useState<Record<string, string>>({});
  const [busyPostId, setBusyPostId] = useState<string | null>(null);

  const userId = String(user?.id || user?.uid || '');
  const userEmail = String(user?.email || '').toLowerCase();
  const isAdmin = userEmail === 'safaribosafar@gmail.com' || user?.role === 'admin';

  const sourcePosts = posts;

  const filteredPosts = useMemo(() => {
    return sourcePosts.filter((post) => {
      return selectedGov === 'all' || normalizeGovernorate(post.governorate) === normalizeGovernorate(selectedGov);
    });
  }, [sourcePosts, selectedGov]);

  const visiblePosts = filteredPosts.slice(0, visibleCount);

  const canManagePost = (post: SocialPost) => {
    const postAuthorId = String(post.authorUid || '');
    const postAuthorEmail = String(post.authorEmail || '').toLowerCase();
    return isAdmin || (!!userId && postAuthorId === userId) || (!!userEmail && postAuthorEmail === userEmail);
  };

  const updatePostLocally = (postId: string, updater: (post: SocialPost) => SocialPost) => {
    setPosts((prev) => prev.map((post) => (post.id === postId ? updater(post) : post)));
  };

  const removePostLocally = (postId: string) => {
    setPosts((prev) => prev.filter((post) => post.id !== postId));
  };

  const onPickMedia = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > 900000) {
      setStatusText(currentLang === 'en' ? 'Media is too large. Please use a smaller image/video.' : currentLang === 'ku' ? 'میدیاکە زۆر گەورەیە. تکایە فایلێکی بچووکتر بەکاربهێنە.' : 'الملف كبير جداً. يرجى استخدام صورة/فيديو أصغر.');
      return;
    }

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

    if (!selectedPostGov) {
      setStatusText(t.govRequired);
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
        governorate: selectedPostGov,
        category: 'community'
      };

      const response = await postsApi.create(payload);
      const created = response?.data ? mapApiPostToUi(response.data) : null;

      if (created) setPosts((prev) => [created, ...prev]);

      setCaption('');
      setSelectedPostGov('');
      setAttachmentDataUrl('');
      setAttachmentKind(null);
      setStatusText(t.published);
    } catch (error) {
      setStatusText(`${t.failed}: ${getApiErrorMessage(error)}`);
    } finally {
      setPosting(false);
    }
  };

  const toggleLike = async (post: SocialPost) => {
    if (!user) {
      onSignIn();
      return;
    }

    const wasLiked = Boolean(post.likedByUser);
    updatePostLocally(post.id, (current) => ({
      ...current,
      likedByUser: !wasLiked,
      likes: Math.max(0, Number(current.likes || 0) + (wasLiked ? -1 : 1))
    }));

    try {
      const result = await postsApi.like(post.id);
      if (typeof result?.liked === 'boolean') {
        updatePostLocally(post.id, (current) => ({
          ...current,
          likedByUser: result.liked
        }));
      }
    } catch (error) {
      updatePostLocally(post.id, (current) => ({
        ...current,
        likedByUser: wasLiked,
        likes: Math.max(0, Number(current.likes || 0) + (wasLiked ? 1 : -1))
      }));
      setStatusText(`${t.failed}: ${getApiErrorMessage(error)}`);
    }
  };

  const toggleComments = async (post: SocialPost) => {
    const willOpen = !commentsOpen[post.id];
    setCommentsOpen((prev) => ({ ...prev, [post.id]: willOpen }));

    if (willOpen && !commentsByPost[post.id]) {
      try {
        const comments = await postsApi.getComments(post.id);
        setCommentsByPost((prev) => ({ ...prev, [post.id]: comments || [] }));
      } catch (error) {
        setStatusText(`${t.failed}: ${getApiErrorMessage(error)}`);
      }
    }
  };

  const submitComment = async (post: SocialPost) => {
    if (!user) {
      onSignIn();
      return;
    }

    const draft = String(commentDrafts[post.id] || '').trim();
    if (!draft) return;

    setBusyPostId(post.id);

    try {
      const response = await postsApi.createComment(post.id, draft);
      const created = response?.data || response;
      setCommentsByPost((prev) => ({
        ...prev,
        [post.id]: [created, ...(prev[post.id] || [])]
      }));
      setCommentDrafts((prev) => ({ ...prev, [post.id]: '' }));
      updatePostLocally(post.id, (current) => ({
        ...current,
        commentsCount: Number(current.commentsCount || 0) + 1
      }));
    } catch (error) {
      setStatusText(`${t.failed}: ${getApiErrorMessage(error)}`);
    } finally {
      setBusyPostId(null);
    }
  };

  const sharePost = async (post: SocialPost) => {
    const url = `${window.location.origin}/?post=${encodeURIComponent(post.id)}`;
    const title = post.businessName || 'Shaku Maku';

    try {
      if (navigator.share) {
        await navigator.share({ title, text: getLocalized(post.caption, currentLang), url });
      } else {
        await navigator.clipboard.writeText(url);
        setStatusText(t.copied);
      }
    } catch {}

    updatePostLocally(post.id, (current) => ({
      ...current,
      shares: Number(current.shares || 0) + 1
    }));

    try {
      await postsApi.share(post.id);
    } catch {}
  };

  const startEditPost = (post: SocialPost) => {
    setEditingPostId(post.id);
    setEditCaption(getLocalized(post.caption, currentLang));
    setStatusText('');
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
      setStatusText(t.updated);
    } catch (error) {
      setStatusText(`${t.failed}: ${getApiErrorMessage(error)}`);
    } finally {
      setEditingPostId(null);
      setEditCaption('');
    }
  };

  const deletePost = async (post: SocialPost) => {
    const ok = window.confirm(currentLang === 'en' ? 'Delete this post?' : currentLang === 'ku' ? 'ئەم بابەتە بسڕدرێتەوە؟' : 'هل تريد حذف هذا المنشور؟');
    if (!ok) return;

    const backup = posts;
    removePostLocally(post.id);

    try {
      await postsApi.delete(post.id);
      setStatusText(t.deleted);
    } catch (error) {
      setPosts(backup);
      setStatusText(`${t.failed}: ${getApiErrorMessage(error)}`);
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
              <span>Chaykhana</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-black leading-tight">{t.feedTitle}</h2>
            <p className="text-sm text-zinc-300 mt-2 max-w-2xl">{t.feedSub}</p>
            <p className="text-[11px] text-zinc-400 mt-2">
              {`${posts.length} ${t.backendLoaded}`}
            </p>
          </div>
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

          <select
            value={selectedPostGov}
            onChange={(event) => setSelectedPostGov(event.target.value as GovernorateCode)}
            required
            dir={isRtl ? 'rtl' : 'ltr'}
            lang={currentLang === 'ku' ? 'ku' : currentLang}
            className="w-full rounded-xl bg-[#242526] border border-white/10 p-3 text-sm font-bold text-white outline-none focus:border-luxury-gold [font-family:Tahoma,Arial,sans-serif]"
          >
            <option value="">{t.chooseGov}</option>
            {GOVERNORATES.filter((gov) => gov.code !== 'all').map((gov) => (
              <option key={gov.code} value={gov.code}>
                {getGovName(gov.code, currentLang)}
              </option>
            ))}
          </select>

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
              <input type="file" accept="image/jpeg,image/png,image/webp" className="hidden" onChange={onPickMedia} />
            </label>

            <button
              type="submit"
              disabled={posting || !caption.trim() || !selectedPostGov}
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
      </section>

      <section className="space-y-4">
        {visiblePosts.length === 0 ? (
          <div className="bg-white border border-zinc-200 rounded-2xl p-5 text-sm text-zinc-500 text-center">
            {t.empty}
          </div>
        ) : (
          visiblePosts.map((post) => {
            const category = getCategoryMeta(post.category || 'community', currentLang);
            const captionText = getLocalized(post.caption, currentLang) || getLocalized(post.caption, 'ar') || getLocalized(post.caption, 'en');
            const avatar = getVirtualAvatar(post, currentLang);
            const comments = commentsByPost[post.id] || [];
            const manage = canManagePost(post);

            return (
              <article key={post.id} className="bg-[#170b10] border border-red-400/25 rounded-[1.8rem] shadow-[0_0_0_1px_rgba(251,113,133,0.12),0_0_28px_rgba(244,63,94,0.16)] overflow-hidden hover:shadow-[0_0_42px_rgba(244,63,94,0.24)] transition-shadow text-white">
                <div className="p-4 flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`w-11 h-11 rounded-full border border-white/20 bg-gradient-to-br ${avatar.theme} flex items-center justify-center text-xl shadow-[0_0_18px_rgba(255,255,255,0.12)] shrink-0`}>
                      <span aria-hidden="true">{avatar.icon}</span>
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5 min-w-0">
                        <p className="text-sm md:text-base font-black text-white truncate">{post.businessName}</p>
                        <CheckCircle2 className="w-4 h-4 text-luxury-teal shrink-0" />
                      </div>
                      <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-zinc-300 mt-0.5">
                        <span>{post.timeAgo?.[currentLang] || ''}</span>
                        <span>•</span>
                        <span>{category.icon} {category.name}</span>
                        <span>•</span>
                        <span><MapPin className="w-3 h-3 inline" /> {getGovName(post.governorate, currentLang)}</span>
                      </div>
                    </div>
                  </div>

                  {manage ? (
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
                </div>

                <div className="px-4 pb-3">
                  {editingPostId === post.id ? (
                    <div className="space-y-2">
                      <textarea
                        value={editCaption}
                        onChange={(event) => setEditCaption(event.target.value)}
                        rows={4}
                        className="w-full rounded-2xl border border-luxury-gold/40 bg-[#242526] p-3 text-sm font-bold text-white outline-none focus:border-luxury-gold"
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
                          onClick={() => {
                            setEditingPostId(null);
                            setEditCaption('');
                          }}
                          className="inline-flex items-center gap-1 rounded-xl bg-zinc-200 px-3 py-2 text-xs font-black text-zinc-800"
                        >
                          <X className="w-3.5 h-3.5" /> {t.cancel}
                        </button>
                      </div>
                    </div>
                  ) : (
                    <p
                      className="text-[15px] text-zinc-100 leading-7 whitespace-pre-line"
                      lang={currentLang === 'ku' ? 'ku' : currentLang}
                      dir={isRtl ? 'rtl' : 'ltr'}
                    >
                      {captionText}
                    </p>
                  )}
                </div>

                {post.mediaUrl ? (
                  <div className="bg-black/40">
                    <img src={post.mediaUrl} alt={post.businessName} className="w-full max-h-[520px] object-cover" loading="lazy" />
                  </div>
                ) : null}

                {post.videoUrl ? (
                  <div className="bg-black/40">
                    <video src={post.videoUrl} controls className="w-full max-h-[520px] object-contain" />
                  </div>
                ) : null}

                <div className="px-4 py-3 border-t border-white/10">
                  <div className="flex items-center justify-between text-[12px] text-zinc-300 mb-3">
                    <span>{compactNumber(post.likes)} {t.likes}</span>
                    <span>{compactNumber(post.commentsCount)} {t.comments} · {compactNumber(post.shares)} {t.shares} · {compactNumber(post.views)} {t.views}</span>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => toggleLike(post)}
                      className={`inline-flex items-center justify-center gap-2 rounded-xl border px-3 py-2 text-xs font-black transition ${post.likedByUser ? 'border-rose-300 bg-rose-500/20 text-rose-100' : 'border-white/10 bg-white/5 text-zinc-200 hover:bg-white/10'}`}
                    >
                      <Heart className={`w-4 h-4 ${post.likedByUser ? 'fill-current' : ''}`} /> {t.likes}
                    </button>

                    <button
                      type="button"
                      onClick={() => toggleComments(post)}
                      className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-black text-zinc-200 hover:bg-white/10"
                    >
                      <MessageCircle className="w-4 h-4" /> {t.comments}
                    </button>

                    <button
                      type="button"
                      onClick={() => sharePost(post)}
                      className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-black text-zinc-200 hover:bg-white/10"
                    >
                      <Share2 className="w-4 h-4" /> {t.shares}
                    </button>
                  </div>

                  {commentsOpen[post.id] ? (
                    <div className="mt-3 rounded-2xl border border-white/10 bg-black/20 p-3 space-y-3">
                      <div className="flex gap-2">
                        <input
                          value={commentDrafts[post.id] || ''}
                          onChange={(event) => setCommentDrafts((prev) => ({ ...prev, [post.id]: event.target.value }))}
                          placeholder={t.commentPlaceholder}
                          className="min-w-0 flex-1 rounded-xl border border-white/10 bg-[#242526] px-3 py-2 text-sm text-white outline-none focus:border-luxury-gold"
                          dir={isRtl ? 'rtl' : 'ltr'}
                        />
                        <button
                          type="button"
                          disabled={busyPostId === post.id || !String(commentDrafts[post.id] || '').trim()}
                          onClick={() => submitComment(post)}
                          className="rounded-xl bg-luxury-gold px-3 py-2 text-xs font-black text-[#101515] disabled:opacity-60"
                        >
                          {busyPostId === post.id ? <Loader2 className="w-4 h-4 animate-spin" /> : t.commentSend}
                        </button>
                      </div>

                      <div className="space-y-2">
                        {comments.map((comment) => (
                          <div key={comment.id || `${post.id}-${comment.text}`} className="rounded-xl bg-white/5 p-2 text-sm">
                            <div className="text-[11px] font-black text-luxury-gold">{comment.username || comment.name || 'User'}</div>
                            <div className="text-zinc-100 leading-6" dir={isRtl ? 'rtl' : 'ltr'}>{comment.text}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </div>
              </article>
            );
          })
        )}
      </section>

      {visibleCount < filteredPosts.length ? (
        <div className="flex justify-center">
          <button
            type="button"
            onClick={() => setVisibleCount((count) => count + 12)}
            className="rounded-full bg-[#0F2E2F] px-5 py-2.5 text-xs font-black text-white shadow hover:bg-[#164243]"
          >
            {t.showMore}
          </button>
        </div>
      ) : null}
    </div>
  );
}

