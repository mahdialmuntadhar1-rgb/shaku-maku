import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, Lock, Mail, User, Shield, Sparkles, AlertCircle, Key, 
  Eye, EyeOff, CheckCircle2, Award, ArrowRight, ArrowLeft
} from 'lucide-react';
import { Language, UserProfile } from '../types';
import { 
  registerUser, 
  loginUser, 
  requestPasswordReset, 
  confirmPasswordReset 
} from '../shakuAuth';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLang: Language;
  onCustomEmailLogin: (email: string) => void;
  onAuthSuccess?: (userProfile: UserProfile) => void;
  onPasswordReset?: (email: string) => void;
}

export default function AuthModal({
  isOpen,
  onClose,
  currentLang,
  onCustomEmailLogin,
  onAuthSuccess,
  onPasswordReset
}: AuthModalProps) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showForgot, setShowForgot] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [role, setRole] = useState<'user' | 'owner'>('user');

  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  if (!isOpen) return null;

  const isRtl = currentLang === 'ar' || currentLang === 'ku';

  // Translation Strings
  const L = {
    en: {
      title_login: "Access Saku Maku Portal",
      title_signup: "Create Saku Maku Account",
      desc_login: "Log in with your email or social credentials to personalize listings, post updates, and chat with merchants.",
      desc_signup: "Join Iraq's fastest-growing hyper-local business discovery directory and community index.",
      email: "Email Address",
      email_placeholder: "e.g., ali@gmail.com",
      pwd: "Password",
      pwd_placeholder: "Minimum 6 characters",
      name: "Full Name",
      name_placeholder: "e.g., Ali Al-Baghdadi",
      role_label: "Register Account As",
      explorer: "Active Explorer (Visitor)",
      explorer_desc: "Discover businesses, write reviews, and save spots.",
      merchant: "Local Merchant (Business Owner)",
      merchant_desc: "Add your shop, post stories, and receive claims.",
      google_btn: "Sign In with Gmail / Google",
      submit_login: "Login to Account",
      submit_signup: "Register & Onboard",
      create_prompt: "First time here? Create an account",
      login_prompt: "Already have an account? Sign in",
      preset_title: "Quick Sandbox Testing Presets",
      preset_desc: "Use these preset credentials to test full Admin, Merchant, and Explorer features instantly inside the safe iframe environment:",
      preset_admin: "Admin Account (Mahdi)",
      preset_owner: "Specialty Business Owner",
      preset_explorer: "Standard Client Viewer",
      or: "or",
      loading: "Processing secure request...",
      success_registered: "Account registered successfully! Welcome to Saku Maku.",
      success_logged: "Welcome back! Login successful.",
      forgot_pwd: "Forgot password?",
      forgot_title: "Reset Password",
      forgot_desc: "Enter your email and we'll send you a reset link.",
      forgot_btn: "Send Reset Link",
      forgot_success: "Reset link sent! Check your email inbox.",
      back_login: "Back to login",
      firebase_disabled: "Firebase Auth is not enabled. Please go to Firebase Console > Authentication > Sign-in method, then enable 'Email/Password' and 'Google' providers."
    },
    ar: {
      title_login: "الدخول لمنصة شكو ماكو",
      title_signup: "إنشاء حساب جديد",
      desc_login: "سجّل الدخول ببريدك الإلكتروني لحفظ الأماكن المفضلة ونشر المنشورات والتواصل مع أصحاب المصالح.",
      desc_signup: "انضم إلى الدليل التجاري العراقي والمنصة الأسرع نمواً للتواصل الاجتماعي والأعمال.",
      email: "البريد الإلكتروني",
      email_placeholder: "مثال: ali@gmail.com",
      pwd: "كلمة المرور",
      pwd_placeholder: "لا تقل عن 6 أحرف",
      name: "الاسم الكامل",
      name_placeholder: "مثال: علي البغدادي",
      role_label: "التسجيل كـ",
      explorer: "مستكشف نشط (زائر)",
      explorer_desc: "تصفح المتاجر، واكتب مراجعات، واحفظ مصلحتك المفضلة.",
      merchant: "صاحب مصلحة / متجر محلي",
      merchant_desc: "أضف متجرك الخاص، وانشر عروض الحافلة، ووثّق علامتك.",
      google_btn: "الدخول باستخدام حساب Google / جوميل",
      submit_login: "تسجيل الدخول",
      submit_signup: "إنشاء حساب وبدء الاستخدام",
      create_prompt: "ليس لديك حساب؟ سجل حساباً مجانياً الآن",
      login_prompt: "لديك حساب بالفعل؟ سجل دخولك",
      preset_title: "حسابات تجريبية سريعة ومباشرة",
      preset_desc: "اضغط لتجربة المنصة فوراً برتب مختلفة من دون الحاجة لإدخال بيانات أو كلمات مرور:",
      preset_admin: "حساب المدير العام (مهدي المستشار)",
      preset_owner: "حساب صاحب محل تجاري ومقاهي",
      preset_explorer: "حساب زائر ومستكشف عراقي",
      or: "أو",
      loading: "جاري معالجة الطلب بأمان...",
      success_registered: "تم إنشاء الحساب بنجاح! أهلاً بك في منصة شكو ماكو.",
      success_logged: "أهلاً ومرحباً بك مجدداً! تم تسجيل الدخول.",
      forgot_pwd: "نسيت كلمة المرور؟",
      forgot_title: "إعادة تعيين كلمة المرور",
      forgot_desc: "أدخل بريدك الإلكتروني وسنرسل لك رابط إعادة التعيين.",
      forgot_btn: "إرسال رابط التعيين",
      forgot_success: "تم إرسال رابط التعيين! تفقد بريدك الإلكتروني.",
      back_login: "العودة لتسجيل الدخول",
      firebase_disabled: "لم يتم تفعيل مصادقة Firebase. يرجى الذهاب إلى Firebase Console > Authentication > Sign-in method، ثم تفعيل مزودي 'Email/Password' و 'Google'."
    },
    ku: {
      title_login: "چوونەژوور بۆ شەکو مەکو",
      title_signup: "تۆمارکردنی ئەکاونتی نوێ",
      desc_login: "بچۆ ژوورەوە بە ئیمەیڵەکەت یان ئەکاونتەکانت بۆ پاشکۆکردنی شوێنەکان و ڕاوبۆچوونەکانت.",
      desc_signup: "ببە بە ئەندام لە خێراترین تۆڕی دۆزینەوەی شوێنە بازرگانییەکان و فرۆشگاکانی عێراق.",
      email: "ناونیشانی ئیمەیڵ",
      email_placeholder: "بۆ نموونە: ali@gmail.com",
      pwd: "وشەی تێپەڕ",
      pwd_placeholder: "کەمتر نەبێت لە 6 پیت",
      name: "ناوی تەواو",
      name_placeholder: "بۆ نموونە: عەلی بەغدادی",
      role_label: "تۆمارکردنی ئەکاونت وەک",
      explorer: "گەڕیدەی چالاک (سەردانکەر)",
      explorer_desc: "فرۆشگاکان بدۆزەرەوە، پۆست بکە و شوێنەکان پاشەکەوت بکە.",
      merchant: "خاوەن کار یان فرۆشگا",
      merchant_desc: "شوێنەکەت زیاد بکە و پۆستی گرنگ بکە.",
      google_btn: "چوونەژوورەوە بە حیسابی Google",
      submit_login: "بچۆ ژوورەوە",
      submit_signup: "تۆمارکردن و دەستپێکردن",
      create_prompt: "ئەکاونتت نییە؟ دروستی بکە",
      login_prompt: "حیسابت هەیە؟ ئێستا بچۆ ژوورەوە",
      preset_title: "ئەکاونتی خێرا بۆ تاقیکردنەوەی خێرا",
      preset_desc: "کلیل لەم ئەکاونتانە بکە بۆ تاقیکردنەوەی ڕاستەوخۆ بەبێ وشەی نهێنی:",
      preset_admin: "ئەکاونتی بەڕێوەبەر (مەهدی)",
      preset_owner: "بینینی خاوەن کار و فرۆشگا",
      preset_explorer: "بەکارهێنەری ئاسایی",
      or: "یان",
      loading: "خەریکە پرۆسێس دەکرێت...",
      success_registered: "ئەکاونتەکەت سەرکەوتووانە دروستکرا! بەخێربێیت.",
      success_logged: "بەخێربێیتەوە! چوونەژوورەوە سەرکەوتوو بوو.",
      forgot_pwd: "وشەی نهێنیت لەبیرکردووە؟",
      forgot_title: "گۆڕینی وشەی نهێنی",
      forgot_desc: "ئیمەیڵەکەت بنووسە و ئێمە لینکی گۆڕینەوەی بۆ دەنێرین.",
      forgot_btn: "لینکی گۆڕینەوە بنێرە",
      forgot_success: "لینکی گۆڕینەوە نێردرا! ئیمەیڵەکەت بپشکۆنە.",
      back_login: "گەڕانەوە بۆ چوونەژوورەوە",
      firebase_disabled: "Firebase Auth چالاک نەکراوە. تکایە بچۆ بۆ Firebase Console > Authentication > Sign-in method، پاشان 'Email/Password' و 'Google' چالاک بکە."
    }
  }[currentLang];

  const handleGoogleClick = async () => {
    setErrorMsg(currentLang === 'en' 
      ? 'Google sign-in is temporarily unavailable. Please use email/password login.' 
      : currentLang === 'ar' 
        ? 'تسجيل الدخول بحساب Google غير متاح مؤقتًا. يرجى استخدام البريد الإلكتروني وكلمة المرور.'
        : 'چوونەژوورەوەی Google بەردەست نییە. تکایە بە ئیمەیڵ و وشەی نهێنی بچۆ ژوورەوە.'
    );
  };

  const handleEmailAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    if (isSignUp && !displayName) {
      setErrorMsg(currentLang === 'en' ? 'Full name is required to sign up' : 'الاسم الكامل مطلوب للتسجيل');
      return;
    }
    if (password.length < 6) {
      setErrorMsg(currentLang === 'en' ? 'Password must be at least 6 characters' : 'يجب أن لا تقل كلمة المرور عن 6 أحرف');
      return;
    }

    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      if (isSignUp) {
        const data = await registerUser(email.trim(), password, displayName.trim(), role);
        const profileDetails: UserProfile = {
          uid: data.user.uid,
          displayName: data.user.displayName,
          photoURL: data.user.photoURL,
          email: data.user.email,
          createdAt: new Date().toISOString(),
          role: (data.user.role as 'user' | 'owner' | 'admin'),
          onboarded: data.user.onboarded,
          businessId: data.user.businessId,
        };
        setSuccessMsg(L.success_registered);
        if (onAuthSuccess) onAuthSuccess(profileDetails);
        setTimeout(() => {
          onClose();
          setSuccessMsg('');
        }, 2000);
      } else {
        const data = await loginUser(email.trim(), password);
        const profileDetails: UserProfile = {
          uid: data.user.uid,
          displayName: data.user.displayName,
          photoURL: data.user.photoURL,
          email: data.user.email,
          createdAt: new Date().toISOString(),
          role: (data.user.role as 'user' | 'owner' | 'admin'),
          onboarded: data.user.onboarded,
          businessId: data.user.businessId,
        };
        setSuccessMsg(L.success_logged);
        if (onAuthSuccess) onAuthSuccess(profileDetails);
        setTimeout(() => {
          onClose();
          setSuccessMsg('');
        }, 1500);
      }
    } catch (err: any) {
      console.error("Auth Failure details: ", err);
      setErrorMsg(err.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');
    try {
      if (onPasswordReset) {
        await onPasswordReset(email.trim());
        setSuccessMsg(L.forgot_success);
      }
    } catch (err: any) {
      console.error("Password reset error: ", err);
      setErrorMsg(err.message || 'Reset request failed');
    } finally {
      setLoading(false);
    }
  };

  const handleSandboxPresetClick = (emailPreset: string) => {
    onCustomEmailLogin(emailPreset);
    setSuccessMsg(L.success_logged);
    setTimeout(() => {
      onClose();
      setSuccessMsg('');
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      {/* Dark blur glass backdrop */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/85 backdrop-blur-xl"
      />

      {/* Auth visual card container */}
      <motion.div
        initial={{ scale: 0.95, y: 15, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.95, y: 15, opacity: 0 }}
        className="relative bg-[#1A1A1F] border border-luxury-gold/30 rounded-3xl w-full max-w-lg p-5 sm:p-8 overflow-hidden shadow-2xl z-[1000] text-left text-white font-medium"
      >
        {/* Glow visuals */}
        <div className="absolute top-[-30%] left-[-30%] w-72 h-72 bg-luxury-teal/15 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-[-30%] right-[-30%] w-72 h-72 bg-luxury-gold/15 rounded-full blur-3xl pointer-events-none"></div>

        {/* Close Button */}
        <button 
          onClick={onClose}
          className={`absolute top-4 ${isRtl ? 'left-4' : 'right-4'} p-2 rounded-full bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition cursor-pointer border border-white/5 z-20`}
        >
          <X className="w-4 h-4" />
        </button>

        <div className="relative space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="mx-auto w-12 h-12 rounded-2xl bg-gradient-to-tr from-luxury-teal to-luxury-gold flex items-center justify-center text-white shadow-lg border border-white/10">
              <Key className="w-5 h-5 text-white" />
            </div>
            
            <h2 className="text-lg xs:text-xl font-black bg-gradient-to-r from-luxury-gold to-white bg-clip-text text-transparent mt-3">
              {showForgot ? L.forgot_title : (isSignUp ? L.title_signup : L.title_login)}
            </h2>
            <p className="text-[11px] sm:text-xs text-zinc-400 max-w-sm mx-auto leading-relaxed">
              {showForgot ? L.forgot_desc : (isSignUp ? L.desc_signup : L.desc_login)}
            </p>
          </div>

          {/* Feedback messages */}
          {errorMsg && (
            <motion.div 
              initial={{ opacity: 0, y: -5 }} 
              animate={{ opacity: 1, y: 0 }}
              className="p-3.5 bg-red-950/40 border border-red-500/20 rounded-xl text-xs text-red-300 flex items-start gap-2.5 text-left"
            >
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <span className="leading-normal font-semibold">{errorMsg}</span>
            </motion.div>
          )}

          {successMsg && (
            <motion.div 
              initial={{ opacity: 0, y: -5 }} 
              animate={{ opacity: 1, y: 0 }}
              className="p-3.5 bg-emerald-950/40 border border-emerald-500/20 rounded-xl text-xs text-emerald-300 flex items-start gap-2.5 text-left"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span className="leading-normal font-semibold">{successMsg}</span>
            </motion.div>
          )}

          {/* Real Auth form with email / password */}
          <form onSubmit={showForgot ? handleForgotPassword : handleEmailAuthSubmit} className="space-y-4">
            
            {/* Display Name on Sign Up */}
            {isSignUp && (
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-black text-luxury-gold/80 tracking-wider block font-mono">
                  {L.name}
                </label>
                <div className="relative flex items-center">
                  <User className="absolute left-3.5 w-4 h-4 text-zinc-500" />
                  <input
                    type="text"
                    required
                    placeholder={L.name_placeholder}
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    className="w-full bg-black/40 border border-white/15 focus:border-luxury-gold/50 text-xs pl-10 pr-4 py-3 rounded-xl text-white placeholder-zinc-500 focus:outline-none transition font-semibold"
                  />
                </div>
              </div>
            )}

            {/* Email Address */}
            <div className="space-y-1">
              <label className="text-[10px] uppercase font-black text-luxury-gold/80 tracking-wider block font-mono">
                {L.email}
              </label>
              <div className="relative flex items-center">
                <Mail className="absolute left-3.5 w-4 h-4 text-zinc-500" />
                <input
                  type="email"
                  required
                  placeholder={L.email_placeholder}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-black/40 border border-white/15 focus:border-luxury-gold/50 text-xs pl-10 pr-4 py-3 rounded-xl text-white placeholder-zinc-500 focus:outline-none transition font-semibold"
                />
              </div>
            </div>

            {/* Password - hidden in forgot mode */}
            {!showForgot && (
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-black text-luxury-gold/80 tracking-wider block font-mono">
                  {L.pwd}
                </label>
                <div className="relative flex items-center">
                  <Lock className="absolute left-3.5 w-4 h-4 text-zinc-500" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder={L.pwd_placeholder}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-black/40 border border-white/15 focus:border-luxury-gold/50 text-xs pl-10 pr-10 py-3 rounded-xl text-white placeholder-zinc-500 focus:outline-none transition font-semibold"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 text-zinc-500 hover:text-white transition cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {/* Forgot password link */}
                {!isSignUp && (
                  <div className={`text-right mt-1 ${isRtl ? 'text-left' : ''}`}>
                    <button
                      type="button"
                      onClick={() => {
                        setShowForgot(true);
                        setErrorMsg('');
                        setSuccessMsg('');
                      }}
                      className="text-[10px] text-luxury-gold/70 hover:text-luxury-gold transition cursor-pointer font-semibold"
                    >
                      {L.forgot_pwd}
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* If Sign Up, let them choose a role context beautifully */}
            {isSignUp && !showForgot && (
              <div className="space-y-1.5 pt-1">
                <label className="text-[10px] uppercase font-black text-luxury-gold/80 tracking-wider block font-mono">
                  {L.role_label}
                </label>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {/* Explorer option */}
                  <div
                    onClick={() => setRole('user')}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between text-left relative overflow-hidden ${
                      role === 'user'
                        ? 'bg-luxury-teal/15 border-luxury-teal'
                        : 'bg-black/20 border-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm">🧭</span>
                      <span className="text-[11px] font-black">{L.explorer}</span>
                    </div>
                    <p className="text-[9px] text-zinc-400 font-sans tracking-tight leading-normal">
                      {L.explorer_desc}
                    </p>
                  </div>

                  {/* Merchant Owner Option */}
                  <div
                    onClick={() => setRole('owner')}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between text-left relative overflow-hidden ${
                      role === 'owner'
                        ? 'bg-amber-500/10 border-amber-500'
                        : 'bg-black/20 border-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm">🏢</span>
                      <span className="text-[11px] font-black text-amber-400">{L.merchant}</span>
                    </div>
                    <p className="text-[9px] text-zinc-400 font-sans tracking-tight leading-normal">
                      {L.merchant_desc}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Email Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-gradient-to-r from-luxury-teal via-[#1E4143] to-luxury-gold hover:opacity-90 text-white font-black text-xs uppercase tracking-wider rounded-xl transition duration-300 shadow-xl cursor-pointer text-center font-mono border border-white/10 disabled:opacity-50"
            >
              {loading ? L.loading : (showForgot ? L.forgot_btn : (isSignUp ? L.submit_signup : L.submit_login))}
            </button>

            {/* Back to login link when in forgot mode */}
            {showForgot && (
              <div className="text-center">
                <button
                  type="button"
                  onClick={() => {
                    setShowForgot(false);
                    setErrorMsg('');
                    setSuccessMsg('');
                  }}
                  className="text-[11px] font-black text-luxury-gold hover:underline cursor-pointer tracking-wide uppercase"
                >
                  {L.back_login}
                </button>
              </div>
            )}
          </form>

          {/* OR separator - hidden in forgot mode */}
          {!showForgot && (
            <div className="flex items-center gap-3 py-1">
              <div className="flex-grow h-[1px] bg-white/10"></div>
              <span className="text-[10px] uppercase font-black tracking-widest text-zinc-500 font-mono">{L.or}</span>
              <div className="flex-grow h-[1px] bg-white/10"></div>
            </div>
          )}

          {/* Social Google/Gmail Login button - hidden in forgot mode */}
          {!showForgot && (
          <button
            onClick={handleGoogleClick}
            disabled={loading}
            className="w-full py-3.5 bg-[#25252C] hover:bg-[#31313A] border border-white/15 hover:border-white/25 rounded-xl text-xs text-white font-black uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2.5"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#EA4335"
                d="M12 5.04c1.66 0 3.2.57 4.38 1.69l3.27-3.27C17.67 1.48 14.97 1 12 1 7.39 1 3.42 3.63 1.42 7.42l3.87 3C6.24 7.62 8.87 5.04 12 5.04z"
              />
              <path
                fill="#4285F4"
                d="M23.45 12.3c0-.82-.07-1.6-.2-2.3H12v4.4h6.43c-.28 1.44-1.1 2.67-2.33 3.5l3.6 2.8c2.1-1.94 3.75-4.8 3.75-8.4z"
              />
              <path
                fill="#FBBC05"
                d="M5.29 14.36c-.25-.72-.39-1.5-.39-2.36s.14-1.64.39-2.36L1.42 6.64C.51 8.47 0 10.5 0 12.6s.51 4.13 1.42 5.96l3.87-3.2c-.25-.72-.39-1.5-.39-2.36z"
              />
              <path
                fill="#34A853"
                d="M12 23c3.24 0 5.97-1.07 7.96-2.9l-3.6-2.8c-1.1.74-2.5 1.18-4.36 1.18-3.13 0-5.76-2.58-6.71-6.38l-3.87 3C3.42 20.37 7.39 23 12 23z"
              />
            </svg>
            <span>{L.google_btn}</span>
          </button>
          )}

          {/* Toggle login vs signup - hidden in forgot mode */}
          {!showForgot && (
          <div className="text-center">
            <button
              onClick={() => {
                setIsSignUp(!isSignUp);
                setErrorMsg('');
                setSuccessMsg('');
              }}
              className="text-[11px] font-black text-luxury-gold hover:underline cursor-pointer tracking-wide uppercase"
            >
              {isSignUp ? L.login_prompt : L.create_prompt}
            </button>
          </div>
          )}

          {/* Safe testing bypass sandbox accounts within iframe - hidden in forgot mode */}
          {!showForgot && (
          <div className="p-4 bg-white/5 border border-white/10 rounded-2xl text-left space-y-2 mt-2">
            <h4 className="text-[10px] font-extrabold text-amber-400 uppercase tracking-widest flex items-center gap-1.5 font-mono">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>{L.preset_title}</span>
            </h4>
            <p className="text-[9px] text-zinc-400 leading-normal">
              {L.preset_desc}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5 pt-1">
              <button
                type="button"
                onClick={() => handleSandboxPresetClick('mahdialmuntadhar1@gmail.com')}
                className="px-2 py-1.5 bg-red-950/40 hover:bg-red-900/50 border border-red-500/20 text-red-200 text-[9px] font-black rounded-lg transition-all text-center cursor-pointer font-mono"
              >
                🛠️ Admin Panel
              </button>
              <button
                type="button"
                onClick={() => handleSandboxPresetClick('owner@shkomaku.com')}
                className="px-2 py-1.5 bg-amber-950/40 hover:bg-amber-900/55 border border-amber-500/25 text-amber-200 text-[9px] font-black rounded-lg transition-all text-center cursor-pointer font-mono"
              >
                🏢 Shop Owner
              </button>
              <button
                type="button"
                onClick={() => handleSandboxPresetClick('visitor@shkomaku.com')}
                className="px-2 py-1.5 bg-blue-950/45 hover:bg-blue-900/50 border border-blue-500/20 text-sky-200 text-[9px] font-black rounded-lg transition-all text-center cursor-pointer font-mono"
              >
                🧭 Explorer User
              </button>
            </div>
          </div>
          )}

        </div>
      </motion.div>
    </div>
  );
}
