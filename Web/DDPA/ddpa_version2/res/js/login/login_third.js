(function($){
	$(function(){
		/*是否是邮箱或手机标识*/
		var iseorp="";
		var rulep=/^(13[0-9]|15[012356789]|18[0-9]|14[57]|170)[0-9]{8}$/;
		var rulee=/^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z0-9]{2,7}((\.[a-z]{2})|(\.(com|net)))?)$/;
		
		if(location.href.indexOf("?")>= 0 &&location.href.indexOf("src=") >= 0){
			var i = location.href.indexOf("?"), j, str = location.href.substring(i), strArray = str.split("&");
			var ti = str.indexOf("src=");
			var src = str.substring(ti+4);
			$("#source").val(src);			
		}
		
		/*获取页面元素*/
		var login_action=$("#login_action"),login_username=$("#login_username"),login_password=$("#login_password"),remember=$("#remember"),login_unicon=$("#login_usernameicon"),login_pwicon=$("#login_passwordicon"),login_submit=$("#login_submit");
		var ltip=$("#login_passwordtip");
		/*记住账号*/
		$("#login_agreecb").click(function(){
			var curobj=$(this),curclass=curobj.attr("class");
			if(curclass==""){
				curobj.addClass("login_agreecbsel");
				remember.val("1");
			}else{
				curobj.removeClass("login_agreecbsel");
				remember.val("");
			}
		});

		//判断是否默认勾选“记住登录账号”
		var loginname = $("input[name='userName']").val();
		if(loginname!=""){
			
			$("#login_agreecb").click();
		}
		/*文本框初始化*/
		login_username.val()!=""?login_unicon.html("").css({"width":"28px"}):login_unicon.html("请输入手机号/邮箱").css({"width":"220px"});
		login_password.val()!=""?login_pwicon.html("").css({"width":"28px"}):login_pwicon.html("请输入密码").css({"width":"220px"});
		/*绑定文本框获取焦点事件*/
		$("#login_username,#login_password").live("focusin focusout",function(e){
            var curobj=$(e.target),curvalue=curobj.val(),curid=e.target.id;
			if(e.type=="focusin"){
				$("#"+curid+"icon").html("").css({"width":"28px"});
			}else if(e.type=="focusout"){
				if(curid=="login_username"&&remember.val()=="1"){
					//document.getElementById("login_password").value="";
				}
				if(curvalue!=""){
					$("#"+curid+"icon").html("").css({"width":"28px"});
					if(curvalue!=""&&curid=="login_username"){
						if(rulep.test(curvalue)){
						  iseorp=true;
						  ltip.text("");
						}else if(rulee.test(curvalue)){
						  iseorp=true;
						  ltip.text("");
						}else{
						  iseorp=false;
						  ltip.text("请输入正确的手机号码或邮箱地址");
						}
					} 
				}else if(curvalue==""){
					if(curid=="login_username"){
						$("#"+curid+"icon").html("请输入手机号/邮箱").css({"width":"220px"});
					}else if(curid=="login_password"){
						$("#"+curid+"icon").html("请输入密码").css({"width":"220px"});
					}
				}
			}
        });
		/*$("#login_username,#login_password").keyup(function(e){
			
			var name = $("#login_username").val(), paw = $("#login_password").val();
			if(name=="" || paw==""){
				addBtnDis(login_submit,"login_btndis");
			}else{
				delBtnDis(login_submit,"login_btndis","login_submit");
			}
		});*/
		$("#login_usernameicon,#login_passwordicon").live("click",function(e){
			var curobj=$(e.target),curid=e.target.id,curtextid=curid.slice(0,-4);
			curobj.html("").css({"width":"28px"});
			$("#"+curtextid).focus();
		});
		
		delBtnDis(login_submit,"login_btndis","login_submit");
		/*表单提交*/
		login_submit.live("click",function(){
				var lname=document.getElementById("login_username").value;
				var lpwd=document.getElementById("login_password").value;
				if(!iseorp&&iseorp!==""){
					ltip.text("请输入正确的手机号码或邮箱地址");
					return false;
				}
				if(lname==""){
					ltip.text("账号或密码错误");
					return false;
				}
				if(lpwd==""){
					ltip.text("账号或密码错误");
					return false;
				}
				if(!rulep.test(lname)&&iseorp!=""&&!iseorp){
					ltip.text("请输入正确的手机号码或邮箱地址");
					return false;
				}else if(!rulee.test(lname)&&iseorp!=""&&!iseorp){
					ltip.text("请输入正确的手机号码或邮箱地址");
					return false;
				}
				ltip.text("");
				var url =$('#login_action').attr('action');
				var params =$('#login_action').serialize();
				addBtnDis(login_submit,"login_btndis","login_submit");
				$.ajax({
					type:'post',
					url:url,
					data : params,
					dataType : 'json',
					success : function(data) {					
						if (data.success) {
							var source = $('#source').val();
							if(source){
								window.location.href="../../"+source;
							}else{
								window.location.href="../../fund/account/"
							}
							/*delBtnDis(login_submit,"login_btndis","login_submit");*/
						}else{	
							$("#login_passwordtip").html(data.msg);
							if($("#login_username").val()==""){
								$("#login_username").focus();
							}else if($("#login_passwordicon").val()==""){
								$("#login_passwordicon").focus();
							}else{
								$("#login_username").focus();
							}
							delBtnDis(login_submit,"login_btndis","login_submit");
						}
					},
					error: function(){
						delBtnDis(login_submit,"login_btndis","login_submit");
					}
				});
			return false;
		});
		
		/*login_action.validate({
			onkeyup:false,
			rules : {
				'userName' : {
					
				},
				'password' : {
				}
			},
			messages : {
				'userName' : {
				},
				'password' : {
				}
			},
			errorPlacement : function(error, element){
				$("#login_passwordtip").html(error.text());
			},
			success : function(){},
			invalidHandler : function() {
				return false;
			},
			submitHandler : function() {
				var lname=document.getElementById("login_username").value;
				lname=lname.replace(/(\s*)/g,"");
				var lpwd=document.getElementById("login_password").value;
				if(lname==""||lpwd==""){
					ltip.text("账号或密码错误");
					return false;
				}else if(!rulep.test(lname)||!rulee.test(lname)&&!iseorp){
					ltip.text("请输入正确的手机号码或邮箱地址");
					return false;
				}
				var url =$('#login_action').attr('action');
				var params =$('#login_action').serialize();
				addBtnDis(login_submit,"login_btndis","login_submit");
				$.ajax({
					type:'post',
					url:url,
					data : params,
					dataType : 'json',
					success : function(data) {					
						if (data.success) {
							var source = $('#source').val();
							if(source){
								window.location.href="../../"+source;
							}else{
								window.location.href="../../fund/account/"
							}
						}else{	
							$("#login_passwordtip").html(data.msg);
							if($("#login_username").val()==""){
								$("#login_username").focus();
							}else if($("#login_passwordicon").val()==""){
								$("#login_passwordicon").focus();
							}else{
								$("#login_username").focus();
							}
							delBtnDis(login_submit,"login_btndis","login_submit");
						}
					},
					error: function(){
						delBtnDis(login_submit,"login_btndis","login_submit");
					}
				});
				return false;
			}
		});*/
	});
})(jQuery);

/*添加禁用属性*/
function addBtnDis(bo,bc,dc){
	var o=bo,c=bc,d=dc;
	if(d==undefined||d===undefined||d=="undefined"||d==""){
		o.addClass(bc).attr({"disabled":"disabled"});
	}else{
		o.addClass(bc).attr({"disabled":"disabled"}).removeClass(d);
	}
}
/*删除禁用属性*/
function delBtnDis(bo,bc,dc){
	var o=bo,c=bc,d=dc;
	if(d==undefined||d===undefined||d=="undefined"||d==""){
		o.removeClass(bc).removeAttr("disabled");
	}else{
		o.removeClass(bc).addClass(d).removeAttr("disabled");
	}
}

