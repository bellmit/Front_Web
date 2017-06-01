/**
 * Created by Administrator on 2017/5/31 0031.
 */
(function ($) {
    'use strict';

    $(function () {
        //轮播dom节点
        var $slideimg_show=$('#slideimg_show'),
            $slide_tips=$('#slide_tips'),
            $slide_img=$('#slide_img'),
            $slideimg_btn=$('#slideimg_btn');


        //轮播动画
        slide.slideToggle({
            $wrap:$slideimg_show,
            $slide_img:$slide_img,
            $btnwrap:$slideimg_btn,
            $slide_tipwrap:$slide_tips,
            minwidth:1000,
            isresize:false,
            size:3,
            times:5000,
            eff_time:500,
            btn_active:'slidebtn-active'
        });
    });
})(jQuery);
