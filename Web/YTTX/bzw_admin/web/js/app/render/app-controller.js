'use strict';

/*控制器设置基本配置*/
angular.module('app')
    .controller('AppController', ['toolUtil', '$scope','$compile','loginService', 'appService', function (toolUtil, $scope,$compile, loginService, appService) {
        var self = this,
            debug = true/*测试模式*/,
            create = true/*是否生成新菜单*/;

        /*模型--基本配置*/
        this.app_config = {
            issupport: toolUtil.isSupport()/*是否兼容*/,
            isloading: 'g-d-hidei'/*加载组件初始化*/
        };


        /*模型--弹窗基本配置*/
        this.modal = {
            config: {
                width: 'g-w-percent48',
                url: 'view/modal/index.html'
            }
        };


        /*模型--系统信息*/
        this.info = toolUtil.getSystemInfo();


        /*模型--个人信息*/
        this.message = {
            isshow: false,
            active: false,
            login: []
        };

        /*模型--视口切换*/
        this.viewmode = {
            value: 'default',
            list: [{
                name: '定宽',
                value: 'default',
                active: 'header-viewmode-active'
            }, {
                name: '宽屏',
                value: 'auto',
                active: ''
            }]
        };

        /*模型--菜单*/
        this.menu = {
            headeritem: []/*主导航显示区*/,
            headersubitem: []/*主导航隐藏*/,
            isshow: false/*是否显示子导航*/,
            active: false/*是否是激活状态*/
        };


        /*模型--用户数据*/
        this.login = {
            islogin: loginService.isLogin()/*登录标识*/,
            username: '',
            password: '',
            identifyingCode: '',
            loginerror: ''
        };

        /*获取菜单数组*/
        if (self.login.islogin) {
            var cache = loginService.getCache();
            /*渲染菜单*/
            appService.renderMenu(self.menu, function () {
                return appService.calculateMenu(loginService.getMenuData(true));
            });
            /*渲染个人信息*/
            appService.getLoginMessage(self.message, function () {
                var tempcache = cache.loginMap;
                return [{
                    name: '用户名',
                    value: tempcache.username
                }, {
                    name: '登录时间',
                    value: tempcache.datetime
                }];
            });
        }

        /*绑定提交*/
        this.formSubmit = function () {
            /*校验成功*/
            loginService.reqAction({
                login: self.login,
                menu: self.menu,
                message: self.message,
                viewmode: self.viewmode,
                app_config: self.app_config,
                debug: debug,
                create: create
            });
        };
        /*获取验证码*/
        this.getValidCode = function () {
            loginService.getValidCode({
                wrap: 'validcode_wrap',
                debug: debug,
                url: "/sysuser/identifying/code"
            });
        };
        /*退出*/
        this.loginOut = function () {
            self.login = {
                islogin: false,
                username: '',
                password: '',
                identifyingCode: '',
                loginerror: ''
            };
            /*重置菜单信息*/
            self.menu.headeritem = [];
            self.menu.headersubitem = [];
            self.menu.isshow = false;
            /*重置模式*/
            self.viewmode.value = 'default';
            self.changeVM();
            /*重置个人信息*/
            self.message.isshow = false;
            self.message.login = [];
            loginService.loginOut(true);
        };


        /*绑定切换视图事件*/
        this.changeVM = function () {
            appService.renderMenu(self.menu, function () {
                return appService.changeViewMode(self.viewmode.value);
            });
        };


        /*配置弹窗*/
        $scope.$on('configModal', function (event, config) {
            appService.configModal(self.modal, config, function () {
                $compile('<div>nimei</div>')($scope);
            });
        });
        /*显示隐藏弹窗*/
        $scope.$on('toggleModal', function (event, config) {
            appService.toggleModal(config);
        });


    }]);
