angular.module('app')
    .controller('IndexController', ['$scope', 'loginService', 'indexService', function ($scope, loginService, indexService) {

        var self = this,
            debug = true/*测试模式*/;

        /*模型--主内容侧边栏*/
        this.menuitem = debug ? indexService.getSideInfo() : [];


        /*模型--测试弹出指令*/
        this.modal = {
            width: 'g-w-percent48',
            url: 'view/modal/index.html'
        };


        /*获取快捷方式*/
        this.getQuickItem = function () {
            return loginService.getMenuData();
        };


        /**/
        /*显示弹窗*/
        this.toggleModal = function (config) {
            /*配置弹窗*/
            self.modal.url=config.url;
            $scope.$emit('configModal', self.modal);
            /*弹出弹窗*/
            $scope.$emit('toggleModal', {
                display: config.display
            });
        };


    }]);