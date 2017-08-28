angular.module('app')
    .controller('IndexController', ['loginService','testService', function (loginService,testService) {

        var self=this,
            debug=true/*测试模式*/;

        /*主内容侧边栏*/
        self.menuitem = testService.getMap({
            map:{
                'name':'name',
                'value':'value'
            },
            mapmin:5,
            mapmax:15
        }).list;

        /*获取快捷方式*/
        self.getQuickItem=function () {
            return  loginService.getMenuData();
        }
    }]);