(function($){
	$(function(){
		var isalreadyflag=true,sure_validcode=0;
		/*获取页面元素*/
		var reg_action=$("#reg_action"),reg_pwdstrongwrap=$("#reg_pwdstrongwrap"),reg_pwdstrong=$("#reg_pwdstrong"),reg_register=$("#reg_register"),reg_submit=$("#reg_submit"),reg_getcode=$("#reg_getcode"),reg_userphoto=$("#reg_userphoto");
		var emaildom="<tr class=\"reg_default\"><td><label for=\"reg_email\">邮&nbsp;&nbsp;箱</label></td><td colspan=\"2\"><input type=\"text\" maxlength=\"50\" name=\"Email\" id=\"reg_email\"/><div class=\"reg_tipsuccwrap\" style=\"margin-left:6px;\"><div class=\"reg_tipsuccout\" id=\"reg_emailsucc\"><div class=\"reg_tipsuccinner\"></div></div></div><p class=\"reg_tophone\" id=\"reg_tophone\">我想用手机注册</p><span class=\"reg_success\"><span id=\"reg_emailsucc\"></span></span></td></tr><tr><td></td><td colspan=\"2\"><p class=\"reg_tips\" id=\"reg_emailtips\"></p></td></tr>",phonedom="<tr class=\"reg_default\"><td><label for=\"reg_phoneno\">手机号码</label></td><td colspan=\"2\"><input maxlength='13' type=\"text\" name=\"mobilePhone\" id=\"reg_phoneno\" placeholder=\"请输入常用手机号\"/><div class=\"reg_tipsuccwrap\" style=\"margin-left:6px;\"><div class=\"reg_tipsuccout\" id=\"reg_phonenosucc\"><div class=\"reg_tipsuccinner\"></div></div></div><p class=\"reg_toemail\" id=\"reg_toemail\">我想用邮箱注册</p></td></tr><tr><td></td><td colspan=\"2\"><p class=\"reg_tips\" id=\"reg_phonenotips\"></p></td></tr><tr class=\"reg_validcode\"><td><label for=\"reg_validcode\">验证码</label></td><td colspan=\"2\"><input type=\"text\" name=\"validcode\" maxlength=\"6\" id=\"reg_validcode\"/><div class=\"reg_tipsuccwrap\" style=\"margin-left:6px;\"><div class=\"reg_tipsuccout\" id=\"reg_validcodesucc\"><div class=\"reg_tipsuccinner\"></div></div></div><p class=\"reg_getcode\" id=\"reg_getcode\">获取验证码</p><p class=\"reg_regetcode\" id=\"reg_regetcode\"><span>60</span> 秒后重新获取</p></td></tr><tr><td></td><td colspan=\"2\"><p class=\"reg_tips\" id=\"reg_validcodetips\"></p></td></tr>",formatstr1="<colgroup><col class=\"reg_cg1\"/><col class=\"reg_cg2\"/><col class=\"reg_cg3\"/></colgroup>";
		var reg_tophone=$("#reg_tophone"),reg_toemail=$("#reg_toemail");
		/*计时器*/
		var codecounts=(function(){var cc=0;return function(){return ++cc;}}());
		var ccount_id=0;
		/*获取验证码*/
		reg_getcode.removeClass("reg_getcodesel").removeAttr("disabled");
		$("#reg_regetcode").hide();
		$("input[name='userName']").blur(function(e){
			$(this).val($(this).val().replace(/(\s*)/g,""));
		});
		$("input[name='userName']").keyup(function(event){
			if(event.keyCode==32){
				$(this).val($(this).val().replace(/(\s*)/g,""));
				return false;
			}
		})
		reg_getcode.live("click",function(){
			clearInterval(ccount_id);
			ccount_id=null;
			var param={};
			param["mobilePhone"]=$("#reg_phoneno").val();
			param["typeSms"]="1";
			var mbval=document.getElementById("reg_phonenotips");
			if(!/^(13[0-9]|15[012356789]|18[01236789]|14[57])[0-9]{8}$/.test(param["mobilePhone"].replace(/(\s*)/g,""))){
				mbval.innerHTML="手机号码不正确";
				setTimeout(function(){mbval.innerHTML="";},3000);
				return false;
			}
			$.ajax({
				url:"doCheckPhone",
				async:false,
				type: "post",
				dataType:"json",
				data:{validateType:"1",mobilePhone:function(){return document.getElementById("reg_phoneno").value.replace(/(\s*)/g,"")}},
				success:function(datas){
					if(datas){
						isalreadyflag=true;
					}else if(!datas){
						isalreadyflag=false;
					}
				}
			});
			if(!isalreadyflag){
				mbval.innerHTML="该手机号码已被注册,请重新输入";
				return false;
			}
			var curobj=$(this),reg_regetcode=$("#reg_regetcode");
			var c_count=1;
			curobj.addClass("reg_getcodesel").attr({"disabled":"disabled"});
			reg_regetcode.show();
			ccount_id=setInterval(function(){
				c_count=codecounts();
				c_count<=60?c_count=c_count:c_count=c_count%60;
				reg_regetcode.find("span").text(60-c_count);
				if(c_count==60||c_count==0){
					clearInterval(ccount_id);
					curobj.removeClass("reg_getcodesel").removeAttr("disabled");
					reg_regetcode.hide();
				};
			},1000);
			$.post("../../sys/sms/sendUserSms",param,function(data){
				if(data.success){
					/*var email_content=data.content;
					email_content=email_content.split("&")[0];
					email_content=email_content.split(":")[1];
					sure_validcode=email_content;
					alert("success:"+data.content);*/
				}else{
					/*alert("fail"+data.msg);
					sure_validcode=0;*/
				}
			});
		});
		//格式化手机号码
		$("#reg_phoneno").live("keypress",turnPhoneNo);
		//手机号码输入检测
		function turnPhoneNo(event){
			if(event.keyCode==8 || event.keyCode==37 || event.keyCode==39){
				return;
			}
			
			var $this = $(event.target), no = $this.val();
			tno = no.replace(/(\s*)/g,"");
			var l = tno.length;
			if(l==3 || l==7){
				no = no+" ";
				$this.val(no);
			}
		}
		
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
		$("#reg_agreecb").click();
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
			  var username=/^[0-9A-Za-z_\u2E80-\u9FFF]{4,16}/;
			  return this.optional(element)||(username.test(value));
		},"用户名只能由中文/数字/字母/下划线组成");
		jQuery.validator.addMethod("hasSpace",function(value,element){
			  var username=/\s+/g;
			  return this.optional(element)||(!username.test(value));
		},"用户名只能由中文/数字/字母/下划线组成,不包含空格符");
		jQuery.validator.addMethod("ischi_phone",function(value,element){
			  var tno = value.replace(/(\s*)/g,"");
			  var phonecode=/^(13[0-9]|15[012356789]|18[01236789]|14[57])[0-9]{8}$/;
			  return this.optional(element)||(phonecode.test(tno));
		},"手机号码不正确");
		/*自定义验证规则*/
		jQuery.validator.addMethod("isPaw",function(value,element){
			 var paw=/\s+/g;
			  return this.optional(element)||(!paw.test(value));
		},"密码不能包含空格符");
		/*jQuery.validator.addMethod("isSurevc",function(value,element){
			  var svc=sure_validcode;
			  if(svc==0){
				  return false;
			  }
			  return value==svc;
		},"验证码不正确");*/
		jQuery.validator.addMethod("ischi_Email",function(value,element){
			  var emailrule=/^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g;
			  return this.optional(element)||(emailrule.test(value));
		},"邮箱格式不正确");
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
		/*手机号码失去焦点后校验*/
		$("#reg_phoneno").live("focusout",function(e){
			var curobj=e.target;
			var v = curobj.value;
			var tno = v.replace(/(\s*)/g,"");
			var phonerule=/^(13[0-9]|15[012356789]|18[01236789]|14[57])[0-9]{8}$/;
			if(!phonerule.test(tno)){
				curobj.value="";
			}
		});
		/*验证表单*/
		reg_action.validate({
			rules : {
				'userName' : {
					required : true,
					minlength:1,
					rangelength : [4,16],
					hasSpace:true,
					isUserName:true,
					remote:{
						url:"doCheckUserName",
						type: "post",
						data:{
							validateType:"1",
							userName:function(){return $("#reg_username").val();}
						}
					}
				},
				'password' : {
					required : true,
					minlength:1,
					rangelength : [6,12],
					isPaw:true
				},
				'ValidPassWord' : {
					required : true,
					minlength:1,
					rangelength : [6,12],
					equalTo : "#reg_password"
				},
				'mobilePhone' : {
					required : true,
					minlength:1,
					ischi_phone:true,
					remote:{
						url:"doCheckPhone",
						type: "post",
						data:{
							validateType:"1",
							mobilePhone:function(){return $("#reg_phoneno").val().replace(/(\s*)/g,"");}
						}
					}
				},
				'Email' : {
					required : true,
					minlength:1,
				ischi_Email:true,
					remote:{
						url:"doCheckEmail",
						type: "post",
						data:{
							validateType:"1",
							Email:function(){return $("#reg_email").val();}
						}
					}
				},
				'validcode' : {
					required:true,
					minlength:1
				}
			},
			messages : {
				'userName' : {
					required : "用户名不能为空",
					minlength:"用户名不能为空",
					rangelength : "用户名长度为4-16个字符",
					hasSpace:"用户名不能包含空格",
					remote:"用户名已被注册,请重新输入"
				},
				'password' : {
					required : "密码不能为空",
					minlength: "密码不能为空",
					rangelength:"密码长度为6-12个字符",
					isPaw:"密码不能包含空格符"
				},
				'ValidPassWord' : {
					required : "确认密码不能为空",
					minlength:"确认密码不能为空",
					rangelength:"确认密码长度为6-12个字符",
					equalTo : "确认密码与密码不一致"
				},
				'mobilePhone' : {
					required : "手机号码不能为空",
					minlength:"手机号码不能为空",
					ischi_phone:"手机号码格式不正确",
					remote:"该手机号码已被注册,请重新输入"
				},
				'Email' : {
					required :"邮箱不能为空",
					minlength:"邮箱不能为空",
					remote:"该邮箱已被注册,请重新输入"
					
				},
				'validcode' : {
					required : "验证码不能为空",
					minlength:"验证码不能为空"
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
				if(params.indexOf("mobilePhone")!=-1){
					params={"userName":$("#reg_username").val(),"password":$("#reg_password").val(),"ValidPassWord":$("#reg_validpwd").val(),"mobilePhone":$("#reg_phoneno").val().replace(/(\s*)/g,""),"validcode":$("#reg_validcode").val()}
				}
				$.ajax({
					type:'post',
					url:url,
					data : params,
					dataType : 'json',
					success : function(data) {
						if (data.success) {
							if(data.regType==1){
								window.location.href="regPhoneSuccess?userName="+data.userName;	
							}else{
								window.location.href="regSuccess?emailUrl="+data.emailUrl+"&userId="+data.userId+"&email="+data.email;	
							}
						}else{
							//data.type为出错类型 1.用户名重复，2.电话重复，3邮箱重复    ；object.msg  为提示内容（也可自己提供）
							alert(data.msg);
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
			value = value.replace(/\s*/g,"");
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
			clearTimeout(reg_upid);
			reg_upid=null;
			reg_index1=reg_upcounts%2;
			reg_userphoto.find("li").eq(reg_index1).show().siblings().hide();
			reg_upid=setInterval(function(){
				reg_UPSlide(reg_upcounts++);
			},8000);
		}
		reg_UPSlide();
		
		
		/*服务协议和借款协议*/
		$("#server_agreement").click(function(e){
			$.unblockUI();
			var box = $("#"+e.target.id+"box");
			var w = $("body").width() - box.width();
			w = w/2;
			$.blockUI({css:{"left":w,"top":"5%"},message:$("#"+e.target.id+"box")});
			$("#server_agreementclose,#server_agreementsure,#loan_agreementclose,#loan_agreementsure").click(function(){
				$.unblockUI();
			});
		});
	});
})(jQuery);