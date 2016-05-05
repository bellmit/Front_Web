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
					$pwd=$('#pwd'),
					$repwd=$('#repwd'),
					validobj=null,
					dia=dialog();
					
					
					
			//校验规则
			var ruleobj=[{
						ele:$pwd,
						datatype:"*6-18",
						nullmsg: "新密码不能为空",
						errormsg: "新密码长度为6-18位字符",
						sucmsg: ""
					},{
							ele:$repwd,
							datatype:"*6-18",
							nullmsg: "确认新密码不能为空",
							recheck:"oldpassword",
							errormsg: "确认新密码与新密码需一致",
							sucmsg: ""
					}];
			
			
			
					
			//表单校验
		  validobj=$reset_passwordform.Validform({
					ajaxPost: true,
					datatype:{},
					beforeSubmit: function(curform) {
						
						//拼合参数
						var datas={};
						datas['oldpassword']=$pwd.val();
						datas['newpassword']=$repwd.val();
						
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
											dia.content('<span class="g-c-green1">修改成功</span>').show();
											setTimeout(function(){
												dia.close();
												window.location.href="reset_password4.html";
											},3000);
										}else{
											dia.content('<span class="g-c-red2">确认账号信息是否正确</span>').show();
											setTimeout(function(){
												dia.close();
											},3000);
										}
								},
								error: function(){
										dia.content('<span class="g-c-red2">确认账号信息是否正确</span>').show();
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
