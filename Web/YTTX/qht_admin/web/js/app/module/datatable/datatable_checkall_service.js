/*表格服务*/
'use strict';
angular.module('app')
	.service('dataTableCheckAllService',['dataTableCacheService',function (dataTableCacheService) {
		/*全选服务*/
		var self=this;
		/*初始化配置*/
		this.initCheckAll=function () {
			
		};
		
		
		/*初始化*/
		/*this.init=function (key,table,$scope) {
			/!*创建缓存*!/
			var selectwrap=$(table.selectwrap);

			/!*复制临时缓存*!/
			temp_cache={
				init_hidelist:table.hide_list.slice(0).sort(function (a,b) {
					return a - b;
				}),
				ischeck:table.ischeck,
				init_len:table.init_len,
				hide_len:init_hidelist.length,
				api:table.api,
				selectwrap:selectwrap,
				bodywrap:$(table.bodywrap),
				$btn:selectwrap.prev(),
				$ul:selectwrap.find('ul')
			};

			/!*初始化组件*!/
			self.initWidget(key,table,$scope);
			/!*绑定相关事件*!/
			self.bind(key,table,$scope);
		};*/
	}]);
