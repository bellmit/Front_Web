(function($){
	$(function(){
		/*获取页面元素*/
		var reg_action=$("#reg_action"),reg_pwdstrongwrap=$("#reg_pwdstrongwrap"),reg_pwdstrong=$("#reg_pwdstrong");
		/*绑定文本框获取焦点事件*/
		$("#reg_password").live("focusin focusout",function(e){
			var curid=e.target.id,curobj=$(e.target),curevent=e.type;
			if(curevent=="focusin"){
				if(curid=="reg_password"){
					$("#reg_pwdexplain").show();
				}
			}else if(curevent=="focusout"){
				if(curid=="reg_password"){
					$("#reg_pwdexplain").hide();
				}
			}
        });
		/*验证表单*/
		reg_action.validate({
			rules : {
				'password' : {
					required : true,
					minlength:1,
					rangelength : [6,12]
				},
				'ValidPassWord' : {
					required : true,
					minlength:1,
					rangelength : [6,12],
					equalTo : "#reg_password"
				}
			},
			messages : {
				'password' : {
					required : "新密码不能为空",
					minlength: "新密码不能为空",
					rangelength:"新密码长度为6-12个字符"
				},
				'ValidPassWord' : {
					required : "确认密码不能为空",
					minlength:"确认密码不能为空",
					rangelength:"确认密码长度为6-12个字符",
					equalTo : "确认密码与新密码不一致"
				}
			},
			errorPlacement : function(error, element) {
				$("#" + element.attr("id") + "tips").html(error.text());
				$("#" + element.attr("id") + "succ").css({"display":"none"}).find("div").html("");
			},
			success : function(label,element){
				$("#" + element.id + "succ").css({"display":"block"}).find("div").html("success");
			},
			invalidHandler : function() {
				return false;
			},
			submitHandler : function() {
				var url =$('form').attr('action');
				var userId=document.getElementById("userId").value;
				var pwd=document.getElementById("reg_password").value;
				var params={"userId":userId,"password":pwd}
				$.ajax({
					type:'post',
					url:url,
					data : params,
					dataType : 'json',
					success : function(data) {
						$.unblockUI();
						if(data){
							if (data.success==true) {
								//手机找回密码
								infoTips(data.msg,"succ");
								//$.blockUI({css:{width:'34%'},message:"<div class='result ok'><span class='ok'></span><span class='txt'>" + data.msg + "</span><a class='closeResult' onclick='$.unblockUI();location.reload();' href='javascript:;'>关闭</a></div>"});
								setTimeout(function(){
									window.location.href="login";
								},5000);
							}else{
								infoTips(data.msg,"succ");	
								//$.blockUI({css:{width:'34%'},message:"<div class='result error'><span class='error'></span><span class='txt'>" + data.msg + "</span><a class='closeResult' onclick='$.unblockUI();location.reload();' href='javascript:;'>关闭</a></div>"});
							}
						}else{
							infoTips("重置密码失败！","explain");
							//$.blockUI({css:{width:'34%'},message:"<div class='result error'><span class='error'></span><span class='txt'>重置密码失败！</span><a class='closeResult' onclick='$.unblockUI();location.reload();' href='javascript:;'>关闭</a></div>"});
						}
					}
				});
				return false;
			}
		});
		/*密码强度*/
		$("#reg_password").live("keyup",function(){
			var curobj=$(this),curval=curobj.val();
			isStrong(curval);
		});
		function isStrong(value){
			var pwdlen=value.length,pwdhavecore=0;
			if(pwdlen>=6&&pwdlen<=12){
				reg_pwdstrongwrap.show();
				if(/[a-zA-Z]+/.test(value) && /[0-9]+/.test(value) && /\W+\D+/.test(value)) {
					pwdhavecore=90;
				}else if(/[a-zA-Z]+/.test(value) || /[0-9]+/.test(value) || /\W+\D+/.test(value)) {
					if(/[a-zA-Z]+/.test(value) && /[0-9]+/.test(value)){
						pwdhavecore=60;
					}else if(/\[a-zA-Z]+/.test(value) && /\W+\D+/.test(value)) {
						pwdhavecore=60;
					}else if(/[0-9]+/.test(value) && /\W+\D+/.test(value)) {
						pwdhavecore=60;
					}else{
						pwdhavecore=30;
					}
				}
				if(pwdhavecore<=50){
					reg_pwdstrong.addClass("strweak").removeClass("strmid strstrong");
				}else if(pwdhavecore<=79&&50<pwdhavecore){
					reg_pwdstrong.addClass("strmid").removeClass("strweak strstrong");
				}else if(pwdhavecore>=80){
					reg_pwdstrong.addClass("strstrong").removeClass("strweak strmid");
				}
			}else if(value==""||value=="null"){
			  reg_pwdstrongwrap.hide();
			  reg_pwdstrong.removeClass("strweak strmid strstrong");
			}else{
			  reg_pwdstrongwrap.hide();
			  reg_pwdstrong.removeClass("strweak strmid strstrong");
			}			
		}
	});
})(jQuery);