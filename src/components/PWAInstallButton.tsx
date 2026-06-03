import React, { useEffect, useState } from 'react';
import { Download, X, Share2, Smartphone } from 'lucide-react';
import { Language } from '../types';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

interface PWAInstallButtonProps {
  currentLang: Language;
}

const textByLang = {
  en: {
    install: 'Install App',
    title: 'Install Shaku Maku',
    body: 'To install: tap Share, then Add to Home Screen.',
    close: 'Close'
  },
  ar: {
    install: 'ثبّت التطبيق',
    title: 'ثبّت شكو ماكو',
    body: 'للتثبيت: اضغط مشاركة ثم أضف إلى الشاشة الرئيسية.',
    close: 'إغلاق'
  },
  ku: {
    install: 'دامەزراندنی ئەپ',
    title: 'دامەزراندنی شەکو مەکو',
    body: 'بۆ دامەزراندن: Share دابگرە، پاشان Add to Home Screen.',
    close: 'داخستن'
  }
};

function isStandaloneMode() {
  return (
    window.matchMedia?.('(display-mode: standalone)').matches ||
    (window.navigator as any).standalone === true
  );
}

function isMobileLike() {
  return window.innerWidth <= 900 || /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
}

function isIOS() {
  return /iPhone|iPad|iPod/i.test(navigator.userAgent);
}

export default function PWAInstallButton({ currentLang }: PWAInstallButtonProps) {
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [visible, setVisible] = useState(false);
  const [iosHelpOpen, setIosHelpOpen] = useState(false);

  const copy = textByLang[currentLang] || textByLang.en;
  const isRtl = currentLang === 'ar' || currentLang === 'ku';

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Keep the install button visible across desktop/mobile Chrome/Safari.
    // Hide only when the app is already installed/standalone.
    if (isStandaloneMode()) {
      setVisible(false);
      return;
    }

    setVisible(true);

    if (isIOS()) {
      setVisible(true);
    }

    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      setInstallPrompt(event as BeforeInstallPromptEvent);
      setVisible(true);
    };

    const handleAppInstalled = () => {
      setVisible(false);
      setInstallPrompt(null);
      // Installed already, so hiding is correct.
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (installPrompt) {
      await installPrompt.prompt();
      const choice = await installPrompt.userChoice;
      setInstallPrompt(null);

      if (choice.outcome === 'accepted' || choice.outcome === 'dismissed') {
        setVisible(true);
    // Do not permanently hide the install button; user wants it visible on all browsers.
      }

      return;
    }

    setIosHelpOpen(true);
  };

  const hideButton = () => {
    setVisible(true);
    // Do not permanently hide the install button; user wants it visible on all browsers.
  };

  if (!visible) return null;

  return (
    <>
      <div
        className="fixed left-3 top-1/2 -translate-y-1/2 z-[9999] flex flex-col items-start gap-2"
        dir={isRtl ? 'rtl' : 'ltr'}
      >
        <button
          type="button"
          onClick={handleInstallClick}
          className="group relative overflow-hidden rounded-full border border-white/40 bg-gradient-to-br from-fuchsia-500 via-purple-500 to-cyan-400 px-4 py-3 text-white shadow-[0_0_28px_rgba(168,85,247,0.9)] animate-pulse backdrop-blur-xl"
          aria-label={copy.install}
        >
          <span className="absolute inset-0 bg-white/20 opacity-0 transition-opacity group-hover:opacity-100" />
          <span className="relative flex flex-col items-center justify-center gap-1 text-[11px] font-black leading-tight">
            <Download className="h-5 w-5 drop-shadow" />
            <span className="max-w-[70px] text-center">{copy.install}</span>
          </span>
        </button>

        <button
          type="button"
          onClick={hideButton}
          className="ml-2 flex h-7 w-7 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white/80 backdrop-blur hover:bg-black"
          aria-label="Hide install button"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>

      {iosHelpOpen && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/70 p-4" dir={isRtl ? 'rtl' : 'ltr'}>
          <div className="max-w-sm rounded-3xl border border-white/15 bg-[#101114] p-6 text-white shadow-2xl">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-fuchsia-500 to-cyan-400">
                <Smartphone className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-black">{copy.title}</h3>
            </div>

            <p className="mb-5 text-sm font-bold leading-7 text-zinc-200">
              {copy.body}
            </p>

            <div className="mb-5 flex items-center gap-2 rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-3 text-xs font-bold text-cyan-100">
              <Share2 className="h-4 w-4 shrink-0" />
              <span>{currentLang === 'en' ? 'Use Safari share menu on iPhone.' : currentLang === 'ku' ? 'لە ئایفۆن پێویستە Share بەکاربهێنیت.' : 'على الآيفون استخدم زر المشاركة في Safari.'}</span>
            </div>

            <button
              type="button"
              onClick={() => setIosHelpOpen(false)}
              className="w-full rounded-2xl bg-gradient-to-r from-fuchsia-500 to-cyan-400 px-4 py-3 text-sm font-black text-white"
            >
              {copy.close}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
