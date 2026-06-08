import React, { useEffect, useState } from 'react';

type BeforeInstallPromptEventLike = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: string; platform?: string }>;
};

function isStandaloneMode(): boolean {
  if (typeof window === 'undefined') return false;

  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    (window.navigator as any).standalone === true
  );
}

export default function PersistentInstallButton() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEventLike | null>(null);

  const [standalone, setStandalone] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const updateStandalone = () => {
      setStandalone(isStandaloneMode());
    };

    updateStandalone();

    const media = window.matchMedia('(display-mode: standalone)');
    media.addEventListener?.('change', updateStandalone);

    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      setDeferredPrompt(event as BeforeInstallPromptEventLike);
    };

    const handleInstalled = () => {
      setStandalone(true);
      setDeferredPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleInstalled);

    return () => {
      media.removeEventListener?.('change', updateStandalone);
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleInstalled);
    };
  }, []);

  async function handleInstallClick() {
    if (!deferredPrompt) {
      return;
    }

    try {
      await deferredPrompt.prompt();
      await deferredPrompt.userChoice;
    } catch {
      // Silent: browser controls whether native install can appear.
    }
  }

  if (standalone) return null;

  return (
    <>
      <style>
        {`
          @keyframes shakuPwaGlow {
            0% {
              box-shadow:
                0 0 0 4px rgba(255, 122, 24, 0.25),
                0 0 16px rgba(255, 0, 92, 0.55),
                0 10px 28px rgba(0, 0, 0, 0.30);
            }

            50% {
              box-shadow:
                0 0 0 8px rgba(255, 122, 24, 0.12),
                0 0 34px rgba(255, 0, 92, 0.95),
                0 16px 42px rgba(0, 0, 0, 0.40);
            }

            100% {
              box-shadow:
                0 0 0 4px rgba(255, 122, 24, 0.25),
                0 0 16px rgba(255, 0, 92, 0.55),
                0 10px 28px rgba(0, 0, 0, 0.30);
            }
          }

          @keyframes shakuPwaPulse {
            0%, 100% {
              transform: translateY(-50%) scale(1);
            }

            50% {
              transform: translateY(-50%) scale(1.07);
            }
          }

          .shaku-pwa-install-button {
            position: fixed;
            left: 12px;
            top: 50%;
            z-index: 2147483647;
            border: 0;
            border-radius: 999px;
            padding: 15px 22px;
            min-width: 145px;
            font-size: 16px;
            font-weight: 950;
            line-height: 1.2;
            cursor: pointer;
            color: #ffffff;
            background: linear-gradient(135deg, #ff7a18, #ff005c);
            direction: rtl;
            white-space: nowrap;
            animation:
              shakuPwaGlow 1.4s ease-in-out infinite,
              shakuPwaPulse 1.4s ease-in-out infinite;
            -webkit-tap-highlight-color: transparent;
          }

          @media (max-width: 480px) {
            .shaku-pwa-install-button {
              left: 10px;
              padding: 14px 18px;
              min-width: 132px;
              font-size: 15px;
            }
          }
        `}
      </style>

      <button
        type="button"
        className="shaku-pwa-install-button"
        onClick={handleInstallClick}
        aria-label="Install Shaku Maku app"
        title="Install Shaku Maku"
      >
        ثبّت التطبيق
      </button>
    </>
  );
}
