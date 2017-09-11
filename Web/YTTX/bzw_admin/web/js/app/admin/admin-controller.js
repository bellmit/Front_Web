/*管理模块应用--控制器*/
(function () {
    'use strict';

    /*创建控制器*/
    angular
        .module('app')
        .controller('adminController', adminController);


    /*控制注入依赖*/
    adminController.$inject = ['toolUtil', 'assistCommon', 'adminService', 'testService'];


    /*控制器实现*/
    function adminController(toolUtil, assistCommon, adminService, testService) {
        var vm = this,
            debug = true/*测试模式*/;

        /*模型--操作权限列表*/
        vm.powerlist = adminService.getCurrentPower();

        /*模型--菜单列表*/
        vm.listitem = adminService.getSideMenu();


        /*模型--操作记录*/
        vm.record = {
            id: ''/*设置权限id*/,
            name: ''/*设置权限名称*/
        };

        /*模型--表格*/
        vm.table = {
            sequence: [{
                index: 1,
                page: 'admin_page_wrap1',
                table: 'admin_list_wrap1'
            }]/*分页序列,表格序列*/,
            condition:{}/*查询条件*//*{1:[{},{}]}*/,
            /*分页配置*/
            table_page1: {
                page: 1,
                pageSize: 20,
                total: 0
            },
            /*请求配置*/
            table_config1: {
                processing: true, /*大消耗操作时是否显示处理状态*/
                deferRender: true, /*是否延迟加载数据*/
                autoWidth: true, /*是否*/
                paging: false,
                ajax: {
                    url: debug ? 'json/test.json' : toolUtil.adaptReqUrl('/admin/list'),
                    dataType: 'JSON',
                    method: 'post',
                    dataSrc: function (json) {
                        if (debug) {
                            var json = testService.test({
                                map: {
                                    'id': 'guid',
                                    'name': 'value',
                                    'realName': 'name',
                                    'email': 'email',
                                    'phone': 'mobile',
                                    'loginTime': 'datetime',
                                    'logincount': 'id'
                                },
                                mapmin: 5,
                                mapmax: 20,
                                type: 'list'
                            })/*测试请求*/;
                        }

                        var code = parseInt(json.code, 10),
                            message = json.message;


                        if (code !== 0) {
                            if (typeof message !== 'undefined' && message !== '') {
                                console.log(message);
                            } else {
                                console.log('获取数据失败');
                            }
                            if (code === 999) {
                                /*退出系统*/
                                adminService.loginOut();
                            }
                            return [];
                        }
                        var result = json.result;
                        if (typeof result === 'undefined') {
                            /*重置分页*/
                            assistCommon.resetPage({
                                index: 1,
                                page: vm.table.table_page1
                            });
                            return [];
                        }

                        if (result) {
                            /*设置分页*/
                            assistCommon.renderPage({
                                index: 1,
                                page: vm.table.table_page1,
                                count: result.count,
                                onSelectPage: function (pageNumber, pageSize) {
                                    /*再次查询*/
                                    var temp_param = vm.table.table_config1.ajax.data;
                                    temp_param['page'] = pageNumber;
                                    temp_param['pageSize'] = pageSize;
                                    vm.table.table_config1.ajax.data = temp_param;
                                    /*assistCommon.getColumnData({
                                     table:vm.table.table_config1
                                     });*/
                                }
                            });
                            var list = result.list;
                            if (list) {
                                return list;
                            } else {
                                return [];
                            }
                        } else {
                            /*重置分页*/
                            assistCommon.resetPage({
                                index: 1,
                                page: vm.table.table_page1
                            });
                            return [];
                        }
                    },
                    data: {
                        page: 1,
                        pageSize: 20
                    }
                },
                info: false,
                dom: '<"g-d-hidei" s>',
                searching: true,
                order: [[1, "desc"]],
                columns: [
                    {
                        "data": "name"
                    },
                    {
                        "data": "realName"
                    },
                    {
                        "data": "email"
                    },
                    {
                        "data": "phone",
                        "render": function (data, type, full, meta) {
                            return toolUtil.phoneFormat(data);
                        }
                    },
                    {
                        "data": "loginTime"
                    },
                    {
                        "data": "logincount"
                    },
                    {
                        /*to do*/
                        "data": "id",
                        "render": function (data, type, full, meta) {
                            var btns = '';

                            /*查看订单*/
                            if (vm.powerlist.add) {
                                btns += '<span data-action="detail" data-id="' + data + '"  class="btn-operate">操作1</span>';
                                btns += '<span data-action="send" data-id="' + data + '"  class="btn-operate">操作2</span>';
                            }
                            return btns;
                        }
                    }
                ]
            },
            table_cache1: null
        };


        /*初始化*/
        assistCommon.initPage({
            sequence:vm.table.sequence
        })/*分页初始化*/;
        assistCommon.initTable({
            sequence:vm.table.sequence,
            condition:vm.table.condition
        })/*数据列表初始化*/;



        
        /*对外接口*/
        this.getTableData=getTableData/*获取数据*/;




        /*接口实现--公有*/
        /*数据列表初始化*/
        function getTableData() {
            //assistCommon.conditionTable()/*组合条件*/;
            assistCommon.getTableData({
                table:vm.table,
                index:1
            });
        }

    }


}());