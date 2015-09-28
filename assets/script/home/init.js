/**
*@file init
*/
define(function (require, exports, module) {
    var $ = require('jquery');
    var widget = require('widget/slidebanner');
    var insslide = new widget.slide({
        container: '.slidebanner .banner',
        slide: '.slidebanner .banner > li',
        handler: '.slidebanner .dot-index'
    });

});
