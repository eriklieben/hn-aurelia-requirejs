importScripts('workbox-sw.prod.v1.0.1.js');
importScripts('https://www.gstatic.com/firebasejs/4.1.2/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/4.1.2/firebase-database.js')
importScripts('scripts/firebase-hackernews-sw.js')

hackernews.init(firebase, { watch: true });

const workboxSW = new self.WorkboxSW();
workboxSW.precache([
  {
    "url": "/index.html",
    "revision": "612c8728521a650c34b9d3b036d012f2"
  },
  {
    "url": "/scripts/app-bundle.js",
    "revision": "83d266455a5abb6033ed75697ac929b3"
  },
  {
    "url": "/scripts/firebase-hackernews-sw.js",
    "revision": "41088115d1ddf37e4c993dd7584df7ba"
  },
  {
    "url": "/scripts/vendor-bundle.js",
    "revision": "917798c09887bd1c0d356e22c5b98f24"
  }
]);