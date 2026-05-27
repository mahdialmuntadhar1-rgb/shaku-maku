import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Store, ChevronDown, CheckCircle, Navigation, Phone, 
  Info, Image as ImageIcon, Sparkles, Heart, Bookmark, 
  FileText, Award, ShieldCheck, Flame, Search, Smartphone, ShieldAlert,
  Clock, Check, Eye, Trash2, Send, Edit, AlertTriangle
} from 'lucide-react';
import { Business, Language, GovernorateCode, UserProfile, SocialPost, BusinessClaim } from '../types';
import { GOVERNORATES, CATEGORIES } from '../data';
import { doc, updateDoc, setDoc, collection, addDoc, getDocs, query, where, Timestamp } from 'firebase/firestore';
import { db } from '../firebase';

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
  
  // Primary operational paths
  const [activePath, setActivePath] = useState<'welcome' | 'claim' | 'add_spot'>('welcome');
  
  // Claim System state flow steps
  // 'phone' -> 'select_business' -> 'otp' -> 'suspicious_hold' | 'success'
  const [claimStep, setClaimStep] = useState<'phone' | 'select_business' | 'otp' | 'suspicious_hold' | 'success'>('phone');
  
  // Phone verification inputs
  const [phoneCountry, setPhoneCountry] = useState('+964');
  const [phoneNumberInput, setPhoneNumberInput] = useState('');
  const [otpCodeInput, setOtpCodeInput] = useState(['', '', '', '']);
  const [incorrectOtpCount, setIncorrectOtpCount] = useState(0);
  const [rateLimitActive, setRateLimitActive] = useState(false);
  const [otpResendTimer, setOtpResendTimer] = useState(0);

  // Manual search registry filter & search states
  const [claimSearch, setClaimSearch] = useState('');
  const [claimGovFilter, setClaimGovFilter] = useState<GovernorateCode>('all');
  const [claimCatFilter, setClaimCatFilter] = useState<string>('all');
  const [selectedBizForClaim, setSelectedBizForClaim] = useState<Business | null>(null);
  const [isSearchingRegistry, setIsSearchingRegistry] = useState(false);

  // Success state for standard contributor add-spot form
  const [standardName, setStandardName] = useState('');
  const [standardDesc, setStandardDesc] = useState('');
  const [standardCategory, setStandardCategory] = useState('cafe_bakery');
  const [standardGov, setStandardGov] = useState<GovernorateCode>('baghdad');
  const [standardPhone, setStandardPhone] = useState('');
  const [standardAddress, setStandardAddress] = useState('');
  const [standardImageUrl, setStandardImageUrl] = useState('');
  const [standardSuccess, setStandardSuccess] = useState(false);

  // Merchant editing parameters for fully responsive Dashboard V2
  const [editName, setEditName] = useState('');
  const [editDesc, setEditDesc] = useState('');
  const [editPhone, setEditPhone] = useState('');
  const [editAddress, setEditAddress] = useState('');
  const [editCover, setEditCover] = useState('');
  const [editCategory, setEditCategory] = useState('');
  const [editGov, setEditGov] = useState<GovernorateCode>('baghdad');
  const [editWhatsApp, setEditWhatsApp] = useState('');
  
  // Additional Dashboard V2 details: Weekly opening hours
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

  // Broadcast creation fields for Campaign Stream
  const [postCaption, setPostCaption] = useState('');
  const [postPromo, setPostPromo] = useState('');
  const [postImage, setPostImage] = useState('');
  const [submittingPost, setSubmittingPost] = useState(false);
  const [postSuccess, setPostSuccess] = useState(false);

  // Past broadcast modifications
  const [archiveSearch, setArchiveSearch] = useState('');
  const [editingPostId, setEditingPostId] = useState<string | null>(null);
  const [editPostCaption, setEditPostCaption] = useState('');
  const [editPostPromo, setEditPostPromo] = useState('');
  const [isDeletingPostId, setIsDeletingPostId] = useState<string | null>(null);

  // Detect active owner state
  const isOwner = userProfile?.role === 'owner';
  const myBusiness = businesses.find(b => b.ownerUid === user?.uid || (userProfile?.businessId && b.id === userProfile.businessId));

  // Multilingual dynamic claim content mapping
  const labels = {
    en: {
      claimTab: "Claim Ownership",
      claimSubtitle: "Manage photos, posts, offers, WhatsApp, and business details.",
      visitorTab: "Add Spot",
      visitorSubtitle: "Help the community discover new places across Iraq.",
      phonePlaceholder: "Phone number (e.g. 7701234567)",
      normalizeSuccess: "Normalized phone successfully",
      searchHint: "Search your business by name, category, or province",
      verifyTitle: "Verify Ownership",
      otpAlert: "Simulation code is 1234",
      suspiciousTitle: "Verification Pending Audit",
      suspiciousText: "This business profile is flagged due to high community traffic or previous registrations. Our administrative moderators are auditing your request. Verification decisions will be sent to your WhatsApp shortly.",
      claimedSuccess: "Success! Profile unlocked.",
      claimCta: "Claim This Spot",
      verifiedBadge: "Verified Merchant",
      hoursTitle: "Configure Weekly Opening Hours",
      whatsappLabel: "Active WhatsApp Link",
      publishCta: "Launch Live Stream Update 🚀"
    },
    ar: {
      claimTab: "إثبات ملكية مشروعك",
      claimSubtitle: "إدارة الصور، والمنشورات، والعروض، وواتساب، وتوثيق النشاط.",
      visitorTab: "إضافة مكان جديد",
      visitorSubtitle: "ساعد أبناء المجتمع في العثور على أماكن ممتعة في العراق.",
      phonePlaceholder: "رقم الهاتف (مثل 7701234567)",
      normalizeSuccess: "تمت تهيئة رقم الهاتف بنجاح",
      searchHint: "ابحث عن مشروعك حسب الاسم أو الفئة أو المحافظة",
      verifyTitle: "التحقق من الملكية",
      otpAlert: "رمز التحقق التجريبي هو 1234",
      suspiciousTitle: "قيد المراجعة التدقيقية",
      suspiciousText: "تم وضع هذا الطلب قيد التدقيق الإداري نظراً للتفاعل العالي على الصفحة أو تسجيلات سابقة. يقوم مديرو النظام حالياً بمراجعة توثيقك لتجنب انتحال الصفة. سيصلك إشعار بالقرار على واتساب قريباً.",
      claimedSuccess: "رائع! تم تفعيل لوحة التحكم بنجاح.",
      claimCta: "أثبت ملكية هذا المكان",
      verifiedBadge: "تاجر موثق",
      hoursTitle: "تعديل أوقات العمل الأسبوعية",
      whatsappLabel: "رابط واتساب النشط",
      publishCta: "أطلق عرضاً حياً للجمهور 🚀"
    },
    ku: {
      claimTab: "خاوەندارێتی شوێنەکەت بسەلمێنە",
      claimSubtitle: "بەڕێوەبردنی وێنەکان، بڵاوکراوەکان، ژمارەی واتسئەپ، و زانیارییەکانی تر.",
      visitorTab: "زیادکردنی شوێنی نوێ",
      visitorSubtitle: "یارمەتی خەڵکی بدە بۆ دۆزینەوەی باشترین کینە و براندەکان لە عێراق.",
      phonePlaceholder: "ژمارەی مۆبایل (بۆ نموونە 7701234567)",
      normalizeSuccess: "ژمارەی مۆبایلەکە بە سەرکەوتوویی ئامادەکرا",
      searchHint: "بەپێی ناو، پۆلێن یان پارێزگا شوێنەکەت بگەڕێ",
      verifyTitle: "دڵنیابوونەوەی خاوەندارێتی",
      otpAlert: "کۆدی تاقیکردنەوە ١٢٣٤",
      suspiciousTitle: "پێویستی بە پێداچوونەوەیە",
      suspiciousText: "ئەم دەستنیشانکردنە خراوەتە ژێر چاودێری سیستەمەوە بەهۆی چالاکی زۆر یان تۆمارکردنی پێشووتر. بەڕێوەبەران خەریکی پێداچوونەوەن. ئاگادارکردنەوەی فەرمی لە ڕێگەی واتسئەپەوە دەگاتە دەستت.",
      claimedSuccess: "سەرکەوتوو بوو! کۆنترۆڵ پانێڵ کارا کرا.",
      claimCta: "خاوەندارێتی بکە",
      verifiedBadge: "فرۆشیاری فەرمی",
      hoursTitle: "کاتی کارکردنی هەفتانە",
      whatsappLabel: "بەستەری واتسئەپی کارا",
      publishCta: "نوێترین بڵاوکراوە بنێرە 🚀"
    }
  }[currentLang];

  // Load editing hooks once merchant business is retrieved
  useEffect(() => {
    if (myBusiness) {
      setEditName(myBusiness.name[currentLang] || myBusiness.name.en || '');
      setEditDesc(myBusiness.description[currentLang] || myBusiness.description.en || '');
      setEditPhone(myBusiness.phoneNumber || '');
      setEditAddress(myBusiness.address[currentLang] || myBusiness.address.en || '');
      setEditCover(myBusiness.image || '');
      setEditCategory(myBusiness.category || 'cafe_bakery');
      setEditGov(myBusiness.governorate || 'baghdad');
      
      // Load WhatsApp and schedule parameters if saved in custom fields
      const details = (userProfile?.businessOnboarding as any) || {};
      setEditWhatsApp(details.whatsApp || myBusiness.phoneNumber || '');
      if (details.openingHours) {
        setOpeningHours(details.openingHours);
      }
    }
  }, [myBusiness, currentLang, userProfile]);

  // Dynamic countdown timer for OTP resend
  useEffect(() => {
    if (otpResendTimer > 0) {
      const timer = setTimeout(() => setOtpResendTimer(otpResendTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [otpResendTimer]);

  // Robust Phone Number Normalizer Function
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

  // Typo-tolerant fuzzy matching logic for names
  const matchFuzzy = (target: string, queryText: string): boolean => {
    const targetNorm = target.toLowerCase().replace(/\s+/g, '');
    const queryNorm = queryText.toLowerCase().replace(/\s+/g, '');
    if (targetNorm.includes(queryNorm)) return true;
    
    // Levenshtein-like mistake tolerances up to max 2 errors
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

  // Perform dynamic filtered lookup across highstreet registry
  const filteredRegistry = useMemo(() => {
    const cleanedSearch = claimSearch.trim();
    return businesses.filter(b => {
      // 1) Governorate matches
      const matchesGov = claimGovFilter === 'all' || b.governorate === claimGovFilter;
      // 2) Category matches
      const matchesCat = claimCatFilter === 'all' || b.category === claimCatFilter;
      // 3) Fuzzy Text search
      const matchesText = !cleanedSearch || 
        matchFuzzy(b.name[currentLang] || '', cleanedSearch) ||
        matchFuzzy(b.name.en || '', cleanedSearch) ||
        matchFuzzy(b.description[currentLang] || '', cleanedSearch);
      
      return matchesGov && matchesCat && matchesText;
    });
  }, [businesses, claimSearch, claimGovFilter, claimCatFilter, currentLang]);

  // Target matching telephone queries
  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rateLimitActive) return;
    
    const inputClean = normalizePhone(phoneNumberInput);
    if (inputClean.length < 8) {
      alert("Please enter a valid Iraqi telephone number");
      return;
    }

    setIsSearchingRegistry(true);
    
    setTimeout(() => {
      // Query active portfolio phone numbers
      const matches = businesses.filter(b => {
        if (!b.phoneNumber) return false;
        return normalizePhone(b.phoneNumber) === inputClean;
      });

      setIsSearchingRegistry(false);
      
      if (matches.length > 0) {
        // Direct match found! Go directly to OTP or select among matches
        if (matches.length === 1) {
          setSelectedBizForClaim(matches[0]);
          setClaimStep('otp');
        } else {
          // Multiple matches
          setSelectedBizForClaim(null);
          setClaimStep('select_business');
        }
      } else {
        // No auto-phone link matches. Give option to manually search the platform's registry
        setSelectedBizForClaim(null);
        setClaimStep('select_business');
      }
      
      setOtpResendTimer(60);
    }, 850);
  };

  // Trigger simulated resend of verification SMS
  const handleResendOtp = () => {
    if (otpResendTimer > 0) return;
    setOtpResendTimer(60);
    alert(`${labels.otpAlert}`);
  };

  // Handle standard numerical keypad OTP typing flow
  const handleOtpCharChange = (val: string, index: number) => {
    const newVal = val.replace(/\D/g, '').substring(0, 1);
    const updated = [...otpCodeInput];
    updated[index] = newVal;
    setOtpCodeInput(updated);

    // Autofocus next element
    if (newVal && index < 3) {
      const nextInput = document.getElementById(`otp-char-${index + 1}`);
      nextInput?.focus();
    }
  };

  // Main Claim Submissions & Verification Algorithm
  const handleVerifyOtp = async () => {
    const fullCode = otpCodeInput.join('');
    if (fullCode.length < 4) return;

    // Standard Sandbox passcode bypass
    if (fullCode !== '1234') {
      const fails = incorrectOtpCount + 1;
      setIncorrectOtpCount(fails);
      alert("Invalid verification code. Please try again.");
      
      if (fails >= 3) {
        setRateLimitActive(true);
        setTimeout(() => {
          setRateLimitActive(false);
          setIncorrectOtpCount(0);
        }, 120000); // 2 minute lock out for rate limiting
        alert("Too many failed attempts. OTP verification requests are locked for 2 minutes to protect registry.");
      }
      return;
    }

    if (!selectedBizForClaim) return;

    // Detect claim security level triggers (Suspicious Claims)
    // Criteria: already has another active user registered as owner, or highly active (likes/saves > 50)
    const isAlreadyOwned = selectedBizForClaim.ownerUid && selectedBizForClaim.ownerUid !== 'system-seed';
    const isHighlyPopular = (selectedBizForClaim.likes || 0) + (selectedBizForClaim.saves || 0) > 50;
    const isSuspicious = Boolean(isAlreadyOwned || isHighlyPopular);

    const claimId = `claim-${selectedBizForClaim.id}-${user.uid}`;
    
    // Save claim document audit history to Firestore
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
        // Auto-approve: Upgrade user profile & write to business_owners and update businesses collection
        const ownerRecordId = `owner-${user.uid}-${selectedBizForClaim.id}`;
        
        await setDoc(doc(db, 'business_owners', ownerRecordId), {
          id: ownerRecordId,
          userId: user.uid,
          businessId: selectedBizForClaim.id,
          role: 'owner',
          verified: true,
          createdAt: new Date().toISOString()
        });

        // Update businesses profile in Firestore to link the user's UID
        await updateDoc(doc(db, 'businesses', selectedBizForClaim.id), {
          ownerUid: user.uid,
          isVerified: true,
          phoneNumber: phoneCountry + normalizePhone(phoneNumberInput)
        });

        // Update active profile state
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
      console.error("Verification processing fault: ", err);
      alert("Failed to submit verification claims to Firestore.");
    }
  };

  // Handle standard visitor additions form
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
    
    // Clear elements
    setStandardName('');
    setStandardDesc('');
    setStandardPhone('');
    setStandardAddress('');
    setStandardImageUrl('');

    setTimeout(() => {
      setStandardSuccess(false);
      setActivePath('welcome');
    }, 5000);
  };

  // MERCHANT PORTFOLIO UPDATES WORKFLOW
  const handleUpdateSpot = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!myBusiness || submittingUpdate) return;
    setSubmittingUpdate(true);
    setUpdateSuccess(false);

    try {
      const bizRef = doc(db, 'businesses', myBusiness.id);
      
      // Compute updated hours payload in Onboarding map
      const details = (userProfile?.businessOnboarding as any) || {};
      const updatedOnboarding = {
        ...details,
        name: editName.trim(),
        category: editCategory,
        governorate: editGov,
        address: editAddress.trim(),
        phone: editPhone.trim(),
        whatsApp: editWhatsApp.trim(),
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
        category: editCategory,
        governorate: editGov
      });

      // Update users profile metadata containing advanced claim configurations too
      await onUpdateProfile({
        businessOnboarding: updatedOnboarding
      });

      setUpdateSuccess(true);
      setTimeout(() => setUpdateSuccess(false), 4000);
    } catch (err) {
      console.error("Fault updating businesses doc values: ", err);
      alert("Error saving business profile updates");
    } finally {
      setSubmittingUpdate(false);
    }
  };

  // MERCHANT STORY BROADCAST LAUNCHER
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
      likes: 12,
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
      setTimeout(() => setPostSuccess(false), 4000);
    } catch (err) {
      console.error("Error launching stream deals: ", err);
      alert("Could not post live campaign stream.");
    } finally {
      setSubmittingPost(false);
    }
  };

  // GUEST GATES: Show Sign In CTA
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
            <span className="text-[10px] text-luxury-gold font-extrabold uppercase tracking-widest block font-mono">Platform Integration Portal</span>
            <h3 className="text-base font-black text-white mt-1">
              {currentLang === 'en' ? 'Manage & Claim Your Listing' : currentLang === 'ku' ? 'چوونەژوورەوەی فرۆشیار' : 'إدارة وتوثيق نشاط مشروعك التجاري'}
            </h3>
            <p className="text-xs text-zinc-400 mt-1.5 leading-relaxed max-w-sm mx-auto">
              {currentLang === 'en'
                ? 'Sign in via Saku Maku authorization keys to verify business ownership, link WhatsApp, and broadcast flash campaigns.'
                : currentLang === 'ku'
                ? 'لە ڕێگەی فەرمیەوە ببرستە بە شکو ماکۆوە بۆ دڵنیابوونەوەی خاوەندارێتی و ناردنی پۆست.'
                : 'قم بتسجيل الدخول فورا لإثبات ملكية نشاطك التجاري الحالي، وتحديث العنوان، وعرض المنشورات للزبائن مباشرة.'}
            </p>
          </div>

          <button
            onClick={onSignIn}
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-gradient-to-r from-luxury-teal to-luxury-gold hover:from-white hover:to-white text-white hover:text-black font-black text-xs uppercase tracking-wider rounded-xl transition cursor-pointer shadow-xl duration-300 font-sans"
            style={{ width: 'auto' }}
          >
            🔑 {currentLang === 'en' ? 'Sign In with Google' : currentLang === 'ku' ? 'چوونەژوورەوە لە ڕێگەی مۆبایل/گووگڵ' : 'سجل دخول باستخدام جوجل للبدء'}
          </button>
        </div>
      </div>
    );
  }

  // ACTIVE ONBOARDED OWNER GATE - RENDER GORGEOUS V2 MERCHANT CAMPAIGN CONTROL CENTER
  if (isOwner && myBusiness) {
    const isRtl = currentLang === 'ar' || currentLang === 'ku';
    const myStoriesAndPosts = posts.filter(p => p.businessId === myBusiness.id || p.authorUid === user.uid);

    return (
      <div className="w-full max-w-5xl mx-auto space-y-8 text-left" dir={isRtl ? 'rtl' : 'ltr'}>
        
        {/* Spot Owner Dashboard Hero Card */}
        <div className="relative overflow-hidden bg-gradient-to-r from-zinc-950 to-zinc-900 border border-luxury-gold/30 rounded-3xl p-6 sm:p-8 shadow-2xl">
          <div className="absolute top-0 right-0 w-80 h-80 bg-luxury-teal/15 rounded-full blur-[110px] pointer-events-none"></div>
          
          <div className="relative flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className={`flex items-center gap-4 text-center ${isRtl ? 'sm:text-right' : 'sm:text-left'}`}>
              <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-luxury-gold p-0.5 bg-[#1C1C24] shrink-0">
                <img 
                  src={myBusiness.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'} 
                  alt="Spot logo" 
                  className="w-full h-full object-cover rounded-xl font-sans"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="space-y-1">
                <span className="text-[9px] bg-luxury-teal/15 font-black px-2 py-0.5 text-luxury-gold rounded-md border border-luxury-gold/25 tracking-wider uppercase inline-flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>{labels.verifiedBadge}</span>
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-white leading-tight">
                  {myBusiness.name[currentLang] || myBusiness.name.en}
                </h2>
                <p className="text-xs text-zinc-400">
                  📍 {myBusiness.address[currentLang] || myBusiness.address.en}
                </p>
              </div>
            </div>

            {/* Premium Metrics segment */}
            <div className="grid grid-cols-2 gap-3 shrink-0 w-full sm:w-auto">
              <div className="bg-white/5 border border-white/10 px-4 py-2.5 rounded-2xl text-center">
                <div className="flex items-center justify-center gap-1 text-pink-500 text-xs font-black">
                  <Heart className="w-4 h-4 fill-pink-500 shrink-0" />
                  <span>{myBusiness.likes || 15}</span>
                </div>
                <span className="text-[9px] text-zinc-500 block font-semibold mt-1">Likes Metric</span>
              </div>

              <div className="bg-white/5 border border-white/10 px-4 py-2.5 rounded-2xl text-center">
                <div className="flex items-center justify-center gap-1 text-luxury-gold text-xs font-black">
                  <Bookmark className="w-4 h-4 fill-luxury-gold shrink-0" />
                  <span>{myBusiness.saves || 8}</span>
                </div>
                <span className="text-[9px] text-zinc-500 block font-semibold mt-1">Saves Metric</span>
              </div>
            </div>
          </div>
        </div>

        {/* Triple Column Actions Swiper grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Column A: Story & Deals Broadcast Module */}
          <div className="bg-[#141417]/95 border border-white/5 rounded-3xl p-6 space-y-5 relative">
            <div className="absolute top-0 right-0 w-36 h-36 bg-orange-500/5 rounded-full blur-[80px] pointer-events-none"></div>
            
            <div className="border-b border-white/5 pb-3.5">
              <h3 className="text-sm font-black text-white uppercase flex items-center gap-2 font-sans">
                <Flame className="w-4.5 h-4.5 text-orange-500 animate-pulse" />
                <span>Publish Active Community Deals & Posts</span>
              </h3>
              <p className="text-[11px] text-zinc-400 leading-normal mt-1">
                Post instantaneous menus, discounts, live events, or photos to Saku Maku's community Pulse feeds!
              </p>
            </div>

            <AnimatePresence>
              {postSuccess && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-green-950/40 border border-green-500/20 text-green-300 p-3 rounded-xl text-xs flex items-center gap-2"
                >
                  <CheckCircle className="w-4.5 h-4.5 shrink-0" />
                  <span>Broadcast published successfully! Refreshing active queues.</span>
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handlePublishStory} className="space-y-4 text-xs font-medium text-left">
              <div className="space-y-1.5">
                <label className="text-zinc-400 block font-bold">Post Caption / Message</label>
                <textarea
                  required
                  rows={3}
                  value={postCaption}
                  onChange={(e) => setPostCaption(e.target.value)}
                  placeholder="e.g. Damascus Jasmine Cafe filter brew deal! 15% discount for families tonight ☕..."
                  className="w-full bg-[#020205]/45 text-white p-3 rounded-xl border border-white/10 focus:outline-none focus:border-luxury-gold leading-relaxed font-sans"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-zinc-400 block font-bold">Hot Promotion Badge (Optional)</label>
                  <input
                    type="text"
                    value={postPromo}
                    onChange={(e) => setPostPromo(e.target.value)}
                    placeholder="e.g. 15% Discount Tonight"
                    className="w-full bg-[#020205]/45 text-white p-3 rounded-xl border border-white/10 focus:outline-none focus:border-luxury-gold font-sans font-semibold text-xs"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-zinc-400 block font-bold">Campaign Media Banner URL</label>
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
                className="w-full py-3.5 bg-gradient-to-r from-orange-500 to-amber-500 text-black text-xs font-black uppercase rounded-xl tracking-wider transition hover:scale-102 active:scale-95 cursor-pointer disabled:opacity-40 shadow-lg font-mono"
              >
                {submittingPost ? 'Publishing campaign...' : labels.publishCta}
              </button>
            </form>
          </div>

          {/* Column B: Portfolio configurations & Hour edits */}
          <div className="bg-[#141417]/95 border border-white/5 rounded-3xl p-6 space-y-5 relative">
            <div className="absolute top-0 right-0 w-36 h-36 bg-cyan-500/5 rounded-full blur-[80px] pointer-events-none"></div>

            <div className="border-b border-white/5 pb-3.5">
              <h3 className="text-sm font-black text-white uppercase flex items-center gap-2">
                <Award className="w-4.5 h-4.5 text-luxury-gold shrink-0" />
                <span>Manage Business Profile Portfolio</span>
              </h3>
              <p className="text-[11px] text-zinc-400 leading-normal mt-1">
                Refine address labels, set hotlines, connect active WhatsApp triggers, and change localized descriptions.
              </p>
            </div>

            <AnimatePresence>
              {updateSuccess && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-emerald-950/40 border border-emerald-500/20 text-emerald-350 p-3 rounded-xl text-xs flex items-center gap-2"
                >
                  <CheckCircle className="w-4.5 h-4.5 shrink-0" />
                  <span>Portfolio updates synced and deployed securely!</span>
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleUpdateSpot} className="space-y-4 text-xs font-medium text-left">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-zinc-400 block font-bold">Business Name</label>
                  <input
                    type="text"
                    required
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="w-full bg-[#020205]/45 text-white p-3 rounded-xl border border-white/10 focus:outline-none focus:border-luxury-gold font-bold font-sans"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-zinc-400 block font-bold">High Street Address Location</label>
                  <input
                    type="text"
                    required
                    value={editAddress}
                    onChange={(e) => setEditAddress(e.target.value)}
                    className="w-full bg-[#020205]/45 text-white p-3 rounded-xl border border-white/10 focus:outline-none focus:border-luxury-gold font-sans"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-zinc-400 block font-bold">Cover Photo URL</label>
                  <input
                    type="url"
                    required
                    value={editCover}
                    onChange={(e) => setEditCover(e.target.value)}
                    className="w-full bg-[#020205]/45 text-white p-3 rounded-xl border border-white/10 focus:outline-none focus:border-luxury-gold font-mono text-[10px]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-zinc-400 block font-bold">Platform Hotline Phone</label>
                  <input
                    type="tel"
                    required
                    value={editPhone}
                    onChange={(e) => setEditPhone(e.target.value)}
                    className="w-full bg-[#020205]/45 text-white p-3 rounded-xl border border-white/10 focus:outline-none focus:border-luxury-gold font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 border-t border-white/5 pt-3">
                <div className="space-y-1.5">
                  <label className="text-zinc-400 block font-bold">{labels.whatsappLabel}</label>
                  <input
                    type="tel"
                    required
                    value={editWhatsApp}
                    onChange={(e) => setEditWhatsApp(e.target.value)}
                    className="w-full bg-[#020205]/45 text-amber-400 p-3 rounded-xl border border-white/15 focus:outline-none focus:border-amber-400 font-mono font-bold"
                    placeholder="e.g. +9647701234567"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-zinc-400 block font-bold">Primary Classification</label>
                  <select
                    value={editCategory}
                    onChange={(e) => setEditCategory(e.target.value)}
                    className="w-full bg-[#020205]/45 text-white p-3 rounded-xl border border-white/15 focus:outline-none focus:border-luxury-gold cursor-pointer"
                  >
                    {CATEGORIES.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.icon} {cat.name[currentLang]}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Advanced hours layout */}
              <div className="border-t border-white/5 pt-3 space-y-2">
                <label className="text-zinc-400 font-black block text-[10px] uppercase flex items-center gap-1 font-mono">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{labels.hoursTitle}</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-h-[140px] overflow-y-auto custom-scrollbar p-1.5 bg-black/30 border border-white/5 rounded-xl font-mono text-[10px]">
                  {Object.keys(openingHours).map(day => (
                    <div key={day} className="flex flex-col space-y-0.5 bg-white/5 p-1.5 rounded-lg border border-white/5">
                      <span className="text-zinc-400 font-black capitalize">{day.substring(0,3)}</span>
                      <input 
                        type="text" 
                        value={openingHours[day]}
                        onChange={(e) => setOpeningHours({...openingHours, [day]: e.target.value})}
                        className="bg-transparent text-[#FF6B4A] focus:outline-none border-b border-transparent focus:border-amber-500 text-[9px] py-0.5"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-zinc-400 block font-bold">Localized Presentation Description ({currentLang.toUpperCase()})</label>
                <textarea
                  required
                  rows={2}
                  value={editDesc}
                  onChange={(e) => setEditDesc(e.target.value)}
                  className="w-full bg-[#020205]/45 text-white p-3 rounded-xl border border-white/10 focus:outline-none focus:border-luxury-gold leading-relaxed font-sans"
                />
              </div>

              <button
                type="submit"
                disabled={submittingUpdate}
                className="w-full py-3.5 bg-gradient-to-r from-luxury-teal to-luxury-gold text-white text-xs font-black uppercase rounded-xl tracking-wider transition hover:scale-102 active:scale-95 cursor-pointer disabled:opacity-40 shadow-lg font-mono font-bold"
              >
                {submittingUpdate ? 'Saving updates...' : 'Save Portfolio Configurations 💾'}
              </button>
            </form>
          </div>
        </div>

        {/* Dashboard Post/Stream archive management panel */}
        <div className="bg-[#141417]/95 border border-white/5 rounded-3xl p-6 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-4">
            <div className="text-left">
              <h3 className="text-sm font-black text-white uppercase flex items-center gap-2">
                <FileText className="w-4.5 h-4.5 text-luxury-gold" />
                <span>Interact and Manage Live Campaigns ({myStoriesAndPosts.length})</span>
              </h3>
              <p className="text-[11px] text-zinc-400 mt-1 font-sans">
                Update details, promotion badges or delete expired highstreet broadcasts instantly.
              </p>
            </div>

            <div className="w-full sm:w-64">
              <input 
                type="text"
                value={archiveSearch}
                onChange={(e) => setArchiveSearch(e.target.value)}
                placeholder="Fuzzy search broadcasts archive..."
                className="w-full bg-[#020205]/65 text-white px-3.5 py-2 text-[11px] rounded-xl border border-white/10 focus:outline-none focus:border-luxury-gold font-sans"
              />
            </div>
          </div>

          <div className="space-y-4 text-left">
            {myStoriesAndPosts.filter(p => {
              if (!archiveSearch.trim()) return true;
              return matchFuzzy(p.caption[currentLang] || p.caption.en || '', archiveSearch);
            }).map(post => {
              const isEditingThisPost = editingPostId === post.id;
              
              const saveEditPost = async () => {
                if (!editPostCaption.trim()) return;
                try {
                  await updateDoc(doc(db, 'posts', post.id), {
                    caption: { ...post.caption, [currentLang]: editPostCaption.trim() },
                    promotionBadge: editPostPromo.trim() ? {
                      ar: editPostPromo.trim(),
                      ku: editPostPromo.trim(),
                      en: editPostPromo.trim()
                    } : null
                  });
                  setEditingPostId(null);
                } catch (e) {
                  console.error("fault editing post fields: ", e);
                }
              };

              const removePost = async () => {
                if (window.confirm("Permanently deactivate this live campaign from platform feed?")) {
                  setIsDeletingPostId(post.id);
                  try {
                    const { deleteDoc, doc } = await import('firebase/firestore');
                    await deleteDoc(doc(db, 'posts', post.id));
                  } catch (e) {
                    console.error("deleting campaign err: ", e);
                  } finally {
                    setIsDeletingPostId(null);
                  }
                }
              };

              return (
                <div key={post.id} className="p-4 bg-white/5 border border-white/5 rounded-2xl flex flex-col md:flex-row gap-4 justify-between items-start md:items-center font-sans">
                  <div className="flex gap-3 items-start w-full md:max-w-xl text-left">
                    <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-white/10 bg-[#020205]">
                      <img 
                        src={post.mediaUrl || myBusiness.image} 
                        alt="Promo Media" 
                        className="w-full h-full object-cover rounded"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    
                    <div className="space-y-1 w-full font-medium">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-[9px] text-[#FF6B4A] font-extrabold flex items-center gap-1 uppercase font-mono">
                          <Flame className="w-3.5 h-3.5" />
                          <span>{post.timeAgo[currentLang] || post.timeAgo.en}</span>
                        </span>
                        {post.promotionBadge && (
                          <span className="text-[9px] bg-amber-500/15 text-amber-500 font-extrabold px-1.5 py-0.5 rounded border border-amber-500/25">
                            {post.promotionBadge[currentLang] || post.promotionBadge.en}
                          </span>
                        )}
                      </div>

                      {isEditingThisPost ? (
                        <div className="space-y-2.5 mt-2 w-full text-xs">
                          <input 
                            type="text"
                            value={editPostCaption}
                            onChange={(e) => setEditPostCaption(e.target.value)}
                            className="w-full bg-black/60 p-2 border border-white/10 rounded-lg text-white"
                          />
                          <input 
                            type="text"
                            value={editPostPromo}
                            onChange={(e) => setEditPostPromo(e.target.value)}
                            placeholder="Deals badge label..."
                            className="w-full bg-black/60 p-2 border border-white/10 rounded-lg text-amber-400 font-semibold"
                          />
                        </div>
                      ) : (
                        <p className="text-xs text-white leading-relaxed line-clamp-2">
                          {post.caption[currentLang] || post.caption.en}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-2 md:pt-0 shrink-0 w-full md:w-auto justify-end border-t border-white/5 md:border-0">
                    {isEditingThisPost ? (
                      <>
                        <button 
                          onClick={saveEditPost}
                          className="px-3.5 py-1.5 bg-green-500 text-black text-[10px] uppercase font-black rounded-lg cursor-pointer transition-all"
                        >
                          Save
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
                          onClick={() => {
                            setEditingPostId(post.id);
                            setEditPostCaption(post.caption[currentLang] || post.caption.en || '');
                            setEditPostPromo(post.promotionBadge?.[currentLang] || post.promotionBadge?.en || '');
                          }}
                          className="px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white text-[10px] font-bold rounded-lg cursor-pointer transition-all flex items-center gap-1"
                        >
                          <Edit className="w-3.5 h-3.5" />
                          <span>Edit</span>
                        </button>
                        <button 
                          disabled={isDeletingPostId === post.id}
                          onClick={removePost}
                          className="px-3 py-1.5 bg-red-955 bg-red-900 border border-red-500/20 text-red-200 text-[10px] font-bold rounded-lg cursor-pointer transition-all flex items-center gap-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>{isDeletingPostId === post.id ? 'Deleting...' : 'Delete'}</span>
                        </button>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    );
  }

  // WELCOME INTERFACE segment
  if (activePath === 'welcome') {
    return (
      <div className="w-full max-w-3xl mx-auto space-y-6">
        
        {/* Onboarding welcome title card */}
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-[10px] text-luxury-gold tracking-widest font-extrabold uppercase font-mono block">Saku Maku Business Integration Guild</span>
          <h2 className="text-2xl md:text-3xl font-black text-white leading-tight">
            Claim Your Business Directory Profile
          </h2>
          <p className="text-xs text-zinc-400 leading-relaxed font-semibold">
            Manage your street profile, connect with thousands of active Saku Maku users, link your WhatsApp hotline, configure opening hours, and broadcast active discounts in real time.
          </p>
        </div>

        {/* Binary Decision card buttons pathways */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
          
          {/* Card Pathway A: VERIFIED OWNER */}
          <button
            onClick={() => {
              setActivePath('claim');
              setClaimStep('phone');
            }}
            className="flex flex-col text-left justify-between items-start bg-gradient-to-br from-zinc-950 to-[#101014] hover:to-zinc-900 hover:border-luxury-gold p-6.5 rounded-3xl border border-luxury-gold/30 hover:shadow-2xl shadow-black/80 transition duration-300 transform hover:scale-[1.015] cursor-pointer relative group overflow-hidden h-72 font-sans"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-luxury-teal/10 rounded-full blur-2xl pointer-events-none"></div>
            
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-luxury-teal/15 border border-luxury-gold/40 flex items-center justify-center text-luxury-gold group-hover:bg-luxury-gold/20 group-hover:text-white transition">
                <ShieldCheck className="w-6.5 h-6.5" />
              </div>
              <div className="space-y-1">
                <span className="text-[8px] tracking-widest uppercase font-mono text-zinc-500 font-extrabold">Professional Segment</span>
                <h3 className="text-base font-black text-white leading-tight">
                  {labels.claimTab}
                </h3>
                <p className="text-xs text-zinc-400 leading-normal">
                  {labels.claimSubtitle} Ensure fast onboarding via phone-matching OTP.
                </p>
              </div>
            </div>

            <div className="text-xs font-black text-luxury-gold uppercase tracking-wider flex items-center gap-1 group-hover:underline">
              <span>Start Claim Campaign</span>
              <span>➔</span>
            </div>
          </button>

          {/* Card Pathway B: CONTRIBUTING GUEST */}
          <button
            onClick={() => {
              setActivePath('add_spot');
            }}
            className="flex flex-col text-left justify-between items-start bg-gradient-to-br from-zinc-950 to-[#101014] hover:to-zinc-900 border border-zinc-900 hover:border-white/20 p-6.5 rounded-3xl hover:shadow-2xl shadow-black/80 transition duration-300 transform hover:scale-[1.015] cursor-pointer relative group overflow-hidden h-72 font-sans"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full blur-2xl pointer-events-none"></div>

            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-zinc-805 flex items-center justify-center text-zinc-400 group-hover:bg-white/10 group-hover:text-white transition">
                <Store className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <span className="text-[8px] tracking-widest uppercase font-mono text-zinc-505 font-extrabold">Contributor Segment</span>
                <h3 className="text-base font-black text-white leading-tight">
                  {labels.visitorTab}
                </h3>
                <p className="text-xs text-[#999] leading-normal">
                  {labels.visitorSubtitle} Post address locations and photos anonymously.
                </p>
              </div>
            </div>

            <div className="text-xs font-black text-zinc-400 uppercase tracking-wider flex items-center gap-1 group-hover:underline">
              <span>Host New Street Spot</span>
              <span>➔</span>
            </div>
          </button>

        </div>
      </div>
    );
  }

  // CLAIM SCREEN STATE RENDERS
  if (activePath === 'claim') {
    return (
      <div className="w-full max-w-xl mx-auto bg-[#121215]/95 border border-luxury-gold/30 rounded-[28px] p-6 sm:p-8 relative overflow-hidden shadow-2xl backdrop-blur-md">
        <div className="absolute top-[-20%] left-[-20%] w-64 h-64 bg-luxury-teal/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-[-20%] right-[-20%] w-64 h-64 bg-luxury-gold/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 space-y-6">
          
          {/* Progress Header Segment */}
          <div className="flex items-center justify-between border-b border-white/5 pb-4">
            <div className="flex items-center gap-2 text-left font-sans">
              <div className="w-9 h-9 rounded-xl bg-luxury-teal/20 flex items-center justify-center text-luxury-gold shrink-0 border border-luxury-gold/30">
                <Smartphone className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xs font-black text-white uppercase tracking-wider">
                  Claim Your Profile
                </h3>
                <p className="text-[10px] text-zinc-500 font-bold">
                  Onboarding Step: <span className="text-luxury-gold uppercase font-mono font-black">{claimStep}</span>
                </p>
              </div>
            </div>

            <button 
              onClick={() => setActivePath('welcome')}
              className="px-3 py-1 text-[9px] font-black uppercase text-zinc-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition"
            >
              Cancel
            </button>
          </div>

          {/* STEP 1: ENTER PHONE NUMBER */}
          {claimStep === 'phone' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <div className="text-center max-w-md mx-auto space-y-1">
                <h4 className="text-base font-black text-white leading-tight">Claim your business</h4>
                <p className="text-xs text-zinc-400 leading-normal">
                  Manage photos, posts, offers, WhatsApp, and business details.
                </p>
              </div>

              <form onSubmit={handlePhoneSubmit} className="space-y-4 text-xs font-semibold text-left font-sans">
                <div className="space-y-1.5">
                  <label className="text-zinc-400 block font-bold">Primary Contact Number</label>
                  <div className="flex gap-2">
                    {/* Country Dialing Selector */}
                    <div className="relative">
                      <select 
                        value={phoneCountry} 
                        onChange={(e) => setPhoneCountry(e.target.value)}
                        className="bg-black/55 hover:bg-black/85 text-white py-3.5 px-3 pr-8 rounded-xl border border-white/10 focus:outline-none focus:border-luxury-gold cursor-pointer text-xs font-mono font-bold appearance-none w-24"
                      >
                        <option value="+964">🇮🇶 +964</option>
                        <option value="+971">🇦🇪 +971</option>
                        <option value="+965">🇰🇼 +965</option>
                      </select>
                      <ChevronDown className="w-3.5 h-3.5 text-zinc-500 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>

                    {/* Numeric digit Phone */}
                    <div className="relative flex-grow">
                      <input 
                        type="tel"
                        required
                        disabled={rateLimitActive}
                        value={phoneNumberInput}
                        onChange={(e) => setPhoneNumberInput(e.target.value)}
                        placeholder={labels.phonePlaceholder}
                        className="w-full bg-black/55 text-white p-3.5 pl-10 rounded-xl border border-white/10 focus:outline-none focus:border-luxury-gold font-mono font-bold text-xs"
                      />
                      <Phone className="w-3.5 h-3.5 text-zinc-550 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSearchingRegistry || rateLimitActive}
                  className="w-full py-4 bg-gradient-to-r from-luxury-teal to-luxury-gold text-white font-black text-xs uppercase tracking-wider rounded-xl transition hover:scale-102 active:scale-95 cursor-pointer shadow-lg disabled:opacity-45"
                >
                  {isSearchingRegistry ? 'Checking platforms registry...' : 'Continue verification ➔'}
                </button>
              </form>

              <div className="p-3 bg-white/5 rounded-xl border border-white/5 text-center flex items-center gap-2 justify-center">
                <Info className="w-4 h-4 text-zinc-400 shrink-0" />
                <p className="text-[10px] text-zinc-500 font-semibold leading-normal">
                  Our system will match your telephone directly across standard Iraqi merchant directories instantly.
                </p>
              </div>
            </motion.div>
          )}

          {/* STEP 2: SELECT MULTIPLE OR MANUALLY SEARCH REGISTRY */}
          {claimStep === 'select_business' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4 text-left"
            >
              <div className="text-center max-w-sm mx-auto space-y-1">
                <h4 className="text-base font-black text-white leading-tight">Find Your Preexisting Profile</h4>
                <p className="text-xs text-zinc-400 leading-normal">
                  No active hotline matched automatically. Perform fuzzy registry-search to find and link your highstreet business below.
                </p>
              </div>

              {/* Dynamic manual search toolbar */}
              <div className="space-y-2 text-xs font-semibold font-sans">
                <div className="relative">
                  <input 
                    type="text"
                    value={claimSearch}
                    onChange={(e) => setClaimSearch(e.target.value)}
                    placeholder={labels.searchHint}
                    className="w-full bg-black/55 text-white p-3 rounded-xl border border-white/10 focus:outline-none focus:border-luxury-gold text-[11px]"
                  />
                  <Search className="w-4 h-4 text-zinc-500 absolute right-3 top-1/2 -translate-y-1/2" />
                </div>

                {/* Grid of Governorate and category dropdown overrides */}
                <div className="grid grid-cols-2 gap-2">
                  <select
                    value={claimGovFilter}
                    onChange={(e) => setClaimGovFilter(e.target.value as GovernorateCode)}
                    className="w-full bg-black/55 text-zinc-300 p-2.5 rounded-xl border border-white/10 focus:outline-none focus:border-luxury-gold text-[10px] cursor-pointer"
                  >
                    <option value="all">📍 All Iraqi Provinces</option>
                    {GOVERNORATES.filter(g => g.code !== 'all').map(g => (
                      <option key={g.code} value={g.code}>{g.name[currentLang]}</option>
                    ))}
                  </select>

                  <select
                    value={claimCatFilter}
                    onChange={(e) => setClaimCatFilter(e.target.value)}
                    className="w-full bg-black/55 text-zinc-300 p-2.5 rounded-xl border border-white/10 focus:outline-none focus:border-luxury-gold text-[10px] cursor-pointer"
                  >
                    <option value="all">🍔 All Categories</option>
                    {CATEGORIES.map(c => (
                      <option key={c.id} value={c.id}>{c.icon} {c.name[currentLang]}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Custom Autocomplete suggestions of matching platform search items */}
              <div className="space-y-2.5 max-h-[190px] overflow-y-auto custom-scrollbar p-1 border border-white/5 rounded-2xl bg-black/10">
                {filteredRegistry.length === 0 ? (
                  <div className="text-center py-6 text-zinc-500 text-xs font-mono">No matching highstreet spots found.</div>
                ) : (
                  filteredRegistry.map(biz => (
                    <button
                      key={biz.id}
                      onClick={() => setSelectedBizForClaim(biz)}
                      className={`w-full text-left p-3 rounded-xl border transition-all text-xs flex items-center justify-between cursor-pointer ${
                        selectedBizForClaim?.id === biz.id
                          ? 'bg-luxury-gold/15 border-luxury-gold text-white shadow-md'
                          : 'bg-white/5 hover:bg-white/10 border-white/5 text-zinc-350'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-10 h-10 rounded-lg overflow-hidden bg-zinc-950 border border-white/10 shrink-0">
                          <img 
                            src={biz.image} 
                            alt="avatar" 
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <div className="space-y-0.5 text-left font-sans">
                          <h5 className="font-extrabold text-white leading-tight">
                            {biz.name[currentLang] || biz.name.en}
                          </h5>
                          <p className="text-[10px] text-zinc-400 leading-none">
                            📍 {biz.address[currentLang] || biz.address.en}
                          </p>
                        </div>
                      </div>

                      {/* Select state index badge */}
                      {selectedBizForClaim?.id === biz.id ? (
                        <span className="w-4 h-4 rounded-full bg-luxury-gold text-black flex items-center justify-center text-[9px] font-black">✓</span>
                      ) : (
                        <span className="w-4 h-4 rounded-full border border-white/20"></span>
                      )}
                    </button>
                  ))
                )}
              </div>

              {selectedBizForClaim && (
                <button
                  onClick={() => setClaimStep('otp')}
                  className="w-full py-3.5 bg-gradient-to-r from-luxury-teal to-luxury-gold text-white font-black text-xs uppercase tracking-wider rounded-xl transition hover:scale-102 shadow-lg"
                >
                  Verify Verification on {selectedBizForClaim.name[currentLang]} ➔
                </button>
              )}
            </motion.div>
          )}

          {/* STEP 3: OTP KEY CODE */}
          {claimStep === 'otp' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <div className="text-center max-w-sm mx-auto space-y-1">
                <h4 className="text-base font-black text-white leading-tight">{labels.verifyTitle}</h4>
                <p className="text-xs text-zinc-400 leading-normal">
                  Enter 4-digit code sent to {phoneCountry}{normalizePhone(phoneNumberInput)} via SMS/WhatsApp message.
                </p>
              </div>

              {/* Simulation Sandbox Alerts */}
              <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-3 text-center flex items-center gap-1.5 justify-center">
                <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />
                <span className="text-[10px] text-amber-400 font-extrabold uppercase font-mono tracking-wider">
                  {labels.otpAlert}
                </span>
              </div>

              <div className="space-y-4">
                {/* 4 square character blocks */}
                <div className="flex items-center justify-center gap-4 py-2" dir="ltr">
                  {[0, 1, 2, 3].map(idx => (
                    <input 
                      key={idx}
                      id={`otp-char-${idx}`}
                      type="text"
                      pattern="[0-9]*"
                      inputMode="numeric"
                      value={otpCodeInput[idx]}
                      onChange={(e) => handleOtpCharChange(e.target.value, idx)}
                      onKeyDown={(e) => {
                        if (e.key === 'Backspace' && !otpCodeInput[idx] && idx > 0) {
                          const prevInput = document.getElementById(`otp-char-${idx - 1}`);
                          prevInput?.focus();
                        }
                      }}
                      className="w-12 h-14 bg-black/60 rounded-xl border border-white/10 focus:border-luxury-gold text-center text-white text-xl font-mono font-black focus:outline-none"
                    />
                  ))}
                </div>

                <div className="flex items-center justify-between text-xs font-semibold font-sans px-2">
                  <button 
                    type="button"
                    onClick={handleResendOtp}
                    disabled={otpResendTimer > 0}
                    className="text-luxury-gold hover:underline disabled:text-zinc-550"
                  >
                    Resend Code {otpResendTimer > 0 ? `(${otpResendTimer}s)` : ''}
                  </button>

                  <button 
                    type="button"
                    onClick={() => setClaimStep('phone')}
                    className="text-zinc-500 hover:text-white"
                  >
                    Change Number
                  </button>
                </div>

                <button
                  type="button"
                  disabled={otpCodeInput.join('').length < 4}
                  onClick={handleVerifyOtp}
                  className="w-full py-4 bg-gradient-to-r from-luxury-teal via-luxury-gold to-[#A2834E] text-white font-black text-xs uppercase tracking-wider rounded-xl shadow-lg transition duration-300 hover:scale-102"
                >
                  Confirm & Unlock Dashboard
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 4: SUSPICIOUS DETECTED STATUS */}
          {claimStep === 'suspicious_hold' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-4 text-center py-4"
            >
              <div className="mx-auto w-14 h-14 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500 animate-pulse">
                <ShieldAlert className="w-8 h-8" />
              </div>

              <div>
                <h4 className="text-base font-black text-white">{labels.suspiciousTitle}</h4>
                <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                  {labels.suspiciousText}
                </p>
              </div>

              <button
                onClick={() => setActivePath('welcome')}
                className="px-6 py-2.5 bg-white/5 border border-white/10 hover:bg-white/10 text-white rounded-xl text-xs font-black uppercase tracking-wider transition font-mono"
              >
                Back To Lobby
              </button>
            </motion.div>
          )}

          {/* STEP 5: CLAIM CAMPAIGN SUCCESS */}
          {claimStep === 'success' && (
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="space-y-4 text-center py-4 font-sans"
            >
              <div className="mx-auto w-14 h-14 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <CheckCircle className="w-8 h-8" />
              </div>

              <div>
                <h4 className="text-base font-black text-white leading-tight">
                  {labels.claimedSuccess}
                </h4>
                <p className="text-xs text-zinc-400 mt-1">
                  You are now synced as verified owner on {selectedBizForClaim?.name[currentLang] || 'your spot'}. 
                </p>
              </div>

              <div className="p-3 bg-white/5 border border-white/5 rounded-xl text-left max-w-sm mx-auto text-[10px] text-zinc-400 space-y-1 font-mono">
                <p>✓ Status: Verified (Live)</p>
                <p>✓ Collection: business_owners (linked)</p>
                <p>✓ Platform Guard: standard duplicate bypass active</p>
              </div>

              <div className="pt-2">
                {/* Instant Dashboard Activation button */}
                <button
                  onClick={() => {
                    // Force refresh active page trigger
                    window.location.reload();
                  }}
                  className="px-6 py-3 bg-[#FF6B4A] hover:bg-white text-black hover:text-[#FF6B4A] font-black text-xs uppercase tracking-wider rounded-xl transition shadow-xl"
                >
                  Enter Campaign HQ ➔
                </button>
              </div>
            </motion.div>
          )}

        </div>
      </div>
    );
  }

  // STANDARD CONTRIBUTOR REGISTER SPOT SCREEN
  return (
    <div className="w-full max-w-xl mx-auto bg-white/5 border border-white/10 rounded-[28px] p-6 md:p-8 relative overflow-hidden shadow-2xl backdrop-blur-md text-left font-sans">
      <div className="absolute top-0 right-0 w-44 h-44 bg-gradient-to-tr from-[#0F2E2F]/20 to-[#C8A95F]/10 rounded-full blur-2xl pointer-events-none"></div>

      <div className="relative z-10 space-y-6">
        
        {/* Visitor header */}
        <div className="flex items-center justify-between border-b border-zinc-900/40 pb-4">
          <div className="text-left font-sans">
            <h2 className="text-lg font-black text-white leading-tight">
              Submit Spot Contributor Request
            </h2>
            <p className="text-xs text-zinc-450 mt-1 leading-normal">
              Contribute a new street spot or café to Iraq's social discovery directories.
            </p>
          </div>
          <button
            onClick={() => setActivePath('welcome')}
            className="px-3 py-1 text-[9px] font-black uppercase text-zinc-400 hover:text-white bg-white/5 border border-white/10 rounded-lg transition"
          >
            Cancel
          </button>
        </div>

        <AnimatePresence>
          {standardSuccess && (
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="p-4 bg-emerald-955 bg-emerald-900/40 border border-emerald-500/20 text-emerald-350 rounded-2xl text-xs flex items-start gap-2.5"
            >
              <CheckCircle className="w-5 h-5 shrink-0 mt-0.5 text-emerald-400" />
              <div>
                <h4 className="font-bold leading-tight">Contribution Received!</h4>
                <p className="text-[10px] text-emerald-450 mt-0.5 leading-relaxed">
                  Thank you! Your spot contribution has been saved and will appear in discovery directories once verified by community moderators.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <form onSubmit={handleStandardSubmit} className="space-y-4 text-xs font-semibold font-sans">
          
          <div className="space-y-1.5">
            <label className="text-zinc-400 block">Spot Business Name</label>
            <input 
              type="text"
              required
              placeholder="e.g. Damascus Jasmine Cafe"
              value={standardName}
              onChange={(e) => setStandardName(e.target.value)}
              className="w-full bg-black/55 text-white p-3.5 rounded-xl border border-white/10 focus:outline-none focus:border-luxury-gold"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-zinc-400 block">Primary Classification</label>
              <select
                value={standardCategory}
                onChange={(e) => setStandardCategory(e.target.value)}
                className="w-full bg-[#020205]/45 hover:bg-[#020205]/85 text-white p-3 rounded-xl border border-white/10 focus:outline-none focus:border-luxury-gold cursor-pointer"
              >
                {CATEGORIES.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.icon} {cat.name[currentLang]}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-zinc-400 block">Region Province</label>
              <select
                value={standardGov}
                onChange={(e) => setStandardGov(e.target.value as GovernorateCode)}
                className="w-full bg-[#020205]/45 hover:bg-[#020205]/85 text-white p-3 rounded-xl border border-white/10 focus:outline-none focus:border-luxury-gold cursor-pointer"
              >
                {GOVERNORATES.filter(g => g.code !== 'all').map(gov => (
                  <option key={gov.code} value={gov.code}>{gov.name[currentLang]}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-zinc-400 block">Hotline Number (Optional)</label>
            <input 
              type="tel"
              placeholder="e.g. 07701234567"
              value={standardPhone}
              onChange={(e) => setStandardPhone(e.target.value)}
              className="w-full bg-black/55 text-white p-3.5 rounded-xl border border-white/10 focus:outline-none focus:border-luxury-gold font-mono"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-zinc-400 block">Location Address Description</label>
            <div className="relative">
              <input 
                type="text"
                required
                placeholder="e.g. Karrada Inside, near old library"
                value={standardAddress}
                onChange={(e) => setStandardAddress(e.target.value)}
                className="w-full bg-black/55 text-white p-3.5 pl-10 rounded-xl border border-white/10 focus:outline-none focus:border-luxury-gold"
              />
              <Navigation className="w-3.5 h-3.5 text-zinc-550 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-zinc-400 block">Snapshot Cover image URL</label>
            <div className="relative">
              <input 
                type="url"
                placeholder="https://images.unsplash.com/..."
                value={standardImageUrl}
                onChange={(e) => setStandardImageUrl(e.target.value)}
                className="w-full bg-black/55 text-white p-3.5 pl-10 rounded-xl border border-white/10 focus:outline-none focus:border-luxury-gold font-mono"
              />
              <ImageIcon className="w-3.5 h-3.5 text-zinc-550 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-zinc-400 block font-bold">Presentation Bio (Description)</label>
            <textarea
              required
              rows={3}
              placeholder="Describe this spot. What specialized coffees, Spas, or dining options make it unique?..."
              value={standardDesc}
              onChange={(e) => setStandardDesc(e.target.value)}
              className="w-full bg-black/55 text-white p-3.5 rounded-xl border border-white/10 focus:outline-none focus:border-luxury-gold leading-relaxed"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-gradient-to-r from-zinc-800 to-zinc-900 border border-white/10 hover:border-white/30 text-white font-black text-xs uppercase tracking-wider rounded-xl transition hover:scale-102 cursor-pointer shadow-lg"
          >
            Submit Spot Contribution ➔
          </button>
        </form>
      </div>
    </div>
  );
}
