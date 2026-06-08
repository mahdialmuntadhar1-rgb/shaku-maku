const isProduction = import.meta.env.PROD;
let registrationStarted = false;

export const registerServiceWorker = (): void => {
  if (registrationStarted || !isProduction || !('serviceWorker' in navigator)) {
    return;
  }

  registrationStarted = true;

  window.addEventListener('load', () => {
    void navigator.serviceWorker
      .getRegistrations()
      .then((registrations) => {
        const existingRegistration = registrations.find((registration) => {
          const scriptUrl =
            registration.active?.scriptURL ||
            registration.installing?.scriptURL ||
            registration.waiting?.scriptURL;

          return registration.scope === `${window.location.origin}/` && scriptUrl?.endsWith('/sw.js');
        });

        if (existingRegistration) {
          return existingRegistration.update();
        }

        return navigator.serviceWorker.register('/sw.js', { scope: '/' });
      })
      .catch((error) => {
        console.error('Service worker registration failed:', error);
      });
  });
};
