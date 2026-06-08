import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

type BeforeInstallPromptEventLike = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: string; platform?: string }>;
};

declare global {
  interface Window {
    __shakuDeferredInstallPrompt?: BeforeInstallPromptEventLike | null;
  }
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
  const [installReady, setInstallReady] = useState(false);
  const promptRef = useRef<BeforeInstallPromptEventLike | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    setMounted(true);

    const updateStandalone = () => {
      setStandalone(isStandaloneMode());
    };

    updateStandalone();

    const existingPrompt = window.__shakuDeferredInstallPrompt || null;
    if (existingPrompt) {
      promptRef.current = existingPrompt;
      setInstallReady(true);
    }

    const media = window.matchMedia('(display-mode: standalone)');
    media.addEventListener?.('change', updateStandalone);

    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();

      const promptEvent = event as BeforeInstallPromptEventLike;
      window.__shakuDeferredInstallPrompt = promptEvent;
      promptRef.current = promptEvent;
      setInstallReady(true);
    };

    const handleInstalled = () => {
      setStandalone(true);
      setInstallReady(false);
      promptRef.current = null;
      window.__shakuDeferredInstallPrompt = null;
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

    const promptEvent = promptRef.current || window.__shakuDeferredInstallPrompt || null;

    if (!promptEvent) {
      /*
        Browsers do not expose native install unless the PWA is eligible.
        Keep the click silent except a tiny visual shake so the UI does not open extra steps.
      */
      const btn = event.currentTarget;
      btn.animate(
        [
          { transform: 'translateY(-50%) scale(1)' },
          { transform: 'translateY(-50%) scale(0.94)' },
          { transform: 'translateY(-50%) scale(1)' }
        ],
        { duration: 180 }
      );
      return;
    }

    try {
      await promptEvent.prompt();
      const choice = await promptEvent.userChoice;

      if (choice.outcome === 'accepted') {
        setStandalone(true);
      }

      promptRef.current = null;
      window.__shakuDeferredInstallPrompt = null;
      setInstallReady(false);
    } catch {
      promptRef.current = null;
      window.__shakuDeferredInstallPrompt = null;
      setInstallReady(false);
    }
  }

  if (!mounted || standalone || typeof document === 'undefined') return null;

  return createPortal(
    <>
      <style>
        {`
          @keyframes shakuPwaGlow {
            0%, 100% {
              box-shadow:
                0 0 0 3px rgba(255, 122, 24, 0.23),
                0 0 13px rgba(255, 0, 92, 0.48),
                0 8px 22px rgba(0, 0, 0, 0.26);
            }

            50% {
              box-shadow:
                0 0 0 6px rgba(255, 122, 24, 0.11),
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
            padding: 9px 12px !important;
            min-width: 82px !important;
            font-size: 12.5px !important;
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
            animation: shakuPwaGlow 1.45s ease-in-out infinite !important;
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
            background: ${installReady ? '#22c55e' : '#ffffff'};
            opacity: ${installReady ? '1' : '0.75'};
          }
        `}
      </style>

      <button
        type="button"
        className="shaku-pwa-install-button"
        onClick={handleInstallClick}
        onPointerDown={(event) => event.stopPropagation()}
        aria-label="Install Shaku Maku app"
        title="Install App"
      >
        ثبّت
        <span className="shaku-pwa-install-dot" />
      </button>
    </>,
    document.body
  );
}
