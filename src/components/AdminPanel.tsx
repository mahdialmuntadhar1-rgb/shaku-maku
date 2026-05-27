import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldCheck, Lock, LogOut, CheckCircle, Trash2, 
  Sparkles, Layers, Eye, Users, FileText, BarChart3, Star, AlertCircle,
  Edit, Save, Plus, ChevronDown, CheckCircle2, Smartphone, ShieldAlert,
  Award, RefreshCw
} from 'lucide-react';
import { Language, GovernorateCode, Business, SocialPost, UserProfile, HeroSlide, BusinessClaim } from '../types';
import { CATEGORIES, GOVERNORATES, HERO_SLIDES } from '../data';
import { db } from '../firebase';
import { collection, doc, setDoc, updateDoc, deleteDoc, onSnapshot } from 'firebase/firestore';

interface AdminPanelProps {
  currentLang: Language;
  businesses: Business[];
  setBusinesses: React.Dispatch<React.SetStateAction<Business[]>>;
  posts: SocialPost[];
  setPosts: React.Dispatch<React.SetStateAction<SocialPost[]>>;
  userProfile?: UserProfile | null;
}

export default function AdminPanel({
  currentLang,
  businesses,
  setBusinesses,
  posts,
  setPosts,
  userProfile
}: AdminPanelProps) {
  // Login auth state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Auto-auth if active account is designated system administrator
  const isAdminSession = userProfile?.role === 'admin';
  const isFullyUnlocked = isAuthenticated || isAdminSession;

  // Active Admin command hub tab
  const [adminTab, setAdminTab] = useState<'stats' | 'businesses' | 'posts' | 'hero' | 'claims'>('stats');

  // Real-time Firestore sync of slider segments
  const [heroSlides, setHeroSlides] = useState<HeroSlide[]>([]);
  const [loadingSlides, setLoadingSlides] = useState(false);
  const [claims, setClaims] = useState<BusinessClaim[]>([]);
  const [loadingClaims, setLoadingClaims] = useState(false);

  // Edit / Add Slide parameters
  const [editingSlideId, setEditingSlideId] = useState<string | null>(null);
  const [slideSloganAr, setSlideSloganAr] = useState('');
  const [slideSloganKu, setSlideSloganKu] = useState('');
  const [slideSloganEn, setSlideSloganEn] = useState('');
  const [slideImage, setSlideImage] = useState('');
  const [slideGov, setSlideGov] = useState<GovernorateCode>('baghdad');
  const [slideCategory, setSlideCategory] = useState('coffee');
  const [slideBadgeAr, setSlideBadgeAr] = useState('');
  const [slideBadgeKu, setSlideBadgeKu] = useState('');
  const [slideBadgeEn, setSlideBadgeEn] = useState('');
  const [slideSuccess, setSlideSuccess] = useState(false);

  // Business editing parameters
  const [editingBizId, setEditingBizId] = useState<string | null>(null);
  const [bizEditName, setBizEditName] = useState('');
  const [bizEditDesc, setBizEditDesc] = useState('');
  const [bizEditAddress, setBizEditAddress] = useState('');
  const [bizEditPhone, setBizEditPhone] = useState('');
  const [bizEditCover, setBizEditCover] = useState('');
  const [bizEditCategory, setBizEditCategory] = useState('');

  // Post editing parameters
  const [editingPostId, setEditingPostId] = useState<string | null>(null);
  const [postEditCaption, setPostEditCaption] = useState('');
  const [postEditPromo, setPostEditPromo] = useState('');
  const [postEditMedia, setPostEditMedia] = useState('');

  // Sync slides on admin load
  useEffect(() => {
    if (!isFullyUnlocked) return;
    setLoadingSlides(true);
    const ref = collection(db, 'hero_slides');
    const unsub = onSnapshot(ref, (snap) => {
      if (snap.empty) {
        setHeroSlides(HERO_SLIDES);
      } else {
        const list: HeroSlide[] = [];
        snap.forEach((doc) => {
          list.push(doc.data() as HeroSlide);
        });
        setHeroSlides(list);
      }
      setLoadingSlides(false);
    }, (err) => {
      console.error("Error fetching slides inside Admin: ", err);
      setHeroSlides(HERO_SLIDES);
      setLoadingSlides(false);
    });
    return () => unsub();
  }, [isFullyUnlocked]);

  // Sync business owner claims on admin load
  useEffect(() => {
    if (!isFullyUnlocked) return;
    setLoadingClaims(true);
    const ref = collection(db, 'business_claims');
    const unsub = onSnapshot(ref, (snap) => {
      const list: BusinessClaim[] = [];
      snap.forEach((doc) => {
        list.push(doc.data() as BusinessClaim);
      });
      setClaims(list);
      setLoadingClaims(false);
    }, (err) => {
      console.error("Error fetching claims inside Admin: ", err);
      setLoadingClaims(false);
    });
    return () => unsub();
  }, [isFullyUnlocked]);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim() === 'admin' && password === 'admin123') {
      setIsAuthenticated(true);
      setErrorMsg('');
    } else {
      setErrorMsg(
        currentLang === 'en' 
          ? 'Invalid Credentials! Use username "admin" & password "admin123".' 
          : 'بيانات غير صحيحة! يرجى استخدام اسم "admin" وكلمة مرور "admin123" للدخول.'
      );
    }
  };

  // Business operations
  const handleToggleVerify = async (biz: Business) => {
    try {
      const bizRef = doc(db, 'businesses', biz.id);
      await updateDoc(bizRef, { isVerified: !biz.isVerified });
    } catch (err) {
      console.error(err);
    }
  };

  const deleteBiz = async (bizId: string) => {
    if (window.confirm('Are you absolute sure you want to remove this local business listing from Saku Maku?')) {
      try {
        await deleteDoc(doc(db, 'businesses', bizId));
      } catch (err) {
        console.error(err);
      }
    }
  };

  const startEditBiz = (biz: Business) => {
    setEditingBizId(biz.id);
    setBizEditName(biz.name[currentLang] || biz.name.en || '');
    setBizEditDesc(biz.description[currentLang] || biz.description.en || '');
    setBizEditAddress(biz.address[currentLang] || biz.address.en || '');
    setBizEditPhone(biz.phoneNumber || '');
    setBizEditCover(biz.image);
    setBizEditCategory(biz.category);
  };

  const saveEditedBiz = async () => {
    if (!editingBizId) return;
    try {
      const bizRef = doc(db, 'businesses', editingBizId);
      const bizObj = businesses.find(b => b.id === editingBizId);
      if (!bizObj) return;

      await updateDoc(bizRef, {
        name: { ...bizObj.name, [currentLang]: bizEditName.trim() },
        description: { ...bizObj.description, [currentLang]: bizEditDesc.trim() },
        address: { ...bizObj.address, [currentLang]: bizEditAddress.trim() },
        phoneNumber: bizEditPhone.trim(),
        image: bizEditCover.trim(),
        category: bizEditCategory
      });
      setEditingBizId(null);
    } catch (err) {
      console.error(err);
    }
  };

  // Post operations
  const deletePost = async (postId: string) => {
    if (window.confirm('Delete this user post from the live Social Pulse feed stream immediately?')) {
      try {
        await deleteDoc(doc(db, 'posts', postId));
      } catch (err) {
        console.error(err);
      }
    }
  };

  const startEditPost = (post: SocialPost) => {
    setEditingPostId(post.id);
    setPostEditCaption(post.caption[currentLang] || post.caption.en || '');
    setPostEditPromo(post.promotionBadge?.[currentLang] || post.promotionBadge?.en || '');
    setPostEditMedia(post.mediaUrl);
  };

  const saveEditedPost = async () => {
    if (!editingPostId) return;
    try {
      const postRef = doc(db, 'posts', editingPostId);
      const postObj = posts.find(p => p.id === editingPostId);
      if (!postObj) return;

      await updateDoc(postRef, {
        caption: { ...postObj.caption, [currentLang]: postEditCaption.trim() },
        promotionBadge: postEditPromo.trim() ? { 
          ar: postEditPromo.trim(), 
          ku: postEditPromo.trim(), 
          en: postEditPromo.trim() 
        } : null,
        mediaUrl: postEditMedia.trim()
      });
      setEditingPostId(null);
    } catch (err) {
      console.error(err);
    }
  };

  // Business claim operations
  const handleApproveClaim = async (claim: BusinessClaim) => {
    try {
      // 1) Update claim status to 'approved'
      await updateDoc(doc(db, 'business_claims', claim.id), { status: 'approved' });
      
      // 2) Update direct business document to link the owner and verify it
      await updateDoc(doc(db, 'businesses', claim.businessId), {
        ownerUid: claim.userId,
        isVerified: true,
        phoneNumber: claim.userPhone
      });

      // 3) Create verified business_owners document
      const ownerRecordId = `owner-${claim.userId}-${claim.businessId}`;
      await setDoc(doc(db, 'business_owners', ownerRecordId), {
        id: ownerRecordId,
        userId: claim.userId,
        businessId: claim.businessId,
        role: 'owner',
        verified: true,
        createdAt: new Date().toISOString()
      });

      // 4) Update user profile representation to 'owner'
      const userRef = doc(db, 'users', claim.userId);
      await updateDoc(userRef, {
        role: 'owner',
        onboarded: true,
        businessId: claim.businessId
      });

      alert("Claim successfully approved! Ownership verified and dashboard unlocked.");
    } catch (e) {
      console.error("fault approving claim: ", e);
      alert("Error approving claim.");
    }
  };

  const handleRejectClaim = async (claimId: string) => {
    try {
      await updateDoc(doc(db, 'business_claims', claimId), { status: 'rejected' });
      alert("Claim successfully rejected.");
    } catch (e) {
      console.error(e);
      alert("Error rejecting claim.");
    }
  };

  const handleRevokeClaim = async (businessId: string, ownerUid: string) => {
    if (!window.confirm("Are you absolutely sure you want to revoke ownership? This will unlink the merchant and lock their dashboard.")) return;
    try {
      // 1) Disassociate standard ownerUid in business listing
      await updateDoc(doc(db, 'businesses', businessId), {
        ownerUid: '',
        isVerified: false
      });

      // 2) Disassociate owner profile in user collection
      const userRef = doc(db, 'users', ownerUid);
      await updateDoc(userRef, {
        role: 'user',
        businessId: null,
        onboarded: false
      });

      // 3) Wipe audit history claims
      const claimId = `claim-${businessId}-${ownerUid}`;
      await deleteDoc(doc(db, 'business_claims', claimId));

      // 4) Wipe owner record
      const ownerRecordId = `owner-${ownerUid}-${businessId}`;
      await deleteDoc(doc(db, 'business_owners', ownerRecordId));

      alert("Ownership revoked successfully. Profile returned to default guest status.");
    } catch (e) {
      console.error("revoke ownership err: ", e);
      alert("Error revoking ownership.");
    }
  };

  // Hero operations
  const saveEditedSlide = async (slideId: string) => {
    try {
      const slideRef = doc(db, 'hero_slides', slideId);
      await setDoc(slideRef, {
        id: slideId,
        image: slideImage.trim(),
        slogan: { ar: slideSloganAr.trim(), ku: slideSloganKu.trim(), en: slideSloganEn.trim() },
        governorate: slideGov,
        category: slideCategory,
        badge: { ar: slideBadgeAr.trim(), ku: slideBadgeKu.trim(), en: slideBadgeEn.trim() }
      }, { merge: true });
      setEditingSlideId(null);
      setSlideSuccess(true);
      setTimeout(() => setSlideSuccess(false), 3000);
    } catch (err) {
      console.error("Error saving slide info: ", err);
    }
  };

  const deleteSlide = async (slideId: string) => {
    if (window.confirm('Delete this specific banner slider from Saku Maku?')) {
      try {
        await deleteDoc(doc(db, 'hero_slides', slideId));
      } catch (err) {
        console.error(err);
      }
    }
  };

  const addNewSlide = async () => {
    const newId = `slide-dyn-${Date.now()}`;
    try {
      const slideRef = doc(db, 'hero_slides', newId);
      const sample = {
        id: newId,
        image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=1200&auto=format&fit=crop&q=80',
        slogan: {
          ar: 'جديد: الذوق العراقي الأصيل يجمعنا 🍕',
          ku: 'نوێ: تامی ڕەسەنی عێراقی کۆمان دەکاتەوە 🍕',
          en: 'New: Authentic Iraqi flavours connect us! 🍕'
        },
        governorate: 'baghdad' as GovernorateCode,
        category: 'restaurant',
        badge: {
          ar: 'بث خاص 🌶️',
          ku: 'پۆستی تایبەت 🌶️',
          en: 'Official Spot 🌶️'
        }
      };
      await setDoc(slideRef, sample);
      // Automatically open editing mode for the new slide
      setEditingSlideId(newId);
      setSlideImage(sample.image);
      setSlideSloganAr(sample.slogan.ar);
      setSlideSloganKu(sample.slogan.ku);
      setSlideSloganEn(sample.slogan.en);
      setSlideGov(sample.governorate);
      setSlideCategory(sample.category);
      setSlideBadgeAr(sample.badge.ar);
      setSlideBadgeKu(sample.badge.ku);
      setSlideBadgeEn(sample.badge.en);
    } catch (err) {
      console.error(err);
    }
  };

  const renderSecurityGateway = () => (
    <div className="max-w-md mx-auto my-12 bg-white/5 border border-white/10 rounded-3xl p-8 relative overflow-hidden backdrop-blur-md shadow-2xl text-left">
      <div className="absolute top-[-30%] left-[-30%] w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-[-30%] right-[-30%] w-64 h-64 bg-pink-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative text-center space-y-6">
        <div className="mx-auto w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-550 to-indigo-600 flex items-center justify-center text-white shadow-lg">
          <Lock className="w-7 h-7 text-white" />
        </div>

        <div>
          <span className="text-[10px] text-blue-400 font-extrabold uppercase tracking-widest block font-mono">Saku Maku Platform</span>
          <h2 className="text-xl font-black text-white mt-1">
            {currentLang === 'en' ? 'Administrative Guard' : 'بوابة الإدارة السكيور'}
          </h2>
          <p className="text-xs text-zinc-400 mt-1">
            {currentLang === 'en' 
              ? 'Authorized personnel login required to access moderator panel.' 
              : 'يُرجى تسجيل الدخول للوصول إلى لوحة التحكم والتعديل الشامل.'}
          </p>
        </div>

        {errorMsg && (
          <div className="p-3 bg-red-950/40 border border-red-900/50 rounded-xl text-xs text-red-300 flex items-start gap-2 text-left">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-400" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleLoginSubmit} className="space-y-4 text-left">
          <div className="space-y-1">
            <label className="text-[10px] uppercase font-black text-white/55 block">Admin Username</label>
            <input
              type="text"
              placeholder="e.g. admin"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-black/40 border border-white/15 text-xs px-4 py-3 rounded-xl text-white placeholder-zinc-650 focus:outline-none focus:border-blue-450 transition"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] uppercase font-black text-white/55 block">Security Password</label>
            <input
              type="password"
              placeholder="Enter password..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-black/40 border border-white/15 text-xs px-4 py-3 rounded-xl text-white placeholder-zinc-650 focus:outline-none focus:border-blue-450 transition"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-gradient-to-r from-blue-500 via-indigo-600 to-pink-500 hover:from-blue-400 hover:to-pink-400 text-white font-black text-xs uppercase tracking-wider rounded-xl transition duration-300 shadow-xl cursor-pointer text-center font-mono"
          >
            🔐 Unlock Command Centre
          </button>
        </form>

        <div className="bg-white/5 p-3 rounded-xl border border-white/5 text-center">
          <p className="text-[10px] text-zinc-500 font-medium">
            Developer / Tester Override Hint:<br />
            <span className="font-mono text-zinc-350 font-bold">Use Quick Access Admin Login preset bar at the absolute top of the page! No password required.</span>
          </p>
        </div>
      </div>
    </div>
  );

  if (!isFullyUnlocked) {
    return renderSecurityGateway();
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto px-1 text-left">
      
      {/* Admin Panel Header */}
      <div className="p-6 bg-gradient-to-r from-blue-950/20 via-purple-950/20 to-pink-950/20 border border-white/10 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-4 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-550/40 flex items-center justify-center text-blue-400">
            <ShieldCheck className="w-7 h-7 text-blue-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base md:text-lg font-black text-white">Saku Maku Platform Master Command</h2>
              <span className="text-[9px] bg-blue-550 text-white px-2 py-0.5 rounded-full font-mono uppercase font-bold tracking-wider animate-pulse">
                Moderator Live
              </span>
            </div>
            <p className="text-[11px] text-zinc-400 leading-normal">
              Edit local business catalogs, replace Cinematic Hero slides, oversee public stories pulse stream, and configure platforms branding.
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            setIsAuthenticated(false);
            if (isAdminSession) {
              alert("Please sign out of your administrator account at the top profile dropdown menu to terminate Admin view fully.");
            }
          }}
          className="flex items-center gap-1.5 px-4 py-2 text-xs bg-red-950/30 hover:bg-red-900/50 border border-red-500/25 hover:border-red-500 text-red-200 hover:text-white transition duration-200 rounded-xl cursor-pointer font-bold"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Exit Hub</span>
        </button>
      </div>

      {/* Admin Section Tabs Swiper */}
      <div className="flex flex-wrap items-center gap-2 border-b border-zinc-900 pb-2 w-full">
        <button
          onClick={() => setAdminTab('stats')}
          className={`px-4 py-2.5 rounded-xl border text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
            adminTab === 'stats' 
              ? 'bg-blue-550/15 border-blue-500 text-blue-400 font-black' 
              : 'border-transparent text-zinc-400 hover:text-white'
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          <span>Metrics & Logs</span>
        </button>

        <button
          onClick={() => setAdminTab('hero')}
          className={`px-4 py-2.5 rounded-xl border text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
            adminTab === 'hero' 
              ? 'bg-amber-500/15 border-amber-500 text-amber-400 font-black' 
              : 'border-transparent text-zinc-400 hover:text-white'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>Cinematic Hero Slider ({heroSlides.length})</span>
        </button>

        <button
          onClick={() => setAdminTab('businesses')}
          className={`px-4 py-2.5 rounded-xl border text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
            adminTab === 'businesses'
              ? 'bg-purple-550/15 border-purple-500 text-purple-400 font-black'
              : 'border-transparent text-zinc-400 hover:text-white'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Manage Listings ({businesses.length})</span>
        </button>

        <button
          onClick={() => setAdminTab('posts')}
          className={`px-4 py-2.5 rounded-xl border text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
            adminTab === 'posts'
              ? 'bg-pink-500/15 border-pink-500 text-pink-400 font-black'
              : 'border-transparent text-zinc-400 hover:text-white'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Moderate Social Feeds ({posts.length})</span>
        </button>

        <button
          onClick={() => setAdminTab('claims')}
          className={`px-4 py-2.5 rounded-xl border text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
            adminTab === 'claims'
              ? 'bg-amber-550/15 border-amber-500 text-amber-500 font-black'
              : 'border-transparent text-zinc-400 hover:text-white'
          }`}
        >
          <Smartphone className="w-4 h-4" />
          <span>Claims & Verification ({claims.length})</span>
        </button>
      </div>

      {/* Core Switcher Body */}
      <div>
        {adminTab === 'stats' && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-5 bg-white/5 border border-white/5 rounded-2xl">
                <span className="text-[10px] text-zinc-500 tracking-wider font-extrabold uppercase block font-mono">Businesses Listings</span>
                <span className="text-2xl font-black text-white block mt-1.5">{businesses.length}</span>
                <span className="text-[10px] text-zinc-400 block mt-1 font-semibold text-cyan-400">Verified: {businesses.filter(b => b.isVerified).length}</span>
              </div>

              <div className="p-5 bg-white/5 border border-white/5 rounded-2xl">
                <span className="text-[10px] text-zinc-500 tracking-wider font-extrabold uppercase block font-mono">Total Pulse Feeds</span>
                <span className="text-2xl font-black text-white block mt-1.5">{posts.length}</span>
                <span className="text-[10px] text-zinc-400 block mt-1 font-semibold text-emerald-400 font-sans">Interactive community streams</span>
              </div>

              <div className="p-5 bg-white/5 border border-white/5 rounded-2xl">
                <span className="text-[10px] text-zinc-500 tracking-wider font-extrabold uppercase block font-mono">Cinematic slides</span>
                <span className="text-2xl font-black text-white block mt-1.5">{heroSlides.length}</span>
                <span className="text-[10px] text-zinc-400 block mt-1 font-semibold text-amber-500 font-mono">Synced live with Firestore</span>
              </div>

              <div className="p-5 bg-white/5 border border-white/5 rounded-2xl">
                <span className="text-[10px] text-zinc-500 tracking-wider font-extrabold uppercase block font-mono">System Role Profile</span>
                <span className="text-sm font-black text-red-400 block mt-2.5">🛡️ Master Administrator</span>
                <span className="text-[9px] text-zinc-400 block mt-1 font-mono tracking-tighter truncate">{userProfile?.email || 'mahdialmuntadhar1@gmail...'}</span>
              </div>
            </div>

            <div className="p-6 bg-[#141417] border border-white/5 rounded-3xl text-xs text-zinc-400 space-y-3 shrink-0">
              <h4 className="font-extrabold text-white text-sm uppercase">Quick Moderator Manual Guidelines:</h4>
              <p>1. As a platform administrator, you have complete authority to delete or bypass standard validations across the entire application.</p>
              <p>2. Select the <b>Cinematic Hero Slider</b> tab to replace slogans, photos, or hot banner badges in real-time. This updates the frontpage swiper instantly.</p>
              <p>3. Use the <b>Manage Listings</b> or <b>Moderate Social Feeds</b> tabs to edit descriptions, phone numbers, or captions of any post or merchant listing across Iraq's 19 governorates.</p>
            </div>
          </div>
        )}

        {adminTab === 'hero' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-white/5 pb-4">
              <div>
                <h3 className="text-sm font-black text-white uppercase flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" />
                  <span>Cinematic Hero Presentation Slider Controller</span>
                </h3>
                <p className="text-[11px] text-zinc-400 mt-1">
                  Configure text overlays, swap display backgrounds, assign category triggers, and control badging for the primary high-street swiper.
                </p>
              </div>

              <button
                onClick={addNewSlide}
                className="px-4 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 text-black font-black text-xs uppercase rounded-xl tracking-wider transition hover:scale-102 flex items-center gap-1.5 cursor-pointer shadow-lg"
              >
                <Plus className="w-4 h-4 stroke-[3px]" />
                <span>Add New Banner Slide</span>
              </button>
            </div>

            {slideSuccess && (
              <div className="p-3 bg-emerald-950/40 border border-emerald-500/20 text-emerald-400 text-xs rounded-xl flex items-center gap-2">
                <CheckCircle className="w-4 h-4 shrink-0" />
                <span>Slider modifications updated and seeded to Cloud database successfully!</span>
              </div>
            )}

            {loadingSlides ? (
              <div className="text-center py-12 text-zinc-500 text-xs font-mono animate-pulse">Loading live Slider assets...</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {heroSlides.map((slide) => {
                  const isEditing = editingSlideId === slide.id;

                  const triggerStartEdit = () => {
                    setEditingSlideId(slide.id);
                    setSlideImage(slide.image);
                    setSlideSloganAr(slide.slogan.ar);
                    setSlideSloganKu(slide.slogan.ku);
                    setSlideSloganEn(slide.slogan.en);
                    setSlideGov(slide.governorate);
                    setSlideCategory(slide.category);
                    setSlideBadgeAr(slide.badge.ar);
                    setSlideBadgeKu(slide.badge.ku);
                    setSlideBadgeEn(slide.badge.en);
                  };

                  return (
                    <div key={slide.id} className="bg-[#141417] border border-white/5 rounded-3xl overflow-hidden shadow-xl flex flex-col justify-between">
                      <div className="relative w-full h-44 bg-zinc-950">
                        <img 
                          src={isEditing ? slideImage : slide.image} 
                          alt="Slider background review" 
                          className="w-full h-full object-cover select-none"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#141417] via-black/40 to-transparent"></div>
                        
                        {/* Custom Badging floating display */}
                        <div className="absolute top-3 left-3 flex items-center gap-1">
                          <span className="text-[9px] font-black uppercase tracking-wider bg-orange-500 text-black px-2 py-0.5 rounded-full">
                            🏷️ {isEditing ? slideBadgeAr || 'Custom' : slide.badge[currentLang] || slide.badge.en}
                          </span>
                          <span className="text-[9px] font-bold text-white bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-full capitalize font-mono">
                            📍 {isEditing ? slideGov : slide.governorate}
                          </span>
                        </div>
                      </div>

                      <div className="p-5 space-y-4">
                        {isEditing ? (
                          <div className="space-y-4 text-xs font-medium">
                            {/* Editor fields */}
                            <div className="space-y-1">
                              <label className="text-zinc-400 block font-bold">Image URL Background</label>
                              <input 
                                type="url" 
                                value={slideImage} 
                                onChange={(e) => setSlideImage(e.target.value)}
                                className="w-full bg-black/60 text-white p-2 border border-white/10 rounded-lg text-xs font-mono"
                              />
                            </div>

                            <div className="grid grid-cols-1 gap-2.5">
                              <div className="space-y-1">
                                <label className="text-zinc-500 block text-[9px] uppercase font-bold">Slogan (Arabic)</label>
                                <input 
                                  type="text" 
                                  value={slideSloganAr} 
                                  onChange={(e) => setSlideSloganAr(e.target.value)}
                                  className="w-full bg-black/60 text-white p-2 border border-white/10 rounded-lg text-xs font-bold font-sans"
                                />
                              </div>
                              <div className="space-y-1">
                                <label className="text-zinc-500 block text-[9px] uppercase font-bold">Slogan (Kurdish)</label>
                                <input 
                                  type="text" 
                                  value={slideSloganKu} 
                                  onChange={(e) => setSlideSloganKu(e.target.value)}
                                  className="w-full bg-black/60 text-white p-2 border border-white/10 rounded-lg text-xs font-bold font-sans"
                                />
                              </div>
                              <div className="space-y-1">
                                <label className="text-zinc-500 block text-[9px] uppercase font-bold">Slogan (English)</label>
                                <input 
                                  type="text" 
                                  value={slideSloganEn} 
                                  onChange={(e) => setSlideSloganEn(e.target.value)}
                                  className="w-full bg-black/60 text-white p-2 border border-white/10 rounded-lg text-xs font-bold font-sans"
                                />
                              </div>
                            </div>

                            <div className="grid grid-cols-3 gap-2">
                              <div className="space-y-1">
                                <label className="text-zinc-500 block text-[9px] uppercase font-bold font-mono">Badge (AR)</label>
                                <input 
                                  type="text" 
                                  value={slideBadgeAr} 
                                  onChange={(e) => setSlideBadgeAr(e.target.value)}
                                  className="w-full bg-black/60 text-white p-2 border border-white/10 rounded-lg text-xs font-bold font-sans"
                                />
                              </div>
                              <div className="space-y-1">
                                <label className="text-zinc-500 block text-[9px] uppercase font-bold font-mono">Badge (KU)</label>
                                  <input 
                                    type="text" 
                                    value={slideBadgeKu} 
                                    onChange={(e) => setSlideBadgeKu(e.target.value)}
                                    className="w-full bg-black/60 text-white p-2 border border-white/10 rounded-lg text-xs font-bold font-sans"
                                  />
                              </div>
                              <div className="space-y-1">
                                <label className="text-zinc-500 block text-[9px] uppercase font-bold font-mono">Badge (EN)</label>
                                <input 
                                  type="text" 
                                  value={slideBadgeEn} 
                                  onChange={(e) => setSlideBadgeEn(e.target.value)}
                                  className="w-full bg-black/60 text-white p-2 border border-white/10 rounded-lg text-xs font-bold font-sans"
                                />
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                              <div className="space-y-1">
                                <label className="text-zinc-400 block font-bold">Governorate Assign</label>
                                <select 
                                  value={slideGov}
                                  onChange={(e) => setSlideGov(e.target.value as GovernorateCode)}
                                  className="w-full bg-black/60 text-white p-2 border border-white/10 rounded-lg text-xs font-medium"
                                >
                                  {GOVERNORATES.filter(g => g.code !== 'all').map(g => (
                                    <option key={g.code} value={g.code}>{g.name[currentLang]}</option>
                                  ))}
                                </select>
                              </div>

                              <div className="space-y-1">
                                <label className="text-zinc-400 block font-bold font-sans">Filter Category</label>
                                <select 
                                  value={slideCategory}
                                  onChange={(e) => setSlideCategory(e.target.value)}
                                  className="w-full bg-black/60 text-white p-2 border border-white/10 rounded-lg text-xs font-medium"
                                >
                                  {CATEGORIES.map(c => (
                                    <option key={c.id} value={c.id}>{c.icon} {c.name[currentLang]}</option>
                                  ))}
                                </select>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="text-left space-y-3 font-medium">
                            <h4 className="text-xs font-extrabold text-white leading-tight">
                              Slogan Overlay ({currentLang.toUpperCase()}):<br />
                              <span className="text-zinc-300 font-semibold text-xs leading-normal block mt-1">{slide.slogan[currentLang] || slide.slogan.en}</span>
                            </h4>
                            <p className="text-[10px] text-zinc-500 font-mono tracking-normal leading-relaxed">
                              Category Index: <b className="text-[#FF6B4A] uppercase font-sans font-bold">{slide.category}</b> | Slide ID: <b className="text-[#eee]">{slide.id}</b>
                            </p>
                          </div>
                        )}

                        <div className="flex items-center gap-2 pt-3.5 border-t border-white/5 justify-end">
                          {isEditing ? (
                            <>
                              <button
                                onClick={() => saveEditedSlide(slide.id)}
                                className="px-3.5 py-1.5 bg-green-500 hover:bg-green-600 text-black text-[10px] uppercase font-black rounded-lg cursor-pointer transition-all"
                              >
                                💾 Save Changes
                              </button>
                              <button
                                onClick={() => setEditingSlideId(null)}
                                className="px-3.5 py-1.5 bg-zinc-800 text-zinc-300 text-[10px] uppercase font-black rounded-lg cursor-pointer transition-all"
                              >
                                Cancel
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                onClick={triggerStartEdit}
                                className="px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white text-[10px] uppercase font-bold rounded-lg cursor-pointer transition-all flex items-center gap-1 font-sans"
                              >
                                ✏️ Edit Slide
                              </button>
                              <button
                                onClick={() => deleteSlide(slide.id)}
                                className="px-3 py-1.5 bg-red-955 bg-red-900 border border-red-500/20 text-red-200 text-[10px] uppercase font-bold rounded-lg cursor-pointer transition-all flex items-center gap-1 font-sans"
                              >
                                🗑️ Remove
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {adminTab === 'businesses' && (
          <div className="space-y-6">
            <h3 className="text-sm font-black text-white uppercase">Saku Maku Business Catalog Moderation Registry</h3>
            
            <div className="space-y-4">
              {businesses.map((biz) => {
                const isEditingThis = editingBizId === biz.id;

                return (
                  <div key={biz.id} className="p-5 bg-[#141417] border border-white/5 rounded-3xl flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
                    <div className="flex gap-4 items-start w-full md:max-w-xl text-left font-medium">
                      <div className="w-14 h-14 rounded-2xl overflow-hidden shrink-0 border border-white/10 bg-[#020205]">
                        <img 
                          src={isEditingThis ? bizEditCover : biz.image} 
                          alt="Brand cover" 
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>

                      <div className="space-y-1.5 w-full">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className={`text-[9px] font-black px-1.5 py-0.5 rounded uppercase ${
                            biz.isVerified ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/25' : 'bg-zinc-805 bg-zinc-800 text-zinc-500 border border-zinc-700/30'
                          }`}>
                            {biz.isVerified ? 'Verified' : 'Claimable Listing'}
                          </span>
                          <span className="text-[9px] bg-white/5 text-zinc-400 font-bold px-1.5 py-0.5 rounded border border-white/5 uppercase font-mono">
                            📍 {biz.governorate}
                          </span>
                        </div>

                        {isEditingThis ? (
                          <div className="space-y-2.5 mt-2 w-full text-xs font-medium">
                            <div className="grid grid-cols-2 gap-2">
                              <div>
                                <label className="text-zinc-500 block text-[9px] font-bold">Name ({currentLang})</label>
                                <input 
                                  type="text" 
                                  value={bizEditName} 
                                  onChange={(e) => setBizEditName(e.target.value)} 
                                  className="w-full bg-black/60 p-2 text-white border border-white/10 rounded-lg text-xs font-bold"
                                />
                              </div>
                              <div>
                                <label className="text-zinc-500 block text-[9px] font-bold">Cover URL</label>
                                <input 
                                  type="url" 
                                  value={bizEditCover} 
                                  onChange={(e) => setBizEditCover(e.target.value)} 
                                  className="w-full bg-black/60 p-2 text-white border border-white/10 rounded-lg text-xs font-mono"
                                />
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-2">
                              <div>
                                <label className="text-zinc-500 block text-[9px] font-bold">Hotline Phone</label>
                                <input 
                                  type="text" 
                                  value={bizEditPhone} 
                                  onChange={(e) => setBizEditPhone(e.target.value)} 
                                  className="w-full bg-black/60 p-2 text-white border border-white/10 rounded-lg text-xs"
                                />
                              </div>
                              <div>
                                <label className="text-zinc-500 block text-[9px] font-bold">Category Selector</label>
                                <select 
                                  value={bizEditCategory} 
                                  onChange={(e) => setBizEditCategory(e.target.value)} 
                                  className="w-full bg-black/60 p-2 text-white border border-white/10 rounded-lg text-xs cursor-pointer"
                                >
                                  {CATEGORIES.map(c => (
                                    <option key={c.id} value={c.id}>{c.icon} {c.name[currentLang]}</option>
                                  ))}
                                </select>
                              </div>
                            </div>

                            <div>
                              <label className="text-zinc-500 block text-[9px] font-bold">Address ({currentLang})</label>
                              <input 
                                type="text" 
                                value={bizEditAddress} 
                                onChange={(e) => setBizEditAddress(e.target.value)} 
                                className="w-full bg-black/60 p-2 text-white border border-white/10 rounded-lg text-xs font-semibold"
                              />
                            </div>

                            <div>
                              <label className="text-zinc-500 block text-[9px] font-bold font-sans">Description ({currentLang})</label>
                              <textarea 
                                value={bizEditDesc} 
                                onChange={(e) => setBizEditDesc(e.target.value)} 
                                rows={2}
                                className="w-full bg-black/60 p-2 text-white border border-white/10 rounded-lg text-xs leading-normal"
                              />
                            </div>
                          </div>
                      ) : (
                          <>
                            <h4 className="text-sm font-black text-white">{biz.name[currentLang] || biz.name.en}</h4>
                            <p className="text-xs text-zinc-400 max-w-md line-clamp-2 leading-relaxed">
                              {biz.description[currentLang] || biz.description.en}
                            </p>
                            <p className="text-[10px] text-zinc-500 font-mono">
                              📱 {biz.phoneNumber || 'Hotline unlinked'} | Category: <span className="text-luxury-gold uppercase font-sans font-bold">{biz.category}</span>
                            </p>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 pt-2.5 md:pt-0 shrink-0 w-full md:w-auto justify-end border-t border-white/5 md:border-0 md:justify-center">
                      {isEditingThis ? (
                        <>
                          <button
                            onClick={saveEditedBiz}
                            className="px-3 py-1.5 bg-green-500 hover:bg-green-600 text-black text-[10px] uppercase font-black rounded-lg cursor-pointer transition-all"
                          >
                            💾 Save Settings
                          </button>
                          <button
                            onClick={() => setEditingBizId(null)}
                            className="px-3 py-1.5 bg-zinc-800 text-zinc-300 text-[10px] uppercase font-black rounded-lg cursor-pointer transition-all"
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => handleToggleVerify(biz)}
                            className={`px-3 py-1.5 rounded-lg text-[10px] uppercase font-black cursor-pointer transition-all flex items-center gap-1 border ${
                              biz.isVerified 
                                ? 'bg-cyan-950/20 text-cyan-400 border-cyan-500/25 hover:bg-zinc-850' 
                                : 'bg-white/5 hover:bg-white/10 text-zinc-350 border-white/10'
                            }`}
                          >
                            <span>🛡️</span>
                            <span>{biz.isVerified ? 'Unverify' : 'Verify'}</span>
                          </button>

                          <button
                            onClick={() => startEditBiz(biz)}
                            className="px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 text-[10px] uppercase font-bold rounded-lg cursor-pointer transition-all flex items-center gap-1 font-sans"
                          >
                            ✏️ Edit
                          </button>

                          <button
                            onClick={() => deleteBiz(biz.id)}
                            className="px-3 py-1.5 bg-red-955 bg-red-900 border border-red-500/25 text-red-200 text-[10px] uppercase font-bold rounded-lg cursor-pointer transition-all flex items-center gap-1 font-sans"
                          >
                            🗑️ Delete
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {adminTab === 'posts' && (
          <div className="space-y-6">
            <h3 className="text-sm font-black text-white uppercase">Saku Maku Social Pulse Feed Stream Manager</h3>

            <div className="space-y-4 font-medium text-xs">
              {posts.map((post) => {
                const isEditingPost = editingPostId === post.id;

                return (
                  <div key={post.id} className="p-5 bg-[#141417] border border-white/5 rounded-3xl flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
                    <div className="flex gap-4 items-start w-full md:max-w-xl text-left">
                      <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-white/10 bg-[#020205]">
                        <img 
                          src={isEditingPost ? postEditMedia : post.mediaUrl} 
                          alt="Feed visual attachment" 
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>

                      <div className="space-y-1.5 w-full">
                        <div className="flex flex-wrap items-center gap-2 text-[9px] uppercase font-black">
                          <span className="text-luxury-gold tracking-tight">
                            🏢 {post.businessName}
                          </span>
                          <span className="text-zinc-505 text-zinc-400">
                            • ⏳ {post.timeAgo[currentLang] || post.timeAgo.en}
                          </span>
                          {post.promotionBadge && !isEditingPost && (
                            <span className="bg-amber-500/10 text-amber-500 px-1.5 py-0.5 rounded border border-amber-500/20">
                              🏷️ {post.promotionBadge[currentLang] || post.promotionBadge.en}
                            </span>
                          )}
                        </div>

                        {isEditingPost ? (
                          <div className="space-y-2 mt-2 text-xs w-full text-zinc-300">
                            <div>
                              <label className="text-zinc-500 block text-[9px] font-bold font-sans">Caption ({currentLang})</label>
                              <input 
                                type="text"
                                value={postEditCaption}
                                onChange={(e) => setPostEditCaption(e.target.value)}
                                className="w-full bg-black/60 p-2 text-white border border-white/10 rounded-lg text-xs font-semibold"
                              />
                            </div>

                            <div className="grid grid-cols-2 gap-2">
                              <div>
                                <label className="text-zinc-500 block text-[9px] font-bold font-sans">Promotion Badge Overlay</label>
                                <input 
                                  type="text"
                                  value={postEditPromo}
                                  onChange={(e) => setPostEditPromo(e.target.value)}
                                  className="w-full bg-black/60 p-2 text-white border border-white/10 rounded-lg text-xs"
                                />
                              </div>
                              <div>
                                <label className="text-zinc-500 block text-[9px] font-bold">Media Resource Link</label>
                                <input 
                                  type="url"
                                  value={postEditMedia}
                                  onChange={(e) => setPostEditMedia(e.target.value)}
                                  className="w-full bg-black/60 p-2 text-white border border-white/10 rounded-lg text-xs font-mono"
                                />
                              </div>
                            </div>
                          </div>
                        ) : (
                          <p className="text-xs text-white leading-relaxed line-clamp-2">
                            {post.caption[currentLang] || post.caption.en}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 pt-2.5 md:pt-0 shrink-0 w-full md:w-auto justify-end border-t border-white/5 md:border-0 md:justify-center">
                      {isEditingPost ? (
                        <>
                          <button
                            onClick={saveEditedPost}
                            className="px-3.5 py-1.5 bg-green-500 hover:bg-green-600 text-black text-[10px] uppercase font-black rounded-lg cursor-pointer transition-all"
                          >
                            💾 Save Story
                          </button>
                          <button
                            onClick={() => setEditingPostId(null)}
                            className="px-3.5 py-1.5 bg-zinc-800 text-zinc-300 text-[10px] uppercase font-black rounded-lg cursor-pointer transition-all"
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => startEditPost(post)}
                            className="px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 text-[10px] uppercase font-bold rounded-lg cursor-pointer transition-all flex items-center gap-1 font-sans"
                          >
                            ✏️ Edit Story
                          </button>

                          <button
                            onClick={() => deletePost(post.id)}
                            className="px-3 py-1.5 bg-red-955 bg-red-900 border border-red-500/20 text-red-200 text-[10px] uppercase font-bold rounded-lg cursor-pointer transition-all flex items-center gap-1 font-sans"
                          >
                            🗑️ Delete
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {adminTab === 'claims' && (
          <div className="space-y-6">
            {/* Header statistics grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 bg-white/5 border border-white/5 rounded-2xl text-left">
                <span className="text-[10px] text-zinc-500 tracking-wider font-extrabold uppercase block font-mono">Total Registry Claims</span>
                <span className="text-xl font-black text-white block mt-1.5">{claims.length}</span>
              </div>
              <div className="p-4 bg-amber-500/5 border border-amber-500/10 rounded-2xl text-left">
                <span className="text-[10px] text-amber-500 tracking-wider font-extrabold uppercase block font-mono">Pending Verification</span>
                <span className="text-xl font-black text-amber-500 block mt-1.5 font-sans">
                  {claims.filter(c => c.status === 'pending').length}
                </span>
              </div>
              <div className="p-4 bg-red-505 bg-red-950/20 border border-red-500/10 rounded-2xl text-left font-mono">
                <span className="text-[10px] text-red-400 tracking-wider font-extrabold uppercase block">Suspicious Flashes</span>
                <span className="text-xl font-black text-red-400 block mt-1.5">
                  {claims.filter(c => c.isSuspicious && c.status === 'pending').length}
                </span>
              </div>
              <div className="p-4 bg-emerald-505 bg-emerald-950/20 border border-emerald-500/10 rounded-2xl text-left">
                <span className="text-[10px] text-emerald-400 tracking-wider font-extrabold uppercase block font-mono">Approved Merchants</span>
                <span className="text-xl font-black text-emerald-400 block mt-1.5">
                  {claims.filter(c => c.status === 'approved').length}
                </span>
              </div>
            </div>

            {/* List of active highstreet claimant entries */}
            <div className="p-6 bg-[#141417]/95 border border-white/5 rounded-3xl space-y-4">
              <h3 className="text-sm font-black text-white uppercase flex items-center gap-2">
                <Smartphone className="w-4.5 h-4.5 text-luxury-gold" />
                <span>Live Owner Audits & Claim Campaigns</span>
              </h3>

              <div className="space-y-3 font-sans text-left">
                {claims.length === 0 ? (
                  <div className="text-center py-8 text-zinc-500 text-xs">No merchant claims recorded in active platform registry logs.</div>
                ) : (
                  claims.map(claim => {
                    const statusColors = {
                      pending: claim.isSuspicious ? 'bg-red-500/15 text-red-400 border-red-500/25' : 'bg-amber-500/15 text-amber-400 border-amber-500/25',
                      approved: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/25',
                      rejected: 'bg-zinc-800 text-zinc-400 border-white/5'
                    }[claim.status] || 'bg-zinc-800 text-zinc-400 border-white/5';

                    return (
                      <div key={claim.id} className="p-4 bg-white/5 border border-white/5 rounded-2xl flex flex-col md:flex-row gap-4 justify-between items-start md:items-center text-xs">
                        <div className="space-y-1.5 max-w-xl text-left font-medium">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-[10px] font-black text-white font-sans">Claimant: {claim.userPhone}</span>
                            <span className={`text-[9.5px] font-black px-1.5 py-0.5 rounded border uppercase font-mono ${statusColors}`}>
                              {claim.status} {claim.isSuspicious && claim.status === 'pending' ? '(Flagged)' : ''}
                            </span>
                          </div>

                          <h4 className="text-white font-black leading-tight">
                            Linked Business: {claim.businessName[currentLang] || claim.businessName.en || 'Unknown spot'}
                          </h4>

                          <p className="text-[10.5px] text-zinc-450 font-mono">
                            User UID: <span className="text-zinc-500 font-bold">{claim.userId}</span> | Created: {new Date(claim.createdAt).toLocaleString()}
                          </p>

                          {claim.isSuspicious && (
                            <div className="mt-1.5 p-2 bg-red-950/40 border border-red-500/20 rounded-xl text-[10px] text-red-300 flex items-start gap-1.5 font-sans leading-normal">
                              <ShieldAlert className="w-3.5 h-3.5 mt-0.5 shrink-0 text-red-400" />
                              <span>Audit Hold Reason: {claim.suspiciousReason}</span>
                            </div>
                          )}
                        </div>

                        {/* Action controllers */}
                        <div className="flex items-center gap-2 pt-2 md:pt-0 shrink-0 w-full md:w-auto justify-end border-t border-white/5 md:border-0 font-sans font-bold">
                          {claim.status === 'pending' ? (
                            <>
                              <button
                                onClick={() => handleApproveClaim(claim)}
                                className="px-3 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-black text-[10px] font-black uppercase rounded-lg cursor-pointer transition-all flex items-center gap-1"
                              >
                                <span>Approve Claims</span>
                              </button>
                              <button
                                onClick={() => handleRejectClaim(claim.id)}
                                className="px-3 py-1.5 bg-zinc-850 hover:bg-zinc-800 border border-white/10 text-zinc-350 text-[10px] font-black uppercase rounded-lg cursor-pointer transition-all"
                              >
                                Reject
                              </button>
                            </>
                          ) : (
                            <span className="text-[10px] text-zinc-550 font-mono">Audited Claims Process</span>
                          )}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {/* Ownership and Revocations Panel */}
            <div className="p-6 bg-[#141417]/95 border border-white/5 rounded-3xl space-y-4">
              <h3 className="text-sm font-black text-white uppercase flex items-center gap-2">
                <Award className="w-4.5 h-4.5 text-luxury-gold" />
                <span>Registry Verified Merchants & Revocations ({businesses.filter(b => b.ownerUid).length})</span>
              </h3>

              <div className="space-y-2 text-left font-sans">
                {businesses.filter(b => b.ownerUid).length === 0 ? (
                  <div className="text-center py-6 text-zinc-450 text-xs font-semibold">No active verified owner associations in current listings database.</div>
                ) : (
                  businesses.filter(b => b.ownerUid).map(biz => (
                    <div key={biz.id} className="p-3 bg-white/5 border border-white/5 rounded-xl flex items-center justify-between text-xs font-semibold">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded overflow-hidden">
                          <img src={biz.avatar} alt="Logo" className="w-full h-full object-cover" />
                        </div>
                        <div className="text-left font-sans">
                          <h4 className="font-extrabold text-white">{biz.name[currentLang] || biz.name.en}</h4>
                          <p className="text-[10px] text-zinc-450 font-mono">Owner UID: {biz.ownerUid}</p>
                        </div>
                      </div>

                      <button
                        onClick={() => handleRevokeClaim(biz.id, biz.ownerUid!)}
                        className="px-3 py-1 bg-red-950/30 hover:bg-red-900 border border-red-500/20 text-red-200 text-[10px] font-bold rounded-lg cursor-pointer transition"
                      >
                        Revoke Ownership
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>

          </div>
        )}
      </div>

    </div>
  );
}
