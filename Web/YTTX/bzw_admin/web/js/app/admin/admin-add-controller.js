/*管理模块应用--控制器*/
(function () {
    'use strict';

    /*创建控制器*/
    angular
        .module('app')
        .controller('adminAddController', adminAddController);


    /*控制注入依赖*/
    adminAddController.$inject = ['toolUtil', 'adminService', 'adminAddService', '$scope','testService'];


    /*控制器实现*/
    function adminAddController(toolUtil, adminService, adminAddService, $scope,testService) {
        var vm = this,
            debug = true/*测试模式*/;
        

        /*模型--操作权限列表*/
        vm.powerlist = adminService.getCurrentPower();

        /*模型--菜单列表*/
        vm.listitem = adminService.getSideMenu();
        console.log(vm.listitem);

        console.log('admin add');


        /*对外接口*/



        /*接口实现--公有*/
        /*数据列表初始化*/
        

    }


}());