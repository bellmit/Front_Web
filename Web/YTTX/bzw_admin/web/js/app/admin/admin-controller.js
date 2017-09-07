/*管理模块应用--控制器*/
(function () {
    'use strict';

    /*创建控制器*/
    angular
        .module('app')
        .controller('adminController', adminController);


    /*控制注入依赖*/
    adminController.$inject = ['adminService'];


    /*控制器实现*/
    function adminController(adminService) {
        var vm = this;

        /*模型--操作权限列表*/
        vm.powerlist = adminService.getCurrentPower();

        /*模型--菜单列表*/
        vm.listitem = [{
            name: '新增管理员',
            power: vm.powerlist.add,
            href: 'admin.add',
            active: ''
        }];

        /*模型--操作记录*/
        vm.record={

        };


        /*对外接口*/


        /*接口实现--公有*/
        
    }
    

}());