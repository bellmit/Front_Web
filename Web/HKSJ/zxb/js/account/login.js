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
			var $login_form=$('#login_form'),
					$loginname=$('#loginname'),
					$loginpassword=$('#loginpassword'),
					$autologin=$('#autologin'),
					validobj=null;
					
					
					
			//校验规则
			var ruleobj=[{
						ele:$loginname,
						datatype:"selfname",
						nullmsg: "用户名不能为空",
						errormsg: "用户名信息不正确",
						sucmsg: ""
					},{
							ele:$loginpassword,
							datatype:"*4-18",
							nullmsg: "密码不能为空",
							errormsg: "密码长度为4-18位",
							sucmsg: ""
					}];
			
			
			
					
			//表单校验
			var dia=dialog({
					cancel:false
			});
			//表单验证1
			var issucces=false;
		  validobj=$login_form.Validform({
					ajaxPost: true,
					datatype:{
						'selfname':function(gets,obj,curform,regxp){
								if(CommonFn.isRequire(gets)){
										return '用户名不能为空';
								}else{
									if(CommonFn.isUserName(gets)){
											return true;
									}else{
										if(CommonFn.isEMP(gets)){
												return true;
										}else{
												return '用户名是邮箱或手机号或非特殊4-16位字符';
										}	
									}
								}
						}
					},
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
												issucces=true;
												dia.content('<span class="g-c-green1">保存成功</span>').show();
										}else{
												issucces=false;
												dia.content('<span class="g-c-red4">保存失败</span>').show();
										}
								},
								error: function(){
										issucces=false;
										dia.content('<span class="g-c-red4">保存失败</span>').show();
								}
						});
						setTimeout(function(){
							dia.close();
							if(issucces){
								//to do
								//其他操作
							}
						},3000);
						return false;
					},
					tiptype: function(msg,o) { 
						var curtype=o.type,
								cid=id=o.obj[0].id,
								curitem=o.obj;
						if(curtype==1||curtype==3){
								curitem.parents('tr').next().find('td').text(msg);
						}else if(curtype==2){
								curitem.parents('tr').next().find('td').text('');
						}
					}
			});
			validobj.addRule(ruleobj);
			
			
			
			//自动登录
			//初始化
			if($autologin.val()=='autoLogin'){
					$autologin.prop('checked',true);
			}else if($autologin.val()==''){
					$autologin.prop('checked',false);
			}
			//事件绑定
			$autologin.on('click',function(){
					var $this=$(this);
					if($this.prop('checked')){
							$this.val('autoLogin');
					}else{
							$this.val('');
					}
				
			});
			
			
			
			
	});
});
