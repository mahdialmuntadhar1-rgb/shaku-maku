import React, { useState, useEffect } from 'react';
import { Sparkles, Globe, Clock, MapPin, Menu, X, Check } from 'lucide-react';
import { Language, GovernorateCode } from '../types';
import { GOVERNORATES, TRANSLATIONS } from '../data';

interface HeaderProps {
  currentLang: Language;
  onChangeLang: (lang: Language) => void;
  selectedGov: GovernorateCode;
  onChangeGov: (gov: GovernorateCode) => void;
  user: any;
  onSignIn: () => void;
  onSignOut: () => void;
}

export default function Header({
  currentLang,
  onChangeLang,
  selectedGov,
  onChangeGov,
  user,
  onSignIn,
  onSignOut
}: HeaderProps) {
  const [timeStr, setTimeStr] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  useEffect(() => {
    // Baghdad timezone offset is UTC+3. Let's calculate and display real-time
    const updateTime = () => {
      const now = new Date();
      // Adjust to UTC+3 (Baghdad)
      const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
      const baghdadTime = new Date(utc + (3600000 * 3));
      
      const hours = baghdadTime.getHours().toString().padStart(2, '0');
      const minutes = baghdadTime.getMinutes().toString().padStart(2, '0');
      setTimeStr(`${hours}:${minutes} Baghdad`);
    };

    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  const t = TRANSLATIONS[currentLang];
  const isRtl = currentLang === 'ar' || currentLang === 'ku';

  const languages = [
    { code: 'ar', label: 'العربية / Default' },
    { code: 'ku', label: 'کوردی / Kurdish' },
    { code: 'en', label: 'English / EN' }
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-black/40 border-b border-white/5 pb-2 pt-3 px-4 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
        
        {/* Brand Logo & Slogan */}
        <div className="flex items-center gap-2.5">
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-violet-600 rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative px-3 py-1.5 bg-[#020205] rounded-xl leading-none flex items-center border border-white/5">
              <span className="text-xl font-black bg-gradient-to-r from-blue-400 to-violet-500 bg-clip-text text-transparent tracking-tighter">
                {currentLang === 'en' ? 'Saku Maku' : currentLang === 'ku' ? 'ساكۆ ماكۆ' : 'ساكو ماكو'}
              </span>
              <Sparkles className="w-4 h-4 ml-1.5 text-blue-400 animate-pulse" />
            </div>
          </div>
          
          {/* Subtle real-time digital clock */}
          <div className="hidden sm:flex items-center gap-1.5 text-[11px] font-mono text-white/50 bg-white/5 px-2 py-1 rounded-lg border border-white/5">
            <Clock className="w-3.5 h-3.5 text-blue-450" />
            <span>{timeStr}</span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          
          {/* Governorate Dropdown Selector */}
          <div className="relative">
            <button
              onClick={() => {
                setDropdownOpen(!dropdownOpen);
                setLangDropdownOpen(false);
              }}
              className="flex items-center gap-1.5 text-xs font-semibold bg-white/5 hover:bg-white/10 text-white px-3 py-2 rounded-full border border-white/10 hover:border-blue-450/40 transition-all duration-300"
              id="gov-selector-btn"
            >
              <MapPin className="w-3.5 h-3.5 text-blue-400" />
              <span>{GOVERNORATES.find(g => g.code === selectedGov)?.name[currentLang]}</span>
            </button>

            {dropdownOpen && (
              <div className={`absolute mt-2 w-52 bg-[#020205] border border-white/10 rounded-2xl shadow-2xl p-1.5 z-[100] ${isRtl ? 'left-0' : 'right-0'}`}>
                <div className="px-2.5 py-1 text-[11px] text-white/40 font-bold tracking-wider uppercase border-b border-white/5 mb-1">
                  {t.governorateLabel}
                </div>
                {GOVERNORATES.map((gov) => (
                  <button
                    key={gov.code}
                    onClick={() => {
                      onChangeGov(gov.code);
                      setDropdownOpen(false);
                    }}
                    className={`w-full text-left rounded-xl px-3 py-2 text-xs flex items-center justify-between transition-all ${
                      selectedGov === gov.code
                        ? 'bg-gradient-to-r from-blue-950 to-slate-900 text-blue-400 font-bold border border-blue-800/30'
                        : 'text-zinc-300 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <span>{gov.name[currentLang]}</span>
                    {selectedGov === gov.code && <Check className="w-3.5 h-3.5 text-blue-400" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Minimal Language Switcher */}
          <div className="relative">
            <button
              onClick={() => {
                setLangDropdownOpen(!langDropdownOpen);
                setDropdownOpen(false);
              }}
              className="flex items-center gap-1.5 text-xs bg-white/5 hover:bg-white/10 text-zinc-300 p-2 rounded-full border border-white/10 transition-all"
              id="lang-selector-btn"
              title="Switch Language"
            >
              <Globe className="w-3.5 h-3.5 text-zinc-400" />
              <span className="uppercase font-bold text-[10px]">{currentLang}</span>
            </button>

            {langDropdownOpen && (
              <div className={`absolute mt-2 w-40 bg-[#020205] border border-white/10 rounded-2xl shadow-2xl p-1.5 z-[100] ${isRtl ? 'left-0' : 'right-0'}`}>
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      onChangeLang(lang.code as Language);
                      setLangDropdownOpen(false);
                    }}
                    className={`w-full text-xs text-left rounded-xl px-3 py-2 flex items-center justify-between transition-all ${
                      currentLang === lang.code
                        ? 'bg-blue-950/50 text-blue-450 font-semibold'
                        : 'text-zinc-300 hover:bg-white/5'
                    }`}
                  >
                    <span>{lang.label}</span>
                    {currentLang === lang.code && <Check className="w-3.5 h-3.5 text-blue-400" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Real-time Google Sign-In with Firebase Auth */}
          {user ? (
            <div className="relative group">
              <button
                onClick={() => {
                  if (window.confirm(currentLang === 'en' ? 'Do you want to Sign Out from Saku Maku?' : currentLang === 'ku' ? 'دەتەوێت بچیتەدەرەوە لە ساكۆ ماكۆ؟' : 'هل ترغب في تسجيل الخروج من ساكو ماكو؟')) {
                    onSignOut();
                  }
                }}
                className="relative w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 via-purple-500 to-pink-500 p-[1.5px] cursor-pointer hover:scale-105 transition duration-300"
                title={`${user.displayName || 'Authorized User'}\nClick to Sign Out`}
                id="sign-out-btn"
              >
                <div className="w-full h-full rounded-full bg-slate-900 overflow-hidden flex items-center justify-center">
                  <img
                    src={user.photoURL || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"}
                    alt={user.displayName || "User avatar"}
                    className="w-full.h-full object-cover"
                    referrerPolicy="referrer"
                  />
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border border-slate-950 rounded-full animate-pulse"></span>
              </button>
            </div>
          ) : (
            <button
              onClick={onSignIn}
              className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-550 hover:to-indigo-550 text-[10px] font-black uppercase text-white tracking-wider cursor-pointer shadow-lg transition active:scale-95"
              id="google-sign-in-hdr"
            >
              <span>🔑 {currentLang === 'en' ? 'Google Login' : currentLang === 'ku' ? 'چوونەژوورەوە' : 'دخول'}</span>
            </button>
          )}

        </div>
      </div>
    </header>
  );
}
