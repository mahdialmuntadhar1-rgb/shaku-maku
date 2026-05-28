import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Sparkles, MapPin, Compass, Edit3 } from 'lucide-react';
import { Language, GovernorateCode, HeroSlide, UserProfile } from '../types';
import { HERO_SLIDES, TRANSLATIONS } from '../data';
import HeroEditor from './HeroEditor';

interface HeroProps {
  currentLang: Language;
  onExploreClick: () => void;
  onSelectGov: (gov: GovernorateCode) => void;
  slides?: HeroSlide[];
  userProfile?: UserProfile | null;
}

export default function Hero({ currentLang, onExploreClick, onSelectGov, slides, userProfile }: HeroProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [editing, setEditing] = useState(false);

  const activeSlidesList = slides && slides.length > 0 ? slides : HERO_SLIDES;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % activeSlidesList.length);
    }, 6000); // changes every 6s
    return () => clearInterval(timer);
  }, [activeSlidesList.length]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % activeSlidesList.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + activeSlidesList.length) % activeSlidesList.length);
  };

  const t = TRANSLATIONS[currentLang];
  const activeSlide = activeSlidesList[currentIndex % activeSlidesList.length] || activeSlidesList[0];
  const isRtl = currentLang === 'ar' || currentLang === 'ku';

  const canEditHero = userProfile?.role === 'owner' || userProfile?.role === 'admin';

  return (
    <div className="relative w-full h-[320px] md:h-[420px] overflow-hidden rounded-3xl group mb-6 bg-slate-950">
      
      {/* Background Slides with AnimatePresence */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeSlide.id}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.97 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 w-full h-full"
        >
          {/* Main Slide Image */}
          <img
            src={activeSlide.image}
            alt="Cinematic Iraqi place showcase"
            className="w-full h-full object-cover select-none"
            referrerPolicy="no-referrer"
          />
          {/* Modern Cinematic Overlay: Ambient Dark Gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#020205] via-[#020205]/45 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#020205]/80 via-transparent to-[#020205]/20"></div>
        </motion.div>
      </AnimatePresence>

      {/* Edit hero button - visible only to owners/admins */}
      {canEditHero && (
        <button
          onClick={() => setEditing(!editing)}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/50 hover:bg-black/70 backdrop-blur-md border border-luxury-gold/30 text-luxury-gold hover:text-white transition cursor-pointer"
          title={currentLang === 'en' ? 'Edit hero slide' : currentLang === 'ar' ? 'تعديل الشريحة' : 'دەستکاری سلاید'}
        >
          <Edit3 className="w-4 h-4" />
        </button>
      )}

      {/* Floating Sparkle Elements & Active Content Overlay */}
      <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10 z-10">
        <div className="max-w-2xl">
          
          {/* Active Badges */}
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="flex items-center gap-1 text-[10px] font-black uppercase px-3 py-1 rounded-full bg-orange-500 text-black">
              <Sparkles className="w-3 h-3 text-black animate-pulse" />
              <span>{activeSlide.badge[currentLang] || activeSlide.badge.en}</span>
            </span>
            
            <button
              onClick={() => onSelectGov(activeSlide.governorate)}
              className="flex items-center gap-1 text-[10px] font-bold text-white bg-white/10 backdrop-blur-md px-3 py-1 rounded-full transition-all duration-300 hover:bg-white/20"
            >
              <MapPin className="w-3 h-3 text-cyan-400" />
              <span className="capitalize">{activeSlide.governorate}</span>
            </button>
          </div>

          {/* Slogan with Cairo and Plus Jakarta Sans */}
          <AnimatePresence mode="wait">
            <motion.h1
              key={activeSlide.id}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-2xl md:text-4xl font-extrabold text-white tracking-tight leading-tight mb-4"
              style={{ fontFamily: currentLang === 'en' ? 'Plus Jakarta Sans' : 'Cairo' }}
            >
              {activeSlide.slogan[currentLang] || activeSlide.slogan.en}
            </motion.h1>
          </AnimatePresence>

          {/* Call to Action Button */}
          <div className="flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onExploreClick}
              className="flex items-center gap-2 text-xs md:text-sm font-black text-[#1A1A1A] bg-[#FF6B4A] hover:bg-[#C8A95F] px-6 py-3.5 rounded-full shadow-lg shadow-[#FF6B4A]/20 transition-all font-sans cursor-pointer duration-300"
            >
              <Compass className="w-4 h-4 text-[#1A1A1A]" />
              <span>{t.ctaDiscover}</span>
            </motion.button>
            <span className="text-[11px] text-white/60 hidden md:inline-block font-medium">
              Join 14k+ active local foodies in Iraq
            </span>
          </div>

        </div>
      </div>

      {/* Slide Navigator controls */}
      <button
        onClick={handlePrev}
        className={`absolute top-1/2 -translate-y-1/2 p-2 rounded-full bg-slate-950/40 hover:bg-slate-950/80 border border-slate-800 text-white/50 hover:text-white transition opacity-0 group-hover:opacity-100 duration-300 z-10 ${
          isRtl ? 'right-4' : 'left-4'
        }`}
        id="hero-control-prev"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <button
        onClick={handleNext}
        className={`absolute top-1/2 -translate-y-1/2 p-2 rounded-full bg-slate-950/40 hover:bg-slate-950/80 border border-slate-800 text-white/50 hover:text-white transition opacity-0 group-hover:opacity-100 duration-300 z-10 ${
          isRtl ? 'left-4' : 'right-4'
        }`}
        id="hero-control-next"
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Slider indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-10">
        {activeSlidesList.map((slide, idx) => (
          <button
            key={slide.id}
            onClick={() => setCurrentIndex(idx)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              currentIndex === idx ? 'w-4 bg-cyan-400' : 'w-1.5 bg-zinc-600/60'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>

      {/* Inline Hero Editor for Owners/Admins */}
      <HeroEditor
        currentLang={currentLang}
        slide={activeSlide}
        isVisible={editing && canEditHero}
        onClose={() => setEditing(false)}
      />

    </div>
  );
}
