import React, { useEffect, useMemo, useState } from 'react';

type BeforeInstallPromptEventLike = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: string; platform?: string }>;
};

function isIosDevice(): boolean {
  if (typeof window === 'undefined') return false;

  const ua = window.navigator.userAgent.toLowerCase();
  const isIOS = /iphone|ipad|ipod/.test(ua);
  const isIpadOS =
    window.navigator.platform === 'MacIntel' &&
    Number((window.navigator as any).maxTouchPoints || 0) > 1;

  return isIOS || isIpadOS;
}

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

  const [showHelp, setShowHelp] = useState(false);
  const [installed, setInstalled] = useState(false);

  const isIOS = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return isIosDevice();
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    setInstalled(isStandaloneMode());

    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      setDeferredPrompt(event as BeforeInstallPromptEventLike);
      setInstalled(false);
    };

    const handleInstalled = () => {
      setInstalled(true);
      setDeferredPrompt(null);
      setShowHelp(false);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleInstalled);
    };
  }, []);

  async function handleInstallClick() {
    if (isStandaloneMode()) {
      setInstalled(true);
      return;
    }

    if (deferredPrompt) {
      try {
        await deferredPrompt.prompt();
        const choice = await deferredPrompt.userChoice;

        if (choice.outcome === 'accepted') {
          setInstalled(true);
          setDeferredPrompt(null);
          setShowHelp(false);
        } else {
          setShowHelp(true);
        }
      } catch {
        setShowHelp(true);
      }

      return;
    }

    setShowHelp(true);
  }

  if (installed) return null;

  return (
    <>
      <button
        type="button"
        onClick={handleInstallClick}
        aria-label="Install Shaku Maku app"
        style={{
          position: 'fixed',
          top: 'calc(env(safe-area-inset-top, 0px) + 14px)',
          right: '14px',
          zIndex: 2147483000,
          border: '0',
          borderRadius: '999px',
          padding: '11px 15px',
          fontSize: '14px',
          fontWeight: 800,
          cursor: 'pointer',
          color: '#ffffff',
          background: 'linear-gradient(135deg, #ff7a18, #ff005c)',
          boxShadow: '0 0 0 3px rgba(255, 122, 24, 0.18), 0 10px 30px rgba(0,0,0,0.25)',
          direction: 'rtl',
          maxWidth: 'calc(100vw - 28px)',
          whiteSpace: 'nowrap',
        }}
      >
        ثبّت التطبيق
      </button>

      {showHelp && (
        <div
          role="dialog"
          aria-modal="true"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 2147483001,
            background: 'rgba(0,0,0,0.55)',
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
            padding: '16px',
          }}
          onClick={() => setShowHelp(false)}
        >
          <div
            onClick={(event) => event.stopPropagation()}
            style={{
              width: '100%',
              maxWidth: '440px',
              borderRadius: '22px',
              background: '#ffffff',
              color: '#111827',
              padding: '20px',
              boxShadow: '0 20px 60px rgba(0,0,0,0.35)',
              direction: 'rtl',
              fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
            }}
          >
            <h2 style={{ margin: '0 0 10px', fontSize: '20px' }}>
              تثبيت تطبيق شكو ماكو
            </h2>

            {isIOS ? (
              <div style={{ lineHeight: 1.9, fontSize: '15px' }}>
                <p style={{ margin: '0 0 8px' }}>
                  على الآيفون أو الآيباد:
                </p>
                <ol style={{ margin: 0, paddingRight: '20px' }}>
                  <li>اضغط زر المشاركة Share</li>
                  <li>اختر Add to Home Screen</li>
                  <li>اضغط Add</li>
                </ol>
              </div>
            ) : (
              <div style={{ lineHeight: 1.9, fontSize: '15px' }}>
                <p style={{ margin: '0 0 8px' }}>
                  على أندرويد:
                </p>
                <ol style={{ margin: 0, paddingRight: '20px' }}>
                  <li>افتح قائمة المتصفح ⋮</li>
                  <li>اختر Install app أو Add to Home screen</li>
                  <li>اضغط Install أو Add</li>
                </ol>
              </div>
            )}

            <p style={{ margin: '14px 0 0', fontSize: '13px', color: '#6b7280' }}>
              English: open browser menu, then choose Install app / Add to Home Screen.
            </p>

            <button
              type="button"
              onClick={() => setShowHelp(false)}
              style={{
                marginTop: '16px',
                width: '100%',
                border: 0,
                borderRadius: '14px',
                padding: '12px',
                fontSize: '15px',
                fontWeight: 800,
                cursor: 'pointer',
                color: '#ffffff',
                background: '#111827',
              }}
            >
              تمام
            </button>
          </div>
        </div>
      )}
    </>
  );
}
