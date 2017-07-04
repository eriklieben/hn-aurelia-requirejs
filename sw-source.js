importScripts('workbox-sw.prod.v1.0.1.js');
importScripts('https://www.gstatic.com/firebasejs/4.1.2/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/4.1.2/firebase-database.js')
importScripts('node_modules/firebase-hackernews/dist/firebase-hackernews-sw.js')

hackernews.init(firebase, { watch: true });

const workboxSW = new self.WorkboxSW();
workboxSW.precache([]);