import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Store, ChevronDown, CheckCircle, Navigation, Phone, 
  Info, Image as ImageIcon, Sparkles, Heart, Bookmark, 
  FileText, Award, ShieldCheck, Flame, Search, Smartphone, ShieldAlert,
  Clock, Check, Eye, Trash2, Send, Edit, AlertTriangle, HelpCircle, Key,
  CheckCircle2, PlusCircle, Users, BarChart3, ArrowRight, MapPin, Share2, Compass, CheckSquare,
  LayoutDashboard
} from 'lucide-react';
import { Business, Language, GovernorateCode, UserProfile, SocialPost, BusinessClaim } from '../types';
import { GOVERNORATES, CATEGORIES } from '../data';
import { doc, updateDoc, setDoc, collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase';

// Import newly created modular components
import BusinessCard from './BusinessCard';
import OTPInput from './OTPInput';
import ClaimFlowLayout from './ClaimFlowLayout';
import EmptyState from './EmptyState';
import MediaUploader from './MediaUploader';
import DashboardSidebar, { DashboardTab } from './DashboardSidebar';
import StatsCard from './StatsCard';
import LoadingSkeletons from './LoadingSkeletons';

interface AddBusinessFormProps {
  currentLang: Language;
  onAddBusiness: (newBiz: Omit<Business, 'rating' | 'reviewsCount' | 'likes' | 'saves'>) => void;
  user: any;
  userProfile: UserProfile | null;
  onUpdateProfile: (updated: Partial<UserProfile>) => Promise<void>;
  onSignIn: () => void;
  businesses: Business[];
  posts?: SocialPost[];
}

export default function AddBusinessForm({ 
  currentLang, 
  onAddBusiness, 
  user, 
  userProfile, 
  onUpdateProfile, 
  onSignIn,
  businesses,
  posts = []
}: AddBusinessFormProps) {
  
  const isRtl = currentLang === 'ar' || currentLang === 'ku';

  // Core operational path
  const [activePath, setActivePath] = useState<'welcome' | 'claim' | 'add_spot'>('welcome');
  
  // Claim states: 'phone' -> 'searching' -> 'select_business' -> 'otp' -> 'suspicious_hold' | 'success'
  const [claimStep, setClaimStep] = useState<'phone' | 'searching' | 'select_business' | 'otp' | 'suspicious_hold' | 'success'>('phone');
  
  // Interactive Claim State Trackers
  const [phoneCountry, setPhoneCountry] = useState('+964');
  const [phoneNumberInput, setPhoneNumberInput] = useState('');
  const [isPhoneValidated, setIsPhoneValidated] = useState(false);
  const [matchedBusinesses, setMatchedBusinesses] = useState<Business[]>([]);
  const [selectedBizForClaim, setSelectedBizForClaim] = useState<Business | null>(null);
  
  // Search parameters for Multiple Selection
  const [claimSearch, setClaimSearch] = useState('');
  const [claimGovFilter, setClaimGovFilter] = useState<GovernorateCode>('all');
  const [claimCatFilter, setClaimCatFilter] = useState<string>('all');

  // Manual contributors adding states
  const [standardName, setStandardName] = useState('');
  const [standardDesc, setStandardDesc] = useState('');
  const [standardCategory, setStandardCategory] = useState('cafe_bakery');
  const [standardGov, setStandardGov] = useState<GovernorateCode>('baghdad');
  const [standardPhone, setStandardPhone] = useState('');
  const [standardAddress, setStandardAddress] = useState('');
  const [standardImageUrl, setStandardImageUrl] = useState('');
  const [standardSuccess, setStandardSuccess] = useState(false);

  // Active Merchant Dashboard Tab Selection
  const [activeDashTab, setActiveDashTab] = useState<DashboardTab>('overview');

  // Edit fields for active owned businesses
  const [editName, setEditName] = useState('');
  const [editDesc, setEditDesc] = useState('');
  const [editPhone, setEditPhone] = useState('');
  const [editAddress, setEditAddress] = useState('');
  const [editCover, setEditCover] = useState('');
  const [editCategory, setEditCategory] = useState('');
  const [editGov, setEditGov] = useState<GovernorateCode>('baghdad');
  const [editWhatsApp, setEditWhatsApp] = useState('');
  const [editFacebook, setEditFacebook] = useState('');
  const [editInstagram, setEditInstagram] = useState('');
  const [uploadingGallery, setUploadingGallery] = useState<string[]>([]);
  
  // Opening hours tracker
  const [openingHours, setOpeningHours] = useState<Record<string, string>>({
    Monday: '09:00 - 23:00',
    Tuesday: '09:00 - 23:00',
    Wednesday: '09:00 - 23:00',
    Thursday: '09:00 - 00:00',
    Friday: '13:00 - 01:00',
    Saturday: '09:00 - 00:00',
    Sunday: '09:00 - 23:00'
  });

  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [submittingUpdate, setSubmittingUpdate] = useState(false);

  // Live broadcast / story posting fields
  const [postCaption, setPostCaption] = useState('');
  const [postPromo, setPostPromo] = useState('');
  const [postImage, setPostImage] = useState('');
  const [submittingPost, setSubmittingPost] = useState(false);
  const [postSuccess, setPostSuccess] = useState(false);

  // Broadcast campaign archival edits
  const [archiveSearch, setArchiveSearch] = useState('');
  const [editingPostId, setEditingPostId] = useState<string | null>(null);
  const [editPostCaption, setEditPostCaption] = useState('');
  const [editPostPromo, setEditPostPromo] = useState('');
  const [isDeletingPostId, setIsDeletingPostId] = useState<string | null>(null);

  // Detect active owner state
  const isOwner = userProfile?.role === 'owner';
  const myBusiness = businesses.find(b => b.ownerUid === user?.uid || (userProfile?.businessId && b.id === userProfile.businessId));

  // Sync edits if myBusiness retrieves or current language switches
  useEffect(() => {
    if (myBusiness) {
      setEditName(myBusiness.name[currentLang] || myBusiness.name.en || '');
      setEditDesc(myBusiness.description[currentLang] || myBusiness.description.en || '');
      setEditPhone(myBusiness.phoneNumber || '');
      setEditAddress(myBusiness.address[currentLang] || myBusiness.address.en || '');
      setEditCover(myBusiness.image || '');
      setEditCategory(myBusiness.category || 'cafe_bakery');
      setEditGov(myBusiness.governorate || 'baghdad');
      setUploadingGallery(myBusiness.images || [myBusiness.image]);

      const details = (userProfile?.businessOnboarding as any) || {};
      setEditWhatsApp(details.whatsApp || myBusiness.phoneNumber || '');
      setEditFacebook(details.facebook || '');
      setEditInstagram(details.instagram || '');
      if (details.openingHours) {
        setOpeningHours(details.openingHours);
      }
    }
  }, [myBusiness, currentLang, userProfile]);

  // Robust Phone Input Normalizer
  const normalizePhone = (num: string): string => {
    let clean = num.replace(/\D/g, '');
    if (clean.startsWith('964')) {
      clean = clean.substring(3);
    }
    if (clean.startsWith('0')) {
      clean = clean.substring(1);
    }
    return clean;
  };

  // Live phone validation
  useEffect(() => {
    const clean = normalizePhone(phoneNumberInput);
    setIsPhoneValidated(clean.length >= 9 && clean.length <= 11);
  }, [phoneNumberInput]);

  // Handle phone submission to find matching businesses
  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isPhoneValidated) return;

    const inputClean = normalizePhone(phoneNumberInput);
    setClaimStep('searching');

    setTimeout(() => {
      // Find businesses matching phone number length or normalized input
      const matched = businesses.filter(b => {
        if (!b.phoneNumber) return false;
        return normalizePhone(b.phoneNumber) === inputClean;
      });

      setMatchedBusinesses(matched);
      
      if (matched.length === 1) {
        setSelectedBizForClaim(matched[0]);
        setClaimStep('otp');
      } else if (matched.length > 1) {
        setSelectedBizForClaim(null);
        setClaimStep('select_business');
      } else {
        // No auto matches found. Let user manually search or create
        setSelectedBizForClaim(null);
        setClaimStep('select_business');
      }
    }, 1800); // 1.8s psychological loader for real-time validation feel
  };

  // OTP Verification Submission
  const handleVerifyOtp = async (code: string) => {
    // Both 1234 and 123456 will pass simulated verification
    if (code !== '123456' && code !== '1234') {
      alert(currentLang === 'en' ? 'Incorrect verification code. Please enter the correct code (123456)' : 'رمز التحقق غير صحيح، يرجى إدخال (123456) للتجربة');
      return;
    }

    if (!selectedBizForClaim) return;

    // Duplicated claim audit indicators
    const isAlreadyOwned = selectedBizForClaim.ownerUid && selectedBizForClaim.ownerUid !== 'system-seed';
    const isHighlyPopular = (selectedBizForClaim.likes || 0) + (selectedBizForClaim.saves || 0) > 40;
    const isSuspicious = Boolean(isAlreadyOwned || isHighlyPopular);

    const claimId = `claim-${selectedBizForClaim.id}-${user.uid}`;
    
    const claimDoc: BusinessClaim = {
      id: claimId,
      businessId: selectedBizForClaim.id,
      businessName: {
        ar: selectedBizForClaim.name.ar,
        ku: selectedBizForClaim.name.ku,
        en: selectedBizForClaim.name.en
      },
      userId: user.uid,
      userPhone: phoneCountry + normalizePhone(phoneNumberInput),
      status: isSuspicious ? 'pending' : 'approved',
      isSuspicious: isSuspicious,
      suspiciousReason: isSuspicious 
        ? (isAlreadyOwned ? 'Already claimed by another profile' : 'Highly popular high-engagement street listing')
        : undefined,
      createdAt: new Date().toISOString()
    };

    try {
      await setDoc(doc(db, 'business_claims', claimId), claimDoc);
      
      if (isSuspicious) {
        setClaimStep('suspicious_hold');
      } else {
        const ownerRecordId = `owner-${user.uid}-${selectedBizForClaim.id}`;
        
        await setDoc(doc(db, 'business_owners', ownerRecordId), {
          id: ownerRecordId,
          userId: user.uid,
          businessId: selectedBizForClaim.id,
          role: 'owner',
          verified: true,
          createdAt: new Date().toISOString()
        });

        // Link user as owner to business
        await updateDoc(doc(db, 'businesses', selectedBizForClaim.id), {
          ownerUid: user.uid,
          isVerified: true,
          phoneNumber: phoneCountry + normalizePhone(phoneNumberInput)
        });

        // Upgrade active Profile Role to Owner
        await onUpdateProfile({
          role: 'owner',
          onboarded: true,
          businessId: selectedBizForClaim.id,
          businessOnboarding: {
            name: selectedBizForClaim.name[currentLang] || selectedBizForClaim.name.en,
            category: selectedBizForClaim.category,
            governorate: selectedBizForClaim.governorate,
            address: selectedBizForClaim.address[currentLang] || selectedBizForClaim.address.en,
            phone: phoneCountry + normalizePhone(phoneNumberInput),
            whatsApp: phoneCountry + normalizePhone(phoneNumberInput),
            logo: selectedBizForClaim.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
            coverImage: selectedBizForClaim.image,
            description: selectedBizForClaim.description[currentLang] || selectedBizForClaim.description.en
          }
        });

        setClaimStep('success');
      }
    } catch (err) {
      // silently ignore verification error
      alert("Error writing ownership records to registry database.");
    }
  };

  // Typo-tolerant fuzziness
  const matchFuzzy = (target: string, queryText: string): boolean => {
    const targetNorm = target.toLowerCase().replace(/\s+/g, '');
    const queryNorm = queryText.toLowerCase().replace(/\s+/g, '');
    if (targetNorm.includes(queryNorm)) return true;
    
    let mistakes = 0;
    let tIdx = 0;
    let qIdx = 0;
    while (tIdx < targetNorm.length && qIdx < queryNorm.length) {
      if (targetNorm[tIdx] === queryNorm[qIdx]) {
        tIdx++;
        qIdx++;
      } else {
        mistakes++;
        tIdx++;
        if (mistakes > 2) return false;
      }
    }
    return qIdx === queryNorm.length || mistakes <= 2;
  };

  // Manual query search matching directory profiles
  const manualFilteredRegistry = useMemo(() => {
    const cleanedSearch = claimSearch.trim();
    return businesses.filter(b => {
      const matchesGov = claimGovFilter === 'all' || b.governorate === claimGovFilter;
      const matchesCat = claimCatFilter === 'all' || b.category === claimCatFilter;
      const matchesText = !cleanedSearch || 
        matchFuzzy(b.name[currentLang] || '', cleanedSearch) ||
        matchFuzzy(b.name.en || '', cleanedSearch) ||
        matchFuzzy(b.description[currentLang] || '', cleanedSearch);
      
      return matchesGov && matchesCat && matchesText;
    });
  }, [businesses, claimSearch, claimGovFilter, claimCatFilter, currentLang]);

  // Standard Contributor submissions
  const handleStandardSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!standardName.trim() || !standardDesc.trim() || !standardAddress.trim()) return;

    const dummyImgs: Record<string, string> = {
      cafe_bakery: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&auto=format&fit=crop&q=80',
      restaurant: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80',
      shopping: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&auto=format&fit=crop&q=80',
      hotels: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&auto=format&fit=crop&q=80',
      salons: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800&auto=format&fit=crop&q=80',
      gyms: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&auto=format&fit=crop&q=80',
      pharmacies: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&auto=format&fit=crop&q=80'
    };

    const targetImg = standardImageUrl.trim() || dummyImgs[standardCategory] || dummyImgs.restaurant;
    const newId = `b-contrib-${Date.now()}`;

    const newBiz: Omit<Business, 'rating' | 'reviewsCount' | 'likes' | 'saves'> = {
      id: newId,
      name: { ar: standardName.trim(), ku: standardName.trim(), en: standardName.trim() },
      description: { ar: standardDesc.trim(), ku: standardDesc.trim(), en: standardDesc.trim() },
      category: standardCategory,
      governorate: standardGov,
      image: targetImg,
      images: [targetImg],
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      isVerified: false,
      phoneNumber: standardPhone.trim() || undefined,
      address: { ar: standardAddress.trim(), ku: standardAddress.trim(), en: standardAddress.trim() },
      mapCoords: {
        x: Math.floor(Math.random() * 40) + 30,
        y: Math.floor(Math.random() * 40) + 30
      }
    };

    onAddBusiness(newBiz);
    setStandardSuccess(true);
    
    setStandardName('');
    setStandardDesc('');
    setStandardPhone('');
    setStandardAddress('');
    setStandardImageUrl('');

    setTimeout(() => {
      setStandardSuccess(false);
      setActivePath('welcome');
    }, 4500);
  };

  // Merchant Dashboard modifications sync
  const handleUpdateSpot = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!myBusiness || submittingUpdate) return;
    setSubmittingUpdate(true);
    setUpdateSuccess(false);

    try {
      const bizRef = doc(db, 'businesses', myBusiness.id);
      const details = (userProfile?.businessOnboarding as any) || {};
      
      const updatedOnboarding = {
        ...details,
        name: editName.trim(),
        category: editCategory,
        governorate: editGov,
        address: editAddress.trim(),
        phone: editPhone.trim(),
        whatsApp: editWhatsApp.trim(),
        facebook: editFacebook.trim(),
        instagram: editInstagram.trim(),
        coverImage: editCover.trim(),
        description: editDesc.trim(),
        openingHours
      };

      await updateDoc(bizRef, {
        name: { ...myBusiness.name, [currentLang]: editName.trim() },
        description: { ...myBusiness.description, [currentLang]: editDesc.trim() },
        phoneNumber: editPhone.trim(),
        address: { ...myBusiness.address, [currentLang]: editAddress.trim() },
        image: editCover.trim(),
        images: uploadingGallery,
        category: editCategory,
        governorate: editGov
      });

      await onUpdateProfile({
        businessOnboarding: updatedOnboarding
      });

      setUpdateSuccess(true);
      setTimeout(() => setUpdateSuccess(false), 3500);
    } catch (err) {
      // silently ignore update error
      alert("Error saving dashboard edits to firestore.");
    } finally {
      setSubmittingUpdate(false);
    }
  };

  // Gallery modification syncing
  const handleAddGalleryImage = async (url: string) => {
    if (!myBusiness) return;
    const updated = [...uploadingGallery, url];
    setUploadingGallery(updated);

    try {
      await updateDoc(doc(db, 'businesses', myBusiness.id), {
        images: updated
      });
    } catch (e) {
      // silently ignore error
    }
  };

  const handleRemoveGalleryImage = async (url: string) => {
    if (!myBusiness) return;
    const updated = uploadingGallery.filter(u => u !== url);
    setUploadingGallery(updated);

    try {
      await updateDoc(doc(db, 'businesses', myBusiness.id), {
        images: updated
      });
    } catch (e) {
      // silently ignore error
    }
  };

  // Broadcast Story post trigger
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
      likes: Math.floor(Math.random() * 20) + 10,
      commentsCount: 0,
      shares: 0,
      timeAgo: {
        ar: 'الآن 🔥',
        ku: 'ئێستا 🔥',
        en: 'Just Now 🔥'
      },
      likedByUser: false,
      savedByUser: false,
      comments: [],
      promotionBadge: postPromo.trim() ? {
        ar: postPromo.trim(),
        ku: postPromo.trim(),
        en: postPromo.trim()
      } : undefined,
      authorUid: user.uid
    };

    try {
      await setDoc(doc(db, 'posts', newPostId), newPostItem);
      setPostCaption('');
      setPostPromo('');
      setPostImage('');
      setPostSuccess(true);
      setTimeout(() => setPostSuccess(false), 3500);
    } catch (err) {
      // silently ignore story publish error
    } finally {
      setSubmittingPost(false);
    }
  };

  // GUEST SIGN IN LOCK SCREEN
  if (!user) {
    return (
      <div className="w-full max-w-xl mx-auto text-center" dir={isRtl ? 'rtl' : 'ltr'}>
        <div className="bg-[#111113]/90 backdrop-blur-xl border border-white/5 rounded-[32px] p-8 space-y-7 relative overflow-hidden shadow-2xl">
          <div className="absolute top-[-20%] left-[-20%] w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative space-y-4">
            <div className="mx-auto w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center text-black shadow-xl">
              <Key className="w-7 h-7 text-black stroke-[2.5px]" />
            </div>

            <div className="space-y-2">
              <span className="text-[10px] text-amber-500 font-extrabold uppercase tracking-widest block font-mono">
                Platform Authentication Required
              </span>
              <h3 className="text-lg font-black text-white">
                {currentLang === 'en' ? 'Claim & Access Your Dashboard' : isRtl ? 'توثيق ملكية مشروعك التجاري' : 'کۆنترۆڵ پانێڵی شوێنی بەکارھێنەر'}
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed max-w-sm mx-auto font-medium">
                {currentLang === 'en'
                  ? 'Sign in via Saku Maku authorization keys to verify business ownership, link WhatsApp, and broadcast flash campaigns.'
                  : 'قم بتسجيل الدخول باستخدام حساب جوجل للبدء الفوري بإثبات الملكية وتحديث العنوان أو إطلاق العروض والتخفيضات.'}
              </p>
            </div>

            <div className="pt-3">
              <button
                onClick={onSignIn}
                className="px-6 py-3.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-white hover:to-white text-black hover:text-black font-extrabold text-xs uppercase tracking-wider rounded-xl transition cursor-pointer shadow-lg active:scale-97 font-sans"
                style={{ width: 'auto' }}
              >
                🔑 {currentLang === 'en' ? 'Sign In with Google' : 'سجل دخول باستخدام جوجل للبدء'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ACTIVE ONBOARDED MERCHANT: RENDERS INTENSE PRODUCTION-READY DASHBOARD V2
  if (isOwner && myBusiness) {
    const myStoriesAndPosts = posts.filter(p => p.businessId === myBusiness.id || p.authorUid === user.uid);
    
    // Compute Profile Completion Progress
    const completionTasks = [
      { id: 'desc', label: 'Detailed Description', completed: editDesc.length > 20 },
      { id: 'cover', label: 'Cover Image File', completed: !!editCover },
      { id: 'whatsApp', label: 'Active WhatsApp link', completed: !!editWhatsApp },
      { id: 'posts', label: 'First community story', completed: myStoriesAndPosts.length > 0 },
      { id: 'hours', label: 'Configured opening hours', completed: Object.values(openingHours as Record<string, string>).some((h: string) => h.includes(':')) }
    ];
    const completedCount = completionTasks.filter(t => t.completed).length;
    const progressPercent = Math.round((completedCount / completionTasks.length) * 100);

    return (
      <div className="w-full max-w-5xl mx-auto space-y-8 text-left" dir={isRtl ? 'rtl' : 'ltr'}>
        
        {/* Spot Owner Dashboard Hero Card */}
        <div className="relative overflow-hidden bg-gradient-to-r from-zinc-950 to-zinc-90 w-full border border-white/5 rounded-3xl p-6 sm:p-7 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/5 rounded-full blur-[110px] pointer-events-none" />
          
          <div className={`flex items-center gap-4 text-center ${isRtl ? 'sm:text-right' : 'sm:text-left'} flex-col sm:flex-row`}>
            {/* Logo */}
            <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-amber-500 p-0.5 bg-[#1C1C24] shrink-0 mx-auto sm:mx-0 shadow-lg">
              <img 
                src={myBusiness.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'} 
                alt="Spot logo" 
                className="w-full h-full object-cover rounded-xl"
                referrerPolicy="no-referrer"
              />
            </div>
            
            <div className="space-y-1">
              <span className="text-[9px] bg-amber-500/10 font-bold px-2 py-0.5 text-amber-500 rounded-md border border-amber-500/20 tracking-wider uppercase inline-flex items-center gap-1.5 font-sans justify-center">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>VERIFIED MERCHANT PARTNER</span>
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white leading-tight">
                {myBusiness.name[currentLang] || myBusiness.name.en}
              </h2>
              <p className="text-xs text-zinc-400 font-medium">
                📍 {myBusiness.address[currentLang] || myBusiness.address.en}
              </p>
            </div>
          </div>

          {/* Quick overview actions */}
          <div className="flex items-center gap-2 font-bold text-xs shrink-0 w-full sm:w-auto font-sans">
            <button
              onClick={() => {
                // Exit owner dashboard state back to general lobby or welcome screens
                onUpdateProfile({ role: 'user' as any });
              }}
              className="w-full sm:w-auto px-4 py-2.5 bg-zinc-950/60 border border-white/5 hover:bg-zinc-900 hover:text-white rounded-xl text-zinc-400 transition cursor-pointer text-center"
            >
              Simulate Logout owner
            </button>
          </div>
        </div>

        {/* Layout Split Panels */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Navigation Sidebar */}
          <div className="lg:col-span-3">
            <DashboardSidebar
              currentLang={currentLang}
              activeTab={activeDashTab}
              onChangeTab={setActiveDashTab}
            />
          </div>

          {/* Core Panel Content Body */}
          <div className="lg:col-span-9 bg-[#111113]/90 border border-white/5 rounded-[32px] p-6 sm:p-8 relative min-h-[500px]">
            
            <AnimatePresence mode="wait">
              {/* TAB 1: OVERVIEW */}
              {activeDashTab === 'overview' && (
                <motion.div
                  key="overview"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6 text-left"
                >
                  <div className="border-b border-white/5 pb-4">
                    <h3 className="text-base font-black text-white uppercase flex items-center gap-2">
                      <LayoutDashboard className="w-4.5 h-4.5 text-amber-500" />
                      <span>Unlock your business dashboard</span>
                    </h3>
                    <p className="text-xs text-zinc-400 mt-0.5 font-sans leading-normal">
                      Welcome back! Your business profile is verified and active. Use the tools below to engage with visitors.
                    </p>
                  </div>

                  {/* Profile Completion Index Gauge */}
                  <div className="p-4 bg-zinc-950/40 border border-white/5 rounded-2xl space-y-3">
                    <div className="flex justify-between items-center text-xs font-bold font-sans">
                      <span className="text-white">Profile Activation Completion Log</span>
                      <span className="text-amber-500 font-mono">{progressPercent}% Completed</span>
                    </div>

                    <div className="h-2 w-full bg-zinc-900 rounded-full overflow-hidden border border-white/5">
                      <div
                        className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full transition-all duration-500"
                        style={{ width: `${progressPercent}%` }}
                      />
                    </div>

                    {progressPercent < 100 && (
                      <div className="flex gap-1.5 flex-wrap pt-1">
                        {completionTasks.filter(t => !t.completed).map(task => (
                          <span key={task.id} className="text-[10px] bg-white/5 border border-white/5 text-zinc-400 font-bold px-2 py-1 rounded-lg">
                            + {task.label}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Stats Cards Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <StatsCard
                      title="Total Organic Views"
                      value={1240}
                      percentage="14%"
                      isPositive={true}
                      icon={Eye}
                      chartColor="#F59E0B"
                      chartPathPoints="M 0 35 Q 20 10, 40 30 T 80 15 T 120 10"
                    />
                    <StatsCard
                      title="Profile Save Rate"
                      value={myBusiness.likes || 15}
                      percentage="8%"
                      isPositive={true}
                      icon={Heart}
                      chartColor="#EC4899"
                      chartPathPoints="M 0 40 Q 30 15, 60 35 T 120 5"
                    />
                    <StatsCard
                      title="Community Broadcasts"
                      value={myStoriesAndPosts.length}
                      percentage="20%"
                      isPositive={true}
                      icon={Flame}
                      chartColor="#EF4444"
                      chartPathPoints="M 0 30 Q 20 30, 40 10 T 80 40 T 120 20"
                    />
                    <StatsCard
                      title="WhatsApp Direct Inquiries"
                      value={24}
                      percentage="12%"
                      isPositive={true}
                      icon={Users}
                      chartColor="#10B981"
                      chartPathPoints="M 0 35 Q 35 10, 70 30 T 120 5"
                    />
                  </div>

                  {/* Recent Activity Logs */}
                  <div className="space-y-3 pt-2">
                    <h4 className="text-xs font-black text-white uppercase tracking-wider font-mono">
                      Recent Activity Stream
                    </h4>
                    <div className="space-y-2 bg-zinc-950/40 p-4 border border-white/5 rounded-3xl text-xs font-medium font-sans">
                      <div className="flex items-center gap-2 text-zinc-350 py-1 border-b border-white/5">
                        <span className="w-2 h-2 rounded-full bg-emerald-500" />
                        <span className="font-bold text-white">Owner Claim Verification Approved</span>
                        <span className="ml-auto text-zinc-500 font-mono text-[10px]">Just now</span>
                      </div>
                      <div className="flex items-center gap-2 text-zinc-350 py-1 border-b border-white/5">
                        <span className="w-2 h-2 rounded-full bg-amber-500" />
                        <span>System synced phone verification records for active owner logs</span>
                        <span className="ml-auto text-zinc-500 font-mono text-[10px]">10m ago</span>
                      </div>
                      <div className="flex items-center gap-2 text-zinc-350 py-1">
                        <span className="w-2 h-2 rounded-full bg-indigo-500" />
                        <span>Visitor bookmark logged on Damascus Jasmine Cafe profile</span>
                        <span className="ml-auto text-zinc-500 font-mono text-[10px]">1h ago</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* TAB 2: EDIT BUSINESS PROFILE */}
              {activeDashTab === 'edit_profile' && (
                <motion.div
                  key="edit_profile"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6 text-left"
                >
                  <div className="border-b border-white/5 pb-4">
                    <h3 className="text-base font-black text-white uppercase flex items-center gap-2">
                      <Edit className="w-4.5 h-4.5 text-amber-500" />
                      <span>Modifying Core Business Information</span>
                    </h3>
                    <p className="text-xs text-zinc-400 mt-0.5 font-sans leading-normal">
                      Update your spot name, primary categories, physical address, description, and opening hours instantly.
                    </p>
                  </div>

                  <AnimatePresence>
                    {updateSuccess && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs rounded-xl flex items-center gap-2 justify-center"
                      >
                        <CheckCircle2 className="w-4 h-4 shrink-0" />
                        <span>Business information updated and synced successfully!</span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <form onSubmit={handleUpdateSpot} className="space-y-4 text-xs font-semibold text-left">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-zinc-400 block font-bold">Business Name</label>
                        <input
                          type="text"
                          required
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                          className="w-full bg-zinc-950 text-white p-3.5 rounded-xl border border-white/10 focus:outline-none focus:border-amber-500"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-zinc-400 block font-bold">Physical High Street Address</label>
                        <input
                          type="text"
                          required
                          value={editAddress}
                          onChange={(e) => setEditAddress(e.target.value)}
                          className="w-full bg-zinc-950 text-white p-3.5 rounded-xl border border-white/10 focus:outline-none focus:border-amber-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-zinc-400 block font-bold">Primary Category Classification</label>
                        <select
                          value={editCategory}
                          onChange={(e) => setEditCategory(e.target.value)}
                          className="w-full bg-zinc-950 text-white p-3.5 rounded-xl border border-white/10 focus:outline-none focus:border-amber-500 cursor-pointer"
                        >
                          {CATEGORIES.map(cat => (
                            <option key={cat.id} value={cat.id}>{cat.icon} {cat.name[currentLang]}</option>
                          ))}
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-zinc-400 block font-bold">Region Governorate</label>
                        <select
                          value={editGov}
                          onChange={(e) => setEditGov(e.target.value as GovernorateCode)}
                          className="w-full bg-zinc-950 text-white p-3.5 rounded-xl border border-white/10 focus:outline-none focus:border-amber-500 cursor-pointer"
                        >
                          {GOVERNORATES.filter(g => g.code !== 'all').map(gov => (
                            <option key={gov.code} value={gov.code}>{gov.name[currentLang]}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Opening hours manager panel */}
                    <div className="p-4 bg-zinc-950/40 border border-white/5 rounded-2xl space-y-3">
                      <h4 className="text-[10px] text-zinc-450 uppercase tracking-widest font-mono font-black flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        <span>Configuring Opening Hours Hours</span>
                      </h4>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {Object.keys(openingHours).map(day => (
                          <div key={day} className="p-2.5 bg-zinc-950 border border-white/5 rounded-xl flex flex-col gap-1 font-mono text-[9px]">
                            <span className="text-zinc-400 font-black capitalize">{day.slice(0, 3)}</span>
                            <input
                              type="text"
                              value={openingHours[day]}
                              onChange={(e) => setOpeningHours({ ...openingHours, [day]: e.target.value })}
                              className="bg-transparent border-b border-zinc-900 focus:border-amber-500 text-amber-500 focus:outline-none text-[9.5px] py-0.5"
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-zinc-400 block font-bold">Localized Profile Abstract Description ({currentLang.toUpperCase()})</label>
                      <textarea
                        required
                        rows={3}
                        value={editDesc}
                        onChange={(e) => setEditDesc(e.target.value)}
                        className="w-full bg-zinc-950 text-white p-3.5 rounded-xl border border-white/10 focus:outline-none focus:border-amber-500 leading-relaxed font-sans"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={submittingUpdate}
                      className="w-full py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-450 hover:to-amber-550 text-black font-black text-xs uppercase tracking-wider rounded-xl transition duration-300 shadow-md cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      {submittingUpdate ? 'Saving Core Spot Details...' : 'Sync Spot Information 💾'}
                    </button>
                  </form>
                </motion.div>
              )}

              {/* TAB 3: MEDIA GALLERY MANAGER */}
              {activeDashTab === 'media' && (
                <motion.div
                  key="media"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6 text-left"
                >
                  <div className="border-b border-white/5 pb-4">
                    <h3 className="text-base font-black text-white uppercase flex items-center gap-2">
                      <ImageIcon className="w-4.5 h-4.5 text-amber-500" />
                      <span>Photos & Gallery Manager</span>
                    </h3>
                    <p className="text-xs text-zinc-400 mt-0.5 font-sans leading-normal">
                      Upload high quality photographs of your establishment to attract more organic traffic. First image in gallery will act as cover banner.
                    </p>
                  </div>

                  {/* Cover photo field */}
                  <div className="p-4 bg-zinc-950/40 border border-white/5 rounded-2xl space-y-2 text-xs font-semibold">
                    <label className="text-zinc-400 block font-bold">Target Cover Photo asset Link</label>
                    <input
                      type="url"
                      value={editCover}
                      onChange={(e) => setEditCover(e.target.value)}
                      placeholder="https://images.unsplash.com/..."
                      className="w-full bg-zinc-950 text-white p-3 rounded-xl border border-white/10 focus:outline-none focus:border-amber-500 font-mono text-xs"
                    />
                  </div>

                  {/* Drag and Drop uploader modular component */}
                  <MediaUploader
                    currentLang={currentLang}
                    images={uploadingGallery}
                    onAddImage={handleAddGalleryImage}
                    onRemoveImage={handleRemoveGalleryImage}
                  />
                </motion.div>
              )}

              {/* TAB 4: SOCIAL STREAM FEES */}
              {activeDashTab === 'social_feed' && (
                <motion.div
                  key="social_feed"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6 text-left"
                >
                  <div className="border-b border-white/5 pb-4">
                    <h3 className="text-base font-black text-white uppercase flex items-center gap-2">
                      <Flame className="w-4.5 h-4.5 text-orange-500 animate-pulse" />
                      <span>Launch Live Story Campaign Broadcasts</span>
                    </h3>
                    <p className="text-xs text-zinc-400 mt-0.5 font-sans leading-normal">
                      Announce happy hours, active menus, instant family discounts or flash events into Saku Maku's general community feed screens immediately.
                    </p>
                  </div>

                  <AnimatePresence>
                    {postSuccess && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="p-3 bg-orange-500/15 border border-orange-500/25 text-orange-400 text-xs rounded-xl flex items-center gap-2 justify-center"
                      >
                        <CheckCircle className="w-4.5 h-4.5 shrink-0" />
                        <span>Story Broadcast published instantly to general Saku Maku feeds!</span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Form */}
                  <form onSubmit={handlePublishStory} className="space-y-4 text-xs font-semibold text-left">
                    <div className="space-y-1.5">
                      <label className="text-zinc-400 block">Caption / Headline Campaign Messages</label>
                      <textarea
                        required
                        rows={3}
                        value={postCaption}
                        onChange={(e) => setPostCaption(e.target.value)}
                        className="w-full bg-zinc-950 text-white p-3.5 rounded-xl border border-white/10 focus:outline-none focus:border-amber-500 font-sans leading-relaxed text-xs"
                        placeholder="e.g. Try our traditional Jasmine blend filter coffee! Special 15% discount for families tonight ☕..."
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-zinc-400 block">Promotion Badge Tag (Optional)</label>
                        <input
                          type="text"
                          value={postPromo}
                          onChange={(e) => setPostPromo(e.target.value)}
                          className="w-full bg-zinc-950 text-amber-500 p-3.5 rounded-xl border border-white/10 focus:outline-none focus:border-amber-500 font-bold"
                          placeholder="e.g. 15% Discount Tonight"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-zinc-400 block">Custom Post Media Asset URL</label>
                        <input
                          type="url"
                          value={postImage}
                          onChange={(e) => setPostImage(e.target.value)}
                          className="w-full bg-zinc-950 text-white p-3.5 rounded-xl border border-white/10 focus:outline-none focus:border-amber-500 font-mono text-xs"
                          placeholder="https://images.unsplash.com/... (optional)"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={submittingPost}
                      className="w-full py-3.5 bg-gradient-to-r from-orange-500 to-amber-500 text-black font-black text-xs uppercase tracking-wider rounded-xl transition hover:opacity-95 shadow-lg active:scale-98 cursor-pointer disabled:opacity-45"
                    >
                      {submittingPost ? 'Publishing Broadcast Story...' : 'Launch Live Stream Update 🚀'}
                    </button>
                  </form>

                  {/* Past broadcasts layout */}
                  <div className="space-y-3 pt-3">
                    <h4 className="text-xs font-black text-white uppercase tracking-wider font-mono">
                      Active Campaign History ({myStoriesAndPosts.length})
                    </h4>

                    <div className="space-y-3 max-h-[220px] overflow-y-auto custom-scrollbar p-1">
                      {myStoriesAndPosts.length === 0 ? (
                        <div className="text-center py-6 text-zinc-500 text-xs font-semibold border border-white/5 bg-zinc-950/20 rounded-2xl font-mono">
                          No active broadcasts catalogued.
                        </div>
                      ) : (
                        myStoriesAndPosts.map(post => (
                          <div key={post.id} className="p-3 bg-zinc-950 border border-white/5 rounded-xl flex items-center justify-between gap-3 text-xs leading-none">
                            <div className="flex items-center gap-2.5 min-w-0">
                              <div className="w-8 h-8 rounded-lg overflow-hidden shrink-0 border border-white/5 bg-[#17171d]">
                                <img src={post.mediaUrl || myBusiness.image} alt="post" className="w-full h-full object-cover" />
                              </div>
                              <div className="space-y-1 min-w-0 font-sans leading-normal">
                                <p className="text-zinc-205 font-bold text-white line-clamp-1 truncate">{post.caption[currentLang] || post.caption.en}</p>
                                <span className="text-[9.5px] text-[#FF6B4A] font-extrabold uppercase font-mono">{post.timeAgo[currentLang] || post.timeAgo.en}</span>
                              </div>
                            </div>

                            <button
                              onClick={async () => {
                                if (window.confirm("Permanently delete this Saku Maku directory post?")) {
                                  try {
                                    const { deleteDoc, doc } = await import('firebase/firestore');
                                    await deleteDoc(doc(db, 'posts', post.id));
                                  } catch (e) {
                                    // silently ignore error
                                  }
                                }
                              }}
                              className="px-2.5 py-1 text-[10px] bg-red-950/25 hover:bg-red-900 border border-red-500/20 text-red-200 font-bold rounded-lg transition"
                            >
                              Deactivate
                            </button>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* TAB 5: CONTACT CHANNELS */}
              {activeDashTab === 'contact' && (
                <motion.div
                  key="contact"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6 text-left"
                >
                  <div className="border-b border-white/5 pb-4">
                    <h3 className="text-base font-black text-white uppercase flex items-center gap-2">
                      <Compass className="w-4.5 h-4.5 text-amber-500" />
                      <span>Contact Channels & WhatsApp Sync</span>
                    </h3>
                    <p className="text-xs text-zinc-400 mt-0.5 font-sans leading-normal">
                      Update your direct hotline parameters, connect active WhatsApp instant triggers, and link secondary Instagram or Facebook business links.
                    </p>
                  </div>

                  <AnimatePresence>
                    {updateSuccess && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs rounded-xl flex items-center gap-2 justify-center"
                      >
                        <CheckCircle2 className="w-4 h-4 shrink-0" />
                        <span>Core contact channels successfully updated!</span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <form onSubmit={handleUpdateSpot} className="space-y-4 text-xs font-semibold text-left">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-zinc-400 block font-bold">Standard Contact Hotline</label>
                        <input
                          type="tel"
                          value={editPhone}
                          onChange={(e) => setEditPhone(e.target.value)}
                          placeholder="e.g. +9647701234567"
                          className="w-full bg-zinc-950 text-white p-3.5 rounded-xl border border-white/10 focus:outline-none focus:border-amber-500 font-mono"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-zinc-400 block font-bold">Active WhatsApp Hotline</label>
                        <input
                          type="tel"
                          value={editWhatsApp}
                          onChange={(e) => setEditWhatsApp(e.target.value)}
                          placeholder="e.g. +9647701234567"
                          className="w-full bg-zinc-950 text-amber-450 p-3.5 rounded-xl border border-amber-500/20 focus:outline-none focus:border-amber-500 font-mono font-bold"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-white/5 pt-4">
                      <div className="space-y-1.5">
                        <label className="text-zinc-400 block font-bold">Facebook Page URL (Optional)</label>
                        <input
                          type="url"
                          value={editFacebook}
                          onChange={(e) => setEditFacebook(e.target.value)}
                          placeholder="https://facebook.com/example..."
                          className="w-full bg-zinc-950 text-zinc-3 w-4/5 text-white p-3.5 rounded-xl border border-white/10 focus:outline-none focus:border-amber-500 font-sans"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-zinc-400 block font-bold">Instagram Handle Link (Optional)</label>
                        <input
                          type="url"
                          value={editInstagram}
                          onChange={(e) => setEditInstagram(e.target.value)}
                          placeholder="https://instagram.com/example..."
                          className="w-full bg-zinc-950 text-white p-3.5 rounded-xl border border-white/10 focus:outline-none focus:border-amber-500 font-sans"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={submittingUpdate}
                      className="w-full py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-black font-black text-xs uppercase tracking-wider rounded-xl transition shadow-md hover:brightness-105"
                    >
                      {submittingUpdate ? 'Updating Hotline Syncs...' : 'Save Contact Hotlines 💾'}
                    </button>
                  </form>
                </motion.div>
              )}

              {/* TAB 6: HQ ANALYTICS PLOT */}
              {activeDashTab === 'analytics' && (
                <motion.div
                  key="analytics"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6 text-left"
                >
                  <div className="border-b border-white/5 pb-4">
                    <h3 className="text-base font-black text-white uppercase flex items-center gap-2">
                      <BarChart3 className="w-4.5 h-4.5 text-amber-500" />
                      <span>HQ Views Analytics & Interactions</span>
                    </h3>
                    <p className="text-xs text-zinc-400 mt-0.5 font-sans leading-normal">
                      Deep real-time metrics showing search queries, impressions, direct WhatsApp triggers, and bookmark listings.
                    </p>
                  </div>

                  {/* Elegant Vector Graph Area */}
                  <div className="p-6 bg-zinc-950/70 border border-white/5 rounded-3xl space-y-4">
                    <div className="flex justify-between items-center text-xs font-bold leading-none font-sans">
                      <span className="text-zinc-400">Monthly Performance Graph (Impressions)</span>
                      <span className="text-emerald-400">+18% growth this week</span>
                    </div>

                    {/* Highly polished SVG visual chart layout */}
                    <div className="h-44 w-full bg-zinc-950 relative rounded-xl overflow-hidden border border-white/5 p-2 flex items-end">
                      
                      {/* Grid background lines */}
                      <div className="absolute inset-0 flex flex-col justify-between p-4 opacity-5 pointer-events-none">
                        {[1, 2, 3, 4].map(idx => (
                          <div key={idx} className="border-b border-white w-full" />
                        ))}
                      </div>

                      {/* SVG Line Graph */}
                      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 500 150" fill="none" preserveAspectRatio="none">
                        <defs>
                          <linearGradient id="analytics-grad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.25" />
                            <stop offset="100%" stopColor="#F29E0B" stopOpacity="0.0" />
                          </linearGradient>
                        </defs>
                        <path
                          d="M -10 150 L 0 110 Q 50 60 100 90 T 200 40 T 300 110 T 400 30 T 510 60 L 510 150 Z"
                          fill="url(#analytics-grad)"
                        />
                        <path
                          d="M 0 110 Q 50 60 100 90 T 200 40 T 300 110 T 400 30 T 500 60"
                          stroke="#F59E0B"
                          strokeWidth="3.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>

                      {/* Spark dots */}
                      <div className="absolute top-[25px] left-[395px] w-2.5 h-2.5 rounded-full bg-amber-500 border border-black ring-4 ring-amber-500/20" />
                      <div className="absolute top-[105px] left-[295px] w-2 h-2 rounded-full bg-amber-500 border border-black" />

                      {/* Bottom months ribbon */}
                      <div className="relative z-10 w-full flex justify-between font-mono text-[9px] text-zinc-500 px-2 font-bold select-none">
                        <span>Jan</span>
                        <span>Feb</span>
                        <span>Mar</span>
                        <span>Apr</span>
                        <span>May (Present)</span>
                      </div>
                    </div>
                  </div>

                  {/* Metrics summary list panel */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-semibold">
                    <div className="p-4 bg-zinc-950/40 border border-white/5 rounded-2xl text-left">
                      <span className="text-[10px] text-zinc-550 block font-mono uppercase">Direct Calls</span>
                      <span className="text-lg font-black text-white mt-1 block">12</span>
                    </div>
                    <div className="p-4 bg-zinc-950/40 border border-white/5 rounded-2xl text-left">
                      <span className="text-[10px] text-zinc-550 block font-mono uppercase">WhatsApp Clicks</span>
                      <span className="text-lg font-black text-white mt-1 block">28</span>
                    </div>
                    <div className="p-4 bg-zinc-950/40 border border-white/5 rounded-2xl text-left">
                      <span className="text-[10px] text-zinc-550 block font-mono uppercase">Avg Stay Seconds</span>
                      <span className="text-lg font-black text-white mt-1 block font-mono">14s</span>
                    </div>
                    <div className="p-4 bg-zinc-950/40 border border-white/5 rounded-2xl text-left">
                      <span className="text-[10px] text-zinc-550 block font-mono uppercase">Bounce rate</span>
                      <span className="text-lg font-black text-zinc-400 mt-1 block font-mono">15.5%</span>
                    </div>
                  </div>

                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </div>

      </div>
    );
  }

  // Lobby Welcome Screen
  if (activePath === 'welcome') {
    return (
      <div className="w-full max-w-4xl mx-auto space-y-8 text-center" dir={isRtl ? 'rtl' : 'ltr'}>
        
        {/* Onboarding text blocks */}
        <div className="text-center max-w-xl mx-auto space-y-3.5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/10 border border-amber-500/20 text-amber-500 text-[10px] uppercase font-black font-mono tracking-widest rounded-full">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Saku Maku Business Integration Hub</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Claim Your Saku Maku Spot
          </h2>
          <p className="text-xs text-zinc-400 leading-relaxed font-semibold">
            {currentLang === 'en'
              ? 'Join Saku Maku to manage reviews, upload covers, interact with followers, and publish deal streams instantly! Experience has been fully optimised for mobile.'
              : 'انضم لشبكة تجار شكو ماكو الشاملة للتحكم المطلق بصفحتك، رفع الصور، تحديث العروض الفورية، وإبهار العملاء في العراق.'}
          </p>
        </div>

        {/* Dual Selection pathways */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto font-sans">
          
          {/* Card Pathway A: Owner Claiming Profiles */}
          <button
            onClick={() => {
              setActivePath('claim');
              setClaimStep('phone');
              setPhoneNumberInput('');
              setSelectedBizForClaim(null);
            }}
            className="group relative flex flex-col justify-between items-start text-left bg-gradient-to-b from-[#18181b]/95 to-[#121214] border border-amber-500/30 hover:border-amber-500 rounded-[32px] p-6.5 h-64 hover:shadow-2xl shadow-black/80 transition duration-300 transform hover:scale-102 cursor-pointer overflow-hidden"
          >
            {/* Ambient gold orb in top right of card only */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full blur-2xl pointer-events-none group-hover:bg-amber-500/15 transition-all" />
            
            <div className="space-y-4">
              <div className="w-11 h-11 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-500 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 stroke-[2px]" />
              </div>
              <div className="space-y-1">
                <span className="text-[8px] text-zinc-500 uppercase tracking-wider font-extrabold font-mono block">Unveil control panel</span>
                <h3 className="text-base font-black text-white leading-tight">
                  Claim Existing Listing
                </h3>
                <p className="text-xs text-zinc-400 leading-normal font-medium">
                  {currentLang === 'en'
                    ? 'Verify pre-existing listings across Iraq with interactive phone OTP validation.'
                    : 'قم بامتلاك وإدارة مشروع تجاري متواجد حالياً في سجلاتنا في أقل من دقيقة.'}
                </p>
              </div>
            </div>

            <div className="text-[11px] font-black text-amber-500 tracking-wider uppercase inline-flex items-center gap-1 group-hover:translate-x-1.5 transition-transform">
              <span>Start Validation</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </button>

          {/* Card Pathway B: Standard Contributor Add Spot */}
          <button
            onClick={() => {
              setActivePath('add_spot');
            }}
            className="group relative flex flex-col justify-between items-start text-left bg-gradient-to-b from-zinc-900/95 to-[#121214] border border-white/5 hover:border-white/15 rounded-[32px] p-6.5 h-64 hover:shadow-2xl shadow-black/80 transition duration-300 transform hover:scale-102 cursor-pointer overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full blur-2xl pointer-events-none group-hover:bg-white/10 transition-all" />

            <div className="space-y-4">
              <div className="w-11 h-11 rounded-2xl bg-zinc-950 border border-white/10 flex items-center justify-center text-zinc-400">
                <PlusCircle className="w-6 h-6 shrink-0" />
              </div>
              <div className="space-y-1">
                <span className="text-[8px] text-zinc-500 uppercase tracking-wider font-extrabold font-mono block">Iraq Discovery Log</span>
                <h3 className="text-base font-black text-white leading-tight">
                  Register New Business
                </h3>
                <p className="text-xs text-zinc-400 leading-normal font-medium">
                  {currentLang === 'en'
                    ? 'Submit a new highstreet spot contribution to discoverable directories.'
                    : 'ساهم بإضافة موقع جغرافي، كافيه، أو فندق جديد لمدينتك لجميع متصفحي شكو ماكو.'}
                </p>
              </div>
            </div>

            <div className="text-[11px] font-black text-zinc-450 group-hover:text-white tracking-wider uppercase inline-flex items-center gap-1 group-hover:translate-x-1.5 transition-transform">
              <span>Contribute Spot</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </button>

        </div>
      </div>
    );
  }

  // ONBOARDING PROGRESS SYSTEM (CLAIM PATH OPERATIONS)
  if (activePath === 'claim') {
    return (
      <ClaimFlowLayout
        activeStep={claimStep === 'searching' ? 'search' : claimStep === 'select_business' ? 'match' : claimStep}
        currentStepIndex={
          claimStep === 'phone' ? 1 :
          claimStep === 'searching' ? 2 :
          claimStep === 'select_business' ? 2 :
          claimStep === 'otp' ? 3 : 4
        }
        showBack={claimStep !== 'success' && claimStep !== 'suspicious_hold'}
        onBack={() => {
          if (claimStep === 'otp') {
            setClaimStep('select_business');
          } else if (claimStep === 'select_business' || claimStep === 'searching') {
            setClaimStep('phone');
          } else {
            setActivePath('welcome');
          }
        }}
      >
        <AnimatePresence mode="wait">
          
          {/* STEP 2 - ENTER TELEPHONE FOR LOOKUP */}
          {claimStep === 'phone' && (
            <motion.div
              key="phone"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="space-y-6"
            >
              <div className="text-center max-w-sm mx-auto space-y-1.5">
                <h3 className="text-xl font-black text-white tracking-tight leading-tight">Claim Your Business</h3>
                <p className="text-xs text-zinc-400 leading-normal font-medium">
                  Manage photos, offers, posts, WhatsApp, and business information.
                </p>
              </div>

              <form onSubmit={handlePhoneSubmit} className="space-y-4 text-xs font-semibold text-left font-sans">
                <div className="space-y-2">
                  <label className="text-zinc-400 block font-bold text-[11px] uppercase tracking-wider font-mono">
                    Owner Telephone Number
                  </label>
                  <div className="flex gap-3">
                    {/* Dial code custom dropdown list */}
                    <div className="relative">
                      <select 
                        value={phoneCountry} 
                        onChange={(e) => setPhoneCountry(e.target.value)}
                        className="bg-zinc-950 text-white py-4 px-3.5 rounded-2xl border border-white/10 focus:outline-none focus:border-amber-500 cursor-pointer text-xs font-mono font-black w-24 appearance-none text-left"
                      >
                        <option value="+964">🇮🇶 +964</option>
                        <option value="+971">🇦🇪 +971</option>
                        <option value="+965">🇰🇼 +965</option>
                      </select>
                      <ChevronDown className="w-4 h-4 text-zinc-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>

                    {/* Mask inputs */}
                    <div className="relative flex-grow">
                      <input 
                        type="tel"
                        required
                        value={phoneNumberInput}
                        onChange={(e) => setPhoneNumberInput(e.target.value)}
                        placeholder="e.g. 7701234567 or 07701234567"
                        className="w-full bg-zinc-950 text-white p-4 pl-10 rounded-2xl border border-white/10 focus:outline-none focus:border-amber-500 font-mono font-extrabold text-xs"
                      />
                      <Phone className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={!isPhoneValidated}
                  className="w-full py-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-450 hover:to-amber-550 text-black font-black text-xs uppercase tracking-wider rounded-2xl transition shadow-lg disabled:opacity-35 cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span>Continue</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              <div className="p-3.5 bg-zinc-950/40 border border-white/5 rounded-2xl text-center flex items-center gap-2 justify-center">
                <Info className="w-4.5 h-4.5 text-zinc-500 shrink-0" />
                <p className="text-[10px] text-zinc-450 font-bold leading-relaxed text-left">
                  Our algorithm matches your number instantly across preexisting Saku Maku directory profiles.
                </p>
              </div>
            </motion.div>
          )}

          {/* STEP 3 - PSYCHOLOGICAL SEARCHING LOAD STATE */}
          {claimStep === 'searching' && (
            <motion.div
              key="searching"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <LoadingSkeletons type="search" />
            </motion.div>
          )}

          {/* STEP 4A & 4B & 4C - MULTIPLE CHOICE AND FUZZY FIND OR EMPTY STATE MATCH */}
          {claimStep === 'select_business' && (
            <motion.div
              key="select_business"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="space-y-6 text-left"
            >
              <div className="text-center max-w-sm mx-auto space-y-1">
                <h4 className="text-lg font-black text-white tracking-widest leading-none">Preexisting Spots Matched</h4>
                <p className="text-xs text-zinc-450 font-medium">
                  {matchedBusinesses.length > 0 
                    ? `Matched ${matchedBusinesses.length} registries. Choose yours to continue validation:`
                    : 'No active hotlines found. Search Saku Maku manual registries to link your profile:'}
                </p>
              </div>

              {/* Fuzzy Search Filters if no auto results or multiple found */}
              <div className="space-y-2 text-xs font-semibold">
                <div className="relative">
                  <input 
                    type="text"
                    value={claimSearch}
                    onChange={(e) => setClaimSearch(e.target.value)}
                    placeholder="Search your business by name, category, or province..."
                    className="w-full bg-zinc-950 text-white p-3.5 border border-white/10 rounded-2xl focus:outline-none focus:border-amber-500 font-sans text-xs"
                  />
                  <Search className="w-4.5 h-4.5 text-zinc-500 absolute right-3 top-1/2 -translate-y-1/2" />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <select
                    value={claimGovFilter}
                    onChange={(e) => setClaimGovFilter(e.target.value as GovernorateCode)}
                    className="bg-zinc-950 p-3.5 rounded-2xl border border-white/10 text-zinc-300 focus:outline-none focus:border-amber-500 text-[10.5px] cursor-pointer"
                  >
                    <option value="all">📍 All Iraqi Provinces</option>
                    {GOVERNORATES.filter(g => g.code !== 'all').map(g => (
                      <option key={g.code} value={g.code}>{g.name[currentLang]}</option>
                    ))}
                  </select>

                  <select
                    value={claimCatFilter}
                    onChange={(e) => setClaimCatFilter(e.target.value)}
                    className="bg-zinc-950 p-3.5 rounded-2xl border border-white/10 text-zinc-300 focus:outline-none focus:border-amber-500 text-[10.5px] cursor-pointer"
                  >
                    <option value="all">🍔 All Categories</option>
                    {CATEGORIES.map(c => (
                      <option key={c.id} value={c.id}>{c.icon} {c.name[currentLang]}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Selected List */}
              <div className="space-y-3.5 max-h-[260px] overflow-y-auto custom-scrollbar p-1">
                {/* Check list */}
                {(matchedBusinesses.length > 0 ? matchedBusinesses : manualFilteredRegistry).length === 0 ? (
                  // Empty State 4C Integration
                  <EmptyState
                    currentLang={currentLang}
                    onSearchManually={() => setClaimSearch('')}
                    onRegisterNew={() => setActivePath('add_spot')}
                  />
                ) : (
                  (matchedBusinesses.length > 0 ? matchedBusinesses : manualFilteredRegistry).map(biz => (
                    <BusinessCard
                      key={biz.id}
                      business={biz}
                      currentLang={currentLang}
                      isSelected={selectedBizForClaim?.id === biz.id}
                      onSelect={() => setSelectedBizForClaim(biz)}
                    />
                  ))
                )}
              </div>

              {selectedBizForClaim && (
                <button
                  onClick={() => setClaimStep('otp')}
                  className="w-full py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-black font-black text-xs uppercase tracking-wider rounded-2xl transition hover:opacity-95 shadow-md flex items-center justify-center gap-1.5 cursor-pointer font-sans"
                >
                  <span>This Is My Business — Link Profile</span>
                  <ArrowRight className="w-4 h-4 stroke-[2.5px]" />
                </button>
              )}
            </motion.div>
          )}

          {/* STEP 5 - OTP SMS ENTER SYSTEM */}
          {claimStep === 'otp' && (
            <motion.div
              key="otp"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <OTPInput
                currentLang={currentLang}
                phoneWithCountry={phoneCountry + normalizePhone(phoneNumberInput)}
                onVerify={handleVerifyOtp}
                onBack={() => setClaimStep('phone')}
              />
            </motion.div>
          )}

          {/* SUSPICIOUS PENDING SCREEN */}
          {claimStep === 'suspicious_hold' && (
            <motion.div
              key="suspicious"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-5 text-center py-4"
            >
              <div className="mx-auto w-14 h-14 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 animate-pulse">
                <ShieldAlert className="w-7 h-7" />
              </div>

              <div className="space-y-2">
                <h4 className="text-base font-black text-white">Verification Pending Administrative Audit</h4>
                <p className="text-xs text-zinc-400 leading-relaxed max-w-sm mx-auto font-medium">
                  This listing is currently flagged due to previous ownership attachments or high-volume visitor bookmarks. Our security admin moderators will verify your claim manually. Status alerts will reach you on WhatsApp within 2 hours.
                </p>
              </div>

              <button
                onClick={() => setActivePath('welcome')}
                className="px-6 py-2.5 bg-zinc-950 border border-white/5 hover:bg-zinc-900 text-zinc-300 font-black text-xs uppercase tracking-wider rounded-xl transition cursor-pointer"
              >
                Back to Onboarding Lobby
              </button>
            </motion.div>
          )}

          {/* VERIFICATION SUCCESS SCREEN */}
          {claimStep === 'success' && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6 text-center py-4 text-sans"
            >
              {/* Confetti particle glow */}
              <div className="mx-auto w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <CheckCircle2 className="w-8 h-8 stroke-[2px]" />
              </div>

              <div className="space-y-2">
                <span className="text-[10px] text-emerald-400 font-extrabold tracking-wider uppercase font-mono block">
                  Ownership Confirmed
                </span>
                <h4 className="text-lg font-black text-white leading-tight">
                  Business Claimed Successfully!
                </h4>
                <p className="text-xs text-zinc-400 leading-normal font-medium max-w-sm mx-auto">
                  You have successfully unlocked the master dashboard overlay for {selectedBizForClaim?.name[currentLang] || 'your spot'}. 
                </p>
              </div>

              <div className="p-4 bg-zinc-950/80 border border-white/5 rounded-2xl text-left max-w-sm mx-auto text-[10.5px] text-zinc-400 space-y-1.5 font-mono">
                <div className="flex items-center gap-1.5 text-emerald-400 font-bold border-b border-white/5 pb-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>REGISTRY RECORD SYNCED</span>
                </div>
                <p>• Role: Active Verified Owner</p>
                <p>• Registry: business_owners // synced</p>
                <p>• Security audit token: {Math.random().toString(36).substring(2, 10).toUpperCase()}</p>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => {
                    // Instantly trigger window reload to apply active owner changes
                    window.location.reload();
                  }}
                  className="px-6 py-3.5 bg-[#FF6B4A] hover:bg-[#FF8563] text-black hover:text-black font-black text-xs uppercase tracking-wider rounded-xl transition duration-300 shadow-xl cursor-pointer"
                >
                  Enter Owner HQ Dashboard ➔
                </button>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </ClaimFlowLayout>
    );
  }

  // STANDARD CONTRIBUTORS INPUT REGISTRY
  return (
    <div className="w-full max-w-xl mx-auto bg-[#101012]/90 backdrop-blur-xl border border-white/5 rounded-[32px] p-6 sm:p-8 text-left font-sans shadow-2xl relative">
      <div className="absolute top-0 right-0 w-36 h-36 bg-amber-500/5 rounded-full blur-2xl pointer-events-none" />

      <div className="space-y-6 relative z-10">
        
        {/* Contributors Header */}
        <div className="flex items-center justify-between border-b border-white/5 pb-4">
          <div className="space-y-1">
            <h3 className="text-sm font-black text-white uppercase flex items-center gap-2">
              <PlusCircle className="w-4.5 h-4.5 text-amber-500" />
              <span>Contribute New High Street Spot</span>
            </h3>
            <p className="text-[11px] text-zinc-400 leading-normal">
              Help the Iraqi community discover new hotspots, cafes or boutiques anonymously.
            </p>
          </div>
          <button
            onClick={() => setActivePath('welcome')}
            className="px-3 py-1.5 bg-white/5 hover:bg-white/10 text-[9px] font-black uppercase text-zinc-400 rounded-lg transition"
          >
            Cancel
          </button>
        </div>

        <AnimatePresence>
          {standardSuccess && (
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ opacity: 0 }}
              className="p-4 bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 rounded-2xl text-xs flex items-start gap-2.5"
            >
              <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-400 mt-0.5" />
              <div>
                <h4 className="font-extrabold">Contribution Logged!</h4>
                <p className="text-[10.5px] text-zinc-400 mt-0.5 leading-relaxed">
                  Thank you for helping out! Saku Maku directory moderators will review your spot request to activate maps location and filters within 24 hours.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <form onSubmit={handleStandardSubmit} className="space-y-4 text-xs font-semibold">
          
          <div className="space-y-1.5">
            <label className="text-zinc-400 block font-bold">Spot Business Name</label>
            <input 
              type="text"
              required
              placeholder="e.g. Baghdad Aroma Cafe"
              value={standardName}
              onChange={(e) => setStandardName(e.target.value)}
              className="w-full bg-zinc-950 text-white p-3.5 rounded-xl border border-white/10 focus:outline-none focus:border-amber-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-zinc-400 block font-bold">Primary Classification</label>
              <select
                value={standardCategory}
                onChange={(e) => setStandardCategory(e.target.value)}
                className="w-full bg-zinc-950 text-white p-3.5 rounded-xl border border-white/10 focus:outline-none focus:border-amber-500 cursor-pointer"
              >
                {CATEGORIES.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.icon} {cat.name[currentLang]}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-zinc-400 block font-bold">Iraqi Governorate Province</label>
              <select
                value={standardGov}
                onChange={(e) => setStandardGov(e.target.value as GovernorateCode)}
                className="w-full bg-zinc-950 text-white p-3.5 rounded-xl border border-white/10 focus:outline-none focus:border-amber-500 cursor-pointer"
              >
                {GOVERNORATES.filter(g => g.code !== 'all').map(gov => (
                  <option key={gov.code} value={gov.code}>{gov.name[currentLang]}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-zinc-400 block font-bold">Listing Hotline Number (Optional)</label>
            <input 
              type="tel"
              placeholder="e.g. 07701234567"
              value={standardPhone}
              onChange={(e) => setStandardPhone(e.target.value)}
              className="w-full bg-zinc-950 text-white p-3.5 rounded-xl border border-white/10 focus:outline-none focus:border-amber-500 font-mono text-xs"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-zinc-400 block font-bold">Location Address Description</label>
            <div className="relative">
              <input 
                type="text"
                required
                placeholder="e.g. Karrada, Al-Attar street section"
                value={standardAddress}
                onChange={(e) => setStandardAddress(e.target.value)}
                className="w-full bg-zinc-950 text-white p-3.5 pl-10 rounded-xl border border-white/10 focus:outline-none focus:border-amber-500"
              />
              <Navigation className="w-3.5 h-3.5 text-zinc-550 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-zinc-400 block font-bold">Snapshot Cover image URL</label>
            <div className="relative">
              <input 
                type="url"
                placeholder="https://images.unsplash.com/..."
                value={standardImageUrl}
                onChange={(e) => setStandardImageUrl(e.target.value)}
                className="w-full bg-zinc-950 text-white p-3.5 pl-10 rounded-xl border border-white/10 focus:outline-none focus:border-amber-500 font-mono text-xs"
              />
              <ImageIcon className="w-3.5 h-3.5 text-zinc-550 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-zinc-400 block font-bold">Spot Presentation Bio (Description)</label>
            <textarea
              required
              rows={3}
              placeholder="Please write down unique specialities or recommendations of this café / store..."
              value={standardDesc}
              onChange={(e) => setStandardDesc(e.target.value)}
              className="w-full bg-zinc-950 text-white p-3.5 rounded-xl border border-white/10 focus:outline-none focus:border-amber-500 leading-relaxed text-xs font-semibold"
            />
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-gradient-to-r from-zinc-800 to-zinc-900 border border-white/10 hover:border-white/30 text-white font-black text-xs uppercase tracking-wider rounded-2xl transition duration-300 shadow-lg cursor-pointer flex items-center justify-center gap-1.5"
          >
            <span>Register New Spot</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
