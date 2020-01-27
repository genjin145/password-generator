"use strict";
 
const gulp = require("gulp");
const sass = require("gulp-sass");
const sourcemaps = require("gulp-sourcemaps");
const browserSync = require("browser-sync").create();

sass.compiler = require("node-sass");
 
gulp.task("sass", function () {
  return gulp.src("./sass/style.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("./css"))
    .pipe(browserSync.stream());
});

gulp.task('serve', gulp.series('sass', function() {
  browserSync.init({
      server: "./"
  });

  gulp.watch("sass/**/*.scss", gulp.series('sass'));
  gulp.watch("*.html").on('change', browserSync.reload);
}));