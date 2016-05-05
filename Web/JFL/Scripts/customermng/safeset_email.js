/**/
(function($){
	$(function(){
		/**/
		var mcount=60,mid=null,mcount1=60,mid1=null;
		/*-----页面节点获取-----*/
		/*step1*/
		var ss_emailpntar=$("#ss_emailpntar"),ss_emailgc=$("#ss_emailgc"),ss_emailtime=$("#ss_emailtime"),ss_validemail1=$("#ss_validemail1"),ss_emailpntartip=$("#ss_emailpntartip");
		/*step2*/
		var ss_validemail2=$("#ss_validemail2"),ss_emailge=$("#ss_emailge"),ss_emailtext21=$("#ss_emailtext21"),ss_emailtext21tip=$("#ss_emailtext21tip");
		var cregobj=c_Regular();
		/*-----初始化-----*/
		/*获取短信认证*/
		ss_emailgc.removeClass("ss_emailungc").removeAttr("disabled");
		ss_emailtime.html("");
		/*发送验证邮件*/
		ss_emailge.val("发送验证邮件").removeClass("ss_emailungc").removeAttr("disabled");
		/*获取验证码*/
		ss_emailgc.click(function(){
			var pn_tar=ss_emailpntar.text();
			pn_tar=pn_tar.replace(/(\s*)/g,"");
			if(pn_tar==""){
				ss_emailpntartip.html("手机号码不能为空");
				return false;
			}else if(!cregobj.Mobile.test(pn_tar)){
				ss_emailpntartip.html("手机号码格式不正确");
				return false;
			}else{
				/*倒计时操作*/
				ss_emailgc.addClass("ss_emailungc").attr({"disabled":"disabled"});
				ss_emailtime.html("(60秒后)&nbsp;重新获取");
				email_mobileTimes(ss_emailgc,ss_emailtime,60);
				/*发送并获取验证码*/
				ss_emailpntartip.html("正在获取验证码......");
				$.ajax({
					url:"/CustomerMng/SendSMS",
					type:"post",
					async:false,
					data:{handtels:pn_tar,actionType:"2"},
					dataType:"json",
					success: function(res){
						if(res.State){
							ss_emailpntartip.html(res.Message);
						}else{
							ss_emailpntartip.html("获取验证码失败");
						}
					},
					error:function(e){
						ss_emailpntartip.html("获取验证码失败");
					}
				});
				setTimeout(function(){
					ss_emailpntartip.html("");
				},3000);			
			}
		});
		/*手机验证码计时器*/
		function email_mobileTimes(o,tip,c){
			var c=parseInt(c),t=tip;
			t.html("("+c+"秒后)&nbsp;重新获取");
			if(c==-1||c<0){
				mcount=60;
				clearTimeout(mid);
				mid=null;
				t.html("")
				o.removeClass("ss_emailungc").removeAttr("disabled");
				return false;
			}
			c--;
			mid=setTimeout(function(){
				email_mobileTimes(o,t,c);
				mcount=c;
			},1000);
		}
		/*发送验证邮件*/
		ss_emailge.click(function(){
			var ss_et2=ss_emailtext21.val();
			ss_et2=ss_et2.replace(/(\s*)/g,"");
			if(ss_et2==""){
				ss_emailtext21tip.html("新邮箱不能为空");
				return false;
			}else if(!cregobj.Email.test(ss_et2)){
				ss_emailtext21tip.html("新邮箱格式不正确");
				return false;
			}else{
				/*倒计时操作*/
				ss_emailge.addClass("ss_emailungc").attr({"disabled":"disabled"});
				email_eTimes(ss_emailge,60);
				/*发送并获取验证码*/
				ss_emailtext21tip.html("正在发送邮件......");
				$.ajax({
					url:"/CustomerMng/SendSMS",
					type:"post",
					async:false,
					data:{handtels:ss_et2,actionType:"2"},
					dataType:"json",
					success: function(res){
						if(res.State){
							ss_emailtext21tip.html(res.Message);
						}else{
							ss_emailtext21tip.html("邮件发送失败");
						}
					},
					error:function(e){
						ss_emailtext21tip.html("邮件发送失败");
					}
				});
				setTimeout(function(){
					ss_emailtext21tip.html("");
				},3000);			
			}
		});
		/*发送邮件计时器*/
		function email_eTimes(o,c){
			var c=parseInt(c);
			o.val("("+c+"秒后)重新发送");
			if(c==-1||c<0){
				mcount1=60;
				clearTimeout(mid1);
				mid1=null;
				o.val("发送验证邮件").removeClass("ss_emailungc").removeAttr("disabled");
				return false;
			}
			c--;
			mid1=setTimeout(function(){
				email_eTimes(o,c);
				mcount1=c;
			},1000);
		}
		/*表单校验对象*/
		var email_vobj={
				ajaxPost:true,
				datatype:{
				},
				tiptype:function(msg,o){
					/*参数说明：
						  msg：提示信息;
							o:{obj:*,type:*,curform:*}, obj指向的是当前验证的表单元素（或表单对象），type指示提示的状态，值为1、2、3、4， 1：正在检测/提交数据，2：通过验证，3：验证失败，4：提示ignore状态, curform为当前form对象;
					   cssctl:内置的提示信息样式控制函数，该函数需传入两个参数：显示提示信息的对象 和 当前提示的状态（既形参o中的type）;*/ 
					var objid=o.obj[0].id,curid="#ss_email"+objid.slice(8)+"tip",curtype=o.type;
					if(curtype==1||curtype==3){
						$(curid).html(msg);
					}else if(curtype==2){
						$(curid).html("");
					}
				},
				beforeSubmit:function(curform){
					var curid=curform[0].id;
					if(curid.indexOf("email1")!=-1){
						/*
							to do
							修改邮箱第一步提交
						*/
					}else if(curid.indexOf("email2")!=-1){
						/*
							to do
							修改邮箱密码第二步提交
						*/
					}
					return false;
				}
		}

		
		

		/*表单校验*/
		/*修改密码1*/
		var ss_evobj1=ss_validemail1.Validform(email_vobj);
		ss_evobj1.addRule(vmsg_objs().ss_email1msg);
		/*修改密码2*/
		var ss_evobj2=ss_validemail2.Validform(email_vobj);
		ss_evobj2.addRule(vmsg_objs().ss_email2msg);
	});
})(jQuery);






