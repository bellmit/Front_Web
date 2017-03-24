(function($){
	'use strict';
	$(function(){

		var table=null/*数据展现*/;

		/*初始化数据*/
		if(public_tool.initMap.isrender){
			/*菜单调用*/
			var logininfo=public_tool.initMap.loginMap;
			public_tool.loadSideMenu(public_vars.$mainmenu,public_vars.$main_menu_wrap,{
				url:'http://10.0.5.226:8082/mall-buzhubms-api/module/menu',
				async:false,
				type:'post',
				param:{
					roleId:decodeURIComponent(logininfo.param.roleId),
					adminId:decodeURIComponent(logininfo.param.adminId),
					grade:decodeURIComponent(logininfo.param.grade),
					token:decodeURIComponent(logininfo.param.token)
				},
				datatype:'json'
			});


			/*权限调用*/
			var powermap=public_tool.getPower(),
				goodstypeadd_power=public_tool.getKeyPower('bzw-goodstype-addlower',powermap),
				goodstypeedit_power=public_tool.getKeyPower('bzw-goodstype-edit',powermap),
				goodstypedelete_power=public_tool.getKeyPower('bzw-goodstype-delete',powermap);



			/*dom引用和相关变量定义*/
			var module_id='bzw-goodstype-list'/*模块id，主要用于本地存储传值*/,
				$admin_list_wrap=$('#admin_list_wrap'),
				$admin_page_wrap=$('#admin_page_wrap'),
				page_config={
					page:1,
					pageSize:10,
					total:0
				},
				subconfig={
					adminId:decodeURIComponent(logininfo.param.adminId),
					token:decodeURIComponent(logininfo.param.token),
					pageSize:10000
				}/*子菜单配置对象*/,
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
				$admin_errortip_wrap=$('#admin_errortip_wrap'),
				resetform0=null,
				sureObj=public_tool.sureDialog(dia)/*回调提示对象*/,
				setSure=new sureObj();



			/*新增类弹出框*/
			var $addgoodstype_wrap=$('#addgoodstype_wrap'),
				admin_addgoodstype_form=document.getElementById('admin_addgoodstype_form'),
				$admin_addgoodstype_form=$(admin_addgoodstype_form),
				$admin_typeparentname=$('#admin_typeparentname'),
				$admin_typeparentlayer=$('#admin_typeparentlayer'),
				$admin_typecode=$('#admin_typecode'),
				$admin_typename=$('#admin_typename'),
				$admin_typesort=$('#admin_typesort'),
				$admin_typeremark=$('#admin_typeremark'),
				$admin_typeshow=$('#admin_typeshow'),
				$admin_typeimage=$('#admin_typeimage'),
				$image_url_file=$('#image_url_file'),
				operate_current=null;


			/*上传对象*/
			var logo_QN_Upload=new QiniuJsSDK(),
				ImageUpload_Token=getToken()||null,
				upload_bars= [];


			/*重置表单*/
			admin_addgoodstype_form.reset();


			/*请求属性数据*/
			requestAttr(page_config);






		}


		/*删除操作*/
		function goodsTypeDelete(obj) {
			var id=obj.id;

			if(typeof id==='undefined'||id===''){
				return false;
			}
			var tip=obj.tip,
				$li=obj.$li;

			$.ajax({
					url:"http://10.0.5.226:8082/mall-buzhubms-api/goodstype/delete",
					dataType:'JSON',
					method:'post',
					data:{
						ids:obj.id,
						roleId:decodeURIComponent(logininfo.param.roleId),
						adminId:decodeURIComponent(logininfo.param.adminId),
						grade:decodeURIComponent(logininfo.param.grade),
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
					tip.content('<span class="g-c-bs-success g-btips-succ">删除成功</span>').show();
					setTimeout(function () {
						tip.close();
						setTimeout(function () {
							operate_item=null;
							$li.remove();
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

		/*编辑操作*/
		function goodsTypeEdit(obj) {
			var id=obj.id;

			if(typeof id==='undefined'||id===''){
				return false;
			}
			var tip=obj.tip,
				$li=obj.$li,
				result=obj.result,
				param={
					id:obj.id,
					name:result[0],
					sort:result[2],
					isVisible:parseInt(result[3],10)===1?true:false,
					roleId:decodeURIComponent(logininfo.param.roleId),
					adminId:decodeURIComponent(logininfo.param.adminId),
					grade:decodeURIComponent(logininfo.param.grade),
					token:decodeURIComponent(logininfo.param.token)
				};

			if(result[1]!==''){
				param['imageUrl']=result[1];
			}
			$.ajax({
					url:"http://10.0.5.226:8082/mall-buzhubms-api/goodstype/update",
					dataType:'JSON',
					method:'post',
					data:param
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
					tip.content('<span class="g-c-bs-success g-btips-succ">编辑成功</span>').show();
					/*更新数据*/
					updateGoodsTypeDataByEdit($li);
					setTimeout(function () {
						/*释放内存*/
						if(operate_current!==null){
							operate_current=null;
						}
						tip.close();
						setTimeout(function () {
							if(operate_item){
								operate_item.removeClass('item-lighten');
								operate_item=null;
								$li.removeClass('typeitem-editwrap');
							}
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

		/*新增分类*/
		function goodsTypeAdd(config){
			/*重置表单*/
			admin_addgoodstype_form.reset();
			/*初始化设置值*/
			/*设置数据*/
			$admin_typeparentname.attr({
				'data-value':config.parentid
			}).html(config.label);
			$admin_typeparentlayer.html(config.layer+'级分类');
			$addgoodstype_wrap.modal('show',{
				backdrop:'static'
			});
		}


		/*更新原来值(编辑状态)*/
		function updateGoodsTypeDataByEdit($li){
			var $showwrap=$li.find('>.typeitem-default'),
				$editwrap=$li.find('>.typeitem-edit'),
				$showitem=$showwrap.find('.typeitem'),
				$edititem=$editwrap.find('.typeitem'),
				i=0,
				len=4,
				issub=$li.hasClass('admin-subtypeitem');

			for(i;i<len;i++){
				var $curitem=$edititem.eq(i),
					newvalue,
					$this;

				if(i===0){
					$this=$curitem.find('input');
					newvalue=$this.val();
					$this.attr({
						'data-value':newvalue
					});
					if(issub){
						$showitem.eq(1).html(newvalue);
					}else{
						$showitem.eq(0).html(newvalue);
					}
				}else if(i===2){
					$this=$curitem.find('input');
					newvalue=$this.val();
					$this.attr({
						'data-value':newvalue
					});
					if(issub){
						$showitem.eq(2).html(newvalue);
					}else{
						$showitem.eq(1).html(newvalue);
					}
				}else if(i===3){
					$this=$curitem.find(':checked');
					newvalue=parseInt($this.val(),10);
					$curitem.attr({
						'data-value':newvalue
					});
					if(issub){
						if(newvalue===0){
							$showitem.eq(3).html('<div class="g-c-gray12">隐藏</div>');
						}else if(newvalue===1){
							$showitem.eq(3).html('<div class="g-c-gray8">显示</div>');
						}
					}else{
						if(newvalue===0){
							$showitem.eq(2).html('<div class="g-c-gray12">隐藏</div>');
						}else if(newvalue===1){
							$showitem.eq(2).html('<div class="g-c-gray8">显示</div>');
						}
					}
				}
			}
		}

		/*解析属性--开始解析*/
		function resolveAttr(obj,limit) {
			if(!obj||typeof obj==='undefined'){
				return false;
			}
			if(typeof limit==='undefined'||limit<=0){
				limit=1;
			}
			var attrlist=obj,
				str='',
				i=0,
				len=attrlist.length,
				layer=1;

			if(len!==0){
				for(i;i<len;i++){
						var curitem=attrlist[i],
							hassub=curitem["hasSub"];
					if(hassub){
						str+=doItems(curitem,{
								flag:true,
								limit:limit,
								layer:layer,
								parentid:''
							})+'<ul class="admin-typeitem-wrap admin-subtype-wrap g-d-hidei"></ul></li>';
					}else{
						str+=doItems(curitem,{
							flag:false,
							limit:limit,
							layer:layer,
							parentid:''
						});
					}
				}
				return str;
			}else{
				return false;
			}
		}

		/*解析属性--递归解析*/
		function doAttr(obj,config) {
			if(!obj||typeof obj==='undefined'){
				return false;
			}
			var attrlist=obj,
				str='',
				i=0,
				len=attrlist.length;

			var layer=config.layer,
				limit=config.limit,
				parentid=config.parentid;
			if(typeof layer!=='undefined'){
				layer++;
			}

			if(limit>=1&&layer>limit){
				return false;
			}

			if(len!==0){
				for(i;i<len;i++){
					var curitem=attrlist[i],
						hassub=curitem["hasSub"];
					if(hassub){
						str+=doItems(curitem,{
								flag:true,
								limit:limit,
								layer:layer,
								parentid:parentid
							})+'<ul class="admin-typeitem-wrap admin-subtype-wrap g-d-hidei"></ul></li>';
					}else{
						str+=doItems(curitem,{
							flag:false,
							limit:limit,
							layer:layer,
							parentid:parentid
						});
					}
				}
				return str;
			}else{
				return false;
			}
		}

		/*解析属性--公共解析*/
		function doItems(obj,config){
			var curitem=obj,
				id=curitem["id"],
				isshow=curitem["isVisible"],
				sort=curitem["sort"],
				gtCode=curitem["gtCode"],
				imgurl=curitem["imageUrl"],
				label=curitem["name"],
				str='',
				stredit='',
				flag=config.flag,
				limit=config.limit,
				layer=config.layer,
				parentid=config.parentid;


			if(flag){
				str='<li class="admin-subtypeitem" data-parentid="'+parentid+'" data-label="'+label+'" data-layer="'+layer+'" data-id="'+id+'" data-gtcode="'+gtCode+'">';
				if(layer>1){
					str+='<div class="typeitem-default"><span data-loadsub="0" class="typeitem subtype-mgap'+(layer - 1)+' main-typeicon g-w-percent3"></span>\
							<div class="typeitem subtype-pgap'+layer+' g-w-percent21">'+label+'</div>';
				}else{
					str+='<div class="typeitem-default"><span data-loadsub="0" class="typeitem main-typeicon g-w-percent3"></span>\
							<div class="typeitem g-w-percent21">'+label+'</div>';
				}
			}else{
				str='<li data-label="'+label+'" data-parentid="'+parentid+'"  data-layer="'+layer+'" data-id="'+id+'" data-gtcode="'+gtCode+'">';

				if(layer>1){
					str+='<div class="typeitem-default"><div class="typeitem subtype-pgap'+layer+' g-w-percent21">'+label+'</div>';
				}else{
					str+='<div class="typeitem-default"><div class="typeitem g-w-percent21">'+label+'</div>';
				}
			}

			str+='<div class="typeitem g-w-percent5">'+sort+'</div>';


			/*编辑状态*/
			stredit+='<div class="typeitem-edit"><div class="typeitem g-w-percent11"><input type="text" name="typename" data-value="'+label+'"  placeholder="请输入分类名称" value="'+label+'" /></div>\
								<div class="typeitem g-w-percent10">\
									<span data-action="upload" data-value="" class="btn btn-white btn-icon btn-xs g-br2 g-c-gray8"><i class="fa-upload"></i>&nbsp;&nbsp;上传</span>'
									+(function (){
										if(typeof imgurl==='undefined'||!imgurl||imgurl===''){
											return '<span data-action="preview" data-value="" class="btn btn-white btn-icon btn-xs g-br2 g-c-gray8"><i class="fa-image"></i>&nbsp;&nbsp;查看分类图标</span><div class="typeitem-preview" data-value=""><div></div></div>';
										}else{
											return '<span data-action="preview" data-value="'+imgurl+'" class="btn btn-white btn-icon btn-xs g-br2 g-c-gray8"><i class="fa-image"></i>&nbsp;&nbsp;查看分类图标</span><div class="typeitem-preview"  data-value="'+imgurl+'"><div><img src="'+imgurl+'" alt="预览" /></div></div>';
										}
									}())+
								'</div>\
								<div class="typeitem g-w-percent5"><input type="text" name="typesort" data-value="'+sort+'" maxlength="6" value="'+sort+'" /></div>';




			if(isshow){
				str+='<div class="typeitem g-w-percent8"><div class="g-c-gray8">显示</div></div>';

				stredit+='<div class="typeitem g-w-percent8" data-value="1"><label class="btn btn-white btn-xs g-br2 g-c-gray6">显示：<input type="radio" checked name="typeshow'+id+'" value="1" /></label>\
				<label class="btn btn-white btn-xs g-br2 g-c-gray6">隐藏：<input type="radio" name="typeshow'+id+'" value="0" /></label></div>';
			}else if(!isshow){
				str+='<div class="typeitem g-w-percent8"><div class="g-c-gray12">隐藏</div></div>';

				stredit+='<div class="typeitem g-w-percent8" data-value="0"><label class="btn btn-white btn-xs g-br2 g-c-gray6">显示：<input type="radio" name="typeshow'+id+'" value="1" /></label>\
				<label class="btn btn-white btn-xs g-br2 g-c-gray6">隐藏：<input checked type="radio"  name="typeshow'+id+'" value="0" /></label></div>';
			}else{
				stredit+='<div class="typeitem g-w-percent8" data-value="1"><label class="btn btn-white btn-xs g-br2 g-c-gray6">显示：<input type="radio" checked name="typeshow'+id+'" value="1" /></label>\
				<label class="btn btn-white btn-xs g-br2 g-c-gray6">隐藏：<input type="radio" name="typeshow'+id+'" value="0" /></label></div>';
			}


			str+='<div class="typeitem g-w-percent12">';
			stredit+='<div class="typeitem g-w-percent12">';


			if(goodstypeedit_power){
				str+='<span data-parentid="'+parentid+'"  data-action="edit" data-gtcode="'+gtCode+'" data-id="'+id+'"  class="btn btn-white btn-icon btn-xs g-br2 g-c-gray8">\
							<i class="fa-pencil"></i>&nbsp;&nbsp;编辑\
						</span>';

				/*编辑状态*/
				stredit+='<span data-parentid="'+parentid+'"  data-action="confirm"  data-gtcode="'+gtCode+'" data-id="'+id+'"  class="btn btn-white btn-icon btn-xs g-br2 g-c-bs-success">\
									<i class="fa-check"></i>&nbsp;&nbsp;确定\
								</span>\
								<span data-action="cance"  data-gtcode="'+gtCode+'" data-id="'+id+'"  class="btn btn-white btn-icon btn-xs g-br2 g-c-gray10">\
									<i class="fa-close"></i>&nbsp;&nbsp;取消\
								</span>';
			}
			if(goodstypeadd_power){
				if(flag){
					str+='<span data-parentid="'+parentid+'"  data-action="add"  data-gtcode="'+gtCode+'" data-id="'+id+'"  class="btn btn-white btn-icon btn-xs g-br2 g-c-gray8">\
							<i class="fa-plus"></i>&nbsp;&nbsp;新增下级分类\
						</span>';
				}else{
					if(layer<limit){
						str+='<span data-parentid="'+parentid+'"  data-action="add"  data-gtcode="'+gtCode+'" data-id="'+id+'"  class="btn btn-white btn-icon btn-xs g-br2 g-c-gray8">\
									<i class="fa-plus"></i>&nbsp;&nbsp;新增下级分类\
								</span>';
					}
				}
			}

			if(goodstypedelete_power){
				str+='<span data-parentid="'+parentid+'"  data-action="delete"  data-gtcode="'+gtCode+'" data-id="'+id+'"  class="btn btn-white btn-icon btn-xs g-br2 g-c-gray8">\
							<i class="fa-trash"></i>&nbsp;&nbsp;删除\
						</span>';
			}

			str+='</div></div>';
			stredit+='</div></div>';

			return flag?str+stredit:str+stredit+'</li>';
		}

		/*请求并判断是否存在子菜单*/
		function doSubAttr(id) {
			var list=null;
			if(typeof id==='undefined'){
				return null;
			}
			subconfig['parentId']=id;
			$.ajax({
					url:"http://10.0.5.226:8082/mall-buzhubms-api/goodstype/list",
					dataType:'JSON',
					async:false,
					method:'post',
					data:subconfig
				})
				.done(function(resp){
					var code=parseInt(resp.code,10);
					if(code!==0){
						console.log(resp.message);
						return null;
					}
					var result=resp.result;
					if(result){
						list=result.list;
						return null;
					}
				})
				.fail(function(resp){
					console.log(resp.message);
					return null;
				});
			return list.length===0?null:list;
		}
		
		/*请求属性*/
		/*解析属性*/
		/*


		var str='<ul class="admin-typeitem-wrap admin-maintype-wrap">'+resolveAttr(result.list,3)+'</ul>';
		if(str){
			$(str).appendTo($admin_list_wrap.html(''));
		}else{
			$admin_list_wrap.addClass('g-t-c').html('暂无数据，请&nbsp;<span class="g-c-info">添加分类</span>');


			*/


	});


})(jQuery);