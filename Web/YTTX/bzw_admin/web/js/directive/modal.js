/*弹窗指令*/
(function () {
    'use strict';

    /*定义指令*/
    angular
        .module('view')
        .directive('viewModalDialog', viewModalDialog)/*弹出框指令*/
        .directive('viewModalContent', viewModalContent)
        .directive('viewModalClose', viewModalClose);


    /*指令依赖注入*/
    //viewModalWrap.$inject=['assistCommon'];

    /*指令实现*/

    /*弹出框容器指令*/
    /*
     * demo:
     * <view-modal-dialog></view-modal-dialog>
     * */
    function viewModalDialog() {
        return {
            replace: true,
            restrict: 'EA',
            scope: {},
            template: '<div class="modal-dialog g-w-percent48">\
                            <div class="modal-content">\
                                <view-modal-content></view-modal-content>\
                                <view-modal-close></view-modal-close>\
                            </div>\
                        </div>',
            link: modalDialog
        };

        /*link实现*/
        function modalDialog(scope, elem, attrs, ctrl) {

        }
    }


    /*弹出框内容指令*/
    /*
     * demo:
     * <view-modal-content></view-modal-content>
     * */
    function viewModalContent() {
        return {
            replace: true,
            restrict: 'EA',
            scope: {},
            template: '<div class="modal-body"></div>',
            link: modalContent
        };

        /*link实现*/
        function modalContent(scope, elem, attrs, ctrl) {

        }
    }


    /*弹出框关闭指令*/
    /*
     * demo:
     * <view-modal-close></view-modal-close>
     * */
    function viewModalClose() {
        return {
            replace: true,
            restrict: 'EA',
            scope: {},
            template: '<div class="modal-footer">\
                            <button type="button" class="btn btn-red"  data-dismiss="modal">关闭</button>\
                    </div>',
            link: modalClose
        };

        /*link实现*/
        function modalClose(scope, elem, attrs, ctrl) {

        }
    }

}());