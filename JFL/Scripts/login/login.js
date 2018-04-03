(function($){
	$(function(){
		/*获取页面元素*/
		var login_tips=$("#login_tips");
		/*表单校验*/
		var login_validobj=$("#login_valid").Validform({
				ajaxPost:true,
				tiptype:function(msg,o){
					/*参数说明：
				  msg：提示信息;
					o:{obj:*,type:*,curform:*}, obj指向的是当前验证的表单元素（或表单对象），type指示提示的状态，值为1、2、3、4， 1：正在检测/提交数据，2：通过验证，3：验证失败，4：提示ignore状态, curform为当前form对象;
			  	 cssctl:内置的提示信息样式控制函数，该函数需传入两个参数：显示提示信息的对象 和 当前提示的状态（既形参o中的type）; */
					var curtype=o.type;
					if(curtype==1||curtype==3){
						login_tips.html(msg);
					}else if(curtype==2){
						login_tips.html("");
					}
				},
				beforeSubmit:function(curform){
					var name =document.getElementById("txtUserName").value;
					var pwd =document.getElementById("txtPwd").value;
					var mor = 0; //获取是否选中为常用地址
					if ($("#cheSaveLogin").attr("checked")) {
						mor = 1;
					}
					var data = { passPort: name, password: pwd, isSaveLogin: mor };
					var url = "/Login/CustomerLogin";
					$.ajax({
						url: url,
						data: data,
						type: "POST",
						dataType: "json",
						success: function (data) {
							if (data.State) {
								location.href = "/CustomerMng/Index";
							}else {
								login_tips.html("用户名或密码错误!");
							}
						},
						error: function (e) {
							login_tips.html("登录失败请重新输入相关信息");
						}
					});
					return false;
				}
		});
		/*添加提示信息*/
		login_validobj.addRule(vmsg_objs().login_msg);
	});
})(jQuery);

