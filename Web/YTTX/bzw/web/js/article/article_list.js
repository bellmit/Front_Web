(function ($) {
    $(function () {

        //dom对象引用
        var $header_menu = $('#header_menu'),
            $header_btn = $('#header_btn'),
            $content_type = $('#content_type'),
            $content_list = $('#content_list'),
            $content_page = $('#content_page'),
            $win = $(window),
            debug = true/*请求模式,默认为true,即测试模式，正式环境需将debug设置为false*/,
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

        /*请求列表数据
        * todo
        * 注：需补充相关请求地址，正式环境需将debug设置为false
        * */
        getArticleList({
            list: {
                url: '请求列表地址'/*todo*/,
                type: $content_type/*列表类型*/,
                wrap: $content_list/*数据容器*/,
                tpl: '<li>\
                        <a href="_url_">\
                            <div>\
                                <img alt="" src="_src_">\
                            </div>\
                            <h4>_title_</h4>\
                            <p>_content_</p>\
                        </a>\
                      </li>'/*数据模板*/
            },
            debug: debug/*数据请求模式：测试模式和正式模式*/,
            page: {
                wrap: $content_page/*分页容器*/,
                number: 1/*分页--默认显示第几页*/,
                total: 0/*分页--默认多少条记录*/,
                size: 6/*分页--每页显示记录数*/
            }
        });

    });


    /*请求列表数据*/
    function getArticleList(config) {
        if (!config) {
            return false;
        }
        var debug = config.debug,
            page = config.page,
            list = config.list,
            param = location.search.slice(1);

        param = param.split('=');

        /*请求数据*/
        $.ajax({
                url: debug ? '../json/test.json' : list.url,
                dataType: 'json',
                data: {
                    'pageNumber': page.number,
                    'pageSize': page.size,
                    'type': param[1]
                },
                type: 'post'
            })
            .done(function (data) {
                if (debug) {
                    /*测试模式*/
                    var data = testWidget.test({
                        map: {
                            id: 'guid',
                            type: 'value',
                            src: 'rule,1,2,3',
                            title: 'remark',
                            content: 'goods'
                        },
                        mapmin: 1,
                        mapmax: 6,
                        type: 'list'
                    });
                }
                var code = parseInt(data.code, 10);
                if (code !== 0) {
                    console.log(data.message);
                    _resetList_(list, page);
                    return false;
                }
                var count = data.result.count;
                if (count !== 0) {
                    var listdata = data.result.list,
                        res = [];
                    /*解析数据*/
                    var len = listdata.length,
                        i = 0;
                    if (len !== 0) {
                        if (debug && len >= 6) {
                            /*测试模式:控制分页列表最多显示6个*/
                            listdata.length = 6;
                            len = 6;
                        }
                        var tpl = list.tpl;
                        for (i; i < len; i++) {
                            var item = listdata[i];
                            res.push(tpl.replace('_href_', 'article.html?id=' + item['id'] + '&type=' + item['type'])
                                .replace('_title_', item['title'])
                                .replace('_content_', item['content'])
                                .replace('_src_', '../images/' + item['src'] + '.jpg'));
                        }
                        $(res.join('')).appendTo(list.wrap.html(''));
                        list.type.html(param[1]);

                        /*分页调用*/
                        page.total = count;
                        page.wrap.pagination({
                            pageSize: page.size,
                            total: page.total,
                            pageNumber: page.number,
                            onSelectPage: function (pageNumber, pageSize) {
                                page.size = pageSize;
                                page.number = pageNumber;
                                config.page = page;
                                getArticleList(config);
                            }
                        });
                    }
                } else {
                    _resetList_(list, page);
                }
            })
            .fail(function () {
                _resetList_(list, page);
            });
    }


    /*私有服务--重置相关数据*/
    function _resetList_(list, page) {
        /*清空数据列*/
        list.wrap.html('');
        list.type.html('');
        /*重置分页*/
        page.number = 1;
        page.size = 6;
        page.total = 0;
        page.wrap.pagination({
            pageSize: page.size,
            total: page.total,
            pageNumber: page.number
        });
    }

})(jQuery);