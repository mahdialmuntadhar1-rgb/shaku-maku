import React, { useEffect, useMemo, useState } from 'react';
import { Download, Smartphone, X, ExternalLink, CheckCircle2 } from 'lucide-react';
import { Language } from '../types';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

interface PWAInstallButtonProps {
  currentLang: Language;
}

const copyByLang = {
  en: {
    install: 'Install App',
    ready: 'Ready to install',
    title: 'Install Shaku Maku',
    direct: 'Your browser supports direct installation. Tap Install when the browser popup appears.',
    fallback: 'This browser does not allow direct install from a website button. Open the site in Chrome, Edge, or Safari, then use Install App / Add to Home Screen.',
    inApp: 'You are inside an app browser. Open this page in Chrome or Safari first, then install.',
    close: 'Close'
  },
  ar: {
    install: 'ثبّت التطبيق',
    ready: 'جاهز للتثبيت',
    title: 'ثبّت شكو ماكو',
    direct: 'متصفحك يدعم التثبيت المباشر. اضغط تثبيت عندما تظهر نافذة المتصفح.',
    fallback: 'هذا المتصفح لا يسمح بالتثبيت المباشر من زر داخل الموقع. افتح الموقع في Chrome أو Edge أو Safari ثم اختر تثبيت التطبيق أو إضافة إلى الشاشة الرئيسية.',
    inApp: 'أنت داخل متصفح تطبيق. افتح الصفحة في Chrome أو Safari أولاً ثم ثبّت التطبيق.',
    close: 'إغلاق'
  },
  ku: {
    install: 'دامەزراندنی ئەپ',
    ready: 'ئامادەیە بۆ دامەزراندن',
    title: 'دامەزراندنی شەکو مەکو',
    direct: 'وێبگەڕەکەت پشتگیری دامەزراندنی ڕاستەوخۆ دەکات. کاتێک پەنجەرەکە دەرکەوت Install دابگرە.',
    fallback: 'ئەم وێبگەڕە ڕێگە نادات لە دوگمەی سایتەوە ڕاستەوخۆ دامەزرێت. سایتەکە لە Chrome، Edge یان Safari بکەرەوە، پاشان Install App یان Add to Home Screen هەڵبژێرە.',
    inApp: 'تۆ لە وێبگەڕی ناو ئەپیت. سەرەتا لە Chrome یان Safari بکەرەوە، پاشان دایمەزرێنە.',
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
  return /FBAN|FBAV|Instagram|Line|Twitter|GSA|Gmail|TikTok|Snapchat/i.test(navigator.userAgent);
}

function isIOS() {
  return /iPhone|iPad|iPod/i.test(navigator.userAgent);
}

export default function PWAInstallButton({ currentLang }: PWAInstallButtonProps) {
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [helpOpen, setHelpOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [installReady, setInstallReady] = useState(false);

  const copy = copyByLang[currentLang] || copyByLang.en;
  const isRtl = currentLang === 'ar' || currentLang === 'ku';

  const browserHint = useMemo(() => {
    if (isInAppBrowser()) return copy.inApp;
    if (isIOS()) return copy.fallback;
    return copy.fallback;
  }, [copy]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (isStandaloneMode()) {
      setVisible(false);
      return;
    }

    setVisible(true);

    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      const promptEvent = event as BeforeInstallPromptEvent;
      setInstallPrompt(promptEvent);
      setInstallReady(true);
      setVisible(true);
    };

    const handleAppInstalled = () => {
      setVisible(false);
      setInstallPrompt(null);
      setInstallReady(false);
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
      await installPrompt.userChoice;
      setInstallPrompt(null);
      setInstallReady(false);
      return;
    }

    setHelpOpen(true);
  };

  if (!visible) return null;

  return (
    <>
      <button
        type="button"
        onClick={handleInstallClick}
        className="fixed left-4 top-1/2 z-[9999] -translate-y-1/2 rounded-full border border-white/50 bg-gradient-to-br from-fuchsia-500 via-purple-500 to-cyan-400 px-4 py-3 text-white shadow-[0_0_18px_rgba(34,211,238,0.95),0_0_45px_rgba(168,85,247,0.95),0_0_85px_rgba(217,70,239,0.65)] backdrop-blur-xl transition hover:scale-110 active:scale-95 animate-pulse"
        aria-label={copy.install}
        title={installReady ? copy.ready : copy.install}
        dir={isRtl ? 'rtl' : 'ltr'}
      >
        <span className="absolute inset-[-7px] -z-10 rounded-full bg-cyan-400/20 blur-xl" />
        <span className="absolute inset-[-14px] -z-20 rounded-full bg-fuchsia-500/20 blur-2xl" />
        <span className="flex flex-col items-center justify-center gap-1 text-[11px] font-black leading-tight">
          {installReady ? <CheckCircle2 className="h-5 w-5 drop-shadow" /> : <Download className="h-5 w-5 drop-shadow" />}
          <span className="max-w-[78px] text-center">{copy.install}</span>
        </span>
      </button>

      {helpOpen && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/70 p-4" dir={isRtl ? 'rtl' : 'ltr'}>
          <div className="max-w-sm rounded-3xl border border-white/15 bg-[#101114] p-6 text-white shadow-2xl">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-fuchsia-500 to-cyan-400">
                <Smartphone className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-black">{copy.title}</h3>
                <p className="text-[11px] font-bold text-cyan-200">{installReady ? copy.ready : copy.install}</p>
              </div>
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
              {installReady ? copy.direct : browserHint}
            </p>

            <div className="mb-5 rounded-2xl border border-amber-400/25 bg-amber-400/10 p-3 text-xs font-bold leading-6 text-amber-100">
              <ExternalLink className="me-2 inline h-4 w-4" />
              {currentLang === 'en'
                ? 'Best result: open shakumaku.pages.dev directly in Chrome, Edge, or Safari.'
                : currentLang === 'ku'
                  ? 'باشترین ئەنجام: shakumaku.pages.dev ڕاستەوخۆ لە Chrome، Edge یان Safari بکەرەوە.'
                  : 'أفضل نتيجة: افتح shakumaku.pages.dev مباشرة في Chrome أو Edge أو Safari.'}
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