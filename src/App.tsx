import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Compass, Flame, Map, PlusCircle, BookOpen, Search, X, 
  Sparkles, Heart, Star, ChevronLeft, ChevronRight, CheckCircle2, Play, Lock
} from 'lucide-react';
import { Language, GovernorateCode, Business, SocialPost } from './types';
import { INITIAL_BUSINESSES, TRANSLATIONS, CATEGORIES, INITIAL_POSTS } from './data';
import { authApi, businessesApi, postsApi } from './api';
import type { AuthResponse } from './api';

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
  
  // Authenticated User state
  const [user, setUser] = useState<AuthResponse['user'] | null>(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);

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

  const t = TRANSLATIONS[currentLang];
  const isRtl = currentLang === 'ar' || currentLang === 'ku';

  // Auth state initialization + OAuth callback handler
  useEffect(() => {
    // Check for OAuth callback
    const oauthResult = authApi.handleOAuthCallback();
    if (oauthResult) {
      setUser(oauthResult.user);
      return;
    }
    // Check existing session
    const token = authApi.getToken();
    const savedUser = authApi.getUser();
    if (token && savedUser) {
      setUser(savedUser);
    }
  }, []);

  // Fetch businesses from API
  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        const data = await businessesApi.list();
        if (data && Array.isArray(data) && data.length > 0) {
          setBusinesses(data);
        } else {
          // Fallback to local businesses if API returns empty
          setBusinesses(INITIAL_BUSINESSES);
        }
      } catch (error) {
        console.error('Error fetching businesses:', error);
        // Fallback to local businesses on error
        setBusinesses(INITIAL_BUSINESSES);
      }
    };
    fetchBusinesses();
  }, []);

  // Fetch posts from API
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await postsApi.list();
        if (data && Array.isArray(data) && data.length > 0) {
          setPosts(data);
        } else {
          // Fallback to local posts if API returns empty
          setPosts(INITIAL_POSTS);
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
        // Fallback to local posts on error
        setPosts(INITIAL_POSTS);
      }
    };
    fetchPosts();
  }, []);

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

  // Handle Likes state toggle
  const handleToggleLike = async (bizId: string) => {
    const target = businesses.find(b => b.id === bizId);
    if (!target) return;
    const liked = !target.likedByUser;
    try {
      await businessesApi.like(bizId);
      // Optimistic update
      setBusinesses(prev => prev.map(b => 
        b.id === bizId 
          ? { ...b, likedByUser: liked, likes: liked ? b.likes + 1 : b.likes - 1 }
          : b
      ));
    } catch (err) {
      console.error("Error liking business: ", err);
    }
  };

  // Handle Saves state toggle
  const handleToggleSave = async (bizId: string) => {
    const target = businesses.find(b => b.id === bizId);
    if (!target) return;
    const saved = !target.savedByUser;
    try {
      await businessesApi.save(bizId);
      // Optimistic update
      setBusinesses(prev => prev.map(b => 
        b.id === bizId 
          ? { ...b, savedByUser: saved, saves: saved ? b.saves + 1 : b.saves - 1 }
          : b
      ));
    } catch (err) {
      console.error("Error saving business: ", err);
    }
  };

  // Callback to add a new customized business from owners claim form
  const handleAddLiveBusiness = async (newBiz: Omit<Business, 'rating' | 'reviewsCount' | 'likes' | 'saves'>) => {
    const fullBiz: Business = {
      ...newBiz,
      rating: 4.8,
      reviewsCount: 1,
      likes: 15,
      saves: 8,
      likedByUser: false,
      savedByUser: false,
      ownerUid: user?.id || 'anonymous'
    };
    try {
      await businessesApi.create(fullBiz);
      // Refresh businesses list
      const data = await businessesApi.list();
      if (data && Array.isArray(data)) {
        setBusinesses(data);
      }
    } catch (err) {
      console.error("Error adding live business: ", err);
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
    <div className="min-h-screen bg-[#020205] pb-28 text-zinc-100 flex flex-col selection:bg-blue-500 selection:text-white relative overflow-hidden" dir={isRtl ? 'rtl' : 'ltr'}>
      
      {/* Elegant Dark Background Atmosphere */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-5%] left-[-5%] w-[450px] h-[450px] bg-blue-900/15 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-5%] right-[-5%] w-[450px] h-[450px] bg-purple-900/15 rounded-full blur-[120px]"></div>
      </div>

      {/* Dynamic Saku Maku top header */}
      <Header
        currentLang={currentLang}
        onChangeLang={setCurrentLang}
        selectedGov={selectedGov}
        onChangeGov={(gov) => {
          setSelectedGov(gov);
          // Auto scroll to discovery catalog on change
          setActiveTab('discover');
        }}
        user={user}
        onSignIn={() => setAuthModalOpen(true)}
        onSignOut={() => {
          authApi.logout();
          setUser(null);
        }}
      />

      <main className="flex-grow max-w-7xl w-full mx-auto px-4 py-6">
        
        {/* Interactive Horizontal Stories Pipeline */}
        <div className="mb-8 overflow-x-auto py-2 custom-scrollbar flex items-center gap-4.5 select-none shrink-0">
          
          <div className="flex flex-col items-center gap-1 cursor-pointer group select-none relative">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-pink-500 to-violet-600 flex items-center justify-center text-white scale-100 group-hover:scale-105 duration-300 shadow">
              <Play className="w-6.5 h-6.5 text-white fill-current animate-pulse" />
            </div>
            <span className="text-[10px] font-black text-pink-400 uppercase tracking-tight text-center truncate">
              {t.dealsCorner}
            </span>
          </div>

          {/* Business custom story bubbles */}
          {businesses.filter(b => b.stories && b.stories.length > 0).map((biz) => (
            <div
              key={biz.id}
              onClick={() => {
                if (biz.stories) {
                  setActiveStory(biz.stories);
                  setActiveStoryIdx(0);
                  setStoryProgress(0);
                }
              }}
              className="flex flex-col items-center gap-1.5 cursor-pointer shrink-0 scroll-ml-2 focus:outline-none"
            >
              <div className="relative p-[2.5px] rounded-full bg-gradient-to-tr from-pink-500 via-purple-600 to-cyan-400 hover:rotate-12 transition duration-500">
                <div className="w-13 h-13 rounded-full bg-slate-950 p-[1.5px] overflow-hidden">
                  <img
                    src={biz.avatar}
                    alt={biz.name[currentLang]}
                    className="w-full h-full object-cover rounded-full"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-slate-950 border border-purple-600 text-[9px] flex items-center justify-center">
                  🔥
                </span>
              </div>
              <span className="text-[10px] text-zinc-400 font-extrabold max-w-[70px] truncate text-center font-sans tracking-tight">
                {biz.name[currentLang].split('-')[0]}
              </span>
            </div>
          ))}

        </div>

        {/* Global Search Interface bar */}
        <div className="mb-8 max-w-xl mx-auto relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-violet-600 to-cyan-400 rounded-2xl blur opacity-35 group-hover:opacity-60 transition duration-500"></div>
          <div className="relative flex items-center bg-slate-900 rounded-2xl border border-zinc-850 overflow-hidden px-4.5 py-1">
            <Search className="w-4.5 h-4.5 text-cyan-400 shrink-0" />
            
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

        {/* Dynamic Dual Discovery Buttons */}
        <div className="mt-8 mb-8 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto px-2">
          {/* Button: Main category of businesses */}
          <button
            onClick={() => {
              setActiveTab('discover');
              const catElem = document.getElementById('discovery-catalog-section');
              if (catElem) catElem.scrollIntoView({ behavior: 'smooth' });
            }}
            className={`flex items-center justify-between p-5 rounded-2xl border text-right transition-all duration-300 transform hover:scale-[1.01] cursor-pointer ${
              activeTab === 'discover'
                ? 'bg-gradient-to-br from-blue-600/20 to-violet-600/20 border-blue-500/50 text-white shadow-lg shadow-blue-500/10'
                : 'bg-white/5 border-white/5 text-white/70 hover:border-white/10 hover:bg-white/10'
            }`}
          >
            <div className="flex items-center gap-4 text-left">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl shrink-0 ${
                activeTab === 'discover' ? 'bg-blue-500/20 text-blue-400' : 'bg-white/5 text-white/50'
              }`}>
                🏢
              </div>
              <div className="space-y-0.5">
                <span className="text-sm font-black block text-white">
                  {currentLang === 'en' ? 'Explore Businesses' : currentLang === 'ku' ? 'گەڕان بەدوای شوێنەکاندا' : 'استكشف المحلات ومزودي الخدمة'}
                </span>
                <span className="text-[10px] text-white/40 font-medium block">
                  {currentLang === 'en' ? 'Browse by café, dining and spa categories' : currentLang === 'ku' ? 'بەپێی پۆل و فۆرمەکانی کارەکە' : 'تصفح الكافيهات والبوتيكات والمراكز الخدمية'}
                </span>
              </div>
            </div>
            <span className={`text-sm font-bold ${activeTab === 'discover' ? 'text-blue-400' : 'text-white/25'}`}>➔</span>
          </button>

          {/* Button: Social media Pulse Feed */}
          <button
            onClick={() => {
              setActiveTab('feed');
              const catElem = document.getElementById('discovery-catalog-section');
              if (catElem) catElem.scrollIntoView({ behavior: 'smooth' });
            }}
            className={`flex items-center justify-between p-5 rounded-2xl border text-right transition-all duration-300 transform hover:scale-[1.01] cursor-pointer ${
              activeTab === 'feed'
                ? 'bg-gradient-to-br from-pink-600/20 to-purple-600/20 border-pink-500/50 text-white shadow-lg shadow-pink-500/10'
                : 'bg-white/5 border-white/5 text-white/70 hover:border-white/10 hover:bg-white/10'
            }`}
          >
            <div className="flex items-center gap-4 text-left">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl relative shrink-0 ${
                activeTab === 'feed' ? 'bg-pink-500/20 text-pink-400' : 'bg-white/5 text-white/50'
              }`}>
                📸
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-red-505 bg-red-500 animate-ping"></span>
              </div>
              <div className="space-y-0.5">
                <span className="text-sm font-black block text-white">
                  {currentLang === 'en' ? 'Social Pulse Feed' : currentLang === 'ku' ? 'نبض الشارع • بڵاوکراوەکان' : 'نبض الشارع العراقي • الفيد'}
                </span>
                <span className="text-[10px] text-white/40 font-medium block">
                  {currentLang === 'en' ? 'Create social stories, updates & upload photos' : currentLang === 'ku' ? 'وێنە دابنێ، کاتی کەمپەین و ئۆفەر بڵاوکەرەوە' : 'انشر عروض وحملات محلك بالصور والمنشورات الحية'}
                </span>
              </div>
            </div>
            <span className={`text-sm font-bold ${activeTab === 'feed' ? 'text-pink-400' : 'text-white/25'}`}>➔</span>
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
                {/* Submitting claim form for local owners */}
                <AddBusinessForm
                  currentLang={currentLang}
                  onAddBusiness={handleAddLiveBusiness}
                  user={user}
                  onSignIn={() => setAuthModalOpen(true)}
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
                />
              </motion.div>
            )}
          </AnimatePresence>

        </div>

      </main>

      {/* Floating Modern bottom-menu navigation bar (optimized for youth mobile thumb-reach) */}
      <div className="fixed bottom-6 inset-x-4 max-w-lg mx-auto bg-slate-950/80 backdrop-blur-xl border border-violet-900/45 px-4.5 py-2.5 rounded-[24px] shadow-2xl z-40 flex items-center justify-between gap-1 select-none">
        
        <button
          onClick={() => setActiveTab('discover')}
          className={`flex flex-col items-center justify-center flex-1 py-1 px-2.5 rounded-xl transition-all duration-300 ${
            activeTab === 'discover'
              ? 'text-cyan-400 font-bold bg-cyan-950/20'
              : 'text-zinc-400 hover:text-white'
          }`}
          id="nav-tab-discover"
        >
          <Compass className="w-5 h-5 mb-1" />
          <span className="text-[9px] font-black tracking-tight">{t.exploreTab.split(' ')[0]}</span>
        </button>

        <button
          onClick={() => setActiveTab('feed')}
          className={`flex flex-col items-center justify-center flex-1 py-1 px-2.5 rounded-xl transition-all duration-300 ${
            activeTab === 'feed'
              ? 'text-pink-400 font-bold bg-pink-950/20'
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
          className={`flex flex-col items-center justify-center flex-1 py-1 px-2.5 rounded-xl transition-all duration-300 ${
            activeTab === 'map'
              ? 'text-purple-400 font-bold bg-purple-950/20'
              : 'text-zinc-400 hover:text-white'
          }`}
          id="nav-tab-map"
        >
          <Map className="w-5 h-5 mb-1" />
          <span className="text-[9px] font-black tracking-tight">{t.mapTab.split(' ')[0]}</span>
        </button>

        <button
          onClick={() => setActiveTab('add')}
          className={`flex flex-col items-center justify-center flex-1 py-1 px-2.5 rounded-xl transition-all duration-300 ${
            activeTab === 'add'
              ? 'text-emerald-400 font-bold bg-emerald-950/20'
              : 'text-zinc-400 hover:text-white'
          }`}
          id="nav-tab-add"
        >
          <PlusCircle className="w-5 h-5 mb-1" />
          <span className="text-[9px] font-black tracking-tight">Host</span>
        </button>

        <button
          onClick={() => setActiveTab('about')}
          className={`flex flex-col items-center justify-center flex-1 py-1 px-2.5 rounded-xl transition-all duration-300 ${
            activeTab === 'about'
              ? 'text-amber-400 font-bold bg-amber-950/20'
              : 'text-zinc-400 hover:text-white'
          }`}
          id="nav-tab-about"
        >
          <BookOpen className="w-5 h-5 mb-1" />
          <span className="text-[9px] font-black tracking-tight">Mission</span>
        </button>

        <button
          onClick={() => setActiveTab('admin')}
          className={`flex flex-col items-center justify-center flex-1 py-1 px-2.5 rounded-xl transition-all duration-300 ${
            activeTab === 'admin'
              ? 'text-red-400 font-bold bg-red-955/20'
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

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        currentLang={currentLang}
        onAuthSuccess={(userData) => setUser(userData)}
      />

    </div>
  );
}
