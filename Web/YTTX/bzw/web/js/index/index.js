/*程序入口*/
(function ($) {
    $(function () {
        //dom对象引用及相关变量
        var debug = true/*请求模式*/,
            $header_menu = $('#header_menu'),
            $header_item = $header_menu.children(),
            $header_btn = $('#header_btn'),
            $screen_index = $('#screen_index'),
            $screen_indexcontent = $screen_index.find('>div.index-content'),
            $screen_product = $('#screen_product'),
            $screen_productcontent = $screen_product.find('ul'),
            $screen_scene = $('#screen_scene'),
            $screen_news = $('#screen_news'),
            $screen_3d = $('#screen_3d'),
            $screen_contact = $('#screen_contact'),
            $tab_btn = $('#tab_btn'),
            $tab_btn_left = $('#tab_btn_left'),
            $tab_btn_right = $('#tab_btn_right'),
            $newstab_show = $('#newstab_show'),
            $win = $(window),
            screen_pos = [{
                node: $screen_index,
                pos: 0
            }, {
                node: $screen_product,
                pos: 0
            }, {
                node: $screen_news,
                pos: 0
            }, {
                node: $screen_scene,
                pos: 0
            }, {
                node: $screen_contact,
                pos: 0
            }],
            isMobile = false,
            count = 0;


        //初始化
        (function () {
            //初始化菜单
            var i = 0,
                len = screen_pos.length,
                j = 0,
                pos = $(window).scrollTop();
            for (i; i < len; i++) {
                var temptop = screen_pos[i]["node"].offset().top;
                screen_pos[i]["pos"] = temptop;

                var minpos = parseInt(pos - 350, 0),
                    maxpos = parseInt(pos + 350, 0);
                if (temptop >= minpos && temptop <= maxpos) {
                    $header_item.eq(i).addClass('menu-active').siblings().removeClass('menu-active');
                    /*一屏动画*/
                    if (i === 0) {
                        $screen_indexcontent.addClass('index-contentactive');
                    } else {
                        $screen_indexcontent.removeClass('index-contentactive');
                    }
                    /*二屏动画*/
                    if (i === 1) {
                        $screen_productcontent.addClass('product-listactive');
                    } else {
                        $screen_productcontent.removeClass('product-listactive');
                    }
                }
            }


            /*
             * 初始化pc或移动视口标识
             *
             * */
            var winwidth = $win.width();
            if (winwidth >= 1200) {
                isMobile = false;
                $screen_3d.addClass('scene-itempc');
            } else {
                isMobile = true;
                $screen_3d.removeClass('scene-itempc');
            }


        }());


        //监听菜单导航
        $header_menu.on($.EventName.click, 'li', function (e) {
            e.preventDefault();
            var $this = $(this),
                index = $this.index();
            if (isMobile) {
                $('html,body').animate({'scrollTop': screen_pos[index]['pos'] - 50 + 'px'}, 500);
            } else {
                $('html,body').animate({'scrollTop': screen_pos[index]['pos'] - 120 + 'px'}, 500);
            }
            /*一屏动画*/
            if (index === 0) {
                $screen_indexcontent.addClass('index-contentactive');
            } else {
                $screen_indexcontent.removeClass('index-contentactive');
            }
            /*二屏动画*/
            if (index === 1) {
                $screen_productcontent.addClass('product-listactive');
            } else {
                $screen_productcontent.removeClass('product-listactive');
            }
            return false;
        });


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
        $win.on('scroll resize', function (e) {
            var type = e.type;
            if (type == 'scroll') {
                (function () {
                    count++;
                    if (count % 2 == 0) {
                        var $this = $(this),
                            currenttop = $this.scrollTop(),
                            i = 0,
                            len = screen_pos.length;

                        for (i; i < len; i++) {
                            var pos = screen_pos[i]['pos'],
                                minpos = parseInt(pos - 350, 0),
                                maxpos = parseInt(pos + 350, 0);

                            if (currenttop >= minpos && currenttop <= maxpos) {
                                $header_item.eq(i).addClass('menu-active').siblings().removeClass('menu-active');
                                /*一屏动画*/
                                if (i === 0) {
                                    $screen_indexcontent.addClass('index-contentactive');
                                } else {
                                    $screen_indexcontent.removeClass('index-contentactive');
                                }
                                /*二屏动画*/
                                if (i === 1) {
                                    $screen_productcontent.addClass('product-listactive');
                                } else {
                                    $screen_productcontent.removeClass('product-listactive');
                                }
                            }
                        }

                    }
                }());
            }
            if (type == 'resize') {
                (function () {
                    //隐藏菜单导航
                    var winwidth = $win.width();
                    if (winwidth >= 1200 || (winwidth >= 1200 && e.orientation == 'landscape')) {
                        //隐藏已经存在的class
                        $header_btn.removeClass('header-btnactive');
                        $header_menu.removeClass('g-d-showi');
                        isMobile = false;
                        $screen_3d.addClass('scene-itempc');
                    } else {
                        isMobile = true;
                        $screen_3d.removeClass('scene-itempc');
                    }


                    //重新定位滚动条位置
                    var i = 0,
                        len = screen_pos.length,
                        j = 0,
                        pos = $win.scrollTop();
                    for (i; i < len; i++) {
                        var temptop = screen_pos[i]["node"].offset().top;
                        screen_pos[i]["pos"] = temptop;

                        var minpos = parseInt(pos - 350, 0),
                            maxpos = parseInt(pos + 350, 0);
                        if (temptop >= minpos && temptop <= maxpos) {
                            $header_item.eq(i).addClass('menu-active').siblings().removeClass('menu-active');
                        }
                    }


                }());

            }
        });


        /*初始化新闻资讯*/
        getNewsTab({
            debug: debug,
            tab: {
                url: '新闻资讯tab请求地址'/*todo*/,
                btn_left: $tab_btn_left,
                btn_right: $tab_btn_right,
                wrap: $tab_btn,
                tpl: '<span data-tab="_tabvalue_">_tabname_</span>'
            },
            tabshow: {
                url: '新闻资讯列表请求地址'/*todo*/,
                wrap: $newstab_show,
                tpl: '<li>\
                        <div>\
                            <img alt="" src="_src_">\
                        </div>\
                        <h4>_title_</h4>\
                        <p>_content_<a target="_blank" href="_href_">详情</a></p>\
                      </li>'
            }
        });
        if (tablen >= 1) {
            $tabs.addClass('tab-active').siblings().removeClass('tab-active');

            /*查询信息*/
            getNews({
                url: '../json/test.json',
                theme: theme,
                $wrap: $newstab_show
            });

            if (tablen > TABLEN) {

                if (tab_index === 0) {
                    $tab_btn_left.addClass('tab-btn-disabled');
                } else if (tab_index === tablen - 1) {
                    $tab_btn_right.addClass('tab-btn-disabled');
                }

                /*绑定tab按钮事件*/
                /*左按钮*/
                $tab_btn_left.on('click', function () {
                    var $this = $(this);
                    if ($this.hasClass('tab-btn-disabled')) {
                        return false;
                    }
                    if (tab_index === 0) {
                        return false;
                    } else {
                        tab_index--;
                        if (tab_index === 0) {
                            $tab_btn_left.addClass('tab-btn-disabled');
                        }
                        if (tab_index === tablen - 2) {
                            $tab_btn_right.removeClass('tab-btn-disabled');
                        }
                        if (tab_index <= TABLEN) {
                            $tabs_items.eq(tab_index).removeClass('g-d-hidei');
                        }
                        theme = $tabs_items.eq(tab_index).attr('data-theme');
                        $tabs_items.eq(tab_index).addClass('tab-active').siblings().removeClass('tab-active');
                        /*查询信息*/
                        getNews({
                            url: '../json/test.json',
                            theme: theme,
                            $wrap: $newstab_show
                        });

                    }
                });
                /*右按钮*/
                $tab_btn_right.on('click', function () {
                    var $this = $(this);
                    if ($this.hasClass('tab-btn-disabled')) {
                        return false;
                    }
                    if (tab_index === tablen - 1) {
                        return false;
                    } else {
                        tab_index++;
                        if (tab_index === tablen - 1) {
                            $tab_btn_right.addClass('tab-btn-disabled');
                        }
                        if (tab_index === 1) {
                            $tab_btn_left.removeClass('tab-btn-disabled');
                        }
                        if (tab_index >= TABLEN) {
                            $tabs_items.eq(tab_index - TABLEN).addClass('g-d-hidei');
                        }
                        theme = $tabs_items.eq(tab_index).attr('data-theme');
                        $tabs_items.eq(tab_index).addClass('tab-active').siblings().removeClass('tab-active');
                        /*查询信息*/
                        getNews({
                            url: '../json/test.json',
                            theme: theme,
                            $wrap: $newstab_show
                        });

                    }

                });
            } else {
                $tab_btn_left.addClass('tab-btn-disabled');
                $tab_btn_right.addClass('tab-btn-disabled');
            }

            /*绑定行业tab选项*/
            $tab_btn.on('click', 'span', function () {
                var $this = $(this),
                    theme = $this.attr('data-theme');

                /*同步索引*/
                tab_index = $this.index();

                /*索引极限*/
                if (tablen > TABLEN) {
                    if (tab_index === 0) {
                        /*第一个的情况*/
                        $tab_btn_left.addClass('tab-btn-disabled');
                        $tab_btn_right.removeClass('tab-btn-disabled');
                    } else if (tab_index === tablen - 1) {
                        /*最后一个的情况*/
                        $tab_btn_left.removeClass('tab-btn-disabled');
                        $tab_btn_right.addClass('tab-btn-disabled');
                    } else {
                        $tab_btn_left.removeClass('tab-btn-disabled');
                        $tab_btn_right.removeClass('tab-btn-disabled');
                    }
                }


                /*状态切换*/
                $this.addClass('tab-active').siblings().removeClass('tab-active');

                /*数据请求*/
                getNews({
                    url: '../json/test.json',
                    theme: theme,
                    $wrap: $newstab_show
                });


            });

        } else {
            $tab_btn_left.addClass('tab-btn-disabled');
            $tab_btn_right.addClass('tab-btn-disabled');
            $tab_btn.html('');
        }

    });

    /*获取新闻资讯tab*/
    function getNewsTab(config) {
        if (!config) {
            return false;
        }
        var debug = config.debug;

        $.ajax({
            url: debug ? '../json/test.json' : config.url,
            type: 'post',
            dataType: "json",
            data: {}
        }).done(function (data) {
                if (debug) {
                    var result = testWidget.test({
                        map: {
                            name: 'goodstype',
                            value: 'guid'
                        },
                        mapmin: 5,
                        mapmax: 10,
                        type: 'list'
                    });
                }
                var code = parseInt(result.code, 10);
                if (code !== 0) {
                    /*请求异常*/
                    console.log(result.message);
                    renderNewsTab(config, null);
                } else {
                    /*渲染数据*/
                    renderNewsTab(config, result);
                }
            })
            .fail(function () {
                renderNewsTab(config, null);
            });
    }


    /*渲染新闻资讯tab*/
    function renderNewsTab(config, data) {
        if (!config) {
            return false;
        }

        var tab_config = config.tab,
            tabshow = config.tabshow;
        if (data === null) {
            /*没有数据*/
        } else {
            /*渲染界面*/
        }
        /*初始化新闻资讯变量*/
        var TABLEN = 5/*tab显示数据项*/,
            debug = config.debug;


        $tabs_items = $tab_btn.children(),
            tab_index = 0,
            $tabs = $tabs_items.eq(tab_index),
            theme = $tabs.attr('data-theme'),
            tablen = $tabs_items.length;
    }

    /*获取信息ajax*/
    function getNews(config) {
        if (!config) {
            return false;
        }
        var debug = config.debug;
        $.ajax({
            url: debug ? '../json/test.json' : config.url,
            type: 'post',
            dataType: "json",
            data: {
                "Theme": obj.theme
            }
        }).done(function (data) {
                if (data.flag) {
                    //加载操作
                } else {
                    obj.$wrap.html('');
                }
            })
            .fail(function () {
                obj.$wrap.html('');
            });
    }
})(jQuery);




