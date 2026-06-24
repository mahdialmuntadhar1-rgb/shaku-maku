import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';
import { Language } from '../types';
import { CATEGORIES, TRANSLATIONS } from '../data';
import { safeLocalizedText } from '../utils/stringUtils';

interface CategorySwiperProps {
  currentLang: Language;
  selectedCategory: string | null;
  onSelectCategory: (catId: string | null) => void;
}

export default function CategorySwiper({
  currentLang,
  selectedCategory,
  onSelectCategory
}: CategorySwiperProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftState, setScrollLeftState] = useState(0);

  const t = TRANSLATIONS[currentLang];
  const categoryLabel = (value: unknown, fallback = '') => safeLocalizedText(value, currentLang, fallback);

  // Define the "All" virtual category chip
  const allChip = {
    id: null,
    icon: '🗺️',
    name: {
      en: 'All Sections',
      ar: 'كل الأقسام',
      ku: 'هەموو بەشەکان'
    },
    color: 'from-violet-600 to-cyan-400'
  };

  const originalItems = [allChip, ...CATEGORIES];
  // Duplicate the list so it can scroll infinitely
  const items = [...originalItems, ...originalItems];

  // Slowly auto-scroll the marquee
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let frameId: number;
    const scrollSpeed = 0.5; // Very slow, elegant scroll speed

    const scroll = () => {
      if (!isPaused && !isMouseDown) {
        el.scrollLeft += scrollSpeed;
        
        // Loop back seamlessly when reaching the middle point (the end of the first set)
        if (el.scrollLeft >= el.scrollWidth / 2) {
          el.scrollLeft = 0;
        }
      }
      frameId = requestAnimationFrame(scroll);
    };

    frameId = requestAnimationFrame(scroll);

    return () => {
      cancelAnimationFrame(frameId);
    };
  }, [isPaused, isMouseDown]);

  // Handle manual mouse drag and swipe
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsMouseDown(true);
    setIsPaused(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeftState(scrollRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isMouseDown || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; // Scroll multiplier speed
    scrollRef.current.scrollLeft = scrollLeftState - walk;
    
    // Loop back dynamically if dragged beyond half
    if (scrollRef.current.scrollLeft >= scrollRef.current.scrollWidth / 2) {
      scrollRef.current.scrollLeft -= scrollRef.current.scrollWidth / 2;
    } else if (scrollRef.current.scrollLeft <= 0) {
      scrollRef.current.scrollLeft += scrollRef.current.scrollWidth / 2;
    }
  };

  const handleMouseUpOrLeave = () => {
    setIsMouseDown(false);
    setIsPaused(false);
  };

  const handleSelect = (catId: string | null) => {
    onSelectCategory(catId);
  };

  return (
    <div className="w-full mb-8 relative">
      <div className="flex items-center justify-between mb-3 px-1">
        <div>
          <h2 className="text-md md:text-lg font-black text-white flex items-center gap-2">
            <span className="w-1.5 h-5 rounded-full bg-gradient-to-t from-violet-600 to-cyan-400"></span>
            <span>{t.categoryHeader}</span>
          </h2>
          <p className="text-[10px] sm:text-[11px] text-zinc-400 mt-0.5">
            {currentLang === 'en' 
              ? 'Auto-scrolling industry directory. Drag to explore' 
              : currentLang === 'ku' 
                ? 'کەتەلۆگی خۆکارانە گەڕۆک. ڕایبکێشە بۆ گەڕان' 
                : 'دليل تصفح تلقائي الحركة. اسحب للاستكشاف'}
          </p>
        </div>

        {/* Selected Highlight Marker */}
        {selectedCategory && (
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={() => handleSelect(null)}
            className="text-[10px] font-bold text-cyan-400 hover:text-white bg-cyan-950/40 px-2.5 py-1 rounded-full border border-cyan-500/20 transition-all cursor-pointer flex items-center gap-1 shrink-0"
          >
            <span>{currentLang === 'en' ? 'Reset' : currentLang === 'ku' ? 'پاککردنەوە' : 'إعادة تعيين'} ↺</span>
          </motion.button>
        )}
      </div>

      {/* Marquee Wrapper with soft fade masks on the edges */}
      <div className="relative w-full overflow-hidden rounded-2xl bg-[#0a0a0c]/80 border border-zinc-900/40 py-4 px-2">
        {/* Left Gradient Edge Fade */}
        <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-[#0a0a0c] to-transparent pointer-events-none z-20"></div>
        {/* Right Gradient Edge Fade */}
        <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-[#0a0a0c] to-transparent pointer-events-none z-20"></div>

        {/* Draggable scroll list */}
        <div
          ref={scrollRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUpOrLeave}
          onMouseLeave={handleMouseUpOrLeave}
          onMouseEnter={() => setIsPaused(true)}
          onFocus={() => setIsPaused(true)}
          onBlur={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
          className="flex gap-2.5 overflow-x-auto select-none cursor-grab active:cursor-grabbing scrollbar-none py-1 px-8"
          style={{ 
            scrollBehavior: isMouseDown ? 'auto' : 'smooth',
            direction: 'ltr' // Force LTR for mathematically consistent infinite loop scrolling direction across all locs
          }}
        >
          {items.map((cat, idx) => {
            const isSelected = selectedCategory === cat.id;
            
            return (
              <button
                key={`${cat.id}-${idx}`}
                onClick={() => handleSelect(cat.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-full border text-[11px] font-black tracking-wide transition-all duration-300 shrink-0 cursor-pointer ${
                  isSelected
                    ? 'bg-gradient-to-r from-violet-600/30 via-violet-500/20 to-cyan-500/20 border-cyan-400/80 text-cyan-400 font-extrabold shadow-[0_0_15px_rgba(34,211,238,0.25)] scale-102'
                    : 'bg-[#121215] hover:bg-[#18181f] border-zinc-800 text-zinc-300 hover:border-cyan-500/40 hover:text-white'
                }`}
              >
                {/* Micro Emoji / Icon */}
                <span className="text-sm select-none filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
                  {cat.icon}
                </span>

                {/* Multilingual category label */}
                <span className="whitespace-nowrap">
                  {categoryLabel(cat.name)}
                </span>
                
                {/* Glow pill active */}
                {isSelected && (
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping"></span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Helper text with chosen filter indicator */}
      {selectedCategory && (
        <div className="mt-2 text-center text-[11px] text-zinc-500 font-bold flex items-center justify-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
          <span>
            {currentLang === 'en' 
              ? 'Filtering results for ' 
              : currentLang === 'ku' 
                ? 'پاڵاوتنی ئەنجامەکان بۆ ' 
                : 'تصفية النتائج لـ '}
            <span className="text-cyan-400 font-black">
              {categoryLabel(CATEGORIES.find(c => c.id === selectedCategory)?.name)}
            </span>
          </span>
        </div>
      )}
    </div>
  );
}
