(function($){
	$(function(){
		/*获取页面元素*/
		var reg_action=$("#reg_action"),reg_pwdstrongwrap=$("#reg_pwdstrongwrap"),reg_pwdstrong=$("#reg_pwdstrong"),reg_submit=$("#reg_submit"),reg_getcode=$("#reg_getcode"),reg_userphoto=$("#reg_userphoto");
		var emaildom="<tr class=\"reg_default\"><td><label for=\"reg_email\">邮  箱：</label></td><td><input type=\"text\" name=\"Email\" id=\"reg_email\"/></td><td><p class=\"reg_tophone\" id=\"reg_tophone\">我想用手机注册</p><span class=\"reg_success\"><span id=\"reg_emailsucc\"></span></span></td></tr><tr><td></td><td colspan=\"2\"><p class=\"reg_tips\" id=\"reg_emailtips\"></p></td></tr><tr class=\"reg_validcode\"><td><label for=\"reg_vcemail\">验证码：</label></td><td colspan=\"2\"><input type=\"text\" name=\"ValidCodeEmail\" id=\"reg_vcemail\"/><img src=\"\" id=\"reg_vcemailimg\" alt=\"\" class=\"reg_vcemailimg\"></td></tr><tr><td></td><td colspan=\"2\"><p class=\"reg_tips\" id=\"reg_vcemailtips\"></p></td></tr>",phonedom="<tr class=\"reg_default\"><td><label for=\"reg_phoneno\">手机号：</label></td><td><input type=\"text\" name=\"PhoneNo\" id=\"reg_phoneno\" placeholder=\"请输入常用手机号\"/></td><td><p class=\"reg_toemail\" id=\"reg_toemail\">我想用邮箱注册</p><span class=\"reg_success\"><span id=\"reg_phonenosucc\"></span></span></td></tr><tr><td></td><td colspan=\"2\"><p class=\"reg_tips\" id=\"reg_phonenotips\"></p></td></tr><tr class=\"reg_validcode\"><td><label for=\"reg_validcode\">验证码：</label></td><td colspan=\"2\"><input type=\"text\" name=\"ValidCode\" id=\"reg_validcode\"/><img src=\"\" id=\"reg_codeimg\" alt=\"\" class=\"reg_codeimg\"><p class=\"reg_getcode\" id=\"reg_getcode\">获取验证码</p><p class=\"reg_regetcode\" id=\"reg_regetcode\"><span>60</span> 秒后重新获取</p></td></tr><tr><td></td><td colspan=\"2\"><p class=\"reg_tips\" id=\"reg_validcodetips\"></p></td></tr>",formatstr1="<colgroup><col class=\"reg_cg1\"/><col class=\"reg_cg2\"/><col class=\"reg_cg3\"/></colgroup>";
		var reg_tophone=$("#reg_tophone"),reg_toemail=$("#reg_toemail");
		/*计时器*/
		var codecounts=(function(){var cc=0;return function(){return ++cc;}}());
		var ccount_id=0;
		/*获取验证码*/
		reg_getcode.removeClass("reg_getcodesel").removeAttr("disabled");
		reg_getcode.live("click",function(){
			var curobj=$(this),reg_regetcode=$("#reg_regetcode");
			var c_count=1;
			curobj.addClass("reg_getcodesel").attr({"disabled":"disabled"});
			ccount_id=setInterval(function(){
				c_count=codecounts();
				c_count<=60?c_count=c_count:c_count=c_count%60;
				reg_regetcode.find("span").text(60-c_count);
				if(c_count==60||c_count==0){
					clearInterval(ccount_id);
					curobj.removeClass("reg_getcodesel").removeAttr("disabled");
				};
			},1000);
		});
		
		/*同意协定*/
		reg_submit.attr({"disabled":"disabled"}).removeClass("reg_submitsel");
		$("#reg_agreecb").click(function(){
			var curobj=$(this),curclass=curobj.attr("class");
			if(curclass==""){
				curobj.addClass("reg_agreecbsel");
				reg_submit.removeAttr("disabled").addClass("reg_submitsel");
			}else{
				curobj.removeClass("reg_agreecbsel");
				reg_submit.attr({"disabled":"disabled"}).removeClass("reg_submitsel");
			}
		});
		/*切换注册方式*/
		reg_toemail.live("click",function(){
			clearInterval(ccount_id);
			reg_register.empty().append(formatstr1+emaildom);
		});
		reg_tophone.live("click",function(){
			clearInterval(ccount_id);
			reg_register.empty().append(formatstr1+phonedom);
		})
		/*自定义验证规则*/
		jQuery.validator.addMethod("isUserName",function(value,element){
			  var username=/[0-9A-Za-z_\u2E80-\u9FFF]{4,16}/;
			  return this.optional(element)||(username.test(value));
		},"只能由中文/数字/字母/下划线组成");
		jQuery.validator.addMethod("ischi_phone",function(value,element){
			  var phonecode=/^0?(13[0-9]|15[012356789]|18[01236789]|14[57])[0-9]{8}$/;
			  return this.optional(element)||(phonecode.test(value));
		},"手机号码不正确");
		/*绑定文本框获取焦点事件*/
		$("#reg_username,#reg_password").live("focusin focusout",function(e){
			var curid=e.target.id,curobj=$(e.target),curevent=e.type;
			if(curevent=="focusin"){
				if(curid=="reg_username"){
					$("#reg_unexplain").show();
				}else if(curid=="reg_password"){
					$("#reg_pwdexplain").show();
				}
			}else if(curevent=="focusout"){
				if(curid=="reg_username"){
					$("#reg_unexplain").hide();
				}else if(curid=="reg_password"){
					$("#reg_pwdexplain").hide();
				}
			}
        });
		/*验证表单*/
		reg_action.validate({
			rules : {
				'UserName' : {
					required : true,
					rangelength : [4,16],
					isUserName:true/*,
					remote:{
						url:"提交访问地址",
						type: "post",
						data:{
							UserName:function(){return document.getElementById("reg_username").value;}
						}
					}*/
				},
				'PassWord' : {
					required : true,
					rangelength : [6,12]
				},
				'ValidPassWord' : {
					required : true,
					rangelength : [6,12],
					equalTo : "#reg_password"
				},
				'PhoneNo' : {
					required : true,
					ischi_phone:true
				},
				'Email' : {
					required : true,
					email:true
				},
				'ValidCode' : {
					required:true
				}
			},
			messages : {
				'UserName' : {
					required : "用户名不能为空",
					rangelength : "用户名长度为4-16个字符"/*,
					remote:"用户名已经被注册,请重新输入"*/
				},
				'PassWord' : {
					required : "密码不能为空",
					rangelength:"密码长度为6-12个字符"
				},
				'ValidPassWord' : {
					required : "确认密码不能为空",
					rangelength:"确认密码长度为6-12个字符",
					equalTo : "确认密码与密码不一致"
				},
				'PhoneNo' : {
					required : "手机不能为空",
					ischi_phone:"手机格式不正确"
				},
				'Email' : {
					required :"邮箱不能为空",
					email:"邮箱不符合规范"
				},
				'ValidCode' : {
					required : "验证码不能为空"
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
				var params =$('form').serialize();
				$.ajax({
					type:'post',
					url:url,
					data : params,
					dataType : 'json',
					success : function(data) {
						var object = eval("(" + data.rs + ")");
						if (object.success) {
							var success_str="成功后的跳转地址";
							popup_alert(object.msg,success_str,"yes","have");				
						}else{
							popup_alert(object.msg,"undefined","no","none");				
							$("#reg_codeimg").click();
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
		
		
		/*右部图片切换*/
		var reg_upid=null,reg_upcounts=0,reg_index1=0;
		function reg_UPSlide(){
			clearTimeout(reg_upid)
			reg_upid=null;
			reg_index1=reg_upcounts%2;
			reg_userphoto.find("li").eq(reg_index1).show().siblings().hide();
			reg_upid=setInterval(function(){
				reg_UPSlide(reg_upcounts++);
			},8000);
		}
		reg_UPSlide();
		
		/*服务协议和借款协议*/
		$("#server_agreement,#loan_agreement").click(function(e){
			var curobj=e.target,curid=e.target.id;
			$.unblockUI();
			$.blockUI({css:{"left":"20%","top":"5%"},message:$("#"+curid+"box")});
			$("#server_agreementclose,#server_agreementsure,#loan_agreementclose,#loan_agreementsure").click(function(){
				$.unblockUI();
			});
		});
	});
})(jQuery);