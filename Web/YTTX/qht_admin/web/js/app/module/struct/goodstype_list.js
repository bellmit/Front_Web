$(function(){

	requestAttr();

	/*恢复默认(原来)数据(编辑状态)*/
	function resetGoodsTypeData($li){
		var $edit=$li.find('>.typeitem-edit'),
			$edititem=$edit.find('.typeitem'),
			i=0,
			len=4;

		/*清除上传配置信息*/
		if(operate_current!==null){
			operate_current=null;
		}

		for(i;i<len;i++){
			var $item=$edititem.eq(i),
				oldvalue='',
				$this;
			if(i===0||i===2){
				$this=$item.find('input');
				oldvalue=$this.attr('data-value');
				$this.val(oldvalue);
			}else if(i===1){
				$this=$item.find('.typeitem-preview');
				oldvalue=$this.attr('data-value');
				var $show=$this.prev();
				if($this.hasClass('typeitem-preview-active')){
					$show.trigger('click');
				}
				if($show.attr('data-value')!==oldvalue){
					$this.find('img').attr({
						'src':oldvalue
					});
					$show.attr({
						'data-value':oldvalue
					});
				}
			}else if(i===3){
				oldvalue=$item.attr('data-value');
				$item.find('input').each(function () {
					$this=$(this);
					var tempvalue=$this.val();
					if(tempvalue===oldvalue){
						$this.prop({
							'checked':true
						});
						return false;
					}
				});
			}
		}
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
	function requestAttr(config){
		$.ajax({
				url:"http://10.0.5.226:8082/mall-buzhubms-api/goodstype/list",
				dataType:'JSON',
				async:false,
				method:'post',
				data:{
					parentId:'',
					roleId:decodeURIComponent(logininfo.param.roleId),
					adminId:decodeURIComponent(logininfo.param.adminId),
					grade:decodeURIComponent(logininfo.param.grade),
					token:decodeURIComponent(logininfo.param.token),
					page:config.page,
					pageSize:config.pageSize
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
				if(result){
					/*分页调用*/
					if(result.count!==0){
						config.total=result.count;
						$admin_page_wrap.pagination({
							pageSize:config.pageSize,
							total:config.total,
							pageNumber:config.page,
							onSelectPage:function(pageNumber,pageSize){
								/*再次查询*/
								requestAttr({
									pageSize:pageSize,
									page:pageNumber,
									total:config.total
								});
							}
						});
					}else{
						config.total=0;
					}
					if(result.list){
						/*解析属性*/
						var str='<ul class="admin-typeitem-wrap admin-maintype-wrap">'+resolveAttr(result.list,3)+'</ul>';
						if(str){
							$(str).appendTo($admin_list_wrap.html(''));
						}else{
							$admin_list_wrap.addClass('g-t-c').html('暂无数据，请&nbsp;<span class="g-c-info">添加分类</span>');
						}
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

	/*上传适配操作*/
	function goodsTypeUpload(config){
		var domain=config.domain,
			name=config.name,
			type=$admin_list_wrap.attr('data-type'),
			suffix='?imageView2/1/w/160/h/160',
			url=domain+'/'+name.key;

		if(type==='add'){
			$admin_typeimage.attr({
				'data-image':url
			}).html('<img src="'+url+suffix+'" alt="缩略图">');
		}else if(type==='edit'){
			if(operate_current!==null){
				var $btn=operate_current.$btn,
					$item=$btn.parent(),
					$show=$btn.next(),
					$wrap=$item.find('.typeitem-preview');


				/*设置查看*/
				$show.attr({
					'data-value':url
				});
				$wrap.attr({
					'data-value':url
				}).find('div').html('<img src="'+url+suffix+'" alt="缩略图">');

				if(!$wrap.hasClass('typeitem-preview-active')){
					$show.trigger('click');
				}
			}
		}
	}


});