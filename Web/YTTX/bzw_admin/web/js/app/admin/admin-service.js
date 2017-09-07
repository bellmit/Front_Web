/*管理模块应用--服务*/
(function () {
    'use strict';

    /*创建管理模块应用服务*/
    angular
        .module('app')
        .service('adminService', adminService);


    /*服务注入依赖*/
    adminService.$inject = ['toolUtil', 'toolDialog', '$location', 'loginService', 'powerService'];


    /*服务实现*/
    function adminService(toolUtil, toolDialog, $location, loginService, powerService) {
        /*获取缓存数据*/
        var self = this,
            cache = loginService.getCache(),
            manageform_reset_timer = null,
            path=$location.path(),
            module_id = toolUtil.getIdByPath(cache.moduleMap,path)/*模块id*/,
            temptable = null/*上一次table缓存*/,
            powermap = powerService.getCurrentPower(module_id),
        /*初始化权限 to do*/
            init_power = {
                add: true || toolUtil.isPower('add', powermap, true)/*增*/,
                delete: true || toolUtil.isPower('delete', powermap, true)/*删*/,
                update: true || toolUtil.isPower('update', powermap, true)/*改*/,
                query: true || toolUtil.isPower('query', powermap, true)/*查*/
            };


        /*对外接口*/
        this.getCurrentPower = getCurrentPower/*获取当前权限*/;
        this.getSideMenu=getSideMenu/*获取侧边栏菜单*/;


        /*接口实现*/
        /*扩展服务--查询操作权限*/
        function getCurrentPower() {
            return init_power;
        }
        /*获取侧边栏菜单*/
        function getSideMenu() {
            var menumap=cache['menuSourceMap'][module_id],
                i=0,
                len=menumap.length,
                res=[];
            
            if(len!==0){
                var item,obj={};
                for(i;i<len;i++){
                    item=menumap[i];
                    obj['name']=item['modName'];
                    obj['href']=item['modLink'];
                    obj['active']='';
                    obj['power']=true;
                    res.push(obj);
                }
                return res;
            }
            return [] ;
        }

    }


}());