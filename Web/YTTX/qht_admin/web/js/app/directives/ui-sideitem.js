angular.module('ui.sideitem',[])
    .directive('uiSubLogo',function() {
        return {
          replace:false,
          restrict: 'EC',
          template:'<div class="logo-img-wrap">\
                        <img src="../images/index_logo.png" alt="logo" />\
                    </div>\
                    <h1>深圳银通移动支付有限公司</h1>'
        };
    })
    .directive('uiSubInfo',function() {
        return {
            replace:false,
            restrict: 'EC',
            template:'<li>身份：<span>省级代理商</span></li>'
        };
    })
    .directive('uiSubList',function() {
        return {
            replace:false,
            restrict: 'EC',
            template:'<li class="menuactive"><a href="#" title="">列表1</a></li>\
                          <li><a href="#" title="">列表2</a></li>'
        };
    })
    .directive('uiSubSearch',function() {
        return {
            replace:false,
            restrict: 'EC',
            template:'<label class="search-content">\
                <input type="text" placeholder="搜索" value="" name="search_name" class="g-br3" />\
            </label>'
        };
    })
    .directive('uiSubTab',['$http',function($http) {
        return {
            replace:false,
            restrict: 'EC',
            template:'<li class="tabactive">选项1</li>\
            <li>选项2</li>',
            link:function (scope, element, attrs) {
               /*绑定事件*/
                element.on('click','li',function (e) {
                    $(this).addClass('tabactive').siblings().removeClass('tabactive');
                });

                /*初始化请求数据*/
                $http({
                    url:'http://www.baidu.com',
                    method:'post',
                    data:''
                })
                    .success(function (resp) {
                        var code=parseInt(json.code,10);
                        if(code!==0){
                            if(code===999){
                                /*清空缓存*/
                                /*public_tool.loginTips(function () {
                                    public_tool.clear();
                                    public_tool.clearCacheData();
                                });*/
                            }
                            console.log(resp.message);
                            return false;
                        }
                        var result=resp.result;
                        if(typeof result==='undefined'){
                            return false;
                        }
                        
                    })
                    .error(function(resp){
                        console.log(resp.message);
                        return false;
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
            </li>'
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
    });