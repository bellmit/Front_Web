angular.module('app')
    .controller('IndexController', ['loginService','$scope','testService', function (loginService,$scope,testService) {

        var self=this,
            debug=true/*测试模式*/;

        /*主内容侧边栏*/
        this.menuitem = testService.getMap({
            map:{
                'name':'name',
                'value':'value'
            },
            mapmin:5,
            mapmax:15
        }).list;

        /*获取快捷方式*/
        this.getQuickItem=function () {
            return  loginService.getMenuData();
        };


        /**/
        this.changeViewMode=function (type) {
            $scope.$emit("changeViewMode", type);
        };

        /**/
    }]);