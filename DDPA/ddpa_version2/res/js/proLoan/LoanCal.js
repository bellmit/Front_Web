// JavaScript Document
$(document).ready(function(e) {
	$(".selectBox").SelectBox();
	
	//初始化placeholder
	if(!isPlaceholderSupport()){
		$.Placeholder.init();
	}
	
	if(location.hash == "#com"){
		$(".gotoloan").attr("data-url","../../loan/info/addLoanDetail?borrowerType=1")
	}else{
		$(".gotoloan").attr("data-url","../../loan/info/addLoanDetail?borrowerType=0")
	}
    /*绑定表单验证*/
	var form = $("form[name='calform']").Validform({
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
			"n1_5KW":function(gets,obj,curform,regxp){
				var reg = /^\d{1,8}.?\d{0,2}$/;
				if(reg.test(gets)){
					if(gets>50000000 || gets<1){
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
			$("#bidMoney").text("￥"+formatCurrency($("input[name='loanAmount']").val()));
			submitForm(curform);
			return false;
		},
		tiptype:function(msg,o,cssctl){
			if(!o.obj.is("form")){
				var objtip=o.obj.parents(".cell").find(".Validform_checktip");
				cssctl(objtip,o.type);
				objtip.text(msg);
			}
		}
	});
	
	$(".txtbox").change(function(e){
		var id = "#" + $(this).siblings(".values").attr("data-rel");
		var f = form.check(false,id);
	})
	
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
					rate.val((parseFloat(rate.val())*100).toFixed(0));
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
		//data.monthRate = parseFloat(data.monthRate)*100;
		$("#monthPriInt").text("￥"+formatCurrency(data.monthRepayAmount));
		$("#fee").text("￥"+formatCurrency(data.turnoverFee));
		$("#monthRate").text(data.monthRate+"%");
		var bj = parseFloat($("input[name='loanAmount']").val()),
			totalRepayAmount = parseFloat(data.totalRepayAmount),
			totalInvest = totalRepayAmount - bj;
		
		$("#totalPriInt").text("￥"+formatCurrency(data.totalRepayAmount));
		$("#totalInvest").text("￥"+formatCurrency(totalInvest.toFixed(2)))
		
		var repayType = $("input[name='repayType']").val();
		if(repayType == "2"){
			$(".repayTypeLabel").show().siblings("span").hide();
			$("#monthPriInt").text("￥"+formatCurrency(rows[0].interest))
		}else{
			$(".repayTypeLabel").hide().siblings("span").show();
			$("#monthPriInt").text("￥"+formatCurrency(data.monthRepayAmount));
		}
		
		var islend = $("#rows").hasClass("lend");
		
		//遍历数据
		for(i=0; i<l;i++){
			var priint = parseFloat(rows[i].principal) + parseFloat(rows[i].interest);
			trs += '<tr>'
				+ '<td>第'+rows[i].month+'个月</td>' //第几个月
				+ '<td>'+formatCurrency(priint.toFixed(2))+'</td>'  //月还本息
				+ '<td>'+formatCurrency(rows[i].principal)+'</td>'  //月还本金
				+ '<td>'+formatCurrency(rows[i].interest)+'</td>';  //月还利息
			
			if(!islend){
				trs += '<td>'+formatCurrency(rows[i].intermediaryFee)+'</td>';  //居间服务费
			}  
			
			trs += '<td>'+formatCurrency(rows[i].balanceAmount)+'</td>'  //待还本息余额
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