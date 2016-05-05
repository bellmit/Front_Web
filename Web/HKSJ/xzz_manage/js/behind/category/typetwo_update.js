//选择的行数据
	var r = window.parent.select;
	
	$(function(){
		$('#id').val(r.id);
		$('#typetwoName').val(r.typetwoName);
		$('#descc').val(r.descc);
		$('#picUrl').val(r.picUrl);
		$('#orderNum').val(r.orderNum);
	});
		function add()
		{
		var typetwoName =  $("#typetwoName").val().replace(/[ ]/g,"");
		var orderNum =  $("#orderNum").val().replace(/[ ]/g,"");
		
		if(typetwoName == ''){
			$.messager.alert("提示","请先填写名称！","info",function(){document.getElementById("typetwoName").focus();});
			return ;
		}
		if(orderNum == ''){
			$.messager.alert("提示","请先填写排序号！","info",function(){document.getElementById("orderNum").focus();});
			return ;
		}
			$.post('updateTypeTwo.do',$("#typeTwoForm").serialize(),function(result){
				if(result==1) //修改成功
				{
					window.parent.tb.load();
					parent.$('#windowDiv').window('close');
				}
				else
				{
					$.messager.alert("提示","保存失败","info");
				}
			});
		}