/**
*@file sliding
*@Frances.Shih
*/
define(function (require, exports, module) {
    var $ = require('jquery');
    
    function SlideBanner (opt) {
        var self = this;
        // 检查参数
        if (!self.checkparam(opt)) return;
        // run
        self.prepare(opt).run(); 
    };    
    
    var sp = SlideBanner.prototype;

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
        // 1. 是否有handler dot  2. 切换方向: top-1, right-2, bottom-3, left-4, default-0(不滚)   3. 添加切换时常 
        self.conf = [];
        self.container = $(opt.container);
        self.slide = $(opt.slide);
        self.handler = opt.handler ? $(opt.handler) : false;
        self.dir = opt.dir ? opt.dir : 'left';
        // time - ms
        self.animate = opt.animate ? opt.animate : 9500;
        // handler
        if (!self.handler) {
            self.conf.push(0);
        } else {
            self.conf.push(1);
        }
        // dir
        if (self.slide.size() > 1) {
            switch (self.dir) {
                case 'top': self.conf.push(1); break;
                case 'right': self.conf.push(2); break;
                case 'bottom': self.conf.push(3); break;
                case 'left': self.conf.push(4); break;
                default: self.conf.push(0); break;
            }
        } else {
            self.conf.push(0);
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
    
    sp.stateRun = function (value, index) {
        var _index = index >> 0;
        var self = this;
        switch (_index) {
            case 0 : dot(value, self.handler, self.slide.size()); break;
            case 1 : banner(value, self.container, self.slide); break;
            case 2 : switching(value, self); break;
        } 

    };
    
    function switching(v, o, index) {
        var time = v,
            c = o.container, 
            s = o.slide,
            h = o.handler,
            _index = index ? index : 0,
            maxsize = s.size(),
            itemwidth = window.innerWidth;
       
        // console.log(o.conf);
        if (o.conf[2] === 0) return;

        // 校正index
        _index = _index >= maxsize ? 0 : _index;
        
        c.css({
            'transform': 'translateX(' + -1 * _index * itemwidth + 'px)',
            'transition': 'transform 500ms'
        });
        
        s.removeClass('active').eq(_index).addClass('active');
        
        h.find('li').removeClass('active').eq(_index).addClass('active');
        
        _index = _index + 1;
        
        setTimeout(function () {
            switching(time, o, _index);
        }, time);
    }
    
    function banner(v, container, slide) {
        var dir = v >> 0,
            c = container,
            s = slide;
        
        switch (dir) {
            case 4 : // 左侧
                leftBanner(c, s);
                break;
        }
    };
    
    function leftBanner(container, slide) {
        var c = container,
            s = slide,
            itemwidth = window.innerWidth,
            size = s.size();
    
        var maxwidth = itemwidth * size;
        c.css({
            'width': maxwidth + 'px',
            'overflow': 'hidden'
        });
        s.css({
            'float': 'left',
            'width': itemwidth + 'px'
        }).eq(0).addClass('active');
    };


    function dot(v, obj, size) {
        var maxwidth = obj.width()/2;
        if (v && size > 1) {
            obj.css({
                'margin-left': -maxwidth + 'px',
                'visibility': 'visible'
            });
            obj.find('li').eq(0).addClass('active');
        }
    }
   
    exports.slide = SlideBanner; 
});
