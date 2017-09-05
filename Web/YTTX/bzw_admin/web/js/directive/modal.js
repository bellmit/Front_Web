/*弹窗指令*/
(function () {
    'use strict';

    /*定义指令*/
    angular
        .module('view')
        .directive('viewModalDialog', viewModalDialog)/*弹出框容器指令*/;


    /*指令依赖注入*/
    //viewModalDialog.$inject = ['$timeout'];



    /*指令实现*/

    /*弹出框容器指令*/
    /*
     * demo:
     * <view-modal-dialog></view-modal-dialog>
     * */
    function viewModalDialog() {
        var modal_timer = null;
        return {
            replace: false,
            restrict: 'EA',
            scope: {},
            templateUrl: function (elem, attrs) {
                return attrs.url || 'view/modal/index.html';
            },
            link: modalDialog
        };

        /*link实现*/
        function modalDialog(scope, elem, attrs, ctrl) {

        }
    }


}());