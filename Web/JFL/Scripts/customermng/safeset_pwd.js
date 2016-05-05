/**/
(function($){
	$(function(){
		/**/
		var mcount=60,mid=null;
		/*-----页面节点获取-----*/
		/*step1*/
		var ss_pwdpntar=$("#ss_pwdpntar"),ss_pwdgc=$("#ss_pwdgc"),ss_pwdtime=$("#ss_pwdtime"),ss_validpwd1=$("#ss_validpwd1"),ss_pwdpntartip=$("#ss_pwdpntartip");
		/*step2*/
		var ss_validpwd2=$("#ss_validpwd2")
		var cregobj=c_Regular();
		/*-----初始化-----*/
		/*获取短信认证*/
		ss_pwdgc.removeClass("ss_pwdungc").removeAttr("disabled");
		ss_pwdtime.html("");
		/*获取验证码*/
		ss_pwdgc.click(function(){
			var cur=$(this),pn_tar=ss_pwdpntar.text();
			pn_tar=pn_tar.replace(/(\s*)/g,"");
			if(pn_tar==""){
				ss_pwdpntartip.html("手机号码不能为空");
				return false;
			}else if(!cregobj.Mobile.test(pn_tar)){
				ss_pwdpntartip.html("手机号码格式不正确");
				return false;
			}else{
				/*倒计时操作*/
				ss_pwdgc.addClass("ss_pwdungc").attr({"disabled":"disabled"});
				ss_pwdtime.html("(60秒后)&nbsp;重新获取");
				pwd_mobileTimes(ss_pwdgc,ss_pwdtime,60);
				/*发送并获取验证码*/
				ss_pwdpntartip.html("正在获取验证码......");
				$.ajax({
					url:"/CustomerMng/SendSMS",
					type:"post",
					async:false,
					data:{handtels:pn_tar,actionType:"2"},
					dataType:"json",
					success: function(res){
						if(res.State){
							ss_pwdpntartip.html(res.Message);
						}else{
							ss_pwdpntartip.html("获取验证码失败");
						}
					},
					error:function(e){
						ss_pwdpntartip.html("获取验证码失败");
					}
				});
				setTimeout(function(){
					ss_pwdpntartip.html("");
				},3000);			
			}
		});
		/*手机验证码计时器*/
		function pwd_mobileTimes(o,tip,c){
			var c=parseInt(c),t=tip;
			t.html("("+c+"秒后)&nbsp;重新获取");
			if(c==-1||c<0){
				mcount=60;
				clearTimeout(mid);
				mid=null;
				t.html("")
				o.removeClass("ss_pwdungc").removeAttr("disabled");
				return false;
			}
			c--;
			mid=setTimeout(function(){
				pwd_mobileTimes(o,t,c);
				mcount=c;
			},1000);
		}
		/*表单校验对象*/
		var pwd_vobj={
				ajaxPost:true,
				datatype:{
				},
				tiptype:function(msg,o){
					/*参数说明：
						  msg：提示信息;
							o:{obj:*,type:*,curform:*}, obj指向的是当前验证的表单元素（或表单对象），type指示提示的状态，值为1、2、3、4， 1：正在检测/提交数据，2：通过验证，3：验证失败，4：提示ignore状态, curform为当前form对象;
					   cssctl:内置的提示信息样式控制函数，该函数需传入两个参数：显示提示信息的对象 和 当前提示的状态（既形参o中的type）;*/ 
					var objid=o.obj[0].id,curid="#ss_pwd"+objid.slice(6)+"tip",curtype=o.type,curact=o.curform[0].id;
					if(curtype==1||curtype==3){
						$(curid).html(msg);
					}else if(curtype==2){
						$(curid).html("");
					}
				},
				beforeSubmit:function(curform){
					var curid=curform[0].id;
					if(curid.indexOf("pwd1")!=-1){
						/*
							to do
							修改密码第一步提交
						*/
					}else if(curid.indexOf("pwd1")!=-1){
						/*
							to do
							修改密码第二步提交
						*/
					}
					return false;
				}
		}

		
		

		/*表单校验*/
		/*修改密码1*/
		var ss_pwdvalidobj1=ss_validpwd1.Validform(pwd_vobj);
		ss_pwdvalidobj1.addRule(vmsg_objs().ss_pwd1msg);
		/*修改密码2*/
		var ss_pwdvalidobj2=ss_validpwd2.Validform(pwd_vobj);
		ss_pwdvalidobj2.addRule(vmsg_objs().ss_pwd2msg);
	});
})(jQuery);






