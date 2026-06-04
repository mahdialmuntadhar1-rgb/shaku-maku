import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Heart, Bookmark, Star, MapPin, Phone, Share2, Edit3, Save, 
  CheckCircle2, FolderHeart, Award, Eye, MessageCircle, X, Send, Gift 
} from 'lucide-react';
import { Business, Language, GovernorateCode } from '../types';
import { CATEGORIES, TRANSLATIONS } from '../data';
import { normalizeGovernorate, normalizeCategory } from '../utils/taxonomy';
import { businessesApi, getApiErrorMessage } from '../api';

interface BusinessFeedProps {
  currentLang: Language;
  selectedGov: GovernorateCode;
  selectedCategory: string | null;
  businesses: Business[];
  businessesLoading?: boolean;
  onToggleLike: (bizId: string) => void;
  onToggleSave: (bizId: string) => void;
  onSelectStory: (stories: string[]) => void;
  isAdmin?: boolean;
  setBusinesses?: React.Dispatch<React.SetStateAction<Business[]>>;
}

export default function BusinessFeed({
  currentLang,
  selectedGov,
  selectedCategory,
  businesses,
  businessesLoading = false,
  onToggleLike,
  onToggleSave,
  onSelectStory,
  isAdmin = false,
  setBusinesses
}: BusinessFeedProps) {
  const [selectedBiz, setSelectedBiz] = useState<Business | null>(null);
  const [editingBusinessId, setEditingBusinessId] = useState<string | null>(null);
  const [adminStatus, setAdminStatus] = useState('');
  const [businessEditDraft, setBusinessEditDraft] = useState({
    name: '',
    phoneNumber: '',
    address: '',
    description: '',
    image: ''
  });
  
  // Keep track of counts of displayed items per category
  const [categoryVisibleCounts, setCategoryVisibleCounts] = useState<Record<string, number>>({});
  const [loadingCategories, setLoadingCategories] = useState<Record<string, boolean>>({});

  // Reset pagination/expanded categories when governorate or category changes
  React.useEffect(() => {
    setCategoryVisibleCounts({});
    setLoadingCategories({});
  }, [selectedGov, selectedCategory]);
  
  // Real-time custom comments added to specific business IDs
  const [localReviews, setLocalReviews] = useState<Record<string, { reviewer: string, rating: number, comment: string, date: string }[]>>({});
  const [newReviewComment, setNewReviewComment] = useState('');
  const [newReviewerName, setNewReviewerName] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);

  const t = TRANSLATIONS[currentLang];
  const INITIAL_CATEGORY_LIMIT = 2;
  const LOAD_MORE_STEP = 4;

  function cleanBusinessDisplayText(value: string | undefined): string {
    const raw = String(value || '').trim();
    if (!raw) return '';

    const lower = raw.toLowerCase();

    // Hide generated/fake placeholder metadata from cards.
    if (
      lower.includes('street 1,') ||
      lower.includes('website: www.') ||
      lower.includes('facebook: facebook.com/') ||
      lower.includes('instagram: instagram.com/') ||
      lower.includes('city: ')
    ) {
      return '';
    }

    return raw;
  }


  function standardizeMosulNinevehDisplay(value: string | undefined): string {
    return String(value || '')
      .replace(/\b(nineveh|ninewa|ninawa|nainawa|niniveh|neneveh|neniva)\b/gi, 'Mosul / Nineveh')
      .replace(/نينوى|نينوي/g, 'الموصل / نينوى');
  }
  function extractExternalLinks(value: string | undefined): Array<{ label: string; href: string }> {
    const raw = String(value || '');
    const links: Array<{ label: string; href: string }> = [];

    const website = raw.match(/website:\s*([^|\n]+)/i)?.[1]?.trim();
    const facebook = raw.match(/facebook:\s*([^|\n]+)/i)?.[1]?.trim();
    const instagram = raw.match(/instagram:\s*([^|\n]+)/i)?.[1]?.trim();

    if (website && !website.includes('example.com')) {
      links.push({ label: 'Website', href: website.startsWith('http') ? website : `https://${website}` });
    }
    if (facebook) {
      links.push({ label: 'Facebook', href: facebook.startsWith('http') ? facebook : `https://${facebook}` });
    }
    if (instagram) {
      links.push({ label: 'Instagram', href: instagram.startsWith('http') ? instagram : `https://${instagram}` });
    }

    return links;
  }

  function startInlineEdit(biz: Business) {
    setEditingBusinessId(biz.id);
    setBusinessEditDraft({
      name: biz.name[currentLang] || biz.name.en || biz.name.ar || '',
      phoneNumber: biz.phoneNumber || '',
      address: cleanBusinessDisplayText(biz.address[currentLang]) || '',
      description: cleanBusinessDisplayText(biz.description[currentLang]) || '',
      image: biz.image || ''
    });
  }

  async function saveInlineBusiness(biz: Business) {
    const payload = {
      name: businessEditDraft.name.trim(),
      phone: businessEditDraft.phoneNumber.trim(),
      address: businessEditDraft.address.trim(),
      description: businessEditDraft.description.trim(),
      image: businessEditDraft.image.trim()
    };

    const updatedBusiness: Business = {
      ...biz,
      name: {
        ar: payload.name || biz.name.ar,
        ku: payload.name || biz.name.ku,
        en: payload.name || biz.name.en
      },
      phoneNumber: payload.phone,
      address: {
        ar: payload.address,
        ku: payload.address,
        en: payload.address
      },
      description: {
        ar: payload.description,
        ku: payload.description,
        en: payload.description
      },
      image: payload.image || biz.image,
      images: payload.image ? [payload.image, ...(biz.images || []).filter((img) => img !== payload.image)] : biz.images
    };

    try {
      try {
        await businessesApi.update(biz.id, payload);
        setAdminStatus(currentLang === 'en' ? 'Business updated.' : currentLang === 'ku' ? 'بازرگانی نوێکرایەوە.' : 'تم تحديث النشاط.');
      } catch (backendError) {
        console.warn('Business backend update failed, keeping local edit:', backendError);
        setAdminStatus(
          currentLang === 'en'
            ? 'Updated locally. Backend update route may need review.'
            : currentLang === 'ku'
            ? 'ناوخۆیی نوێکرایەوە. باکئێند پێویستی بە پشکنین هەیە.'
            : 'تم التحديث محلياً. قد يحتاج مسار الخادم للمراجعة.'
        );
      }

      setBusinesses?.((prev) => prev.map((item) => (item.id === biz.id ? updatedBusiness : item)));
      setSelectedBiz((prev) => (prev?.id === biz.id ? updatedBusiness : prev));
      setEditingBusinessId(null);
    } catch (error) {
      setAdminStatus(getApiErrorMessage(error));
    }
  }

  function officialCategoryLabel(categoryId: string | undefined): string {
    const normalized = normalizeCategory(categoryId);
    return CATEGORIES.find((category) => category.id === normalized)?.name[currentLang] || normalized || '';
  }
  const isRtl = currentLang === 'ar' || currentLang === 'ku';

  // Filter businesses by Governorate (if not 'all').
  // Always normalize because backend rows may say "Wasit" while UI filter uses "wasit".
  const normalizedSelectedGov = normalizeGovernorate(selectedGov);

  const govFiltered = normalizedSelectedGov === 'all'
    ? businesses
    : businesses.filter((b) => normalizeGovernorate(b.governorate) === normalizedSelectedGov);

  const knownCategoryIds = new Set(CATEGORIES.map((c) => c.id));
  const groupedBusinesses = govFiltered.reduce<Record<string, Business[]>>((acc, biz) => {
    const normalizedCategory = normalizeCategory(biz.category);
    const categoryId = knownCategoryIds.has(normalizedCategory) ? normalizedCategory : 'other';
    if (!acc[categoryId]) acc[categoryId] = [];
    acc[categoryId].push({
      ...biz,
      governorate: normalizeGovernorate(biz.governorate),
      category: categoryId
    });
    return acc;
  }, {});

  // If a specific category chip is active on the header selector, prioritize that category. Otherwise, group by all categories.
  const categoriesToGroup = selectedCategory
    ? CATEGORIES.filter((c) => c.id === selectedCategory)
    : CATEGORIES.filter((c) => (groupedBusinesses[c.id] || []).length > 0);

  const visibleCount = categoriesToGroup.reduce((count, category) => {
    return count + (groupedBusinesses[category.id] || []).length;
  }, 0);

  React.useEffect(() => {
    console.log('[ShakuMaku] business feed filter:', {
      selectedGov,
      normalizedSelectedGov,
      selectedCategory,
      inputBusinesses: businesses.length,
      afterGovernorateFilter: govFiltered.length,
      visibleCount
    });
  }, [selectedGov, normalizedSelectedGov, selectedCategory, businesses.length, govFiltered.length, visibleCount]);

  React.useEffect(() => {
    console.log('[ShakuMaku] business feed filter:', {
      selectedGov,
      normalizedSelectedGov,
      selectedCategory,
      inputBusinesses: businesses.length,
      afterGovernorateFilter: govFiltered.length,
      visibleCount
    });
  }, [selectedGov, normalizedSelectedGov, selectedCategory, businesses.length, govFiltered.length, visibleCount]);

  const handleToggleCategoryExpand = (catId: string) => {
    if (loadingCategories[catId]) return;

    const total = (groupedBusinesses[catId] || []).length;
    const current = categoryVisibleCounts[catId] || INITIAL_CATEGORY_LIMIT;
    const next = Math.min(total, current + LOAD_MORE_STEP);

    setLoadingCategories(prev => ({ ...prev, [catId]: true }));

    setTimeout(() => {
      setCategoryVisibleCounts(prev => ({ ...prev, [catId]: next }));
      setLoadingCategories(prev => ({ ...prev, [catId]: false }));
    }, 250);
  };

  const handleShowLessCategory = (catId: string) => {
    setCategoryVisibleCounts(prev => ({ ...prev, [catId]: INITIAL_CATEGORY_LIMIT }));
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
      alert(`${t.share}: ${standardizeMosulNinevehDisplay(biz.name[currentLang])}\n${window.location.href}`);
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

  if (businessesLoading && visibleCount === 0) {
    return (
      <div className="py-10 bg-white/70 rounded-2xl border border-luxury-teal/20">
        <div className="flex flex-col items-center justify-center gap-3">
          <div className="w-10 h-10 rounded-full border-4 border-luxury-teal/20 border-t-luxury-gold animate-spin"></div>
          <h3 className="text-sm font-black text-luxury-bg">
            {currentLang === 'en' ? 'Loading businesses...' : currentLang === 'ku' ? 'بازرگانییەکان بار دەکرێن...' : 'جاري تحميل الأنشطة...'}
          </h3>
          <p className="text-xs text-zinc-500 text-center max-w-sm">
            {currentLang === 'en'
              ? 'Please wait a moment while we prepare the governorate and category results.'
              : currentLang === 'ku'
              ? 'تکایە چاوەڕێ بکە تا ئەنجامەکانی پارێزگا و پۆل ئامادە دەکرێن.'
              : 'انتظر لحظة حتى نجهز نتائج المحافظة والتصنيف.'}
          </p>
        </div>
      </div>
    );
  }

  if (visibleCount === 0) {
    return (
      <div className="text-center py-14 bg-white/55 rounded-2xl border border-luxury-teal/20">
        <h3 className="text-base font-black text-luxury-bg mb-1">
          {currentLang === 'en' ? 'No businesses found' : currentLang === 'ku' ? 'هیچ بازرگانییەک نەدۆزرایەوە' : 'لم يتم العثور على أنشطة'}
        </h3>
        <p className="text-sm text-zinc-300">
          {currentLang === 'en'
            ? 'Try changing governorate or category filters.'
            : currentLang === 'ku'
            ? 'تکایە پارێزگا یان جۆری بازرگانی بگۆڕە.'
            : 'جرّب تغيير فلاتر المحافظة أو التصنيف.'}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-12 business-live-blue-zone">
{isAdmin && adminStatus && (
<div className="bg-amber-50 border border-amber-300 text-amber-900 rounded-xl px-4 py-3 text-xs font-bold">{adminStatus}</div>
)}
      
      {/* Category Grouping Logic */}
      {categoriesToGroup.map((category) => {
        // Find businesses belonging to this specific category that match the chosen governorate
        const categoryBizs = groupedBusinesses[category.id] || [];
        
        // Skip rendering category section if there are no matching businesses
        if (categoryBizs.length === 0) return null;

        const visibleLimit = categoryVisibleCounts[category.id] || INITIAL_CATEGORY_LIMIT;
        const visibleBizs = categoryBizs.slice(0, visibleLimit);
        const hasMore = visibleLimit < categoryBizs.length;
        const canShowLess = visibleLimit > INITIAL_CATEGORY_LIMIT;

        return (
          <div key={category.id} className="relative bg-[#07111f]/95 p-5 rounded-3xl border border-blue-400/25 shadow-[0_0_38px_rgba(59,130,246,0.18)] overflow-hidden">
            
            {/* Category Section Header */}
            <div className="flex items-center justify-between mb-5 border-b border-blue-400/20 pb-3">
              <div className="flex items-center gap-2.5">
                <span className="text-2xl filter drop-shadow-[0_1px_2px_rgba(0,0,0,0.15)]">{category.icon}</span>
                <h2 className="text-xl font-extrabold text-white tracking-tight font-sans">
                  {category.name[currentLang]}
                </h2>
                <span className="text-[10px] bg-blue-500/20 text-blue-100 border border-blue-300/25 px-2 py-0.5 rounded-full font-bold">
                  {categoryBizs.length}
                </span>
              </div>
              
              {/* Saku Maku custom decorative accent */}
              <div className="hidden sm:block text-[11px] font-mono text-zinc-500 font-medium">
                Shaku Maku Live • {category.id.toUpperCase()}
              </div>
            </div>

            {/* Grid of Business Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3.5 sm:gap-6">
              {visibleBizs.map((biz) => {
                const hasStories = biz.stories && biz.stories.length > 0;
                
                return (
                  <motion.div
                    key={biz.id}
                    layoutId={`biz-card-${biz.id}`}
                    whileHover={{ y: -6 }}
                    className="flex flex-col h-full bg-[#07111f] border border-blue-400/35 rounded-2xl overflow-hidden hover:border-blue-300 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-350 group shadow-[0_0_22px_rgba(59,130,246,0.16)]"
                  >
                    
                    {/* Upper cover photo container */}
                    <div className="relative h-28 xs:h-36 sm:h-44 md:h-48 w-full overflow-hidden bg-zinc-900">
                      
                      {/* Interactive stories indicator ring */}
                      {hasStories && (
                        <div 
                          onClick={(e) => {
                            e.stopPropagation();
                            if (biz.stories) onSelectStory(biz.stories);
                          }}
                          className="absolute top-2 left-2 z-10 flex items-center gap-1 cursor-pointer bg-[#1A1A1A]/95 backdrop-blur-sm lg:hover:bg-[#0F2E2F] text-[8px] xs:text-[10px] text-luxury-gold font-black px-1.5 xs:px-2.5 py-0.5 xs:py-1 rounded-full border border-luxury-gold/50 animate-pulse transition"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-luxury-gold"></span>
                          <span>{currentLang === 'en' ? 'Live Story' : currentLang === 'ku' ? 'ستۆری' : 'قصة حية'}</span>
                        </div>
                      )}

                      {/* Verified Badge */}
                      {biz.isVerified && (
                        <span className="absolute top-2 right-2 z-10 flex items-center gap-1 bg-[#C8A95F] text-[8px] xs:text-[10px] font-black text-[#1A1A1A] px-1.5 xs:px-2.5 py-0.5 xs:py-1 rounded-full shadow-md border border-[#0F2E2F]/20">
                          <span>⭐ PREMIUM</span>
                        </span>
                      )}

                      {/* Saku Maku beautiful local price tag if any discount exists */}
                      {biz.featuredDeal && (
                        <div className="absolute bottom-2 left-2 right-2 z-10 p-1.5 bg-[#0F2E2F]/90 backdrop-blur-md rounded-lg border border-luxury-gold/30 flex items-center gap-1 pointer-events-none">
                          <Gift className="w-3 h-3 text-luxury-gold shrink-0 animate-bounce" />
                          <span className="text-[8px] xs:text-[10px] text-white font-black tracking-tight line-clamp-1">
                            {biz.featuredDeal[currentLang]}
                          </span>
                        </div>
                      )}

                      {/* Cover Photo */}
                      <img
                        src={biz.image}
                        alt={standardizeMosulNinevehDisplay(biz.name[currentLang])}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    {/* Bottom details pack */}
                    <div className="p-2.5 xs:p-4 flex flex-col flex-grow justify-between bg-[#07111f] text-white">
                      <div>
                        
                        {/* Title & Category with governorate */}
                        <div className="flex flex-col xs:flex-row xs:items-start justify-between gap-1 mb-1 xs:mb-1.5">
                          <h3 className="text-xs xs:text-sm font-black text-white group-hover:text-blue-200 transition-colors line-clamp-1 font-sans">
                            {standardizeMosulNinevehDisplay(biz.name[currentLang])}
                          </h3>
                          
                          <div className="flex items-center gap-0.5 xs:gap-1 text-[9px] xs:text-[11px] text-amber-805 font-black shrink-0 bg-amber-500/10 px-1 xs:px-1.5 py-0.5 rounded-lg border border-amber-500/20 w-fit">
                            <Star className="w-2.5 h-2.5 xs:w-3.5 xs:h-3.5 fill-amber-600 text-amber-600" />
                            <span>{biz.rating}</span>
                          </div>
                        </div>

                        {isAdmin && editingBusinessId === biz.id ? (
                          <div className="space-y-2 mb-3 bg-amber-50 border border-amber-200 rounded-xl p-2">
                            <input
                              value={businessEditDraft.name}
                              onChange={(event) => setBusinessEditDraft((prev) => ({ ...prev, name: event.target.value }))}
                              placeholder="Business name"
                              className="w-full rounded-lg border border-amber-200 px-2 py-1 text-[10px]"
                            />
                            <input
                              value={businessEditDraft.phoneNumber}
                              onChange={(event) => setBusinessEditDraft((prev) => ({ ...prev, phoneNumber: event.target.value }))}
                              placeholder="Phone number"
                              className="w-full rounded-lg border border-amber-200 px-2 py-1 text-[10px]"
                              dir="ltr"
                            />
                            <input
                              value={businessEditDraft.address}
                              onChange={(event) => setBusinessEditDraft((prev) => ({ ...prev, address: event.target.value }))}
                              placeholder="Real address only. Leave empty if unknown."
                              className="w-full rounded-lg border border-amber-200 px-2 py-1 text-[10px]"
                            />
                            <input
                              value={businessEditDraft.image}
                              onChange={(event) => setBusinessEditDraft((prev) => ({ ...prev, image: event.target.value }))}
                              placeholder="Image URL"
                              className="w-full rounded-lg border border-amber-200 px-2 py-1 text-[10px]"
                              dir="ltr"
                            />
                            <textarea
                              value={businessEditDraft.description}
                              onChange={(event) => setBusinessEditDraft((prev) => ({ ...prev, description: event.target.value }))}
                              placeholder="Description"
                              rows={2}
                              className="w-full rounded-lg border border-amber-200 px-2 py-1 text-[10px]"
                            />
                            <div className="flex gap-2">
                              <button
                                type="button"
                                onClick={() => void saveInlineBusiness(biz)}
                                className="px-2 py-1 rounded-lg bg-emerald-600 text-white text-[9px] font-black flex items-center gap-1"
                              >
                                <Save className="w-3 h-3" /> Save
                              </button>
                              <button
                                type="button"
                                onClick={() => setEditingBusinessId(null)}
                                className="px-2 py-1 rounded-lg bg-zinc-200 text-zinc-800 text-[9px] font-black"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        ) : (
                          <>
                            {/* Location Subtext */}
                            {cleanBusinessDisplayText(biz.address[currentLang]) && (
                              <div className="flex items-center gap-0.5 xs:gap-1 text-[9px] xs:text-[11px] text-zinc-500 mb-1 xs:mb-2 font-black">
                                <MapPin className="w-3 xs:w-3.5 h-3 xs:h-3.5 text-luxury-coral shrink-0" />
                                <span className="truncate">{standardizeMosulNinevehDisplay(cleanBusinessDisplayText(biz.address[currentLang]))}</span>
                              </div>
                            )}

                            {biz.phoneNumber && (
                              <a
                                href={`tel:${biz.phoneNumber}`}
                                className="inline-flex items-center gap-1 text-[9px] xs:text-[11px] text-emerald-700 font-black mb-1 xs:mb-2"
                                dir="ltr"
                              >
                                <Phone className="w-3 h-3" />
                                {biz.phoneNumber}
                              </a>
                            )}

                            <div className="flex flex-wrap gap-1 mb-1">
                              {extractExternalLinks(biz.description[currentLang]).slice(0, 3).map((link) => (
                                <a
                                  key={link.label}
                                  href={link.href}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="text-[8px] font-black px-1.5 py-0.5 rounded-full bg-zinc-100 text-zinc-300 border border-zinc-200"
                                >
                                  {link.label}
                                </a>
                              ))}
                            </div>

                            {/* Description snippet */}
                            {cleanBusinessDisplayText(biz.description[currentLang]) && (
                              <p className="text-[9px] xs:text-[11px] text-zinc-500 line-clamp-2 leading-relaxed mb-2 xs:mb-4">
                                {standardizeMosulNinevehDisplay(cleanBusinessDisplayText(biz.description[currentLang]))}
                              </p>
                            )}
                          </>
                        )}
                      </div>

                      {/* Interactive engagement Footer Row */}
                      <div className="border-t border-zinc-100 pt-2 xs:pt-3 flex flex-col xs:flex-row xs:items-center justify-between gap-2">
                        
                        {/* Profile Owner info snippet */}
                        <div className="flex items-center gap-1.5">
                          <img
                            src={biz.avatar}
                            alt="Merchant Owner Avatar"
                            className="w-5 h-5 xs:w-6 xs:h-6 rounded-full object-cover border border-[#0F2E2F]/20"
                            referrerPolicy="no-referrer"
                          />
                          <span className="text-[8px] xs:text-[10px] font-black text-zinc-400 group-hover:text-[#1A1A1A] transition-colors line-clamp-1">
                            {t.ownerBadge}
                          </span>
                        </div>

                        <div className="flex items-center gap-1 w-full xs:w-auto justify-end">
                          
                          {/* Like Button */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onToggleLike(biz.id);
                            }}
                            className={`p-1 xs:p-1.5 rounded-lg border transition cursor-pointer ${
                              biz.likedByUser
                                ? 'bg-pink-50 border-pink-500 text-pink-600'
                                : 'bg-zinc-100 hover:bg-zinc-200 border-zinc-200 text-zinc-300 hover:text-pink-600'
                            }`}
                            title="Like place"
                          >
                            <Heart className={`w-3 xs:w-3.5 h-3 xs:h-3.5 ${biz.likedByUser ? 'fill-pink-600' : ''}`} />
                          </button>

                          {/* Save Button */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onToggleSave(biz.id);
                            }}
                            className={`p-1 xs:p-1.5 rounded-lg border transition cursor-pointer ${
                              biz.savedByUser
                                ? 'bg-teal-50 border-luxury-teal text-luxury-teal'
                                : 'bg-zinc-100 hover:bg-zinc-200 border-zinc-200 text-zinc-300 hover:text-luxury-teal'
                            }`}
                            title="Save location"
                          >
                            <Bookmark className={`w-3 xs:w-3.5 h-3 xs:h-3.5 ${biz.savedByUser ? 'fill-luxury-teal' : ''}`} />
                          </button>

                          {isAdmin && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                startInlineEdit(biz);
                              }}
                              className="text-[9px] xs:text-[10px] font-black text-black bg-luxury-gold border border-luxury-gold px-2 xs:px-2.5 py-1 xs:py-1.5 rounded-lg transition cursor-pointer duration-300 flex items-center gap-1"
                              title="Admin edit"
                            >
                              <Edit3 className="w-3 h-3" />
                              Edit
                            </button>
                          )}

                          {/* Detail pop up opener CTA */}
                          <button
                            onClick={() => setSelectedBiz(biz)}
                            className="text-[9px] xs:text-[10px] font-black text-white bg-[#1A1A1A] hover:bg-luxury-gold hover:text-[#1A1A1A] border border-[#1A1A1A] px-2 xs:px-2.5 py-1 xs:py-1.5 rounded-lg transition cursor-pointer duration-300"
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

            {/* Skeletons load indicator */}
            {loadingCategories[category.id] && (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3.5 sm:gap-6 mt-4">
                {[1, 2].slice(0, Math.min(2, Math.max(0, categoryBizs.length - visibleLimit))).map((n) => (
                  <div key={n} className="flex flex-col h-full bg-slate-100/50 border border-zinc-200/50 rounded-2xl overflow-hidden animate-pulse min-h-[180px] xs:min-h-[220px]">
                    <div className="h-28 xs:h-36 sm:h-44 md:h-48 w-full bg-zinc-200/80"></div>
                    <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                      <div className="space-y-2">
                        <div className="h-3 w-3/4 bg-zinc-250 rounded"></div>
                        <div className="h-2.5 w-1/2 bg-zinc-250 rounded"></div>
                      </div>
                      <div className="h-7 w-full bg-zinc-250 rounded-lg"></div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Incremental Load More Button for current Category block */}
            {(hasMore || canShowLess) && (
              <div className="flex flex-wrap justify-center gap-2 mt-5">
                {hasMore && (
                  <button
                    onClick={() => handleToggleCategoryExpand(category.id)}
                    disabled={loadingCategories[category.id]}
                    className="text-[11px] font-bold text-luxury-teal hover:text-white bg-white hover:bg-luxury-teal px-4 py-1.5 rounded-full border border-luxury-teal/30 transition-all cursor-pointer shadow-sm disabled:opacity-50"
                  >
                    {loadingCategories[category.id]
                      ? (currentLang === 'en' ? 'Fetching...' : currentLang === 'ku' ? 'بارکردن...' : 'جاري التحميل...')
                      : `${t.loadMore} (${categoryBizs.length - visibleLimit}) +`}
                  </button>
                )}

                {canShowLess && (
                  <button
                    onClick={() => handleShowLessCategory(category.id)}
                    className="text-[11px] font-bold text-zinc-300 hover:text-white bg-zinc-800 hover:bg-zinc-700 px-4 py-1.5 rounded-full border border-zinc-600/50 transition-all cursor-pointer shadow-sm"
                  >
                    {t.showLess}
                  </button>
                )}
              </div>
            )}

          </div>
        );
      })}

      {/* If absolutely no business fits */}
      {govFiltered.length === 0 && (
        <div className="text-center py-16 bg-slate-900/20 border border-slate-900 rounded-3xl p-6">
          <FolderHeart className="w-12 h-12 text-zinc-300 mx-auto mb-3" />
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
                      {officialCategoryLabel(selectedBiz.category)}
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
                            <Star className={`w-3.5 h-3.5 ${newReviewRating >= starValue ? 'fill-yellow-500 text-yellow-500' : 'text-zinc-300'}`} />
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
