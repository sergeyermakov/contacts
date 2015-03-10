var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var gulpif = require('gulp-if');
var rename = require("gulp-rename");
var uglify = require('gulp-uglify');
var useref = require('gulp-useref');
var concatCss = require('gulp-concat-css');
var	connect = require('gulp-connect');
var	sass = require('gulp-sass');
var opn = require('opn');
var gutil = require('gulp-util');
var ftp = require('gulp-ftp');
 
gulp.task('connect', function() {
  connect.server({
    root: './app',
    livereload: true
  });
  opn('http://localhost:8080/')
});
gulp.task('sass', function () {
    gulp.src('./app/scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./app/css'))
        .pipe(connect.reload());
});
gulp.task('html', function () {
  gulp.src('./app/*.html')
    .pipe(connect.reload());
});
gulp.task('css', function () {
  gulp.src('./app/css/*.css')
    .pipe(connect.reload());
});
gulp.task('js', function () {
  gulp.src('./app/js/*.js')
    .pipe(connect.reload());
});
gulp.task('watch', function () {
  
  gulp.watch('./app/scss/*.scss', ['sass']);
  gulp.watch(['./app/*.html'], ['html']);
 
});
 


gulp.task('ap', function() {
    gulp.src('./app/css/main.css')
          .pipe(autoprefixer({
            browsers: ['last 20 versions']
        }))
        .pipe(gulp.dest('./app/css/'));
    });
gulp.task('copy', function () {
    gulp.src('app/img/*')
        .pipe(gulp.dest('dist/img'));
        gulp.src('app/view/*')
        .pipe(gulp.dest('dist/view'));


    gulp.src('app/fonts/*')
        .pipe(gulp.dest('dist/fonts'));

});
gulp.task('useref', function () {
    var assets = useref.assets();
    
    return gulp.src('app/index.html')
            .pipe(assets)
            .pipe(assets.restore())
            .pipe(useref())
            .pipe(gulp.dest('dist/'));

});




gulp.task('default', ['sass', 'connect', 'watch', 'copy','ap','useref']);