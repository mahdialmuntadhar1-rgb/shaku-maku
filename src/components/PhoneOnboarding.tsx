import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, MapPin, Search, CheckCircle2, Building2, Plus, X, ChevronRight, Loader2 } from 'lucide-react';
import { Language, GovernorateCode } from '../types';
import { GOVERNORATES } from '../data';

const API_BASE = import.meta.env.VITE_API_URL || 'https://iraq-businesses-dashboard.mahdialmuntadhar1.workers.dev';

interface Match {
  id: string;
  name: string;
  category: string;
  governorate: string;
  city: string;
  address: string;
  mobile: string;
  logo_url: string | null;
  verified: boolean;
  already_claimed: boolean;
  claimed_by_you: boolean;
}

interface PhoneOnboardingProps {
  currentLang: Language;
  onClose: () => void;
  onSuccess: (phone: string, businessId: string, businessName: string) => void;
}

const T = {
  en: {
    title: 'List Your Business',
    sub: 'Find or create your business listing in 2 steps',
    step1: 'Your Details',
    govLabel: 'Governorate',
    govPlaceholder: 'Select your governorate',
    phonePlaceholder: 'Phone number (e.g. +9647xxxxxxxx)',
    next: 'Search',
    step2: 'Your Business',
    found: 'We found these businesses matching your number:',
    notFound: 'No business found with this number.',
    claim: 'Claim This Business',
    claimed: 'Already Claimed',
    yourBiz: 'Your Business',
    createNew: 'Create New Business',
    createSub: 'Add your business to Saku Maku',
    namePlaceholder: 'Business name (optional)',
    create: 'Create & Continue',
    back: 'Back',
    success: 'Business claimed successfully!',
    dashboard: 'Go to Dashboard',
  },
  ar: {
    title: 'أضف نشاطك التجاري',
    sub: 'ابحث عن نشاطك أو أنشئه في خطوتين',
    step1: 'بياناتك',
    govLabel: 'المحافظة',
    govPlaceholder: 'اختر محافظتك',
    phonePlaceholder: 'رقم الهاتف (مثل +9647xxxxxxxx)',
    next: 'بحث',
    step2: 'نشاطك التجاري',
    found: 'وجدنا هذه الأنشطة المرتبطة برقمك:',
    notFound: 'لم يُعثر على نشاط تجاري بهذا الرقم.',
    claim: 'احجز هذا النشاط',
    claimed: 'محجوز مسبقاً',
    yourBiz: 'نشاطك',
    createNew: 'أنشئ نشاطاً جديداً',
    createSub: 'أضف نشاطك إلى ساكو ماكو',
    namePlaceholder: 'اسم النشاط التجاري (اختياري)',
    create: 'إنشاء ومتابعة',
    back: 'رجوع',
    success: 'تم حجز النشاط بنجاح!',
    dashboard: 'الذهاب إلى لوحة التحكم',
  },
  ku: {
    title: 'بزنسەکەت زیاد بکە',
    sub: 'بزنسەکەت بدۆزەرەوە یان دابنێ لە ٢ هەنگاو',
    step1: 'زانیارییەکانت',
    govLabel: 'پارێزگا',
    govPlaceholder: 'پارێزگاکەت هەڵبژێرە',
    phonePlaceholder: 'ژمارەی تەلەفۆن',
    next: 'گەڕان',
    step2: 'بزنسەکەت',
    found: 'ئەم بزنسانەمان دیت کە پەیوەندییان هەیە بە ژمارەکەت:',
    notFound: 'هیچ بزنسێک نەدۆزرایەوە بەم ژمارەیە.',
    claim: 'ئەم بزنسە وەرگرە',
    claimed: 'پێشتر گیراوە',
    yourBiz: 'بزنسەکەت',
    createNew: 'بزنسی نوێ دروست بکە',
    createSub: 'بزنسەکەت زیاد بکە بۆ ساکو ماکو',
    namePlaceholder: 'ناوی بزنس (ئارەزووی)',
    create: 'دروستکردن و بەردەوامبوون',
    back: 'گەڕانەوە',
    success: 'بزنسەکە بەسەرکەوتوویی گیرا!',
    dashboard: 'بڕۆ بۆ داشبۆرد',
  }
};

export default function PhoneOnboarding({ currentLang, onClose, onSuccess }: PhoneOnboardingProps) {
  const t = T[currentLang];
  const isRtl = currentLang !== 'en';

  const [step, setStep] = useState<1 | 2>(1);
  const [phone, setPhone] = useState('');
  const [governorate, setGovernorate] = useState<GovernorateCode>('baghdad');
  const [loading, setLoading] = useState(false);
  const [matches, setMatches] = useState<Match[]>([]);
  const [error, setError] = useState('');
  const [newBizName, setNewBizName] = useState('');
  const [claimLoading, setClaimLoading] = useState<string | null>(null);
  const [done, setDone] = useState<{ id: string; name: string } | null>(null);

  const govs = GOVERNORATES.filter(g => g.code !== 'all');

  const handleLookup = async () => {
    if (!phone.trim() || phone.trim().length < 7) {
      setError(currentLang === 'en' ? 'Enter a valid phone number' : currentLang === 'ar' ? 'أدخل رقم هاتف صحيح' : 'ژمارەیەکی تەلەفۆنی دروست بنووسە');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/onboard/lookup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: phone.trim(), governorate: governorate !== 'all' ? governorate : undefined })
      });
      const data = await res.json();
      if (data.success) {
        setMatches(data.matches || []);
        setStep(2);
      } else {
        setError(data.error || 'Error');
      }
    } catch {
      setError('Connection error');
    } finally {
      setLoading(false);
    }
  };

  const handleClaim = async (bizId: string) => {
    setClaimLoading(bizId);
    setError('');
    try {
      const res = await fetch(`${API_BASE}/api/onboard/claim`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: phone.trim(), businessId: bizId })
      });
      const data = await res.json();
      if (data.success) {
        setDone({ id: data.businessId, name: data.businessName });
      } else {
        setError(data.error || 'Claim failed');
      }
    } catch {
      setError('Connection error');
    } finally {
      setClaimLoading(null);
    }
  };

  const handleCreate = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${API_BASE}/api/onboard/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: phone.trim(), governorate, name: newBizName.trim() || undefined })
      });
      const data = await res.json();
      if (data.success) {
        setDone({ id: data.businessId, name: data.businessName });
      } else {
        setError(data.error || 'Create failed');
      }
    } catch {
      setError('Connection error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/70 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 40 }}
        className="w-full sm:max-w-md bg-[#111114] border border-white/10 rounded-t-3xl sm:rounded-3xl overflow-hidden shadow-2xl"
        dir={isRtl ? 'rtl' : 'ltr'}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-white/5">
          <div>
            <h2 className="text-sm font-black text-white">{t.title}</h2>
            <p className="text-[11px] text-zinc-500 mt-0.5">{t.sub}</p>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-full bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition cursor-pointer">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="px-5 py-5 space-y-4">

          {/* SUCCESS STATE */}
          {done ? (
            <div className="text-center space-y-4 py-4">
              <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
              <p className="text-sm font-black text-white">{t.success}</p>
              <p className="text-xs text-zinc-400">{done.name}</p>
              <button
                onClick={() => onSuccess(phone.trim(), done.id, done.name)}
                className="w-full py-3 bg-cyan-500 hover:bg-cyan-400 text-black text-xs font-black rounded-xl transition cursor-pointer flex items-center justify-center gap-2"
              >
                {t.dashboard} <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          ) : step === 1 ? (
            /* STEP 1 */
            <div className="space-y-3">
              <p className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider">{t.step1}</p>

              {/* Governorate */}
              <div>
                <label className="text-[10px] text-zinc-500 font-bold uppercase block mb-1.5 flex items-center gap-1">
                  <MapPin className="w-3 h-3" /> {t.govLabel}
                </label>
                <select
                  value={governorate}
                  onChange={e => setGovernorate(e.target.value as GovernorateCode)}
                  className="w-full bg-white/5 border border-white/10 text-white text-sm px-3 py-2.5 rounded-xl focus:outline-none focus:border-cyan-500/50 cursor-pointer"
                >
                  {govs.map(g => (
                    <option key={g.code} value={g.code} className="bg-zinc-900">
                      {g.name[currentLang]}
                    </option>
                  ))}
                </select>
              </div>

              {/* Phone */}
              <div>
                <label className="text-[10px] text-zinc-500 font-bold uppercase block mb-1.5 flex items-center gap-1">
                  <Phone className="w-3 h-3" /> {currentLang === 'en' ? 'Phone Number' : currentLang === 'ar' ? 'رقم الهاتف' : 'ژمارەی تەلەفۆن'}
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  placeholder={t.phonePlaceholder}
                  className="w-full bg-white/5 border border-white/10 text-white text-sm px-3 py-2.5 rounded-xl focus:outline-none focus:border-cyan-500/50 placeholder-zinc-600"
                  onKeyDown={e => e.key === 'Enter' && handleLookup()}
                />
              </div>

              {error && <p className="text-[11px] text-red-400">{error}</p>}

              <button
                onClick={handleLookup}
                disabled={loading}
                className="w-full py-3 bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 text-black text-xs font-black rounded-xl transition cursor-pointer flex items-center justify-center gap-2"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
                {t.next}
              </button>
            </div>
          ) : (
            /* STEP 2 */
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <button onClick={() => { setStep(1); setMatches([]); setError(''); }} className="text-zinc-500 hover:text-white transition cursor-pointer">
                  <ChevronRight className="w-4 h-4 rotate-180" />
                </button>
                <p className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider">{t.step2}</p>
              </div>

              {error && <p className="text-[11px] text-red-400">{error}</p>}

              {/* Matches */}
              {matches.length > 0 ? (
                <div className="space-y-2">
                  <p className="text-[11px] text-zinc-500">{t.found}</p>
                  {matches.map(m => (
                    <div key={m.id} className="flex items-center gap-3 p-3 bg-white/5 border border-white/10 rounded-xl">
                      <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0 overflow-hidden">
                        {m.logo_url
                          ? <img src={m.logo_url} alt="" className="w-full h-full object-cover" />
                          : <Building2 className="w-5 h-5 text-zinc-500" />
                        }
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-white truncate">{m.name}</p>
                        <p className="text-[10px] text-zinc-500 truncate">{m.category} · {m.city || m.governorate}</p>
                      </div>
                      {m.claimed_by_you ? (
                        <span className="text-[10px] font-bold text-emerald-400 flex items-center gap-1 shrink-0">
                          <CheckCircle2 className="w-3 h-3" /> {t.yourBiz}
                        </span>
                      ) : m.already_claimed ? (
                        <span className="text-[10px] font-bold text-zinc-500 shrink-0">{t.claimed}</span>
                      ) : (
                        <button
                          onClick={() => handleClaim(m.id)}
                          disabled={claimLoading === m.id}
                          className="px-3 py-1.5 bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 text-[10px] font-bold rounded-lg hover:bg-cyan-500/30 transition cursor-pointer shrink-0 flex items-center gap-1 disabled:opacity-50"
                        >
                          {claimLoading === m.id ? <Loader2 className="w-3 h-3 animate-spin" /> : null}
                          {t.claim}
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-zinc-500 text-center py-2">{t.notFound}</p>
              )}

              {/* Create new */}
              <div className="border border-white/10 rounded-xl p-3 space-y-2.5">
                <div className="flex items-center gap-2">
                  <Plus className="w-4 h-4 text-cyan-400 shrink-0" />
                  <div>
                    <p className="text-xs font-bold text-white">{t.createNew}</p>
                    <p className="text-[10px] text-zinc-500">{t.createSub}</p>
                  </div>
                </div>
                <input
                  type="text"
                  value={newBizName}
                  onChange={e => setNewBizName(e.target.value)}
                  placeholder={t.namePlaceholder}
                  className="w-full bg-white/5 border border-white/10 text-white text-xs px-3 py-2 rounded-lg focus:outline-none focus:border-cyan-500/50 placeholder-zinc-600"
                />
                <button
                  onClick={handleCreate}
                  disabled={loading}
                  className="w-full py-2.5 bg-white/10 hover:bg-white/15 disabled:opacity-50 text-white text-xs font-bold rounded-lg transition cursor-pointer flex items-center justify-center gap-2"
                >
                  {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : null}
                  {t.create}
                </button>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
