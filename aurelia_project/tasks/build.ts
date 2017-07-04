import * as gulp from 'gulp';
import {CLIOptions, build as buildCLI} from 'aurelia-cli';
import transpile from './transpile';
import processMarkup from './process-markup';
import processCSS from './process-css';
import copyFiles from './copy-files';
import watch from './watch';
import serviceWorker from './service-worker';
import * as project from '../aurelia.json';

let build = gulp.series(
  readProjectConfiguration,
  gulp.parallel(
    transpile,
    processMarkup,
    processCSS,
    copyFiles
  ),
  includeCSSModule,
  writeBundles,
  serviceWorker
);

let main;

if (CLIOptions.taskName() === 'build' && CLIOptions.hasFlag('watch')) {
  main = gulp.series(
    build,
    (done) => { watch(); done(); }
  );
} else {
  main = build;
}

function readProjectConfiguration() {
  return buildCLI.src(project);
}

function writeBundles() {
  return buildCLI.dest();
}

function includeCSSModule() {
  return gulp.src('src/**/*.css.json')
    .pipe(buildCLI.bundle());
};

export { main as default };
