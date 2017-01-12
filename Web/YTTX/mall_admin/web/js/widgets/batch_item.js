/*批量组件*/
;(function ($) {
    var $batchtoggle=$('#admin_batchitem_btn'),
        $batchshow=$('#admin_batchitem_show'),
        $batchselect=$('#admin_batchitem_select');


    /*构造函数*/
    function batchItem(){}

    /*初始化函数*/
    batchItem.prototype.init=function (opt) {
        this.batchbtn={};
        $.extend(this.batchbtn,{
            $batchtoggle:$batchtoggle,
            $batchshow:$batchshow,
            $batchselect:$batchselect
        },opt);
        this.bind();
    };
    /*事件注册*/
    batchItem.prototype.bind=function () {};
    /*事件注销*/
    batchItem.prototype.unbind=function () {};
    /*对外接口*/
    batchItem.prototype.batchdo=function () {};
})(jQuery);