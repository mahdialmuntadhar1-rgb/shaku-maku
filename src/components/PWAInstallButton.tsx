import React, { useState, useEffect } from 'react';
import { Download } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export default function PWAInstallButton() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Check if already installed
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
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setIsInstalled(true);
    }
    setDeferredPrompt(null);
    setIsInstallable(false);
  };

  if (isInstalled || !isInstallable) return null;

  return (
    <button
      onClick={handleInstall}
      className="relative group flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-luxury-teal/80 to-luxury-gold/80 text-white font-bold text-[11px] uppercase tracking-wider rounded-xl transition-all duration-300 cursor-pointer border border-luxury-gold/30 animate-glow-pulse"
      title="Install Shaku Maku on your phone"
    >
      <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-luxury-teal to-luxury-gold opacity-0 group-hover:opacity-30 transition-opacity duration-300 blur-sm"></span>
      <Download className="w-4 h-4 relative z-10" />
      <span className="relative z-10 hidden sm:inline">Install App</span>
    </button>
  );
}
