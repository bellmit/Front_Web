angular.module('app')
    .controller('IndexController', ['loginService','$scope','testService', function (loginService,$scope,testService) {

        var self=this,
            debug=true/*测试模式*/;

        /*模型--主内容侧边栏*/
        this.menuitem = debug?testService.getMap({
            map:{
                'name':'name',
                'value':'value'
            },
            mapmin:5,
            mapmax:15
        }).list:[];


        /*模型--测试弹出指令*/
        this.modal={
            showclass:'',
            isshow:false,
            width:'g-w-percent48'
        };



        
        /*获取快捷方式*/
        this.getQuickItem=function () {
            return  loginService.getMenuData();
        };
        
        /*显示弹窗*/
        this.toggleModal=function () {
            self.modal.isshow=true;
            self.modal.showclass='in';

        };




    }]);