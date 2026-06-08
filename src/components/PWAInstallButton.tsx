import { useEffect, useState } from 'react';
import { Download, ExternalLink } from 'lucide-react';
import { Language } from '../types';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

interface PWAInstallButtonProps {
  currentLang: Language;
}

declare global {
  interface Window {
    __shakuMakuInstallPrompt?: BeforeInstallPromptEvent | null;
  }
}

const copyByLang = {
  en: {
    install: 'Install App',
    openChrome: 'Open in Chrome'
  },
  ar: {
    install: 'ثبّت التطبيق',
    openChrome: 'افتح في Chrome'
  },
  ku: {
    install: 'دایبەزێنە',
    openChrome: 'لە Chrome بکەرەوە'
  }
};

function getInstallPrompt(): BeforeInstallPromptEvent | null {
  return typeof window === 'undefined' ? null : window.__shakuMakuInstallPrompt || null;
}

function isStandaloneMode(): boolean {
  return (
    window.matchMedia?.('(display-mode: standalone)').matches ||
    (window.navigator as Navigator & { standalone?: boolean }).standalone === true
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
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(() =>
    getInstallPrompt()
  );
  const [visible, setVisible] = useState(false);

  const copy = copyByLang[currentLang] || copyByLang.en;
  const isRtl = currentLang === 'ar' || currentLang === 'ku';
  const canOpenChrome = isAndroid() && isInAppBrowser() && !installPrompt;
  const label = canOpenChrome ? copy.openChrome : copy.install;

  useEffect(() => {
    if (typeof window === 'undefined' || isStandaloneMode()) {
      return;
    }

    const refreshButton = () => {
      const prompt = getInstallPrompt();
      setInstallPrompt(prompt);
      setVisible(Boolean(prompt) || (isAndroid() && isInAppBrowser()));
    };

    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      window.__shakuMakuInstallPrompt = event as BeforeInstallPromptEvent;
      console.info('[ShakuMaku] PWA install prompt captured');
      refreshButton();
    };

    const handleAppInstalled = () => {
      window.__shakuMakuInstallPrompt = null;
      setInstallPrompt(null);
      setVisible(false);
      console.info('[ShakuMaku] PWA installed');
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('shaku-maku-install-prompt-ready', refreshButton);
    window.addEventListener('appinstalled', handleAppInstalled);
    refreshButton();

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('shaku-maku-install-prompt-ready', refreshButton);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    console.info('[ShakuMaku] PWA install button clicked');

    if (canOpenChrome) {
      openInChrome();
      return;
    }

    const prompt = installPrompt || getInstallPrompt();

    if (!prompt) {
      console.info('[ShakuMaku] PWA no install prompt available');
      setVisible(false);
      return;
    }

    window.__shakuMakuInstallPrompt = null;
    setInstallPrompt(null);

    try {
      await prompt.prompt();
      const choice = await prompt.userChoice.catch(() => null);

      if (choice?.outcome === 'accepted') {
        setVisible(false);
        return;
      }
    } catch {
      console.info('[ShakuMaku] PWA no install prompt available');
    }

    setVisible(false);
  };

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={handleInstallClick}
      className="fixed left-4 top-1/2 z-[9999] -translate-y-1/2 animate-pulse rounded-full border border-emerald-300/80 bg-gradient-to-br from-emerald-500 via-cyan-500 to-blue-500 px-4 py-3 text-white shadow-[0_0_26px_rgba(16,185,129,0.85)] backdrop-blur-xl transition hover:scale-110 active:scale-95"
      aria-label={label}
      title={label}
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      <span className="absolute inset-[-7px] -z-10 rounded-full bg-cyan-400/20 blur-xl" />
      <span className="absolute inset-[-14px] -z-20 rounded-full bg-emerald-500/20 blur-2xl" />

      <span className="flex flex-col items-center justify-center gap-1 text-[11px] font-black leading-tight">
        {canOpenChrome ? (
          <ExternalLink className="h-5 w-5 drop-shadow" />
        ) : (
          <Download className="h-5 w-5 drop-shadow" />
        )}

        <span className="max-w-[82px] text-center">{label}</span>
      </span>
    </button>
  );
}
