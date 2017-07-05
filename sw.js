importScripts('workbox-sw.prod.v1.0.1.js');
importScripts('https://www.gstatic.com/firebasejs/4.1.2/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/4.1.2/firebase-database.js')
importScripts('node_modules/firebase-hackernews/dist/firebase-hackernews-sw.js')

hackernews.init(firebase, { watch: true });

const workboxSW = new self.WorkboxSW();
workboxSW.precache([
  {
    "url": "/index.html",
    "revision": "94b205964d4fb049c355dbab4bb61b1c"
  },
  {
    "url": "/scripts/app-bundle.js",
    "revision": "932915b19931511516076fcea30aa59e"
  },
  {
    "url": "/scripts/vendor-bundle.js",
    "revision": "3219d3e0e5c1c986bd84e446cb34f4cb"
  }
]);