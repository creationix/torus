importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');

workbox.routing.registerRoute(
  new RegExp('https://three.*'),
  new workbox.strategies.CacheFirst()
);

workbox.routing.registerRoute(
  /.*/,
  new workbox.strategies.NetworkFirst()
);

