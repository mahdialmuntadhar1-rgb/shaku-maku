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
    installed: 'Installed',
    openChrome: 'Open in Chrome'
  },
  ar: {
    install: 'ثبّت التطبيق',
    installed: 'تم التثبيت',
    openChrome: 'افتح في Chrome'
  },
  ku: {
    install: 'دایبەزێنە',
    installed: 'دامەزرا',
    openChrome: 'لە Chrome بکەرەوە'
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
    };

    const syncGlobalInstallPrompt = () => {
      const globalPrompt = (window as any).__shakuMakuInstallPrompt as BeforeInstallPromptEvent | null | undefined;

      if (!globalPrompt) return;

      setInstallPrompt(globalPrompt);
      setVisible(true);
      setInstalled(false);
    };

    const handleAppInstalled = () => {
      setInstallPrompt(null);
      setVisible(false);
      setInstalled(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('shaku-maku-install-prompt-ready', syncGlobalInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);
    syncGlobalInstallPrompt();

    const showButtonTimer = window.setTimeout(() => {
      if (!isStandaloneMode()) {
        syncGlobalInstallPrompt();
        setVisible(true);
      }
    }, 1200);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('shaku-maku-install-prompt-ready', syncGlobalInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
      window.clearTimeout(showButtonTimer);
    };
  }, []);

  const handleInstallClick = async () => {
    console.info('[ShakuMaku] PWA install button clicked');

    if (isStandaloneMode()) {
      setVisible(false);
      setInstalled(true);
      return;
    }

    const globalPrompt = (window as any).__shakuMakuInstallPrompt as BeforeInstallPromptEvent | undefined;
    const activePrompt = installPrompt || globalPrompt || null;

    if (isAndroid() && isInAppBrowser() && !activePrompt) {
      openInChrome();
      return;
    }

    if (!activePrompt) {
      console.info('[ShakuMaku] PWA no install prompt available');
      setVisible(true);
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
      } else {
        setVisible(false);
      }
    } catch {
      console.info('[ShakuMaku] PWA no install prompt available');
      setVisible(false);
    }
  };

  if (!visible) return null;

  const globalPrompt = (window as any).__shakuMakuInstallPrompt as BeforeInstallPromptEvent | null | undefined;
  const canInstallNow = Boolean(installPrompt || globalPrompt);
  const canOpenChrome = isAndroid() && isInAppBrowser() && !canInstallNow;
  const shouldPulse = canInstallNow || canOpenChrome;

  return (
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
        ) : (
          <Download className="h-5 w-5 drop-shadow" />
        )}

        <span className="max-w-[82px] text-center">
          {canOpenChrome ? copy.openChrome : copy.install}
        </span>
      </span>
    </button>
  );
}
