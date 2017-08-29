/*首页快捷导航指令*/
(function () {
    'use strict';

    /*定义指令*/
    angular
        .module('view')
        .directive('viewQuickLink', viewQuickLink);

    /*指令依赖注入*/
    viewQuickLink.$inject = ['$timeout'];


    /*指令实现*/
    /*首页快捷方式指令*/
    /*demo:
    * <div data-view-quick-link="" class="struct-layout-main"></div>
    * */
    function viewQuickLink($timeout) {
        var outid = null;
        return {
            replace: false,
            restrict: 'EA',
            scope: {
                action: '&action'
            },
            template: '<div class="admin-welcome-banner"><img ng-src="images/index_banner.jpg" alt="" /></div>\
                        <h3 class="admin-layout-theme3">快捷入口</h3>\
                        <ul class="admin-quick-icon">\
                          <li ng-repeat="i in quick">\
                            <div class="g-br5" data-id="{{i.id}}" data-code="{{i.code}}" href="" ui-sref="{{i.href}}">\
                                <img alt="" ng-src="{{i.src}}" />\
                                <span>{{i.name}}</span>\
                            </div>\
                          </li>\
                        </ul>',
            link:quickLink
        };

        /*link实现*/
        function quickLink(scope, element, attrs) {
            var quickimg = scope.action();
            if (quickimg) {
                if (quickimg.length === 0) {
                    outid = $timeout(function () {
                        scope.$apply(function () {
                            scope.quick = doQuickImage(scope.action());
                            if (outid !== null) {
                                $timeout.cancel(outid);
                                outid = null;
                            }
                        });
                    }, 500);
                } else {
                    scope.quick = doQuickImage(quickimg);
                }
            } else {
                scope.quick = [];
            }
        }
    }


    /*处理图像路径--图像服务*/
    function doQuickImage(arr, path) {
        var src = '';
        if (!path) {
            /*如果未指定路径则默认为快捷路径*/
            src = 'images/quick_icon/';
        }

        var len = arr.length,
            imgsrc_map = {
                'app': 0/*首页*/,
                'organization': 1/*机构*/,
                'struct': 1/*机构*/,
                'order': 2/*订单*/,
                'finance': 3/*财务*/,
                'equipment': 4/*设备*/,
                'setting': 5/*设置*/,
                'invoice': 6/*发货*/,
                'purchase': 7/*采购*/,
                'warehouse': 8/*仓库*/,
                'equity': 9/*股权投资人*/,
                'profit':10/*分润管理，利润管理*/,
                'provider':11/*供应商管理*/,
                'admin':12/*管理员*/,
                'business':13/*商家管理*/,
                'goods':14/*商品管理*/,
                'statistics':15/*统计管理*/,
                'user':16/*用户管理*/
            },
            i = 0,
            item;
        if (len !== 0) {
            for (i; i < len; i++) {
                item = arr[i];
                item['src'] = src + 'quick_' + imgsrc_map[item['href']] + '.png';
            }
        }
        return arr;
    }

}());
   