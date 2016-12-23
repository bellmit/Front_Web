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
				param:{
					roleId:decodeURIComponent(logininfo.param.roleId),
					adminId:decodeURIComponent(logininfo.param.adminId),
					token:decodeURIComponent(logininfo.param.token)
				},
				datatype:'json'
			});


			/*权限调用*/
			var powermap=public_tool.getPower(),
				detailnotice_power=public_tool.getKeyPower('user-notice-detail',powermap),
				addnotice_power=public_tool.getKeyPower('user-addnotice',powermap);


			/*dom引用和相关变量定义*/
			var module_id='mall-announcement-add'/*模块id，主要用于本地存储传值*/,
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
				admin_addnotice_form=document.getElementById('admin_addnotice_form'),
				$admin_addnotice_form=$(admin_addnotice_form),
				$admin_id=$('#admin_id'),
				$admin_type=$('#admin_type'),
				$admin_time=$('#admin_time'),
				$member_wrap=$('#member_wrap'),
				$admin_member=$('#admin_member'),
				$member_tip=$('#member_tip'),
				$admin_content=$('#admin_content'),
				$admin_action=$('#admin_action'),
				resetform0=null;


			/*请求会员列表*/
			searchMemberData(1);



			/*编辑器调用并重置表单*/
			var editor=KE.create("#admin_content",{
				minHeight:'400px',
				height:'400px',
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
			editor.sync();
			admin_addnotice_form.reset();


			/*绑定切换发送类型*/
			$admin_type.find('input').on('change',function () {
				var $this=$(this),
					value=parseInt($this.val(),10);

				if(value===1){
					$member_wrap.removeClass('g-d-hidei');
				}else{
					$member_wrap.addClass('g-d-hidei');
				}

			});


			/*日历调用*/
			$.each([$admin_time],function(){
				this.val('').datepicker({
					autoclose:true,
					format: 'yyyy-mm-dd',
					todayBtn: true,
					endDate:moment().format('yyyy-mm-dd')
				})
			});


			/*获取编辑缓存*/
			(function () {
				var edit_cache=public_tool.getParams('mall-user-addnotice');
				if(edit_cache){
					if(detailnotice_power){
						$admin_action.removeClass('g-d-hidei').html('编辑');
						/*查询数据*/
						if(typeof edit_cache==='object'){
							setNoticeData(edit_cache['id']);
						}else{
							setNoticeData(edit_cache);
						}
					}else{
						$admin_action.addClass('g-d-hidei');
					}
				}else{
					if(addnotice_power){
						$admin_action.removeClass('g-d-hidei').html('发送');
					}else{
						$admin_action.addClass('g-d-hidei');
					}
				}
			}());



			/*绑定添加地址*/
			/*表单验证*/
			if($.isFunction($.fn.validate)) {
				/*配置信息*/
				var form_opt0={},
					formcache=public_tool.cache,
					basedata={
						roleId:decodeURIComponent(logininfo.param.roleId),
						token:decodeURIComponent(logininfo.param.token),
						adminId:decodeURIComponent(logininfo.param.adminId)
					};


				if(formcache.form_opt_0){
					$.each([formcache.form_opt_0],function(index){
						var formtype,
						config={
							dataType:'JSON',
							method:'post'
						};
						if(index===0){
							formtype='addnotice';
						}
						$.extend(true,(function () {
							if(formtype==='addnotice'){
								return form_opt0;
							}
						}()),(function () {
							if(formtype==='addnotice'){
								return formcache.form_opt_0;
							}
						}()),{
							submitHandler: function(form){
								var setdata={};

								$.extend(true,setdata,basedata);

								if(formtype==='addnotice'){

									/*同步编辑器*/
									editor.sync();
									$.extend(true,setdata,{
										time:$admin_time.val(),
										content:$admin_content.val()
									});

									var type=parseInt($admin_type.find(':checked').val(),10);
									setdata['type']=type;
									if(type===1){
										var memberList=getMemberData();
										if(memberList===null){
											$member_tip.html('请选择发送会员');
											$('html,body').scrollTop($admin_member.offset().top - 200);
											var $memberlabel=$admin_member.find('label:first-child');
											setTimeout(function () {
												$member_tip.html('');
											},3000);
											return false;
										}
										setdata['memberList']=memberList;
									}else{
										delete setdata['memberList'];
									}

                                    var id=$admin_id.val(),
										actiontype='';
                                    if(id!==''){
										/*修改操作*/
                                        setdata['id']=id;
										actiontype='修改';
										config['url']="../../json/user/mall_user_record.json";
                                    }else{
										/*新增操作*/
										config['url']="../../json/user/mall_user_record.json";
										actiontype='发送';
                                        delete setdata['id'];
                                    }
									config['data']=setdata;
								}

								$.ajax(config).done(function(resp){
									var code;
									if(formtype==='addnotice'){
										code=parseInt(resp.code,10);
										if(code!==0){
											dia.content('<span class="g-c-bs-warning g-btips-warn">'+actiontype+'通知失败</span>').show();
											return false;
										}else{
											dia.content('<span class="g-c-bs-success g-btips-succ">'+actiontype+'通知成功</span>').show();
										}
									}


									setTimeout(function () {
										dia.close();
										if(formtype==='addnotice'&&code===0){
											/*页面跳转*/
											location.href='mall-user-notice.html';
										}
									},2000);
								}).fail(function(resp){
									console.log('error');
								});
								return false;
							}
						});
					});

				}


				/*提交验证*/
				if(resetform0===null){
					resetform0=$admin_addnotice_form.validate(form_opt0);
				}
			}



		}


		/*修改时设置值*/
		function setNoticeData(id) {
			if(!id){
				return false;
			}


			$.ajax({
					url:"../../json/user/mall_user_record.json",
					dataType:'JSON',
					method:'post',
					data:{
						"id":id,
						"adminId":decodeURIComponent(logininfo.param.adminId),
						"token":decodeURIComponent(logininfo.param.token)
					}
				})
				.done(function(resp){
					var code=parseInt(resp.code,10);
					if(code!==0){
						console.log(resp.message);
						if(code===999){
							public_tool.loginTips(function () {
								public_tool.clear();
								public_tool.clearCacheData();
							});
						}
						return false;
					}
					/*是否是正确的返回数据*/
					var list=resp.result;

					if(!list){
						return false;
					}

					/*测试代码,正式环境去掉*/
					list=list['list'][id - 1];

					if(!$.isEmptyObject(list)){
						$admin_id.val(id);
						for(var m in list){
							switch(m){
								case 'type':
									(function () {
										var type=parseInt(list[m],10);
										if(type===1){
											$member_wrap.removeClass('g-d-hidei');
											var $checkbox=$admin_member.find('input'),
												memberlist=list['memberList'],
												len=memberlist.length,
												i=0;
											for(i;i<len;i++){
												var text=parseInt(memberlist[i],10);
												$checkbox.each(function (index) {
													var value=parseInt(this.value,10);
													if(value===text){
														$(this).prop({
															'checked':true
														});
														return false;
													}
												});
											}
										}else{
											$member_wrap.addClass('g-d-hidei');
										}

									}());
									break;
								case 'createTime':
									$admin_time.val(list[m]);
									break;
								case 'content':
									editor.html(list[m]);
									editor.sync();
									break;
							}
						}
					}
				})
				.fail(function(resp){
					console.log(resp.message);
				});

		}


		/*查询会员*/
		function searchMemberData(id) {
			if(!id){
				return false;
			}


			$.ajax({
					url:"../../json/user/mall_user_record.json",
					dataType:'JSON',
					method:'post',
					data:{
						"id":id,
						"adminId":decodeURIComponent(logininfo.param.adminId),
						"token":decodeURIComponent(logininfo.param.token)
					}
				})
				.done(function(resp){
					var code=parseInt(resp.code,10);
					if(code!==0){
						console.log(resp.message);
						if(code===999){
							public_tool.loginTips(function () {
								public_tool.clear();
								public_tool.clearCacheData();
							});
						}
						return false;
					}
					/*是否是正确的返回数据*/
					var list=resp.result;

					if(!list){
						return false;
					}

					/*测试代码,正式环境去掉*/
					var i=10,
						str='';
					for(i;i<=50;i++){
						str+='<label class="btn btn-white g-br3">会员'+i+'&nbsp;:&nbsp;\
								<input type="checkbox" value="'+i+'" name="member" />\
							</label>';
					}
					$(str).appendTo($admin_member.html(''));
				})
				.fail(function(resp){
					console.log(resp.message);
				});

		}


		/*获取会员列表*/
		function getMemberData() {
			var arr=[];
			$admin_member.find(':checked').each(function () {
				arr.push(this.value);
			});
			return arr.length===0?null:JSON.stringify(arr);
		}


	});



})(jQuery,KindEditor);