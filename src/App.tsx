import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Compass, Flame, Map, PlusCircle, BookOpen, Search, X, 
  Sparkles, Heart, Star, ChevronLeft, ChevronRight, CheckCircle2, Play, Lock,
  ChevronDown, MapPin
} from 'lucide-react';
import { Language, GovernorateCode, Business, SocialPost, UserProfile, HeroSlide } from './types';
import { INITIAL_BUSINESSES, TRANSLATIONS, CATEGORIES, INITIAL_POSTS, GOVERNORATES, HERO_SLIDES } from './data';
import { authApi, businessesApi } from './api';

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
  
  // Custom Auth User state
  const [user, setUser] = useState<any>(null);
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
  const [authModalOpen, setAuthModalOpen] = useState(false);

  const t = TRANSLATIONS[currentLang];
  const isRtl = currentLang === 'ar' || currentLang === 'ku';

  // Real-time Hero Slides synced from Firestore with auto-seeding
  const [heroSlides, setHeroSlides] = useState<HeroSlide[]>([]);

  // Local storage quick recovery helper for iframe sessions
  useEffect(() => {
    const saved = localStorage.getItem('shkomaku_custom_user');
    if (saved) {
      try {
        const customUser = JSON.parse(saved);
        setUser(customUser);
        const userRef = doc(db, 'users', customUser.uid);
        const unsub = onSnapshot(userRef, (docSnap) => {
          if (docSnap.exists()) {
            setUserProfile(docSnap.data() as UserProfile);
          }
        }, (err) => console.error("Saved profile listen err: ", err));
        return () => unsub();
      } catch (e) {
        console.error("Local recovery error: ", e);
      }
    }
  }, []);

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
              console.error("Fails seeding hero slide: ", err);
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
      console.error("Error syncing hero slides in Firestore: ", error);
      setHeroSlides(HERO_SLIDES);
    });
    return () => unsubscribe();
  }, [userProfile]);

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
    
    const userRef = doc(db, 'users', mockUid);
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
      await setDoc(doc(db, 'businesses', 'b-onboard-demo'), demoBiz, { merge: true });
    }

    try {
      await setDoc(userRef, newProfile, { merge: true });
      localStorage.setItem('shkomaku_custom_user', JSON.stringify(customUserMock));
      setUser(customUserMock);
      setUserProfile(newProfile);
      console.log("Custom auth session set representing: ", cleanEmail);
    } catch (err) {
      console.error("Error setting custom user in Firestore: ", err);
    }
  };

  // Real-time Auth Listening and User creation mapping inside Firestore
  useEffect(() => {
    let unsubProfile: (() => void) | null = null;
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      // If a custom local storage user already exists, let it take precedence
      if (localStorage.getItem('shkomaku_custom_user')) {
        return;
      }
      setUser(firebaseUser);
      if (firebaseUser) {
        const userRef = doc(db, 'users', firebaseUser.uid);
        unsubProfile = onSnapshot(userRef, (docSnap) => {
          if (docSnap.exists()) {
            setUserProfile(docSnap.data() as UserProfile);
          } else {
            const isAdmin = firebaseUser.email === 'safaribosafar@gmail.com' || firebaseUser.email === 'mahdialmuntadhar1@gmail.com';
            const newProfile: UserProfile = {
              uid: firebaseUser.uid,
              displayName: firebaseUser.displayName || 'Authorized User',
              photoURL: firebaseUser.photoURL || '',
              email: firebaseUser.email || '',
              createdAt: new Date().toISOString(),
              role: isAdmin ? 'admin' : 'user',
              onboarded: false,
              businessId: null
            };
            setDoc(userRef, newProfile).catch(err => console.error("Error seeding profile: ", err));
            setUserProfile(newProfile);
          }
        }, (error) => {
          console.error("Profile listen error: ", error);
        });
      } else {
        if (unsubProfile) {
          unsubProfile();
          unsubProfile = null;
        }
        setUserProfile(null);
      }
    });
    return () => {
      unsubscribe();
      if (unsubProfile) unsubProfile();
    };
  }, []);

  // Secure fully responsive terminations of session
  const handleSecureLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem('shkomaku_custom_user');
      setUser(null);
      setUserProfile(null);
      setActiveTab('discover');
      localStorage.removeItem('firebase:authUser:' + auth.app.options.apiKey + ':[DEFAULT]');
      sessionStorage.clear();
      console.log("Stale sessions eradicated. Standard non-interactive guests initialized.");
    } catch (err) {
      console.error("Logout error: ", err);
    }
  };

  const handleUpdateRole = async (newRole: 'user' | 'owner' | 'admin') => {
    if (!user) return;
    try {
      const userRef = doc(db, 'users', user.uid);
      await setDoc(userRef, { role: newRole }, { merge: true });
    } catch (err) {
      console.error("Error setting role: ", err);
    }
  };

  const handleUpdateProfile = async (updatedFields: Partial<UserProfile>) => {
    if (!user) return;
    try {
      const userRef = doc(db, 'users', user.uid);
      await setDoc(userRef, updatedFields, { merge: true });
    } catch (err) {
      console.error("Error updating profile: ", err);
    }
  };

  // Real-time Firestore synchronization & Auto-seeding for businesses
  useEffect(() => {
    const ref = collection(db, 'businesses');
    const unsubscribe = onSnapshot(ref, (snap) => {
      if (snap.empty) {
        // Fallback to local businesses immediately so users never see a blank catalog
        setBusinesses(INITIAL_BUSINESSES);

        // ONLY attempt database seeding if current user is signed-in as administrative operator
        const isAdminUser = user && user.email === 'safaribosafar@gmail.com';
        if (isAdminUser) {
          INITIAL_BUSINESSES.forEach(async (biz) => {
            try {
              await setDoc(doc(db, 'businesses', biz.id), {
                ...biz,
                ownerUid: 'system-seed'
              });
            } catch (e) {
              console.error("Fails seeding biz: ", e);
            }
          });
        }
      } else {
        const list: Business[] = [];
        snap.forEach((doc) => {
          list.push(doc.data() as Business);
        });
        setBusinesses(list);
      }
    }, (error) => {
      console.error("Firestore businesses synced error: ", error);
      // Fallback on sync/credential error
      setBusinesses(INITIAL_BUSINESSES);
    });
    return () => unsubscribe();
  }, [user]);

  // Real-time Firestore synchronization & Auto-seeding for posts
  useEffect(() => {
    const ref = collection(db, 'posts');
    const unsubscribe = onSnapshot(ref, (snap) => {
      if (snap.empty) {
        // Fallback to local posts immediately so users never see a blank feed
        setPosts(INITIAL_POSTS);

        // ONLY attempt database seeding if current user is signed-in as administrative operator
        const isAdminUser = user && user.email === 'safaribosafar@gmail.com';
        if (isAdminUser) {
          INITIAL_POSTS.forEach(async (post) => {
            try {
              await setDoc(doc(db, 'posts', post.id), {
                ...post,
                authorUid: 'system-seed'
              });
            } catch (e) {
              console.error("Fails seeding post: ", e);
            }
          });
        }
      } else {
        const list: SocialPost[] = [];
        snap.forEach((doc) => {
          list.push(doc.data() as SocialPost);
        });
        list.sort((a, b) => b.id.localeCompare(a.id));
        setPosts(list);
      }
    }, (error) => {
      console.error("Firestore posts synced error: ", error);
      // Fallback on sync/credential error
      setPosts(INITIAL_POSTS);
    });
    return () => unsubscribe();
  }, [user]);

  // Filter business array based on search input + governorate matches + category
  const filteredBusinesses = useMemo(() => {
    return businesses.filter(b => {
      // Governorate Match
      const govMatch = selectedGov === 'all' || b.governorate === selectedGov;
      
      // Keyword Match (case-insensitive across translated fields)
      const keyword = searchQuery.toLowerCase().trim();
      const keywordMatch = !keyword || 
        b.name[currentLang].toLowerCase().includes(keyword) ||
        b.name.en.toLowerCase().includes(keyword) ||
        b.description[currentLang].toLowerCase().includes(keyword) ||
        b.address[currentLang].toLowerCase().includes(keyword) ||
        b.category.toLowerCase().includes(keyword);
        
      return govMatch && keywordMatch;
    });
  }, [businesses, selectedGov, searchQuery, currentLang]);

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
      console.error("Error liking business: ", err);
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
      console.error("Error saving business: ", err);
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
      console.error("Error adding live business in Firestore: ", err);
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

        {/* Custom Premium Governorate Filtering Dropdown (Directly beneath Hero Banner) */}
        <div className="mb-6 max-w-md mx-auto px-2 relative z-30">
          <div className="text-[11px] font-black text-luxury-gold uppercase tracking-wider mb-2 text-center flex items-center justify-center gap-2">
            <MapPin className="w-4 h-4 text-luxury-gold shrink-0 animate-bounce" />
            <span>{currentLang === 'en' ? 'Select Iraqi Governorate / Region' : currentLang === 'ku' ? 'پارێزگایەک دەستنیشان بکە' : 'اختر المحافظة العراقية لتصفح المتاجر'}</span>
          </div>
          
          <div className="relative">
            <button
              onClick={() => setGovDropdownOpen(!govDropdownOpen)}
              className="w-full flex items-center justify-between text-xs font-black bg-[#16161a] hover:bg-[#1f1f26] text-white px-5 py-3.5 rounded-2xl border border-luxury-gold/30 hover:border-luxury-gold/60 transition-all shadow-xl shadow-black/40 cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <span className="text-base">📍</span>
                <span>{GOVERNORATES.find(g => g.code === selectedGov)?.name[currentLang]}</span>
              </div>
              <ChevronDown className={`w-4.5 h-4.5 text-luxury-gold transition-transform duration-300 ${govDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {govDropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-[#121215] border border-luxury-gold/20 rounded-2xl shadow-2xl p-2 z-50 grid grid-cols-2 gap-1 animate-fade-in max-h-[280px] overflow-y-auto custom-scrollbar">
                {GOVERNORATES.map((gov) => (
                  <button
                    key={gov.code}
                    onClick={() => {
                      setSelectedGov(gov.code);
                      setGovDropdownOpen(false);
                      setActiveTab('discover');
                    }}
                    className={`text-left px-3 py-2 text-xs rounded-xl flex items-center justify-between transition-all cursor-pointer ${
                      selectedGov === gov.code
                        ? 'bg-gradient-to-r from-luxury-teal to-luxury-gold/85 text-white font-extrabold shadow'
                        : 'text-zinc-300 hover:bg-white/5 font-semibold'
                    }`}
                  >
                    <span className="truncate">{gov.name[currentLang]}</span>
                    {selectedGov === gov.code && <span className="text-[10px]">✨</span>}
                  </button>
                ))}
              </div>
            )}
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
