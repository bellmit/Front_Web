/*配置依赖*/
require.config({
    baseUrl: '../js/',
    paths: {
        'jquery': 'lib/jquery/jquery-2.1.4.min',
        'jquery_mobile': 'lib/jquery/jquery-mobile.min',
        'page': 'lib/pagination',
        'mock': 'lib/mock',
        'test': 'widgets/test_widget'
    },
    shim: {
        'jquery_mobile': {
            deps: ['jquery']
        },
        'page': {
            deps: ['jquery']
        },
        'test': {
            deps: ['mock']
        }
    }
});


/*程序入口*/
require(['jquery', 'jquery_mobile', 'page', 'mock', 'test'], function ($, $jm, page, mock, test) {
    $(function () {

        //dom对象引用
        var $header_menu = $('#header_menu'),
            $header_btn = $('#header_btn'),
            $content_page = $('#content_page'),
            $win = $(window),
            debug=true/*是否为测试模式*/,
            isMobile = false;


        //监听导航切换显示隐藏
        $header_btn.on($.EventName.click, function () {
            if ($header_btn.hasClass('header-btnactive')) {
                //隐藏
                $header_btn.removeClass('header-btnactive');
                $header_menu.removeClass('g-d-showi');
            } else {
                //显示
                $header_btn.addClass('header-btnactive');
                $header_menu.addClass('g-d-showi');
            }
        });


        //监听菜单滚动条滚动
        $win.on('resize', function (e) {
            //隐藏菜单导航
            var winwidth = $win.width();
            if (winwidth >= 1200 || (winwidth >= 1200 && e.orientation == 'landscape')) {
                //隐藏已经存在的class
                $header_btn.removeClass('header-btnactive');
                $header_menu.removeClass('g-d-showi');
                isMobile = false;
            } else {
                isMobile = true;
            }
        });


        /*调用分页*/
        $content_page.pagination({
            pageSize: 10,
            total: 50,
            pageNumber: 1,
            onSelectPage: function (pageNumber, pageSize) {
                /*to do*/
            }
        });

    });
});



