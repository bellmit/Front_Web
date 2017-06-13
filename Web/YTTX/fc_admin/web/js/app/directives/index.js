angular.module('app')
    /*首页快捷方式指令*/
    .directive('uiMainQuick',function() {
        return {
            replace:false,
            restrict: 'EC',
            template:'<div class="admin-welcome-banner"><img src="images/index_banner.jpg" alt="" /></div>\
                        <h3 class="admin-layout-theme3">快捷入口</h3>\
                        <ul class="admin-quick-icon">\
                          <li ng-repeat="i in index_ctrl.quickitem">\
                            <div class="g-br5" data-id="{{i.id}}" data-code="{{i.code}}" href="" ui-sref="{{i.href}}">\
                                <img alt="" src="images/quick_{{$index + 1}}.png" />\
                                <span>{{i.name}}</span>\
                            </div>\
                          </li>\
                        </ul>'
        };
    });
   