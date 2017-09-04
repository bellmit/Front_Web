angular.module('app')
    .service('indexService', ['toolUtil', 'toolDialog','loginService', 'powerService', 'testService', function (toolUtil, toolDialog, loginService, powerService, testService) {

        /*获取缓存数据*/
        var self = this,
            module_id = 0/*模块id*/,
            cache = loginService.getCache();

        var powermap = powerService.getCurrentPower(module_id);

        /*初始化权限*/
        var init_power = {
            add: toolUtil.isPower('invoice-print', powermap, true)/*增*/,
            delete: toolUtil.isPower('invoice-export', powermap, true)/*删*/,
            update: toolUtil.isPower('invoice-details', powermap, true)/*改*/,
            query: toolUtil.isPower('invoice-delivery', powermap, true)/*查*/
        };

        /*获取权限列表*/
        this.getCurrentPower = function () {
            return init_power;
        };
        
        /*获取侧边栏信息*/
        this.getSideInfo=function () {
            return testService.getMap({
                map: {
                    'name': 'name',
                    'value': 'value'
                },
                mapmin: 5,
                mapmax: 15
            }).list;
        };


        /*扩展服务--退出系统*/
        this.loginOut = function () {
            loginService.outAction();
        };
        

    }]);