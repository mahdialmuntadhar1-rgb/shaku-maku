import React, { useState } from 'react';
import { Business, GovernorateCode, Language, UserProfile, SocialPost } from '../types';
import { CATEGORIES, GOVERNORATES } from '../data';
import { api } from '../api';
import { safeLocalizedText } from '../utils/stringUtils';

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
  const localized = (value: unknown, fallback = '') => safeLocalizedText(value, currentLang, fallback);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!user) {
      onSignIn();
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
      const cleanMediaUrl = mediaUrl.trim();
      const fallbackImage = cleanMediaUrl || 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&auto=format&fit=crop&q=80';

      if (!isAdmin) {
        await api.post('/business-submissions', {
          name: cleanName,
          description: cleanDesc,
          address: cleanAddress,
          phone: cleanPhone,
          category,
          governorate,
          media_url: cleanMediaUrl,
          source: 'add_business_form'
        });

        setStatus({
          type: 'success',
          message: label(
            currentLang,
            'Request sent. Admin will review it before publishing.',
            '\u062a\u0645 \u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u0637\u0644\u0628. \u0633\u064a\u0642\u0648\u0645 \u0627\u0644\u0645\u0634\u0631\u0641 \u0628\u0645\u0631\u0627\u062c\u0639\u062a\u0647 \u0642\u0628\u0644 \u0627\u0644\u0646\u0634\u0631.',
            '\u062f\u0627\u0648\u0627\u06a9\u0627\u0631\u06cc \u0646\u06ce\u0631\u062f\u0631\u0627. \u0628\u06d5\u0695\u06ce\u0648\u06d5\u0628\u06d5\u0631 \u067e\u06ce\u0634 \u0628\u06b5\u0627\u0648\u06a9\u0631\u062f\u0646\u06d5\u0648\u06d5 \u067e\u06ce\u062f\u0627\u0686\u0648\u0648\u0646\u06d5\u0648\u06d5\u06cc \u0628\u06c6 \u062f\u06d5\u06a9\u0627\u062a.'
          )
        });

        setName('');
        setDescription('');
        setAddress('');
        setPhone('');
        setMediaUrl('');
        return;
      }

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
        message: error?.message || label(currentLang, 'Failed to submit business.', 'فشل إرسال النشاط.', 'ناردنی بازرگانی شکستی هێنا.')
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
              {label(currentLang, 'You are signed in. Your request will be sent for admin review before publishing.', '\u0623\u0646\u062a \u0645\u0633\u062c\u0644 \u0627\u0644\u062f\u062e\u0648\u0644. \u0633\u064a\u062a\u0645 \u0625\u0631\u0633\u0627\u0644 \u0637\u0644\u0628\u0643 \u0644\u0644\u0645\u0631\u0627\u062c\u0639\u0629 \u0645\u0646 \u0627\u0644\u0645\u0634\u0631\u0641 \u0642\u0628\u0644 \u0627\u0644\u0646\u0634\u0631.', '\u0686\u0648\u0648\u06cc\u062a\u06d5 \u0698\u0648\u0648\u0631\u06d5\u0648\u06d5. \u062f\u0627\u0648\u0627\u06a9\u0627\u0631\u06cc\u06cc\u06d5\u06a9\u06d5\u062a \u0628\u06c6 \u067e\u06ce\u062f\u0627\u0686\u0648\u0648\u0646\u06d5\u0648\u06d5\u06cc \u0628\u06d5\u0695\u06ce\u0648\u06d5\u0628\u06d5\u0631 \u062f\u06d5\u0646\u06ce\u0631\u062f\u0631\u06ce\u062a \u067e\u06ce\u0634 \u0628\u06b5\u0627\u0648\u06a9\u0631\u062f\u0646\u06d5\u0648\u06d5.')}
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
                  {localized(item.name, item.id)}
                </option>
              ))}
            </select>
            <select value={governorate} onChange={(event) => setGovernorate(event.target.value as GovernorateCode)} className="w-full px-4 py-2.5 border border-zinc-300 rounded-lg">
              {GOVERNORATES.filter((item) => item.code !== 'all').map((item) => (
                <option key={item.code} value={item.code}>
                  {localized(item.name, item.englishLabel)}
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
            disabled={!canSubmit || loading}
            className="w-full py-2.5 rounded-lg bg-luxury-teal text-white font-black disabled:opacity-60"
          >
            {loading
              ? label(currentLang, 'Saving...', '\u062c\u0627\u0631\u064a \u0627\u0644\u062d\u0641\u0638...', '\u067e\u0627\u0634\u06d5\u06a9\u06d5\u0648\u062a\u06a9\u0631\u062f\u0646...')
              : isAdmin
                ? label(currentLang, 'Save Business', '\u062d\u0641\u0638 \u0627\u0644\u0646\u0634\u0627\u0637', '\u067e\u0627\u0634\u06d5\u06a9\u06d5\u0648\u062a\u06a9\u0631\u062f\u0646\u06cc \u0628\u0627\u0632\u0631\u06af\u0627\u0646\u06cc')
                : label(currentLang, 'Send Request for Review', '\u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u0637\u0644\u0628 \u0644\u0644\u0645\u0631\u0627\u062c\u0639\u0629', '\u0646\u0627\u0631\u062f\u0646\u06cc \u062f\u0627\u0648\u0627\u06a9\u0627\u0631\u06cc \u0628\u06c6 \u067e\u06ce\u062f\u0627\u0686\u0648\u0648\u0646\u06d5\u0648\u06d5')}
          </button>
        </form>
      )}
    </div>
  );
};

export default AddBusinessForm;

