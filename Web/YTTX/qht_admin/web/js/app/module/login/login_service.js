angular.module('login.service',[])
    .service('loginService',['$http','$httpParamSerializerJQLike','$q','toolUtil','BASE_CONFIG',function($http,$httpParamSerializerJQLike,$q,toolUtil,BASE_CONFIG){
        var login_cache={},
            cache=toolUtil.getParams(BASE_CONFIG.unique_key);
        return {
            /*是否登陆*/
            isLogin:function () {
                if(cache){
                    return cache.loginMap.isLogin||true;
                }else{
                    return false;
                }
            },
            /*获取登陆信息*/
            getLoginInfo:function () {
                return login_cache;
            },
            /*登陆请求*/
            reqLogin:function (config) {
                var req=config;

                /*适配配置*/
                req.url=BASE_CONFIG.basedomain + BASE_CONFIG.baseproject + req.url;
                req.data=$httpParamSerializerJQLike(req.data);
                req['headers']={ "Content-Type": "application/x-www-form-urlencoded" };

                var deferred=$q.defer(),
                    promise=$http(req);

                promise.then(function (resp) {
                    deferred.resolve(resp);
                },function (resp) {
                    deferred.reject(resp);
                });
                return deferred.promise;
            },
            /*处理登陆请求*/
            reqAction:function (resp) {
                var data=resp.data,
                    config=resp.config,
                    status=parseInt(resp.status,10);


                if(status===200){
                    var code=parseInt(data.code,10),
                        result=data.result,
                        message=data.message;
                    if(code!==0){
                        if(typeof message !=='undefined'&&message!==''){
                            toastr.info(message);
                        }else{
                            toastr.info('登录失败');
                        }
                        return false;
                    }else{
                        toastr.success("登陆成功");
                        /*设置缓存*/
                        this.setCache({
                            'isLogin':true,
                            'datetime':moment().format('YYYY-MM-DD|HH:mm:ss'),
                            'reqdomain':BASE_CONFIG.basedomain,
                            'currentdomain':'',
                            'username':config.username,
                            'param':{
                                'adminId':encodeURIComponent(result.adminId),
                                'token':encodeURIComponent(result.token),
                                'organizationId':encodeURIComponent(result.organizationId)
                            }
                        });
                        /*路由跳转*/
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
                        cache:{},
                        routeMap:{
                            prev:'',
                            current:''
                        },
                        menuMap:{},
                        powerMap:{},
                        loginMap:data,
                        settingMap:{}
                    };
                }
                toolUtil.setParams(BASE_CONFIG.unique_key,cache);
            },
            /*清除缓存*/
            clearCache:function () {
                login_cache={};
                if(cache){
                    toolUtil.clear(BASE_CONFIG.unique_key);
                }
            },
            /*退出*/
            loginOut:function () {
                /*清除缓存*/
                this.clearCache();
                /*执行退出动画*/
                
            }
        };
    }]);