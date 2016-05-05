(function($){
	$(function(){
		/*获取页面元素*/
		var findpwd_action=$("#findpwd_action"),findpwd_pwdstrong=$("#findpwd_pwdstrong"),findpassword=$("#findpassword"),findpwd_submit=$("#findpwd_submit"),findpwd_getcode=$("#findpwd_getcode");
		var emaildom="<tr class=\"findpwd_default\"><td><label for=\"findpwd_email\">邮  箱：</label></td><td><input type=\"text\" name=\"Email\" id=\"findpwd_email\"/></td><td><p class=\"findpwd_tophone\" id=\"findpwd_tophone\">我想用手机找回</p><span class=\"findpwd_success\"><span id=\"findpwd_emailsucc\"></span></span></td></tr><tr><td></td><td colspan=\"2\"><p class=\"findpwd_tips\" id=\"findpwd_emailtips\"></p></td></tr>",phonedom="<tr class=\"findpwd_default\"><td><label for=\"findpwd_phoneno\">手机号：</label></td><td><input type=\"text\" name=\"PhoneNo\" id=\"findpwd_phoneno\" placeholder=\"请输入常用手机号\"/></td><td><p class=\"findpwd_toemail\" id=\"findpwd_toemail\">我想用邮箱找回</p><span class=\"findpwd_success\"><span id=\"findpwd_phonenosucc\"></span></span></td></tr><tr><td></td><td colspan=\"2\"><p class=\"findpwd_tips\" id=\"findpwd_phonenotips\"></p></td></tr><tr class=\"findpwd_validcode\"><td><label for=\"findpwd_validcode\">验证码：</label></td><td colspan=\"2\"><input type=\"text\" name=\"ValidCode\" id=\"findpwd_validcode\"/><img src=\"\" id=\"findpwd_codeimg\" alt=\"\" class=\"findpwd_codeimg\"><p class=\"findpwd_getcode\" id=\"findpwd_getcode\">获取验证码</p><p class=\"findpwd_regetcode\" id=\"findpwd_regetcode\"><span>60</span> 秒后重新获取</p></td></tr><tr><td></td><td colspan=\"2\"><p class=\"findpwd_tips\" id=\"findpwd_validcodetips\"></p></td></tr>",formatstr1="<colgroup><col class=\"findpwd_cg1\"/><col class=\"findpwd_cg2\"/><col class=\"findpwd_cg3\"/></colgroup>";
		var findpwd_tophone=$("#findpwd_tophone"),findpwd_toemail=$("#findpwd_toemail");
		/*计时器*/
		var codecounts=(function(){var cc=0;return function(){return ++cc;}}());
		var ccount_id=0;
		/*获取验证码*/
		findpwd_getcode.removeClass("findpwd_getcodesel").removeAttr("disabled");
		findpwd_getcode.live("click",function(){
			var curobj=$(this),findpwd_regetcode=$("#findpwd_regetcode");
			var c_count=1;
			curobj.addClass("findpwd_getcodesel").attr({"disabled":"disabled"});
			ccount_id=setInterval(function(){
				c_count=codecounts();
				c_count<=60?c_count=c_count:c_count=c_count%60;
				findpwd_regetcode.find("span").text(c_count);
				if(c_count==60){
					clearInterval(ccount_id);
					curobj.removeClass("findpwd_getcodesel").removeAttr("disabled");
				};
			},1000);
		});
		
		/*切换注册方式*/
		findpwd_toemail.live("click",function(){
			clearInterval(ccount_id);
			findpassword.empty().append(formatstr1+emaildom);
		});
		findpwd_tophone.live("click",function(){
			clearInterval(ccount_id);
			findpassword.empty().append(formatstr1+phonedom);
		})
		/*自定义验证规则*/
		jQuery.validator.addMethod("isUserName",function(value,element){
			  var username=/[0-9A-Za-z_\u2E80-\u9FFF]{4,16}/;
			  return this.optional(element)||(username.test(value));
		},"只能由中文/数字/字母/下划线组成");
		jQuery.validator.addMethod("ischi_phone",function(value,element){
			  var phonecode=/^0?(13[0-9]|15[012356789]|18[0236789]|14[57])[0-9]{8}$/;
			  return this.optional(element)||(phonecode.test(value));
		},"手机号码不正确");
		/*验证表单*/
		findpwd_action.validate({
			rules : {
				'UserName' : {
					required : true,
					rangelength : [4,16],
					remote:{
						url:"提交访问地址",
						type: "post",
						data:{
							UserName:function(){return document.getElementById("findpwd_username").value;}
						}
					}
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
					required:true,
				}
			},
			messages : {
				'UserName' : {
					required : "用户名不能为空",
					rangelength : "用户名长度为4-16个字符",
					remote:"用户名已经被注册,请重新输入"
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
			},
			success : function(){},
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
							$("#findpwd_codeimg").click();
						}
					}
				});
				return false;
			}
		});
	});
})(jQuery);