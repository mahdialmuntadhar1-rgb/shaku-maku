import React, { useState } from 'react';
import { X, Mail, Lock, User, AlertCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'signup';
  onAuthSuccess?: (user: any) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, initialMode = 'login', onAuthSuccess }) => {
  const [mode, setMode] = useState<'login' | 'signup' | 'forgot' | 'reset'>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [userType, setUserType] = useState<'business' | 'explorer'>('explorer');
  const [resetToken, setResetToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login, register, forgotPassword, resetPassword } = useAuth();

  if (!isOpen) return null;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    const result = await login(email, password);
    
    if (result.success) {
      if (onAuthSuccess && result.user) {
        onAuthSuccess(result.user);
      }
      onClose();
      resetForm();
    } else {
      setError(result.error || 'فشل تسجيل الدخول. تحقق من بريدك الإلكتروني وكلمة المرور');
    }
    setLoading(false);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    if (password.length < 6) {
      setError('كلمة المرور يجب أن تكون 6 أحرف على الأقل');
      setLoading(false);
      return;
    }
    
    // Prepare user data
    const userData = {
      email,
      password,
      name,
      user_type: userType,
      role: userType === 'business' ? 'merchant' : 'user'
    };
    
    const result = await register(userData);
    
    if (result.success) {
      if (onAuthSuccess && result.user) {
        onAuthSuccess(result.user);
      }
      // Success – close modal and optionally show welcome message
      onClose();
      resetForm();
      // Optional: show a toast notification
      alert(result.message || 'تم إنشاء الحساب بنجاح! مرحباً بك');
    } else {
      setError(result.error || 'فشل إنشاء الحساب. قد يكون البريد الإلكتروني مستخدماً بالفعل');
    }
    setLoading(false);
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');
    
    const result = await forgotPassword(email);
    
    if (result.success) {
      setMessage(result.message);
      if (result.token) {
        setResetToken(result.token);
        setMode('reset');
      } else {
        // If no token returned, stay in forgot mode but show message
        setTimeout(() => {
          setMode('login');
        }, 3000);
      }
    } else {
      setError(result.message);
    }
    setLoading(false);
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    if (newPassword !== confirmPassword) {
      setError('كلمة المرور الجديدة وتأكيدها غير متطابقين');
      setLoading(false);
      return;
    }
    
    if (newPassword.length < 6) {
      setError('كلمة المرور يجب أن تكون 6 أحرف على الأقل');
      setLoading(false);
      return;
    }
    
    const result = await resetPassword(resetToken, newPassword);
    
    if (result.success) {
      setMessage(result.message);
      setTimeout(() => {
        setMode('login');
        resetForm();
      }, 2000);
    } else {
      setError(result.message);
    }
    setLoading(false);
  };

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setName('');
    setUserType('explorer');
    setResetToken('');
    setNewPassword('');
    setConfirmPassword('');
    setError('');
    setMessage('');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
          <X size={24} />
        </button>
        
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            {mode === 'login' && 'سجل الدخول'}
            {mode === 'signup' && 'إنشاء حساب جديد'}
            {mode === 'forgot' && 'نسيت كلمة المرور'}
            {mode === 'reset' && 'إعادة تعيين كلمة المرور'}
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            {mode === 'login' && 'أدخل بريدك الإلكتروني وكلمة المرور'}
            {mode === 'signup' && 'اختر نوع الحساب وأكمل البيانات'}
            {mode === 'forgot' && 'أدخل بريدك الإلكتروني لإعادة تعيين كلمة المرور'}
            {mode === 'reset' && 'أدخل رمز التحقق وكلمة المرور الجديدة'}
          </p>
        </div>
        
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg flex items-center gap-2 text-sm">
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}
        
        {message && (
          <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg text-center text-sm">
            {message}
          </div>
        )}
        
        {mode === 'login' && (
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2 text-sm">البريد الإلكتروني</label>
              <div className="relative">
                <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  required
                  dir="ltr"
                  placeholder="example@email.com"
                />
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 mb-2 text-sm">كلمة المرور</label>
              <div className="relative">
                <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  required
                  dir="ltr"
                  placeholder="••••••••"
                />
              </div>
            </div>
            
            <button
              type="button"
              onClick={() => setMode('forgot')}
              className="text-sm text-emerald-600 hover:underline mb-4 block"
            >
              نسيت كلمة المرور؟
            </button>
            
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-600 text-white py-2 rounded-lg hover:bg-emerald-700 transition disabled:opacity-50"
            >
              {loading ? 'جاري تسجيل الدخول...' : 'تسجيل الدخول'}
            </button>
          </form>
        )}
        
        {mode === 'signup' && (
          <form onSubmit={handleSignup}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2 text-sm">الاسم الكامل</label>
              <div className="relative">
                <User className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  required
                  placeholder="أحمد محمد"
                />
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 mb-2 text-sm">البريد الإلكتروني</label>
              <div className="relative">
                <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  required
                  dir="ltr"
                  placeholder="example@email.com"
                />
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 mb-2 text-sm">كلمة المرور</label>
              <div className="relative">
                <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  required
                  placeholder="•••••••• (6 أحرف على الأقل)"
                />
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 mb-2 text-sm">التسجيل كـ</label>
              <div className="space-y-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="userType"
                    value="business"
                    checked={userType === 'business'}
                    onChange={() => setUserType('business')}
                    className="text-emerald-600"
                  />
                  <span className="text-sm">صاحب مصلحة / متجر محلي</span>
                  <span className="text-xs text-gray-400">(أضف متجرك، انشر عروضك)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="userType"
                    value="explorer"
                    checked={userType === 'explorer'}
                    onChange={() => setUserType('explorer')}
                    className="text-emerald-600"
                  />
                  <span className="text-sm">مستكشف نشط (زائر)</span>
                  <span className="text-xs text-gray-400">(تصفح المتاجر، اكتب مراجعات)</span>
                </label>
              </div>
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-600 text-white py-2 rounded-lg hover:bg-emerald-700 transition disabled:opacity-50"
            >
              {loading ? 'جاري إنشاء الحساب...' : 'إنشاء حساب'}
            </button>
          </form>
        )}
        
        {mode === 'forgot' && (
          <form onSubmit={handleForgotPassword}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2 text-sm">البريد الإلكتروني</label>
              <div className="relative">
                <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  required
                  dir="ltr"
                  placeholder="example@email.com"
                />
              </div>
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-600 text-white py-2 rounded-lg hover:bg-emerald-700 transition disabled:opacity-50"
            >
              {loading ? 'جاري الإرسال...' : 'إرسال رمز التحقق'}
            </button>
          </form>
        )}
        
        {mode === 'reset' && (
          <form onSubmit={handleResetPassword}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2 text-sm">رمز التحقق</label>
              <input
                type="text"
                value={resetToken}
                onChange={(e) => setResetToken(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono text-center text-xl"
                placeholder="000000"
                required
                dir="ltr"
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 mb-2 text-sm">كلمة المرور الجديدة</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                required
                placeholder="••••••••"
              />
            </div>
            
            <div className="mb-6">
              <label className="block text-gray-700 mb-2 text-sm">تأكيد كلمة المرور الجديدة</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                required
                placeholder="••••••••"
              />
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-600 text-white py-2 rounded-lg hover:bg-emerald-700 transition disabled:opacity-50"
            >
              {loading ? 'جاري إعادة التعيين...' : 'إعادة تعيين كلمة المرور'}
            </button>
          </form>
        )}
        
        {mode !== 'reset' && (
          <div className="mt-4 text-center">
            {mode === 'login' && (
              <p className="text-sm text-gray-600">
                ليس لديك حساب؟{' '}
                <button onClick={() => { setMode('signup'); resetForm(); }} className="text-emerald-600 hover:underline">
                  سجل حساباً مجانياً الآن
                </button>
              </p>
            )}
            {mode === 'signup' && (
              <p className="text-sm text-gray-600">
                لديك حساب بالفعل؟{' '}
                <button onClick={() => { setMode('login'); resetForm(); }} className="text-emerald-600 hover:underline">
                  سجل الدخول
                </button>
              </p>
            )}
            {mode === 'forgot' && (
              <p className="text-sm text-gray-600">
                <button onClick={() => { setMode('login'); resetForm(); }} className="text-emerald-600 hover:underline">
                  العودة لتسجيل الدخول
                </button>
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthModal;
