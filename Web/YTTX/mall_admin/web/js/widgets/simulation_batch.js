/*批量组件*/
;(function ($) {
    'use strict';
    /*基本缓存*/
    var cache_check = {}/*存放全选配置*/,
        cache_check_list = []/*存放全选数据*/,
        cache_check_node = []/*存放全选节点*/


    /*构造函数*/
    function SimulationBatch() {
    }

    /*子类*/
    function SubSimulationBatch() {
    }

    /*空函数*/
    function nofn() {
    }


    /**/

    /*初始化函数*/
    SimulationBatch.prototype.init = function (opt) {
        var self = this;
        $.extend(true, this, {
            showactive: 'admin-batchitem-showactive',
            checkactive: 'admin-batchitem-checkactive',
            highactive: 'item-lightenbatch',
            $batchtoggle: null,
            $batchshow: null,
            $checkall: null,
            $action: null,
            istable: false,
            isstate: false,
            fn: null,
            powerobj: null,
            $listwrap: null
        }, opt);

        var index = config.index,
            checkfn = (config.doCheck && typeof config.doCheck === 'function') ? true : false;
        /*绑定全选*/
        cache_check[index].on('click', function () {
            var $this = $(this),
                tempstate = parseInt($this.attr('data-check'), 10),
                value = (tempstate === 0) ? 1 : 0;
            /*选中*/
            $this.attr({
                'data-check': value
            });
            if (tempstate === 0) {
                $this.addClass('admin-batchitem-checkactive');
            } else if (tempstate === 1) {
                /*取消选中*/
                $this.removeClass('admin-batchitem-checkactive');
            }
            /*执行全选*/
            toggleCheckAll({
                index: index,
                check: value
            });
            /*执行回调*/
            if (checkfn) {
                config.doCheck.call(null, {
                    index: index, /*索引*/
                    check: value/*是否选中状态*/
                });
            }
        });
        /*绑定单项选择*/
        cache_body[index].on('change', 'input[type="checkbox"]', function () {
            var $this = $(this);
            toggleCheckItem({
                index: index,
                check: $this
            });
            /*执行回调*/
            if (checkfn) {
                config.doCheck.call(null, {
                    index: index,
                    check: $this
                });
            }
        });
    };


    

    /*全选和取消全选*/
    SimulationBatch.prototype.toggleCheckAll = function (config) {
        var check = parseInt(config.check, 10),
            index = config.index;
        if (check === 1) {
            /*选中*/
            /*不依赖于状态*/
            cache_body[index].find('tr').each(function (index, element) {
                var $tr = $(element),
                    $input = $tr.children().eq(0).find('input:checkbox');
                if ($input.size() !== 0) {
                    cache_check_list.push($input.prop('checked', true).val());
                    cache_check_node.push($input);
                    $tr.removeClass('item-lighten').addClass('item-lightenbatch');
                }
            });
        } else if (check === 0) {
            /*取消选中*/
            clearCheck(index);
        }
    };

    /*绑定选中某个单独多选框*/
    SimulationBatch.prototype.toggleCheckItem = function (config) {
        var index = config.index,
            $input = config.check;

        var len = cache_check_list.length,
            ishave = -1,
            text = $input.val();

        if ($input.is(':checked')) {
            /*选中*/
            if (len === 0) {
                cache_check_list.push(text);
                cache_check_node.push($input);
                $input.closest('tr').removeClass('item-lighten').addClass('item-lightenbatch');
                cache_check[index].attr({
                    'data-check': 1
                }).addClass('admin-batchitem-checkactive');
            } else {
                ishave = $.inArray(text, cache_check_list);
                $input.closest('tr').removeClass('item-lighten').addClass('item-lightenbatch');
                if (ishave !== -1) {
                    cache_check_list.splice(ishave, 1, text);
                    cache_check_node.splice(ishave, 1, $input);
                } else {
                    cache_check_list.push(text);
                    cache_check_node.push($input);
                }
            }
        } else {
            /*取消选中*/
            ishave = $.inArray(text, cache_check_list);
            if (ishave !== -1) {
                cache_check_list.splice(ishave, 1);
                cache_check_node[ishave].closest('tr').removeClass('item-lighten item-lightenbatch');
                cache_check_node.splice(ishave, 1);
                if (cache_check_list.length === 0) {
                    clearCheck(index);
                }
            }
        }
    };

    /*获取选中的数据*/
    SimulationBatch.prototype.getBatchData = function () {
        return cache_check_node;
    };

    /*获取选中的文档节点*/
    SimulationBatch.prototype.getCheckNode = function () {
        return cache_check_node;
    };


    /*清除选中数据*/
    SimulationBatch.prototype.clearCheck=function (index, fn) {
        cache_check_list.length = 0;
        if (cache_check[index]) {
            cache_check[index].attr({
                'data-check': 0
            }).removeClass('admin-batchitem-checkactive');

            /*清除选中*/
            var len = cache_check_node.length;
            if (len !== 0) {
                var i = 0;
                for (i; i < len; i++) {
                    cache_check_node[i].closest('tr').removeClass('item-lighten item-lightenbatch');
                    cache_check_node[i].prop('checked', false);
                }
            }
        }
        cache_check_node.length = 0;
        if (fn && typeof fn === 'function') {
            fn.call();
        }
    };

    /*摧毁数据:适应直接清除数据，不做文档操作*/
    SimulationBatch.prototype.destroyCheck=function (index, fn) {
        cache_check_list.length = 0;
        cache_check_node.length = 0;
        if (cache_check[index]) {
            cache_check[index].attr({
                'data-check': 0
            }).removeClass('admin-batchitem-checkactive');
        }
        if (fn && typeof fn === 'function') {
            fn.call();
        }
    };


    /*过滤数据(清除并过滤已经选中的数据)*/
    SimulationBatch.prototype.filterCheck=function (config) {
        /*清除选中*/
        var index = config.index,
            key = config.key,
            fn = config.fn,
            len = cache_check_list.length;
        if (len !== 0 && typeof key !== 'undefined') {
            if ($.isArray(key)) {
                var j = 0,
                    jlen = key.length,
                    k = 0,
                    klen = cache_check_node.length;

                outer:for (j; j < jlen; j++) {
                    for (k; k < klen; k++) {
                        if (cache_check_list[k] === key[j]) {
                            _updateCheckData_(k);
                            k = 0;
                            klen = cache_check_list.length;
                            continue outer;
                        }
                    }
                }
                if (cache_check_list.length === 0) {
                    clearCheck(index);
                    /*执行回调*/
                    if (fn && typeof fn === 'function') {
                        fn.call(null, 0);
                    }
                }
            } else {
                var i = len - 1;
                for (i; i >= 0; i--) {
                    if (cache_check_list[i] === key) {
                        _updateCheckData_(i);
                        break;
                    }
                }
                if (cache_check_list.length === 0) {
                    clearCheck(index);
                    /*执行回调*/
                    if (fn && typeof fn === 'function') {
                        fn.call(null, 0);
                    }
                }
            }
        }
    };


    /*过滤数据(清除并过滤已经选中的数据)，依赖状态*/
    SimulationBatch.prototype.filterStateCheck=function(config) {
        var index = config.index,
            attrkey/*需要比对的属性*/,
            attrvalue/*需要比对的属性值*/,
            isgroup = false,
            ismutil = false,
            len = cache_check_node.length,
            i,
            $input,
            data_key,
            data_value;

        if (len === 0) {
            return '';
        }
        /*,分割多个组合条件，#分割多个值*/
        if (config.attrkey.indexOf(',') !== -1) {
            attrkey = config.attrkey.split(',');
            attrvalue = (function () {
                var tempvalue = config.attrvalue.split(','),
                    templen = tempvalue.length,
                    k = 0;
                for (k; k < templen; k++) {
                    if (tempvalue.indexOf('#') !== -1) {
                        tempvalue.splice(k, 1, (function () {
                            var tempmutil = tempvalue[k].split('#'),
                                p = 0,
                                mutillen = tempmutil.length;
                            for (p; p < mutillen; p++) {
                                tempmutil.splice(p, 1, parseInt(tempmutil[p], 10));
                            }
                            return tempmutil;
                        }()));
                    } else {
                        tempvalue.splice(k, 1, parseInt(tempvalue[k], 10));
                    }
                }
                return tempvalue;
            }());
            isgroup = true;
        } else {
            attrkey = config.attrkey;
            attrvalue = (function () {
                if (config.attrvalue.indexOf('#') !== -1) {
                    var tempmutil = config.attrvalue.split('#'),
                        p = 0,
                        mutillen = tempmutil.length;
                    for (p; p < mutillen; p++) {
                        tempmutil.splice(p, 1, parseInt(tempmutil[p], 10));
                    }
                    return tempmutil;
                } else {
                    return parseInt(config.attrvalue, 10);
                }
            }())
        }
        i = len - 1;
        if (isgroup) {
            /*关联多个状态*/
            for (i; i >= 0; i--) {
                /*遍历所选数据列:array类型*/
                $input = cache_check_node[i];
                (function () {
                    var j = 0,
                        sublen = attrkey.length;

                    for (j; j < sublen; j++) {
                        /*遍历attrkey所提供组合属性，array类型*/
                        data_key = $input.attr('data-' + attrkey[j]);
                        if (typeof data_key !== 'undefined' && data_key !== '') {
                            /*存在属性值*/
                            data_value = attrvalue[j];
                            if (typeof data_value !== 'undefined' && data_value !== '') {
                                /*标准值*/
                                data_key = parseInt(data_key, 10);
                                if ($.isArray(data_value)) {
                                    ismutil = _mutilCheckData_(data_value, data_key);
                                    if (ismutil) {
                                        _updateCheckData_(i);
                                        break;
                                    }
                                } else if (data_value !== data_key) {
                                    /*数据不匹配则过滤调*/
                                    _updateCheckData_(i);
                                    break;
                                }
                            } else {
                                _updateCheckData_(i);
                                break;
                            }
                        } else {
                            /*不存在则直接过滤掉*/
                            _updateCheckData_(i);
                            break;
                        }
                    }
                }());
            }
        } else {
            /*单个状态*/
            for (i; i >= 0; i--) {
                $input = cache_check_node[i];
                data_value = $input.attr('data-' + attrkey);
                if (typeof data_value !== 'undefined' && data_value !== '') {
                    data_value = parseInt(data_value, 10);
                    /*数据不匹配则过滤调*/
                    if ($.isArray(attrvalue)) {
                        ismutil = _mutilCheckData_(attrvalue, data_value);
                        if (ismutil) {
                            _updateCheckData_(i);
                        }
                    } else if (data_value !== attrvalue) {
                        _updateCheckData_(i);
                    }
                } else {
                    _updateCheckData_(i);
                }
            }
        }
        /*没有数据则恢复默认状态*/
        if (cache_check_list.length === 0) {
            cache_check[index].attr({
                'data-check': 0
            }).removeClass('admin-batchitem-checkactive');
            return '';
        }
        return getCheckData();
    }

    /*渲染注册全选操作*/
    function _renderCheck_(config) {
        if (config) {
            var index = config.index,
                checkfn = (config.doCheck && typeof config.doCheck === 'function') ? true : false;
            /*绑定全选*/
            cache_check[index].on('click', function () {
                var $this = $(this),
                    tempstate = parseInt($this.attr('data-check'), 10),
                    value = (tempstate === 0) ? 1 : 0;
                /*选中*/
                $this.attr({
                    'data-check': value
                });
                if (tempstate === 0) {
                    $this.addClass('admin-batchitem-checkactive');
                } else if (tempstate === 1) {
                    /*取消选中*/
                    $this.removeClass('admin-batchitem-checkactive');
                }
                /*执行全选*/
                toggleCheckAll({
                    index: index,
                    check: value
                });
                /*执行回调*/
                if (checkfn) {
                    config.doCheck.call(null, {
                        index: index, /*索引*/
                        check: value/*是否选中状态*/
                    });
                }
            });
            /*绑定单项选择*/
            cache_body[index].on('change', 'input[type="checkbox"]', function () {
                var $this = $(this);
                toggleCheckItem({
                    index: index,
                    check: $this
                });
                /*执行回调*/
                if (checkfn) {
                    config.doCheck.call(null, {
                        index: index,
                        check: $this
                    });
                }
            });
        }
    };

    /*更新全选缓存*/
    function _updateCheckData_(value) {
        cache_check_node[value].closest('tr').removeClass('item-lightenbatch');
        cache_check_node[value].prop('checked', false);
        cache_check_node.splice(value, 1);
        cache_check_list.splice(value, 1);
    }

    /*匹配多值，返回false则不匹配，返回true则匹配*/
    function _mutilCheckData_(arr, str) {
        if (typeof arr === 'undefined') {
            /*不匹配*/
            return false;
        }
        var mutil_len = arr.length,
            m = 0;

        if (mutil_len === 0) {
            /*不匹配*/
            return false;
        } else {
            for (m; m < mutil_len; m++) {
                if (arr[m] === str) {
                    /*匹配*/
                    return true;
                }
                if (m === mutil_len - 1) {
                    /*全部不匹配*/
                    return false;
                }
            }
        }
    }


    /*设置继承*/
    nofn.prototype = SimulationBatch.prototype;
    SubSimulationBatch.prototype = new nofn();

    /*设置地址对外接口*/
    if (public_tool) {
        public_tool['SimulationBatch'] = SubSimulationBatch;
    } else {
        window['SimulationBatch'] = SubSimulationBatch;
    }
})(jQuery);