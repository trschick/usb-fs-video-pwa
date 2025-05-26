self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open("capture-viewer").then((cache) =>
      cache.addAll(["index.html", "capture.js", "manifest.json"])
    )
  );
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => response || fetch(e.request))
  );
});
