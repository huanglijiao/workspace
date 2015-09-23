/*
* test define
*/
define(function (require, exports, module) {

    var test = {};
    console.log(window);
    test.run = function () {
        console.log('footbar');
    };
    window.test = 're';
    exports.test = test;
});
