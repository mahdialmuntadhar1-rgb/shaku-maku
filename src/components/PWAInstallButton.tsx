import React, { useEffect, useState } from 'react';

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
};

type PWAInstallButtonProps = {
  currentLang?: 'ar' | 'ku' | 'en' | string;
};

const isStandaloneMode = () => {
  const nav = window.navigator as Navigator & { standalone?: boolean };
  return window.matchMedia('(display-mode: standalone)').matches || nav.standalone === true;
};

const getText = (lang?: string) => {
  if (lang === 'ar') {
    return {
      install: 'تثبيت',
      title: 'تثبيت التطبيق',
      body: 'إذا لم تظهر نافذة التثبيت، افتح قائمة المتصفح واختر إضافة إلى الشاشة الرئيسية.',
      close: 'إغلاق'
    };
  }

  if (lang === 'ku') {
    return {
      install: 'دامەزراندن',
      title: 'دامەزراندنی ئەپ',
      body: 'ئەگەر پەنجەرەی دامەزراندن دەرنەکەوت، لیستی وێبگەڕ بکەرەوە و Add to Home screen هەڵبژێرە.',
      close: 'داخستن'
    };
  }

  return {
    install: 'Install',
    title: 'Install app',
    body: 'If the install prompt does not appear, open your browser menu and choose Add to Home screen.',
    close: 'Close'
  };
};

const PWAInstallButton: React.FC<PWAInstallButtonProps> = ({ currentLang = 'en' }) => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [visible, setVisible] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  const text = getText(currentLang);

  useEffect(() => {
    if (isStandaloneMode()) {
      setVisible(false);
      return;
    }

    setVisible(true);

    const onBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      setDeferredPrompt(event as BeforeInstallPromptEvent);
      setVisible(true);
    };

    const onInstalled = () => {
      setDeferredPrompt(null);
      setVisible(false);
      setShowHelp(false);
    };

    window.addEventListener('beforeinstallprompt', onBeforeInstallPrompt);
    window.addEventListener('appinstalled', onInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', onBeforeInstallPrompt);
      window.removeEventListener('appinstalled', onInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      try {
        await deferredPrompt.prompt();
        await deferredPrompt.userChoice;
        setDeferredPrompt(null);
      } catch (error) {
        console.warn('PWA install prompt failed:', error);
        setShowHelp(true);
      }
      return;
    }

    setShowHelp(true);
  };

  if (!visible) return null;

  return (
    <>
      <button
        type="button"
        onClick={handleInstallClick}
        aria-label={text.title}
        title={text.title}
        className="fixed left-0 top-1/2 -translate-y-1/2 z-[99999] h-10 px-3 rounded-r-xl bg-luxury-teal text-white text-xs font-black shadow-xl border border-white/20 active:scale-95"
        style={{
          pointerEvents: 'auto',
          touchAction: 'manipulation',
          WebkitTapHighlightColor: 'transparent'
        }}
      >
        {text.install}
      </button>

      {showHelp && (
        <div
          className="fixed inset-0 z-[100000] bg-black/45 flex items-center justify-center p-4"
          onClick={() => setShowHelp(false)}
        >
          <div
            className="w-full max-w-sm rounded-2xl bg-white text-zinc-900 shadow-2xl p-5 space-y-3"
            onClick={(event) => event.stopPropagation()}
            dir={currentLang === 'en' ? 'ltr' : 'rtl'}
          >
            <h3 className="text-lg font-black">{text.title}</h3>
            <p className="text-sm text-zinc-600 leading-6">{text.body}</p>
            <button
              type="button"
              onClick={() => setShowHelp(false)}
              className="w-full py-2.5 rounded-xl bg-luxury-teal text-white font-bold"
            >
              {text.close}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default PWAInstallButton;
