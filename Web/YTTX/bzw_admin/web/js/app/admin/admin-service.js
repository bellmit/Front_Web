/*管理模块应用--服务*/
(function () {
    'use strict';

    /*创建管理模块应用服务*/
    angular
        .module('app')
        .service('adminService', adminService);


    /*服务注入依赖*/
    adminService.$inject = ['toolUtil', 'toolDialog', 'pageService', 'dataTableService', '$location', '$state', 'loginService', 'powerService', 'testService'];


    /*服务实现*/
    function adminService(toolUtil, toolDialog, pageService, dataTableService, $location, $state, loginService, powerService, testService) {
        var cache = loginService.getCache()/*缓存*/,
            cacheparam = cache.loginMap.param/*缓存参数*/,
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
        this.loginOut = loginOut/*退出*/;
        this.doItemAction = doItemAction/*操作表格*/;

        /*接口实现--共有*/
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

        /*退出*/
        function loginOut() {
            loginService.outAction();
        }

        /*操作表格*/
        function doItemAction(config) {
            if (!cache) {
                loginOut();
                return false;
            }
            var index = config.index,
                $btn = config.$btn,
                action = $btn.attr('data-action'),
                id = $btn.attr('data-id'),
                url = '';

            /*适配参数*/
            var param = {
                token: cacheparam.token,
                adminId: cacheparam.adminId,
                id: id
            };
            param['id'] = id;

            if (action === 'update') {
                /*编辑或更新操作*/
                /*设置临时缓存*/
                toolUtil.setParams('tempMap', {
                    id: id
                });
                /*路由*/
                $state.go('admin.add');
            } else if (action === 'delete') {
                /*删除操作*/
                url = 'admin/delete';
                toolDialog.sureDialog('', function () {
                    /*请求数据*/
                    _doItemAction_({
                        url: url,
                        action: action,
                        table: config.table,
                        index: index,
                        method: 'post',
                        debug: config.debug,
                        data: param
                    });
                }, '删除后将不可登录此后台系统了，是否真要删除此权限？', true);
            }


        }


        /*接口实现--私有*/
        function _doItemAction_(config) {
            toolUtil
                .requestHttp(config)
                .then(function (resp) {
                        /*测试代码*/
                        if (config.debug) {
                            var resp = testService.testSuccess();
                        }
                        var data = resp.data,
                            status = parseInt(resp.status, 10);

                        if (status === 200) {
                            var code = parseInt(data.code, 10),
                                message = data.message;
                            if (code !== 0) {
                                if (typeof message !== 'undefined' && message !== '') {
                                    /*提示信息*/
                                    toolDialog.show({
                                        type: 'warn',
                                        value: message
                                    });
                                } else {
                                    /*提示信息*/
                                    toolDialog.show({
                                        type: 'warn',
                                        value: config.action === 'update' ? '编辑权限失败' : '删除权限失败'
                                    });
                                }
                                if (code === 999) {
                                    /*退出系统*/
                                    cache = null;
                                    loginOut();
                                }
                            } else {
                                /*提示操作结果*/
                                toolDialog.show({
                                    type: 'succ',
                                    value: config.action === 'update' ? '编辑权限成功' : '删除权限成功'
                                });
                                /*重新加载数据*/
                                dataTableService.getTableData({
                                    index: config.index,
                                    table: config.table
                                });
                            }
                        }
                    },
                    function (resp) {
                        var message = resp.data.message;
                        if (typeof message !== 'undefined' && message !== '') {
                            console.log(message);
                        } else {
                            console.log(config.action === 'update' ? '编辑权限成功' : '删除权限成功');
                        }
                    });
        }


    }


}());