angular.module('app')
    .controller('IndexController', ['$scope', 'loginService', 'indexService', function ($scope, loginService, indexService) {

        var self = this,
            debug = true/*测试模式*/;

        /*模型--主内容侧边栏*/
        this.menuitem = debug ? indexService.getSideInfo() : [];


        /*获取快捷方式*/
        this.getQuickItem = function () {
            return loginService.getMenuData();
        };


        /**/
        /*显示弹窗*/
        this.toggleModal = function (config) {
            /*配置弹窗*/
            $scope.$emit('configModal',{
                url:config.url,
                width:config.width
            });
            /*弹出弹窗*/
            $scope.$emit('toggleModal', {
                display: config.display
            });
        };


    }]);