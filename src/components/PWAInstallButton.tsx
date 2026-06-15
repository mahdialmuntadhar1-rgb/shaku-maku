import React, { useEffect, useState } from 'react';

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
};

declare global {
  interface Window {
    __shakuMakuInstallPrompt?: BeforeInstallPromptEvent | null;
    __shakuMakuInstalled?: boolean;
  }
}

type PWAInstallButtonProps = {
  currentLang?: 'ar' | 'ku' | 'en' | string;
};

const isStandaloneMode = () => {
  const nav = window.navigator as Navigator & { standalone?: boolean };
  return window.matchMedia('(display-mode: standalone)').matches || nav.standalone === true || window.__shakuMakuInstalled === true;
};

const getText = (lang?: string) => {
  if (lang === 'ar') {
    return {
      install: 'تثبيت',
      wait: 'افتح من قائمة المتصفح',
      manual: 'إذا لم تظهر نافذة التثبيت، اضغط قائمة المتصفح واختر تثبيت التطبيق أو إضافة إلى الشاشة الرئيسية.'
    };
  }

  if (lang === 'ku') {
    return {
      install: 'دامەزراندن',
      wait: 'لە لیستی وێبگەڕەوە',
      manual: 'ئەگەر پەنجەرەی دامەزراندن دەرنەکەوت، لیستی وێبگەڕ بکەرەوە و Install app یان Add to Home screen هەڵبژێرە.'
    };
  }

  return {
    install: 'Install',
    wait: 'Use browser menu',
    manual: 'If the install prompt does not appear, open the browser menu and choose Install app or Add to Home screen.'
  };
};

const PWAInstallButton: React.FC<PWAInstallButtonProps> = ({ currentLang = 'en' }) => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');

  const text = getText(currentLang);

  useEffect(() => {
    if (isStandaloneMode()) {
      setVisible(false);
      return;
    }

    setVisible(true);

    if (window.__shakuMakuInstallPrompt) {
      setDeferredPrompt(window.__shakuMakuInstallPrompt);
    }

    const onInstallReady = () => {
      if (window.__shakuMakuInstallPrompt) {
        setDeferredPrompt(window.__shakuMakuInstallPrompt);
        setVisible(true);
        setMessage('');
      }
    };

    const onInstalled = () => {
      setDeferredPrompt(null);
      window.__shakuMakuInstallPrompt = null;
      setVisible(false);
      setMessage('');
    };

    window.addEventListener('shaku-maku-install-ready', onInstallReady);
    window.addEventListener('shaku-maku-install-prompt-ready', onInstallReady);
    window.addEventListener('shaku-maku-installed', onInstalled);

    return () => {
      window.removeEventListener('shaku-maku-install-ready', onInstallReady);
      window.removeEventListener('shaku-maku-install-prompt-ready', onInstallReady);
      window.removeEventListener('shaku-maku-installed', onInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    const promptEvent = deferredPrompt || window.__shakuMakuInstallPrompt;

    if (!promptEvent) {
      setMessage(text.manual);
      return;
    }

    try {
      await promptEvent.prompt();
      const choice = await promptEvent.userChoice;

      if (choice.outcome === 'accepted') {
        setVisible(false);
      } else {
        setMessage(text.manual);
      }

      setDeferredPrompt(null);
      window.__shakuMakuInstallPrompt = null;
    } catch (error) {
      console.warn('PWA install prompt failed:', error);
      setMessage(text.manual);
    }
  };

  if (!visible) return null;

  return (
    <div className="fixed left-0 top-1/2 -translate-y-1/2 z-[99999] flex items-center">
      <button
        type="button"
        onClick={handleInstallClick}
        aria-label={text.install}
        title={text.install}
        className="h-11 min-w-[86px] px-4 rounded-r-2xl bg-gradient-to-r from-emerald-400 via-teal-400 to-yellow-300 text-zinc-900 text-sm font-black shadow-[0_0_20px_rgba(45,212,191,0.85)] border-2 border-white/70 active:scale-95 animate-pulse"
        style={{
          pointerEvents: 'auto',
          touchAction: 'manipulation',
          WebkitTapHighlightColor: 'transparent'
        }}
      >
        {text.install}
      </button>

      {message && (
        <div
          className="ml-2 max-w-[210px] rounded-xl bg-white text-zinc-800 shadow-xl border border-zinc-200 px-3 py-2 text-xs leading-5"
          dir={currentLang === 'en' ? 'ltr' : 'rtl'}
        >
          {message}
        </div>
      )}
    </div>
  );
};

export default PWAInstallButton;
