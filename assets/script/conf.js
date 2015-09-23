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
