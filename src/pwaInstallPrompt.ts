interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
}

declare global {
  interface Window {
    __shakuMakuInstallPrompt?: BeforeInstallPromptEvent | null;
  }
}

if (typeof window !== "undefined") {
  window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    window.__shakuMakuInstallPrompt = event as BeforeInstallPromptEvent;
    window.dispatchEvent(new Event("shaku-maku-install-prompt-ready"));
    console.info("[ShakuMaku] PWA install prompt captured");
  });

  window.addEventListener("appinstalled", () => {
    window.__shakuMakuInstallPrompt = null;
    console.info("[ShakuMaku] PWA installed");
  });
}

export {};
