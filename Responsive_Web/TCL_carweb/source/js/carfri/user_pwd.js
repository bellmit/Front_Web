$(function(){
	jQuery.validator.addMethod("checkChina",function(value,element){
		var passwordcopy=/^[^[\u4e00-\u9fa5]*]*$/;
	 // console.log(passwordcopy.test(value));
	  return this.optional(element)||(passwordcopy.test(value));
},"不能带有中文");
	var savePwd = $("#savePwd"),contextPath = $("#contextPath").val();;
	/* valid user_pwd info */
	savePwd.validate({
		rules : {
			'formerly_pw' : {
				required : true,
				rangelength : [ 5, 16 ],
				checkChina : true,
				remote : {
					url : contextPath + "/carfri/doCheckOldPwd",
					type : "post",
					data : {
						formerly_pw : function() {
							return $("#formerly_pw").val();
						}

					}
				}
			},
			'password' : {
				required : true,
				rangelength : [ 5, 16 ],
				checkChina : true
			},
			'new_pw_repeat' : {
				required : true,
				equalTo : "#password"
			}
		},
		messages : {
			'formerly_pw' : {
				required : "原始密码不能为空",
				rangelength : "原始密码长度为5-16个字符",
				remote : "原始密码错误",
				checkChina:"原始密码带有中文,请重新输入"
			},
			'password' : {
				required : "新密码不能为空",
				rangelength : "新密码长度为5-16个字符",
				checkChina:"新密码带有中文,请重新输入"
			},
			'new_pw_repeat' : {
				required : "重复密码不能为空",
				equalTo : "重复密码与新密码不一致"
			}
		},
		success : function() {
		},
		invalidHandler : function() {
			return false;
		},
		submitHandler : function() {
			var url = contextPath + "/carfri/savePwd";
			$.post(url, savePwd.serialize(), function(response) {
				var object = eval("(" + response.rs + ")");
				if (object.success) {
					/*
					popup_alert:(模拟alert弹出提示信息面板公用方法),需搭配css和blockui.js
					argument:提示信息,跳转地址("跳转地址"或者"undefined"),面板类型("yes"或"no"),面板按钮("have"或"none")
					*/
					var success_str=contextPath + "/carfri/user_pwd";
					popup_alert(object.msg,success_str,"yes","have");
				} else {
					/*
					popup_alert:(模拟alert弹出提示信息面板公用方法),需搭配css和blockui.js
					argument:提示信息,跳转地址("跳转地址"或者"undefined"),面板类型("yes"或"no"),面板按钮("have"或"none")
					*/
					popup_alert(object.msg,"undefined","no","none");
				}
			}, 'json');
		}
	});
	
	
});

/*$(function(){
	userPwd.run();
});

var userPwd = {
	run:function(){
		this._init_();
		this._bind_event_();
		this._start_();
	},
	
	_init_:function(){
	    this.contextPath = $("#contextPath").val();	
	},
	
	_bind_event_:function(){
		var me = this;
		$("#saveUserPwd").click(function(){
			 me._save();
		});
		
	},
	_start_:function(){
		
	},
	_save:function(){
		var me = this;
		var $form = $("#savePwd");
		var url = me.contextPath +"/carfri/savePwd";
		$.post(url,$form.serialize(),function(response){
			if(response.success){
				alert("修改成功");
				//window.location.href=me.contextPath+"/carfri/user_info";
			}else{
				$("#validcode_tips").text("原始密码错误");
			}
		},'json');
	}
};*/