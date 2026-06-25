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
  const isProtectedAdmin = userProfile?.role === 'admin' || user?.role === 'admin' || Number(user?.is_admin || 0) === 1;
  const canUseRoleSwitcher = import.meta.env.DEV && isProtectedAdmin;

  const languages = [
    { 
      code: 'ar', 
      label: 'العربية', 
      flag: (
        <svg viewBox="0 0 3 2" className="w-5 h-3.5 rounded-sm shadow-sm inline-block">
          <rect width="3" height="2" fill="#fff" />
          <rect width="3" height="0.67" fill="#DA191A" />
          <rect y="1.33" width="3" height="0.67" fill="#007A3D" />
          <text x="1.5" y="1.15" fontFamily="sans-serif" fontSize="0.32" fontWeight="bold" fill="#007A3D" textAnchor="middle">الله أكبر</text>
        </svg>
      )
    },
    { 
      code: 'ku', 
      label: 'کوردی', 
      flag: (
        <svg viewBox="0 0 3 2" className="w-5 h-3.5 rounded-sm shadow-sm inline-block">
          <rect width="3" height="2" fill="#fff" />
          <rect width="3" height="0.67" fill="#E41E26" />
          <rect y="1.33" width="3" height="0.67" fill="#138B43" />
          <circle cx="1.5" cy="1.0" r="0.22" fill="#FEB813" />
          <path d="M1.5,0.7 L1.5,1.3 M1.2,1.0 L1.8,1.0 M1.29,0.79 L1.71,1.21 M1.29,1.21 L1.71,0.79" stroke="#FEB813" strokeWidth="0.06" strokeLinecap="round" />
          <path d="M1.37,0.74 L1.63,1.26 M1.63,0.74 L1.37,1.26" stroke="#FEB813" strokeWidth="0.06" strokeLinecap="round" />
          <path d="M1.22,0.88 L1.78,1.12 M1.22,1.12 L1.78,0.88" stroke="#FEB813" strokeWidth="0.06" strokeLinecap="round" />
        </svg>
      )
    },
    { 
      code: 'en', 
      label: 'English', 
      flag: (
        <svg viewBox="0 0 60 30" className="w-5 h-3.5 rounded-sm shadow-sm inline-block bg-[#012169]">
          <clipPath id="uj_clip">
            <path d="M0,0 v30 h60 v-30 z"/>
          </clipPath>
          <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" clipPath="url(#uj_clip)"/>
          <path d="M0,0 L60,30 M60,0 L0,30" stroke="#C8102E" strokeWidth="2" clipPath="url(#uj_clip)"/>
          <path d="M30,0 V30 M0,15 H60" stroke="#fff" strokeWidth="10" />
          <path d="M30,0 V30 M0,15 H60" stroke="#C8102E" strokeWidth="6" />
        </svg>
      )
    }
  ];

  return (
    <header className="sticky z-50 flex flex-col w-full shadow-lg" style={{ top: "calc(var(--shaku-register-banner-height) - 1px)" }}>
<div className="backdrop-blur-md bg-luxury-bg/90 border-b border-luxury-gold/20 pb-2 pt-2.5 px-3 xs:px-6 w-full flex flex-wrap md:flex-nowrap items-center justify-between gap-2 md:gap-4">
        
        {/* Left/Right Brand Column */}
        <div className="order-1 flex items-center justify-between flex-1 min-w-0 md:w-auto gap-2">
          <div className="flex items-center gap-1.5.5">
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
        <div className="order-3 md:order-2 flex items-center justify-center gap-1 bg-white/5 p-1 rounded-2xl border border-white/10 shrink-0 w-full md:w-auto shadow-inner relative">
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
        <div className="order-2 md:order-3 flex items-center gap-2 w-auto justify-end shrink-0">
          
          {/* Real-time Google Sign-In with Firebase Auth */}
          {user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-1.5 bg-[#1A1A1A] hover:bg-[#222] border border-luxury-gold/20 rounded-full pl-2 pr-3.5 py-1.5 cursor-pointer hover:border-luxury-gold/50 transition duration-300 shrink-0 select-none shadow-md"
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

                    {canUseRoleSwitcher && (
                      <div className="bg-white/5 rounded-2xl p-2.5 border border-white/10 space-y-2">
                        <span className="text-[9px] font-black text-amber-400 uppercase tracking-widest block font-mono">
                          Developer Role Tester
                        </span>
                        <div className="grid grid-cols-2 gap-1">
                          <button
                            onClick={() => {
                              onUpdateRole('user');
                              setProfileOpen(false);
                            }}
                            className="px-1.5 py-1.5 text-[8px] font-extrabold rounded-lg tracking-wider transition uppercase cursor-pointer bg-white/5 text-zinc-300 hover:bg-white/10"
                          >
                            User
                          </button>
                          <button
                            onClick={() => {
                              onUpdateRole('owner');
                              setProfileOpen(false);
                            }}
                            className="px-1.5 py-1.5 text-[8px] font-extrabold rounded-lg tracking-wider transition uppercase cursor-pointer bg-white/5 text-zinc-300 hover:bg-white/10"
                          >
                            Owner
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Shortcut Options */}
                    <div className="flex flex-col gap-1.5">
                      {isProtectedAdmin && (
                        <button
                          onClick={() => {
                            onChangeTab('admin');
                            setProfileOpen(false);
                          }}
                          className="w-full text-left font-black text-[11px] px-3 py-2 rounded-xl text-red-300 hover:bg-red-500/10 border border-red-500/20 flex items-center gap-2 cursor-pointer"
                        >
                          🛡️ Admin Control Panel
                        </button>
                      )}

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
              className="group relative flex items-center gap-2 overflow-hidden rounded-full border border-yellow-200/60 bg-gradient-to-r from-luxury-gold via-yellow-300 to-cyan-300 px-5 py-2.5 text-[11px] font-black uppercase tracking-widest text-black shadow-[0_0_24px_rgba(212,175,55,0.75)] transition hover:scale-105 active:scale-95 shrink-0"
              id="google-sign-in-hdr"
            >
              <span>🔑</span>
              <span>{currentLang === 'en' ? 'Login' : currentLang === 'ku' ? 'چوونەژوور' : 'دخول المنصة'}</span>
            </button>
          )}

</div>
      </div>
    </header>
  );
}
