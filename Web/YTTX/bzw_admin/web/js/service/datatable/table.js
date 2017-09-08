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
		var sequence={}/*缓存序列*/;

		/*对外接口*/
		/*基本服务类*/
		this.initTable = initTable/*初始化表格缓存*/;
		this.getTable = getTable/*获取表格缓存*/;
		this.clearTable=clearTable/*清除或更新表格缓存*/;
		this.destoryTable=destoryTable/*摧毁表格缓存*/;
		this.configTable=configTable/*配置表格缓存*/;
		this.conditionTable=conditionTable/*组合查询条件*/;
		this.getTableData=getTableData/*请求数据*/;
		this.filterTable=filterTable/*过滤数据*/;



		/*接口实现*/
		/*初始化表格缓存*/
		function initTable() {
			for(var i in sequence){
				sequence[i]=null/*释放内存*/;
				delete sequence[i]/*清除序列*/;
			}
		}
		/*获取表格缓存*/
		function getTable(seq) {
			if(typeof seq!=='undefined'){
				return sequence[seq];
			}
		}
		/*清除或更新表格缓存*/
		function clearTable(seq) {
			var table=sequence[seq];
			if(table){
				table.clear();
			}
		}

		/*摧毁表格缓存*/
		function destoryTable(seq) {
			var table=sequence[seq];
			if(table){
				table.clear();
				table.destroy();
				table=null;
				delete sequence[seq];
			}
		}

		/*配置表格缓存*/
		function configTable() {
			
		}

		/*请求数据*/
		function getTableData() {
			
		}


		/*组合查询条件*/
		function conditionTable() {
			
		}

		/*过滤数据*/
		function filterTable() {
			
		}

	}

}());