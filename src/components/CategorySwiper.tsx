import React, { useRef, useEffect, useCallback } from 'react';
import { Language, Category } from '../types';
import { CATEGORIES, TRANSLATIONS } from '../data';

interface CategorySwiperProps {
  currentLang: Language;
  selectedCategory: string | null;
  onSelectCategory: (catId: string | null) => void;
  categories?: Category[];
}

export default function CategorySwiper({
  currentLang,
  selectedCategory,
  onSelectCategory,
  categories,
}: CategorySwiperProps) {
  const cats = categories && categories.length > 0 ? categories : CATEGORIES;
  const t = TRANSLATIONS[currentLang];

  const trackRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<number | null>(null);
  const pausedRef = useRef(false);
  const isDraggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const scrollStartRef = useRef(0);

  // Auto-scroll speed (px per frame ~60fps → ~1px/frame = 60px/s)
  const SPEED = 0.6;

  const startAutoScroll = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const step = () => {
      if (!pausedRef.current && !isDraggingRef.current && track) {
        track.scrollLeft += SPEED;
        // Seamless loop: when scrolled past half (duplicated list), reset to start
        if (track.scrollLeft >= track.scrollWidth / 2) {
          track.scrollLeft = 0;
        }
      }
      animRef.current = requestAnimationFrame(step);
    };
    animRef.current = requestAnimationFrame(step);
  }, []);

  useEffect(() => {
    startAutoScroll();
    return () => { if (animRef.current) cancelAnimationFrame(animRef.current); };
  }, [startAutoScroll]);

  // Drag handlers for mouse
  const onMouseDown = (e: React.MouseEvent) => {
    isDraggingRef.current = true;
    dragStartXRef.current = e.pageX;
    scrollStartRef.current = trackRef.current?.scrollLeft ?? 0;
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current || !trackRef.current) return;
    const delta = dragStartXRef.current - e.pageX;
    trackRef.current.scrollLeft = scrollStartRef.current + delta;
  };
  const onMouseUp = () => { isDraggingRef.current = false; };

  // Touch handlers
  const onTouchStart = (e: React.TouchEvent) => {
    isDraggingRef.current = true;
    dragStartXRef.current = e.touches[0].pageX;
    scrollStartRef.current = trackRef.current?.scrollLeft ?? 0;
  };
  const onTouchMove = (e: React.TouchEvent) => {
    if (!isDraggingRef.current || !trackRef.current) return;
    const delta = dragStartXRef.current - e.touches[0].pageX;
    trackRef.current.scrollLeft = scrollStartRef.current + delta;
  };
  const onTouchEnd = () => { isDraggingRef.current = false; };

  // Doubled cats list for seamless loop
  const doubled = [...cats, ...cats];

  return (
    <div className="w-full mb-6">
      {/* Header row */}
      <div className="flex items-center justify-between mb-3 px-0.5">
        <h2 className="text-sm font-extrabold text-white flex items-center gap-2">
          <span className="w-1 h-4 rounded-full bg-gradient-to-t from-violet-500 to-cyan-400 shrink-0" />
          <span>{t.categoryHeader}</span>
        </h2>
        {selectedCategory && (
          <button
            onClick={() => onSelectCategory(null)}
            className="text-[10px] font-bold text-pink-400 hover:text-white bg-pink-950/30 px-2.5 py-1 rounded-full border border-pink-500/20 transition cursor-pointer shrink-0"
          >
            {currentLang === 'en' ? 'All ↺' : currentLang === 'ku' ? 'هەموو ↺' : 'الكل ↺'}
          </button>
        )}
      </div>

      {/* Scrollable chip track */}
      <div
        ref={trackRef}
        className="flex gap-2.5 overflow-x-auto scrollbar-none select-none cursor-grab active:cursor-grabbing"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        onMouseEnter={() => { pausedRef.current = true; }}
        onMouseLeave={() => { pausedRef.current = false; isDraggingRef.current = false; }}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {doubled.map((cat, idx) => {
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={`${cat.id}-${idx}`}
              onClick={() => {
                if (!isDraggingRef.current) onSelectCategory(isSelected ? null : cat.id);
              }}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full border whitespace-nowrap shrink-0 text-xs font-bold transition-all duration-200 cursor-pointer ${
                isSelected
                  ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-[0_0_12px_rgba(34,211,238,0.25)]'
                  : 'bg-white/5 border-white/10 text-zinc-300 hover:bg-white/10 hover:border-white/20 hover:text-white'
              }`}
            >
              <span className="text-sm leading-none">{cat.icon}</span>
              <span>{cat.name[currentLang]}</span>
            </button>
          );
        })}
      </div>

      {/* Active filter label */}
      {selectedCategory && (
        <p className="mt-2 text-[10px] text-zinc-500 px-0.5">
          {currentLang === 'en' ? 'Showing: ' : currentLang === 'ku' ? 'نیشاندان: ' : 'عرض: '}
          <span className="text-cyan-400 font-bold">
            {cats.find(c => c.id === selectedCategory)?.name[currentLang]}
          </span>
        </p>
      )}
    </div>
  );
}
