/**
 * Rebuilds corrupt ar: and ku: TRANSLATIONS values with clean Arabic/Kurdish text.
 * Scans every key=value line in the ar: and ku: TRANSLATIONS blocks,
 * maps them by key name, and replaces with known-good strings.
 */
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'src', 'data.ts');

// ── Known-good Arabic translations (keyed by field name) ─────────────────────
const AR = {
  appName: 'شكو ماكو',
  appSlogan: 'محرك اكتشاف الأماكن والشركات في العراق بروح اجتماعية عصرية ✨',
  searchPlaceholder: 'ابحث عن كافيه، مطعم، صالون تجميل...',
  allIraq: 'كل العراق 🇮🇶',
  allCategories: 'الكل',
  heroBadge: 'استكشف العراق 🚀',
  ctaDiscover: 'استكشف الآن',
  exploreMore: 'استكشف المزيد',
  viewAll: 'عرض الكل',
  reviews: 'تقييمات',
  verified: 'موثق',
  trending: 'رائج',
  topRated: 'الأعلى تقييماً',
  newSpot: 'مكان جديد',
  likes: 'إعجاب',
  saves: 'حفظ',
  share: 'مشاركة',
  comment: 'تعليق',
  addComment: 'إضافة تعليق...',
  postedBy: 'بواسطة',
  exploreFeed: 'نبض الشارع (الفيد الجذاب)',
  exploreTab: 'استكشاف الأماكن',
  mapTab: 'خريطة المحليات',
  addBusinessTab: 'أضف عملك مجاناً',
  aboutTab: 'كل شيء عنا',
  addBusinessTitle: 'انضم لشكو ماكو وسوّق لعملك مجاناً! 🎯',
  addBusinessSubtitle: 'وصّل عملك لآلاف الشباب ومحبي الاستكشاف في محافظتك وبأجواء تيك توك وإنستغرام.',
  formBizName: 'اسم العمل التجاري',
  formCategory: 'فئة العمل',
  formGov: 'المحافظة',
  formPhone: 'رقم الهاتف للتواصل',
  formAddress: 'عنوان العمل التفصيلي',
  formDesc: 'صف عملك بطريقة تجذب الشباب والمستكشفين',
  formImage: 'رابط صورة اللاندسكيب (اختياري)',
  btnSubmit: 'انشر عملك الآن على شكو ماكو 🎉',
  successMsg: 'تم نشر مشروعك بنجاح! سيظهر فوراً في الأقسام المحددة.',
  specialOffer: 'عرض خاص',
  address: 'العنوان',
  phone: 'الهاتف',
  category: 'الفئة',
  noResults: 'لا توجد نتائج',
  loading: 'جارٍ التحميل...',
  error: 'حدث خطأ',
  close: 'إغلاق',
  save: 'حفظ',
  cancel: 'إلغاء',
  edit: 'تعديل',
  delete: 'حذف',
  confirm: 'تأكيد',
  back: 'رجوع',
  next: 'التالي',
  previous: 'السابق',
  search: 'بحث',
  filter: 'تصفية',
  sortBy: 'ترتيب حسب',
  rating: 'التقييم',
  distance: 'المسافة',
  newest: 'الأحدث',
  popular: 'الأكثر شعبية',
  open: 'مفتوح',
  closed: 'مغلق',
  openNow: 'مفتوح الآن',
  viewOnMap: 'عرض على الخريطة',
  callNow: 'اتصل الآن',
  shareLocation: 'مشاركة الموقع',
  addReview: 'إضافة تقييم',
  writeReview: 'اكتب تقييمك',
  submitReview: 'إرسال التقييم',
  reviewPlaceholder: 'شارك تجربتك مع هذا المكان...',
  noReviews: 'لا توجد تقييمات بعد. كن أول من يقيّم!',
  loginRequired: 'يجب تسجيل الدخول',
  loginToReview: 'سجّل دخولك لإضافة تقييم',
  loginToSave: 'سجّل دخولك لحفظ المكان',
  loginToLike: 'سجّل دخولك للإعجاب',
  profile: 'الملف الشخصي',
  logout: 'تسجيل الخروج',
  login: 'تسجيل الدخول',
  signup: 'إنشاء حساب',
  email: 'البريد الإلكتروني',
  password: 'كلمة المرور',
  forgotPassword: 'نسيت كلمة المرور؟',
  resetPassword: 'إعادة تعيين كلمة المرور',
  noAccount: 'ليس لديك حساب؟',
  hasAccount: 'لديك حساب بالفعل؟',
  welcomeBack: 'مرحباً بعودتك',
  createAccount: 'إنشاء حساب جديد',
  fullName: 'الاسم الكامل',
  username: 'اسم المستخدم',
  bio: 'نبذة شخصية',
  city: 'المدينة',
  joinDate: 'تاريخ الانضمام',
  posts: 'المنشورات',
  followers: 'المتابعون',
  following: 'يتابع',
  savedPlaces: 'الأماكن المحفوظة',
  myReviews: 'تقييماتي',
  settings: 'الإعدادات',
  language: 'اللغة',
  notifications: 'الإشعارات',
  privacy: 'الخصوصية',
  help: 'المساعدة',
  about: 'حول التطبيق',
  terms: 'الشروط والأحكام',
  contactUs: 'تواصل معنا',
  reportIssue: 'الإبلاغ عن مشكلة',
  version: 'الإصدار',
  noPostsYet: 'لا توجد منشورات بعد',
  beFirst: 'كن أول من يشارك تجربته!',
  postNow: 'انشر الآن',
  addPhoto: 'إضافة صورة',
  addCaption: 'إضافة تعليق...',
  postPlaceholder: 'شارك تجربتك في هذا المكان الرائع...',
  tagPlace: 'تحديد المكان',
  tagBusiness: 'تحديد العمل التجاري',
  postSuccess: 'تم نشر المنشور بنجاح!',
  deletePost: 'حذف المنشور',
  confirmDelete: 'هل أنت متأكد من الحذف؟',
  yes: 'نعم',
  no: 'لا',
};

// ── Known-good Kurdish translations ──────────────────────────────────────────
const KU = {
  appName: 'شکو ماکو',
  appSlogan: 'ئەنجینی دۆزینەوەی شوێن و کاروبار لە عێراق بە روحێکی کۆمەڵایەتی سەردەمیانە ✨',
  searchPlaceholder: 'بگەڕێ بۆ کافێ، چێشتخانە، سالۆنی ئاراستەکردن...',
  allIraq: 'هەموو عێراق 🇮🇶',
  allCategories: 'هەموو',
  heroBadge: 'عێراق بدۆزەرەوە 🚀',
  ctaDiscover: 'ئێستا بیدۆزەرەوە',
  exploreMore: 'زیاتر بدۆزەرەوە',
  viewAll: 'هەمووی ببینە',
  reviews: 'هەڵسەنگاندنەکان',
  verified: 'دروستکراوە',
  trending: 'ترێند',
  topRated: 'باشترین نمرە',
  newSpot: 'شوێنی نوێ',
  likes: 'حەزکردن',
  saves: 'پاشکەوتکردن',
  share: 'هاوبەشکردن',
  comment: 'کۆمێنت',
  addComment: 'کۆمێنت زیاد بکە...',
  postedBy: 'لەلایەن',
  exploreFeed: 'نەبزی کوچە (فیدی کێشاوە)',
  exploreTab: 'دۆزینەوەی شوێنەکان',
  mapTab: 'نەخشەی ناوچەکان',
  addBusinessTab: 'کارەکەت بەخۆڕایی زیاد بکە',
  aboutTab: 'هەموو شتێک دەربارەمان',
  addBusinessTitle: 'بەشداری شکو ماکو بکە و کارەکەت بەخۆڕایی بگەیەنە خەڵکی 🎯',
  addBusinessSubtitle: 'کارەکەت بگەیەنە بە هەزاران کەسی گەنج و کەسانی حەزکاری دۆزینەوە لە پارێزگاکەت.',
  formBizName: 'ناوی کاروباری',
  formCategory: 'جۆری کاروبار',
  formGov: 'پارێزگا',
  formPhone: 'ژمارەی تەلەفۆن بۆ پەیوەندی',
  formAddress: 'ناونیشانی تەواوی کاروبار',
  formDesc: 'کاروبارەکەت وەصف بکە بەشێوەیەک کە گەنجان ڕاکێشێت',
  formImage: 'لینکی وێنەی لاندسکیپ (ئارەزووی)',
  btnSubmit: 'ئێستا کاروبارەکەت لە شکو ماکو بڵاو بکەرەوە 🎉',
  successMsg: 'پڕۆژەکەت بەسەرکەوتوویی بڵاوکرایەوە! یەکسەر لە بەشەکانی دیاریکراو دەردەکەوێت.',
  specialOffer: 'پێشکەشکردنی تایبەت',
  address: 'ناونیشان',
  phone: 'تەلەفۆن',
  category: 'جۆر',
  noResults: 'ئەنجامێک نەدۆزرایەوە',
  loading: 'چاوەڕوان بە...',
  error: 'هەڵەیەک ڕوویدا',
  close: 'داخستن',
  save: 'پاشکەوتکردن',
  cancel: 'هەڵوەشاندنەوە',
  edit: 'دەستکاری',
  delete: 'سڕینەوە',
  confirm: 'پشتڕاستکردنەوە',
  back: 'گەڕانەوە',
  next: 'دواتر',
  previous: 'پێشتر',
  search: 'گەڕان',
  filter: 'فلتەر',
  sortBy: 'ڕیزکردن بەپێی',
  rating: 'هەڵسەنگاندن',
  distance: 'دووری',
  newest: 'نوێترین',
  popular: 'بەناوبانگترین',
  open: 'کراوەیە',
  closed: 'داخراوە',
  openNow: 'ئێستا کراوەیە',
  viewOnMap: 'لە نەخشەدا ببینە',
  callNow: 'ئێستا پەیوەندی بکە',
  shareLocation: 'شوێنەکە هاوبەش بکە',
  addReview: 'هەڵسەنگاندن زیاد بکە',
  writeReview: 'هەڵسەنگاندنەکەت بنووسە',
  submitReview: 'هەڵسەنگاندن بنێرە',
  reviewPlaceholder: 'ئەزموونەکەت لەگەڵ ئەم شوێنە هاوبەش بکە...',
  noReviews: 'هیچ هەڵسەنگاندنێک نییە. یەکەمین بە!',
  loginRequired: 'داخلبوون پێویستە',
  loginToReview: 'داخل ببە بۆ زیادکردنی هەڵسەنگاندن',
  loginToSave: 'داخل ببە بۆ پاشکەوتکردنی شوێنەکە',
  loginToLike: 'داخل ببە بۆ حەزکردن',
  profile: 'پرۆفایل',
  logout: 'چوونەدەرەوە',
  login: 'داخلبوون',
  signup: 'ئەکاونت درووست بکە',
  email: 'ئیمەیل',
  password: 'وشەی نهێنی',
  forgotPassword: 'وشەی نهێنیت لەبیرچووە؟',
  resetPassword: 'وشەی نهێنی نوێ بکەرەوە',
  noAccount: 'ئەکاونتت نییە؟',
  hasAccount: 'پێشتر ئەکاونتت هەیە؟',
  welcomeBack: 'بەخێربێیتەوە',
  createAccount: 'ئەکاونتی نوێ درووست بکە',
  fullName: 'ناوی تەواو',
  username: 'ناوی بەکارهێنەر',
  bio: 'دەربارەی خۆت',
  city: 'شار',
  joinDate: 'بەرواری بەشداربوون',
  posts: 'پۆستەکان',
  followers: 'شوێنکەوتووەکان',
  following: 'شوێنی دەکەوێت',
  savedPlaces: 'شوێنە پاشکەوتکراوەکان',
  myReviews: 'هەڵسەنگاندنەکانم',
  settings: 'ڕێکخستنەکان',
  language: 'زمان',
  notifications: 'ئاگادارکردنەوەکان',
  privacy: 'تایبەتمەندی',
  help: 'یارمەتی',
  about: 'دەربارەی ئەپ',
  terms: 'مەرج و بەندەکان',
  contactUs: 'پەیوەندیمان پێوە بکە',
  reportIssue: 'کێشەیەک ڕاپۆرت بکە',
  version: 'وەشان',
  noPostsYet: 'هیچ پۆستێک نییە هێشتا',
  beFirst: 'یەکەمین بە کە ئەزموونەکەت هاوبەش بکەیت!',
  postNow: 'ئێستا بڵاو بکەرەوە',
  addPhoto: 'وێنە زیاد بکە',
  addCaption: 'کۆمێنت زیاد بکە...',
  postPlaceholder: 'ئەزموونەکەت لەم شوێنە شایستەدا هاوبەش بکە...',
  tagPlace: 'شوێن دیاری بکە',
  tagBusiness: 'کاروبار دیاری بکە',
  postSuccess: 'پۆستەکە بەسەرکەوتوویی بڵاوکرایەوە!',
  deletePost: 'پۆستەکە بسڕەوە',
  confirmDelete: 'دڵنیایت لە سڕینەوە؟',
  yes: 'بەڵێ',
  no: 'نەخێر',
};

// ── Read file ─────────────────────────────────────────────────────────────────
const content = fs.readFileSync(filePath, 'utf8');
const lines = content.split('\n');

function isGarbled(str) {
  if (!str) return false;
  // Latin-1 supplement (double-encoded Arabic lead bytes: Ø Ù Û Ú Ã Â)
  if (/[\u00C0-\u00FF]/.test(str)) return true;
  // Unicode replacement chars
  if (/[\uFFFD\uFFFE\uFFFF]/.test(str)) return true;
  // ASCII control chars
  if (/[\x00-\x08\x0E-\x1F\x7F]/.test(str)) return true;
  // Arabic char next to suspicious ASCII (f, S, O, ^, ., ?) — garbage mixed chars
  if (/[\u0600-\u06FF][fSO^.?~"]{1,2}|[fSO^.?~"][fSO^.?~"]{0,1}[\u0600-\u06FF]/.test(str)) return true;
  // Starts with garbage
  if (/^[âÂãÃ]/.test(str)) return true;
  // High density of non-Arabic, non-space ASCII in an otherwise Arabic string
  const arabicCount = (str.match(/[\u0600-\u06FF]/g) || []).length;
  const garbageCount = (str.match(/[fSO^.?~"]/g) || []).length;
  if (arabicCount > 0 && garbageCount > arabicCount * 0.3) return true;
  return false;
}

// State tracking
let inTranslations = false;
let currentLangBlock = null; // 'ar' | 'ku' | 'en'
let braceDepth = 0;
let translationsDepth = 0;

const result = [];
let i = 0;

while (i < lines.length) {
  const line = lines[i];

  // Detect entering TRANSLATIONS
  if (line.includes('export const TRANSLATIONS')) {
    inTranslations = true;
    translationsDepth = 0;
    braceDepth = 0;
  }

  if (inTranslations) {
    // Track brace depth to know when we exit
    const opens = (line.match(/\{/g) || []).length;
    const closes = (line.match(/\}/g) || []).length;
    braceDepth += opens - closes;
    if (translationsDepth === 0 && opens > 0) translationsDepth = braceDepth;

    // Detect language block: `  ar: {` or `  ku: {`
    const langMatch = line.match(/^\s+(ar|ku|en):\s*\{/);
    if (langMatch && braceDepth === translationsDepth + 1) {
      currentLangBlock = langMatch[1];
    }
    if (braceDepth <= translationsDepth - 1) {
      inTranslations = false;
      currentLangBlock = null;
    }

    // Fix garbled key: value lines inside ar/ku blocks
    if ((currentLangBlock === 'ar' || currentLangBlock === 'ku') && braceDepth === translationsDepth + 2) {
      const kvMatch = line.match(/^(\s+)(\w+):\s*'(.*?)',?\s*$/);
      if (kvMatch) {
        const indent = kvMatch[1];
        const key = kvMatch[2];
        const val = kvMatch[3];
        if (isGarbled(val)) {
          const dict = currentLangBlock === 'ar' ? AR : KU;
          const fixed = dict[key];
          if (fixed !== undefined) {
            result.push(`${indent}${key}: '${fixed.replace(/'/g, "\\'")}',`);
            i++;
            continue;
          }
          // No mapping — use empty string to avoid syntax error
          result.push(`${indent}${key}: '',`);
          i++;
          continue;
        }
      }
      // Multi-line garbled value — skip until next key
      const kvStart = line.match(/^(\s+)(\w+):\s*'/);
      if (kvStart && isGarbled(line)) {
        const indent = kvStart[1];
        const key = kvStart[2];
        // consume until next key line or closing brace
        while (i < lines.length - 1) {
          i++;
          if (/^\s+\w+:\s*'/.test(lines[i]) || /^\s+\}/.test(lines[i])) break;
        }
        const dict = currentLangBlock === 'ar' ? AR : KU;
        const fixed = dict[key] || '';
        result.push(`${indent}${key}: '${fixed.replace(/'/g, "\\'")}',`);
        continue;
      }
    }
  }

  result.push(line);
  i++;
}

fs.writeFileSync(filePath, result.join('\n'), 'utf8');
console.log(`Done. ${result.length} lines.`);
const verify = fs.readFileSync(filePath, 'utf8').split('\n');
for (let n = 1401; n <= 1415; n++) console.log(`L${n+1}: ${verify[n]}`);
