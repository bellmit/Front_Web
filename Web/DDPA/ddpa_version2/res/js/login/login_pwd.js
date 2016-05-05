(function($){
	$(function(){
		var isalreadyflag=false,sure_validcode=0;
		/*获取页面元素*/
		var login_forgetpwd=$("#login_forgetpwd"),toemail=$("#toemail"),tophone=$("#tophone"),getcode=$("#getcode"),pwdinfo_close=$("#pwdinfo_close");
		var phonepwd_action=$("#phonepwd_action"),emailpwd_action=$("#emailpwd_action"),resetpwd_action=$("#resetpwd_action");
		/*自定义验证规则*/
		jQuery.validator.addMethod("ischi_phone",function(value,element){
			  var tno = value.replace(/(\s*)/g,"");
			  var phonecode=/^(13[0-9]|15[012356789]|18[0-9]|14[57]|170)[0-9]{8}$/;
			  return this.optional(element)||(phonecode.test(tno));
		},"手机号码不正确");
		jQuery.validator.addMethod("isSurevc",function(value,element){
			  var svc=sure_validcode;
			  if(svc==0){
				  return false;
			  }
			  return value==svc;
		},"验证码不正确");
		jQuery.validator.addMethod("ischi_Email",function(value,element){
			  var emailrule=/^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z0-9]{2,7}((\.[a-z]{2})|(\.(com|net)))?)$/g;
			  return this.optional(element) || emailrule.test(value);
		},"邮箱格式不正确");
		/*计时器*/
		var codecounts=(function(){var cc=0;return function(){return ++cc;}}());
		var ccount_id=null;
		/*弹出层关闭*/
		pwdinfo_close.live("click",function(){
			$.unblockUI();
			clearInterval(ccount_id);
			ccount_id=null;
		});
		//格式化手机号码
		$("#findpwd_phoneno").live("keypress",turnPhoneNo);
		//手机号码输入检测
		function turnPhoneNo(event){
			if(event.keyCode==8){
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
		/*通过手机找回密码(默认),手机和邮箱之间的切换*/
		login_forgetpwd.live("click",function(e){
			e.preventDefault();
			getPhoneLayer();
			$("input[name='mobilePhone']").focusout();
		});
		toemail.live("click",function(){
			clearInterval(ccount_id);
			ccount_id=null;
			$.unblockUI();
			getEmailLayer();
		});
		tophone.live("click",function(){
			clearInterval(ccount_id);
			ccount_id=null;
			$.unblockUI();
			getPhoneLayer();
			$("input[name='mobilePhone']").focusout();
		});
		/*获取验证码*/
		getcode.removeClass("getcodesel").removeAttr("disabled");
		getcode.live("click",function(){
			clearInterval(ccount_id);
			ccount_id=null;
			var phonerule=/^(13[0-9]|15[012356789]|18[0-9]|14[57]|170)[0-9]{8}$/,phonevalue=document.getElementById("findpwd_phoneno").value.replace(/(\s*)/g,"");
			if(!phonerule.test(phonevalue)||phonevalue==""){
				document.getElementById("findpwd_phoneno_tips").innerHTML="注册手机号不正确";
				return false;
			}
			$.ajax({
				url:(function(){
					var urls = location.host;
					if(urls.indexOf("www.ddpa")!=-1){
						urls = "/account/user/doCheckPhone";
					}else{
						urls = "../../account/user/doCheckPhone";
					}
					return urls;
				}()),
				type: "post",
				async:false,
				dataType:"json",
				data:{validateType:"2",mobilePhone:function(){return document.getElementById("findpwd_phoneno").value.replace(/(\s*)/g,"")}},
				success:function(datas){
					if(datas){
						isalreadyflag=true;
					}else if(!datas){
						isalreadyflag=false;
					}
				}
			});
			if(!isalreadyflag){
				document.getElementById("findpwd_phoneno_tips").innerHTML="注册手机号不存在";
				return false;
			}
			var curobj=$(this),regetcode=$("#regetcode");
			var c_count=1;
			curobj.addClass("getcodesel").attr({"disabled":"disabled"});
			regetcode.show();
			ccount_id=setInterval(function(){
				c_count=codecounts();
				c_count<=60?c_count=c_count:c_count=c_count%60;
				regetcode.find("span").text(60-c_count);
				if(c_count==60||c_count==0){
					clearInterval(ccount_id);
					regetcode.hide();
					curobj.removeClass("getcodesel").removeAttr("disabled");
				};
			},1000);
			
			var param={};
			param["mobilePhone"]=$("#findpwd_phoneno").val();
			param["typeSms"]="2";
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
		/*手机号码失去焦点后校验*/
		$("#findpwd_phoneno").live("focusout",function(e){
			var curobj=e.target;
			var phonerule=/^(13[0-9]|15[012356789]|18[0-9]|14[57]|170)[0-9]{8}$/;
			if(!phonerule.test(curobj.value.replace(/(\s*)/g,""))){
				curobj.value="";
			}
		});
		
		delBtnDis($("#phonefindpwd"),"login_btndis","pwd_btn");
		delBtnDis($("#emailfindpwd"),"login_btndis","pwd_btn");
		delBtnDis($("#resetpwd"),"login_btndis","pwd_btn");
		/*手机表单校验*/
		phonepwd_action.live("click",function(){
			var url = location.host;
			if(url.indexOf("www.ddpa")!=-1){
				url = "/account/user/doCheckPhone";
			}else{
				url = "../../account/user/doCheckPhone";
			}	
			$(this).validate({
				onkeyup:false,
				rules : {
					'mobilePhone' : {
						required : true,
						minlength:1,
						ischi_phone :true,
						remote:{
							url:url,
							type: "post",
							data:{
								validateType:"2",
								mobilePhone:function(){return $("#findpwd_phoneno").val().replace(/(\s*)/g,"");}
							}
						}
					},
					'validcode' : {
						required : true,
						minlength:1
					}
				},
				messages : {
					'mobilePhone' : {
						required : "手机不能为空",
						minlength:"手机不能为空",
						ischi_phone :"手机格式不正确",
						remote:"手机号码不存在,请重新输入"
					},
					'validcode' : {
						required : "验证码不能为空",
						minlength:"验证码不能为空"
					}
				},
				errorPlacement : function(error, element) {
					$("#" + element.attr("id") + "_tips").html(error.text());
				},
				success : function(){},
				invalidHandler : function() {
					return false;
				},
				submitHandler:function(){
					var url1 =$('#phonepwd_action').attr('action');
					var urls1 = location.host;
					if(urls1.indexOf("www.ddpa")!=-1){
						url1 = "/account/user/"+url1;
					}else{
						url1 = "../../account/user/"+url1;
					}
					var params ={"mobilePhone":$("#findpwd_phoneno").val().replace(/(\s*)/g,""),"validcode":$("#validcode").val()}
					$.ajax({
						type:'post',
						url:url1,
						data : params,
						dataType :"json",
						success : function(data) {
							if (data.success) {
								//手机找回密码
								if(data.type==1){
									$.unblockUI();
									getResetLayer();
									$("#findPwdUserId").val(data.userId);
								}else if(data.type==2){
									//邮箱找回密码
									window.location.href="toEmailPassword?emailUrl="+data.emailUrl+"&email="+data.email+"&userId="+data.userId;
								}
								addBtnDis($("#phonefindpwd"),"login_btndis","pwd_btn");
							}else{
								alert(data.msg);
								delBtnDis($("#phonefindpwd"),"login_btndis","pwd_btn");
							}
						},
						error: function(event,request, settings){
							delBtnDis($("#phonefindpwd"),"login_btndis","pwd_btn");
						}
					});
					return false;
				}
			});
		});
		/*邮箱表单校验*/
		emailpwd_action.live("click",function(){
			var url = location.host;
			if(url.indexOf("www.ddpa")!=-1){
				url = "/account/user/doCheckEmail";
			}else{
				url = "../../account/user/doCheckEmail";
			}
			$(this).validate({
				onkeyup:false,
				rules : {
					'Email' : {
						required : true,
						minlength:1,
						ischi_Email:true,
						remote:{
							url:url,
							type: "post",
							data:{
								validateType:"2",
								Email:function(){return $("#findpwd_email").val();}
							}
						}
					}
				},
				messages : {
					'Email' : {
						required : "邮箱不能为空",
						minlength: "邮箱不能为空",
						remote:"邮箱不存在,请重新输入"
					}
				},
				errorPlacement : function(error, element) {
					$("#" + element.attr("id") + "_tips").html(error.text());
				},
				success : function(){},				
				invalidHandler : function() {
					return false;
				},
				submitHandler:function(){
					var url1 =$("form[id='emailpwd_action']").attr('action');
					var urls1 = location.host;
					if(urls1.indexOf("www.ddpa")!=-1){
						url1 = "/account/user/"+url1;
					}else{
						url1 = "../../account/user/"+url1;
					}
					var params =$("form[id='emailpwd_action']").serialize();
					$.ajax({
						type:"post",
						data:params,
						url:url1,
						dataType:"json",
						success:function(datas) {
							if(datas){
								if (datas.success) {
									if(datas.type==1){
										$("#findPwdUserId").val(datas.userId);
										$.unblockUI();
										getResetLayer();
										window.location.href="toResetPassword?userId="+data.userId;
									}else if(datas.type==2){
										window.location.href="../../account/user/toEmailPassword?emailUrl="+datas.emailUrl+"&email="+datas.email+"&userId="+datas.userId;
									}
									addBtnDis($("#emailfindpwd"),"login_btndis","pwd_btn");
								}else{
									alert("验证邮件发送失败！");
									delBtnDis($("#emailfindpwd"),"login_btndis","pwd_btn");
								}
							}else{
								alert("返回数据失败！");
								delBtnDis($("#emailfindpwd"),"login_btndis","pwd_btn");
							}
						},
						error: function(){
							delBtnDis($("#emailfindpwd"),"login_btndis","pwd_btn");
						}
					});
					return false;
				}
				
				
			});
		});
		/*重置密码表单校验*/
		resetpwd_action.live("click",function(){
			$(this).validate({
				onkeyup:false,
				rules : {
					'password' : {
						required : true,
						minlength:1,
						rangelength : [6,20]
					},
					'ReNewPWD' : {
						required : true,
						minlength:1,
						rangelength : [6,20],
						equalTo :"#newpwd"
					}
				},
				messages : {
					'password' : {
						required :"新密码不能为空",
						minlength:"新密码不能为空",
						rangelength :"新密码长度必须为6-20之间"
					},
					'ReNewPWD' : {
						required :"新密码确认不能为空",
						minlength:"新密码确认不能为空",
						rangelength :"新密码确认长度必须为6-20之间",
						equalTo : "新密码与新密码确认必须一致"
					}
				},
				errorPlacement : function(error, element) {
					$("#" + element.attr("id") + "_tips").html(error.text());
				},
				success : function(){},			
				invalidHandler : function() {
					return false;
				},
				submitHandler:function(){
					var url1 =$('#resetpwd_action').attr('action');
					var urls1 = location.host;
					if(urls1.indexOf("www.ddpa")!=-1){
						url1 = "/account/user/"+url1;
					}else{
						url1 = "../../account/user/"+url1;
					}
					var userId=$("#findPwdUserId").val();
					var params =$('#resetpwd_action').serialize();			
					params=params+"&userId="+userId;
					$.ajax({
						type:'post',
						url:url1,
						data : params,
						dataType :"json",
						success : function(data) {
							if (data.success==true) {
								//手机找回密码
								infoTips(data.msg,"succ");
								if(location.href.indexOf("findpassword")>=0){
									setTimeout(function(){
										location.href="../../account/user/login";
									},5000);
								}
								//$.blockUI({css:{width:'34%'},message:"<div class='result ok'><span class='ok'></span><span class='txt'>" + data.msg + "</span><a class='closeResult' onclick='$.unblockUI();location.reload();' href='javascript:;'>关闭</a></div>"});
								//window.location.href="login";
								addBtnDis($("#resetpwd"),"login_btndis","pwd_btn");
							}else{	
								infoTips(data.msg,"err");
								delBtnDis($("#resetpwd"),"login_btndis","pwd_btn");			
								//$.blockUI({css:{width:'34%'},message:"<div class='result error'><span class='error'></span><span class='txt'>" + data.msg + "</span><a class='closeResult' onclick='$.unblockUI();location.reload();' href='javascript:;'>关闭</a></div>"});
							}
							//setTimeout(function(){ $.unblockUI(); window.location.reload();},4000);
						},
						error: function(){
							delBtnDis($("#resetpwd"),"login_btndis","pwd_btn");
						}
					});
					return false;
				}
			});
		})
	});
})(jQuery);

/*找回密码弹出层封装*/
/*获取手机弹出层*/
function getPhoneLayer(){
	var w = $(window).width();
	w = w -504;
	w = w/2;
	$.blockUI({css:{left:w},message:"<div class=\"pwdinfo_layout\"><div class=\"pwdinfo_wrap\" id=\"pwdinfo_wrap\"><div class=\"pwdinfo_title\"><p>找回密码</p><span id=\"pwdinfo_close\"></span></div><div class=\"pwdinfo_content\"><form method=\"post\" action=\"doFindPwd\" id=\"phonepwd_action\"><table><colgroup><col class=\"pwd_cg1\"/><col class=\"pwd_cg2\"/></colgroup><tr><td><label for=\"phoneno\">注册手机号</label></td><td><input type=\"text\" class=\"phoneno\" maxlength=\"13\" name=\"mobilePhone\" id=\"findpwd_phoneno\" placeholder=\"请输入注册手机号\"/><span class=\"changeway\" id=\"toemail\">使用邮箱找回密码</span></td></tr><tr><td></td><td><p class=\"valid_tips\" id=\"findpwd_phoneno_tips\"></p></td></tr><tr><td><label for=\"validcode\">验证码</label></td><td><input type=\"text\" class=\"validcode\" maxlength=\"6\"  name=\"validcode\" id=\"validcode\"/><button type=\"button\" class=\"getcode\" id=\"getcode\">获取验证码</button><p class=\"regetcode\" id=\"regetcode\"><span>60</span>秒后重新获取</p></td></tr><tr><td></td><td><p class=\"valid_tips\" id=\"validcode_tips\"></p></td></tr><tr><td></td><td><input type=\"submit\" id=\"phonefindpwd\" value=\"提&nbsp;&nbsp;交\" class=\"pwd_btn\"/></td></tr></table></form></div></div></div>"});	
}
/*获取邮箱弹出层*/
function getEmailLayer(){
	var w = $(window).width();
	w = w -504;
	w = w/2;
	$.blockUI({css:{left:w},message:"<div class=\"pwdinfo_layout\"><div class=\"pwdinfo_wrap\" id=\"pwdinfo_wrap\"><div class=\"pwdinfo_title\"><p>找回密码</p><span id=\"pwdinfo_close\"></span></div><div class=\"pwdinfo_content\"><form method=\"post\" action=\"doFindPwd\" id=\"emailpwd_action\"><table><colgroup><col class=\"pwd_cg1\"/><col class=\"pwd_cg2\"/></colgroup><tr><td><label for=\"email\">注册邮箱</label></td><td><input type=\"text\" class=\"email_def\" name=\"Email\" maxlength=\"100\"  id=\"findpwd_email\" placeholder=\"请输入注册邮箱\"/><span class=\"changeway\" id=\"tophone\">使用手机号找回密码</span></td></tr><tr><td></td><td><p class=\"valid_tips\" id=\"findpwd_email_tips\"></p></td></tr><tr><td></td><td><input type=\"submit\" id=\"emailfindpwd\" value=\"提&nbsp;&nbsp;交\" class=\"pwd_btn\"/></td></tr></table></form></div></div></div>"});	
}
/*获取重置密码弹出层*/
function getResetLayer(){
	var w = $(window).width();
	w = w -504;
	w = w/2;
	$.blockUI({css:{left:w},message:"<div class=\"pwdinfo_layout\"><div class=\"pwdinfo_wrap\" id=\"pwdinfo_wrap\"><div class=\"pwdinfo_title\"><p>重置密码</p><span id=\"pwdinfo_close\"></span></div><div class=\"pwdinfo_content\"><form method=\"post\" action=\"resetPassword\" id=\"resetpwd_action\"><table><colgroup><col class=\"pwd_cg1\"/><col class=\"pwd_cg2\"/></colgroup><tr><td><label for=\"newpwd\">新密码</label></td><td><input type=\"password\" class=\"newpwd\" maxlength=\"20\"  name=\"password\" id=\"newpwd\" placeholder=\"请输入新密码\"/></td></tr><tr><td></td><td><p class=\"valid_tips\" id=\"newpwd_tips\"></p></td></tr><tr><td><label for=\"renewpwd\">密码确认</label></td><td><input type=\"password\" class=\"newpwd\" maxlength=\"20\"  name=\"ReNewPWD\" id=\"renewpwd\" placeholder=\"请输入新密码确认\"/></td></tr><tr><td></td><td><p class=\"valid_tips\" id=\"renewpwd_tips\"></p></td></tr><tr><td></td><td><input type=\"submit\" id=\"resetpwd\" value=\"确&nbsp;&nbsp;定\" class=\"pwd_btn\"/></td></tr></table></form></div></div></div>"});
}