const isProduction = import.meta.env.PROD;
let registrationStarted = false;

export const registerServiceWorker = (): void => {
  if (registrationStarted || !isProduction || !('serviceWorker' in navigator)) {
    return;
  }

  registrationStarted = true;

  void navigator.serviceWorker.ready.then(() => {
    if (!navigator.serviceWorker.controller) {
      console.info('[ShakuMaku] PWA service worker ready; reload once if install prompt is still unavailable');
    }
  });

  void navigator.serviceWorker
    .register('/sw.js', { scope: '/' })
    .then((registration) => registration.update())
    .catch((error) => {
      console.error('Service worker registration failed:', error);
    });
};
