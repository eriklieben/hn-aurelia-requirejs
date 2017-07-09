importScripts('workbox-sw.prod.v1.0.1.js');
importScripts('scripts/firebase-app.js')
importScripts('scripts/firebase-database.js')
importScripts('scripts/firebase-hackernews-sw.js')

hackernews.init(firebase, { watch: true, log: console.log });

const workboxSW = new self.WorkboxSW();
workboxSW.precache([]);

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