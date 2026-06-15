import fs from "node:fs";

function read(path) {
  return fs.readFileSync(path, "utf8");
}

function write(path, content) {
  fs.writeFileSync(path, content, "utf8");
  console.log("fixed:", path);
}

function replaceOrWarn(path, before, after, label) {
  let content = read(path);
  if (!content.includes(before)) {
    console.warn("MISS:", path, label);
    return;
  }
  content = content.replace(before, after);
  write(path, content);
}

/**
 * 1) Hide public Admin tab.
 */
{
  const path = "src/App.tsx";
  let content = read(path);

  content = content.replace(
`<p className="text-zinc-400 text-sm">Ã˜Â§Ã˜Â®Ã˜ÂªÃ˜Â± Ã™â€žÃ˜ÂºÃ˜ÂªÃ™Æ’ / Ã˜Â²Ã™â€¦Ã˜Â§Ã™â€ Ã›â€¢ÃšÂ©Ã›â€¢Ã˜Âª Ã™â€¡Ã›â€¢ÃšÂµÃ˜Â¨ÃšËœÃ›Å½Ã˜Â±Ã›â€¢</p>
          <button onClick={() => chooseLanguage('ar')} className="w-full py-3 rounded-2xl bg-gradient-to-r from-luxury-teal to-luxury-gold text-white font-black cursor-pointer">Ã˜Â§Ã™â€žÃ˜Â¹Ã˜Â±Ã˜Â¨Ã™Å Ã˜Â©</button>
          <button onClick={() => chooseLanguage('ku')} className="w-full py-3 rounded-2xl bg-gradient-to-r from-luxury-teal to-luxury-gold text-white font-black cursor-pointer">ÃšÂ©Ã™Ë†Ã˜Â±Ã˜Â¯Ã›Å’</button>`,
`<p className="text-zinc-400 text-sm">اختر لغتك / زمانەکەت هەڵبژێرە</p>
          <button onClick={() => chooseLanguage('ar')} className="w-full py-3 rounded-2xl bg-gradient-to-r from-luxury-teal to-luxury-gold text-white font-black cursor-pointer">العربية</button>
          <button onClick={() => chooseLanguage('ku')} className="w-full py-3 rounded-2xl bg-gradient-to-r from-luxury-teal to-luxury-gold text-white font-black cursor-pointer">کوردی</button>`
  );

  const adminButtonRegex = /(\s*)<button\s+onClick=\{\(\) => setActiveTab\('admin'\)\}[\s\S]*?id="nav-tab-admin"[\s\S]*?<\/button>/m;
  const match = content.match(adminButtonRegex);

  if (match && !content.includes("{isAdmin && (\n" + match[0].trimStart().slice(0, 20))) {
    content = content.replace(adminButtonRegex, `$1{isAdmin && (\n${match[0]}\n$1)}`);
  }

  write(path, content);
}

/**
 * 2) Disable fake fallback social posts in production UI.
 */
{
  const path = "src/components/SocialFeed.tsx";
  let content = read(path);

  content = content.replace(
    "import { buildLocalizedSocialPosts, LOCALIZED_SOCIAL_POST_COUNT } from '../data/socialFeedSeed';\n",
    ""
  );

  content = content.replace(
    "  const [generatedPosts] = useState<SocialPost[]>(() => buildLocalizedSocialPosts([]));\n",
    ""
  );

  content = content.replace(
    "  const sourcePosts = posts.length > 0 ? posts : generatedPosts;",
    "  const sourcePosts = posts;"
  );

  content = content.replace(
    "{posts.length > 0 ? `${posts.length} ${t.backendLoaded}` : `${LOCALIZED_SOCIAL_POST_COUNT} ${t.fallbackLoaded}`}",
    "{`${posts.length} ${t.backendLoaded}`}"
  );

  write(path, content);
}

/**
 * 3) Replace public Add Business form with clean UTF-8 version.
 */
{
  const path = "src/components/AddBusinessForm.tsx";

  const clean = `import React, { useState } from 'react';
import { Business, GovernorateCode, Language, UserProfile, SocialPost } from '../types';
import { CATEGORIES, GOVERNORATES } from '../data';
import { api } from '../api';

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

const AddBusinessForm: React.FC<AddBusinessFormProps> = ({ currentLang, user, onSignIn }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [mediaUrl, setMediaUrl] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0]?.id || 'restaurant');
  const [governorate, setGovernorate] = useState<GovernorateCode>('baghdad');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: 'idle' | 'success' | 'error'; message: string }>({
    type: 'idle',
    message: ''
  });

  const canSubmit = name.trim() && address.trim() && phone.trim();

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
      await api.post('/business-submissions', {
        name: name.trim(),
        description: description.trim(),
        address: address.trim(),
        phone: phone.trim(),
        category,
        governorate,
        media_url: mediaUrl.trim(),
        source: 'add_business_form'
      });

      setStatus({
        type: 'success',
        message: label(
          currentLang,
          'Request sent. Admin will review it before publishing.',
          'تم إرسال الطلب. سيقوم المشرف بمراجعته قبل النشر.',
          'داواکاری نێردرا. بەڕێوەبەر پێش بڵاوکردنەوە پێداچوونەوەی بۆ دەکات.'
        )
      });

      setName('');
      setDescription('');
      setAddress('');
      setPhone('');
      setMediaUrl('');
    } catch (error: any) {
      setStatus({
        type: 'error',
        message: error?.message || label(
          currentLang,
          'Failed to submit business.',
          'فشل إرسال النشاط التجاري.',
          'ناردنی بازرگانی شکستی هێنا.'
        )
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white border border-luxury-teal/20 rounded-2xl p-5 md:p-7 shadow-sm" dir={currentLang === 'en' ? 'ltr' : 'rtl'}>
      {!user ? (
        <div className="text-center py-8 space-y-4">
          <h2 className="text-xl font-black text-luxury-bg">
            {label(currentLang, 'Sign in required', 'تسجيل الدخول مطلوب', 'چوونەژوورەوە پێویستە')}
          </h2>
          <p className="text-zinc-600 text-sm">
            {label(currentLang, 'Please sign in to add your business.', 'يرجى تسجيل الدخول لإضافة نشاطك التجاري.', 'تکایە بچۆ ژوورەوە بۆ زیادکردنی بازرگانییەکەت.')}
          </p>
          <button type="button" onClick={onSignIn} className="px-5 py-2.5 bg-luxury-teal text-white rounded-lg font-bold">
            {label(currentLang, 'Sign in', 'تسجيل الدخول', 'چوونەژوورەوە')}
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <h2 className="text-2xl font-black text-luxury-bg">
            {label(currentLang, 'Register Your Business', 'سجّل نشاطك التجاري', 'بازرگانییەکەت تۆمار بکە')}
          </h2>

          <div className="text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
            {label(
              currentLang,
              'Your request will be reviewed before publishing.',
              'سيتم مراجعة طلبك قبل النشر.',
              'داواکارییەکەت پێش بڵاوکردنەوە پێداچوونەوەی بۆ دەکرێت.'
            )}
          </div>

          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder={label(currentLang, 'Business name', 'اسم النشاط التجاري', 'ناوی بازرگانی')}
            className="w-full px-4 py-2.5 border border-zinc-300 rounded-lg"
            required
          />

          <textarea
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder={label(currentLang, 'Description', 'الوصف', 'وەسف')}
            className="w-full px-4 py-2.5 border border-zinc-300 rounded-lg min-h-[110px]"
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
            placeholder={label(currentLang, 'Phone number', 'رقم الهاتف', 'ژمارەی تەلەفۆن')}
            className="w-full px-4 py-2.5 border border-zinc-300 rounded-lg"
            required
          />

          <input
            value={mediaUrl}
            onChange={(event) => setMediaUrl(event.target.value)}
            placeholder={label(currentLang, 'Image URL optional', 'رابط الصورة اختياري', 'لینکی وێنە ئارەزوومەندانە')}
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

          {status.message && (
            <div className={\`text-sm rounded-lg px-3 py-2 \${status.type === 'success' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-red-50 text-red-800 border border-red-200'}\`}>
              {status.message}
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !canSubmit}
            className="w-full py-3 rounded-xl bg-luxury-teal disabled:opacity-60 text-white font-black"
          >
            {loading
              ? label(currentLang, 'Sending...', 'جارٍ الإرسال...', 'دەنێردرێت...')
              : label(currentLang, 'Submit for Review', 'إرسال للمراجعة', 'ناردن بۆ پێداچوونەوە')}
          </button>
        </form>
      )}
    </div>
  );
};

export default AddBusinessForm;
`;

  write(path, clean);
}

console.log("Public launch fix pack applied.");
