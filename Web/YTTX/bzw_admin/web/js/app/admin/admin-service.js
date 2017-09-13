/*管理模块应用--服务*/
(function () {
    'use strict';

    /*创建管理模块应用服务*/
    angular
        .module('app')
        .service('adminService', adminService);


    /*服务注入依赖*/
    adminService.$inject = ['toolUtil', '$location', 'loginService', 'powerService'];


    /*服务实现*/
    function adminService(toolUtil, $location, loginService, powerService) {
        var path = $location.path()/*模块*/,
            module_id = powerService.getIdByPath(path)/*模块id*/,
            powermap = powerService.getCurrentPower(module_id),
            init_power = {
                add: true || powerService.isPower('add', powermap, true)/*增*/,
                delete: true || powerService.isPower('delete', powermap, true)/*删*/,
                update: true || powerService.isPower('update', powermap, true)/*改*/,
                query: true || powerService.isPower('query', powermap, true)/*查*/
            }/*权限配置*/;

        /*对外接口*/
        this.loginOut = loginOut/*退出*/;
        this.changeCache = changeCache/*更新缓存*/;
        this.getCurrentPower = getCurrentPower/*获取当前权限*/;
        this.getSideMenu = getSideMenu/*获取侧边栏菜单*/;


        /*接口实现--公有*/
        /*退出*/
        function loginOut() {
            loginService.outAction();
        }

        /*更新缓存*/
        function changeCache(key, obj) {
            /*设置新缓存*/
            if (obj) {
                toolUtil.setParams(key, obj);
            } else {
                toolUtil.setParams(key, {});
            }
            /*更新登录缓存*/
            loginService.changeCache();
        }

        /*扩展服务--查询操作权限*/
        function getCurrentPower() {
            return init_power;
        }

        /*获取侧边栏菜单*/
        function getSideMenu() {
            var menumap = loginService.getCache()['menuSourceMap'][module_id],
                i = 0,
                len = menumap.length,
                res = [];

            if (len !== 0) {
                for (i; i < len; i++) {
                    var item = menumap[i],
                        obj = {};
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