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
            template:'<div class="g-br3 header-outwrap" ui-sref="login" ng-click="app_ctrl.loginOut()">退出</div>'
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
            template:'<li ng-repeat="i in index_ctrl.indexinfo">{{i.name}}：<span>{{i.value}}</span></li>'
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
    .directive('uiSubSearch',['toolUtil',function(toolUtil) {
        return {
            replace:false,
            restrict: 'EC',
            template:'<label class="search-content">\
                <input type="text" placeholder="搜索" value="" name="search_name" class="g-br3" />\
            <span class="search-clear"></span></label>',
            link:function (scope, element, attrs) {
                /*绑定事件*/
                element.on('keyup','input',function (e){
                    var $this=$(this),
                        value=toolUtil.trims(this.value),
                        $label=$this.parent(),
                        kcode='';

                    if(value===''){
                        /*输入为空时*/
                        $label.removeClass('search-content-active');
                    }else{
                        /*输入非空*/
                        $label.addClass('search-content-active');
                        kcode=e.keyCode;
                        /*提交*/
                        if(kcode===13){
                            scope.$apply(function () {
                                console.log('search:'+value);
                            });
                        }
                    }
                });
                element.on('click','span',function (e) {
                    var $input=element.find('input');

                    $input.val('');
                    $input.trigger('keyup');
                });
            }
        };
    }])
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
            template:'<li>\
                <a class="sub-menu-title" href="#" title="">菜单列表1</a>\
                <ul>\
                    <li>\
                        <a class="sub-menu-title" href="#" title="">菜单列表1</a>\
                        <ul>\
                            <li><a href="#" title="">菜单列表1</a></li>\
                        </ul>\
                    </li>\
                </ul>\
            </li>',
            link:function (scope, element, attrs) {
                /*绑定事件*/
                element.on('click','a',function (e) {
                    var $this=$(this),
                        haschild=$this.hasClass('sub-menu-title'),
                        $child;

                    if(haschild){
                        e.preventDefault();
                        $child=$this.next();
                        if($child.hasClass('g-d-showi')){
                            /*隐藏*/
                            $child.removeClass('g-d-showi');
                            $this.removeClass('sub-menu-titleactive');
                        }else{
                            /*显示*/
                            $child.addClass('g-d-showi');
                            $this.addClass('sub-menu-titleactive');
                        }
                    }
                });
            }
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