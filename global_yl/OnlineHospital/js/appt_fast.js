// JavaScript Document
$(function(){
	var validid1="";
	$("#appt_fast").validate({
		   rules:{
				'Outp_Clinic_dep':{   
					required: true
				},
				'Seeing_Doc_Time':{   
					required: true
				},
				'Seeing_Doc_Type':{   
					required: true
				},
				'Register_Doc':{   
					required: true
				}
		   },
		   messages:{ 
				'Outp_Clinic_dep':{   
					required: "门诊科室不能为空"
				},
				'Seeing_Doc_Time':{   
					required: "就诊时间不能为空"
				},
				'Seeing_Doc_Type':{   
					required: "就诊类型不能为空"
				},
				'Register_Doc':{   
					required: "挂号类型不能为空"
				}
		   },
		   /*pass*/
		   submitHandler:function(form){
			form.submit();
			},
		   /*no pass*/
		   invalidHandler:function(form,validator){
				return false;
			},
		   /*no pass infos*/
		   errorPlacement:function(error,element){
				validid1=element.attr("id");
				$("#"+validid1+"_valid").html(error.text());
			},
			/*pass active*/
		   success:function(){}
		})
})