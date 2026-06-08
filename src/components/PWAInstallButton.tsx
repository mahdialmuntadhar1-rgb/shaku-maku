import React, { useEffect, useState } from 'react';
import { Download, CheckCircle2, ExternalLink, Info, X } from 'lucide-react';
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
    installed: 'Installed',
    openChrome: 'Open in Chrome',
    unavailableTitle: 'Install from browser menu',
    unavailableBody:
      'Chrome did not open the install popup automatically. Use Chrome/Edge menu ⋮ → Cast, save, and share → Install Shaku Maku. On mobile, open Chrome menu ⋮ → Add to Home screen / Install app.',
    close: 'Close'
  },
  ar: {
    install: 'ثبّت التطبيق',
    installed: 'تم التثبيت',
    openChrome: 'افتح في Chrome',
    unavailableTitle: 'ثبّت التطبيق من قائمة المتصفح',
    unavailableBody:
      'إذا لم تظهر نافذة التثبيت تلقائياً، افتح قائمة Chrome أو Edge ⋮ ثم اختر Install Shaku Maku أو Add to Home screen.',
    close: 'إغلاق'
  },
  ku: {
    install: 'دایبەزێنە',
    installed: 'دامەزرا',
    openChrome: 'لە Chrome بکەرەوە',
    unavailableTitle: 'لە لیستی وێبگەڕەوە دایبەزێنە',
    unavailableBody:
      'ئەگەر پەنجەرەی دامەزراندن خۆکارانە دەرنەکەوت، لیستی Chrome یان Edge ⋮ بکەرەوە و Install Shaku Maku یان Add to Home screen هەڵبژێرە.',
    close: 'داخستن'
  }
};

function isStandaloneMode(): boolean {
  return (
    window.matchMedia?.('(display-mode: standalone)').matches ||
    (window.navigator as any).standalone === true
  );
}

function isAndroid(): boolean {
  return /Android/i.test(navigator.userAgent);
}

function isInAppBrowser(): boolean {
  return /FBAN|FBAV|Instagram|Line|Twitter|GSA|Gmail|TikTok|Snapchat|WhatsApp/i.test(
    navigator.userAgent
  );
}

function openInChrome(): void {
  const currentUrl = new URL(window.location.href);
  const path = currentUrl.host + currentUrl.pathname + currentUrl.search + currentUrl.hash;
  window.location.href = `intent://${path}#Intent;scheme=https;package=com.android.chrome;end`;
}

export default function PWAInstallButton({ currentLang }: PWAInstallButtonProps) {
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [visible, setVisible] = useState(false);
  const [installed, setInstalled] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  const copy = copyByLang[currentLang] || copyByLang.en;
  const isRtl = currentLang === 'ar' || currentLang === 'ku';

  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (isStandaloneMode()) {
      setVisible(false);
      setInstalled(true);
      return;
    }

    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      const promptEvent = event as BeforeInstallPromptEvent;
      (window as any).__shakuMakuInstallPrompt = promptEvent;
      setInstallPrompt(promptEvent);
      setVisible(true);
      setInstalled(false);
      setShowHelp(false);
    };

    const syncGlobalInstallPrompt = () => {
      const globalPrompt = (window as any).__shakuMakuInstallPrompt as BeforeInstallPromptEvent | null | undefined;

      if (!globalPrompt) return;

      setInstallPrompt(globalPrompt);
      setVisible(true);
      setInstalled(false);
      setShowHelp(false);
    };

    const handleAppInstalled = () => {
      setInstallPrompt(null);
      setVisible(false);
      setInstalled(true);
      setShowHelp(false);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('shaku-maku-install-prompt-ready', syncGlobalInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);
    syncGlobalInstallPrompt();

    const fallbackTimer = window.setTimeout(() => {
      if (!isStandaloneMode()) {
        syncGlobalInstallPrompt();
        setVisible(true);
      }
    }, 1500);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('shaku-maku-install-prompt-ready', syncGlobalInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
      window.clearTimeout(fallbackTimer);
    };
  }, []);

  const handleInstallClick = async () => {
    console.info('[ShakuMaku] PWA install button clicked');

    if (isStandaloneMode()) {
      setVisible(false);
      setInstalled(true);
      setShowHelp(false);
      return;
    }

    if (isAndroid() && isInAppBrowser() && !installPrompt) {
      openInChrome();
      return;
    }

    const globalPrompt = (window as any).__shakuMakuInstallPrompt as BeforeInstallPromptEvent | undefined;
    const activePrompt = installPrompt || globalPrompt || null;

    if (!activePrompt) {
      console.info('[ShakuMaku] PWA no install prompt available');
      setShowHelp(true);
      return;
    }

    const promptEvent = activePrompt;
    (window as any).__shakuMakuInstallPrompt = null;
    setInstallPrompt(null);

    try {
      await promptEvent.prompt();
      const choice = await promptEvent.userChoice.catch(() => null);

      if (choice?.outcome === 'accepted') {
        setInstalled(true);
        setVisible(false);
        setShowHelp(false);
      } else {
        setShowHelp(true);
        setVisible(true);
      }
    } catch {
      setShowHelp(true);
      setVisible(true);
    }
  };

  if (!visible) return null;

  const globalPrompt = (window as any).__shakuMakuInstallPrompt as BeforeInstallPromptEvent | null | undefined;
  const canInstallNow = Boolean(installPrompt || globalPrompt);
  const canOpenChrome = isAndroid() && isInAppBrowser() && !canInstallNow;
  const shouldPulse = canInstallNow || canOpenChrome;

  return (
    <>
      <button
        type="button"
        onClick={handleInstallClick}
        className={`fixed left-4 top-1/2 z-[9999] -translate-y-1/2 rounded-full border border-emerald-300/80 bg-gradient-to-br from-emerald-500 via-cyan-500 to-blue-500 px-4 py-3 text-white shadow-[0_0_26px_rgba(16,185,129,0.85)] backdrop-blur-xl transition hover:scale-110 active:scale-95 ${
          shouldPulse ? 'animate-pulse' : ''
        }`}
        aria-label={canOpenChrome ? copy.openChrome : copy.install}
        title={canOpenChrome ? copy.openChrome : copy.install}
        dir={isRtl ? 'rtl' : 'ltr'}
      >
        <span className="absolute inset-[-7px] -z-10 rounded-full bg-cyan-400/20 blur-xl" />
        <span className="absolute inset-[-14px] -z-20 rounded-full bg-emerald-500/20 blur-2xl" />

        <span className="flex flex-col items-center justify-center gap-1 text-[11px] font-black leading-tight">
          {canOpenChrome ? (
            <ExternalLink className="h-5 w-5 drop-shadow" />
          ) : installed ? (
            <CheckCircle2 className="h-5 w-5 drop-shadow" />
          ) : canInstallNow ? (
            <Download className="h-5 w-5 drop-shadow" />
          ) : (
            <Info className="h-5 w-5 drop-shadow" />
          )}

          <span className="max-w-[82px] text-center">
            {canOpenChrome ? copy.openChrome : copy.install}
          </span>
        </span>
      </button>

      {showHelp && (
        <div
          className="fixed inset-x-4 bottom-5 z-[10000] mx-auto max-w-sm rounded-3xl border border-white/15 bg-slate-950/95 p-4 text-white shadow-2xl backdrop-blur-xl"
          dir={isRtl ? 'rtl' : 'ltr'}
        >
          <button
            type="button"
            onClick={() => setShowHelp(false)}
            className="absolute right-3 top-3 rounded-full bg-white/10 p-1 hover:bg-white/20"
            aria-label={copy.close}
          >
            <X className="h-4 w-4" />
          </button>

          <div className="pr-8">
            <div className="mb-1 text-sm font-black">{copy.unavailableTitle}</div>
            <div className="text-xs leading-6 text-white/75">{copy.unavailableBody}</div>
          </div>
        </div>
      )}
    </>
  );
}


