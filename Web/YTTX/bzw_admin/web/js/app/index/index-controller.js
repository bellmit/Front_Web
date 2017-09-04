angular.module('app')
    .controller('IndexController', ['$scope', 'loginService', 'indexService', function ($scope, loginService, indexService) {

        var self = this,
            debug = true/*测试模式*/;

        /*模型--主内容侧边栏*/
        this.menuitem = debug ? indexService.getSideInfo() : [];


        /*模型--测试弹出指令*/
        this.modal = {
            config:{
                width:'g-w-percent48',
                url:'view/modal/index.html'
            }
        };


        /*获取快捷方式*/
        this.getQuickItem = function () {
            return loginService.getMenuData();
        };
        
        
        /*配置弹窗*/
        $scope.$emit('configModal',self.modal);


        /*显示弹窗*/
        this.toggleModal = function (type) {
            $scope.$emit('toggleModal', {
                display: type
            });
        };


    }]);