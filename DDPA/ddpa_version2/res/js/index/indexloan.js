$(document).ready(function(e) {
				
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
		  },
		  change:function(event, ui){
			  var curv = $( ".cursor" ).text();
				$( ".cursor" ).text( ui.value );
				$("input#loantime").val(ui.value);
				left = $(ui.handle).css("left");
				left = parseFloat(left);
				left  = left -15;
				$(this).find(".cursor").css("left",left);
		  }
		});
    	$( ".cursor" ).text( $( "#slider" ).slider( "value" ) );
    	/*$(".money").blur(function(e){
    		var $this =$(this),
    			v =  $this.val();
    		var reg = /^[1-9]\d*\.?\d$/;
    		
    		if(v != "" &&reg.test(v)){
        		v = parseFloat(v);
    			$this.val(v.toFixed(2))
    		}
    	})*/
		$(".radio").imgRadio({});
		
		//快捷借款表单
		$(".toloanform").Validform({
			ajaxPost:true,
			datatype:{
				"money":function(gets,obj,curform,regxp){
					var loantype = curform.find(".loantype.checked input").val();
					if(loantype == "2"){
						return true;
					}
					var reg = /^[1-9]\d*\.?\d{0,10}$/;
					if(!reg.test(gets) || gets == "" || gets <3000 || gets > 500000){return false;}else{obj.val(parseFloat(gets).toFixed(2));}
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
		
		//转到借款申请页面
		function toloan(){
			var host = location.host, url = host + "lend/user/loginChecked";
			var money = $("input[name='money']").val();
			var rnd = Math.random();
			
			$.ajax({
				url:"../../licai/loginChecked/",
				type:"post",
				data:{rnd:rnd},
				success:function(data){
					if(data){

						var nexturl = document.domain.indexOf(".com") >= 0? "https://" : "http://";
						
						nexturl += document.domain;
												
						if(data.login=="Y"){
							
							$("body").find(".loginformtip").text("");
							
							var money = $("input[name='money']").val(),
								loantime = $("input[name='loantime']").val(),
								loantype = $(".loantype.checked");
							var loantype = loantype.find("input").val();
														
							if(loantype == "0"){
								window.top.location.href = nexturl + "/loan/info/addLoanDetail?borrowerType=0"+"&money="+money+"&loantime="+loantime;
							}else if(loantype == "1"){
								window.top.location.href = nexturl + "/loan/info/addLoanDetail?borrowerType=1"+"&money="+money+"&loantime="+loantime;
							}else if(loantype == "2"){
								window.top.location.href = nexturl + "/jiedai/mortgage-loan/";
							}
						}else{
							var money = $("input[name='money']").val(),
							loantime = $("input[name='loantime']").val(),
							loantype = $(".loantype.checked");
							var loantype = loantype.find("input").val(), lnurl;
														
							if(loantype == "0"){
								lnurl = "/loan/info/addLoanDetail?borrowerType=0"+"&money="+money+"&loantime="+loantime;
							}else if(loantype == "1"){
								lnurl = "/loan/info/addLoanDetail?borrowerType=1"+"&money="+money+"&loantime="+loantime;
							}else if(loantype == "2"){
								lnurl = "/jiedai/mortgage-loan/";
							}							
							window.top.location.href = nexturl + "/account/user/login?src=" + lnurl;
						}
					}else{
						
					}
				}
			})
		}
});