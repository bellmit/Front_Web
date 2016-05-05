(function($){
	$(function(){
		/*选项切换*/
        var BtnPhone = $("#ben_Phone"),BtnMail = $("#btn_Mail"),RegPhone = $("#reg_Phone"),RegMail = $("#reg_Mail");
		var get_tm_vc=$("#get_tm_vc");
        BtnPhone.click(function (e) {
			e.preventDefault();
            $(this).find("a").addClass("zc_hover").parent().siblings().find("a").removeClass("zc_hover");
            RegPhone.show();
            RegMail.hide();
			clearRegForm("reg_validemail");
        });
        BtnMail.click(function (e) {
			e.preventDefault();
            $(this).find("a").addClass("zc_hover").parent().siblings().find("a").removeClass("zc_hover");
            RegPhone.hide();
            RegMail.show();
			clearRegForm("reg_validmobile");
        });
		/*重置表单*/
		function clearRegForm(fid){
			var dobj=document.getElementById(fid),jobj=$(dobj);
			dobj.reset();
			jobj.find("input").each(function(){
				var cid="#reg_"+$(this).attr("id");
				$(cid).html("");
			});	
		}
		/*初始化*/
		clearRegForm("reg_validemail");
		clearRegForm("reg_validmobile");
		get_tm_vc.val("获取验证码").removeClass("reg_getmcode").removeAttr("disabled");
		/*-----表单校验-----*/
		var reg_vobjs={
				ajaxPost:true,
				datatype:{
					"reg_havamobile":function(gets,obj){
						/*参数gets是获取到的表单元素值，obj为当前表单元素*/
						/*认证手机是否已被注册*/
						return isExistMobile(gets,"/Register/ValidationMobilePhone");
					},
					"reg_haveemail":function(gets,obj){
						/*认证邮箱是否已被注册*/
						return isExistEmail(gets,"/Register/ValidationEmail");
					}
				},
				tiptype:function(msg,o){
					/*参数说明：
						  msg：提示信息;
							o:{obj:*,type:*,curform:*}, obj指向的是当前验证的表单元素（或表单对象），type指示提示的状态，值为1、2、3、4， 1：正在检测/提交数据，2：通过验证，3：验证失败，4：提示ignore状态, curform为当前form对象;
					   cssctl:内置的提示信息样式控制函数，该函数需传入两个参数：显示提示信息的对象 和 当前提示的状态（既形参o中的type）; */
					var objid=o.obj[0].id,curid="#reg_"+objid,curtype=o.type;
					if(curtype==1||curtype==3){
						$(curid).html(msg);
					}else if(curtype==2){
						$(curid).html("");
					}
				},
				beforeSubmit:function(curform){
					var passPort="",password="",registerType="",platformType="1",code="";
					if(curform[0].id.indexOf("email")!=-1){
						passPort =document.getElementById("te_email").value;
						password =document.getElementById("te_pw").value;
						registerType = "1";
						code =document.getElementById("te_vc").value;
					}else if(curform[0].id.indexOf("mobile")!=-1){
						passPort =document.getElementById("tm_mobile").value;
						password =document.getElementById("tm_pw").value;
						registerType = "2";
						code =document.getElementById("tm_vc").value;
					}
					var data = {passPort: passPort,password: password,registerType: registerType, platformType: platformType, code: code };
					var url = "/Register/AddCustomer";
					$.ajax({
						url: url,
						data: data,
						type: "POST",
						dataType: "json",
						success: function (data) {
							if (!data.State) {
								alert(data.Msg);
							}
							else {
								location.href = "/CustomerMng/Index";
							}
						},
						error: function (e) {
							alert("系统错误，请稍后再试!");
						}
					});
					return false;
				}
		}
		/*--手机表单--*/
		/*获取手机验证码*/
		var istruephone=false,mcount=60,mid=null;
		get_tm_vc.live("click",function(){
			var cur=$(this);
			var ptxt=document.getElementById("tm_mobile").value,ptest=/^(13[0-9]|15[012356789]|18[012356789]|14[57])[0-9]{8}$/;
			var ptip=document.getElementById("reg_tm_mobile");
			ptxt=ptxt.replace(/(\s*)/g,"");
			if(ptxt==""){
				ptip.innerHTML="手机号不能为空";
				return false;
			}
			if(!ptest.test(ptxt)){
				ptip.innerHTML="手机号格式不正确";
				return false;
			}
			$.ajax({
				url:"/Register/ValidationMobilePhone",
				async:false,
				type:"post",
				data:{mobilePhone:ptxt},
				dataType:"json",
				success: function(res){
					if(res.State){
						istruephone=true;
					}else{
						istruephone=false;
						ptip.innerHTML="此手机号已注册,请检查手机号码是否正确";
					}
				},
				error:function(e){
					istruephone=false;
				}
			});
			if(!istruephone){
				return false;
			}else{
				var ptips=document.getElementById("reg_tm_vc");
				/*倒计时操作*/
				cur.val("60秒后重新获取").addClass("reg_getmcode").attr({"disabled":"disabled"});
				reg_mobileTimes(cur,60);
				/*
				to do
				发送并获取验证码
				*/
				$.ajax({
					url:"/CustomerMng/SendSMS",
					type:"post",
					data:{handtels:ptxt,actionType:"1"},
					dataType:"json",
					success: function(res){
						if(res.State){
							ptips.innerHTML=res.Message;
							setTimeout(function(){
								ptips.innerHTML="";
							},3000);
						}else{
							ptips.innerHTML="获取验证码失败";
						}
					},
					error:function(e){
						ptips.innerHTML="获取验证码失败";
					}
				});
			}
		});
		/*手机验证码计时器*/
		function reg_mobileTimes(o,c){
			var c=parseInt(c);
			o.val(c+"秒后重新获取");
			if(c==-1||c<0){
				mcount=60;
				clearTimeout(mid);
				mid=null;
				o.val("获取验证码").removeClass("reg_getmcode").removeAttr("disabled");
				return false;
			}
			c--;
			mid=setTimeout(function(){
				reg_mobileTimes(o,c);
				mcount=c;
			},1000);
		}
		/*手机校验*/
		var reg_validmobj=$("#reg_validmobile").Validform(reg_vobjs);
		reg_validmobj.addRule(vmsg_objs().regmobile_msg);
		/*--邮箱表单--*/
		/*切换图片验证码*/
		$("#get_te_vc").click(function (e) {
			$(this).attr({"src":"/Register/GetValidateCode?time=" + (new Date()).getTime()});
        });
		var reg_valideobj=$("#reg_validemail").Validform(reg_vobjs);
		reg_valideobj.addRule(vmsg_objs().regemail_msg);
		

	});
})(jQuery);