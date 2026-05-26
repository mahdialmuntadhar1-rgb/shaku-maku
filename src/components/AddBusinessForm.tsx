import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PlusCircle, Store, ChevronDown, CheckCircle, Navigation, Phone, Info, Image } from 'lucide-react';
import { Business, Language, GovernorateCode } from '../types';
import { GOVERNORATES, CATEGORIES, TRANSLATIONS } from '../data';

interface AddBusinessFormProps {
  currentLang: Language;
  onAddBusiness: (newBiz: Omit<Business, 'rating' | 'reviewsCount' | 'likes' | 'saves'>) => void;
  user: any;
  onSignIn: () => void;
}

export default function AddBusinessForm({ currentLang, onAddBusiness, user, onSignIn }: AddBusinessFormProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('coffee');
  const [governorate, setGovernorate] = useState<GovernorateCode>('baghdad');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  
  const [success, setSuccess] = useState(false);

  const t = TRANSLATIONS[currentLang];
  const isRtl = currentLang === 'ar' || currentLang === 'ku';

  if (!user) {
    return (
      <div className="w-full max-w-xl mx-auto bg-white/5 border border-white/10 rounded-[28px] p-8 text-center space-y-6 relative overflow-hidden backdrop-blur-md shadow-2xl">
        <div className="absolute top-[-20%] left-[-20%] w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-[-20%] right-[-20%] w-64 h-64 bg-violet-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative space-y-4">
          <div className="mx-auto w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-550 to-indigo-600 flex items-center justify-center text-white shadow-lg">
            <Store className="w-7 h-7 text-white" />
          </div>

          <div>
            <span className="text-[10px] text-blue-400 font-extrabold uppercase tracking-widest block font-mono">List Your Cafe or Spot</span>
            <dt className="text-base font-black text-white mt-1">
              {currentLang === 'en' ? 'Sign In Required' : currentLang === 'ku' ? 'چوونەژوورەوە پێویستە' : 'مطلوب تسجيل الدخول'}
            </dt>
            <dd className="text-xs text-zinc-400 mt-1.5 leading-relaxed max-w-sm mx-auto">
              {currentLang === 'en'
                ? 'Connect with Saku Maku via Google to publish and manage your high-street business listing.'
                : currentLang === 'ku'
                ? 'پەیوەست بە ساكۆ ماكۆوە لە ڕێگەی گووگڵەوە بۆ بڵاوکردنەوە و بەڕێوەبردنی شوێنەکەت.'
                : 'قم بالاتصال بساكو ماكو عبر جوجل لتتمكن من نشر وإدارة كافيهك أو مشروعك الخاص.'}
            </dd>
          </div>

          <button
            onClick={onSignIn}
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-gradient-to-r from-blue-500 via-indigo-600 to-pink-500 hover:from-blue-400 hover:to-pink-400 text-white font-black text-xs uppercase tracking-wider rounded-xl transition cursor-pointer shadow-xl font-mono"
            style={{ width: 'auto' }}
          >
            🔑 {currentLang === 'en' ? 'Sign In with Google' : currentLang === 'ku' ? 'چوونەژوورەوە لە ڕێگەی گووگڵ' : 'سجل دخول باستخدام جوجل'}
          </button>
        </div>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !description.trim() || !address.trim()) return;

    // Default top-tier lifestyle images if owner left empty
    const defaultImages: Record<string, string> = {
      coffee: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&auto=format&fit=crop&q=80',
      dining: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80',
      shopping: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&auto=format&fit=crop&q=80',
      hotels: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&auto=format&fit=crop&q=80',
      salons: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800&auto=format&fit=crop&q=80',
      gyms: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&auto=format&fit=crop&q=80',
      pharmacies: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&auto=format&fit=crop&q=80',
      universities: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=80',
      entertainment: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=800&auto=format&fit=crop&q=80'
    };

    const finalImage = imageUrl.trim() || defaultImages[category];

    const newBusiness = {
      id: `b-custom-${Date.now()}`,
      name: {
        ar: name.trim(),
        ku: name.trim(),
        en: name.trim()
      },
      description: {
        ar: description.trim(),
        ku: description.trim(),
        en: description.trim()
      },
      category,
      governorate,
      image: finalImage,
      images: [finalImage],
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      isVerified: false,
      phoneNumber: phone.trim() || undefined,
      address: {
        ar: address.trim(),
        ku: address.trim(),
        en: address.trim()
      },
      mapCoords: {
        x: Math.floor(Math.random() * 40) + 30, // random plotting on grid coords
        y: Math.floor(Math.random() * 40) + 30
      }
    };

    onAddBusiness(newBusiness);
    setSuccess(true);
    
    // reset form fields
    setName('');
    setDescription('');
    setPhone('');
    setAddress('');
    setImageUrl('');

    setTimeout(() => {
      setSuccess(false);
    }, 5000);
  };

  return (
    <div className="w-full max-w-xl mx-auto bg-white/5 border border-white/10 rounded-[28px] p-6 md:p-8 relative overflow-hidden">
      
      {/* Decorative gradient glowing ball inside the form card */}
      <div className="absolute top-0 right-0 w-44 h-44 bg-gradient-to-tr from-cyan-500/20 to-purple-500/10 rounded-full blur-2xl pointer-events-none"></div>

      <div className="relative z-10 space-y-6">
        
        {/* Header segment of the claim form */}
        <div className="border-b border-zinc-900/40 pb-4">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 to-violet-600 flex items-center justify-center text-white mb-3.5 shadow-md">
            <Store className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-xl font-extrabold text-white leading-tight font-sans">
            {t.addBusinessTitle}
          </h2>
          <p className="text-xs text-zinc-400 mt-1.5 leading-relaxed">
            {t.addBusinessSubtitle}
          </p>
        </div>

        {/* Action success alert container */}
        <AnimatePresence>
          {success && (
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="p-4 bg-emerald-950/40 border border-emerald-500/20 text-emerald-400 rounded-2xl flex items-start gap-2.5"
            >
              <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold font-sans">Saku Maku Host Success!</h4>
                <p className="text-[11px] text-emerald-400/80 mt-0.5 leading-relaxed">
                  {t.successMsg}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Input submission Form fields elements */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs font-medium">
          
          <div className="space-y-1.5">
            <label className="text-zinc-450 font-bold block">{t.formBizName}</label>
            <input
              type="text"
              placeholder="e.g. Al-Chills Specialty Lounge"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-[#020205]/45 hover:bg-[#020205]/85 text-white p-3 rounded-xl border border-white/10 focus:outline-none focus:border-blue-400"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            
            <div className="space-y-1.5">
              <label className="text-zinc-455 font-bold block">{t.formCategory}</label>
              <div className="relative">
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-[#020205]/45 hover:bg-[#020205]/85 text-white p-3 rounded-xl border border-white/10 focus:outline-none focus:border-blue-400 appearance-none cursor-pointer"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.icon} {cat.name[currentLang]}
                    </option>
                  ))}
                </select>
                <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none">
                  <ChevronDown className="w-4 h-4" />
                </div>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-zinc-455 font-bold block">{t.formGov}</label>
              <div className="relative">
                <select
                  value={governorate}
                  onChange={(e) => setGovernorate(e.target.value as GovernorateCode)}
                  className="w-full bg-[#020205]/45 hover:bg-[#020205]/85 text-white p-3 rounded-xl border border-white/10 focus:outline-none focus:border-blue-400 appearance-none cursor-pointer"
                >
                  {GOVERNORATES.filter(g => g.code !== 'all').map((gov) => (
                    <option key={gov.code} value={gov.code}>
                      {gov.name[currentLang]}
                    </option>
                  ))}
                </select>
                <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none">
                  <ChevronDown className="w-4 h-4" />
                </div>
              </div>
            </div>

          </div>

          <div className="space-y-1.5">
            <label className="text-zinc-455 font-bold block">{t.formPhone}</label>
            <div className="relative">
              <input
                type="tel"
                placeholder="e.g. +9647701234567"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-[#100%] bg-[#020205]/45 hover:bg-[#020205]/85 text-white p-3 pl-10 rounded-xl border border-white/10 focus:outline-none focus:border-blue-400 font-mono"
              />
              <Phone className="w-3.5 h-3.5 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-zinc-455 font-bold block">{t.formAddress}</label>
            <div className="relative">
              <input
                type="text"
                placeholder="e.g. Karada Inside, near old library"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full bg-[#020205]/45 hover:bg-[#020205]/85 text-white p-3 pl-10 rounded-xl border border-white/10 focus:outline-none focus:border-blue-400"
                required
              />
              <Navigation className="w-3.5 h-3.5 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-zinc-455 font-bold block">{t.formImage}</label>
            <div className="relative">
              <input
                type="url"
                placeholder="e.g. https://images.unsplash.com/... (optional)"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="w-full bg-[#020205]/45 hover:bg-[#020205]/85 text-white p-3 pl-10 rounded-xl border border-white/10 focus:outline-none focus:border-blue-400 font-mono"
              />
              <Image className="w-3.5 h-3.5 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-zinc-455 font-bold block">{t.formDesc}</label>
            <textarea
              placeholder="Tell our youth why they should visit. Mention menu specialties or music ambiance!"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-[#020205]/45 hover:bg-[#020205]/85 text-white p-3 rounded-xl border border-white/10 focus:outline-none focus:border-blue-400 leading-relaxed"
              required
            ></textarea>
          </div>

          {/* Submit Trigger */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-violet-600 via-purple-600 to-pink-500 hover:from-violet-500 hover:to-pink-400 text-white text-xs font-black shadow-lg shadow-violet-500/10 cursor-pointer"
          >
            {t.btnSubmit}
          </motion.button>

        </form>

      </div>

    </div>
  );
}
