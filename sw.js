importScripts('workbox-sw.prod.v1.0.1.js');

const workboxSW = new self.WorkboxSW();
workboxSW.precache([
  {
    "url": "/index.html",
    "revision": "70bc5277e2943f7f13ac6f5f72201dc8"
  },
  {
    "url": "/scripts/app-bundle.js",
    "revision": "38c2e0928c5f13640e913733c5b33f48"
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
    "revision": "4f8fe28765d3f4249be973eecd74b613"
  },
  {
    "url": "/",
    "revision": "1ba43fbe197b6124d41cfcd19447615a"
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