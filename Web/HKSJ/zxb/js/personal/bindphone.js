/*配置依赖*/
require.config({
	baseUrl:'../../js/',
	paths:{
		'jquery':'lib/jquery/jquery-1.11.2.min',
		'dialog':'lib/artDialog/dialog',
		'common':'common/manage_common',
		'rule':'widgets/rules',
		'commonfn':'widgets/commonfn',
		'validform':'plugins/validform',
		'cookie':'plugins/cookie'
	},
	shim:{
		'dialog':{
				deps:['jquery']
		},
		'validform':{
				deps:['jquery']
		}
	}
});


/*程序入口*/
require(['jquery','dialog','rule','commonfn','validform','cookie','common'],
function($,undefined,Rule,CommonFn,undefined,undefined,Common) {
	$(function() {
			//页面元素获取
			var $bindemail=$('#bindemail'),
					$bindemail_step1wrap=$('#bindemail_step1wrap'),
					$bindemail_step2wrap=$('#bindemail_step2wrap'),
					$bindphone=$('#bindphone'),
					$bindphone_step1wrap=$('#bindphone_step1wrap'),
					$bindphone_step2wrap=$('#bindphone_step2wrap'),
					$email_show=$('#email_show'),
					$phone_show=$('#phone_show'),
					$process_column=$('#process_column');
			
			
			
			var $bindemail_step1form=$('#bindemail_step1form'),
					$email=$('#email'),
					$email_vc=$('#email_vc'),
					$to_validemail=$('#to_validemail'),
					$bindphone_step1form=$('#bindphone_step1form'),
					$loginpwd=$('#loginpwd'),
					$login_vc=$('#login_vc'),
					$bindphone_step2form=$('#bindphone_step2form'),
					$mobile=$('#mobile'),
					$phone_vc=$('#phone_vc'),
					$get_phonevc=$('#get_phonevc'),
					validobj_emailstep1=null,
					validobj_phonestep1=null,
					validobj_phonestep2=null,
					validcodeid=null,
					dia=dialog();
			
			
			//资料完整程度百分比
			(function(){
					var percent=$process_column.attr('data-process');
					$process_column.css({"width":percent}).text(percent);
			}());
			
		
		
		
		  //切换邮箱与手机绑定界面显示与隐藏
			$bindemail.on('click',function(){
					$bindemail_step1wrap.toggleClass('g-d-hidei');
			});
			$bindphone.on('click',function(){
					$bindphone_step1wrap.toggleClass('g-d-hidei');
			});
			
			
			//绑定手机格式化
			$mobile.on('keyup',function(){
					this.value=CommonFn.phoneFormat(this.value);
			});
			
			
			//获取手机验证码
			$get_phonevc.on('click',function(){
					var phonestr=CommonFn.trims($mobile.val());

					if(CommonFn.isRequire(phonestr)){
							dia.content('<span class="g-c-red2">还未填写手机号</span>').show();
							setTimeout(function(){
									dia.close();
							},3000);
							return false;
					}else if(!CommonFn.isMobilePhone(phonestr)){
							dia.content('<span class="g-c-red2">手机号格式不正确</span>').show();
							setTimeout(function(){
									dia.close();
							},3000);
							return false;
					}
					
					//检查手机号是否已经绑定
					
					//to do
					//send ajax 这里只是测试，开发时填充具体业务逻辑  发送验证码到手机或邮箱
					//开发时开启下部代码 
					$.ajax({
							url:'../../json/validcode.json',
							type:'post',
							dataType:"json",
							data:'mobile='+phonestr,
							success: function(data){
								var code=parseInt(Math.random()*100,10);
										if(code%2==0){
												dia.content('<span class="g-c-red2">'+phonestr+'已经被绑定，请输入其他手机号</span>').show();									
												setTimeout(function(){
														dia.close();
												},3000);
										}else{
												//发送验证码
												CommonFn.getCount(validcodeid,5,$get_phonevc,'发送验证码到手机','yzdisabled');
												
												dia.content('<span class="g-c-green1">正在发送验证码都手机......</span>').show();
												//to do
												//发送验证码都手机ajax
												$.ajax({
															url:'../../json/validcode.json',
															type:'post',
															dataType:"json",
															data:'mobile='+phonestr,
															success: function(data){
																		if(code>=50){
																				setTimeout(function(){
																					dia.content('<span class="g-c-green1">发送成功请注意查收</span>');								
																				},2000);
																		}else{
																			setTimeout(function(){
																					dia.content('<span class="g-c-red2">发送失败，请稍后重新发送</span>');							
																			},2000);
																					
																		}
															},
															error: function(){
																			setTimeout(function(){
																					dia.content('<span class="g-c-red2">发送失败，请稍后重新发送</span>');						
																			},2000);
															}
													});
													setTimeout(function(){
															dia.close();
													},4000);
										}
							},
							error: function(){
									dia.content('<span class="g-c-red2">请输入其他手机号码</span>').show();
									setTimeout(function(){
											dia.close();
									},3000);
							}
					});
					
					
					
					
				
				
			});
			
			
			//绑定跳转邮箱地址
			$to_validemail.on('click',function(){
					var url=$(this).attr('data-url')||'';
					if(url&&url!=''){
						window.location.href=url;
					}
			});
			
			
			
			//校验规则
			var ruleobj_emailstep1=[{
						ele:$email,
						datatype:"selfemail",
						nullmsg: "邮箱不能为空",
						errormsg: "邮箱格式不正确",
						sucmsg: ""
					},{
							ele:$email_vc,
							datatype:"n6-6",
							nullmsg: "验证码不能为空",
							errormsg: "验证码为6位数字",
							sucmsg: ""
					}],
					ruleobj_phonestep1=[{
						ele:$loginpwd,
						datatype:"*4-18",
						nullmsg: "登陆密码不能为空",
						errormsg: "登陆密码为4-18位字符",
						sucmsg: ""
					},{
							ele:$login_vc,
							datatype:"n6-6",
							nullmsg: "验证码不能为空",
							errormsg: "验证码为6位数字",
							sucmsg: ""
					}],
					ruleobj_phonestep2=[{
						ele:$mobile,
						datatype:"selfmobile",
						nullmsg: "手机号不能为空",
						errormsg: "手机号格式不正确",
						sucmsg: ""
					},{
							ele:$phone_vc,
							datatype:"n6-6",
							nullmsg: "验证码不能为空",
							errormsg: "验证码为6位数字",
							sucmsg: ""
					}];
					
					
			//表单提示对象
			var tipobj={
					email:'',
					email_vc:'',
					loginpwd:'',
					login_vc:'',
					mobile:'',
					phone_vc:''
			};
			
					
			//表单校验
		  validobj_emailstep1=$bindemail_step1form.Validform({
					ajaxPost: true,
					datatype:{
						'selfemail':function(gets,obj,curform,regxp){
								return CommonFn.isEmail(gets);
						}
					},
					beforeSubmit: function(curform) {
						
						//合并参数
						var result={};
						result['email']=$email.val();
						result['validcode']=$email_vc.val();
						
						
						/*to do*/
						//send ajax 填充具体业务逻辑
						//开发时开启下部代码
						$.ajax({
								url:'../../json/personal/bindemail.json',
								type:'post',
								dataType:"json",
								data:result,
								success: function(data){
										if(data.action){	
												//to do 
												
												dia.content('<span class="g-c-green1">验证成功</span>').show();
												$email_show.text(result['email']);
												$to_validemail.attr('data-url',data.url);
												
												setTimeout(function(){
														dia.close();
														$bindemail_step1wrap.addClass('g-d-hidei');
														$bindemail_step2wrap.removeClass('g-d-hidei');
												},3000);
										}else{
												dia.content('<span class="g-c-red2">验证失败，请重新输入您的信息</span>').show();
												setTimeout(function(){
													dia.close();
												},3000);
										}
								},
								error: function(){
										dia.content('<span class="g-c-red2">验证失败，请重新输入您的信息</span>').show();
										setTimeout(function(){
											dia.close();
										},3000);
								}
						});
						return false;
					},
					tiptype:function(msg,o) { 
						var id=o.obj[0].id,
						curtype=o.type;
						if(curtype==1||curtype==3){
								if(typeof tipobj[id]==='string'){
										tipobj[id]=dialog({
										content:'<span class="g-c-red2 g-btips-error">'+msg+'</span>',
										align:'right',
										padding:8
									});
									tipobj[id].show(document.getElementById(id));
								}else if(typeof tipobj[id]!=='string'){
									tipobj[id].content('<span class="g-c-red2 g-btips-error">'+msg+'</span>');
									tipobj[id].show();
								}
						}else if(curtype==2){
								if(typeof tipobj[id]!=='string'){
									tipobj[id].content('<span class="g-c-green1 g-btips-succ"></span>');
									setTimeout(function(){
											tipobj[id].close();
									},1000);
								}
						}
					}
			});
			validobj_emailstep1.addRule(ruleobj_emailstep1);
			
			
			
			
			//表单校验
		  validobj_phonestep1=$bindphone_step1form.Validform({
					ajaxPost: true,
					datatype:{},
					beforeSubmit: function(curform) {
						
						//合并参数
						var result={};
						result['password']=$loginpwd.val();
						result['validcode']=$login_vc.val();
						
						
						/*to do*/
						//send ajax 填充具体业务逻辑
						//开发时开启下部代码
						$.ajax({
								url:'../../json/personal/bindphone.json',
								type:'post',
								dataType:"json",
								data:result,
								success: function(data){
										if(data.action){	
												//to do 
												
												dia.content('<span class="g-c-green1">验证成功</span>').show();
												
												setTimeout(function(){
													dia.close();
													$bindphone_step1wrap.addClass('g-d-hidei');
													$bindphone_step2wrap.removeClass('g-d-hidei');
												},3000);
										}else{
												dia.content('<span class="g-c-red2">验证失败，请重新输入您的信息</span>').show();
												setTimeout(function(){
													dia.close();
												},3000);
										}
								},
								error: function(){
										dia.content('<span class="g-c-red2">验证失败，请重新输入您的信息</span>').show();
										setTimeout(function(){
											dia.close();
										},3000);
								}
						});
						return false;
					},
					tiptype:function(msg,o) { 
						var id=o.obj[0].id,
						curtype=o.type;
						if(curtype==1||curtype==3){
								if(typeof tipobj[id]==='string'){
										tipobj[id]=dialog({
										content:'<span class="g-c-red2 g-btips-error">'+msg+'</span>',
										align:'right',
										padding:8
									});
									tipobj[id].show(document.getElementById(id));
								}else if(typeof tipobj[id]!=='string'){
									tipobj[id].content('<span class="g-c-red2 g-btips-error">'+msg+'</span>');
									tipobj[id].show();
								}
						}else if(curtype==2){
								if(typeof tipobj[id]!=='string'){
									tipobj[id].content('<span class="g-c-green1 g-btips-succ"></span>');
									setTimeout(function(){
											tipobj[id].close();
									},1000);
								}
						}
					}
			});
			validobj_phonestep1.addRule(ruleobj_phonestep1);
			
			
			
			
			
			
			//表单校验
		  validobj_phonestep2=$bindphone_step2form.Validform({
					ajaxPost: true,
					datatype:{
						'selfmobile':function(gets,obj,curform,regxp){
								return CommonFn.isMobilePhone(gets);
						}
					},
					beforeSubmit: function(curform) {
						
						//合并参数
						var result={};
						result['mobile']=$mobile.val();
						result['validcode']=CommonFn.trims($phone_vc.val());
						
						
						/*to do*/
						//send ajax 填充具体业务逻辑
						//开发时开启下部代码
						$.ajax({
								url:'../../json/personal/bindphone.json',
								type:'post',
								dataType:"json",
								data:result,
								success: function(data){
										if(data.action){	
												
												
												//to do 
												$bindphone_step2wrap.addClass('g-d-hidei');
												dia.content('<div class="content-wrap">'+
												'		<div class="content-succeed">'+
												'				<div class="succeed-text">'+
												'						<i><img src="../../images/iconfont-gou.png"/></i>'+
												'						<div class="succeed-1">'+
												'								<h2>恭喜您，成功注册装小宝！</h2>'+
												'								<p>您可以<a href="/HKSJ/jsp">返回首页</a> 或 <a href="home.html">进入个人中心</a></p>'+
												'						</div>'+
												'				</div>'+
												'		</div>'+
												'</div>').showModal();
										}else{
												dia.content('<span class="g-c-red2">验证失败，请重新输入您的信息</span>').show();
												setTimeout(function(){
													dia.close();
												},3000);
										}
								},
								error: function(){
										dia.content('<span class="g-c-red2">验证失败，请重新输入您的信息</span>').show();
										setTimeout(function(){
											dia.close();
										},3000);
								}
						});
						return false;
					},
					tiptype:function(msg,o) { 
						var id=o.obj[0].id,
						curtype=o.type;
						if(curtype==1||curtype==3){
								if(typeof tipobj[id]==='string'){
										tipobj[id]=dialog({
										content:'<span class="g-c-red2 g-btips-error">'+msg+'</span>',
										align:'right',
										padding:8
									});
									tipobj[id].show(document.getElementById(id));
								}else if(typeof tipobj[id]!=='string'){
									tipobj[id].content('<span class="g-c-red2 g-btips-error">'+msg+'</span>');
									tipobj[id].show();
								}
						}else if(curtype==2){
								if(typeof tipobj[id]!=='string'){
									tipobj[id].content('<span class="g-c-green1 g-btips-succ"></span>');
									setTimeout(function(){
											tipobj[id].close();
									},1000);
								}
						}
					}
			});
			validobj_phonestep2.addRule(ruleobj_phonestep2);
			
			
			
		
			
			
			
			

			
			
			
	});
});
