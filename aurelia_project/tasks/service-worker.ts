import * as wbBuild from 'workbox-build';
import * as copy from 'copy';
import * as replace from 'replace-in-file';

export default function serviceWorker() {
    return wbBuild.injectManifest({
      globDirectory: './',
      swSrc: 'sw-source.js',
      swDest: 'sw.js',
      staticFileGlobs: ['index.html', 'scripts/**\/*.js'],
      globIgnores: [],
      templatedUrls: {
        '/': ['index.html']
      }
    })
    .then(() => {
      // tslint:disable-next-line
      console.log('Service worker generated.');

      wbBuild.getFileManifestEntries({
        globDirectory: './',
        globPatterns: ['scripts\/**\/*.{html,js,css}'],
        globIgnores: [],
        templatedUrls: { }
      }).then(entries => {
        let from = [];
        let to = [];
        for (let entry of entries) {
          if (entry.url === '/scripts/app-bundle.js') {
            from.push('..' + entry.url);
            to.push(`..${entry.url}?_workbox-precaching=${entry.revision}`);
          }

          if (entry.url === '/worker.js') {
            from.push('new Worker(\'worker.js\')');
            to.push(`new Worker('worker.js?_workbox-precaching=${entry.revision}')`);
          }
          from.push(entry.url);
          to.push(`${entry.url}?_workbox-precaching=${entry.revision}`);
        }

        let files = [
          'index.html',
          'worker.js',
          'scripts/vendor-bundle.js',
          'scripts/app-bundle.js',
          'web.config',
          'sw.js',
          'manifest.json',
          'workbox-sw.prod.v1.0.1.js'
        ];
        let options = {
          files: files.filter(i => i !== 'sw.js').map(file => `dist/${file}`),
          from,
          to,
          encoding: 'utf8'
        };

        copy.each(files, 'dist', (err) => {
           replace.sync(options);
        });
    })
    .catch((err) => {
      // tslint:disable-next-line
      console.log('[ERROR] This happened: ' + err);
    });
  });
}
