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

function isLocalAdminHeroEditor() {
  try {
    const raw = localStorage.getItem('current_user') || localStorage.getItem('user') || '{}';
    const parsed = JSON.parse(raw);
    const email = String(parsed?.email || '').trim().toLowerCase();
    const role = String(parsed?.role || '').trim().toLowerCase();
    return email === 'safaribosafar@gmail.com' || role === 'admin';
  } catch {
    return false;
  }
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

  const canInlineEditHero = Boolean((isAdmin || isLocalAdminHeroEditor()) && setSlides && activeSlide);

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
          // Force square hero image. This makes admin uploads predictable.
          const sourceSize = Math.min(img.width, img.height);
          const sourceX = Math.floor((img.width - sourceSize) / 2);
          const sourceY = Math.floor((img.height - sourceSize) / 2);

          const outputSize = 900;
          const canvas = document.createElement('canvas');
          canvas.width = outputSize;
          canvas.height = outputSize;

          const ctx = canvas.getContext('2d');
          if (!ctx) {
            reject(new Error('Could not prepare image.'));
            return;
          }

          ctx.drawImage(
            img,
            sourceX,
            sourceY,
            sourceSize,
            sourceSize,
            0,
            0,
            outputSize,
            outputSize
          );

          let quality = 0.7;
          let output = canvas.toDataURL('image/jpeg', quality);

          while (output.length > 220000 && quality > 0.34) {
            quality -= 0.08;
            output = canvas.toDataURL('image/jpeg', quality);
          }

          if (output.length > 280000) {
            reject(new Error('Hero image is still too large. Please choose a smaller image.'));
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
        ar: '',
        ku: '',
        en: ''
      },
      governorate: 'all',
      category: 'restaurant',
      badge: {
        ar: '',
        ku: '',
        en: ''
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
        ar: '',
        ku: '',
        en: ''
      },
      governorate: 'all',
      category: 'restaurant',
      badge: {
        ar: '',
        ku: '',
        en: ''
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
          {/* Hero image only: dark/text overlays removed. */}
        </motion.div>
      </AnimatePresence>

      {/* Direct Admin Hero Controls */}
      {false && canInlineEditHero && (
        <div
          onClick={(event) => event.stopPropagation()}
          className="absolute top-3 left-3 right-3 z-30 bg-black/85 backdrop-blur-xl border-2 border-luxury-gold rounded-2xl p-3 shadow-[0_0_40px_rgba(212,175,55,0.65)]"
        >
          <div className="mb-3 rounded-2xl bg-gradient-to-r from-luxury-gold via-yellow-300 to-luxury-gold px-4 py-3 text-center text-black font-black shadow-xl animate-pulse">
            ADMIN HERO EDIT — click upload to replace hero image, square size is automatic
          </div>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <button
              type="button"
              onClick={() => setEditingHero((value) => !value)}
              className="px-3 py-2 rounded-xl bg-luxury-gold text-black text-xs font-black flex items-center gap-1"
            >
              <Edit3 className="w-3.5 h-3.5" />
              {editingHero ? 'Close editor' : 'Edit text'}
            </button>

            <label className="px-3 py-2 rounded-xl bg-blue-500/20 text-blue-100 border border-blue-400/30 text-xs font-black flex items-center gap-1 cursor-pointer">
              <ImageIcon className="w-3.5 h-3.5" />
              Upload square photos
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
              Delete current hero
            </button>

            <span className="text-[10px] text-cyan-100 font-black hidden md:inline">Click anywhere on hero to edit</span>
             <span className="text-[10px] text-zinc-300 font-bold ml-auto">
              Slide {currentIndex + 1} / {activeSlidesList.length} · Hero image will be cropped square automatically
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

      {/* Public hero text overlay removed: image only. */}

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
