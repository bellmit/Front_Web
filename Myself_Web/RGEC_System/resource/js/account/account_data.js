/*配置依赖*/
require.config({
	baseUrl:'../../resource',
	paths:{
		'jquery':'js/lib/jquery/jquery-1.11.2.min',
		'bootstrap':'css/bootstrap_2.3.2/js/bootstrap.min',
		'dialog':'js/lib/artDialog/dialog',
		'querydata':'js/widgets/querydata',
		'validform':'js/plugins/validform',
		'common':'js/common/common',
		'submenu':'js/widgets/submenu',
		'themetitle':'js/widgets/themetitle',
		'date97':'js/plugins/My97DatePicker/WdatePicker',
		'rule':'js/widgets/rules',
		'commonfn':'js/widgets/commonfn',
		'datepick':'js/widgets/datepick'
	},
	shim:{
		'bootstrap':{
				deps:['jquery']
		},
		'dialog':{
				deps:['jquery']
		},
		'querydata':{
				deps:['jquery','dialog']
		},
		'validform':{
				deps:['jquery']
		},
		'common':{
				deps:['jquery','dialog','querydata','validform']
		},
		'submenu':{
				deps:['jquery','common']
		},
		'themetitle':{
				deps:['jquery','common']
		},
		'commonfn':{
				deps:['jquery','rule']
		},
		'datepick':{
				deps:['jquery']
		}
	}
});


/*程序入口*/
require(['jquery','bootstrap','dialog','querydata','validform','common','submenu','themetitle','date97','rule','commonfn','datepick'],function($,$strap,undefined,undefined,undefined,Common,undefined,undefined,undefined,Rule,CommonFn,undefined) {
	$(function() {
			//页面元素引用
			var $submenu=$('#submenu'),
					$theme_title=$('#theme_title'),
					$memberProfileModifyForm=$('#memberProfileModifyForm'),
					$dealerinfo_griddata=$('#dealerinfo_griddata')
					$toedit_wrap=$('#toedit_wrap'),
					$dealerinfo_edit=$('#dealerinfo_edit'),
					$tosave_wrap=$('#tosave_wrap'),
					$dealerinfo_save=$('#dealerinfo_save'),
					$dealerinfo_cance=$('#dealerinfo_cance'),
					$petName=$('#petName'),
					$sex=$('#sex'),
					$birthday=$('#birthday'),
					$healthyList=$('#healthyList'),
					$knowWayList=$('#knowWayList'),
					$storeAddr=$('#storeAddr'),
					$storePost=$('#storePost'),
					$homeTel=$('#homeTel'),
					$officeTel=$('#officeTel'),
					$mobile=$('#mobile'),
					$fax=$('#fax'),
					$email=$('#email'),
					$webAddr=$('#webAddr');
					
			//主题标题点击
			$theme_title.ThemeTitle(undefined,true);
			
			//子导航点击事件
			$submenu.subMenuItem(undefined,true);
			
			//时间日期控件绑定
			$.datePick([$birthday]);
			
			
			//移动电话格式化
			$mobile.on('keyup',function(e){
					var val=this.value;
					val=val.replace(/\D*/g,'');
					val=CommonFn.phoneFormat(val);
					this.value=val;
			});		
			
				
			//表单校验
			var tipobj={
							mobile:'',
							email:''
					},
					ruleobj=[{
						ele:$mobile,
						datatype:"selfphone",
						nullmsg: "移动电话不能为空",
						errormsg: "移动电话不符合规范",
						sucmsg: ""
					},{
							ele:$email,
							datatype:"selfemail",
							nullmsg: "电子邮箱不能为空",
							errormsg: "电子邮箱格式不符合规范",
							sucmsg: ""
					}];
					
			$validobj=$memberProfileModifyForm.Validform({
					ajaxPost: true,
					datatype:{
						'selfphone':function(gets,obj,curform,regxp){
								return CommonFn.isMobilePhone(CommonFn.trims(gets));
						},
						'selfemail':function(gets,obj,curform,regxp){
								return CommonFn.isEmail(CommonFn.trims(gets));
						}
					},
					beforeSubmit: function(curform) {
						/*to do*/
						//send ajax 填充具体业务逻辑
						//开发时开启下部代码
						var dia=null,
						issucces=false;
						$.ajax({
								url:'请求地址',
								type:'post',
								dataType:"json",
								data:'相关请求参数',
								success: function(data){
										if(data){									
												dia=dialog({
													title:'温馨提示',
													width:200,
													content:'<span class="g-c-cyan1">保存成功</span>'
												}).show();
												issucces=true;
										}else{
												dia=dialog({
													title:'温馨提示',
													width:200,
													content:'<span class="g-c-red4">保存失败</span>'
												}).show();
										}
								},
								error: function(){
										dia=dialog({
											title:'温馨提示',
											width:200,
											content:'<span class="g-c-red4">保存失败</span>'
										}).show();
								}
						});
						setTimeout(function(){
							dia.close().remove();
							if(issucces){
								window.location.href='需要跳转的地址';
							}
						},3000);
						return false;
					},
					tiptype: function(msg,o) { 
						var id=o.obj[0].id,
						curtype=o.type;
						if(curtype==1||curtype==3){
								if(typeof tipobj[id]==='string'){
										tipobj[id]=dialog({
										content:'<span class="g-c-red4 g-btips-error">'+msg+'</span>',
										align:'right',
										padding:8
									});
									tipobj[id].show(document.getElementById(id));
								}else if(typeof tipobj[id]!=='string'){
									tipobj[id].content('<span class="g-c-red4 g-btips-error">'+msg+'</span>');
									tipobj[id].show();
								}
						}else if(curtype==2){
								if(typeof tipobj[id]!=='string'){
									tipobj[id].content('<span class="g-c-cyan1 g-btips-succ"></span>');
									setTimeout(function(){
											tipobj[id].close();
									},1000);
								}
						}
					}
				});
				//添加校验规则
				$validobj.addRule();
				//调用，平铺回车调用，即将subm改为button，所以还需要做提交监听
				$dealerinfo_save.on('click',function(){
						$memberProfileModifyForm.submit();
				});
	
	
	
	
				//绑定切换编辑状态
				$dealerinfo_edit.on('click',function(){
						$dealerinfo_griddata.find('tr').each(function(){
								var $this=$(this),
										isedit=$this.hasClass('isedit');
								if(isedit){
									var td=$this.find('td:last-child');
											$item=td.children();
											$item.eq(0).removeClass('g-d-showi g-d-hidei').addClass('g-d-showi');
											$item.eq(1).removeClass('g-d-showi g-d-hidei').addClass('g-d-hidei');
								}
						});
						$validobj.addRule(ruleobj);
						
						$toedit_wrap.slideUp(100);
						$tosave_wrap.slideDown(100);
				});
				
				//绑定切换查看状态
				$dealerinfo_cance.on('click',function(){
						$dealerinfo_griddata.find('tr').each(function(){
								var $this=$(this),
										isedit=$this.hasClass('isedit');
								if(isedit){
									var td=$this.find('td:last-child');
											$item=td.children();
											$item.eq(0).removeClass('g-d-showi g-d-hidei').addClass('g-d-hidei');
											$item.eq(1).removeClass('g-d-showi g-d-hidei').addClass('g-d-showi');
								}
						});
						//移除校验规则
						$validobj.addRule();
						//移除提示信息
						for(var i in tipobj){
								if(typeof tipobj[i]!=='string'){
										tipobj[i].close();
								}
						}
						
						$toedit_wrap.slideDown(100);
						$tosave_wrap.slideUp(100);
				});
			
	});
});
