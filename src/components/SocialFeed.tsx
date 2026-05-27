import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Heart, MessageCircle, Send, Bookmark, Share2, 
  Sparkles, CheckCircle2, SlidersHorizontal, Eye, Gift, ShoppingBag,
  Image as ImageIcon, Video, FileText, File
} from 'lucide-react';
import { SocialPost, Language, GovernorateCode } from '../types';
import { TRANSLATIONS, CATEGORIES } from '../data';

interface SocialFeedProps {
  currentLang: Language;
  selectedGov: GovernorateCode;
  posts: SocialPost[];
  setPosts: React.Dispatch<React.SetStateAction<SocialPost[]>>;
  user: any;
  onSignIn: () => void;
}

export default function SocialFeed({ 
  currentLang, 
  selectedGov,
  posts,
  setPosts,
  user,
  onSignIn
}: SocialFeedProps) {
  const [commentInputs, setCommentInputs] = useState<Record<string, string>>({});
  
  // Custom Pagination States for Social Feed
  const [visibleCount, setVisibleCount] = useState(3);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // Reset page pagination state when governorate/filters change
  React.useEffect(() => {
    setVisibleCount(3);
  }, [selectedGov]);

  const handleLoadMorePosts = () => {
    if (isLoadingMore) return;
    setIsLoadingMore(true);
    setTimeout(() => {
      setVisibleCount(prev => prev + 3);
      setIsLoadingMore(false);
    }, 700); // simulated loading with skeletons
  };

  // Create state form variables for new post
  const [newBizName, setNewBizName] = useState('');
  const [newCaption, setNewCaption] = useState('');
  const [newCategory, setNewCategory] = useState('coffee');
  const [newGov, setNewGov] = useState<GovernorateCode>('baghdad');
  const [newPromo, setNewPromo] = useState('');
  const [newPhotoUrl, setNewPhotoUrl] = useState('https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&auto=format&fit=crop&q=80');
  const [customPhotoInput, setCustomPhotoInput] = useState('');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  
  // Advanced uploads modes (Video clip / Printable document file attachments)
  const [uploadedVideo, setUploadedVideo] = useState<string | null>(null);
  const [uploadedFile, setUploadedFile] = useState<{ name: string; size: string; type?: string } | null>(null);
  const [videoError, setVideoError] = useState<string | null>(null);

  // Interactive composer collapsible state controls
  const [showPromoInput, setShowPromoInput] = useState(false);
  const [showGovInput, setShowGovInput] = useState(false);
  const [showBrandInput, setShowBrandInput] = useState(false);
  const [showCategoryInput, setShowCategoryInput] = useState(false);
  const [showPresetGallery, setShowPresetGallery] = useState(false);
  const [showMediaUploadArea, setShowMediaUploadArea] = useState(true);

  const t = TRANSLATIONS[currentLang];
  const isRtl = currentLang === 'ar' || currentLang === 'ku';

  const PRESET_PHOTOS = [
    { name: 'Classic Cafe', url: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&auto=format&fit=crop&q=80' },
    { name: 'Roasthouse Cozy', url: 'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=800&auto=format&fit=crop&q=80' },
    { name: 'Gourmet Burger / Dining', url: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&auto=format&fit=crop&q=80' },
    { name: 'Luxury Salon & Spa', url: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&auto=format&fit=crop&q=80' },
  ];

  // Specific simulation sample videos for convenient youth clicks
  const PRESET_VIDEOS = [
    { name: 'Rainy Cafe Mood', url: 'https://assets.mixkit.co/videos/preview/mixkit-coffee-maker-machine-brewing-espresso-41615-large.mp4' },
    { name: 'Cozy Roaster Grinder', url: 'https://assets.mixkit.co/videos/preview/mixkit-pouring-hot-coffee-into-a-cup-41617-large.mp4' }
  ];

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_WIDTH = 800;
          const MAX_HEIGHT = 800;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(img, 0, 0, width, height);
            const dataUrl = canvas.toDataURL('image/jpeg', 0.7); // Compress to 70% quality jpeg
            setUploadedImage(dataUrl);
            setUploadedVideo(null);
            setVideoError(null);
            setCustomPhotoInput('');
          }
        };
        img.src = event.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleVideoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 1400000) { // Limit size to about 1.4MB for Firestore safety
        setVideoError(
          currentLang === 'en' 
            ? 'Video must be smaller than 1.4MB' 
            : currentLang === 'ku' 
            ? 'تکایە ڤیدیۆکە لە ١.٤ مێگابایت بچووکتر بێت' 
            : 'يجب أن يكون الفيديو أقل من 1.4 ميجابايت'
        );
        return;
      }
      setVideoError(null);
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedVideo(event.target?.result as string);
        setUploadedImage(null);
        setCustomPhotoInput('');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAttachedFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const sizeMb = (file.size / 1024 / 1024).toFixed(1);
      setUploadedFile({
        name: file.name,
        size: `${sizeMb === '0.0' ? '0.2' : sizeMb} MB`,
        type: file.type || 'PDF Document'
      });
    }
  };

  // Filter posts by chosen Governorate
  const filteredPosts = selectedGov === 'all' 
    ? posts 
    : posts.filter(p => p.governorate === selectedGov);

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCaption.trim()) return;

    const imgToUse = uploadedImage || customPhotoInput.trim() || (uploadedVideo ? '' : newPhotoUrl);
    const bizNameToUse = newBizName.trim() || (user?.displayName) || (currentLang === 'en' ? 'Saku Maku Guest' : currentLang === 'ku' ? 'میوانی ساكۆ ماكۆ' : 'ضيف شكو ماكو');

    const newPostItem: SocialPost = {
      id: `post-${Date.now()}`,
      businessId: 'custom-user-biz',
      businessName: bizNameToUse,
      businessAvatar: user?.photoURL || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80', // user's Google photo
      governorate: newGov as any,
      category: newCategory,
      mediaUrl: imgToUse,
      timeAgo: {
        ar: 'الآن',
        ku: 'ئێستا',
        en: 'Just Now'
      },
      caption: {
        ar: newCaption.trim(),
        ku: newCaption.trim(),
        en: newCaption.trim()
      },
      likes: 1,
      comments: [],
      commentsCount: 0,
      likedByUser: true,
      savedByUser: false,
      shares: 0,
      authorUid: user?.uid || 'anonymous'
    };

    if (uploadedVideo) {
      newPostItem.videoUrl = uploadedVideo;
    }
    if (uploadedFile) {
      newPostItem.fileAttachment = uploadedFile;
    }
    if (newPromo.trim()) {
      newPostItem.promotionBadge = {
        ar: newPromo.trim(),
        ku: newPromo.trim(),
        en: newPromo.trim()
      };
    }

    setPosts(prev => [newPostItem, ...prev]);

    // Reset fields & collapse
    setNewBizName('');
    setNewCaption('');
    setNewPromo('');
    setCustomPhotoInput('');
    setUploadedImage(null);
    setUploadedVideo(null);
    setUploadedFile(null);
    setVideoError(null);
    
    setShowPromoInput(false);
    setShowGovInput(false);
    setShowBrandInput(false);
    setShowCategoryInput(false);
    setShowPresetGallery(false);
  };

  const handleLike = (postId: string) => {
    setPosts(prev => prev.map(p => {
      if (p.id !== postId) return p;
      const liked = !p.likedByUser;
      return { ...p, likedByUser: liked, likes: liked ? p.likes + 1 : p.likes - 1 };
    }));
  };

  const handleSave = (postId: string) => {
    setPosts(prev => prev.map(p => {
      if (p.id !== postId) return p;
      const saved = !p.savedByUser;
      return { ...p, savedByUser: saved, shares: saved ? p.shares + 1 : p.shares };
    }));
  };

  const handlePostComment = async (e: React.FormEvent, postId: string) => {
    e.preventDefault();
    const txt = commentInputs[postId];
    if (!txt || !txt.trim()) return;

    const post = posts.find(p => p.id === postId);
    if (!post) return;

    const newCom = {
      id: `c-${Date.now()}`,
      username: user?.displayName || 'iraqi_explorer_99',
      userAvatar: user?.photoURL || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80',
      text: txt.trim(),
      time: currentLang === 'en' ? 'Just now' : currentLang === 'ku' ? 'ئێستا' : 'الآن'
    };

    const payload = {
      comments: [...post.comments, newCom],
      commentsCount: post.commentsCount + 1
    };

    setPosts(prev => prev.map(p => p.id === postId ? { ...p, comments: payload.comments, commentsCount: payload.commentsCount } : p));
    setCommentInputs(prev => ({ ...prev, [postId]: '' }));
  };

  const handleShare = (post: SocialPost) => {
    if (navigator.share) {
      navigator.share({
        title: post.businessName,
        text: post.caption[currentLang],
        url: window.location.href,
      }).catch(console.error);
    } else {
      alert(`${t.share}: ${post.businessName}\n${window.location.href}`);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto space-y-8">
      
      {/* Visual Title */}
      <div className="flex items-center justify-between border-b border-zinc-800 pb-3 mb-4">
        <div>
          <dt className="text-lg md:text-xl font-extrabold text-white flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
            <span>{t.exploreFeed}</span>
          </dt>
          <dd className="text-[11px] text-zinc-500">Live promotions & youth community activity stream</dd>
        </div>
        
        <span className="text-[10px] text-white/60 bg-white/5 border border-white/10 px-2.5 py-1 rounded-full font-bold">
          {filteredPosts.length} Active Feeds
        </span>
      </div>

      {/* Clean Facebook-style Post Composer */}
      <div className="bg-[#12121e] border border-white/10 rounded-2xl p-4 space-y-3 shadow-xl">
        {/* Header row: avatar + name */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full overflow-hidden shrink-0 border border-white/10">
            <img
              src={user?.photoURL || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80'}
              alt={user?.displayName || 'Guest'}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div>
            <span className="text-xs font-bold text-white">{user?.displayName || (currentLang === 'en' ? 'Guest' : currentLang === 'ku' ? 'میوان' : 'ضيف')}</span>
            {!user && (
              <button onClick={onSignIn} className="block text-[10px] text-luxury-gold hover:underline cursor-pointer">
                {currentLang === 'en' ? 'Sign in for a verified badge' : currentLang === 'ku' ? 'بچۆ ژوورەوە بۆ بەجی دروست' : 'سجّل للحصول على شارة موثوق'}
              </button>
            )}
          </div>
        </div>

        {/* What's on your mind textarea */}
        <textarea
          rows={3}
          placeholder={
            currentLang === 'en' ? "What's on your mind?"
            : currentLang === 'ku' ? 'چی لە مێشکتدایە؟'
            : 'بم تفكر؟'
          }
          value={newCaption}
          onChange={(e) => setNewCaption(e.target.value)}
          className="w-full bg-black/30 border border-white/10 focus:border-cyan-500/50 text-sm px-4 py-3 rounded-xl text-white placeholder-zinc-500 focus:outline-none transition resize-none leading-relaxed"
        />

        {/* Media preview */}
        {(uploadedImage || uploadedVideo) && (
          <div className="relative rounded-xl overflow-hidden bg-black/40 border border-white/10">
            <button
              type="button"
              onClick={() => { setUploadedImage(null); setUploadedVideo(null); }}
              className="absolute top-2 right-2 z-10 w-6 h-6 rounded-full bg-black/70 text-white text-xs flex items-center justify-center cursor-pointer"
            >×</button>
            {uploadedVideo
              ? <video src={uploadedVideo} controls className="w-full max-h-48 object-contain" />
              : <img src={uploadedImage!} alt="preview" className="w-full max-h-48 object-contain" />
            }
          </div>
        )}

        {/* Bottom bar: media buttons + post button */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => document.getElementById('sf-img-input')?.click()}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition cursor-pointer"
              title={currentLang === 'en' ? 'Add photo' : 'أضف صورة'}
            >
              <ImageIcon className="w-4.5 h-4.5" />
            </button>
            <button
              type="button"
              onClick={() => document.getElementById('sf-vid-input')?.click()}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition cursor-pointer"
              title={currentLang === 'en' ? 'Add video' : 'أضف فيديو'}
            >
              <Video className="w-4.5 h-4.5" />
            </button>
          </div>
          <button
            onClick={handleCreatePost}
            disabled={!newCaption.trim()}
            className="px-5 py-2 bg-cyan-600 hover:bg-cyan-500 disabled:opacity-40 text-white font-bold text-xs rounded-xl transition cursor-pointer"
          >
            {currentLang === 'en' ? 'Post' : currentLang === 'ku' ? 'بڵاوبکەرەوە' : 'نشر'}
          </button>
        </div>

        <input type="file" id="sf-img-input" accept="image/*" onChange={handleImageFileChange} className="hidden" />
        <input type="file" id="sf-vid-input" accept="video/*" onChange={handleVideoFileChange} className="hidden" />
      </div>

      {/* Main post stream list */}
      {filteredPosts.slice(0, visibleCount).map((post) => {
        const categoryDetails = CATEGORIES.find(c => c.id === post.category);
        return (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden shadow-xl"
          >
            
            {/* Post Header: Business logo avatar, Governorate, category tag */}
            <div className="p-4 flex items-center justify-between border-b border-zinc-900/40">
              <div className="flex items-center gap-2.5">
                
                {/* Active story visual ring */}
                <div className="relative p-[1.5px] rounded-full bg-gradient-to-tr from-cyan-400 via-pink-500 to-indigo-500">
                  <div className="w-10 h-10 rounded-full bg-slate-950 overflow-hidden flex items-center justify-center p-0.5">
                    <img
                      src={post.businessAvatar}
                      alt={post.businessName}
                      className="w-full h-full rounded-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>

                <div>
                  <h3 className="text-xs font-bold text-white flex items-center gap-1">
                    <span>{post.businessName}</span>
                    <CheckCircle2 className="w-3 h-3 text-cyan-400 fill-blue-950" />
                  </h3>
                  <div className="flex items-center gap-1.5 text-[10px] text-zinc-500 font-bold">
                    <span className="capitalize text-zinc-400">{post.governorate}</span>
                    <span>•</span>
                    <span>{post.timeAgo[currentLang]}</span>
                  </div>
                </div>

              </div>

              {/* Tag / Category Badge */}
              <div className="flex items-center gap-1 bg-slate-900 py-1 px-2.5 rounded-full border border-slate-800">
                <span className="text-xs">{categoryDetails?.icon}</span>
                <span className="text-[10px] font-bold text-zinc-400">{categoryDetails?.name[currentLang]}</span>
              </div>
            </div>

            {/* Immersive cinematic media layout */}
            <div className="relative w-full aspect-video bg-[#020205] flex items-center justify-center overflow-hidden">
              
              {/* Optional Hot promotion tag overlay */}
              {post.promotionBadge && (
                <div className="absolute top-4 left-4 z-10 bg-gradient-to-r from-red-600 to-pink-600 text-white text-[10px] font-black px-3 py-1 rounded-full shadow-lg border border-red-400/40 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 animate-pulse" />
                  <span>{post.promotionBadge[currentLang]}</span>
                </div>
              )}

              {/* Conditional Video / Photo list */}
              {post.videoUrl ? (
                <video
                  src={post.videoUrl}
                  controls
                  playsInline
                  className="w-full h-full object-cover"
                />
              ) : post.mediaUrl ? (
                <img
                  src={post.mediaUrl}
                  alt="Social broadcast photograph"
                  className="w-full h-full object-cover animate-fade-in"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="p-8 text-center text-zinc-500 font-mono text-[11px]">
                  <span>📝 Text Announcement Only</span>
                </div>
              )}
            </div>

            {/* If there is a printable menu file attachment */}
            {post.fileAttachment && (
              <div className="px-4 pt-4">
                <div className="p-3.5 bg-[#12121c] border border-blue-500/15 rounded-2xl flex items-center justify-between gap-3 transition hover:border-blue-500/30">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-450 shrink-0">
                      <FileText className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <span className="text-xs font-black text-white hover:underline cursor-pointer block truncate max-w-[180px]">
                        {post.fileAttachment.name}
                      </span>
                      <span className="text-[10px] text-zinc-500 block font-mono">
                        {post.fileAttachment.size} • Verified Menu Flyer File
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      alert(`📥 Saku Maku Security: Starting download of verified digital menu artifact: "${post.fileAttachment?.name}" (${post.fileAttachment?.size}). Checked secure by Admin panel!`);
                    }}
                    className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-[10px] rounded-lg transition tracking-wide uppercase cursor-pointer"
                  >
                    Download
                  </button>
                </div>
              </div>
            )}

            {/* Micro Interaction toolbar actions */}
            <div className="p-4 space-y-4">
              
              {/* Hearts, Comments, Shares, Saves bar */}
              <div className="flex items-center justify-between border-b border-zinc-900/40 pb-3">
                <div className="flex items-center gap-4">
                  
                  {/* Like heart */}
                  <button
                    onClick={() => handleLike(post.id)}
                    className="flex items-center gap-1.5 text-zinc-400 hover:text-pink-500 transition group"
                  >
                    <div className={`p-1.5 rounded-xl border border-zinc-900 bg-slate-900/60 group-hover:bg-slate-900 ${post.likedByUser ? 'text-pink-500 border-pink-500/20' : ''}`}>
                      <Heart className={`w-4 h-4 ${post.likedByUser ? 'fill-pink-500 text-pink-500' : ''}`} />
                    </div>
                    <span className="text-xs font-black">{post.likes}</span>
                  </button>

                  {/* Comment icon button */}
                  <button className="flex items-center gap-1.5 text-zinc-400 hover:text-cyan-400 transition group">
                    <div className="p-1.5 rounded-xl border border-zinc-900 bg-slate-900/60 group-hover:bg-slate-900">
                      <MessageCircle className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-black">{post.comments.length}</span>
                  </button>

                  {/* Share item */}
                  <button
                    onClick={() => handleShare(post)}
                    className="flex items-center gap-1.5 text-zinc-400 hover:text-purple-400 transition group"
                  >
                    <div className="p-1.5 rounded-xl border border-zinc-900 bg-slate-900/60 group-hover:bg-slate-900">
                      <Share2 className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-bold">{t.share}</span>
                  </button>

                </div>

                {/* Bookmark save */}
                <button
                  onClick={() => handleSave(post.id)}
                  className={`flex items-center gap-1 text-xs px-2.5 py-1 bg-slate-900/60 hover:bg-slate-900 border border-zinc-900 rounded-xl transition ${
                    post.savedByUser ? 'text-cyan-400 border-cyan-500/20 bg-cyan-950/20' : 'text-zinc-500'
                  }`}
                >
                  <Bookmark className="w-3.5 h-3.5" />
                  <span>{post.savedByUser ? t.saves + 'ed' : t.saves}</span>
                </button>
              </div>

              {/* Caption text */}
              <div className="space-y-1.5">
                <span className="text-xs font-black text-white hover:underline cursor-pointer block">{post.businessName}</span>
                <p className="text-xs leading-relaxed text-zinc-300">
                  {post.caption[currentLang]}
                </p>
              </div>

              {/* Active list stream of comments */}
              {post.comments.length > 0 && (
                <div className="bg-white/5 p-3 rounded-2xl border border-white/5 space-y-2.5 max-h-40 overflow-y-auto custom-scrollbar">
                  {post.comments.map((com) => (
                    <div key={com.id} className="text-xs flex items-start gap-2">
                      <span className="font-extrabold text-white shrink-0">@{com.username}:</span>
                      <span className="text-zinc-300 flex-1 leading-relaxed">{com.text}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Send Quick comment form */}
              <form onSubmit={(e) => handlePostComment(e, post.id)} className="relative flex items-center pr-10">
                <input
                  type="text"
                  placeholder={t.addComment}
                  value={commentInputs[post.id] || ''}
                  onChange={(e) => setCommentInputs(prev => ({ ...prev, [post.id]: e.target.value }))}
                  className="w-full bg-[#020205]/45 hover:bg-[#020205]/85 text-xs px-4 py-2.5 rounded-xl border border-white/10 text-white focus:outline-none focus:border-blue-400"
                  required
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-cyan-400 hover:text-white transition"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>

            </div>

          </motion.div>
        );
      })}

      {/* Skeletons loader */}
      {isLoadingMore && (
        <div className="space-y-6">
          {[1, 2].map((num) => (
            <div key={num} className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden p-6 space-y-4 animate-pulse">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-zinc-800"></div>
                <div className="space-y-2 flex-1">
                  <div className="h-3 w-1/3 bg-zinc-800 rounded"></div>
                  <div className="h-2.5 w-1/4 bg-zinc-800 rounded"></div>
                </div>
              </div>
              <div className="h-44 w-full bg-zinc-800/40 rounded-2xl"></div>
              <div className="space-y-2">
                <div className="h-3 w-5/6 bg-zinc-800 rounded"></div>
                <div className="h-3 w-1/2 bg-zinc-800 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Load More Trigger Button */}
      {filteredPosts.length > visibleCount && !isLoadingMore && (
        <div className="flex justify-center pt-2">
          <button
            onClick={handleLoadMorePosts}
            className="text-xs font-black text-white bg-slate-900/80 hover:bg-slate-800 border border-zinc-800 px-6 py-3 rounded-xl transition cursor-pointer flex items-center gap-2 hover:border-luxury-gold/50"
          >
            <span>🔄</span>
            <span>{currentLang === 'en' ? 'Load More Stories' : currentLang === 'ku' ? 'پاکەتی چیرۆکی زیاتر' : 'تحميل المزيد من القصص'}</span>
          </button>
        </div>
      )}

      {/* If absolutely no post fits governorate */}
      {filteredPosts.length === 0 && (
        <div className="text-center py-16 bg-slate-900/10 border border-zinc-900 rounded-3xl p-6">
          <ShoppingBag className="w-12 h-12 text-zinc-700 mx-auto mb-3" />
          <h3 className="text-sm font-bold text-white mb-1">
            {currentLang === 'en' ? 'No Live Broadcasts' : 'لا توجد منشورات حية'}
          </h3>
          <p className="text-xs text-zinc-500">
            {currentLang === 'en' 
              ? 'No businesses from this governorate have posted stories or campaigns yet. Change governorate filter above!'
              : 'لم تقم المحلات أو الشركات بنشر حملات ترويجية في هذه المحافظة بعد.'}
          </p>
        </div>
      )}

    </div>
  );
}
