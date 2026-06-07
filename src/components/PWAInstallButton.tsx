import React, { useEffect, useState } from 'react';
import { Download, CheckCircle2, ExternalLink } from 'lucide-react';
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
    ready: 'Install Ready',
    installed: 'Installed',
    openChrome: 'Open in Chrome',
    unavailable: 'Install is not ready yet. Open the site in Chrome/Edge and try again.'
  },
  ar: {
    install: 'ثبّت التطبيق',
    ready: 'جاهز للتثبيت',
    installed: 'تم التثبيت',
    openChrome: 'افتح في Chrome',
    unavailable: 'التثبيت غير جاهز حالياً. افتح الموقع في Chrome أو Edge وحاول مرة أخرى.'
  },
  ku: {
    install: 'دامەزراندنی ئەپ',
    ready: 'ئامادەی دامەزراندنە',
    installed: 'دامەزرا',
    openChrome: 'لە Chrome بکەرەوە',
    unavailable: 'دامەزراندن ئێستا ئامادە نییە. سایتەکە لە Chrome یان Edge بکەرەوە.'
  }
};

function isStandaloneMode() {
  return (
    window.matchMedia?.('(display-mode: standalone)').matches ||
    (window.navigator as any).standalone === true
  );
}

function isAndroid() {
  return /Android/i.test(navigator.userAgent);
}

function isInAppBrowser() {
  return /FBAN|FBAV|Instagram|Line|Twitter|GSA|Gmail|TikTok|Snapchat|WhatsApp/i.test(navigator.userAgent);
}

function openInChrome() {
  const currentUrl = new URL(window.location.href);
  const path = currentUrl.host + currentUrl.pathname + currentUrl.search + currentUrl.hash;
  window.location.href = `intent://${path}#Intent;scheme=https;package=com.android.chrome;end`;
}

export default function PWAInstallButton({ currentLang }: PWAInstallButtonProps) {
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [visible, setVisible] = useState(false);
  const [status, setStatus] = useState<'waiting' | 'ready' | 'installed'>('waiting');
  const [temporaryMessage, setTemporaryMessage] = useState('');

  const copy = copyByLang[currentLang] || copyByLang.en;
  const isRtl = currentLang === 'ar' || currentLang === 'ku';

  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (isStandaloneMode()) {
      setVisible(false);
      setStatus('installed');
      return;
    }

    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();

      const promptEvent = event as BeforeInstallPromptEvent;
      setInstallPrompt(promptEvent);
      setStatus('ready');
      setVisible(true);
      setTemporaryMessage('');
    };

    const handleAppInstalled = () => {
      setInstallPrompt(null);
      setStatus('installed');
      setVisible(false);
      setTemporaryMessage(copy.installed);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    /*
      Fallback:
      If the user is inside WhatsApp/Facebook/Instagram browser on Android,
      show only "Open in Chrome". No share instructions, no help popup.
    */
    if (isAndroid() && isInAppBrowser()) {
      setVisible(true);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, [copy.installed]);

  const handleInstallClick = async () => {
    if (isStandaloneMode()) {
      setVisible(false);
      setStatus('installed');
      return;
    }

    if (installPrompt) {
      const promptEvent = installPrompt;
      setInstallPrompt(null);

      try {
        await promptEvent.prompt();
        const choice = await promptEvent.userChoice.catch(() => null);

        if (choice?.outcome === 'accepted') {
          setStatus('installed');
          setVisible(false);
          setTemporaryMessage(copy.installed);
        } else {
          /*
            User cancelled. Do not open share instructions.
            Browser may not allow the same prompt again until later.
          */
          setStatus('waiting');
          setTemporaryMessage('');
        }
      } catch {
        setTemporaryMessage(copy.unavailable);
      }

      return;
    }

    /*
      No native install prompt available.
      Do NOT show share instructions.
      For Android in-app browsers, open Chrome directly.
    */
    if (isAndroid() && isInAppBrowser()) {
      openInChrome();
      return;
    }

    setTemporaryMessage(copy.unavailable);
    window.setTimeout(() => setTemporaryMessage(''), 3500);
  };

  /*
    Clean behavior:
    - show button only when native install is ready
    - or when Android in-app browser can open Chrome
    - otherwise no confusing share popup
  */
  if (!visible) return null;

  const canOpenChrome = isAndroid() && isInAppBrowser() && !installPrompt;

  return (
    <>
      <button
        type="button"
        onClick={handleInstallClick}
        className="fixed left-4 top-1/2 z-[9999] -translate-y-1/2 rounded-full border border-emerald-300/80 bg-gradient-to-br from-emerald-500 via-cyan-500 to-blue-500 px-4 py-3 text-white shadow-[0_0_26px_rgba(16,185,129,0.85)] backdrop-blur-xl transition hover:scale-110 active:scale-95 animate-pulse"
        aria-label={canOpenChrome ? copy.openChrome : copy.install}
        title={canOpenChrome ? copy.openChrome : copy.ready}
        dir={isRtl ? 'rtl' : 'ltr'}
      >
        <span className="absolute inset-[-7px] -z-10 rounded-full bg-cyan-400/20 blur-xl" />
        <span className="absolute inset-[-14px] -z-20 rounded-full bg-emerald-500/20 blur-2xl" />

        <span className="flex flex-col items-center justify-center gap-1 text-[11px] font-black leading-tight">
          {canOpenChrome ? (
            <ExternalLink className="h-5 w-5 drop-shadow" />
          ) : status === 'installed' ? (
            <CheckCircle2 className="h-5 w-5 drop-shadow" />
          ) : (
            <Download className="h-5 w-5 drop-shadow" />
          )}

          <span className="max-w-[82px] text-center">
            {canOpenChrome ? copy.openChrome : copy.install}
          </span>
        </span>
      </button>

      {temporaryMessage ? (
        <div
          className="fixed left-1/2 top-5 z-[10000] max-w-[92vw] -translate-x-1/2 rounded-2xl border border-amber-400/30 bg-black/85 px-4 py-3 text-center text-xs font-bold leading-6 text-amber-100 shadow-2xl"
          dir={isRtl ? 'rtl' : 'ltr'}
        >
          {temporaryMessage}
        </div>
      ) : null}
    </>
  );
}
