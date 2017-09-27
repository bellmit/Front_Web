(function ($) {
    'use strict';
    $(function () {

        var table = null/*数据展现*/;

        /*初始化数据*/
        if (public_tool.initMap.isrender) {
            /*菜单调用*/
            var logininfo = public_tool.initMap.loginMap;
            public_tool.loadSideMenu(public_vars.$mainmenu, public_vars.$main_menu_wrap, {
                url: 'http://10.0.5.226:8082/mall-buzhubms-api/module/menu',
                async: false,
                type: 'post',
                param: {
                    roleId: decodeURIComponent(logininfo.param.roleId),
                    adminId: decodeURIComponent(logininfo.param.adminId),
                    grade: decodeURIComponent(logininfo.param.grade),
                    token: decodeURIComponent(logininfo.param.token)
                },
                datatype: 'json'
            });


            /*权限调用*/
            var powermap = public_tool.getPower(350),
                detail_power = public_tool.getKeyPower('cash-detail', powermap)/*详情权限*/,
                dispose_power = public_tool.getKeyPower('cash-dispose', powermap)/*提现处理权限*/;


            /*dom引用和相关变量定义*/
            var debug = true,
                $admin_list_wrap = $('#admin_list_wrap')/*表格*/,
                module_id = 'bzw-finance-recordmanage'/*模块id，主要用于本地存储传值*/,
                dia = dialog({
                    zIndex: 2000,
                    title: '温馨提示',
                    okValue: '确定',
                    width: 300,
                    ok: function () {
                        this.close();
                        return false;
                    },
                    cancel: false
                })/*一般提示对象*/,
                $admin_page_wrap = $('#admin_page_wrap'),
                $show_detail_wrap = $('#show_detail_wrap')/*详情容器*/,
                $show_detail_content = $('#show_detail_content'), /*详情内容*/
                $show_detail_title = $('#show_detail_title'),
                sureObj=public_tool.sureDialog(dia)/*回调提示对象*/,
                setSure=new sureObj();


            /*查询对象*/
            var $search_orderType = $('#search_orderType'),
                $search_keyword = $('#search_keyword'),
                $search_item = $('#search_item'),
                $search_time = $('#search_time'),
                end_date = moment().format('YYYY-MM-DD'),
                start_date = moment().subtract(1, 'month').format('YYYY-MM-DD'),
                $admin_search_btn = $('#admin_search_btn'),
                $admin_search_clear = $('#admin_search_clear');


            /*列表请求配置*/
            var record_page = {
                    page: 1,
                    pageSize: 10,
                    total: 0
                },
                record_config = {
                    $admin_list_wrap: $admin_list_wrap,
                    $admin_page_wrap: $admin_page_wrap,
                    config: {
                        processing: true, /*大消耗操作时是否显示处理状态*/
                        deferRender: true, /*是否延迟加载数据*/
                        autoWidth: true, /*是否*/
                        paging: false,
                        ajax: {
                            url: debug ? "../../json/test.json" : "http://10.0.5.226:8082/mall-buzhubms-api/goodsorder/list",
                            dataType: 'JSON',
                            method: 'post',
                            dataSrc: function (json) {
                                if (debug) {
                                    var json = testWidget.test({
                                        map: {
                                            id: 'guid',
                                            orderNumber: 'text',
                                            content: 'remark',
                                            orderMoney: 'money',
                                            memberName: 'name',
                                            paymentType: 'rule,1,2,3',
                                            orderState: 'rule,0,1,6,9,20,21',
                                            orderTime: 'datetime'
                                        },
                                        mapmin: 5,
                                        mapmax: 10,
                                        type: 'list'
                                    });
                                }
                                var code = parseInt(json.code, 10);
                                if (code !== 0) {
                                    if (code === 999) {
                                        /*清空缓存*/
                                        public_tool.loginTips(function () {
                                            public_tool.clear();
                                            public_tool.clearCacheData();
                                        });
                                    }
                                    console.log(json.message);
                                    return [];
                                }
                                var result = json.result;
                                if (typeof result === 'undefined') {
                                    return [];
                                }
                                /*设置分页*/
                                record_page.page = result.page;
                                record_page.pageSize = result.pageSize;
                                record_page.total = result.count;
                                /*分页调用*/
                                $admin_page_wrap.pagination({
                                    pageSize: record_page.pageSize,
                                    total: record_page.total,
                                    pageNumber: record_page.page,
                                    onSelectPage: function (pageNumber, pageSize) {
                                        /*再次查询*/
                                        var param = record_config.config.ajax.data;
                                        param.page = pageNumber;
                                        param.pageSize = pageSize;
                                        record_config.config.ajax.data = param;
                                        getColumnData(record_config);
                                    }
                                });
                                return result ? result.list || [] : [];
                            },
                            data: {
                                roleId: decodeURIComponent(logininfo.param.roleId),
                                adminId: decodeURIComponent(logininfo.param.adminId),
                                grade: decodeURIComponent(logininfo.param.grade),
                                token: decodeURIComponent(logininfo.param.token),
                                page: 1,
                                pageSize: 10
                            }
                        },
                        info: false,
                        searching: true,
                        order: [[1, "desc"]],
                        columns: [
                            {
                                "data": "orderNumber"
                            },
                            {
                                "data": "content"
                            },
                            {
                                "data": "orderMoney",
                                "render": function (data, type, full, meta) {
                                    return '￥:' + public_tool.moneyCorrect(data, 12, false)[0];
                                }
                            },
                            {
                                "data": "memberName"
                            },
                            {
                                "data": "paymentType",
                                "render": function (data, type, full, meta) {
                                    var stauts = parseInt(data, 10),
                                        statusmap = {
                                            1: "微信支付",
                                            2: "支付宝支付",
                                            3: "其他"
                                        };

                                    return statusmap[stauts];
                                }
                            },
                            {
                                "data": "orderState",
                                "render": function (data, type, full, meta) {
                                    var status = parseInt(data, 10),
                                        statusmap = {
                                            0: "待付款",
                                            1: "取消订单",
                                            6: "待发货",
                                            9: "待收货",
                                            20: "待评价",
                                            21: "已评价"
                                        },
                                        str = '';

                                    if (status === 6 || status === 9) {
                                        str = '<div class="g-c-gray6">' + statusmap[status] + '</div>';
                                    } else if (status === 1) {
                                        str = '<div class="g-c-gray10">' + statusmap[status] + '</div>';
                                    } else if (status === 0) {
                                        str = '<div class="g-c-warn">' + statusmap[status] + '</div>';
                                    } else if (status === 20 || status === 21) {
                                        str = '<div class="g-c-succ">' + statusmap[status] + '</div>';
                                    } else {
                                        str = '<div class="g-c-red1">' + statusmap[status] + '</div>';
                                    }
                                    return str;
                                }
                            },
                            {
                                "data": "orderTime"
                            }
                        ]
                    }
                };


            /*初始化请求*/
            getColumnData(record_config);


            /*清空查询条件*/
            $admin_search_clear.on('click', function () {
                $.each([$search_orderType, $search_item, $search_keyword, $search_time], function () {
                    var selector = this.selector;
                    if (selector.indexOf('orderType') !== -1 || selector.indexOf('item') !== -1) {
                        this.find('option:first-child').prop({
                            'selected': true
                        });
                    } else {
                        this.val('');
                    }
                });
            });
            $admin_search_clear.trigger('click');


            /*联合查询*/
            $admin_search_btn.on('click', function () {
                var data = $.extend(true, {}, record_config.config.ajax.data);

                $.each([$search_orderType, $search_keyword, $search_time], function () {
                    var text = this.val(),
                        selector = this.selector.slice(1),
                        key = selector.split('_'),
                        iskeyword = selector.indexOf('keyword') !== -1 ? true : false,
                        istime = selector.indexOf('time') !== -1 ? true : false;

                    if (text === "") {
                        if (iskeyword) {
                            delete data['keyItem'];
                            delete data['keyword'];
                        } else if (istime) {
                            delete data['orderTimeStart'];
                            delete data['orderTimeEnd'];
                        } else {
                            if (typeof data[key[1]] !== 'undefined') {
                                delete data[key[1]];
                            }
                        }
                    } else {
                        if (iskeyword) {
                            data['keyword'] = text;
                            data['keyItem'] = $search_item.find(':selected').val();
                        } else if (istime) {
                            text = text.split(',');
                            data['orderTimeStart'] = text[0];
                            data['orderTimeEnd'] = text[1];
                        } else {
                            data[key[1]] = text;
                        }
                    }

                });
                record_config.config.ajax.data = $.extend(true, {}, data);
                getColumnData(record_config);
            });


            /*绑定时间*/
            $search_time.val('').daterangepicker({
                format: 'YYYY-MM-DD',
                todayBtn: true,
                maxDate: end_date,
                endDate: end_date,
                startDate: start_date,
                separator: ','
            });

        }


        /*获取数据*/
        function getColumnData(opt) {
            if (table === null) {
                table = opt.$admin_list_wrap.DataTable(opt.config);
            } else {
                table.ajax.config(opt.config.ajax).load();
            }
        }

    });


})(jQuery);