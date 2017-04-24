/*表格服务*/
'use strict';
angular.module('app')
	.service('dataTableItemActionService',['dataTableCacheService',function (dataTableCacheService) {
		/*单项服务*/
		var self=this,
			temp_cache=null,
			temp_init=null,
			temp_count=0;

		this.action_map={
			'add':{
				name:'添加'
			},
			'delete':{
				name:'删除'
			},
			'update':{
				name:'更新'
			},
			'query':{
				name:'查询'
			},
			'detail':{
				name:'查看'
			},
			'forbid':{
				name:'禁用'
			},
			'enable':{
				name:'启用'
			},
			'up':{
				name:'上架'
			},
			'down':{
				name:'下架'
			},
			'sure':{
				name:'确定'
			},
			'cance':{
				name:'取消'
			},
			'audit':{
				name:'审核'
			},
			'toggle':{
				name:'切换'
			}
		};

		/*操作映射*/
		this.actionMap=function () {
			return self.action_map;
		};

		/*初始化*/
		this.initItemAction=function (key,itemaction,mode) {
			/*检验数据合法性*/
			if(!key && !itemaction && !mode){
				return;
			}

			/*判断是否存在缓存*/
			if(dataTableCacheService.isKey(key)){

				/*重置临时数据*/
				if(temp_init!==null){
					clearTimeout(temp_init);
					temp_init=null;
				}
				temp_cache=null;
				temp_count=0;

				/*初始化数据*/
				self.init(key,itemaction,mode);
			}else{
				/*重新启动初始化,启动监听*/
				temp_init=setTimeout(function () {
					temp_count++;
					clearTimeout(temp_init);
					temp_init=null;
					/*设置时间限制，超过这个限制则停止初始化:6s*/
					if(temp_count<=120){
						self.initItemAction(key,itemaction,mode);
					}
				},50);
			}


		};

		/*初始化配置*/
		this.init=function (key,itemaction,mode) {
			/*是否已经调用过*/
			if(dataTableCacheService.isAttr(key,'itemaction_flag')){
				self.unbind(dataTableCacheService.getCache(key));
			}

			/*复制临时缓存*/
			/*复制数据,并设置缓存*/
			dataTableCacheService.setCache(key,{
				itemaction_flag:true,
				itemaction_api:itemaction.itemaction_api,
				$bodywrap:itemaction.$bodywrap
			});
			/*设置完缓存，然后获取缓存，并操作缓存*/
			temp_cache=dataTableCacheService.getCache(key);
			/*绑定相关事件*/
			self.bind(mode);
		};

		/*事件注册*/
		this.bind=function (mode) {
			/*有容器存在*/
			if(temp_cache.$bodywrap){
				/*绑定操作选项*/
				temp_cache.$bodywrap.on('click',function (e){
					e.stopPropagation();
					e.preventDefault();

					var target= e.target,
						$this,
						id,
						action,
						$tr;

					//适配对象
					if(target.className.indexOf('btn-operate')===-1){
						/*过滤非btn-operate按钮*/
						return false;
					}else{
						$this=$(target);
					}
					id=$this.attr('data-id');
					action=$this.attr('data-action');
					/*过滤非id,action按钮*/
					if(!id && !action){
						return false;
					}

					/*操作分支*/
					self.adaptCase({
						$btn:$this,
						id:id,
						action:action
					},mode);
				});
			}
		};


		/*取消绑定*/
		this.unbind=function (cache) {
			/*绑定操作选项*/
			cache.$bodywrap.off('click');
		};
		
		
		/*分支适配*/
		this.adaptCase=function (config,mode) {
			/*特殊操作*/
			/*to do*/


			/*回调*/
			if(temp_cache.itemaction_api){
				temp_cache.itemaction_api.doItemAction.call(null,config,mode);
			}
		};


		/*

		 <li>
			 <a data-isrequest="false" data-parentid="1" data-label="JMAG2" data-layer="1" data-id="2" class="sub-menu-title" href="#" title="">JMAG2</a>
			 <ul></ul>
		 </li>
		 <li>
			 <a data-isrequest="false" data-parentid="1" data-label="test666" data-layer="1" data-id="6" class="sub-menu-title" href="#" title="">test666</a>
			 <ul></ul>
		 </li>
		 <li>
			 <a data-isrequest="false" data-parentid="1" data-label="深圳欢迎你" data-layer="1" data-id="7" class="sub-menu-title" href="#" title="">深圳欢迎你</a>
			 <ul></ul>
		 </li>

		* */


		/*

		 <li>
			 <a data-isrequest="false" data-parentid="1" data-label="JMAG2" data-layer="1" data-id="2" class="sub-menu-title" href="#" title="">JMAG2</a>
			 <ul></ul>
		 </li>
		 <li>
			 <a data-isrequest="false" data-parentid="1" data-label="test666" data-layer="1" data-id="6" class="sub-menu-title" href="#" title="">test666</a>
			 <ul></ul>
		 </li>
		 <li>
			 <a data-isrequest="false" data-parentid="1" data-label="深圳欢迎你" data-layer="1" data-id="7" class="sub-menu-title" href="#" title="">深圳欢迎你</a>
			 <ul></ul>
		 </li>



		* */


		/*
		 <ul ng-init="struct_ctrl.initSubMenu()" ng-click="struct_ctrl.toggleSubMenu($event)" id="admin_struct_submenu" class="g-d-showi ui-sub-menu"></ul>


		 <ul ng-init="struct_ctrl.initSubMenu()" ng-click="struct_ctrl.toggleSubMenu($event)" id="admin_struct_submenu" class="g-d-showi ui-sub-menu"></ul>




		* */



	}]);
