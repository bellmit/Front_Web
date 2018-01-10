/**
 * Created by yipin on 2017/5/31 0031.
 */
(function ($) {
    'use strict';
    $(function () {
        /*常用变量*/
        var $win = $('body'),
            win_width = $win.width(),
            win_height = $win.height();


        /*初始化*/

        /*dom节点缓存*/
        var $hs_container_bg = $('#hs_container_bg'),
            $hs_menuitem = $('#hs_menuitem');


        /*事件绑定*/
        $hs_menuitem.on('click', 'li', function () {
            $hs_container_bg.css({
                'background-image': 'url("images/show/' + ($(this).index() + 1) + '.jpg")'
            });

            anime({
                targets: '#hs_container_bg',
                duration: 1000,
                opacity: .8,
                easing: 'easeInOutQuad',
                complete: function () {
                    anime({
                        targets: '#hs_container_bg',
                        duration: 200,
                        opacity: .2,
                        easing: 'easeInOutQuad'
                    });
                }
            })
        }).find('>li:first-child').trigger('click');



    });

})(jQuery);
