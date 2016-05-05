/*配置依赖*/
require.config({
	baseUrl:'../../js',
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
			var $alter_passwordform=$('#alter_passwordform'),
					$oldpwd=$('#oldpwd'),
					$pwd=$('#pwd'),
					$repwd=$('#repwd'),
					$validcode=$('#validcode'),
					$validshow=$('#validshow'),
					$changevalid=$('#changevalid'),
					validobj=null,
					dia=dialog();
			
		
			//更换验证码
			$changevalid.on('click',function(){
				
					//to do
					//填充验证相关数据
					$.ajax({
								url:'请求地址',
								type:'post',
								dataType:"json",
								data:'相关请求参数',
								success: function(data){
										$validshow.attr('src','请求图片地址');
								},
								error: function(){
										$validshow.attr('src','默认图片地址');
								}
						});
				
			});
			
			
			
			//校验规则
			var ruleobj=[{
						ele:$oldpwd,
						datatype:"*4-18",
						nullmsg: "旧密码不能为空",
						errormsg: "旧密码不正确",
						sucmsg: ""
					},{
							ele:$pwd,
							datatype:"*4-18",
							nullmsg: "新密码不能为空",
							errormsg: "新密码信息不正确",
							sucmsg: ""
					},{
							ele:$repwd,
							datatype:"*4-18",
							recheck:"logInPassword",
							nullmsg: "确认密码不能为空",
							errormsg: "确认密码需与新密码一致",
							sucmsg: ""
					},{
							ele:$validcode,
							datatype:"*6-6",
							nullmsg: "验证码不能为空",
							errormsg: "验证码长度为6位",
							sucmsg: ""
					}];
					
					
			//表单提示对象
			var tipobj={
					oldpwd:'',
					pwd:'',
					repwd:'',
					validcode:''
			};
			
					
			//表单校验
			var issucces=false;
		  validobj=$alter_passwordform.Validform({
					ajaxPost: true,
					datatype:{},
					beforeSubmit: function(curform) {
						/*to do*/
						//send ajax 填充具体业务逻辑
						//开发时开启下部代码
						$.ajax({
								url:'请求地址',
								type:'post',
								dataType:"json",
								data:'相关请求参数',
								success: function(data){
										if(data){	
												//to do 
												
																		
												issucces=true;
												dia.content('<span class="g-c-green1">保存成功</span>').show();
										}else{
												issucces=false;
												dia.content('<span class="g-c-red2">保存失败</span>').show();
										}
								},
								error: function(){
										issucces=false;
										dia.content('<span class="g-c-red2">保存失败</span>').show();
								}
						});
						setTimeout(function(){
							dia.close();
							if(issucces){
								
								
							}
						},3000);
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
			validobj.addRule(ruleobj);
			
			
			
		
			
			
			
			

			
			
			
	});
});
