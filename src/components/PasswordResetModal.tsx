import React, { useRef, useState } from 'react';
import { requestPasswordReset, resetPassword } from '../api';

interface PasswordResetModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PasswordResetModal: React.FC<PasswordResetModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<'request' | 'reset'>('request');
  const [identifier, setIdentifier] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const initialToken = new URLSearchParams(window.location.search).get('token') || '';
  const tokenRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleRequestReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');
    
    try {
      const response = await requestPasswordReset(identifier);
      setMessage(response.message || 'إذا كان البريد موجوداً، فسيتم إرسال رابط إعادة التعيين');
      setStep('reset');
    } catch (err: any) {
      setError(err.response?.data?.error || 'فشل في طلب إعادة تعيين كلمة المرور');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError('كلمة المرور الجديدة وتأكيدها غير متطابقين');
      return;
    }
    if (newPassword.length < 6) {
      setError('كلمة المرور يجب أن تكون 6 أحرف على الأقل');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      const token = tokenRef.current?.value.trim() || initialToken;
      if (!token) {
        setError('رمز إعادة التعيين مطلوب');
        setLoading(false);
        return;
      }
      await resetPassword(token, newPassword);
      setMessage('تم إعادة تعيين كلمة المرور بنجاح! يمكنك الآن تسجيل الدخول');
      setTimeout(() => {
        onClose();
        setStep('request');
        setIdentifier('');
        if (tokenRef.current) tokenRef.current.value = '';
        setNewPassword('');
        setConfirmPassword('');
        setMessage('');
      }, 2000);
    } catch (err: any) {
      setError(err.response?.data?.error || 'فشل في إعادة تعيين كلمة المرور');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 relative">
        <button onClick={onClose} className="absolute top-4 left-4 text-gray-400 hover:text-gray-600">
          ✕
        </button>
        
        <h2 className="text-2xl font-bold text-center mb-6 mt-4">
          {step === 'request' ? 'إعادة تعيين كلمة المرور' : 'إدخال رمز التحقق'}
        </h2>
        
        {message && (
          <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg text-center">
            {message}
          </div>
        )}
        
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-center">
            {error}
          </div>
        )}
        
        {step === 'request' ? (
          <form onSubmit={handleRequestReset}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">البريد الإلكتروني أو اسم المستخدم</label>
              <input
                type="text"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                required
                dir="auto"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-600 text-white py-2 rounded-lg hover:bg-emerald-700 transition disabled:opacity-50"
            >
              {loading ? 'جاري الإرسال...' : 'إرسال رمز التحقق'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleResetPassword}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">رمز التحقق</label>
              <input
                type="text"
                ref={tokenRef}
                defaultValue={initialToken}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono text-center text-xl"
                placeholder="000000"
                required
                dir="ltr"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">كلمة المرور الجديدة</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 mb-2">تأكيد كلمة المرور الجديدة</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                required
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
      </div>
    </div>
  );
};
