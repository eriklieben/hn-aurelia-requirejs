import * as gulp from 'gulp';
import * as zip from 'gulp-zip';
import { argv } from 'yargs';

export default function pack() {
  const filename = argv.zipfile ? argv.zipfile : 'pack.zip';

  return gulp.src([
    'dist/web.config',
    'dist/index.html',
    'dist//scripts/**/*',
    'dist/sw.js',
    'dist/manifest.json',
    'dist/worker.js',
    'dist/workbox-sw.prod.v1.0.1.js'
  ], {base: 'dist'})
    .pipe(zip(filename))
    .pipe(gulp.dest('.'));
}
