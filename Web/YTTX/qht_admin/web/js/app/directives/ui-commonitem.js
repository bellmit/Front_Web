angular.module('ui.commonitem',[])
    /*数据服务类*/
    .service('')
    /*头部导航栏指令*/
    .directive('uiHeaderMenu',['toolUtil','BASE_CONFIG',function(toolUtil,BASE_CONFIG) {
        return {
            replace:false,
            restrict: 'EC',
            template:'<li ng-repeat="i in uiheadermenu_ctrl.menuitem"><a data-id="{{i.id}}" data-code="{{i.code}}" href="" ui-sref="{{i.href}}" title="">{{i.name}}</a></li>',
            controller:function () {
                var self=this,
                    cache=toolUtil.getParams();

                if(cache===null){
                    self.menuitem=[];
                    toolUtil.loginOut(true);
                }else if(cache){
                    /*判断登陆缓存是否有效*/
                    var islogin=toolUtil.validLogin(cache.loginMap,BASE_CONFIG.basedomain),
                        list=null;
                    if(!islogin){
                        /*缓存失效，退出登录*/
                        self.menuitem=[];
                        toolUtil.loginOut(true);
                        return false;
                    }
                    if(cache.cacheMap.menuload){
                        /*直接加载缓存*/
                        list=toolUtil.loadMainMenu(cache.menuMap);
                        if(list!==null){
                            self.menuitem=list;
                        }else{
                            self.menuitem=[];
                        }
                    }else{
                        /*如果缓存存在且缓存未加载相关数据则请求菜单数据*/
                        toolUtil.requestHttp({
                            url:'/module/menu',
                            method:'post',
                            set:true,
                            data:cache.loginMap.param
                        }).then(function(resp){
                                var data=resp.data,
                                    status=parseInt(resp.status,10);

                                if(status===200){
                                    var code=parseInt(data.code,10),
                                        message=data.message;
                                    if(code!==0){
                                        if(typeof message !=='undefined'&&message!==''){
                                            console.log('message');
                                        }
                                        if(code===999){
                                            /*退出系统*/
                                            toolUtil.loginOut(true);
                                        }
                                        self.menuitem=[];
                                        return false;
                                    }else{
                                        /*加载数据*/
                                        var result=data.result;
                                        if(typeof result!=='undefined'){
                                            /*flag:是否设置首页*/
                                            list=toolUtil.resolveMainMenu(result.menu,true);
                                            if(list===null){
                                                self.menuitem=[];
                                            }else{
                                                /*设置缓存*/
                                                cache['cacheMap']={
                                                    menuload:true,
                                                    powerload:true
                                                };
                                                cache['moduleMap']=list['module'];
                                                cache['menuMap']=list['menu'];
                                                cache['powerMap']=list['power'];
                                                /*更新缓存*/
                                                toolUtil.setParams(BASE_CONFIG.unique_key,cache);
                                                /*设置模型*/
                                                self.menuitem=list['list'];
                                            }
                                        }else{
                                            self.menuitem=[];
                                        }
                                    }
                                }
                            },
                            function(resp){
                                self.menuitem=[];
                                var message=resp.data.message;
                                if(typeof message !=='undefined'&&message!==''){
                                    console.log(message);
                                }else{
                                    console.log('请求菜单失败');
                                }
                            });
                    }

                }
            },
            controllerAs:'uiheadermenu_ctrl',
            link:function (scope, element, attrs) {
                /*绑定事件menuactive*/
                element.on('click','a',function (e) {
                    var $this=$(this);
                    $this.addClass('menuactive').parent().siblings().find('a').removeClass('menuactive');
                });
            }
        };
    }])
    .directive('uiHeaderLogout',function() {
        return {
            replace:true,
            restrict: 'EC',
            template:'<div class="g-br3 header-outwrap" ui-sref="login" ng-click="login_ctrl.loginOut()">退出</div>'
        };
    })
    /*侧边栏指令*/
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
    .directive('uiSubInfo',function() {
        return {
            replace:false,
            restrict: 'EC',
            /* template:'<li ng-repeat="i in uiheadermenu_ctrl.menuitem"><a data-id="{{i.id}}" data-code="{{i.code}}" href="" ui-sref="{{i.href}}" title="">{{i.name}}</a></li>',*/
            template:'<li>身份：<span>省级代理商</span></li>',
            controller:function (){

            },
            controllerAs:'uisubinfo_ctrl'
        };
    })
    .directive('uiSubList',function() {
        return {
            replace:false,
            restrict: 'EC',
            template:'<li ng-repeat="i in subdata.listitem"><a data-type="{{i.href}}" title="">{{i.name}}</a></li>'
        };
    })
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
    .directive('uiSubTab',['$http',function($http) {
        return {
            replace:false,
            restrict: 'EC',
            template:'<li ui-sref="{{i.href}}" ng-repeat="i in subdata.tabitem">{{i.name}}</li>',
            link:function (scope, element, attrs) {
               /*绑定事件*/
                element.on('click','li',function (e) {
                    $(this).addClass('tabactive').siblings().removeClass('tabactive');
                });
            }
        };
    }])
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
    /*首页指令*/
    .directive('uiMainApp',['toolUtil',function(toolUtil) {
    return {
        replace:false,
        restrict: 'EC',
        template:'<div class="admin-welcome-banner"><img src="images/index_banner.jpg" alt="" /></div>\
                    <h3 class="admin-layout-theme3">快捷入口</h3>\
                    <ul class="admin-quick-icon">\
                      <li ng-repeat="i in uimainapp_ctrl.menuitem">\
                        <div class="g-br5" data-id="{{i.id}}" data-code="{{i.code}}" href="" ui-sref="{{i.href}}">\
                            <img alt="" src="images/quick_{{$index + 1}}.png" />\
                            <span>{{i.name}}</span>\
                        </div>\
                      </li>\
                    </ul>',
        controller:function () {
            var cache=toolUtil.getParams('menuMap'),
                list=null;

            if(cache){
                /*直接加载缓存*/
                list=toolUtil.loadMainMenu(cache);
                if(list!==null){
                    /*清除首页*/
                    list.shift();
                    this.menuitem=list;
                }else{
                    this.menuitem=[];
                }
            }else{
                this.menuitem=[];
            }
        },
        controllerAs:'uimainapp_ctrl'
    };
}]);