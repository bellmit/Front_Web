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
        this.setPower = setPower/*设置权限*/;


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
            var id = config.id/*编辑id*/;
            powerService.reqPowerList(config, function () {
                var list=powerService.createTbody();
                config.power.tbody = list;
            });
            config.power.colgroup = powerService.createColgroup();
            config.power.thead = powerService.createThead(true);
        }

        /*设置权限*/
        function setPower(config) {
            toolUtil
                .requestHttp({
                    url:'admin/power/set',
                    method:'POST',
                    data:{
                        power:_getPower_(config)
                    }
                })
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
                                        value: '设置权限失败'
                                    });
                                }
                                if (code === 999) {
                                    /*退出系统*/
                                    loginService.outAction();
                                }
                            } else {
                                /*提示操作结果*/
                                toolDialog.show({
                                    type: 'succ',
                                    value: '设置权限成功'
                                });
                            }
                        }
                    },
                    function (resp) {
                        var faildata = resp.data;
                        if (faildata) {
                            var message = faildata.message;
                            if (typeof message !== 'undefined' && message !== '') {
                                console.log(message);
                            } else {
                                console.log('设置权限失败');
                            }
                        }else{
                            console.log('设置权限失败');
                        }
                    });

        }


        /*接口实现--私有*/
        /*获取权限*/
        function _getPower_(config) {
            var datalist = config.power.tbody,
                list = [],
                i = 0,
                len = datalist.length,
                item,
                subitem;

            for (i; i < len; i++) {
                item = datalist[i];
                for (var j in item) {
                    if (item[j]) {
                        subitem = item[j];
                        list.push({
                            prid: subitem['prid'],
                            isPermit: subitem['checked'] ? 1 : 0
                        })
                    }
                }
            }
            return list;
        }

    }


}());