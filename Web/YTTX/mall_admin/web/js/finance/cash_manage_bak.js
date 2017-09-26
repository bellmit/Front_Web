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
                module_id = 'bzw-finance-manage'/*模块id，主要用于本地存储传值*/,
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
            var cash_page = {
                    page: 1,
                    pageSize: 10,
                    total: 0
                },
                cash_config = {
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
                                cash_page.page = result.page;
                                cash_page.pageSize = result.pageSize;
                                cash_page.total = result.count;
                                /*分页调用*/
                                $admin_page_wrap.pagination({
                                    pageSize: cash_page.pageSize,
                                    total: cash_page.total,
                                    pageNumber: cash_page.page,
                                    onSelectPage: function (pageNumber, pageSize) {
                                        /*再次查询*/
                                        var param = cash_config.config.ajax.data;
                                        param.page = pageNumber;
                                        param.pageSize = pageSize;
                                        cash_config.config.ajax.data = param;
                                        getColumnData(cash_config);
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
                            },
                            {
                                "data": "id",
                                "render": function (data, type, full, meta) {
                                    var id = parseInt(data, 10),
                                        btns = '',
                                        status = parseInt(full.orderState, 10);

                                    if (detail_power) {
                                        btns += '<span data-action="detail" data-id="' + id + '"  class="btn btn-white btn-icon btn-xs g-br2 g-c-gray8">\
                                            <i class="fa-file-text-o"></i>\
                                            <span>查看</span>\
										</span>';
                                    }
                                    if (dispose_power && (status === 9 || status === 20 || status === 21)) {
                                        btns += '<span data-action="dispose" data-id="' + id + '"  class="btn btn-white btn-icon btn-xs g-br2 g-c-gray8">\
                                            <i class="fa-exchange"></i>\
                                            <span>提现处理</span>\
										</span>';
                                    }
                                    return btns;
                                }
                            }
                        ]
                    }
                };


            /*初始化请求*/
            getColumnData(cash_config);


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
                var data = $.extend(true, {}, cash_config.config.ajax.data);

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
                cash_config.config.ajax.data = $.extend(true, {}, data);
                getColumnData(cash_config);
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


            /*事件绑定*/
            /*绑定查看，修改操作*/
            var operate_item;
            $admin_list_wrap.delegate('span', 'click', function (e) {
                e.stopPropagation();
                e.preventDefault();

                var target = e.target,
                    $this,
                    id,
                    action,
                    $tr;

                //适配对象
                if (target.className.indexOf('btn') !== -1) {
                    $this = $(target);
                } else {
                    $this = $(target).parent();
                }
                $tr = $this.closest('tr');
                id = $this.attr('data-id');
                action = $this.attr('data-action');

                if (action === 'detail') {
                    /*查看详情*/
                    cashDetail({
                        id: id,
                        $tr: $tr
                    });
                } else if (action === 'dispose') {
                    /*提现处理*/
                    cashDispose({
                        id: id,
                        $tr: $tr
                    });
                }
            });


            /*绑定关闭详情*/
            $show_detail_wrap.on('hide.bs.modal', function () {
                if (operate_item) {
                    setTimeout(function () {
                        operate_item.removeClass('item-lighten');
                        operate_item = null;
                    }, 1000);
                }
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


        /*查看详情*/
        function cashDetail(config) {
            if (!config) {
                return false;
            }

            $.ajax({
                    url: debug ? "../../json/test.json" : "http://10.0.5.226:8082/mall-buzhubms-api/goodsorder/detail",
                    dataType: 'JSON',
                    method: 'post',
                    data: {
                        id: config.id,
                        roleId: decodeURIComponent(logininfo.param.roleId),
                        adminId: decodeURIComponent(logininfo.param.adminId),
                        grade: decodeURIComponent(logininfo.param.grade),
                        token: decodeURIComponent(logininfo.param.token)
                    }
                })
                .done(function (resp) {
                    if (debug) {
                        var resp = testWidget.testSuccess('list');
                        resp.result = testWidget.getMap({
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
                            maptype: 'object'
                        }).list;
                    }
                    var code = parseInt(resp.code, 10);
                    if (code !== 0) {
                        console.log(resp.message);
                        dia.content('<span class="g-c-bs-warning g-btips-warn">' + (resp.message || "操作失败") + '</span>').show();
                        setTimeout(function () {
                            dia.close();
                        }, 2000);
                        return false;
                    }
                    /*是否是正确的返回数据*/
                    var list = resp.result;
                    if (!list) {
                        return false;
                    }

                    var str = '',
                        istitle = false,
                        detail_map = {
                            id: '序列',
                            orderNumber: '订单号',
                            content: '流水内容',
                            orderMoney: '订单金额',
                            memberName: '会员名称',
                            paymentType: '支付类型',
                            orderState: '订单状态',
                            orderTime: '下单时间'
                        };

                    if (!$.isEmptyObject(list)) {
                        /*添加高亮状态*/
                        for (var j in list) {
                            if (typeof detail_map[j] !== 'undefined') {
                                if (j === 'memberName') {
                                    istitle = true;
                                    $show_detail_title.html('查看"<span class="g-c-info">' + list[j] + '</span>"提现详情');
                                } else if (j === 'orderState') {
                                    var statemap = {
                                        0: "待付款",
                                        1: "取消订单",
                                        6: "待发货",
                                        9: "待收货",
                                        20: "待评价",
                                        21: "已评价"
                                    };
                                    str += '<tr><th>' + detail_map[j] + ':</th><td>' + statemap[parseInt(list[j], 10)] + '</td></tr>';
                                } else if (j === 'paymentType') {
                                    var paymentmap = {
                                        1: "微信支付",
                                        2: "支付宝支付",
                                        3: "其他"
                                    };
                                    str += '<tr><th>' + detail_map[j] + ':</th><td>' + paymentmap[parseInt(list[j], 10)] + '</td></tr>';
                                } else {
                                    str += '<tr><th>' + detail_map[j] + ':</th><td>' + list[j] + '</td></tr>';
                                }
                            } else {
                                str += '<tr><th>' + j + ':</th><td>' + list[j] + '</td></tr>';
                            }
                        }
                        if (!istitle) {
                            $show_detail_title.html('查看提现详情');
                        }
                        $(str).appendTo($show_detail_content.html(''));
                        if (operate_item) {
                            operate_item.removeClass('item-lighten');
                            operate_item = null;
                        }
                        operate_item = config.$tr.addClass('item-lighten');
                        $show_detail_wrap.modal('show', {backdrop: 'static'});
                    }


                })
                .fail(function (resp) {
                    console.log(resp.message);
                    dia.content('<span class="g-c-bs-warning g-btips-warn">' + (resp.message || "操作失败") + '</span>').show();
                    setTimeout(function () {
                        dia.close();
                    }, 2000);
                });
        }


        /*提现处理*/
        function cashDispose(config) {
            if (!config) {
                return false;
            }
            setSure.sure('', function (cf) {
                /*是否选择了状态*/
                var applystate = parseInt($audit_radio_wrap.find(':checked').val(), 10);
                if (isNaN(applystate)) {
                    $audit_radio_tip.html('您没有选择审核状态');
                    setTimeout(function () {
                        $audit_radio_tip.html('');
                        $audit_radio_wrap.find('input').eq(0).prop({
                            'checked': true
                        });
                    }, 2000);
                    return false;
                }
                /*是否有id*/
                var id = $admin_id.val();
                if (id === '') {
                    dia.content('<span class="g-c-bs-warning g-btips-warn">您没有选择需要操作的数据</span>').showModal();
                    return false;
                }


                var type = $admin_id.attr('data-type'),
                    tip = cf.dia,
                    temp_config = $.extend(true, {}, goods_params);


                temp_config['operate'] = applystate;

                temp_config['ids'] = id;

                $.ajax({
                        url: "http://10.0.5.226:8082/mall-buzhubms-api/goods/operate",
                        dataType: 'JSON',
                        method: 'post',
                        data: temp_config
                    })
                    .done(function (resp) {
                        var code = parseInt(resp.code, 10);
                        if (code !== 0) {
                            console.log(resp.message);
                            tip.content('<span class="g-c-bs-warning g-btips-warn">' + (resp.message || "审核失败") + '</span>').show();
                            if (type === 'base') {
                                if (operate_item) {
                                    operate_item.removeClass('item-lighten');
                                    operate_item = null;
                                }
                            } else if (type === 'batch') {
                                batchItem.clear();
                            }
                            setTimeout(function () {
                                tip.close();
                                resetShowData('audit');
                            }, 2000);
                            return false;
                        }
                        /*是否是正确的返回数据*/
                        tip.content('<span class="g-c-bs-success g-btips-succ">审核成功</span>').show();
                        if (type === 'base') {
                            if (operate_item) {
                                operate_item.removeClass('item-lighten');
                                operate_item = null;
                            }
                        } else if (type === 'batch') {
                            batchItem.clear();
                        }
                        setTimeout(function () {
                            tip.close();
                            getColumnData(goods_page, goods_config);
                            setTimeout(function () {
                                $show_audit_wrap.modal('hide');
                                resetShowData('audit');
                            }, 1000);
                        }, 1000);
                    })
                    .fail(function (resp) {
                        console.log(resp.message);
                        tip.content('<span class="g-c-bs-warning g-btips-warn">' + (resp.message || "审核失败") + '</span>').show();
                        if (type === 'base') {
                            if (operate_item) {
                                operate_item.removeClass('item-lighten');
                                operate_item = null;
                            }
                        } else if (type === 'batch') {
                            batchItem.clear();
                        }
                        setTimeout(function () {
                            tip.close();
                            resetShowData('audit');
                            $show_audit_wrap.modal('hide');
                        }, 2000);
                    });

            }, "是否体现处理?", true);
        }

    });


})(jQuery);