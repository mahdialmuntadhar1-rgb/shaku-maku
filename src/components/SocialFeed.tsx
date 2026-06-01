import React, { useEffect, useMemo, useState } from 'react';
import { ImagePlus, Loader2 } from 'lucide-react';
import { API_BASE_URL, getApiErrorMessage, postsApi } from '../api';
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
    empty: 'No posts from backend yet.',
    backendOn: 'Backend Connected',
    backendOff: 'Backend Offline',
    failed: 'Post failed',
    published: 'Post created',
  },
  ar: {
    composerTitle: 'إنشاء منشور',
    placeholder: 'ماذا تريد أن تشارك؟',
    post: 'نشر',
    media: 'رفع صورة أو فيديو',
    signIn: 'يرجى تسجيل الدخول لإنشاء منشور.',
    empty: 'لا توجد منشورات من الخادم حتى الآن.',
    backendOn: 'الخادم متصل',
    backendOff: 'الخادم غير متصل',
    failed: 'فشل إنشاء المنشور',
    published: 'تم إنشاء المنشور',
  },
  ku: {
    composerTitle: 'دروستکردنی بابەت',
    placeholder: 'چی دەتەوێت هاوبەش بکەیت؟',
    post: 'بڵاوکردنەوە',
    media: 'بارکردنی وێنە یان ڤیدیۆ',
    signIn: 'تکایە بچۆ ژوورەوە بۆ دروستکردنی بابەت.',
    empty: 'هێشتا هیچ بابەتێک لە باکەندەوە نییە.',
    backendOn: 'باکەند پەیوەستە',
    backendOff: 'باکەند ناچالاکە',
    failed: 'دروستکردنی بابەت سەرکەوتوو نەبوو',
    published: 'بابەتەکە دروستکرا',
  }
} as const;

const FALLBACK_AVATAR =
  'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&h=120&fit=crop&q=80';

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

  useEffect(() => {
    let cancelled = false;
    const probe = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/health`);
        if (!cancelled) setApiConnected(response.ok);
      } catch {
        if (!cancelled) setApiConnected(false);
      }
    };
    probe();
    return () => {
      cancelled = true;
    };
  }, []);

  const filteredPosts = useMemo(() => {
    if (selectedGov === 'all') return posts;
    return posts.filter((post) => post.governorate === selectedGov);
  }, [posts, selectedGov]);

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
    <div className="w-full max-w-3xl mx-auto space-y-4" dir={isRtl ? 'rtl' : 'ltr'}>
      <section className="bg-[#18191a] border border-white/10 rounded-xl p-4 text-white">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-bold">{t.composerTitle}</h2>
          <span className={`text-[10px] px-2 py-1 rounded-full ${apiConnected ? 'bg-emerald-500/20 text-emerald-300' : 'bg-red-500/20 text-red-300'}`}>
            {apiConnected ? t.backendOn : t.backendOff}
          </span>
        </div>

        <form onSubmit={onCreatePost} className="space-y-3">
          <textarea
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder={t.placeholder}
            rows={4}
            lang={currentLang === 'ku' ? 'ku' : currentLang}
            className="w-full rounded-lg bg-[#242526] border border-white/10 p-3 text-sm text-white placeholder-zinc-400 outline-none focus:border-luxury-gold resize-none"
            required
          />

          {attachmentDataUrl && (
            <div className="rounded-lg border border-white/10 p-2 bg-black/20">
              {attachmentKind === 'video' ? (
                <video src={attachmentDataUrl} controls className="w-full max-h-72 rounded-md object-contain" />
              ) : (
                <img src={attachmentDataUrl} alt="preview" className="w-full max-h-72 rounded-md object-contain" />
              )}
            </div>
          )}

          <div className="flex flex-wrap items-center gap-2">
            <label className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-[#242526] border border-white/10 text-xs font-semibold cursor-pointer hover:bg-[#2f3031]">
              <ImagePlus className="w-4 h-4" />
              <span>{t.media}</span>
              <input type="file" accept="image/*,video/*" className="hidden" onChange={onPickMedia} />
            </label>

            <button
              type="submit"
              disabled={posting || !caption.trim()}
              className="px-4 py-2 rounded-lg bg-[#1877f2] hover:bg-[#166fe5] disabled:opacity-60 text-xs font-bold inline-flex items-center gap-2"
            >
              {posting ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
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

      <section className="space-y-3">
        {filteredPosts.length === 0 ? (
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-xs text-zinc-300">
            {t.empty}
          </div>
        ) : (
          filteredPosts.map((post) => (
            <article key={post.id} className="bg-white/5 border border-white/10 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-3">
                <img
                  src={post.businessAvatar || FALLBACK_AVATAR}
                  alt={post.businessName}
                  className="w-9 h-9 rounded-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <p className="text-sm font-semibold text-white">{post.businessName}</p>
                  <p className="text-[11px] text-zinc-400">{post.timeAgo[currentLang]}</p>
                </div>
              </div>

              <p className="text-sm text-zinc-200 leading-relaxed mb-3" lang={currentLang === 'ku' ? 'ku' : currentLang}>
                {post.caption[currentLang] || post.caption.en || post.caption.ar}
              </p>

              {post.videoUrl ? (
                <video src={post.videoUrl} controls className="w-full max-h-96 rounded-lg object-contain bg-black/30" />
              ) : post.mediaUrl ? (
                <img src={post.mediaUrl} alt="post media" className="w-full max-h-96 rounded-lg object-contain bg-black/20" />
              ) : null}

              {post.comments?.length ? (
                <div className="mt-3 space-y-2">
                  {post.comments.slice(0, 3).map((comment, index) => (
                    <div
                      key={comment.id}
                      className={`rounded-lg px-3 py-2 text-xs border ${
                        index % 2 === 0
                          ? 'bg-[#0f2e2f]/40 border-[#2aa198]/40 text-emerald-100'
                          : 'bg-[#3b2a12]/35 border-[#c8a95f]/40 text-amber-100'
                      }`}
                    >
                      <span className="font-bold me-1">@{comment.username}</span>
                      <span>{comment.text}</span>
                    </div>
                  ))}
                </div>
              ) : null}
            </article>
          ))
        )}
      </section>
    </div>
  );
}
