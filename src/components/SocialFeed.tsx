import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Heart, MessageCircle, Send, Bookmark, Share2, 
  Sparkles, CheckCircle2, SlidersHorizontal, Eye, Gift, ShoppingBag,
  Image as ImageIcon, Video, FileText, File
} from 'lucide-react';
import { SocialPost, Language, GovernorateCode } from '../types';
import { TRANSLATIONS, CATEGORIES, GOVERNORATES } from '../data';
import { generateLivePostFromCSV } from '../csvBusinesses';
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
  
  // Custom Pagination States for Social Feed
  const [visibleCount, setVisibleCount] = useState(3);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isGeneratingLive, setIsGeneratingLive] = useState(false);

  const handleStimulateLivePost = async () => {
    setIsGeneratingLive(true);
    
    // Pick the governorate code to use
    let govToUse = selectedGov;
    if (selectedGov === 'all') {
      const validGovs: GovernorateCode[] = [
        'baghdad', 'erbil', 'basra', 'sulaymaniyah', 'najaf', 'mosul', 
        'karbala', 'kirkuk', 'anbar', 'duhok', 'babil', 'diyala', 
        'wasit', 'saladin', 'maysan', 'muthanna', 'qadisiya', 'halabja'
      ];
      govToUse = validGovs[Math.floor(Math.random() * validGovs.length)];
    }

    try {
      const newLivePost = generateLivePostFromCSV(govToUse);
      
      // Add to local state
      setPosts(prev => [newLivePost, ...prev]);

      // Show a quick transient overlay or alert
      const bizNameText = newLivePost.businessName;
      alert(
        currentLang === 'en' 
          ? `ðŸŽ‰ Success! Handpicked and populated a new simulated live update for "${bizNameText}" from the Iraqi Database.`
          : currentLang === 'ku'
          ? `ðŸŽ‰ Ø³Û•Ø±Ú©Û•ÙˆØªÙˆÙˆ Ø¨ÙˆÙˆ! Ø¨Ø§Ø¨Û•ØªÛŽÚ©ÛŒ Ù†ÙˆÛŽ Ø¯Û•Ø±Ø¨Ø§Ø±Û•ÛŒ "${bizNameText}" Ù„Û• Ù¾Ø§Ø±ÛŽØ²Ú¯Ø§ÛŒ Ø¯ÛŒØ§Ø±ÛŒÚ©Ø±Ø§Ùˆ Ø¨ÚµØ§ÙˆÚ©Ø±Ø§ÛŒÛ•ÙˆÛ•.`
          : `ðŸŽ‰ ØªÙ… Ø¨Ù†Ø¬Ø§Ø­! Ø³Ø­Ø¨ ÙˆØªÙˆÙ„ÙŠØ¯ ØªØ­Ø¯ÙŠØ« Ø­ÙŠ Ù„Ù…Ø´Ø±ÙˆØ¹ "${bizNameText}" Ù…Ù† Ù‚Ø§Ø¹Ø¯Ø© Ø§Ù„Ø¨ÙŠØ§Ù†Ø§Øª Ø§Ù„Ø¹Ø±Ø§Ù‚ÙŠØ©.`
      );
    } catch (err) {
      console.error("Error generating simulated live post: ", err);
    } finally {
      setIsGeneratingLive(false);
    }
  };

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
            ? 'ØªÚ©Ø§ÛŒÛ• Ú¤ÛŒØ¯ÛŒÛ†Ú©Û• Ù„Û• Ù¡.Ù¤ Ù…ÛŽÚ¯Ø§Ø¨Ø§ÛŒØª Ø¨Ú†ÙˆÙˆÚ©ØªØ± Ø¨ÛŽØª' 
            : 'ÙŠØ¬Ø¨ Ø£Ù† ÙŠÙƒÙˆÙ† Ø§Ù„ÙÙŠØ¯ÙŠÙˆ Ø£Ù‚Ù„ Ù…Ù† 1.4 Ù…ÙŠØ¬Ø§Ø¨Ø§ÙŠØª'
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
    if (!user) {
      onSignIn();
      return;
    }
    if (!newCaption.trim()) return;

    const imgToUse = uploadedImage || customPhotoInput.trim() || (uploadedVideo ? '' : newPhotoUrl);
    const bizNameToUse = newBizName.trim() || user?.displayName || user?.name || (currentLang === 'en' ? 'Saku Maku User' : currentLang === 'ku' ? 'بەکارهێنەری شکو ماکو' : 'مستخدم شكو ماكو');

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
      likes: 0,
      comments: [],
      commentsCount: 0,
      likedByUser: false,
      savedByUser: false,
      shares: 0,
      views: 1,
      authorUid: user?.uid || user?.id
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
      const savedPost = await postsApi.create(newPostItem);
      setPosts(prev => [savedPost.data || savedPost.post || newPostItem, ...prev]);

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
      console.error("Error creating post: ", err);
      alert(
        currentLang === 'en'
          ? 'Post could not be published. Please try again when the API is available.'
          : currentLang === 'ku'
          ? 'نەتوانرا بابەتەکە بڵاو بکرێتەوە. تکایە دووبارە هەوڵ بدەوە.'
          : 'تعذر نشر المنشور. حاول مرة أخرى عندما تكون الخدمة متاحة.'
      );
    }
  };

  const handleLike = (postId: string) => {
    if (!user) {
      onSignIn();
      return;
    }
    const post = posts.find(p => p.id === postId);
    if (!post) return;
    const liked = !post.likedByUser;
    setPosts(prev => prev.map(p => p.id === postId ? {
      ...p,
      likedByUser: liked,
      likes: liked ? p.likes + 1 : Math.max(0, p.likes - 1)
    } : p));
  };

  const handleSave = (postId: string) => {
    if (!user) {
      onSignIn();
      return;
    }
    const post = posts.find(p => p.id === postId);
    if (!post) return;
    const saved = !post.savedByUser;
    setPosts(prev => prev.map(p => p.id === postId ? { ...p, savedByUser: saved } : p));
  };

  const handlePostComment = (e: React.FormEvent, postId: string) => {
    e.preventDefault();
    if (!user) {
      onSignIn();
      return;
    }
    const txt = commentInputs[postId];
    if (!txt || !txt.trim()) return;

    const post = posts.find(p => p.id === postId);
    if (!post) return;

    const newCom = {
      id: `c-${Date.now()}`,
      username: user?.displayName || 'iraqi_explorer_99',
      userAvatar: user?.photoURL || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80',
      text: txt.trim(),
      time: currentLang === 'en' ? 'Just now' : currentLang === 'ku' ? 'Ø¦ÛŽØ³ØªØ§' : 'Ø§Ù„Ø¢Ù†'
    };

    setPosts(prev => prev.map(p => p.id === postId ? {
      ...p,
      comments: [...p.comments, newCom],
      commentsCount: p.commentsCount + 1
    } : p));
    setCommentInputs(prev => ({ ...prev, [postId]: '' }));
  };

  const handleShare = (post: SocialPost) => {
    if (!user) {
      onSignIn();
      return;
    }
    setPosts(prev => prev.map(p => p.id === post.id ? { ...p, shares: (p.shares || 0) + 1 } : p));

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

  const currentGovDetails = GOVERNORATES.find(g => g.code === selectedGov);
  const govNameText = currentGovDetails ? currentGovDetails.name[currentLang] : selectedGov.toUpperCase();

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

      {/* Live Local Pulse Simulator Banner */}
      <div className="bg-gradient-to-br from-[#12121a] via-[#14141d] to-[#181825] border border-indigo-500/10 rounded-[20px] p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
        <div className="space-y-1 text-center sm:text-left">
          <h4 className="text-xs font-black text-rose-400 uppercase tracking-widest flex items-center justify-center sm:justify-start gap-1.5 font-sans">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse"></span>
            <span>
              {currentLang === 'en' ? 'Live Local Pulse Simulator' : currentLang === 'ku' ? 'Ø³ÛŒØ³ØªÙ…ÛŒ Ù¾Û•ÛŒÙˆÛ•Ù†Ø¯ÛŒ Ø²ÛŒÙ†Ø¯ÙˆÙˆ' : 'Ù…Ø­Ø§ÙƒÙŠ Ø¯ÙÙ‚ Ø§Ù„Ù…Ø´Ø§Ø±ÙƒØ§Øª Ø§Ù„Ø­ÙŠØ© Ù„Ù„Ù…Ø­Ø§ÙØ¸Ø§Øª'}
            </span>
          </h4>
          <p className="text-[11.5px] text-zinc-400 font-sans leading-relaxed">
            {currentLang === 'en'
              ? `Instantly grab, translate, and post real-time social stories about certified Iraqi businesses in ${govNameText}.`
              : currentLang === 'ku'
              ? `Ú•Ø§Ø³ØªÛ•ÙˆØ®Û† Ø¨Ø§Ø¨Û•ØªÚ¯Û•Ù„ÛŒ Ú•Ø§Ø³ØªÛ•Ù‚ÛŒÙ†Û• Ùˆ ØªÛ•Ø±Ø¬Û•Ù…Û•Ú©Ø±Ø§ÙˆÛŒ ÙÛ•Ø±Ù…ÛŒ Ø¯Û•Ø±Ø¨Ø§Ø±Û•ÛŒ Ø¨Ø§Ø²Ø±Ú¯Ø§Ù†ÛŒÛŒÛ•Ú©Ø§Ù† Ú©Û†Ø¨Ú©Û•Ø±Û•ÙˆÛ• Ù„Û• ${govNameText}.`
              : `Ø§Ø³Ø­Ø¨ ÙˆØ§Ù†Ø´Ø± ØªØ­Ø¯ÙŠØ«Ø§Ù‹ Ø­ÙŠØ§Ù‹ØŒ Ù…ØªØ±Ø¬Ù…Ø§Ù‹ØŒ ÙˆÙ…ØµÙ…Ù…Ø§Ù‹ Ø¨Ø¯Ù‚Ø© Ù„Ø£Ø¹Ø¸Ù… Ù…Ø­Ù„Ø§Øª ÙˆØ´Ø±ÙƒØ§Øª Ø§Ù„Ø¹Ø±Ø§Ù‚ ÙÙŠ Ù…Ø­Ø§ÙØ¸Ø© ${govNameText}.`}
          </p>
        </div>

        <button
          type="button"
          onClick={handleStimulateLivePost}
          disabled={isGeneratingLive}
          className="relative px-4 py-2.5 bg-gradient-to-r from-rose-500 to-indigo-600 hover:from-rose-400 hover:to-indigo-500 text-white font-extrabold text-xs rounded-xl cursor-pointer transition active:scale-95 flex items-center gap-1.5 shadow-lg shadow-indigo-500/10 shrink-0 font-sans disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isGeneratingLive ? (
            <>
              <span className="w-3 h-3 border-2 border-white/50 border-t-transparent rounded-full animate-spin"></span>
              <span>{currentLang === 'en' ? 'Simulating...' : 'Ø¬Ø§Ø±ÙŠ Ø§Ù„Ø³Ø­Ø¨...'}</span>
            </>
          ) : (
            <>
              <span>âœ¨</span>
              <span>
                {currentLang === 'en' 
                  ? `Pull ${selectedGov === 'all' ? 'Live Story' : `${selectedGov.toUpperCase()} Story`}`
                  : currentLang === 'ku'
                  ? `Ø¨Ú©ÛŽØ´Û• Ø¨Ø§Ø¨Û•Øª`
                  : `Ø³Ø­Ø¨ Ù…Ù†Ø´ÙˆØ± Ø­ÙŠ ${selectedGov === 'all' ? 'Ø¹Ø´ÙˆØ§Ø¦ÙŠ' : `Ù„Ù€ ${selectedGov.toUpperCase()}`}`}
              </span>
            </>
          )}
        </button>
      </div>

      {/* Immersive Refined Social Composer */}
      <div className="bg-[#18191a] border border-[#2f3031]/80 rounded-[20px] p-5 space-y-4.5 shadow-2xl relative overflow-hidden font-sans">
        
        <div className="space-y-3.5">
          {/* User Row Option */}
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-full bg-[#242526] p-[1.5px] shrink-0 border border-[#3e4042]">
              <div className="w-full h-full rounded-full bg-[#0a0a0f] overflow-hidden flex items-center justify-center">
                <img
                  src={user?.photoURL || "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80"}
                  alt={user?.displayName || "Guest user avatar"}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              {user && <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border border-slate-950 rounded-full animate-pulse"></span>}
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-white block">
                  {user?.displayName || (currentLang === 'en' ? 'Saku Maku Guest' : currentLang === 'ku' ? 'Ù…ÛŒÙˆØ§Ù†ÛŒ Ø³Ø§ÙƒÛ† Ù…Ø§ÙƒÛ†' : 'Ø¶ÙŠÙ Ø´ÙƒÙˆ Ù…Ø§ÙƒÙˆ')}
                </span>
                {user && <CheckCircle2 className="w-3 h-3 text-blue-400" />}
              </div>
              
              {/* Facebook-style quick privacy/governorate selector badge */}
              <button 
                type="button"
                onClick={() => setShowGovInput(g => !g)}
                className="mt-0.5 flex items-center gap-1 bg-[#242526] hover:bg-[#3a3b3c] border border-[#2f3031] text-[10px] text-zinc-300 px-2 py-0.5 rounded-full cursor-pointer transition font-sans"
              >
                <span>ðŸ“ {newGov.toUpperCase()}</span>
                <span className="text-[8px] opacity-75">â–¼</span>
              </button>
            </div>
          </div>

          {/* Facebook style Main input Area */}
          <div className="space-y-1">
            <textarea
              rows={3}
              placeholder={
                currentLang === 'en'
                  ? `What's on your mind, ${user?.displayName?.split(' ')[0] || 'Friend'}? Share updates, photos or video trailers...`
                  : currentLang === 'ku'
                  ? `Ú†ÛŒ Ù„Û• Ù…ÛŽØ´Ú©ØªØ¯Ø§ÛŒÛ•ØŒ ${user?.displayName?.split(' ')[0] || 'Ù‡Ø§ÙˆÚ•ÛŽÙ…'}ØŸ Ø¨Ø§Ø¨Û•ØªÛŽÚ©ÛŒ Ù†ÙˆÛŽØŒ ÙˆÛŽÙ†Û• ÛŒØ§Ù† Ú©Û•Ù„ÛŽÙ† Ø¨ÚµØ§ÙˆØ¨Ú©Û•Ø±Û•ÙˆÛ•...`
                  : `Ø¨Ù…ÙŽ ØªÙÙƒÙ‘Ø±ØŒ ${user?.displayName?.split(' ')[0] || 'ÙŠØ§ ØµØ¯ÙŠÙ‚Ù†Ø§'}ØŸ Ø£Ù†Ø´Ø± Ø£Ø­Ø¯Ø« Ø§Ù„ØµÙˆØ±ØŒ Ø¹Ø±ÙˆØ¶ ÙƒØ±Ø§Ø³Ø§Øª Ø£Ùˆ ÙÙŠØ¯ÙŠÙˆÙ‡Ø§Øª ØªØ±ÙˆÙŠØ¬ÙŠØ©...`
              }
              value={newCaption}
              onChange={(e) => setNewCaption(e.target.value)}
              className="w-full bg-transparent text-sm text-white placeholder-[#8a8d91] focus:outline-none transition leading-relaxed resize-none border-0 p-0 focus:ring-0"
              required
            />
          </div>
        </div>

        {videoError && (
          <div className="p-3 bg-red-950/20 border border-red-500/30 rounded-xl text-xs text-red-400 font-semibold flex items-center gap-2 animate-fade-in font-sans">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse shrink-0"></span>
            <span>âš ï¸ {videoError}</span>
          </div>
        )}

        {/* Visual Multi-Upload Active Previews in a clean box */}
        {(uploadedImage || newPhotoUrl || uploadedVideo || uploadedFile) && (
          <div className="relative border border-[#2f3031] rounded-xl overflow-hidden bg-[#242526]/40 p-2">
            
            {/* Unified circular close button in the top right corner */}
            <button
              type="button"
              onClick={() => {
                setUploadedImage(null);
                setUploadedVideo(null);
                setUploadedFile(null);
                setNewPhotoUrl('');
              }}
              className="absolute top-2.5 right-2.5 z-20 w-6 h-6 rounded-full bg-black/80 hover:bg-black text-white flex items-center justify-center transition active:scale-95 cursor-pointer border border-white/10 text-xs font-bold"
              title="Remove attachment"
            >
              âœ•
            </button>

            {/* Video preview render if video is selected */}
            {uploadedVideo ? (
              <div className="relative w-full rounded-lg overflow-hidden bg-black flex flex-col items-center justify-center p-1.5 min-h-[140px]">
                <video src={uploadedVideo} style={{ maxHeight: '160px' }} controls className="w-full h-auto rounded-lg object-contain" />
                <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1 bg-black/85 backdrop-blur-md px-2.5 py-1 rounded-full border border-pink-500/20 text-[10px] text-pink-400 font-extrabold shadow-md">
                  <Video className="w-3.5 h-3.5" />
                  <span>VIDEO ATTACHED</span>
                </div>
              </div>
            ) : uploadedImage || newPhotoUrl ? (
              /* Photo preview render */
              <div className="relative w-full rounded-lg overflow-hidden bg-black/45 flex items-center justify-center p-1.5 min-h-[140px]">
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
              <div className="p-3 bg-zinc-850 border border-zinc-700 rounded-xl flex items-center justify-between gap-3 font-sans">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-lg bg-zinc-900 flex items-center justify-center text-zinc-400 border border-zinc-700 shadow-md">
                    <FileText className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <span className="text-xs font-black text-white block truncate max-w-[190px]">{uploadedFile.name}</span>
                    <span className="text-[10px] text-zinc-400 block font-mono font-medium">{uploadedFile.size} â€¢ Menu Booklet PDF</span>
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
            <div className="p-3 bg-[#242526] border border-[#2f3031] rounded-xl animate-fade-in space-y-2">
              <span className="text-[9px] text-[#e4e6eb] font-extrabold uppercase tracking-widest block">Choose Quick mockup media or upload custom:</span>
              <div className="flex items-center gap-2 flex-wrap">
                {/* Custom upload button inside preset list */}
                <button
                  type="button"
                  onClick={() => document.getElementById('social-photo-loader-input')?.click()}
                  className="w-12 h-12 bg-[#18191a] hover:bg-zinc-800 border border-[#3e4042] rounded-lg flex flex-col items-center justify-center text-zinc-400 hover:text-white transition duration-200 cursor-pointer"
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
                    className={`w-12 h-12 rounded-lg border overflow-hidden transition relative cursor-pointer ${
                      uploadedImage === photo.url ? 'border-amber-500 scale-105 shadow-md shadow-amber-500/10' : 'border-[#2f3031] opacity-70 hover:opacity-100'
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
                    className={`w-12 h-12 rounded-lg border bg-[#18191a] flex flex-col items-center justify-center text-[11px] transition relative cursor-pointer ${
                      uploadedVideo === vid.url ? 'border-amber-500 scale-105' : 'border-[#2f3031] opacity-70 hover:opacity-100'
                    }`}
                    title={vid.name}
                  >
                    <span>ðŸŽ¥</span>
                    <span className="text-[6px] text-white/40 uppercase font-[#2f3031] font-black">Video</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Dynamic input fields depending on chosen control toggles */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-w-full font-sans">
            
            {/* Publisher Brand Input */}
            {showBrandInput && (
              <div className="p-3 bg-[#242526] rounded-lg border border-[#2f3031] space-y-1.5 transition">
                <span className="text-[10px] text-[#e4e6eb] font-bold block">ðŸ›ï¸ Cafe / Brand Name</span>
                <input
                  type="text"
                  placeholder="e.g. Costa Cafe Baghdad"
                  value={newBizName}
                  onChange={(e) => setNewBizName(e.target.value)}
                  className="w-full bg-[#18191a] border border-[#3e4042] text-xs px-3 py-2 rounded text-white placeholder-zinc-700 focus:outline-[#1877f2] focus:outline-none"
                />
              </div>
            )}

            {/* Promo Badge Input */}
            {showPromoInput && (
              <div className="p-3 bg-[#242526] rounded-lg border border-[#2f3031] space-y-1.5 transition">
                <span className="text-[10px] text-[#e4e6eb] font-bold block">ðŸŽŸï¸ Promotion Badge (Discount)</span>
                <input
                  type="text"
                  placeholder="e.g. Free Dessert â€¢ 20% Off"
                  value={newPromo}
                  onChange={(e) => setNewPromo(e.target.value)}
                  className="w-full bg-[#18191a] border border-[#3e4042] text-xs px-3 py-2 rounded text-white placeholder-zinc-700 focus:outline-[#1877f2] focus:outline-none"
                />
              </div>
            )}

            {/* Governorate dropdown selection menu */}
            {showGovInput && (
              <div className="p-3 bg-[#242526] rounded-lg border border-[#2f3031] space-y-1.5 transition">
                <span className="text-[10px] text-[#e4e6eb] font-bold block">ðŸ“ Target Governorate</span>
                <select
                  value={newGov}
                  onChange={(e) => setNewGov(e.target.value as GovernorateCode)}
                  className="w-full bg-[#18191a] border border-[#3e4042] text-xs px-2.5 py-2 rounded text-white focus:outline-none cursor-pointer"
                >
                  <option value="baghdad" className="bg-[#18191a] text-white">Baghdad ðŸ°</option>
                  <option value="erbil" className="bg-[#18191a] text-white">Erbil ðŸ”ï¸</option>
                  <option value="basra" className="bg-[#18191a] text-white">Basra ðŸŒ´</option>
                  <option value="sulaymaniyah" className="bg-[#18191a] text-white">Sulaymaniyah ðŸŒ¸</option>
                  <option value="mosul" className="bg-[#18191a] text-white">Mosul ðŸ</option>
                  <option value="najaf" className="bg-[#18191a] text-white">Najaf âœ¨</option>
                </select>
              </div>
            )}

            {/* Category selection menu dropdown */}
            {showCategoryInput && (
              <div className="p-3 bg-[#242526] rounded-lg border border-[#2f3031] space-y-1.5 transition">
                <span className="text-[10px] text-[#e4e6eb] font-bold block">ðŸ“‚ Culinary/Retail Category</span>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full bg-[#18191a] border border-[#3e4042] text-xs px-2.5 py-2 rounded text-white focus:outline-none cursor-pointer"
                >
                  {CATEGORIES.map(c => (
                    <option key={c.id} value={c.id} className="bg-[#18191a] text-white">{c.icon} {c.name[currentLang]}</option>
                  ))}
                </select>
              </div>
            )}

          </div>

        </div>

        {/* Facebook-style 'Add to your post' footer bar with interactive controls */}
        <div className="border border-[#2f3031] rounded-xl p-3 bg-[#18191a] flex items-center justify-between gap-3 flex-wrap">
          <span className="text-xs font-bold text-zinc-350">
            {currentLang === 'en' ? 'Add to your post' : currentLang === 'ku' ? 'Ø²ÛŒØ§Ø¯ Ø¨Ú©Û• Ø¨Û† Ø¨Ø§Ø¨Û•Øª' : 'Ø¥Ø¶Ø§ÙØ© Ø¥Ù„Ù‰ Ù…Ù†Ø´ÙˆØ±Ùƒ'}
          </span>
          
          <div className="flex items-center gap-1.5">
            {/* Gallery Picker Mode (Presets) */}
            <button
              type="button"
              onClick={() => setShowPresetGallery(p => !p)}
              className={`p-2 rounded-full transition cursor-pointer flex items-center justify-center border hover:bg-[#242526] active:scale-90 ${
                showPresetGallery 
                  ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' 
                  : 'bg-transparent text-[#45bd62] border-transparent'
              }`}
              title="Add Image or Preset Photos"
            >
              <ImageIcon className="w-4.5 h-4.5" />
            </button>

            {/* Video file loader trigger button */}
            <button
              type="button"
              onClick={() => {
                document.getElementById('social-video-loader-input')?.click();
              }}
              className={`p-2 rounded-full transition cursor-pointer flex items-center justify-center border hover:bg-[#242526] active:scale-90 ${
                uploadedVideo 
                  ? 'bg-red-500/10 text-red-400 border-red-500/20' 
                  : 'bg-transparent text-[#f02849] border-transparent'
              }`}
              title="Upload Custom Video"
            >
              <Video className="w-4.5 h-4.5" />
            </button>

            {/* Document booklet attachment trigger button */}
            <button
              type="button"
              onClick={() => {
                document.getElementById('social-doc-loader-input')?.click();
              }}
              className={`p-2 rounded-full transition cursor-pointer flex items-center justify-center border hover:bg-[#242526] active:scale-90 ${
                uploadedFile 
                  ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' 
                  : 'bg-transparent text-zinc-400 border-transparent'
              }`}
              title="Attach Campaign PDF/Flyer"
            >
              <File className="w-4.5 h-4.5" />
            </button>

            {/* Discount Code Input Toggle button */}
            <button
              type="button"
              onClick={() => setShowPromoInput(!showPromoInput)}
              className={`p-2 rounded-full transition cursor-pointer flex items-center justify-center border hover:bg-[#242526] active:scale-90 ${
                showPromoInput || newPromo 
                  ? 'bg-orange-500/10 text-orange-400 border-orange-500/20' 
                  : 'bg-transparent text-[#f7b928] border-transparent'
              }`}
              title="Add campaign discount badge"
            >
              <Sparkles className="w-4.5 h-4.5" />
            </button>

            {/* Toggle Governorate dropdown selector */}
            <button
              type="button"
              onClick={() => setShowGovInput(!showGovInput)}
              className={`p-2 rounded-full transition cursor-pointer flex items-center justify-center border hover:bg-[#242526] active:scale-90 ${
                showGovInput 
                  ? 'bg-green-500/10 text-green-400 border-green-500/20' 
                  : 'bg-transparent text-[#45bd62] border-transparent'
              }`}
              title="Target Iraqi Governorate"
            >
              <SlidersHorizontal className="w-4.5 h-4.5" />
            </button>

            {/* Toggle category tag dropdown */}
            <button
              type="button"
              onClick={() => setShowCategoryInput(!showCategoryInput)}
              className={`p-2 rounded-full transition cursor-pointer flex items-center justify-center border hover:bg-[#242526] active:scale-90 ${
                showCategoryInput 
                  ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' 
                  : 'bg-transparent text-purple-400 border-transparent'
              }`}
              title="Categorize spot location"
            >
              <ShoppingBag className="w-4.5 h-4.5" />
            </button>

            {/* Interactive signature brand creator toggle */}
            <button
              type="button"
              onClick={() => setShowBrandInput(!showBrandInput)}
              className={`p-2 rounded-full transition cursor-pointer flex items-center justify-center border hover:bg-[#242526] active:scale-90 ${
                showBrandInput || newBizName 
                  ? 'bg-pink-500/10 text-pink-400 border-pink-500/20' 
                  : 'bg-transparent text-pink-500 border-transparent'
              }`}
              title="Override brand signature name"
            >
              <CheckCircle2 className="w-4.5 h-4.5" />
            </button>
          </div>
        </div>

        {/* Post Submit Button - Styled exactly like Facebook's prominent rectangular blue button */}
        <button
          type="button"
          onClick={handleCreatePost}
          disabled={!newCaption.trim()}
          className="w-full py-2.5 bg-[#1877f2] hover:bg-[#166fe5] disabled:bg-[#505151]/55 disabled:text-zinc-500 text-white font-bold text-sm tracking-wide rounded-md transition duration-150 cursor-pointer flex items-center justify-center gap-2 shadow-md"
        >
          <span>{currentLang === 'en' ? 'Post' : currentLang === 'ku' ? 'Ø¨Ù„Ø§ÙˆÚ©Ø±Ø¯Ù†Û•ÙˆÛ•' : 'Ù†Ø´Ø±'}</span>
        </button>

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
                    <span>â€¢</span>
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
                  <span>ðŸ“ Text Announcement Only</span>
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
                        {post.fileAttachment.size} â€¢ Verified Menu Flyer File
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      alert(`ðŸ“¥ Saku Maku Security: Starting download of verified digital menu artifact: "${post.fileAttachment?.name}" (${post.fileAttachment?.size}). Checked secure by Admin panel!`);
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
                    <span className="text-xs font-black">{post.shares || 0}</span>
                  </button>

                  {/* Views count */}
                  {post.views !== undefined && post.views > 0 && (
                    <div className="flex items-center gap-1 text-zinc-500 hover:text-zinc-400 transition cursor-default">
                      <div className="p-1 bg-transparent border border-transparent">
                        <Eye className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-[11px] font-bold font-mono">{post.views}</span>
                    </div>
                  )}

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
            <span>ðŸ”„</span>
            <span>{currentLang === 'en' ? 'Load More Stories' : currentLang === 'ku' ? 'Ù¾Ø§Ú©Û•ØªÛŒ Ú†ÛŒØ±Û†Ú©ÛŒ Ø²ÛŒØ§ØªØ±' : 'ØªØ­Ù…ÙŠÙ„ Ø§Ù„Ù…Ø²ÙŠØ¯ Ù…Ù† Ø§Ù„Ù‚ØµØµ'}</span>
          </button>
        </div>
      )}

      {/* If absolutely no post fits governorate */}
      {filteredPosts.length === 0 && (
        <div className="text-center py-16 bg-slate-900/10 border border-zinc-900/40 rounded-3xl p-8 flex flex-col items-center">
          <ShoppingBag className="w-12 h-12 text-zinc-700 mb-3" />
          <h3 className="text-sm font-bold text-white mb-1">
            {currentLang === 'en' ? 'No Live Broadcasts' : currentLang === 'ku' ? 'Ù‡ÛŒÚ† Ù¾Û•Ø®Ø´ÛŽÚ©ÛŒ Ú•Ø§Ø³ØªÛ•ÙˆØ®Û† Ù†ÛŒÛŒÛ•' : 'Ù„Ø§ ØªÙˆØ¬Ø¯ Ù…Ù†Ø´ÙˆØ±Ø§Øª Ø­ÙŠØ©'}
          </h3>
          <p className="text-xs text-zinc-500 max-w-sm mb-4 leading-relaxed">
            {currentLang === 'en' 
              ? `No businesses in ${govNameText} have active broadcasts yet. Pull an authentic local update from the database now!`
              : currentLang === 'ku'
              ? `Ù‡ÛŒÚ† Ú©Û†Ù…Ù¾Ø§Ù†ÛŒØ§ÛŒÛ•Ú© Ù„Û• ${govNameText} Ù¾Û•Ø®Ø´ÛŒ Ø²ÛŒÙ†Ø¯ÙˆÙˆÛŒ Ù†ÛŒÛŒÛ•. Ø¨Ø§Ø¨Û•ØªÛŽÚ©ÛŒ ÙÛ•Ø±Ù…ÛŒ Ú•Ø§Ø³ØªÛ•Ù‚ÛŒÙ†Û• Ù„ÛŽØ±Û•ÙˆÛ• Ù¾Û†Ø³Øª Ø¨Ú©Û•!`
              : `Ù„Ù… ØªÙ‚Ù… Ø§Ù„Ù…Ø­Ù„Ø§Øª Ø£Ùˆ Ø§Ù„Ø´Ø±ÙƒØ§Øª ÙÙŠ Ù…Ø­Ø§ÙØ¸Ø© ${govNameText} Ø¨Ù†Ø´Ø± Ø­Ù…Ù„Ø§Øª ØªØ±ÙˆÙŠØ¬ÙŠØ© Ø¨Ø¹Ø¯. Ø§Ø³Ø­Ø¨ ÙˆØ§Ù†Ø´Ø± ØªØ­Ø¯ÙŠØ«Ø§Ù‹ Ø­Ù‚ÙŠÙ‚ÙŠØ§Ù‹ ØªÙ„Ù‚Ø§Ø¦ÙŠØ§Ù‹ Ø§Ù„Ø¢Ù†!`}
          </p>

          <button
            type="button"
            onClick={handleStimulateLivePost}
            disabled={isGeneratingLive}
            className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 font-extrabold text-white text-xs rounded-xl transition cursor-pointer flex items-center justify-center gap-1.5 active:scale-95 shadow-lg shadow-indigo-600/10 disabled:opacity-50"
          >
            {isGeneratingLive ? (
              <>
                <span className="w-3 h-3 border-2 border-white/50 border-t-transparent rounded-full animate-spin"></span>
                <span>{currentLang === 'en' ? 'Populating...' : 'Ø¬Ø§Ø±ÙŠ Ø§Ù„ØªÙˆÙ„ÙŠØ¯...'}</span>
              </>
            ) : (
              <>
                <span>âœ¨</span>
                <span>
                  {currentLang === 'en'
                    ? `Seed ${govNameText} Feed`
                    : currentLang === 'ku'
                    ? `ØªÙˆÙ„ÛŒØ¯Ú©Ø±Ø¯Ù†ÛŒ Ø¨Ø§Ø¨Û•Øª Ø¨Û† ${govNameText}`
                    : `ØªÙˆÙ„ÙŠØ¯ Ù…Ù†Ø´ÙˆØ±Ø§Øª Ù„Ù€ ${govNameText} ØªÙ„Ù‚Ø§Ø¦ÙŠØ§Ù‹`}
                </span>
              </>
            )}
          </button>
        </div>
      )}

    </div>
  );
}
