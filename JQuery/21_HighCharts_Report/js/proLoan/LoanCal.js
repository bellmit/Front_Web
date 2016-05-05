// JavaScript Document
$(document).ready(function(e) {
	$(".selectBox").SelectBox();
	
	if(location.hash == "#com"){
		$(".gotoloan").attr("data-url","../../loan/info/addLoanDetail?borrowerType=1")
	}else{
		$(".gotoloan").attr("data-url","../../loan/info/addLoanDetail?borrowerType=0")
	}
    /*绑定表单验证*/
	$("form[name='calform']").Validform({
		ajaxPost:true,
		datatype:{
			"n3K_50W":function(gets,obj,curform,regxp){
				var reg = /^\d{4,6}.?\d{0,2}$/;
				if(reg.test(gets)){
					if(gets>500000 || gets<3000){
						return false;
					}
				}else{
					return false;
				}
				return true;
			},
			"rate":function(gets,obj,curform,regxp){
				return checkRate(gets)
			},
			"deadline":function(gets,obj,curform,regxp){
				return checkDeadLine(gets)
			}
		},
		beforeSubmit:function(curform){
			clearResult();
			var rate = $("input[name='annualRate']");
			rate.val(parseFloat(rate.val())/100);
			$("#deadline").text($("input[name='loanPeriod']").val()+"个月");
			submitForm(curform);
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
	
	//提交表单
	function submitForm(f){
		
		var url = f.attr("action");
		var data = f.serialize();
		$.ajax({
			url:url,
			data:data,
			type:"post",
			success:function(data){
				if(data){
					handleData(data);
					var rate = $("input[name='annualRate']");
					rate.val(parseFloat(rate.val())*100);
				}else{
					alert("服务器错误！")
				}
			}
		})
	}
	
	//处理数据
	function handleData(data){
		var rows = data.monthChargeDoList, l = rows.length,i, trs = "";
		$(".result").fadeIn();
		//总览信息填充
		data.monthRate = parseFloat(data.monthRate)*100;
		$("#monthPriInt").text("￥"+data.monthRepayAmount);
		$("#fee").text("￥"+data.turnoverFee);
		$("#monthRate").text(data.monthRate+"%");
		$("#totalPriInt").text("￥"+data.totalRepayAmount);
		
		//遍历数据
		for(i=0; i<l;i++){
			var priint = rows[i].principal + rows[i].interest;
			trs += '<tr>'
				+ '<td>第'+rows[i].month+'个月</td>' //第几个月
				+ '<td>'+priint+'</td>'  //月还本息
				+ '<td>'+rows[i].principal+'</td>'  //月还本金
				+ '<td>'+rows[i].interest+'</td>'  //月还利息
				+ '<td>'+rows[i].intermediaryFee+'</td>'  //居间服务费
				+ '<td>'+rows[i].balanceAmount+'</td>'  //待还本息余额
				+ '</tr>';
		}
		$("#rows").html(trs);
	}
		
	//清空result
	function clearResult(){
		//$(".result").hide();
		$("#deadline").text("-个月")
		$("#monthPriInt").text("-");
		$("#fee").text("-");
		$("#monthRate").text("-");
		$("#totalPriInt").text("-");
		$("#rows").html("");
	}
	
});