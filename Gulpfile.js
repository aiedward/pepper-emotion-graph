const gulp = require('gulp');
const sass = require('gulp-sass');
const usemin = require('gulp-usemin');
const uglify = require('gulp-uglify');
const rev = require('gulp-rev');
const browserSync = require('browser-sync').create();
const del = require('del');

const buildDir = '../test/html/';

gulp.task('build',['clean','usemin']);

gulp.task('clean',function () {
    return del([buildDir], {force:true});
});

gulp.task('usemin',['sass'], function() {
    return gulp.src('./index.html')
    .pipe(usemin({
        css: [ rev() ],
        html: [ ],
        js: [ uglify(), rev() ],
        inlinejs: [ uglify() ],
        inlinecss: [ 'concat' ]
    }))
    .pipe(gulp.dest(buildDir));
});

gulp.task('sass',function () {
    return gulp.src('sass/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('css'))
        .pipe(browserSync.stream());
});

gulp.task('default', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    gulp.watch("sass/*.scss", ['sass']);
    gulp.watch("*.html").on('change', browserSync.reload);
    gulp.watch("js/*.js").on('change', browserSync.reload);
});
