/*头部栏--公共指令集*/
(function () {
    'use strict';


    /*定义指令*/
    angular
        .module('view', [])/*公共指令集名称*/
        .directive('viewHeaderMenu', viewHeaderMenu)/*头部导航栏指令*/
        .directive('viewHeaderLogout', viewHeaderLogout)/*头部退出*/;


    /*指令依赖注入*/
    viewHeaderLogout.$inject = ['$interval', 'loginService'];


    /*指令实现*/
    /*头部导航栏指令*/
    /*
     * demo:
     * <ul class="header-menu" data-view-header-menu=""></ul>
     * */
    function viewHeaderMenu() {
        return {
            replace: false,
            restrict: 'EA',
            scope: {
                header: '=header'
            },
            template: '<li ng-repeat="item in header"><a data-id="{{item.id}}" data-code="{{item.code}}" ui-sref-active="menuactive" href="" ui-sref="{{item.href}}" title="">{{item.name}}</a></li>'
        };
    }

    /*头部退出*/
    /*
     * demo:
     * <div data-view-header-logout=""></div>
     * */
    function viewHeaderLogout($interval, loginService) {
        return {
            replace: false,
            restrict: 'EA',
            scope: {
                action: '&'
            },
            templateUrl: 'view/common/logout.html',
            link: headerLogout
        };


        /*link实现*/
        function headerLogout(scope, element, attrs) {
            /*初始化*/
            scope.time = 0;
            var $out_btn = angular.element('#admin_logout_btn');
            /*绑定事件*/
            $out_btn.bind('click', function () {
                /*手动监听视图*/
                scope.time = 2;
                /*定时任务*/
                var outid = $interval(function () {
                    scope.time--;
                    if (scope.time <= 0) {
                        $interval.cancel(outid);
                        scope.action();
                        scope.time = 0;
                    }
                }, 1000);
            });
            /*设置登录缓存*/
            loginService.outAction({
                $btn: $out_btn
            });
        }
    }
}());
   