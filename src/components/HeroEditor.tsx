import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Edit3, X, Save, Image, Type, MousePointer } from 'lucide-react';
import { Language, HeroSlide, GovernorateCode } from '../types';
import { GOVERNORATES } from '../data';
import { doc, updateDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';

interface HeroEditorProps {
  currentLang: Language;
  slide: HeroSlide;
  isVisible: boolean;
  onClose: () => void;
}

export default function HeroEditor({ currentLang, slide, isVisible, onClose }: HeroEditorProps) {
  const [sloganAr, setSloganAr] = useState('');
  const [sloganKu, setSloganKu] = useState('');
  const [sloganEn, setSloganEn] = useState('');
  const [badgeAr, setBadgeAr] = useState('');
  const [badgeKu, setBadgeKu] = useState('');
  const [badgeEn, setBadgeEn] = useState('');
  const [image, setImage] = useState('');
  const [governorate, setGovernorate] = useState<GovernorateCode>('baghdad');
  const [category, setCategory] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (slide) {
      setSloganAr(slide.slogan?.ar || '');
      setSloganKu(slide.slogan?.ku || '');
      setSloganEn(slide.slogan?.en || '');
      setBadgeAr(slide.badge?.ar || '');
      setBadgeKu(slide.badge?.ku || '');
      setBadgeEn(slide.badge?.en || '');
      setImage(slide.image || '');
      setGovernorate(slide.governorate || 'baghdad');
      setCategory(slide.category || '');
    }
  }, [slide]);

  const handleSave = async () => {
    if (!slide) return;
    setSaving(true);
    try {
      const updated: HeroSlide = {
        ...slide,
        slogan: { ar: sloganAr, ku: sloganKu, en: sloganEn },
        badge: { ar: badgeAr, ku: badgeKu, en: badgeEn },
        image,
        governorate,
        category,
      };
      await setDoc(doc(db, 'hero_slides', slide.id), updated, { merge: true });
      onClose();
    } catch (err) {
      console.error('Error saving hero slide:', err);
      alert('Failed to save. Check Firestore rules.');
    } finally {
      setSaving(false);
    }
  };

  if (!isVisible || !slide) return null;

  const isRtl = currentLang === 'ar' || currentLang === 'ku';

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 10, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 10, scale: 0.98 }}
        className="absolute inset-x-4 bottom-4 z-20 max-w-xl mx-auto"
      >
        <div className="bg-[#1A1A1F]/95 backdrop-blur-xl border border-luxury-gold/30 rounded-2xl p-4 shadow-2xl">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Edit3 className="w-4 h-4 text-luxury-gold" />
              <span className="text-xs font-black text-white uppercase tracking-wider">
                {currentLang === 'en' ? 'Edit Hero Slide' : currentLang === 'ar' ? 'تعديل الشريحة الرئيسية' : 'دەستکاری سلایدی سەرەکی'}
              </span>
            </div>
            <button onClick={onClose} className="p-1 rounded-full hover:bg-white/10 text-zinc-400 hover:text-white transition cursor-pointer">
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
            {/* Image URL */}
            <div className="space-y-1">
              <label className="text-[9px] font-black text-luxury-gold/80 uppercase tracking-wider flex items-center gap-1">
                <Image className="w-3 h-3" /> Background Image URL
              </label>
              <input
                type="text"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="w-full bg-black/40 border border-white/15 focus:border-luxury-gold/50 text-[11px] px-3 py-2 rounded-lg text-white placeholder-zinc-500 focus:outline-none transition"
                placeholder="https://..."
              />
            </div>

            {/* Category */}
            <div className="space-y-1">
              <label className="text-[9px] font-black text-luxury-gold/80 uppercase tracking-wider flex items-center gap-1">
                <MousePointer className="w-3 h-3" /> Category
              </label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-black/40 border border-white/15 focus:border-luxury-gold/50 text-[11px] px-3 py-2 rounded-lg text-white placeholder-zinc-500 focus:outline-none transition"
              />
            </div>

            {/* Slogan Arabic */}
            <div className="space-y-1">
              <label className="text-[9px] font-black text-luxury-gold/80 uppercase tracking-wider flex items-center gap-1">
                <Type className="w-3 h-3" /> Slogan (AR)
              </label>
              <input
                type="text"
                dir="rtl"
                value={sloganAr}
                onChange={(e) => setSloganAr(e.target.value)}
                className="w-full bg-black/40 border border-white/15 focus:border-luxury-gold/50 text-[11px] px-3 py-2 rounded-lg text-white placeholder-zinc-500 focus:outline-none transition"
              />
            </div>

            {/* Slogan English */}
            <div className="space-y-1">
              <label className="text-[9px] font-black text-luxury-gold/80 uppercase tracking-wider flex items-center gap-1">
                <Type className="w-3 h-3" /> Slogan (EN)
              </label>
              <input
                type="text"
                value={sloganEn}
                onChange={(e) => setSloganEn(e.target.value)}
                className="w-full bg-black/40 border border-white/15 focus:border-luxury-gold/50 text-[11px] px-3 py-2 rounded-lg text-white placeholder-zinc-500 focus:outline-none transition"
              />
            </div>

            {/* Slogan Kurdish */}
            <div className="space-y-1">
              <label className="text-[9px] font-black text-luxury-gold/80 uppercase tracking-wider flex items-center gap-1">
                <Type className="w-3 h-3" /> Slogan (KU)
              </label>
              <input
                type="text"
                dir="rtl"
                value={sloganKu}
                onChange={(e) => setSloganKu(e.target.value)}
                className="w-full bg-black/40 border border-white/15 focus:border-luxury-gold/50 text-[11px] px-3 py-2 rounded-lg text-white placeholder-zinc-500 focus:outline-none transition"
              />
            </div>

            {/* Badge English */}
            <div className="space-y-1">
              <label className="text-[9px] font-black text-luxury-gold/80 uppercase tracking-wider flex items-center gap-1">
                <Type className="w-3 h-3" /> Badge (EN)
              </label>
              <input
                type="text"
                value={badgeEn}
                onChange={(e) => setBadgeEn(e.target.value)}
                className="w-full bg-black/40 border border-white/15 focus:border-luxury-gold/50 text-[11px] px-3 py-2 rounded-lg text-white placeholder-zinc-500 focus:outline-none transition"
              />
            </div>

            {/* Governorate */}
            <div className="space-y-1">
              <label className="text-[9px] font-black text-luxury-gold/80 uppercase tracking-wider">Governorate</label>
              <select
                value={governorate}
                onChange={(e) => setGovernorate(e.target.value as GovernorateCode)}
                className="w-full bg-black/40 border border-white/15 focus:border-luxury-gold/50 text-[11px] px-3 py-2 rounded-lg text-white focus:outline-none transition"
              >
                {GOVERNORATES.map((g) => (
                  <option key={g.code} value={g.code}>{g.name.en}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2">
            <button
              onClick={onClose}
              className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-300 text-[10px] font-black uppercase tracking-wider transition cursor-pointer border border-white/10"
            >
              {currentLang === 'en' ? 'Cancel' : currentLang === 'ar' ? 'إلغاء' : 'هەڵوەشاندنەوە'}
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-luxury-teal to-luxury-gold text-white text-[10px] font-black uppercase tracking-wider transition cursor-pointer flex items-center gap-1.5 disabled:opacity-50"
            >
              <Save className="w-3.5 h-3.5" />
              {saving ? 'Saving...' : (currentLang === 'en' ? 'Save Changes' : currentLang === 'ar' ? 'حفظ التغييرات' : 'پاشکەوتکردن')}
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
