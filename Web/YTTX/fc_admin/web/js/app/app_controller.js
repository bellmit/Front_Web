'use strict';

/*控制器设置基本配置*/
angular.module('app')
    .controller('AppController', ['toolUtil', 'loginService','$scope', function (toolUtil, loginService,$scope) {
        var self = this;

        /*设置提示*/
        $.extend(true, toastr.options, {
            positionClass: "toast-top-center"
        });

        /*模型--兼容性控制*/
        this.isSupport = toolUtil.isSupport();

        /*模型--登陆控制*/
        this.isLogin =loginService.isLogin();

        /*模型--导航菜单*/
        this.headeritem = [];

        /*模型--用户数据*/
        this.login = {
            username: '',
            password: '',
            identifyingCode: ''
        };


        /*绑定提交*/
        this.formSubmit = function () {
            /*校验成功*/
            loginService.reqAction({
                login: self.login,
                isLogin: self.isLogin,
                headeritem: self.headeritem,
                $scope:$scope
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
        this.loginOut = function (flag) {
            /*不合格缓存信息，需要清除缓存*/
            var isout = loginService.loginOut();
            /*更新模型*/
            if (isout) {
                self.isLogin = false;
                self.login = {
                    username: '',
                    password: '',
                    identifyingCode: ''
                };
            }
            /*提示退出信息*/
            if (typeof flag !== 'undefined' && flag) {
                toolUtil.loginTips({
                    reload: true
                });
            } else {
                toolUtil.loginTips();
            }
        };

        /*setInterval(function () {
            console.log(self.isLogin);
        },2000)*/

    }]);
