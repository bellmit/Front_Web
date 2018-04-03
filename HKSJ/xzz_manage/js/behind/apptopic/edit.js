


//var r = window.parent.select; //选中行数据
/*$(function(){
	
	$("#id").val(r.id);
	$("#title").val(r.title);
	$("#userId").val(r.userId);
	$("#content").val(r.content);
	$("#status").val(r.status);
	$("#createTime").val(r.createTime);
	var parHtml="<option value=\"\">--请选择</option>"

	var statusName;
	if(r.status == 0){
		statusName = "正常";
		parHtml += "<option value=\"1\">关闭</option>";
		parHtml += "<option value=\"2\">过期</option>";
	} else if(r.status == 1){
		statusName = "关闭";
		parHtml += "<option value=\"0\">正常</option>";
		parHtml += "<option value=\"2\">过期</option>";
	} else {
		statusName = "过期";
		parHtml += "<option value=\"0\">正常</option>";
		parHtml += "<option value=\"1\">关闭</option>";
	}
		
	parHtml += "<option selected value=\""+r.status+"\">"+statusName+"</option>";
	$("#status").html(parHtml);
});
*/
function editePic(index){
	$("#urlI"+index).hide();
	$("#delete"+index).hide();
	$("#p"+index).attr("value","");
	$("#urlF"+index).show();
}


function add()
{
		if($("#title").val().replace(/[ ]/g,"")=="")
		{
			$.messager.alert("提示","标题不能为空","info",function(){document.getElementById("title").focus();});
			return;
		}
		if($("#status").val().replace(/[ ]/g,"")=="")
		{
			$.messager.alert("提示","状态不能为空","info",function(){document.getElementById("status").focus();});
			return;
		}
		if($("#remark").val().replace(/[ ]/g,"")=="")
		{
			$.messager.alert("提示","描述不能为空","info",function(){document.getElementById("remark").focus();});
			return;
		}
		if($("#editor_id").val().replace(/[ ]/g,"")=="")
		{
			$.messager.alert("提示","内容不能为空","info",function(){document.getElementById("editor_id").focus();});
			return;
		}
		
		var imgUrl = $("#urlF1").val();
		if(imgUrl.length>0){
		    if(!/\.(gif|jpg|jpeg|png|GIF|JPG|PNG)$/.test(imgUrl))
		    {
		      $.messager.alert("提示","图片类型必须是.gif,jpeg,jpg,png中的一种","info",function(){document.getElementById("urlF1").focus();});
		      return;
		    }
		}
		
		$.ajaxSetup({ 
		    async : false 
		}); 
		
		$.post('advertLong/imgUpload.do',{content:$("#editor_id").val()},function(result){
			$("#editor_id").val(result);
		});
		
		$("#appTopicForm").ajaxSubmit({
			 type:'post',
		        url:'appTopic/saveOrUpdate.do',
		        success:function(result){
		        	if(result== "OK") //修改成功
		    		{
		    			//$.messager.alert("提示","保存成功","info");
		    			window.parent.tb.load();
		    			parent.$('#windowDiv').window('close');
		    		}
		    		else if(result == "NO"){
		    			$.messager.alert("提示","保存失败","info");
		    			document.getElementById("baocunid").disabled="";
		    		} else {
		    			$.messager.alert("提示",result,"info");
		    			document.getElementById("baocunid").disabled="";
		    		}
		        }
			
		});
}