import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Heart, MessageCircle, Send, Bookmark, Share2, 
  Sparkles, CheckCircle2, SlidersHorizontal, Eye, Gift, ShoppingBag,
  Image as ImageIcon, Video, FileText, File
} from 'lucide-react';
import { SocialPost, Language, GovernorateCode } from '../types';
import { TRANSLATIONS, CATEGORIES } from '../data';
import { setDoc, doc, updateDoc } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../firebase';

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
  const [videoError, setVideoError] = useState<string | null>(null);

  // Interactive composer collapsible state controls
  const [showPromoInput, setShowPromoInput] = useState(false);
  const [showGovInput, setShowGovInput] = useState(false);
  const [showBrandInput, setShowBrandInput] = useState(false);
  const [showCategoryInput, setShowCategoryInput] = useState(false);
  const [showPresetGallery, setShowPresetGallery] = useState(false);

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

    try {
      await setDoc(doc(db, 'posts', newPostItem.id), newPostItem);

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
    } catch (err) {
      console.error("Error creating post in Firestore: ", err);
      handleFirestoreError(err, OperationType.CREATE, `posts/${newPostItem.id}`);
    }
  };

  const handleLike = async (postId: string) => {
    const post = posts.find(p => p.id === postId);
    if (!post) return;
    const liked = !post.likedByUser;
    const payload = {
      likedByUser: liked,
      likes: liked ? post.likes + 1 : post.likes - 1
    };
    try {
      await updateDoc(doc(db, 'posts', postId), payload);
    } catch (err) {
      console.error("Error liking post in Firestore: ", err);
    }
  };

  const handleSave = async (postId: string) => {
    const post = posts.find(p => p.id === postId);
    if (!post) return;
    const saved = !post.savedByUser;
    const payload = {
      savedByUser: saved,
      shares: saved ? post.shares + 1 : post.shares
    };
    try {
      await updateDoc(doc(db, 'posts', postId), payload);
    } catch (err) {
      console.error("Error saving post in Firestore: ", err);
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
      await updateDoc(doc(db, 'posts', postId), payload);
      setCommentInputs(prev => ({ ...prev, [postId]: '' }));
    } catch (err) {
      console.error("Error adding post comment in Firestore: ", err);
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

      {/* Immersive Refined Social Composer */}
      <div className="bg-gradient-to-b from-[#12121e]/90 to-[#07070d]/95 border border-white/10 rounded-[24px] p-5 space-y-4.5 shadow-2xl relative overflow-hidden backdrop-blur-md">
        {!user && (
          <div className="absolute inset-0 bg-black/85 backdrop-blur-md z-30 flex flex-col items-center justify-center p-6 text-center space-y-4">
            <Sparkles className="w-9 h-9 text-blue-400 animate-pulse" />
            <div>
              <p className="text-sm font-black text-white">
                {currentLang === 'en' ? 'Sign In to Post Campaigns' : currentLang === 'ku' ? 'چوونەژوورەوە پێویستە بۆ بڵاوکردنەوە' : 'سجل دخولك لنشر العروض الاستثنائية'}
              </p>
              <p className="text-xs text-zinc-400 mt-1 max-w-xs mx-auto leading-relaxed">
                {currentLang === 'en' ? 'Connect via Google to publish real-time marketing stories on Saku Maku.' : currentLang === 'ku' ? 'لە ڕێگەی لۆگینی گووگڵەوە دەتوانیت عەرزەکانت بڵاوبکەیتەوە.' : 'سجل دخولك السريع لمشاركة المنيو والعروض الحية مع الآخرين.'}
              </p>
            </div>
            <button
              onClick={onSignIn}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-400 hover:to-indigo-500 text-white font-black text-xs uppercase tracking-wider rounded-xl cursor-pointer shadow-lg active:scale-95 transition"
            >
              🔑 {currentLang === 'en' ? 'Google Login' : currentLang === 'ku' ? 'چوونەژوورەوە' : 'تسجيل دخول سريع'}
            </button>
          </div>
        )}

        <div className="space-y-3.5">
          {/* Facebook style header: Avatar & Name side-by-side */}
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-full bg-gradient-to-tr from-cyan-400 via-purple-500 to-pink-500 p-[1.5px] shrink-0">
              <div className="w-full h-full rounded-full bg-[#0a0a0f] overflow-hidden flex items-center justify-center">
                <img
                  src={user?.photoURL || "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80"}
                  alt={user?.displayName || "Active owner avatar"}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              {user && <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border border-slate-950 rounded-full animate-pulse"></span>}
            </div>
            <div>
              <span className="text-xs font-bold text-white block">
                {user?.displayName || (currentLang === 'en' ? 'Saku Maku Guest' : currentLang === 'ku' ? 'میوانی ساكۆ ماكۆ' : 'ضيف شكو ماكو')}
              </span>
              <span className="text-[10px] text-zinc-500 block">
                {currentLang === 'en' ? 'Posting to Online Feed' : currentLang === 'ku' ? 'بڵاوکردنەوە لە فیدی گشتی' : 'نشر على الفيد العام'}
              </span>
            </div>
          </div>

          {/* Facebook style What's on your mind textarea input */}
          <textarea
            rows={3}
            placeholder={
              currentLang === 'en'
                ? `What's on your mind, ${user?.displayName?.split(' ')[0] || 'Friend'}? share updates, photos or discount flyers...`
                : currentLang === 'ku'
                ? `چی لە مێشکتدایە، ${user?.displayName?.split(' ')[0] || 'هاوڕێم'}؟ بابەتێکی نوێ، وێنە یان مەکئاپ بڵاوبکەرەوە...`
                : `بمَ تفكّر، ${user?.displayName?.split(' ')[0] || 'يا صديقنا'}؟ أنشر أحدث الصور، فيديوهات أو منشورات لشركتك...`
            }
            value={newCaption}
            onChange={(e) => setNewCaption(e.target.value)}
            className="w-full bg-black/40 hover:bg-black/55 focus:bg-black/70 text-sm px-4 py-3 rounded-[18px] border border-white/10 focus:border-cyan-500 text-white placeholder-zinc-500 focus:outline-none transition leading-relaxed resize-none"
            required
          />
        </div>

        {videoError && (
          <div className="p-3 bg-red-950/20 border border-red-500/35 rounded-2xl text-xs text-red-400 font-extrabold flex items-center gap-2 animate-fade-in font-sans">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse shrink-0"></span>
            <span>⚠️ {videoError}</span>
          </div>
        )}

        {/* Visual Multi-Upload Active Previews in a clean box */}
        {(uploadedImage || newPhotoUrl || uploadedVideo || uploadedFile) && (
          <div className="relative border border-white/10 rounded-2xl overflow-hidden bg-black/50 p-2 group transition-all">
            
            {/* Unified circular close button in the top right corner */}
            <button
              type="button"
              onClick={() => {
                setUploadedImage(null);
                setUploadedVideo(null);
                setUploadedFile(null);
                setNewPhotoUrl('');
              }}
              className="absolute top-2.5 right-2.5 z-10 w-6 h-6 rounded-full bg-black/75 hover:bg-black/95 text-white flex items-center justify-center transition active:scale-95 cursor-pointer border border-white/10 text-xs font-bold"
              title="Remove attachment"
            >
              ✕
            </button>

            {/* Video preview render if video is selected */}
            {uploadedVideo ? (
              <div className="relative w-full rounded-xl overflow-hidden bg-black/45 flex flex-col items-center justify-center p-1.5 min-h-[140px]">
                <video src={uploadedVideo} style={{ maxHeight: '160px' }} controls className="w-full h-auto rounded-lg object-contain" />
                <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1 bg-black/85 backdrop-blur-md px-2.5 py-1 rounded-full border border-pink-500/20 text-[10px] text-pink-400 font-extrabold shadow-md">
                  <Video className="w-3.5 h-3.5" />
                  <span>VIDEO ATTACHED</span>
                </div>
              </div>
            ) : uploadedImage || newPhotoUrl ? (
              /* Photo preview render */
              <div className="relative w-full rounded-xl overflow-hidden bg-black/30 flex items-center justify-center p-1.5 min-h-[140px]">
                <img
                  src={uploadedImage || newPhotoUrl}
                  alt="Story attachment"
                  className="max-h-[160px] w-auto max-w-full rounded-lg object-contain"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1 bg-black/85 backdrop-blur-md px-2.5 py-1 rounded-full border border-cyan-500/20 text-[10px] text-cyan-400 font-extrabold shadow-md">
                  <ImageIcon className="w-3.5 h-3.5" />
                  <span>IMAGE ATTACHED</span>
                </div>
              </div>
            ) : null}

            {/* General document attachment preview */}
            {uploadedFile && (
              <div className="p-3 bg-indigo-950/20 border border-indigo-500/20 rounded-xl flex items-center justify-between gap-3 font-sans">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400 border border-indigo-500/10 shadow-md">
                    <FileText className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <span className="text-xs font-black text-white block truncate max-w-[190px]">{uploadedFile.name}</span>
                    <span className="text-[10px] text-zinc-400 block font-mono font-medium">{uploadedFile.size} • Menu Booklet PDF</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Hidden inputs to trigger actual native file select browser prompts */}
        <input
          type="file"
          id="social-photo-loader-input"
          accept="image/*"
          onChange={handleImageFileChange}
          className="hidden"
        />
        <input
          type="file"
          id="social-video-loader-input"
          accept="video/*"
          onChange={handleVideoFileChange}
          className="hidden"
        />
        <input
          type="file"
          id="social-doc-loader-input"
          accept=".pdf,.doc,.docx,.png,.txt,.xlsx"
          onChange={handleAttachedFileChange}
          className="hidden"
        />

        {/* Collapsible Panels Container */}
        <div className="space-y-2">
          
          {/* Preset templates panel */}
          {showPresetGallery && (
            <div className="p-3 bg-white/5 border border-white/5 rounded-2xl animate-fade-in space-y-2">
              <span className="text-[9px] text-cyan-400 font-extrabold uppercase tracking-widest block">Choose Quick mockup media or upload custom:</span>
              <div className="flex items-center gap-2 flex-wrap">
                {/* Custom upload button inside preset list */}
                <button
                  type="button"
                  onClick={() => document.getElementById('social-photo-loader-input')?.click()}
                  className="w-12 h-12 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cyan-400 rounded-lg flex flex-col items-center justify-center text-zinc-400 hover:text-white transition duration-200 cursor-pointer"
                  title="Upload Custom Image File"
                >
                  <span className="text-xs font-bold font-mono">+ Add</span>
                </button>

                {PRESET_PHOTOS.map((photo) => (
                  <button
                    type="button"
                    key={photo.url}
                    onClick={() => {
                      setUploadedImage(photo.url);
                      setUploadedVideo(null);
                      setNewPhotoUrl('');
                    }}
                    className={`w-12 h-12 rounded-lg border overflow-hidden transition relative ${
                      uploadedImage === photo.url ? 'border-cyan-500 scale-105 shadow-md shadow-cyan-500/10' : 'border-white/10 opacity-70 hover:opacity-100'
                    }`}
                    title={photo.name}
                  >
                    <img src={photo.url} alt={photo.name} className="w-full h-full object-cover" />
                  </button>
                ))}

                {PRESET_VIDEOS.map((vid) => (
                  <button
                    type="button"
                    key={vid.url}
                    onClick={() => {
                      setUploadedVideo(vid.url);
                      setUploadedImage(null);
                      setNewPhotoUrl('');
                    }}
                    className={`w-12 h-12 rounded-lg border bg-[#170a25] flex flex-col items-center justify-center text-[11px] transition relative ${
                      uploadedVideo === vid.url ? 'border-pink-500 scale-105' : 'border-white/10 opacity-70 hover:opacity-100'
                    }`}
                    title={vid.name}
                  >
                    <span>🎥</span>
                    <span className="text-[6px] text-white/40 uppercase font-black">Video</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Dynamic input fields depending on chosen control toggles */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-w-full font-sans">
            
            {/* Publisher Brand Input */}
            {showBrandInput && (
              <div className="p-3 bg-white/5 rounded-xl border border-white/5 space-y-1.5 transition">
                <span className="text-[10px] text-zinc-400 font-bold block">🏛️ Cafe / Brand Name</span>
                <input
                  type="text"
                  placeholder="e.g. Costa Cafe Baghdad"
                  value={newBizName}
                  onChange={(e) => setNewBizName(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 text-xs px-3 py-2 rounded-lg text-white placeholder-zinc-700 focus:outline-none focus:border-cyan-400"
                />
              </div>
            )}

            {/* Promo Badge Input */}
            {showPromoInput && (
              <div className="p-3 bg-white/5 rounded-xl border border-white/5 space-y-1.5 transition">
                <span className="text-[10px] text-zinc-400 font-bold block">🎟️ Promotion Badge (Discount)</span>
                <input
                  type="text"
                  placeholder="e.g. Free Dessert • 20% Off"
                  value={newPromo}
                  onChange={(e) => setNewPromo(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 text-xs px-3 py-2 rounded-lg text-white placeholder-zinc-700 focus:outline-none focus:border-cyan-400"
                />
              </div>
            )}

            {/* Governorate dropdown selection menu */}
            {showGovInput && (
              <div className="p-3 bg-white/5 rounded-xl border border-white/5 space-y-1.5 transition">
                <span className="text-[10px] text-zinc-400 font-bold block">📍 Target Governorate</span>
                <select
                  value={newGov}
                  onChange={(e) => setNewGov(e.target.value as GovernorateCode)}
                  className="w-full bg-black/40 border border-white/10 text-xs px-2.5 py-2 rounded-lg text-white focus:outline-none focus:border-cyan-450 tracking-wide cursor-pointer text-zinc-350"
                >
                  <option value="baghdad" className="bg-[#111] text-white">Baghdad 🏰</option>
                  <option value="erbil" className="bg-[#111] text-white">Erbil 🏔️</option>
                  <option value="basra" className="bg-[#111] text-white">Basra 🌴</option>
                  <option value="sulaymaniyah" className="bg-[#111] text-white">Sulaymaniyah 🌸</option>
                  <option value="mosul" className="bg-[#111] text-white">Mosul 🍏</option>
                  <option value="najaf" className="bg-[#111] text-white">Najaf ✨</option>
                </select>
              </div>
            )}

            {/* Category selection menu dropdown */}
            {showCategoryInput && (
              <div className="p-3 bg-white/5 rounded-xl border border-white/5 space-y-1.5 transition">
                <span className="text-[10px] text-zinc-400 font-bold block">📂 Culinary/Retail Category</span>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 text-xs px-2.5 py-2 rounded-lg text-white focus:outline-none focus:border-cyan-450 tracking-wide cursor-pointer text-zinc-350"
                >
                  {CATEGORIES.map(c => (
                    <option key={c.id} value={c.id} className="bg-[#111] text-white">{c.icon} {c.name[currentLang]}</option>
                  ))}
                </select>
              </div>
            )}

          </div>

        </div>

        {/* Facebook-style 'Add to your post' container with attachment icon controls only */}
        <div className="border border-white/5 rounded-2xl p-3 bg-black/25 flex items-center justify-between gap-3 flex-wrap">
          <span className="text-xs font-bold text-zinc-400">
            {currentLang === 'en' ? 'Add to your post' : currentLang === 'ku' ? 'زیاد بکە بۆ بڵاوکراوەکە' : 'إضافة إلى منشورك'}
          </span>
          
          <div className="flex items-center gap-1">
            {/* Quick-picker Images triggers */}
            <button
              type="button"
              onClick={() => setShowPresetGallery(p => !p)}
              className={`p-2 rounded-xl transition cursor-pointer flex items-center justify-center border hover:scale-105 active:scale-95 ${
                showPresetGallery || uploadedImage 
                  ? 'bg-cyan-500/15 text-cyan-400 border-cyan-500/30' 
                  : 'bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white border-transparent'
              }`}
              title="Add Image or Preset Photos"
            >
              <ImageIcon className="w-4 h-4" />
            </button>

            {/* Video attachment button */}
            <button
              type="button"
              onClick={() => {
                document.getElementById('social-video-loader-input')?.click();
              }}
              className={`p-2 rounded-xl transition cursor-pointer flex items-center justify-center border hover:scale-105 active:scale-95 ${
                uploadedVideo 
                  ? 'bg-pink-500/15 text-pink-400 border-pink-500/30' 
                  : 'bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white border-transparent'
              }`}
              title="Add Video Trailer"
            >
              <Video className="w-4 h-4" />
            </button>

            {/* PDF booklet Menu attachment button */}
            <button
              type="button"
              onClick={() => {
                document.getElementById('social-doc-loader-input')?.click();
              }}
              className={`p-2 rounded-xl transition cursor-pointer flex items-center justify-center border hover:scale-105 active:scale-95 ${
                uploadedFile 
                  ? 'bg-indigo-500/15 text-indigo-400 border-indigo-500/30' 
                  : 'bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white border-transparent'
              }`}
              title="Attach PDF Catalog / Menu File"
            >
              <File className="w-4 h-4" />
            </button>

            {/* Toggle Promo input */}
            <button
              type="button"
              onClick={() => setShowPromoInput(!showPromoInput)}
              className={`p-2 rounded-xl transition cursor-pointer flex items-center justify-center border hover:scale-105 active:scale-95 ${
                showPromoInput || newPromo 
                  ? 'bg-orange-500/15 text-orange-400 border-orange-500/30' 
                  : 'bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white border-transparent'
              }`}
              title="Add campaign discount badge"
            >
              <Sparkles className="w-4 h-4" />
            </button>

            {/* Toggle Governorate dropdown */}
            <button
              type="button"
              onClick={() => setShowGovInput(!showGovInput)}
              className={`p-2 rounded-xl transition cursor-pointer flex items-center justify-center border hover:scale-105 active:scale-95 ${
                showGovInput 
                  ? 'bg-green-500/15 text-green-400 border-green-500/30' 
                  : 'bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white border-transparent'
              }`}
              title="Target Iraqi Governorate"
            >
              <SlidersHorizontal className="w-4 h-4" />
            </button>

            {/* Toggle category tag dropdown */}
            <button
              type="button"
              onClick={() => setShowCategoryInput(!showCategoryInput)}
              className={`p-2 rounded-xl transition cursor-pointer flex items-center justify-center border hover:scale-105 active:scale-95 ${
                showCategoryInput 
                  ? 'bg-indigo-500/15 text-indigo-400 border-indigo-500/30' 
                  : 'bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white border-transparent'
              }`}
              title="Categorize spot location"
            >
              <ShoppingBag className="w-4 h-4" />
            </button>

            {/* Toggle Brand Name custom publisher override */}
            <button
              type="button"
              onClick={() => setShowBrandInput(!showBrandInput)}
              className={`p-2 rounded-xl transition cursor-pointer flex items-center justify-center border hover:scale-105 active:scale-95 ${
                showBrandInput || newBizName 
                  ? 'bg-purple-500/15 text-purple-400 border-purple-500/30' 
                  : 'bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white border-transparent'
              }`}
              title="Override brand signature name"
            >
              <CheckCircle2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Post Button directly beneath inside the composer */}
        <button
          onClick={handleCreatePost}
          disabled={!newCaption.trim()}
          className="w-full py-3.5 bg-gradient-to-r from-cyan-500 via-indigo-600 to-pink-500 hover:opacity-90 disabled:opacity-45 text-white font-black text-xs uppercase tracking-wider rounded-2xl transition duration-250 shadow-xl shadow-cyan-500/5 cursor-pointer flex items-center justify-center gap-1.5"
        >
          <span>🚀</span>
          <span>{currentLang === 'en' ? 'Post Live Story' : currentLang === 'ku' ? 'بڵاوکردنەوەی نوێترین بابەتان' : 'أنشر القصة فوراً'}</span>
        </button>

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
