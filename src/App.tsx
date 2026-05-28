import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Compass, Flame, Map, PlusCircle, BookOpen, Search, X, 
  Sparkles, Heart, Star, ChevronLeft, ChevronRight, CheckCircle2, Play, Lock,
  ChevronDown, MapPin
} from 'lucide-react';
import { Language, GovernorateCode, Business, SocialPost, UserProfile, HeroSlide } from './types';
import { TRANSLATIONS, CATEGORIES, GOVERNORATES, HERO_SLIDES } from './data';
import { db, auth } from './firebase';
import { collection, onSnapshot, setDoc, doc, updateDoc } from 'firebase/firestore';
import { getCurrentUser, logoutUser, loginUser, registerUser } from './shakuAuth';
import { sendPasswordResetEmail } from 'firebase/auth';

// Fixed Admin Email Configuration
const ADMIN_EMAIL = 'mahdialmuntadhar1@gmail.com';

// Saku Maku Modular Components
import Header from './components/Header';
import Hero from './components/Hero';
import CategorySwiper from './components/CategorySwiper';
import BusinessFeed from './components/BusinessFeed';
import SocialFeed from './components/SocialFeed';
import InteractiveMap from './components/InteractiveMap';
import AddBusinessForm from './components/AddBusinessForm';
import AboutSakuMaku from './components/AboutSakuMaku';
import AdminPanel from './components/AdminPanel';
import AuthModal from './components/AuthModal';
import InstallPrompt from './components/InstallPrompt';
import PWAInstallButton from './components/PWAInstallButton';

export default function App() {
  const [currentLang, setCurrentLang] = useState<Language>('ar'); // Default: Arabic
  const [selectedGov, setSelectedGov] = useState<GovernorateCode>('all'); // Default: All Iraq
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  // Custom Auth User state
  const [user, setUser] = useState<{ uid: string; email: string; displayName: string } | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  // Saku Maku core Reactive businesses database
  const [businesses, setBusinesses] = useState<Business[]>([]);
  
  // Saku Maku elevated Live Social posts stream
  const [posts, setPosts] = useState<SocialPost[]>([]);

  // Navigation active tab
  const [activeTab, setActiveTab] = useState<'discover' | 'feed' | 'map' | 'add' | 'about' | 'admin'>('discover');

  // Real-time keyword filter
  const [searchQuery, setSearchQuery] = useState('');

  // Merchant active story popup state
  const [activeStory, setActiveStory] = useState<string[] | null>(null);
  const [activeStoryIdx, setActiveStoryIdx] = useState(0);
  const [storyProgress, setStoryProgress] = useState(0);
  const [govDropdownOpen, setGovDropdownOpen] = useState(false);
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);

  // Single-source data loading states
  const [bizLoading, setBizLoading] = useState(true);
  const [postsLoading, setPostsLoading] = useState(true);
  const [dataError, setDataError] = useState<string | null>(null);

  const t = TRANSLATIONS[currentLang];
  const isRtl = currentLang === 'ar' || currentLang === 'ku';

  // Real-time Hero Slides synced from Firestore with auto-seeding
  const [heroSlides, setHeroSlides] = useState<HeroSlide[]>([]);

  // Sync Hero Slides in Real Time!
  useEffect(() => {
    const ref = collection(db, 'hero_slides');
    const unsubscribe = onSnapshot(ref, (snap) => {
      if (snap.empty) {
        setHeroSlides(HERO_SLIDES);
        const isAdminUser = userProfile?.role === 'admin';
        if (isAdminUser) {
          HERO_SLIDES.forEach(async (slide) => {
            try {
              await setDoc(doc(db, 'hero_slides', slide.id), slide);
            } catch (err) {
              // silently ignore seed error
            }
          });
        }
      } else {
        const list: HeroSlide[] = [];
        snap.forEach((doc) => {
          list.push(doc.data() as HeroSlide);
        });
        setHeroSlides(list);
      }
    }, (error) => {
      // silently ignore sync error
      setHeroSlides(HERO_SLIDES);
    });
    return () => unsubscribe();
  }, [userProfile]);

  const handleCustomEmailLogin = async (customEmail: string) => {
    const cleanEmail = customEmail.trim().toLowerCase();
    if (!cleanEmail) return;

    const dummyPassword = "SandboxPassword123!";

    try {
      let data;
      try {
        data = await loginUser(cleanEmail, dummyPassword);
      } catch (signInErr: any) {
        if (signInErr.message?.includes('Invalid') || signInErr.message?.includes('No account')) {
          data = await registerUser(cleanEmail, dummyPassword, cleanEmail.split('@')[0], 'user');
        } else {
          throw signInErr;
        }
      }

      const isAdmin = cleanEmail === ADMIN_EMAIL;
      const isOwner = cleanEmail.includes('owner');

      const newProfile: UserProfile = {
        uid: data.user.uid,
        displayName: data.user.displayName || cleanEmail.split('@')[0],
        photoURL: isAdmin 
          ? "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" 
          : "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80",
        email: cleanEmail,
        createdAt: new Date().toISOString(),
        role: isAdmin ? 'admin' : (isOwner ? 'owner' : 'user'),
        onboarded: isOwner, 
        businessId: isOwner ? 'b-onboard-demo' : null,
      };

      setUser({ uid: data.user.uid, email: data.user.email, displayName: data.user.displayName });
      setUserProfile(newProfile);
      // auth success
    } catch (err) {
      // silently ignore auth error
    }
  };

  // Password reset functionality
  const handlePasswordReset = async (email: string) => {
    try {
      const actionCodeSettings = {
        url: 'https://shakumaku.tk/',
        handleCodeInApp: false,
      };
      await sendPasswordResetEmail(auth, email, actionCodeSettings);
      alert(
        currentLang === 'en' 
          ? 'Password reset email sent! Please check your inbox and spam folder.'
          : currentLang === 'ku'
          ? 'ئیمەیڵی ڕێستکردنی تێپەڕەواژێ نێررا! تکایە سندووقی پۆستەکەت و سپامەکەت بپشکنە.'
          : 'تم إرسال بريد إعادة تعيين كلمة المرور! يرجى التحقق من صندوق الوارد والرسائل غير المرغوب فيها.'
      );
    } catch (error: any) {
      console.error('Password reset error:', error);
      alert(
        currentLang === 'en'
          ? 'Failed to send password reset email. Please check your email address and try again.'
          : currentLang === 'ku'
          ? 'نەیتوانی ئیمەیڵی ڕێستکردنی تێپەڕەواژێ بنێرێت. تکایە ئیمەیڵەکەت بپشکنە و دووبارە هەوڵبەرەوە.'
          : 'فشل في إرسال بريد إعادة تعيين كلمة المرور. يرجى التحقق من عنوان البريد الإلكتروني والمحاولة مرة أخرى.'
      );
    }
  };

  // Custom Auth state initialization
  useEffect(() => {
    const initAuth = async () => {
      const storedUser = localStorage.getItem('shaku_user');
      const storedToken = localStorage.getItem('shaku_token');
      if (storedUser && storedToken) {
        try {
          const parsed = JSON.parse(storedUser);
          setUser({ uid: parsed.uid, email: parsed.email, displayName: parsed.displayName });
          setUserProfile(parsed as UserProfile);
        } catch {
          localStorage.removeItem('shaku_user');
          localStorage.removeItem('shaku_token');
        }
      }
    };
    initAuth();
  }, []);

  // Secure logout
  const handleSecureLogout = async () => {
    try {
      logoutUser();
      localStorage.removeItem('shkomaku_custom_user');
      setUser(null);
      setUserProfile(null);
      setActiveTab('discover');
      sessionStorage.clear();
      // logout success
    } catch (err) {
      // silently ignore logout error
    }
  };

  const handleUpdateRole = async (newRole: 'user' | 'owner' | 'admin') => {
    if (!user) return;
    try {
      const userRef = doc(db, 'users', user.uid);
      await setDoc(userRef, { role: newRole }, { merge: true });
    } catch (err) {
      // silently ignore role error
    }
  };

  const handleUpdateProfile = async (updatedFields: Partial<UserProfile>) => {
    if (!user) return;
    const updated = { ...userProfile, ...updatedFields } as UserProfile;
    setUserProfile(updated);
    localStorage.setItem('user_profile', JSON.stringify(updated));
  };

  // ─────────────────────────────────────────────
  // SINGLE SOURCE OF TRUTH: JSON files only
  // No API fallback, no INITIAL fallback, no Firestore overwrite on read.
  // ─────────────────────────────────────────────

  // Load businesses from JSON only
  useEffect(() => {
    let cancelled = false;
    setBizLoading(true);
    setDataError(null);
    const gov = selectedGov === 'all' ? undefined : selectedGov;

    fetch('/iraq_businesses.json')
      .then(r => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((data: Business[]) => {
        if (cancelled) return;
        const filtered = gov ? data.filter(b => b.governorate === gov) : data;
        setBusinesses(filtered);
      })
      .catch(() => {
        if (cancelled) return;
        setBusinesses([]);
        setDataError(currentLang === 'en'
          ? 'Failed to load business data. Please refresh.'
          : currentLang === 'ku'
          ? 'بارکردنی داتا شکستی هێنا. تکایە نوێ بکەرەوە.'
          : 'فشل في تحميل بيانات الأعمال. يرجى التحديث.'
        );
      })
      .finally(() => { if (!cancelled) setBizLoading(false); });

    return () => { cancelled = true; };
  }, [selectedGov, currentLang]);

  // Load posts from JSON only
  useEffect(() => {
    let cancelled = false;
    setPostsLoading(true);
    setDataError(null);

    fetch('/iraq_posts.json')
      .then(r => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((data: SocialPost[]) => {
        if (cancelled) return;
        setPosts(data);
      })
      .catch(() => {
        if (cancelled) return;
        setPosts([]);
        setDataError(currentLang === 'en'
          ? 'Failed to load feed data. Please refresh.'
          : currentLang === 'ku'
          ? 'بارکردنی فید شکستی هێنا. تکایە نوێ بکەرەوە.'
          : 'فشل في تحميل بيانات التغذية. يرجى التحديث.'
        );
      })
      .finally(() => { if (!cancelled) setPostsLoading(false); });

    return () => { cancelled = true; };
  }, [currentLang]);

  // Filter business array based on search input + governorate matches + category
  const filteredBusinesses = useMemo(() => {
    if (businesses.length === 0) return businesses;

    const keyword = searchQuery.toLowerCase().trim();
    return businesses.filter(b => {
      const govMatch = selectedGov === 'all' || b.governorate === selectedGov;
      const catMatch = !selectedCategory || b.category === selectedCategory;
      let keywordMatch = !keyword;
      if (keyword) {
        const nameStr = (b.name?.[currentLang] || b.name?.en || '').toLowerCase();
        const descStr = (b.description?.[currentLang] || b.description?.en || '').toLowerCase();
        const addrStr = (b.address?.[currentLang] || b.address?.en || '').toLowerCase();
        const catStr = (b.category || '').toLowerCase();
        keywordMatch = nameStr.includes(keyword) || descStr.includes(keyword) || addrStr.includes(keyword) || catStr.includes(keyword);
      }
      return govMatch && catMatch && keywordMatch;
    });
  }, [businesses, selectedGov, selectedCategory, searchQuery, currentLang]);

  // Handle Likes state toggle in Firestore
  const handleToggleLike = async (bizId: string) => {
    const target = businesses.find(b => b.id === bizId);
    if (!target) return;
    const liked = !target.likedByUser;
    const payload = {
      likedByUser: liked,
      likes: liked ? target.likes + 1 : target.likes - 1
    };
    try {
      await updateDoc(doc(db, 'businesses', bizId), payload);
    } catch (err) {
      // silently ignore like error
    }
  };

  // Handle Saves state toggle in Firestore
  const handleToggleSave = async (bizId: string) => {
    const target = businesses.find(b => b.id === bizId);
    if (!target) return;
    const saved = !target.savedByUser;
    const payload = {
      savedByUser: saved,
      saves: saved ? target.saves + 1 : target.saves - 1
    };
    try {
      await updateDoc(doc(db, 'businesses', bizId), payload);
    } catch (err) {
      // silently ignore save error
    }
  };

  // Callback to add a new customized business to Firestore from owners claim form
  const handleAddLiveBusiness = async (newBiz: Omit<Business, 'rating' | 'reviewsCount' | 'likes' | 'saves'>) => {
    const fullBiz: Business = {
      ...newBiz,
      rating: 4.8,
      reviewsCount: 1,
      likes: 15,
      saves: 8,
      likedByUser: false,
      savedByUser: false,
      ownerUid: user?.uid || 'anonymous'
    };
    try {
      await setDoc(doc(db, 'businesses', fullBiz.id), fullBiz);
    } catch (err) {
      // silently ignore add error
    }
  };

  // Stories auto advancing timer handler
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (activeStory) {
      interval = setInterval(() => {
        setStoryProgress(prev => {
          if (prev >= 100) {
            // Next image or close stories
            if (activeStoryIdx < activeStory.length - 1) {
              setActiveStoryIdx(prevIdx => prevIdx + 1);
              return 0;
            } else {
              // Close
              setActiveStory(null);
              setActiveStoryIdx(0);
              return 0;
            }
          }
          return prev + 2.5; // reaches 100 in 4s
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [activeStory, activeStoryIdx]);

  const handleNextStoryImg = () => {
    if (activeStory && activeStoryIdx < activeStory.length - 1) {
      setActiveStoryIdx(activeStoryIdx + 1);
      setStoryProgress(0);
    } else {
      setActiveStory(null);
      setActiveStoryIdx(0);
    }
  };

  const handlePrevStoryImg = () => {
    if (activeStory && activeStoryIdx > 0) {
      setActiveStoryIdx(activeStoryIdx - 1);
      setStoryProgress(0);
    }
  };

  // Determine text direction and language class
  const textDirection = currentLang === 'ar' || currentLang === 'ku' ? 'rtl' : 'ltr';
  const languageClass = currentLang === 'ar' ? 'text-arabic' : currentLang === 'ku' ? 'text-kurdish' : 'text-english';

  return (
    <div className={`min-h-screen bg-luxury-neutral pb-28 text-[#1A1A1A] flex flex-col selection:bg-luxury-gold selection:text-[#1A1A1A] relative overflow-hidden ${languageClass}`} dir={textDirection}>
      
      {/* Elegant Warm Luxury Atmosphere Glow */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-5%] left-[-5%] w-[450px] h-[450px] bg-luxury-gold/10 rounded-full blur-[130px]"></div>
        <div className="absolute bottom-[-5%] right-[-5%] w-[450px] h-[450px] bg-luxury-teal/5 rounded-full blur-[130px]"></div>
      </div>

      {/* PWA Install Prompt — placed at the very top for immediate visibility */}
      <InstallPrompt currentLang={currentLang} />

      {/* Dynamic Saku Maku top header */}
      <Header
        currentLang={currentLang}
        onChangeLang={(lang) => {
          setCurrentLang(lang);
          // Sync HTML document direction parameter for responsive RTL/LTR transition support
          document.documentElement.dir = lang === 'en' ? 'ltr' : 'rtl';
        }}
        selectedGov={selectedGov}
        onChangeGov={(gov) => {
          setSelectedGov(gov);
          // Auto scroll to discovery catalog on change
          setActiveTab('discover');
        }}
        user={user}
        userProfile={userProfile}
        onSignIn={() => setAuthModalOpen(true)}
        onSignOut={handleSecureLogout}
        onUpdateRole={handleUpdateRole}
        activeTab={activeTab}
        onChangeTab={(tab: any) => setActiveTab(tab)}
        onCustomEmailLogin={handleCustomEmailLogin}
      />

      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        currentLang={currentLang}
        onCustomEmailLogin={handleCustomEmailLogin}
        onAuthSuccess={(profileObj) => {
          setUserProfile(profileObj);
        }}
        onPasswordReset={handlePasswordReset}
      />

      <main className="flex-grow max-w-7xl w-full mx-auto px-4 py-6">
        


        {/* Global Search Interface bar */}
        <div className="mb-8 max-w-xl mx-auto relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-luxury-teal to-luxury-gold rounded-2xl blur opacity-35 group-hover:opacity-60 transition duration-500"></div>
          <div className="relative flex items-center bg-[#1A1A1A]/90 rounded-2xl border border-luxury-gold/30 overflow-hidden px-4.5 py-1">
            <Search className="w-4.5 h-4.5 text-luxury-gold shrink-0" />
            
            <input
              type="text"
              placeholder={t.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                // switch tab immediately to discovery catalogue on search
                if (activeTab !== 'discover') setActiveTab('discover');
              }}
              className="w-full bg-transparent text-white text-xs px-3 py-3 focus:outline-none placeholder-zinc-500 font-medium"
            />

            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="p-1 rounded-full bg-zinc-800 hover:bg-zinc-750 text-zinc-400 hover:text-white transition cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Cinematic Auto Sliding Hero Banner */}
        <Hero
          currentLang={currentLang}
          slides={heroSlides}
          userProfile={userProfile}
          onExploreClick={() => {
            setActiveTab('discover');
            const catElem = document.getElementById('discovery-catalog-section');
            if (catElem) catElem.scrollIntoView({ behavior: 'smooth' });
          }}
          onSelectGov={(gov) => {
            setSelectedGov(gov);
            setActiveTab('discover');
          }}
        />

        {/* Custom Premium Governorate & Category Filtering Dropdowns (Directly beneath Hero Banner) */}
        <div className="mb-6 max-w-sm mx-auto px-2 space-y-4 relative z-30">
          <div>
            <div className="text-[10px] font-black text-luxury-gold uppercase tracking-wider mb-1.5 text-center flex items-center justify-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-luxury-gold shrink-0" />
              <span>{currentLang === 'en' ? 'Select Iraqi Governorate / Region' : currentLang === 'ku' ? 'پارێزگایەک دەستنیشان بکە' : 'اختر المحافظة العراقية لتصفح المتاجر'}</span>
            </div>
            
            <div className="relative">
              <button
                onClick={() => {
                  setGovDropdownOpen(!govDropdownOpen);
                  setCategoryDropdownOpen(false);
                }}
                className="w-full flex items-center justify-between text-xs font-bold bg-[#16161a] hover:bg-[#1f1f26] text-white px-4 py-3 rounded-xl border border-luxury-gold/30 hover:border-luxury-gold/60 transition-all shadow-xl shadow-black/40 cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <span className="text-base">📍</span>
                  <span>{GOVERNORATES.find(g => g.code === selectedGov)?.name[currentLang]}</span>
                </div>
                <ChevronDown className={`w-4 h-4 text-luxury-gold transition-transform duration-300 ${govDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {govDropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-1.5 bg-[#121215] border border-luxury-gold/20 rounded-xl shadow-2xl p-1 z-50 grid grid-cols-2 gap-1 animate-fade-in max-h-[220px] overflow-y-auto custom-scrollbar font-sans">
                  {GOVERNORATES.map((gov) => (
                    <button
                      key={gov.code}
                      onClick={() => {
                        setSelectedGov(gov.code);
                        setGovDropdownOpen(false);
                        setActiveTab('discover');
                      }}
                      className={`text-left px-2.5 py-1.5 text-[11px] rounded-lg flex items-center justify-between transition-all cursor-pointer ${
                        selectedGov === gov.code
                          ? 'bg-gradient-to-r from-luxury-teal to-luxury-gold/85 text-white font-extrabold shadow'
                          : 'text-zinc-300 hover:bg-white/5 font-semibold'
                      }`}
                    >
                      <span className="truncate">{gov.name[currentLang]}</span>
                      {selectedGov === gov.code && <span className="text-[9px]">✨</span>}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div>
            <div className="text-[10px] font-black text-luxury-gold uppercase tracking-wider mb-1.5 text-center flex items-center justify-center gap-1.5">
              <span>{currentLang === 'en' ? '🔍 Filter by Category' : currentLang === 'ku' ? '🔍 بەپێی پۆل دەستنیشان بکە' : '🔍 تصفية حسب الفئة'}</span>
            </div>
            
            <div className="relative">
              <button
                onClick={() => {
                  setCategoryDropdownOpen(!categoryDropdownOpen);
                  setGovDropdownOpen(false);
                }}
                className="w-full flex items-center justify-between text-xs font-bold bg-[#16161a] hover:bg-[#1f1f26] text-white px-4 py-3 rounded-xl border border-luxury-gold/30 hover:border-luxury-gold/60 transition-all shadow-xl shadow-black/40 cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <span className="text-base">
                    {selectedCategory ? CATEGORIES.find(c => c.id === selectedCategory)?.icon || '🏢' : '🏢'}
                  </span>
                  <span>
                    {selectedCategory 
                      ? CATEGORIES.find(c => c.id === selectedCategory)?.name[currentLang] 
                      : (currentLang === 'en' ? 'All Categories' : currentLang === 'ku' ? 'هەموو پۆلەکان' : 'جميع الفئات')}
                  </span>
                </div>
                <ChevronDown className={`w-4 h-4 text-luxury-gold transition-transform duration-300 ${categoryDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {categoryDropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-1.5 bg-[#121215] border border-luxury-gold/20 rounded-xl shadow-2xl p-1 z-50 grid grid-cols-2 gap-1 animate-fade-in max-h-[220px] overflow-y-auto custom-scrollbar font-sans animate-fade-in">
                  <button
                    onClick={() => {
                      setSelectedCategory(null);
                      setCategoryDropdownOpen(false);
                      setActiveTab('discover');
                    }}
                    className={`text-left px-2.5 py-1.5 text-[11px] rounded-lg flex items-center justify-between transition-all cursor-pointer ${
                      selectedCategory === null
                        ? 'bg-gradient-to-r from-luxury-teal to-luxury-gold/85 text-white font-extrabold shadow'
                        : 'text-zinc-300 hover:bg-white/5 font-semibold'
                    }`}
                  >
                    <span>🍔 {currentLang === 'en' ? 'All Categories' : currentLang === 'ku' ? 'هەموو پۆلەکان' : 'جميع الفئات'}</span>
                    {selectedCategory === null && <span className="text-[9px]">✨</span>}
                  </button>

                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => {
                        setSelectedCategory(cat.id);
                        setCategoryDropdownOpen(false);
                        setActiveTab('discover');
                      }}
                      className={`text-left px-2.5 py-1.5 text-[11px] rounded-lg flex items-center justify-between transition-all cursor-pointer ${
                        selectedCategory === cat.id
                          ? 'bg-gradient-to-r from-luxury-teal to-luxury-gold/85 text-white font-extrabold shadow'
                          : 'text-zinc-300 hover:bg-white/5 font-semibold'
                      }`}
                    >
                      <span className="truncate">{cat.icon} {cat.name[currentLang]}</span>
                      {selectedCategory === cat.id && <span className="text-[9px]">✨</span>}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Dynamic Dual Discovery Buttons (Optimized: Square, side-by-side on mobile layout) */}
        <div className="mt-6 mb-8 grid grid-cols-2 gap-3.5 max-w-xl mx-auto px-2">
          {/* Button: Main category of businesses */}
          <button
            onClick={() => {
              setActiveTab('discover');
              const catElem = document.getElementById('discovery-catalog-section');
              if (catElem) catElem.scrollIntoView({ behavior: 'smooth' });
            }}
            className={`flex flex-col items-center justify-center p-4 rounded-3xl border aspect-square text-center transition-all duration-300 transform hover:scale-[1.02] cursor-pointer relative group overflow-hidden ${
              activeTab === 'discover'
                ? 'bg-[#1A1A1A] border-[#0F2E2F] text-white shadow-xl shadow-[#0F2E2F]/15 animate-glow-alternate-1'
                : 'bg-white border-zinc-200 text-zinc-800 hover:border-luxury-gold hover:bg-zinc-50/50 animate-glow-alternate-1'
            }`}
          >
            <div className={`w-11 h-11 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center text-xl sm:text-2xl mb-2 sm:mb-3 transition-colors duration-300 shrink-0 ${
              activeTab === 'discover' ? 'bg-[#0F2E2F]/80 text-luxury-gold' : 'bg-zinc-100 text-zinc-500 group-hover:bg-luxury-gold/10 group-hover:text-luxury-gold'
            }`}>
              🏢
            </div>
            
            <span className={`text-xs sm:text-sm md:text-base font-black block leading-tight tracking-tight ${activeTab === 'discover' ? 'text-white' : 'text-[#1A1A1A]'}`}>
              {currentLang === 'en' ? 'Businesses' : currentLang === 'ku' ? 'شوێنەکان' : 'المحلات'}
            </span>
            
            <span className={`text-[9px] sm:text-[10px] md:text-[11px] leading-tight font-medium mt-1 sm:mt-1.5 block opacity-70 px-1 line-clamp-2 max-w-full ${activeTab === 'discover' ? 'text-zinc-300' : 'text-zinc-500'}`}>
              {currentLang === 'en' ? 'Explore cafes & spas' : currentLang === 'ku' ? 'گەڕان بەدوای پۆلەکاندا' : 'استكشف المحلات والخدمات'}
            </span>
            
            <div className={`absolute bottom-3 text-xs font-bold transition-opacity transition-transform duration-300 ${activeTab === 'discover' ? 'text-luxury-gold opacity-100' : 'text-zinc-400 opacity-0 group-hover:opacity-100 translateY(2px)'}`}>
              ➔
            </div>
          </button>

          {/* Button: Social media Pulse Feed */}
          <button
            onClick={() => {
              setActiveTab('feed');
              const catElem = document.getElementById('discovery-catalog-section');
              if (catElem) catElem.scrollIntoView({ behavior: 'smooth' });
            }}
            className={`flex flex-col items-center justify-center p-4 rounded-3xl border aspect-square text-center transition-all duration-300 transform hover:scale-[1.02] cursor-pointer relative group overflow-hidden ${
              activeTab === 'feed'
                ? 'bg-[#1A1A1A] border-[#0F2E2F] text-white shadow-xl shadow-[#0F2E2F]/15 animate-glow-alternate-2'
                : 'bg-white border-zinc-200 text-zinc-800 hover:border-luxury-gold hover:bg-zinc-50/50 animate-glow-alternate-2'
            }`}
          >
            <div className={`w-11 h-11 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center text-xl sm:text-2xl mb-2 sm:mb-3 relative transition-colors duration-300 shrink-0 ${
              activeTab === 'feed' ? 'bg-[#0F2E2F]/80 text-luxury-gold' : 'bg-zinc-100 text-zinc-500 group-hover:bg-luxury-gold/10 group-hover:text-luxury-gold'
            }`}>
              📸
              <span className="absolute -top-1 -right-1 w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-red-550 bg-red-500 animate-ping"></span>
            </div>
            
            <span className={`text-xs sm:text-sm md:text-base font-black block leading-tight tracking-tight ${activeTab === 'feed' ? 'text-white' : 'text-[#1A1A1A]'}`}>
              {currentLang === 'en' ? 'Social Feed' : currentLang === 'ku' ? 'پۆستە نوێکان' : 'نبض الشارع'}
            </span>
            
            <span className={`text-[9px] sm:text-[10px] md:text-[11px] leading-tight font-medium mt-1 sm:mt-1.5 block opacity-70 px-1 line-clamp-2 max-w-full ${activeTab === 'feed' ? 'text-zinc-300' : 'text-zinc-500'}`}>
              {currentLang === 'en' ? 'Stories & photo updates' : currentLang === 'ku' ? 'بڵاوکراوەکان و وێنەکان' : 'عروض ومشاركات حية'}
            </span>

            <div className={`absolute bottom-3 text-xs font-bold transition-opacity transition-transform duration-300 ${activeTab === 'feed' ? 'text-luxury-gold opacity-100' : 'text-zinc-400 opacity-0 group-hover:opacity-100 translateY(2px)'}`}>
              ➔
            </div>
          </button>
        </div>

        {/* Core Dashboard Content Switcher tabs */}
        <div id="discovery-catalog-section" className="space-y-6">

          {/* Single-source error banner */}
          {dataError && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mx-4 sm:mx-0 bg-red-950/40 border border-red-500/30 text-red-200 px-4 py-3 rounded-xl text-sm text-center"
            >
              {dataError}
            </motion.div>
          )}

          <AnimatePresence mode="wait">
            {activeTab === 'discover' && (
              <motion.div
                key="discover"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="space-y-6"
              >
                {/* Category Square discovery grid */}
                <CategorySwiper
                  currentLang={currentLang}
                  selectedCategory={selectedCategory}
                  onSelectCategory={setSelectedCategory}
                />

                {/* Saku Maku Dynamic Grouped Businesses section catalog */}
                <BusinessFeed
                  currentLang={currentLang}
                  selectedGov={selectedGov}
                  selectedCategory={selectedCategory}
                  businesses={filteredBusinesses}
                  onToggleLike={handleToggleLike}
                  onToggleSave={handleToggleSave}
                  onSelectStory={(stories) => {
                    setActiveStory(stories);
                    setActiveStoryIdx(0);
                    setStoryProgress(0);
                  }}
                />
              </motion.div>
            )}

            {activeTab === 'feed' && (
              <motion.div
                key="feed"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
              >
                {/* Visual Instagram style reels feed list */}
                <SocialFeed
                  currentLang={currentLang}
                  selectedGov={selectedGov}
                  posts={posts}
                  setPosts={setPosts}
                  user={user}
                  userProfile={userProfile}
                  onSignIn={() => setAuthModalOpen(true)}
                />
              </motion.div>
            )}

            {activeTab === 'map' && (
              <motion.div
                key="map"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
              >
                {/* Immersive interactive vector radar pins map */}
                <InteractiveMap
                  currentLang={currentLang}
                  selectedGov={selectedGov}
                  onSelectGov={setSelectedGov}
                  businesses={businesses}
                />
              </motion.div>
            )}

            {activeTab === 'add' && (
              <motion.div
                key="add"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
              >
                {/* Submitting claim form for local owners OR active Owner Campaign Dashboard */}
                <AddBusinessForm
                  currentLang={currentLang}
                  onAddBusiness={handleAddLiveBusiness}
                  user={user}
                  userProfile={userProfile}
                  onUpdateProfile={handleUpdateProfile}
                  onSignIn={() => setAuthModalOpen(true)}
                  businesses={businesses}
                  posts={posts}
                />
              </motion.div>
            )}

            {activeTab === 'about' && (
              <motion.div
                key="about"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
              >
                {/* Local mission statement panel */}
                <AboutSakuMaku currentLang={currentLang} />
              </motion.div>
            )}

            {activeTab === 'admin' && (
              <motion.div
                key="admin"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
              >
                {/* Admin moderation control tower */}
                <AdminPanel
                  currentLang={currentLang}
                  businesses={businesses}
                  setBusinesses={setBusinesses}
                  posts={posts}
                  setPosts={setPosts}
                  userProfile={userProfile}
                />
              </motion.div>
            )}
          </AnimatePresence>

        </div>

      </main>

      {/* Floating Modern bottom-menu navigation bar (optimized for youth mobile thumb-reach) */}
      <div className="fixed bottom-6 inset-x-4 max-w-lg mx-auto bg-[#1A1A1A]/95 backdrop-blur-xl border border-luxury-gold/35 px-4.5 py-2.5 rounded-[24px] shadow-2xl z-40 flex items-center justify-between gap-1 select-none">
        
        {/* Business (Discover) tab — vibrant amber/gold accent */}
        <button
          onClick={() => setActiveTab('discover')}
          className={`relative flex flex-col items-center justify-center flex-1 py-1.5 px-2 rounded-2xl transition-all duration-300 cursor-pointer overflow-hidden ${
            activeTab === 'discover'
              ? 'text-amber-400 font-bold bg-gradient-to-b from-amber-500/15 to-transparent border border-amber-400/40 shadow-[0_0_20px_rgba(251,191,36,0.15)]'
              : 'text-zinc-400 hover:text-amber-200 hover:bg-amber-500/5'
          }`}
          id="nav-tab-discover"
        >
          {activeTab === 'discover' && (
            <span className="absolute inset-0 bg-gradient-to-t from-amber-500/10 to-transparent animate-pulse pointer-events-none"></span>
          )}
          <Compass className={`w-5 h-5 mb-1 ${activeTab === 'discover' ? 'drop-shadow-[0_0_6px_rgba(251,191,36,0.5)]' : ''}`} />
          <span className="text-[9px] font-black tracking-tight">{t.exploreTab.split(' ')[0]}</span>
        </button>

        {/* Social Feed tab — vibrant magenta/pink accent */}
        <button
          onClick={() => setActiveTab('feed')}
          className={`relative flex flex-col items-center justify-center flex-1 py-1.5 px-2 rounded-2xl transition-all duration-300 cursor-pointer overflow-hidden ${
            activeTab === 'feed'
              ? 'text-fuchsia-400 font-bold bg-gradient-to-b from-fuchsia-500/15 to-transparent border border-fuchsia-400/40 shadow-[0_0_20px_rgba(232,121,249,0.15)]'
              : 'text-zinc-400 hover:text-fuchsia-200 hover:bg-fuchsia-500/5'
          }`}
          id="nav-tab-feed"
        >
          {activeTab === 'feed' && (
            <span className="absolute inset-0 bg-gradient-to-t from-fuchsia-500/10 to-transparent animate-pulse pointer-events-none"></span>
          )}
          <div className="relative">
            <Flame className={`w-5 h-5 mb-1 ${activeTab === 'feed' ? 'drop-shadow-[0_0_6px_rgba(232,121,249,0.5)]' : ''}`} />
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-fuchsia-500 animate-ping"></span>
          </div>
          <span className="text-[9px] font-black tracking-tight">Pulse Feed</span>
        </button>

        <button
          onClick={() => setActiveTab('map')}
          className={`flex flex-col items-center justify-center flex-1 py-1 px-2.5 rounded-xl transition-all duration-300 cursor-pointer ${
            activeTab === 'map'
              ? 'text-luxury-gold font-bold bg-white/5 border border-luxury-gold/25'
              : 'text-zinc-400 hover:text-white'
          }`}
          id="nav-tab-map"
        >
          <Map className="w-5 h-5 mb-1" />
          <span className="text-[9px] font-black tracking-tight">{t.mapTab.split(' ')[0]}</span>
        </button>

        <button
          onClick={() => setActiveTab('add')}
          className={`flex flex-col items-center justify-center flex-1 py-1 px-2.5 rounded-xl transition-all duration-300 cursor-pointer ${
            activeTab === 'add'
              ? 'text-luxury-coral font-bold bg-white/5 border border-luxury-coral/25'
              : 'text-zinc-400 hover:text-white'
          }`}
          id="nav-tab-add"
        >
          <PlusCircle className="w-5 h-5 mb-1" />
          <span className="text-[9px] font-black tracking-tight">Host</span>
        </button>

        <button
          onClick={() => setActiveTab('about')}
          className={`flex flex-col items-center justify-center flex-1 py-1 px-2.5 rounded-xl transition-all duration-300 cursor-pointer ${
            activeTab === 'about'
              ? 'text-luxury-gold font-bold bg-white/5 border border-luxury-gold/25'
              : 'text-zinc-400 hover:text-white'
          }`}
          id="nav-tab-about"
        >
          <BookOpen className="w-5 h-5 mb-1" />
          <span className="text-[9px] font-black tracking-tight">Mission</span>
        </button>

        <button
          onClick={() => setActiveTab('admin')}
          className={`flex flex-col items-center justify-center flex-1 py-1 px-2.5 rounded-xl transition-all duration-300 cursor-pointer ${
            activeTab === 'admin'
              ? 'text-luxury-gold font-bold bg-white/5 border border-luxury-gold/25'
              : 'text-zinc-400 hover:text-white/80'
          }`}
          id="nav-tab-admin"
        >
          <Lock className="w-5 h-5 mb-1" />
          <span className="text-[9px] font-black tracking-tight">Admin</span>
        </button>
        
      </div>

      {/* Full screen merchant stories slide player (Auto playing and manual controller) */}
      <AnimatePresence>
        {activeStory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black backdrop-blur-3xl flex flex-col items-center justify-center p-4 select-none"
            onClick={() => setActiveStory(null)}
          >
            <div
              className="relative w-full max-w-sm h-[75vh] md:h-[80vh] rounded-3xl overflow-hidden bg-zinc-950 border border-zinc-800 flex items-center justify-center shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              
              {/* Slides loading progress bar indicators */}
              <div className="absolute top-4 inset-x-4 z-10 flex gap-1">
                {activeStory.map((_, idx) => (
                  <div key={idx} className="h-1 bg-zinc-800 rounded-full flex-1 overflow-hidden">
                    <div 
                      className="h-full bg-cyan-400 transition-all duration-100 ease-linear"
                      style={{ 
                        width: idx < activeStoryIdx 
                          ? '100%' 
                          : idx === activeStoryIdx 
                            ? `${storyProgress}%` 
                            : '0%' 
                      }}
                    ></div>
                  </div>
                ))}
              </div>

              {/* Story Header */}
              <div className="absolute top-8 inset-x-4 z-10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full border border-pink-400 p-0.5 overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=50&auto=format&fit=crop&q=80"
                      alt="Merchant Story avatar"
                      className="w-full h-full rounded-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white block">Saku Maku Partner</span>
                    <span className="text-[9px] text-zinc-400 block font-mono">Baghdad Local Campaign</span>
                  </div>
                </div>

                <button 
                  onClick={() => setActiveStory(null)}
                  className="p-1.5 rounded-full bg-slate-900/60 hover:bg-slate-900 text-white/85"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Story main photograh content */}
              <img
                src={activeStory[activeStoryIdx]}
                alt="Active Saku Maku Story Broadcast"
                className="w-full h-full object-cover select-none pointer-events-none"
                referrerPolicy="no-referrer"
              />

              {/* Story navigation gestures drawers */}
              <div className="absolute inset-y-16 inset-x-0 flex justify-between">
                <button 
                  onClick={handlePrevStoryImg}
                  className="w-1/3 h-full cursor-west-resize hover:bg-white/5 transition duration-300"
                  aria-label="Previous story page"
                ></button>
                <button 
                  onClick={handleNextStoryImg}
                  className="w-1/3 h-full cursor-east-resize hover:bg-white/5 transition duration-300"
                  aria-label="Next story page"
                ></button>
              </div>

              {/* Bottom detail engagement row */}
              <div className="absolute bottom-6 inset-x-4 z-10 flex items-center justify-between bg-gradient-to-t from-black/85 to-transparent p-3 rounded-xl border border-zinc-900/40 backdrop-blur-sm">
                <div className="flex flex-col">
                  <span className="text-[10px] text-cyan-400 font-extrabold flex items-center gap-1 uppercase">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Exclusive Trend</span>
                  </span>
                  <span className="text-xs text-zinc-200 mt-1">Tap left/right to browse slide</span>
                </div>

                <div className="flex gap-2">
                  <button 
                    onClick={() => setStoryProgress(prev => Math.min(prev + 10, 100))}
                    className="p-2 rounded-full bg-pink-600/80 text-white hover:scale-105 transition"
                  >
                    <Heart className="w-4 h-4 fill-white" />
                  </button>
                </div>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Prominent PWA Installation Button */}
      <PWAInstallButton
        currentLang={currentLang}
        isVisible={true}
        onInstall={() => console.log('PWA install requested')}
        onDismiss={() => console.log('PWA install dismissed')}
      />
    </div>
  );
}
