var gulp = require('gulp');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
// var minify = require("gulp-babel-minify");
// var browserify = require('gulp-browserify');
var browserify = require('browserify');
var sass = require('gulp-sass');
var csspurge = require('gulp-css-purge');
var gutil = require('gulp-util');
var pump = require('pump');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var sourcemaps  = require('gulp-sourcemaps');
var plugins = require('gulp-load-plugins');

// gulp helper
var gzip = require('gulp-gzip');
var del = require('del');
var rename = require('gulp-rename');

// path tools
var path = require('path');
var join = path.join;
var mkdirp = require('mkdirp');

// browserify build config
var buildDir = "build";
var browserFile = "browser.js";
//var packageConfig = require('./package.json');
var outputFile = "iHam";

// auto config for browserify
var outputFileSt = outputFile + ".js";
var outputFilePath = join(buildDir, outputFileSt);
var outputFileMinSt = outputFile + ".min.js";
var outputFileMinPath = join(buildDir, outputFileMinSt);

// a failing test breaks the whole build chain
gulp.task('default', ['lint', 'test', 'build-all']);


gulp.task('lint', function () {
  return gulp.src('./src/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('test', function () {
  return gulp.src('./test/**/*.js', {read: false})
    .pipe(mocha({
      reporter: 'spec',
      useColors: false
    }));
});

// will remove everything in build
gulp.task('clean', function () {
  return del([buildDir]);
});

// just makes sure that the build dir exists
gulp.task('init', ['clean'], function () {
  mkdirp(buildDir, function (err) {
    if (err) console.error(err)
  });
});

// sass-import
gulp.task('sass', ['init'], function () {
  return gulp
    .src('./index.scss')
    .pipe(sass({
      errLogToConsole: true
    }))
    .pipe(csspurge())
    .pipe(rename(outputFile + '.css'))
    .pipe(gulp.dest(buildDir));
});


// browserify debug
gulp.task('build-browser', ['sass'], function () {
  return browserify({entries: browserFile, debug: true})
    .transform("babelify", { presets: ["es2015"] })
    .bundle()
    // .on('error', function () {
    //   var args = Array.prototype.slice.call(arguments);
    //
    //   plugins().notify.onError({
    //     'title': 'Compile Error',
    //     'message': '<%= error.message %>'
    //   }).apply(this, args);
    //
    //   this.emit('end');
    // })
    .pipe(source(browserFile))
    .pipe(buffer())
    // .pipe(sourcemaps.init())
    // .pipe(uglify())
    .pipe(rename(outputFileSt))
    .pipe(gulp.dest(buildDir))
});

// gulp.task('build-browser', ['sass'], function () {
//   return gulp.src(browserFile)
//     .pipe(browserify({debug: true}).transform(babelify))
//     .pipe(rename(outputFileSt))
//     .pipe(gulp.dest(buildDir));
// });

// browserify min
gulp.task('build-browser-min', ['build-browser'], function (cb) {
  pump([
    gulp.src(outputFilePath),
    minify({
      mangle: {
        keepClassName: true
      }
    }),
    rename(outputFileMinSt),
    gulp.dest(buildDir)
  ], cb);
});

gulp.task('build-browser-gzip', ['build-browser-min'], function () {
  return gulp.src(outputFileMinPath)
    .pipe(gzip({append: false, gzipOptions: {level: 9}}))
    .pipe(rename(outputFile + ".min.gz.js"))
    .pipe(gulp.dest(buildDir));
});

gulp.task('build-all', ['build-browser-gzip']);

