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

        /*dom节点缓存*/
        var $hs_menuitem = $('#hs_menuitem');


        /*事件绑定*/
        $hs_menuitem.on('click', 'li', function () {
            anime({
                targets: '#hs_container_bg',
                opacity: .5,
                backgroundImage: 'url("images/show/' + ($(this).index() + 1) + '.jpg")',
                easing: 'easeInOutQuad'
            })
        })

        /*初始化*/

    });

})(jQuery);
