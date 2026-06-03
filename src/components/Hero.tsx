import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Sparkles, MapPin, Compass, Edit3, Save, Trash2, Image as ImageIcon, PlusCircle } from 'lucide-react';
import { Language, GovernorateCode, HeroSlide } from '../types';
import { HERO_SLIDES, TRANSLATIONS } from '../data';

interface HeroProps {
  currentLang: Language;
  onExploreClick: () => void;
  onSelectGov: (gov: GovernorateCode) => void;
  slides?: HeroSlide[];
  isAdmin?: boolean;
  setSlides?: React.Dispatch<React.SetStateAction<HeroSlide[]>>;
}

export default function Hero({ currentLang, onExploreClick, onSelectGov, slides, isAdmin = false, setSlides }: HeroProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [editingHero, setEditingHero] = useState(false);
  const [heroDraft, setHeroDraft] = useState({ slogan: '', badge: '' });

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

  useEffect(() => {
    if (!activeSlide) return;
    setHeroDraft({
      slogan: activeSlide.slogan[currentLang] || activeSlide.slogan.en || '',
      badge: activeSlide.badge[currentLang] || activeSlide.badge.en || ''
    });
  }, [activeSlide?.id, currentLang]);

  const canInlineEditHero = Boolean(isAdmin && setSlides && activeSlide);

  const updateActiveHeroSlide = (updater: (slide: HeroSlide) => HeroSlide) => {
    if (!setSlides || !activeSlide) return;
    setSlides((prev) => prev.map((slide) => (slide.id === activeSlide.id ? updater(slide) : slide)));
  };

  const saveHeroText = () => {
    updateActiveHeroSlide((slide) => ({
      ...slide,
      slogan: { ...slide.slogan, [currentLang]: heroDraft.slogan },
      badge: { ...slide.badge, [currentLang]: heroDraft.badge }
    }));
    setEditingHero(false);
  };

  const compressHeroImage = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      if (!file.type.startsWith('image/')) {
        reject(new Error('Only image files are supported.'));
        return;
      }

      const reader = new FileReader();

      reader.onload = () => {
        const img = new Image();

        img.onload = () => {
          const maxSize = 1400;
          const scale = Math.min(1, maxSize / Math.max(img.width, img.height));
          const width = Math.max(1, Math.round(img.width * scale));
          const height = Math.max(1, Math.round(img.height * scale));

          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext('2d');
          if (!ctx) {
            reject(new Error('Could not prepare image.'));
            return;
          }

          ctx.drawImage(img, 0, 0, width, height);

          let quality = 0.72;
          let output = canvas.toDataURL('image/jpeg', quality);

          while (output.length > 260000 && quality > 0.36) {
            quality -= 0.08;
            output = canvas.toDataURL('image/jpeg', quality);
          }

          if (output.length > 320000) {
            reject(new Error('Hero image is too large. Please choose a smaller photo.'));
            return;
          }

          resolve(output);
        };

        img.onerror = () => reject(new Error('Could not load image.'));
        img.src = String(reader.result || '');
      };

      reader.onerror = () => reject(new Error('Could not read image.'));
      reader.readAsDataURL(file);
    });
  };

  const uploadHeroImages = async (files: FileList | null) => {
    if (!files || !setSlides) return;

    const imageFiles = Array.from(files).filter((file) => file.type.startsWith('image/'));
    if (imageFiles.length === 0) return;

    const compressedImages = await Promise.all(imageFiles.map((file) => compressHeroImage(file)));

    const newSlides: HeroSlide[] = compressedImages.map((image, index) => ({
      id: `hero-upload-${Date.now()}-${index}`,
      image,
      slogan: {
        ar: 'إعلان جديد من شكو ماكو',
        ku: 'ڕیکلامی نوێ لە شەکو مەکو',
        en: 'New Shaku Maku promotion'
      },
      governorate: 'all',
      category: 'restaurant',
      badge: {
        ar: 'مساحة ترويجية',
        ku: 'شوێنی ڕیکلام',
        en: 'Promotional space'
      }
    }));

    setSlides((prev) => [...newSlides, ...prev].slice(0, 10));
    setCurrentIndex(0);
    setEditingHero(true);
    setHeroDraft({
      slogan: newSlides[0].slogan[currentLang] || newSlides[0].slogan.en,
      badge: newSlides[0].badge[currentLang] || newSlides[0].badge.en
    });
  };

  const uploadHeroImage = async (file: File | null) => {
    if (!file || !setSlides || !activeSlide) return;

    const image = await compressHeroImage(file);
    updateActiveHeroSlide((slide) => ({
      ...slide,
      image
    }));
  };

  const addInlineHeroSlide = () => {
    if (!setSlides) return;

    const now = Date.now();
    const newSlide: HeroSlide = {
      id: `hero-inline-${now}`,
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1400&auto=format&fit=crop&q=85',
      slogan: {
        ar: 'إعلان جديد من شكو ماكو',
        ku: 'ڕیکلامی نوێ لە شەکو مەکو',
        en: 'New Shaku Maku promotion'
      },
      governorate: 'all',
      category: 'restaurant',
      badge: {
        ar: 'مساحة ترويجية',
        ku: 'شوێنی ڕیکلام',
        en: 'Promotional space'
      }
    };

    setSlides((prev) => [newSlide, ...prev]);
    setCurrentIndex(0);
    setEditingHero(true);
    setHeroDraft({
      slogan: newSlide.slogan[currentLang] || newSlide.slogan.en,
      badge: newSlide.badge[currentLang] || newSlide.badge.en
    });
  };

  const deleteInlineHeroSlide = () => {
    if (!setSlides || !activeSlide) return;

    setSlides((prev) => {
      if (prev.length <= 1) return prev;
      return prev.filter((slide) => slide.id !== activeSlide.id);
    });

    setCurrentIndex(0);
    setEditingHero(false);
  };

  return (
    <div
      onClick={() => {
        if (canInlineEditHero) setEditingHero(true);
      }}
      className="relative w-full h-[320px] md:h-[420px] overflow-hidden rounded-3xl group mb-6 bg-slate-950 cursor-pointer"
    >
      
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

      {/* Direct Admin Hero Controls */}
      {canInlineEditHero && (
        <div className="absolute top-3 left-3 right-3 z-30 bg-black/70 backdrop-blur-xl border border-luxury-gold/40 rounded-2xl p-3 shadow-2xl">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <button
              type="button"
              onClick={() => setEditingHero((value) => !value)}
              className="px-3 py-2 rounded-xl bg-luxury-gold text-black text-xs font-black flex items-center gap-1"
            >
              <Edit3 className="w-3.5 h-3.5" />
              {editingHero ? 'Close editor' : 'Edit this slide'}
            </button>

            <label className="px-3 py-2 rounded-xl bg-blue-500/20 text-blue-100 border border-blue-400/30 text-xs font-black flex items-center gap-1 cursor-pointer">
              <ImageIcon className="w-3.5 h-3.5" />
              Upload images
              <input
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={(event) => uploadHeroImages(event.target.files)}
              />
            </label>

            <button
              type="button"
              onClick={addInlineHeroSlide}
              className="px-3 py-2 rounded-xl bg-emerald-500/20 text-emerald-100 border border-emerald-400/30 text-xs font-black flex items-center gap-1"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              Add slide
            </button>

            <button
              type="button"
              onClick={deleteInlineHeroSlide}
              className="px-3 py-2 rounded-xl bg-red-500/20 text-red-100 border border-red-400/30 text-xs font-black flex items-center gap-1"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Delete slide
            </button>

            <span className="text-[10px] text-cyan-100 font-black hidden md:inline">Click anywhere on hero to edit</span>
             <span className="text-[10px] text-zinc-300 font-bold ml-auto">
              Slide {currentIndex + 1} / {activeSlidesList.length}
            </span>
          </div>

          {editingHero && (
            <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_auto] gap-2">
              <input
                value={heroDraft.badge}
                onChange={(event) => setHeroDraft((prev) => ({ ...prev, badge: event.target.value }))}
                placeholder="Badge text"
                className="bg-white text-black rounded-xl px-3 py-2 text-xs font-bold"
                dir={isRtl ? 'rtl' : 'ltr'}
              />

              <input
                value={heroDraft.slogan}
                onChange={(event) => setHeroDraft((prev) => ({ ...prev, slogan: event.target.value }))}
                placeholder="Hero slogan"
                className="bg-white text-black rounded-xl px-3 py-2 text-xs font-bold"
                dir={isRtl ? 'rtl' : 'ltr'}
              />

              <button
                type="button"
                onClick={saveHeroText}
                className="px-4 py-2 rounded-xl bg-emerald-500 text-white text-xs font-black flex items-center justify-center gap-1"
              >
                <Save className="w-3.5 h-3.5" />
                Save
              </button>
            </div>
          )}
        </div>
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

    </div>
  );
}
