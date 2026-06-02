import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Store, CheckCircle, ArrowRight, ArrowLeft, Phone, MapPin, Sparkles, Navigation, Link, Globe } from 'lucide-react';
import { Language, GovernorateCode, Business } from '../types';
import { GOVERNORATES, CATEGORIES } from '../data';

interface BusinessOnboardingProps {
  currentLang: Language;
  userId: string;
  userName: string;
  userEmail: string;
  onSubmitOnboarding: (data: {
    name: string;
    category: string;
    governorate: GovernorateCode;
    address: string;
    phone: string;
    whatsApp: string;
    logo: string;
    coverImage: string;
    description: string;
    facebook?: string;
    instagram?: string;
  }) => Promise<void>;
  onCancel: () => void;
}

export default function BusinessOnboarding({
  currentLang,
  userId,
  userName,
  userEmail,
  onSubmitOnboarding,
  onCancel
}: BusinessOnboardingProps) {
  const [step, setStep] = useState(1);
  const totalSteps = 4;

  // Form Field State
  const [name, setName] = useState('');
  const [category, setCategory] = useState('coffee');
  const [governorate, setGovernorate] = useState<GovernorateCode>('baghdad');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [whatsApp, setWhatsApp] = useState('');
  const [logo, setLogo] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [description, setDescription] = useState('');
  const [facebook, setFacebook] = useState('');
  const [instagram, setInstagram] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const isRtl = currentLang === 'ar' || currentLang === 'ku';

  // Preset lifestyle visual selections for owners
  const coverPresets = [
    { name: 'Elegant Specialty Coffee', url: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1000&auto=format&fit=crop&q=80' },
    { name: 'Cinematic Fine Dining', url: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=1000&auto=format&fit=crop&q=80' },
    { name: 'Chic Beauty Lounge & Spa', url: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=1000&auto=format&fit=crop&q=80' },
    { name: 'Modern Wellness Gym', url: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1000&auto=format&fit=crop&q=80' },
    { name: 'Boutique Commercial Store', url: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1000&auto=format&fit=crop&q=80' }
  ];

  const logoPresets = [
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80'
  ];

  const nextStep = () => {
    if (step === 1 && !name.trim()) {
      setError(currentLang === 'en' ? 'Business identity title is required.' : 'اسم النشاط التجاري مطلوب.');
      return;
    }
    if (step === 2 && (!address.trim() || !phone.trim())) {
      setError(currentLang === 'en' ? 'Detailed address and phone are critical for Iraqi customers.' : 'العنوان ورقم الهاتف مطلوبين لتسهيل التواصل مع الزبائن.');
      return;
    }
    setError('');
    setStep(prev => Math.min(prev + 1, totalSteps));
  };

  const prevStep = () => {
    setError('');
    setStep(prev => Math.max(prev - 1, 1));
  };

  const handleFinish = async () => {
    if (!description.trim()) {
      setError(currentLang === 'en' ? 'Please provide a short social summary/bio of your spot.' : 'يرجى كتابة وصف قصير لجذب الزوار.');
      return;
    }

    setLoading(true);
    setError('');

    const finalLogo = logo || logoPresets[0];
    const finalCover = coverImage || coverPresets[0].url;

    try {
      await onSubmitOnboarding({
        name: name.trim(),
        category,
        governorate,
        address: address.trim(),
        phone: phone.trim(),
        whatsApp: whatsApp.trim() || phone.trim(),
        logo: finalLogo,
        coverImage: finalCover,
        description: description.trim(),
        facebook: facebook.trim(),
        instagram: instagram.trim()
      });
    } catch (err: any) {
      setError(err?.message || 'Error executing spot registration.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-[#131215] border border-luxury-gold/30 rounded-[32px] overflow-hidden shadow-2xl relative text-white" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Absolute glow atmosphere effects */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-[#0F2E2F]/20 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#FF6B4A]/5 rounded-full blur-[100px] pointer-events-none"></div>

      {/* Progress header bar */}
      <div className="h-2 bg-zinc-900 w-full flex">
        {Array.from({ length: totalSteps }).map((_, idx) => (
          <div
            key={idx}
            className={`h-full flex-1 transition-all duration-500 ${
              idx + 1 <= step ? 'bg-gradient-to-r from-luxury-teal to-luxury-gold' : 'bg-transparent'
            }`}
          ></div>
        ))}
      </div>

      <div className="p-6 sm:p-10 space-y-6 relative z-10">
        
        {/* Step Indicator & Header Title */}
        <div className="flex items-center justify-between border-b border-white/5 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-luxury-gold/10 rounded-xl flex items-center justify-center border border-luxury-gold/20">
              <Store className="w-5 h-5 text-luxury-gold" />
            </div>
            <div>
              <span className="text-[10px] text-luxury-gold font-bold tracking-widest block uppercase font-mono">
                {currentLang === 'en' ? `Step ${step} of ${totalSteps}` : `الخطوة ${step} من ${totalSteps}`}
              </span>
              <h2 className="text-base sm:text-lg font-black tracking-tight mt-0.5">
                {step === 1 && (currentLang === 'en' ? 'Launch Your Local Spotlight' : 'هوية مصلحتك التجارية')}
                {step === 2 && (currentLang === 'en' ? 'Contact & Navigation Rules' : 'التواصل والعنوان بالعراق')}
                {step === 3 && (currentLang === 'en' ? 'Brand Visual Layout' : 'المظهر الخارجي والصور')}
                {step === 4 && (currentLang === 'en' ? 'Description & Engagement links' : 'التفاصيل وروابط السوشيال ميديا')}
              </h2>
            </div>
          </div>
          <button
            onClick={onCancel}
            className="text-xs font-bold text-zinc-400 hover:text-white transition px-3 py-1.5 rounded-lg bg-white/5 cursor-pointer"
          >
            {currentLang === 'en' ? 'Exit Builder' : 'إلغاء'}
          </button>
        </div>

        {error && (
          <div className="p-4 rounded-xl bg-red-950/40 border border-red-550/30 text-xs text-red-200 animate-shake">
            ⚠️ {error}
          </div>
        )}

        {/* Dynamic step form inputs */}
        <div className="min-h-[240px]">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: isRtl ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: isRtl ? 20 : -20 }}
                className="space-y-4"
              >
                <div>
                  <label className="text-xs font-extrabold text-[#C8A95F] block mb-2 uppercase tracking-wide">
                    {currentLang === 'en' ? 'Business Title (Name)' : 'اسم كافيهك أو صالونك أو متجرك'}
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      setError('');
                    }}
                    placeholder={currentLang === 'en' ? 'e.g. Damascus Jasmine Cafe' : 'مثال: كافيه ياسمين الشام'}
                    className="w-full bg-white/5 border border-white/10 focus:border-luxury-gold/60 focus:outline-none rounded-xl text-xs px-4 py-3 text-white placeholder-zinc-500 font-semibold"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-extrabold text-[#C8A95F] block mb-2 uppercase tracking-wide">
                      {currentLang === 'en' ? 'Local Category' : 'الفئة أو النشاط'}
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full bg-zinc-900 border border-white/10 rounded-xl text-xs px-4 py-3 text-white focus:outline-none focus:border-luxury-gold"
                    >
                      {CATEGORIES.map(cat => (
                        <option key={cat.id} value={cat.id}>{cat.name[currentLang]}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-extrabold text-[#C8A95F] block mb-2 uppercase tracking-wide">
                      {currentLang === 'en' ? 'Iraqi Governorate' : 'المحافظة العراقية'}
                    </label>
                    <select
                      value={governorate}
                      onChange={(e) => setGovernorate(e.target.value as GovernorateCode)}
                      className="w-full bg-zinc-900 border border-white/10 rounded-xl text-xs px-4 py-3 text-white focus:outline-none focus:border-luxury-gold"
                    >
                      {GOVERNORATES.filter(g => g.code !== 'all').map(g => (
                        <option key={g.code} value={g.code}>{g.name[currentLang]}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: isRtl ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: isRtl ? 20 : -20 }}
                className="space-y-4"
              >
                <div>
                  <label className="text-xs font-extrabold text-[#C8A95F] block mb-2 uppercase tracking-wide">
                    {currentLang === 'en' ? 'Detailed High-street Address' : 'العنوان التفصيلي الدقيق'}
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3.5 top-3.5 w-4 h-4 text-luxury-gold" />
                    <input
                      type="text"
                      required
                      value={address}
                      onChange={(e) => {
                        setAddress(e.target.value);
                        setError('');
                      }}
                      placeholder={currentLang === 'en' ? 'Baghdad, Karrada Inside, near Kahramana square' : 'بغداد، الكرادة داخل، قرب ساحة كهرمانة'}
                      className="w-full bg-white/5 border border-white/10 focus:border-luxury-gold/60 focus:outline-none rounded-xl text-xs pl-10 pr-4 py-3.5 text-white placeholder-zinc-500 font-semibold"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-extrabold text-[#C8A95F] block mb-2 uppercase tracking-wide">
                      {currentLang === 'en' ? 'Primary Phone Number' : 'رقم الهاتف للتواصل'}
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => {
                        setPhone(e.target.value);
                        setError('');
                      }}
                      placeholder="+964 770 123 4567"
                      className="w-full bg-white/5 border border-white/10 focus:border-luxury-gold/60 focus:outline-none rounded-xl text-xs px-4 py-3 text-white placeholder-zinc-500 font-semibold text-left"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-extrabold text-[#C8A95F] block mb-2 uppercase tracking-wide">
                      {currentLang === 'en' ? 'WhatsApp (Optional)' : 'رقم الواتساب للعروض المتواصلة'}
                    </label>
                    <input
                      type="tel"
                      value={whatsApp}
                      onChange={(e) => setWhatsApp(e.target.value)}
                      placeholder="+964 770 123 4567"
                      className="w-full bg-white/5 border border-white/10 focus:border-luxury-gold/60 focus:outline-none rounded-xl text-xs px-4 py-3 text-white placeholder-zinc-500 font-semibold text-left"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: isRtl ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: isRtl ? 20 : -20 }}
                className="space-y-4"
              >
                <div>
                  <label className="text-xs font-extrabold text-[#C8A95F] block mb-2 uppercase tracking-wide">
                    {currentLang === 'en' ? 'Select or Input Logo/Profile URL' : 'صورة الشعار أو الهوية'}
                  </label>
                  <input
                    type="url"
                    value={logo}
                    onChange={(e) => setLogo(e.target.value)}
                    placeholder="https://images.unsplash.com/... (optional)"
                    className="w-full bg-white/5 border border-white/10 focus:border-luxury-gold/60 focus:outline-none rounded-xl text-xs px-4 py-3 text-white placeholder-zinc-500 font-semibold"
                  />
                  <div className="flex gap-2.5 mt-2 overflow-x-auto pb-1 max-w-full">
                    {logoPresets.map((preset, pIdx) => (
                      <button
                        key={pIdx}
                        type="button"
                        onClick={() => setLogo(preset)}
                        className={`w-10 h-10 rounded-full border overflow-hidden shrink-0 transition ${
                          logo === preset ? 'border-luxury-gold border-2 scale-105' : 'border-zinc-700 opacity-60'
                        }`}
                      >
                        <img src={preset} alt="preset-logo" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-extrabold text-[#C8A95F] block mb-2 uppercase tracking-wide">
                    {currentLang === 'en' ? 'Perfect Cover Photo Preset Selection' : 'صورة الغلاف للمتجر (اختر من الصور الفخمة بالأسفل أو ضع رابطاً)'}
                  </label>
                  <input
                    type="url"
                    value={coverImage}
                    onChange={(e) => setCoverImage(e.target.value)}
                    placeholder="https://images.unsplash.com/... (optional)"
                    className="w-full bg-white/5 border border-white/10 focus:border-luxury-gold/60 focus:outline-none rounded-xl text-xs px-4 py-3 text-white placeholder-zinc-500 font-semibold mb-3.5"
                  />
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {coverPresets.map((preset, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setCoverImage(preset.url)}
                        className={`relative rounded-xl overflow-hidden h-14 border text-left cursor-pointer group transition ${
                          coverImage === preset.url ? 'border-luxury-gold border-2 scale-102 bg-luxury-gold/10' : 'border-zinc-800 opacity-70 hover:opacity-100'
                        }`}
                      >
                        <img src={preset.url} alt="preset cover" className="absolute inset-0 w-full h-full object-cover pointer-events-none group-hover:scale-105 transition-transform" />
                        <div className="absolute inset-0 bg-black/50 p-1 flex items-end">
                          <span className="text-[7.5px] leading-tight font-bold text-white truncate max-w-full">{preset.name}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: isRtl ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: isRtl ? 20 : -20 }}
                className="space-y-4"
              >
                <div>
                  <label className="text-xs font-extrabold text-[#C8A95F] block mb-2 uppercase tracking-wide">
                    {currentLang === 'en' ? 'Social Pitch / Description line' : 'وصف مصلحتك لجذب الشباب والمستكشفين'}
                  </label>
                  <textarea
                    required
                    value={description}
                    onChange={(e) => {
                      setDescription(e.target.value);
                      setError('');
                    }}
                    rows={3}
                    placeholder={currentLang === 'en' ? 'Describe the vibe, specialty and cool elements of your space...' : 'اكتب عن تميز كافيهك، أفضل الأكلات، الديكور والأجواء الرائعة...'}
                    className="w-full bg-white/5 border border-white/10 focus:border-luxury-gold/60 focus:outline-none rounded-xl text-xs px-4 py-3 text-white placeholder-zinc-500 font-semibold leading-relaxed"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-extrabold text-[#C8A95F] block mb-1 uppercase tracking-wide">
                      {currentLang === 'en' ? 'Instagram Username' : 'رابط إنستغرام (اختياري)'}
                    </label>
                    <input
                      type="text"
                      value={instagram}
                      onChange={(e) => setInstagram(e.target.value)}
                      placeholder="@cafe_jasmine"
                      className="w-full bg-white/5 border border-white/10 focus:border-luxury-gold/60 focus:outline-none rounded-xl text-xs px-4 py-3 text-white placeholder-zinc-500 font-semibold"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-extrabold text-[#C8A95F] block mb-1 uppercase tracking-wide">
                      {currentLang === 'en' ? 'Facebook Page' : 'رابط فيسبوك (اختياري)'}
                    </label>
                    <input
                      type="text"
                      value={facebook}
                      onChange={(e) => setFacebook(e.target.value)}
                      placeholder="facebook.com/cafe_jasmine"
                      className="w-full bg-white/5 border border-white/10 focus:border-luxury-gold/60 focus:outline-none rounded-xl text-xs px-4 py-3 text-white placeholder-zinc-500 font-semibold"
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Action button triggers */}
        <div className="flex items-center justify-between border-t border-white/5 pt-6 mt-4">
          <button
            onClick={prevStep}
            disabled={step === 1 || loading}
            className={`px-5 py-3 border border-white/10 text-xs font-bold uppercase tracking-wider rounded-xl transition cursor-pointer flex items-center gap-2 ${
              step === 1 ? 'opacity-40 cursor-not-allowed' : 'hover:bg-white/5 hover:border-white/20'
            }`}
          >
            <ArrowLeft className="w-4 h-4" /> {currentLang === 'en' ? 'Previous' : 'السابق'}
          </button>

          {step < totalSteps ? (
            <button
              onClick={nextStep}
              className="px-6 py-3 bg-[#FF6B4A] hover:bg-orange-600 text-[#1A1A1A] text-xs font-black uppercase tracking-wider rounded-xl transition cursor-pointer flex items-center gap-2 shadow-lg hover:scale-102 active:scale-95"
            >
              {currentLang === 'en' ? 'Next Stage' : 'التالي'} <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleFinish}
              disabled={loading}
              className="px-7 py-3.5 bg-gradient-to-r from-luxury-teal to-luxury-gold text-white text-xs font-black uppercase tracking-wider rounded-xl transition cursor-pointer flex items-center gap-2.5 shadow-xl hover:scale-103 active:scale-95 disabled:opacity-50"
            >
              {loading ? (
                <span>Launching...</span>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-white shrink-0 animate-bounce" />
                  <span>{currentLang === 'en' ? 'Deploy Live Space! 🎉' : 'انشر مشروعك حالاً! 🎉'}</span>
                </>
              )}
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
