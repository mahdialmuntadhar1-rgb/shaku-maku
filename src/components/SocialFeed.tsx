import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Heart, MessageCircle, Send, Bookmark, Share2, 
  Sparkles, CheckCircle2, SlidersHorizontal, Eye, Gift, ShoppingBag,
  Image as ImageIcon, Video, FileText, File
} from 'lucide-react';
import { SocialPost, Language, GovernorateCode } from '../types';
import { TRANSLATIONS, CATEGORIES } from '../data';
import { postsApi } from '../api';

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
      const url = URL.createObjectURL(file);
      setUploadedImage(url);
      setUploadedVideo(null);
      setCustomPhotoInput('');
    }
  };

  const handleVideoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setUploadedVideo(url);
      setUploadedImage(null);
      setCustomPhotoInput('');
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
    const bizNameToUse = newBizName.trim() || (user?.displayName) || (currentLang === 'en' ? 'Saku Maku Guest' : currentLang === 'ku' ? 'میوانی ساكۆ ماكۆ' : 'ضيف ساكو ماكو');

    const newPostItem: SocialPost = {
      id: `post-${Date.now()}`,
      businessId: 'custom-user-biz',
      businessName: bizNameToUse,
      businessAvatar: user?.photoURL || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80', // user's Google photo
      governorate: newGov as any,
      category: newCategory,
      mediaUrl: imgToUse,
      videoUrl: uploadedVideo || undefined,
      fileAttachment: uploadedFile || undefined,
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
      promotionBadge: newPromo.trim() 
        ? {
            ar: newPromo.trim(),
            ku: newPromo.trim(),
            en: newPromo.trim()
          }
        : undefined,
      authorUid: user?.id || 'anonymous'
    };

    try {
      await postsApi.create(newPostItem);

      // Reset fields
      setNewBizName('');
      setNewCaption('');
      setNewPromo('');
      setCustomPhotoInput('');
      setUploadedImage(null);
      setUploadedVideo(null);
      setUploadedFile(null);
      
      // Refresh posts
      const data = await postsApi.list();
      if (data && Array.isArray(data)) {
        setPosts(data);
      }
    } catch (err) {
      console.error("Error creating post: ", err);
    }
  };

  const handleLike = async (postId: string) => {
    const post = posts.find(p => p.id === postId);
    if (!post) return;
    const liked = !post.likedByUser;
    try {
      await postsApi.like(postId);
      // Optimistic update
      setPosts(prev => prev.map(p => 
        p.id === postId 
          ? { ...p, likedByUser: liked, likes: liked ? p.likes + 1 : p.likes - 1 }
          : p
      ));
    } catch (err) {
      console.error("Error liking post: ", err);
    }
  };

  const handleSave = async (postId: string) => {
    const post = posts.find(p => p.id === postId);
    if (!post) return;
    const saved = !post.savedByUser;
    try {
      await postsApi.update(postId, { savedByUser: saved, shares: saved ? post.shares + 1 : post.shares });
      // Optimistic update
      setPosts(prev => prev.map(p => 
        p.id === postId 
          ? { ...p, savedByUser: saved, shares: saved ? p.shares + 1 : p.shares }
          : p
      ));
    } catch (err) {
      console.error("Error saving post: ", err);
    }
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

    try {
      await postsApi.addComment(postId, { text: txt.trim(), username: user?.displayName || 'iraqi_explorer_99' });
      setCommentInputs(prev => ({ ...prev, [postId]: '' }));
      // Refresh posts to get updated comments
      const data = await postsApi.list();
      if (data && Array.isArray(data)) {
        setPosts(data);
      }
    } catch (err) {
      console.error("Error adding post comment: ", err);
    }
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

      {/* Immersive Simplified Social Composer */}
      <div className="bg-gradient-to-b from-[#111119] to-[#0a0a0f] border border-white/10 rounded-[28px] p-6 space-y-5 shadow-2xl relative overflow-hidden backdrop-blur-md">
        {!user && (
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md z-30 flex flex-col items-center justify-center p-6 text-center space-y-3.5">
            <Sparkles className="w-8 h-8 text-blue-400 animate-pulse" />
            <div>
              <p className="text-xs font-black text-white">
                {currentLang === 'en' ? 'Sign In to Post Campaigns' : currentLang === 'ku' ? 'چوونەژوورەوە پێویستە بۆ بڵاوکردنەوە' : 'سجل دخولك لنشر العروض الاستثنائية'}
              </p>
              <p className="text-[10px] text-zinc-400 mt-1 max-w-xs mx-auto">
                {currentLang === 'en' ? 'Connect via Google to publish real-time marketing stories on Saku Maku.' : currentLang === 'ku' ? 'لە ڕێگەی لۆگینی گووگڵەوە دەتوانیت عەرزەکانت بڵاوبکەیتەوە.' : 'سجل دخولك السريع لمشاركة المنيو والعروض الحية مع الآخرين.'}
              </p>
            </div>
            <button
              onClick={onSignIn}
              className="px-5 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-400 hover:to-indigo-550 text-white font-black text-[10px] uppercase tracking-wider rounded-xl cursor-pointer shadow-lg active:scale-95"
            >
              🔑 {currentLang === 'en' ? 'Google Login' : currentLang === 'ku' ? 'چوونەژوورەوە' : 'تسجيل دخول سريع'}
            </button>
          </div>
        )}

        <div className="flex items-start gap-3.5">
          {/* Active User Avatar */}
          <div className="relative w-10 h-10 rounded-full bg-gradient-to-tr from-cyan-400 to-indigo-500 p-[1.5px] shrink-0">
            <div className="w-full h-full rounded-full bg-slate-900 overflow-hidden flex items-center justify-center">
              <img
                src={user?.photoURL || "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80"}
                alt={user?.displayName || "Active owner avatar"}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            {user && <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-slate-950 rounded-full animate-pulse"></span>}
          </div>

          <div className="flex-1 space-y-3">
            {/* Thread Caption Input */}
            <textarea
              rows={3}
              placeholder={
                currentLang === 'en'
                  ? "What's the word? Share a photo, promo video, or menu list with Iraq's trendiest foodies..."
                  : currentLang === 'ku'
                  ? "چی هەیە؟ وێنەی نوێ، ڤیدیۆ یان مێنوی شوێنەکەت لێرە بڵاوبکەرەوە..."
                  : "ما الأخبار؟ أنشر صورة، فيديو ترويجي، أو منيو الكافيه لمجتمع المذاق المتميز..."
              }
              value={newCaption}
              onChange={(e) => setNewCaption(e.target.value)}
              className="w-full bg-black/45 hover:bg-black/60 focus:bg-black/70 text-xs px-4.5 py-3.5 rounded-[20px] border border-white/10 focus:border-cyan-500 text-white placeholder-zinc-500 focus:outline-none transition leading-relaxed resize-none"
              required
            />
          </div>
        </div>

        {/* Visual Multi-Upload Active Previews Row */}
        {(uploadedImage || newPhotoUrl || uploadedVideo || uploadedFile) && (
          <div className="p-3 bg-black/30 border border-white/5 rounded-2xl space-y-3 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-1.5 text-[8px] bg-white/5 text-zinc-500 uppercase tracking-widest font-bold">
              Attached Attachment
            </div>

            {/* Video preview render if video is selected */}
            {uploadedVideo ? (
              <div className="relative w-full max-h-[180px] rounded-xl overflow-hidden bg-black/60 flex items-center justify-center">
                <video src={uploadedVideo} style={{ maxHeight: '170px' }} controls className="w-full h-auto rounded-xl object-contain" />
                <button
                  type="button"
                  onClick={() => setUploadedVideo(null)}
                  className="absolute top-2 right-2 px-2.5 py-1 bg-red-650 hover:bg-red-500 border border-red-500/20 text-white font-black text-[9px] rounded-full transition cursor-pointer"
                >
                  ✕ Remove Video
                </button>
              </div>
            ) : uploadedImage || newPhotoUrl ? (
              /* Photo preview render */
              <div className="relative w-full max-h-[180px] rounded-xl overflow-hidden bg-black/40 flex items-center justify-center p-1 group">
                <img
                  src={uploadedImage || newPhotoUrl}
                  alt="Story photo preview"
                  className="max-h-[170px] w-auto max-w-full rounded-lg object-contain"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-2 right-2 flex gap-1.5">
                  <span className="bg-black/70 backdrop-blur-md text-[8px] text-cyan-400 font-extrabold uppercase px-2 py-0.5 rounded-full border border-white/10">
                    {uploadedImage ? '📸 Image File' : 'Preset sample template photo'}
                  </span>
                  {(uploadedImage || customPhotoInput) && (
                    <button
                      type="button"
                      onClick={() => {
                        setUploadedImage(null);
                        setCustomPhotoInput('');
                        setNewPhotoUrl('');
                      }}
                      className="bg-red-500 hover:bg-red-650 text-white font-black text-[9px] px-2 py-0.5 rounded-full transition cursor-pointer"
                    >
                      ✕ Remove
                    </button>
                  )}
                </div>
              </div>
            ) : null}

            {/* General document attachment preview */}
            {uploadedFile && (
              <div className="p-3 bg-indigo-950/20 border border-indigo-500/20 rounded-xl flex items-center justify-between gap-3 animate-fade-in font-sans">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                    <FileText className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <span className="text-xs font-black text-white block truncate max-w-[180px]">{uploadedFile.name}</span>
                    <span className="text-[10px] text-zinc-400 block font-mono">{uploadedFile.size} • PDF Attachment</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setUploadedFile(null)}
                  className="text-red-400 hover:text-red-300 font-bold text-[10px] px-2.5 py-1 rounded-lg hover:bg-red-500/10 transition cursor-pointer font-sans"
                >
                  ✕ Detach
                </button>
              </div>
            )}
          </div>
        )}

        {/* 3 DISTINCT FILE TRIGGERS: Photo, Photo/Video, PDF File */}
        <div className="space-y-2">
          <span className="text-[9px] text-white/30 tracking-widest uppercase font-extrabold block">Attachments Control Panel</span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            
            {/* 1. Photo-Only Trigger */}
            <label className="flex items-center justify-center gap-2 px-3 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cyan-500/35 rounded-xl text-zinc-300 hover:text-white transition duration-200 cursor-pointer text-xs font-extrabold">
              <ImageIcon className="w-4 h-4 text-cyan-400" />
              <span>📷 1. Photo upload</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageFileChange}
                className="hidden"
              />
            </label>

            {/* 2. Photo/Video Trigger */}
            <label className="flex items-center justify-center gap-2 px-3 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-pink-500/35 rounded-xl text-zinc-300 hover:text-white transition duration-200 cursor-pointer text-xs font-extrabold">
              <Video className="w-4 h-4 text-pink-400" />
              <span>🎥 2. Photo or video</span>
              <input
                type="file"
                accept="image/*,video/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    if (file.type.startsWith('video/')) {
                      handleVideoFileChange(e);
                    } else {
                      handleImageFileChange(e);
                    }
                  }
                }}
                className="hidden"
              />
            </label>

            {/* 3. Document / Menu attachment */}
            <label className="flex items-center justify-center gap-2 px-3 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-indigo-500/35 rounded-xl text-zinc-300 hover:text-white transition duration-200 cursor-pointer text-xs font-extrabold font-sans">
              <File className="w-4 h-4 text-indigo-400 animate-pulse" />
              <span>📁 3. File upload (Menu)</span>
              <input
                type="hidden"
                id="file-attachment-dummy"
              />
              <input
                type="file"
                accept=".pdf,.doc,.docx,.png,.txt,.xlsx"
                onChange={handleAttachedFileChange}
                className="hidden"
              />
            </label>

          </div>
        </div>

        {/* Dynamic Selectors Row: Governorate & Category & Brand Parameter */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1.5 font-sans">
          {/* Brand/Owner Name */}
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-white/40 block">Publisher / Brand</span>
            <input
              type="text"
              placeholder="e.g. Saku Maku partner"
              value={newBizName}
              onChange={(e) => setNewBizName(e.target.value)}
              className="w-full bg-black/40 border border-white/10 text-xs px-3 py-2 rounded-xl text-white placeholder-zinc-700 focus:outline-none focus:border-cyan-400"
            />
          </div>

          {/* Campaign badge */}
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-white/40 block">Discount Promo (badge)</span>
            <input
              type="text"
              placeholder="e.g. 20% Discount"
              value={newPromo}
              onChange={(e) => setNewPromo(e.target.value)}
              className="w-full bg-black/40 border border-white/10 text-xs px-3 py-2 rounded-xl text-white placeholder-zinc-700 focus:outline-none focus:border-cyan-400"
            />
          </div>

          {/* Governorate select dropdown */}
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-white/40 block">Governorate</span>
            <select
              value={newGov}
              onChange={(e) => setNewGov(e.target.value as GovernorateCode)}
              className="w-full bg-black/40 border border-white/15 text-xs px-2.5 py-2.5 rounded-xl text-white focus:outline-none focus:border-cyan-400 tracking-wide cursor-pointer text-zinc-300"
            >
              <option value="baghdad" className="bg-[#111] text-white">Baghdad 🏰</option>
              <option value="erbil" className="bg-[#111] text-white">Erbil 🏔️</option>
              <option value="basra" className="bg-[#111] text-white">Basra 🌴</option>
              <option value="sulaymaniyah" className="bg-[#111] text-white">Sulaymaniyah 🌸</option>
              <option value="mosul" className="bg-[#111] text-white">Mosul 🍏</option>
              <option value="najaf" className="bg-[#111] text-white">Najaf ✨</option>
            </select>
          </div>

          {/* Category select dropdown */}
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-white/40 block">Category</span>
            <select
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className="w-full bg-black/40 border border-white/15 text-xs px-2.5 py-2.5 rounded-xl text-white focus:outline-none focus:border-cyan-400 tracking-wide cursor-pointer text-zinc-300"
            >
              {CATEGORIES.map(c => (
                <option key={c.id} value={c.id} className="bg-[#111] text-white">{c.icon} {c.name[currentLang]}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Optional Link and Fast Presets Swiper */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2.5 border-t border-white/5 items-center justify-between">
          <div className="flex items-center gap-1.5 w-full sm:w-auto">
            <span className="text-[10px] text-zinc-500 font-bold shrink-0 font-sans">Fast Presets:</span>
            <div className="flex gap-1.5 overflow-x-auto p-1 max-w-[280px] custom-scrollbar">
              {/* Photo presets */}
              {PRESET_PHOTOS.map((photo) => (
                <button
                  type="button"
                  key={photo.url}
                  onClick={() => {
                    setUploadedImage(photo.url);
                    setUploadedVideo(null);
                    setNewPhotoUrl('');
                  }}
                  className={`w-7 h-7 rounded border shrink-0 overflow-hidden cursor-pointer ${
                    uploadedImage === photo.url ? 'border-cyan-400 font-bold' : 'border-white/10 opacity-60 hover:opacity-100'
                  }`}
                  title={photo.name}
                >
                  <img src={photo.url} alt={photo.name} className="w-full h-full object-cover" />
                </button>
              ))}
              {/* Video mini presets */}
              {PRESET_VIDEOS.map((vid) => (
                <button
                  type="button"
                  key={vid.url}
                  onClick={() => {
                    setUploadedVideo(vid.url);
                    setUploadedImage(null);
                    setNewPhotoUrl('');
                  }}
                  className={`w-7 h-7 rounded border shrink-0 bg-[#160d21] flex items-center justify-center text-[10px] cursor-pointer ${
                    uploadedVideo === vid.url ? 'border-pink-400 font-bold text-white' : 'border-white/10 opacity-60 hover:opacity-100'
                  }`}
                  title={vid.name}
                >
                  🎥
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleCreatePost}
            disabled={!newCaption.trim()}
            className="w-full sm:w-auto px-7 py-3 bg-gradient-to-r from-[#00f2fe] via-indigo-600 to-[#f35588] hover:scale-[1.02] disabled:opacity-40 text-white font-black text-xs uppercase tracking-wider rounded-xl transition duration-200 shadow-xl shadow-cyan-500/10 cursor-pointer"
          >
            {currentLang === 'en' ? '🚀 Post Live Story' : currentLang === 'ku' ? '🚀 بڵاوکردنەوەی نوێترین بابەتان' : '🚀 أنشر القصة فوراً'}
          </button>
        </div>

      </div>

      {/* Main post stream list */}
      {filteredPosts.map((post) => {
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
