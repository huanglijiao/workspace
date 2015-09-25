/**
*@file
*/
define(function (require, exports, module) {
    var $ = require('jquery');
    
    $('.topbar .usr-info').on('click', function () {
        $(this).toggleClass('active');
    });

});
