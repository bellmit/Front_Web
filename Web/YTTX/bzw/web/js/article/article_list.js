/*配置依赖*/
require.config({
    baseUrl: '../js/',
    paths: {
        'jquery': 'lib/jquery/jquery-2.1.4.min', /*基本类库*/
        'jquery_mobile': 'lib/jquery/jquery-mobile.min', /*移动端支持*/
        'mock': 'lib/mock', /*测试模块支持*/
        'page': 'lib/pagination', /*分页*/
        'test': 'widgets/test_widget'/*测试模块*/
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
require(['jquery', 'jquery_mobile', 'mock', 'page', 'test'], function ($, $jm, mock, page, test) {
    $(function () {

        //dom对象引用
        var $header_menu = $('#header_menu'),
            $header_btn = $('#header_btn'),
            $content_list = $('#content_list'),
            $content_page = $('#content_page'),
            $win = $(window),
            debug = true/*是否为测试模式*/,
            isMobile = false;

        /*列表模板*/
        var list_tpl = '<li>\
                <a href="_url_">\
                    <div>\
                        <img alt="" src="_src_">\
                    </div>\
                    <h4>_title_</h4>\
                    <p>_content_</p>\
                </a>\
            </li>';


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

        /*请求数据*/
        getArticleList({
            tpl: list_tpl/*数据模板*/,
            wrap: $content_list/*数据容器*/,
            page: $content_page,
            debug: debug/*数据请求模式：测试模式和正式模式*/,
            url: '请求地址'/*to do*/,
            page_config: {
                number: 1/*分页--默认显示第几页*/,
                total: 0/*分页--默认多少条记录*/,
                size: 10/*分页--每页显示记录数*/
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


    function getArticleList(config) {
        if (!config) {
            return false;
        }
        var debug = config.debug,
            page_config = config.page_config;

        /*请求数据*/
        $.ajax({
                url: debug ? '../../json/test.json' : config.url,
                dataType: 'json',
                data: {
                    'pagenumber': '1'
                },
                type: 'post'
            })
            .done(function (result) {
                if (debug) {
                    var result = testWidget.test({
                        map: {
                            id: 'guid',
                            url: 'id',
                            title: 'goods',
                            content: 'text'
                        },
                        mapmin: 5,
                        mapmax: 10,
                        type: 'list'
                    });
                }
                var code = parseInt(result.code, 10);
                if (code !== 0) {
                    console.log(result.message);

                    /*清空缓存*/
                    config.wrap.html('');
                    /*重置分页*/
                    page_config.number = 1;
                    page_config.size = 10;
                    page_config.total = 0;
                    config.page.pagination({
                        pageSize: page_config.size,
                        total: page_config.total,
                        pageNumber: page_config.number
                    });
                    return false;
                }
                if (result.count !== 0) {

                    var listdata = result.list,
                        res = [];
                    /*解析数据*/
                    var len = listdata.length,
                        i = 0;
                    if (len !== 0) {
                        var tpl = config.tpl;
                        for (i; i < len; i++) {
                            var item = listdata[i];
                            res.push(tpl.replace('_href_', 'article.html?id=' + item['href'])
                                .replace('_title_', item['title'])
                                .replace('_content_', item['content'])
                                .replace('_src_', '../images/' + item['src'] + '.jpg'));
                        }
                        $(res.join('')).appendTo(config.wrap.html(''));
                        res.length = 0;

                        /*分页调用*/
                        page_config.total = result.count;
                        config.page.pagination({
                            pageSize: page_config.size,
                            total: page_config.total,
                            pageNumber: page_config.number,
                            onSelectPage: function (pageNumber, pageSize) {
                                config.page_config = page_config;
                                getArticleList(config);
                            }
                        });
                    }
                } else {
                    config.wrap.html('');
                    /*重置分页*/
                    page_config.number = 1;
                    page_config.size = 10;
                    page_config.total = 0;
                    config.page.pagination({
                        pageSize: page_config.size,
                        total: page_config.total,
                        pageNumber: page_config.number
                    });
                }
            })
            .fail(function () {
                config.wrap.html('');
                /*重置分页*/
                page_config.number = 1;
                page_config.size = 10;
                page_config.total = 0;
                config.page.pagination({
                    pageSize: page_config.size,
                    total: page_config.total,
                    pageNumber: page_config.number
                });
            });
    }
});



