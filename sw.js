const CACHE_NAME = 'xoleric-cache-v1';
const urlsToCache = [
  './index.html',
  './manifest.json'
];

// O'rnatish va keshlash
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Eski keshlarni tozalash
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Offline ishlash (Fetch interseptor)
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Keshda bo'lsa qaytaradi, bo'lmasa tarmoqdan yuklaydi
        return response || fetch(event.request);
      })
  );
});
