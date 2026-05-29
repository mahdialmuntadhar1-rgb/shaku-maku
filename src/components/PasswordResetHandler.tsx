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
      title: 'Ø¥Ø¹Ø§Ø¯Ø© ØªØ¹ÙŠÙŠÙ† ÙƒÙ„Ù…Ø© Ø§Ù„Ù…Ø±ÙˆØ±',
      message: 'ÙŠØªÙ… Ø§Ù„ØªØ¹Ø§Ù…Ù„ Ù…Ø¹ Ø¥Ø¹Ø§Ø¯Ø© ØªØ¹ÙŠÙŠÙ† ÙƒÙ„Ù…Ø© Ø§Ù„Ù…Ø±ÙˆØ± Ù…Ù† Ø®Ù„Ø§Ù„ ÙØ±ÙŠÙ‚ Ø§Ù„Ø¯Ø¹Ù….',
      contact: 'ÙŠØ±Ø¬Ù‰ Ø§Ù„ØªÙˆØ§ØµÙ„ Ù…Ø¹ Ø§Ù„Ø¯Ø¹Ù… Ù„Ù„Ù…Ø³Ø§Ø¹Ø¯Ø©.',
      home: 'Ø§Ù„Ø¹ÙˆØ¯Ø© Ù„Ù„Ø±Ø¦ÙŠØ³ÙŠØ©'
    },
    ku: {
      title: 'Ú¯Û†Ú•ÛŒÙ†ÛŒ ÙˆØ´Û•ÛŒ Ù†Ù‡ÛŽÙ†ÛŒ',
      message: 'Ú¯Û†Ú•ÛŒÙ†ÛŒ ÙˆØ´Û•ÛŒ Ù†Ù‡ÛŽÙ†ÛŒ Ù„Û• Ú•ÛŽÚ¯Û•ÛŒ ØªÛŒÙ…ÛŒ Ù¾Ø´ØªÚ¯ÛŒØ±ÛŒÛ•ÙˆÛ• Ø¦Û•Ù†Ø¬Ø§Ù… Ø¯Û•Ø¯Ø±ÛŽØª.',
      contact: 'ØªÚ©Ø§ÛŒÛ• Ù¾Û•ÛŒÙˆÛ•Ù†Ø¯ÛŒ Ø¨Û• Ù¾Ø´ØªÚ¯ÛŒØ±ÛŒ Ø¨Ú©Û• Ø¨Û† ÛŒØ§Ø±Ù…Û•ØªÛŒ.',
      home: 'Ú¯Û•Ú•Ø§Ù†Û•ÙˆÛ• Ø¨Û† Ø³Û•Ø±Û•Ú©ÛŒ'
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
