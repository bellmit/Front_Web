/*admin_member:成员设置*/
(function($){
	'use strict';
	$(function(){
		/*初始化数据*/
		if(public_tool.initMap.isrender){
			/*菜单调用*/
			var logininfo=public_tool.initMap.loginMap;
			public_tool.loadSideMenu(public_vars.$mainmenu,public_vars.$main_menu_wrap,{
				url:'http://120.76.237.100:8081/mall-agentbms-api/module/menu',
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
				agentedit_power=public_tool.getKeyPower('mall-agent-update',powermap),
				agentadd_power=public_tool.getKeyPower('mall-agent-add',powermap);


			/*dom引用和相关变量定义*/
			var module_id='mall-agent-add'/*模块id，主要用于本地存储传值*/,
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
				admin_agent_form=document.getElementById('admin_agent_form'),
				$admin_agent_form=$(admin_agent_form),
				$admin_id=$('#admin_id'),
				$admin_userwrap=$('#admin_userwrap'),
				$admin_username=$('#admin_username'),
				$admin_password=$('#admin_password'),
				$admin_name=$('#admin_name'),
				$admin_grade=$('#admin_grade'),
				$admin_parentId=$('#admin_parentId'),
				$admin_gradewrap=$('#admin_gradewrap'),
				$admin_gradeAAA=$('#admin_gradeAAA'),
				$admin_gradeAA=$('#admin_gradeAA'),
				$admin_gradeA=$('#admin_gradeA'),
				$admin_gradeSS=$('#admin_gradeSS'),
				gradeobj={
					AAA:$admin_gradeAAA,
					AA:$admin_gradeAA,
					A:$admin_gradeA,
					SS:$admin_gradeSS,
					parentWrap:$admin_parentId,
					gradeWrap:$admin_gradewrap
				},
				grade_data=null,
				$admin_fullName=$('#admin_fullName'),
				$admin_shortName=$('#admin_shortName'),
				$admin_adscriptionRegion=$('#admin_adscriptionRegion'),
				$admin_linkman=$('#admin_linkman'),
				$admin_cellphone=$('#admin_cellphone'),
				$admin_telephone=$('#admin_telephone'),
				$admin_province=$('#admin_province'),
				$admin_city=$('#admin_city'),
				$admin_country=$('#admin_country'),
				$admin_address=$('#admin_address'),
				$admin_isAudited=$('#admin_isAudited'),
				$admin_status=$('#admin_status'),
				$admin_salesmanId=$('#admin_salesmanId'),
				$admin_remark=$('#admin_remark'),
				$admin_action=$('#admin_action'),
				resetform0=null;



			/*重置表单*/
			admin_agent_form.reset();


			/*查询上级代理商ID*/
			requestGrade(function(resp){
				/*初始化代理商级别*/
				setGradeShow(gradeobj,resp.result);
				grade_data=resp.result;
			});


			/*查询可用业务员Id*/
			getSalesmanId();

			/*格式化手机号码*/
			$.each([$admin_cellphone],function(){
				this.on('keyup',function(){
					var phoneno=this.value.replace(/\D*/g,'');
					if(phoneno==''){
						this.value='';
						return false;
					}
					this.value=public_tool.phoneFormat(this.value);
				});
			});


			/*获取编辑缓存*/
			var edit_cache=public_tool.getParams('mall-agent-add');
			if(edit_cache){
				$admin_action.html('修改');
				$admin_username.prop({
					'readonly':true
				});
				/*判断权限*/
				if(agentedit_power){
					$admin_action.removeClass('g-d-hidei');
				}else{
					$admin_action.addClass('g-d-hidei');
				}
				setAgentData(edit_cache);
			}else{
				/*判断权限*/
				if(agentadd_power){
					$admin_action.removeClass('g-d-hidei');
				}else{
					$admin_action.addClass('g-d-hidei');
				}
				/*获取地址*/
				getAddress(null);
			}


			/*绑定添加地址*/
			/*表单验证*/
			if($.isFunction($.fn.validate)) {
				/*配置信息*/
				var form_opt0={},
					formcache=public_tool.cache,
					basedata={
						roleId:decodeURIComponent(logininfo.param.roleId),
						token:decodeURIComponent(logininfo.param.token),
						adminId:decodeURIComponent(logininfo.param.adminId),
						loginGrade:decodeURIComponent(logininfo.param.grade)
					};


				if(formcache.form_opt_0){
					$.each([formcache.form_opt_0],function(index){
						var formtype,
						config={
							dataType:'JSON',
							method:'post'
						};
						if(index===0){
							formtype='addagent';
						}
						$.extend(true,(function () {
							if(formtype==='addagent'){
								return form_opt0;
							}
						}()),(function () {
							if(formtype==='addagent'){
								return formcache.form_opt_0;
							}
						}()),{
							submitHandler: function(form){
								var setdata={};

								$.extend(true,setdata,basedata);

								if(formtype==='addagent'){

									/*同步编辑器*/
									$.extend(true,setdata,{
										password:$admin_password.val(),
										name:$admin_name.val(),
										parentId:$admin_parentId.attr('data-grade')==='-1'?'':$admin_parentId.attr('data-id'),
										grade:$admin_gradewrap.find('input:checked').val(),
										fullName:$admin_fullName.val(),
										shortName:$admin_shortName.val(),
										adscriptionRegion:$admin_adscriptionRegion.val(),
										linkman:$admin_linkman.val(),
										cellphone:public_tool.trims($admin_cellphone.val()),
										telephone:public_tool.trims($admin_telephone.val()),
										province:$admin_province.find(':selected').val(),
										city:$admin_city.find(':selected').val(),
										country:$admin_country.find(':selected').val(),
										address:$admin_address.val(),
										isAudited:$admin_isAudited.find(':selected').val(),
										status:$admin_status.find(':selected').val(),
										salesmanId:$admin_salesmanId.find(':selected').val(),
										remark:$admin_remark.val()
									});

                                    var id=$admin_id.val(),
										actiontype='';
                                    if(id!==''){
										/*修改操作*/
                                        setdata['id']=id;
										actiontype='修改';
										delete setdata['username'];
                                    }else{
										/*新增操作*/
										actiontype='新增';
										setdata['username']=$admin_username.val();
                                        delete setdata['id'];
                                    }
									config['url']="http://120.76.237.100:8081/mall-agentbms-api/agent/addupdate";
									config['data']=setdata;
								}

								$.ajax(config).done(function(resp){
									var code;
									if(formtype==='addagent'){
										code=parseInt(resp.code,10);
										if(code!==0){
											dia.content('<span class="g-c-bs-warning g-btips-warn">'+actiontype+'代理商失败</span>').show();
											return false;
										}else{
											dia.content('<span class="g-c-bs-success g-btips-succ">'+actiontype+'代理商成功</span>').show();
										}
									}


									setTimeout(function () {
										dia.close();
										if(formtype==='addagent'){
											/*页面跳转*/
											location.href='mall-agent-list.html';
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
					resetform0=$admin_agent_form.validate(form_opt0);
				}
			}


		}


		


		/*查询地址*/
		function getAddress(id,type) {
			if(!id){
				var id='86';
			}
			$.ajax({
					url:"http://120.24.226.70:8081/yttx-public-api/address/get",
					dataType:'JSON',
					method:'post',
					data:{
						parentCode:id,
						"adminId":decodeURIComponent(logininfo.param.adminId),
						"token":decodeURIComponent(logininfo.param.token),
						"grade":decodeURIComponent(logininfo.param.grade)
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
					/*是否是正确的返回数据*/
					var list=resp.result,
						str='',
						istitle=false;

				})
				.fail(function(resp){
					console.log(resp.message);
					dia.content('<span class="g-c-bs-warning g-btips-warn">'+(resp.message||"操作失败")+'</span>').show();
					setTimeout(function () {
						dia.close();
					},2000);
				});
		}


		/*查询并设置地址*/
		function setAddress(id,sel,type) {

		}


		/*请求代理商级别*/
		function requestGrade(fn){
			var self=this;

			/*查询上级代理商ID*/
			$.ajax({
				url:"http://120.76.237.100:8081/mall-agentbms-api/agent/role/check",
				dataType:'JSON',
				method:'post',
				data:{
					roleId:decodeURIComponent(logininfo.param.roleId),
					adminId:decodeURIComponent(logininfo.param.adminId),
					grade:decodeURIComponent(logininfo.param.grade),
					token:decodeURIComponent(logininfo.param.token)
				}
			}).done(function(resp){
				var code=parseInt(resp.code,10);
				if(code!==0){
					if(code===999){
						/*清空缓存*/
						public_tool.loginTips(function () {
							public_tool.clear();
							public_tool.clearCacheData();
						});
						return false;
					}
					console.log(resp.message);
					dia.content('<span class="g-c-bs-warning g-btips-warn">'+(resp.message||"上级代理商Id不存在")+'</span>').show();
					setTimeout(function () {
						dia.close();
					},2000);
					if(fn&&typeof fn==='function'){
						fn.call(self,resp);
					}
				}
				if(fn&&typeof fn==='function'){
					fn.call(self,resp);
				}
			}).fail(function(resp){
				console.log('error');
				if(fn&&typeof fn==='function'){
					fn.call(self,resp);
				}
				dia.content('<span class="g-c-bs-warning g-btips-warn">'+(resp.message||"操作失败")+'</span>').show();
				setTimeout(function () {
					dia.close();
				},2000);
			});

		}


		/*代理商级别初始化*/
		function setGradeShow(obj,result){
			var res=result||'',
				grademap={
					'3':'省级代理商',
					'2':'市级代理商',
					'1':'县级代理商',
					'4':'店长',
					'-1':'超级管理员',
					'-2':'默认',
					'-3':'总代理',
					'':'未知代理商'
				},
				grade=(res['grade']||'').toString();

			if(res&&res!==''){
				obj.parentWrap.attr({
					'data-id':res['parentId']||'',
					'data-grade':grade,
					'data-name':res['parentName']||''
				}).html(grademap[grade]);
			}else{
				obj.parentWrap.attr({
					'data-id':'',
					'data-grade':'',
					'data-name':''
				}).html(grademap[grade]);
			}
			/*设置级别可见度*/
			if(grade==='3'){
				/*AAA(省代)*/
				obj.AAA.addClass('g-d-hidei');
				obj.AA.removeClass('g-d-hidei');
				obj.A.removeClass('g-d-hidei');
				obj.SS.addClass('g-d-hidei');
				obj.gradeWrap.removeClass('g-d-hidei');
			}else if(grade==='2'){
				/*AA(市代)*/
				obj.AAA.addClass('g-d-hidei');
				obj.AA.addClass('g-d-hidei');
				obj.A.removeClass('g-d-hidei');
				obj.SS.addClass('g-d-hidei');
				obj.gradeWrap.removeClass('g-d-hidei');
			}else if(grade==='1'){
				/*A(县代)*/
				obj.AAA.addClass('g-d-hidei');
				obj.AA.addClass('g-d-hidei');
				obj.A.addClass('g-d-hidei');
				obj.SS.addClass('g-d-hidei');
				obj.gradeWrap.addClass('g-d-hidei');
			}else if(grade==='4'){
				/*店长*/
				obj.AAA.addClass('g-d-hidei');
				obj.AA.addClass('g-d-hidei');
				obj.A.addClass('g-d-hidei');
				obj.SS.addClass('g-d-hidei');
				obj.gradeWrap.addClass('g-d-hidei');
			}else if(grade==='-1'){
				/*超级管理员*/
				obj.AAA.addClass('g-d-hidei');
				obj.AA.addClass('g-d-hidei');
				obj.A.addClass('g-d-hidei');
				obj.SS.addClass('g-d-hidei');
				obj.gradeWrap.addClass('g-d-hidei');
			}else if(grade==='-2'){
				/*默认*/
				obj.AAA.addClass('g-d-hidei');
				obj.AA.addClass('g-d-hidei');
				obj.A.addClass('g-d-hidei');
				obj.SS.addClass('g-d-hidei');
				obj.gradeWrap.addClass('g-d-hidei');
			}else if(grade==='-3'){
				/*总代理*/
				obj.AAA.removeClass('g-d-hidei');
				obj.AA.removeClass('g-d-hidei');
				obj.A.removeClass('g-d-hidei');
				obj.SS.addClass('g-d-hidei');
				obj.gradeWrap.removeClass('g-d-hidei');
			}else if(grade===''||typeof grade==='undefined'){
				/*未查询到情况*/
				obj.AAA.addClass('g-d-hidei');
				obj.AA.addClass('g-d-hidei');
				obj.A.addClass('g-d-hidei');
				obj.SS.addClass('g-d-hidei');
				obj.gradeWrap.addClass('g-d-hidei');
			}
		}
		
		



		/*修改时设置值*/
		function setAgentData(id) {
			if(!id){
				return false;
			}


			$.ajax({
				url:"http://120.76.237.100:8081/mall-agentbms-api/agent/detail",
				dataType:'JSON',
				method:'post',
				data:{
					"id":id,
					"adminId":decodeURIComponent(logininfo.param.adminId),
					"token":decodeURIComponent(logininfo.param.token),
					"grade":decodeURIComponent(logininfo.param.grade)
				}
			})
			.done(function(resp){
				var code=parseInt(resp.code,10);
				if(code!==0){
					console.log(resp.message);
					return false;
				}
				/*是否是正确的返回数据*/
				var list=resp.result;

				if(!$.isEmptyObject(list)){
					$admin_id.val(id);
					for(var j in list){
						switch(j){
							case 'username':
								$admin_username.val(list[j]);
								break;
							case 'password':
								$admin_password.val(list[j]);
								break;
							case 'name':
								$admin_name.val(list[j]);
								break;
							case 'grade':
								var grade=parseInt(list[j],10);
								$admin_gradewrap.find('input').each(function () {
									var $this=$(this),
										value=$this.val();
									if(value===grade){
										$this.prop({
											'checked':true
										});
										return false;
									}
								});
								break;
							case 'fullName':
								$admin_fullName.val(list[j]);
								break;
							case 'shortName':
								$admin_shortName.val(list[j]);
								break;
							case 'adscriptionRegion':
								$admin_adscriptionRegion.val(list[j]);
								break;
							case 'linkman':
								$admin_linkman.val(list[j]);
								break;
							case 'cellphone':
								$admin_cellphone.val(public_tool.phoneFormat(list[j]));
								break;
							case 'telephone':
								$admin_telephone.val(list[j]);
								break;
							case 'province':
								setAddress('86',list[j],'province');
								break;
							case 'city':
								setAddress(list['province'],list[j],'city');
								break;
							case 'country':
								setAddress(list['city'],list[j],'country');
								break;
							case 'address':
								$admin_address.val(list[j]);
								break;
							case 'isAudited':
								var audit=parseInt(list[j],10);
								$admin_isAudited.find('option').each(function () {
									var $this=$(this),
										value=$this.val();
									if(value===audit){
										$this.prop({
											'selected':true
										});
										return false;
									}
								});
								break;
							case 'status':
								var status=parseInt(list[j],10);
								$admin_status.find('option').each(function () {
									var $this=$(this),
										value=$this.val();
									if(value===status){
										$this.prop({
											'selected':true
										});
										return false;
									}
								});
								break;
							case 'salesmanId':
								var salesman=parseInt(list[j],10);
								$admin_salesmanId.find('option').each(function () {
									var $this=$(this),
										value=$this.val();
									if(value===salesman){
										$this.prop({
											'selected':true
										});
										return false;
									}
								});
								break;
							case 'remark':
								$admin_remark.val(list[j]);
								break;
						}
					}

				}
			})
			.fail(function(resp){
				console.log(resp.message);
			});

		}



		/*查询业务员Id*/
		function getSalesmanId() {
			$.ajax({
				url:"http://120.76.237.100:8081/mall-agentbms-api/salesmans/notused",
				dataType:'JSON',
				method:'post',
				data:{
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
					doSalesmanIdFail();
					return false;
				}
				/*是否是正确的返回数据*/
				var res=resp.result;

				if(!res){
					doSalesmanIdFail();
					return false;
				}

				var list=res.list;


				if(list){
					var len=list.length,
						i=0,
						str='';
					if(len===0){
						$('<option value="" selected>请选择业务员</option>').appendTo($admin_salesmanId.html(''));
						doSalesmanIdFail();
						return false;
					}
					for(i;i<len;i++){
						if(i===0){
							str+='<option value="" selected>请选择业务员</option><option value="'+list[i]["id"]+'">'+list[i]["name"]+'</option>';
						}else{
							str+='<option value="'+list[i]["id"]+'">'+list[i]["name"]+'</option>';
						}
					}
					$(str).appendTo($admin_salesmanId.html(''));
				}else{
					$('<option value="" selected>请选择业务员</option>').appendTo($admin_salesmanId.html(''));
					doSalesmanIdFail();
					return false;
				}
			})
			.fail(function(resp){
				$('<option value="" selected>请选择业务员</option>').appendTo($admin_salesmanId.html(''));
				console.log(resp.message);
				doSalesmanIdFail();
			});
		}

		/*处理无业务员时的情况*/
		function doSalesmanIdFail() {
			return false;
			dia.close();
			dia.content('<span class="g-c-bs-warning g-btips-warn">还没有业务员，3秒后将跳转至添加业务员处</span>').show();
			setTimeout(function () {
				dia.close();
				location.href='../salesman/mall-salesman-add.html';
			},3000);
		}




	});



})(jQuery);