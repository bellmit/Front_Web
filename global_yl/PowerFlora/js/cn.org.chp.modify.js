// JavaScript Document
$(function(){
	//输入框默认值隐藏
	$("#regaddr,#mfraddr,#companycode").focusin(function(){
		var regdefval=$(this).val();
		if(regdefval=="企业注册详细地址"||regdefval=="企业生产详细地址"||regdefval=="国内组织"){
			this.value="";
		}
	});
	//表单校验添加方法--邮编校验
	jQuery.validator.addMethod("validregzipcode",function(value,element){
			  var vzcode=/^[0-9]{6}$/;
			  return this.optional(element)||(vzcode.test(value));
			},"邮编格式不合法");

	//表单校验
	$("#cor_modify").validate({
		   rules:{
                'chi-name': {   
	                required: true
                },
                'eng-name': {   
	                required: true
                },
                'RegAddr': {   
	                required: true
                },
                'MfrAddr': {   
                	required: true 
            	},
            	'regZipCode': {   
                	required: true,
					validregzipcode: true
            	},
				'MfrZipCode': {   
	                required: true,
					validregzipcode: true
                },
                'CompanyCode': {   
	                required: true
                },
                'lawperson': {   
	                required: true
                }
		   },
		   messages:{ 
                'chi-name': {   
	                required:"中文名称不能为空"
                },
                'eng-name': {   
	                required:"英文名称不能为空"
                },
                'RegAddr': {   
	                required:"注册地址不能为空"
                },
                'MfrAddr': {   
                	required:"生产地址不能为空"
            	},
            	'regZipCode': {   
                	required:"注册地址邮编不能为空"
            	},
				'MfrZipCode': {   
	                required:"生产地址邮编不能为空"
                },
                'CompanyCode': {   
	                required:"组织机构代码不能为空"
                },
                'lawperson': {   
	                required:"法定代表人不能为空"
                }
		   },
		   errorPlacement:function(error,element){
				validid=element.attr("id");
				$("#"+validid+"_val").html(error.text());
			},
		   success:function(){}
	});
	//身份证校验
	$("#cor_modify").submit(function(){
		var detect_ct=$("#certtype option:selected").text();
		if(detect_ct=="身份证"){
			return validsuserid(document.getElementById("certno"));
		}
	});
	$("#certno").focusout(function(){
		var detect_ct=$("#certtype option:selected").text();
		if(detect_ct=="身份证"){
			validsuserid(this);
		}		
	});
	
	
	
	//附件上传
	$("#attachment").val("");
	$("#att_btn").click(function(){
		$("#attachment").click();
	});
	$("#attachment").change(function(){
		if($(this).val()!=""){
			$("#infosattshow li p").text($(this).val());
		}
	});
	//other codes
	
			
			
			
			
			
});


