angular.module('login.service',[])
    .service('loginService',['toolUtil','BASE_CONFIG','$state',function(toolUtil,BASE_CONFIG,$state){
        var login_cache={},
            cache=toolUtil.getParams(BASE_CONFIG.unique_key);
        return {
            /*获取登陆信息*/
            getLoginInfo:function () {
                var logininfo=toolUtil.isLogin(cache),
                    islogin=false;
                if(logininfo){
                    islogin=toolUtil.validLogin(cache.loginMap);
                    if(!islogin){
                        /*不合格缓存信息，需要清除缓存*/
                        this.loginOut();
                    }
                    return islogin;
                }else{
                    return false;
                }
            },
            /*处理登陆请求*/
            reqAction:function (resp,param) {
                var data=resp.data,
                    status=parseInt(resp.status,10);


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
            /*获取验证码*/
            getValidCode:function (config) {
                var xhr = new XMLHttpRequest();

                xhr.open("post",BASE_CONFIG.basedomain + BASE_CONFIG.baseproject + config.url, true);

                xhr.responseType = "blob";
                xhr.onreadystatechange = function() {
                    if (this.status == 200) {
                        var blob = this.response,
                            img = document.createElement("img");

                        img.alt='验证码';
                        try{
                            img.onload = function(e) {
                                window.URL.revokeObjectURL(img.src);
                            };
                            img.src = window.URL.createObjectURL(blob);
                        }catch (e){
                            console.log('不支持URL.createObjectURL');
                        }

                        if(config.wrap){
                            angular.element('#'+config.wrap).html(img)||$('#'+config.wrap).html(img);
                        }else if(config.fn&&typeof config.fn==='function'){
                            config.fn.call(null,img);
                        }
                    }
                };
                xhr.send();
            },
            /*设置缓存*/
            setCache:function (data) {
                login_cache=data;
                if(cache){
                    cache.loginMap=data;
                }else{
                    cache={
                        cache:{
                            menuload:false,
                            powerload:false
                        },
                        routeMap:{
                            prev:'',
                            current:'',
                            setting:false
                        },
                        menuMap:{},
                        powerMap:{},
                        loginMap:data,
                        settingMap:{}
                    };
                }
                toolUtil.setParams(BASE_CONFIG.unique_key,cache);
            },
            /*退出*/
            loginOut:function () {
                /*清除缓存*/
                login_cache={};
                toolUtil.clear();
                toolUtil.loginTips(true);
            }
        };
    }]);