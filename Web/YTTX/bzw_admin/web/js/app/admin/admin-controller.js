/*管理模块应用--控制器*/
(function () {
    'use strict';

    /*创建控制器*/
    angular
        .module('app')
        .controller('adminController', adminController);


    /*控制注入依赖*/
    adminController.$inject = ['assistCommon', 'adminService', 'testService'];


    /*控制器实现*/
    function adminController(assistCommon, adminService, testService) {
        var vm = this,
            debug = true/*测试模式*/,
            sequence = [{
                seq: 1,
                page: 'admin_page_wrap1',
                table: 'admin_list_wrap1'
            }]/*分页序列,表格序列*/;

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
                                    'id': 'id',
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
                            vm.table.page.total = 0;
                            vm.table.page.page = 1;
                            jq_dom.$admin_page_wrap.pagination({
                                pageNumber: vm.table.list1_page.page,
                                pageSize: vm.table.list1_page.pageSize,
                                total: vm.table.list1_page.total
                            });
                            return [];
                        }

                        if (result) {
                            /*设置分页*/
                            vm.table.list1_page.total = result.count;
                            /*分页调用*/
                            jq_dom.$admin_page_wrap.pagination({
                                pageNumber: vm.table.list1_page.page,
                                pageSize: vm.table.list1_page.pageSize,
                                total: vm.table.list1_page.total,
                                onSelectPage: function (pageNumber, pageSize) {
                                    /*再次查询*/
                                    var temp_param = vm.table.list1_config.config.ajax.data;
                                    vm.table.list1_page.page = pageNumber;
                                    vm.table.list1_page.pageSize = pageSize;
                                    temp_param['page'] = vm.table.list1_page.page;
                                    temp_param['pageSize'] = vm.table.list1_page.pageSize;
                                    vm.table.list1_config.config.ajax.data = temp_param;
                                    adminService.getColumnData(vm.table, vm.record);
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
                            vm.table.list1_page.total = 0;
                            vm.table.list1_page.page = 1;
                            jq_dom.$admin_page_wrap.pagination({
                                pageNumber: vm.table.list1_page.page,
                                pageSize: vm.table.list1_page.pageSize,
                                total: vm.table.list1_page.total
                            });
                            return [];
                        }
                    },
                    data: {
                        page: 1,
                        pageSize: 10
                    }
                },
                info: false,
                dom: '<"g-d-hidei" s>',
                searching: true,
                order: [[1, "desc"]],
                columns: [
                    {
                        "data": "id"
                    },
                    {
                        "data": "sendNumber"
                    },
                    {
                        "data": "sendTime"
                    },
                    {
                        "data": "merchantName"
                    },
                    {
                        "data": "merchantPhone",
                        "render": function (data, type, full, meta) {
                            return toolUtil.phoneFormat(data);
                        }
                    },
                    {
                        "data": "orderNumber"
                    },
                    {
                        "data": "orderState",
                        "render": function (data, type, full, meta) {
                            var stauts = parseInt(data, 10),
                                statusmap = {
                                    0: "待付款",
                                    1: "取消订单",
                                    6: "待发货",
                                    9: "待收货",
                                    20: "待评价",
                                    21: "已评价"
                                },
                                str;

                            if (stauts === 0) {
                                str = '<div class="g-c-blue3">' + statusmap[stauts] + '</div>';
                            } else if (stauts === 1) {
                                str = '<div class="g-c-red1">' + statusmap[stauts] + '</div>';
                            } else if (stauts === 6 || stauts === 9 || stauts === 20) {
                                str = '<div class="g-c-warn">' + statusmap[stauts] + '</div>';
                            } else if (stauts === 21) {
                                str = '<div class="g-c-green1">' + statusmap[stauts] + '</div>';
                            } else {
                                str = '<div class="g-c-gray6">其他</div>';
                            }
                            return str;
                        }
                    },
                    {
                        "data": "store"
                    },
                    {
                        /*to do*/
                        "data": "guid",
                        "render": function (data, type, full, meta) {
                            var btns = '';

                            /*查看订单*/
                            if (vm.powerlist.invoice_details) {
                                btns += '<span data-action="detail" data-id="' + data + '"  class="btn-operate">查看</span>';
                                if (vm.powerlist.invoice_delivery && parseInt(full.orderState, 10) === 6) {
                                    btns += '<span data-action="send" data-id="' + data + '"  class="btn-operate">发货</span>';
                                }
                            }
                            return btns;
                        }
                    }
                ]
            }
        };


        /*初始化*/
        assistCommon.initPage()/*分页初始化*/;
        assistCommon.initTable()/*数据列表初始化*/;


        /*对外接口*/


        /*接口实现--公有*/

    }


}());