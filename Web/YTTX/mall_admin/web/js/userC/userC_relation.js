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


            /*权限调用*/
            var powermap = public_tool.getPower(),
                forbid_power = public_tool.getKeyPower('userC-forbid', powermap),
                enable_power = public_tool.getKeyPower('userC-enable', powermap),
                edit_power = public_tool.getKeyPower('userC-edit', powermap),
                detail_power = public_tool.getKeyPower('userC-detail', powermap);

            /*dom引用和相关变量定义*/
            var debug = true,
                module_id = 'bzw-userC-relation'/*模块id，主要用于本地存储传值*/,
                $admin_list_wrap = $('#admin_list_wrap'),
                $admin_page_wrap = $('#admin_page_wrap'),
                page_config = {
                    page: 1,
                    pageSize: 10,
                    total: 0
                },
                subconfig = {
                    adminId: decodeURIComponent(logininfo.param.adminId),
                    token: decodeURIComponent(logininfo.param.token),
                    pageSize: 10000
                }/*子菜单配置对象*/,
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
                sureObj = public_tool.sureDialog(dia)/*回调提示对象*/,
                setSure = new sureObj(),
                operate_item = null;


            /*新增类弹出框*/
            var $addgoodstype_wrap = $('#addgoodstype_wrap'),
                admin_addgoodstype_form = document.getElementById('admin_addgoodstype_form'),
                $admin_addgoodstype_form = $(admin_addgoodstype_form),
                $admin_typeparentname = $('#admin_typeparentname'),
                $admin_typeparentlayer = $('#admin_typeparentlayer'),
                $admin_typecode = $('#admin_typecode'),
                $admin_typename = $('#admin_typename'),
                $admin_typesort = $('#admin_typesort'),
                $admin_typeremark = $('#admin_typeremark'),
                $admin_typeshow = $('#admin_typeshow'),
                $admin_typeimage = $('#admin_typeimage'),
                operate_current = null;


            /*重置表单*/
            admin_addgoodstype_form.reset();

            /*批量配置*/
            simulationBatch.config({
                ismutil: true, /*多全选*/
                selector: '>li'/*选择器*/
            });

            /*请求属性数据*/
            requestAttr(page_config);


            /*绑定操作分类列表*/
            $admin_list_wrap.on('click', function (e) {
                var target = e.target,
                    nodename = target.nodeName.toLowerCase(),
                    $this,
                    $li,
                    $wrap,
                    label,
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
                            /*to do*/
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
                        layer = $li.attr('data-layer');
                        $wrap = $li.find('>ul');

                        var isload = parseInt($this.attr('data-loadsub'), 10);
                        if (isload === 0) {
                            /*加载子分类*/
                            var subitem = doSubAttr(id);
                            if (subitem !== null) {
                                var subtype = doAttr(subitem, {
                                    limit: 2,
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
                    /*绑定全选*/
                    if (target.className.indexOf('simulation-batch-check-all') !== -1) {
                        /*操作*/
                        $this = $(target);
                        $li = $this.closest('li');
                        /*执行操作*/
                        simulationBatch.onAll($this, $li.find('>ul'));
                    }
                }
            });


            /*绑定关闭弹出层*/
            $.each([$addgoodstype_wrap], function () {
                this.on('hide.bs.modal', function () {
                    emptyGoodsTypeData();
                });
            });


            /*绑定非数字输入*/
            $.each([$admin_typesort], function () {
                this.on('keyup', function () {
                    this.value = this.value.replace(/\D*/g, '');
                });
            });


            /*绑定添加地址*/
            /*表单验证*/
            if ($.isFunction($.fn.validate)) {
                /*配置信息*/
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
                                            /*请求数据*/
                                            requestAttr(page_config);
                                            setTimeout(function () {
                                                dia.close();
                                                $addgoodstype_wrap.modal('hide');
                                                /*重置数据*/
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
                                        /*重置数据*/
                                        admin_addgoodstype_form.reset();
                                        emptyGoodsTypeData();
                                    }, 2000);
                                });
                                return false;
                            }
                        });
                    });

                }


                /*提交验证*/
                if (resetform0 === null) {
                    resetform0 = $admin_addgoodstype_form.validate(form_opt0);
                }

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
                        } else if (type === 'batch') {
                            //batchItem.clear();
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
                            //batchItem.clear();
                        }
                        setTimeout(function () {
                            //requestAttr(page_config);
                            /*getColumnData(user_page, user_config);*/
                        }, 1000);
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
                    } else if (type === 'batch') {
                        //batchItem.clear();
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
            /*变更input*/
            $item.eq(0).find('input').attr({
                'data-status': cstatus
            });
            if (operate_item) {
                operate_item.attr({
                    'data-status': cstatus
                }).removeClass('item-lighten');
                operate_item = null;
            }
        }


        /*删除操作*/
        function goodsTypeDelete(obj) {
            var id = obj.id;

            if (typeof id === 'undefined' || id === '') {
                return false;
            }
            var tip = obj.tip,
                $li = obj.$li;

            $.ajax({
                    url: "http://10.0.5.226:8082/mall-buzhubms-api/goodstype/delete",
                    dataType: 'JSON',
                    method: 'post',
                    data: {
                        ids: obj.id,
                        roleId: decodeURIComponent(logininfo.param.roleId),
                        adminId: decodeURIComponent(logininfo.param.adminId),
                        grade: decodeURIComponent(logininfo.param.grade),
                        token: decodeURIComponent(logininfo.param.token)
                    }
                })
                .done(function (resp) {
                    var code = parseInt(resp.code, 10);
                    if (code !== 0) {
                        console.log(resp.message);
                        tip.content('<span class="g-c-bs-warning g-btips-warn">' + (resp.message || "操作失败") + '</span>').show();
                        setTimeout(function () {
                            tip.close();
                            if (operate_item) {
                                operate_item.removeClass('item-lighten');
                                operate_item = null;
                            }
                        }, 2000);
                        return false;
                    }
                    tip.content('<span class="g-c-bs-success g-btips-succ">删除成功</span>').show();
                    setTimeout(function () {
                        tip.close();
                        setTimeout(function () {
                            operate_item = null;
                            $li.remove();
                        }, 1000);
                    }, 1000);
                })
                .fail(function (resp) {
                    console.log(resp.message);
                    tip.content('<span class="g-c-bs-warning g-btips-warn">' + (resp.message || "操作失败") + '</span>').show();
                    setTimeout(function () {
                        tip.close();
                        if (operate_item) {
                            operate_item.removeClass('item-lighten');
                            operate_item = null;
                        }
                    }, 2000);
                });
        }

        /*编辑操作*/
        function goodsTypeEdit(obj) {
            var id = obj.id;

            if (typeof id === 'undefined' || id === '') {
                return false;
            }
            var tip = obj.tip,
                $li = obj.$li,
                result = obj.result,
                param = {
                    id: obj.id,
                    name: result[0],
                    sort: result[2],
                    isVisible: parseInt(result[3], 10) === 1 ? true : false,
                    roleId: decodeURIComponent(logininfo.param.roleId),
                    adminId: decodeURIComponent(logininfo.param.adminId),
                    grade: decodeURIComponent(logininfo.param.grade),
                    token: decodeURIComponent(logininfo.param.token)
                };

            if (result[1] !== '') {
                param['imageUrl'] = result[1];
            }
            $.ajax({
                    url: "http://10.0.5.226:8082/mall-buzhubms-api/goodstype/update",
                    dataType: 'JSON',
                    method: 'post',
                    data: param
                })
                .done(function (resp) {
                    var code = parseInt(resp.code, 10);
                    if (code !== 0) {
                        console.log(resp.message);
                        tip.content('<span class="g-c-bs-warning g-btips-warn">' + (resp.message || "操作失败") + '</span>').show();
                        setTimeout(function () {
                            tip.close();
                            if (operate_item) {
                                operate_item.removeClass('item-lighten');
                                operate_item = null;
                            }
                        }, 2000);
                        return false;
                    }
                    tip.content('<span class="g-c-bs-success g-btips-succ">编辑成功</span>').show();
                    /*更新数据*/
                    updateGoodsTypeDataByEdit($li);
                    setTimeout(function () {
                        /*释放内存*/
                        if (operate_current !== null) {
                            operate_current = null;
                        }
                        tip.close();
                        setTimeout(function () {
                            if (operate_item) {
                                operate_item.removeClass('item-lighten');
                                operate_item = null;
                                $li.removeClass('typeitem-editwrap');
                            }
                        }, 1000);
                    }, 1000);
                })
                .fail(function (resp) {
                    console.log(resp.message);
                    tip.content('<span class="g-c-bs-warning g-btips-warn">' + (resp.message || "操作失败") + '</span>').show();
                    setTimeout(function () {
                        tip.close();
                        if (operate_item) {
                            operate_item.removeClass('item-lighten');
                            operate_item = null;
                        }
                    }, 2000);
                });
        }

        /*新增分类*/
        function goodsTypeAdd(config) {
            /*重置表单*/
            admin_addgoodstype_form.reset();
            /*初始化设置值*/
            /*设置数据*/
            $admin_typeparentname.attr({
                'data-value': config.parentid
            }).html(config.label);
            $admin_typeparentlayer.html(config.layer + '级分类');
            $addgoodstype_wrap.modal('show', {
                backdrop: 'static'
            });
        }

        /*验证数据状态(编辑状态)*/
        function validGoodsTypeData($li) {
            var $edit = $li.find('>.typeitem-edit'),
                $edititem = $edit.find('.typeitem'),
                i = 0,
                len = 4,
                result = [];

            for (i; i < len; i++) {
                var $item = $edititem.eq(i),
                    value = '';
                if (i === 0 || i === 2) {
                    value = $item.find('input').val();
                } else if (i === 1) {
                    value = $item.find('.typeitem-preview').attr('data-value');
                } else if (i === 3) {
                    value = $item.find(':checked').val();
                }
                if (i === 1) {
                    /*设置图片（可为空）*/
                    if (value === '' || typeof value === 'undefined') {
                        result.push('');
                        break;
                    } else {
                        result.push(value);
                    }
                } else {
                    if (value === '' || typeof value === 'undefined') {
                        tipsGoodsTypeError($admin_errortip_wrap, i);
                        break;
                    } else {
                        result.push(value);
                    }
                }
            }
            if (result.length !== len) {
                return null;
            } else {
                return result;
            }
        }

        /*验证提示信息(编辑状态)*/
        function tipsGoodsTypeError($wrap, type) {
            if (!$wrap) {
                $wrap = $admin_errortip_wrap;
            }
            var tips = '';
            if (type === 0) {
                tips = '分类名称没有填写';
            } else if (type === 1) {
                tips = '没有上传分类图标图片';
            } else if (type === 2) {
                tips = '排序不能为空';
            } else if (type === 3) {
                tips = '没有选中显示状态';
            }
            $wrap.html(tips);
            setTimeout(function () {
                $wrap.html('');
            }, 3000);
        }

        /*清空表单数据*/
        function emptyGoodsTypeData(type) {
            $admin_typeimage.attr({
                'data-image': ''
            }).html('');
        }

        /*恢复默认(原来)数据(编辑状态)*/
        function resetGoodsTypeData($li) {
            var $edit = $li.find('>.typeitem-edit'),
                $edititem = $edit.find('.typeitem'),
                i = 0,
                len = 4;

            /*清除上传配置信息*/
            if (operate_current !== null) {
                operate_current = null;
            }

            for (i; i < len; i++) {
                var $item = $edititem.eq(i),
                    oldvalue = '',
                    $this;
                if (i === 0 || i === 2) {
                    $this = $item.find('input');
                    oldvalue = $this.attr('data-value');
                    $this.val(oldvalue);
                } else if (i === 1) {
                    $this = $item.find('.typeitem-preview');
                    oldvalue = $this.attr('data-value');
                    var $show = $this.prev();
                    if ($this.hasClass('typeitem-preview-active')) {
                        $show.trigger('click');
                    }
                    if ($show.attr('data-value') !== oldvalue) {
                        $this.find('img').attr({
                            'src': oldvalue
                        });
                        $show.attr({
                            'data-value': oldvalue
                        });
                    }
                } else if (i === 3) {
                    oldvalue = $item.attr('data-value');
                    $item.find('input').each(function () {
                        $this = $(this);
                        var tempvalue = $this.val();
                        if (tempvalue === oldvalue) {
                            $this.prop({
                                'checked': true
                            });
                            return false;
                        }
                    });
                }
            }
        }

        /*更新原来值(编辑状态)*/
        function updateGoodsTypeDataByEdit($li) {
            var $showwrap = $li.find('>.typeitem-default'),
                $editwrap = $li.find('>.typeitem-edit'),
                $showitem = $showwrap.find('.typeitem'),
                $edititem = $editwrap.find('.typeitem'),
                i = 0,
                len = 4,
                issub = $li.hasClass('admin-subtypeitem');

            for (i; i < len; i++) {
                var $curitem = $edititem.eq(i),
                    newvalue,
                    $this;

                if (i === 0) {
                    $this = $curitem.find('input');
                    newvalue = $this.val();
                    $this.attr({
                        'data-value': newvalue
                    });
                    if (issub) {
                        $showitem.eq(1).html(newvalue);
                    } else {
                        $showitem.eq(0).html(newvalue);
                    }
                } else if (i === 2) {
                    $this = $curitem.find('input');
                    newvalue = $this.val();
                    $this.attr({
                        'data-value': newvalue
                    });
                    if (issub) {
                        $showitem.eq(2).html(newvalue);
                    } else {
                        $showitem.eq(1).html(newvalue);
                    }
                } else if (i === 3) {
                    $this = $curitem.find(':checked');
                    newvalue = parseInt($this.val(), 10);
                    $curitem.attr({
                        'data-value': newvalue
                    });
                    if (issub) {
                        if (newvalue === 0) {
                            $showitem.eq(3).html('<div class="g-c-gray12">隐藏</div>');
                        } else if (newvalue === 1) {
                            $showitem.eq(3).html('<div class="g-c-gray8">显示</div>');
                        }
                    } else {
                        if (newvalue === 0) {
                            $showitem.eq(2).html('<div class="g-c-gray12">隐藏</div>');
                        } else if (newvalue === 1) {
                            $showitem.eq(2).html('<div class="g-c-gray8">显示</div>');
                        }
                    }
                }
            }
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
                    if (hassub) {
                        str += doItems(curitem, {
                                flag: true,
                                limit: limit,
                                layer: layer,
                                parentid: ''
                            }) + '<ul class="admin-typeitem-wrap admin-subtype-wrap g-d-hidei"></ul></li>';
                    } else {
                        str += doItems(curitem, {
                            flag: false,
                            limit: limit,
                            layer: layer,
                            parentid: ''
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
                    if (hassub) {
                        str += doItems(curitem, {
                                flag: true,
                                limit: limit,
                                layer: layer,
                                parentid: parentid
                            }) + '<ul class="admin-typeitem-wrap admin-subtype-wrap g-d-hidei"></ul></li>';
                    } else {
                        str += doItems(curitem, {
                            flag: false,
                            limit: limit,
                            layer: layer,
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
                flag = config.flag,
                limit = config.limit,
                layer = config.layer,
                parentid = config.parentid;


            /*限制最后一层出现下拉按钮*/
            if (layer >= limit) {
                flag = false;
            }


            if (flag) {
                /*存在下级则显示按钮*/
                if (layer === 1) {
                    str = '<li class="admin-subtypeitem" data-parentid="' + parentid + '" data-status="' + status + '" data-label="' + label + '" data-layer="' + layer + '" data-id="' + id + '" data-phone="' + phone + '"><div class="typeitem-default"><div class="typeitem g-w-percent4"><div class="simulation-batch-check simulation-batch-check-all" data-status="' + status + '" data-check="0" data-id="' + id + '"></div></div>';
                } else {
                    str = '<li data-label="' + label + '" data-parentid="' + parentid + '" data-status="' + status + '" data-layer="' + layer + '" data-id="' + id + '" data-phone="' + phone + '"><div class="typeitem-default"><div class="typeitem g-w-percent4"><div class="simulation-batch-check simulation-batch-check-all"  data-check="0"  data-status="' + status + '" data-id="' + id + '"></div></div>';
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
                    str = '<li data-label="' + label + '" data-parentid="' + parentid + '" data-status="' + status + '" data-layer="' + layer + '" data-id="' + id + '" data-phone="' + phone + '"><div class="typeitem-default"><div class="typeitem g-w-percent4"></div>';
                } else {
                    str = '<li data-label="' + label + '" data-parentid="' + parentid + '" data-status="' + status + '" data-layer="' + layer + '" data-id="' + id + '" data-phone="' + phone + '"><div class="typeitem-default"><div class="typeitem g-w-percent4"><div class="simulation-batch-check simulation-batch-check-item" data-check="0"  data-status="' + status + '" data-id="' + id + '"></div></div>';
                }

                if (layer > 1) {
                    str += '<div class="typeitem subtype-pgap' + layer + ' g-w-percent10">' + label + '</div>';
                } else {
                    str += '<div class="typeitem g-w-percent10">' + label + '</div>';
                }
            }


            (status === 0) ? str += '<div class="typeitem g-w-percent8">' + public_tool.phoneFormat(phone) + '</div><div class="typeitem g-w-percent5">' + layer + '级</div><div class="typeitem g-c-info g-w-percent8">启用(正常)</div>' : str += '<div class="typeitem g-w-percent8">' + public_tool.phoneFormat(phone) + '</div><div class="typeitem g-w-percent5">' + layer + '级</div><div class="typeitem g-c-gray10 g-w-percent8">禁用(锁定)</div>';


            str += '<div class="typeitem g-w-percent12">';


            if (forbid_power && status === 0) {
                /*正常则禁用*/
                str += '<span data-parentid="' + parentid + '"  data-action="forbid" data-status="' + status + '"  data-id="' + id + '"  class="btn btn-white btn-icon btn-xs g-br2 g-c-gray8">\
							<i class="fa-toggle-off"></i>&nbsp;&nbsp;禁用(锁定)\
						</span>';
            }
            if (enable_power && status === 1) {
                /*禁用则正常*/
                str += '<span data-parentid="' + parentid + '"  data-action="enable" data-status="' + status + '"  data-id="' + id + '"  class="btn btn-white btn-icon btn-xs g-br2 g-c-gray8">\
							<i class="fa-toggle-on"></i>&nbsp;&nbsp;启用(正常)\
						</span>';
            }

            if (edit_power) {
                str += '<span data-parentid="' + parentid + '" data-status="' + status + '" data-action="edit"  data-id="' + id + '"  class="btn btn-white btn-icon btn-xs g-br2 g-c-gray8">\
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
            subconfig['parentId'] = id;
            $.ajax({
                    url: debug ? "../../json/test.json" : "http://10.0.5.226:8082/mall-buzhubms-api/goodstype/list",
                    dataType: 'JSON',
                    async: false,
                    method: 'post',
                    data: subconfig
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
                    url: debug ? "../../json/test.json" : "http://10.0.5.226:8082/mall-buzhubms-api/goodstype/list",
                    dataType: 'JSON',
                    async: false,
                    method: 'post',
                    data: {
                        parentId: '',
                        roleId: decodeURIComponent(logininfo.param.roleId),
                        adminId: decodeURIComponent(logininfo.param.adminId),
                        grade: decodeURIComponent(logininfo.param.grade),
                        token: decodeURIComponent(logininfo.param.token),
                        page: config.page,
                        pageSize: config.pageSize
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
                                    requestAttr({
                                        pageSize: pageSize,
                                        page: pageNumber,
                                        total: config.total
                                    });
                                }
                            });
                        } else {
                            config.total = 0;
                        }
                        if (result.list) {
                            /*解析属性*/
                            var str = '<ul class="admin-typeitem-wrap admin-maintype-wrap">' + resolveAttr(result.list, 2) + '</ul>';
                            if (str) {
                                $(str).appendTo($admin_list_wrap.html(''));
                            } else {
                                $admin_list_wrap.addClass('g-t-c').html('暂无数据');
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

    });


})(jQuery);