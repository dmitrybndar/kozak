'use strict';

const gulp         = require('gulp'),
      del          = require('del'),
      sass         = require('gulp-sass'),
      plumber      = require('gulp-plumber'),
      postcss      = require('gulp-postcss'),
      autoprefixer = require('autoprefixer'),
      server       = require('browser-sync').create(),
      mqpacker     = require('css-mqpacker'),
      minify       = require('gulp-csso'),
      rename       = require('gulp-rename'),
      uglify       = require('gulp-uglify'),
      pump         = require('pump'),
      imagemin     = require('gulp-imagemin');

gulp.task('style', function () {
  gulp.src('src/sass/style.scss')
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer({
        browsers: [
          'last 1 version',
          'last 2 Chrome versions',
          'last 2 Firefox versions',
          'last 2 Opera versions',
          'last 2 Edge versions'
        ]
      }),
      mqpacker({sort: true})
    ]))
    .pipe(gulp.dest('build/css'))
    .pipe(minify())
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('build/css'))
    .pipe(server.stream());
});

gulp.task('scripts', function (cb) {
  pump([
        gulp.src('src/js/**/*.js'),
        gulp.dest('build/js'),
        uglify(),
        rename({
          suffix: '.min',
          extname: '.js'
        }),
        gulp.dest('build/js')
    ],
    cb
  );
});

gulp.task('imagemin', function () {
  return gulp.src('src/img/**/*.{jpg,png,gif}')
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.jpegtran({progressive: true})
    ]))
    .pipe(gulp.dest('build/img'));
});


gulp.task('copy-html', function () {
  return gulp.src('src/*.html')
    .pipe(gulp.dest('build'))
    .pipe(server.stream());
});

gulp.task('copy', ['copy-html', 'scripts', 'style'], function () {
  return gulp.src([
    'src/fonts/**/*.{woff,woff2}'
  ], {base: 'src/'})
    .pipe(gulp.dest('build'));
});

gulp.task('clean', function () {
  return del('build');
});

gulp.task('js-watch', ['scripts'], function (done) {
  server.reload();
  done();
});

gulp.task('serve', ['build'], function () {
  server.init({
    server: './build',
    notify: false,
    open: true,
    port: 3502,
    ui: false
  });

  gulp.watch('src/sass/**/*.{scss,sass}', ['style']);
  gulp.watch('src/*.html', ['copy-html']);
  gulp.watch('src/js/**/*.js', ['js-watch']);
});

gulp.task('build', ['clean'], function () {
  gulp.start('imagemin', 'copy');
});

gulp.task('default', ['serve']);
