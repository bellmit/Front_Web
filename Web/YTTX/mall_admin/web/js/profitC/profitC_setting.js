(function ($) {
    'use strict';
    $(function () {

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

            /*dom引用和相关变量定义*/
            var debug = false,
                module_id = 'bzw-profitC-setting'/*模块id，主要用于本地存储传值*/;


            /*权限调用*/
            var powermap = public_tool.getPower(350),
                setting_power = public_tool.getKeyPower('bzw-profitC-list', powermap)/*设置*/;

            /*基本变量定义*/
            var request_config = {
                    adminId: decodeURIComponent(logininfo.param.adminId),
                    token: decodeURIComponent(logininfo.param.token)
                },
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
                sureObj = public_tool.sureDialog(dia)/*回调提示对象*/,
                setSure = new sureObj();


            /*编辑对象*/
            var $admin_commission1 = $('#admin_commission1'),
                $admin_commission2 = $('#admin_commission2'),
                $admin_commission3 = $('#admin_commission3'),
                $admin_commissionExtra1 = $('#admin_commissionExtra1'),
                $admin_commissionExtra2 = $('#admin_commissionExtra2'),
                $admin_commissionExtra3 = $('#admin_commissionExtra3'),
                $profit_setting_btn = $('#profit_setting_btn'),
                relation_list = [$admin_commission1, $admin_commission2, $admin_commission3, $admin_commissionExtra1, $admin_commissionExtra2, $admin_commissionExtra3];


            /*绑定设置限制值输入*/
            $.each([$admin_commission1, $admin_commission2, $admin_commission3, $admin_commissionExtra1, $admin_commissionExtra2, $admin_commissionExtra3], function (index) {
                this.on('keyup focusout', function (e) {
                    var etype = e.type,
                        self = this,
                        data;

                    if (etype === 'keyup') {
                        data = self.value.replace(/\D*/g, '');
                        self.value = data;
                    } else if (etype === 'focusout') {
                        data = self.value;
                        if (data === '' || isNaN(data)) {
                            self.value = 0;
                            return false;
                        }
                        if (data > 100) {
                            data = 100;
                        }
                        /*处理关联关系值*/
                        relationData(data, index);
                    }
                }).val(0);
            });

            /*请求属性数据*/

            /*绑定提交编辑*/
            /*$show_edit_btn.on('click', function () {
             var $this = $(this),
             shUserId = $this.attr('data-id'),
             parentId = $this.attr('data-parentid');

             if (shUserId !== '' && parentId !== '') {
             $.ajax({
             url: debug ? "../../json/test.json" : "http://10.0.5.226:8082/mall-buzhubms-api/shuser/hierarchy/update",
             dataType: 'JSON',
             async: false,
             method: 'post',
             data: {
             adminId: request_config.adminId,
             token: request_config.token,
             shUserId: shUserId,
             parentId: parentId
             }
             })
             .done(function (resp) {
             if (debug) {
             var resp = testWidget.testSuccess('list');
             }
             var code = parseInt(resp.code, 10);
             if (code !== 0) {
             dia.content('<span class="g-c-bs-warning g-btips-warn">' + (resp.message || "编辑失败") + '</span>').show();
             return false;
             }
             dia.content('<span class="g-c-bs-success g-btips-succ">编辑成功</span>').show();
             /!*请求属性数据*!/
             requestAttr(request_config);
             /!*重置值*!/
             setTimeout(function () {
             dia.close();
             $show_edit_wrap.modal('hide');
             }, 2000);

             })
             .fail(function (resp) {
             console.log(resp.message);
             dia.content('<span class="g-c-bs-warning g-btips-warn">' + (resp.message || "编辑失败") + '</span>').show();
             });
             }
             });*/
        }


        /*请求属性*/
        function requestEditInfo(value) {
            $.ajax({
                    url: debug ? "../../json/test.json" : "http://10.0.5.226:8082/mall-buzhubms-api/shuser/getinfo",
                    dataType: 'JSON',
                    async: false,
                    method: 'post',
                    data: {
                        adminId: request_config.adminId,
                        token: request_config.token,
                        phone: value
                    }
                })
                .done(function (resp) {
                    if (debug) {
                        if (debug) {
                            var resp = testWidget.testSuccess('list');
                            resp.result = testWidget.getMap({
                                map: {
                                    id: 'guid',
                                    nickname: 'value',
                                    phone: 'mobile',
                                    gender: 'rule,0,1,2',
                                    birthday: 'datetime',
                                    createTime: 'datetime',
                                    lastLoginTime: 'datetime',
                                    loginTimes: 'id',
                                    status: 'rule,0,1'
                                },
                                maptype: 'object'
                            }).list;
                        }
                    }
                    var code = parseInt(resp.code, 10);
                    if (code !== 0) {
                        toggleEditQuery();
                        return false;
                    }
                    var result = resp.result;
                    if (result) {
                        /*解析属性*/
                        toggleEditQuery(result['nickname'], result['id']);
                    } else {
                        toggleEditQuery();
                    }
                })
                .fail(function (resp) {
                    console.log(resp.message);
                    dia.content('<span class="g-c-bs-warning g-btips-warn">' + (resp.message || "操作失败") + '</span>').show();
                });
        }


        /*关联属性处理*/
        function relationData(value, index) {
            var i = 0,
                current_value = 0/*当前循环值*/,
                item = 0,
                len = 6,
                standard = 0/*标准值*/,
                count = 0/*其余求和值*/,
                old_value,
                new_value;
            if (value >= 100) {
                /*设置100时其他为0*/
                for (i; i < len; i++) {
                    if (i !== index) {
                        relation_list[i].val(0);
                    } else {
                        relation_list[i].val(100);
                    }
                }
            } else if (value < 100) {
                /*非100时*/
                standard = 100 - value;
                for (i; i < len; i++) {
                    /*先计算其他值，确定其他值范围*/
                    if (i !== index) {
                        current_value = parseInt(relation_list[i].val(), 10);
                        if (current_value >= standard) {
                            relation_list[i].val(standard);
                            standard = 0;
                        } else if (current_value < standard) {
                            new_value = standard - current_value;
                            relation_list[i].val(new_value)/*设置最近满100的值*/;
                            standard = current_value;
                        }
                    } else {
                        relation_list[i].val(value)/*设置新增*/;
                    }
                }
            }
        }

    });
})(jQuery);