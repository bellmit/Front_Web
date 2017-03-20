angular.module('ui.headeritem',[])
    .directive('uiHeaderMenu',['toolUtil','$state',function(toolUtil,$state) {
        return {
            replace:false,
            restrict: 'EC',
            template:'<li ng-repeat="i in headerdata.menuitem"><a href="" ui-sref="{{i.href}}" title="">{{i.name}}</a></li>',
            controller:function () {
                var cache=toolUtil.getParams(),
                    login;

                /*如果缓存存在则请求菜单数据*/
                if(cache){
                    login=cache.loginMap;
                    toolUtil.requestHttp({
                        url:'/module/menu',
                        method:'post',
                        set:true,
                        data:login.param
                    }).then(function(resp){
                            var data=resp.data,
                                status=parseInt(resp.status,10),
                                menu;


                            if(status===200){
                                var code=parseInt(data.code,10),
                                    result=data.result,
                                    message=data.message;
                                if(code!==0){
                                    if(typeof message !=='undefined'&&message!==''){
                                        toastr.info(message);
                                    }
                                    return false;
                                }else{
                                    /*设置缓存*/
                                    this.setCache({
                                        'isLogin':true,
                                        'datetime':moment().format('YYYY-MM-DD|HH:mm:ss'),
                                        'reqdomain':BASE_CONFIG.basedomain,
                                        'currentdomain':'',
                                        'username':param,
                                        'param':{
                                            'adminId':encodeURIComponent(result.adminId),
                                            'token':encodeURIComponent(result.token),
                                            'organizationId':encodeURIComponent(result.organizationId)
                                        }
                                    });
                                    /*路由跳转*/
                                    $state.go('app');
                                    /*加载动画*/
                                    toolUtil.loading('show');
                                    var loadingid=setTimeout(function () {
                                        toolUtil.loading('hide',loadingid);
                                    },1000);
                                    return true;
                                }
                            }else{
                                return false;
                            }
                        },
                        function(resp){
                            self.isLogin=false;
                            var message=resp.data.message;
                            if(typeof message !=='undefined'&&message!==''){
                                toastr.error(message);
                            }else{
                                toastr.error('登录失败');
                            }
                        });
                }else{
                    /*跳转到登录模块*/
                    $state.go('login');
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