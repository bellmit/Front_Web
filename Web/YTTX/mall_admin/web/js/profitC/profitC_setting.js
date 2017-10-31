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
                module_id = 'bzw-userC-relation'/*模块id，主要用于本地存储传值*/,
                $search_nickName = $('#search_nickName');


            /*权限调用*/
            var powermap = public_tool.getPower(350),
                setting_power = public_tool.getKeyPower('profitC-setting', powermap)/*设置*/;

            /*基本变量定义*/
            var $admin_list_wrap = $('#admin_list_wrap'),
                $admin_page_wrap = $('#admin_page_wrap'),
                request_config = {
                    adminId: decodeURIComponent(logininfo.param.adminId),
                    token: decodeURIComponent(logininfo.param.token),
                    parentId: user_cache.id,
                    page: 1,
                    pageSize: 10,
                    total: 0
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
            var $show_edit_wrap = $('#show_edit_wrap'),
                $show_edit_btn = $('#show_edit_btn'),
                $show_edit_phone = $('#show_edit_phone');




            /*请求属性数据*/




            /*格式化手机号码*/
            $show_edit_phone.on('keyup focusout', function (e) {
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
                        toggleEditQuery();
                        return false;
                    }
                    /*格式化显示*/
                    this.value = public_tool.phoneFormat(this.value);
                    /*查询新用户*/
                    requestEditInfo(public_tool.trims(this.value));
                }
            });

            /*绑定提交编辑*/
            $show_edit_btn.on('click', function () {
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
                            /*请求属性数据*/
                            requestAttr(request_config);
                            /*重置值*/
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
            });
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
                    }else{
                        toggleEditQuery();
                    }
                })
                .fail(function (resp) {
                    console.log(resp.message);
                    dia.content('<span class="g-c-bs-warning g-btips-warn">' + (resp.message || "操作失败") + '</span>').show();
                });
        }

    });
})(jQuery);