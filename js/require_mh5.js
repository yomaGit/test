(function(){
    var minJs_bd={//todo 本地调用的已经是压缩文件的库
        vue:"vue-2.4.0.min",
        zepto:"zepto-1.2.0.min",
        fastclick:"fastclick",
        lazyLoad:"lazyLoad.min",
        echo:"echo/echo.min"
    }

    var extroJs_bd={//todo 自己写的js，需要gulp压缩的js
        main_index:"index_t/main_index",
        main_test1:"index_t/main_test1",
        main_test2:"index_t/main_test2",
        main_test3:"index_t/main_test3",
        main_test4:"index_t/main_test4",
        main_test5:"index_t/main_test5"
    }

    var config_paths=Object.assign(minJs_bd,extroJs_bd)//整合到一个对象里

    require.config({
        baseUrl:"js/",
        paths:config_paths,
        waitSeconds: 1000,//todo js加载时间超过定义时间就认为是超时，时间待定
    })
})(window)

var hash_pages={//todo hash链接对应的页面默认处理js， “标识（不包括参数）”：“配置js”
    "#index":{//首页
        title:"首页",
        html:"main_index",
    },
    "#test1":{//第一个页面
        title:"第一个",
        html:"main_test1"
    },
    "#test2":{//第二个页面
        title:"第二个",
        html:"main_test2"
    },
    "#test3":{//第三个页面
        title:"第三个",
        html:"main_test3"
    },
    "#test4":{//第四个页面
        title:"第四个",
        html:"main_test4"
    },
    "#test5":{//第五个页面
        title:"第五个",
        html:"main_test5"
    },
}