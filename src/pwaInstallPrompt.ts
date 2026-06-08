interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
}

declare global {
  interface Window {
    __shakuMakuInstallPrompt?: BeforeInstallPromptEvent | null;
    __shakuMakuPwaDebug?: () => Promise<void>;
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

  window.__shakuMakuPwaDebug = async () => {
    const manifestLink = document.querySelector<HTMLLinkElement>('link[rel="manifest"]');
    const serviceWorkerSupported = "serviceWorker" in navigator;
    const registrations = serviceWorkerSupported
      ? await navigator.serviceWorker.getRegistrations()
      : [];

    const fetchStatus = async (url: string) => {
      try {
        const response = await fetch(url, { cache: "no-store" });
        return `${response.status} ${response.statusText}`;
      } catch (error) {
        return error instanceof Error ? error.message : String(error);
      }
    };

    const debugInfo = {
      manifestLinkHref: manifestLink?.href || null,
      serviceWorkerSupported,
      serviceWorkerRegistrations: registrations.map((registration) => ({
        scope: registration.scope,
        active: registration.active?.scriptURL || null,
        installing: registration.installing?.scriptURL || null,
        waiting: registration.waiting?.scriptURL || null,
      })),
      hasServiceWorkerController: Boolean(navigator.serviceWorker?.controller),
      isStandaloneDisplayMode:
        window.matchMedia?.("(display-mode: standalone)").matches ||
        (navigator as Navigator & { standalone?: boolean }).standalone === true,
      hasInstallPrompt: Boolean(window.__shakuMakuInstallPrompt),
      manifestFetchStatus: await fetchStatus("/manifest.webmanifest"),
      serviceWorkerFetchStatus: await fetchStatus("/sw.js"),
    };

    console.info("[ShakuMaku] PWA debug", debugInfo);
    console.info("[ShakuMaku] PWA debug JSON", JSON.stringify(debugInfo));
  };

  window.setTimeout(() => {
    void window.__shakuMakuPwaDebug?.();
  }, 4000);
}

export {};
