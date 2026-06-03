import React, { useEffect, useState } from 'react';
import { Download, Smartphone, Share2, X, ExternalLink } from 'lucide-react';
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
    direct: 'Your browser supports direct installation. The install window should open now.',
    body: 'If the install window does not appear, open this site in Chrome, Edge, or Safari. Then use Install App or Add to Home Screen from the browser menu.',
    close: 'Close'
  },
  ar: {
    install: 'ثبّت التطبيق',
    title: 'ثبّت شكو ماكو',
    direct: 'متصفحك يدعم التثبيت المباشر. يجب أن تظهر نافذة التثبيت الآن.',
    body: 'إذا لم تظهر نافذة التثبيت، افتح الموقع في Chrome أو Edge أو Safari، ثم اختر تثبيت التطبيق أو إضافة إلى الشاشة الرئيسية من قائمة المتصفح.',
    close: 'إغلاق'
  },
  ku: {
    install: 'دامەزراندنی ئەپ',
    title: 'دامەزراندنی شەکو مەکو',
    direct: 'وێبگەڕەکەت پشتگیری دامەزراندنی ڕاستەوخۆ دەکات. پەنجەرەی دامەزراندن دەبێت ئێستا بکرێتەوە.',
    body: 'ئەگەر پەنجەرەی دامەزراندن نەکرا، ئەم سایتە لە Chrome، Edge یان Safari بکەرەوە، پاشان Install App یان Add to Home Screen هەڵبژێرە.',
    close: 'داخستن'
  }
};

function isStandaloneMode() {
  return (
    window.matchMedia?.('(display-mode: standalone)').matches ||
    (window.navigator as any).standalone === true
  );
}

function isInAppBrowser() {
  return /FBAN|FBAV|Instagram|Line|Twitter|GSA|Gmail/i.test(navigator.userAgent);
}

export default function PWAInstallButton({ currentLang }: PWAInstallButtonProps) {
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [helpOpen, setHelpOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [directAttempted, setDirectAttempted] = useState(false);

  const copy = textByLang[currentLang] || textByLang.en;
  const isRtl = currentLang === 'ar' || currentLang === 'ku';

  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (isStandaloneMode()) {
      setVisible(false);
      return;
    }

    setVisible(true);

    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      setInstallPrompt(event as BeforeInstallPromptEvent);
      setVisible(true);
    };

    const handleAppInstalled = () => {
      setVisible(false);
      setInstallPrompt(null);
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
      setDirectAttempted(true);
      await installPrompt.prompt();
      await installPrompt.userChoice;
      setInstallPrompt(null);
      return;
    }

    setDirectAttempted(false);
    setHelpOpen(true);
  };

  if (!visible) return null;

  return (
    <>
      <button
        type="button"
        onClick={handleInstallClick}
        className="fixed left-4 top-1/2 z-[9999] -translate-y-1/2 rounded-full border border-white/40 bg-gradient-to-br from-fuchsia-500 via-purple-500 to-cyan-400 px-4 py-3 text-white shadow-[0_0_28px_rgba(168,85,247,0.85)] backdrop-blur-xl transition hover:scale-105 active:scale-95"
        aria-label={copy.install}
        dir={isRtl ? 'rtl' : 'ltr'}
      >
        <span className="flex flex-col items-center justify-center gap-1 text-[11px] font-black leading-tight">
          <Download className="h-5 w-5 drop-shadow" />
          <span className="max-w-[76px] text-center">{copy.install}</span>
        </span>
      </button>

      {helpOpen && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/70 p-4" dir={isRtl ? 'rtl' : 'ltr'}>
          <div className="max-w-sm rounded-3xl border border-white/15 bg-[#101114] p-6 text-white shadow-2xl">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-fuchsia-500 to-cyan-400">
                <Smartphone className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-black">{copy.title}</h3>
              <button
                type="button"
                onClick={() => setHelpOpen(false)}
                className="ms-auto rounded-full bg-white/10 p-2 text-white/80 hover:bg-white/20"
                aria-label={copy.close}
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <p className="mb-4 text-sm font-bold leading-7 text-zinc-200">
              {directAttempted ? copy.direct : copy.body}
            </p>

            {isInAppBrowser() && (
              <div className="mb-4 rounded-2xl border border-amber-400/25 bg-amber-400/10 p-3 text-xs font-bold leading-6 text-amber-100">
                <ExternalLink className="me-2 inline h-4 w-4" />
                {currentLang === 'en'
                  ? 'You are inside an app browser. Open this page in Chrome or Safari first, then install.'
                  : currentLang === 'ku'
                    ? 'تۆ لە وێبگەڕی ناو ئەپیت. سەرەتا لە Chrome یان Safari بکەرەوە، پاشان دایمەزرێنە.'
                    : 'أنت داخل متصفح تطبيق. افتح الصفحة أولاً في Chrome أو Safari، ثم ثبّت التطبيق.'}
              </div>
            )}

            <div className="mb-5 flex items-center gap-2 rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-3 text-xs font-bold text-cyan-100">
              <Share2 className="h-4 w-4 shrink-0" />
              <span>
                {currentLang === 'en'
                  ? 'iPhone/Safari: Share → Add to Home Screen. Android Chrome: Menu → Install app.'
                  : currentLang === 'ku'
                    ? 'iPhone/Safari: Share → Add to Home Screen. Android Chrome: Menu → Install app.'
                    : 'iPhone/Safari: مشاركة ← إضافة إلى الشاشة الرئيسية. Android Chrome: القائمة ← تثبيت التطبيق.'}
              </span>
            </div>

            <button
              type="button"
              onClick={() => setHelpOpen(false)}
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