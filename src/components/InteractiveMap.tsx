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
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map');
  const t = TRANSLATIONS[currentLang];

  // Handle arrow keys and Enter/Space cycles on map pins for high quality keyboard focus management
  const handlePinKeyDown = (
    e: React.KeyboardEvent,
    index: number,
    total: number,
    type: 'gov' | 'biz'
  ) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      const nextIdx = (index + 1) % total;
      const selector = type === 'gov' ? `.gov-pin-btn-${nextIdx}` : `.biz-pin-btn-${nextIdx}`;
      (document.querySelector(selector) as HTMLElement | null)?.focus();
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      const prevIdx = (index - 1 + total) % total;
      const selector = type === 'gov' ? `.gov-pin-btn-${prevIdx}` : `.biz-pin-btn-${prevIdx}`;
      (document.querySelector(selector) as HTMLElement | null)?.focus();
    }
  };

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
    <div className="interactive-map-container bg-white/5 border border-white/10 rounded-[28px] p-6 mb-8 relative overflow-hidden">
      
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
                aria-pressed={selectedGov === 'all'}
                aria-label={currentLang === 'en' ? 'Show all governorates combined' : currentLang === 'ku' ? 'پیشاندانی هەموو پارێزگاکان' : 'عرض كافة المحافظات معاً'}
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
                   aria-pressed={selectedGov === g.code}
                   aria-label={currentLang === 'en' ? `Filter by ${g.name.en}` : `تصفية حسب ${g.name[currentLang]}`}
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
          
          {/* High-visibility accessible mode toggle */}
          <div className="absolute top-3 left-3 z-[35] flex items-center bg-black/75 backdrop-blur-md border border-white/10 rounded-xl p-0.5 shadow-lg">
            <button
              onClick={() => setViewMode('map')}
              className={`px-2.5 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-wider transition cursor-pointer flex items-center gap-1 ${
                viewMode === 'map'
                  ? 'bg-gradient-to-r from-cyan-450 to-blue-500 text-black font-extrabold shadow-md'
                  : 'text-zinc-400 hover:text-white'
              }`}
              aria-pressed={viewMode === 'map'}
              aria-label={currentLang === 'en' ? 'Switch to Interactive visual map radar representation' : 'التحويل إلى مظهر الرادار التفاعلي المرئي'}
            >
              <span>🧭</span>
              <span className="hidden xs:inline">{currentLang === 'en' ? 'Map Radar' : currentLang === 'ku' ? 'نەخشەی ڕادار' : 'رادار الخارطة'}</span>
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-2.5 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-wider transition cursor-pointer flex items-center gap-1 ${
                viewMode === 'list'
                  ? 'bg-gradient-to-r from-cyan-450 to-blue-500 text-black font-extrabold shadow-md'
                  : 'text-zinc-400 hover:text-white'
              }`}
              aria-pressed={viewMode === 'list'}
              aria-label={currentLang === 'en' ? 'Switch to accessibility keyboard and screen reader optimized directories' : 'التحويل للقائمة النصية الميسرة للوحة المفاتيح والمكفوفين'}
            >
              <span>📋</span>
              <span className="hidden xs:inline">{currentLang === 'en' ? 'Keyboard List' : currentLang === 'ku' ? 'لیستی تەختەکلیل' : 'القائمة الميسرة'}</span>
            </button>
          </div>

          {/* Live announcer for screen readers */}
          <div className="sr-only" aria-live="polite">
            {viewMode === 'map' 
              ? (currentLang === 'en' ? 'Switched to interactive map view' : 'تم التحويل إلى وضع خريطة الرادار المرئية')
              : (currentLang === 'en' ? 'Switched to tabular accessible keyboard list view' : 'تم التحويل إلى وضع القائمة النصية المرتبة والميسرة للوحة المفاتيح')
            }
          </div>

          {viewMode === 'map' ? (
            <>
              {/* Simulated Grid overlay lines */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e1b4b_1px,transparent_1px),linear-gradient(to_bottom,#1e1b4b_1px,transparent_1px)] bg-[size:2rem_2rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-35"></div>

              {/* Glowing Vector Outline of Iraq representation (Abstract shape inside grid) */}
              <div className="w-[85%] h-[85%] border-2 border-violet-950 rounded-full opacity-10 absolute pointer-events-none"></div>
              <div className="w-[60%] h-[60%] border border-cyan-950 rounded-full opacity-15 absolute pointer-events-none animate-pulse"></div>

              {/* Compass layout pointer */}
              <div className="absolute bottom-3 right-3 flex items-center gap-1.5 bg-slate-900/80 px-2.5 py-1 rounded-lg border border-zinc-805 text-[10px] font-mono text-zinc-500">
                <Globe className="w-3.5 h-3.5 text-cyan-400 animate-spin" style={{ animationDuration: '10s' }} />
                <span>N 33.3152° / E 44.3661°</span>
              </div>

              {/* Governorates Bubble Buttons directly plotted onto map frame */}
              {pins.map((pin, index) => {
                const isActive = selectedGov === pin.code;
                return (
                  <button
                    key={pin.code}
                    onClick={() => onSelectGov(pin.code as GovernorateCode)}
                    onKeyDown={(e) => handlePinKeyDown(e, index, pins.length, 'gov')}
                    className={`gov-pin-btn-${index} absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-300 group z-10 cursor-pointer`}
                    style={{ top: pin.top, left: pin.left }}
                    aria-label={currentLang === 'en' ? `Select governorate: ${pin.name}` : currentLang === 'ku' ? `هەڵبژاردنی پارێزگای: ${pin.name}` : `اختيار محافظة: ${pin.name}`}
                    aria-pressed={isActive}
                    tabIndex={0}
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
                const isSelected = activePin?.id === biz.id;
                const totalBiz = Math.min(mappedBusinesses.length, 5);
                return (
                  <button
                    key={biz.id}
                    onClick={() => setActivePin(biz)}
                    onKeyDown={(e) => handlePinKeyDown(e, index, totalBiz, 'biz')}
                    className={`biz-pin-btn-${index} absolute leading-none cursor-pointer hover:scale-125 transition-transform duration-300 z-20 group`}
                    style={{ top: `${pinY}%`, left: `${pinX}%` }}
                    title={`Fast explore ${biz.name[currentLang]}`}
                    aria-label={currentLang === 'en' ? `Premium Spot: ${biz.name.en}. Click to view details.` : `متجر متميز: ${biz.name[currentLang]}. انقر للتفاصيل.`}
                    aria-haspopup="dialog"
                    aria-expanded={isSelected}
                    tabIndex={0}
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
            </>
          ) : (
            /* Accessible layout */
            <div className="absolute inset-0 bg-[#09090E] p-4 pt-14 flex flex-col justify-between overflow-y-auto w-full h-full text-left">
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-white/5 pb-2">
                  <h3 className="text-[10px] font-black uppercase text-cyan-400 tracking-wider font-mono">
                    {currentLang === 'en' ? 'Iraq City Centers (Alternative Table View)' : currentLang === 'ku' ? 'لیستی ناوچەکان' : 'أدلة مراكز المدن العراقية (تصفح بديل ميسّر)'}
                  </h3>
                  <span className="text-[9px] text-zinc-500 font-mono scale-90">
                    KEYBOARD + SCREEN READER OPTIMIZED
                  </span>
                </div>

                {/* Governorates Selector List Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5" role="tablist" aria-label="City list selectors">
                  {pins.map((pin) => {
                    const isActive = selectedGov === pin.code;
                    return (
                      <button
                        key={pin.code}
                        role="tab"
                        aria-selected={isActive}
                        onClick={() => onSelectGov(pin.code as GovernorateCode)}
                        className={`text-[10px] font-bold py-2 px-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                          isActive
                            ? 'bg-cyan-500/10 border-cyan-400 text-cyan-400 shadow-sm shadow-cyan-400/5'
                            : 'bg-zinc-900/30 border-zinc-850 hover:border-zinc-700 text-zinc-400 hover:text-white'
                        }`}
                        aria-label={currentLang === 'en' ? `Select governorate: ${pin.name}` : `اختيار محافظة: ${pin.name}`}
                      >
                        <div className="flex items-center gap-1">
                          <span className="shrink-0 text-xs">📍</span>
                          <span className="truncate">{pin.name}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Mapped premium spots list in active filter */}
                <div className="space-y-2 pt-2">
                  <h4 className="text-[10px] font-extrabold uppercase text-pink-400 tracking-wider font-mono">
                    {currentLang === 'en' ? 'Pinned Map Spots' : currentLang === 'ku' ? 'شوێنە پاشکۆکراوەکان' : 'الأماكن المثبتة في الخريطة بهذه المنطقة'}
                  </h4>

                  {mappedBusinesses.length === 0 ? (
                    <p className="text-[10px] text-zinc-500 italic py-1">
                      {currentLang === 'en' ? 'No venues pinned under active filter coordinates.' : 'لا توجد أماكن تفاعلية مثبتة على هذه الإحداثيات حالياً.'}
                    </p>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2" role="list" aria-label="Premium stores on coordinates">
                      {mappedBusinesses.slice(0, 5).map((biz) => {
                        const isSelected = activePin?.id === biz.id;
                        return (
                          <div
                            key={biz.id}
                            role="listitem"
                            className="bg-zinc-950/70 p-2.5 rounded-xl border border-zinc-900 flex items-center justify-between gap-3 hover:border-zinc-800 transition shadow-sm"
                          >
                            <div className="min-w-0 flex-1 flex items-center gap-1.5">
                              <span className="text-pink-500 shrink-0 text-xs font-mono">•</span>
                              <div className="min-w-0">
                                <h5 className="text-[11px] font-extrabold text-white truncate">
                                  {biz.name[currentLang]}
                                </h5>
                                <p className="text-[9px] text-zinc-500 truncate">
                                  {CATEGORIES.find(c => c.id === biz.category)?.name[currentLang]} — {biz.address[currentLang]}
                                </p>
                              </div>
                            </div>
                            
                            <button
                              onClick={() => setActivePin(biz)}
                              className={`px-2 py-1 rounded-lg text-[9px] font-bold shrink-0 transition cursor-pointer ${
                                isSelected
                                  ? 'bg-pink-500/15 text-pink-300 border border-pink-500/30'
                                  : 'bg-white/5 text-zinc-300 hover:bg-white/10 border border-white/5'
                              }`}
                              aria-label={currentLang === 'en' ? `Inspect Details for ${biz.name.en}` : `عرض تفاصيل ${biz.name[currentLang]}`}
                              aria-haspopup="dialog"
                              aria-expanded={isSelected}
                            >
                              {currentLang === 'en' ? 'Inspect' : 'عرض'}
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>

              {/* Informational guide */}
              <div className="text-[9px] text-zinc-500 border-t border-white/5 pt-2 flex items-center justify-between font-mono">
                <span>{t.exploreCount}: {mappedBusinesses.length} PREMIUMS</span>
                <span>TAB & ENTER TO CHOOSE</span>
              </div>
            </div>
          )}

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

      {/* Visually hidden but screen-reader visible list of map pins */}
      <div className="sr-only keyboard-accessible-list" aria-label="Keyboard accessible map pin directory">
        {mappedBusinesses.map((biz) => (
          <div key={`sr-pin-${biz.id}`}>
            <h3>{biz.name[currentLang]}</h3>
            <p>{CATEGORIES.find(c => c.id === biz.category)?.name[currentLang]} - {biz.address[currentLang]}</p>
            <button
              onClick={() => {
                setActivePin(biz);
                setViewMode('list');
              }}
              aria-label={currentLang === 'en' ? `Open details for ${biz.name.en}` : `عرض تفاصيل ${biz.name[currentLang]}`}
            >
              {currentLang === 'en' ? `View ${biz.name.en}` : `عرض ${biz.name[currentLang]}`}
            </button>
          </div>
        ))}
      </div>

    </div>
  );
}
