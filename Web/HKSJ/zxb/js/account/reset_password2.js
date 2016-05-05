/*配置依赖*/
require.config({
	baseUrl:'../../js/',
	paths:{
		'jquery':'lib/jquery/jquery-1.11.2.min',
		'dialog':'lib/artDialog/dialog',
		'rule':'widgets/rules',
		'commonfn':'widgets/commonfn',
		'validform':'plugins/validform'
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
require(['jquery','dialog','rule','commonfn','validform'],function($,undefined,Rule,CommonFn,undefined) {
	$(function() {
			//页面元素获取
			//表单对象
			var $reset_passwordform=$('#reset_passwordform'),
					$username=$('#username'),
					$validcode=$('#validcode'),
					$getvolidcode=$('#getvolidcode'),
					validobj=null,
					validcodeid=null,
					dia=dialog();
					
					
					
			//校验规则
			var ruleobj=[{
							ele:$validcode,
							datatype:"n6-6",
							nullmsg: "验证码不能为空",
							errormsg: "验证码长度为6位数字",
							sucmsg: ""
					}];
			
			
			
					
			//表单校验
		  validobj=$reset_passwordform.Validform({
					ajaxPost: true,
					datatype:{},
					beforeSubmit: function(curform) {
						
						//拼合参数
						var datas={};
						datas['username']=$username.text();
						datas['validcode']=$validcode.val();
						
						/*to do*/
						//send ajax 填充具体业务逻辑
						//开发时开启下部代码
						$.ajax({
								url:'../../json/validcode.json',
								type:'post',
								dataType:"json",
								data:datas,
								success: function(data){
										//这里是测试，开发阶段请填充相关具体业务
										var r=parseInt(Math.random()*100,10);
										if(r%2==0){
											dia.content('<span class="g-c-green1">确认账号信息正确</span>').show();
											setTimeout(function(){
												dia.close();
												window.location.href="reset_password3.html";
											},3000);
										}else{
											dia.content('<span class="g-c-red2">确认账号信息错误</span>').show();
											setTimeout(function(){
												dia.close();
											},3000);
										}
								},
								error: function(){
										dia.content('<span class="g-c-red2">确认账号信息错误</span>').show();
										setTimeout(function(){
											dia.close();
										},3000);
								}
						});
						return false;
					},
					tiptype: function(msg,o) { 
						var curtype=o.type,
								cid=id=o.obj[0].id,
								curitem=o.obj;
						if(curtype==1||curtype==3){
								curitem.parents('div').next().text(msg);
						}else if(curtype==2){
								curitem.parents('div').next().text('');
						}
					}
			});
			validobj.addRule(ruleobj);
			
			
			
			
			//获取手机验证码
			$getvolidcode.on('click',function(){
					var username=$username.text();
					
					
					//to do	
					//检查手机号是否已经绑定
					//send ajax 这里只是测试，开发时填充具体业务逻辑  发送验证码到手机或邮箱
					//开发时开启下部代码 
					$.ajax({
							url:'../../json/validcode.json',
							type:'post',
							dataType:"json",
							data:'username='+username,
							success: function(data){
								
								//此处为测试代码
								var code=parseInt(Math.random()*100,10);
										if(code%2==0){
												dia.content('<span class="g-c-red2">'+username+'已经被绑定，请输入其他账号</span>').show();									
												setTimeout(function(){
														dia.close();
												},3000);
										}else{
												//发送验证码
												CommonFn.getCount(validcodeid,60,$getvolidcode,'获取验证码','volidcode-btn-disabled');
												
												dia.content('<span class="g-c-green1">正在发送验证码都手机......</span>').show();
												
												
												//to do
												//发送验证码都手机ajax
												$.ajax({
															url:'../../json/validcode.json',
															type:'post',
															dataType:"json",
															data:'username='+username,
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
									dia.content('<span class="g-c-red2">请输入其他账号信息</span>').show();
									setTimeout(function(){
											dia.close();
									},3000);
							}
					});

			});
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			

	});
});
