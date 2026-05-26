import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  ShieldCheck, Lock, LogOut, CheckCircle2, Trash2, 
  Sparkles, Layers, Eye, Users, FileText, BarChart3, Star, AlertCircle,
  MapPin, Tag, TrendingUp, MessageCircle, Heart, Share2, Save
} from 'lucide-react';
import { Language, Business, SocialPost } from '../types';
import { CATEGORIES } from '../data';
import { adminApi, businessesApi, postsApi } from '../api';

interface AdminPanelProps {
  currentLang: Language;
  businesses: Business[];
  setBusinesses: React.Dispatch<React.SetStateAction<Business[]>>;
  posts: SocialPost[];
  setPosts: React.Dispatch<React.SetStateAction<SocialPost[]>>;
}

interface Stats {
  total_businesses: number;
  active_businesses: number;
  total_posts: number;
  active_posts: number;
  total_comments: number;
  total_imports: number;
  total_likes: number;
}

export default function AdminPanel({
  currentLang,
  businesses,
  setBusinesses,
  posts,
  setPosts
}: AdminPanelProps) {
  // Login auth state
  const [isAuthenticated, setIsAuthenticated] = useState(adminApi.isLoggedIn());
  const [email, setEmail] = useState('mahdialmuntadhar1@gmail.com');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  // Admin section navigation tab
  const [adminTab, setAdminTab] = useState<'stats' | 'businesses' | 'posts' | 'comments'>('stats');
  const [stats, setStats] = useState<Stats | null>(null);
  const [comments, setComments] = useState<any[]>([]);

  // Fetch stats on login
  useEffect(() => {
    if (isAuthenticated) {
      fetchStats();
    }
  }, [isAuthenticated]);

  const fetchStats = async () => {
    try {
      const data = await adminApi.getStats();
      if (data) setStats(data);
    } catch (err) {
      console.error('Failed to fetch stats:', err);
    }
  };

  const fetchComments = async () => {
    try {
      const data = await adminApi.getComments();
      if (data && Array.isArray(data)) setComments(data);
    } catch (err) {
      console.error('Failed to fetch comments:', err);
    }
  };

  // Handle Login Authentication
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await adminApi.login({ email, password });
      if (result.success) {
        setIsAuthenticated(true);
        setErrorMsg('');
      } else {
        setErrorMsg(result.error || 'Login failed');
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Network error');
    }
    setLoading(false);
  };

  const handleLogout = () => {
    adminApi.logout();
    setIsAuthenticated(false);
  };

  // Admin Actions: Toggle verification badge of high-street brands
  const handleToggleVerify = (bizId: string) => {
    setBusinesses(prev => prev.map(b => {
      if (b.id === bizId) {
        return { ...b, isVerified: !b.isVerified };
      }
      return b;
    }));
  };

  // Admin Actions: Toggle Featured Deal text in Baghdad / Erbil swiper
  const handleToggleFeaturedDeal = (bizId: string) => {
    setBusinesses(prev => prev.map(b => {
      if (b.id === bizId) {
        const hasDeal = !!b.featuredDeal;
        return {
          ...b,
          featuredDeal: hasDeal ? undefined : {
            ar: 'خصم حقيقي ٢٠٪ بمناسبة الافتتاح 🌟',
            ku: 'داشکاندنی تایبەت ٢٠٪ بۆ کڕیاران 🌟',
            en: '15% Flat Discount Code on first visit 🌟'
          }
        };
      }
      return b;
    }));
  };

  // Admin Actions: Delete Business Listing completely
  const handleDeleteBusiness = async (bizId: string) => {
    if (window.confirm('Are you absolute sure you want to remove this business?')) {
      try {
        await businessesApi.delete(bizId);
        setBusinesses(prev => prev.filter(b => b.id !== bizId));
      } catch (err) {
        console.error('Failed to delete business:', err);
      }
    }
  };

  // Admin Actions: Delete social user post
  const handleDeletePost = async (postId: string) => {
    if (window.confirm('Delete this post from the feed?')) {
      try {
        await postsApi.delete(postId);
        setPosts(prev => prev.filter(p => p.id !== postId));
      } catch (err) {
        console.error('Failed to delete post:', err);
      }
    }
  };

  // Admin Actions: Add quick promo badge to post
  const handleAddPostPromoBadge = (postId: string) => {
    const textPromo = window.prompt("Enter Campaign / Promo badge title (e.g. 15% OFF, Buy 1 Get 1):");
    if (textPromo && textPromo.trim()) {
      setPosts(prev => prev.map(p => {
        if (p.id === postId) {
          return {
            ...p,
            promotionBadge: {
              ar: `${textPromo.trim()} 🔥`,
              ku: `${textPromo.trim()} 🔥`,
              en: `${textPromo.trim()} 🔥`
            }
          };
        }
        return p;
      }));
    }
  };

  // Calculate statistics totals
  const totalListings = businesses.length;
  const verifiedListings = businesses.filter(b => b.isVerified).length;
  const totalFeeds = posts.length;
  const videoFeedsCount = posts.filter(p => p.videoUrl).length;
  const fileFeedsCount = posts.filter(p => p.fileAttachment).length;

  // Render security login page if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto my-12 bg-white/5 border border-white/10 rounded-3xl p-8 relative overflow-hidden backdrop-blur-md shadow-2xl">
        
        {/* Glow backdrop decorative */}
        <div className="absolute top-[-30%] left-[-30%] w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-[-30%] right-[-30%] w-64 h-64 bg-pink-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative text-center space-y-6">
          <div className="mx-auto w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-550 to-indigo-600 flex items-center justify-center text-white shadow-lg">
            <Lock className="w-7 h-7 text-white" />
          </div>

          <div>
            <span className="text-[10px] text-blue-400 font-extrabold uppercase tracking-widest block font-mono">Saku Maku Platform</span>
            <dt className="text-xl font-black text-white mt-1">
              {currentLang === 'en' ? 'Administrative Guard' : 'بوابة الإدارة السكيور'}
            </dt>
            <dd className="text-xs text-zinc-400 mt-1">
              {currentLang === 'en' 
                ? 'Authorized personnel login required to access moderator panel.' 
                : 'يُرجى تسجيل الدخول للوصول إلى لوحة التحكم والتعديل الشامل.'}
            </dd>
          </div>

          {errorMsg && (
            <div className="p-3 bg-red-950/40 border border-red-900/50 rounded-xl text-xs text-red-300 flex items-start gap-2 text-left">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-400" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleLoginSubmit} className="space-y-4 text-left">
            <div className="space-y-1">
              <label className="text-[10px] uppercase font-black text-white/55 block">Admin Email</label>
              <input
                type="email"
                placeholder="mahdialmuntadhar1@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-black/40 border border-white/15 text-xs px-4 py-3 rounded-xl text-white placeholder-zinc-650 focus:outline-none focus:border-blue-400 transition"
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
                className="w-full bg-black/40 border border-white/15 text-xs px-4 py-3 rounded-xl text-white placeholder-zinc-650 focus:outline-none focus:border-blue-400 transition"
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
            <p className="text-[10px] text-zinc-500">
              Demo Access Credentials:<br />
              <span className="font-mono text-zinc-300 font-bold">Username: admin | Password: admin123</span>
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Admin is authenticated! Render Saku Maku Command HQ Dashboard
  return (
    <div className="space-y-6 max-w-5xl mx-auto px-1">
      
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
              Edit local business catalogs, oversee public stories, audit documents upload permissions, and toggle real-time verification claims.
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsAuthenticated(false)}
          className="flex items-center gap-1.5 px-4 py-2 text-xs bg-red-950/30 hover:bg-red-900/50 border border-red-500/25 hover:border-red-500 text-red-200 hover:text-white transition duration-200 rounded-xl cursor-pointer font-bold"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Exit Hub</span>
        </button>
      </div>

      {/* Admin Section Tabs Swiper */}
      <div className="flex items-center gap-2 border-b border-zinc-900 pb-2">
        <button
          onClick={() => setAdminTab('stats')}
          className={`px-4.5 py-2.5 rounded-xl border text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
            adminTab === 'stats' 
              ? 'bg-blue-555 bg-blue-550/15 border-blue-500 text-blue-400' 
              : 'border-transparent text-zinc-400 hover:text-white'
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          <span>Metrics & Logs</span>
        </button>

        <button
          onClick={() => setAdminTab('businesses')}
          className={`px-4.5 py-2.5 rounded-xl border text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
            adminTab === 'businesses'
              ? 'bg-purple-550 bg-purple-550/15 border-purple-500 text-purple-400'
              : 'border-transparent text-zinc-400 hover:text-white'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Manage Listings ({totalListings})</span>
        </button>

        <button
          onClick={() => setAdminTab('posts')}
          className={`px-4.5 py-2.5 rounded-xl border text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
            adminTab === 'posts'
              ? 'bg-pink-550 bg-pink-500/15 border-pink-500 text-pink-400'
              : 'border-transparent text-zinc-400 hover:text-white'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Moderate Social Feeds ({totalFeeds})</span>
        </button>

        <button
          onClick={() => {
            setAdminTab('comments');
            fetchComments();
          }}
          className={`px-4.5 py-2.5 rounded-xl border text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
            adminTab === 'comments'
              ? 'bg-orange-550 bg-orange-500/15 border-orange-500 text-orange-400'
              : 'border-transparent text-zinc-400 hover:text-white'
          }`}
        >
          <MessageCircle className="w-4 h-4" />
          <span>Comments</span>
        </button>
      </div>

      {/* Admin Body Content Switcher */}
      <div>
        {adminTab === 'stats' && (
          <div className="space-y-6">
            {/* Stats Overview Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              
              <div className="p-5 bg-white/5 border border-white/5 rounded-2xl">
                <span className="text-[10px] text-zinc-500 tracking-wider font-extrabold uppercase block">Businesses Listings</span>
                <span className="text-2xl font-black text-white block mt-1.5">{totalListings}</span>
                <span className="text-[10px] text-zinc-400 block mt-1">Verified: <b className="text-cyan-400">{verifiedListings}</b> / {totalListings}</span>
              </div>

              <div className="p-5 bg-white/5 border border-white/5 rounded-2xl">
                <span className="text-[10px] text-zinc-500 tracking-wider font-extrabold uppercase block">Total Pulse Feeds</span>
                <span className="text-2xl font-black text-white block mt-1.5">{totalFeeds}</span>
                <span className="text-[10px] text-zinc-400 block mt-1">Live Campaigns broadcasted</span>
              </div>

              <div className="p-5 bg-white/5 border border-white/5 rounded-2xl">
                <span className="text-[10px] text-zinc-500 tracking-wider font-extrabold uppercase block">Videos Uploaded</span>
                <span className="text-2xl font-black text-white block mt-1.5">{videoFeedsCount}</span>
                <span className="text-[10px] text-pink-400 font-bold block mt-1">Interactive media clips</span>
              </div>

              <div className="p-5 bg-white/5 border border-white/5 rounded-2xl">
                <span className="text-[10px] text-zinc-500 tracking-wider font-extrabold uppercase block">Menus / Documents Attached</span>
                <span className="text-2xl font-black text-white block mt-1.5">{fileFeedsCount}</span>
                <span className="text-[10px] text-indigo-400 font-bold block mt-1">Downloadable PDF assets</span>
              </div>

            </div>

            {/* Custom Visual Distribution Bars */}
            <div className="p-6 bg-[#020205] border border-white/5 rounded-3xl space-y-4">
              <h3 className="text-sm font-extrabold text-white">Governorates Traffic Telemetry</h3>
              
              <div className="space-y-3.5 pt-2">
                <div>
                  <div className="flex justify-between text-xs font-bold text-zinc-300 mb-1">
                    <span>🏰 Baghdad Center</span>
                    <span>70% Traffic</span>
                  </div>
                  <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: '70%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-bold text-zinc-300 mb-1">
                    <span>🏔️ Erbil / Kurdistan Hub</span>
                    <span>18% Traffic</span>
                  </div>
                  <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-pink-500 rounded-full" style={{ width: '18%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-bold text-zinc-300 mb-1">
                    <span>🌴 Basra & Southern Ports</span>
                    <span>8% Traffic</span>
                  </div>
                  <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-purple-500 rounded-full" style={{ width: '8%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-bold text-zinc-300 mb-1">
                    <span>🌸 Sulaymaniyah, Mosul & Najaf</span>
                    <span>4% Traffic</span>
                  </div>
                  <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-teal-500 rounded-full" style={{ width: '4%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Live Security logs simulated block */}
            <div className="p-5 bg-black/40 border border-white/5 rounded-2xl font-mono text-[11px] text-zinc-400 space-y-2">
              <span className="text-zinc-500 block text-[10px] uppercase font-black font-sans leading-none pb-1 border-b border-white/5">System Audit Log</span>
              <p className="text-green-400">[SYSTEM] • Saku Maku Secure Gate unlocked by {email} at {new Date().toLocaleTimeString()}</p>
              <p>[ROUTING] • Port 3000 mapped proxy active with server process</p>
              <p>[DATABASE] • Bound local reactive client storage state securely on mount</p>
              <p className="text-cyan-400">[MEDIA] • Render engines verified for Photos, MP4 Videos, and PDF Document Menu upload modules</p>
            </div>
          </div>
        )}

        {adminTab === 'businesses' && (
          <div className="bg-white/5 border border-white/10 rounded-3xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-white/5 pb-2">
              <h3 className="text-sm font-black text-white">Active Saku Maku High-Street Listings</h3>
              <span className="text-[10px] text-zinc-400">{businesses.length} Listed Brands</span>
            </div>

            <div className="space-y-2 rounded-2xl max-h-[500px] overflow-y-auto custom-scrollbar">
              {businesses.map((biz) => (
                <div 
                  key={biz.id}
                  className="p-3.5 bg-black/40 hover:bg-black/60 border border-white/5 rounded-xl flex items-center justify-between gap-3 transition"
                >
                  <div className="flex items-center gap-3">
                    <img 
                      src={biz.avatar} 
                      alt={biz.name.en} 
                      className="w-10 h-10 rounded-full object-cover border border-white/10" 
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <span className="text-xs font-black text-white flex items-center gap-1.5">
                        <span>{biz.name[currentLang] || biz.name.en}</span>
                        {biz.isVerified && <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />}
                      </span>
                      <span className="text-[10px] text-zinc-400 capitalize block font-mono">{biz.governorate} • {biz.category}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Toggle verified status button */}
                    <button
                      onClick={() => handleToggleVerify(biz.id)}
                      className={`px-2.5 py-1.5 rounded-lg text-[10px] font-bold border transition ${
                        biz.isVerified 
                          ? 'bg-blue-500/10 border-blue-400/40 text-blue-400' 
                          : 'bg-white/5 border-white/10 text-zinc-400'
                      }`}
                    >
                      {biz.isVerified ? '✓ Verified Owner' : 'Verify Claim'}
                    </button>

                    {/* Featured Deal Swiper button */}
                    <button
                      onClick={() => handleToggleFeaturedDeal(biz.id)}
                      className={`px-2.5 py-1.5 rounded-lg text-[10px] font-bold border transition ${
                        biz.featuredDeal
                          ? 'bg-yellow-500/10 border-yellow-400/40 text-yellow-400'
                          : 'bg-white/5 border-white/10 text-zinc-400'
                      }`}
                    >
                      {biz.featuredDeal ? '⭐ Deal Active' : 'Add Deal Deal'}
                    </button>

                    {/* Delete item completely */}
                    <button
                      onClick={() => handleDeleteBusiness(biz.id)}
                      className="p-2 text-zinc-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition"
                      title="Prune business listings"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {adminTab === 'posts' && (
          <div className="bg-white/5 border border-white/10 rounded-3xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-white/5 pb-2">
              <h3 className="text-sm font-black text-white">Moderate Social Feed Stories Stream</h3>
              <span className="text-[10px] text-zinc-400">{posts.length} Active Posts</span>
            </div>

            <div className="space-y-2 rounded-2xl max-h-[500px] overflow-y-auto custom-scrollbar">
              {posts.map((post) => {
                const isVideo = !!post.videoUrl;
                const isFile = !!post.fileAttachment;
                return (
                  <div 
                    key={post.id}
                    className="p-4 bg-black/40 hover:bg-black/60 border border-white/5 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 transition"
                  >
                    <div className="flex items-start gap-3 flex-1 min-w-0">
                      <img 
                        src={post.businessAvatar} 
                        alt={post.businessName} 
                        className="w-10 h-10 rounded-full object-cover border border-white/10" 
                        referrerPolicy="no-referrer"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-black text-white truncate">{post.businessName}</span>
                          <span className="text-[9px] bg-white/5 border border-white/10 text-zinc-400 px-1.5 py-0.5 rounded uppercase font-bold font-mono">
                            {post.governorate}
                          </span>
                          {isVideo && (
                            <span className="text-[9px] bg-pink-500/20 text-pink-400 px-2 py-0.5 rounded font-black font-sans">
                              🎬 Video Clp
                            </span>
                          )}
                          {isFile && (
                            <span className="text-[9px] bg-indigo-500/20 text-indigo-400 px-2 py-0.5 rounded font-black font-sans">
                              📁 Menu attached
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-zinc-350 line-clamp-1 leading-normal mt-0.5">
                          {post.caption[currentLang] || post.caption.en}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-auto uppercase tracking-wide">
                      {/* Campaign badge promo */}
                      <button
                        onClick={() => handleAddPostPromoBadge(post.id)}
                        className={`px-2.5 py-1.5 rounded-lg text-[9px] font-black border transition flex items-center gap-1 ${
                          post.promotionBadge 
                            ? 'bg-pink-500/10 border-pink-400/40 text-pink-400' 
                            : 'bg-white/5 border-white/10 text-zinc-400'
                        }`}
                      >
                        <Sparkles className="w-3 h-3 text-pink-400" />
                        <span>{post.promotionBadge ? 'Badge added' : 'Badge'}</span>
                      </button>

                      {/* Delete post and report instantly */}
                      <button
                        onClick={() => handleDeletePost(post.id)}
                        className="px-3 py-1.5 text-[9px] bg-red-950/20 hover:bg-red-900/40 border border-red-500/20 hover:border-red-500 text-red-300 hover:text-white rounded-lg transition flex items-center gap-1 cursor-pointer font-bold"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Mod Delete</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {adminTab === 'comments' && (
          <div className="bg-white/5 border border-white/10 rounded-3xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-white/5 pb-2">
              <h3 className="text-sm font-black text-white">Comments Moderation</h3>
              <span className="text-[10px] text-zinc-400">{comments.length} Comments</span>
            </div>
            <div className="space-y-3">
              {comments.length === 0 && (
                <div className="text-center py-8 text-zinc-500 text-xs">
                  <MessageCircle className="w-8 h-8 mx-auto mb-2 opacity-30" />
                  <p>No comments to moderate yet.</p>
                </div>
              )}
              {comments.map((comment) => (
                <div key={comment.id} className="p-4 bg-black/30 border border-white/5 rounded-xl flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold text-white">{comment.username || 'Anonymous'}</span>
                      <span className="text-[10px] text-zinc-500">{new Date(comment.created_at).toLocaleDateString()}</span>
                    </div>
                    <p className="text-xs text-zinc-300 leading-relaxed">{comment.text}</p>
                    <span className="text-[10px] text-zinc-500 mt-1 block">On post: {comment.post_title || comment.post_id}</span>
                  </div>
                  <button
                    onClick={async () => {
                      try {
                        await adminApi.deleteComment(comment.id);
                        setComments(prev => prev.filter(c => c.id !== comment.id));
                      } catch (err) {
                        console.error('Failed to delete comment:', err);
                      }
                    }}
                    className="px-2.5 py-1.5 text-[9px] bg-red-950/20 hover:bg-red-900/40 border border-red-500/20 hover:border-red-500 text-red-300 hover:text-white rounded-lg transition cursor-pointer font-bold shrink-0"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
