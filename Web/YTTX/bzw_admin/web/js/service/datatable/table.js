/*表格服务*/
(function ($) {
    'use strict';

    /*定义或扩展模块*/
    angular
        .module('app')
        .service('dataTableService', dataTableService);

    /*服务依赖注入*/

    /*服务实现*/
    function dataTableService() {
        /*基本缓存*/
        var cache_sequence = {}/*缓存序列,存放table dom节点引用*/,
            cache_body={}/*缓存序列,存放body dom节点引用*/,
            cache_colgroup={}/*缓存序列,存放colgroup dom节点引用*/,
            cache_condition = {}/*存放条件查询配置*/,
            cache_check = {}/*存放全选配置*/;

        /*对外接口*/
        /*基本服务类*/
        this.initTable = initTable/*初始化表格缓存*/;
        this.getTable = getTable/*获取表格缓存*/;
        this.clearTable = clearTable/*清除或更新表格缓存*/;
        this.destoryTable = destoryTable/*摧毁表格缓存*/;
        this.pageConfig = pageConfig/*配置分页参数*/;
        this.conditionTable = conditionTable/*组合查询条件*/;
        this.getTableData = getTableData/*请求数据*/;
        this.loadTableData = loadTableData/*重载或加载数据，查询条件不变，相当于重绘或重新请求*/;
        this.filterTable = filterTable/*过滤数据*/;
        this.bindDoAction = bindDoAction/*绑定操作选项*/;


        /*接口实现*/
        /*初始化表格缓存*/
        function initTable(config) {
            /*清除缓存*/
            _clearCache_(cache_sequence)/*清除table序列*/;
            _clearCache_(cache_condition)/*清除条件序列*/;
            _clearCache_(cache_body)/*清除body序列*/;
            _clearCache_(cache_colgroup)/*清除分组序列*/;
            _clearCache_(cache_check)/*清除全选序列*/;

            /*如果有配置则配置缓存*/
            if (config) {
                /*配置dom节点引用*/
                var sobj = config.sequence;
                if (sobj) {
                    var j = 0,
                        slen = sobj.length;

                    if (typeof slen !== 'undefined' && slen !== 0) {
                        var item,
                            index,
                            colgroup/*是否分组*/,
                            action/*是否按钮操作*/,
                            check/*是否全选*/;

                        for (j; j < slen; j++) {
                            item = sobj[j];
                            index = item["index"];
                            colgroup = item["colgroup"];
                            action=item["action"];
                            check=item["check"];

                            /*缓存table节点*/
                            cache_sequence[index] = $('#admin_list_table' + index);

                            /*缓存colgroup节点*/
                            if(colgroup){
                                cache_colgroup[index] = $('#admin_list_colgroup' + index);
                            }

                            /*缓存body节点*/
                            if(action){
                                cache_body[index] = $('#admin_list_body' + index);
                                bindDoAction(item);
                            }
                            /*缓存check节点*/
                            if(check){
                                cache_check[index] = $('#admin_list_check' + index);
                            }
                        }
                    }
                }

                /*配置条件查询*/
                var cobj = config.condition;
                if (cobj) {
                    for (var m in cobj) {
                        cache_condition[m] = cobj[m];
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

        /*配置分页*/
        function pageConfig(config) {
            /*配置分页*/
            if (typeof config.pageNumber !== 'undefined' && typeof config.pageSize !== 'undefined') {
                var index = config.index,
                    data = config['table']["table_config" + index]["ajax"]["data"];

                data["page"] = config.pageNumber;
                data["pageSize"] = config.pageSize;
            }
        }

        /*请求数据:流程：
         1：组合查询条件
         2：获取表格缓存
         3：配置表格参数
         4：执行表格请求或载入
         */
        function getTableData(config) {
            /*配置分页*/
            pageConfig(config);

            /*配置查询条件*/
            var iscondition = conditionTable(config);
            if (!iscondition) {
                /*不符合规范条件*/
                return false;
            }

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

        /*组合查询条件*/
        function conditionTable(config) {
            var con = config.condition;
            if (con) {
                var index = config.index,
                    cobj = cache_condition[index],
                    clen = con.length,
                    reqdata = config["table"]["table_config" + index]["ajax"]["data"];

                /*存在需要组合条件*/
                if (clen !== 0) {
                    var i = 0,
                        cname,
                        cvalue;

                    loop1:for (i; i < clen; i++) {
                        cname = con[i]["name"];
                        cvalue = con[i]["value"];
                        var len = cobj.length,
                            j = 0;
                        if (len !== 0) {
                            var item;
                            loop2:for (j; j < len; j++) {
                                item = cobj[j];
                                /*匹配相同字段*/
                                if (item["name"] === cname) {
                                    if (cvalue === '') {
                                        delete reqdata[cname];
                                        if (item["require"]) {
                                            /*非空字段为空则提示异常*/
                                            return false;
                                        }
                                    } else {
                                        reqdata[cname] = cvalue;
                                    }
                                    continue loop1;
                                }
                            }
                        }
                    }
                }
            }
            return true;
        }

        /*过滤数据*/
        function filterTable(config) {
            var index = config.index,
                search = config.search;
            if (config["table"]["table_cache" + index] === null) {
                return false;
            }
            config["table"]["table_cache" + index].search(search).columns().draw();
        }

        /*绑定操作选项*/
        function bindDoAction(config) {
            var index=config.index;
            cache_body[index].on('click','span',function (e){
                e.stopPropagation();
                e.preventDefault();

                var target= e.target,
                    $this;

                //适配对象
                if(target.className.indexOf('btn-operate')===-1){
                    /*过滤非btn-operate按钮*/
                    return false;
                }else{
                    $this=$(target);
                }

                /*操作分支*/
                if(config.doAction && typeof config.doAction==='function'){
                    config.doAction.call(null,{
                        index:index,
                        $btn:$this
                    });
                }
            });
        }


        /*私有接口*/
        /*辅助初始化--清除缓存*/
        function _clearCache_(obj) {
            if(obj){
                for(var i in obj){
                    obj[i] = null/*释放内存*/;
                    delete obj[i]/*清除序列*/;
                }
            }
        }

    }

})(jQuery);