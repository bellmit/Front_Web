/**
 * Created by yipin on 2017/5/31 0031.
 */
(function ($) {
    'use strict';
    $(function () {
        /*dom节点缓存*/
        var $column2_header_nav = $('#column2_header_nav'),
            $layout_flex_column2 = $('#layout_flex_column2'),
            $layout_flex_rowcolumn9 = $('#layout_flex_rowcolumn9'),
            $layout_flex_flow = $('#layout_flex_flow');


        $(window).on('keyup', function (e) {
            var code = e.keyCode;
            if (code === 49 || code === 97) {
                /*1*/
                $layout_flex_column2.removeClass('g-d-hidei');
                $layout_flex_rowcolumn9.addClass('g-d-hidei');
                $layout_flex_flow.addClass('g-d-hidei');
            } else if (code === 50 || code === 98) {
                /*2*/
                $layout_flex_column2.addClass('g-d-hidei');
                $layout_flex_rowcolumn9.removeClass('g-d-hidei');
                $layout_flex_flow.addClass('g-d-hidei');
            } else if (code === 51 || code === 99) {
                /*3*/
                $layout_flex_column2.addClass('g-d-hidei');
                $layout_flex_rowcolumn9.addClass('g-d-hidei');
                $layout_flex_flow.removeClass('g-d-hidei');
            }
            return false;
        });

        //监听菜单导航
        $column2_header_nav.on('click', function (e) {
            e.stopPropagation();
            e.preventDefault();
            var target = e.target,
                node = target.nodeName.toLowerCase(),
                $li;
            if (node === 'a') {
                $li = $(target).closest('li');
            } else if (node === 'li') {
                $li = $(target);
            } else {
                return false;
            }
            $li.addClass('menu-active').siblings().removeClass('menu-active');
        });


    });
})(jQuery);
