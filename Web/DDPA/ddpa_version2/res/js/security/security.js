/**
* 安全中心
* author : liyuzhong
*/
$(document).ready(function(e) {
	
	//页面初始化
	init();
	
    $("body").click(function(e){
		var $target = $(e.target), $this = $(this), actiontype = $target.attr("actiontype");
		
		switch(actiontype){
			case "toggle_form":
				var ln_form = $target.data("lnform");
				toggle_form($target, ln_form);
				break;
			case "closetip":
				closetip();
				break;
			case "cancle":
				cancle($target);
				break;
			case "getAuthCode":
				getAuthCode($target);
				break;
			case "getPWAuthCode":
				getPWAuthCode($target);
				break;
			case "checkAC":
				checkAC($target);
				break;
			case "checkACByemail":
				checkACByEmail($target);
				break;
			case "getACByOP":
				getAcbyOP($target);
				break;
			case "getAuthCodeByEmail":
				getAuthCodeByEmail($target);
				break;
			case "checkACByPassword":
				checkACByPassword($target);
				break;
			case "checkACWE":
				checkACWE($target);
				break;
			default:
				
			}
		});
	
	//页面初始化处理//////////////////////////////////////////////
	function init(){
		
		if(location.hash=="#real"){
			$(".sec_rn .authform").addClass("show");
			$(".sec_rn .form").addClass("show");
		}else if(location.hash=="#email"){
			
			$(".sec_email .authform").addClass("show");
			$("form[name='authemail']").addClass("show");
		}else if(location.hash=="#phone"){
			$(".sec_phone .authform").addClass("show");
			$("form[name='phoneauth']").addClass("show");
		}else if(location.hash=="#trade"){
			$(".sec_tradepaw .authform").addClass("show");
			$("form[name='settradepaw']").addClass("show");
		}
		//点击提交按钮时设置当前表单标识
		$("button[type='submit']").click(function(){
			$(this).parents("form").addClass("cursubmitform");
			});
		
		$("#userpaw").AuthPasswd({look:"#upawlook"});
		$("#tradepaw").AuthPasswd({look:"#tpawlook"});
		$("#newtradepaw").AuthPasswd({look:"#etpawlook"});
		
		//检测不足处理
		initBind()
		//绑定验证码输入处理
		$(".authcode").keyup(function(){
			var p = $(this).parents("form");
			var btn = p.find("button.checkAC");
			btn.attr("authcode",$(this).val());
		});
		
		$("body").keypress(function(){
            if(event.keyCode==13){
                return false;
            }  
		})
		//检测是否已经完成所有安全设置
		setAllSec();
	}
	
	//检测不足处理
	function initBind(){
		//身份证号检测
		$("input[name='idNumber']").blur(function(e){
			var gets = $(e.target).val();
			if(gets.replace(/(\s*)/g,"").length < 15){
				return false;
			}
			//var reg = /^[1-9]\d{5}\s?[1-9]\d{3}\s?((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\s?((\d{4})|(\d{3}[x|X]))$/;
			if(!getIDCard(gets)){
				$(e.target).siblings(".Validform_checktip").text("身份证号码错误，请重新输入");
				return false;
			}
		});
	}
	
	//检测是否已经完成所有安全设置
	function setAllSec(){
		
		$.ajax({
			url:"",
			type:"get",
			success:function(data){
				if(data.flag != "true"){
					$(".mainbox .tip").show();
				}
			}
		})
	}
	
	//验证码校验
	$(".authcode").blur(function(e){
		if($(this).val()==""){
			$(this).addClass("Validform_error");
			$(this).siblings(".Validform_checktip").addClass("Validform_wrong").text("验证码不能为空")
		}else{
			$(this).removeClass("Validform_error");
			$(this).siblings(".Validform_checktip").removeClass("Validform_wrong").text("");
			var f = $(this).parents("form"), btn = f.find("button.checkAC");
			btn.attr("authcode",$(this).val());
		}
	})
	
	//格式化手机号码
	$("input[name='mobilePhone']").live("keypress",turnPhoneNo);
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
	//格式化身份证号
	$("input[name='idNumber']").live("keypress",turnIDNo);
	//身份证号码输入检测
	function turnIDNo(event){
		if(event.keyCode==8 || event.keyCode==37 || event.keyCode==39){
			return;
		}
		
		var $this = $(event.target), no = $this.val();
		tno = no.replace(/(\s*)/g,"");
		var l = tno.length;
		if(l==6 || l==10 || l==14){
			no = no + " ";
			$this.val(no);
		}
	}
	
	//修改验证手机之前验证客户端发送的验证码
	function checkAC(obj){
		var code = obj.attr("authcode");
		var f = obj.parents("form"), accepting = obj.attr("accepting");
		
		var errors = f.find("input.Validform_error");
		if(errors.size() !=0){
			return false;
		}
		
		var url = f.attr("action");
		var reMobilePhone = f.find("input[name='mobilePhone']").val();
		if(!code){
			f.find("input[name='validcode']").addClass("Validform_error");
			f.find(".Validform_checktip").addClass("Validform_wrong").text("验证码不能为空");
			return false;
		}else{
			f.find("input[name='validcode']").removeClass("Validform_error");
			f.find(".Validform_checktip").removeClass("Validform_wrong").text("")
		}
		
		//验证发送的验证码
		$.ajax({
			url:url,
			type:"POST",
			data:{"validcode":code,"mobilePhone":reMobilePhone},
			success:function(data){
				p = obj.parents("form");
				p.find(".ajaxtip").hide();
				if(data.status=="y"){
					var next = obj.attr("next");
					if(next){
						p.removeClass("show").siblings("form[name='" + next + "']").addClass("show");
					}else{
						p.after("<div class='result ok'><p><span class='ok'></span><span class='txt'>" + data.info + "<span id='timer'>3</span>秒后自动刷新...</span></p></div>");
						var timer = setInterval(function(){ 
							var t = $("#timer");
							if((parseInt($("#timer").text())-1)<0){
								clearInterval(timer);
								location.hash = ""; window.location.reload();
							};
							t.text(parseInt($("#timer").text())-1);
						},1000);
						p.removeClass("show").slideUp();
					}
				}else{
					f.find(".submitbtn").removeClass("disabled").text("提交").removeAttr("disabled");
					p.find(".ajaxtip").css("color","red").text(data.info);
					p.find(".ajaxtip").show();
				}
			}
		})
	}
	
	function checkACWE(obj){
		var code = obj.attr("authcode");
		var f = obj.parents("form");
		if(!code){
			return false;
		}
		var errors = f.find("input.Validform_error");
		if(errors.size() !=0){
			return false;
		}
		
		var url = f.attr("action");
		var reMobilePhone = f.find("#reEmail").val();
		if(!code){
			return false;
		}
		
		//验证发送的验证码
		$.ajax({
			url:url,
			type:"POST",
			data:{"validcode":code,"email":reMobilePhone},
			success:function(data){
				p = obj.parents("form");
				if(data.status=="y"){
					p.find(".ajaxtip").hide();
					var next = obj.attr("next");
					p.removeClass("show").siblings("form[name='" + next + "']").addClass("show");
				}else{
					p.find(".ajaxtip").css("color","red").text(data.info);
					f.find(".ajaxtip").show();
				}
				
			}
		})
	}
	
	function getAcbyOP(obj){
		
		var m = obj.parents("form").find("#reMobilePhone").val()
		var param={};
	       param["mobilePhone"]=m;
	       param["typeSms"]=3;
	       $.post("../../sys/sms/sendUserSms",param,function(data){
               obj.siblings("#after_getac,.authtip").replaceWith("");
	    	   if(data.success){
	               obj.hide();
		   			obj.after("<span id='after_getac'><span id='ac_timer1' class='timer'>60</span>秒后重新获取</span><span id='t30' class='authtip'>验证码已发送至您的手机,请注意查收</span>");
		   			var c = parseInt($("#ac_timer1").text()) * 1000;
		   			var f = obj.parents("form"), button = f.find("button.checkAC");
		   			button.attr("accepting",true);
		   			var ac_timer1 = setInterval(function(){ 
		   				var t = $("#ac_timer1");
		   				if((parseInt(t.text()-1))<0 || (parseInt(t.text()-1))>60){
		   					clearInterval(ac_timer1); obj.siblings("#after_getac").replaceWith("");obj.show();
		   					button.removeAttr("accepting");
		   				}
		   				t.text(parseInt(t.text()-1));},1000);
		   			}else if(!data.success){
		   				obj.after("<span id='t30' class='authtip'>"+data.msg+"</span>");
		   			}
	    	   setTimeout(function(){ obj.siblings(".authtip").replaceWith(""); obj.siblings(".Validform_checktip").show(); }, 3000)
	       });
	}
	
	//修改验证手机之前验证客户端发送的验证码
	function checkACByEmail(obj){
		
		var code = obj.attr("authcode");
		var f = obj.parents("form"),accepting = obj.attr("accepting");
		
		if(!code){
			f.find("input[name='validcode']").addClass("Validform_error");
			f.find("input[name='validcode']").siblings(".Validform_checktip").addClass("Validform_wrong").text("验证码不能为空")
			return false;
		}else{
			f.find("input[name='validcode']").removeClass("Validform_error");
			f.find("input[name='validcode']").siblings(".Validform_checktip").removeClass("Validform_wrong").text("")
		}
		var errors = f.find("input.Validform_error");
		if(errors.size() !=0){
			return false;
		}
		
		var url = f.attr("action");
		var email = f.find("#approveEmail").val();
			
		//验证发送的验证码
		$.ajax({
			url:"updatePpproveMobilePhoneForEmail",
			type:"POST",
			data:{"validcode":code,"email":email},
			success:function(data){

				p = obj.parents("form");
				if(data.status=="y"){
					p.find(".ajaxtip").hide();
					var next = obj.attr("next");
					p.removeClass("show").siblings("form[name='" + next + "']").addClass("show");
				}else{
					p.find(".ajaxtip").css("color","red").text(data.info);
					f.find(".ajaxtip").show();
				}
			}
		})
	}
	
	
	//修改验证手机之前验证客户端发送的验证码
	function checkACByPassword(obj){

		var code = obj.attr("authcode");
		var f = obj.parents("form"),accepting = obj.attr("accepting");
		
		if(!code){
			f.find("input[name='validcode']").addClass("Validform_error");
			f.find("input[name='validcode']").siblings(".Validform_checktip").addClass("Validform_wrong").text("验证码不能为空")
			return false;
		}else{
			f.find("input[name='validcode']").removeClass("Validform_error");
			f.find("input[name='validcode']").siblings(".Validform_checktip").removeClass("Validform_wrong").text("")
		}
		var errors = f.find("input.Validform_error");
		if(errors.size() !=0){
			return false;
		}

		var url = f.attr("action");
		var mobilePhone = f.find("#phoneno").val();
				
		//验证发送的验证码
		$.ajax({
			url:"updatepproveMobilePhoneForPwd",
			type:"POST",
			data:{"validcode":code,"mobilePhone":mobilePhone},
			success:function(data){
				p = obj.parents("form");
				if(data.status=="y"){
					p.find(".ajaxtip").hide();
					var next = obj.attr("next");
					p.removeClass("show").siblings("form[name='" + next + "']").addClass("show");
					}else{
						p.find(".ajaxtip").css("color","red").text(data.info);
						f.find(".ajaxtip").show();
					}
				}
			})
		
		
		}
	
	//获取验证码
	function getAuthCode(obj){
			var pinput = obj.parents("form").find("#phoneno"); 
			if(obj.parents("form").find("#phoneno").val()==""){
				var ptip = pinput.siblings(".Validform_checktip");
				ptip.addClass("Validform_wrong");
				pinput.addClass("Validform_error");
				ptip.text("请输入手机号");
				return false;
			}
			if(pinput.hasClass("Validform_error")){
				pinput.siblings(".Validform_wrong").fadeIn(300);
				pinput.focus();
				return false;
			}
		   var param={};
	       param["mobilePhone"]=obj.parents("form").find("#phoneno").val();
	       param["typeSms"]=3;
	       $.post("../../sys/sms/sendUserSms",param,function(data){

	    	   obj.siblings("#after_getac,.authtip").replaceWith("");
	            if(data.success){
	               obj.hide();
		   			obj.after("<span id='after_getac'><span id='ac_timer2' class='timer'>60</span>秒后重新获取</span><span id='t30' class='authtip'>验证码已发送至您的手机,请注意查收</span>");
		   			var c = parseInt($("#ac_timer2").text()) * 1000;
		   			var f = obj.parents("form"), button = f.find("button.checkAC");
		   			button.attr("accepting",true);
		   			var ac_timer2 = setInterval(function(){ 
		   				var t = $("#ac_timer2"); 
		   				if((parseInt(t.text()-1))<0 || (parseInt(t.text()-1))>60){
		   					clearInterval(ac_timer2); obj.siblings("#after_getac").replaceWith(""); obj.show();
		   					button.removeAttr("accepting");
		   				}
		   				t.text(parseInt(t.text()-1));},1000);
		   				
		   		}else if(!data.success){
		   			obj.after("<span id='t30' class='authtip'>"+data.msg+"</span>");
		   		}
	            setTimeout(function(){ obj.siblings(".authtip").replaceWith(""); obj.siblings(".Validform_checktip").show(); }, 3000)
	       });
		}
	
	//获取验证码
	function getPWAuthCode(obj){
			var pinput = obj.parents("form").find("#phoneno"); 
			if(obj.parents("form").find("#phoneno").val()==""){
				var ptip = pinput.siblings(".Validform_checktip");
				ptip.addClass("Validform_wrong");
				pinput.addClass("Validform_error");
				ptip.text("请输入手机号");
				return false;
			}
			if(pinput.hasClass("Validform_error")){
				pinput.siblings(".Validform_wrong").fadeIn(300);
				pinput.focus();
				return false;
			}
		   var param={};
	       param["mobilePhone"]=obj.parents("form").find("#phoneno").val();
	       param["typeSms"]=2;
	       $.post("../../sys/sms/sendUserSms",param,function(data){

	    	   obj.siblings("#after_getac,.authtip").replaceWith("");
	            if(data.success){
	               obj.hide();
		   			obj.after("<span id='after_getac'><span id='ac_timer2' class='timer'>60</span>秒后重新获取</span><span id='t30' class='authtip'>验证码已发送至您的手机,请注意查收</span>");
		   			var c = parseInt($("#ac_timer2").text()) * 1000;
		   			var f = obj.parents("form"), button = f.find("button.checkAC");
		   			button.attr("accepting",true);
		   			var ac_timer2 = setInterval(function(){ 
		   				var t = $("#ac_timer2"); 
		   				if((parseInt(t.text()-1))<0 || (parseInt(t.text()-1))>60){
		   					clearInterval(ac_timer2); obj.siblings("#after_getac").replaceWith(""); obj.show();
		   					button.removeAttr("accepting");
		   				}
		   				t.text(parseInt(t.text()-1));},1000);
		   				
		   		}else if(!data.success){
		   			obj.after("<span id='t30' class='authtip'>"+data.msg+"</span>");
		   		}
	            setTimeout(function(){ obj.siblings(".authtip").replaceWith(""); obj.siblings(".Validform_checktip").show(); }, 3000)
	       });
		}
	
	
	//获取验证码
	function getAuthCodeByEmail(obj){
		
		var param={};
	       param["email"]=$("#approveEmail").val();
	       $.post("../../account/user/sendEmailValidcode",param,function(data){
	    	   obj.siblings("#after_getac,.authtip").replaceWith("");
	            if(data.success){
	               //alert("邮件发送成功:"+data.content);
	               obj.hide();
	               	obj.siblings(".Validform_checktip").hide();
		   			obj.after("<span id='after_getac'><span id='ac_timer3' class='timer'>60</span>秒后可重新发送</span><span id='t30' class='authtip'>已发送至原邮箱,请查收</span>");
		   			var c = parseInt($("#ac_timer3").text()) * 1000;
		   			var f = obj.parents("form"), button = f.find("button.checkAC");
		   			button.attr("accepting",true);
		   			var ac_timer3 = setInterval(function(){ 
		   				var t = $("#ac_timer3");
		   				if((parseInt(t.text()-1))<0 || (parseInt(t.text()-1))>60){
		   					clearInterval(ac_timer3);
		   					obj.siblings("#after_getac").replaceWith(""); obj.show();
		   					button.removeAttr("accepting");
						} 
		   				t.text(parseInt(t.text()-1));
		   				},1000);
		   			
	            }else if(!data.success){
		   			obj.after("<span id='t30' class='authtip'>"+data.msg+"</span>");
		   		}
	            setTimeout(function(){ obj.siblings(".authtip").replaceWith(""); obj.siblings(".Validform_checktip").show(); }, 3000)
	       });
		}
	
	/*toggle form关闭或打开表单*/
	function toggle_form(t,lnform){
		
		var isarch = t.hasClass("arch");
		
		if(lnform == "editbyphone"){
			if($("form[name='editbyemail']").find("#after_getac").size()!=0){
				clearInterval(ac_timer3);
				$("form[name='editbyemail']").find("#after_getac").replaceWith("");
			}else if($("form[name='changephone']").find("#after_getac").size() != 0){
				clearInterval(ac_timer2);
				$("form[name='changephone']").find("#after_getac").replaceWith("");
			}
		}else if(lnform == "editbyemail"){
			if($("form[name='editbyphone']").find("#after_getac").size()!=0){
				clearInterval(ac_timer1);
				$("form[name='editbyphone']").find("#after_getac").replaceWith("");
			}
		}
		var sec_item = t.parents(".sec_item"),curfName, curf = $("form[name='" + lnform + "']");
		var preForm = "";
		if(sec_item.find("form.show").size()!=0){
			preForm = sec_item.find("form.show").attr("name");
		}
		
		curf.find(".pawlook").removeClass("weak mid strength");
		curf.find(".txttip").text("");
		sec_item.find(".result").replaceWith("");
		forms.resetForm();
		sec_item.find(".Validform_checktip").text("");
		sec_item.find(".ajaxtip").text("");
		
		if(isarch && preForm!="" && preForm != lnform){
			sec_item.find(".authform").removeClass("show");
			sec_item.find("form").removeClass("show")
			var timer = curf.find(".timer").attr("id");
			var obj = curf.find(".getauthcode");
			delTimer(timer,obj);
			return true;
		}
		
		curf.toggleClass("show");
		if(curf.hasClass("show")){
			curf.siblings("form").removeClass("show");
		}
		
		if(sec_item.find("form.show").size() != 0){
			sec_item.find(".authform").addClass("show");
		}else{
			sec_item.find(".authform").removeClass("show");
			sec_item.find("form").removeClass("show")
			var timer = curf.find(".timer").attr("id");
			var obj = curf.find(".getauthcode");
			delTimer(timer,obj);
		}
	}
	
	//关闭头部提示信息
	function closetip(){
		$(".mainbox .tip").fadeOut();
	}
	
	//关闭表单
	function cancle(t){
		var f = $(t).parents(".authform")
		f.find(".pawlook").removeClass("weak mid strength");
		f.find(".txttip").text("");
		var timer = f.find(".timer").attr("id");
		var obj = f.find(".getauthcode");
		if(timer){
			delTimer(timer,obj);
		}
		f.removeClass("show");
		f.find("form").removeClass("show");
	}
	
	//清除定时器
	function delTimer(timer,obj){
		switch(timer){
		case "ac_timer1":
			clearInterval(ac_timer1); obj.siblings("#after_getac").replaceWith("");obj.show();
			break;
		case "ac_timer2":
			clearInterval(ac_timer2); obj.siblings("#after_getac").replaceWith(""); obj.show();
			break;
		case "ac_timer3":
			clearInterval(ac_timer3);
			obj.siblings("#after_getac").replaceWith(""); obj.show();
			break;
		case "timer":
			clearInterval(timer);
			break;
		}
	}
	
	//绑定表单验证
	var forms = $(".form").Validform({
		ajaxPost:true,
		datatype:{
			"c_z": /^[\u4E00-\u9FA5]{2,20}$/,
			"idNo":function(gets,obj,curform,regxp){
				gets = gets.replace(/(\s*)/g,"");
				if(gets==""){return false;}
				//var reg = /^[1-9]\d{5}\s?[1-9]\d{3}\s?((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\s?((\d{4})|(\d{3}[x|X]))$/;
				return getIDCard(gets);
			},
			"*6-20":/^[^\s]{6,20}$/,
			"m_f":function(gets,obj,curform,regxp){
				gets = gets.replace(/(\s*)/g,"");
				var reg = /^(13[0-9]|15[012356789]|18[0-9]|14[57]|170)\s?[0-9]{4}\s?[0-9]{4}$/;
				if(!reg.test(gets)){
					return false;
				}
			},
			"ischi_Email":/^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z0-9]{2,7}((\.[a-z]{2})|(\.(com|net)))?)$/
		},
		beforeSubmit:function(curform){
			var errors = curform.find("input.Validform_error");
			if(errors.size() !=0){
				return false;
			}
			if(curform.attr("name")=="identificationIdNumber"){
				curform.find(".submitbtn").addClass("disabled").text("3分钟后再点击").attr("disabled","true");
				setTimeout(function(){curform.find(".submitbtn").removeClass("disabled").text("提交").removeAttr("disabled");},180000);
			}else{
				curform.find(".submitbtn").addClass("disabled").text("60秒后再点击").attr("disabled","true");
				setTimeout(function(){curform.find(".submitbtn").removeClass("disabled").text("提交").removeAttr("disabled");},60000);
			}
			submitForm(curform);
			return false;
		},
		tiptype:function(msg,o,cssctl){
			o.curform.siblings(".result").replaceWith("");
			if(!o.obj.is("form")){
				var objtip=o.obj.siblings(".Validform_checktip");
				cssctl(objtip,o.type);
				objtip.text(msg);
			}else{
				cssctl(objtip,o.type);
				if(o.type==2){
					o.curform.find(".ajaxtip").text("");
					if(msg.indexOf("@")<0){ //如果不是邮箱
						o.curform.after("<div class='result ok'><p><span class='ok'></span><span class='txt'>" + msg + "<span id='timer' class='timer'>3</span>秒后自动刷新...</span></p></div>");
						var timer = setInterval(function(){
							var t = $("#timer"); 
							if((parseInt($("#timer").text())-1)<0 || (parseInt($("#timer").text())-1)>60){
								clearInterval(timer); location.hash = ""; window.location.reload();
							} 
							t.text(parseInt($("#timer").text())-1);
							},1000);
					}else{
						o.curform.after("<div class='result ok'><p><span class='ok'></span><span class='txt'>" + msg + "</span></p>");
					}
					o.curform.removeClass("show").slideUp();
				}
			}
		}
	});
	
	function submitForm(f){
		//f.find(".submitbtn").addClass("disabled").text("60秒后再点击").attr("disabled","true");
		//setTimeout(function(){f.find(".submitbtn").removeClass("disabled").text("提交").removeAttr("disabled");},60000);
		var isAc = f.hasClass("acform");
		if(isAc){ return false;}
		
		var data = f.serialize(), action = f.attr("action");
		$.ajax({
			url:action,
			data:data,
			type:"post",
			success:function(data){
				
				if(data.status=="y"){
					
					if(f.attr("name")=="edittradepaw"){
						f.find(".submitbtn").removeClass("disabled").text("提交").removeAttr("disabled");
					}
					
					f.find(".ajaxtip").hide();
					if(data.info.indexOf("@")<0){ //如果不是邮箱
						f.after("<div class='result ok'><p><span class='ok'></span><span class='txt'>" + data.info + "<span id='timer'>3</span>秒后自动刷新...</span></p>");
						var timer = setInterval(function(){
							if((parseInt($("#timer").text())-1)<0 || (parseInt($("#timer").text())-1)>60){
								clearInterval(timer); location.hash = ""; location.href = location.href.replace("#",""); window.location.load(location.href.replace("#",""));
							}
							var t = $("#timer");t.text(parseInt($("#timer").text())-1);
						},1000);
					}else{
						location.hash = "";
						f.after("<div class='result ok'><p><span class='ok'></span><span class='txt'>" + data.info + "</span></p>");
					}
					f.removeClass("show").slideUp();
				}else{
					if(f.attr("name")!="identificationIdNumber"){
						f.find(".submitbtn").removeClass("disabled").text("提交").removeAttr("disabled");
					}
					f.find(".ajaxtip").text(data.info).css("color","red");
					f.find(".ajaxtip").show();
				}
			}
		});
	}
	
});