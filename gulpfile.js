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
      imagemin     = require('gulp-imagemin');


// var gulp        = require('gulp'),
//     sass        = require('gulp-sass'),
//     browserSync = require('browser-sync').create();

// var urls = {
//     baseDir: "src",
//     html: "src/*.html",
//     css: "src/css/*.css"
// }
// // Static server
// gulp.task('sass', function() {
//     gulp.src("src/sass/style.scss")
//         .pipe(sass().on('error', sass.logError))
//         .pipe(gulp.dest('src'))
//         .pipe(browserSync.stream());
// });

// gulp.task('server', ['sass'], function () {
//     browserSync.init({
//         server: {
//             baseDir: "src",
//         },
//         notify: false
//     });

//     gulp.watch("src/*.html").on('change', browserSync.reload);
//     gulp.watch("src/sass/**/*.scss", ['sass']);
// });

// gulp.task('default', ['server']);
