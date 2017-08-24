/*辅助服务--公共指令集*/
(function () {
    'use strict';


    /*定义指令*/
    angular
        .module('view')/*公共指令集名称*/
        .directive('dirLoadingAnimation', dirLoadingAnimation)/*加载动画指令*/
        .directive('dirSupportPanel', dirSupportPanel)/*兼容性提示*/;


    /*指令依赖注入*/


    /*指令实现*/
    /*加载动画指令*/
    function dirLoadingAnimation() {
        return {
            replace: false,
            restrict: 'EA',
            templateUrl: 'view/common/load.html'
        };
    }

    /*兼容性提示*/
    function dirSupportPanel() {
        return {
            replace: false,
            restrict: 'EA',
            templateUrl: 'view/common/support_tip.html'
        };
    }

}());
   