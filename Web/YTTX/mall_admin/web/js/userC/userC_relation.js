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
            var debug = true,
                module_id = 'bzw-userC-relation'/*模块id，主要用于本地存储传值*/,
                $search_nickName = $('#search_nickName');


            /*获取供应商信息*/
            var user_cache = public_tool.getParams('bzw-userC-relation');
            /*{id,nickname,status}*/
            if (user_cache && typeof user_cache.id !== 'undefined') {
                /*显示查询条件*/
                $search_nickName.html('<div class="inline g-f-l">用户名称：<span class="g-c-info">' + user_cache.nickname + '</span></div>');

                /*权限调用*/
                var powermap = public_tool.getPower(),
                    forbid_power = public_tool.getKeyPower('userC-forbid', powermap),
                    enable_power = public_tool.getKeyPower('userC-enable', powermap),
                    edit_power = public_tool.getKeyPower('userC-edit', powermap),
                    detail_power = public_tool.getKeyPower('userC-detail', powermap);

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
                    $admin_errortip_wrap = $('#admin_errortip_wrap'),
                    resetform0 = null,
                    $admin_batchitem_action = $('#admin_batchitem_action'),
                    sureObj = public_tool.sureDialog(dia)/*回调提示对象*/,
                    setSure = new sureObj(),
                    operate_item = null,
                    mobile_bind = false;

                /*查询对象*/
                var $search_searchColumn = $('#search_searchColumn'),
                    $search_searchContent = $('#search_searchContent'),
                    $search_level = $('#search_level'),
                    $admin_search_btn = $('#admin_search_btn'),
                    $admin_search_clear = $('#admin_search_clear');

                /*编辑对象*/
                var $show_edit_wrap = $('#show_edit_wrap'),
                    $show_audit_info=$('#show_audit_info'),
                    $show_audit_content = $('#show_audit_content'),
                    $show_edit_btn = $('#show_edit_btn'),
                    $show_edit_phone=$('#show_edit_phone'),
                    $show_edit_name=$('#show_edit_name');


                /*清空查询条件*/
                $admin_search_clear.on('click', function () {
                    $.each([$search_searchColumn, $search_searchContent, $search_level], function () {
                        var selector = this.selector;
                        if (selector.indexOf('level') !== -1) {
                            /*处理非空查询*/
                            var $level = $(this).find('option:first-child');
                            $level.prop({
                                'selected': true
                            });
                            request_config['level'] = $level.val();
                        } else {
                            this.val('');
                        }
                    });
                }).trigger('click');

                /*联合查询*/
                $admin_search_btn.on('click', function () {
                    var data = $.extend(true, {}, request_config);
                    $.each([$search_searchColumn, $search_level], function () {
                        var text = this.val(),
                            selector = this.selector.slice(1),
                            key = selector.split('_'),
                            isColumn = selector.indexOf('Column') !== -1;

                        if (isColumn) {
                            /*关联类型和关键字*/
                            var content = public_tool.trims($search_searchContent.val());
                            if (text !== "" && content !== '') {
                                request_config[key[1]] = text;
                                request_config['searchContent'] = content;
                            } else {
                                delete request_config['searchColumn'];
                                delete request_config['searchContent'];
                            }
                        } else {
                            if (text === "") {
                                if (typeof request_config[key[1]] !== 'undefined') {
                                    delete request_config[key[1]];
                                }
                            } else {
                                request_config[key[1]] = text;
                            }
                        }
                    });
                    requestAttr(request_config);
                });
                /*绑定切换查询类型和查询关键字关联查询*/
                $search_searchColumn.on('change', function () {
                    var value = this.value;
                    /*切换绑定内容限制*/
                    if (value !== '') {
                        value = parseInt(value, 10);
                        if (value === 1) {
                            /*昵称*/
                            /*取消绑定手机事件*/
                            if (mobile_bind) {
                                $search_searchContent.removeAttr('maxlength').off('keyup focusout');
                                mobile_bind = false;
                            }
                        } else if (value === 2) {
                            /*手机号*/
                            /*绑定手机处理事件*/
                            $search_searchContent.val('');
                            if (mobile_bind) {
                                /*已经绑定则不绑定*/
                                return false;
                            }
                            /*格式化手机号码*/
                            $search_searchContent.attr({
                                'maxlength': 13
                            }).on('keyup focusout', function (e) {
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
                            mobile_bind = true;
                        }
                    } else {
                        $search_searchContent.val('');
                    }
                });


                /*批量配置*/
                simulationBatch.config({
                    ismutil: true, /*多全选*/
                    selector: '>li', /*查找列表子节点选择器*/
                    parent: 'li', /*回溯列表节点选择器*/
                    isself: true/*是否全选本身也参与数据处理*/
                });

                /*请求属性数据*/
                requestAttr(request_config);


                /*绑定操作分类列表*/
                $admin_list_wrap.on('click', function (e) {
                    var target = e.target,
                        nodename = target.nodeName.toLowerCase(),
                        $this,
                        $li,
                        label,
                        $wrap,
                        index,
                        id,
                        parentid,
                        layer,
                        action;

                    if (nodename === 'td' || nodename === 'tr' || nodename === 'ul' || nodename === 'li') {
                        return false;
                    }

                    /*点击分支*/
                    if (nodename === 'span' || nodename === 'i') {
                        var actionmap = {
                                "forbid": 2,
                                "enable": 1
                            },
                            actiontip = {
                                "forbid": '禁用',
                                "enable": '启用'
                            };

                        if (nodename === 'i') {
                            target = target.parentNode;
                        }
                        if (target.className.indexOf('btn') !== -1) {
                            /*操作*/
                            $this = $(target);
                            $li = $this.closest('li');
                            id = $li.attr('data-id');
                            action = $this.attr('data-action');
                            parentid = $this.attr('data-parentid');
                            layer = $li.attr('data-layer');

                            if (operate_item) {
                                operate_item.removeClass('item-lighten');
                                operate_item = null;
                            }
                            operate_item = $li.addClass('item-lighten');
                            /*执行操作*/
                            if (action === 'edit') {
                                /*进入编辑状态*/
                                $show_edit_wrap.modal('show', {backdrop: 'static'});
                            } else if (action === 'forbid' || action === 'enable') {
                                /*禁用*/
                                /*to do*/
                                /*确认是否启用或禁用*/
                                setSure.sure(actiontip[action], function (cf) {
                                    /*to do*/
                                    setEnabled({
                                        id: id,
                                        action: action,
                                        $btn: $this,
                                        tip: cf.dia || dia,
                                        type: 'base',
                                        actiontip: actiontip,
                                        actionmap: actionmap
                                    });
                                }, action === 'forbid' ? "禁用后，该用户将不再能使用该账号，是否禁用？" : "启用后，该用户将能使用该账号，是否启用？", true);
                            }
                        } else if (target.className.indexOf('main-typeicon') !== -1) {
                            /*展开或收缩*/
                            $this = $(target);
                            $li = $this.closest('li');
                            id = $li.attr('data-id');
                            label = $li.attr('data-label');
                            layer = $li.attr('data-layer');
                            index = $li.attr('data-index');
                            $wrap = $li.find('>ul');

                            var isload = parseInt($this.attr('data-loadsub'), 10);
                            if (isload === 0) {
                                /*加载子分类*/
                                var subitem = doSubAttr(id);
                                if (subitem !== null) {
                                    var subtype = doAttr(subitem, {
                                        limit: 2,
                                        index: index,
                                        parentlabel: label,
                                        layer: layer,
                                        parentid: id
                                    });
                                    if (subtype) {
                                        $(subtype).appendTo($wrap);
                                        /*设置已经加载*/
                                        $this.attr({
                                            'data-loadsub': 1
                                        });
                                        subtype = null;
                                    }
                                }
                            }
                            $this.toggleClass('main-sub-typeicon');
                            $wrap.toggleClass('g-d-hidei');
                        }
                        return false;
                    } else if (nodename === 'div') {
                        if (target.className.indexOf('simulation-batch-check-all') !== -1) {
                            /*绑定全选*/
                            $this = $(target);
                            $li = $this.closest('li');
                            /*执行操作*/
                            simulationBatch.bindMutilAll({
                                $checkall: $this,
                                $wrap: $li.find('>ul')
                            });
                        } else if (target.className.indexOf('simulation-batch-check-item') !== -1) {
                            /*绑定子选项*/
                            $this = $(target);
                            index = $this.attr('data-index');
                            $wrap = $admin_list_wrap.find('>li').eq(index).find('div.simulation-batch-check-all');


                            /*执行操作*/
                            simulationBatch.bindMutilItem({
                                $input: $this,
                                $checkall: $wrap
                            });
                        }
                    }
                });


                /*绑定关闭弹出层*/
                $.each([$show_edit_wrap], function () {
                    this.on('hide.bs.modal', function () {
                        if(operate_item!==null){
                            operate_item.removeClass('item-lighten');
                            operate_item=null;
                        }
                    });
                });


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
                            return false;
                        }
                        /*查询新用户*/
                        requestEditInfo(this.value);
                        /*格式化显示*/
                        this.value = public_tool.phoneFormat(this.value);
                    }
                });

                /*绑定批量操作*/
                $admin_batchitem_action.on('click', function (e) {
                    var target = e.target,
                        nodename = target.nodeName.toLowerCase(),
                        $this,
                        action,
                        key,
                        len,
                        value,
                        ids;

                    if (nodename === 'div') {
                        return false;
                    } else if (nodename === 'span' || nodename === 'i') {
                        ids = simulationBatch.getList();
                        len = ids.length;
                        if (len === 0) {
                            dia.content('<span class="g-c-bs-warning g-btips-warn">请选中操作数据</span>').show();
                            setTimeout(function () {
                                dia.close();
                            }, 2000);
                            return false;
                        }
                        $this = $(target);
                        action = $this.attr('data-action');
                        key = $this.attr('data-attrkey');
                        value = $this.attr('data-attrvalue');
                        ids = simulationBatch.filterStatus({
                            attrkey: key,
                            attrvalue: value,
                            action: action
                        });
                        if (ids !== '') {
                            var actionmap = {
                                    "forbid": 2,
                                    "enable": 1
                                },
                                actiontip = {
                                    "forbid": '禁用',
                                    "enable": '启用'
                                };


                            if (action === 'forbid' || action === 'enable') {
                                /*确认是否启用或禁用*/
                                setSure.sure(actiontip[action], function (cf) {
                                    /*to do*/
                                    setEnabled({
                                        id: ids,
                                        action: action,
                                        tip: cf.dia || dia,
                                        type: 'batch',
                                        actiontip: actiontip,
                                        actionmap: actionmap
                                    });
                                }, action === 'forbid' ? "禁用后，该用户将不再能使用该账号，是否批量禁用？" : "启用后，该用户将能使用该账号，是否批量启用？", true);
                            }
                        }
                    }
                });



                /*表单验证*/
                /*if ($.isFunction($.fn.validate)) {
                    /!*配置信息*!/
                    var form_opt0 = {},
                        formcache = public_tool.cache,
                        basedata = {
                            roleId: decodeURIComponent(logininfo.param.roleId),
                            adminId: decodeURIComponent(logininfo.param.adminId),
                            grade: decodeURIComponent(logininfo.param.grade),
                            token: decodeURIComponent(logininfo.param.token)
                        };


                    if (formcache.form_opt_0) {
                        $.each([formcache.form_opt_0], function (index) {
                            var formtype,
                                config = {
                                    dataType: 'JSON',
                                    method: 'post'
                                };
                            if (index === 0) {
                                formtype = 'addgoodstype';
                            }
                            $.extend(true, (function () {
                                if (formtype === 'addgoodstype') {
                                    return form_opt0;
                                }
                            }()), (function () {
                                if (formtype === 'addgoodstype') {
                                    return formcache.form_opt_0;
                                }
                            }()), {
                                submitHandler: function (form) {
                                    var setdata = {};

                                    $.extend(true, setdata, basedata);

                                    if (formtype === 'addgoodstype') {
                                        var imgurl = $admin_typeimage.attr('data-image');

                                        $.extend(true, setdata, {
                                            name: $admin_typename.val(),
                                            parentId: $admin_typeparentname.attr('data-value'),
                                            gtCode: $admin_typecode.val(),
                                            sort: $admin_typesort.val(),
                                            isVisible: parseInt($admin_typeshow.find(':checked').val(), 10) === 1 ? true : false,
                                            imageUrl: imgurl,
                                            remark: $admin_typeremark.val()
                                        });
                                        config['url'] = "http://10.0.5.226:8082/mall-buzhubms-api/goodstype/add";
                                        config['data'] = setdata;
                                    }

                                    $.ajax(config).done(function (resp) {
                                        var code;
                                        if (formtype === 'addgoodstype') {
                                            code = parseInt(resp.code, 10);
                                            if (code !== 0) {
                                                dia.content('<span class="g-c-bs-warning g-btips-warn">添加分类失败</span>').show();
                                                return false;
                                            } else {
                                                dia.content('<span class="g-c-bs-success g-btips-succ">添加分类成功</span>').show();
                                                /!*请求数据*!/
                                                requestAttr(request_config);
                                                setTimeout(function () {
                                                    dia.close();
                                                    $addgoodstype_wrap.modal('hide');
                                                    /!*重置数据*!/
                                                    admin_addgoodstype_form.reset();
                                                    emptyGoodsTypeData();
                                                }, 2000);
                                            }
                                        }
                                    }).fail(function (resp) {
                                        console.log('error');
                                        dia.content('<span class="g-c-bs-warning g-btips-warn">添加分类失败</span>').show();
                                        setTimeout(function () {
                                            dia.close();
                                            $addgoodstype_wrap.modal('hide');
                                            /!*重置数据*!/
                                            admin_addgoodstype_form.reset();
                                            emptyGoodsTypeData();
                                        }, 2000);
                                    });
                                    return false;
                                }
                            });
                        });

                    }


                    /!*提交验证*!/
                    if (resetform0 === null) {
                        resetform0 = $admin_addgoodstype_form.validate(form_opt0);
                    }

                }*/

            }
        }

        /*启用禁用*/
        function setEnabled(obj) {
            var id = obj.id;

            if (typeof id === 'undefined') {
                return false;
            }
            var type = obj.type,
                tip = obj.tip,
                action = obj.action;
            if (type === 'batch') {
                id = id.join(',');
            }

            $.ajax({
                    url: debug ? "../../json/test.json" : "http://10.0.5.226:8082/mall-buzhubms-api/shuser/operate",
                    dataType: 'JSON',
                    method: 'post',
                    data: {
                        shUserIds: id,
                        operate: obj.actionmap[action],
                        roleId: decodeURIComponent(logininfo.param.roleId),
                        adminId: decodeURIComponent(logininfo.param.adminId),
                        grade: decodeURIComponent(logininfo.param.grade),
                        token: decodeURIComponent(logininfo.param.token)
                    }
                })
                .done(function (resp) {
                    if (debug) {
                        var resp = testWidget.testSuccess('list');
                    }
                    var code = parseInt(resp.code, 10);
                    if (code !== 0) {
                        console.log(resp.message);
                        tip.content('<span class="g-c-bs-warning g-btips-warn">' + (resp.message || "操作失败") + '</span>').show();
                        if (type === 'base') {
                            if (operate_item) {
                                operate_item.removeClass('item-lighten');
                                operate_item = null;
                            }
                        }
                        setTimeout(function () {
                            tip.close();
                        }, 2000);
                        return false;
                    }
                    /*是否是正确的返回数据*/
                    /*添加高亮状态*/
                    tip.content('<span class="g-c-bs-success g-btips-succ">' + obj.actiontip[action] + '成功</span>').show();
                    setTimeout(function () {
                        tip.close();
                        if (type === 'base') {
                            updateStatus(obj.$btn);
                        } else if (type === 'batch') {
                            updateBatchStatus(action);
                        }
                    }, 1000);
                })
                .fail(function (resp) {
                    console.log(resp.message);
                    tip.content('<span class="g-c-bs-warning g-btips-warn">' + (resp.message || "操作失败") + '</span>').show();
                    if (type === 'base') {
                        if (operate_item) {
                            operate_item.removeClass('item-lighten');
                            operate_item = null;
                        }
                    }
                    setTimeout(function () {
                        tip.close();
                    }, 2000);
                });
        }


        /*更新状态*/
        function updateStatus($btn) {
            if (!$btn) {
                return;
            }
            var status = parseInt($btn.attr('data-status'), 10),
                cstatus,
                caction,
                cvalue,
                castyle,
                cdstyle,
                cstr;

            if (status === 0) {
                /*正常(可用)-->锁定(禁用)*/
                cstatus = 1;
                caction = 'enable';
                cvalue = '禁用(锁定)';
                cstr = '<i class="fa-toggle-on"></i>&nbsp;&nbsp;启用(正常)';
                castyle = 'g-c-gray10';
                cdstyle = 'g-c-info';
                operate_item.attr({
                    'data-status': 1
                }).removeClass('item-lighten');
            } else if (status === 1) {
                /*锁定(禁用)-->正常(可用)*/
                cstatus = 0;
                caction = 'forbid';
                cvalue = '启用(正常)';
                castyle = 'g-c-info';
                cdstyle = 'g-c-gray10';
                cstr = '<i class="fa-toggle-off"></i>&nbsp;&nbsp;禁用(锁定)';
            }

            /*变更按钮*/
            $btn.attr({
                'data-status': cstatus,
                'data-action': caction
            }).html(cstr);
            var $item = $btn.closest('div.typeitem-default').find('>div');

            /*变更状态*/
            $item.eq(4).removeClass(cdstyle).addClass(castyle).html(cvalue);

            /*清除批量*/
            simulationBatch.clear();

            /*改变状态*/
            $item.eq(0).find('.simulation-batch-check').attr({
                'data-status': cstatus
            });
            if (operate_item) {
                operate_item.attr({
                    'data-status': cstatus
                }).removeClass('item-lighten');
                operate_item = null;
            }
        }

        /*批量更新状态*/
        function updateBatchStatus(action) {
            var datalist = simulationBatch.getNode(),
                nodelist = simulationBatch.getParent(),
                len = datalist.length,
                i = len - 1,
                $btn,
                $item,
                item,
                status,
                cstatus,
                caction,
                cvalue,
                castyle,
                cdstyle,
                cstr;

            for (i; i >= 0; i--) {
                item = datalist[i];
                status = parseInt(item.attr('data-status'), 10);
                if (status === 0) {
                    /*正常(可用)-->锁定(禁用)*/
                    cstatus = 1;
                    caction = 'enable';
                    cvalue = '禁用(锁定)';
                    cstr = '<i class="fa-toggle-on"></i>&nbsp;&nbsp;启用(正常)';
                    castyle = 'g-c-gray10';
                    cdstyle = 'g-c-info';
                } else if (status === 1) {
                    /*锁定(禁用)-->正常(可用)*/
                    cstatus = 0;
                    caction = 'forbid';
                    cvalue = '启用(正常)';
                    castyle = 'g-c-info';
                    cdstyle = 'g-c-gray10';
                    cstr = '<i class="fa-toggle-off"></i>&nbsp;&nbsp;禁用(锁定)';
                }
                $item = item.closest('div.typeitem-default').find('>div');
                $btn = $item.eq(5).find("span[data-action='" + action + "']");
                /*变更按钮*/
                $btn.attr({
                    'data-status': cstatus,
                    'data-action': caction
                }).html(cstr);

                /*变更状态*/
                $item.eq(4).removeClass(cdstyle).addClass(castyle).html(cvalue);
                /*清除全选按钮*/
                item.attr({
                    'data-status': cstatus,
                    'data-check': 0
                }).removeClass('simulation-batch-check-active');
                /*清除高亮*/
                nodelist[i].removeClass('item-lighten item-lightenbatch');
            }
            /*清除批量:因为状态已更新，所以不需要处理文档，因此直接调摧毁方法*/
            simulationBatch.destroy();
        }


        /*解析属性--开始解析*/
        function resolveAttr(obj, limit) {
            if (!obj || typeof obj === 'undefined') {
                return false;
            }
            if (typeof limit === 'undefined' || limit <= 0) {
                limit = 1;
            }

            var attrlist = obj,
                str = '',
                i = 0,
                len = attrlist.length,
                layer = 1;

            if (len !== 0) {
                for (i; i < len; i++) {
                    var curitem = attrlist[i],
                        hassub = curitem["hasSub"];

                    /*限制最后一层出现下拉按钮*/
                    if (layer >= limit) {
                        hassub = false;
                    }

                    if (hassub) {

                        str += doItems(curitem, {
                                flag: true,
                                limit: limit,
                                index: i,
                                layer: layer,
                                parentlabel: user_cache.nickname,
                                parentid: request_config.parentId
                            }) + '<ul class="admin-typeitem-wrap admin-subtype-wrap g-d-hidei"></ul></li>';
                    } else {
                        str += doItems(curitem, {
                            flag: false,
                            limit: limit,
                            index: i,
                            layer: layer,
                            parentlabel: user_cache.nickname,
                            parentid: request_config.parentId
                        });
                    }
                }
                return str;
            } else {
                return false;
            }
        }

        /*解析属性--递归解析*/
        function doAttr(obj, config) {
            if (!obj || typeof obj === 'undefined') {
                return false;
            }
            var attrlist = obj,
                str = '',
                i = 0,
                len = attrlist.length;

            var layer = config.layer,
                limit = config.limit,
                index = config.index,
                parentlabel = config.parentlabel,
                parentid = config.parentid;
            if (typeof layer !== 'undefined') {
                layer++;
            }

            if (limit >= 1 && layer > limit) {
                return false;
            }

            if (len !== 0) {
                for (i; i < len; i++) {
                    var curitem = attrlist[i],
                        hassub = curitem["hasSub"];

                    /*限制最后一层出现下拉按钮*/
                    if (layer >= limit) {
                        hassub = false;
                    }

                    if (hassub) {
                        str += doItems(curitem, {
                                flag: true,
                                limit: limit,
                                layer: layer,
                                index: index,
                                parentlabel: parentlabel,
                                parentid: parentid
                            }) + '<ul class="admin-typeitem-wrap admin-subtype-wrap g-d-hidei"></ul></li>';
                    } else {
                        str += doItems(curitem, {
                            flag: false,
                            limit: limit,
                            layer: layer,
                            index: index,
                            parentlabel: parentlabel,
                            parentid: parentid
                        });
                    }
                }
                return str;
            } else {
                return false;
            }
        }

        /*解析属性--公共解析*/
        function doItems(obj, config) {
            var curitem = obj,
                id = curitem["id"],
                status = parseInt(curitem["status"], 10),
                phone = curitem['phone'],
                label = curitem["nickname"],
                str = '',
                index = config.index,
                parentlabel = config.parentlabel,
                flag = config.flag,
                limit = config.limit,
                layer = config.layer,
                showlayer = parseInt(request_config.level, 10) === 2 ? 2 : layer,
                parentid = config.parentid;

            if (flag) {
                /*存在下级则显示按钮*/
                if (layer === 1) {
                    str = '<li  data-index="' + index + '"  class="admin-subtypeitem" data-parentid="' + parentid + '" data-status="' + status + '" data-label="' + label + '" data-parentlabel="' + parentlabel + '"  data-layer="' + layer + '" data-id="' + id + '" data-phone="' + phone + '"><div class="typeitem-default"><div class="typeitem g-w-percent4"><div class="simulation-batch-check simulation-batch-check-all" data-index="' + index + '" data-status="' + status + '" data-check="0" data-id="' + id + '"></div></div>';
                } else {
                    str = '<li  data-index="' + index + '"  data-label="' + label + '" data-parentlabel="' + parentlabel + '"  data-parentid="' + parentid + '" data-status="' + status + '" data-layer="' + layer + '" data-id="' + id + '" data-phone="' + phone + '"><div class="typeitem-default"><div class="typeitem g-w-percent4"><div class="simulation-batch-check simulation-batch-check-all"  data-index="' + index + '" data-check="0"  data-status="' + status + '" data-id="' + id + '"></div></div>';
                }
                if (layer > 1) {
                    str += '<span data-loadsub="0" class="typeitem subtype-mgap' + (layer - 1) + ' main-typeicon g-w-percent3"></span>\
							<div class="typeitem subtype-pgap' + layer + ' g-w-percent10">' + label + '</div>';
                } else {
                    str += '<span data-loadsub="0" class="typeitem main-typeicon g-w-percent3"></span>\
							<div class="typeitem g-w-percent10">' + label + '</div>';
                }
            } else {
                /*不存在下级则不显示按钮*/
                if (layer === 1) {
                    str = '<li data-label="' + label + '" data-parentlabel="' + parentlabel + '"  data-parentid="' + parentid + '" data-status="' + status + '" data-layer="' + layer + '" data-id="' + id + '" data-phone="' + phone + '"><div class="typeitem-default"><div class="typeitem g-w-percent4"></div>';
                } else {
                    str = '<li data-label="' + label + '" data-parentlabel="' + parentlabel + '"  data-parentid="' + parentid + '" data-status="' + status + '" data-layer="' + layer + '" data-id="' + id + '" data-phone="' + phone + '"><div class="typeitem-default"><div class="typeitem g-w-percent4"><div class="simulation-batch-check simulation-batch-check-item"  data-index="' + index + '" data-check="0"  data-status="' + status + '" data-id="' + id + '"></div></div>';
                }

                if (layer > 1) {
                    str += '<div class="typeitem subtype-pgap' + layer + ' g-w-percent10">' + label + '</div>';
                } else {
                    str += '<div class="typeitem g-w-percent10">' + label + '</div>';
                }
            }


            (status === 0) ? str += '<div class="typeitem g-w-percent8">' + public_tool.phoneFormat(phone) + '</div><div class="typeitem g-w-percent5">' + showlayer + '级</div><div class="typeitem g-c-info g-w-percent8">启用(正常)</div>' : str += '<div class="typeitem g-w-percent8">' + public_tool.phoneFormat(phone) + '</div><div class="typeitem g-w-percent5">' + showlayer + '级</div><div class="typeitem g-c-gray10 g-w-percent8">禁用(锁定)</div>';


            str += '<div class="typeitem g-w-percent12">';


            if (forbid_power && status === 0) {
                /*正常则禁用*/
                str += '<span data-index="' + index + '"  data-parentid="' + parentid + '"  data-action="forbid" data-status="' + status + '"  data-id="' + id + '"  class="btn btn-white btn-icon btn-xs g-br2 g-c-gray8">\
							<i class="fa-toggle-off"></i>&nbsp;&nbsp;禁用(锁定)\
						</span>';
            }
            if (enable_power && status === 1) {
                /*禁用则正常*/
                str += '<span data-index="' + index + '" data-parentid="' + parentid + '"  data-action="enable" data-status="' + status + '"  data-id="' + id + '"  class="btn btn-white btn-icon btn-xs g-br2 g-c-gray8">\
							<i class="fa-toggle-on"></i>&nbsp;&nbsp;启用(正常)\
						</span>';
            }

            if (edit_power) {
                str += '<span data-index="' + index + '"  data-label="' + label + '" data-parentlabel="' + parentlabel + '"   data-parentid="' + parentid + '" data-phone="' + phone + '" data-status="' + status + '" data-action="edit"  data-id="' + id + '"  class="btn btn-white btn-icon btn-xs g-br2 g-c-gray8">\
							<i class="fa-pencil"></i>&nbsp;&nbsp;编辑\
						</span>';
            }

            str += '</div></div>';

            return flag ? str : str + '</li>';
        }

        /*请求并判断是否存在子菜单*/
        function doSubAttr(id) {
            var list = null;
            if (typeof id === 'undefined') {
                return null;
            }
            $.ajax({
                    url: debug ? "../../json/test.json" : "http://10.0.5.226:8082/mall-buzhubms-api/shuser/hierarchy/list",
                    dataType: 'JSON',
                    async: false,
                    method: 'post',
                    data: {
                        adminId: request_config.adminId,
                        token: request_config.token,
                        parentId: id,
                        pageSize: 1000
                    }
                })
                .done(function (resp) {
                    if (debug) {
                        var resp = testWidget.test({
                            map: {
                                id: 'sequence',
                                nickname: 'name',
                                phone: 'mobile',
                                status: 'or',
                                hasSub: 'boolean'
                            },
                            mapmin: 5,
                            mapmax: 10,
                            type: 'list'
                        });

                    }
                    var code = parseInt(resp.code, 10);
                    if (code !== 0) {
                        console.log(resp.message);
                        return null;
                    }
                    var result = resp.result;
                    if (result) {
                        list = result.list;
                        return null;
                    }
                })
                .fail(function (resp) {
                    console.log(resp.message);
                    return null;
                });
            return list.length === 0 ? null : list;
        }

        /*请求属性*/
        function requestAttr(config) {
            $.ajax({
                    url: debug ? "../../json/test.json" : "http://10.0.5.226:8082/mall-buzhubms-api/shuser/hierarchy/list",
                    dataType: 'JSON',
                    async: false,
                    method: 'post',
                    data: config
                })
                .done(function (resp) {
                    if (debug) {
                        var resp = testWidget.test({
                            map: {
                                id: 'sequence',
                                nickname: 'name',
                                phone: 'mobile',
                                status: 'or',
                                hasSub: 'boolean'
                            },
                            mapmin: 5,
                            mapmax: 10,
                            type: 'list'
                        });
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
                    var result = resp.result;
                    if (result) {
                        /*分页调用*/
                        if (result.count !== 0) {
                            config.total = result.count;
                            $admin_page_wrap.pagination({
                                pageSize: config.pageSize,
                                total: config.total,
                                pageNumber: config.page,
                                onSelectPage: function (pageNumber, pageSize) {
                                    /*再次查询*/
                                    config.pageSize = pageSize;
                                    config.page = pageNumber;
                                    requestAttr(config);
                                }
                            });
                        } else {
                            config.total = 0;
                        }
                        if (result.list) {
                            /*解析属性*/
                            var str = resolveAttr(result.list, 2);
                            if (str) {
                                $(str).appendTo($admin_list_wrap.html(''));
                            } else {
                                $admin_list_wrap.html('');
                            }
                        }
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


        /*请求属性*/
        function requestEditInfo(value) {
            $.ajax({
                    url: debug ? "../../json/test.json" : "http://10.0.5.226:8082/mall-buzhubms-api/shuser/hierarchy/list",
                    dataType: 'JSON',
                    async: false,
                    method: 'post',
                    data: {
                        adminId:request_config.adminId,
                        token:request_config.token,
                        searchColumn:2,
                        searchContent:value
                    }
                })
                .done(function (resp) {
                    if (debug) {
                        var resp = testWidget.test({
                            map: {
                                id: 'sequence',
                                nickname: 'name',
                                phone: 'mobile',
                                status: 'or',
                                hasSub: 'boolean'
                            },
                            mapmin: 5,
                            mapmax: 10,
                            type: 'list'
                        });
                    }
                    var code = parseInt(resp.code, 10);
                    if (code !== 0) {
                        toggleEditQuery('');
                        return false;
                    }
                    var result = resp.result;
                    if (result) {
                        /*分页调用*/
                        if (result.list) {
                            /*解析属性*/
                            var item=result.list[0];
                            if (item) {
                                toggleEditQuery(item['nickname'],item['id']);
                            } else {
                                toggleEditQuery('');
                            }
                        }
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

        /*切换编辑查询信息*/
        function toggleEditQuery(value,id) {
            if(value===''){
                /*hide*/
                $show_edit_name.html('');
                $show_edit_btn.addClass('g-d-hidei').attr({
                    'data-id':''
                });
            }else if(value!==''){
                /*show*/
                $show_edit_name.html(value);
                $show_edit_btn.removeClass('g-d-hidei').attr({
                    'data-id':id
                });
            }
        }

    });
})(jQuery);