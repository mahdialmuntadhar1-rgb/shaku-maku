const CACHE_NAME = 'shaku-maku-phase1-install-20260603-201951';
const APP_SHELL = ['/', '/manifest.webmanifest', '/icons/icon.svg', '/icons/icon-maskable.svg'];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;

  if (request.method !== 'GET') {
    return;
  }

  const url = new URL(request.url);

  if (request.mode === 'navigate') {
    event.respondWith(fetch(request).catch(() => caches.match('/') || Response.error()));
    return;
  }

  if (url.origin !== self.location.origin) {
    return;
  }

  // Never serve HTML fallback for module scripts or dev server resources.
  if (
    request.destination === 'script' ||
    request.destination === 'manifest' ||
    url.pathname.startsWith('/src/') ||
    url.pathname.startsWith('/@vite/')
  ) {
    event.respondWith(fetch(request));
    return;
  }

  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }

      return fetch(request)
        .then((networkResponse) => {
          if (networkResponse.ok) {
            const responseClone = networkResponse.clone();
            void caches.open(CACHE_NAME).then((cache) => cache.put(request, responseClone));
          }
          return networkResponse;
        })
        .catch(() => Response.error());
    })
  );
});

