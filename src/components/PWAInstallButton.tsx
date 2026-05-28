import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Download, X, Smartphone, Rocket } from 'lucide-react';
import { Language } from '../types';

interface PWAInstallButtonProps {
  currentLang: Language;
  isVisible: boolean;
  onInstall: () => void;
  onDismiss: () => void;
}

export default function PWAInstallButton({
  currentLang,
  isVisible,
  onInstall,
  onDismiss
}: PWAInstallButtonProps) {
  const [isInstalled, setIsInstalled] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showButton, setShowButton] = useState(false);

  // Check if PWA is already installed
  useEffect(() => {
    const checkInstalled = () => {
      const isInStandaloneMode = window.matchMedia('(display-mode: standalone)').matches || 
                               (window.navigator as any).standalone === true;
      setIsInstalled(isInStandaloneMode);
    };

    checkInstalled();
    window.addEventListener('appinstalled', checkInstalled);
    return () => window.removeEventListener('appinstalled', checkInstalled);
  }, []);

  // Listen for beforeinstallprompt event
  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowButton(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
  }, []);

  // Translation strings
  const t = {
    en: {
      buttonText: 'Download App',
      description: 'Install for better experience',
      dismiss: 'Dismiss',
      installing: 'Installing...',
      installed: 'Installed!',
      tapToInstall: 'Tap to install'
    },
    ar: {
      buttonText: 'تحميل التطبيق',
      description: 'ثبت لتجربة أفضل',
      dismiss: 'إغلاق',
      installing: 'جاري التثبيت...',
      installed: 'مثبت!',
      tapToInstall: 'اضغط للتثبيت'
    },
    ku: {
      buttonText: 'داگرتنی ئاپ',
      description: 'دابەزێنە بۆ ئەزموونێکی باشتر',
      dismiss: 'داخستن',
      installing: 'دایەزێنە...',
      installed: 'دایەزێنرا!',
      tapToInstall: 'دەست بکە بە دابەزێنە'
    }
  }[currentLang];

  const isRtl = currentLang === 'ar' || currentLang === 'ku';

  if (isInstalled || !showButton || !isVisible) return null;

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    try {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      
      if (outcome === 'accepted') {
        setIsInstalled(true);
        setShowButton(false);
        setDeferredPrompt(null);
      }
    } catch (error) {
      console.error('PWA installation failed:', error);
    }
  };

  return (
    <AnimatePresence>
      {showButton && (
        <motion.div
          initial={{ x: isRtl ? 100 : -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: isRtl ? 100 : -100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className={`fixed bottom-24 ${isRtl ? 'left-4' : 'right-4'} z-50 flex flex-col items-end gap-2`}
          dir={isRtl ? 'rtl' : 'ltr'}
        >
          {/* Glowing background effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl blur-xl opacity-60 animate-pulse"></div>
          
          {/* Main button container */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 p-[2px] rounded-2xl shadow-2xl"
          >
            {/* Inner content */}
            <div className="relative bg-gray-900 rounded-2xl p-4 flex items-center gap-3">
              {/* Glowing icon */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur-md animate-pulse"></div>
                <div className="relative bg-gradient-to-r from-blue-500 to-purple-500 p-2 rounded-full">
                  <Smartphone className="w-5 h-5 text-white" />
                </div>
              </div>
              
              {/* Button text */}
              <div className="flex flex-col">
                <span className="text-white font-bold text-sm">{t.buttonText}</span>
                <span className="text-gray-300 text-xs">{t.description}</span>
              </div>
              
              {/* Download icon */}
              <Download className="w-5 h-5 text-white animate-bounce" />
            </div>
          </motion.div>
          
          {/* Install button */}
          <motion.button
            onClick={handleInstallClick}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="relative bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg flex items-center gap-2"
          >
            <Rocket className="w-4 h-4" />
            {t.tapToInstall}
          </motion.button>
          
          {/* Dismiss button */}
          <button
            onClick={() => setShowButton(false)}
            className="absolute top-1 right-1 bg-gray-800/80 text-gray-400 p-1 rounded-full hover:bg-gray-700/80 hover:text-white transition-colors"
          >
            <X className="w-3 h-3" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
