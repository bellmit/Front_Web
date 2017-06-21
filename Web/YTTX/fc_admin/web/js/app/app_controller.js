'use strict';

/*控制器设置基本配置*/
angular.module('app')
    .controller('AppController', ['toolUtil', 'loginService', function (toolUtil, loginService) {
        var self = this;

        /*模型--基本配置*/
        this.app_config={
            issupport:toolUtil.isSupport()/*是否兼容*/,
            isloading:'g-d-hidei'/*加载组件初始化*/,
            loginouttime:0/*退出系统时间*/
        };


        /*模型--用户数据*/
        this.login = {
            islogin:loginService.isLogin()/*登录标识*/,
            headeritem:[]/*导航菜单*/,
            username: '',
            password: '',
            identifyingCode: '',
            loginerror:''
        };
        /*获取菜单数组*/
        if(self.login.islogin){
            self.login.headeritem=loginService.getMenuData(true);
        }

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
            /*self.login.islogin = false;
            self.login.headeritem=[];
            self.login = {
                username: '',
                password: '',
                identifyingCode: ''
            };*/
            self.app_config.loginouttime=2;
            toolUtil.loginTips({
                model:self.app_config,
                router:'app'
            });
            //loginService.loginOut();
        };
        
    }]);
