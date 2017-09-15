/*管理模块应用--服务*/
(function () {
    'use strict';

    /*创建管理模块应用服务*/
    angular
        .module('app')
        .service('adminAddService', adminAddService);


    /*服务注入依赖*/
    adminAddService.$inject = ['toolUtil', 'toolDialog', '$state', '$timeout', 'loginService', 'powerService', 'adminService', 'testService'];


    /*服务实现*/
    function adminAddService(toolUtil, toolDialog, $state, $timeout, loginService, powerService, adminService, testService) {
        var cacheparam = loginService.getCache().loginMap.param/*缓存*/,
            timerid = null;


        /*对外接口*/
        this.clearFormData = clearFormData/*重置表单数据*/;
        this.queryByEdit = queryByEdit/*查询编辑数据*/;


        /*接口实现--公有*/
        /*重置表单数据*/
        function clearFormData(config) {
            var type = config.type,
                model = config.model[type];

            if (model) {
                if (type === 'admin') {
                    (function () {
                        for (var i in model) {
                            if (i !== 'setting') {
                                model[i] = '';
                            }
                        }
                    }());
                }
            }
        }

        /*查询编辑数据*/
        function queryByEdit(config) {
            var len = parseInt(Math.random() * 10, 10) + 2,
                tempcol = 50 % len,
                colitem,
                colgroup = [],
                thead = [],
                j = 0;

            if (tempcol !== 0) {
                colitem = parseInt((50 - tempcol) / len, 10);
            } else {
                colitem = parseInt(50 / len, 10);
            }
            /*解析分组*/
            if (colitem * len <= (50 - len)) {
                colitem = len + 1;
            }
            for (j; j < len; j++) {
                colgroup.push({
                    col_class: 'g-w-percent' + colitem
                });
                thead.push({
                    input_class: 'isall',
                    index: (j + 1),
                    id: parseInt(Math.random() * 100, 10),
                    name: 'abcd'
                })
            }
            config.power.colgroup = powerService.createColgroup();
            config.power.thead = powerService.createThead(true);
        }


    }


}());