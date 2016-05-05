/**/
(function($){
	$(function(){
		/**/
		var mcount1=60,mid1=null;
		/*-----页面节点获取-----*/
		/*step1*/
		var ss_validphone1=$("#ss_validphone1");
		/*step2*/
		var ss_validphone2=$("#ss_validphone2"),ss_phonegc=$("#ss_phonegc"),ss_phoneno=$("#ss_phoneno"),ss_pnotip=$("#ss_pnotip");
		var cregobj=c_Regular();
		/*-----初始化-----*/
		/*手机号码格式化*/
		/*if(ss_emailpnsou.length!=0){
			(function(){
				var ss_sou=ss_emailpnsou.val();
				var ss_sou_prefix=ss_sou.slice(0,3);
				var ss_sou_suffix=ss_sou.slice(-4);
				ss_emailpntar.html(ss_sou_prefix+"****"+ss_sou_suffix);
			}());
		}*/
		/*获取验证码step2*/
		ss_phonegc.val("重新获取短信").removeClass("ss_phonegcdis").removeAttr("disabled");
		/*发送验证邮件*/
		ss_phonegc.click(function(){
			var ss_pno=ss_phoneno.text();
			ss_pno=ss_pno.replace(/(\s*)/g,"");
			if(ss_pno==""){
				ss_pnotip.html("绑定手机不能为空");
				return false;
			}else if(!cregobj.Mobile.test(ss_pno)){
				ss_pnotip.html("绑定手机格式不正确");
				return false;
			}else{
				/*倒计时操作*/
				ss_phonegc.addClass("ss_phonegcdis").attr({"disabled":"disabled"});
				phone_Times(ss_phonegc,60);
				/*发送并获取验证码*/
				ss_pnotip.html("正在获取验证码......");
				$.ajax({
					url:"/CustomerMng/SendSMS",
					type:"post",
					async:false,
					data:{handtels:ss_pno,actionType:"2"},
					dataType:"json",
					success: function(res){
						if(res.State){
							ss_pnotip.html(res.Message);
						}else{
							ss_pnotip.html("获取验证码失败");
						}
					},
					error:function(e){
						ss_pnotip.html("获取验证码失败");
					}
				});
				setTimeout(function(){
					ss_pnotip.html("");
				},3000);			
			}
		});
		/*发送邮件计时器*/
		function phone_Times(o,c){
			var c=parseInt(c);
			o.val("("+c+"秒后)重新获取短信");
			if(c==-1||c<0){
				mcount1=60;
				clearTimeout(mid1);
				mid1=null;
				o.val("重新获取短信").removeClass("ss_phonegcdis").removeAttr("disabled");
				return false;
			}
			c--;
			mid1=setTimeout(function(){
				phone_Times(o,c);
				mcount1=c;
			},1000);
		}
		/*表单校验对象*/
		var phone_vobj={
				ajaxPost:true,
				datatype:{
				},
				tiptype:function(msg,o){
					/*参数说明：
						  msg：提示信息;
							o:{obj:*,type:*,curform:*}, obj指向的是当前验证的表单元素（或表单对象），type指示提示的状态，值为1、2、3、4， 1：正在检测/提交数据，2：通过验证，3：验证失败，4：提示ignore状态, curform为当前form对象;
					   cssctl:内置的提示信息样式控制函数，该函数需传入两个参数：显示提示信息的对象 和 当前提示的状态（既形参o中的type）;*/ 
					var objid=o.obj[0].id,curid="#ss_phone"+objid.slice(8)+"tip",curtype=o.type;
					if(curtype==1||curtype==3){
						$(curid).html(msg);
					}else if(curtype==2){
						$(curid).html("");
					}
				},
				beforeSubmit:function(curform){
					var curid=curform[0].id;
					if(curid.indexOf("phone1")!=-1){
						/*
							to do
							修改邮箱第一步提交
						*/
					}else if(curid.indexOf("phone2")!=-1){
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
		var ss_phonevobj1=ss_validphone1.Validform(phone_vobj);
		ss_phonevobj1.addRule(vmsg_objs().ss_phone1msg);
		/*修改密码2*/
		var ss_phonevobj2=ss_validphone2.Validform(phone_vobj);
		ss_phonevobj2.addRule(vmsg_objs().ss_phone2msg);
	});
})(jQuery);






