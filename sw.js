importScripts('workbox-sw.prod.v1.0.1.js');
importScripts('https://www.gstatic.com/firebasejs/4.1.2/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/4.1.2/firebase-database.js')
importScripts('node_modules/firebase-hackernews/dist/firebase-hackernews-sw.js')

hackernews.init(firebase, { watch: true });

const workboxSW = new self.WorkboxSW();
workboxSW.precache([
  {
    "url": "/index.html",
    "revision": "6abcf21c12185e4f26033146756953f7"
  },
  {
    "url": "/scripts/app-bundle.js",
    "revision": "cf3822e64e21e1167b05353a734960e8"
  },
  {
    "url": "/scripts/vendor-bundle.js",
    "revision": "95ba5848a1c8733d48d38ececcf7841b"
  }
]);