import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Heart, Bookmark, Star, MapPin, Phone, Share2, 
  CheckCircle2, FolderHeart, Award, Eye, MessageCircle, X, Send, Gift 
} from 'lucide-react';
import { Business, Language, GovernorateCode } from '../types';
import { CATEGORIES, TRANSLATIONS } from '../data';

interface BusinessFeedProps {
  currentLang: Language;
  selectedGov: GovernorateCode;
  selectedCategory: string | null;
  businesses: Business[];
  onToggleLike: (bizId: string) => void;
  onToggleSave: (bizId: string) => void;
  onSelectStory: (stories: string[]) => void;
}

export default function BusinessFeed({
  currentLang,
  selectedGov,
  selectedCategory,
  businesses,
  onToggleLike,
  onToggleSave,
  onSelectStory
}: BusinessFeedProps) {
  const [selectedBiz, setSelectedBiz] = useState<Business | null>(null);
  
  // Keep track of counts of displayed items per category
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});
  
  // Real-time custom comments added to specific business IDs
  const [localReviews, setLocalReviews] = useState<Record<string, { reviewer: string, rating: number, comment: string, date: string }[]>>({});
  const [newReviewComment, setNewReviewComment] = useState('');
  const [newReviewerName, setNewReviewerName] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);

  const t = TRANSLATIONS[currentLang];
  const isRtl = currentLang === 'ar' || currentLang === 'ku';

  // Filter businesses by Governorate (if not 'all')
  const govFiltered = selectedGov === 'all' 
    ? businesses 
    : businesses.filter(b => b.governorate === selectedGov);

  // If a specific category chip is active on the header selector, prioritize that category. Otherwise, group by all categories.
  const categoriesToGroup = selectedCategory 
    ? CATEGORIES.filter(c => c.id === selectedCategory) 
    : CATEGORIES;

  const handleToggleCategoryExpand = (catId: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [catId]: !prev[catId]
    }));
  };

  const handleShare = (biz: Business) => {
    if (navigator.share) {
      navigator.share({
        title: biz.name[currentLang],
        text: biz.description[currentLang],
        url: window.location.href,
      }).catch(console.error);
    } else {
      // Fallback
      alert(`${t.share}: ${biz.name[currentLang]}\n${window.location.href}`);
    }
  };

  const handleAddReview = (e: React.FormEvent, bizId: string) => {
    e.preventDefault();
    if (!newReviewComment.trim()) return;

    const reviewer = newReviewerName.trim() || (currentLang === 'en' ? 'Visitor' : currentLang === 'ku' ? 'گەشتیار' : 'زائر');
    const newFeedback = {
      reviewer,
      rating: newReviewRating,
      comment: newReviewComment,
      date: currentLang === 'en' ? 'Just now' : currentLang === 'ku' ? 'ئێستا' : 'الآن'
    };

    setLocalReviews(prev => ({
      ...prev,
      [bizId]: [newFeedback, ...(prev[bizId] || [])]
    }));

    setNewReviewComment('');
    setNewReviewerName('');
    setNewReviewRating(5);
  };

  return (
    <div className="space-y-12">
      
      {/* Category Grouping Logic */}
      {categoriesToGroup.map((category) => {
        // Find businesses belonging to this specific category that match the chosen governorate
        const categoryBizs = govFiltered.filter(b => b.category === category.id);
        
        // Skip rendering category section if there are no matching businesses
        if (categoryBizs.length === 0) return null;

        const isExpanded = expandedCategories[category.id] || false;
        const visibleBizs = isExpanded ? categoryBizs : categoryBizs.slice(0, 3);

        return (
          <div key={category.id} className="relative bg-slate-900/10 p-5 rounded-3xl border border-slate-900/40">
            
            {/* Category Section Header */}
            <div className="flex items-center justify-between mb-5 border-b border-zinc-800/60 pb-3">
              <div className="flex items-center gap-2.5">
                <span className="text-2xl filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]">{category.icon}</span>
                <h2 className="text-xl font-extrabold text-white tracking-tight font-sans">
                  {category.name[currentLang]}
                </h2>
                <span className="text-[10px] bg-slate-800 text-zinc-400 px-2 py-0.5 rounded-full font-bold">
                  {categoryBizs.length}
                </span>
              </div>
              
              {/* Saku Maku custom decorative accent */}
              <div className="hidden sm:block text-[11px] font-mono text-zinc-500">
                Saku Maku Discover • {category.id.toUpperCase()}
              </div>
            </div>

            {/* Grid of Business Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {visibleBizs.map((biz) => {
                const hasStories = biz.stories && biz.stories.length > 0;
                
                return (
                  <motion.div
                    key={biz.id}
                    layoutId={`biz-card-${biz.id}`}
                    whileHover={{ y: -6 }}
                    className="flex flex-col h-full bg-white/5 border border-white/10 rounded-[28px] overflow-hidden hover:border-blue-400/50 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 group"
                  >
                    
                    {/* Upper cover photo container */}
                    <div className="relative h-48 w-full overflow-hidden bg-zinc-900">
                      
                      {/* Interactive stories indicator ring */}
                      {hasStories && (
                        <div 
                          onClick={(e) => {
                            e.stopPropagation();
                            if (biz.stories) onSelectStory(biz.stories);
                          }}
                          className="absolute top-3 left-3 z-10 flex items-center gap-1.5 cursor-pointer bg-slate-900/80 backdrop-blur-md hover:bg-violet-950/90 text-[10px] text-pink-400 font-extrabold px-2.5 py-1 rounded-full border border-pink-500/50 animate-pulse transition"
                        >
                          <span className="w-2 h-2 rounded-full bg-pink-500"></span>
                          <span>{currentLang === 'en' ? 'Live Story' : currentLang === 'ku' ? 'ستۆری' : 'قصة حية'}</span>
                        </div>
                      )}

                      {/* Verified Badge */}
                      {biz.isVerified && (
                        <span className="absolute top-3 right-3 z-10 flex items-center gap-1 bg-gradient-to-r from-cyan-500 to-blue-600 text-[10px] font-extrabold text-white px-2 py-0.5 rounded-md shadow-md">
                          <CheckCircle2 className="w-3 h-3 text-white fill-none" />
                          <span>{t.verified}</span>
                        </span>
                      )}

                      {/* Saku Maku beautiful local price tag if any discount exists */}
                      {biz.featuredDeal && (
                        <div className="absolute bottom-3 left-3 right-3 z-10 p-2 bg-gradient-to-r from-violet-950/90 to-slate-950/90 backdrop-blur-md rounded-xl border border-violet-500/40 flex items-center gap-1.5 pointer-events-none">
                          <Gift className="w-3.5 h-3.5 text-pink-400 shrink-0" />
                          <span className="text-[10px] text-zinc-200 font-bold tracking-tight line-clamp-1">
                            {biz.featuredDeal[currentLang]}
                          </span>
                        </div>
                      )}

                      {/* Cover Photo */}
                      <img
                        src={biz.image}
                        alt={biz.name[currentLang]}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    {/* Bottom details pack */}
                    <div className="p-4 flex flex-col flex-grow justify-between">
                      <div>
                        
                        {/* Title & Category with governorate */}
                        <div className="flex items-start justify-between gap-1 mb-1.5">
                          <h3 className="text-sm font-bold text-white group-hover:text-cyan-400 transition-colors line-clamp-1">
                            {biz.name[currentLang]}
                          </h3>
                          
                          <div className="flex items-center gap-1 text-[11px] text-yellow-500 font-extrabold shrink-0 bg-yellow-500/10 px-1.5 py-0.5 rounded-lg border border-yellow-500/20">
                            <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />
                            <span>{biz.rating}</span>
                          </div>
                        </div>

                        {/* Governorate & Category Badges */}
                        <div className="flex items-center gap-1.5 mb-2">
                          <span className="text-[10px] font-bold bg-blue-500/15 text-blue-400 px-1.5 py-0.5 rounded-md border border-blue-500/20">
                            {biz.governorate}
                          </span>
                          <span className="text-[10px] font-bold bg-purple-500/15 text-purple-400 px-1.5 py-0.5 rounded-md border border-purple-500/20">
                            {biz.category}
                          </span>
                        </div>

                        {/* Location Subtext */}
                        <div className="flex items-center gap-1 text-[11px] text-zinc-400 mb-2">
                          <MapPin className="w-3.5 h-3.5 text-rose-500" />
                          <span className="truncate">{biz.address[currentLang]}</span>
                        </div>

                        {/* Description snippet */}
                        <p className="text-[11px] text-zinc-400 line-clamp-2 leading-relaxed mb-4">
                          {biz.description[currentLang]}
                        </p>
                      </div>

                      {/* Interactive engagement Footer Row */}
                      <div className="border-t border-zinc-900 pt-3 flex items-center justify-between">
                        
                        {/* Profile Owner info snippet */}
                        <div className="flex items-center gap-2">
                          <img
                            src={biz.avatar}
                            alt="Merchant Owner Avatar"
                            className="w-6 h-6 rounded-full object-cover border border-zinc-800"
                            referrerPolicy="no-referrer"
                          />
                          <span className="text-[10px] font-bold text-zinc-400 group-hover:text-zinc-200 transition-colors line-clamp-1">
                            {t.ownerBadge}
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5">
                          
                          {/* Like Button */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onToggleLike(biz.id);
                            }}
                            className={`p-1.5 rounded-xl border transition ${
                              biz.likedByUser
                                ? 'bg-pink-950/40 border-pink-500 text-pink-400'
                                : 'bg-slate-900/60 border-zinc-800 text-zinc-400 hover:text-pink-400 hover:bg-slate-900'
                            }`}
                            title="Like place"
                          >
                            <Heart className={`w-3.5 h-3.5 ${biz.likedByUser ? 'fill-pink-500' : ''}`} />
                          </button>

                          {/* Save Button */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onToggleSave(biz.id);
                            }}
                            className={`p-1.5 rounded-xl border transition ${
                              biz.savedByUser
                                ? 'bg-cyan-950/40 border-cyan-500 text-cyan-400'
                                : 'bg-slate-900/60 border-zinc-800 text-zinc-400 hover:text-cyan-400 hover:bg-slate-900'
                            }`}
                            title="Save location"
                          >
                            <Bookmark className={`w-3.5 h-3.5 ${biz.savedByUser ? 'fill-cyan-500' : ''}`} />
                          </button>

                          {/* Detail pop up opener CTA */}
                          <button
                            onClick={() => setSelectedBiz(biz)}
                            className="text-[10px] font-black text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 px-2.5 py-1.5 rounded-xl transition"
                          >
                            {t.viewDetails}
                          </button>

                        </div>

                      </div>
                    </div>

                  </motion.div>
                );
              })}
            </div>

            {/* Load More Button for current Category block */}
            {categoryBizs.length > 3 && (
              <div className="flex justify-center mt-5">
                <button
                  onClick={() => handleToggleCategoryExpand(category.id)}
                  className="text-[11px] font-bold text-cyan-400 hover:text-white bg-slate-950 px-4 py-1.5 rounded-full border border-slate-800 transition-all cursor-pointer"
                >
                  {isExpanded ? t.showLess : `${t.loadMore} (${categoryBizs.length - 3}) +`}
                </button>
              </div>
            )}

          </div>
        );
      })}

      {/* If absolutely no business fits */}
      {govFiltered.length === 0 && (
        <div className="text-center py-16 bg-slate-900/20 border border-slate-900 rounded-3xl p-6">
          <FolderHeart className="w-12 h-12 text-zinc-600 mx-auto mb-3" />
          <h3 className="text-base font-bold text-white mb-1">
            {t.noBusinessesFound}
          </h3>
          <p className="text-xs text-zinc-500">
            {currentLang === 'en' 
              ? 'Try switching the governorate back to "All Iraq 🇮🇶" to see national social hubs!'
              : currentLang === 'ku'
                ? 'هەوڵ بدە پارێزگاکە بگۆڕیت بۆ "هەموو عێراق 🇮🇶" تا شوێنەکان ببینی!'
                : 'حاول تغيير المحافظة إلى "كل العراق 🇮🇶" لتستعرض الأماكن والشركات على نطاق الوطن!'}
          </p>
        </div>
      )}

      {/* Full-screen Business Details Portfolio Overlay Modal */}
      <AnimatePresence>
        {selectedBiz && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xl flex items-center justify-center p-4 overflow-y-auto"
            onClick={() => setSelectedBiz(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="bg-slate-900 border border-zinc-800/80 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              
              {/* Close Button Button */}
              <button
                onClick={() => setSelectedBiz(null)}
                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-slate-950/60 hover:bg-slate-950 border border-slate-850 text-zinc-300 hover:text-white transition"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Large Cover Hero Image */}
              <div className="relative h-64 md:h-72 w-full bg-slate-950">
                <img
                  src={selectedBiz.image}
                  alt={selectedBiz.name[currentLang]}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                
                {/* Visual Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent"></div>
                
                {/* Overlay details */}
                <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-end justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-extrabold uppercase bg-cyan-400 text-slate-950 px-2 py-0.5 rounded-md mb-1.5 inline-block">
                      {CATEGORIES.find(c => c.id === selectedBiz.category)?.name[currentLang]}
                    </span>
                    <h2 className="text-xl md:text-2xl font-black text-white leading-tight">
                      {selectedBiz.name[currentLang]}
                    </h2>
                  </div>

                  <div className="flex items-center gap-1 text-sm text-yellow-500 font-extrabold bg-slate-950/80 px-2.5 py-1 rounded-xl border border-yellow-500/20">
                    <Star className="w-3.5 h-3.5 fill-yellow-500" />
                    <span>{selectedBiz.rating}</span>
                    <span className="text-zinc-500 font-normal text-xs">({selectedBiz.reviewsCount} {currentLang === 'en' ? 'reviews' : 'تقييم'})</span>
                  </div>
                </div>

              </div>

              {/* Core Information Pane */}
              <div className="p-5 md:p-6 space-y-6 max-h-[50vh] overflow-y-auto custom-scrollbar">
                
                {/* Slogan details and verification status */}
                <div>
                  <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">
                    {currentLang === 'en' ? 'Lifestyle Description' : currentLang === 'ku' ? 'تایبەتمەندی شوێنەکە' : 'نبذة عن المكان التجاري'}
                  </h4>
                  <p className="text-sm text-zinc-300 leading-relaxed">
                    {selectedBiz.description[currentLang]}
                  </p>
                </div>

                {/* Hot promos container inside the modal */}
                {selectedBiz.featuredDeal && (
                  <div className="p-3 bg-gradient-to-r from-violet-950/40 via-purple-950/20 to-slate-950 rounded-2xl border border-violet-500/30">
                    <div className="flex items-center gap-1.5 text-pink-400 font-extrabold text-xs mb-1">
                      <Gift className="w-4 h-4 animate-shake" />
                      <span>{t.specialOffer}</span>
                    </div>
                    <p className="text-xs text-zinc-200 font-bold">
                      {selectedBiz.featuredDeal[currentLang]}
                    </p>
                  </div>
                )}

                {/* Local address tags, telephone details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-950/50 p-4 rounded-2xl border border-zinc-800/40">
                  <div className="space-y-1">
                    <span className="text-[10px] text-zinc-500 uppercase font-mono font-bold block">{t.address}</span>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                      <span className="text-xs text-zinc-300">{selectedBiz.address[currentLang]}</span>
                    </div>
                  </div>

                  {selectedBiz.phoneNumber && (
                    <div className="space-y-1">
                      <span className="text-[10px] text-zinc-500 uppercase font-mono font-bold block">{t.phone}</span>
                      <div className="flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-green-500 shrink-0" />
                        <span className="text-xs text-zinc-300">{selectedBiz.phoneNumber}</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Visitor Review Center (Live Community Commenter) */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
                    <h3 className="text-sm font-extrabold text-white flex items-center gap-1.5">
                      <MessageCircle className="w-4 h-4 text-cyan-400" />
                      <span>{t.reviewsTitle}</span>
                    </h3>
                    <span className="text-xs text-zinc-400">
                      {(localReviews[selectedBiz.id] || []).length + 3} {currentLang === 'en' ? 'Reviews posted' : 'ردود'}
                    </span>
                  </div>

                  {/* Add Visitor Review Form */}
                  <form onSubmit={(e) => handleAddReview(e, selectedBiz.id)} className="space-y-3 bg-slate-950/30 p-3 rounded-2xl border border-zinc-800/30">
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        placeholder={currentLang === 'en' ? 'Your Name' : currentLang === 'ku' ? 'ناوی تۆ' : 'اسمك الكريم'}
                        value={newReviewerName}
                        onChange={(e) => setNewReviewerName(e.target.value)}
                        className="bg-slate-950 text-white text-xs p-2 rounded-xl border border-zinc-800 focus:outline-none focus:border-cyan-400"
                      />
                      <div className="flex items-center gap-1 justify-end">
                        <span className="text-[10px] text-zinc-500">{t.ratingLabel}</span>
                        {[1, 2, 3, 4, 5].map((starValue) => (
                          <button
                            key={starValue}
                            type="button"
                            onClick={() => setNewReviewRating(starValue)}
                            className="p-0.5"
                          >
                            <Star className={`w-3.5 h-3.5 ${newReviewRating >= starValue ? 'fill-yellow-500 text-yellow-500' : 'text-zinc-600'}`} />
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="relative">
                      <input
                        type="text"
                        placeholder={t.addComment}
                        value={newReviewComment}
                        onChange={(e) => setNewReviewComment(e.target.value)}
                        className="w-full bg-slate-950 text-white text-xs p-2.5 rounded-xl border border-zinc-800 focus:outline-none focus:border-pink-500 pr-10"
                        required
                      />
                      <button
                        type="submit"
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-1 bg-gradient-to-r from-violet-600 to-pink-500 text-white rounded-lg hover:scale-105 transition"
                      >
                        <Send className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </form>

                  {/* Feedbacks Stream list */}
                  <div className="space-y-3 pt-1">
                    
                    {/* User-inserted reviews local state */}
                    {(localReviews[selectedBiz.id] || []).map((rev, idx) => (
                      <div key={idx} className="p-3 bg-slate-950/40 rounded-2xl border border-zinc-800/60 flex items-start gap-2.5 animate-fadeIn">
                        <div className="w-8 h-8 rounded-full bg-cyan-950 text-cyan-400 font-extrabold flex items-center justify-center text-xs shrink-0 select-none">
                          {rev.reviewer.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-white">{rev.reviewer}</span>
                            <div className="flex items-center gap-1 bg-yellow-500/10 px-1 py-0.5 rounded text-[10px] font-bold text-yellow-500">
                              <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />
                              <span>{rev.rating}</span>
                            </div>
                          </div>
                          <p className="text-xs text-zinc-300 leading-relaxed">{rev.comment}</p>
                          <span className="text-[10px] text-zinc-500 block">{rev.date}</span>
                        </div>
                      </div>
                    ))}

                    {/* Preloaded reviews mock */}
                    <div className="p-3 bg-slate-950/40 rounded-2xl border border-zinc-900 flex items-start gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-purple-950 text-pink-400 font-bold flex items-center justify-center text-xs shrink-0 select-none">
                        Z
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-white">zainab_ali_baghdad</span>
                          <div className="flex items-center gap-1 bg-yellow-500/10 px-1 py-0.5 rounded text-[10px] text-yellow-500">
                            <Star className="w-3.5 h-3.5 fill-yellow-500 text-yellow-500" />
                            <span>5</span>
                          </div>
                        </div>
                        <p className="text-xs text-zinc-300">
                          {currentLang === 'en' 
                            ? 'Absolutely breathtaking atmosphere! The staff is super respectful. Recommended for studying.' 
                            : currentLang === 'ku'
                              ? 'سەرنجڕاکێش بوو، خزمەتگوزارییەکان زۆر باش بوون.'
                              : 'مكان خيالي وجلسة فد شي راقي للآخر، موظفين في غاية الاحترام والخدمة سريعة.'}
                        </p>
                        <span className="text-[10px] text-zinc-500 block">3 days ago</span>
                      </div>
                    </div>

                    <div className="p-3 bg-slate-950/40 rounded-2xl border border-zinc-900 flex items-start gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-sky-950 text-cyan-400 font-bold flex items-center justify-center text-xs shrink-0 select-none">
                        M
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-white">mustafa_kurdish</span>
                          <div className="flex items-center gap-1 bg-yellow-500/10 px-1 py-0.5 rounded text-[10px] text-yellow-500">
                            <Star className="w-3.5 h-3.5 fill-yellow-500 text-yellow-500" />
                            <span>4</span>
                          </div>
                        </div>
                        <p className="text-xs text-zinc-300">
                          {currentLang === 'en' 
                            ? "Highly recommended! Delicious menu items and wonderful interior layout." 
                            : currentLang === 'ku'
                              ? 'زۆر بە تام بوو و شوێنەکە مۆدێرنە!'
                              : 'الوجبات ممتازة والمكان يستحق الزيارة والتجربة مع الأصحاب والأهل.'}
                        </p>
                        <span className="text-[10px] text-zinc-500 block">1 week ago</span>
                      </div>
                    </div>

                  </div>
                </div>

              </div>

              {/* Bottom footer bar */}
              <div className="p-4 bg-slate-950 border-t border-zinc-800 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      onToggleLike(selectedBiz.id);
                      // mutate local state in selectedBiz
                      setSelectedBiz(prev => prev ? { ...prev, likedByUser: !prev.likedByUser } : null);
                    }}
                    className={`flex items-center gap-1 text-xs px-3 py-2 rounded-xl border ${
                      selectedBiz.likedByUser
                        ? 'bg-pink-950/40 border-pink-500 text-pink-400'
                        : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${selectedBiz.likedByUser ? 'fill-pink-500' : ''}`} />
                    <span>{t.likes}</span>
                  </button>

                  <button
                    onClick={() => {
                      onToggleSave(selectedBiz.id);
                      setSelectedBiz(prev => prev ? { ...prev, savedByUser: !prev.savedByUser } : null);
                    }}
                    className={`flex items-center gap-1 text-xs px-3 py-2 rounded-xl border ${
                      selectedBiz.savedByUser
                        ? 'bg-cyan-950/40 border-cyan-500 text-cyan-400'
                        : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white'
                    }`}
                  >
                    <Bookmark className={`w-4 h-4 ${selectedBiz.savedByUser ? 'fill-cyan-500' : ''}`} />
                    <span>{t.saves}</span>
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  {selectedBiz.phoneNumber && (
                    <a
                      href={`tel:${selectedBiz.phoneNumber}`}
                      className="p-2 bg-green-600 hover:bg-green-500 text-white rounded-xl transition"
                      title="Call business"
                    >
                      <Phone className="w-4 h-4" />
                    </a>
                  )}

                  <button
                    onClick={() => handleShare(selectedBiz)}
                    className="p-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-white rounded-xl transition flex items-center gap-1.5 text-xs font-bold"
                  >
                    <Share2 className="w-4 h-4 text-purple-400" />
                    <span>{t.share}</span>
                  </button>
                </div>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
