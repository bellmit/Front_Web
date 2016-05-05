// JavaScript Document
$(function(){
	var validid="";
	$("#drugstandard").validate({
		   rules:{
			   	'drugtype': {   
	                required: true
                },
                'drugsname': {   
	                required: true
                },
                'drugs_from': {   
	                required: true
                },
                'mediaType': {   
	                required: true
                },
                'unit': {   
                	required: true 
            	},
            	'billNo': {   
                	required: true
            	},
				'contacts': {   
	                required: true
                }
		   },
		   messages:{
			    'drugtype': {   
	                required: "标准分类不能为空"
                }, 
                'drugsname': {   
	                required: "标准名称不能为空"
                },
                'drugs_from': {   
	                required: "标准出处不能为空"
                },
                'mediaType': {   
	                required: "剂型不能为空"
                },
                'unit': {   
                	required: "规格不能为空" 
            	},
            	'billNo': {   
                	required: "相关单据号不能为空"
            	},
				'contacts': {   
	                required: "联系人不能为空"
                }
		   },
		   errorPlacement:function(error,element){
				validid=element.attr("id");
				if(element.attr("name")=="drugtype"){
					$("#"+element.attr("name")+"_valid").html(error.text());
				}else{
					$("#"+validid+"_valid").html(error.text());
				}
			},
		   success:function(){}
	});
});