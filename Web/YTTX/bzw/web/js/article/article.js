(function ($) {
    $(function () {

        //dom对象引用
        var debug = true/*请求模式,默认为true,即测试模式，正式环境需将debug设置为false*/,
            $header_menu = $('#header_menu'),
            $header_btn = $('#header_btn'),
            $content_type = $('#content_type'),
            $content_title = $('#content_title'),
            $content_show = $('#content_show'),
            $win = $(window),
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

        /*请求数据
        * todo
        * 注：补充相关请求地址，正式环境需将debug设置为false
        * */
        getArticle({
            type: $content_type,
            wrap: $content_show/*数据容器*/,
            title: $content_title,
            debug: debug/*数据请求模式：测试模式和正式模式*/,
            url: '请求文章详情地址'/*todo*/
        });


    });

    /*获取文章数据*/
    function getArticle(config) {
        if (!config) {
            return false;
        }
        var debug = config.debug,
            search = location.search.slice(1),
            param = {},
            i = 0,
            len;


        search = search.split('&');
        len = search.length;
        for (i; i < len; i++) {
            var item = search[i].split('=');
            param[item[0]] = item[1];
        }
        $.ajax({
            url: debug ? '../json/test.json' : config.url,
            type: 'post',
            dataType: "json",
            data: param
        }).done(function (data) {
                if (debug) {
                    /*测试模式*/
                    var data = testWidget.test({
                        map: {
                            title: 'text',
                            type: 'value',
                            content: 'content'
                        },
                        mapmin: 1,
                        mapmax: 1,
                        type: 'list'
                    });
                }
                var code = parseInt(data.code, 10);
                if (code !== 0) {
                    /*请求异常*/
                    console.log(data.message);
                    config.title.html('');
                    config.type.html('');
                    config.wrap.html('');
                } else {
                    /*渲染数据*/
                    var list = data.result.list[0];
                    config.title.html(list.title);
                    config.type.html(list.type);
                    config.wrap.html(list.content);
                }
            })
            .fail(function () {
                config.title.html('');
                config.type.html('');
                config.wrap.html('');
            });
    }

})(jQuery);



