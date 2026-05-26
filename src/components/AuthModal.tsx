import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Mail, Lock, User, Chrome, Eye, EyeOff, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data';
import { authApi } from '../api';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLang: Language;
  onAuthSuccess: (user: any) => void;
}

export default function AuthModal({ isOpen, onClose, currentLang, onAuthSuccess }: AuthModalProps) {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Check for OAuth error from URL when modal opens
  useEffect(() => {
    if (isOpen) {
      const params = new URLSearchParams(window.location.search);
      const authError = params.get('auth_error');
      if (authError) {
        setError(decodeURIComponent(authError));
        // Clean URL
        window.history.replaceState({}, document.title, window.location.pathname);
      }
    }
  }, [isOpen]);

  const t = TRANSLATIONS[currentLang];
  const isRtl = currentLang === 'ar' || currentLang === 'ku';

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setDisplayName('');
    setError('');
    setSuccess('');
    setShowPassword(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      if (mode === 'login') {
        const result = await authApi.login({ email, password });
        if (result.success) {
          onAuthSuccess(result.user);
          setSuccess(currentLang === 'en' ? 'Welcome back!' : currentLang === 'ku' ? 'بەخێربێیتەوە!' : 'مرحباً بعودتك!');
          setTimeout(() => { onClose(); resetForm(); }, 1000);
        } else {
          setError(result.error || 'Login failed');
        }
      } else {
        if (password.length < 6) {
          setError(currentLang === 'en' ? 'Password must be at least 6 characters' : currentLang === 'ku' ? 'وشەی نهێنی با لای ٦ پیت بێت' : 'كلمة المرور يجب أن تكون 6 أحرف على الأقل');
          setLoading(false);
          return;
        }
        const result = await authApi.signup({ email, password, displayName: displayName || email.split('@')[0] });
        if (result.success) {
          onAuthSuccess(result.user);
          setSuccess(currentLang === 'en' ? 'Account created!' : currentLang === 'ku' ? 'هەژمار دروستکرا!' : 'تم إنشاء الحساب!');
          setTimeout(() => { onClose(); resetForm(); }, 1000);
        } else {
          setError(result.error || 'Signup failed');
        }
      }
    } catch (err: any) {
      setError(err.message || 'Network error. Please try again.');
    }

    setLoading(false);
  };

  const handleGoogle = () => {
    authApi.googleSignIn();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
        onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="w-full max-w-md bg-gradient-to-b from-[#111119] to-[#0a0a0f] border border-white/10 rounded-[28px] p-6 md:p-8 shadow-2xl relative overflow-hidden"
        >
          {/* Decorative glow */}
          <div className="absolute top-0 right-0 w-44 h-44 bg-gradient-to-tr from-blue-500/10 to-purple-500/5 rounded-full blur-2xl pointer-events-none"></div>

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-zinc-500 hover:text-white transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="relative z-10 space-y-6">
            {/* Header */}
            <div className="text-center space-y-1">
              <h2 className="text-xl font-black text-white">
                {mode === 'login'
                  ? (currentLang === 'en' ? 'Welcome Back' : currentLang === 'ku' ? 'بەخێربێیتەوە' : 'مرحباً بعودتك')
                  : (currentLang === 'en' ? 'Create Account' : currentLang === 'ku' ? 'دروستکردنی هەژمار' : 'إنشاء حساب')
                }
              </h2>
              <p className="text-xs text-zinc-400">
                {mode === 'login'
                  ? (currentLang === 'en' ? 'Sign in to post and interact' : currentLang === 'ku' ? 'بچۆ ژوورەوە بۆ بڵاوکردنەوە' : 'سجل دخولك للنشر والتفاعل')
                  : (currentLang === 'en' ? 'Join the Iraq Business community' : currentLang === 'ku' ? 'بەشداربوون لە کۆمەڵگا' : 'انضم إلى مجتمع الأعمال العراقي')
                }
              </p>
            </div>

            {/* Error/Success messages */}
            {error && (
              <div className="p-3 bg-red-950/40 border border-red-500/20 rounded-xl flex items-start gap-2 text-xs text-red-300">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}
            {success && (
              <div className="p-3 bg-emerald-950/40 border border-emerald-500/20 rounded-xl flex items-start gap-2 text-xs text-emerald-300">
                <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{success}</span>
              </div>
            )}

            {/* Google Sign In */}
            <button
              onClick={handleGoogle}
              className="w-full py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white text-xs font-bold flex items-center justify-center gap-2 transition cursor-pointer"
            >
              <Chrome className="w-4 h-4 text-blue-400" />
              <span>{currentLang === 'en' ? 'Continue with Google' : currentLang === 'ku' ? 'بە گووگڵ بەردەوام بە' : 'المتابعة باستخدام Google'}</span>
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-white/10"></div>
              <span className="text-[10px] text-zinc-500 font-bold uppercase">{currentLang === 'en' ? 'or' : currentLang === 'ku' ? 'یان' : 'أو'}</span>
              <div className="flex-1 h-px bg-white/10"></div>
            </div>

            {/* Email/Password Form */}
            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              {mode === 'signup' && (
                <div className="space-y-1">
                  <label className="text-zinc-500 font-bold text-[10px] uppercase block">
                    {currentLang === 'en' ? 'Display Name' : currentLang === 'ku' ? 'ناوی پیشاندراو' : 'الاسم المعروض'}
                  </label>
                  <div className="relative">
                    <User className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      placeholder={currentLang === 'en' ? 'Your name' : currentLang === 'ku' ? 'ناوەکەت' : 'اسمك'}
                      className="w-full bg-black/40 border border-white/15 text-white p-3 pl-10 rounded-xl focus:outline-none focus:border-blue-400 placeholder-zinc-600"
                    />
                  </div>
                </div>
              )}

              <div className="space-y-1">
                <label className="text-zinc-500 font-bold text-[10px] uppercase block">Email</label>
                <div className="relative">
                  <Mail className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                    className="w-full bg-black/40 border border-white/15 text-white p-3 pl-10 rounded-xl focus:outline-none focus:border-blue-400 placeholder-zinc-600"
                    dir="ltr"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-zinc-500 font-bold text-[10px] uppercase block">
                  {currentLang === 'en' ? 'Password' : currentLang === 'ku' ? 'وشەی نهێنی' : 'كلمة المرور'}
                </label>
                <div className="relative">
                  <Lock className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={currentLang === 'en' ? 'Min 6 characters' : currentLang === 'ku' ? 'لای ٦ پیت' : '6 أحرف على الأقل'}
                    required
                    minLength={6}
                    className="w-full bg-black/40 border border-white/15 text-white p-3 pl-10 pr-10 rounded-xl focus:outline-none focus:border-blue-400 placeholder-zinc-600"
                    dir="ltr"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white transition cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 text-white text-xs font-black uppercase tracking-wider shadow-lg transition disabled:opacity-50 cursor-pointer"
              >
                {loading
                  ? (currentLang === 'en' ? 'Please wait...' : currentLang === 'ku' ? 'تکایە چاوەڕوان بە...' : 'يرجى الانتظار...')
                  : mode === 'login'
                    ? (currentLang === 'en' ? 'Sign In' : currentLang === 'ku' ? 'چوونەژوورەوە' : 'تسجيل الدخول')
                    : (currentLang === 'en' ? 'Create Account' : currentLang === 'ku' ? 'دروستکردنی هەژمار' : 'إنشاء حساب')
                }
              </motion.button>
            </form>

            {/* Toggle mode */}
            <div className="text-center text-xs text-zinc-500">
              {mode === 'login' ? (
                <span>
                  {currentLang === 'en' ? "Don't have an account?" : currentLang === 'ku' ? 'هەژمارت نییە؟' : 'ليس لديك حساب؟'}{' '}
                  <button
                    onClick={() => { setMode('signup'); resetForm(); }}
                    className="text-blue-400 hover:text-blue-300 font-bold cursor-pointer"
                  >
                    {currentLang === 'en' ? 'Sign Up' : currentLang === 'ku' ? 'تۆمارکردن' : 'التسجيل'}
                  </button>
                </span>
              ) : (
                <span>
                  {currentLang === 'en' ? 'Already have an account?' : currentLang === 'ku' ? 'پێشتر هەژمارەت هەیە؟' : 'لديك حساب بالفعل؟'}{' '}
                  <button
                    onClick={() => { setMode('login'); resetForm(); }}
                    className="text-blue-400 hover:text-blue-300 font-bold cursor-pointer"
                  >
                    {currentLang === 'en' ? 'Sign In' : currentLang === 'ku' ? 'چوونەژوورەوە' : 'تسجيل الدخول'}
                  </button>
                </span>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
