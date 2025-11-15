// Service Worker for ExplorerTest10 Dynamic PWA

// ---------------- CACHE NAME ----------------
const CACHE_NAME = 'vr-explorer-cache-v1';

// ---------------- FILES TO CACHE ----------------
// These are the essential files required to make the PWA work offline
const urlsToCache = [
  '/ExplorerTest10/',                // Base path
  '/ExplorerTest10/index.html',      // Main HTML file
  '/ExplorerTest10/manifest.json',   // PWA manifest
  '/ExplorerTest10/icons/icon-192.png', // Small icon
  '/ExplorerTest10/icons/icon-512.png'  // Large icon
];

// ---------------- INSTALL EVENT ----------------
// Triggered when the service worker is installed
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// ---------------- FETCH EVENT ----------------
// Intercept network requests and respond with cached files if available
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});

// ---------------- ACTIVATE EVENT ----------------
// Remove old caches if they exist to save space and prevent conflicts
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames =>
      Promise.all(
        cacheNames.map(cacheName => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName); // Delete old cache
          }
        })
      )
    )
  );
});
