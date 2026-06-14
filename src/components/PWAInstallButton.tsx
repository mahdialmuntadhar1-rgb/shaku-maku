import React, { useEffect, useState } from 'react';
import { Download, X } from 'lucide-react';
import { Language } from '../types';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

interface PWAInstallButtonProps {
  currentLang?: Language;
}

export default function PWAInstallButton({ currentLang = 'en' }: PWAInstallButtonProps) {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [dismissed, setDismissed] = useState(() => sessionStorage.getItem('pwa_install_dismissed') === '1');

  useEffect(() => {
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
      return;
    }

    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setIsInstallable(true);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setIsInstallable(false);
      setDeferredPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') setIsInstalled(true);
    setDeferredPrompt(null);
    setIsInstallable(false);
  };

  const handleDismiss = () => {
    sessionStorage.setItem('pwa_install_dismissed', '1');
    setDismissed(true);
  };

  if (isInstalled || !isInstallable || dismissed) return null;

  const message =
    currentLang === 'ar'
      ? 'ثبّت شكو ماكو لتجربة أفضل'
      : currentLang === 'ku'
      ? 'Shaku Maku دابەزێنە بۆ ئەزموونێکی باشتر'
      : 'Install Shaku Maku for a better experience';

  return (
    <div className="fixed sm:static bottom-4 inset-x-4 sm:inset-auto z-[120] sm:z-auto pointer-events-none sm:pointer-events-auto">
      <div className="mx-auto sm:mx-0 max-w-sm sm:max-w-none flex items-center gap-2 rounded-2xl sm:rounded-xl border border-luxury-gold/40 bg-[#101417]/95 sm:bg-transparent px-3 py-2.5 sm:p-0 shadow-[0_0_28px_rgba(200,169,95,0.35)] sm:shadow-none backdrop-blur-xl animate-glow-pulse pointer-events-auto">
        <button
          type="button"
          onClick={handleInstall}
          className="flex flex-1 sm:flex-none items-center justify-center gap-2 px-3 py-2 sm:px-4 sm:py-2.5 bg-gradient-to-r from-luxury-teal to-luxury-gold text-white font-bold text-xs rounded-xl transition-all duration-300 cursor-pointer border border-luxury-gold/30"
          title={message}
        >
          <Download className="w-4 h-4" />
          <span>{message}</span>
        </button>
        <button
          type="button"
          onClick={handleDismiss}
          className="sm:hidden p-2 rounded-full text-zinc-300 hover:text-white hover:bg-white/10"
          aria-label="Dismiss install prompt"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
