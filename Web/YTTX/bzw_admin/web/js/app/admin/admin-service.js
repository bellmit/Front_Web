/*管理模块应用--服务*/
(function () {
    'use strict';

    /*创建管理模块应用服务*/
    angular
        .module('app')
        .service('adminService', adminService);


    /*服务注入依赖*/
    adminService.$inject = ['toolUtil', 'toolDialog', 'loginService', 'powerService'];


    /*服务实现*/
    function adminService(toolUtil, toolDialog, loginService, powerService) {
        /*获取缓存数据*/
        var self = this,
            module_id = 10/*模块id*/,
            cache = loginService.getCache(),
            manageform_reset_timer = null,
            temptable = null/*上一次table缓存*/,
            powermap = powerService.getCurrentPower(module_id),
        /*初始化权限 to do*/
            init_power = {
                add: true || toolUtil.isPower('add', powermap, true)/*增*/,
                delete: true || toolUtil.isPower('delete', powermap, true)/*删*/,
                update: true || toolUtil.isPower('update', powermap, true)/*改*/,
                query: true || toolUtil.isPower('query', powermap, true)/*查*/
            };


        /*对外接口*/
        this.getCurrentPower=getCurrentPower;




        /*接口实现*/
        /*扩展服务--查询操作权限*/
        function getCurrentPower() {
            return init_power;
        }
        
    }


}());