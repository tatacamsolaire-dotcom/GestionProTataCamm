
const CACHE_NAME = 'tata-camm-cache-v1';
const FILES_TO_CACHE = [
  '/',
  '/index.html',
  '/app.js',
  '/logo.png',
  '/manifest.json'
];

self.addEventListener('install', (evt) => {
  evt.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (evt) => {
  evt.waitUntil(clients.claim());
});

self.addEventListener('fetch', (evt) => {
  evt.respondWith(
    caches.match(evt.request).then(resp => {
      return resp || fetch(evt.request).then(fetchResp => {
        return caches.open(CACHE_NAME).then(cache => {
          try{ cache.put(evt.request, fetchResp.clone()); }catch(e){}
          return fetchResp;
        });
      }).catch(()=>{
        if(evt.request.mode === 'navigate') return caches.match('/index.html');
      });
    })
  );
});
