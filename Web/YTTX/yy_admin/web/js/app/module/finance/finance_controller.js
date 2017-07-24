/*首页控制器*/
angular.module('app')
    .controller('FinanceController', ['financeService', 'toolUtil', '$scope', function (financeService, toolUtil, $scope) {
        var self = this;

        /*模型--操作权限列表*/
        this.powerlist = financeService.getCurrentPower();


        /*jquery dom缓存:主要是切换路由时，创建的dom缓存引用与现有的dom引用不一致，需要加载视图更新现有dom引用*/
        var jq_dom = {
            /*查询区域*/
            $search_date:$('#search_date'),
            /*弹出层，表单*/
            $admin_orderdetail_dialog: $('#admin_orderdetail_dialog'),
            $admin_orderdetail_show: $('#admin_orderdetail_show'),
            $admin_bonus_dialog: $('#admin_bonus_dialog'),
            $admin_bonus_reset: $('#admin_bonus_reset'),
            $admin_bonusdetail_dialog: $('#admin_bonusdetail_dialog'),
            $admin_bonusdetail_show: $('#admin_bonusdetail_show'),
            $bonus_exrightdate: $('#bonus_exrightdate'),
            $bonus_exdividenddate: $('#bonus_exdividenddate'),
            $bonus_bonusdate: $('#bonus_bonusdate'),
            /*菜单*/
            $submenu_scroll_wrap:$('#submenu_scroll_wrap'),
            $admin_finance_submenu: $('#admin_finance_submenu'),
            /*分组控制*/
            $admin_table_checkcolumn1: $('#admin_table_checkcolumn1'),
            $admin_table_checkcolumn2: $('#admin_table_checkcolumn2'),
            $admin_table_checkcolumn3: $('#admin_table_checkcolumn3'),
            $admin_table_checkcolumn4:''/*扩展--当月清算*/,
            $admin_table_checkcolumn5:''/*扩展--历史清算*/,
            $admin_table_checkcolumn6:''/*扩展--各运营商清算*/,
            $admin_table_checkcolumn7: $('#admin_table_checkcolumn7'),
            /*分页*/
            $admin_page_wrap1: $('#admin_page_wrap1'),
            $admin_page_wrap2: $('#admin_page_wrap2'),
            $admin_page_wrap3: $('#admin_page_wrap3'),
            $admin_page_wrap4:''/*扩展--当月清算*/,
            $admin_page_wrap5:''/*扩展--历史清算*/,
            $admin_page_wrap6:''/*扩展--各运营商清算*/,
            $admin_page_wrap7: $('#admin_page_wrap7'),
            /*列表*/
            $admin_list_wrap1: $('#admin_list_wrap1'),
            $admin_list_wrap2: $('#admin_list_wrap2'),
            $admin_list_wrap3: $('#admin_list_wrap3'),
            $admin_list_wrap4:''/*扩展--当月清算*/,
            $admin_list_wrap5:''/*扩展--历史清算*/,
            $admin_list_wrap6:''/*扩展--各运营商清算*/,
            $admin_list_wrap7: $('#admin_list_wrap7'),
            /*分组*/
            $admin_list_colgroup1: $('#admin_list_colgroup1'),
            $admin_list_colgroup2: $('#admin_list_colgroup2'),
            $admin_list_colgroup3: $('#admin_list_colgroup3'),
            $admin_list_colgroup4:''/*扩展--当月清算*/,
            $admin_list_colgroup5:''/*扩展--历史清算*/,
            $admin_list_colgroup6:''/*扩展--各运营商清算*/,
            $admin_list_colgroup7: $('#admin_list_colgroup7'),
            /*表主体操作区*/
            $admin_batchlist_wrap1: $('#admin_batchlist_wrap1'),
            $admin_batchlist_wrap2: $('#admin_batchlist_wrap2'),
            $admin_batchlist_wrap3: $('#admin_batchlist_wrap3'),
            $admin_batchlist_wrap4: ''/*扩展--当月清算*/,
            $admin_batchlist_wrap5: ''/*扩展--历史清算*/,
            $admin_batchlist_wrap6: ''/*扩展--各运营商清算*/,
            $admin_batchlist_wrap7: $('#admin_batchlist_wrap7')
            /*全选操作*/
            /*$admin_finance_checkall1: $('#admin_finance_checkall1')*/
        };
        /*切换路由时更新dom缓存*/
        financeService.initJQDom(jq_dom);


        /*模型--操作记录*/
        this.record = {
            iscroll_flag:true/*是否开启滚动条调用*/,
            theme: 'profit'/*查询的模块或主题(分润，清算,除息分红)：profit,clear,bouns*/,
            tab: 'current'/*查询的选项类型(当月，历史，各运营商)：current,history,organization*/,
            action: 1/*查询的视图区域，最终根据主题theme,选项tab，两者叠加产生*/,
            searchWord: ''/*搜索字段*/,
            searchDate: ''/*查询年月日*/,
            time:-1,
            filter: ''/*过滤字段*/,
            organizationId: ''/*操作索引*/,
            organizationName: '',
            currentId: ''/*根索引*/,
            currentName: '',
            prev: null/*菜单操作:上一次操作菜单*/,
            current: null/*菜单操作:当前操作菜单*/
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
            list_page4: {/*扩展--当月清算*/},
            list_page5: {/*扩展--历史清算*/},
            list_page6: {/*扩展--各运营商清算*/},
            list_page7: {
                page: 1,
                pageSize: 10,
                total: 0
            },
            /*表格配置*/
            /*当月分润*/
            list_config1: {
                config: {
                    processing: true, /*大消耗操作时是否显示处理状态*/
                    deferRender: true, /*是否延迟加载数据*/
                    autoWidth: true, /*是否*/
                    paging: false,
                    ajax: {
                        url: toolUtil.adaptReqUrl('/finance/profit/current')/*'json/test.json'*/,
                        dataType: 'JSON',
                        method: 'post',
                        dataSrc: function (json) {
                            /*测试类*/
                            /*var json=financeService.testGetFinanceList(1);*/

                            var code = parseInt(json.code, 10),
                                message = json.message;

                            if (code !== 0) {
                                if (typeof message !== 'undefined' && message !== '') {
                                    console.log(message);
                                } else {
                                    console.log('获取当月分润失败');
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
                                        financeService.getColumnData(self.table, self.record);
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
                    order: [[1, "desc"], [2, "desc"]],
                    columns: [
                        {
                            "data": "organizationName"
                        },
                        {
                            "data": "sales",
                            "render": function (data, type, full, meta) {
                                return toolUtil.moneyCorrect(data, 15, false)[0];
                            }
                        },
                        {
                            "data": "profits1",
                            "render": function (data, type, full, meta) {
                                return toolUtil.moneyCorrect(data, 15, false)[0];
                            }
                        }
                    ]
                }
            },
            /*历史分润*/
            list_config2: {
                config: {
                    processing: true, /*大消耗操作时是否显示处理状态*/
                    deferRender: true, /*是否延迟加载数据*/
                    autoWidth: true, /*是否*/
                    paging: false,
                    ajax: {
                        url: toolUtil.adaptReqUrl('/finance/profit/history')/*'json/test.json'*/,
                        dataType: 'JSON',
                        method: 'post',
                        dataSrc: function (json) {
                            /*测试类*/
                            /*var json=financeService.testGetFinanceList(2);*/

                            var code = parseInt(json.code, 10),
                                message = json.message;

                            if (code !== 0) {
                                if (typeof message !== 'undefined' && message !== '') {
                                    console.log(message);
                                } else {
                                    console.log('获取历史分润失败');
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
                                        financeService.getColumnData(self.table, self.record);
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
                    columns: [{
                            "data": "time"
                        },
                        {
                            "data": "sales",
                            "render": function (data, type, full, meta) {
                                return toolUtil.moneyCorrect(data, 15, false)[0];
                            }
                        },
                        {
                            "data": "profits1",
                            "render": function (data, type, full, meta) {
                                return toolUtil.moneyCorrect(data, 15, false)[0];
                            }
                        },
                        {
                            /*to do*/
                            "data": "id",
                            "render": function (data, type, full, meta) {
                                var btns = '';

                                /*查看发货详情*/
                                if (self.powerlist.profit_details) {
                                    btns += '<span data-action="detail" data-id="' + data + '"  class="btn-operate">明细</span>';
                                }
                                return btns;
                            }
                        }
                    ]
                }
            },
            /*各运营商分润*/
            list_config3: {
                config: {
                    processing: true, /*大消耗操作时是否显示处理状态*/
                    deferRender: true, /*是否延迟加载数据*/
                    autoWidth: true, /*是否*/
                    paging: false,
                    ajax: {
                        url: toolUtil.adaptReqUrl('/finance/profit/organization')/*'json/test.json'*/,
                        dataType: 'JSON',
                        method: 'post',
                        dataSrc: function (json) {
                            /*测试类*/
                            /*var json=financeService.testGetFinanceList(3);*/


                            var code = parseInt(json.code, 10),
                                message = json.message;

                            if (code !== 0) {
                                if (typeof message !== 'undefined' && message !== '') {
                                    console.log(message);
                                } else {
                                    console.log('获取各运营商分润失败');
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
                                self.table.list_page3.total = 0;
                                self.table.list_page3.page = 1;
                                jq_dom.$admin_page_wrap3.pagination({
                                    pageNumber: self.table.list_page3.page,
                                    pageSize: self.table.list_page3.pageSize,
                                    total: self.table.list_page3.total
                                });
                                return [];
                            }

                            if (result) {
                                /*设置分页*/
                                self.table.list_page3.total = result.count;
                                /*分页调用*/
                                jq_dom.$admin_page_wrap3.pagination({
                                    pageNumber: self.table.list_page3.page,
                                    pageSize: self.table.list_page3.pageSize,
                                    total: self.table.list_page3.total,
                                    onSelectPage: function (pageNumber, pageSize) {
                                        /*再次查询*/
                                        var temp_param = self.table.list_config3.config.ajax.data;
                                        self.table.list_page3.page = pageNumber;
                                        self.table.list_page3.pageSize = pageSize;
                                        temp_param['page'] = self.table.list_page3.page;
                                        temp_param['pageSize'] = self.table.list_page3.pageSize;
                                        self.table.list_config3.config.ajax.data = temp_param;
                                        financeService.getColumnData(self.table, self.record);
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
                                self.table.list_page3.total = 0;
                                self.table.list_page3.page = 1;
                                jq_dom.$admin_page_wrap3.pagination({
                                    pageNumber: self.table.list_page3.page,
                                    pageSize: self.table.list_page3.pageSize,
                                    total: self.table.list_page3.total
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
                            "data": "times"
                        },
                        {
                            "data": "sales",
                            "render": function (data, type, full, meta) {
                                return toolUtil.moneyCorrect(data, 15, false)[0];
                            }
                        },
                        {
                            "data": "profits1",
                            "render": function (data, type, full, meta) {
                                return toolUtil.moneyCorrect(data, 15, false)[0];
                            }
                        },
                        {
                            "data": "id",
                            "render": function (data, type, full, meta) {
                                var btns = '';

                                /*查看发货详情*/
                                if (self.powerlist.profit_details) {
                                    btns += '<span data-action="detail" data-id="' + data + '"  class="btn-operate">明细</span>';
                                }
                                return btns;
                            }
                        }
                    ]
                }
            },
            list_config4: {/*扩展--当月清算*/},
            list_config5: {/*扩展--历史清算*/},
            list_config6: {/*扩展--各运营商清算*/},
            /*除权除息分红*/
            list_config7: {
                config: {
                    processing: true, /*大消耗操作时是否显示处理状态*/
                    deferRender: true, /*是否延迟加载数据*/
                    autoWidth: true, /*是否*/
                    paging: false,
                    ajax: {
                        url: toolUtil.adaptReqUrl('/exdividend/bonus/list')/*'json/test.json'*/,
                        dataType: 'JSON',
                        method: 'post',
                        dataSrc: function (json) {
                            /*测试类*/
                            /*var json=financeService.testGetFinanceList(4);*/

                            var code = parseInt(json.code, 10),
                                message = json.message;

                            if (code !== 0) {
                                if (typeof message !== 'undefined' && message !== '') {
                                    console.log(message);
                                } else {
                                    console.log('获取除权除息分红失败');
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
                                self.table.list_page7.total = 0;
                                self.table.list_page7.page = 1;
                                jq_dom.$admin_page_wrap7.pagination({
                                    pageNumber: self.table.list_page7.page,
                                    pageSize: self.table.list_page7.pageSize,
                                    total: self.table.list_page7.total
                                });
                                return [];
                            }

                            if (result) {
                                /*设置分页*/
                                self.table.list_page7.total = result.count;
                                /*分页调用*/
                                jq_dom.$admin_page_wrap7.pagination({
                                    pageNumber: self.table.list_page7.page,
                                    pageSize: self.table.list_page7.pageSize,
                                    total: self.table.list_page7.total,
                                    onSelectPage: function (pageNumber, pageSize) {
                                        /*再次查询*/
                                        var temp_param = self.table.list_config7.config.ajax.data;
                                        self.table.list_page7.page = pageNumber;
                                        self.table.list_page7.pageSize = pageSize;
                                        temp_param['page'] = self.table.list_page7.page;
                                        temp_param['pageSize'] = self.table.list_page7.pageSize;
                                        self.table.list_config7.config.ajax.data = temp_param;
                                        financeService.getColumnData(self.table, self.record);
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
                                self.table.list_page7.total = 0;
                                self.table.list_page7.page = 1;
                                jq_dom.$admin_page_wrap7.pagination({
                                    pageNumber: self.table.list_page7.page,
                                    pageSize: self.table.list_page7.pageSize,
                                    total: self.table.list_page7.total
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
                            "data": "exrightDate"
                        },
                        {
                            "data": "exright",
                            "render": function (data, type, full, meta) {
                                if (typeof data === 'undefined') {
                                    return '0.00';
                                }
                                return toolUtil.moneyCorrect(data, 15, true)[0];
                            }
                        },
                        {
                            "data": "exdividendDate"
                        },
                        {
                            "data": "exdividend",
                            "render": function (data, type, full, meta) {
                                if (typeof data === 'undefined') {
                                    return '0.00';
                                }
                                return toolUtil.moneyCorrect(data, 15, true)[0];
                            }
                        },
                        {
                            "data": "bonusDate"
                        },
                        {
                            "data": "bonus",
                            "render": function (data, type, full, meta) {
                                if (typeof data === 'undefined') {
                                    return '0.00';
                                }
                                return toolUtil.moneyCorrect(data, 15, true)[0];
                            }
                        },
                        {
                            /*to do*/
                            "data": "id",
                            "render": function (data, type, full, meta) {
                                var btns = '';

                                /*查看发货详情*/
                                if (self.powerlist.bonus_add) {
                                    btns += '<span data-action="detail" data-id="' + data + '"  class="btn-operate">查看</span>\
                                        <span data-action="update" data-id="' + data + '"  class="btn-operate">编辑</span>';
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
            list_table4: null/*扩展--当月清算*/,
            list_table5: null/*扩展--历史清算*/,
            list_table6: null/*扩展--各运营商清算*/,
            list_table7: null,
            /*列控制*/
            tablecolumn1: {
                init_len: 7/*数据有多少列*/,
                column_flag: true,
                ischeck: true, /*是否有全选*/
                columnshow: true,
                $column_wrap: jq_dom.$admin_table_checkcolumn1/*控制列显示隐藏的容器*/,
                $bodywrap: jq_dom.$admin_batchlist_wrap1/*数据展现容器*/,
                hide_list: [3, 4]/*需要隐藏的的列序号*/,
                hide_len: 2,
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
                hide_list: [5, 6]/*需要隐藏的的列序号*/,
                hide_len: 2,
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
                init_len: 7/*数据有多少列*/,
                column_flag: true,
                ischeck: true, /*是否有全选*/
                columnshow: true,
                $column_wrap: jq_dom.$admin_table_checkcolumn3/*控制列显示隐藏的容器*/,
                $bodywrap: jq_dom.$admin_batchlist_wrap3/*数据展现容器*/,
                hide_list: [1, 2]/*需要隐藏的的列序号*/,
                hide_len: 2,
                column_api: {
                    isEmpty: function () {
                        if (self.table.list_table3 === null) {
                            return true
                        }
                        return self.table.list_table3.data().length === 0;
                    }
                },
                $colgroup: jq_dom.$admin_list_colgroup3/*分组模型*/,
                $column_btn: jq_dom.$admin_table_checkcolumn3.prev(),
                $column_ul: jq_dom.$admin_table_checkcolumn3.find('ul')
            },
            tablecolumn4: {/*扩展--当月清算*/},
            tablecolumn5: {/*扩展--历史清算*/},
            tablecolumn6: {/*扩展--各运营商清算*/},
            tablecolumn7: {
                init_len: 7/*数据有多少列*/,
                column_flag: true,
                ischeck: false, /*是否有全选*/
                columnshow: true,
                $column_wrap: jq_dom.$admin_table_checkcolumn6/*控制列显示隐藏的容器*/,
                $bodywrap: jq_dom.$admin_batchlist_wrap6/*数据展现容器*/,
                hide_list: [4, 5]/*需要隐藏的的列序号*/,
                hide_len: 2,
                column_api: {
                    isEmpty: function () {
                        if (self.table.list_table6 === null) {
                            return true;
                        }
                        return self.table.list_table6.data().length === 0;
                    }
                },
                $colgroup: jq_dom.$admin_list_colgroup6/*分组模型*/,
                $column_btn: jq_dom.$admin_table_checkcolumn6.prev(),
                $column_ul: jq_dom.$admin_table_checkcolumn6.find('ul')
            },
            /*按钮*/
            tableitemaction1: {
                $bodywrap: jq_dom.$admin_batchlist_wrap1,
                itemaction_api: {
                    doItemAction: function (config) {
                        financeService.doItemAction({
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
                        financeService.doItemAction({
                            record: self.record,
                            table: self.table
                        }, config);
                    }
                }
            },
            tableitemaction3: {
                $bodywrap: jq_dom.$admin_batchlist_wrap3,
                itemaction_api: {
                    doItemAction: function (config) {
                        financeService.doItemAction({
                            record: self.record,
                            table: self.table
                        }, config);
                    }
                }
            },
            tableitemaction4: {/*扩展--当月清算*/},
            tableitemaction5: {/*扩展--历史清算*/},
            tableitemaction6: {/*扩展--各运营商清算*/},
            tableitemaction7: {
                $bodywrap: jq_dom.$admin_batchlist_wrap5,
                itemaction_api: {
                    doItemAction: function (config) {
                        financeService.doItemAction({
                            record: self.record,
                            table: self.table,
                            bonus: self.bonus
                        }, config);
                    }
                }
            }
        };


        /*模型--tab选项卡--主题*/
        this.themeitem = [{
            name: '分润',
            power: self.powerlist.profit_details,
            type: 'profit',
            active: 'tabactive'
        }, {
            name: '除权除息分红',
            power: self.powerlist.bonus_add,
            type: 'bonus',
            active: ''
        }];


        /*模型--tab选项卡--选项*/
        this.tabitem = [{
            name: '当月',
            power: self.powerlist.profit_details,
            type: 'stats',
            active: 'tabactive'
        }, {
            name: '历史',
            power: self.powerlist.profit_details,
            type: 'history',
            active: ''
        }, {
            name: '运营商',
            power: self.powerlist.profit_details,
            type: 'organization',
            active: ''
        }];




        /*模型--除权除息分红模型*/
        this.bonus = {
            type: 'add'/*除权除息--操作类型*/,
            id: ''/*除权除息分红--序列号*/,
            exrightDate: ''/*除权除息--除权日*/,
            exright: ''/*除权除息--除权*/,
            exdividendDate: ''/*除权除息--除息日*/,
            exdividend: ''/*除权除息--除息*/,
            bonusDate: ''/*除权除息--分红日*/,
            bonus: ''/*除权除息--分红*/
        };


        /*初始化服务--虚拟挂载点，或者初始化参数*/
        financeService.getRoot(self.record);
        /*初始化服务--日历查询*/
        financeService.datePicker([{
            format: '%y-%M-%d',
            init:true,
            initfn:function (data) {
                self.record.searchDate = data.$node1;
            },
            position: {
                left: 0,
                top: 2
            },
            $node1: jq_dom.$search_date,
            fn: function (data) {
                $scope.$apply(function () {
                    self.record.searchDate = data.$node1;
                });
            }
        },{
            format: '%y-%M-%d',
            position: {
                left: 0,
                top: 2
            },
            $node1: jq_dom.$bonus_exrightdate,
            fn: function (data) {
                $scope.$apply(function () {
                    self.bonus.exrightDate = data.$node1;
                });
            }
        }, {
            format: '%y-%M-%d',
            position: {
                left: 0,
                top: 2
            },
            $node1: jq_dom.$bonus_exdividenddate,
            fn: function (data) {
                $scope.$apply(function () {
                    self.bonus.exdividendDate = data.$node1;
                });
            }
        }, {
            format: '%y-%M-%d',
            position: {
                left: 0,
                top: 2
            },
            $node1: jq_dom.$bonus_bonusdate,
            fn: function (data) {
                $scope.$apply(function () {
                    self.bonus.bonusDate = data.$node1;
                });
            }
        }
        ]);


        /*菜单服务--初始化*/
        this.initSubMenu = function () {
            financeService.getSubMenu({
                table: self.table,
                record: self.record
            });
        };
        /*菜单服务--显示隐藏菜单*/
        this.toggleSubMenu = function (e) {
            financeService.toggleSubMenu(e, {
                table: self.table,
                record: self.record
            });
        };


        /*条件服务--切换条件主题*/
        this.toggleTheme = function (type) {
            self.record.theme = type;
            /*计算区域并执行相关操作*/
            financeService.changeView({
                record:self.record,
                table:self.table
            });
        };

        /*除权除息分红--操作除权除息分红表单*/
        this.actionBonus = function (config) {
            /*调用编辑机构服务类*/
            financeService.actionBonus({
                modal: config,
                record: self.record,
                bonus: self.bonus
            });
        };


        /*表单服务--提交表单*/
        this.formSubmit = function (type) {
            financeService.formSubmit({
                table: self.table,
                record: self.record,
                bonus: self.bonus
            }, type);
        };
        /*表单服务--重置表单*/
        this.formReset = function (forms, type) {
            /*重置表单模型*/
            financeService.formReset({
                forms: forms,
                bonus: self.bonus
            }, type);
        };


        /*查询服务--查询列表*/
        this.queryFinance = function () {
            financeService.getColumnData(self.table, self.record);
        };
        /*查询服务--过滤数据*/
        this.filterDataTable = function () {
            financeService.filterDataTable(self.table, self.record);
        };


        /*显示隐藏弹出层*/
        this.toggleModal = function (config) {
            financeService.toggleModal({
                display: config.display,
                area: config.area
            });
        };


        /*清算*/
        this.actionClear = function () {
            financeService.actionClear({
                record: self.record,
                table: self.table
            }, {
                type: 'batch'
            });
        };


    }]);