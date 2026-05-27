import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Compass, Flame, Map, PlusCircle, BookOpen, Search, X, 
  Sparkles, Heart, Star, ChevronLeft, ChevronRight, CheckCircle2, Play, Lock,
  ChevronDown, MapPin
} from 'lucide-react';
import { Language, GovernorateCode, Business, SocialPost, UserProfile, HeroSlide } from './types';
import { INITIAL_BUSINESSES, TRANSLATIONS, CATEGORIES, INITIAL_POSTS, GOVERNORATES, HERO_SLIDES } from './data';
import { authApi, businessesApi, postsApi } from './api';

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

export default function App() {
  const [currentLang, setCurrentLang] = useState<Language>('ar'); // Default: Arabic
  const [selectedGov, setSelectedGov] = useState<GovernorateCode>('all'); // Default: All Iraq
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [categories, setCategories] = useState(CATEGORIES);
  
  // Real-time Authenticated Firebase User state
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  // Saku Maku core Reactive businesses database
  const [businesses, setBusinesses] = useState<Business[]>([]);
  
  // Saku Maku elevated Live Social posts stream
  const [posts, setPosts] = useState<SocialPost[]>([]);
  
  // Navigation active tab
  const [activeTab, setActiveTab] = useState<'discover' | 'feed' | 'map' | 'add' | 'about' | 'admin'>('discover');

  // Pagination state — cursor-based for O(1) performance at 8000+ rows
  const PAGE_SIZE = 20;
  const [bizCursor, setBizCursor] = useState<string | null>(null);
  const [bizHasMore, setBizHasMore] = useState(false);
  const [bizLoadingMore, setBizLoadingMore] = useState(false);
  const [bizLoading, setBizLoading] = useState(true);
  
  // Real-time keyword filter
  const [searchQuery, setSearchQuery] = useState('');
  
  // Merchant active story popup state
  const [activeStory, setActiveStory] = useState<string[] | null>(null);
  const [activeStoryIdx, setActiveStoryIdx] = useState(0);
  const [storyProgress, setStoryProgress] = useState(0);
  const [govDropdownOpen, setGovDropdownOpen] = useState(false);
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);

  const t = TRANSLATIONS[currentLang];
  const isRtl = currentLang === 'ar' || currentLang === 'ku';

  // Real-time Hero Slides synced from Firestore with auto-seeding
  const [heroSlides, setHeroSlides] = useState<HeroSlide[]>([]);

  // Load user profile from localStorage on mount
  useEffect(() => {
    const savedProfile = localStorage.getItem('user_profile');
    if (savedProfile) {
      try {
        const profile = JSON.parse(savedProfile);
        setUserProfile(profile);
        setUser(profile);
      } catch (e) {
        console.error("Profile parse error: ", e);
      }
    }
  }, []);

  // Set hero slides from local data
  useEffect(() => {
    setHeroSlides(HERO_SLIDES);
  }, []);

  const handleCustomEmailLogin = async (customEmail: string) => {
    const cleanEmail = customEmail.trim().toLowerCase();
    if (!cleanEmail) return;

    const mockUid = 'cust-' + btoa(cleanEmail).replace(/=/g, '').slice(0, 16);
    const customUserMock = {
      uid: mockUid,
      email: cleanEmail,
      displayName: cleanEmail.split('@')[0],
      photoURL: cleanEmail === 'mahdialmuntadhar1@gmail.com' || cleanEmail === 'safaribosafar@gmail.com' 
        ? "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" 
        : "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80",
      emailVerified: true
    } as any;

    const isAdmin = cleanEmail === 'mahdialmuntadhar1@gmail.com' || cleanEmail === 'safaribosafar@gmail.com';
    const isOwner = cleanEmail.includes('owner');
    
    const newProfile: UserProfile = {
      uid: mockUid,
      displayName: customUserMock.displayName,
      photoURL: customUserMock.photoURL,
      email: cleanEmail,
      createdAt: new Date().toISOString(),
      role: isAdmin ? 'admin' : (isOwner ? 'owner' : 'user'),
      onboarded: isOwner, 
      businessId: isOwner ? 'b-onboard-demo' : null,
      businessOnboarding: isOwner ? {
        name: 'Classic Baghdadi Café',
        category: 'coffee',
        governorate: 'baghdad',
        address: 'Arasat Street, Karrada District',
        phone: '+9647701234567',
        whatsApp: '+9647701234567',
        logo: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=120&auto=format&fit=crop&q=80',
        coverImage: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&auto=format&fit=crop&q=80',
        description: 'Elite cozy spot for specialty brews.'
      } : undefined
    };

    // Store in localStorage instead of Firestore
    localStorage.setItem('user_profile', JSON.stringify(newProfile));
    localStorage.setItem('auth_token', mockUid);
    setUser(customUserMock);
    setUserProfile(newProfile);

    if (isOwner) {
      const demoBiz = {
        id: 'b-onboard-demo',
        name: { ar: 'مقهى البغدادي الكلاسيكي ☕', ku: 'کافێی کلاسیکی بەغدادی ☕', en: 'Classic Baghdadi Café ☕' },
        description: { ar: 'أرقى أنواع القهوة الفلتر والحلويات الشرقية في الكرادة.', ku: 'باشترین جۆرەکانی قاوە و شیرینییەکان.', en: 'Cozy traditional Iraqi roaster in Karada.' },
        category: 'coffee',
        governorate: 'baghdad',
        rating: 4.9,
        reviewsCount: 42,
        image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&auto=format&fit=crop&q=80',
        images: ['https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&auto=format&fit=crop&q=80'],
        avatar: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=120&auto=format&fit=crop&q=80',
        isVerified: true,
        phoneNumber: '+9647701234567',
        address: { ar: 'شارع العرصات، الكرادة', ku: 'جادەی عەرەسات، بەغداد', en: 'Arasat Street, Karrada' },
        likes: 35,
        saves: 18,
        mapCoords: { x: 48, y: 58 },
        ownerUid: mockUid
      };
      // Store demo business in localStorage for demo purposes
      localStorage.setItem('demo_business', JSON.stringify(demoBiz));
    }

    console.log("Custom auth session set representing: ", cleanEmail);
  };

  // Handle password reset token in URL params on load
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const resetToken = params.get('reset_token');
    if (resetToken) {
      setAuthModalOpen(true);
    }
  }, []);

  // Secure fully responsive terminations of session
  const handleSecureLogout = async () => {
    try {
      localStorage.removeItem('user_profile');
      localStorage.removeItem('auth_token');
      setUser(null);
      setUserProfile(null);
      setActiveTab('discover');
      sessionStorage.clear();
      console.log("Session terminated.");
    } catch (err) {
      console.error("Logout error: ", err);
    }
  };

  const handleUpdateRole = (newRole: 'user' | 'owner' | 'admin') => {
    if (!user) return;
    const updated = { ...userProfile, role: newRole } as UserProfile;
    setUserProfile(updated);
    localStorage.setItem('user_profile', JSON.stringify(updated));
  };

  const handleUpdateProfile = async (updatedFields: Partial<UserProfile>) => {
    if (!user) return;
    const updated = { ...userProfile, ...updatedFields } as UserProfile;
    setUserProfile(updated);
    localStorage.setItem('user_profile', JSON.stringify(updated));
  };

  // Map DB category string → frontend CATEGORIES id
  const mapDbCategory = (cat: string): string => {
    const c = (cat || '').toLowerCase();
    if (c.includes('coffee') || c.includes('cafe') || c.includes('restaurant') || c.includes('food') || c.includes('beverage')) return 'coffee';
    if (c.includes('dining') || c.includes('meal')) return 'dining';
    if (c.includes('hotel') || c.includes('hospitality') || c.includes('resort') || c.includes('travel') || c.includes('tourism')) return 'hotels';
    if (c.includes('salon') || c.includes('beauty') || c.includes('spa') || c.includes('grooming')) return 'salons';
    if (c.includes('gym') || c.includes('fitness') || c.includes('sport')) return 'gyms';
    if (c.includes('pharmacy') || c.includes('medical') || c.includes('health') || c.includes('clinic') || c.includes('doctor')) return 'pharmacies';
    if (c.includes('university') || c.includes('education') || c.includes('training') || c.includes('school')) return 'universities';
    if (c.includes('entertainment') || c.includes('event') || c.includes('fun')) return 'entertainment';
    if (c.includes('shop') || c.includes('retail') || c.includes('clothing') || c.includes('fashion') || c.includes('store')) return 'shopping';
    return 'entertainment'; // catch-all
  };

  // Map raw API business to typed Business
  const mapApiBiz = (b: any): Business => ({
    id: b.id,
    name: { ar: b.name || '', ku: b.name || '', en: b.name || '' },
    description: { ar: b.description || b.bio || '', ku: b.description || b.bio || '', en: b.description || b.bio || '' },
    category: mapDbCategory(b.category),
    governorate: (b.governorate || 'baghdad').toLowerCase().replace(/\s+/g, '').replace(/[^a-z]/g, '') as any,
    rating: b.rating || 4.5,
    reviewsCount: b.views || b.reviews_count || 0,
    image: b.coverImageUrl || b.cover_image_url || b.logo_url || 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&auto=format&fit=crop&q=80',
    images: [b.coverImageUrl || b.cover_image_url || b.logo_url || 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&auto=format&fit=crop&q=80'],
    avatar: b.logo_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
    isVerified: !!b.verified,
    phoneNumber: b.mobile || b.phone || '',
    address: { ar: b.address || b.city || '', ku: b.address || b.city || '', en: b.address || b.city || '' },
    likes: b.likes || 0,
    saves: b.saves || 0,
    mapCoords: { x: 48, y: 55 },
  });

  // Load first batch whenever governorate OR category changes — resets list + cursor
  useEffect(() => {
    let cancelled = false;
    setBizLoading(true);
    setBizCursor(null);
    setBusinesses([]);
    const gov = selectedGov === 'all' ? undefined : selectedGov;
    const cat = selectedCategory || undefined;
    businessesApi.list({ limit: PAGE_SIZE, governorate: gov, category: cat })
      .then((res: any) => {
        if (cancelled) return;
        const list: Business[] = (res.data || []).map(mapApiBiz);
        setBusinesses(list.length > 0 ? list : []);
        setBizCursor(res.next_cursor ?? null);
        setBizHasMore(res.has_more ?? false);
      })
      .catch((err: any) => {
        console.error('API businesses load error, using local data:', err);
        if (!cancelled) {
          setBusinesses(INITIAL_BUSINESSES);
          setBizHasMore(false);
          setBizCursor(null);
        }
      })
      .finally(() => { if (!cancelled) setBizLoading(false); });
    return () => { cancelled = true; };
  }, [selectedGov, selectedCategory]);

  // Load next cursor batch and append
  const handleLoadMoreBiz = () => {
    if (bizLoadingMore || !bizHasMore || !bizCursor) return;
    setBizLoadingMore(true);
    const gov = selectedGov === 'all' ? undefined : selectedGov;
    const cat = selectedCategory || undefined;
    businessesApi.list({ cursor: bizCursor, limit: PAGE_SIZE, governorate: gov, category: cat })
      .then((res: any) => {
        const list: Business[] = (res.data || []).map(mapApiBiz);
        setBusinesses(prev => [...prev, ...list]);
        setBizCursor(res.next_cursor ?? null);
        setBizHasMore(res.has_more ?? false);
      })
      .catch((err: any) => console.error('Load more error:', err))
      .finally(() => setBizLoadingMore(false));
  };

  // Load posts from REST API with local data fallback
  useEffect(() => {
    let cancelled = false;
    postsApi.list({ limit: 30 })
      .then((res: any) => {
        if (cancelled) return;
        const list: SocialPost[] = (res.data || []);
        if (list.length > 0) {
          setPosts(list);
        } else {
          setPosts(INITIAL_POSTS);
        }
      })
      .catch((err: any) => {
        console.error("API posts load error, using local data: ", err);
        if (!cancelled) setPosts(INITIAL_POSTS);
      });
    return () => { cancelled = true; };
  }, []);

  // Client-side filter: category chip + keyword search
  const filteredBusinesses = useMemo(() => {
    let list = businesses;
    if (selectedCategory) {
      list = list.filter(b => b.category === selectedCategory);
    }
    if (!searchQuery.trim()) return list;
    const keyword = searchQuery.toLowerCase().trim();
    return list.filter(b =>
      b.name[currentLang].toLowerCase().includes(keyword) ||
      b.name.en.toLowerCase().includes(keyword) ||
      b.description[currentLang].toLowerCase().includes(keyword) ||
      b.address[currentLang].toLowerCase().includes(keyword) ||
      b.category.toLowerCase().includes(keyword)
    );
  }, [businesses, searchQuery, currentLang, selectedCategory]);

  // Handle Likes state toggle (local state only)
  const handleToggleLike = (bizId: string) => {
    setBusinesses(prev => prev.map(b => {
      if (b.id !== bizId) return b;
      const liked = !b.likedByUser;
      return { ...b, likedByUser: liked, likes: liked ? b.likes + 1 : b.likes - 1 };
    }));
  };

  // Handle Saves state toggle (local state only)
  const handleToggleSave = (bizId: string) => {
    setBusinesses(prev => prev.map(b => {
      if (b.id !== bizId) return b;
      const saved = !b.savedByUser;
      return { ...b, savedByUser: saved, saves: saved ? b.saves + 1 : b.saves - 1 };
    }));
  };

  // Callback to add a new business to local state
  const handleAddLiveBusiness = (newBiz: Omit<Business, 'rating' | 'reviewsCount' | 'likes' | 'saves'>) => {
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
    setBusinesses(prev => [fullBiz, ...prev]);
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

  return (
    <div className="min-h-screen bg-luxury-neutral pb-28 text-[#1A1A1A] flex flex-col selection:bg-luxury-gold selection:text-[#1A1A1A] relative overflow-hidden" dir={isRtl ? 'rtl' : 'ltr'}>
      
      {/* Elegant Warm Luxury Atmosphere Glow */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-5%] left-[-5%] w-[450px] h-[450px] bg-luxury-gold/10 rounded-full blur-[130px]"></div>
        <div className="absolute bottom-[-5%] right-[-5%] w-[450px] h-[450px] bg-luxury-teal/5 rounded-full blur-[130px]"></div>
      </div>

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
                ? 'bg-[#1A1A1A] border-[#0F2E2F] text-white shadow-xl shadow-[#0F2E2F]/15'
                : 'bg-white border-zinc-200 text-zinc-800 hover:border-luxury-gold hover:bg-zinc-50/50'
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
                ? 'bg-[#1A1A1A] border-[#0F2E2F] text-white shadow-xl shadow-[#0F2E2F]/15'
                : 'bg-white border-zinc-200 text-zinc-800 hover:border-luxury-gold hover:bg-zinc-50/50'
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
          
          <AnimatePresence mode="wait">
            {activeTab === 'discover' && (
              <motion.div
                key="discover"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="space-y-6"
              >
                {/* Register Business CTA for logged-in users */}
                {userProfile && userProfile.role !== 'owner' && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="relative overflow-hidden rounded-2xl border border-amber-500/30 bg-gradient-to-r from-amber-950/40 via-black/60 to-amber-950/40 p-4 sm:p-5"
                  >
                    <div className="absolute inset-0 bg-amber-500/5 animate-pulse" />
                    <div className="relative flex flex-col sm:flex-row items-center justify-between gap-3">
                      <div className="text-center sm:text-left">
                        <h3 className="text-sm font-black text-amber-300 uppercase tracking-wider">
                          {currentLang === 'en' ? 'Own a Business?' : currentLang === 'ar' ? 'تمتلك نشاطاً تجارياً؟' : 'خاوەنی بزنسێکی هەیە؟'}
                        </h3>
                        <p className="text-[11px] text-zinc-400 mt-1">
                          {currentLang === 'en' ? 'List your business and reach thousands of customers.' : currentLang === 'ar' ? 'سجّل نشاطك التجاري ووصل لآلاف الزبائن.' : 'بزنسەکەت تۆمار بکە و بگە بە هەزاران کڕیار.'}
                        </p>
                      </div>
                      <button
                        onClick={() => setActiveTab('add')}
                        className="shrink-0 px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-black text-xs font-black rounded-xl transition shadow-lg shadow-amber-500/20 cursor-pointer whitespace-nowrap"
                      >
                        ⭐ {currentLang === 'en' ? 'Register your Business' : currentLang === 'ar' ? 'سجّل نشاطك التجاري' : 'بزنسەکەت تۆمار بکە'}
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* Category Square discovery grid */}
                <CategorySwiper
                  currentLang={currentLang}
                  selectedCategory={selectedCategory}
                  onSelectCategory={setSelectedCategory}
                  categories={categories}
                />

                {/* Saku Maku Dynamic Grouped Businesses section catalog */}
                <BusinessFeed
                  currentLang={currentLang}
                  selectedGov={selectedGov}
                  selectedCategory={selectedCategory}
                  businesses={filteredBusinesses}
                  categories={categories}
                  onToggleLike={handleToggleLike}
                  onToggleSave={handleToggleSave}
                  onSelectStory={(stories) => {
                    setActiveStory(stories);
                    setActiveStoryIdx(0);
                    setStoryProgress(0);
                  }}
                  isLoading={bizLoading}
                  hasMore={bizHasMore}
                  isLoadingMore={bizLoadingMore}
                  onLoadMore={handleLoadMoreBiz}
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
                <AddBusinessForm
                  currentLang={currentLang}
                  onAddBusiness={handleAddLiveBusiness}
                  user={user}
                  userProfile={userProfile}
                  onUpdateProfile={handleUpdateProfile}
                  onSignIn={() => setAuthModalOpen(true)}
                  businesses={businesses}
                  posts={posts}
                  setPosts={setPosts}
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
                  categories={categories}
                  setCategories={setCategories}
                />
              </motion.div>
            )}
          </AnimatePresence>

        </div>

      </main>

      {/* Floating Modern bottom-menu navigation bar (optimized for youth mobile thumb-reach) */}
      <div className="fixed bottom-6 inset-x-4 max-w-lg mx-auto bg-[#1A1A1A]/95 backdrop-blur-xl border border-luxury-gold/35 px-4.5 py-2.5 rounded-[24px] shadow-2xl z-40 flex items-center justify-between gap-1 select-none">
        
        <button
          onClick={() => setActiveTab('discover')}
          className={`flex flex-col items-center justify-center flex-1 py-1 px-2.5 rounded-xl transition-all duration-300 cursor-pointer ${
            activeTab === 'discover'
              ? 'text-luxury-gold font-bold bg-white/5 border border-luxury-gold/25'
              : 'text-zinc-400 hover:text-white'
          }`}
          id="nav-tab-discover"
        >
          <Compass className="w-5 h-5 mb-1" />
          <span className="text-[9px] font-black tracking-tight">{t.exploreTab.split(' ')[0]}</span>
        </button>

        <button
          onClick={() => setActiveTab('feed')}
          className={`flex flex-col items-center justify-center flex-1 py-1 px-2.5 rounded-xl transition-all duration-300 cursor-pointer ${
            activeTab === 'feed'
              ? 'text-luxury-gold font-bold bg-white/5 border border-luxury-gold/25'
              : 'text-zinc-400 hover:text-white'
          }`}
          id="nav-tab-feed"
        >
          <div className="relative">
            <Flame className="w-5 h-5 mb-1 text-inherit" />
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
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

    </div>
  );
}
