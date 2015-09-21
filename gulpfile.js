/**
*@file gulp
*/
// require
var gulp = require('gulp');
var connect = require('gulp-connect');
var ejs = require('gulp-ejs');
var util = require('gulp-util');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var minicss = require('gulp-minify-css');
var minihtml = require('gulp-minify-html');
var rename = require('gulp-rename');
var sourcemap = require('gulp-sourcemaps');

// path
var filepath = 'output/template/';
var assetpath = 'output/asset/';
var stylepath = 'output/asset/style/';
var scriptpath = 'output/asset/script/';
var imgpath = 'output/asset/script';
var sassfilepath  = ['widget/**/*.scss', 'asset/**/*.scss'];
var templatepath = ['template/**/*.ejs'];
var jspath = ['widget/**/*.js', 'asset/**/*.js'];


// task
gulp.task('compile:sass', function () {
    gulp.src(sassfilepath)
        .pipe(sass())
        .on('error', util.log)
        .pipe(gulp.dest(stylepath))
        .pipe(connect.reload());
});

gulp.task('compile:ejs', function () {
    gulp.src(templatepath)
        .pipe(ejs())
        .on('error', util.log)
        .pipe(gulp.dest(filepath));
});

gulp.task('start:server', function () {
    connect.server({
        root: filepath,
        port: 8888,
        livereload: true
    })
});

gulp.task('compile:js', function () {
    gulp.src(jspath)
        .pipe(gulp.dest(scriptpath));
});

gulp.task('watch:file', function () {
    gulp.watch(jspath, ['compile:js']);
    gulp.watch(templatepath, ['compile:ejs']);
    gulp.watch(sassfilepath, ['compile:sass']);
});


// run task
gulp.task('dev', ['compile:sass', 'compile:ejs', 'compile:js', 'watch:file', 'start:server']);
