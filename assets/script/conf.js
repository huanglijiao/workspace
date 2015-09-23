// require conf
require.config({
    baseUrl: "/assets/script/lib",
    paths: {
        conf: "/assets/script",
        jquery: "/assets/script/lib/jquery"
    }
});
define(['jquery'], function ($) {
    return $;
});
