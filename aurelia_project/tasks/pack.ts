import * as gulp from 'gulp';
import * as zip from 'gulp-zip';
import { argv } from 'yargs';

export default function pack() {
  const filename = argv.zipfile ? argv.zipfile : 'pack.zip';

  return gulp.src([
    'web.config',
    'index.html',
    './scripts/**/*',
    './node_modules/**/*',
    'sw.js',
    'manifest.json',
    'server.js',
    'workbox-sw.prod.v1.0.1.js'
  ], {base: '.'})
    .pipe(zip(filename))
    .pipe(gulp.dest('.'));
}
