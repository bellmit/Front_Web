(function($){
	$(function(){
		//下拉菜单
		$(".selectBox").SelectBox();
		//城市选择器
		$(".place_pro").chooseCity();
		/*获取页面元素*/
		var loan_companyaction=$("#loan_companyaction"),citytips_arr=["",""];
		$(".loan_phone input[type='tel']").blur(checkPhone);
		$(".addresswrap input[type='text']").blur(checkWorkAddr);
		
		loan_companyaction.submit(function(){
			
			var f1 = checkWorkAddr();
			var f2 = checkPhone();
			if(!f1 || !f2){
				return false;
			}
		})
		
		//检测工作地点
		function checkWorkAddr(){
			var flag=true;
			var $addresswrapInputs = $(".addresswrap input[type='text']");
			$("#place_city").siblings("p").replaceWith("");
			if($($addresswrapInputs[0]).val()==""){
				$("#place_city").after("<p class='terror' style='color:#f00; margin:5px 0px 0px 6px;float: left;'>请选择工作省份</p>");
				flag=false;
			}else if($($addresswrapInputs[1]).val()==""){
				$("#place_city").after("<p class='terror' style='color:#f00; margin:5px 0px 0px 6px;float: left;'>请选择工作城市</p>");
				flag=false;
			}else{
				$("#place_city").siblings("p").replaceWith("");
			}
			return flag;
		}
		
		//检测固话
		function checkPhone(){
			var flag = true;
			$("input[name='phoneCode']").siblings("p").replaceWith("");
			var reg1 = /^0\d{2,3}$/, reg2 = /^\d{6,8}$/, v1 = $("input[name='areaCode']").val(), v2 = $("input[name='phoneCode']").val(); 
			//console.log(v1+":"+v2)
			if(v1=="" && v2==""){
				$("input[name='phoneCode']").siblings("p").replaceWith("");
				$("input[name='phoneCode']").after("<p style='color:#f00; margin:5px 0px 0px 6px;float: left;'>公司电话不能为空</p>") 
				$("input[name='phoneCode']").siblings("span.aftermsg").hide()
				flag = false;
			}else if(v1==""){
				$("input[name='phoneCode']").siblings("p").replaceWith("");
				$("input[name='phoneCode']").after("<p style='color:#f00; margin:5px 0px 0px 6px;float: left;'>公司电话区号不能为空</p>") 
				$("input[name='phoneCode']").siblings("span.aftermsg").hide()
				flag = false;
			}else if(!v1.match(reg1)){
				$("input[name='phoneCode']").siblings("span.aftermsg").hide()
				$("input[name='phoneCode']").after("<p style='color:#f00; margin:5px 0px 0px 6px;float: left;'>区号不正确</p>")
				flag = false;
			}else if(v2==""){
				$("input[name='phoneCode']").siblings("p").replaceWith("");
				$("input[name='phoneCode']").after("<p style='color:#f00; margin:5px 0px 0px 6px;float: left;'>公司电话号码不能为空</p>") 
				$("input[name='phoneCode']").siblings("span.aftermsg").hide()
				flag = false;
			}else if(!v2.match(reg2)){
				$("input[name='phoneCode']").siblings("span.aftermsg").hide()
				$("input[name='phoneCode']").after("<p style='color:#f00; margin:5px 0px 0px 6px;float: left;'>电话号码不正确</p>")
				flag = false;
			}else{
				$("input[name='phoneCode']").siblings("span.aftermsg").show()
				$("input[name='phoneCode']").siblings("p").replaceWith("");
			}
			return flag;
		}
		
		/*验证表单*/
		loan_companyaction.validate({
			focusCleanup:true,
			rules : {
				'comFullName' : {
					required : true,
					minlength : 1
				},
				'email' : {
					required : true,
					minlength : 1,
					email:true
				},
				'workingDetailAddress' : {
					required : true,
					minlength : 1
				},
				'comTypebox' :{
					required : true,
					minlength : 1
				},
				'industry' : {
					required : true,
					minlength : 1
				},
				'industrybox' : {
					required : true,
					minlength : 1
				},
				'scale' : {
					required : true,
					minlength : 1
				},
				'scalebox' : {
					required : true,
					minlength : 1
				},
				'annualRevenuebox' : {
					required : true,
					minlength : 1
				},
				'operationYearbox' : {
					required : true,
					minlength : 1
				},
				'annualProfitbox' : {
					required : true,
					minlength : 1
				}
			},
			messages : {
				'comFullName' : {
					required :"公司全称不能为空",
					minlength :"公司全称不能为空"
				},
				'email' : {
					required :"工作邮箱不能为空",
					minlength :"工作邮箱不能为空",
					email:"工作邮箱格式错误"
				},
				'workingDetailAddress' : {
					required :"公司地址不能为空",
					minlength :"公司地址不能为空"
				},
				'comType' : {
					required : "请选择公司类别",
					minlength : "请选择公司类别"
				},
				'comTypebox' :{
					required : "请选择公司类别",
					minlength : "请选择公司类别"
				},
				'industry' : {
					required : "请选择公司行业",
					minlength : "请选择公司行业"
				},
				'industrybox' : {
					required : "请选择公司行业",
					minlength : "请选择公司行业"
				},
				'scale' : {
					required : "请选择公司规模",
					minlength : "请选择公司规模"
				},
				'scalebox' : {
					required : "请选择公司规模",
					minlength : "请选择公司规模"
				},
				'annualRevenuebox' : {
					required : "请选择公司年营业收入",
					minlength : "请选择公司年营业收入"
				},
				'operationYearbox' : {
					required : "请选择公司经营年限",
					minlength : "请选择公司经营年限"
				},
				'annualProfitbox' : {
					required : "请选择公司年净利润",
					minlength : "请选择公司年净利润"
				}
			},
			errorElement:"p",
			errorClass:"tipserror",
			success:function(){}
		});
	});
})(jQuery);