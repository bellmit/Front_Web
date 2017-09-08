/*管理模块应用--服务*/
(function () {
    'use strict';

    /*创建管理模块应用服务*/
    angular
        .module('app')
        .service('adminService', adminService);


    /*服务注入依赖*/
    adminService.$inject = ['toolUtil', 'toolDialog', 'assistCommon', '$location', 'loginService', 'powerService'];


    /*服务实现*/
    function adminService(toolUtil, toolDialog, assistCommon, $location, loginService, powerService) {
        var cache = loginService.getCache()/*缓存*/,
            path = $location.path()/*模块*/,
            module_id = powerService.getIdByPath(cache.moduleMap, path)/*模块id*/,
            powermap = powerService.getCurrentPower(module_id),
            init_power = {
                add: true || powerService.isPower('add', powermap, true)/*增*/,
                delete: true || powerService.isPower('delete', powermap, true)/*删*/,
                update: true || powerService.isPower('update', powermap, true)/*改*/,
                query: true || powerService.isPower('query', powermap, true)/*查*/
            }/*权限配置*/;


        /*对外接口*/
        this.getCurrentPower = getCurrentPower/*获取当前权限*/;
        this.getSideMenu = getSideMenu/*获取侧边栏菜单*/;


        /*接口实现*/
        /*扩展服务--查询操作权限*/
        function getCurrentPower() {
            return init_power;
        }

        /*获取侧边栏菜单*/
        function getSideMenu() {
            var menumap = cache['menuSourceMap'][module_id],
                i = 0,
                len = menumap.length,
                res = [];

            if (len !== 0) {
                var item, obj = {};
                for (i; i < len; i++) {
                    item = menumap[i];
                    obj['name'] = item['modName'];
                    obj['href'] = item['modLink'];
                    obj['active'] = '';
                    obj['power'] = true;
                    res.push(obj);
                }
                return res;
            }
            return [];
        }

    }


}());