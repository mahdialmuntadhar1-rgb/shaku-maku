import React, { useState } from 'react';
import { Business, GovernorateCode, Language, UserProfile, SocialPost } from '../types';
import { CATEGORIES, GOVERNORATES } from '../data';

interface AddBusinessFormProps {
  currentLang: Language;
  onAddBusiness: (business: Omit<Business, 'rating' | 'reviewsCount' | 'likes' | 'saves'>) => Promise<void>;
  user: any;
  userProfile: UserProfile | null;
  onUpdateProfile: (updatedFields: Partial<UserProfile>) => Promise<void>;
  onSignIn: () => void;
  businesses: Business[];
  posts: SocialPost[];
}

const label = (lang: Language, en: string, ar: string, ku: string) => {
  if (lang === 'ar') return ar;
  if (lang === 'ku') return ku;
  return en;
};

const AddBusinessForm: React.FC<AddBusinessFormProps> = ({ currentLang, onAddBusiness, user, userProfile, onSignIn }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [mediaUrl, setMediaUrl] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0]?.id || 'restaurants');
  const [governorate, setGovernorate] = useState<GovernorateCode>('baghdad');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: 'idle' | 'success' | 'error'; message: string }>({
    type: 'idle',
    message: ''
  });

  const canSubmit = name.trim() && description.trim() && address.trim() && phone.trim();
  const isAdmin = userProfile?.role === 'admin';

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!user) {
      onSignIn();
      return;
    }
    if (!isAdmin) {
      setStatus({
        type: 'error',
        message: label(currentLang, 'Only admin can publish businesses directly.', 'فقط المشرف يمكنه نشر الأنشطة مباشرة.', 'تەنها بەڕێوەبەر دەتوانێت ڕاستەوخۆ بازرگانی بڵاوبکاتەوە.')
      });
      return;
    }
    if (!canSubmit) return;

    setLoading(true);
    setStatus({ type: 'idle', message: '' });
    try {
      const cleanName = name.trim();
      const cleanDesc = description.trim();
      const cleanAddress = address.trim();
      const cleanPhone = phone.trim();
      const fallbackImage = mediaUrl.trim() || 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&auto=format&fit=crop&q=80';

      await onAddBusiness({
        id: `local-${Date.now()}`,
        name: { ar: cleanName, ku: cleanName, en: cleanName },
        description: { ar: cleanDesc, ku: cleanDesc, en: cleanDesc },
        category,
        governorate,
        image: fallbackImage,
        images: [fallbackImage],
        avatar: fallbackImage,
        isVerified: false,
        phoneNumber: cleanPhone,
        address: { ar: cleanAddress, ku: cleanAddress, en: cleanAddress },
        mapCoords: { x: 0, y: 0 },
        likedByUser: false,
        savedByUser: false
      });

      setStatus({
        type: 'success',
        message: label(currentLang, 'Business saved successfully.', 'تم حفظ النشاط بنجاح.', 'بازرگانی بە سەرکەوتوویی پاشەکەوت کرا.')
      });
      setName('');
      setDescription('');
      setAddress('');
      setPhone('');
      setMediaUrl('');
    } catch (error: any) {
      setStatus({
        type: 'error',
        message: error?.message || label(currentLang, 'Failed to save business.', 'فشل حفظ النشاط.', 'پاشەکەوتکردنی بازرگانی شکستی هێنا.')
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white border border-luxury-teal/20 rounded-2xl p-5 md:p-7 shadow-sm" dir={currentLang === 'en' ? 'ltr' : 'rtl'}>
      {!user ? (
        <div className="text-center py-8 space-y-4">
          <h2 className="text-xl font-black text-luxury-bg">{label(currentLang, 'Sign in required', 'تسجيل الدخول مطلوب', 'چوونەژوورەوە پێویستە')}</h2>
          <p className="text-zinc-600 text-sm">{label(currentLang, 'Please sign in to add your business.', 'يرجى تسجيل الدخول لإضافة نشاطك.', 'تکایە بچۆ ژوورەوە بۆ زیادکردنی بازرگانییەکەت.')}</p>
          <button type="button" onClick={onSignIn} className="px-5 py-2.5 bg-luxury-teal text-white rounded-lg font-bold">
            {label(currentLang, 'Sign in', 'تسجيل الدخول', 'چوونەژوورەوە')}
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <h2 className="text-2xl font-black text-luxury-bg">{label(currentLang, 'Add Business', 'إضافة نشاط جديد', 'زیادکردنی بازرگانی نوێ')}</h2>
          {!isAdmin && (
            <div className="text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
              {label(currentLang, 'You are signed in but only admins can publish businesses from this panel.', 'أنت مسجل الدخول لكن النشر من هذه اللوحة متاح للمشرف فقط.', 'چوویتە ژوورەوە بەڵام بڵاوکردنەوە لەم پانێلەدا تەنها بۆ بەڕێوەبەرە.')}
            </div>
          )}

          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder={label(currentLang, 'Business name', 'اسم النشاط', 'ناوی بازرگانی')}
            className="w-full px-4 py-2.5 border border-zinc-300 rounded-lg"
            required
          />
          <textarea
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder={label(currentLang, 'Description', 'الوصف', 'وەسف')}
            className="w-full px-4 py-2.5 border border-zinc-300 rounded-lg min-h-[110px]"
            required
          />
          <input
            value={address}
            onChange={(event) => setAddress(event.target.value)}
            placeholder={label(currentLang, 'Address', 'العنوان', 'ناونیشان')}
            className="w-full px-4 py-2.5 border border-zinc-300 rounded-lg"
            required
          />
          <input
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            placeholder={label(currentLang, 'Phone number', 'رقم الهاتف', 'ژمارەی تەلەفون')}
            className="w-full px-4 py-2.5 border border-zinc-300 rounded-lg"
            required
          />
          <input
            value={mediaUrl}
            onChange={(event) => setMediaUrl(event.target.value)}
            placeholder={label(currentLang, 'Image URL (optional)', 'رابط الصورة (اختياري)', 'لینکی وێنە (ئارەزوومەندانە)')}
            className="w-full px-4 py-2.5 border border-zinc-300 rounded-lg"
          />

          <div className="grid sm:grid-cols-2 gap-3">
            <select value={category} onChange={(event) => setCategory(event.target.value)} className="w-full px-4 py-2.5 border border-zinc-300 rounded-lg">
              {CATEGORIES.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name[currentLang]}
                </option>
              ))}
            </select>
            <select value={governorate} onChange={(event) => setGovernorate(event.target.value as GovernorateCode)} className="w-full px-4 py-2.5 border border-zinc-300 rounded-lg">
              {GOVERNORATES.filter((item) => item.code !== 'all').map((item) => (
                <option key={item.code} value={item.code}>
                  {item.name[currentLang]}
                </option>
              ))}
            </select>
          </div>

          {status.type !== 'idle' && (
            <div className={`text-sm font-semibold ${status.type === 'success' ? 'text-emerald-700' : 'text-red-700'}`}>
              {status.message}
            </div>
          )}

          <button
            type="submit"
            disabled={!canSubmit || loading || !isAdmin}
            className="w-full py-2.5 rounded-lg bg-luxury-teal text-white font-black disabled:opacity-60"
          >
            {loading ? label(currentLang, 'Saving...', 'جاري الحفظ...', 'پاشەکەوتکردن...') : label(currentLang, 'Save Business', 'حفظ النشاط', 'پاشەکەوتکردنی بازرگانی')}
          </button>
        </form>
      )}
    </div>
  );
};

export default AddBusinessForm;
