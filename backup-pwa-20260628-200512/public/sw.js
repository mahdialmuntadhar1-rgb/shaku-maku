const SW_VERSION = 'shaku-maku-pwa-reset-20260608-1408';

self.addEventListener('install', (event) => {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.map((key) => caches.delete(key))))
      .then(() => self.clients.claim())
      .then(() =>
        self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clients) =>
          Promise.all(
            clients
              .filter((client) => client.url.startsWith(self.location.origin))
              .map((client) => client.navigate(client.url))
          )
        )
      )
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;

  if (request.method !== 'GET') {
    return;
  }

  const url = new URL(request.url);

  if (url.origin !== self.location.origin) {
    return;
  }

  event.respondWith(
    fetch(request).catch(() => {
      if (request.mode === 'navigate') {
        return fetch('/');
      }

      return Response.error();
    })
  );
});

self.addEventListener('message', (event) => {
  if (event.data?.type === 'SHAKU_MAKU_SW_VERSION') {
    event.source?.postMessage({ type: 'SHAKU_MAKU_SW_VERSION', version: SW_VERSION });
  }
});
