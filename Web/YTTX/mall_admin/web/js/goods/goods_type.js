(function($){
	'use strict';
	$(function(){

		var table=null/*数据展现*/;

		/*初始化数据*/
		if(public_tool.initMap.isrender){
			/*菜单调用*/
			var logininfo=public_tool.initMap.loginMap;
			public_tool.loadSideMenu(public_vars.$mainmenu,public_vars.$main_menu_wrap,{
				url:'../../json/menu.json',
				async:false,
				type:'post',
				param:{
					roleId:decodeURIComponent(logininfo.param.roleId),
					adminId:decodeURIComponent(logininfo.param.adminId),
					token:decodeURIComponent(logininfo.param.token)
				},
				datatype:'json'
			});


			/*权限调用*/
			var powermap=public_tool.getPower(),
				addtype_power=public_tool.getKeyPower('goods-addtype',powermap),
				edittype_power=public_tool.getKeyPower('goods-updatetype',powermap),
				deletetype_power=public_tool.getKeyPower('goods-deletetype',powermap);



			/*dom引用和相关变量定义*/
			var module_id='mall-goods-type'/*模块id，主要用于本地存储传值*/,
				$admin_addtype=$('#admin_addtype'),
				$admin_list_wrap=$('#admin_list_wrap'),
				dia=dialog({
					zIndex:2000,
					title:'温馨提示',
					okValue:'确定',
					width:300,
					ok:function(){
						this.close();
						return false;
					},
					cancel:false
				})/*一般提示对象*/,
				sureObj=public_tool.sureDialog(dia)/*回调提示对象*/,
				setSure=new sureObj();


			/*根据权限判断显示添加属性按钮*/
			if(addtype_power){
				$admin_addtype.removeClass('g-d-hidei');
			}else{
				$admin_addtype.addClass('g-d-hidei');
			}

			/*请求属性数据*/
			requestAttr();


			/*绑定操作分类列表*/
			$admin_list_wrap.on('click',function (e) {
				e.stopPropagation();
				e.preventDefault();

				var target= e.target,
					nodename=target.nodeName.toLowerCase(),
					$this,
					$li,
					$wrap,
					id,
					parentid,
					action;

				if(nodename==='td'||nodename==='tr'||nodename==='ul'){
					return false;
				}

				if(nodename==='span'){
					if(target.className.indexOf('btn')!==-1){
						/*操作*/
						$this=$(target);
						
						
						
					}else if(target.className.indexOf('main-typeicon')!==-1){
						/*展开或收缩*/
						$this=$(target);
						$wrap=$this.parent().find('>ul');
						$this.toggleClass('main-sub-typeicon');
						$wrap.toggleClass('g-d-hidei');
					}
					return false;
				}else if(nodename==='li'){
					if(target.className.indexOf('admin-subtypeitem')===-1){
						return false;
					}
					$li=$(target);
					$li.toggleClass('g-d-hidei');
				}else if(nodename==='div'){
					/*if(target.className.indexOf('typeitem')===-1){
						return false;
					}
					if(target.parentNode.className.indexOf('admin-subtypeitem')===-1){
						return false;
					}
					$li=$(target.parentNode);
					$wrap=$li.find('>ul');
					$wrap.toggleClass('g-d-hidei');*/
				}else if(nodename==='i'){

				}else if(nodename==='tr'){

				}


			});





		}
		
		function doActionType(obj) {
			var type=obj.type,
				id=obj.id,
				pid=obj.parentid;

			if(type==='edit'){

			}else if(type==='add'){

			}else if(type==='delete'){

			}else if(type==='attr'){

			}
			
		}


		/*获取数据*/
		function getColumnData(page,opt){
			if(table===null){
				table=opt.$admin_list_wrap.DataTable(opt.config);
			}else{
				table.ajax.config(opt.config.ajax).load();
			}
		}


		/*启用禁用*/
		function setEnabled(obj){
			var id=obj.id;

			if(typeof id==='undefined'){
				return false;
			}
			var tip=obj.tip,
				action=obj.action;

			$.ajax({
					url:"../../json/provider/mall_provider_list.json",
					dataType:'JSON',
					method:'post',
					data:{
						id:id,
						type:action,
						roleId:decodeURIComponent(logininfo.param.roleId),
						adminId:decodeURIComponent(logininfo.param.adminId),
						token:decodeURIComponent(logininfo.param.token)
					}
				})
				.done(function(resp){
					var code=parseInt(resp.code,10);
					if(code!==0){
						console.log(resp.message);
						tip.content('<span class="g-c-bs-warning g-btips-warn">'+(resp.message||"操作失败")+'</span>').show();
						setTimeout(function () {
							tip.close();
							if(operate_item){
								operate_item.removeClass('item-lighten');
								operate_item=null;
							}
						},2000);
						return false;
					}
					/*是否是正确的返回数据*/
					/*添加高亮状态*/
					tip.content('<span class="g-c-bs-success g-btips-succ">'+(action==="up"?'启用':'禁用')+'成功</span>').show();
					setTimeout(function () {
						tip.close();
						setTimeout(function () {
							operate_item=null;
							/*请求数据*/
							getColumnData(provider_page,provider_config);
						},1000);
					},1000);
				})
				.fail(function(resp){
					console.log(resp.message);
					tip.content('<span class="g-c-bs-warning g-btips-warn">'+(resp.message||"操作失败")+'</span>').show();
					setTimeout(function () {
						tip.close();
						if(operate_item){
							operate_item.removeClass('item-lighten');
							operate_item=null;
						}
					},2000);
				});
		}

		
		/*解析属性*/
		function resolveAttr(obj,limit) {
			if(!obj||typeof obj==='undefined'){
				return false;
			}
			if(limit<=0){
				limit=1;
			}
			var attrlist=obj,
				str='',
				i=0,
				len=attrlist.length,
				layer=1;

			if(typeof len==='undefined'){
				str+=doItems(attrlist,{
					flag:false,
					limit:limit,
					layer:layer
				});
				attrlist=attrlist["sublist"];
				len=attrlist.length;
			}

			if(len!==0){
				for(i;i<len;i++){
						var curitem=attrlist[i],
						subitem=typeof curitem["sublist"]==='undefined'?null:curitem["sublist"];
					if(subitem){
						var tempchild=doAttr(subitem,{
								limit:limit,
								layer:layer
							});

						if(tempchild){
							str+=doItems(curitem,{flag:true,limit:limit,layer:layer})+'<ul class="admin-typeitem-wrap admin-subtype-wrap g-d-hidei">'+tempchild+'</ul>\
						</li>';
						}
					}else{
						str+=doItems(curitem,{
							flag:false,
							limit:limit,
							layer:layer
						});
					}
				}
				return str;
			}else{
				return false;
			}
		}

		/*解析标签*/
		function doAttr(obj,config) {
			if(!obj||typeof obj==='undefined'){
				return false;
			}
			var attrlist=obj,
				str='',
				i=0,
				len=attrlist.length;

			var layer=config.layer,
				limit=config.limit;
			if(layer){
				layer++;
			}

			if(limit>=1&&layer>limit){
				return false;
			}

			if(len!==0){
				for(i;i<len;i++){
					var curitem=attrlist[i],
						subitem=typeof curitem["sublist"]==='undefined'?null:curitem["sublist"];
					if(subitem){
						var tempchild=doAttr(subitem,{
							limit:limit,
							layer:layer
						});
						if(tempchild){
							str+=doItems(curitem,{
									flag:true,
									limit:limit,
									layer:layer
								})+'<ul class="admin-typeitem-wrap admin-subtype-wrap g-d-hidei">'+tempchild+'</ul>\
							</li>';
						}
					}else{
						str+=doItems(curitem,{
							flag:false,
							limit:limit,
							layer:layer
						});
					}
				}
				return str;
			}else{
				return false;
			}
		}
		
		
		/*解析单个值*/
		function doItems(obj,config){
			var curitem=obj,
				id=curitem["id"],
				parentid=curitem["parentId"],
				isshow=parseInt(curitem["isshow"],10),
				str='',
				flag=config.flag,
				limit=config.limit,
				layer=config.layer;

			if(flag){
				if(layer>1){

				}else{

				}
				str='<li class="admin-subtypeitem" data-parentid="'+parentid+'" data-id="'+id+'">\
				'+(function(){
						var btn='';
						if(layer>1){
							btn+='<span class="typeitem subtype-mgap'+(layer - 1)+' main-typeicon g-w-percent4"></span>\
							<div class="typeitem subtype-pgap'+layer+' g-w-percent15">'+curitem["labelname"]+'</div>';
						}else{
							btn+='<span class="typeitem main-typeicon g-w-percent4"></span>\
							<div class="typeitem g-w-percent15">'+curitem["labelname"]+'</div>';
						}
						return btn;
				}())+'<div class="typeitem g-w-percent5">'+curitem["sort"]+'</div>\
								<div class="typeitem g-w-percent5">'+(isshow===0?'<div class="g-c-gray12">隐藏</div>':'<div class="g-c-gray8">显示</div>')+'</div>\
								<div class="typeitem g-w-percent20">'+(function () {
						var btn='';
						if(edittype_power){
							btn+='<span data-action="edit" data-parentid="'+parentid+'" data-id="'+id+'"  class="btn btn-white btn-icon btn-xs g-br2 g-c-gray8">\
										<i class="fa-pencil"></i>&nbsp;&nbsp;编辑\
									</span>';
						}
						if(addtype_power){
							btn+='<span data-action="add" data-parentid="'+parentid+'" data-id="'+id+'"  class="btn btn-white btn-icon btn-xs g-br2 g-c-gray8">\
										<i class="fa-plus"></i>&nbsp;&nbsp;新增下级分类\
									</span>';
						}
						if(deletetype_power){
							btn+='<span data-action="delete" data-parentid="'+parentid+'" data-id="'+id+'"  class="btn btn-white btn-icon btn-xs g-br2 g-c-gray8">\
										<i class="fa-trash"></i>&nbsp;&nbsp;删除\
									</span>';
						}
						return btn;
					}())+'</div>';
			}else{
				str='<li data-parentid="'+parentid+'" data-id="'+id+'">\
					'+(function(){
						var btn='';
						if(layer>1){
							btn+='<div class="typeitem subtype-pgap'+layer+' g-w-percent15">'+curitem["labelname"]+'</div>';
						}else{
							btn+='<div class="typeitem g-w-percent15">'+curitem["labelname"]+'</div>';
						}
						return btn;
					}())+'<div class="typeitem g-w-percent5">'+curitem["sort"]+'</div>\
								<div class="typeitem g-w-percent5">'+(isshow===0?'<div class="g-c-gray12">隐藏</div>':'<div class="g-c-gray8">显示</div>')+'</div>\
								<div class="typeitem g-w-percent20">'+(function () {
						var btn='';
						if(edittype_power){
							btn+='<span data-action="edit" data-parentid="'+parentid+'" data-id="'+id+'"  class="btn btn-white btn-icon btn-xs g-br2 g-c-gray8">\
									<i class="fa-pencil"></i>&nbsp;&nbsp;编辑\
								</span>';
						}
						if(layer<limit&&addtype_power){
							btn+='<span data-action="add" data-parentid="'+parentid+'" data-id="'+id+'"  class="btn btn-white btn-icon btn-xs g-br2 g-c-gray8">\
									<i class="fa-plus"></i>&nbsp;&nbsp;新增下级分类\
								</span>';
						}
						if(deletetype_power){
							btn+='<span data-action="delete" data-parentid="'+parentid+'" data-id="'+id+'"  class="btn btn-white btn-icon btn-xs g-br2 g-c-gray8">\
									<i class="fa-trash"></i>&nbsp;&nbsp;删除\
								</span>';
						}
						return btn;
					}())+'</div>\
				</li>';
			}
			return str;
		}
		
		/*请求属性*/
		function requestAttr(){
			$.ajax({
					url:"../../json/goods/mall_goods_type_all.json",
					dataType:'JSON',
					method:'post',
					data:{
						roleId:decodeURIComponent(logininfo.param.roleId),
						adminId:decodeURIComponent(logininfo.param.adminId),
						token:decodeURIComponent(logininfo.param.token)
					}
				})
				.done(function(resp){
					var code=parseInt(resp.code,10);
					if(code!==0){
						console.log(resp.message);
						dia.content('<span class="g-c-bs-warning g-btips-warn">'+(resp.message||"操作失败")+'</span>').show();
						setTimeout(function () {
							dia.close();
						},2000);
						return false;
					}
					var result=resp.result;
					if(result&&result.list){
						/*解析属性*/
						var result='<ul class="admin-typeitem-wrap admin-maintype-wrap">'+resolveAttr(result.list,4)+'</ul>';
						if(result){
							$(result).appendTo($admin_list_wrap.html(''));
						}else{
							$admin_list_wrap.addClass('g-t-c').html('暂无数据，请&nbsp;<span class="g-c-info">添加分类</span>');
						}
					}
				})
				.fail(function(resp){
					console.log(resp.message);
					dia.content('<span class="g-c-bs-warning g-btips-warn">'+(resp.message||"操作失败")+'</span>').show();
					setTimeout(function () {
						dia.close();
					},2000);
				});
			
		}






	});


})(jQuery);