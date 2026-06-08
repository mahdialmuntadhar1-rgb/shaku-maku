const isProduction = import.meta.env.PROD;

export const registerServiceWorker = (): void => {
  if (!isProduction || !('serviceWorker' in navigator)) {
    return;
  }

  window.addEventListener('load', () => {
    void navigator.serviceWorker.register('/sw.js').catch((error) => {
      console.error('Service worker registration failed:', error);
    });
  });
};
