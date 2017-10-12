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
                audit_power = public_tool.getKeyPower('bzw-finance-cardmanage-audit', powermap)/*审核权限*/;


            /*dom引用和相关变量定义*/
            var debug = false/*是否测试模式*/,
                $admin_list_wrap = $('#admin_list_wrap')/*表格*/,
                module_id = 'bzw-finance-cardmanage'/*模块id，主要用于本地存储传值*/,
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
                $show_audit_wrap = $('#show_audit_wrap')/*详情容器*/,
                $show_audit_content = $('#show_audit_content'), /*详情内容*/
                $show_audit_title = $('#show_audit_title'),
                $admin_audit_btn = $('#admin_audit_btn'),
                sureObj = public_tool.sureDialog(dia)/*回调提示对象*/,
                setSure = new sureObj(),
                operate_item = null;


            /*查询对象*/
            var $search_auditStatus = $('#search_auditStatus'),
                $search_name = $('#search_name'),
                $search_phone = $('#search_phone'),
                $admin_search_btn = $('#admin_search_btn'),
                $admin_search_clear = $('#admin_search_clear');


            /*列表请求配置*/
            var card_page = {
                    page: 1,
                    pageSize: 10,
                    total: 0
                },
                card_config = {
                    $admin_list_wrap: $admin_list_wrap,
                    $admin_page_wrap: $admin_page_wrap,
                    config: {
                        processing: true, /*大消耗操作时是否显示处理状态*/
                        deferRender: true, /*是否延迟加载数据*/
                        autoWidth: true, /*是否*/
                        paging: false,
                        ajax: {
                            url: debug ? "../../json/test.json" : "http://10.0.5.226:8082/mall-buzhubms-api/finance/bank_card/list",
                            dataType: 'JSON',
                            method: 'post',
                            dataSrc: function (json) {
                                if (debug) {
                                    var json = testWidget.test({
                                        map: {
                                            id: 'guid',
                                            nickName: 'value',
                                            phone: 'mobile',
                                            name: 'name',
                                            cardNumber: 'card',
                                            bankName: 'text',
                                            auditStatus: 'rule,0,1,2'
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
                                card_page.page = result.page;
                                card_page.pageSize = result.pageSize;
                                card_page.total = result.count;
                                /*分页调用*/
                                $admin_page_wrap.pagination({
                                    pageSize: card_page.pageSize,
                                    total: card_page.total,
                                    pageNumber: card_page.page,
                                    onSelectPage: function (pageNumber, pageSize) {
                                        /*再次查询*/
                                        var param = card_config.config.ajax.data;
                                        param.page = pageNumber;
                                        param.pageSize = pageSize;
                                        card_config.config.ajax.data = param;
                                        getColumnData(card_config);
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
                                "data": "nickName"
                            },
                            {
                                "data": "phone",
                                "render": function (data, type, full, meta) {
                                    return public_tool.phoneFormat(data);
                                }
                            },
                            {
                                "data": "name"
                            },

                            {
                                "data": "cardNumber",
                                "render": function (data, type, full, meta) {
                                    return public_tool.cardFormat(data);
                                }
                            },
                            {
                                "data": "bankName"
                            },
                            {
                                "data": "auditStatus",
                                "render": function (data, type, full, meta) {
                                    var stauts = parseInt(data, 10),
                                        statusmap = {
                                            0: '<div class="g-c-red1">待审核</div>',
                                            1: '<div class="g-c-green1">审核通过</div>',
                                            2: '<div class="g-c-orange1">审核驳回</div>'
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

                                    if (audit_power && state !== 1) {
                                        btns += '<span data-action="audit" data-id="' + id + '" class="btn btn-white btn-icon btn-xs g-br2 g-c-gray8">\
                                            <i class="fa-check"></i>\
                                            <span>审核</span>\
										</span>';
                                    }
                                    return btns;
                                }
                            }
                        ]
                    }
                };


            /*初始化请求*/
            getColumnData(card_config);


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
                var data = $.extend(true, {}, card_config.config.ajax.data);

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
                card_config.config.ajax.data = $.extend(true, {}, data);
                getColumnData(card_config);
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

                if (action === 'audit') {
                    /*弹出审核*/
                    showAudit(id);
                }
            });

            /*绑定关闭详情*/
            $show_audit_wrap.on('hide.bs.modal', function () {
                if (operate_item) {
                    setTimeout(function () {
                        operate_item.removeClass('item-lighten');
                        operate_item = null;
                    }, 1000);
                }
            });


            /*绑定详情提现处理*/
            $admin_audit_btn.on('click', function () {
                cardAudit($admin_audit_btn.attr('data-id'));
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


        /**/
        function showAudit(id) {
            if (id === '' || typeof id === 'undefined') {
                return false;
            }
            if (operate_item === null) {
                return false;
            }
            /*未处理提现*/
            $admin_audit_btn.attr({
                'data-id': id
            });
            var list = table.row(operate_item).data(),
                str = '',
                istitle = false,
                detail_map = {
                    id: '序列',
                    nickName: '会员名称(昵称)',
                    serialNumber: '流水号',
                    name: '真实名称',
                    phone: '手机号',
                    amount: '提现金额',
                    bankName: '所属银行',
                    cardNumber: '卡号',
                    auditStatus: '审核状态',
                    createTime: '提现时间'
                },
                isaudit = true;

            if (!$.isEmptyObject(list)) {
                /*添加高亮状态*/
                for (var j in list) {
                    if (typeof detail_map[j] !== 'undefined') {
                        if (j === 'name') {
                            istitle = true;
                            $show_audit_title.html('审核"<span class="g-c-info">' + list[j] + '</span>"银行卡信息');
                        } else if (j === 'auditStatus') {
                            var statemap = {
                                0: '<div class="g-c-red1">待审核(未处理)</div>',
                                1: '<div class="g-c-green1">审核通过(历史提现)</div>',
                                2: '<div class="g-c-orange1">审核驳回</div>'
                            };
                            str += '<tr><th>' + detail_map[j] + ':</th><td>' + statemap[parseInt(list[j], 10)] + '</td></tr>';
                        } else if (j === 'phone') {
                            isaudit = public_tool.isMobilePhone(list[j] || '');
                            if (!isaudit) {
                                str += '<tr><th>' + ':</th><td>' + public_tool.phoneFormat(public_tool.trims(list[j] || '')) + detail_map[j] + '<span class="g-gap-ml2 g-c-red1">不合法</span></td></tr>';
                            } else {
                                str += '<tr><th>' + detail_map[j] + ':</th><td>' + public_tool.phoneFormat(public_tool.trims(list[j] || '')) + '<span class="g-gap-ml2 g-c-green1">正确</span></td></tr>';
                            }
                        } else if (j === 'cardNumber') {
                            isaudit = public_tool.isBankCard(list[j] || '');
                            if (!isaudit) {
                                str += '<tr><th>' + detail_map[j] + ':</th><td>' + public_tool.cardFormat(public_tool.trims(list[j] || '')) + '<span class="g-gap-ml2 g-c-red1">不正确</span></td></tr>';
                            } else {
                                str += '<tr><th>' + detail_map[j] + ':</th><td>' + public_tool.cardFormat(public_tool.trims(list[j] || '')) + '<span class="g-gap-ml2 g-c-green1">正确</span></td></tr>';
                            }
                        } else {
                            str += '<tr><th>' + detail_map[j] + ':</th><td>' + list[j] + '</td></tr>';
                        }
                    } else {
                        str += '<tr><th>' + j + ':</th><td>' + list[j] + '</td></tr>';
                    }
                }
                if (!isaudit) {
                    $admin_audit_btn.prop({
                        'disabled': true
                    }).attr({
                        'data-id': ''
                    });
                }
                if (!istitle) {
                    $show_audit_title.html('审核银行卡信息');
                }
                $(str).appendTo($show_audit_content.html(''));
                $show_audit_wrap.modal('show', {backdrop: 'static'});
            }
        }


        /*提现处理*/
        function cardAudit(id) {
            if (id === '' || typeof id === 'undefined') {
                return false;
            }
            setSure.sure('', function (cf) {
                /*是否选择了状态*/
                var tip = cf.dia,
                    temp_config = {
                        roleId: decodeURIComponent(logininfo.param.roleId),
                        adminId: decodeURIComponent(logininfo.param.adminId),
                        grade: decodeURIComponent(logininfo.param.grade),
                        token: decodeURIComponent(logininfo.param.token),
                        id:id
                    };


                $.ajax({
                        url: debug ? "../../json/test.json" : "http://10.0.5.226:8082/mall-buzhubms-api/finance/bank_card/audit",
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
                            tip.content('<span class="g-c-bs-warning g-btips-warn">' + (resp.message || "银行卡审核失败") + '</span>').show();
                            setTimeout(function () {
                                tip.close();
                                $admin_audit_btn.prop({
                                    'disabled': false
                                }).attr({
                                    'data-id': ''
                                });
                                if (operate_item !== null) {
                                    operate_item.removeClass('item-light');
                                    operate_item = null;
                                    /*绑定关闭审核弹窗*/
                                    $show_audit_wrap.modal('hide');
                                }
                            }, 2000);
                            return false;
                        }
                        /*是否是正确的返回数据*/
                        tip.content('<span class="g-c-bs-success g-btips-succ">银行卡审核成功</span>').show();
                        setTimeout(function () {
                            tip.close();
                            $admin_audit_btn.prop({
                                'disabled': false
                            }).attr({
                                'data-id': ''
                            });
                            /*绑定关闭审核弹窗*/
                            $show_audit_wrap.modal('hide');
                            getColumnData(card_config);
                        }, 1000);
                    })
                    .fail(function (resp) {
                        console.log(resp.message);
                        tip.content('<span class="g-c-bs-warning g-btips-warn">' + (resp.message || "银行卡审核失败") + '</span>').show();
                        setTimeout(function () {
                            tip.close();
                            $admin_audit_btn.prop({
                                'disabled': false
                            }).attr({
                                'data-id': ''
                            });
                            if (operate_item !== null) {
                                operate_item.removeClass('item-light');
                                operate_item = null;
                                /*绑定关闭审核弹窗*/
                                $show_audit_wrap.modal('hide');
                            }

                        }, 2000);
                    });

            }, "确认审核银行卡?", true);
        }

    });


})(jQuery);