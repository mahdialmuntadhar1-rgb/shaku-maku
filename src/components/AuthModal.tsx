import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, Lock, Mail, User, Shield, Sparkles, AlertCircle, Key,
  Eye, EyeOff, CheckCircle2, Award, ArrowRight, ArrowLeft
} from 'lucide-react';
import { Language, UserProfile } from '../types';
import { authApi } from '../api';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLang: Language;
  onCustomEmailLogin: (email: string) => void;
  onAuthSuccess?: (userProfile: UserProfile) => void;
}

export default function AuthModal({
  isOpen,
  onClose,
  currentLang,
  onCustomEmailLogin,
  onAuthSuccess
}: AuthModalProps) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [isForgotPwd, setIsForgotPwd] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deletePassword, setDeletePassword] = useState('');
  const [deleteLoading, setDeleteLoading] = useState(false);
  
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Check for reset token in URL
  const urlParams = new URLSearchParams(window.location.search);
  const resetToken = urlParams.get('reset_token');
  const resetEmail = urlParams.get('email') || '';
  const isResetMode = !!resetToken;

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
      success_logged: "Welcome back! Login successful."
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
      success_logged: "أهلاً ومرحباً بك مجدداً! تم تسجيل الدخول."
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
      success_logged: "بەخێربێیتەوە! چوونەژوورەوە سەرکەوتوو بوو."
    }
  }[currentLang];

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setErrorMsg('');
    try {
      await authApi.forgotPassword(email.trim());
      setSuccessMsg(
        currentLang === 'en' ? 'Reset link sent! Check your inbox (and spam folder).'
        : currentLang === 'ku' ? 'لینکی گۆڕینی پاسوۆرد نێردرا! ئیمەیڵەکەت بپشکنە.'
        : 'تم إرسال رابط الاسترداد! تحقق من بريدك الوارد أو مجلد الرسائل غير المرغوب بها.'
      );
    } catch (err: any) {
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword || newPassword.length < 6 || !resetToken) return;
    setLoading(true);
    setErrorMsg('');
    try {
      await authApi.resetPassword(resetToken, newPassword);
      setSuccessMsg(
        currentLang === 'en' ? 'Password reset! You can now log in with your new password.'
        : currentLang === 'ku' ? 'پاسوۆردەکەت گۆڕدرا! ئێستا بچۆ ژوورەوە.'
        : 'تم إعادة تعيين كلمة المرور! يمكنك الآن تسجيل الدخول.'
      );
      // Clear URL params
      window.history.replaceState({}, '', window.location.pathname);
      setTimeout(() => { setSuccessMsg(''); setIsForgotPwd(false); }, 2500);
    } catch (err: any) {
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleClick = () => {
    setErrorMsg(
      currentLang === 'en'
        ? 'Google Sign-In is not available in this environment. Please use email/password or a sandbox preset below.'
        : currentLang === 'ku'
        ? 'چوونەژوورەوە بە Google ئێستا بەردەست نییە. تکایە ئیمەیل و پاسوۆرد بەکاربێنە.'
        : 'تسجيل الدخول بـ Google غير متاح حالياً. يرجى استخدام البريد الإلكتروني أو الحسابات التجريبية أدناه.'
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
        // Create account with custom API
        const response = await authApi.signup({
          email: email.trim(),
          password: password,
          name: displayName.trim()
        });
        console.log('Signup response:', response);

        const user = (response as any).data?.user || (response as any).user;
        const token = (response as any).data?.token || (response as any).token;
        if (!user || !user.id) {
          throw new Error('Invalid response from server: missing user data');
        }

        const isAdmin = email.trim().toLowerCase() === 'safaribosafar@gmail.com' || email.trim().toLowerCase() === 'mahdialmuntadhar1@gmail.com';
        const profileDetails: UserProfile = {
          uid: user.id,
          displayName: user.name || displayName.trim(),
          photoURL: user.photoURL || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80",
          email: user.email,
          createdAt: new Date().toISOString(),
          role: isAdmin ? 'admin' : 'user',
          onboarded: true,
          businessId: null
        };

        // Store token
        localStorage.setItem('auth_token', token);
        localStorage.setItem('user_profile', JSON.stringify(profileDetails));

        setSuccessMsg(L.success_registered);
        
        if (onAuthSuccess) {
          onAuthSuccess(profileDetails);
        }
        
        setTimeout(() => {
          onClose();
          setSuccessMsg('');
        }, 2000);
      } else {
        // Login flow with custom API
        const response = await authApi.login({
          email: email.trim(),
          password: password
        });
        console.log('Login response:', response);

        const user = (response as any).data?.user || (response as any).user;
        const token = (response as any).data?.token || (response as any).token;
        if (!user || !user.id) {
          throw new Error('Invalid response from server: missing user data');
        }

        const isAdmin = user.email === 'safaribosafar@gmail.com' || user.email === 'mahdialmuntadhar1@gmail.com';
        const profileDetails: UserProfile = {
          uid: user.id,
          displayName: user.name || user.email?.split('@')[0] || 'Explorer User',
          photoURL: user.photoURL || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80",
          email: user.email,
          createdAt: new Date().toISOString(),
          role: isAdmin ? 'admin' : 'user',
          onboarded: false,
          businessId: null
        };

        // Store token
        localStorage.setItem('auth_token', token);
        localStorage.setItem('user_profile', JSON.stringify(profileDetails));

        setSuccessMsg(L.success_logged);
        if (onAuthSuccess) {
          onAuthSuccess(profileDetails);
        }
        
        setTimeout(() => {
          onClose();
          setSuccessMsg('');
        }, 1500);
      }
    } catch (err: any) {
      console.error("Auth Failure details: ", err);
      let localizedErr = err.message;
      if (err.message?.includes('Invalid') || err.message?.includes('credentials')) {
        localizedErr = currentLang === 'en' 
          ? 'Invalid email or incorrect password. Please try again.' 
          : 'البريد الإلكتروني أو كلمة المرور غير صحيحة. يرجى المحاولة ثانية.';
      } else if (err.message?.includes('already exists')) {
        localizedErr = currentLang === 'en'
          ? 'This email address is already registered. Please login instead.'
          : 'هذا البريد الإلكتروني مسجل بالفعل. يرجى اختيار تسجيل الدخول.';
      }
      setErrorMsg(localizedErr);
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
              {isSignUp ? L.title_signup : L.title_login}
            </h2>
            <p className="text-[11px] sm:text-xs text-zinc-400 max-w-sm mx-auto leading-relaxed">
              {isSignUp ? L.desc_signup : L.desc_login}
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
          <form onSubmit={handleEmailAuthSubmit} className="space-y-4">
            
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

            {/* Password */}
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
            </div>

            {/* Forgot Password link (login mode only) */}
            {!isSignUp && (
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => { setIsForgotPwd(true); setErrorMsg(''); setSuccessMsg(''); }}
                  className="text-[10px] text-luxury-gold/70 hover:text-luxury-gold transition cursor-pointer font-semibold"
                >
                  {currentLang === 'en' ? 'Forgot password?' : currentLang === 'ku' ? 'پاسوۆردت بیرچووەتەوە؟' : 'نسيت كلمة المرور؟'}
                </button>
              </div>
            )}

            {/* Email Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-gradient-to-r from-luxury-teal via-[#1E4143] to-luxury-gold hover:opacity-90 text-white font-black text-xs uppercase tracking-wider rounded-xl transition duration-300 shadow-xl cursor-pointer text-center font-mono border border-white/10 disabled:opacity-50"
            >
              {loading ? L.loading : (isSignUp ? L.submit_signup : L.submit_login)}
            </button>
          </form>

          {/* Forgot Password form */}
          {isForgotPwd && !isResetMode && (
            <div className="mt-4 p-4 bg-black/30 border border-luxury-gold/20 rounded-2xl space-y-3">
              <p className="text-xs font-bold text-luxury-gold">
                {currentLang === 'en' ? 'Reset your password' : currentLang === 'ku' ? 'پاسوۆردەکەت بگوهێزە' : 'استعادة كلمة المرور'}
              </p>
              <form onSubmit={handleForgotPassword} className="flex gap-2">
                <input
                  type="email"
                  required
                  placeholder={currentLang === 'en' ? 'Your email address' : currentLang === 'ku' ? 'ئیمەیڵەکەت' : 'بريدك الإلكتروني'}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-black/40 border border-white/15 focus:border-luxury-gold/50 text-xs px-3 py-2.5 rounded-xl text-white placeholder-zinc-500 focus:outline-none font-semibold"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2.5 bg-luxury-gold text-black text-xs font-black rounded-xl disabled:opacity-50 cursor-pointer shrink-0"
                >
                  {loading ? '...' : (currentLang === 'en' ? 'Send' : currentLang === 'ku' ? 'بنێرە' : 'أرسل')}
                </button>
              </form>
              <button onClick={() => setIsForgotPwd(false)} className="text-[10px] text-zinc-500 hover:text-white transition cursor-pointer">
                {currentLang === 'en' ? 'Back to login' : currentLang === 'ku' ? 'گەڕانەوە بۆ چوونەژوور' : 'العودة لتسجيل الدخول'}
              </button>
            </div>
          )}

          {/* Reset Password form (when reset_token in URL) */}
          {isResetMode && (
            <div className="mt-4 p-4 bg-black/30 border border-luxury-gold/20 rounded-2xl space-y-3">
              <p className="text-xs font-bold text-luxury-gold">
                {currentLang === 'en' ? 'Enter your new password' : currentLang === 'ku' ? 'پاسوۆردی نوێت بنووسە' : 'أدخل كلمة المرور الجديدة'}
              </p>
              <form onSubmit={handleResetPassword} className="space-y-3">
                <input
                  type="password"
                  required
                  minLength={6}
                  placeholder={currentLang === 'en' ? 'New password (min 6 chars)' : currentLang === 'ku' ? 'پاسوۆردی نوێ (لانیکەم 6 پیت)' : 'كلمة المرور الجديدة (6 أحرف على الأقل)'}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full bg-black/40 border border-white/15 focus:border-luxury-gold/50 text-xs px-3 py-2.5 rounded-xl text-white placeholder-zinc-500 focus:outline-none font-semibold"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-2.5 bg-luxury-gold text-black text-xs font-black rounded-xl disabled:opacity-50 cursor-pointer"
                >
                  {loading ? '...' : (currentLang === 'en' ? 'Set New Password' : currentLang === 'ku' ? 'پاسوۆردی نوێ دابنێ' : 'تعيين كلمة المرور الجديدة')}
                </button>
              </form>
            </div>
          )}

          {/* Delete account — login mode only */}
          {!isSignUp && !isForgotPwd && !isResetMode && (
            <div className="mt-1">
              {!showDeleteConfirm ? (
                <button
                  type="button"
                  onClick={() => setShowDeleteConfirm(true)}
                  className="text-[10px] text-red-500/50 hover:text-red-400 transition cursor-pointer font-semibold w-full text-center"
                >
                  {currentLang === 'en' ? 'Delete my account' : currentLang === 'ar' ? 'حذف حسابي' : 'ئەکاونتەکەم بسڕەوە'}
                </button>
              ) : (
                <div className="p-3 bg-red-950/30 border border-red-500/20 rounded-xl space-y-2.5">
                  <p className="text-[11px] font-bold text-red-400">
                    {currentLang === 'en' ? '⚠️ This permanently deletes your account.' : currentLang === 'ar' ? '⚠️ سيتم حذف حسابك نهائياً.' : '⚠️ ئەمە بە تەواوی ئەکاونتەکەت دەسڕێتەوە.'}
                  </p>
                  <input
                    type="password"
                    placeholder={currentLang === 'en' ? 'Confirm password to delete' : currentLang === 'ar' ? 'تأكيد كلمة المرور للحذف' : 'پاسوۆرد دڵنیا بکەرەوە'}
                    value={deletePassword}
                    onChange={e => setDeletePassword(e.target.value)}
                    className="w-full bg-black/40 border border-red-500/30 text-xs px-3 py-2 rounded-lg text-white placeholder-zinc-600 focus:outline-none"
                  />
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => { setShowDeleteConfirm(false); setDeletePassword(''); }}
                      className="flex-1 py-2 bg-white/5 hover:bg-white/10 text-zinc-400 text-xs font-bold rounded-lg transition cursor-pointer"
                    >
                      {currentLang === 'en' ? 'Cancel' : currentLang === 'ar' ? 'إلغاء' : 'پاشگەزبوونەوە'}
                    </button>
                    <button
                      type="button"
                      disabled={deleteLoading || !deletePassword}
                      onClick={async () => {
                        if (!email || !deletePassword) return;
                        setDeleteLoading(true);
                        setErrorMsg('');
                        try {
                          const API_BASE = import.meta.env.VITE_API_URL || 'https://iraq-businesses-dashboard.mahdialmuntadhar1.workers.dev';
                          const res = await fetch(`${API_BASE}/api/auth/account`, {
                            method: 'DELETE',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ email: email.trim(), password: deletePassword })
                          });
                          const data = await res.json();
                          if (data.success) {
                            localStorage.removeItem('auth_token');
                            localStorage.removeItem('user_profile');
                            setSuccessMsg(currentLang === 'en' ? 'Account deleted. You can register again.' : currentLang === 'ar' ? 'تم حذف الحساب. يمكنك التسجيل من جديد.' : 'ئەکاونتەکەت سڕایەوە. دەتوانیت دووبارە تۆمار بکەیت.');
                            setTimeout(() => { onClose(); window.location.reload(); }, 2000);
                          } else {
                            setErrorMsg(data.error || 'Delete failed');
                          }
                        } catch { setErrorMsg('Connection error'); }
                        finally { setDeleteLoading(false); }
                      }}
                      className="flex-1 py-2 bg-red-600 hover:bg-red-500 disabled:opacity-50 text-white text-xs font-black rounded-lg transition cursor-pointer"
                    >
                      {deleteLoading ? '...' : (currentLang === 'en' ? 'Delete' : currentLang === 'ar' ? 'حذف' : 'سڕینەوە')}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* OR separator */}
          <div className="flex items-center gap-3 py-1">
            <div className="flex-grow h-[1px] bg-white/10"></div>
            <span className="text-[10px] uppercase font-black tracking-widest text-zinc-500 font-mono">{L.or}</span>
            <div className="flex-grow h-[1px] bg-white/10"></div>
          </div>

          {/* Social Google/Gmail Login button */}
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

          {/* Toggle login vs signup */}
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

          {/* Safe testing bypass sandbox accounts within iframe */}
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

        </div>
      </motion.div>
    </div>
  );
}
