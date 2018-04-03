(function($){
	$(function(){
		/*获取页面元素*/
		var loan_companyaction=$("#loan_companyaction"),citytips_arr=["",""];
		/*验证表单*/
		loan_companyaction.validate({
			rules : {
				'CompanyName' : {
					required : true
				},
				'Position' : {
					required : true
				},
				'MonthlyIncome' : {
					required : true
				},
				'WorkEmail' : {
					required : true,
					email:true
				},
				'WorkPro' : {
					required : true
				},
				'WorkCity' : {
					required : true
				},
				'CompanyAddress' : {
					required : true
				}
			},
			messages : {
				'CompanyName' : {
					required :"公司全称不能为空"
				},
				'Position' : {
					required :"职位不能为空"
				},
				'MonthlyIncome' : {
					required :"月收入不能为空"
				},
				'WorkEmail' : {
					required :"工作邮箱不能为空",
					email:"工作邮箱格式错误"
				},
				'WorkPro' : {
					required :"工作省份不能为空"
				},
				'WorkCity' : {
					required :"工作城市不能为空"
				},
				'CompanyAddress' : {
					required :"公司地址不能为空"
				}
			},
			errorPlacement : function(error, element) {
				var curid=element.attr("id");
				if(curid=="place_pro"||curid=="place_city"){
					if(curid=="place_pro"){
						citytips_arr.splice(0,1,error.text());
					}else if(curid=="place_city"){
						citytips_arr.splice(1,1,error.text());
					}
					$("#place_citytips").html(citytips_arr.join("&nbsp;&nbsp;"));
				}else{
					$("#"+curid+"_tips").html(error.text());
				}
			},
			success:function(){}
		});
	});
})(jQuery);