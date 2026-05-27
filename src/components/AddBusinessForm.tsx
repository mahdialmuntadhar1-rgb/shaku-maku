import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  PlusCircle, Store, ChevronDown, CheckCircle, Navigation, Phone, 
  Info, Image as ImageIcon, Sparkles, Heart, Bookmark, Eye, HelpCircle, 
  FileText, Send, Share2, Award, ShieldCheck, Flame 
} from 'lucide-react';
import { Business, Language, GovernorateCode, UserProfile, SocialPost } from '../types';
import { GOVERNORATES, CATEGORIES, TRANSLATIONS } from '../data';
import BusinessOnboarding from './BusinessOnboarding';

interface AddBusinessFormProps {
  currentLang: Language;
  onAddBusiness: (newBiz: Omit<Business, 'rating' | 'reviewsCount' | 'likes' | 'saves'>) => void;
  user: any;
  userProfile: UserProfile | null;
  onUpdateProfile: (updated: Partial<UserProfile>) => Promise<void>;
  onSignIn: () => void;
  businesses: Business[];
  posts?: SocialPost[];
  setPosts?: React.Dispatch<React.SetStateAction<SocialPost[]>>;
}

export default function AddBusinessForm({ 
  currentLang, 
  onAddBusiness, 
  user, 
  userProfile, 
  onUpdateProfile, 
  onSignIn,
  businesses,
  posts = [],
  setPosts
}: AddBusinessFormProps) {
  
  // Dashboard vs List spot layout state
  const isOwner = userProfile?.role === 'owner';
  const isOnboarded = userProfile?.onboarded === true;
  
  // Find owner's registered high-street business listing
  const myBusiness = businesses.find(b => b.ownerUid === user?.uid || (userProfile?.businessId && b.id === userProfile.businessId));

  // State for Claim / standard add spot form
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('coffee');
  const [governorate, setGovernorate] = useState<GovernorateCode>('baghdad');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [success, setSuccess] = useState(false);

  // States for Owner managing their spot
  const [editName, setEditName] = useState('');
  const [editDesc, setEditDesc] = useState('');
  const [editPhone, setEditPhone] = useState('');
  const [editAddress, setEditAddress] = useState('');
  const [editCover, setEditCover] = useState('');
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [submittingUpdate, setSubmittingUpdate] = useState(false);

  // States for Owner making a new social media post
  const [postCaption, setPostCaption] = useState('');
  const [postPromo, setPostPromo] = useState('');
  const [postImage, setPostImage] = useState('');
  const [submittingPost, setSubmittingPost] = useState(false);
  const [postSuccess, setPostSuccess] = useState(false);

  // States for Owner searching and editing their past posts
  const [ownerSearch, setOwnerSearch] = useState('');
  const [editingPostId, setEditingPostId] = useState<string | null>(null);
  const [editPostCaption, setEditPostCaption] = useState('');
  const [editPostPromo, setEditPostPromo] = useState('');
  const [isDeletingPostId, setIsDeletingPostId] = useState<string | null>(null);

  useEffect(() => {
    if (myBusiness) {
      setEditName(myBusiness.name[currentLang] || myBusiness.name.en || '');
      setEditDesc(myBusiness.description[currentLang] || myBusiness.description.en || '');
      setEditPhone(myBusiness.phoneNumber || '');
      setEditAddress(myBusiness.address[currentLang] || myBusiness.address.en || '');
      setEditCover(myBusiness.image || '');
    }
  }, [myBusiness, currentLang]);

  const t = TRANSLATIONS[currentLang];
  const isRtl = currentLang === 'ar' || currentLang === 'ku';

  // Handle Guest Listing Creation
  const handleSubmitClaim = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !description.trim() || !address.trim()) return;

    const defaultImages: Record<string, string> = {
      coffee: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&auto=format&fit=crop&q=80',
      dining: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80',
      shopping: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&auto=format&fit=crop&q=80',
      hotels: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&auto=format&fit=crop&q=80',
      salons: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800&auto=format&fit=crop&q=80',
      gyms: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&auto=format&fit=crop&q=80',
      pharmacies: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&auto=format&fit=crop&q=80',
      universities: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=80',
      entertainment: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=800&auto=format&fit=crop&q=80'
    };

    const finalImage = imageUrl.trim() || defaultImages[category];
    const newBizId = `b-claim-${Date.now()}`;

    const newBusiness: Omit<Business, 'rating' | 'reviewsCount' | 'likes' | 'saves'> = {
      id: newBizId,
      name: { ar: name.trim(), ku: name.trim(), en: name.trim() },
      description: { ar: description.trim(), ku: description.trim(), en: description.trim() },
      category,
      governorate,
      image: finalImage,
      images: [finalImage],
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      isVerified: true,
      phoneNumber: phone.trim() || undefined,
      address: { ar: address.trim(), ku: address.trim(), en: address.trim() },
      mapCoords: {
        x: Math.floor(Math.random() * 40) + 30,
        y: Math.floor(Math.random() * 40) + 30
      }
    };

    onAddBusiness(newBusiness);
    setSuccess(true);

    // Auto promote user to Onboarded Spot Owner on creating their first spot!
    onUpdateProfile({
      role: 'owner',
      onboarded: true,
      businessId: newBizId,
      businessOnboarding: {
        name: name.trim(),
        category,
        governorate,
        address: address.trim(),
        phone: phone.trim(),
        whatsApp: phone.trim(),
        logo: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
        coverImage: finalImage,
        description: description.trim()
      }
    }).catch(err => console.error("Error upgrading user: ", err));

    // Reset fields
    setName('');
    setDescription('');
    setPhone('');
    setAddress('');
    setImageUrl('');

    setTimeout(() => setSuccess(false), 6000);
  };

  // Handle Owner Updating their Business portfolio
  const handleUpdateSpot = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!myBusiness || submittingUpdate) return;
    setSubmittingUpdate(true);
    setUpdateSuccess(false);

    onAddBusiness({
      ...myBusiness,
      name: { ...myBusiness.name, [currentLang]: editName.trim() },
      description: { ...myBusiness.description, [currentLang]: editDesc.trim() },
      phoneNumber: editPhone.trim(),
      address: { ...myBusiness.address, [currentLang]: editAddress.trim() },
      image: editCover.trim()
    });
    setUpdateSuccess(true);
    setTimeout(() => setUpdateSuccess(false), 4000);
    setSubmittingUpdate(false);
  };

  // Handle Owner Broadcasting a live Story/Post
  const handlePublishStory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!myBusiness || !postCaption.trim() || submittingPost) return;
    setSubmittingPost(true);
    setPostSuccess(false);

    const postImg = postImage.trim() || myBusiness.image;
    const newPostId = `post-owner-${Date.now()}`;

    const newPostItem: SocialPost = {
      id: newPostId,
      businessId: myBusiness.id,
      businessName: myBusiness.name[currentLang] || myBusiness.name.en,
      businessAvatar: myBusiness.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=50&auto=format&fit=crop&q=80',
      category: myBusiness.category,
      governorate: myBusiness.governorate,
      mediaUrl: postImg,
      caption: {
        ar: postCaption.trim(),
        ku: postCaption.trim(),
        en: postCaption.trim()
      },
      likes: 24,
      commentsCount: 2,
      shares: 4,
      timeAgo: {
        ar: 'الآن 🔥',
        ku: 'ئێستا 🔥',
        en: 'Just Now 🔥'
      },
      likedByUser: false,
      savedByUser: false,
      comments: [
        {
          id: 'c1',
          username: 'Shko Maku Mod',
          text: 'Verified broadcast! Looking great.',
          time: '1m ago'
        }
      ],
      promotionBadge: postPromo.trim() ? {
        ar: postPromo.trim(),
        ku: postPromo.trim(),
        en: postPromo.trim()
      } : undefined,
      authorUid: user.uid
    };

    if (setPosts) setPosts(prev => [newPostItem, ...prev]);
    setPostCaption('');
    setPostPromo('');
    setPostImage('');
    setPostSuccess(true);
    setTimeout(() => setPostSuccess(false), 4000);
    setSubmittingPost(false);
  };

  // Helper Onboarding Completion Callback
  const handleOnboardingFinish = async (formData: any) => {
    const bizId = `b-onboard-${Date.now()}`;
    const newBiz: Business = {
      id: bizId,
      name: { ar: formData.name, ku: formData.name, en: formData.name },
      description: { ar: formData.description, ku: formData.description, en: formData.description },
      category: formData.category,
      governorate: formData.governorate,
      rating: 4.9,
      reviewsCount: 1,
      image: formData.coverImage,
      images: [formData.coverImage],
      avatar: formData.logo,
      isVerified: true,
      phoneNumber: formData.phone,
      address: { ar: formData.address, ku: formData.address, en: formData.address },
      likes: 12,
      saves: 6,
      mapCoords: { x: Math.floor(Math.random() * 30) + 30, y: Math.floor(Math.random() * 30) + 30 },
      ownerUid: user.uid
    };

    onAddBusiness(newBiz);
    await onUpdateProfile({
      onboarded: true,
      businessId: bizId,
      businessOnboarding: formData
    });
  };

  // Not Signed In
  if (!user) {
    return (
      <div className="w-full max-w-xl mx-auto bg-white/5 border border-white/10 rounded-[28px] p-8 text-center space-y-6 relative overflow-hidden backdrop-blur-md shadow-2xl">
        <div className="absolute top-[-20%] left-[-20%] w-64 h-64 bg-cyan-700/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-[-20%] right-[-20%] w-64 h-64 bg-[#C8A95F]/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative space-y-4">
          <div className="mx-auto w-14 h-14 rounded-2xl bg-gradient-to-tr from-luxury-teal to-luxury-gold flex items-center justify-center text-white shadow-xl">
            <Store className="w-7 h-7 text-white" />
          </div>

          <div>
            <span className="text-[10px] text-luxury-gold font-extrabold uppercase tracking-widest block font-mono">List Your Cafe or Spot</span>
            <h3 className="text-base font-black text-white mt-1">
              {currentLang === 'en' ? 'Sign In Required' : currentLang === 'ku' ? 'چوونەژوورەوە پێویستە' : 'مطلوب تسجيل الدخول'}
            </h3>
            <p className="text-xs text-zinc-400 mt-1.5 leading-relaxed max-w-sm mx-auto">
              {currentLang === 'en'
                ? 'Connect with Shko Maku via Google to publish and manage your high-street business listing.'
                : currentLang === 'ku'
                ? 'پەیوەست بە شكو ماكۆوە لە ڕێگەی گووگڵەوە بۆ بڵاوکردنەوە و بەڕێوەبردنی شوێنەکەت.'
                : 'قم بالاتصال بشكو ماكو عبر جوجل لتتمكن من نشر وإدارة كافيهك أو مشروعك الخاص.'}
            </p>
          </div>

          <button
            onClick={onSignIn}
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#FF6B4A] hover:bg-[#C8A95F] text-[#1A1A1A] font-black text-xs uppercase tracking-wider rounded-xl transition cursor-pointer shadow-xl duration-300 font-sans"
            style={{ width: 'auto' }}
          >
            🔑 {currentLang === 'en' ? 'Sign In with Google' : currentLang === 'ku' ? 'چوونەژوورەوە لە ڕێگەی گووگڵ' : 'سجل دخول باستخدام جوجل'}
          </button>
        </div>
      </div>
    );
  }

  // Active Owner but NOT finished Onboarding Workflow
  if (isOwner && !isOnboarded) {
    return (
      <div className="space-y-6">
        <div className="text-center max-w-md mx-auto mb-2 progress-banner">
          <span className="text-[10px] text-luxury-gold tracking-widest uppercase font-mono font-black block">Merchant Integration Gateway</span>
          <h3 className="text-xl font-bold text-white mt-1">Onboarding Campaign</h3>
          <p className="text-xs text-zinc-400 leading-normal mt-1">Please configure your spot identity profile to unlock your live marketing dashboard!</p>
        </div>
        
        <BusinessOnboarding
          currentLang={currentLang}
          userId={user.uid}
          userName={user.displayName || 'Authorized Owner'}
          userEmail={user.email || ''}
          onSubmitOnboarding={handleOnboardingFinish}
          onCancel={() => onUpdateProfile({ role: 'user' })}
        />
      </div>
    );
  }

  // ACTIVE ONBOARDED OWNER - Render Gorgeous Campaign HQ Dashboard!
  if (isOwner && isOnboarded) {
    return (
      <div className="w-full max-w-4xl mx-auto space-y-8" dir={isRtl ? 'rtl' : 'ltr'}>
        
        {/* Spot Owner Dashboard Hero header */}
        <div className="relative overflow-hidden bg-gradient-to-r from-zinc-950 to-zinc-900 border border-luxury-gold/30 rounded-3xl p-6 sm:p-8 shadow-2xl">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#0F2E2F]/30 rounded-full blur-[110px] pointer-events-none"></div>
          
          <div className="relative flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4 text-center sm:text-left">
              <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-luxury-gold p-0.5 bg-[#1C1C24] shrink-0">
                <img 
                  src={myBusiness?.avatar || userProfile?.businessOnboarding?.logo || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'} 
                  alt="Spot logo" 
                  className="w-full h-full object-cover rounded-xl"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="space-y-1">
                <span className="text-[9px] bg-[#C8A95F]/15 font-bold px-2 py-1 text-luxury-gold rounded-md border border-luxury-gold/25 tracking-wider uppercase inline-block">
                  🏢 Standard Verified Merchant
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-white">
                  {myBusiness?.name[currentLang] || userProfile?.businessOnboarding?.name || 'My Local Business Spot'}
                </h2>
                <p className="text-xs text-zinc-400">
                  📍 {myBusiness?.address[currentLang] || userProfile?.businessOnboarding?.address || 'Baghdad, Iraq'}
                </p>
              </div>
            </div>

            {/* Quick Metrics stats grid */}
            <div className="grid grid-cols-2 gap-3 shrink-0 w-full sm:w-auto">
              <div className="bg-white/5 border border-white/10 px-4.5 py-3 rounded-2xl text-center">
                <div className="flex items-center justify-center gap-1.5 text-pink-400 text-xs font-black">
                  <Heart className="w-4 h-4 fill-pink-650 shrink-0" />
                  <span>{myBusiness?.likes || 12}</span>
                </div>
                <span className="text-[10px] text-zinc-400 block font-semibold mt-1">Likes Metric</span>
              </div>

              <div className="bg-white/5 border border-white/10 px-4.5 py-3 rounded-2xl text-center">
                <div className="flex items-center justify-center gap-1.5 text-luxury-gold text-xs font-black">
                  <Bookmark className="w-4 h-4 fill-luxury-gold shrink-0" />
                  <span>{myBusiness?.saves || 6}</span>
                </div>
                <span className="text-[10px] text-zinc-400 block font-semibold mt-1">Saves Metric</span>
              </div>
            </div>
          </div>
        </div>

        {/* Triple Columns: (Publish story) VS (Edit spot settings portfolio) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Column A: Story Broadcast manager */}
          <div className="bg-[#141417] border border-white/5 rounded-3xl p-6 space-y-5 relative">
            <div className="absolute top-0 right-0 w-36 h-36 bg-orange-655/5 rounded-full blur-[80px] pointer-events-none"></div>
            
            <div className="border-b border-white/5 pb-3.5">
              <h3 className="text-sm font-black text-white uppercase flex items-center gap-2">
                <Flame className="w-4.5 h-4.5 text-orange-500 animate-pulse" />
                <span>{currentLang === 'en' ? 'Pulse Feed Story Broadcast' : 'بث عرض تيك توك نشط بالقصة'}</span>
              </h3>
              <p className="text-[11px] text-zinc-400 leading-normal mt-1">
                Publish instantaneous photographic menus, coupon campaign deals, or late night updates directly to Iraq’s interactive community!
              </p>
            </div>

            <AnimatePresence>
              {postSuccess && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-green-950/40 border border-green-500/20 text-green-300 p-3.5 rounded-xl text-xs flex items-center gap-2"
                >
                  <CheckCircle className="w-4.5 h-4.5 shrink-0" />
                  <span>Story published to community Pulse Feed successfully!</span>
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handlePublishStory} className="space-y-4 text-xs font-medium">
              <div className="space-y-1.5">
                <label className="text-zinc-400 block font-bold">Post Caption / Message</label>
                <textarea
                  required
                  rows={3}
                  value={postCaption}
                  onChange={(e) => setPostCaption(e.target.value)}
                  placeholder="e.g. Try our fresh custom filter coffee tonight! Premium beans in Karada ☕..."
                  className="w-full bg-[#020205]/45 text-white p-3 rounded-xl border border-white/10 focus:outline-none focus:border-luxury-gold leading-relaxed"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-zinc-400 block font-bold">Hot Promotion Badge (Optional)</label>
                  <input
                    type="text"
                    value={postPromo}
                    onChange={(e) => setPostPromo(e.target.value)}
                    placeholder="e.g. 15% discount tonight"
                    className="w-full bg-[#020205]/45 text-white p-3 rounded-xl border border-white/10 focus:outline-none focus:border-luxury-gold"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-zinc-400 block font-bold">Campaign Media URL</label>
                  <input
                    type="url"
                    value={postImage}
                    onChange={(e) => setPostImage(e.target.value)}
                    placeholder="https://images.unsplash.com/... (optional)"
                    className="w-full bg-[#020205]/45 text-white p-3 rounded-xl border border-white/10 focus:outline-none focus:border-luxury-gold font-mono"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={submittingPost}
                className="w-full py-3 bg-gradient-to-r from-[#FF6B4A] to-orange-600 text-[#1A1A1A] text-xs font-black uppercase rounded-xl tracking-wider transition hover:scale-102 active:scale-95 cursor-pointer disabled:opacity-40 shadow-lg"
              >
                {submittingPost ? 'Broadcasting...' : 'Launch Live Stream Update 🚀'}
              </button>
            </form>
          </div>

          {/* Column B: Spot detail parameters updates */}
          <div className="bg-[#141417] border border-white/5 rounded-3xl p-6 space-y-5 relative">
            <div className="absolute top-0 right-0 w-36 h-36 bg-cyan-655/5 rounded-full blur-[80px] pointer-events-none"></div>

            <div className="border-b border-white/5 pb-3.5">
              <h3 className="text-sm font-black text-white uppercase flex items-center gap-2">
                <Award className="w-4.5 h-4.5 text-luxury-gold shrink-0" />
                <span>{currentLang === 'en' ? 'Manage Business Portfolio' : 'تعديل ملف المشروع'}</span>
              </h3>
              <p className="text-[11px] text-zinc-400 leading-normal mt-1">
                Refine address coordinates, translate bio statements, or configure corporate contact lists instantly in real-time.
              </p>
            </div>

            <AnimatePresence>
              {updateSuccess && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-emerald-950/40 border border-emerald-500/20 text-emerald-350 p-3.5 rounded-xl text-xs flex items-center gap-2"
                >
                  <CheckCircle className="w-4.5 h-4.5 shrink-0" />
                  <span>Business portfolio details saved successfully!</span>
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleUpdateSpot} className="space-y-4 text-xs font-medium">
              <div className="space-y-1.5">
                <label className="text-zinc-400 block font-bold">Business Name</label>
                <input
                  type="text"
                  required
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full bg-[#020205]/45 text-white p-3 rounded-xl border border-white/10 focus:outline-none focus:border-luxury-gold font-bold"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-zinc-400 block font-bold">High Street Location Address</label>
                <input
                  type="text"
                  required
                  value={editAddress}
                  onChange={(e) => setEditAddress(e.target.value)}
                  className="w-full bg-[#020205]/45 text-white p-3 rounded-xl border border-white/10 focus:outline-none focus:border-luxury-gold"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-zinc-400 block font-bold">Cover Photograph URL</label>
                  <input
                    type="url"
                    required
                    value={editCover}
                    onChange={(e) => setEditCover(e.target.value)}
                    className="w-full bg-[#020205]/45 text-white p-3 rounded-xl border border-white/10 focus:outline-none focus:border-luxury-gold font-mono text-[10px]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-zinc-400 block font-bold">Customer Hotline Phone</label>
                  <input
                    type="tel"
                    required
                    value={editPhone}
                    onChange={(e) => setEditPhone(e.target.value)}
                    className="w-full bg-[#020205]/45 text-white p-3 rounded-xl border border-white/10 focus:outline-none focus:border-luxury-gold font-mono"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-zinc-400 block font-bold">Spot Presentation Bio (Description)</label>
                <textarea
                  required
                  rows={2}
                  value={editDesc}
                  onChange={(e) => setEditDesc(e.target.value)}
                  className="w-full bg-[#020205]/45 text-white p-3 rounded-xl border border-white/10 focus:outline-none focus:border-luxury-gold leading-relaxed"
                />
              </div>

              <button
                type="submit"
                disabled={submittingUpdate}
                className="w-full py-3 bg-gradient-to-r from-luxury-teal to-luxury-gold text-white text-xs font-black uppercase rounded-xl tracking-wider transition hover:scale-102 active:scale-95 cursor-pointer disabled:opacity-40 shadow-lg"
              >
                {submittingUpdate ? 'Saving Portfolio...' : 'Save Portfolio Configurations 💾'}
              </button>
            </form>
          </div>

        </div>

        {/* Brand New Dashboard Segment: Search & Manage My Posts Archive */}
        <div className="bg-[#141417] border border-white/5 rounded-3xl p-6 space-y-5 relative">
          <div className="absolute top-0 left-0 w-36 h-36 bg-[#0F2E2F]/10 rounded-full blur-[80px] pointer-events-none"></div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-4">
            <div>
              <h3 className="text-sm font-black text-white uppercase flex items-center gap-2">
                <FileText className="w-4.5 h-4.5 text-luxury-gold" />
                <span>{currentLang === 'en' ? 'Manage My Published Stories & Updates' : 'أرشيف منشوراتي وعروضي النشطة'}</span>
              </h3>
              <p className="text-[11px] text-zinc-400 mt-1">
                {currentLang === 'en' 
                  ? 'Real-time look up, quick inline content corrections, or deletions of your brand campaigns.'
                  : 'تتبع حملاتك، عدّل النصوص والخصومات أو احذف الإعلانات المنتهية الصلاحية فوراً.'}
              </p>
            </div>

            {/* Past Posts Search Field */}
            <div className="w-full sm:w-64">
              <input
                type="text"
                value={ownerSearch}
                onChange={(e) => setOwnerSearch(e.target.value)}
                placeholder={currentLang === 'en' ? 'Search past broadcasts...' : 'ابحث في منشوراتي...'}
                className="w-full bg-[#020205]/65 text-white/95 px-3.5 py-2 text-[11px] rounded-xl border border-white/10 focus:outline-none focus:border-luxury-gold"
              />
            </div>
          </div>

          {/* List of matching Owner Posts */}
          <div className="space-y-4">
            {(() => {
              const myPastPosts = posts.filter(p => p.businessId === myBusiness?.id || p.authorUid === user?.uid);
              const searchedPosts = myPastPosts.filter(p => {
                const query = ownerSearch.toLowerCase().trim();
                if (!query) return true;
                const caption = (p.caption[currentLang] || p.caption.en || '').toLowerCase();
                const promo = (p.promotionBadge?.[currentLang] || p.promotionBadge?.en || '').toLowerCase();
                return caption.includes(query) || promo.includes(query);
              });

              if (searchedPosts.length === 0) {
                return (
                  <div className="text-center py-8 bg-[#020205]/20 border border-white/5 rounded-2xl">
                    <p className="text-xs text-zinc-500">
                      {currentLang === 'en' 
                        ? 'No active campaign broadcasts found matching your search. Try posting above!' 
                        : 'لم يتم العثور على أي منشورات تطابق البحث. ابدأ ببث قصتك الأولى الآن!'}
                    </p>
                  </div>
                );
              }

              return searchedPosts.map((post) => {
                const isEditingThis = editingPostId === post.id;
                
                const handleSaveClick = () => {
                  if (posts && setPosts) {
                    (setPosts as any)(prev => prev.map((p: any) => p.id !== post.id ? p : {
                      ...p,
                      caption: { ...p.caption, [currentLang]: editPostCaption.trim() },
                      promotionBadge: editPostPromo.trim() ? {
                        ar: editPostPromo.trim(),
                        ku: editPostPromo.trim(),
                        en: editPostPromo.trim()
                      } : p.promotionBadge
                    }));
                  }
                  setEditingPostId(null);
                };

                const handleDeleteClick = () => {
                  if (window.confirm(currentLang === 'en' ? 'Permanently delete this specific broadcast from Saku Maku?' : 'هل أنت متأكد من حذف هذا المنشور نهائياً من شكو ماكو؟')) {
                    setIsDeletingPostId(post.id);
                    if (posts && setPosts) {
                      (setPosts as any)(prev => prev.filter((p: any) => p.id !== post.id));
                    }
                    setIsDeletingPostId(null);
                  }
                };

                const startEditingThis = () => {
                  setEditingPostId(post.id);
                  setEditPostCaption(post.caption[currentLang] || post.caption.en || '');
                  setEditPostPromo(post.promotionBadge?.[currentLang] || post.promotionBadge?.en || '');
                };

                return (
                  <div key={post.id} className="p-4 bg-white/5 border border-white/5 rounded-2xl flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
                    <div className="flex gap-3 items-start w-full md:max-w-xl">
                      <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-white/10 bg-[#020205]">
                        <img 
                          src={post.mediaUrl || 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=100&auto=format&fit=crop&q=80'} 
                          alt="post media"
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>

                      <div className="space-y-1.5 w-full text-left">
                        {/* Status elements */}
                        <div className="flex items-center gap-2">
                          <span className="text-[9px] font-mono font-bold text-zinc-500">
                            ⏳ {post.timeAgo[currentLang] || post.timeAgo.en}
                          </span>
                          {post.promotionBadge && !isEditingThis && (
                            <span className="text-[9px] bg-amber-500/15 text-amber-500 font-extrabold px-1.5 py-0.5 rounded border border-amber-500/25">
                              🏷️ {post.promotionBadge[currentLang] || post.promotionBadge.en}
                            </span>
                          )}
                        </div>

                        {isEditingThis ? (
                          <div className="space-y-2 mt-1 w-full">
                            <input
                              type="text"
                              value={editPostCaption}
                              onChange={(e) => setEditPostCaption(e.target.value)}
                              placeholder="Edit caption..."
                              className="w-full text-xs text-white bg-black/50 p-2 rounded-lg border border-white/10 focus:outline-none focus:border-luxury-gold font-medium"
                            />
                            <input
                              type="text"
                              value={editPostPromo}
                              onChange={(e) => setEditPostPromo(e.target.value)}
                              placeholder="Edit promotion text (option)..."
                              className="w-full text-[11px] text-amber-400 bg-black/50 p-2 rounded-lg border border-white/10 focus:outline-none focus:border-luxury-gold"
                            />
                          </div>
                        ) : (
                          <p className="text-xs text-white leading-relaxed font-medium line-clamp-2">
                            {post.caption[currentLang] || post.caption.en}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Dashboard Action panel */}
                    <div className="flex items-center gap-2 w-full md:w-auto shrink-0 justify-end mt-2 md:mt-0 pt-2 md:pt-0 border-t border-white/5 md:border-0">
                      {isEditingThis ? (
                        <>
                          <button
                            onClick={handleSaveClick}
                            className="px-3.5 py-1.5 rounded-lg bg-green-500 hover:bg-green-600 text-[#1A1A1A] text-[10px] uppercase font-black cursor-pointer transition"
                          >
                            💾 {currentLang === 'en' ? 'Save' : 'حفظ'}
                          </button>
                          <button
                            onClick={() => setEditingPostId(null)}
                            className="px-3.5 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-[10px] uppercase font-black cursor-pointer transition"
                          >
                            {currentLang === 'en' ? 'Cancel' : 'ملغي'}
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={startEditingThis}
                            className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 text-[10px] uppercase font-bold cursor-pointer transition flex items-center gap-1"
                          >
                            ✏️ {currentLang === 'en' ? 'Edit' : 'تعديل'}
                          </button>
                          <button
                            disabled={isDeletingPostId === post.id}
                            onClick={handleDeleteClick}
                            className="px-3 py-1.5 rounded-lg bg-red-950/40 hover:bg-red-900 border border-red-500/30 text-red-300 text-[10px] uppercase font-bold cursor-pointer transition flex items-center gap-1 disabled:opacity-45"
                          >
                            🗑️ {isDeletingPostId === post.id ? 'Deleting...' : (currentLang === 'en' ? 'Delete' : 'حذف')}
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                );
              });
            })()}
          </div>
        </div>

      </div>
    );
  }

  // STANDARD VISITOR FORM - List your highstreet business claims
  return (
    <div className="w-full max-w-xl mx-auto bg-white/5 border border-white/10 rounded-[28px] p-6 md:p-8 relative overflow-hidden shadow-xl" dir={isRtl ? 'rtl' : 'ltr'}>
      <div className="absolute top-0 right-0 w-44 h-44 bg-gradient-to-tr from-[#0F2E2F]/20 to-[#C8A95F]/10 rounded-full blur-2xl pointer-events-none"></div>

      <div className="relative z-10 space-y-6">
        
        {/* Header segment of standard claim list spot form */}
        <div className="border-b border-zinc-900/40 pb-4">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-luxury-teal to-luxury-gold flex items-center justify-center text-white mb-3.5 shadow-md">
            <Store className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-xl font-extrabold text-white leading-tight">
            {t.addBusinessTitle}
          </h2>
          <p className="text-xs text-zinc-400 mt-1.5 leading-relaxed">
            {t.addBusinessSubtitle}
          </p>
        </div>

        {/* Action success alert container */}
        <AnimatePresence>
          {success && (
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="p-4 bg-emerald-950/40 border border-emerald-500/20 text-emerald-400 rounded-2xl flex items-start gap-2.5"
            >
              <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold font-sans">Shko Maku Host Success!</h4>
                <p className="text-[11px] text-emerald-400/80 mt-0.5 leading-relaxed font-semibold">
                  {t.successMsg}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Input submission Form fields elements */}
        <form onSubmit={handleSubmitClaim} className="space-y-4 text-xs font-medium">
          
          <div className="space-y-1.5">
            <label className="text-zinc-400 font-bold block">{t.formBizName}</label>
            <input
              type="text"
              placeholder="e.g. Damascus Jasmine Cafe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-[#020205]/45 hover:bg-[#020205]/85 text-white p-3 rounded-xl border border-white/10 focus:outline-none focus:border-luxury-gold"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            
            <div className="space-y-1.5">
              <label className="text-zinc-400 font-bold block">{t.formCategory}</label>
              <div className="relative">
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-[#020205]/45 hover:bg-[#020205]/85 text-white p-3 rounded-xl border border-white/10 focus:outline-none focus:border-luxury-gold appearance-none cursor-pointer"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.icon} {cat.name[currentLang]}
                    </option>
                  ))}
                </select>
                <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none">
                  <ChevronDown className="w-4 h-4" />
                </div>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-zinc-400 font-bold block">{t.formGov}</label>
              <div className="relative">
                <select
                  value={governorate}
                  onChange={(e) => setGovernorate(e.target.value as GovernorateCode)}
                  className="w-full bg-[#020205]/45 hover:bg-[#020205]/85 text-white p-3 rounded-xl border border-white/10 focus:outline-none focus:border-luxury-gold appearance-none cursor-pointer"
                >
                  {GOVERNORATES.filter(g => g.code !== 'all').map((gov) => (
                    <option key={gov.code} value={gov.code}>
                      {gov.name[currentLang]}
                    </option>
                  ))}
                </select>
                <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none">
                  <ChevronDown className="w-4 h-4" />
                </div>
              </div>
            </div>

          </div>

          <div className="space-y-1.5">
            <label className="text-zinc-400 font-bold block">{t.formPhone}</label>
            <div className="relative">
              <input
                type="tel"
                placeholder="e.g. +9647701234567"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-[#020205]/45 hover:bg-[#020205]/85 text-white p-3 pl-10 rounded-xl border border-white/10 focus:outline-none focus:border-luxury-gold font-mono"
              />
              <Phone className="w-3.5 h-3.5 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-zinc-400 font-bold block">{t.formAddress}</label>
            <div className="relative">
              <input
                type="text"
                placeholder="e.g. Karada Inside, near old library"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full bg-[#020205]/45 hover:bg-[#020205]/85 text-white p-3 pl-10 rounded-xl border border-white/10 focus:outline-none focus:border-luxury-gold"
                required
              />
              <Navigation className="w-3.5 h-3.5 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-zinc-400 font-bold block">{t.formImage}</label>
            <div className="relative">
              <input
                type="url"
                placeholder="e.g. https://images.unsplash.com/... (optional)"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="w-full bg-[#020205]/45 hover:bg-[#020205]/85 text-white p-3 pl-10 rounded-xl border border-white/10 focus:outline-none focus:border-luxury-gold font-mono"
              />
              <ImageIcon className="w-3.5 h-3.5 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-zinc-400 font-bold block">{t.formDesc}</label>
            <textarea
              placeholder="Tell our youth why they should visit. Mention menu specialties or music ambiance!"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-[#020205]/45 hover:bg-[#020205]/85 text-white p-3 rounded-xl border border-white/10 focus:outline-none focus:border-luxury-gold leading-relaxed"
              required
            ></textarea>
          </div>

          {/* Submit Claim and Auto Upgrade */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-luxury-teal to-luxury-gold text-white text-xs font-black shadow-lg shadow-[#FF6B4A]/10 cursor-pointer transition duration-300 uppercase tracking-widest flex items-center justify-center gap-1.5"
          >
            <Sparkles className="w-4 h-4 text-white shrink-0 animate-bounce" />
            <span>{t.btnSubmit}</span>
          </motion.button>

        </form>

      </div>

    </div>
  );
}
