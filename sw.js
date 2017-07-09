importScripts('workbox-sw.prod.v1.0.1.js');
importScripts('scripts/firebase-app.js')
importScripts('scripts/firebase-database.js')
importScripts('scripts/firebase-hackernews-sw.js')

hackernews.init(firebase, { watch: true, log: console.log });

const workboxSW = new self.WorkboxSW();
workboxSW.precache([
  {
    "url": "/index.html",
    "revision": "b19b4149d3b83461622d4788480b3be6"
  },
  {
    "url": "/scripts/app-bundle.js",
    "revision": "50c6c6c4b41dc05a1aeecc9dd4416640"
  },
  {
    "url": "/scripts/firebase-app.js",
    "revision": "cec84d77de4c6e52f41162d514278717"
  },
  {
    "url": "/scripts/firebase-database.js",
    "revision": "fc5332a7f078d15aaaa94232a8938f20"
  },
  {
    "url": "/scripts/firebase-hackernews-sw.js",
    "revision": "41088115d1ddf37e4c993dd7584df7ba"
  },
  {
    "url": "/scripts/vendor-bundle.js",
    "revision": "e3c8f46d64a24064e7218e3abca9e460"
  }
]);

workboxSW.router.registerNavigationRoute('/index.html');

workboxSW.router.registerRoute(
  new RegExp('^https://res.cloudinary.com/'),
  workboxSW.strategies.cacheFirst({
    cacheName: 'images',
    cacheExpiration: { maxEntries: 15 },
    // The images are returned as opaque responses, with a status of 0.
    // Normally these wouldn't be cached; here we opt-in to caching them.
    cacheableResponse: { statuses: [0] }
  })
);