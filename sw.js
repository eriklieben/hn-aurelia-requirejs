importScripts('workbox-sw.prod.v1.0.1.js');

const workboxSW = new self.WorkboxSW();
workboxSW.precache([
  {
    "url": "/index.html",
    "revision": "fc0237b5af410159be91cacd01543389"
  },
  {
    "url": "/scripts/app-bundle.js",
    "revision": "d6fe31ba97b22086f6bcfa81c13ec4ff"
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
    "revision": "66f001313377c95176f14307ccb88e0b"
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