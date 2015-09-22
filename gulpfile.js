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
var replace = require('gulp-replace');
var sourcemap = require('gulp-sourcemaps');
var fs = require('fs');
var path = require('path');

// path
var filepath = 'output/template/';
var assetpath = 'output/assets/';
var sassfilepath  = ['widget/**/*.scss', 'assets/**/*.scss'];
var templatepath = ['template/**/*.ejs'];
var jspath = ['widget/**/*.js', 'assets/**/*.js'];
var replacefilepath = 'output/template/**/*.html';
var routepath = process.env.PWD;

// task
gulp.task('compile:sass', function () {
    gulp.src(sassfilepath)
        .pipe(sass())
        .on('error', util.log)
        .pipe(gulp.dest(assetpath))
        .pipe(connect.reload());
});

gulp.task('compile:ejs', function () {
    gulp.src(templatepath)
        .pipe(replace(/(<!--widget\[\/)(.+?)(\]-->)/gi, '<%include ' + routepath + '/widget/$2/$2.ejs%>'))
        .pipe(ejs())
        .on('error', util.log)
        .pipe(gulp.dest(filepath));
});

gulp.task('start:server', function () {
    connect.server({
        root: 'output/',
        port: 8888,
        livereload: true
    })
});

gulp.task('compile:js', function () {
    gulp.src(jspath)
        .pipe(gulp.dest(assetpath));
});

gulp.task('watch:file', function () {
    gulp.watch(jspath, ['compile:js']);
    gulp.watch(templatepath, ['compile:ejs']);
    gulp.watch(sassfilepath, ['compile:sass']);
});

gulp.task('replace:style', ['compile:ejs'], function () {
    gulp.src(replacefilepath)
        .pipe(replace(/(<!--resstyle\[)(.+?)(\.\w+\]-->)/gi, '<link type="text/css" rel="stylesheet" href="$2.css"/>'))
        .pipe(gulp.dest(filepath));
});

gulp.task('replace:script', ['compile:ejs'], function () {
    gulp.src(replacefilepath)
        .pipe(replace(/(<!--resscript\[)(.+?)(\.\w+\]-->)/gi, '<script type="text/javascript" src="$2.js"></script>'))
        .pipe(gulp.dest(filepath));
});


// run task
gulp.task('default', ['compile:sass', 'compile:ejs', 'compile:js', 'replace:style', 'replace:script']);
