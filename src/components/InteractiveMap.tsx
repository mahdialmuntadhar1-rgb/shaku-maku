import React, { useState } from 'react';
import { Map, MapPin, Sparkles, Navigation, Globe, Eye, Compass, Heart, Bookmark } from 'lucide-react';
import { Business, Language, GovernorateCode } from '../types';
import { GOVERNORATES, TRANSLATIONS, CATEGORIES } from '../data';

interface InteractiveMapProps {
  currentLang: Language;
  selectedGov: GovernorateCode;
  onSelectGov: (gov: GovernorateCode) => void;
  businesses: Business[];
}

export default function InteractiveMap({
  currentLang,
  selectedGov,
  onSelectGov,
  businesses
}: InteractiveMapProps) {
  const [activePin, setActivePin] = useState<Business | null>(null);
  const t = TRANSLATIONS[currentLang];

  // Filter businesses that have map coordinates
  const mappedBusinesses = selectedGov === 'all' 
    ? businesses 
    : businesses.filter(b => b.governorate === selectedGov);

  // Iraqi Cities/Governorates mapped roughly onto an imaginary grid
  // Baghdad: center, Erbil: north, Basra: south, Sulaymaniyah: northeast, Mosul: northwest, Najaf: west-center
  const pins = [
    { name: 'Baghdad 🏰', code: 'baghdad', top: '56%', left: '46%', label: 'العاصمة بغداد' },
    { name: 'Erbil 🏔️', code: 'erbil', top: '24%', left: '45%', label: 'أربيل - هه ولير' },
    { name: 'Basra 🌴', code: 'basra', top: '86%', left: '76%', label: 'البصرة الفيحاء' },
    { name: 'Sulaymaniyah 🌸', code: 'sulaymaniyah', top: '34%', left: '60%', label: 'سلێمانی چاوان' },
    { name: 'Mosul 🍏', code: 'mosul', top: '22%', left: '28%', label: 'الموصل الحدباء' },
    { name: 'Najaf ✨', code: 'najaf', top: '68%', left: '34%', label: 'النجف الأشرف' }
  ];

  return (
    <div className="bg-white/5 border border-white/10 rounded-[28px] p-6 mb-8 relative overflow-hidden">
      
      {/* Glow highlight background blur */}
      <div className="absolute top-1/2 left-1/4 w-80 h-80 rounded-full bg-blue-650/10 blur-3xl -translate-y-1/2 pointer-events-none"></div>
      <div className="absolute bottom-4 right-4 w-60 h-60 rounded-full bg-violet-650/10 blur-3xl pointer-events-none"></div>

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Left column guide details */}
        <div className="md:col-span-1 flex flex-col justify-between space-y-6">
          <div>
            <span className="flex items-center gap-1 text-[10px] font-black uppercase text-pink-400 bg-pink-950/40 border border-pink-500/20 px-2.5 py-1 rounded-full w-fit mb-3">
              <Navigation className="w-3.5 h-3.5" />
              <span>Saku Maku Radar Map</span>
            </span>

            <h2 className="text-xl font-extrabold text-white leading-tight">
              {currentLang === 'en' ? 'Urban Interactive Map' : currentLang === 'ku' ? 'نەخشەی فەرمی عێراق' : 'بوصلة خارطة العراق التفاعلية'}
            </h2>
            <p className="text-xs text-zinc-400 leading-relaxed mt-2">
              {t.interactiveMapIntro}
            </p>
          </div>

          {/* Quick city triggers list */}
          <div className="space-y-2">
            <span className="text-[10px] text-zinc-500 uppercase font-mono font-bold block">
              {currentLang === 'en' ? 'Quick City Filters' : 'تصفية سريعة بالمدن'}
            </span>
            <div className="flex flex-wrap gap-1.5">
              <button
                onClick={() => onSelectGov('all')}
                className={`text-xs px-2.5 py-1.5 rounded-xl border transition ${
                  selectedGov === 'all'
                    ? 'bg-gradient-to-r from-blue-400 to-violet-500 text-black font-black border-transparent shadow-lg shadow-blue-500/10'
                    : 'bg-white/5 border-white/10 text-zinc-300 hover:border-blue-400/40'
                }`}
              >
                {t.allIraq}
              </button>
              {GOVERNORATES.filter(g => g.code !== 'all').map((g) => (
                <button
                   key={g.code}
                   onClick={() => onSelectGov(g.code)}
                   className={`text-xs px-2.5 py-1.5 rounded-xl border transition ${
                     selectedGov === g.code
                       ? 'bg-blue-500/15 border-blue-400 text-blue-400 font-bold'
                       : 'bg-white/5 border-white/10 text-zinc-300 hover:border-blue-450/40'
                   }`}
                >
                  {g.name[currentLang]}
                </button>
              ))}
            </div>
          </div>

          <div className="p-3 bg-white/5 rounded-2xl border border-white/5">
            <span className="text-[10px] text-zinc-500 tracking-wider font-extrabold uppercase block mb-1">
              {t.exploreCount}
            </span>
            <div className="text-3xl font-black bg-gradient-to-r from-cyan-450 via-violet-350 to-pink-400 bg-clip-text text-transparent font-mono">
              {mappedBusinesses.length} PREMIUMS
            </div>
            <p className="text-[10px] text-zinc-500 mt-0.5">Active stylish venues ready for weekend vibes</p>
          </div>

        </div>

        {/* Center column: Gorgeous neon simulated mockup Map */}
        <div className="md:col-span-2 relative h-[360px] bg-[#020205] rounded-2xl border border-white/5 overflow-hidden flex items-center justify-center select-none shadow-inner">
          
          {/* Simulated Grid overlay lines */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e1b4b_1px,transparent_1px),linear-gradient(to_bottom,#1e1b4b_1px,transparent_1px)] bg-[size:2rem_2rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-35"></div>

          {/* Glowing Vector Outline of Iraq representation (Abstract shape inside grid) */}
          <div className="w-[85%] h-[85%] border-2 border-violet-950 rounded-full opacity-10 absolute pointer-events-none"></div>
          <div className="w-[60%] h-[60%] border border-cyan-950 rounded-full opacity-15 absolute pointer-events-none animate-pulse"></div>

          {/* Compass layout pointer */}
          <div className="absolute bottom-3 right-3 flex items-center gap-1.5 bg-slate-900/80 px-2.5 py-1 rounded-lg border border-zinc-800 text-[10px] font-mono text-zinc-500">
            <Globe className="w-3.5 h-3.5 text-cyan-400 animate-spin" style={{ animationDuration: '10s' }} />
            <span>N 33.3152° / E 44.3661°</span>
          </div>

          {/* Governorates Bubble Buttons directly plotted onto map frame */}
          {pins.map((pin) => {
            const isActive = selectedGov === pin.code;
            return (
              <button
                key={pin.code}
                onClick={() => onSelectGov(pin.code as GovernorateCode)}
                className="absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-300 group z-10 cursor-pointer"
                style={{ top: pin.top, left: pin.left }}
              >
                
                {/* Glowing ring under cursor */}
                <span className={`absolute -inset-2 rounded-full blur-sm transition-all duration-300 ${
                  isActive 
                    ? 'bg-cyan-400/40 scale-125' 
                    : 'bg-violet-600/0 group-hover:bg-violet-600/30'
                }`}></span>

                <div className={`relative px-2.5 py-1.5 rounded-full border shadow-lg flex items-center gap-1 text-[10px] font-extrabold transition ${
                  isActive 
                    ? 'bg-slate-900 border-cyan-400 text-cyan-400 scale-110 shadow-cyan-400/15' 
                    : 'bg-slate-950/95 border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-650'
                }`}>
                  <MapPin className={`w-3.5 h-3.5 ${isActive ? 'text-cyan-400' : 'text-zinc-500 group-hover:text-pink-400'}`} />
                  <span>{pin.name}</span>
                </div>
              </button>
            );
          })}

          {/* Floating Pin Point interactive pins of active Businesses! */}
          {mappedBusinesses.slice(0, 5).map((biz, index) => {
            const pinX = biz.mapCoords.x;
            const pinY = biz.mapCoords.y;
            return (
              <button
                key={biz.id}
                onClick={() => setActivePin(biz)}
                className="absolute leading-none cursor-pointer hover:scale-125 transition-transform duration-300 z-20 group"
                style={{ top: `${pinY}%`, left: `${pinX}%` }}
                title={`Fast explore ${biz.name[currentLang]}`}
              >
                <div className="relative">
                  {/* Glowing neon point */}
                  <span className="absolute -inset-1.5 rounded-full bg-pink-500 blur-md animate-ping opacity-65"></span>
                  <div className="w-2.5 h-2.5 rounded-full bg-pink-400 border border-white shadow-xl relative"></div>
                  
                  {/* Subtle hover business label drawer */}
                  <div className="absolute left-1/2 -translate-x-1/2 bottom-5 bg-slate-900 text-[9px] font-bold text-white px-1.5 py-0.5 rounded border border-zinc-800 scale-0 group-hover:scale-100 transition duration-300 pointer-events-none whitespace-nowrap shadow-xl">
                    {biz.name[currentLang]}
                  </div>
                </div>
              </button>
            );
          })}

          {/* Active Specific Business Pin Popup Modal Overlay */}
          {activePin && (
            <div className="absolute inset-x-4 bottom-4 bg-[#020205]/95 border border-white/10 p-3 rounded-2xl flex gap-3 items-center z-30 animate-slideUp shadow-2xl backdrop-blur-md">
              <img
                src={activePin.image}
                alt={activePin.name[currentLang]}
                className="w-14 h-14 rounded-xl object-cover shrink-0 border border-zinc-800"
                referrerPolicy="no-referrer"
              />
              <div className="flex-1 min-w-0">
                <span className="text-[8px] font-black uppercase text-pink-400 block mb-0.5">
                  {CATEGORIES.find(c => c.id === activePin.category)?.name[currentLang]}
                </span>
                <h4 className="text-xs font-bold text-white truncate leading-none">
                  {activePin.name[currentLang]}
                </h4>
                <p className="text-[10px] text-zinc-400 truncate mt-1">
                  {activePin.address[currentLang]}
                </p>
              </div>

              <div className="flex flex-col gap-1 shrink-0">
                <button
                  onClick={() => setActivePin(null)}
                  className="text-[9px] font-medium text-zinc-400 hover:text-white bg-slate-950 px-2 py-1 rounded-lg border border-zinc-850"
                >
                  {t.close}
                </button>
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
