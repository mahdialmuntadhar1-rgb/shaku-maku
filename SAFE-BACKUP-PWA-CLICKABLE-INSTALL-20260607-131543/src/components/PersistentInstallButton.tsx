import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

type Lang = 'ar' | 'ku' | 'en';

type BeforeInstallPromptEventLike = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: string; platform?: string }>;
};

declare global {
  interface Window {
    __shakuDeferredInstallPrompt?: BeforeInstallPromptEventLike | null;
    __shakuInstallReady?: boolean;
  }
}

const INSTALL_TEXT: Record<Lang, string> = {
  ar: 'ثبّت',
  ku: 'دایبەزێنە',
  en: 'Install',
};

const INSTALL_NOTE: Record<Lang, string> = {
  ar: 'إذا لم تظهر نافذة التثبيت، افتح القائمة ⋮ واختر Install app',
  ku: 'ئەگەر پەنجەرەی دابەزاندن دەرنەکەوت، لە لیستی ⋮ هەڵبژێرە Install app',
  en: 'If install does not appear, open menu ⋮ and choose Install app',
};

function normalizeLang(value: string | null | undefined): Lang | null {
  if (!value) return null;

  const v = value.toLowerCase().trim();

  if (
    v.includes('ku') ||
    v.includes('ckb') ||
    v.includes('sorani') ||
    v.includes('kurd') ||
    v.includes('کورد') ||
    v.includes('kurdi')
  ) {
    return 'ku';
  }

  if (v.includes('en') || v.includes('english')) {
    return 'en';
  }

  if (v.includes('ar') || v.includes('arabic') || v.includes('عربي') || v.includes('العربية')) {
    return 'ar';
  }

  return null;
}

function getCurrentLang(): Lang {
  if (typeof window === 'undefined') return 'ar';

  const keys = [
    'language',
    'lang',
    'locale',
    'i18nextLng',
    'selectedLanguage',
    'selectedLang',
    'appLanguage',
    'shaku-language',
    'shakuLanguage',
    'shaku_maku_language',
    'shakuMakuLanguage',
  ];

  for (const key of keys) {
    try {
      const found = normalizeLang(window.localStorage.getItem(key));
      if (found) return found;
    } catch {
      // ignore
    }
  }

  try {
    for (let i = 0; i < window.localStorage.length; i += 1) {
      const key = window.localStorage.key(i);
      if (!key) continue;

      const keyLang = normalizeLang(key);
      const valueLang = normalizeLang(window.localStorage.getItem(key));

      if (keyLang) return keyLang;
      if (valueLang) return valueLang;
    }
  } catch {
    // ignore
  }

  const htmlLang = normalizeLang(document.documentElement.lang);
  if (htmlLang) return htmlLang;

  const bodyLang = normalizeLang(document.body.getAttribute('lang'));
  if (bodyLang) return bodyLang;

  const pageText = (document.body.innerText || '').slice(0, 2000).toLowerCase();

  if (pageText.includes('کوردی') || pageText.includes('بزنز') || pageText.includes('دایبەزێنە')) {
    return 'ku';
  }

  if (pageText.includes('register your business') || pageText.includes('login')) {
    return 'en';
  }

  return 'ar';
}

function isStandaloneMode(): boolean {
  if (typeof window === 'undefined') return false;

  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    (window.navigator as any).standalone === true
  );
}

export default function PersistentInstallButton() {
  const [mounted, setMounted] = useState(false);
  const [standalone, setStandalone] = useState(false);
  const [ready, setReady] = useState(false);
  const [lang, setLang] = useState<Lang>('ar');
  const [note, setNote] = useState('');

  useEffect(() => {
    if (typeof window === 'undefined') return;

    setMounted(true);

    const refresh = () => {
      setStandalone(isStandaloneMode());
      setReady(Boolean(window.__shakuDeferredInstallPrompt || window.__shakuInstallReady));
      setLang(getCurrentLang());
    };

    refresh();

    const media = window.matchMedia('(display-mode: standalone)');
    media.addEventListener?.('change', refresh);

    window.addEventListener('storage', refresh);
    window.addEventListener('languagechange', refresh);
    window.addEventListener('shaku-install-ready', refresh);
    window.addEventListener('shaku-app-installed', refresh);
    window.addEventListener('click', refresh, true);

    const interval = window.setInterval(refresh, 700);

    return () => {
      media.removeEventListener?.('change', refresh);
      window.removeEventListener('storage', refresh);
      window.removeEventListener('languagechange', refresh);
      window.removeEventListener('shaku-install-ready', refresh);
      window.removeEventListener('shaku-app-installed', refresh);
      window.removeEventListener('click', refresh, true);
      window.clearInterval(interval);
    };
  }, []);

  async function handleInstallClick(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    event.stopPropagation();

    if (isStandaloneMode()) {
      setStandalone(true);
      return;
    }

    const promptEvent = window.__shakuDeferredInstallPrompt || null;

    if (!promptEvent) {
      setNote(INSTALL_NOTE[lang]);
      window.setTimeout(() => setNote(''), 3500);
      return;
    }

    try {
      await promptEvent.prompt();
      const choice = await promptEvent.userChoice;

      window.__shakuDeferredInstallPrompt = null;
      window.__shakuInstallReady = false;
      setReady(false);

      if (choice.outcome === 'accepted') {
        setStandalone(true);
      }
    } catch {
      setNote(INSTALL_NOTE[lang]);
      window.setTimeout(() => setNote(''), 3500);
    }
  }

  if (!mounted || standalone || typeof document === 'undefined') return null;

  const isKurdish = lang === 'ku';

  return createPortal(
    <>
      <style>
        {`
          @keyframes shakuInstallGlow {
            0%, 100% {
              box-shadow:
                0 0 0 3px rgba(255, 122, 24, 0.23),
                0 0 13px rgba(255, 0, 92, 0.50),
                0 8px 22px rgba(0, 0, 0, 0.26);
            }
            50% {
              box-shadow:
                0 0 0 6px rgba(255, 122, 24, 0.12),
                0 0 26px rgba(255, 0, 92, 0.88),
                0 12px 30px rgba(0, 0, 0, 0.34);
            }
          }

          .shaku-pwa-install-button {
            position: fixed !important;
            left: 8px !important;
            top: 50% !important;
            transform: translateY(-50%) !important;
            z-index: 2147483647 !important;
            border: 0 !important;
            border-radius: 999px !important;
            padding: ${isKurdish ? '9px 11px' : '9px 12px'} !important;
            min-width: ${isKurdish ? '104px' : '78px'} !important;
            font-size: ${isKurdish ? '12px' : '12.5px'} !important;
            font-weight: 900 !important;
            line-height: 1.15 !important;
            cursor: pointer !important;
            pointer-events: auto !important;
            touch-action: manipulation !important;
            user-select: none !important;
            color: #ffffff !important;
            background: linear-gradient(135deg, #ff7a18, #ff005c) !important;
            direction: ${lang === 'en' ? 'ltr' : 'rtl'} !important;
            white-space: nowrap !important;
            animation: shakuInstallGlow 1.45s ease-in-out infinite !important;
            -webkit-tap-highlight-color: transparent !important;
          }

          .shaku-pwa-install-button:active {
            transform: translateY(-50%) scale(0.94) !important;
          }

          .shaku-pwa-install-dot {
            display: inline-block;
            width: 6px;
            height: 6px;
            margin-inline-start: 5px;
            border-radius: 999px;
            background: ${ready ? '#22c55e' : '#ffffff'};
            opacity: ${ready ? '1' : '0.70'};
          }

          .shaku-pwa-install-note {
            position: fixed !important;
            left: 8px !important;
            top: calc(50% + 38px) !important;
            z-index: 2147483647 !important;
            max-width: 230px !important;
            padding: 8px 10px !important;
            border-radius: 12px !important;
            background: rgba(17, 24, 39, 0.94) !important;
            color: white !important;
            font-size: 12px !important;
            line-height: 1.5 !important;
            direction: ${lang === 'en' ? 'ltr' : 'rtl'} !important;
            box-shadow: 0 10px 24px rgba(0,0,0,0.30) !important;
          }
        `}
      </style>

      <button
        type="button"
        className="shaku-pwa-install-button"
        onClick={handleInstallClick}
        onPointerDown={(event) => event.stopPropagation()}
        aria-label="Install Shaku Maku app"
        title={INSTALL_TEXT[lang]}
      >
        {INSTALL_TEXT[lang]}
        <span className="shaku-pwa-install-dot" />
      </button>

      {note ? <div className="shaku-pwa-install-note">{note}</div> : null}
    </>,
    document.body
  );
}
