/*地址服务*/
'use strict';
angular.module('app')
	.service('addressService',['toolUtil','BASE_CONFIG',function (toolUtil,BASE_CONFIG) {
		/*初始化配置*/
		var self=this;
		
		/*关联查询*/
		this.queryRelation=function (config) {
			var type=config.type/*类型：负责判断查询，省，市，区*/,
				address=config.address/*模型：负责更新数据*/,
				model=config.model,
				id;

			/*
			适配参数
			顶级分类，数据模型为空，业务模型为空
			*/
			if(type==='province' && angular.equals({},address[type]) && model[type]===''){
				/*初始化查询**/
				id=86;
			}else{
				if(type==='city'){
					id=model['province'];
				}else if(type==='country'){
					id=model['city'];
				}
			}
			
			/*组合请求参数*/
			toolUtil
				.requestHttp({
					url:BASE_CONFIG.commondomain+BASE_CONFIG.commonproject+'/address/get',
					method:'post',
					async:false,
					data:{
						parentCode:id
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
									console.log('退出系统');
								}
							}else{
								/*加载数据*/
								var result=data.result;
								if(typeof result!=='undefined'){
									var list=result.list;
									if(list){
										var len=list.length;
										if(len!==0){
											/*数据集合，最多嵌套层次*/
											var i=0,
												tempaddress={};
											var address_item,
												list_item;
											if(model[type]!==''){
												/*有数据情况*/
												for(i;i<len;i++){
													address_item={};
													list_item=list[i];

													address_item['key']=list_item['name'];
													address_item['value']=list_item['code'];
													/*判断选中值*/
													if(i===0){
														/*继续判断类型情况*/
														if(type==='city'){
															model['city']=list_item['code'];
															model['country']='';
														}else if(type==='country'){
															model['country']=list_item['code'];
														}
													}
													/*判断临时缓存是否存在*/
													if(!tempaddress[list_item['code']]){
														tempaddress[list_item['code']]=address_item;
													}
												}
												/*更新模型*/
												address[type]=tempaddress;
											}else{
												/*无数据则取第一个*/
												for(i;i<len;i++){
													address_item={};
													list_item=list[i];
													address_item['key']=list_item['name'];
													address_item['value']=list_item['code'];
													if(i===0){
														/*匹配即更新模型*/
														model[type]=list_item['code'];
													}
													/*判断临时缓存是否存在*/
													if(!tempaddress[list_item['code']]){
														tempaddress[list_item['code']]=address_item;
													}
												}
												/*更新模型*/
												address[type]=tempaddress;
											}
											/*循环完毕根据类型判断是否开启下级查询*/
											if(type==='province'){
												/*查询市级*/
												self.queryRelation({
													model:config.model,
													address:config.address,
													type:'city'
												});
											}else if(type==='city'){
												/*查询区级*/
												self.queryRelation({
													model:config.model,
													address:config.address,
													type:'country'
												});
											}
										}
									}else{
										/*置空模型*/
										address[type]={};
									}
								}else{
									/*置空模型*/
									address[type]={};
								}
							}
						}
					},
					function(resp){
						/*置空模型*/
						address[type]={};
						var data=resp.data,
							message=data.message;
						if(typeof message !=='undefined' && message!==''){
							console.log(message);
						}else{
							console.log('请求失败');
						}
					});
		};

		/*查询省*/
		this.queryProvince=function () {
			var address=config.address/*模型：负责更新数据*/,
				model=config.model,
				type='province';

			/*组合请求参数*/
			toolUtil
				.requestHttp({
					url:BASE_CONFIG.commondomain+BASE_CONFIG.commonproject+'/address/get',
					method:'post',
					async:false,
					data:{
						parentCode:86
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
									console.log('退出系统');
								}
							}else{
								/*加载数据*/
								var result=data.result;
								if(typeof result!=='undefined'){
									var list=result.list;
									if(list){
										var len=list.length;
										if(len!==0){
											/*数据集合，最多嵌套层次*/
											var i=0,
												tempaddress={};
											var address_item,
												list_item;
											if(model[type]!==''){
												/*有数据情况*/
												for(i;i<len;i++){
													address_item={};
													list_item=list[i];
													address_item['key']=list_item['name'];
													address_item['value']=list_item['code'];
													/*判断临时缓存是否存在*/
													if(!tempaddress[list_item['code']]){
														tempaddress[list_item['code']]=address_item;
													}
												}
												/*更新模型*/
												address[type]=tempaddress;
											}else{
												/*无数据则取第一个*/
												for(i;i<len;i++){
													address_item={};
													list_item=list[i];
													address_item['key']=list_item['name'];
													address_item['value']=list_item['code'];
													if(i===0){
														/*匹配即更新模型*/
														model[type]=list_item['code'];
													}
													/*判断临时缓存是否存在*/
													if(!tempaddress[list_item['code']]){
														tempaddress[list_item['code']]=address_item;
													}
												}
												/*更新模型*/
												address[type]=tempaddress;
											}
										}
									}else{
										/*置空模型*/
										address[type]={};
									}
								}else{
									/*置空模型*/
									address[type]={};
								}
							}
						}
					},
					function(resp){
						/*置空模型*/
						address[type]={};
						var data=resp.data,
							message=data.message;
						if(typeof message !=='undefined' && message!==''){
							console.log(message);
						}else{
							console.log('请求失败');
						}
					});
		};

	}]);
