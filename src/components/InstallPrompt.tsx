import React, { useState, useEffect } from 'react';
import { Download, X, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Language } from '../types';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

interface InstallPromptProps {
  currentLang: Language;
}

export default function InstallPrompt({ currentLang }: InstallPromptProps) {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
      return;
    }

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setIsVisible(true);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setIsVisible(false);
      setDeferredPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setIsInstalled(true);
    }
    setDeferredPrompt(null);
    setIsVisible(false);
  };

  const dismiss = () => {
    setIsVisible(false);
    // Re-show after 2 minutes if still not installed
    setTimeout(() => {
      if (!isInstalled && deferredPrompt) setIsVisible(true);
    }, 120000);
  };

  if (isInstalled) return null;

  const t = {
    en: {
      install: 'Install App',
      addHome: 'Add to Home Screen for the best experience',
      dismiss: 'Dismiss',
    },
    ar: {
      install: 'تثبيت التطبيق',
      addHome: 'أضف إلى الشاشة الرئيسية لتجربة أفضل',
      dismiss: 'إغلاق',
    },
    ku: {
      install: 'دامەزراندنی ئاپ',
      addHome: 'زیادکردن بۆ شاشەی سەرەکی بۆ ئەزموونێکی باشتر',
      dismiss: 'داخستن',
    },
  }[currentLang];

  return (
    <AnimatePresence>
      {isVisible && deferredPrompt && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.98 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="sticky top-0 left-0 right-0 z-[60]"
        >
          {/* Animated glowing border container */}
          <div className="relative bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600 p-[1.5px]">
            {/* Soft shimmer sweep animation */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[shimmer_2.5s_infinite]"></div>
            </div>

            <div className="relative bg-[#0f0f13] px-4 py-2.5 flex items-center gap-3">
              {/* Glowing icon */}
              <div className="relative shrink-0">
                <div className="absolute inset-0 bg-gradient-to-tr from-cyan-400 to-violet-500 rounded-lg blur-md animate-pulse opacity-60"></div>
                <div className="relative w-9 h-9 rounded-lg bg-gradient-to-tr from-cyan-500 to-violet-500 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white animate-spin-slow" />
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-[11px] font-black text-white truncate flex items-center gap-1">
                  <span className="bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
                    {t.install}
                  </span>
                  <span className="inline-flex items-center px-1 py-0.5 rounded bg-white/10 text-[8px] text-cyan-300 font-bold uppercase tracking-wider border border-cyan-400/20">
                    PWA
                  </span>
                </p>
                <p className="text-[10px] text-zinc-400 truncate leading-tight">
                  {t.addHome}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {/* Primary install CTA with subtle glow */}
                <button
                  onClick={handleInstallClick}
                  className="relative group px-3.5 py-1.5 bg-gradient-to-r from-cyan-500 to-violet-500 hover:from-cyan-400 hover:to-violet-400 text-white text-[10px] font-black rounded-lg transition-all duration-300 cursor-pointer shadow-[0_0_15px_rgba(6,182,212,0.5)] hover:shadow-[0_0_25px_rgba(139,92,246,0.7)] hover:scale-105 active:scale-95 animate-pulseGlow"
                >
                  <span className="absolute inset-0 rounded-lg bg-gradient-to-r from-cyan-400/0 via-white/30 to-violet-400/0 animate-[shimmer_2s_infinite]" />
                  <span className="relative z-10 flex items-center gap-1">
                    <Download className="w-3 h-3" />
                    {t.install}
                  </span>
                </button>

                <button
                  onClick={dismiss}
                  className="p-1.5 text-zinc-500 hover:text-white hover:bg-white/10 rounded-lg transition cursor-pointer"
                  aria-label={t.dismiss}
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
