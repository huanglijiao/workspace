/*
*@file genernate widget
*/
var through = require('through2');
var gutil = require('gulp-util');
var fs = require('fs');

// get file
function getfile (file) {
    return fs.existsSync(file);
}  

// read file
function readfile (file) {
    return fs.readFileSync(file);
}

function filestream(filecontent) {
  var stream = through();
  stream.write(filecontent);
  return stream;
}

// 插件级别函数 (处理文件)
function widget(opt) {
  var tpath = '';
  var stylepath = '';
  var scriptpath = '';
  if (opt) {
        tpath = opt.tpath ? opt.tpath : 'output/template/widget/';
        stylepath = opt.stylepath ? opt.stylepath : 'output/assets/style/widget';
        scriptpath = opt.scriptpath ? opt.scriptpath : 'output/assets/script/widget';
        skipjs = opt.skipjs ? opt.skipjs : false;
 } else {
        tpath = 'output/template/widget';
        stylepath = 'output/assets/style/widget';
        scriptpath = 'output/assets/script/widget';
  }
  // 创建一个让每个文件通过的 stream 通道
  return through.obj(function(file, enc, cb) {
    if (file.isNull()) {
      // 返回空文件
      cb(null, file);
    }
    
    var styleArr = [];
    var scriptArr = [];
    file.contents = new Buffer(String(file.contents).replace(/<!--widget\[(\S+?)\]-->/gi, function ($0, $1) {
        var path = $1;
        var widgetArr = [tpath + $1 + '.html',
                         stylepath + $1 + '.css',
                         scriptpath +  $1 + '.js'];
        var html = '';
        widgetArr.forEach(function (v, i) {
            if (getfile(v)) { // file exist

                if (i===0) html = readfile(v);
                if (i===1) styleArr.push(v.replace('output',''));
                if (i===2 && !skipjs) scriptArr.push(v.replace('output',''));
            }
        });
        
        return html;
    })
    .replace('</head>', function () {
        var arr = styleArr;
        var styles = '';
        arr.forEach(function (v, i) {
            styles += '<link type="text/css" rel="stylesheet" href="' + v + '"/>';
        });
        styles += '</head>';
        return styles;
    })
    .replace('</body>', function () {
        var arr = scriptArr;
        var scripts = '';
        arr.forEach(function (v, i) {
            scripts += '<script type="text/javascript" src="' + v + '"></script>';
        });
        scripts += '</body>';
        return scripts;
    }));
    
    // if (file.isBuffer()) {
    //   file.contents = Buffer.concat([prefixText, file.contents]);
    // }
    // if (file.isStream()) {
    //   file.contents = file.contents.pipe(filestream(prefixText));
    // }

    cb(null, file);

  });

};

// 暴露（export）插件主函数
module.exports = widget;
