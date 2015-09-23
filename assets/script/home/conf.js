// require conf
require.config({
    baseUrl: "/assets/script",
    paths: {
        jquery: "lib/jquery",
    },
    shim: {
        jquery: {
            export: 'jquery'
        }
    }
});

define(function (require) {
    require('home:init');
    console.log('###');
});
