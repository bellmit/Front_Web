/*表格服务*/
'use strict';
angular.module('app')
	.service('addressRelationService',['toolUtil','BASE_CONFIG',function (toolUtil,BASE_CONFIG) {
		/*初始化配置*/
		var self=this;


		/*初始化配置*/
		this.addressRelation=function (type,model) {
			toolUtil
				.requestHttp({
					url:BASE_CONFIG.commondomain+BASE_CONFIG.commonproject+'/organization/lowers/search',
					method:'post',
					data:{
						parentCode:model[type+'_value']
					}
				})
				.then(function(resp){
						var data=resp.data,
							status=parseInt(resp.status,10);

						if(status===200){
							var code=parseInt(data.code,10),
								message=data.message;
							if(code!==0){
								if(typeof message !=='undefined' && message!==''){
									console.log(message);
								}

								if(code===999){
									/*退出系统*/
									cache=null;
									toolUtil.loginTips({
										clear:true,
										reload:true
									});
								}
							}else{
								/*加载数据*/
								var result=data.result;
								if(typeof result!=='undefined'){
									var list=result.list,
										str='';
									if(list){
										var len=list.length;
										if(len===0){
											record.hasdata=false;
											if(layer===0){
												$wrap.html('<li><a>暂无数据</a></li>');
												self.$admin_submenu_wrap.attr({
													'data-list':false
												});
											}else{
												$wrap.html('');
												/*清除显示下级菜单导航图标*/
												record.current.attr({
													'data-isrequest':true
												}).removeClass('sub-menu-title sub-menu-titleactive');
											}
											/*始化机构操作区域*/
											self.initOperate(config);
										}else{
											/*数据集合，最多嵌套层次*/
											str=self.resolveMenuList(list,BASE_CONFIG.submenulimit,{
												layer:layer,
												id:id
											});
											if(str!==''){
												record.hasdata=true;
												if(layer===0){
													/*搜索模式*/
													self.$admin_submenu_wrap.attr({
														'data-list':true
													});
												}
												$(str).appendTo($wrap.html(''));
												/*始化机构操作区域*/
												self.initOperate(config,true);
											}else{
												record.hasdata=false;
												if(layer===0){
													/*搜索模式*/
													self.$admin_submenu_wrap.attr({
														'data-list':false
													});
												}
												/*始化机构操作区域*/
												self.initOperate(config);
											}
											if(layer!==0){
												record.current.attr({
													'data-isrequest':true
												});
											}
										}
									}else{
										record.hasdata=false;
										if(layer===0){
											$wrap.html('<li><a>暂无数据</a></li>');
											self.$admin_submenu_wrap.attr({
												'data-list':false
											});
										}
										/*始化机构操作区域*/
										self.initOperate(config);
									}
								}else{
									record.hasdata=false;
									if(layer===0){
										$wrap.html('<li><a>暂无数据</a></li>');
										self.$admin_submenu_wrap.attr({
											'data-list':false
										});
									}

									/*始化机构操作区域*/
									self.initOperate(config);
								}
							}
						}
					},
					function(resp){
						record.hasdata=false;
						if(layer===0){
							$wrap.html('<li><a>暂无数据</a></li>');
							self.$admin_submenu_wrap.attr({
								'data-list':false
							});
						}
						/*始化机构操作区域*/
						self.initOperate(config);
						var message=resp.data.message;
						if(typeof message !=='undefined'&&message!==''){
							console.log(message);
						}else{
							console.log('请求菜单失败');
						}
					});
		};
		

		/*初始化组件*/
		this.initWidget=function (tablecolumn,tablecache) {
			/*隐藏*/
			var tempid,
				str='',
				i=0;


			for(i;i<tablecolumn.hide_len;i++){
				tempid=tablecolumn.hide_list[i];
				str+='<li data-value="'+tempid+'">第'+(tempid + 1)+'列</li>';
				tablecache.column(tempid).visible(false);
			}
			if(str!==''){
				/*赋值控制下拉选项*/
				$(str).appendTo(tablecolumn.$column_ul.html(''));
			}
			/*设置分组*/
			tablecolumn.$colgroup.html(self.createColgroup(tablecolumn,tablecolumn.hide_len));
		};
		
		/*绑定相关事件*/
		this.bind=function (tablecolumn,tablecache) {
			/*绑定切换列控制按钮*/
			tablecolumn.$column_btn.on('click',function () {
				tablecolumn.$column_wrap.toggleClass('g-d-hidei');
			});
			/*绑定操作列数据*/
			tablecolumn.$column_ul.on('click','li',function () {
				/*切换显示相关列*/
				var $this=$(this),
					active=$this.hasClass('action-list-active'),
					index=$this.attr('data-value');

				if(active){
					$this.removeClass('action-list-active');
					tablecache.column(index).visible(false);
				}else{
					$this.addClass('action-list-active');
					tablecache.column(index).visible(true);
				}

				var count=tablecolumn.$column_ul.find('.action-list-active').size();

				/*设置分组*/
				tablecolumn.$colgroup.html(self.createColgroup(tablecolumn,tablecolumn.hide_len - count));
			});
		};

	}]);
