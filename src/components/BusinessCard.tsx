import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Phone, Calendar, Heart, Bookmark, MessageSquare, ShieldCheck, Check } from 'lucide-react';
import { Business, Language } from '../types';
import { GOVERNORATES, CATEGORIES } from '../data';

interface BusinessCardProps {
  key?: React.Key;
  business: Business;
  currentLang: Language;
  isSelected?: boolean;
  onSelect?: () => void;
  showActionButton?: boolean;
  actionButtonText?: string;
  onActionClick?: (e: React.MouseEvent) => void;
}

export default function BusinessCard({
  business,
  currentLang,
  isSelected = false,
  onSelect,
  showActionButton = false,
  actionButtonText = 'This Is My Business',
  onActionClick
}: BusinessCardProps) {
  const isRtl = currentLang === 'ar' || currentLang === 'ku';

  // Find translated category
  const categoryMeta = CATEGORIES.find(c => c.id === business.category);
  const categoryName = categoryMeta ? (categoryMeta.name[currentLang] || categoryMeta.name.en) : business.category;
  const categoryIcon = categoryMeta ? categoryMeta.icon : '🏢';

  // Find translated governorate
  const govMeta = GOVERNORATES.find(g => g.code === business.governorate);
  const govLabel = govMeta ? (govMeta.name[currentLang] || govMeta.name.en) : business.governorate;

  return (
    <motion.div
      id={`biz-card-${business.id}`}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      onClick={onSelect}
      className={`relative w-full overflow-hidden text-left bg-zinc-900/90 hover:bg-zinc-900 border transition-all rounded-3xl duration-350 cursor-pointer ${
        isSelected
          ? 'ring-2 ring-amber-500/80 border-amber-500 bg-[#161619] shadow-lg shadow-amber-500/5'
          : 'border-white/10 hover:border-white/20'
      }`}
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      {/* Cover Image & Gradient */}
      <div className="relative h-44 w-full overflow-hidden bg-zinc-950">
        <img
          src={business.image || 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&auto=format&fit=crop&q=80'}
          alt={business.name[currentLang] || business.name.en}
          className="w-full h-full object-cover brightness-95 transform transition duration-500 hover:scale-105"
          referrerPolicy="no-referrer"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-black/35" />

        {/* Selected badge overlay */}
        {isSelected && (
          <div className="absolute top-3 right-3 z-10 bg-amber-500 text-black px-3 py-1 rounded-full text-[10px] font-black tracking-wider uppercase flex items-center gap-1 shadow-md">
            <Check className="w-3.5 h-3.5 stroke-[4px]" />
            <span>SELECTED SPOT</span>
          </div>
        )}

        {/* Category Pill Tag */}
        <span className="absolute top-3 left-3 bg-black/60 backdrop-blur-md text-zinc-200 border border-white/10 px-2.5 py-1 rounded-full text-[10.5px] font-medium flex items-center gap-1.5 shadow-sm">
          <span>{categoryIcon}</span>
          <span className="truncate max-w-[120px]">{categoryName}</span>
        </span>
      </div>

      {/* Card Body */}
      <div className="p-5 space-y-3.5 relative">
        
        {/* Logo and Name block */}
        <div className="flex gap-3.5 items-start">
          {/* Avatar / Logo */}
          <div className="w-11 h-11 rounded-2xl overflow-hidden shrink-0 border border-white/10 bg-zinc-950">
            <img
              src={business.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
              alt="logo"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Title description */}
          <div className="space-y-0.5 min-w-0 flex-1">
            <div className="flex items-center gap-1.5 flex-wrap">
              <h4 className="text-sm font-extrabold text-white leading-tight tracking-tight truncate">
                {business.name[currentLang] || business.name.en}
              </h4>
              {business.isVerified && (
                <ShieldCheck className="w-4 h-4 text-amber-500 shrink-0 fill-amber-500/10" />
              )}
            </div>
            <p className="text-[12px] text-zinc-400 font-medium line-clamp-1">
              {business.description[currentLang] || business.description.en}
            </p>
          </div>
        </div>

        {/* Address & Phone Attributes */}
        <div className="space-y-1.5 text-xs text-zinc-400 border-t border-white/5 pt-3">
          <div className="flex items-start gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-zinc-500 shrink-0 mt-0.5" />
            <span className="font-semibold text-zinc-300 leading-normal">
              {govLabel} — <span className="text-zinc-400 font-normal">{business.address[currentLang] || business.address.en}</span>
            </span>
          </div>

          {business.phoneNumber && (
            <div className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
              <span className="font-mono text-zinc-300 tracking-wide text-[11px]">{business.phoneNumber}</span>
            </div>
          )}
        </div>

        {/* Floating Quick Analytics tags */}
        <div className="flex items-center gap-3.5 text-[10.5px] text-zinc-500 font-bold border-t border-white/5 pt-3 font-mono">
          <div className="flex items-center gap-1">
            <Heart className="w-3.5 h-3.5 text-pink-500/60" />
            <span>{business.likes || 0} Saved</span>
          </div>
          <div className="flex items-center gap-1">
            <Bookmark className="w-3.5 h-3.5 text-amber-500/60" />
            <span>{business.saves || 0} Bookmarks</span>
          </div>
        </div>

        {/* Dynamic Claim button */}
        {showActionButton && (
          <div className="pt-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (onActionClick) onActionClick(e);
              }}
              className="w-full py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-extrabold text-xs uppercase tracking-wider rounded-2xl transition-all shadow-md active:scale-97 cursor-pointer flex items-center justify-center gap-1.5"
            >
              <span>{actionButtonText}</span>
              <span>➔</span>
            </button>
          </div>
        )}

      </div>
    </motion.div>
  );
}
