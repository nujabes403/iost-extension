var gulp = require('gulp')
var browserify = require('browserify')
var log = require('gulplog')
var tap = require('gulp-tap')
var buffer = require('gulp-buffer')
var sourcemaps = require('gulp-sourcemaps')
var uglify = require('gulp-uglify')
var brfs = require('brfs')
var rename = require('gulp-rename')
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');


gulp.task('browserify', function () {
  return gulp
    .src([
      'public/app/inpage.js',
      'public/app/content-script.js',
      'public/app/background.js',
    ], { read: false }) // no need of reading file because browserify does.
    // transform file objects using gulp-tap plugin
    .pipe(tap(function (file) {
      log.info('bundling ' + file.path);
      // replace file contents with browserify's bundle stream
      file.contents = browserify(file.path, {
        debug: true,
        transform: [ brfs ],
      })
      .bundle()
    }))
    .pipe(gulp.dest('dist/app'))
})

gulp.task('build', gulp.series(['browserify']))
