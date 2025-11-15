// Service Worker for ExplorerTest10 Dynamic PWA

// Name of the cache
const CACHE_NAME = 'vr-explorer-cache-v1';

// Files to cache for offline use
const urlsToCache = [
  '/ExplorerTest10/',          // Base path
  '/ExplorerTest10/index.html', // Main HTML
  '/ExplorerTest10/manifest.json', // PWA manifest
  '/ExplorerTest10/icons/icon-192.png', // App icon
  '/ExplorerTest10/icons/icon-512.png'  // App icon
];

// Install event: cache the listed files
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// Fetch event: respond with cached file if available, otherwise fetch from network
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});

// Activate event: remove old caches if not in whitelist
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => Promise.all(
      cacheNames.map(cacheName => {
        if (!cacheWhitelist.includes(cacheName)) {
          return caches.delete(cacheName); // delete old cache
        }
      })
    ))
  );
});
