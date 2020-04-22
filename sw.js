var toCache = ['cube.png', 'index.html', 'main.js', 'main.css'];
self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open('cache-v4')
    .then(cache => {
      cache.addAll(toCache);
    }));
});

self.addEventListener('fetch', event => {

if(!navigator.onLine && caches.match(event.request)){
  event.respondWith(caches.match(event.request));
  }
  if(navigator.connection.downLink > 0.005){
    var cached = caches.match(event.request);
    event.respondWith(cached);
}
else
{
    var webResp = fetch(event.request.url);
    event.respondWith(webResp);
  }
});
