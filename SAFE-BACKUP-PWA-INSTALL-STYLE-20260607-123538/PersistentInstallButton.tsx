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
  const [standalone, setStandalone] = useState(false);

  const isIOS = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return isIosDevice();
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const updateStandalone = () => {
      setStandalone(isStandaloneMode());
    };

    updateStandalone();

    const displayModeQuery = window.matchMedia('(display-mode: standalone)');
    displayModeQuery.addEventListener?.('change', updateStandalone);

    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      setDeferredPrompt(event as BeforeInstallPromptEventLike);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      displayModeQuery.removeEventListener?.('change', updateStandalone);
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  async function handleInstallClick() {
    if (deferredPrompt) {
      try {
        await deferredPrompt.prompt();
        const choice = await deferredPrompt.userChoice;

        /*
          Important:
          Do NOT hide the button after dismissed or accepted.
          Keep it persistent in normal browser mode.
          It should only disappear when the app is actually opened in standalone installed mode.
        */
        if (choice.outcome !== 'accepted') {
          setShowHelp(true);
        }
      } catch {
        setShowHelp(true);
      }

      return;
    }

    setShowHelp(true);
  }

  if (standalone) return null;

  return (
    <>
      <button
        type="button"
        onClick={handleInstallClick}
        aria-label="Install Shaku Maku app"
        style={{
          position: 'fixed',
          right: '12px',
          bottom: 'calc(env(safe-area-inset-bottom, 0px) + 18px)',
          zIndex: 2147483647,
          border: '0',
          borderRadius: '999px',
          padding: '12px 16px',
          fontSize: '14px',
          fontWeight: 900,
          cursor: 'pointer',
          color: '#ffffff',
          background: 'linear-gradient(135deg, #ff7a18, #ff005c)',
          boxShadow:
            '0 0 0 4px rgba(255, 122, 24, 0.20), 0 12px 34px rgba(0,0,0,0.35)',
          direction: 'rtl',
          maxWidth: 'calc(100vw - 24px)',
          whiteSpace: 'nowrap',
          lineHeight: 1.2,
          WebkitTapHighlightColor: 'transparent',
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
            zIndex: 2147483647,
            background: 'rgba(0,0,0,0.58)',
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
              maxWidth: '460px',
              borderRadius: '22px',
              background: '#ffffff',
              color: '#111827',
              padding: '20px',
              boxShadow: '0 20px 70px rgba(0,0,0,0.40)',
              direction: 'rtl',
              fontFamily:
                'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
            }}
          >
            <h2 style={{ margin: '0 0 10px', fontSize: '20px', fontWeight: 900 }}>
              تثبيت تطبيق شكو ماكو
            </h2>

            {isIOS ? (
              <div style={{ lineHeight: 1.9, fontSize: '15px' }}>
                <p style={{ margin: '0 0 8px' }}>على الآيفون أو الآيباد:</p>
                <ol style={{ margin: 0, paddingRight: '20px' }}>
                  <li>اضغط زر المشاركة Share</li>
                  <li>اختر Add to Home Screen</li>
                  <li>اضغط Add</li>
                </ol>
              </div>
            ) : (
              <div style={{ lineHeight: 1.9, fontSize: '15px' }}>
                <p style={{ margin: '0 0 8px' }}>على أندرويد:</p>
                <ol style={{ margin: 0, paddingRight: '20px' }}>
                  <li>إذا ظهر زر Install اضغط عليه</li>
                  <li>إذا لم يظهر، افتح قائمة المتصفح ⋮</li>
                  <li>اختر Install app أو Add to Home screen</li>
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
                fontWeight: 900,
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
