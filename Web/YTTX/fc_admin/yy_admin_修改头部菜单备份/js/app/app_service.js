angular.module('app')
    .service('appService',['toolUtil','toolDialog','BASE_CONFIG','loginService',function(toolUtil,toolDialog,BASE_CONFIG,loginService){

        /*获取缓存数据*/
        var self=this;
        

        /*提交登录服务*/
        this.submitForm=function (config) {
            toolUtil.requestHttp({
                url:'/sysuser/login',
                method:'post',
                set:true,
                data:config.login
            }).then(function(resp){
                    loginService.reqAction(resp,config);
                    /*config.isLogin=loginService.reqAction(resp,self.login.username,{
                        headeritem:self.headeritem
                    });*/
                },
                function(resp){
                    config.isLogin=false;
                    var message=resp.data.message;
                    if(typeof message !=='undefined' && message!==''){
                        toastr.error(message);
                    }else{
                        toastr.error('登录失败');
                    }
                });
        };

        /*获取验证码*/
        this.getValidCode = function () {
            loginService.getValidCode({
                wrap: 'validcode_wrap',
                url: "/sysuser/identifying/code"
            });
        };

        /*退出服务*/
        this.loginOut=function (config) {
            /*不合格缓存信息，需要清除缓存*/
            var isout = loginService.loginOut();
            /*更新模型*/
            if (isout) {
                config.isLogin = false;
                config.login = {
                    username: '',
                    password: '',
                    identifyingCode: ''
                };
            }
            /*提示退出信息*/
            if (typeof config.flag !== 'undefined' && config.flag) {
                toolUtil.loginTips({
                    reload: true
                });
            } else {
                toolUtil.loginTips();
            }
        };

        /*是否登录*/
        this.isLogin=function () {
            return loginService.isLogin();
        };

        
    }]);