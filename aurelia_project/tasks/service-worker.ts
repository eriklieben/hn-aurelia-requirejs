import * as wbBuild from 'workbox-build';

export default function serviceWorker() {
    return wbBuild.injectManifest({
      globDirectory: './',
      swSrc: 'sw-source.js',
      swDest: 'sw.js',
      staticFileGlobs: ['index.html', 'scripts/**\/*.js'],
      globIgnores: [],
      templatedUrls: {
      }
    })
    .then(() => {
      // tslint:disable-next-line
      console.log('Service worker generated.');
    })
    .catch((err) => {
      // tslint:disable-next-line
      console.log('[ERROR] This happened: ' + err);
    });
};
