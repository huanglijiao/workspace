// require conf
require.config({
    baseUrl: "/assets/script",
    paths: {
        jquery: "lib/jquery"
    },
    shim: {
        jquery: {
            export: 'jquery'
        }
    }
});

define(function (require) {
    /**不同页面init路径不同*/
    require('home/init');
});
