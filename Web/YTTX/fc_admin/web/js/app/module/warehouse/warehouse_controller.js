/*首页控制器*/
angular.module('app')
    .controller('WarehouseController', ['warehouseService', 'testService', 'toolUtil', '$scope', function (warehouseService, testService, toolUtil, $scope) {
        var self = this;

        /*模型--操作权限列表*/
        this.powerlist = warehouseService.getCurrentPower();


        /*jquery dom缓存:主要是切换路由时，创建的dom缓存引用与现有的dom引用不一致，需要加载视图更新现有dom引用*/
        var jq_dom = {
            $submenu_scroll_wrap: $('#submenu_scroll_wrap'),
            $admin_warehouse_submenu: $('#admin_warehouse_submenu'),
            /*分组控制*/
            $admin_table_checkcolumn1: $('#admin_table_checkcolumn1'),
            $admin_table_checkcolumn2: $('#admin_table_checkcolumn2'),
            $admin_table_checkcolumn3: $('#admin_table_checkcolumn3'),
            $admin_table_checkcolumn4: $('#admin_table_checkcolumn4'),
            /*分页*/
            $admin_page_wrap1: $('#admin_page_wrap1'),
            $admin_page_wrap2: $('#admin_page_wrap2'),
            $admin_page_wrap3: $('#admin_page_wrap3'),
            $admin_page_wrap4: $('#admin_page_wrap4'),
            /*列表*/
            $admin_list_wrap1: $('#admin_list_wrap1'),
            $admin_list_wrap2: $('#admin_list_wrap2'),
            $admin_list_wrap3: $('#admin_list_wrap3'),
            $admin_list_wrap4: $('#admin_list_wrap4'),
            /*分组*/
            $admin_list_colgroup1: $('#admin_list_colgroup1'),
            $admin_list_colgroup2: $('#admin_list_colgroup2'),
            $admin_list_colgroup3: $('#admin_list_colgroup3'),
            $admin_list_colgroup4: $('#admin_list_colgroup4'),
            /*表主体操作区*/
            $admin_batchlist_wrap1: $('#admin_batchlist_wrap1'),
            $admin_batchlist_wrap2: $('#admin_batchlist_wrap2'),
            $admin_batchlist_wrap3: $('#admin_batchlist_wrap3'),
            $admin_batchlist_wrap4: $('#admin_batchlist_wrap4'),
            /*全选操作*/
            $admin_kucun_checkall1: $('#admin_kucun_checkall1'),
            /*其他*/
            $search_startTime: $('#search_startTime'),
            $search_endTime: $('#search_endTime'),
            $admin_purchasedetail_dialog: $('#admin_purchasedetail_dialog'),
            $admin_purchasedetail_show: $('#admin_purchasedetail_show'),
            $admin_receive_dialog: $('#admin_receive_dialog')/*收货*/,
            $admin_receive_show: $('#admin_receive_show')/*收货*/,
            $admin_audit_dialog: $('#admin_audit_dialog')/*审核*/,
            $admin_audit_show: $('#admin_audit_show')/*审核*/
        };

        /*切换路由时更新dom缓存*/
        warehouseService.initJQDom(jq_dom);


        /*模型--操作记录*/
        this.record = {
            iscroll_flag: true/*是否开启滚动条调用*/,
            filter: '',
            startTime: '',
            endTime: '',
            action: 1/*选项主题，默认为库存查询选项*/,
            searchWord: '',
            organizationId: ''/*操作节点*/,
            prev: null/*菜单操作:上一次操作菜单*/,
            current: null/*菜单操作:当前操作菜单*/,
            currentId: ''/*根节点*/,
            currentName: ''/*根节点*/
        };

        /*模型--tab选项卡--主题*/
        this.themeitem = [{
            name: '库存',
            power: true,
            type: 'kucun',
            active: 'tabactive'
        }, {
            name: '入库',
            power: true,
            type: 'ruku',
            active: ''
        }, {
            name: '出库',
            power: true,
            type: 'chuku',
            active: ''
        }, {
            name: '盘点',
            power: true,
            type: 'pandian',
            active: ''
        }];


        /*模型--审核*/
        this.audit = {
            type: 'base'/*审核时数据类型：base:一般，batch:批量*/,
            auditflag:true/*审核标识*/,
            auditinfo:''/*审核信息*/,
            isdata: ''/*是否有数据*/,
            batchflag: false/*是否是批量模式*/,
            editshow: false/*是否编辑*/,
            editvalue:''/*编辑值*/,
            editnode:null/*编辑节点*/
        };


        /*模型--表格缓存*/
        this.table = {
            /*分页配置*/
            list_page1: {
                page: 1,
                pageSize: 10,
                total: 0
            },
            list_page2: {
                page: 1,
                pageSize: 10,
                total: 0
            },
            list_page3: {
                page: 1,
                pageSize: 10,
                total: 0
            },
            list_page4: {
                page: 1,
                pageSize: 10,
                total: 0
            },
            /*数据请求配置*/
            /*库存*/
            list_config1: {
                config: {
                    processing: true, /*大消耗操作时是否显示处理状态*/
                    deferRender: true, /*是否延迟加载数据*/
                    autoWidth: true, /*是否*/
                    paging: false,
                    ajax: {
                        url: /*toolUtil.adaptReqUrl('/organization/invoice/list')*/'json/test.json'/*测试地址*/,
                        dataType: 'JSON',
                        method: 'post',
                        dataSrc: function (json) {
                            var json = testService.test({
                                map: {
                                    'id': 'guid',
                                    'purchaseId': 'guid',
                                    'purchaseTime': 'datetime',
                                    'purchaseNumber': 'id',
                                    'purchasePrice': 'money',
                                    'provider': 'value',
                                    'providerPhone': 'mobile',
                                    'auditState': 'rule,0,1,2'
                                },
                                mapmin: 5,
                                mapmax: 10,
                                type: 'list'
                            })/*测试请求*/;


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
                                    warehouseService.loginOut();
                                }
                                return [];
                            }
                            var result = json.result;
                            if (typeof result === 'undefined') {
                                /*重置分页*/
                                self.table.list_page1.total = 0;
                                self.table.list_page1.page = 1;
                                jq_dom.$admin_page_wrap1.pagination({
                                    pageNumber: self.table.list_page1.page,
                                    pageSize: self.table.list_page1.pageSize,
                                    total: self.table.list_page1.total
                                });
                                return [];
                            }

                            if (result) {
                                /*设置分页*/
                                self.table.list_page1.total = result.count;
                                /*分页调用*/
                                jq_dom.$admin_page_wrap1.pagination({
                                    pageNumber: self.table.list_page1.page,
                                    pageSize: self.table.list_page1.pageSize,
                                    total: self.table.list_page1.total,
                                    onSelectPage: function (pageNumber, pageSize) {
                                        /*再次查询*/
                                        var temp_param = self.table.list_config1.config.ajax.data;
                                        self.table.list_page1.page = pageNumber;
                                        self.table.list_page1.pageSize = pageSize;
                                        temp_param['page'] = self.table.list_page1.page;
                                        temp_param['pageSize'] = self.table.list_page1.pageSize;
                                        self.table.list_config1.config.ajax.data = temp_param;
                                        warehouseService.getColumnData(self.table, self.record);
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
                                self.table.list_page1.total = 0;
                                self.table.list_page1.page = 1;
                                jq_dom.$admin_page_wrap1.pagination({
                                    pageNumber: self.table.list_page1.page,
                                    pageSize: self.table.list_page1.pageSize,
                                    total: self.table.list_page1.total
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
                    order: [[0, "desc"], [1, "desc"]],
                    columns: [
                        {
                            "data": "purchaseId"
                        },
                        {
                            "data": "purchaseTime"
                        },
                        {
                            "data": "purchaseNumber"
                        },
                        {
                            "data": "purchasePrice",
                            "render": function (data, type, full, meta) {
                                return toolUtil.moneyCorrect(data, 15, false)[0];
                            }
                        },
                        {
                            "data": "provider"
                        },
                        {
                            "data": "providerPhone",
                            "render": function (data, type, full, meta) {
                                return toolUtil.phoneFormat(data);
                            }
                        },

                        {
                            "data": "auditState",
                            "render": function (data, type, full, meta) {
                                var stauts = parseInt(data, 10),
                                    statusmap = {
                                        0: "待审核",
                                        1: "已审核",
                                        2: "审核失败"
                                    },
                                    str;

                                if (stauts === 0) {
                                    str = '<div class="g-c-gray9">' + statusmap[stauts] + '</div>';
                                } else if (stauts === 1) {
                                    str = '<div class="g-c-green1">' + statusmap[stauts] + '</div>';
                                } else if (stauts === 2) {
                                    str = '<div class="g-c-red1">' + statusmap[stauts] + '</div>';
                                } else {
                                    str = '<div class="g-c-gray6">其他</div>';
                                }
                                return str;
                            }
                        },
                        {
                            /*to do*/
                            "data": "id",
                            "render": function (data, type, full, meta) {
                                var btns = '';

                                /*查看订单*/
                                if (self.powerlist.purchase_details) {
                                    btns += '<span data-action="detail" data-id="' + data + '"  class="btn-operate">查看</span>';
                                    if (parseInt(full.auditState, 10) === 1) {
                                        btns += '<span data-action="receive" data-id="' + data + '"  class="btn-operate">收货</span>';
                                    }
                                }
                                return btns;
                            }
                        }
                    ]
                }
            },
            /*入库*/
            list_config2: {
                config: {
                    processing: true, /*大消耗操作时是否显示处理状态*/
                    deferRender: true, /*是否延迟加载数据*/
                    autoWidth: true, /*是否*/
                    paging: false,
                    ajax: {
                        url: /*toolUtil.adaptReqUrl('/organization/invoice/list')*/'json/test.json'/*测试地址*/,
                        dataType: 'JSON',
                        method: 'post',
                        dataSrc: function (json) {
                            var json = testService.test({
                                map: {
                                    'id': 'guid',
                                    'purchaseId': 'guid',
                                    'purchaseTime': 'datetime',
                                    'purchaseNumber': 'id',
                                    'purchasePrice': 'money',
                                    'provider': 'value',
                                    'providerPhone': 'mobile',
                                    'auditState': 'rule,0,1,2'
                                },
                                mapmin: 5,
                                mapmax: 10,
                                type: 'list'
                            })/*测试请求*/;


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
                                    warehouseService.loginOut();
                                }
                                return [];
                            }
                            var result = json.result;
                            if (typeof result === 'undefined') {
                                /*重置分页*/
                                self.table.list_page2.total = 0;
                                self.table.list_page2.page = 1;
                                jq_dom.$admin_page_wrap2.pagination({
                                    pageNumber: self.table.list_page2.page,
                                    pageSize: self.table.list_page2.pageSize,
                                    total: self.table.list_page2.total
                                });
                                return [];
                            }

                            if (result) {
                                /*设置分页*/
                                self.table.list_page2.total = result.count;
                                /*分页调用*/
                                jq_dom.$admin_page_wrap2.pagination({
                                    pageNumber: self.table.list_page2.page,
                                    pageSize: self.table.list_page2.pageSize,
                                    total: self.table.list_page2.total,
                                    onSelectPage: function (pageNumber, pageSize) {
                                        /*再次查询*/
                                        var temp_param = self.table.list_config2.config.ajax.data;
                                        self.table.list_page2.page = pageNumber;
                                        self.table.list_page2.pageSize = pageSize;
                                        temp_param['page'] = self.table.list_page2.page;
                                        temp_param['pageSize'] = self.table.list_page2.pageSize;
                                        self.table.list_config2.config.ajax.data = temp_param;
                                        warehouseService.getColumnData(self.table, self.record);
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
                                self.table.list_page2.total = 0;
                                self.table.list_page2.page = 1;
                                jq_dom.$admin_page_wrap2.pagination({
                                    pageNumber: self.table.list_page2.page,
                                    pageSize: self.table.list_page2.pageSize,
                                    total: self.table.list_page2.total
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
                    order: [[1, "desc"], [2, "desc"]],
                    columns: [
                        {
                            "data": "id",
                            "orderable": false,
                            "searchable": false,
                            "render": function (data, type, full, meta) {
                                var state = parseInt(full.auditState, 10);
                                return state === 1 ? '' : '<input value="' + data + '" name="check_purchaseid" type="checkbox" />';
                            }
                        },
                        {
                            "data": "purchaseId"
                        },
                        {
                            "data": "purchaseTime"
                        },
                        {
                            "data": "purchaseNumber"
                        },
                        {
                            "data": "purchasePrice",
                            "render": function (data, type, full, meta) {
                                return toolUtil.moneyCorrect(data, 15, false)[0];
                            }
                        },
                        {
                            "data": "provider"
                        },
                        {
                            "data": "providerPhone",
                            "render": function (data, type, full, meta) {
                                return toolUtil.phoneFormat(data);
                            }
                        },

                        {
                            "data": "auditState",
                            "render": function (data, type, full, meta) {
                                var stauts = parseInt(data, 10),
                                    statusmap = {
                                        0: "待审核",
                                        1: "已审核",
                                        2: "审核失败"
                                    },
                                    str;

                                if (stauts === 0) {
                                    str = '<div class="g-c-gray9">' + statusmap[stauts] + '</div>';
                                } else if (stauts === 1) {
                                    str = '<div class="g-c-green1">' + statusmap[stauts] + '</div>';
                                } else if (stauts === 2) {
                                    str = '<div class="g-c-red1">' + statusmap[stauts] + '</div>';
                                } else {
                                    str = '<div class="g-c-gray6">其他</div>';
                                }
                                return str;
                            }
                        },
                        {
                            /*to do*/
                            "data": "id",
                            "render": function (data, type, full, meta) {
                                var btns = '';

                                /*查看订单*/
                                if (self.powerlist.purchase_audit && parseInt(full.auditState, 10) !== 1) {
                                    btns += '<span data-action="audit" data-id="' + data + '"  class="btn-operate">审核</span>';
                                }
                                return btns;
                            }
                        }
                    ]
                }
            },
            /*出库*/
            list_config3: {
                config: {
                    processing: true, /*大消耗操作时是否显示处理状态*/
                    deferRender: true, /*是否延迟加载数据*/
                    autoWidth: true, /*是否*/
                    paging: false,
                    ajax: {
                        url: /*toolUtil.adaptReqUrl('/organization/invoice/list')*/'json/test.json'/*测试地址*/,
                        dataType: 'JSON',
                        method: 'post',
                        dataSrc: function (json) {
                            var json = testService.test({
                                map: {
                                    'id': 'guid',
                                    'purchaseId': 'guid',
                                    'purchaseTime': 'datetime',
                                    'purchaseNumber': 'id',
                                    'purchasePrice': 'money',
                                    'provider': 'value',
                                    'providerPhone': 'mobile',
                                    'auditState': 'rule,0,1,2'
                                },
                                mapmin: 5,
                                mapmax: 10,
                                type: 'list'
                            })/*测试请求*/;


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
                                    warehouseService.loginOut();
                                }
                                return [];
                            }
                            var result = json.result;
                            if (typeof result === 'undefined') {
                                /*重置分页*/
                                self.table.list_page2.total = 0;
                                self.table.list_page2.page = 1;
                                jq_dom.$admin_page_wrap2.pagination({
                                    pageNumber: self.table.list_page2.page,
                                    pageSize: self.table.list_page2.pageSize,
                                    total: self.table.list_page2.total
                                });
                                return [];
                            }

                            if (result) {
                                /*设置分页*/
                                self.table.list_page2.total = result.count;
                                /*分页调用*/
                                jq_dom.$admin_page_wrap2.pagination({
                                    pageNumber: self.table.list_page2.page,
                                    pageSize: self.table.list_page2.pageSize,
                                    total: self.table.list_page2.total,
                                    onSelectPage: function (pageNumber, pageSize) {
                                        /*再次查询*/
                                        var temp_param = self.table.list_config2.config.ajax.data;
                                        self.table.list_page2.page = pageNumber;
                                        self.table.list_page2.pageSize = pageSize;
                                        temp_param['page'] = self.table.list_page2.page;
                                        temp_param['pageSize'] = self.table.list_page2.pageSize;
                                        self.table.list_config2.config.ajax.data = temp_param;
                                        warehouseService.getColumnData(self.table, self.record);
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
                                self.table.list_page2.total = 0;
                                self.table.list_page2.page = 1;
                                jq_dom.$admin_page_wrap2.pagination({
                                    pageNumber: self.table.list_page2.page,
                                    pageSize: self.table.list_page2.pageSize,
                                    total: self.table.list_page2.total
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
                    order: [[1, "desc"], [2, "desc"]],
                    columns: [
                        {
                            "data": "id",
                            "orderable": false,
                            "searchable": false,
                            "render": function (data, type, full, meta) {
                                var state = parseInt(full.auditState, 10);
                                return state === 1 ? '' : '<input value="' + data + '" name="check_purchaseid" type="checkbox" />';
                            }
                        },
                        {
                            "data": "purchaseId"
                        },
                        {
                            "data": "purchaseTime"
                        },
                        {
                            "data": "purchaseNumber"
                        },
                        {
                            "data": "purchasePrice",
                            "render": function (data, type, full, meta) {
                                return toolUtil.moneyCorrect(data, 15, false)[0];
                            }
                        },
                        {
                            "data": "provider"
                        },
                        {
                            "data": "providerPhone",
                            "render": function (data, type, full, meta) {
                                return toolUtil.phoneFormat(data);
                            }
                        },

                        {
                            "data": "auditState",
                            "render": function (data, type, full, meta) {
                                var stauts = parseInt(data, 10),
                                    statusmap = {
                                        0: "待审核",
                                        1: "已审核",
                                        2: "审核失败"
                                    },
                                    str;

                                if (stauts === 0) {
                                    str = '<div class="g-c-gray9">' + statusmap[stauts] + '</div>';
                                } else if (stauts === 1) {
                                    str = '<div class="g-c-green1">' + statusmap[stauts] + '</div>';
                                } else if (stauts === 2) {
                                    str = '<div class="g-c-red1">' + statusmap[stauts] + '</div>';
                                } else {
                                    str = '<div class="g-c-gray6">其他</div>';
                                }
                                return str;
                            }
                        },
                        {
                            /*to do*/
                            "data": "id",
                            "render": function (data, type, full, meta) {
                                var btns = '';

                                /*查看订单*/
                                if (self.powerlist.purchase_audit && parseInt(full.auditState, 10) !== 1) {
                                    btns += '<span data-action="audit" data-id="' + data + '"  class="btn-operate">审核</span>';
                                }
                                return btns;
                            }
                        }
                    ]
                }
            },
            /*盘点*/
            list_config4: {
                config: {
                    processing: true, /*大消耗操作时是否显示处理状态*/
                    deferRender: true, /*是否延迟加载数据*/
                    autoWidth: true, /*是否*/
                    paging: false,
                    ajax: {
                        url: /*toolUtil.adaptReqUrl('/organization/invoice/list')*/'json/test.json'/*测试地址*/,
                        dataType: 'JSON',
                        method: 'post',
                        dataSrc: function (json) {
                            var json = testService.test({
                                map: {
                                    'id': 'guid',
                                    'purchaseId': 'guid',
                                    'purchaseTime': 'datetime',
                                    'purchaseNumber': 'id',
                                    'purchasePrice': 'money',
                                    'provider': 'value',
                                    'providerPhone': 'mobile',
                                    'auditState': 'rule,0,1,2'
                                },
                                mapmin: 5,
                                mapmax: 10,
                                type: 'list'
                            })/*测试请求*/;


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
                                    warehouseService.loginOut();
                                }
                                return [];
                            }
                            var result = json.result;
                            if (typeof result === 'undefined') {
                                /*重置分页*/
                                self.table.list_page2.total = 0;
                                self.table.list_page2.page = 1;
                                jq_dom.$admin_page_wrap2.pagination({
                                    pageNumber: self.table.list_page2.page,
                                    pageSize: self.table.list_page2.pageSize,
                                    total: self.table.list_page2.total
                                });
                                return [];
                            }

                            if (result) {
                                /*设置分页*/
                                self.table.list_page2.total = result.count;
                                /*分页调用*/
                                jq_dom.$admin_page_wrap2.pagination({
                                    pageNumber: self.table.list_page2.page,
                                    pageSize: self.table.list_page2.pageSize,
                                    total: self.table.list_page2.total,
                                    onSelectPage: function (pageNumber, pageSize) {
                                        /*再次查询*/
                                        var temp_param = self.table.list_config2.config.ajax.data;
                                        self.table.list_page2.page = pageNumber;
                                        self.table.list_page2.pageSize = pageSize;
                                        temp_param['page'] = self.table.list_page2.page;
                                        temp_param['pageSize'] = self.table.list_page2.pageSize;
                                        self.table.list_config2.config.ajax.data = temp_param;
                                        warehouseService.getColumnData(self.table, self.record);
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
                                self.table.list_page2.total = 0;
                                self.table.list_page2.page = 1;
                                jq_dom.$admin_page_wrap2.pagination({
                                    pageNumber: self.table.list_page2.page,
                                    pageSize: self.table.list_page2.pageSize,
                                    total: self.table.list_page2.total
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
                    order: [[1, "desc"], [2, "desc"]],
                    columns: [
                        {
                            "data": "id",
                            "orderable": false,
                            "searchable": false,
                            "render": function (data, type, full, meta) {
                                var state = parseInt(full.auditState, 10);
                                return state === 1 ? '' : '<input value="' + data + '" name="check_purchaseid" type="checkbox" />';
                            }
                        },
                        {
                            "data": "purchaseId"
                        },
                        {
                            "data": "purchaseTime"
                        },
                        {
                            "data": "purchaseNumber"
                        },
                        {
                            "data": "purchasePrice",
                            "render": function (data, type, full, meta) {
                                return toolUtil.moneyCorrect(data, 15, false)[0];
                            }
                        },
                        {
                            "data": "provider"
                        },
                        {
                            "data": "providerPhone",
                            "render": function (data, type, full, meta) {
                                return toolUtil.phoneFormat(data);
                            }
                        },

                        {
                            "data": "auditState",
                            "render": function (data, type, full, meta) {
                                var stauts = parseInt(data, 10),
                                    statusmap = {
                                        0: "待审核",
                                        1: "已审核",
                                        2: "审核失败"
                                    },
                                    str;

                                if (stauts === 0) {
                                    str = '<div class="g-c-gray9">' + statusmap[stauts] + '</div>';
                                } else if (stauts === 1) {
                                    str = '<div class="g-c-green1">' + statusmap[stauts] + '</div>';
                                } else if (stauts === 2) {
                                    str = '<div class="g-c-red1">' + statusmap[stauts] + '</div>';
                                } else {
                                    str = '<div class="g-c-gray6">其他</div>';
                                }
                                return str;
                            }
                        },
                        {
                            /*to do*/
                            "data": "id",
                            "render": function (data, type, full, meta) {
                                var btns = '';

                                /*查看订单*/
                                if (self.powerlist.purchase_audit && parseInt(full.auditState, 10) !== 1) {
                                    btns += '<span data-action="audit" data-id="' + data + '"  class="btn-operate">审核</span>';
                                }
                                return btns;
                            }
                        }
                    ]
                }
            },
            /*表格缓存*/
            list_table1: null,
            list_table2: null,
            list_table3: null,
            list_table4: null,
            /*列控制*/
            tablecolumn1: {
                init_len: 8/*数据有多少列*/,
                column_flag: true,
                ischeck: false, /*是否有全选*/
                columnshow: true,
                $column_wrap: jq_dom.$admin_table_checkcolumn1/*控制列显示隐藏的容器*/,
                $bodywrap: jq_dom.$admin_batchlist_wrap1/*数据展现容器*/,
                hide_list: [2, 3, 5]/*需要隐藏的的列序号*/,
                hide_len: 3,
                column_api: {
                    isEmpty: function () {
                        if (self.table.list_table1 === null) {
                            return true;
                        }
                        return self.table.list_table1.data().length === 0;
                    }
                },
                $colgroup: jq_dom.$admin_list_colgroup1/*分组模型*/,
                $column_btn: jq_dom.$admin_table_checkcolumn1.prev(),
                $column_ul: jq_dom.$admin_table_checkcolumn1.find('ul')
            },
            tablecolumn2: {
                init_len: 9/*数据有多少列*/,
                column_flag: true,
                ischeck: true, /*是否有全选*/
                columnshow: true,
                $column_wrap: jq_dom.$admin_table_checkcolumn2/*控制列显示隐藏的容器*/,
                $bodywrap: jq_dom.$admin_batchlist_wrap2/*数据展现容器*/,
                hide_list: [3, 4, 5, 6]/*需要隐藏的的列序号*/,
                hide_len: 4,
                column_api: {
                    isEmpty: function () {
                        if (self.table.list_table2 === null) {
                            return true;
                        }
                        return self.table.list_table2.data().length === 0;
                    }
                },
                $colgroup: jq_dom.$admin_list_colgroup2/*分组模型*/,
                $column_btn: jq_dom.$admin_table_checkcolumn2.prev(),
                $column_ul: jq_dom.$admin_table_checkcolumn2.find('ul')
            },
            tablecolumn3: {
                init_len: 8/*数据有多少列*/,
                column_flag: true,
                ischeck: false, /*是否有全选*/
                columnshow: true,
                $column_wrap: jq_dom.$admin_table_checkcolumn3/*控制列显示隐藏的容器*/,
                $bodywrap: jq_dom.$admin_batchlist_wrap3/*数据展现容器*/,
                hide_list: [2, 3, 5]/*需要隐藏的的列序号*/,
                hide_len: 3,
                column_api: {
                    isEmpty: function () {
                        if (self.table.list_table3 === null) {
                            return true;
                        }
                        return self.table.list_table3.data().length === 0;
                    }
                },
                $colgroup: jq_dom.$admin_list_colgroup3/*分组模型*/,
                $column_btn: jq_dom.$admin_table_checkcolumn3.prev(),
                $column_ul: jq_dom.$admin_table_checkcolumn3.find('ul')
            },
            tablecolumn4: {
                init_len: 8/*数据有多少列*/,
                column_flag: true,
                ischeck: false, /*是否有全选*/
                columnshow: true,
                $column_wrap: jq_dom.$admin_table_checkcolumn4/*控制列显示隐藏的容器*/,
                $bodywrap: jq_dom.$admin_batchlist_wrap4/*数据展现容器*/,
                hide_list: [2, 3, 5]/*需要隐藏的的列序号*/,
                hide_len: 3,
                column_api: {
                    isEmpty: function () {
                        if (self.table.list_table4 === null) {
                            return true;
                        }
                        return self.table.list_table4.data().length === 0;
                    }
                },
                $colgroup: jq_dom.$admin_list_colgroup4/*分组模型*/,
                $column_btn: jq_dom.$admin_table_checkcolumn4.prev(),
                $column_ul: jq_dom.$admin_table_checkcolumn4.find('ul')
            },
            /*按钮*/
            tableitemaction1: {
                $bodywrap: jq_dom.$admin_batchlist_wrap1,
                itemaction_api: {
                    doItemAction: function (config) {
                        warehouseService.doItemAction({
                            record: self.record,
                            table: self.table
                        }, config);
                    }
                }
            },
            tableitemaction2: {
                $bodywrap: jq_dom.$admin_batchlist_wrap2,
                itemaction_api: {
                    doItemAction: function (config) {
                        warehouseService.doItemAction({
                            record: self.record,
                            table: self.table,
                            audit: self.audit
                        }, config);
                    }
                }
            },
            tableitemaction3: {
                $bodywrap: jq_dom.$admin_batchlist_wrap3,
                itemaction_api: {
                    doItemAction: function (config) {
                        warehouseService.doItemAction({
                            record: self.record,
                            table: self.table
                        }, config);
                    }
                }
            },
            tableitemaction4: {
                $bodywrap: jq_dom.$admin_batchlist_wrap3,
                itemaction_api: {
                    doItemAction: function (config) {
                        warehouseService.doItemAction({
                            record: self.record,
                            table: self.table
                        }, config);
                    }
                }
            },
            /*全选*/
            tablecheckall1: {
                checkall_flag: true,
                $bodywrap: jq_dom.$admin_batchlist_wrap1,
                $checkall: jq_dom.$admin_kucun_checkall1,
                checkfn: function (flag) {
                    $scope.$apply(function () {
                        if (flag === 0) {
                            /*普通模式*/
                            self.audit.type = 'base';
                            self.audit.batchflag = false;
                            self.audit.isdata = '';
                        } else if (flag === 1) {
                            /*批量模式*/
                            self.audit.type = 'batch';
                            self.audit.batchflag = true;
                            self.audit.isdata = 'ok';
                        }
                    });
                },
                checkvalue: 0/*默认未选中*/,
                checkid: []/*默认索引数据为空*/,
                checkitem: []/*默认node数据为空*/,
                highactive: 'item-lightenbatch',
                checkactive: 'admin-batchitem-checkactive'
            }
        };


        /*初始化服务--虚拟挂载点，或者初始化参数*/
        warehouseService.getRoot(self.record);
        /*初始化服务--日历查询*/
        warehouseService.datePicker(self.record);


        /*菜单服务--初始化菜单*/
        this.initSubMenu = function () {
            warehouseService.getSubMenu({
                table: self.table,
                record: self.record
            });
        };
        /*菜单服务--显示隐藏菜单*/
        this.toggleSubMenu = function (e) {
            warehouseService.toggleSubMenu(e, {
                table: self.table,
                record: self.record
            });
        };


        /*条件服务--切换条件主题*/
        this.toggleTheme = function (type) {
            /*计算区域并执行相关操作*/
            warehouseService.toggleTheme({
                record: self.record,
                table: self.table,
                type: type
            });
        };


        /*收货服务--确认收货*/
        this.sureReceive=function () {
           warehouseService.sureReceive({
               record:self.record,
               table:self.table
           });
        };


        /*审核服务--操作审核*/
        this.queryAudit = function () {
            warehouseService.queryAudit({
                table: self.table,
                record: self.record,
                audit: self.audit
            }, {
                type: 'batch'
            });
        };
        /*审核服务--操作审核*/
        this.actionAudit = function ($event) {
            warehouseService.actionAudit($event, {
                table: self.table,
                record: self.record,
                audit: self.audit,
                fn: function () {
                    $scope.$apply(function () {
                        self.audit.type = 'base';
                        self.audit.batchflag = false;
                        self.audit.isdata = '';
                    });
                }
            });
        };
        /*审核服务--关闭弹出*/
        this.closeEditAudit = function () {
            warehouseService.closeEditAudit({
                audit:self.audit
            });
        };
        /*审核服务--确定修改*/
        this.sureEditAudit=function () {
            warehouseService.sureEditAudit({
                audit:self.audit
            });
        };
        /*审核服务--提交审核*/
        this.submitAudit=function () {
            warehouseService.submitAudit({
                audit:self.audit,
                record:self.record,
                table:self.table
            });
        };


        /*数据服务--过滤数据*/
        this.filterDataTable = function () {
            warehouseService.filterDataTable(self.table, self.record);
        };


        /*查询审核数据*/
        this.queryAudit = function () {
            warehouseService.queryAudit({
                record: self.record,
                table: self.table
            }, {
                type: 'batch'
            });
        };


        /*查询采购单*/
        this.queryPurchase = function () {
            warehouseService.getColumnData(self.table, self.record);
        };


        /*弹出层显示隐藏*/
        this.toggleModal = function (config) {
            warehouseService.toggleModal(config);
        };


    }]);