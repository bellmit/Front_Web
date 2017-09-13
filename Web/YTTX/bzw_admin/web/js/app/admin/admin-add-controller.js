/*管理模块应用--控制器*/
(function () {
    'use strict';

    /*创建控制器*/
    angular
        .module('app')
        .controller('adminAddController', adminAddController);


    /*控制注入依赖*/
    adminAddController.$inject = ['toolUtil','$scope', 'adminService', 'adminAddService','testService'];


    /*控制器实现*/
    function adminAddController(toolUtil,$scope, adminService, adminAddService, testService) {
        var vm = this,
            debug = true/*测试模式*/;


        /*模型--操作权限列表*/
        vm.powerlist = adminService.getCurrentPower();

        /*模型--欢迎页面*/
        vm.welcome=false;

        /*模型--管理员*/
        vm.admin={
            id:'',
            userName:''
        };


        /*对外接口*/



        /*接口实现--公有*/
        /*操作欢迎页面*/
        

    }


}());