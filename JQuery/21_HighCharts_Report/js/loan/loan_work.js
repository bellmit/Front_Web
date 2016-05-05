(function($){
	$(function(){
		//下拉菜单
		$(".selectBox").SelectBox();
		$(".place_pro").chooseCity();
		/*获取页面元素*/
		var loan_workaction=$("#loan_workaction"),citytips_arr=["",""];
		$(".addresswrap input[type='text']").blur(checkWorkAddr);
		$(".loan_phone input[type='text']").blur(checkPhone);
		
		loan_workaction.submit(function(){
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
		
		//检测手机
		function checkPhone(){
			var flag = true;
			$("input[name='phoneCode']").siblings("p").replaceWith("");
			var reg1 = /^0\d{2,3}$/, reg2 = /^\d{6,8}$/, v1 = $("input[name='areaCode']").val(), v2 = $("input[name='phoneCode']").val(); 
			//console.log(v1.match(reg1)+";"+v2.match(reg2))
			if($("input[name='areaCode']").val()=="" && $("input[name='phoneCode']").val()==""){
				$("input[name='phoneCode']").siblings("p").replaceWith("");
				$("input[name='phoneCode']").after("<p style='color:#f00; margin:5px 0px 0px 6px;float: left;'>公司电话不能为空</p>") 
				$("input[name='phoneCode']").siblings("span.aftermsg").hide()
				flag = false;
			}else if($("input[name='areaCode']").val()==""){
				$("input[name='phoneCode']").siblings("p").replaceWith("");
				$("input[name='phoneCode']").after("<p style='color:#f00; margin:5px 0px 0px 6px;float: left;'>公司电话区号不能为空</p>") 
				$("input[name='phoneCode']").siblings("span.aftermsg").hide()
				flag = false;
			}else if(!v1.match(reg1)){
				$("input[name='phoneCode']").siblings("span.aftermsg").hide()
				$("input[name='phoneCode']").after("<p style='color:#f00; margin:5px 0px 0px 6px;float: left;'>区号不正确</p>") 
				flag = false;
			}else if($("input[name='phoneCode']").val()==""){
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
		loan_workaction.validate({
			rules : {
				'comFullName' : {
					required : true,
					minlength : 1,
					maxlength:200
				},
				'department' : {
					required : true,
					minlength : 1,
					maxlength:50
				},
				'position' : {
					required : true,
					minlength : 1,
					maxlength:50
				},
				'income' : {
					required : true,
					minlength : 1
				},
				'incomebox' : {
					required : true,
					minlength : 1
				},
				'email' : {
					required : true,
					minlength : 1,
					maxlength:100,
					email:true
				},
				'workingDetailAddress' : {
					required : true,
					minlength: 1,
					maxlength:200
				},
				'comType' : {
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
				'workYear' : {
					required : true,
					minlength : 1
				},
				'workYearbox' : {
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
					required :"单位全称不能为空",
					minlength : "单位全称不能为空",
					maxlength:"单位全称的长度不能超过{0}个字符或汉字"
				},
				'department' : {
					required : "部门不能为空",
					minlength : "部门不能为空",
					maxlength:"部门的长度不能超过{0}个字符或汉字"
				},
				'position' : {
					required : "职位不能为空",
					minlength : "职位不能为空",
					maxlength:"职位的长度不能超过{0}个字符或汉字"
				},
				'income' : {
					required :"月收入不能为空",
					minlength : "月收入不能为空"
				},
				'incomebox' : {
					required : "请选择月收入",
					minlength : "请选择月收入"
				},
				'email' : {
					required :"工作邮箱不能为空",
					minlength : "工作邮箱不能为空",
					maxlength:"工作邮箱的长度不能超过{0}个字符",
					email:"工作邮箱格式错误"
				},
				'workingDetailAddress' : {
					required : "公司详细地址不能为空",
					minlength: "公司详细地址不能为空",
					maxlength :"详细地址的长度不能超过{0}个字符或汉字"
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
				'workYear' : {
					required : "请选择工作年限",
					minlength : "请选择工作年限"
				},
				'workYearbox' : {
					required : "请选择工作年限",
					minlength : "请选择工作年限"
				},
				'annualRevenuebox' : {
					required : "请选择公司年营业收入",
					minlength : "请选择公司年营业收入"
				},
				'operationYearbox' : {
					required : "请选择公司年营业收入",
					minlength : "请选择公司年营业收入"
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