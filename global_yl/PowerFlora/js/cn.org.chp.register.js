// JavaScript Document
$(function(){
	//初始化多选框,提交按钮状态
	$("#regserver").removeAttr("checked");
	$("#reg-btn").attr("disabled","disabled");
	$("#regserver").change(function(){
		if($(this).is(':checked')){
			$("#reg-btn").removeAttr("disabled").removeClass("reg-btn").addClass("reg-btnsel");
		}else{
			$("#reg-btn").attr("disabled","disabled").removeClass("reg-btnsel").addClass("reg-btn");
		}
	});
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
	//身份证校验
	$("#registerform").submit(function(){
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

	//表单校验
	$("#registerform").validate({
		   rules:{
				'USERNAME': {   
	                required: true,
                },
            	'SignPwd': {   
                	required: true,
            	},
            	'validSignPwd': {   
                	required: true,
					equalTo: "#signpwd"
            	},
            	'Email': {   
	                required: true,
	                email: true
                },
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
                },
            	'validnum': {   
                	required: true,
            	}
		   },
		   messages:{ 
           		'USERNAME': {   
	                required:"用户名不能为空",
                },
            	'SignPwd': {   
                	required:"密码不能为空",
            	},
            	'validSignPwd': {   
                	required:"确认密码不能为空",
					equalTo:"确认密码与密码不一致"
            	},
            	'Email': {   
	                required:"邮箱不能为空",
	                email:"邮箱格式不正确"
                },
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
                },
            	'validnum': {   
                	required:"验证码不能为空",
            	}
		   },
		   errorPlacement:function(error,element){
				validid=element.attr("id");
				$("#"+validid+"_val").html(error.text());
			},
		   success:function(){}
	});
	
});