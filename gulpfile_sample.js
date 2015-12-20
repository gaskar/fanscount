'use strict';

var gulp = require('gulp'),
    jade = require('gulp-jade'),
    minify = require('gulp-minify'),
    babel = require('babelify'),
    browserify = require('browserify'),
    watchify = require('watchify'),
    source = require('vinyl-source-stream'),
    concat = require('gulp-concat'),
    sourcemaps = require('gulp-sourcemaps');

gulp.task('default', function() {
  gulp.src('app/assets/views/*.jade')
    .pipe(jade())
    .pipe(minify())
    .pipe(gulp.dest('build/assets/views'));

    var browserified = source('bundle.js');

    return gulp.src(['./app/scripts/*.es6'])
      .pipe(browserified)
      .pipe(gulp.dest('./build'));
  // return browserify({entries: './app/scripts/main.es6', extensions: ['.es6', 'js'], debug: true})
  //   .transform(babel)
  //   .bundle()
  //   .pipe(source('bundle.js'))
  //   .pipe(concat('all.js'))
  //   .pipe(minify())
  //   .pipe(gulp.dest('build/scripts'));
});
