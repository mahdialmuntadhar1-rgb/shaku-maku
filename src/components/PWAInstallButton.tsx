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
    install: 'Install',
    ready: 'Ready',
    title: 'Install Shaku Maku',
    direct: 'Tap Install in the browser popup. This is the fastest install method on Android Chrome/Edge.',
    notReady: 'Your browser is not offering direct install yet. Open this site directly in Chrome or Edge, then tap Install.',
    ios: 'On iPhone/iPad, Apple does not allow direct install from a website button. Open in Safari, tap the Share button, then choose Add to Home Screen.',
    inApp: 'You are inside an app browser. Open this page in Chrome or Safari first, then install.',
    openChrome: 'Open in Chrome',
    close: 'Close',
    installed: 'Installed',
    dismissed: 'Install was cancelled. You can try again from the browser menu.'
  },
  ar: {
    install: 'تثبيت',
    ready: 'جاهز',
    title: 'ثبّت شكو ماكو',
    direct: 'اضغط تثبيت داخل نافذة المتصفح. هذه أسرع طريقة على أندرويد Chrome/Edge.',
    notReady: 'المتصفح لا يعرض التثبيت المباشر الآن. افتح الموقع مباشرة في Chrome أو Edge ثم اضغط تثبيت.',
    ios: 'على iPhone/iPad، أبل لا تسمح بالتثبيت المباشر من زر داخل الموقع. افتح الموقع في Safari، اضغط زر المشاركة، ثم اختر إضافة إلى الشاشة الرئيسية.',
    inApp: 'أنت داخل متصفح تطبيق. افتح الصفحة في Chrome أو Safari أولاً ثم ثبّت التطبيق.',
    openChrome: 'افتح في Chrome',
    close: 'إغلاق',
    installed: 'تم التثبيت',
    dismissed: 'تم إلغاء التثبيت. يمكنك المحاولة مرة أخرى من قائمة المتصفح.'
  },
  ku: {
    install: 'دامەزراندن',
    ready: 'ئامادەیە',
    title: 'دامەزراندنی شکو ماکو',
    direct: 'لە پەنجەرەی وێبگەڕەکە Install دابگرە. ئەمە خێراترین ڕێگایە لە Android Chrome/Edge.',
    notReady: 'وێبگەڕەکە ئێستا دامەزراندنی ڕاستەوخۆ پیشان نادات. سایتەکە ڕاستەوخۆ لە Chrome یان Edge بکەرەوە، پاشان Install دابگرە.',
    ios: 'لە iPhone/iPad، Apple ڕێگە نادات لە دوگمەی ناو سایتەوە ڕاستەوخۆ دامەزرێت. لە Safari بکەرەوە، دوگمەی Share دابگرە، پاشان Add to Home Screen هەڵبژێرە.',
    inApp: 'تۆ لە وێبگەڕی ناو ئەپیت. سەرەتا لە Chrome یان Safari بکەرەوە، پاشان دایمەزرێنە.',
    openChrome: 'لە Chrome بکەرەوە',
    close: 'داخستن',
    installed: 'دامەزرا',
    dismissed: 'دامەزراندن هەڵوەشایەوە. دەتوانیت جارێکی تر لە لیستی وێبگەڕەکەوە هەوڵ بدەیتەوە.'
  }
};

function isStandaloneMode() {
  return (
    window.matchMedia?.('(display-mode: standalone)').matches ||
    (window.navigator as any).standalone === true
  );
}

function isInAppBrowser() {
  return /FBAN|FBAV|Instagram|Line|Twitter|GSA|Gmail|TikTok|Snapchat|WhatsApp/i.test(navigator.userAgent);
}

function isIOS() {
  return /iPhone|iPad|iPod/i.test(navigator.userAgent);
}

function isAndroid() {
  return /Android/i.test(navigator.userAgent);
}

function openInChrome() {
  const currentUrl = new URL(window.location.href);
  const path = currentUrl.host + currentUrl.pathname + currentUrl.search + currentUrl.hash;
  window.location.href = `intent://${path}#Intent;scheme=https;package=com.android.chrome;end`;
}

export default function PWAInstallButton({ currentLang }: PWAInstallButtonProps) {
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [helpOpen, setHelpOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [installReady, setInstallReady] = useState(false);
  const [message, setMessage] = useState('');

  const copy = copyByLang[currentLang] || copyByLang.en;
  const isRtl = currentLang === 'ar' || currentLang === 'ku';

  const browserHint = useMemo(() => {
    if (isInAppBrowser()) return copy.inApp;
    if (isIOS()) return copy.ios;
    return copy.notReady;
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
      setMessage('');
    };

    const handleAppInstalled = () => {
      setVisible(false);
      setInstallPrompt(null);
      setInstallReady(false);
      setMessage(copy.installed);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, [copy.installed]);

  const handleInstallClick = async () => {
    if (isStandaloneMode()) {
      setVisible(false);
      return;
    }

    if (installPrompt) {
      const promptEvent = installPrompt;
      setInstallPrompt(null);
      setInstallReady(false);

      try {
        await promptEvent.prompt();
        const choice = await promptEvent.userChoice.catch(() => null);

        if (choice?.outcome === 'accepted') {
          setMessage(copy.installed);
          setVisible(false);
        } else {
          setMessage(copy.dismissed);
          setHelpOpen(true);
        }
      } catch (error) {
        setHelpOpen(true);
      }

      return;
    }

    setHelpOpen(true);
  };

  if (!visible) return null;

  const canOpenChrome = isAndroid() && !installReady;

  return (
    <>
      <button
        type="button"
        onClick={handleInstallClick}
        className={`fixed left-4 top-1/2 z-[9999] -translate-y-1/2 rounded-full border px-4 py-3 text-white backdrop-blur-xl transition hover:scale-110 active:scale-95 ${installReady ? 'border-emerald-300/70 bg-gradient-to-br from-emerald-500 via-cyan-500 to-blue-500 shadow-[0_0_22px_rgba(16,185,129,0.8)] animate-pulse' : 'border-white/50 bg-gradient-to-br from-fuchsia-500 via-purple-500 to-cyan-400 shadow-[0_0_18px_rgba(34,211,238,0.95),0_0_45px_rgba(168,85,247,0.95),0_0_85px_rgba(217,70,239,0.65)]'}`}
        aria-label={copy.install}
        title={installReady ? copy.direct : copy.install}
        dir={isRtl ? 'rtl' : 'ltr'}
      >
        <span className="absolute inset-[-7px] -z-10 rounded-full bg-cyan-400/20 blur-xl" />
        <span className="absolute inset-[-14px] -z-20 rounded-full bg-fuchsia-500/20 blur-2xl" />
        <span className="flex flex-col items-center justify-center gap-1 text-[11px] font-black leading-tight">
          {installReady ? <CheckCircle2 className="h-5 w-5 drop-shadow" /> : <Download className="h-5 w-5 drop-shadow" />}
          <span className="max-w-[78px] text-center">{installReady ? copy.ready : copy.install}</span>
        </span>
      </button>

      {helpOpen && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/75 p-4" dir={isRtl ? 'rtl' : 'ltr'}>
          <div className="max-w-sm rounded-3xl border border-white/15 bg-[#101114] p-6 text-white shadow-2xl">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-fuchsia-500 to-cyan-400">
                <Smartphone className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-black">{copy.title}</h3>
                <p className="text-[11px] font-bold text-cyan-200">
                  {installReady ? copy.ready : copy.install}
                </p>
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

            {message ? (
              <div className="mb-4 rounded-2xl border border-amber-400/25 bg-amber-400/10 p-3 text-xs font-bold leading-6 text-amber-100">
                {message}
              </div>
            ) : null}

            {isIOS() ? (
              <div className="mb-5 rounded-2xl border border-white/10 bg-white/5 p-3 text-xs font-bold leading-6 text-zinc-200">
                <div>1) Safari</div>
                <div>2) Share / مشاركة</div>
                <div>3) Add to Home Screen</div>
              </div>
            ) : null}

            {canOpenChrome ? (
              <button
                type="button"
                onClick={openInChrome}
                className="mb-3 flex w-full items-center justify-center gap-2 rounded-2xl bg-white/10 px-4 py-3 text-sm font-black text-white hover:bg-white/15"
              >
                <ExternalLink className="h-4 w-4" />
                {copy.openChrome}
              </button>
            ) : null}

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
