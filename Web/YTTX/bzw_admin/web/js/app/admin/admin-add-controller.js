/*管理模块应用--控制器*/
(function () {
    'use strict';

    /*创建控制器*/
    angular
        .module('app')
        .controller('adminAddController', adminAddController);


    /*控制注入依赖*/
    adminAddController.$inject = ['toolUtil', 'adminService', 'adminAddService', 'testService'];


    /*控制器实现*/
    function adminAddController(toolUtil, adminService, adminAddService, testService) {
        var vm = this,
            debug = true/*测试模式*/;

        /*模型--操作权限列表*/
        vm.powerlist = adminService.getCurrentPower();

        /*模型--菜单列表*/
        vm.listitem = adminService.getSideMenu();


        /*对外接口*/
        this.getTableData = getTableData/*获取数据*/;
        this.doItemAction = doItemAction/*操作表格*/;


        /*接口实现--公有*/
        /*数据列表初始化*/
        function getTableData() {

        }

        /*操作表格*/
        function doItemAction(config) {

        }

    }


}());