
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('bracket-cache-v1').then(cache => {
      return cache.addAll([
        '/',
        '/index.html',
        '/app.js',
        '/style.css',
        '/bracket125.json'
        // Add more resources as needed
      ]);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
