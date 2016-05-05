$(document).ready(function(e) {
	
	$(".backtotop").css("visibility","hidden");
	
	$(window).scroll(function(){
		if ($(window).scrollTop()<100){
			$(".backtotop").css("visibility","hidden");
		}else{
			$(".backtotop").css("visibility","visible");
		}
	});
	
	$(".backtotop").click(function(){
		$('body,html').animate({scrollTop:0},1000);
		return false;
	});
		
    $( "#slider" ).slider({
		  range: "min",
		  value: 0,
		  min: 1,
		  max: 36,
		  slide: function( event, ui ) {
			var curv = $( ".cursor" ).text();
			$( ".cursor" ).text( ui.value );
			$("input#loantime").val(ui.value);
			left = $(ui.handle).css("left");
			left = parseFloat(left);
			if(parseInt(curv) < ui.value){
				left  = left -11;
			}else{
				left  = left - 22;
			}
			$(this).find(".cursor").css("left",left);
		  }
		});
    	$( ".cursor" ).text( $( "#slider" ).slider( "value" ) );
    	
		$(".radio").imgRadio({});
		
		//快捷借款表单
		$(".toloanform").Validform({
			ajaxPost:true,
			datatype:{
				"money":function(gets,obj,curform,regxp){
					var reg = /^[1-9]\d*\.?\d{0,2}$/;
					if(!reg.test(gets) || gets == "" || gets <3000 || gets > 500000){return false;}
				}
			},
			beforeSubmit:function(curform){
				toloan();
				return false;
			},
			tiptype:function(msg,o,cssctl){
				if(!o.obj.is("form")){
					var objtip=o.obj.siblings(".Validform_checktip");
					cssctl(objtip,o.type);
					objtip.text(msg);
				}
			}
		});
		
		//登录表单
		$("#login_action").Validform({
			ajaxPost:true,
			datatype:{
				"username":function(gets,obj,curform,regxp){
					var reg = /^[1-9]\d*\.?\d{0,2}$/;
					if(!reg.test(gets) || gets == "" || gets <3000 || gets > 500000){return false;}
				}
			},
			beforeSubmit:function(curform){
				submitlogin(curform);
				return false;
			},
			tiptype:function(msg,o,cssctl){
				if(!o.obj.is("form")){
					var objtip=o.curform.find(".login_tips");
					cssctl(objtip,o.type);
					objtip.text(msg);
				}
			}
		});
		
		//提交登录
		function submitlogin(f){
			var username = f.find("input[name='UserName']").val(),
				remember = f.find("input[name='Remember']").val(),
			  	paw = f.find("input[name='PassWord']").val();
			var data = {userName:username, password:paw, Remember:remember};
			var url = location.href;
			url = url.replace("http://","https://");
			url += "account/user/login";
			
			$.ajax({
				url:url,
				data:data,
				type:"post",
				success:function(data){
					if(data){
						if(data.success == false){
							f.find(".login_tips").text("账号或密码错误");
						}else{
							location.reload();
						}
					}
				}
			});
		}
		
		
		//转到借款申请页面
		function toloan(){
			var host = location.host, url = host + "lend/user/loginChecked";
			var money = $("input[name='money']").val();
					
			$.ajax({
				url:"lend/user/loginChecked",
				type:"post",
				data:{},
				success:function(data){
					if(data){
						if(data.login=="Y"){
							
							$(".login_wrapbg").removeClass("error");
							$(".loginformtip").text("");
							
							var money = $("input[name='money']").val(),
								loantime = $("input[name='loantime']").val(),
								loantype = $(".loantype.checked");
							var loantype = loantype.find("input").val();
							var url = location.href;
							url = url.replace("http://","https://");
							
							if(loantype == "0"){
								location.href = url + "loan/info/addLoanDetail?borrowerType=0"+"&money="+money+"&loantime="+loantime;
							}else if(loantype == "1"){
								location.href = url + "loan/info/addLoanDetail?borrowerType=1"+"&money="+money+"&loantime="+loantime;
							}else if(loantype == "2"){
								location.href = url + "borrow/detail/mortgage";
							}
						}else{
							$("a.backtotop").click();
							$(".login_wrapbg").addClass("error");
							$(".loginformtip").text("请先登录");
						}
					}else{
						
					}
				}
			})
		}
});