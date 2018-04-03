var r = window.parent.select; //选中行数据
var editor = null;
$(function(){
	 editor = CKEDITOR.replace("HELP_ANSWER", { "toolbar": "Basic" }); //显示编辑器
	 ckeditor.setupCKEditor(editor, "ckfinder/"); //设置图片管理组件
});
window.onload = function () {
	$("#ID").val(r.ID);
	$("#HELP_ANSWER").val(r.HELP_ANSWER);
	$("#HELP_MATTER").val(r.HELP_MATTER);
	$("#HELP_ORDERNUM").val(r.HELP_ORDERNUM);
	
};


//处理CKEDITOR的值
function CKupdate() {
    for (instance in CKEDITOR.instances)
        CKEDITOR.instances[instance].updateElement();
} 

//保存
function add()
{
	 CKupdate(); //在提交表单前需要做以上处理
	if($("#HELP_ANSWER").val().replace(/[ ]/g,"")=="")
	{
		$.messager.alert("提示","帮助答案不能为空","info",function(){document.getElementById("HELP_ANSWER").focus();});
		return;
	}else if($("#HELP_MATTER").val().replace(/[ ]/g,"")==""){
		$.messager.alert("提示","帮助问题不能为空","info",function(){document.getElementById("HELP_MATTER").focus();});
		return;
	}else if($("#HELP_ORDERNUM").val().replace(/[ ]/g,"")==""){
		$.messager.alert("提示","序列号不能为空","info",function(){document.getElementById("HELP_MATTER").focus();});
		return;
	}
	document.getElementById("baocunid").disabled="disabled";
	if(r.HELP_ORDERNUM==$("#HELP_ORDERNUM").val()){
		$.post('updateHelphtins.do?counts='+0,$("#insertorupdForm").serialize(),function(result){
			
			if(result==1) //修改成功
			{
				window.parent.tb.load();
				$.messager.alert("提示","保存成功","info");
				parent.$('#windowDiv').window('close');
			}
			else
			{
				$.messager.alert("提示","保存失败或者序列号已经存在","info");
				document.getElementById("baocunid").disabled="";
			}
		});
	}else{
		$.post('updateHelphtins.do?counts='+1,$("#insertorupdForm").serialize(),function(result){
			
			if(result==1) //修改成功
			{
				window.parent.tb.load();
				$.messager.alert("提示","保存成功","info");
				parent.$('#windowDiv').window('close');
			}
			else
			{
				$.messager.alert("提示","保存失败或者序列号已经存在","info");
				document.getElementById("baocunid").disabled="";
			}
		});
	}
	
	
}