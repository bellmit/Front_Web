// JavaScript Document
$(document).ready(function(e) {
	
	$("button[type='submit']").submit(checkLogin);
	$(".selectBox").SelectBox();
	$("input.year").change(function(e){
		var v = $(this).val(), m_str ="";
		var y = new Date().getFullYear(), m = new Date().getMonth();
		m += 1;
		if(v==y){
			for(var i=1; i <= m; i++){
				if(i<10){
					m_str += '<li rel="'+ i +'">0'+i+'</li>';
				}else{
					m_str += '<li rel="'+ i +'">'+i+'</li>';
				}
			}
		}else{
			for(var i=1; i <= 12; i++){
				if(i<10){
					m_str += '<li rel="'+ i +'">0'+i+'</li>';
				}else{
					m_str += '<li rel="'+ i +'">'+i+'</li>';
				}
			}
		}
		$(".values.month ul").html(m_str);
	})
    /*绑定表单验证*/
	
	$("form[name='mortCar']").Validform({
		ajaxPost:true,
		datatype:{
			"year":function(gets,obj,curf,reg){
				var reg = /^(1|2)\d{3}$/
				if(reg.test(gets)){
					return true;
				}else{
					return false;
				}
			},
			"month":function(gets,obj,curf,reg){
				var reg = /^(0|1)\d{1}$/
				if(reg.test(gets) && gets<13){
					return true;
				}else{
					return false;
				}
			}
		},
		beforeSubmit:function(curform){
			
			try{
				var year = curform.find("input.year"), 
			month = curform.find("input.month"), 
			ym = curform.find(".ym");}
			catch(err){
				console.log(err);
			}
			//console.log(year.val())
			if(year.val()==""){
				//console.log("here")
				year.addClass("Validform_error")
				ym.addClass("Validform_wrong").removeClass("Validform_right").text(year.attr("errormsg"))
				return false;
			}else if(month.val()==""){
				//console.log("here")
				month.addClass("Validform_error")
				ym.addClass("Validform_wrong").removeClass("Validform_right").text(month.attr("errormsg"))
				return false;
			}else{
				//console.log("here")
				year.removeClass("Validform_error")
				month.removeClass("Validform_error")
				ym.removeClass("Validform_wrong").addClass("Validform_right").text("")
				doSubmit(curform);
			}
			return false;
			
		},
		tiptype:function(msg,o,cssctl){
			if(!o.obj.is("form")){
				var objtip=o.obj.siblings(".Validform_checktip");
				cssctl(objtip,o.type);
				objtip.text(msg);
			}
		},
	});
	
	$("form[name='mortHouse']").Validform({
		ajaxPost:true,
		datatype:{
			"year":function(gets,obj,curf,reg){
				var reg = /^(1|2)\d{3}$/
				if(reg.test(gets)){
					return true;
				}else{
					return false;
				}
			},
			"month":function(gets,obj,curf,reg){
				var reg = /^(0|1)\d{1}$/
				if(reg.test(gets) && gets < 13){
					return true;
				}else{
					return false;
				}
			}
		},
		beforeSubmit:function(curform){
			var year = curform.find("input.year"), month = curform.find("input.month"), ym = curform.find(".ym");
			//console.log(year.val())
			if(year.val()==""){
				//console.log("here")
				year.addClass("Validform_error")
				ym.addClass("Validform_wrong").removeClass("Validform_right").text(year.attr("errormsg"))
				return false;
			}else if(month.val()==""){
				//console.log("here")
				month.addClass("Validform_error")
				ym.addClass("Validform_wrong").removeClass("Validform_right").text(month.attr("errormsg"))
				return false;
			}else{
				//console.log("here")
				year.removeClass("Validform_error")
				month.removeClass("Validform_error")
				ym.removeClass("Validform_wrong").addClass("Validform_right").text("")
				doSubmit(curform);
			}

			return false;
			
		},
		tiptype:function(msg,o,cssctl){
			if(!o.obj.is("form")){
				var objtip=o.obj.siblings(".Validform_checktip");
				cssctl(objtip,o.type);
				objtip.text(msg);
			}
		},
	});
});

//异步提交申请
function doSubmit(f){
	var url = f.attr("action"), data = f.serialize();
	
	$.ajax({
		url:url,
		data:data,
		type:"post",
		success:function(data){
			if(data){
				if(data.success==true){
					showTip("申请已提交","您的申请已受理，稍后工作人员会电话联系您，请保持电话通畅，谢谢！","ok");
					f.get(0).reset();
				}else{
					showTip("申请提交失败",data.error,"warn");
				}
			}else{
				showTip("申请提交失败","您的申请提交失败，请重新提交！","warn");
			}
		}
	})
}

function checkLogin(){
	$.ajax({
		url:"http://localhost/ddpaweb/borrow/user/checkedDetail",
		type:"post",
		data:{},
		success: function(data){
			if(data){
				//console.log(data.login)
				if(data.login=="N"){
					location.href = "../../account/user/login?src=borrow/info/index";
				}else{
					curform[0].submit();
				}
			}else{
				alert("服务器错误！");	
			}
		}
	})
}