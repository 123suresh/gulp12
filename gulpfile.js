const gulp = require('gulp');
var sass = require('gulp-sass')(require('sass'));
var uglifycss = require('gulp-uglifycss');
const imageop = require('gulp-image');
const htmlmin = require('gulp-htmlmin');


//npm install sass gulp-sass --save-dev
gulp.task('sass', function () {
    return gulp.src('src/sass/*.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest('dist/css'));
  });

  gulp.task('css', function () {
    gulp.src('dist/css/*.css')
      .pipe(uglifycss({
        "uglyComments": true
      }))
      .pipe(gulp.dest('dist/css-min'));
  });

  //npm install --save-dev gulp-image=in cmd
gulp.task('imageop', function() {
    return gulp.src('src/images/*.jpg')
    .pipe(imageop())
    .pipe(gulp.dest('dist/img'));
  })

  gulp.task('minifyHtml', () => {
    return gulp.src('*.html')
      .pipe(htmlmin({ collapseWhitespace: true }))
      .pipe(gulp.dest('dist'));
  });

  gulp.task('run', ['sass','css','minifyHtml','imageop']);

gulp.task('watch',['run'], function(){
  gulp.watch('src/sass/*.scss',['sass']);
  gulp.watch('dist/css/*.css',['css']);
  gulp.watch('*.html',['minifyHtml']);
  gulp.watch('src/images/*.jpg',['imageop']);
});

gulp.task('default', gulp.parallel('run', 'watch') );