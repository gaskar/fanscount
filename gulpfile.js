
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

var process = require("process");


function compile(watch) {
  var bundle;
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
    bundler = watchify(browserify('./app/scripts/main.js', { debug: true }).transform(babelify));

    bundler.on('update', function() {
      console.log('-> bundling...');
      rebundle();
    });
  } else {
    bundler = browserify('./app/scripts/main.js', { debug: true }).transform(babelify);

  }

  rebundle();
}

function watch() {
  return compile(true);
};


gulp.task('build', function() { return compile(); });
gulp.task('watch', function() { return watch(); });

gulp.task('default', ['watch']);
