angular.module('ui.commonitem',[])
    /*头部导航栏指令*/
    .directive('uiHeaderMenu',function() {
        return {
            replace:false,
            restrict: 'EC',
            template:'<li ng-repeat="i in app_ctrl.headeritem"><a data-id="{{i.id}}" data-code="{{i.code}}" href="" ui-sref="{{i.href}}" title="">{{i.name}}</a></li>',
            link:function (scope, element, attrs) {
                /*绑定事件menuactive*/
                element.on('click','a',function (e) {
                    var $this=$(this);
                    $this.addClass('menuactive').parent().siblings().find('a').removeClass('menuactive');
                });
            }
        };
    })
    /*头部退出*/
    .directive('uiHeaderLogout',function() {
        return {
            replace:true,
            restrict: 'EC',
            template:'<div class="g-br3 header-outwrap" id="struct_layout_loginout" ui-sref="app" ng-click="app_ctrl.loginOut()">退出</div>'
        };
    })
    /*首页logo指令*/
    .directive('uiSubLogo',function() {
        return {
          replace:false,
          restrict: 'EC',
          template:'<div class="logo-img-wrap">\
                        <img src="images/index_logo.png" alt="logo" />\
                    </div>\
                    <h1>深圳银通移动支付有限公司</h1>'
        };
    })
    /*首页用户信息指令*/
    .directive('uiSubInfo',function() {
        return {
            replace:false,
            restrict: 'EC',
            template:'<li ng-repeat="i in index_ctrl.menuitem">{{i.name}}：<span>{{i.value}}</span></li>'
        };
    })
    /*列表指令*/
    .directive('uiSubList',function() {
        return {
            replace:false,
            restrict: 'EC',
            template:'<li ng-repeat="i in subdata.listitem"><a data-type="{{i.href}}" title="">{{i.name}}</a></li>'
        };
    })
    /*侧边栏搜索指令*/
    .directive('uiSubSearchStruct',function() {
        return {
            replace:false,
            restrict: 'EC',
            template:'<label class="search-content {{struct_ctrl.search.searchactive}}">\
                <input type="text" ng-keyup="struct_ctrl.searchAction($event)" placeholder="搜索" ng-model="struct_ctrl.search.orgname" name="search_name" class="g-br3" />\
            <span class="search-clear" ng-click="struct_ctrl.searchClear()"></span></label>'
        };
    })
    /*侧边栏搜索指令*/
    .directive('uiSubSearchStructRole',function() {
        return {
            replace:false,
            restrict: 'EC',
            template:'<label class="search-content {{structrole_ctrl.search.searchactive}}">\
                <input type="text" ng-keyup="structrole_ctrl.searchAction($event)" placeholder="搜索" ng-model="structrole_ctrl.search.name" name="search_name" class="g-br3" />\
            <span class="search-clear" ng-click="structrole_ctrl.searchClear()"></span></label>'
        };
    })
    /*侧边栏tab选项卡指令*/
    .directive('uiSubTab',function() {
        return {
            replace:false,
            restrict: 'EC',
            template:'<li ui-sref="{{i.href}}" class="{{i.active}}" ng-repeat="i in struct_ctrl.tabitem">{{i.name}}</li>',
            link:function (scope, element, attrs) {
               /*绑定事件*/
                element.on('click','li',function (e) {
                    $(this).addClass('tabactive').siblings().removeClass('tabactive');
                });
            }
        };
    })
    /*侧边栏级联菜单指令*/
    .directive('uiSubMenu',function() {
        return {
            replace:false,
            restrict: 'EC',
            template:''
        };
    })
    /*侧边栏按钮指令*/
    .directive('uiSubBtn',function() {
        return {
            replace:false,
            restrict: 'EC',
            template:'<li>\
                <span><i class="fa-plus"></i>添加按钮</span>\
            </li>\
            <li>\
                <span><i class="fa-plus"></i>添加按钮</span>\
            </li>'
        };
    })
    /*首页快捷方式指令*/
    .directive('uiMainApp',function() {
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