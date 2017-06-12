'use strict';

/*控制器设置基本配置*/
angular.module('app')
    .controller('AppController', ['toolUtil', 'appService', function (toolUtil, appService) {
        var self = this;

        /*设置提示*/
        $.extend(true, toastr.options, {
            positionClass: "toast-top-center"
        });

        /*模型--兼容性控制*/
        this.isSupport = toolUtil.isSupport();

        /*模型--登陆控制*/
        this.isLogin =appService.isLogin();

        /*模型--导航菜单*/
        this.headeritem = [];

        /*模型--用户数据*/
        this.login = {
            username: '',
            password: '',
            identifyingCode: ''
        };


        /*绑定提交*/
        this.submitLogin = function () {
            /*校验成功*/
            appService.submitForm({
                login: self.login,
                isLogin: self.isLogin,
                headeritem: self.headeritem
            });
        };
        /*获取验证码*/
        this.getValidCode = function () {
            appService.getValidCode();
        };
        /*退出*/
        this.loginOut = function (flag) {
            appService.loginOut({
                flag:flag,
                isLogin:self.isLogin,
                login:self.login
            });
        };

    }]);
