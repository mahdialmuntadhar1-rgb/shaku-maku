import React, { useEffect, useRef, useState } from 'react';
import { Clock, LogOut, Shield, Sparkles, User, ChevronDown } from 'lucide-react';
import PWAInstallButton from './PWAInstallButton';
import { motion, AnimatePresence } from 'motion/react';
import { Language, GovernorateCode, UserProfile } from '../types';
import { TRANSLATIONS } from '../data';

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
}

export default function Header({
  currentLang,
  onChangeLang,
  user,
  userProfile,
  onSignIn,
  onSignOut,
  onChangeTab
}: HeaderProps) {
  const [timeStr, setTimeStr] = useState('');
  const [profileOpen, setProfileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const isRtl = currentLang === 'ar' || currentLang === 'ku';

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const utc = now.getTime() + now.getTimezoneOffset() * 60000;
      const baghdadTime = new Date(utc + 3600000 * 3);
      setTimeStr(`${baghdadTime.getHours().toString().padStart(2, '0')}:${baghdadTime.getMinutes().toString().padStart(2, '0')} Baghdad`);
    };

    updateTime();
    const interval = setInterval(updateTime, 60000);
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

  const languages: Array<{ code: Language; label: string }> = [
    { code: 'ar', label: 'العربية' },
    { code: 'ku', label: 'کوردی' },
    { code: 'en', label: 'English' }
  ];

  const displayName = user?.displayName || user?.name || user?.email?.split('@')[0] || 'Iraqi User';
  const avatar = user?.photoURL || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80';

  return (
    <header className="sticky top-0 z-50 flex flex-col w-full shadow-lg" dir={isRtl ? 'rtl' : 'ltr'}>
      <div className="backdrop-blur-md bg-luxury-bg/90 border-b border-luxury-gold/20 pb-3 pt-3.5 px-3 xs:px-6 w-full flex flex-col md:flex-row items-center justify-between gap-3.5 md:gap-4">
        <div className="flex items-center justify-between w-full md:w-auto gap-3">
          <button type="button" className="relative group cursor-pointer" onClick={() => onChangeTab('discover')}>
            <span className="absolute -inset-0.5 bg-gradient-to-r from-luxury-teal via-luxury-gold to-white rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-500"></span>
            <span className="relative px-3 py-1.5 bg-[#16161a] rounded-xl leading-none flex items-center border border-luxury-gold/30">
              <span className="text-base xs:text-lg sm:text-xl font-black bg-gradient-to-r from-luxury-gold to-white bg-clip-text text-transparent">
                {currentLang === 'en' ? 'Shaku Maku' : 'شكو ماكو'}
              </span>
              <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 ms-1.5 text-luxury-gold animate-pulse" />
            </span>
          </button>

          <div className="flex items-center gap-1.5 text-[10px] sm:text-xs font-mono text-zinc-400 bg-[#0F2E2F]/45 px-2.5 py-1.5 rounded-lg border border-luxury-gold/15 shrink-0">
            <Clock className="w-3.5 h-3.5 text-luxury-gold" />
            <span>{timeStr}</span>
          </div>
        </div>

        <div className="flex items-center justify-center gap-1 bg-white/5 p-1 rounded-2xl border border-white/10 shrink-0 w-full sm:w-auto shadow-inner relative">
          {languages.map((lang) => (
            <button
              key={lang.code}
              type="button"
              onClick={() => onChangeLang(lang.code)}
              className={`flex-1 sm:flex-initial px-3 py-2 rounded-xl text-[11px] xs:text-xs font-black uppercase transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer ${
                currentLang === lang.code
                  ? 'bg-gradient-to-r from-luxury-teal to-luxury-gold text-white shadow-lg scale-105'
                  : 'text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {lang.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto justify-end">
          {user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2 bg-[#1A1A1A] hover:bg-[#222] border border-luxury-gold/20 rounded-full ps-2 pe-3.5 py-1.5 cursor-pointer hover:border-luxury-gold/50 transition duration-300 shrink-0 select-none shadow-md"
              >
                <span className="relative w-8 h-8 rounded-full bg-gradient-to-tr from-luxury-teal via-luxury-gold to-white p-[1.5px] shrink-0">
                  <span className="w-full h-full rounded-full bg-[#1A1A1A] overflow-hidden flex items-center justify-center">
                    <img src={avatar} alt={displayName} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </span>
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border border-slate-950 rounded-full"></span>
                </span>
                <span className="flex-col text-left text-zinc-300 hidden sm:flex truncate max-w-[120px]">
                  <span className="text-[10px] font-black leading-tight text-white truncate">{displayName}</span>
                  <span className="text-[8px] font-mono tracking-wider font-extrabold uppercase text-luxury-gold">
                    {userProfile?.role || 'user'}
                  </span>
                </span>
                <ChevronDown className={`w-3.5 h-3.5 text-zinc-400 transition-transform ${profileOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {profileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className={`absolute mt-2.5 w-64 bg-[#141417]/95 backdrop-blur-2xl border border-luxury-gold/35 rounded-3xl p-4 shadow-2xl z-[101] flex flex-col gap-3.5 ${isRtl ? 'left-0' : 'right-0'}`}
                  >
                    <div className="flex items-center gap-3 pb-3 border-b border-white/5">
                      <img src={avatar} alt={displayName} className="w-10 h-10 rounded-full object-cover border border-luxury-gold/20" referrerPolicy="no-referrer" />
                      <div className="truncate text-left">
                        <h4 className="text-xs font-black text-white truncate">{displayName}</h4>
                        <p className="text-[10px] text-zinc-500 truncate">{user.email}</p>
                      </div>
                    </div>

                    <div className="bg-[#1C1C24] p-3 rounded-2xl flex items-center justify-between border border-white/5">
                      <span className="flex items-center gap-1.5 text-[10px] font-black tracking-wider uppercase text-zinc-300">
                        {userProfile?.role === 'admin' ? <Shield className="w-4 h-4 text-red-500" /> : <User className="w-4 h-4 text-sky-400" />}
                        {userProfile?.role === 'admin'
                          ? currentLang === 'en' ? 'Platform Admin' : 'مدير المنصة'
                          : currentLang === 'en' ? 'Regular User' : 'مستخدم'}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setProfileOpen(false);
                        onSignOut();
                      }}
                      className="w-full text-left text-xs text-red-400 hover:bg-red-500/10 rounded-xl px-3 py-2.5 flex items-center justify-between transition-all font-bold bg-red-950/20 border border-red-900/10 cursor-pointer"
                    >
                      <span>{currentLang === 'en' ? 'Sign out' : 'تسجيل الخروج'}</span>
                      <LogOut className="w-3.5 h-3.5 text-red-400" />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <button
              type="button"
              onClick={onSignIn}
              className="flex items-center gap-2 px-4.5 py-2.5 rounded-full bg-gradient-to-r from-luxury-teal to-luxury-gold hover:from-[#154648] hover:to-[#dfbe6d] text-xs font-black uppercase text-white tracking-widest cursor-pointer shadow-xl transition active:scale-95 border border-white/10 shrink-0"
            >
              <span>{currentLang === 'en' ? 'Access Portal' : currentLang === 'ku' ? 'چوونەژوور' : 'دخول المنصة'}</span>
            </button>
          )}

          <PWAInstallButton currentLang={currentLang} />
        </div>
      </div>
    </header>
  );
}
