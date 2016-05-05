


var r = window.parent.select; //选中行数据
$(function(){
	
	$("#id").val(r.id);
	$("#name").val(r.name);
	$("#comments").val(r.comments);
	$("#statics").val(r.statics);
	$("#parent_statics").val(r.parent_statics);
	
	var parHtml="<option value=\"\">请选择</option>"

	var staticsName;
	if(r.statics == 0){
		staticsName = "启用";
		parHtml="<option value=\"1\">停用</option>";
	} else {
		staticsName = "停用";
		parHtml="<option value=\"0\">启用</option>";
	}
		
	parHtml+="<option selected value=\""+r.statics+"\">"+staticsName+"</option>";
	$("#statics").html(parHtml);
});

function add()
{
		if($("#name").val().replace(/[ ]/g,"")=="")
		{
			$.messager.alert("提示","分类名称不能为空","info",function(){document.getElementById("name").focus();});
			return;
		}
		
		if($("#statics").val().replace(/[ ]/g,"")=="")
		{
			$.messager.alert("提示","状态不能为空","info",function(){document.getElementById("statics").focus();});
			return;
		}
		
			$.post('/xzzBehind/appInterest/toUpdate.do',$("#appInterestForm").serialize(),function(result){
				if(result == "OK") //修改成功
				{
					window.parent.tb.load();
					parent.$('#windowDiv').window('close');
				} else if(result == "NO"){
					$.messager.alert("提示","保存失败","info");
					document.getElementById("baocunid").disabled="";
				}
				else {
					$.messager.alert("提示",result,"info");
					document.getElementById("baocunid").disabled="";
				}
			})
		}