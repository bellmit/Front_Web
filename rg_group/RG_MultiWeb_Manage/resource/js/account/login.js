/*配置依赖*/
require.config({
	baseUrl:'../../resource/js',
	paths:{
		'jquery':'lib/jquery.min',
		'dialog':'plugins/artdialog/dialog',
		'validform':'plugins/validform',
		'validrule':'widget/valid_rule',
		'validutil':'widget/valid_util'
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
require(['jquery','validrule','validutil','validform','dialog'], function($,Rule,Util) {
	$(function() {
		/*页面元素引用*/
		var $loginaction=$('#loginaction'),$validobj;
		/*表单验证*/
		$validobj= $loginaction.Validform({
							ajaxPost: true,
							datatype: {
								"eorm": function(gets,obj,curform) {
									return Util.isEorMP(gets);
								}
							},
							beforeSubmit: function(curform) {
								/*
								to do
								在提交之前
								获取验证码信息
								
								$.ajax({
									type: 'post',
									url: url,
									data: params,
									dataType: 'json',
									success: function(data) {
										if (data) {
											if (data.success) {
												var d = dialog({
														title: '温馨提示',
														content: '登录成功！'
												});
												d.show();
											} else {
								
											}
										} else {
											
										}
									},
									error: function(data) {
										
									}
								});*/
								return false;
							},
							tiptype: function(msg,o) {
								//o:{obj:*,type:*,curform:*}
								//type指示提示的状态，值为1、2、3、4， 1：正在检测/提交数据，2：通过验证，3：验证失败，4：提示ignore状态, 
								if(o.type==3){
									o.obj.parent().next().html(msg);
								}else if(o.type==2){
									o.obj.parent().next().html('');
								}
								
							}
						});
						/*添加验证规则*/
						$validobj.addRule([{
							ele:'input[name="UserName"]',
							datatype: "eorm",
							nullmsg: "用户名不能为空",
							errormsg: "用户名必须为手机或者邮箱",
							sucmsg: ""
						}, {
							ele:'input[name="UserPWD"]',
							datatype: "*6-20",
							nullmsg: "请填写登录密码",
							errormsg: "登录密码范围在6~20位之间",
							sucmsg: ""
						}, {
							ele:'input[name="ValidCode"]',
							datatype: "n6-6",
							ajaxurl: "to do   输入验证码请求地址",
							nullmsg: "请输入验证码",
							errormsg: "验证码错误",
							sucmsg: ""
						}]);
				
				
				
				
				
		});
});














