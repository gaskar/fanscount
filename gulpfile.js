
var gulp = require('gulp');

var browserify = require('browserify');
var watchify = require('watchify');
var babelify = require('babelify');

var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var merge = require('utils-merge');

var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');

// gulp.task('watchify', function () {
//   var args = merge(watchify.args, { debug: true });
//   console.log(args);
//   var bundler = watchify(browserify('./app/scripts/main.js', { debug: true })).transform(babelify, { /* opts */ });
//   bundle_js(bundler)
//
//   bundler.on('update', function () {
//     bundle_js(bundler)
//   })
// })
//
// function bundle_js(bundler) {
//   return bundler.bundle()
//     .pipe(source('main.js'))
//     .pipe(buffer())
//     .pipe(gulp.dest('build/'))
//     .pipe(rename('app.min.js'))
//     .pipe(sourcemaps.init({ loadMaps: true }))
//       // capture sourcemaps from transforms
//     .pipe(uglify())
//     .pipe(sourcemaps.write('.'))
//     .pipe(gulp.dest('build/scripts'))
// }
//
// // Without watchify
// gulp.task('browserify', function () {
//   var bundler = browserify('./app/scripts/main.js', { debug: true }).transform(babelify, {/* options */ })
//
//   return bundle_js(bundler)
// })
//
// // Without sourcemaps
// gulp.task('browserify-production', function () {
//   var bundler = browserify('./app/scripts/main.es6').transform(babelify, {/* options */ })
//
//   return bundler.bundle()
//     .pipe(source('app.js'))
//     .pipe(buffer())
//     .pipe(rename('app.min.js'))
//     .pipe(uglify())
//     .pipe(gulp.dest('build/scripts'))
// })

function compile(watch) {
  var bundler = watchify(browserify('./app/scripts/main.js', { debug: true }).transform(babelify));

  function rebundle() {
    bundler.bundle()
      .on('error', function(err) { console.error(err); this.emit('end'); })
      .pipe(source('scripts/app.js'))
      .pipe(buffer())
      .pipe(uglify())
      .pipe(sourcemaps.init({ loadMaps: true }))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest('./build'));
  }

  if (watch) {
    bundler.on('update', function() {
      console.log('-> bundling...');
      rebundle();
    });
  }

  rebundle();
}

function watch() {
  return compile(true);
};

gulp.task('build', function() { return compile(); });
gulp.task('watch', function() { return watch(); });

gulp.task('default', ['watch']);
