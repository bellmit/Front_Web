angular.module('app')
    .service('invoiceService', ['toolUtil', 'toolDialog','loginService', 'powerService', 'dataTableColumnService', 'dataTableItemActionService', 'testService', function (toolUtil, toolDialog, loginService, powerService, dataTableColumnService, dataTableItemActionService, testService) {

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


        this.getCurrentPower = function () {
            return init_power;
        };

        /*扩展服务--退出系统*/
        this.loginOut = function () {
            loginService.outAction();
        };
        
    }]);