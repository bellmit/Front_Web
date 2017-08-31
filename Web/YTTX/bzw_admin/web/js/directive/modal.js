/*弹窗指令*/
(function () {
    'use strict';

    /*定义指令*/
    angular
        .module('view')
        .directive('viewModalWrap', viewModalWrap)/*手机号码指令，手机格式化指令*/;


    /*指令依赖注入*/
    viewModalWrap.$inject=['assistCommon'];

    /*指令实现*/

    /*手机号码指令，手机格式化指令*/
    /*
     * demo:
     * <input type="text" data-view-mobile-phone="" />
     * */
    function viewModalWrap(assistCommon) {
        return {
            replace: true,
            restrict: 'EA',
            scope:{
                setting:'=setting',
                config:'=config',
                fn:'&fn'
            },
            template: '<div class="modal fade custom-width" id="admin_modal_wrap">\
                 <div class="modal-dialog" ng-class="{true:scope.setting.width,false:g-w-percent48}[scope.setting.width]">\
                    <div class="modal-content">\
                        <div class="modal-body">\
                        主内容区\
                        </div>\
                        <div class="modal-footer">\
                            <button type="button" id="admin_modal_close" class="btn btn-red">关闭</button>\
                        </div>\
                    </div>\
                </div>\
            </div>',
            link: modalWrap
        };

        /*link实现*/
        function modalWrap(scope, elem, attrs, ctrl) {
            /*绑定事件*/
            var $wrap=angular.element('#admin_modal_wrap'),
                $close=angular.element('#admin_modal_close');



            /*绑定关闭*/
            $close.bind('click',function () {
                scope.$apply(function () {
                    assistCommon.toggleModal(scope.config,scope.fn);
                });
            });
        }
    }

}());