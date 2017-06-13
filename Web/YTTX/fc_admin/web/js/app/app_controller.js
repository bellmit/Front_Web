'use strict';

/*控制器设置基本配置*/
angular.module('app')
    .controller('AppController', ['toolUtil', 'loginService', function (toolUtil, loginService) {
        var self = this;


        /*模型--系统初始化配置*/
        this.app_config={
            /*基本配置*/
            name:'fc_admin',
            version:'1',
            /*组件配置*/
            loadinghide:true,
            loadingtime:0,
            issupport:toolUtil.isSupport(),
            /*设置配置*/
            setting:{}
        };


        /*模型--用户数据*/
        this.login = {
            islogin:loginService.isLogin()/*登录标识*/,
            headeritem:[]/*导航菜单*/,
            username: '',
            password: '',
            identifyingCode: ''
        };


        /*绑定提交*/
        this.formSubmit = function () {
            /*校验成功*/
            loginService.reqAction({
                login:self.login,
                app_config:self.app_config
            });
        };
        /*获取验证码*/
        this.getValidCode = function () {
            loginService.getValidCode({
                wrap: 'validcode_wrap',
                url: "/sysuser/identifying/code"
            });
        };
        /*退出*/
        this.loginOut = function () {
            /*不合格缓存信息，需要清除缓存*/
            var isout = loginService.loginOut(true);
            /*更新模型*/
            if (isout) {
                self.login.islogin = false;
                self.login.headeritem=[];
                self.login = {
                    username: '',
                    password: '',
                    identifyingCode: ''
                };

            }
        };

    }]);
