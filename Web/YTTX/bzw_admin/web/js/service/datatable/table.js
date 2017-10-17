/*表格服务*/
(function ($) {
    'use strict';

    /*定义或扩展模块*/
    angular
        .module('app')
        .service('dataTableService', dataTableService);

    /*服务依赖注入*/
    //dataTableService.$inject;

    /*服务实现*/
    function dataTableService() {
        /*基本缓存*/
        var cache_sequence = {}/*缓存序列,存放table dom节点引用*/,
            cache_body = {}/*缓存序列,存放body dom节点引用*/,
            cache_colgroup = {}/*缓存序列,存放colgroup dom节点引用*/,
            cache_column = {}/*缓存序列,存放column dom操作节点引用*/,
            cache_condition = {}/*存放条件查询配置*/,
            cache_check = {}/*存放全选配置*/,
            cache_check_list = []/*存放全选数据*/,
            cache_check_node = []/*存放全选节点*/;

        /*对外接口*/
        /*基本服务类*/
        this.initTable = initTable/*初始化表格缓存*/;
        this.getTable = getTable/*获取表格缓存*/;
        this.clearTable = clearTable/*清除或更新表格缓存*/;
        this.destoryTable = destoryTable/*摧毁表格缓存*/;
        this.getTableData = getTableData/*请求数据*/;
        this.loadTableData = loadTableData/*重载或加载数据，查询条件不变，相当于重绘或重新请求*/;
        this.filterTable = filterTable/*过滤数据*/;
        this.toggleCheckAll = toggleCheckAll/*切换全选*/;
        this.toggleCheckItem = toggleCheckItem/*切换单个选项*/;
        this.getCheckData = getCheckData/*获取选中的数据*/;
        this.getCheckNode = getCheckNode/*获取选中节点*/;


        /*接口实现*/
        /*初始化表格缓存*/
        function initTable(table, fn_list) {
            /*清除缓存*/
            _clearCache_(cache_sequence)/*清除table序列*/;
            _clearCache_(cache_condition)/*清除条件序列*/;
            _clearCache_(cache_body)/*清除body序列*/;
            _clearCache_(cache_colgroup)/*清除分组序列*/;
            _clearCache_(cache_check)/*清除全选序列*/;
            cache_check_list.length = 0;
            cache_check_node.length = 0;

            /*如果有配置则配置缓存*/
            if (table) {
                /*配置dom节点引用*/
                var sequence_obj = table.sequence;
                if (sequence_obj) {
                    var j = 0,
                        sequence_len = sequence_obj.length;

                    if (typeof sequence_len !== 'undefined' && sequence_len !== 0) {
                        (function () {
                            var item,
                                index,
                                colgroup/*是否分组*/,
                                action/*是否按钮操作*/,
                                column/*是否分组控制*/,
                                check/*是否全选*/;

                            for (j; j < sequence_len; j++) {
                                item = sequence_obj[j];
                                index = item["index"];
                                colgroup = item["colgroup"];
                                action = item["action"];
                                check = item["check"];
                                column = item["column"];

                                /*缓存table节点*/
                                cache_sequence[index] = $('#admin_list_table' + index);

                                /*缓存colgroup节点*/
                                if (colgroup) {
                                    cache_colgroup[index] = $('#admin_list_colgroup' + index);
                                }

                                /*缓存body节点*/
                                if (action) {
                                    cache_body[index] = $('#admin_list_body' + index);
                                    _bindDoAction_({
                                        index: index,
                                        doAction: fn_list.doAction
                                    });
                                }
                                /*缓存check节点*/
                                if (check) {
                                    cache_check[index] = $('#admin_list_check' + index);
                                    _renderCheck_({
                                        index: index,
                                        table: table,
                                        doCheck: fn_list.doCheck
                                    });
                                }

                                /*缓存column节点*/
                                if (column) {
                                    var column_wrap = $('#admin_list_column' + index);
                                    cache_column[index] = {
                                        $column_wrap: column_wrap,
                                        $column_btn: column_wrap.prev(),
                                        $column_ul: column_wrap.find('ul')
                                    };
                                    /*是否列控制*/
                                    _renderColumn_({
                                        index: index,
                                        table: table
                                    });
                                }
                            }
                        }());
                    }
                }

                /*配置条件查询*/
                var condition = table.condition;
                if (condition) {
                    for (var m in condition) {
                        cache_condition[m] = condition[m];
                    }
                }
            }
        }

        /*获取表格缓存*/
        function getTable(config) {
            var index = config.index;
            if (config["table"]["table_cache" + index] === null) {
                /*不存缓存则创建缓存*/
                config["table"]["table_cache" + index] = cache_sequence[index].DataTable(config["table"]["table_config" + index]);
                return false;
            }
            return true;
        }

        /*清除或更新表格缓存*/
        function clearTable(config) {
            var index = config.index,
                table = config["table"]["table_cache" + index];
            if (table) {
                table.clear();
            }
        }

        /*摧毁表格缓存*/
        function destoryTable(config) {
            var index = config.index,
                table = config["table"]["table_cache" + index];
            if (table) {
                table.clear();
                table.destroy();
                table = null;
                delete cache_sequence[index];
            }
        }

        /*请求数据流程：
         1：组合查询条件,包括分页配置
         2：获取表格缓存
         3：配置表格参数
         4：执行表格请求或载入
         */
        function getTableData(config) {
            /*配置分页*/
            _pageTable_(config);

            /*配置查询条件*/
            _conditionTable_(config);

            var index = config.index,
                istable = getTable(config),
                ajax = config["table"]["table_config" + index]["ajax"],
                table;

            if (istable) {
                /*存在缓存则直接调用缓存*/
                table = config["table"]["table_cache" + index];
                table["ajax"]["config"](ajax).load();
            }
        }

        /*重载或加载数据*/
        function loadTableData(config) {
            var index = config.index,
                istable = getTable(config),
                ajax = config["table"]["table_config" + index]["ajax"],
                table;

            if (istable) {
                /*存在缓存则直接调用缓存*/
                table = config["table"]["table_cache" + index];
                table["ajax"]["config"](ajax).load();
            }
        }


        /*过滤数据*/
        function filterTable(config) {
            getTable(config);
            config["table"]["table_cache" + config.index].search(config.filter).columns().draw();
        }


        /*私有接口--内部服务类*/
        /*绑定操作选项*/
        function _bindDoAction_(config) {
            var index = config.index;
            cache_body[index].on('click', 'span', function (e) {
                e.stopPropagation();
                e.preventDefault();

                var target = e.target,
                    $this;

                //适配对象
                if (target.className.indexOf('btn-operate') === -1) {
                    /*过滤非btn-operate按钮*/
                    return false;
                } else {
                    $this = $(target);
                }

                /*操作分支*/
                if (config.doAction && typeof config.doAction === 'function') {
                    config.doAction.call(null, {
                        index: index,
                        $btn: $this
                    });
                }
            });
        }

        /*配置分页*/
        function _pageTable_(config) {
            /*配置分页*/
            if (typeof config.pageNumber !== 'undefined' && typeof config.pageSize !== 'undefined') {
                var index = config.index,
                    data = config['table']["table_config" + index]["ajax"]["data"];

                data["page"] = config.pageNumber;
                data["pageSize"] = config.pageSize;
            }
        }

        /*渲染分组*/
        function _renderColumn_(config) {
            if (config) {
                /*隐藏*/
                var tempid,
                    index = config.index,
                    column_config = config['table']['table_column' + index],
                    header = column_config.header,
                    item = column_config.hide_list,
                    len = item.length,
                    table = config['table']['table_cache' + index];

                /*创建按钮*/
                (function () {
                    var i = 0,
                        str = '';

                    for (i; i < len; i++) {
                        tempid = item[i];
                        str += '<li data-value="' + tempid + '">第' + (tempid + 1) + '列<div>(<span>' + header[tempid] + '</span>)</div></li>';
                        config['table']['table_cache' + index].column(tempid).visible(false);
                    }
                    if (str !== '') {
                        /*赋值控制下拉选项*/
                        $(str).appendTo(cache_column[index].$column_ul.html(''));
                    }
                }());


                /*设置分组*/
                cache_colgroup[index].html(_createColgroup_({
                    index: index,
                    table: table,
                    column: column_config,
                    size: len
                }));

                /*绑定切换列控制按钮*/
                cache_column[index].$column_btn.on('click', function () {
                    cache_column[index].$column_wrap.toggleClass('g-d-hidei');
                });
                /*绑定操作列数据*/
                cache_column[index].$column_ul.on('click', 'li', function () {
                    /*切换显示相关列*/
                    var $this = $(this),
                        active = $this.hasClass('action-list-active'),
                        value = $this.attr('data-value');

                    if (active) {
                        $this.removeClass('action-list-active');
                        table.column(value).visible(false);
                    } else {
                        $this.addClass('action-list-active');
                        table.column(value).visible(true);
                    }
                    /*设置分组*/
                    cache_colgroup[index].html(_createColgroup_({
                        index: index,
                        table: table,
                        column: column_config,
                        size: len - cache_column[index].$column_ul.find('.action-list-active')
                    }));
                });
            }
        }

        /*计数分组距离*/
        function _createColgroup_(config) {
            var str = '',
                j = 0,
                index = config.index,
                colgroup_len,
                column = config.column,
                check = column.check,
                action = column.action,
                colitem,
                short_len = 5,
                limit_len = column.init_len - config.size,
                tempcol,
                all_percent;

            if (check) {
                if (action) {
                    colgroup_len = limit_len - 2;
                    if (limit_len <= short_len) {
                        all_percent = 30;
                    } else {
                        all_percent = 40;
                    }
                } else {
                    colgroup_len = limit_len - 1;
                    if (limit_len <= short_len) {
                        all_percent = 38;
                    } else {
                        all_percent = 48;
                    }
                }
            } else {
                if (action) {
                    colgroup_len = limit_len - 1;
                    if (limit_len <= short_len) {
                        all_percent = 32;
                    } else {
                        all_percent = 42;
                    }
                } else {
                    colgroup_len = limit_len;
                    all_percent = 50;
                }
            }

            tempcol = all_percent % colgroup_len;
            if (tempcol !== 0) {
                colitem = parseInt((all_percent - tempcol) / colgroup_len, 10);
            } else {
                colitem = parseInt(all_percent / colgroup_len, 10);
            }
            /*解析分组*/
            if (colitem * colgroup_len <= (all_percent - colgroup_len)) {
                colitem = colgroup_len + 1;
            }
            /*设置主体值*/
            if (config.table === null || (config.table !== null && config.table.data().length === 0)) {
                cache_sequence[index].find('td').attr({
                    'colspan': check ? action ? colgroup_len + 2 : colgroup_len + 1 : colgroup_len
                });
            }
            for (j; j < colgroup_len; j++) {
                str += '<col class="g-w-percent' + colitem + '" />';
            }
            if (check) {
                if (action) {
                    if (limit_len <= short_len) {
                        return '<col class="g-w-percent2" />' + str + '<col class="g-w-percent18" />';
                    } else {
                        return '<col class="g-w-percent2" />' + str + '<col class="g-w-percent8" />';
                    }
                } else {
                    return '<col class="g-w-percent2" />' + str;
                }
            } else {
                if (action) {
                    if (limit_len <= short_len) {
                        return str + '<col class="g-w-percent18" />';
                    } else {
                        return str + '<col class="g-w-percent8" />';
                    }
                } else {
                    return str;
                }
            }
        }

        /*组合查询条件*/
        function _conditionTable_(config) {
            var condition = config.condition;
            if (condition) {
                var index = config.index,
                    condition_obj = cache_condition[index],
                    condition_len = condition_obj.length,
                    reqdata = config["table"]["table_config" + index]["ajax"]["data"];

                /*存在需要组合条件*/
                if (condition_len !== 0) {
                    var i = 0,
                        item,
                        dataitem,
                        label;

                    for (i; i < condition_len; i++) {
                        label = condition_obj[i];
                        item = condition[label];
                        if (typeof item !== 'undefined') {
                            dataitem = reqdata[label];
                            if (item === '' && typeof dataitem !== 'undefined') {
                                /*无条件：清除已经存在的条件*/
                                delete reqdata[label];
                            } else if (item !== '') {
                                /*有条件：扩展条件*/
                                reqdata[label] = condition[label];
                            }
                        }
                    }
                }
            }
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
                    toggleCheckAll(value);
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
                    var $this = $(this),
                        tempstate = $this.is(':checked') ? 1 : 0;
                    toggleCheckItem(tempstate);
                    /*执行回调*/
                    if (checkfn) {
                        config.doCheck.call(null, tempstate);
                    }
                });
            }
        }

        /*辅助初始化--清除缓存*/
        function _clearCache_(obj, type) {
            if (obj) {
                for (var i in obj) {
                    obj[i] = null/*释放内存*/;
                    delete obj[i]/*清除序列*/;
                }
            }
        }


    }

})(jQuery);