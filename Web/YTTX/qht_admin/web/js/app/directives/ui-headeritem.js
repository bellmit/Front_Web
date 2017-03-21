angular.module('ui.headeritem',[])
    .directive('uiHeaderMenu',['toolUtil','BASE_CONFIG',function(toolUtil,BASE_CONFIG) {
        return {
            replace:false,
            restrict: 'EC',
            template:'<li ng-repeat="i in uiheader_ctrl.menuitem"><a href="" ui-sref="{{i.href}}" title="">{{i.name}}</a></li>',
            controller:function () {
                var self=this,
                    cache=toolUtil.getParams();

                if(cache===null){
                    self.menuitem=[];
                    toolUtil.loginOut(true);
                }else if(cache){
                    /*判断登陆缓存是否有效*/
                    var islogin=toolUtil.validLogin(cache.loginMap,BASE_CONFIG.basedomain),
                        list;
                    if(!islogin){
                        /*缓存失效，退出登录*/
                        self.menuitem=[];
                        toolUtil.loginOut(true);
                        return false;
                    }
                    if(cache.cacheMap.menuload){
                        /*直接加载缓存*/
                        self.menuitem=cache.menuMap;
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
                                            var list=toolUtil.resolveMainMenu(result);
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
            controllerAs:'uiheader_ctrl',
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
    });