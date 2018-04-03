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
					validobj=null,
					dia=dialog();
					
					
					
			//校验规则
			var ruleobj=[{
						ele:$username,
						datatype:"selfname",
						nullmsg: "用户名不能为空",
						errormsg: "用户名信息不正确",
						sucmsg: ""
					},{
							ele:$validcode,
							datatype:"n6-6",
							nullmsg: "验证码不能为空",
							errormsg: "验证码长度为6位数字",
							sucmsg: ""
					}];
			
			
			
					
			//表单校验
		  validobj=$reset_passwordform.Validform({
					ajaxPost: true,
					datatype:{
						'selfname':function(gets,obj,curform,regxp){
								if(CommonFn.isRequire(gets)){
										return '用户名不能为空';
								}else{
									if(CommonFn.isEMP(gets)){
											return true;
									}else{
											return '用户名是邮箱或手机号';
									}	
								}
						}
					},
					beforeSubmit: function(curform) {
						
						//拼合参数
						var datas={};
						datas['username']=$username.val();
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
												window.location.href="reset_password2.html";
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
			

	});
});
