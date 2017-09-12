/*管理模块应用--服务*/
(function () {
    'use strict';

    /*创建管理模块应用服务*/
    angular
        .module('app')
        .service('adminAddService', adminAddService);


    /*服务注入依赖*/
    adminAddService.$inject = ['toolUtil', 'toolDialog', '$state', 'loginService', 'powerService', 'adminService', 'testService'];


    /*服务实现*/
    function adminAddService(toolUtil, toolDialog, $state, loginService, powerService, adminService, testService) {
        var cache = loginService.getCache()/*缓存*/,
            cacheparam = cache.loginMap.param/*缓存参数*/,
            init_power = adminService.getCurrentPower()/*权限配置*/;


        /*对外接口*/

        /*接口实现--共有*/
        /*扩展服务--查询操作权限*/
        function getCurrentPower() {
            return init_power;
        }


    }


}());