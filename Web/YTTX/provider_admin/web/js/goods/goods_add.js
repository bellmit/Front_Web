/*admin_member:成员设置*/
(function($,KE){
	'use strict';
	$(function(){
		/*初始化数据*/
		if(public_tool.initMap.isrender){
			/*菜单调用*/
			var logininfo=public_tool.initMap.loginMap;
			public_tool.loadSideMenu(public_vars.$mainmenu,public_vars.$main_menu_wrap,{
				url:'../../json/menu.json',
				async:false,
				type:'post',
				datatype:'json'
			});



			/*dom引用和相关变量定义*/
			var module_id='yttx-goods-add'/*模块id，主要用于本地存储传值*/,
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
				$admin_id=$('#admin_id'),
				$admin_goodsTypeId_Level1=$('#admin_goodsTypeId_Level1'),
				$admin_goodsTypeId_Level2=$('#admin_goodsTypeId_Level2'),
				$admin_goodsTypeId_Level3=$('#admin_goodsTypeId_Level3'),
				$admin_goodsTypeId_btn=$('#admin_goodsTypeId_btn'),
				$admin_slide_image=$('#admin_slide_image'),
				$admin_slide_btnl=$('#admin_slide_btnl'),
				$admin_slide_btnr=$('#admin_slide_btnr'),
				$admin_slide_tool=$('#admin_slide_tool'),
				$admin_slide_upload=$('#admin_slide_upload'),
				$admin_code=$('#admin_code'),
				$admin_name=$('#admin_name'),
				$admin_pricewrap=$('#admin_pricewrap'),
				$admin_attrwrap=$('#admin_attrwrap'),
				$admin_wholesale_price=$('#admin_wholesale_price'),
				$admin_retail_price=$('#admin_retail_price'),
				$admin_inventory=$('#admin_inventory'),
				$admin_color=$('#admin_color'),
				$admin_color_btn=$('#admin_color_btn'),
				$admin_rule=$('#admin_rule'),
				$admin_rule_btn=$('#admin_rule_btn'),
				$admin_wholesale_price_list=$('#admin_wholesale_price_list'),
				$admin_isRecommended=$('#admin_isRecommended'),
				$admin_details=$('#admin_details'),
				$admin_status=$('#admin_status'),
				$admin_goodsPictures0=$('#admin_goodsPictures0'),
				$admin_color_listbtn=$('#admin_color_listbtn'),
				$admin_color_list=$('#admin_color_list'),
				$admin_rule_listbtn=$('#admin_rule_listbtn'),
				$admin_rule_list=$('#admin_rule_list'),
				price_data={},
				attr_data={},
				admin_goodsadd_form=document.getElementById('admin_goodsadd_form'),
				$admin_goodsadd_form=$(admin_goodsadd_form),
				resetform=null;


			/*图片上传对象*/
			var $editor_image_toggle=$('#editor_image_toggle'),
				$editor_image_list=$('#editor_image_list'),
				$editor_image_upload=$('#editor_image_upload'),
				$editor_image_show=$('#editor_image_show'),
				$toggle_edit_btn=$('#toggle_edit_btn'),
				$img_url_upload=$('#img_url_upload')/*缩略图文件上传按钮*/;


			/*重置表单*/
			admin_goodsadd_form.reset();


			/*初始化查询查询类型*/
			var typeobj={
				$typeone:$admin_goodsTypeId_Level1,
				$typetwo:$admin_goodsTypeId_Level2,
				$typethree:$admin_goodsTypeId_Level3,
				userId:decodeURIComponent(logininfo.param.userId),
				token:decodeURIComponent(logininfo.param.token),
				providerId:decodeURIComponent(logininfo.param.providerId)
			};


			/*绑定查询选中*/
			$.each([$admin_goodsTypeId_Level1,$admin_goodsTypeId_Level2,$admin_goodsTypeId_Level3],function(){
				var self=this,
					selector=this.selector;

				/*初始化查询一级分类*/
				if(selector.indexOf('1')!==-1){
					getGoodsTypes('',typeobj,'one');
					if(!$.isEmptyObject(price_data)){
						$admin_attrwrap.addClass('g-d-hidei');
					}
				}

				this.on('change',function(){
					var value=$(this).val();
					if(selector.indexOf('1')!==-1){
						if(value===''){
							$admin_goodsTypeId_Level2.html('');
							$admin_goodsTypeId_Level3.html('');
							if($.isEmptyObject(price_data)){
								$admin_attrwrap.removeClass('g-d-hidei');
							}else{
								$admin_attrwrap.addClass('g-d-hidei');
							}
							attr_data={};
							$admin_color.find('input').val('');
							$admin_rule.find('input').val('');
							$admin_attrwrap.addClass('g-d-hidei');
							$admin_wholesale_price_list.html('').addClass('g-d-hidei');
							return false;
						}
						if($.isEmptyObject(price_data)){
							$admin_attrwrap.removeClass('g-d-hidei');
						}else{
							$admin_attrwrap.addClass('g-d-hidei');
						}
						$admin_wholesale_price_list.html('').addClass('g-d-hidei');
						getGoodsTypes(value,typeobj,'two');
					}else if(selector.indexOf('2')!==-1){
						if(value===''){
							$admin_goodsTypeId_Level3.html('');
							return false;
						}
						getGoodsTypes(value,typeobj,'three');
					}else if(selector.indexOf('3')!==-1){
						if(value===''){

							return false;
						}
					}
				});
			});


			/*绑定价格输入,属性*/
			$.each([$admin_wholesale_price,$admin_retail_price,$admin_inventory],function(){
				/*初始化*/
				var selector=this.selector;


				/*事件绑定*/
				this.on('focusout',function(){
					var value=this.value;
					if(value!==''){
						price_data[selector]=value;
					}else{
						if(typeof price_data[selector]!=='undefined'){
							delete price_data[selector];
						}
					}
					if($.isEmptyObject(price_data)){
						$admin_attrwrap.removeClass('g-d-hidei');
					}else{
						$admin_attrwrap.addClass('g-d-hidei');
						/*清除属性数据*/
						attr_data={};
						$.each([$admin_color,$admin_rule], function () {
							this.find('input').each(function () {
								$(this).val('');
							});
						});
						$.each([$admin_color_list.find('li.admin-list-widget-active'),$admin_rule_list.find('li.admin-list-widget-active')],function(){
							this.each(function(){
								$(this).removeClass('admin-list-widget-active');
							});
						});
					}
				});

				/*绑定价格格式化*/
				if(selector.indexOf('price')!==-1){
					this.on('keyup',function(e){
						var tempval=this.value,
							result=public_tool.moneyCorrect(tempval,12,true);
						this.value=result[0];
						public_tool.cursorPos(this,result[0],'.');
					});

				}
			});
			$.each([$admin_color,$admin_rule],function(){
				/*初始化*/
				var $input=this.find('input'),
					selector=$input.attr('name'),
					val=$input.val();

				if(val!==''){
					attr_data[selector]=val;
				}else{
					if(typeof attr_data[selector]!=='undefined'){
						delete attr_data[selector];
					}
				}
				if($.isEmptyObject(attr_data)){
					$admin_pricewrap.removeClass('g-d-hidei');
				}else{
					$admin_pricewrap.addClass('g-d-hidei');
				}

				/*事件绑定*/
				$input.on('focusout',function(){
					var value=this.value;
					if(value!==''){
						attr_data[selector]=value;
					}else{
						if(typeof attr_data[selector]!=='undefined'){
							delete attr_data[selector];
						}
					}
					if($.isEmptyObject(attr_data)){
						$admin_pricewrap.removeClass('g-d-hidei');
					}else{
						$admin_pricewrap.addClass('g-d-hidei');
						/*清除属性数据*/
						price_data={};
						$.each([$admin_wholesale_price,$admin_retail_price,$admin_inventory], function () {
							this.val('');
						});
					}
				});
			});




			/*绑定新增颜色和规格尺寸*/
			$.each([$admin_color_btn,$admin_rule_btn],function(){
				var self=this,
					iscolor=this.selector.indexOf('color')!==-1?true:false;

				this.on('click',function(){
					var $last=self.parent().prev('input'),
						$input=$last.clone(true).val(''),
						name=iscolor?$input.attr('name').replace('color',''):$input.attr('name').replace('rule','');

					$input.attr({
						'name':iscolor?'color'+(parseInt(name,10)+1):'rule'+(parseInt(name,10)+1)
					}).insertAfter($last);
				});




			});


			/*绑定查看属性列表*/
			$.each([$admin_color_listbtn,$admin_rule_listbtn],function(){

				var iscolor=this.selector.indexOf('color')!==-1?true:false;

				this.on('click',function(){
					if(iscolor){
						if($admin_color_list.hasClass('g-d-hidei')){
							$admin_color_list.removeClass('g-d-hidei');
						}else{
							$admin_color_list.addClass('g-d-hidei');
						}
					}else {
						if($admin_rule_list.hasClass('g-d-hidei')){
							$admin_rule_list.removeClass('g-d-hidei');
						}else{
							$admin_rule_list.addClass('g-d-hidei');
						}
					}
				});



			});


			/*绑定选择属性列表*/
			$.each([$admin_color_list,$admin_rule_list],function(){

				var self=this,
					iscolor=this.selector.indexOf('color')!==-1?true:false;

				this.on('click','li',function(){
					var $this=$(this),
						txt=$this.html(),
						count=0,
						size,
						$input;


					if($this.hasClass('admin-list-widget-active')){
						$this.removeClass('admin-list-widget-active');
						$input=iscolor?$admin_color.find('input'):$admin_rule.find('input');
						$input.each(function(){
							var $this=$(this);
							if($this.val()===txt){
								$this.val('');
								delete attr_data[$input.attr('name')];
								return false;
							}
						});
					}else{
						$this.addClass('admin-list-widget-active');

						if($.isEmptyObject(attr_data)){
							$input=iscolor?$admin_color.find('input:first-child'):$admin_rule.find('input:first-child');
							$input.val(txt);
							attr_data[$input.attr('name')]=txt;
						}else{
							$input=iscolor?$admin_color.find('input'):$admin_rule.find('input');
							size=$input.size();
							$input.each(function(){
								var $this=$(this);
								if($this.val()===''){
									$this.val(txt);
									attr_data[$input.attr('name')]=txt;
									return false;
								}
								count++;
							});
							if(count===size){
								var $lastinput=$input.eq(size-1),
									lasttxt=$lastinput.val(),
									lastname=$lastinput.attr('name');
								self.find('li.admin-list-widget-active').each(function(){
									var $templi=$(this),
										temptxt=$templi.html();
									if(lasttxt===temptxt){
										$templi.removeClass('admin-list-widget-active');
										delete attr_data[lastname];
										return false;
									}
								});
								$lastinput.val(txt);
								attr_data[lastname]=txt;
							}
						}
					}

				});



			});




			/*编辑器调用*/
			var editor=KE.create("#admin_details",{
					minHeight:'300px',
					height:'300px',
					filterMode :false,
					resizeType:1,/*改变外观大小模式*/
					bodyClass:"ke-admin-wrap",
					items:[
						'source', '|', 'undo', 'redo', '|', 'preview', 'print', 'template', 'code', 'cut', 'copy', 'paste',
						'plainpaste', 'wordpaste', '|', 'justifyleft', 'justifycenter', 'justifyright',
						'justifyfull', 'insertorderedlist', 'insertunorderedlist', 'indent', 'outdent', 'subscript',
						'superscript', 'clearhtml', 'quickformat', 'selectall', '|', 'fullscreen', '/',
						'formatblock', 'fontname', 'fontsize', '|', 'forecolor', 'hilitecolor', 'bold',
						'italic', 'underline', 'strikethrough', 'lineheight', 'removeformat', '|',
						'table', 'hr', 'emoticons', 'baidumap', 'pagebreak',
						'anchor', 'link', 'unlink', '|', 'about'
					],
					afterBlur:function(){
						/*失去焦点的回调*/
						this.sync();
					}
				});
			editor.html('');


			/*缩略图切换编辑状态*/
			$toggle_edit_btn.on('click',function(){
				var $this=$(this),
					isactive=$this.hasClass('toggle-edit-btnactive');
				if(isactive){
					$this.removeClass('toggle-edit-btnactive');
					$admin_goodsPictures0.prop({
						'readonly':true
					});
				}else{
					$this.addClass('toggle-edit-btnactive');
					$admin_goodsPictures0.prop({
						'readonly':false
					});
				}

			});



			/*绑定轮播图*/
			goodsSlide.GoodsSlide({
				$slide_tool:$admin_slide_tool,
				$image:$admin_slide_image,
				$btnl:$admin_slide_btnl,
				$btnr:$admin_slide_btnr,
				active:'admin-slide-active',
				len:5
			});




			/*绑定添加地址*/
			/*表单验证*/
			if($.isFunction($.fn.validate)) {
				/*配置信息*/
				var form_opt={},
					formcache=public_tool.cache;

				if(formcache.form_opt_0){
					$.extend(true,form_opt,formcache.form_opt_0,{
						submitHandler: function(form){
							$.ajax({
								url:"http://120.24.226.70:8081/yttx-providerbms-api/user/password/update",
								dataType:'JSON',
								method:'post',
								data:{
									userId:decodeURIComponent(logininfo.param.userId),
									token:decodeURIComponent(logininfo.param.token),
									providerId:decodeURIComponent(logininfo.param.providerId),
									password:$admin_password.val(),
									newPassword:$admin_newPassword.val()
								}
							}).done(function(resp){
								var code=parseInt(resp.code,10);
								if(code!==0){
									console.log(resp.message);
									dia.content('<span class="g-c-bs-warning g-btips-warn">修改密码失败</span>').show();
									setTimeout(function () {
										dia.close();
									},2000);
									return false;
								}

								dia.content('<span class="g-c-bs-success g-btips-succ">修改密码成功</span>').show();
								setTimeout(function () {
									dia.close();
								},2000);
							}).fail(function(resp){
								console.log('error');
							});

						}
					});
				}


				/*提交验证*/
				if(resetform===null){
					resetform=$admin_goodsadd_form.validate(form_opt);
				}

			}



		}


		/*级联类型查询*/
		function getGoodsTypes(value,obj,type){
			var typemap={
				'one':'一级',
				'two':'二级',
				'three':'三级'
			};

			$.ajax({
				url:"http://120.24.226.70:8081/yttx-providerbms-api/goodstypes",
				dataType:'JSON',
				method:'post',
				data:{
					userId:obj.userId,
					token:obj.token,
					providerId:obj.providerId,
					parentId:value
				}
			}).done(function(resp){
				var code=parseInt(resp.code,10);
				if(code!==0){
					if(code===999){
						/*清空缓存*/
						public_tool.clear();
						public_tool.clearCacheData();
						public_tool.loginTips();
					}
					console.log(resp.message);
					return false;
				}

				var result=resp.result.parentTypesList,
					len=result.length,
					i= 0,
					str='';

				if(len!==0){
					for(i;i<len;i++){
						if(i===0){
							str+='<option value="" selected >请选择'+typemap[type]+'分类</option><option value="'+result[i]["id"]+'" >'+result[i]["name"]+'</option>';
						}else{
							str+='<option value="'+result[i]["id"]+'" >'+result[i]["name"]+'</option>';
						}
					}
					if(type==='one'){
						$(str).appendTo(obj.$typeone.html(''));
					}else if(type==='two'){
						$(str).appendTo(obj.$typetwo.html(''));
					}else if(type==='three'){
						$(str).appendTo(obj.$typethree.html(''));
					}
				}else{
					console.log(resp.message||'error');
					if(type==='one'){
						obj.$typeone.html('');
						obj.$typetwo.html('');
						obj.$typethree.html('');
					}else if(type==='two'){
						obj.$typetwo.html('');
						obj.$typethree.html('');
					}else if(type==='three'){
						obj.$typethree.html('');
					}
				}
			}).fail(function(resp){
				console.log(resp.message||'error');
				if(type==='one'){
					obj.$typeone.html('');
					obj.$typetwo.html('');
					obj.$typethree.html('');
				}else if(type==='two'){
					obj.$typetwo.html('');
					obj.$typethree.html('');
				}else if(type==='three'){
					obj.$typethree.html('');
				}
			});

		};


		/*组合颜色与尺寸*/
		function groupCondition(obj){
			if(obj){

			}


		};



	});








})(jQuery,KindEditor);