importScripts('workbox-sw.prod.v1.0.1.js');
importScripts('https://www.gstatic.com/firebasejs/4.1.2/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/4.1.2/firebase-database.js')
importScripts('scripts/firebase-hackernews-sw.js')

hackernews.init(firebase, { watch: true });

const workboxSW = new self.WorkboxSW();
workboxSW.precache([
  {
    "url": "/index.html",
    "revision": "c6f25b0beb7d3196b0428270b1c546fe"
  },
  {
    "url": "/scripts/app-bundle.js",
    "revision": "e0458de8a753e9138437103a80e7fc80"
  },
  {
    "url": "/scripts/firebase-hackernews-sw.js",
    "revision": "41088115d1ddf37e4c993dd7584df7ba"
  },
  {
    "url": "/scripts/vendor-bundle.js",
    "revision": "e52b9dbfb1d65ac218759b2027d9dc6e"
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