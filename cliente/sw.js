const version = "0.1.0";
const cacheName = "ifsc.digital";

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(cacheName));
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.open(cacheName).then((cache) => {
      return cache.match(event.request.url).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }
        return fetch(event.request).then((fetchedResponse) => {
          cache.put(event.request, fetchedResponse.clone());
          return fetchedResponse;
        });
      });
    })
  );
});
