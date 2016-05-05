$(function() {
	/* declare */
	var carForm = $("#carForm"),contextPath = $("#contextPath").val();	
	/*carframenum*/
	jQuery.validator.addMethod("is_carframenum",function(value,element){
			  var carframenum=/^[A-Za-z_0-9]+$/;
			  return this.optional(element)||(carframenum.test(value));
	},"车架号格式不正确");
	/* valid car_info info */
	carForm.validate({
		rules : {
			'licensenum' : {
				required : true,
				maxlength : 10,
				remote : {
					url : contextPath + "/carfri/doCheckLicensenum",
					type : "post",
					data : {
						licensenum : function() {
							return $("#licensenum").val();
						},
						devid : function() {
							return $("#devid").val();
						}

					}
				}
			},
			'carframenum' : {
				is_carframenum:true,
				maxlength : 20,
				remote : {
					url : contextPath + "/carfri/doCheckCarframeNum",
					type : "post",
					data : {
						carframenum : function() {
							return $("#carframenum").val();
						},
						devid : function() {
							return $("#devid").val();
						}

					}
				}
			},
			'cartype' : {
				required : true
			}
		},
		messages : {
			'licensenum' : {
				required : "车牌号不能为空",
				maxlength : "最多输入10个字符",
				remote:"此车牌号以存在请变更"
			},
			'carframenum' : {
				is_carframenum:"车架号格式不正确",
				maxlength : "最多输入20个字符",
				remote:"此车架号以存在请变更"
			},
			'cartype' : {
				required : "车型不能为空"
			}
		},
		success : function() {
		},
		invalidHandler : function() {
			return false;
		},
		submitHandler : function() {
				var url = contextPath + "/carfri/saveCarInfo";
				$.post(url, carForm.serialize(), function(response) {
					var object = eval("(" + response.rs + ")");
					if (object.success) {
						/*
						popup_alert:(模拟alert弹出提示信息面板公用方法),需搭配css和blockui.js
						argument:提示信息,跳转地址("跳转地址"或者"undefined"),面板类型("yes"或"no"),面板按钮("have"或"none")
						*/
						var success_str=contextPath + "/carfri/car_info";
						popup_alert(object.msg,success_str,"yes","have");
					} else {
						/*
						popup_alert:(模拟alert弹出提示信息面板公用方法),需搭配css和blockui.js
						argument:提示信息,跳转地址("跳转地址"或者"undefined"),面板类型("yes"或"no"),面板按钮("have"或"none")
						*/
						popup_alert(object.msg,success_str,"yes","have");
					}
				}, 'json');
		}
	});
	//取消操作
	$("#resetBtn").click(function(){
		 window.location.reload();
	});

});