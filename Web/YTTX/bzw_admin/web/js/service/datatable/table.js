/*表格服务*/
(function () {
    'use strict';

    /*定义或扩展模块*/
    angular
        .module('app')
        .service('dataTableService', dataTableService);

    /*服务依赖注入*/

    /*服务实现*/
    function dataTableService() {
        /*基本缓存*/
        var sequence = {}/*缓存序列*/;

        /*对外接口*/
        /*基本服务类*/
        this.initTable = initTable/*初始化表格缓存*/;
        this.getTable = getTable/*获取表格缓存*/;
        this.clearTable = clearTable/*清除或更新表格缓存*/;
        this.destoryTable = destoryTable/*摧毁表格缓存*/;
        this.configTable = configTable/*配置表格缓存*/;
        this.conditionTable = conditionTable/*组合查询条件*/;
        this.getTableData = getTableData/*请求数据*/;
        this.filterTable = filterTable/*过滤数据*/;


        /*接口实现*/
        /*初始化表格缓存*/
        function initTable(config) {
            /*清除缓存*/
            for (var i in sequence) {
                sequence[i] = null/*释放内存*/;
                delete sequence[i]/*清除序列*/;
            }
            /*如果有配置则配置缓存*/
            if (config) {
                var j = 0,
                    len = config.length;
                if (typeof len !== 'undefined' && len !== 0) {
                    var table, item, index;
                    for (j; j < len; j++) {
                        item = config[j];
                        table = item["table"];
                        if (typeof table === 'string' && table !== '') {
                            index = item["index"];
                            sequence[index] = $('#' + table);
                        }
                    }
                }
            }
        }

        /*获取表格缓存*/
        function getTable(config) {
            var index = config.index;
            if (config["table"]["table" + index] === null) {
                /*不存缓存则创建缓存*/
                config["table"]["table" + index] = sequence[index].DataTable(config["table"]["table_config" + index]);
                return false;
            }
            return true;
        }

        /*清除或更新表格缓存*/
        function clearTable(index) {
            var table = sequence[index];
            if (table) {
                table.clear();
            }
        }

        /*摧毁表格缓存*/
        function destoryTable(index) {
            var table = sequence[index];
            if (table) {
                table.clear();
                table.destroy();
                table = null;
                delete sequence[index];
            }
        }

        /*配置表格缓存*/
        function configTable() {

        }

        /*请求数据*/
        function getTableData(config) {
            //conditionTable(config);
            var istable = getTable(config),
                ajax = config["table_config" + index]["ajax"],
                table;

            if (istable) {
                table = config["table" + index];
                table["ajax"]["config"](ajax).load();
            } else {

            }
        }


        /*组合查询条件*/
        function conditionTable(config) {

        }

        /*过滤数据*/
        function filterTable() {

        }

    }

}());