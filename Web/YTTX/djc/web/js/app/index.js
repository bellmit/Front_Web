/**
 * Created by Administrator on 2017/5/31 0031.
 */
(function ($) {
    'use strict';
    $(function () {
        /*dom节点缓存*/
        var mini_screen_height = 900,
            $menu_toggle = ('#menu_toggle'),
            $menu_wrap = $('#menu_wrap'),
            $menu_item = $menu_wrap.children(),
            $index_view = $('#index_view'),
            $about_view = $('#about_view'),
            $introduction_view = $('#introduction_view'),
            $description_view = $('#description_view'),
            $contact_view = $('#contact_view'),
            $win = $(window),
            screen_pos = [
                {
                    node: $index_view,
                    pos: 0
                },
                {
                    node: $about_view,
                    pos: 0
                },
                {
                    node: $introduction_view,
                    pos: 0
                },
                {
                    node: $description_view,
                    pos: 0
                },
                {
                    node: $contact_view,
                    pos: 0
                }
            ],
            isMobile = false;


        /*初始化*/
        (function () {
            var i = 0,
                len = screen_pos.length,
                j = 0,
                pos = $(window).scrollTop();

            /*初始化屏幕*/
            for (i; i < len; i++) {
                var temptop = screen_pos[i]["node"].offset().top;
                screen_pos[i]["pos"] = temptop;

                var minpos = parseInt(pos - 150, 0),
                    maxpos = parseInt(pos + 150, 0);
                if (temptop >= minpos && temptop <= maxpos) {
                    $menu_item.eq(i).addClass('menu-active').siblings().removeClass('menu-active');
                }
            }

            /*初始化视口判断*/
            var winwidth = $win.width();
            if (winwidth >= 1200) {
                isMobile = false;
            } else {
                isMobile = true;
            }

        }());


        //监听菜单导航
        $menu_wrap.on('click', function (e) {
            e.stopPropagation();
            e.preventDefault();
            var target = e.target,
                node = target.nodeName.toLowerCase(),
                $li;
            if (node === 'a' || node === 'span') {
                $li = $(target).closest('li');
            } else if (node === 'li') {
                $li = $(target);
            } else {
                return false;
            }


            var index = $li.index();
            if (isMobile) {
                $('html,body').animate({'scrollTop': screen_pos[index]['pos'] - 40 + 'px'}, 500);
            } else {
                $('html,body').animate({'scrollTop': screen_pos[index]['pos'] - 100 + 'px'}, 500);
            }
            return false;
        });


        //监听导航切换显示隐藏
        /*$menu_toggle.on('click',function(){
         if($header_btn.hasClass('header-btnactive')){
         //隐藏
         $header_btn.removeClass('header-btnactive');
         $header_menu.removeClass('g-d-showi');
         }else{
         //显示
         $header_btn.addClass('header-btnactive');
         $header_menu.addClass('g-d-showi');
         }
         });*/


        //监听菜单滚动条滚动
        (function () {
            var count = 0;
            $win.on('scroll resize', function (e) {
                var type = e.type;
                if (type === 'scroll') {
                    (function () {
                        count++;
                        if (count % 2 == 0) {
                            var $this = $(window),
                                currenttop = $this.scrollTop(),
                                i = 0,
                                len = screen_pos.length;
                            
                            for (i; i < len; i++) {
                                var pos = screen_pos[i]['pos'],
                                    minpos = parseInt(pos - 150, 0),
                                    maxpos = parseInt(pos + 150, 0);

                                if (currenttop >= minpos && currenttop <= maxpos) {
                                    $menu_item.eq(i).addClass('menu-active').siblings().removeClass('menu-active');
                                }
                            }

                        }
                    }());
                }else if (type === 'resize') {
                    (function () {
                        //隐藏菜单导航
                        var winwidth = $win.width();
                        if (winwidth >= 1200 || (winwidth >= 1200 && e.orientation == 'landscape')) {
                            //隐藏已经存在的class
                            //$header_btn.removeClass('header-btnactive');
                            //$header_menu.removeClass('g-d-showi');
                            isMobile = false;
                        } else {
                            isMobile = true;
                        }


                        //重新定位滚动条位置
                        var i = 0,
                            len = screen_pos.length,
                            j = 0,
                            pos = $win.scrollTop();
                        for (i; i < len; i++) {
                            var temptop = screen_pos[i]["node"].offset().top;
                            screen_pos[i]["pos"] = temptop;

                            var minpos = parseInt(pos - 150, 0),
                                maxpos = parseInt(pos + 150, 0);
                            if (temptop >= minpos && temptop <= maxpos) {
                                $menu_item.eq(i).addClass('menu-active').siblings().removeClass('menu-active');
                            }
                        }


                    }());

                }
            });
        }());


    });
})(jQuery);
