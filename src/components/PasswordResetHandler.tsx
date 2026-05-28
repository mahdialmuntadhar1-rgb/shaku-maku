import React from 'react';
import { Language } from '../types';

interface PasswordResetHandlerProps {
  currentLang: Language;
}

export default function PasswordResetHandler({ currentLang }: PasswordResetHandlerProps) {
  const t = {
    en: {
      title: 'Password Reset',
      message: 'Password reset is handled through our support team.',
      contact: 'Please contact support for assistance.',
      home: 'Go to Home'
    },
    ar: {
      title: 'إعادة تعيين كلمة المرور',
      message: 'يتم التعامل مع إعادة تعيين كلمة المرور من خلال فريق الدعم.',
      contact: 'يرجى التواصل مع الدعم للمساعدة.',
      home: 'العودة للرئيسية'
    },
    ku: {
      title: 'گۆڕینی وشەی نهێنی',
      message: 'گۆڕینی وشەی نهێنی لە ڕێگەی تیمی پشتگیریەوە ئەنجام دەدرێت.',
      contact: 'تکایە پەیوەندی بە پشتگیری بکە بۆ یارمەتی.',
      home: 'گەڕانەوە بۆ سەرەکی'
    }
  }[currentLang];

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">{t.title}</h1>
          <p className="text-gray-600 mb-2">{t.message}</p>
          <p className="text-gray-500 mb-4">{t.contact}</p>
          <button
            onClick={() => window.location.href = '/'}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
          >
            {t.home}
          </button>
        </div>
      </div>
    </div>
  );
}
