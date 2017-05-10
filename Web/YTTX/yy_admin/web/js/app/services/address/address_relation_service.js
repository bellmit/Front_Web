/*表格服务*/
'use strict';
angular.module('app')
	.service('addressRelationService',['toolUtil','BASE_CONFIG',function (toolUtil,BASE_CONFIG) {
		/*初始化配置*/
		var self=this;

		/*

		type:类型：负责判断查询，省，市，区
		model:模型：负责更新数据




		* */


		/*初始化关联*/
		this.initRelation=function (type,model) {
			if(type==='province'){

			}else if(type==='city'){

			}else if(type==='country'){

			}
		};


		/*单独查询*/
		this.addressRelation=function (type,model) {
			toolUtil
				.requestHttp({
					url:BASE_CONFIG.commondomain+BASE_CONFIG.commonproject+'/address/get',
					method:'post',
					data:{
						parentCode:model[type]
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

	}]);
