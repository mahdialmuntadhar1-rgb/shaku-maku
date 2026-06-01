import React, { useState, useEffect } from 'react';
import { Download } from 'lucide-react';
import { Language } from '../types';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

interface PWAInstallButtonProps {
  currentLang: Language;
}

export default function PWAInstallButton({ currentLang }: PWAInstallButtonProps) {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

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
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setIsInstalled(true);
    }
    setDeferredPrompt(null);
    setIsInstallable(false);
  };

  if (isInstalled || !isInstallable) return null;

  const labels = {
    en: 'Install App',
    ar: 'نزل التطبيق',
    ku: 'ئەپەکە دابەزێنە'
  } as const;

  const titleMap = {
    en: 'Install Shaku Maku',
    ar: 'تثبيت تطبيق شكو ماكو',
    ku: 'دابەزاندنی ئەپی شکو ماکو'
  } as const;

  const sideClass = currentLang === 'en' ? 'right-0 rounded-r-none pr-5' : 'left-0 rounded-l-none pl-5';

  return (
    <button
      onClick={handleInstall}
      className={`fixed top-1/2 -translate-y-1/2 ${sideClass} z-[120] group flex items-center gap-2 py-3 bg-gradient-to-r from-luxury-teal to-luxury-gold text-white font-black text-xs tracking-wide transition-all duration-300 cursor-pointer border border-luxury-gold/40 shadow-2xl shadow-luxury-gold/30 animate-glow-pulse hover:scale-105`}
      title={titleMap[currentLang]}
    >
      <span className="absolute inset-0 bg-gradient-to-r from-luxury-teal to-luxury-gold opacity-0 group-hover:opacity-30 transition-opacity duration-300 blur-sm"></span>
      <Download className="w-4 h-4 relative z-10" />
      <span className="relative z-10">{labels[currentLang]}</span>
    </button>
  );
}
