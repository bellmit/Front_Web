


var r = window.parent.select; //选中行数据
$(function(){
	
	$("#id").val(r.id);
	$("#name").val(r.name);
	$("#comments").val(r.comments);
	$("#statics").val(r.statics);
	$("#sort").val(r.sort);
	
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

function addValidateStatics(){
	var statics = $("#statics").val(); // 状态：0启用，1停用
	var id = $("#id").val();
	var name = $("#name").val();
	var parentId = $("#parentId").val();
	var sort = $("#sort").val();
	
	// 当分类状态选择停用时，需判断是否存在子标签
	if( statics == 1){
		$.ajax({
			url:'/xzzBehind/appInterest/toValidateLabel.do',
			dataType:"text",
			data:{'id':id,'name':name},
			type:'post',
			async:false,
			success: function(message){
				console.log(message);
				if(message != ""){
					 $.messager.confirm("操作提示",message + "分类存在子标签，选择停用所有的子标签也将改为停用状态，您确定要停用"+ message +"吗？", function (data) {
				            if (data) {
				            	add();
				            }
				            else {
				            	return false;
				            }
				        })
				} else {
					add();
				}
			},
			error:function(){
				console.log('error');
			}
		})
		
	} else {
		add();
	}
	
	
}

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
	
	if($("#sort").val().replace(/[ ]/g,"")=="")
	{
		$.messager.alert("提示","序列号不能为空","info",function(){document.getElementById("sort").focus();});
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