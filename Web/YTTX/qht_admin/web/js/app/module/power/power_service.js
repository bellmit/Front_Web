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
			$admin_struct_allpower=$('#admin_struct_allpower');

		/*初始化执行*/
		(function () {
			/*有数据即调数据，没数据就创建数据*/
			if(thead!=='' && colgroup!=='' && h_items.length!==0){
				return false;
			}

			if(allpower){
				var str='',
					strall='',
					index=0;

				for(var i in allpower){
					h_items.push(i);
					strall+='<th class="g-t-c"><label><input data-index="'+index+'" data-modid="'+allpower[i]["id"]+'" type="checkbox" name="'+allpower[i]["module"]+'" />&nbsp;'+allpower[i]["name"]+'</label></th>';
					str+='<th data-index="'+index+'" class="g-t-c">'+allpower[i]["name"]+'</th>';
					index++;
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

		/*请求权限列表(主要是根据不同对象查询相关权限)*/
		this.reqPowerList=function (config) {
			/**/
			/*请求权限*/
			var islogin=loginService.isLogin(cache);
			if(islogin){
				var param=$.extend(true,{},cache.loginMap.param);
				if(config&&config.id){
					param['adminId']=config.id;
				}
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
												if(config.modul){
													modul['body']='<tr><td class="g-c-gray9 g-fs4 g-t-c g-b-white">没有查询到权限信息</td></tr>';
												}
											}else{
												/*数据集合，最多嵌套层次*/
												if(config.modul){
													config['menu']=menu;
													modul['body']=self.resolvePower(config);
												}
											}
										}else{
											/*填充子数据到操作区域,同时显示相关操作按钮*/
											if(config.modul){
												modul['body']='<tr><td class="g-c-gray9 g-fs4 g-t-c g-b-white">没有查询到权限信息</td></tr>';
											}
										}
									}else{
										if(config.modul){
											modul['body']='<tr><td class="g-c-gray9 g-fs4 g-t-c g-b-white">没有查询到权限信息</td></tr>';
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
							if(config.modul){
								modul['body']='<tr><td class="g-c-gray9 g-fs4 g-t-c g-b-white">没有查询到权限信息</td></tr>';
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
		};

		/*解析权限列表*/
		this.resolvePowerList=function (config) {
			/*解析数据*/
			var len=h_items.length,
				i= 0,
				str='',
				ispermit,
				request=(config&&config.menu)?true:false;

			if(len===0){
				str='<tr><td class="g-c-gray9 g-fs4 g-t-c g-b-white">没有查询到权限信息</td></tr>';
			}else{
				if(request){
					var menuitem=config.menu;
				}
				for(i;i<len;i++){
					var index=parseInt(h_items[i],10);
					str+='<td class="g-b-white">';
					var item=request?menuitem[index]:allpower[index],
						power=item['power'],
						j=0,
						sublen=power.length;

					for(j;j<sublen;j++){
						var subitem=power[j];

						if(request){
							/*如果是请求*/
							if(config.clear){
								/*全不选*/
								str+='<label class="btn btn-default g-gap-mb2 g-gap-mr2"><input data-roleid="'+config.id+'" data-prid="'+subitem["prid"]+'" data-modid="'+subitem["modId"]+'" type="checkbox" name="'+item["module"]+'" />&nbsp;'+subitem["funcName"]+'</label>';
							}else{
								/*根据设置或者配置结果来*/
								ispermit=parseInt(subitem["isPermit"],10);
								if(ispermit===0){
									/*没有权限*/
									str+='<label class="btn btn-default g-gap-mb2 g-gap-mr2"><input data-roleid="'+config.id+'" data-prid="'+subitem["prid"]+'" data-modid="'+subitem["modId"]+'" type="checkbox" name="'+item["module"]+'" />&nbsp;'+subitem["funcName"]+'</label>';
								}else if(ispermit===1){
									/*有权限*/
									str+='<label class="btn btn-default g-gap-mb2 g-gap-mr2"><input data-roleid="'+config.id+'" data-prid="'+subitem["prid"]+'" data-modid="'+subitem["modId"]+'" checked type="checkbox" name="'+item["module"]+'" />&nbsp;'+subitem["funcName"]+'</label>';
								}
							}
						}else{
							/*非请求*/
							if(config.clear){
								/*全不选*/
								str+='<label class="btn btn-default g-gap-mb2 g-gap-mr2"><input data-prid="'+subitem["prid"]+'" data-modid="'+subitem["modId"]+'" type="checkbox" name="'+item["module"]+'" />&nbsp;'+subitem["funcName"]+'</label>';
							}else{
								/*根据设置或者配置结果来*/
								ispermit=parseInt(subitem["isPermit"],10);
								if(ispermit===0){
									/*没有权限*/
									str+='<label class="btn btn-default g-gap-mb2 g-gap-mr2"><input data-prid="'+subitem["prid"]+'" data-modid="'+subitem["modId"]+'" type="checkbox" name="'+item["module"]+'" />&nbsp;'+subitem["funcName"]+'</label>';
								}else if(ispermit===1){
									/*有权限*/
									str+='<label class="btn btn-default g-gap-mb2 g-gap-mr2"><input data-prid="'+subitem["prid"]+'" data-modid="'+subitem["modId"]+'" checked type="checkbox" name="'+item["module"]+'" />&nbsp;'+subitem["funcName"]+'</label>';
								}
							}
						}

					}
					str+="</td>";
				}
			}
			return '<tr>'+str+'</tr>';
		};

		/*权限服务--全选权限*/
		this.selectAllPower=function (e) {
			e.stopPropagation();

			var target=e.target,
				nodename=target.nodeName.toLowerCase();

			/*过滤*/
			if(nodename==='tr'){
				return null;
			}

			/*标签*/
			var $selectall,
				index,
				$operate,
				check,
				selectarr=[];

			if(nodename==='label'||nodename==='th'||nodename==='td'){
				$selectall=$(target).find('input');
			}else if(nodename==='input'){
				$selectall=$(target);
			}

			check=$selectall.is(':checked');
			index=$selectall.attr('data-index');
			$operate=$admin_struct_allpower.find('td').eq(index).find('input');

			if(check){
				$operate.each(function () {
					var $this=$(this),
						prid=$this.attr('data-prid');
					$this.prop({
						"checked":true
					});
					selectarr.push(prid);
				});
			}else{
				$operate.each(function () {
					$(this).prop({
						"checked":false
					});
				});
				selectarr=null;
			}
			return selectarr;
		};

		/*权限服务--查询选中的权限*/
		this.queryPowerById=function (config) {
			if(typeof config.id==='undefined'){
				return false;
			}
			var param=$.extend(true,{},cache.loginMap.param);
			/*合并参数*/
			param['organizationId']=config.id;

			toolUtil
				.requestHttp({
					url:typeof config.url!=='undefined'?config.url:'/organization/permission/select',
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
											if(config.result){
												config.result=null;
											}
										}else{
											/*数据集合，最多嵌套层次*/
											if(config.result){
												config.result=menu;
											}
										}
									}else{
										/*填充子数据到操作区域,同时显示相关操作按钮*/

									}
								}else{

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
					});
		};

		/*权限服务--全选权限--根据已有权限反射选中权限*/
		this.selectPowerByItem=function (config) {
			if(!config.data){
				return false;
			}
			if(typeof config.data!=='string'){
				return false;
			}
			/*序列化数据*/
			var temp_data=config.data.split(','),
				power_map={},
				len=temp_data.length,
				i=0;

			if(typeof len==='undefined'||len===0){
				/*清空权限*/
				this.clearSelectPower();
				return false;
			}else{
				for(i;i<len;i++){
					var temp_item=temp_data[i];
					power_map[temp_item]=parseInt(temp_item,10);
				}
			}

			var $input;
			if(typeof config.dom!=='undefined'){
				$input=$(dom);
			}else{
				$input=$admin_struct_allpower.find('input');
			}

			$input.each(function () {
				var $this=$(this),
					prid=parseInt($this.attr('data-prid'),10);

				if(prid===power_map[prid]){
					$this.prop({
						'checked':true
					});
				}else{
					$this.prop({
						'checked':false
					});
				}
			});
		};

		/*权限服务--获取选中选择权限*/
		this.getSelectPower=function (dom) {
			var $input=typeof dom!=='undefined'?$(dom):$admin_struct_allpower.find('input:checked');

			/*标签*/
			var prid,
				selectarr=[];

			$input.each(function () {
				var $this=$(this);

				prid=$this.attr('data-prid');
				selectarr.push(prid);
			});
			return selectarr.length===0?null:selectarr;
		};

		/*权限服务--清除选中选择权限*/
		this.clearSelectPower=function (dom) {
			var $input,
				$head;
			if(typeof dom!=='undefined'){
				$input=$(dom);
			}else{
				$input=$admin_struct_allpower.find('input:checked');
			}
			$head=$admin_struct_allpower.prev('thead').find('input:checked');

			$input.each(function () {
				$(this).prop({
					'checked':false
				});
			});

			if($head){
				$head.each(function () {
					$(this).prop({
						'checked':false
					});
				});
			}
		};

	}]);
