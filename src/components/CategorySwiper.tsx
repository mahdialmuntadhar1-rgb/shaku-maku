import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, ChevronUp, Sparkles } from 'lucide-react';
import { Language } from '../types';
import { CATEGORIES, TRANSLATIONS } from '../data';

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
  const [showAll, setShowAll] = useState(false);

  const t = TRANSLATIONS[currentLang];
  const itemsToDisplay = showAll ? CATEGORIES : CATEGORIES.slice(0, 6);

  return (
    <div className="w-full mb-8 relative">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg md:text-xl font-extrabold text-white flex items-center gap-2">
            <span className="w-1.5 h-6 rounded-full bg-gradient-to-t from-violet-600 to-cyan-400"></span>
            <span>{t.categoryHeader}</span>
          </h2>
          <p className="text-[11px] text-zinc-500 mt-0.5">Explore by specific local industry</p>
        </div>

        {/* Clear Filter if category is selected */}
        {selectedCategory && (
          <button
            onClick={() => onSelectCategory(null)}
            className="text-[11px] font-bold text-pink-400 hover:text-white bg-pink-950/30 px-3 py-1 rounded-full border border-pink-500/20 transition-all cursor-pointer"
          >
            {currentLang === 'en' ? 'Show All Sections ↺' : currentLang === 'ku' ? 'هەموو نیشان بدە ↺' : 'إظهار كل الأقسام ↺'}
          </button>
        )}
      </div>

      {/* Grid of rounded-square category cards */}
      <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-6 gap-3">
        {itemsToDisplay.map((cat, idx) => {
          const isSelected = selectedCategory === cat.id;
          return (
            <motion.button
              key={cat.id}
              onClick={() => onSelectCategory(isSelected ? null : cat.id)}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.04, type: 'spring', stiffness: 200 }}
              className={`relative flex flex-col items-center justify-center p-3 h-24 rounded-2xl cursor-pointer overflow-hidden border transition-all duration-300 ${
                isSelected
                  ? 'bg-gradient-to-br from-violet-600/20 to-blue-600/20 border-blue-400/80 shadow-[0_4px_20px_rgba(59,130,246,0.35)] text-blue-400'
                  : 'bg-white/5 hover:bg-white/10 border-white/10 hover:border-blue-400/50 text-zinc-200'
              }`}
            >
              {/* Colored Glow effect in background */}
              <div className={`absolute -bottom-8 -right-8 w-16 h-16 rounded-full bg-gradient-to-tr ${cat.color} opacity-20 blur-xl transition-all group-hover:scale-150`}></div>
              
              {/* Hover highlight border */}
              {isSelected && (
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 via-violet-400 to-pink-500"></div>
              )}

              {/* Floating Large Icon */}
              <span className="text-2xl mb-1.5 filter drop-shadow-[0_4px_6px_rgba(0,0,0,0.3)] select-none">
                {cat.icon}
              </span>

              {/* Translation Name */}
              <span className="text-[11px] font-black tracking-tight text-center truncate w-full px-1">
                {cat.name[currentLang]}
              </span>
            </motion.button>
          );
        })}
      </div>

      {/* Expand/Collapse Toggle Controller with Cairo, Plus Jakarta Sans Support */}
      <div className="flex justify-center mt-3">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowAll(!showAll)}
          className="flex items-center gap-1.5 text-[11px] font-bold text-zinc-400 hover:text-white bg-slate-900/60 hover:bg-slate-900 px-4 py-1.5 rounded-full border border-zinc-800 transition-all cursor-pointer"
        >
          <span>{showAll ? t.showLess : t.loadMore}</span>
          {showAll ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </motion.button>
      </div>

      {/* Interactive Floating Sparkle if selected */}
      {selectedCategory && (
        <div className="mt-3 text-center text-xs text-zinc-500 font-medium">
          {currentLang === 'en' 
            ? 'Only showing places matching ' 
            : currentLang === 'ku' 
              ? 'تەنها ئەو شوێنانە نیشان دەدەین کە دەگونجێن لەگەڵ ' 
              : 'نعرض فقط الأماكن التي تنتمي لـ '} 
          <span className="text-cyan-400 font-extrabold">
            {CATEGORIES.find(c => c.id === selectedCategory)?.name[currentLang]}
          </span>
        </div>
      )}
    </div>
  );
}
