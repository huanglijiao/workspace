/**
*@file sliding
*@Frances.Shih
*/
define(function (require, exports, module) {
    var $ = require('jquery');
    
    function slide (opt) {
        var self = this;
        // 检查参数
        if (!self.checkparam(opt)) return;
        // run
        self.prepare(opt).run(); 
    };    
    
    var sp = slide.prototype;

    sp.checkparam = function (opt) {
        var self = this;
        var result = true;
        var o = opt;
        
        if (!opt.container) result = false;
        if (!opt.slide) result = false;
        
        return result;
    };   

    sp.prepare = function (opt) {
        var self = this;
        // 三位可选配置
        // 1. 是否有handler dot  2. 切换方向: top-1, right-2, bottom-3, left-4, default-0(不滚)   3. 添加切换后clip动效 
        self.conf = [];
        self.container = $(opt.container);
        self.slide = $(opt.slide);
        self.handler = opt.handler ? $(opt.handler) : false;
        self.dir = opt.dir ? opt.dir : 'left';
        self.animate = opt.animate ? opt.animate : 0;
        // handler
        if (!self.handler) {
            self.conf.push(0);
        } else {
            self.conf.push(1);
        }
        // dir
        switch (self.dir) {
            case 'top': self.conf.push(1); break;
            case 'right': self.conf.push(2); break;
            case 'bottom': self.conf.push(3); break;
            case 'left': self.conf.push(4); break;
            default: self.conf.push(0); break;
        }
        // clip 请传效果数
        self.conf.push(self.animate >> 0);
       
         return self;
    };    

    sp.run = function () {
        var self = this;
       
        // 轮询状态机 
        for (var i = 0, len = self.conf.length; i < len; i++) {
            self.stateRun(self.conf[i], i); 
        }

        return self;
    };
    
    self.stateRun = function (value, index) {


    };

    exports.slide = slide; 
});
