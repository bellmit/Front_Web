/*权限列表服务*/
'use strict';
angular.module('power.service',[])
	.service('powerService',['toolUtil','toolDialog','BASE_CONFIG','loginService',function (toolUtil,toolDialog,BASE_CONFIG,loginService) {
		/*获取缓存数据*/
		var cache=loginService.getCache(),
			powerCache=$.extend(true,{},cache['powerMap']),
			allpower=toolUtil.getAllPowerList(powerCache),
			self=this,
			h_items=[],
			colgroup=''/*分组*/,
			thead=''/*普通的头*/,
			all_thead=''/*拥有全选的头*/,
			body='',
			all_body='';

		/*初始化执行*/
		(function () {
			/*有数据即调数据，没数据就创建数据*/
			if(thead!=='' && colgroup!=='' && h_items.length!==0){
				return false;
			}

			if(allpower){
				var str='',
					strall='';

				for(var i in allpower){
					h_items.push(i);
					strall+='<th><label><input value="1" data-type="select_all" data-id="'+allpower[i]["id"]+'" type="checkbox" name="'+allpower[i]["module"]+'" />&nbsp;'+allpower[i]["name"]+'</label></th>';
					str+='<th>'+allpower[i]["name"]+'</th>';
				}

				if(h_items.length!==0){
					var len=h_items.length,
						j=0,
						colitem=parseInt(50/len,10);

					/*初始化赋值*/
					thead='<tr>'+str+'</tr>';
					all_thead='<tr>'+strall+'</tr>';

					/*解析分组*/
					if(colitem * len<=(50 - len)){
						colitem=len+1;
					}
					for(j;j<len;j++){
						colgroup+='<col class="g-w-percent'+colitem+'" />';
					}
				}
			}else{
				all_thead=thead='<tr><th></th></tr>';
				colgroup='<col class="g-w-percent50" />';
			}
		}());

		/*生成头部和分组*/
		this.createThead=function (flag) {
			/*flag:是否有全选*/
			/*有数据即调数据，没数据就创建数据*/
			if(thead!=='' && colgroup!=='' && h_items.length!==0){
				if(flag){
					return {
						colgroup:colgroup,
						thead:all_thead
					}
				}else{
					return {
						colgroup:colgroup,
						thead:thead
					}
				}
			}
			if(flag){
				return {
					colgroup:colgroup,
					thead:all_thead
				}
			}else{
				return {
					colgroup:colgroup,
					thead:thead
				}
			}
		};
		
		/*生成主体*/
		this.createTbody=function (config) {
			if(thead==='' && colgroup==='' && h_items.length===0){
				/*如果头部没调用，即先调用头部*/
				all_body=body='<tr><td class="g-c-gray9 g-fs4 g-t-c">没有查询到权限信息</td></tr>';
				if(config.flag){
					return {
						tbody:all_body
					}
				}else{
					return {
						tbody:body
					}
				}
			}else{
				var powerobj=self.resolvePower(config);
				all_body=powerobj['all_body'];
				body=powerobj['body'];
				if(config.flag){
					return {
						tbody:all_body
					}
				}else{
					return {
						tbody:body
					}
				}
			}
		};

		/*请求权限列表*/
		this.reqPowerList=function (config) {
			/**/
			/*请求权限*/
			if(config&&config.id){
				var islogin=loginService.isLogin(cache);
				if(islogin){
					var param=$.extend(true,{},cache.loginMap.param);
					param['adminId']=id;
					toolUtil
						.requestHttp({
							url:'/module/permissions'/*'json/goods/mall_goods_attr.json'*/,
							method:'post',
							set:true,
							data:param
						})
						.then(function(resp){
								var data=resp.data,
									status=parseInt(resp.status,10);

								if(status===200){
									var code=parseInt(data.code,10),
										message=data.message;
									if(code!==0){
										if(typeof message !=='undefined'&&message!==''){
											console.log(message);
										}
										if(code===999){
											/*退出系统*/
											cache=null;
											islogin=false;
											toolUtil.loginTips({
												clear:true,
												reload:true
											});
										}
									}else{
										/*加载数据*/
										var result=data.result;
										if(typeof result!=='undefined'){
											var menu=result.menu;
											if(menu){
												var len=menu.length;
												if(len===0){
													all_body=body='<tr><td class="g-c-gray9 g-fs4 g-t-c">没有查询到权限信息</td></tr>';
													if(config.modul){
														if(config.flag){
															modul['body']=all_body;
														}else{
															modul['body']=body;
														}
													}
												}else{
													/*数据集合，最多嵌套层次*/
													config['menu']=menu;
													var powerobj=self.resolvePower(config);
													all_body=powerobj['all_body'];
													body=powerobj['body'];

													if(config.modul){
														if(config.flag){
															modul['body']=all_body;
														}else{
															modul['body']=body;
														}
													}
												}
											}else{
												/*填充子数据到操作区域,同时显示相关操作按钮*/
												all_body=body='<tr><td class="g-c-gray9 g-fs4 g-t-c">没有查询到权限信息</td></tr>';
												if(config.modul){
													if(config.flag){
														modul['body']=all_body;
													}else{
														modul['body']=body;
													}
												}
											}
										}else{
											all_body=body='<tr><td class="g-c-gray9 g-fs4 g-t-c">没有查询到权限信息</td></tr>';
											if(config.modul){
												if(config.flag){
													modul['body']=all_body;
												}else{
													modul['body']=body;
												}
											}
										}
									}
								}
							},
							function(resp){
								var message=resp.data.message;
								if(typeof message !=='undefined'&&message!==''){
									console.log(message);
								}else{
									console.log('请求权限失败');
								}
								all_body=body='<tr><td class="g-c-gray9 g-fs4 g-t-c">没有查询到权限信息</td></tr>';
								if(config.modul){
									if(config.flag){
										modul['body']=all_body;
									}else{
										modul['body']=body;
									}
								}
							});
				}else{
					/*退出系统*/
					cache=null;
					toolUtil.loginTips({
						clear:true,
						reload:true
					});
				}
			}else{
				all_body=body='<tr><td class="g-c-gray9 g-fs4 g-t-c">没有查询到权限信息</td></tr>';
			}
		};
		/*解析权限列表*/
		this.resolvePower=function (config) {
			/*解析数据*/
			var len=h_items.length,
				i= 0,
				str='',
				allstr='',
				type=(config&&config.menu)?true:false;

			if(len===0){
				str='<tr><td class="g-c-gray9 g-fs4 g-t-c">没有查询到权限信息</td></tr>';
				allstr='<tr><td class="g-c-gray9 g-fs4 g-t-c">没有查询到权限信息</td></tr>';
			}else{
				for(i;i<len;i++){
					var index=parseInt(h_items[i],10);
					str+="<td>";
					allstr+="<td>";
					var item=type?config.menu:allpower[index],
						power=item['power'],
						j=0,
						sublen=power.length;

					for(j;j<sublen;j++){
						var subitem=power[j],
							ispermit=parseInt(subitem["isPermit"],10);
						if(type){
							if(ispermit===0){
								/*没有权限*/
								str+='<span data-count="0" data-roleid="'+config.id+'" data-prid="'+subitem["prid"]+'" data-modid="'+subitem["modId"]+'" data-ispermit="0" class="">'+subitem["funcName"]+'</span>';
								allstr+='<label class="g-w-percent48"><input data-count="0" data-roleid="'+config.id+'" data-prid="'+subitem["prid"]+'" data-modid="'+subitem["modId"]+'" data-ispermit="0" type="checkbox" name="'+item["module"]+'" />&nbsp;'+subitem["funcName"]+'</label>';
							}else if(ispermit===1){
								/*有权限*/
								str+='<span data-count="0" data-roleid="'+config.id+'" data-prid="'+subitem["prid"]+'" data-modid="'+subitem["modId"]+'" data-ispermit="1" class="setting_active">'+subitem["funcName"]+'</span>';
								allstr+='<label class="g-w-percent48"><input data-count="0" data-roleid="'+config.id+'" data-prid="'+subitem["prid"]+'" data-modid="'+subitem["modId"]+'" data-ispermit="1" checked type="checkbox" name="'+item["module"]+'" />&nbsp;'+subitem["funcName"]+'</label>';
							}
						}else{
							if(ispermit===0){
								/*没有权限*/
								str+='<span data-count="0" data-prid="'+subitem["prid"]+'" data-modid="'+subitem["modId"]+'" data-ispermit="0" class="">'+subitem["funcName"]+'</span>';
								allstr+='<label class="g-w-percent48"><input data-count="0" data-prid="'+subitem["prid"]+'" data-modid="'+subitem["modId"]+'" data-ispermit="0" type="checkbox" name="'+item["module"]+'" />&nbsp;'+subitem["funcName"]+'</label>';
							}else if(ispermit===1){
								/*有权限*/
								str+='<span data-count="0" data-prid="'+subitem["prid"]+'" data-modid="'+subitem["modId"]+'" data-ispermit="1" class="setting_active">'+subitem["funcName"]+'</span>';
								allstr+='<label class="g-w-percent48"><input data-count="0" data-prid="'+subitem["prid"]+'" data-modid="'+subitem["modId"]+'" data-ispermit="1" checked type="checkbox" name="'+item["module"]+'" />&nbsp;'+subitem["funcName"]+'</label>';
							}
						}

					}
					str+="</td>";
					allstr+="</td>";
				}
				return {
					body:'<tr>'+str+'</tr>',
					all_body:'<tr>'+allstr+'</tr>'
				}
			}
		}

	}]);
