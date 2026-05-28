import React, { useState, useEffect } from 'react';
import { getAuth, checkActionCode, applyActionCode, verifyPasswordResetCode } from 'firebase/auth';
import { Language } from '../types';

interface PasswordResetHandlerProps {
  currentLang: Language;
}

export default function PasswordResetHandler({ currentLang }: PasswordResetHandlerProps) {
  const [mode, setMode] = useState<'reset' | 'recoverEmail' | 'verifyEmail' | null>(null);
  const [actionCode, setActionCode] = useState<string | null>(null);
  const [email, setEmail] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState(false);

  const t = {
    en: {
      title: 'Reset Password',
      email: 'Email',
      newPassword: 'New Password',
      confirmPassword: 'Confirm Password',
      submit: 'Reset Password',
      success: 'Password reset successfully!',
      error: 'An error occurred',
      invalidCode: 'Invalid or expired reset code',
      weakPassword: 'Password should be at least 6 characters',
      passwordMismatch: 'Passwords do not match'
    },
    ar: {
      title: 'إعادة تعيين كلمة المرور',
      email: 'البريد الإلكتروني',
      newPassword: 'كلمة المرور الجديدة',
      confirmPassword: 'تأكيد كلمة المرور',
      submit: 'إعادة تعيين كلمة المرور',
      success: 'تم إعادة تعيين كلمة المرور بنجاح!',
      error: 'حدث خطأ',
      invalidCode: 'رمز إعادة التعيين غير صالح أو منتهي الصلاحية',
      weakPassword: 'يجب أن تكون كلمة المرور 6 أحرف على الأقل',
      passwordMismatch: 'كلمات المرور غير متطابقة'
    },
    ku: {
      title: 'گۆڕینی وشەی نهێنی',
      email: 'ئیمەیڵ',
      newPassword: 'وشەی نهێنی نوێ',
      confirmPassword: 'دووبارەکردنی وشەی نهێنی',
      submit: 'گۆڕینی وشەی نهێنی',
      success: 'وشەی نهێنی بە سەرکەوتووی گۆڕدرا!',
      error: 'هەڵەیەک ڕوویدا',
      invalidCode: 'کۆدی گۆڕینەوە هەڵەیە یان بەسەرچووە',
      weakPassword: 'وشەی نهێنی دەبێت لە 6 پیت زیاتر بێت',
      passwordMismatch: 'وشەی نهێنیەکان یەک ناگرێنەوە'
    }
  }[currentLang];

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const mode = urlParams.get('mode');
    const oobCode = urlParams.get('oobCode');
    
    if (mode && oobCode) {
      setMode(mode as any);
      setActionCode(oobCode);
      
      // Handle different modes
      if (mode === 'resetPassword' || mode === 'recoverEmail') {
        handleActionCode(oobCode, mode);
      }
    }
  }, []);

  const handleActionCode = async (code: string, mode: string) => {
    setLoading(true);
    setError('');
    
    try {
      const auth = getAuth();
      
      if (mode === 'resetPassword') {
        // Verify the reset code and get email
        const info = await verifyPasswordResetCode(auth, code);
        setEmail(info);
      } else if (mode === 'recoverEmail') {
        // Handle email recovery
        const info = await checkActionCode(auth, code);
        setEmail(info.data?.email || '');
      }
    } catch (error: any) {
      console.error('Action code error:', error);
      setError(t.invalidCode);
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newPassword || newPassword.length < 6) {
      setError(t.weakPassword);
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      const auth = getAuth();
      await verifyPasswordResetCode(auth, actionCode!);
      await applyActionCode(auth, actionCode!);
      
      setSuccess(true);
      setTimeout(() => {
        window.location.href = '/';
      }, 3000);
    } catch (error: any) {
      console.error('Password reset error:', error);
      setError(t.error);
    } finally {
      setLoading(false);
    }
  };

  if (!mode || !actionCode) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Invalid Link</h1>
            <p className="text-gray-600">This password reset link is invalid or has expired.</p>
            <button
              onClick={() => window.location.href = '/'}
              className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
            >
              Go to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">{t.success}</h1>
            <p className="text-gray-600">Redirecting to home page...</p>
          </div>
        </div>
      </div>
    );
  }

  if (mode === 'resetPassword') {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">{t.title}</h1>
          
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}
          
          <form onSubmit={handleResetPassword}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                {t.email}
              </label>
              <input
                type="email"
                value={email}
                readOnly
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                {t.newPassword}
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                minLength={6}
              />
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Processing...' : t.submit}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Email Recovery</h1>
          <p className="text-gray-600">Email recovery initiated for: {email}</p>
          <button
            onClick={() => window.location.href = '/'}
            className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
          >
            Go to Home
          </button>
        </div>
      </div>
    </div>
  );
}
