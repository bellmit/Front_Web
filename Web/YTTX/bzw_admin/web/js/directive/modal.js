/*弹窗指令*/
(function () {
    'use strict';

    /*定义指令*/
    angular
        .module('view')
        .directive('viewModalWrap', viewModalWrap)/*弹出框指令*/;


    /*指令依赖注入*/
    //viewModalWrap.$inject=['assistCommon'];

    /*指令实现*/

    /*弹出框指令*/
    /*
     * demo:
     * <view-modal-wrap></view-modal-wrap>
     * */
    function viewModalWrap() {
        return {
            replace: true,
            restrict: 'EA',
            scope: {
                setting: '=setting'
            },
            template: '<div>\
                <div class="modal fade custom-width in g-d-showi" id="admin_modal_wrap">\
                     <div class="modal-dialog g-w-percent48">\
                        <div class="modal-content">\
                            <div class="modal-body">\
                            主内容区\
                            </div>\
                            <div class="modal-footer">\
                                <button type="button" id="admin_modal_close" class="btn btn-red"  data-dismiss="modal">关闭</button>\
                            </div>\
                        </div>\
                    </div>\
                </div>\
            </div>',
            link: modalWrap
        };

        /*link实现*/
        function modalWrap(scope, elem, attrs, ctrl) {
            /*绑定事件*/
            var $wrap = angular.element('#admin_modal_wrap'),
                $close = angular.element('#admin_modal_close');


            /*绑定关闭*/
            $close.bind('click', function () {
                scope.$apply(function () {
                    $wrap.modal('hide');
                });
            });
        }
    }

}());