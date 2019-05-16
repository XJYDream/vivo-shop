require.config({
    baseUrl: "/",
    paths: {
        "jquery" : "libs/jquery/jquery-3.2.1",
        "header" : "js/module/header",
        "footer" : "js/module/footer",
        "url" : "js/module/url",
        "template" : "libs/art-template/template-web",
        "swiper" : "libs/swiper/js/swiper.min",
        "zoom" : "libs/jquery-plugins/jquery.elevateZoom-3.0.8.min",
        "fly" : "libs/jquery-plugins/jquery.fly"
    },
    // 垫片， 给不满足AMD规范的插件又要依赖于别的模块
    shim: {
        "zoom" : {
            deps : ['jquery']
        },
        "fly" : {
            deps: ['jquery']
        }
    }
})