/*首页控制器*/
angular.module('app')
    .controller('EquityController', ['equityService', 'toolUtil', function (equityService, toolUtil) {
        var self = this;

        /*模型--操作权限列表*/
        this.powerlist = equityService.getCurrentPower();


        /*jquery dom缓存:主要是切换路由时，创建的dom缓存引用与现有的dom引用不一致，需要加载视图更新现有dom引用*/
        var jq_dom = {
            $admin_equity_dialog: $('#admin_equity_dialog'),
            $admin_equity_reset: $('#admin_equity_reset'),
            $admin_equity_submenu: $('#admin_equity_submenu'),
            $admin_table_checkcolumn: $('#admin_table_checkcolumn'),
            $admin_page_wrap: $('#admin_page_wrap'),
            $admin_list_wrap: $('#admin_list_wrap'),
            $admin_list_colgroup: $('#admin_list_colgroup'),
            $admin_batchlist_wrap: $('#admin_batchlist_wrap'),
            $admin_imei_list: $('#admin_imei_list'),
            $admin_equitydetail_dialog: $('#admin_equitydetail_dialog'),
            $admin_equitydetail_show: $('#admin_equitydetail_show')
        };
        /*切换路由时更新dom缓存*/
        equityService.initJQDom(jq_dom);


        /*模型--操作记录*/
        this.record = {
            filter: '',
            currentId: ''/*根索引*/,
            currentName: '',
            organizationId: ''/*操作索引*/,
            organizationName: '',
            prev: null/*菜单操作:上一次操作菜单*/,
            current: null/*菜单操作:当前操作菜单*/
        };


        /*模型--表格缓存*/
        this.table = {
            list1_page: {
                page: 1,
                pageSize: 20,
                total: 0
            },
            list1_config: {
                config: {
                    processing: true, /*大消耗操作时是否显示处理状态*/
                    deferRender: true, /*是否延迟加载数据*/
                    autoWidth: true, /*是否*/
                    paging: false,
                    ajax: {
                        url: /*toolUtil.adaptReqUrl('/device/delivery/list')*/'json/test.json'/*测试地址*/,
                        dataType: 'JSON',
                        method: 'post',
                        dataSrc: function (json) {
                            /*测试代码*/
                            var json = equityService.testGetEquipmentList();

                            var code = parseInt(json.code, 10),
                                message = json.message;

                            if (code !== 0) {
                                if (typeof message !== 'undefined' && message !== '') {
                                    console.log(message);
                                } else {
                                    console.log('获取用户失败');
                                }
                                if (code === 999) {
                                    /*退出系统*/
                                    toolUtil.loginTips({
                                        clear: true,
                                        reload: true
                                    });
                                }
                                return [];
                            }
                            var result = json.result;
                            if (typeof result === 'undefined') {
                                /*重置分页*/
                                self.table.list1_page.total = 0;
                                self.table.list1_page.page = 1;
                                jq_dom.$admin_page_wrap.pagination({
                                    pageNumber: self.table.list1_page.page,
                                    pageSize: self.table.list1_page.pageSize,
                                    total: self.table.list1_page.total
                                });
                                return [];
                            }

                            if (result) {
                                /*设置分页*/
                                self.table.list1_page.total = result.count;
                                /*分页调用*/
                                jq_dom.$admin_page_wrap.pagination({
                                    pageNumber: self.table.list1_page.page,
                                    pageSize: self.table.list1_page.pageSize,
                                    total: self.table.list1_page.total,
                                    onSelectPage: function (pageNumber, pageSize) {
                                        /*再次查询*/
                                        var temp_param = self.table.list1_config.config.ajax.data;
                                        self.table.list1_page.page = pageNumber;
                                        self.table.list1_page.pageSize = pageSize;
                                        temp_param['page'] = self.table.list1_page.page;
                                        temp_param['pageSize'] = self.table.list1_page.pageSize;
                                        self.table.list1_config.config.ajax.data = temp_param;
                                        equityService.getColumnData(self.table, self.record.role);
                                    }
                                });

                                var list = result.list;
                                if (list) {
                                    var vi = 0,
                                        vlen = list.length;
                                    for (vi; vi < vlen; vi++) {
                                        if (!list[vi] || list[vi] === null) {
                                            return [];
                                        }
                                    }
                                    return list;
                                } else {
                                    return [];
                                }
                            } else {
                                /*重置分页*/
                                self.table.list1_page.total = 0;
                                self.table.list1_page.page = 1;
                                jq_dom.$admin_page_wrap.pagination({
                                    pageNumber: self.table.list1_page.page,
                                    pageSize: self.table.list1_page.pageSize,
                                    total: self.table.list1_page.total
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
                    order: [[0, "desc"], [1, "desc"]],
                    columns: [
                        {
                            "data": "consigneeName"
                        },
                        {
                            "data": "logistics"
                        },
                        {
                            "data": "deliveryQuantity"
                        },
                        {
                            "data": "status",
                            "render": function (data, type, full, meta) {
                                var stauts = parseInt(data, 10),
                                    statusmap = {
                                        0: "正常",
                                        1: "已用"
                                    };
                                return '<div class="g-c-blue3">' + statusmap[stauts] + '</div>';
                            }
                        },
                        {
                            "data": "addTime"
                        },
                        {
                            "data": "deviceType",
                            "render": function (data, type, full, meta) {
                                var stauts = parseInt(data, 10),
                                    statusmap = {
                                        1: "S67",
                                        2: "T6",
                                        3: "其他"
                                    };
                                return '<div class="g-c-blue3">' + statusmap[stauts] + '</div>';
                            }
                        },
                        {
                            /*to do*/
                            "data": "id",
                            "render": function (data, type, full, meta) {
                                var btns = '';

                                /*查看发货详情*/
                                if (self.powerlist.delivery_add) {
                                    btns += '<span data-action="detail" data-id="' + data + '"  class="btn-operate">查看</span>';
                                }
                                return btns;
                            }
                        }
                    ]
                }
            },
            list_table: null,
            /*列控制*/
            tablecolumn: {
                init_len: 7/*数据有多少列*/,
                column_flag: true,
                ischeck: false, /*是否有全选*/
                columnshow: true,
                $column_wrap: jq_dom.$admin_table_checkcolumn/*控制列显示隐藏的容器*/,
                $bodywrap: jq_dom.$admin_batchlist_wrap/*数据展现容器*/,
                hide_list: [4, 5]/*需要隐藏的的列序号*/,
                hide_len: 2,
                column_api: {
                    isEmpty: function () {
                        if (self.table.list_table === null) {
                            return true;
                        }
                        return self.table.list_table.data().length === 0;
                    }
                },
                $colgroup: jq_dom.$admin_list_colgroup/*分组模型*/,
                $column_btn: jq_dom.$admin_table_checkcolumn.prev(),
                $column_ul: jq_dom.$admin_table_checkcolumn.find('ul')
            },
            /*按钮*/
            tableitemaction: {
                $bodywrap: jq_dom.$admin_batchlist_wrap,
                itemaction_api: {
                    doItemAction: function (config) {
                        equityService.doItemAction({
                            record: self.record,
                            table: self.table
                        }, config);
                    }
                }
            }
        };


        /*模型--添加,编辑股权投资人*/
        this.equity = {
            type: 'add'/*操作投资人类型*/,
            id: ''/*投资人ID,编辑时相关参数*/,
            fullName: ''/*投资人名称*/,
            cellphone: ''/*手机号码*/,
            province: ''/*省份*/,
            city: ''/*市区*/,
            country: ''/*县区*/,
            address: ''/*详细地址*/,
            investmentAmount: ''/*投资额*/,
            investmentTime: ''/*投资时间*/,
            expirationTime: ''/*到期时间*/,
            contractNo: ''/*合同编号*/,
            remark: ''/*备注*/
        };


        /*初始化服务--虚拟挂载点，或者初始化参数*/
        equityService.getRoot(self.record);


        /*菜单服务--初始化*/
        this.initSubMenu = function () {
            equityService.getSubMenu({
                table: self.table,
                record: self.record
            });
        };
        /*菜单服务--显示隐藏菜单*/
        this.toggleSubMenu = function (e) {
            equityService.toggleSubMenu(e, {
                table: self.table,
                record: self.record
            });
        };


        /*弹出层显示隐藏*/
        this.toggleModal = function (config) {
            equityService.toggleModal(config);
        };


        /*成员服务--过滤数据*/
        this.filterDataTable = function () {
            equityService.filterDataTable(self.table, self.record);
        };


        /*查询发货*/
        this.queryEquipment = function () {
            equityService.getColumnData(self.table, self.record);
        };

        /*IMEI服务--获取IMEI*/
        this.getIMEI = function () {
            equityService.getIMEI(self.equity);
        };
        /*IMEI服务--清除IMEI*/
        this.clearIMEI = function () {
            equityService.clearIMEI(self.equity);
        };


        /*表单服务--提交表单*/
        this.formSubmit = function (type) {
            equityService.formSubmit({
                table: self.table,
                record: self.record,
                equity: self.equity
            }, type);
        };
        /*表单服务--重置表单*/
        this.formReset = function (forms, type) {
            /*重置表单模型*/
            equityService.formReset({
                forms: forms,
                equity: self.equity
            }, type);
        };


    }]);