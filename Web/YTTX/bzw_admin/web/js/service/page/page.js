/*分页服务*/
(function () {
    'use strict';

    /*定义或扩展模块*/
    angular
        .module('app')
        .service('pageService', pageService);

    /*服务依赖注入*/

    /*服务实现*/
    function pageService() {
        /*基本缓存*/
        var sequence = {}/*缓存序列*/;

        /*对外接口*/
        /*基本服务类*/
        this.initPage = initPage/*初始化分页缓存*/;
        this.resetPage = resetPage/*重置分页*/;
        this.renderPage = renderPage/*渲染分页*/;


        /*接口实现*/
        /*初始化表格缓存*/
        function initPage() {
            for (var i in sequence) {
                sequence[i] = null/*释放内存*/;
                delete sequence[i]/*清除序列*/;
            }
        }

        /*重置分页*/
        function resetPage(config) {
            var seq = config.seq,
                node = config.node,
                model = config.model;

            /*不存在缓存则创建缓存*/
            if (!sequence[seq]) {
                sequence[seq] = $('#' + node);
            }

            /*初始化模型*/
            model.total = 0;
            model.page = 1;
            /*初始化调用分页*/
            sequence[seq].pagination({
                pageNumber: model.page,
                pageSize: model.pageSize,
                total: model.total
            });
        }

        /*渲染分页*/
        function renderPage(config) {
            var seq = config.seq,
                node = config.node,
                model = config.model,
                count = config.count;

            /*不存在缓存则创建缓存*/
            if (!sequence[seq]) {
                sequence[seq] = $('#' + node);
            }

            /*初始化模型*/
            model.total = count;
            /*初始化调用分页*/
            sequence[seq].pagination({
                pageNumber: model.page,
                pageSize: model.pageSize,
                total: model.total,
                onSelectPage: function (pageNumber, pageSize) {
                    /*再次查询*/
                    config.fn.call(null,pageNumber, pageSize);
                }
            });
        }

    }

}());