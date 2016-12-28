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
		function resolveAttr(obj) {
			if(!obj||typeof obj==='undefined'){
				return false;
			}
			var attrlist=obj,
				str='',
				i=0,
				len=attrlist.length;

			if(len!==0){
				var keyedit='',
					keyadd='',
					keydelete='';
				if(edittype_power){
					keyedit='编辑';
				}
				if(addtype_power){
					keyadd='添加下级分类';
				}
				if(deletetype_power){
					keydelete='删除';
				}
				for(i;i<len;i++){
					var curitem=attrlist[i],
						subitem=typeof curitem["sublist"]==='undefined'?null:curitem["sublist"];

					str+='<li data-parentid="'+curitem["parentId"]+'" data-id="'+curitem["id"]+'" data-isshow="'+curitem["isshow"]+'">\
								<div class="g-w-percent20">'+curitem["labelname"]+'</div>\
								<div class="g-w-percent5">'+curitem["sort"]+'</div>\
								<div class="g-w-percent5">'+(parseInt(curitem["isshow"],10)===0?"隐藏":"显示")+'</div>\
								<div class="g-w-percent20">'+keyedit+keyadd+keydelete+'</div>\
						</li>';
					if(subitem){
						str+='</li><li><ul class="admin-typeitem-wrap admin-subtype-wrap">'+doAttr(subitem,{
								keyedit:keyedit,
								keyadd:keyadd,
								keydelete:keydelete
							})+'</ul></li>';
					}else{
						str+='</li>';
					}
				}
				return '<ul class="admin-typeitem-wrap admin-maintype-wrap">'+str+'</ul>';
			}else{
				return false;
			}
		}

		/*解析标签*/
		function doAttr(obj,config) {
			if(!obj||typeof obj==='undefined'){
				return '';
			}
			var attrlist=obj,
				str='',
				i=0,
				len=attrlist.length;

			if(len!==0){
				for(i;i<len;i++){
					var curitem=attrlist[i],
						subitem=typeof curitem["sublist"]==='undefined'?null:curitem["sublist"];
					if(subitem){
						return resolveAttr(subitem);
					}else{
						str+='<li data-parentid="'+curitem["parentId"]+'" data-id="'+curitem["id"]+'" data-isshow="'+curitem["isshow"]+'">\
									<div class="g-w-percent20">'+curitem["labelname"]+'</div>\
									<div class="g-w-percent5">'+curitem["sort"]+'</div>\
									<div class="g-w-percent5">'+(parseInt(curitem["isshow"],10)===0?"隐藏":"显示")+'</div>\
									<div class="g-w-percent20">'+config.keyedit+config.keyadd+config.keydelete+'</div>\
							</li>';
					}
				}
				return str;
			}else{
				return '';
			}
		}
		
		/*请求属性*/
		function requestAttr() {
			$.ajax({
					url:"../../json/goods/mall_goods_type.json",
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
						var result=resolveAttr(result.list);
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