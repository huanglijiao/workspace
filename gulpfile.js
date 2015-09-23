/**
*@file gulp
*/
// require
var pwd = process.env.PWD;
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
var widget = require(pwd + '/engine/widget.js');

// path
var filepath = 'output/template/';
var assetpath = 'output/assets/';
var assetstylepath = 'output/assets/style/widget';
var assetscriptpath = 'output/assets/script/widget';
var sassfilepath  = ['widget/**/*.scss'];
var sassfilepath_lib  = ['assets/**/*.scss'];
var templatepath = ['template/**/*.ejs', 'widget/**/*.ejs'];
var jspath = ['widget/**/*.js'];
var jspath_lib = ['assets/**/*.js'];
var replacefilepath = 'output/template/**/*.html';

// task
gulp.task('compile:sass', function () {
    gulp.src(sassfilepath)
        .pipe(sass())
        .on('error', util.log)
        .pipe(gulp.dest(assetstylepath));
    
    gulp.src(sassfilepath_lib)
        .pipe(sass())
        .on('error', util.log)
        .pipe(gulp.dest(assetpath));
});

gulp.task('compile:ejs', function () {
    var stream = gulp.src(templatepath)
        .pipe(ejs())
        .on('error', util.log)
        .pipe(gulp.dest(filepath));
    return stream;
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
        .pipe(gulp.dest(assetscriptpath));

    gulp.src(jspath_lib)
        .pipe(gulp.dest(assetpath));
});

gulp.task('watch:file', function () {
    gulp.watch(jspath, ['compile:js']);
    gulp.watch(templatepath, ['compile:ejs', 'replace:style', 'replace:script', 'compile:widget']);
    gulp.watch(sassfilepath, ['compile:sass']);
});

gulp.task('replace:style', ['compile:ejs'], function () {
    var stream = gulp.src(replacefilepath)
        .pipe(replace(/(<!--resstyle\[)(\S+)(\.\w+\]-->)/gi, '<link type="text/css" rel="stylesheet" href="$2.css"/>'))
        .pipe(gulp.dest(filepath));
    return stream;
});

gulp.task('replace:script', ['replace:style'], function () {
    var stream = gulp.src(replacefilepath)
        .pipe(replace(/(<!--resscript\[)(\S+)(\.\w+\]-->)/gi, '<script type="text/javascript" src="$2.js"></script>'))
        .pipe(gulp.dest(filepath));
    return stream;
});

gulp.task('compile:widget', ['replace:script'], function () {
    gulp.src(replacefilepath)
        .pipe(widget())
        .pipe(gulp.dest(filepath));
});

// run task
gulp.task('dev', ['compile:sass', 'compile:ejs', 'compile:js', 'replace:style', 'replace:script', 'compile:widget', 'watch:file', 'start:server']);
