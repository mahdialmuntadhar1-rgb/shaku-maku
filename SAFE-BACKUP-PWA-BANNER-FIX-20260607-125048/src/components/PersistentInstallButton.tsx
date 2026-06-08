import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

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
  const [mounted, setMounted] = useState(false);
  const [standalone, setStandalone] = useState(false);
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEventLike | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    setMounted(true);

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

  async function handleInstallClick(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    event.stopPropagation();

    if (isStandaloneMode()) {
      setStandalone(true);
      return;
    }

    if (!deferredPrompt) {
      return;
    }

    try {
      await deferredPrompt.prompt();
      const choice = await deferredPrompt.userChoice;

      if (choice.outcome === 'accepted') {
        setStandalone(true);
      }

      setDeferredPrompt(null);
    } catch {
      setDeferredPrompt(null);
    }
  }

  if (!mounted || standalone || typeof document === 'undefined') return null;

  return createPortal(
    <>
      <style>
        {`
          @keyframes shakuPwaSmallGlow {
            0%, 100% {
              box-shadow:
                0 0 0 3px rgba(255, 122, 24, 0.24),
                0 0 14px rgba(255, 0, 92, 0.50),
                0 8px 24px rgba(0, 0, 0, 0.28);
              transform: translateY(-50%) scale(1);
            }

            50% {
              box-shadow:
                0 0 0 6px rgba(255, 122, 24, 0.12),
                0 0 28px rgba(255, 0, 92, 0.90),
                0 12px 32px rgba(0, 0, 0, 0.36);
              transform: translateY(-50%) scale(1.05);
            }
          }

          .shaku-pwa-install-small {
            position: fixed !important;
            left: 8px !important;
            top: 50% !important;
            z-index: 2147483647 !important;
            border: 0 !important;
            border-radius: 999px !important;
            padding: 10px 13px !important;
            min-width: 92px !important;
            font-size: 13px !important;
            font-weight: 900 !important;
            line-height: 1.15 !important;
            cursor: pointer !important;
            pointer-events: auto !important;
            touch-action: manipulation !important;
            user-select: none !important;
            color: #ffffff !important;
            background: linear-gradient(135deg, #ff7a18, #ff005c) !important;
            direction: rtl !important;
            white-space: nowrap !important;
            animation: shakuPwaSmallGlow 1.45s ease-in-out infinite !important;
            -webkit-tap-highlight-color: transparent !important;
          }

          .shaku-pwa-install-small:active {
            transform: translateY(-50%) scale(0.96) !important;
          }
        `}
      </style>

      <button
        type="button"
        className="shaku-pwa-install-small"
        onClick={handleInstallClick}
        onPointerDown={(event) => {
          event.stopPropagation();
        }}
        aria-label="Install Shaku Maku app"
        title="Install App"
      >
        ثبّت
      </button>
    </>,
    document.body
  );
}
