//选择的行数据
	var r = window.parent.select;

	$(function() {
		$.ajax({

			type : "post",
			dataType : "json",
			contentType : "application/json;charset=utf-8",
			url : "getAllTypeTwoCheckbox.do?typeOneId=" + r.typeoneId,
			success : function(result) {
				var listHtml = '';
				$.each(result, function(i, n) {
					listHtml += "<input type='checkbox' ";
					if (n.checked) {
						listHtml += " checked= " + n.checked;
					}
					listHtml += " name='" + n.ID + "' id='" + n.ID + "'/>"
							+ n.TYPETWO_NAME + "<br/>";

				});
				$("#addcheckbox").html(listHtml);
			},
			error : function(XMLHttpRequest, textStatus, errorThrown) {
				$.messager.alert("提示",errorThrown,"info");
			},
			async : false
		//false表示同步  
		});

		$("#addcheckbox :checkbox").click(function(a) {
			//alert(a.val());
		});

	});
	function add() {
		$.post('addOneRelationshipTwo.do?typeOneId=' + r.typeoneId, $(
				"#typeOneForm").serialize(), function(result) {
			if (result == 1) //修改成功
			{
				window.parent.tb.load();
				parent.$('#windowDiv').window('close');
			} else {
				$.messager.alert("提示","保存失败","info");
			}
		});
	}