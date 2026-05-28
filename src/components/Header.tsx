import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Clock, MapPin, Check, User, LogOut, Shield, ChevronDown, Award, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Language, GovernorateCode, UserProfile } from '../types';
import { GOVERNORATES, TRANSLATIONS } from '../data';

interface HeaderProps {
  currentLang: Language;
  onChangeLang: (lang: Language) => void;
  selectedGov: GovernorateCode;
  onChangeGov: (gov: GovernorateCode) => void;
  user: any;
  userProfile: UserProfile | null;
  onSignIn: () => void;
  onSignOut: () => void;
  onUpdateRole: (role: 'user' | 'owner' | 'admin') => void;
  activeTab: string;
  onChangeTab: (tab: any) => void;
  onCustomEmailLogin?: (email: string) => void;
}

export default function Header({
  currentLang,
  onChangeLang,
  selectedGov,
  onChangeGov,
  user,
  userProfile,
  onSignIn,
  onSignOut,
  onUpdateRole,
  activeTab,
  onChangeTab,
  onCustomEmailLogin
}: HeaderProps) {
  const [timeStr, setTimeStr] = useState('');
  const [profileOpen, setProfileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Baghdad timezone offset is UTC+3. Let's calculate and display real-time
    const updateTime = () => {
      const now = new Date();
      const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
      const baghdadTime = new Date(utc + (3600000 * 3));
      
      const hours = baghdadTime.getHours().toString().padStart(2, '0');
      const minutes = baghdadTime.getMinutes().toString().padStart(2, '0');
      setTimeStr(`${hours}:${minutes} Baghdad`);
    };

    updateTime();
    const interval = setInterval(updateTime, 60000);

    // Click outside handler for profile dropdown
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      clearInterval(interval);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const t = TRANSLATIONS[currentLang];
  const isRtl = currentLang === 'ar' || currentLang === 'ku';

  const languages = [
    { code: 'ar', label: 'العربية', flag: '🇮🇶' },
    { code: 'ku', label: 'کوردی', flag: '☀️' },
    { code: 'en', label: 'English', flag: '🇺🇸' }
  ];

  return (
    <header className="sticky top-0 z-50 flex flex-col w-full shadow-lg">
      
      {/* Absolute Supreme Top Access Bar when NOT logged in */}
      {!user && onCustomEmailLogin && (
        <div className="bg-gradient-to-r from-luxury-teal/90 via-luxury-gold/80 to-[#FF6B4A]/90 text-white text-[10px] md:text-xs px-4 py-3 border-b border-luxury-gold/30 flex flex-col md:flex-row items-center justify-between gap-3 animate-fade-in relative z-50">
          <div className="flex items-center gap-2">
            <span className="text-[10px] bg-red-650 bg-red-500 text-white font-mono font-black py-0.5 px-2 rounded-full animate-pulse shrink-0">
              🔴 QUICK SESSION ACCESS
            </span>
            <span className="font-extrabold text-zinc-100 max-w-sm sm:max-w-md md:max-w-lg leading-tight">
              {currentLang === 'en' 
                ? 'Enter email to sign in instantly, or click a direct test account preset:' 
                : currentLang === 'ku'
                ? 'ئیمەیڵ بنووسە بۆ چوونەژوورەوەی خێرا، یان کلیک لەسەر یەکێک لە ئەکاونتە تاقیکارییەکان بکە:'
                : 'أدخل أي بريد إلكتروني للدخول الفوري، أو اضغط على أحد الحسابات الجاهزة للتجربة:'}
            </span>
          </div>
          
          <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto justify-end shrink-0">
            {/* Direct Quick Presets */}
            <div className="flex items-center gap-1.5 shrink-0">
              <button 
                type="button"
                onClick={() => onCustomEmailLogin('mahdialmuntadhar1@gmail.com')}
                className="px-2.5 py-1 bg-red-950/40 hover:bg-red-900 border border-red-500/35 text-red-200 text-[9px] font-black transition-all active:scale-95 cursor-pointer flex items-center gap-1 rounded-md"
              >
                <span>🛡️</span>
                <span>{currentLang === 'en' ? 'Click: Admin' : 'مدير (مهدي)'}</span>
              </button>
              
              <button 
                type="button"
                onClick={() => onCustomEmailLogin('owner@shkomaku.com')}
                className="px-2.5 py-1 bg-amber-950/40 hover:bg-amber-900 border border-amber-500/35 text-amber-200 text-[9px] font-black transition-all active:scale-95 cursor-pointer flex items-center gap-1 rounded-md"
              >
                <span>🏢</span>
                <span>{currentLang === 'en' ? 'Click: Owner' : 'صاحب مصلحة'}</span>
              </button>
            </div>

            {/* Custom Manual Email Input Form */}
            <form onSubmit={(e) => {
              e.preventDefault();
              const fd = new FormData(e.currentTarget);
              const email = fd.get('quickEmail') as string;
              if (email) onCustomEmailLogin(email);
            }} className="flex items-center gap-1 shrink-0 bg-black/45 rounded-md p-0.5 border border-white/10 w-full sm:w-auto max-w-[240px]">
              <input 
                name="quickEmail"
                required
                type="email"
                placeholder={currentLang === 'en' ? 'Enter Gmail/Email' : 'أدخل بريدك الإلكتروني'}
                className="bg-transparent text-[10px] text-white px-2 py-1 focus:outline-none w-full placeholder-zinc-500 font-bold"
              />
              <button 
                type="submit"
                className="px-2.5 py-1 rounded-sm bg-gradient-to-r from-luxury-teal to-luxury-gold text-white text-[9px] font-black uppercase shrink-0 hover:opacity-85 active:scale-95 transition cursor-pointer"
              >
                {currentLang === 'en' ? 'Sign In' : 'دخول'}
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="backdrop-blur-md bg-luxury-bg/90 border-b border-luxury-gold/20 pb-3 pt-3.5 px-3 xs:px-6 w-full flex flex-col md:flex-row items-center justify-between gap-3.5 md:gap-4">
        
        {/* Left/Right Brand Column */}
        <div className="flex items-center justify-between w-full md:w-auto gap-3">
          <div className="flex items-center gap-2.5">
            <div className="relative group cursor-pointer" onClick={() => onChangeTab('discover')}>
              <div className="absolute -inset-0.5 bg-gradient-to-r from-luxury-teal via-luxury-gold to-white rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-500"></div>
              <div className="relative px-3 py-1.5 bg-[#16161a] rounded-xl leading-none flex items-center border border-luxury-gold/30">
                <span className="text-base xs:text-lg sm:text-xl font-black bg-gradient-to-r from-luxury-gold to-white bg-clip-text text-transparent tracking-tighter">
                  {currentLang === 'en' ? 'Shko Maku' : currentLang === 'ku' ? 'شكو ماكو' : 'شكو ماكو'}
                </span>
                <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-1.5 text-luxury-gold animate-pulse" />
              </div>
            </div>
            
            {/* Subtle real-time digital clock */}
            <div className="flex items-center gap-1.5 text-[10px] sm:text-xs font-mono text-zinc-400 bg-[#0F2E2F]/45 px-2.5 py-1.5 rounded-lg border border-luxury-gold/15 shrink-0">
              <Clock className="w-3.5 h-3.5 text-luxury-gold" />
              <span>{timeStr}</span>
            </div>
          </div>

          {/* Quick mobile hamburger tab switch for owner admin if logged in */}
          {userProfile && (
            <div className="flex md:hidden items-center gap-2">
              <span className={`text-[10px] font-black px-2 py-1 rounded-md uppercase tracking-wider ${
                userProfile.role === 'admin' ? 'bg-red-500/20 text-red-400' :
                userProfile.role === 'owner' ? 'bg-amber-500/20 text-amber-400' :
                'bg-blue-500/20 text-blue-400'
              }`}>
                {userProfile.role || 'user'}
              </span>
            </div>
          )}
        </div>

        {/* Center balanced Language bar (Unified, elegant UI Switcher row) */}
        <div className="flex items-center justify-center gap-1 bg-white/5 p-1 rounded-2xl border border-white/10 shrink-0 w-full sm:w-auto shadow-inner relative">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                onChangeLang(lang.code as Language);
                // Dynamically update document direction for instant RTL layout transition support
                document.documentElement.dir = lang.code === 'en' ? 'ltr' : 'rtl';
              }}
              className={`flex-1 sm:flex-initial px-3 py-2 rounded-xl text-[11px] xs:text-xs font-black uppercase transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer ${
                currentLang === lang.code
                  ? 'bg-gradient-to-r from-luxury-teal to-luxury-gold text-white shadow-lg scale-105'
                  : 'text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <span className="text-xs sm:text-sm shrink-0">{lang.flag}</span>
              <span className="font-extrabold tracking-tight">{lang.label}</span>
            </button>
          ))}
        </div>

        {/* Action Controls & User Identity */}
        <div className="flex items-center gap-2 w-full md:w-auto justify-end">

          {/* Glowing Business Owner Button */}
          {user && userProfile?.role === 'owner' && (
            <button
              onClick={() => onChangeTab('add')}
              className="relative group cursor-pointer shrink-0"
              id="owner-business-btn"
            >
              {/* Subtle pulsing glow effect */}
              <span className="absolute inset-0 rounded-full bg-amber-500/30 blur-md animate-pulse group-hover:bg-amber-400/40 transition-all duration-500"></span>
              <span className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-amber-400 via-orange-400 to-amber-400 opacity-60 blur-sm group-hover:opacity-80 transition-all duration-500 animate-pulse"></span>
              <span className="relative flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-amber-600 to-orange-500 text-white text-[10px] sm:text-xs font-black uppercase tracking-wider shadow-lg shadow-amber-500/25 border border-amber-400/40 transition-all duration-300 group-hover:shadow-amber-500/40 group-hover:scale-105 active:scale-95">
                <Sparkles className="w-3.5 h-3.5 text-white/90" />
                <span>
                  {userProfile?.businessId
                    ? (currentLang === 'en' ? 'Manage your business' : currentLang === 'ku' ? 'بەڕێوەبردنی کارەکەت' : 'إدارة عملك')
                    : (currentLang === 'en' ? 'Add your business' : currentLang === 'ku' ? 'کارەکەت زیاد بکە' : 'أضف عملك')}
                </span>
              </span>
            </button>
          )}

          {/* Real-time Google Sign-In with Firebase Auth */}
          {user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2 bg-[#1A1A1A] hover:bg-[#222] border border-luxury-gold/20 rounded-full pl-2 pr-3.5 py-1.5 cursor-pointer hover:border-luxury-gold/50 transition duration-300 shrink-0 select-none shadow-md"
                id="sign-out-btn"
              >
                <div className="relative w-8 h-8 rounded-full bg-gradient-to-tr from-luxury-teal via-luxury-gold to-white p-[1.5px] shrink-0">
                  <div className="w-full h-full rounded-full bg-[#1A1A1A] overflow-hidden flex items-center justify-center">
                    <img
                      src={user.photoURL || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"}
                      alt={user.displayName || "User avatar"}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border border-slate-950 rounded-full animate-pulse"></span>
                </div>
                
                <div className="flex flex-col text-left text-zinc-300 hidden sm:flex truncate max-w-[80px]">
                  <span className="text-[10px] font-black leading-tight text-white truncate">{user.displayName || 'Iraqi User'}</span>
                  <span className="text-[8px] font-mono tracking-wider font-extrabold uppercase text-luxury-gold">
                    {userProfile?.role || 'user'}
                  </span>
                </div>
                <ChevronDown className={`w-3.5 h-3.5 text-zinc-400 transition-transform ${profileOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Majestic drop-down Profile menu */}
              <AnimatePresence>
                {profileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className={`absolute mt-2.5 w-64 bg-[#141417]/95 backdrop-blur-2xl border border-luxury-gold/35 rounded-3xl p-4 shadow-2xl z-[101] flex flex-col gap-3.5 ${isRtl ? 'left-0' : 'right-0'}`}
                  >
                    {/* User profile details header */}
                    <div className="flex items-center gap-3 pb-3 border-b border-white/5">
                      <div className="w-10 h-10 rounded-full overflow-hidden border border-luxury-gold/20">
                        <img 
                          src={user.photoURL || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"}
                          alt={user.displayName || "User avatar"} 
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="truncate text-left">
                        <h4 className="text-xs font-black text-white truncate">{user.displayName || 'Authorized User'}</h4>
                        <p className="text-[10px] text-zinc-500 truncate">{user.email || 'no-email@shkomaku.com'}</p>
                      </div>
                    </div>

                    {/* Dynamic Role Display */}
                    <div className="bg-[#1C1C24] p-3 rounded-2xl flex items-center justify-between border border-white/5">
                      <div className="flex items-center gap-1.5">
                        {userProfile?.role === 'admin' ? <Shield className="w-4 h-4 text-red-450 text-red-500" /> :
                         userProfile?.role === 'owner' ? <Award className="w-4 h-4 text-amber-500" /> :
                         <User className="w-4 h-4 text-sky-400" />}
                        <span className="text-[10px] font-black tracking-wider uppercase text-zinc-300">
                          {userProfile?.role === 'admin' ? (currentLang === 'en' ? 'Platform Admin' : 'مدير المنصة 🛡️') :
                           userProfile?.role === 'owner' ? (currentLang === 'en' ? 'Spot Owner' : 'صاحب مصلحة 🏢') :
                           (currentLang === 'en' ? 'Regular User' : 'مستكشف نشط 👤')}
                        </span>
                      </div>
                      <span className={`w-2 h-2 rounded-full ${userProfile?.role === 'admin' ? 'bg-red-500' : userProfile?.role === 'owner' ? 'bg-amber-400' : 'bg-sky-400'} animate-pulse`}></span>
                    </div>

                    {/* Developer / Tester Switcher block (highly user-friendly testability) */}
                    <div className="bg-white/5 rounded-2xl p-2.5 border border-white/10 space-y-2">
                      <span className="text-[9px] font-black text-amber-400 uppercase tracking-widest block font-mono">
                        🛠️ Dynamic Role Swapper
                      </span>
                      <p className="text-[8px] text-zinc-400 leading-normal">
                        Switch roles instantly on the fly to test custom dashboards & claimant workflows:
                      </p>
                      <div className="grid grid-cols-3 gap-1">
                        <button
                          onClick={() => {
                            onUpdateRole('user');
                            setProfileOpen(false);
                          }}
                          className={`px-1.5 py-1.5 text-[8px] font-extrabold rounded-lg tracking-wider transition uppercase cursor-pointer ${
                            userProfile?.role === 'user' ? 'bg-sky-500 text-slate-950 font-black' : 'bg-white/5 text-zinc-300 hover:bg-white/10'
                          }`}
                        >
                          User
                        </button>
                        <button
                          onClick={() => {
                            onUpdateRole('owner');
                            setProfileOpen(false);
                          }}
                          className={`px-1.5 py-1.5 text-[8px] font-extrabold rounded-lg tracking-wider transition uppercase cursor-pointer ${
                            userProfile?.role === 'owner' ? 'bg-amber-500 text-slate-950 font-black' : 'bg-white/5 text-zinc-300 hover:bg-white/10'
                          }`}
                        >
                          Owner
                        </button>
                        <button
                          onClick={() => {
                            onUpdateRole('admin');
                            setProfileOpen(false);
                          }}
                          className={`px-1.5 py-1.5 text-[8px] font-extrabold rounded-lg tracking-wider transition uppercase cursor-pointer ${
                            userProfile?.role === 'admin' ? 'bg-red-500 text-white font-black' : 'bg-white/5 text-zinc-300 hover:bg-white/10'
                          }`}
                        >
                          Admin
                        </button>
                      </div>
                    </div>

                    {/* Shortcut Options */}
                    <div className="flex flex-col gap-1.5">
                      {userProfile?.role === 'owner' && (
                        <button
                          onClick={() => {
                            onChangeTab('add');
                            setProfileOpen(false);
                          }}
                          className="w-full text-left font-black text-[11px] px-3 py-2 rounded-xl text-amber-400 hover:bg-amber-500/10 border border-amber-500/20 flex items-center gap-2 cursor-pointer"
                        >
                          🏢 {currentLang === 'en' ? 'Manage My Business' : 'إدارة صالوني / مشروعي'}
                        </button>
                      )}

                      <button
                        onClick={() => {
                          onChangeTab('about');
                          setProfileOpen(false);
                        }}
                        className="w-full text-left text-xs text-zinc-300 hover:bg-white/5 rounded-xl px-3 py-2 flex items-center justify-between transition-all cursor-pointer"
                      >
                        <span className="font-semibold">{currentLang === 'en' ? 'Our Mission' : 'مهمة شكو ماكو'}</span>
                        <HelpCircle className="w-3.5 h-3.5 text-zinc-500" />
                      </button>

                      <button
                        onClick={() => {
                          setProfileOpen(false);
                          onSignOut();
                        }}
                        className="w-full text-left text-xs text-red-400 hover:bg-red-500/10 rounded-xl px-3 py-2.5 flex items-center justify-between transition-all font-bold group bg-red-950/20 border border-red-900/10 cursor-pointer mt-1"
                      >
                        <span>{currentLang === 'en' ? 'Sign Out Session' : 'تسجيل الخروج الآمن'}</span>
                        <LogOut className="w-3.5 h-3.5 text-red-400 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>

                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <button
              onClick={onSignIn}
              className="flex items-center gap-2 px-4.5 py-2.5 rounded-full bg-gradient-to-r from-luxury-teal to-luxury-gold hover:from-[#154648] hover:to-[#dfbe6d] text-xs font-black uppercase text-white tracking-widest cursor-pointer shadow-xl transition active:scale-95 border border-white/10 shrink-0"
              id="google-sign-in-hdr"
            >
              <span>🔑</span>
              <span>{currentLang === 'en' ? 'Access Portal' : currentLang === 'ku' ? 'چوونەژوور' : 'دخول المنصة'}</span>
            </button>
          )}

        </div>
      </div>
    </header>
  );
}
