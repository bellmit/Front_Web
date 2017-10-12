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
            var powermap = public_tool.getPower(344),
                dispose_power = public_tool.getKeyPower('bzw-finance-cashmanage-deal', powermap)/*提现处理权限*/;


            /*dom引用和相关变量定义*/
            var debug = false/*是否测试模式*/,
                $admin_list_wrap = $('#admin_list_wrap')/*表格*/,
            /*$admin_batchlist_wrap = $('#admin_batchlist_wrap')屏蔽批量,*/
                module_id = 'bzw-finance-cashmanage'/*模块id，主要用于本地存储传值*/,
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
                $admin_pispose_btn = $('#admin_pispose_btn'),
                sureObj = public_tool.sureDialog(dia)/*回调提示对象*/,
                setSure = new sureObj(),
                operate_item = null;


            /*查询对象*/
            var $search_auditStatus = $('#search_auditStatus'),
                $search_name = $('#search_name'),
                $search_phone = $('#search_phone'),
                $admin_search_btn = $('#admin_search_btn'),
                $admin_search_clear = $('#admin_search_clear');

            /*批量配置参数*/
            /*var $admin_batchitem_btn = $('#admin_batchitem_btn'),
             $admin_batchitem_show = $('#admin_batchitem_show'),
             $admin_batchitem_check = $('#admin_batchitem_check'),
             $admin_batchitem_action = $('#admin_batchitem_action'),
             batchItem = new public_tool.BatchItem();*/

            /*批量初始化--屏蔽批量*/
            /*batchItem.init({
             $batchtoggle: $admin_batchitem_btn,
             $batchshow: $admin_batchitem_show,
             $checkall: $admin_batchitem_check,
             $action: $admin_batchitem_action,
             $listwrap: $admin_batchlist_wrap,
             setSure: setSure,
             powerobj: {
             'dispose': dispose_power
             },
             fn: function (type) {
             /!*批量操作*!/
             cashDispose({
             type: 'batch'
             });
             }
             });*/


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
                            url: debug ? "../../json/test.json" : "http://10.0.5.226:8082/mall-buzhubms-api/finance/withdraw_deposit/list",
                            dataType: 'JSON',
                            method: 'post',
                            dataSrc: function (json) {
                                if (debug) {
                                    var json = testWidget.test({
                                        map: {
                                            id: 'guid',
                                            name: 'name',
                                            serialNumber: 'guid',
                                            phone: 'mobile',
                                            amount: 'money',
                                            auditStatus: 'rule,0,1,2',
                                            createTime: 'datetime'

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
                            /*{
                             "data": "id",
                             "orderable": false,
                             "searchable": false,
                             "render": function (data, type, full, meta) {
                             var status = parseInt(full.auditStatus, 10);
                             return status === 0 ? '<input value="' + data + '" data-cashstatus="' + full.status + '" name="cashID" type="checkbox" />' : '';
                             }
                             },屏蔽批量*/
                            {
                                "data": "serialNumber"
                            },
                            {
                                "data": "name"
                            },
                            {
                                "data": "phone",
                                "render": function (data, type, full, meta) {
                                    return public_tool.phoneFormat(data);
                                }
                            },
                            {
                                "data": "amount",
                                "render": function (data, type, full, meta) {
                                    return '￥:' + public_tool.moneyCorrect(data, 12, false)[0];
                                }
                            },
                            {
                                "data": "createTime"
                            },
                            {
                                "data": "auditStatus",
                                "render": function (data, type, full, meta) {
                                    var stauts = parseInt(data, 10),
                                        statusmap = {
                                            0: '<div class="g-c-red1">待审核(未处理)</div>',
                                            1: '<div class="g-c-green1">审核通过(历史提现)</div>',
                                            2: '<div class="g-c-orange1">审核驳回(暂未该状态)</div>'
                                        };

                                    return statusmap[stauts];
                                }
                            },
                            {
                                "data": "id",
                                "render": function (data, type, full, meta) {
                                    var id = parseInt(data, 10),
                                        btns = '',
                                        state = parseInt(full.auditStatus, 10);

                                    btns += '<span data-action="detail" data-id="' + id + '" data-state="' + state + '"  class="btn btn-white btn-icon btn-xs g-br2 g-c-gray8">\
                                            <i class="fa-file-text-o"></i>\
                                            <span>查看</span>\
										</span>';
                                    if (dispose_power && (state !== 1)) {
                                        btns += '<span data-action="dispose" data-id="' + id + '"  class="btn btn-white btn-icon btn-xs g-br2 g-c-gray8">\
                                            <i class="fa-exchange"></i>\
                                            <span>处理提现</span>\
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
                $.each([$search_auditStatus, $search_name, $search_phone], function () {
                    var selector = this.selector;
                    if (selector.indexOf('auditStatus') !== -1) {
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

                $.each([$search_auditStatus, $search_name, $search_phone], function () {
                    var text = this.val(),
                        selector = this.selector.slice(1),
                        key = selector.split('_');

                    if (text === "") {
                        if (typeof data[key[1]] !== 'undefined') {
                            delete data[key[1]];
                        }
                    } else {
                        data[key[1]] = public_tool.trims(text);
                    }

                });
                cash_config.config.ajax.data = $.extend(true, {}, data);
                getColumnData(cash_config);
            });

            /*格式化手机号码*/
            $.each([$search_phone], function () {
                this.on('keyup focusout', function (e) {
                    var etype = e.type,
                        phoneno = this.value.replace(/\D*/g, '');

                    if (etype === 'keyup') {
                        if (phoneno === '') {
                            this.value = '';
                            return false;
                        }
                        this.value = public_tool.phoneFormat(this.value);
                    } else if (etype === 'focusout') {
                        if (!public_tool.isMobilePhone(phoneno)) {
                            this.value = '';
                            return false;
                        }
                        this.value = public_tool.phoneFormat(this.value);
                    }
                });
            });


            /*事件绑定*/
            /*绑定查看，修改操作*/
            $admin_list_wrap.delegate('span', 'click', function (e) {
                e.stopPropagation();
                e.preventDefault();

                var target = e.target,
                    $this,
                    id,
                    action;

                //适配对象
                if (target.className.indexOf('btn') !== -1) {
                    $this = $(target);
                } else {
                    $this = $(target).parent();
                }

                if (operate_item !== null) {
                    operate_item.removeClass('item-lighten');
                    operate_item = null;
                }
                operate_item = $this.closest('tr').addClass('item-lighten');
                id = $this.attr('data-id');
                action = $this.attr('data-action');

                if (action === 'detail') {
                    /*查看详情*/
                    cashDetail({
                        id: id,
                        state: $this.attr('data-state')
                    });
                } else if (action === 'dispose') {
                    /*提现处理*/
                    cashDispose({
                        id: id,
                        type: 'base'
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


            /*绑定详情提现处理*/
            $admin_pispose_btn.on('click', function () {
                var id = $admin_pispose_btn.attr('data-id');

                if (id === '') {
                    return false;
                }

                cashDispose({
                    type: 'base',
                    id: id,
                    modal: true
                })

            });

        }


        /*获取数据*/
        function getColumnData(opt) {
            if (table === null) {
                table = opt.$admin_list_wrap.DataTable(opt.config);
            } else {
                /*batchItem.clear();*/
                table.ajax.config(opt.config.ajax).load();
            }
        }


        /*查看详情*/
        function cashDetail(config) {
            if (!config) {
                return false;
            }
            var state = parseInt(config.state, 10),
                id = config.id;

            if (id === '' || typeof id === 'undefined') {
                return false;
            }
            /*设置体现状态*/
            if (state === 0) {
                /*未处理提现*/
                $admin_pispose_btn.prop({
                    'disabled': false
                }).attr({
                    'data-id': id
                });
            } else if (state === 1) {
                /*已处理提现*/
                $admin_pispose_btn.prop({
                    'disabled': true
                }).attr({
                    'data-id': ''
                });
            }


            $.ajax({
                    url: debug ? "../../json/test.json" : "http://10.0.5.226:8082/mall-buzhubms-api/finance/withdraw_deposit/details",
                    dataType: 'JSON',
                    method: 'post',
                    data: {
                        id: id,
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
                                nickName: 'value',
                                bankName: 'value',
                                cardNumber: 'card',
                                serialNumber: 'guid',
                                name: 'name',
                                phone: 'mobile',
                                amount: 'money',
                                auditStatus: 'rule,0,1,2',
                                createTime: 'datetime'
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
                            nickName: '会员名称(昵称)',
                            serialNumber: '流水号',
                            name: '真实名称',
                            phone: '手机号',
                            amount: '提现金额',
                            bankName: '提现银行',
                            cardNumber: '提现卡号',
                            auditStatus: '审核(提现)状态',
                            createTime: '提现时间'
                        };

                    if (!$.isEmptyObject(list)) {
                        /*添加高亮状态*/
                        for (var j in list) {
                            if (typeof detail_map[j] !== 'undefined') {
                                if (j === 'name') {
                                    istitle = true;
                                    $show_detail_title.html('查看"<span class="g-c-info">' + list[j] + '</span>"提现详情');
                                } else if (j === 'auditStatus') {
                                    var statemap = {
                                        0: '<div class="g-c-red1">待审核(未处理)</div>',
                                        1: '<div class="g-c-green1">审核通过(历史提现)</div>',
                                        2: '<div class="g-c-orange1">审核驳回</div>'
                                    };
                                    str += '<tr><th>' + detail_map[j] + ':</th><td>' + statemap[parseInt(list[j], 10)] + '</td></tr>';
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
            var type = config.type,
                isdata = true;

            if (type === 'base') {
                /*单个处理*/
                if (config.id === '' || typeof config.id === 'undefined') {
                    isdata = false;
                }
            } else if (type === 'batch') {
                return false;
                /*批量处理*/
                /*var batchdata = batchItem.getBatchData();
                 if (batchdata.length === 0 || !batchdata) {
                 isdata = false;
                 }屏蔽批量*/
            }

            if (!isdata) {
                dia.content('<span class="g-c-bs-warning g-btips-warn">' + ("请先选择相关操作数据") + '</span>').show();
                return false;
            }

            setSure.sure('', function (cf) {
                /*是否选择了状态*/
                var tip = cf.dia,
                    temp_config = {
                        roleId: decodeURIComponent(logininfo.param.roleId),
                        adminId: decodeURIComponent(logininfo.param.adminId),
                        grade: decodeURIComponent(logininfo.param.grade),
                        token: decodeURIComponent(logininfo.param.token)
                    };

                if (type === 'base') {
                    /*单个处理*/
                    temp_config['id'] = config.id;
                } else if (type === 'batch') {
                    /*批量处理*/
                    /*temp_config['id'] = batchdata.join(',');屏蔽批量*/
                }


                $.ajax({
                        url: debug ? "../../json/test.json" : "http://10.0.5.226:8082/mall-buzhubms-api/finance/withdraw_deposit",
                        dataType: 'JSON',
                        method: 'post',
                        data: temp_config
                    })
                    .done(function (resp) {
                        if (debug) {
                            var resp = testWidget.testSuccess('list');
                        }
                        var code = parseInt(resp.code, 10);
                        if (code !== 0) {
                            console.log(resp.message);
                            tip.content('<span class="g-c-bs-warning g-btips-warn">' + (resp.message || "处理提现失败") + '</span>').show();
                            if (type === 'batch') {
                                /*batchItem.clear();*/
                            }
                            setTimeout(function () {
                                tip.close();
                                if (config.modal) {
                                    /*绑定关闭详情*/
                                    $show_detail_wrap.modal('hide');
                                }
                            }, 2000);
                            return false;
                        }
                        /*是否是正确的返回数据*/
                        tip.content('<span class="g-c-bs-success g-btips-succ">处理提现成功</span>').show();
                        if (type === 'batch') {
                            /*batchItem.clear();*/
                        }
                        setTimeout(function () {
                            tip.close();
                            getColumnData(cash_config);
                            if (config.modal) {
                                /*绑定关闭详情*/
                                $show_detail_wrap.modal('hide');
                            }
                        }, 1000);
                    })
                    .fail(function (resp) {
                        console.log(resp.message);
                        tip.content('<span class="g-c-bs-warning g-btips-warn">' + (resp.message || "处理提现失败") + '</span>').show();
                        if (type === 'batch') {
                            /*batchItem.clear();*/
                        }
                        setTimeout(function () {
                            tip.close();
                            if (config.modal) {
                                /*绑定关闭详情*/
                                $show_detail_wrap.modal('hide');
                            }
                        }, 2000);
                    });

            }, type === 'base' ? "是否真需要处理提现?" : "是否真需要批量处理提现?", true);
        }

    });


})(jQuery);